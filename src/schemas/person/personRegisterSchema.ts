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
  name: z.string().min(1, { message: "Informe o nome" }),
  nickname: z.string(),
  email: z.string()
    .optional()
    .refine((email) => !email || z.string().email().safeParse(email).success,
      { message: "Email inválido!" }
    ),
  phone: z
    .union([
      z.string().regex(/^\(\d{2}\) \d{4}-\d{4}$/, { message: "Telefone inválido" }),
      z.string().length(0),
    ]).transform(phone => phone.replace(/\D/g, "")),
  cellphone: z.string()
    .refine(
      (cellphone) => !cellphone || /^\(\d{2}\) \d{5}-\d{4}$/.test(cellphone),
      { message: "Celular inválido" }
    ).transform(cellphone => cellphone.replace(/\D/g, "")),
  notary: z.string(),
  observation: z.string(),
  location: locationSchema,
})

export const legalEntityRegisterSchema = basicPersonSchema
  .merge(z.object({
    cnpj: z.string().min(1, { message: "Informe o CNPJ da empresa" })
      .regex(/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}/, {message: "CNPJ inválido"})
      .transform(cnpj => cnpj.replace(/\D/g, "")),
    ie: z.string()
      .refine((ie) => !ie || /^(?:\d{3}\.\d{3}\.\d{3}|\d{3}\.\d{3}\.\d{3}\.\d{3}|\d{2}\.\d{3}\.\d{3}\.\d{3}\.\d{3})$/.test(ie),
        { message: "Inscrição Estadual inválida"})
      .transform(ie => ie.replace(/\D/g, "")),
    im: z.string()
      .refine((im) => !im || /^(?:\d{3}\.\d{3}\.\d{2}|\d{3}\.\d{3}\.\d{3}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(im),
        { message: "Inscrição Municipal inválida"})
      .transform((im) => im.replace(/\D/g, "")),
    taxRegime: z.string(),
    suframa: z.string(),
    icmsTaxPayer: z.boolean(),
  }))

export const naturalPersonRegisterSchema = basicPersonSchema
  .merge(z.object({
    cpf: z.string().min(1, { message: "Informe o CPF!" })
      .regex(/\d{3}.\d{3}.\d{3}-\d{2}/, {message: "CPF inválido"})
      .transform(cpf => cpf.replace(/\D/g, "")),
    rg: z.string(),
    birthdate: z.string()
    .refine(
      (birthdate) => {
        if (!birthdate) return true;

        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(birthdate)) return false;

        const [day, month, year] = birthdate.split("/").map(Number);

        if (month > 12) return false;
        if ([1,3,5,7,8,10,12].includes(month) && day > 31) return false;
        if ([2,4,6,9,11].includes(month) && day > 30) return false;

        const birthdateObject = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0,0,0,0);

        return birthdateObject <= today;
      },
      { message: "Data inválida"}
    ),
    fatherName: z.string(),
    motherName: z.string(),
    crc: z.string(),
  }))

export type LegalEntityRegisterSchema = z.infer<typeof legalEntityRegisterSchema>;
export type NaturalPersonRegisterSchema = z.infer<typeof naturalPersonRegisterSchema>;
