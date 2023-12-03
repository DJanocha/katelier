import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";

import { users } from "~/server/db/schema";

export const meValidator = createSelectSchema(users, {
  id: (schema) => schema.id.positive(),
  email: (schema) => schema.email.email(),
  phoneNumber: (schema) =>
    schema.phoneNumber.regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      { message: "invalid phone number" },
    ),
});
export type Me = z.infer<typeof meValidator>;
