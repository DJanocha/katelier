import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";
import { files } from "~/server/db/schema";
export const uploadedFileValidator = createSelectSchema(files, {
    id: (schema) => schema.id.positive(),
    url: (schema) => schema.url.url(),
    description: (schema) => schema.description.optional().default('')
  }).omit({ownerId:true});
export type UploadedFile = z.infer<typeof uploadedFileValidator>;

export const registerUploadedFileValidator = uploadedFileValidator.omit({id:true})
export type RegisterUploadedFile = z.infer<typeof registerUploadedFileValidator>
