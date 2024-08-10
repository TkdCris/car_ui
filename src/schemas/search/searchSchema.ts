import { z } from "zod";

export const searchSchema = z.object({
  key: z.string(),
  value: z.string().min(1, { message: "Campo obrigatório!" }),
});


export type SearchSchema = z.infer<typeof searchSchema>;
 