"use client";

import { FileText, Type } from "lucide-react";
import { FormField } from "@/components/forms/form-field";
import { FormTextareaField } from "@/components/forms/form-textarea-field";
import { Button } from "@/components/ui/button";
import type { PostPreview } from "../shared/post-types";
import { useUpdatePostForm } from "./hooks/use-update-post-form";

type PostPreviewEditFormProps = {
  post: PostPreview;
  onCancel: () => void;
  onSaved: (post: PostPreview) => void;
};

export function PostPreviewEditForm({
  post,
  onCancel,
  onSaved,
}: PostPreviewEditFormProps) {
  const { control, errors, isSubmitting, submit, reset } = useUpdatePostForm(
    post,
    { onSuccess: onSaved }
  );

  const handleCancel = () => {
    reset({ title: post.title, content: post.content });
    onCancel();
  };

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
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          Salvar
        </Button>
      </div>
    </form>
  );
}
