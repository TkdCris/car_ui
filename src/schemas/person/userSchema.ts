import { z } from "zod";

export const userSchema = z.object({
  email: z.string(),
  name: z.string(),
  role: z.string(),
})

export type UserSchema = z.infer<typeof userSchema>;
