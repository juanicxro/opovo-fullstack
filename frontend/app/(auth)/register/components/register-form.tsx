"use client";

import { LockKeyhole, Mail, User } from "lucide-react";
import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { useRegisterForm } from "../hooks/use-register-form";

export function RegisterForm() {
  const { control, errors, isSubmitting, submit } = useRegisterForm();

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-2">
      <FormField
        control={control}
        name="name"
        label="Nome"
        placeholder="Seu nome"
        icon={User}
        error={errors.name?.message}
      />
      <FormField
        control={control}
        name="email"
        type="email"
        label="Email"
        placeholder="email@exemplo.com"
        icon={Mail}
        error={errors.email?.message}
      />
      <div className="grid grid-cols-2 gap-2 justify-start items-start">
        <FormField
          control={control}
          name="password"
          type="password"
          label="Senha"
          placeholder="********"
          icon={LockKeyhole}
          error={errors.password?.message}
        />
        <FormField
          control={control}
          name="password_confirmation"
          type="password"
          label="Confirmar senha"
          placeholder="********"
          icon={LockKeyhole}
          error={errors.password_confirmation?.message}
        />
      </div>
      <Button
        type="submit"
        className="w-full h-10 mt-1 bg-primary text-primary-foreground hover:bg-primary/90 font-medium shadow-lg transition-all duration-200 hover:shadow-xl sm:h-11 sm:mt-2 md:col-span-2"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        Criar conta
      </Button>
    </form>
  );
}
