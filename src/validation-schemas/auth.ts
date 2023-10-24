import { z } from "zod";

export const registerFormSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    registrationToken: z.string(),
})
export type RegisterFormType = z.infer<typeof registerFormSchema>

export const loginFormSchema = registerFormSchema.omit({ registrationToken: true })
export type LoginFormType = z.infer<typeof loginFormSchema>