import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Enter you registered email")
    .email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});
