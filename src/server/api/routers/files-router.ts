import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { omit } from "lodash";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { files } from "~/server/db/schema";
import { uploadedFileValidator, type UploadedFile, registerUploadedFileValidator } from "~/validators/uploaded-file";

export const filesRouter = createTRPCRouter({
  registerImage: protectedProcedure
    .input(registerUploadedFileValidator)
    .output(uploadedFileValidator)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(files).values({...input,ownerId: ctx.user.id});
      const uploadedFile = await ctx.db.query.files.findFirst({ where: eq(files.key, input.key) });
      if(!uploadedFile){
        /**
         * todo:
         * if file was uploaded to uploadthing but not registered in db, file in uploadthing should be removed
         * so that user can upload file again and there are no leftovers in uploadthing
         */
        throw new TRPCError({code:"INTERNAL_SERVER_ERROR",message:"file was not uploaded correctly"})
      }
      const uploadedFileInfo : UploadedFile = omit(uploadedFile, ['ownerId'])
      return {
        ...uploadedFileInfo,
      };
    }),
  getMyImages: protectedProcedure
    .input(z.void())
    .output(uploadedFileValidator.array())
    .query(async ({ ctx }) => {
      const myImages = await ctx.db.query.files.findMany({where:eq(files.ownerId, ctx.user.id) })
      const images : UploadedFile[] = myImages.map(image=>omit(image, ['ownerId']))
      return uploadedFileValidator.array().parse(images)
    }),
});
