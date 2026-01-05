import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Senha deve ter no minimo 8 caracteres")
  .max(72, "Senha deve ter no maximo 72 caracteres");

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Nome obrigatorio")
      .max(100, "Nome deve ter no maximo 100 caracteres"),
    email: z
      .string()
      .trim()
      .email("Email invalido")
      .max(150, "Email deve ter no maximo 150 caracteres"),
    password: passwordSchema,
    password_confirmation: passwordSchema,
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "As senhas nao conferem",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
