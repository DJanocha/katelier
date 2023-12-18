import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { photos } from "~/server/db/schema";
import { utapi } from "~/server/uploadthing";
import {
  getFileNameWithExtensionInfo,
  updateFileName,
} from "~/utils/file-name-info";
import {
  registerUploadedImageValidator,
  uploadedImageValidator,
} from "~/validators/uploaded-photo";

export const imagesRouter = createTRPCRouter({
  registerImage: protectedProcedure
    .input(registerUploadedImageValidator)
    .output(uploadedImageValidator)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(photos).values({ ...input, ownerId: ctx.user.id });
      const uploadedImage = await ctx.db.query.photos.findFirst({
        where: eq(photos.key, input.key),
      });
      if (!uploadedImage) {
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
        ...uploadedImage,
      };
    }),
  updateImage: protectedProcedure
    .input(
      z.object({
        id: uploadedImageValidator.shape.id,
        updatedValues: uploadedImageValidator
          .omit({
            id: true,
            key: true,
            ownerId: true,
          })
          .partial(),
      }),
    )
    .output(uploadedImageValidator)
    .mutation(async ({ ctx, input: { id, updatedValues: _updatedValues } }) => {
      let updatedName = _updatedValues.name;
      if (updatedName) {
        const currentFile = await ctx.db.query.photos.findFirst({
          where: eq(photos.id, id),
        });
        if (!currentFile) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "could not find file to edit",
          });
        }
        updatedName = updateFileName({
          from: currentFile.name,
          to: updatedName,
        });
      }

      const updatedValues = _updatedValues;
      if (updatedName) {
        updatedValues.name = updatedName;
      }
      await ctx.db.update(photos).set(updatedValues).where(eq(photos.id, id));
      const uploadedFile = await ctx.db.query.photos.findFirst({
        where: eq(photos.id, id),
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
    .input(uploadedImageValidator.pick({ id: true }))
    .output(z.object({ removedImage: uploadedImageValidator }))
    .mutation(async ({ ctx, input }) => {
      const file = await ctx.db.query.photos.findFirst({
        where: eq(photos.id, input.id),
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
      await ctx.db.delete(photos).where(eq(photos.id, input.id));
      return { removedImage: file };
    }),
  getMyImages: protectedProcedure
    .input(z.void())
    .output(uploadedImageValidator.array())
    .query(async ({ ctx }) => {
      const myImages = await ctx.db.query.photos.findMany({
        where: eq(photos.ownerId, ctx.user.id),
      });
      return uploadedImageValidator
        .array()
        .parse(
          myImages.map((image) => ({
            ...image,
            name: getFileNameWithExtensionInfo(image.name).name,
          })),
        );
    }),
});
