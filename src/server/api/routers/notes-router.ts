import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { notes } from "~/server/db/schema";
import {
  createdNoteValidator,
  createNoteValidator,
} from "~/validators/created-note";

export const notesRouter = createTRPCRouter({
  createNewNote: protectedProcedure
    .input(createNoteValidator)
    .output(createdNoteValidator)
    .mutation(async ({ ctx, input }) => {
      try {
      await ctx.db.insert(notes).values({ ...input, ownerId: ctx.user.id });
        
      } catch (error) {
        throw new TRPCError({code:"BAD_REQUEST", message: "Note content occupied"})
        
      }
      const uploadedNote = await ctx.db.query.notes.findFirst({
        where: eq(notes.content, input.content),
      
      });
      if (!uploadedNote) {
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
        ...uploadedNote,
      };
    }),

  getMyNotes: protectedProcedure
    .input(z.void())
    .output(createdNoteValidator.array())
    .query(async ({ ctx }) => {
      const myNotes = await ctx.db.query.notes.findMany({
        where: eq(notes.ownerId, ctx.user.id),
      });
      return myNotes;
    }),

  updateMyNote: protectedProcedure
  .input(z.object({id: createdNoteValidator.shape.id,
  updatedNote: createdNoteValidator.omit({id:true, ownerId:true})}))
  .output(createdNoteValidator)
  .mutation(async({ctx, input})=>{
    const noteToUpdate = await ctx.db.query.notes.findFirst({
      where:eq(notes.id, input.id)
    })
    if(!noteToUpdate || noteToUpdate?.ownerId!==ctx.user.id){
      throw new TRPCError({code: "FORBIDDEN", message:"It's not your note"})
    }
    await ctx.db.update(notes).set({...input.updatedNote}).where(eq(notes.id, input.id))
    const updatedNote = await ctx.db.query.notes.findFirst({
      where:eq(notes.id, input.id)
    })
    if(!updatedNote){
      throw new TRPCError({code: "INTERNAL_SERVER_ERROR", message:"note was not updated correctly"})
    }
    return updatedNote

  }),
  deleteNote: protectedProcedure
  .input(createdNoteValidator.pick({id:true}))
  .output(createNoteValidator)
  .mutation(async({ctx, input})=>{
    const noteToDelete = await ctx.db.query.notes.findFirst({
      where: eq(notes.id, input.id),
    });

    if(!noteToDelete){
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "file was not deleted correctly",
      });
    }
    if(noteToDelete?.ownerId!==ctx.user.id){
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "It's not your note",
      });
    }
    await ctx.db.delete(notes).where(eq(notes.id, input.id));
    return noteToDelete;
  })
});
