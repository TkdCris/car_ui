import { z } from "zod";

export const locationSchema = z.object({
  address: z.string(),
  city: z.string(),
  number: z.string(),
  complement: z.string(),
  state: z.string(),
  postalCode: z.string(),
});

const basicPersonSchema = z.object({
  legalEntity: z.boolean(),
  idCompany: z.string(),
  name: z.string().min(1, { message: "Informe o nome!" }),
  nickname: z.string(),
  email: z.string().optional().refine((email) => !email || z.string().email().safeParse(email).success,
  { message: "Email inválido!" }
),
  phone: z.string(),
  cellphone: z.string(),
  notary: z.string(),
  observation: z.string(),
  location: locationSchema,
})

export const legalEntityRegisterSchema = basicPersonSchema
  .merge(z.object({
    cnpj: z.string().min(1, { message: "Informe o CNPJ da empresa!" }),
    ie: z.string(),
    im: z.string(),
    taxRegime: z.string(),
    suframa: z.string(),
    icmsTaxPayer: z.boolean(),
  }))

export const naturalPersonRegisterSchema = basicPersonSchema
  .merge(z.object({
    cpf: z.string().min(1, { message: "Informe o CPF!" }),
    rg: z.string(),
    birthdate: z.string(),
    fatherName: z.string(),
    motherName: z.string(),
    crc: z.string(),
  }))

export type LegalEntityRegisterSchema = z.infer<typeof legalEntityRegisterSchema>;
export type NaturalPersonRegisterSchema = z.infer<typeof naturalPersonRegisterSchema>;
