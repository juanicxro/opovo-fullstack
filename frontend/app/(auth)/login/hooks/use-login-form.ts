"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginAction } from "@/app/actions/auth";
import type { AuthErrorResponse } from "@/app/actions/auth/types";
import { loginSchema, type LoginFormValues } from "../schemas/login-schema";

const fieldMap: Record<string, keyof LoginFormValues> = {
  email: "email",
  password: "password",
};

type UseLoginFormOptions = {
  onSuccess?: () => void;
};

export function useLoginForm(options: UseLoginFormOptions = {}) {
  const router = useRouter();
  const [emailQuery] = useQueryState("email");
  const [fromQuery, setFromQuery] = useQueryState("from");
  const hasFocusedRef = useRef(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: emailQuery ?? "",
      password: "",
    },
  });

  useEffect(() => {
    if (hasFocusedRef.current) {
      return;
    }

    if (fromQuery !== "register") {
      return;
    }

    if (!emailQuery) {
      return;
    }

    if (!form.getValues("email")) {
      form.setValue("email", emailQuery, { shouldValidate: true });
    }

    form.setFocus("password");
    hasFocusedRef.current = true;
    setFromQuery(null);
  }, [emailQuery, fromQuery, form, setFromQuery]);

  const submit = form.handleSubmit(async (values) => {
    form.clearErrors();
    const { status, data } = await loginAction(values);

    if (status >= 200 && status < 300) {
      toast.success("Login realizado com sucesso.");
      options.onSuccess?.();
      router.push("/");
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

    if (status === 401) {
      const message =
        typeof errorPayload?.message === "string"
          ? errorPayload.message
          : "Credenciais invalidas.";
      toast.error(message);
      return;
    }

    if (status === 429) {
      toast.error("Muitas tentativas. Tente novamente em alguns minutos.");
      return;
    }

    const message =
      typeof errorPayload?.message === "string"
        ? errorPayload.message
        : "Nao foi possivel entrar.";
    toast.error(message);
  });

  return {
    control: form.control,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    submit,
  };
}
