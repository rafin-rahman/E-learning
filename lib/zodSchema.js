import { z } from "zod";

export const signUpFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
});

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
