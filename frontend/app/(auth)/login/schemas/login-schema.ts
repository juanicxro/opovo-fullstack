import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email obrigatorio")
    .email("Email invalido"),
  password: z.string().min(1, "Senha obrigatoria"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
