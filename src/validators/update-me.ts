import { type z } from "zod";
import { meValidator } from "./me";

export const updateMeValidator = meValidator.omit({
  createdAt: true,
  updatedAt: true,
  id: true,
}).partial();
export type UpdateMe = z.infer<typeof updateMeValidator>