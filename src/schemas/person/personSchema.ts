import { z } from "zod";

export const locationSchema = z.object({
  address: z.string(),
  number: z.string(),
  complement: z.string(),
  city: z.string(),
  state: z.string(),
});

export const personRegisterSchema = z.object({
  name: z.string(),
  document: z.string(),
  phone: z.string(),
  email: z.string(),
  birthdate: z.string(),
  location: locationSchema,
});

export type PersonRegisterSchema = z.infer<typeof personRegisterSchema>;
 