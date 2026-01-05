"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerAction } from "@/app/actions/auth";
import type { AuthErrorResponse } from "@/app/actions/auth/types";
import {
  registerSchema,
  type RegisterFormValues,
} from "../schemas/register-schema";

const fieldMap: Record<string, keyof RegisterFormValues> = {
  name: "name",
  email: "email",
  password: "password",
  password_confirmation: "password_confirmation",
};

export function useRegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const submit = form.handleSubmit(async (values) => {
    form.clearErrors();
    const { status, data } = await registerAction(values);

    if (status >= 200 && status < 300) {
      const loginParams = new URLSearchParams({
        email: values.email,
        from: "register",
      });
      toast.success("Conta criada com sucesso.", {
        duration: Infinity,
        action: {
          label: "Ir para login",
          onClick: () => {
            router.push(`/login?${loginParams.toString()}`);
          },
        },
      });
      return;
    }

    const errorPayload = data as AuthErrorResponse | null;

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
        : "Nao foi possivel criar a conta.";
    toast.error(message);
  });

  return {
    control: form.control,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    submit,
  };
}
