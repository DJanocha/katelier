import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { bcrypt } from "~/server/bcrypt";
import { auth, registrationTokens, users } from "~/server/db/schema";
import { jwt } from "~/server/jwt";
import { loginFormSchema, registerFormSchema } from "~/validation-schemas/auth";

export const authRouter = createTRPCRouter({
  getAllUsers: publicProcedure.input(z.void()).query(async ({ ctx }) => {
    const allUsers = await ctx.db.query.users.findMany();
    return {
      allUsers,
    };
  }),
  logIn: publicProcedure.input(loginFormSchema).mutation(async ({ ctx, input }) => {
    const matchingUserInDb = await ctx.db.query.users.findFirst({
      where: ({ email }, { eq }) => eq(email, input.email),
    });
    if (!matchingUserInDb) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const matchingUserInDbAuthInfo = await ctx.db.query.auth.findFirst({
      where: ({ userId }, { eq }) => eq(userId, matchingUserInDb.id),
    });
    if (!matchingUserInDbAuthInfo) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const passwordsMatch = await bcrypt.compare(
      matchingUserInDbAuthInfo.hashedPassword,
      input.password,
    );
    if (!passwordsMatch) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const token = jwt.create({ userId: matchingUserInDb.id });
    return {
      token,
      user: matchingUserInDb
    };
  }),
  register: publicProcedure
    .input(registerFormSchema)
    .mutation(async ({ input, ctx }) => {
      const isEmailOccupied = await ctx.db.query.users.findFirst({
        where: ({ email }, { eq }) => eq(email, input.email),
      });
      if (isEmailOccupied) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email is already occupied",
        });
      }
      const isTokenValid = await ctx.db.query.registrationTokens.findFirst({
        where: ({ token, usedBy, usedAt }, { eq, isNull }) =>
          eq(token, input.registrationToken) &&
          isNull(usedBy) &&
          isNull(usedAt),
      });
      if (!isTokenValid) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Invalid secret token",
        });
      }

      const hashedPassword = await bcrypt.hashPassword(input.password);
      await ctx.db.insert(users).values({ email: input.email });
      const newUser = await ctx.db.query.users.findFirst({
        where: ({ email }, { eq }) => eq(email, input.email),
      });
      if (!newUser) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "There was an error when creating the user",
        });
      }
      await ctx.db.insert(auth).values({ userId: newUser.id, hashedPassword });

      await ctx.db
        .update(registrationTokens)
        .set({ usedAt: new Date(), usedBy: newUser.id })
        .where(eq(registrationTokens.token, input.registrationToken));
    }),
});
