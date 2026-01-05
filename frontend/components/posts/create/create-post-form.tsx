"use client";

import { FileText, Type } from "lucide-react";
import { FormField } from "@/components/forms/form-field";
import { FormTextareaField } from "@/components/forms/form-textarea-field";
import { Button } from "@/components/ui/button";
import { useCreatePostForm } from "./hooks/use-create-post-form";

type CreatePostFormProps = {
  onSuccess?: () => void;
};

export function CreatePostForm({ onSuccess }: CreatePostFormProps) {
  const { control, errors, isSubmitting, submit } = useCreatePostForm({
    onSuccess,
  });

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-2">
      <FormField
        control={control}
        name="title"
        label="Titulo"
        placeholder="Digite o titulo do post"
        icon={Type}
        error={errors.title?.message}
      />
      <FormTextareaField
        control={control}
        name="content"
        label="Conteudo"
        placeholder="Escreva o conteudo do post"
        icon={FileText}
        rows={6}
        error={errors.content?.message}
      />
      <Button
        type="submit"
        className="w-full h-10 mt-1 bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg transition-all duration-200 hover:shadow-xl sm:h-11 sm:mt-2"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        Publicar
      </Button>
    </form>
  );
}
