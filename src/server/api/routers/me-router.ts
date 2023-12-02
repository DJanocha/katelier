import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";
import { meValidator, type Me } from "~/validators/me";
import { updateMeValidator } from "~/validators/update-me";

export const meRouter = createTRPCRouter({
  getMe: protectedProcedure.query(({ ctx }) => {
    const me: Me = ctx.user;
    return {
      me,
    };
  }),
  updateMe: protectedProcedure
    .input(updateMeValidator)
    .output(meValidator)
    .mutation(async ({ ctx, input }) => {
      const userBefore = ctx.user
      const userAfter = {...userBefore, ...input}
      await ctx.db.update(users).set(userAfter).where(eq(users.id, userBefore.id))
      return userAfter
    }),
  // getAllUsers: publicProcedure.input(z.void()).query(async ({ ctx }) => {
  //   const allUsers = await ctx.db.query.users.findMany();
  //   return {
  //     allUsers,
  //   };
  // }),
});
