"use client";

import { LockKeyhole, Mail } from "lucide-react";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { useLoginForm } from "../hooks/use-login-form";

type LoginFormProps = {
  onSuccess?: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { control, errors, isSubmitting, submit } = useLoginForm({ onSuccess });

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-2">
      <FormField
        control={control}
        name="email"
        type="email"
        label="Email"
        placeholder="email@exemplo.com"
        icon={Mail}
        error={errors.email?.message}
      />
      <FormField
        control={control}
        name="password"
        type="password"
        label="Senha"
        placeholder="********"
        icon={LockKeyhole}
        error={errors.password?.message}
      />
      <Button
        type="submit"
        className="w-full h-10 mt-1 bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg transition-all duration-200 hover:shadow-xl sm:h-11 sm:mt-2"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        Entrar
      </Button>
    </form>
  );
}
