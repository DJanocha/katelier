import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { photos } from "~/server/db/schema";

export const uploadedImageValidator = createSelectSchema(photos, {
  id: (schema) => schema.id.positive(),
  url: (schema) => schema.url.url(),
  description: (schema) => schema.description.optional().default(""),
});
export type UploadedImage = z.infer<typeof uploadedImageValidator>;

export const registerUploadedImageValidator = uploadedImageValidator.omit({
  id: true,
  ownerId:true
});
export type RegisterUploadedImage = z.infer<
  typeof registerUploadedImageValidator
>;
