import { z } from "zod";

export const locationSchema = z.object({
  address: z.string(),
  number: z.string(),
  complement: z.string(),
  city: z.string(),
  state: z.string(),
});

export const personRegisterSchema = z.object({
  legalEntity: z.boolean(),
  name: z.string().min(1, { message: "Informe o nome!" }),
  documentNumber: z.string().min(1, { message: "Informe o número do documento!" }),
  phone: z.string(),
  email: z.string(),
  birthdate: z.string()
})

export type PersonRegisterSchema = z.infer<typeof personRegisterSchema>;
