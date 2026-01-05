"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updatePostAction } from "@/app/actions/posts";
import type { PostErrorResponse } from "@/app/actions/posts/types";
import type { PostPreview } from "../../shared/post-types";
import {
  createPostSchema,
  type CreatePostFormValues,
} from "../../create/schemas/create-post-schema";

const fieldMap: Record<string, keyof CreatePostFormValues> = {
  title: "title",
  content: "content",
};

type UseUpdatePostFormOptions = {
  onSuccess?: (post: PostPreview) => void;
};

export function useUpdatePostForm(
  post: PostPreview,
  options: UseUpdatePostFormOptions = {}
) {
  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  const submit = form.handleSubmit(async (values) => {
    form.clearErrors();
    const { status, data } = await updatePostAction({
      id: post.id,
      title: values.title,
      content: values.content,
    });

    if (status >= 200 && status < 300) {
      const updatedPost = data as PostPreview | null;
      if (!updatedPost) {
        toast.error("Nao foi possivel atualizar o post.");
        return;
      }

      toast.success("Post atualizado com sucesso.");
      options.onSuccess?.(updatedPost);
      return;
    }

    const errorPayload = data as PostErrorResponse | null;

    if (status === 422) {
      const fieldErrors =
        errorPayload?.errors && typeof errorPayload.errors === "object"
          ? errorPayload.errors
          : null;

      let hasFieldErrors = false;
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          const key = fieldMap[field];
          if (!key || !messages?.length) {
            return;
          }

          form.setError(key, { message: messages[0] });
          hasFieldErrors = true;
        });
      }

      if (hasFieldErrors) {
        toast.error("Verifique os campos destacados.");
        return;
      }
    }

    if (status === 429) {
      toast.error("Muitas tentativas. Tente novamente em alguns minutos.");
      return;
    }

    const message =
      typeof errorPayload?.message === "string"
        ? errorPayload.message
        : "Nao foi possivel atualizar o post.";
    toast.error(message);
  });

  return {
    control: form.control,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    submit,
    reset: form.reset,
  };
}
