import { z } from "zod";

export const locationSchema = z.object({
  address: z.string(),
  number: z.string(),
  complement: z.string(),
  city: z.string(),
  state: z.string(),
});

export const personRegisterSchema = z.object({
  typeOfPeople: z.string().min(1, { message: "Campo obrigatório!" }),
  name: z.string().min(1, { message: "Campo obrigatório!" }),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  phone: z.string(),
  email: z.string(),
  birthdate: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.typeOfPeople === "pf" && !data.cpf) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "CPF é obrigatório para pessoa física.",
      path: ["cpf"],
    });
}
  if (data.typeOfPeople === "pj" && !data.cnpj) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "CNPJ é obrigatório para pessoa jurídica.",
      path: ["cnpj"],
    });
}
});



export type PersonRegisterSchema = z.infer<typeof personRegisterSchema>;
 