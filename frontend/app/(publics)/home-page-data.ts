import { api } from "@/app/server/laravel/client";
import { type PostListItem } from "@/components/posts/list/post-list";

export async function getPosts(): Promise<PostListItem[]> {
  const { ok, data } = await api.get<PostListItem[]>("posts");

  if (!ok || !Array.isArray(data)) {
    return [];
  }

  return data;
}
