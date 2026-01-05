import Link from "next/link";
import { LogIn } from "lucide-react";
import { FormCard } from "@/components/forms/form-card";
import { LoginForm } from "./components/login-form";

export default function LoginPage() {
  return (
    <FormCard
      icon={
        <LogIn
          className="h-6 w-6 sm:h-7 sm:w-7 text-primary"
          aria-hidden="true"
        />
      }
      title="Entrar"
      description="Acesse sua conta para gerenciar seus posts."
      footer={
        <>
          <span>Não tem conta?</span>
          <Link
            href="/register"
            className="text-primary hover:underline font-medium transition-colors"
          >
            Crie uma conta
          </Link>
        </>
      }
    >
      <LoginForm />
    </FormCard>
  );
}
