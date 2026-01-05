import Link from "next/link";
import { UserPlus } from "lucide-react";
import { FormCard } from "@/components/forms/form-card";
import { RegisterForm } from "./components/register-form";

export default function RegisterPage() {
  return (
    <FormCard
      icon={
        <UserPlus
          className="h-6 w-6 sm:h-7 sm:w-7 text-primary"
          aria-hidden="true"
        />
      }
      title="Criar conta"
      description="Cadastre-se para começar a publicar e acompanhar seus posts."
      footer={
        <>
          <span>Já tem conta?</span>
          <Link
            href="/login"
            className="text-primary hover:underline font-medium transition-colors"
          >
            Faça login
          </Link>
        </>
      }
    >
      <RegisterForm />
    </FormCard>
  );
}
