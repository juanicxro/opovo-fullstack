import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Titulo obrigatorio")
    .max(180, "Titulo deve ter no maximo 180 caracteres"),
  content: z.string().trim().min(1, "Conteudo obrigatorio"),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
