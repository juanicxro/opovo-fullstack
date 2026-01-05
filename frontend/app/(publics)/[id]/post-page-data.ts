import { api } from "@/app/server/laravel/client";
import type {
  PostListItem,
  PostPreview,
} from "@/components/posts/shared/post-types";

export type PostPageParams = {
  id: string;
};

export type PostPageProps = {
  params: Promise<PostPageParams>;
};

export async function getPost(
  id: string
): Promise<PostPreview | null> {
  const { ok, data } = await api.get<PostPreview>(`posts/${id}`);

  if (!ok || !data) {
    return null;
  }

  return data;
}

export async function getRelatedPosts(
  post: PostPreview
): Promise<PostListItem[]> {
  if (!post.author) {
    return [];
  }

  const { ok, data } = await api.get<PostListItem[]>("posts");

  if (!ok || !Array.isArray(data)) {
    return [];
  }

  return data
    .filter(
      (item) => item.author === post.author && item.id !== post.id
    )
    .slice(0, 3);
}
