import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { notes } from "~/server/db/schema";

export const createdNoteValidator = createSelectSchema(notes, {
  id: (schema) => schema.id.positive(),
  content: (schema) => schema.content.min(1).max(256),
  description: (schema) => schema.description.optional().default(""),
});
export type CreatedNote = z.infer<typeof createdNoteValidator>;

export const createNoteValidator = createdNoteValidator.omit({
  id: true,
  ownerId:true
});
export type CreateNote = z.infer<
  typeof createNoteValidator
>;
