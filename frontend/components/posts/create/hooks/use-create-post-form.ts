"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createPostAction } from "@/app/actions/posts";
import type { PostErrorResponse } from "@/app/actions/posts/types";
import {
  createPostSchema,
  type CreatePostFormValues,
} from "../schemas/create-post-schema";

const fieldMap: Record<string, keyof CreatePostFormValues> = {
  title: "title",
  content: "content",
};

type UseCreatePostFormOptions = {
  onSuccess?: () => void;
};

export function useCreatePostForm(options: UseCreatePostFormOptions = {}) {
  const router = useRouter();
  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const submit = form.handleSubmit(async (values) => {
    form.clearErrors();
    const { status, data } = await createPostAction(values);

    if (status >= 200 && status < 300) {
      toast.success("Post criado com sucesso.");
      form.reset();
      options.onSuccess?.();
      router.refresh();
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
        : "Nao foi possivel criar o post.";
    toast.error(message);
  });

  return {
    control: form.control,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    submit,
  };
}
