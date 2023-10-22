import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  getAllUsers: publicProcedure
    .input(z.void())
    .query(async ({ ctx }) => {
      const allUsers = await ctx.db.query.users.findMany()
      return {
        allUsers,
      };
    }),


});
