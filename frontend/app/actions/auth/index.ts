"use server";

import { api } from "@/app/server/laravel/client";
import {
  AuthErrorResponse,
  LoginInput,
  LoginSuccessResponse,
  RegisterInput,
  RegisterSuccessResponse,
} from "./types";
import { clearAuthToken, setAuthToken } from "./session";
import { redirect } from "next/navigation";

export async function registerAction(input: RegisterInput) {
  const { status, data } = await api.post<
    RegisterSuccessResponse | AuthErrorResponse
  >("auth/register", {
    body: input,
  });

  return { status, data };
}

export async function loginAction(input: LoginInput) {
  const { status, data } = await api.post<
    LoginSuccessResponse | AuthErrorResponse
  >("auth/login", {
    body: input,
  });

  const token =
    status >= 200 && status < 300 && data && "token" in data
      ? data.token
      : null;

  if (token) {
    await setAuthToken(token);
  }

  if (status === 401) {
    await clearAuthToken();
  }

  return { status, data: status >= 400 ? data : null };
}

export async function logoutAction() {
  await clearAuthToken();
  redirect("/login");
}
