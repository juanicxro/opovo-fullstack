import { api } from "@/app/server/laravel/client";
import {
  handleUnauthorized,
  requireAuthToken,
} from "@/app/actions/auth/session";
import type { PostListItem } from "@/components/posts/shared/post-types";

export async function getMyPosts(): Promise<PostListItem[]> {
  const token = await requireAuthToken();
  const { ok, data, status } = await api.get<PostListItem[]>("posts/mine", {
    token,
  });

  await handleUnauthorized(status);

  if (!ok || !Array.isArray(data)) {
    return [];
  }

  return data;
}
