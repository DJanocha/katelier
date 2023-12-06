import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { files } from "~/server/db/schema";
import { utapi } from "~/server/uploadthing";
import {
  registerUploadedFileValidator,
  uploadedFileValidator,
} from "~/validators/uploaded-file";

export const filesRouter = createTRPCRouter({
  registerImage: protectedProcedure
    .input(registerUploadedFileValidator)
    .output(uploadedFileValidator)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(files).values({ ...input, ownerId: ctx.user.id });
      const uploadedFile = await ctx.db.query.files.findFirst({
        where: eq(files.key, input.key),
      });
      if (!uploadedFile) {
        /**
         * todo:
         * if file was uploaded to uploadthing but not registered in db, file in uploadthing should be removed
         * so that user can upload file again and there are no leftovers in uploadthing
         */
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "file was not edited correctly",
        });
      }
      return {
        ...uploadedFile,
      };
    }),
  updateImage: protectedProcedure
    .input(
      z.object({
        id: uploadedFileValidator.shape.id,
        updatedValues: uploadedFileValidator
          .omit({
            id: true,
            key: true,
            ownerId: true,
          })
          .partial(),
      }),
    )
    .output(uploadedFileValidator)
    .mutation(async ({ ctx, input: { id, updatedValues } }) => {
      await ctx.db.update(files).set(updatedValues).where(eq(files.id, id));
      const uploadedFile = await ctx.db.query.files.findFirst({
        where: eq(files.id, id),
      });
      if (!uploadedFile) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "file was not uploaded correctly",
        });
      }
      return {
        ...uploadedFile,
      };
    }),
  removeImage: protectedProcedure
    .input(uploadedFileValidator.pick({ id: true }))
    .output(z.object({ removedImage: uploadedFileValidator }))
    .mutation(async ({ ctx, input }) => {
      const file = await ctx.db.query.files.findFirst({
        where: eq(files.id, input.id),
      });
      if (!file) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "file does not exist",
        });
      }
      const isMine = file.ownerId === ctx.user.id;
      if (!isMine) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "you are not allowed to remove this file",
        });
      }
      await utapi.deleteFiles([file.key]);
      await ctx.db.delete(files).where(eq(files.id, input.id));
      return { removedImage: file };
    }),
  getMyImages: protectedProcedure
    .input(z.void())
    .output(uploadedFileValidator.array())
    .query(async ({ ctx }) => {
      const myImages = await ctx.db.query.files.findMany({
        where: eq(files.ownerId, ctx.user.id),
      });
      return uploadedFileValidator.array().parse(myImages);
    }),
});
