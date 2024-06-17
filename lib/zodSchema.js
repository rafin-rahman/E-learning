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

export const createBusinessClientSchema = z.object({
  name: z.string().min(2).max(50),
  shortName: z.string().optional(),
  logo: z.string().optional(),
  // domains: must take the string and split it by comma in order to get an array
  domains: z.string().min(3),
});
