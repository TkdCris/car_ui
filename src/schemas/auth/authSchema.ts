import { z } from "zod";

export const authSchema = z.object({
  email: z.string().min(1, "Campo obrigatório!"),
  password: z.string().min(1, "Campo obrigatório!"),
})

export type AuthSchema = z.infer<typeof authSchema>;
