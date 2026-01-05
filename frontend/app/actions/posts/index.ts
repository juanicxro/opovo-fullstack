"use server";

import { api } from "@/app/server/laravel/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { CreatePostInput, DeletePostInput, UpdatePostInput } from "./types";
import { handleUnauthorized, requireAuthToken } from "../auth/session";

export async function createPostAction(input: CreatePostInput) {
  const token = await requireAuthToken();

  const { status, data } = await api.post("posts", {
    token,
    body: { title: input.title, content: input.content },
  });

  await handleUnauthorized(status);

  revalidatePath("/");

  return { status, data };
}

export async function updatePostAction(input: UpdatePostInput) {
  const token = await requireAuthToken();

  const { status, data } = await api.put(`posts/${input.id}`, {
    token,
    body: { title: input.title, content: input.content },
  });

  await handleUnauthorized(status);

  revalidatePath(`/${input.id}`);
  revalidatePath("/");

  return { status, data };
}

export async function deletePostAction(input: DeletePostInput) {
  const token = await requireAuthToken();

  const { status, data } = await api.delete(`posts/${input.id}`, {
    token,
  });

  await handleUnauthorized(status);

  revalidatePath("/");
  return { status, data };
}
