import { notFound } from "next/navigation";
import { getAuthToken } from "@/app/actions/auth/session";
import { PostPreviewPage } from "@/components/posts/preview/post-preview-page";
import { RelatedPostCard } from "@/components/posts/preview/related-post-card";
import {
  getPost,
  getRelatedPosts,
  type PostPageProps,
} from "./post-page-data";

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  const token = await getAuthToken();
  const relatedPosts = await getRelatedPosts(post);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="w-full max-w-2xl mx-auto">
          <PostPreviewPage post={post} isAuthenticated={Boolean(token)} />
        </div>
        {relatedPosts.length > 0 ? (
          <aside className="space-y-3">
            <h2 className="text-sm font-semibold tracking-tight text-muted-foreground">
              Mais do mesmo autor
            </h2>
            <div className="grid gap-4">
              {relatedPosts.map((item) => (
                <RelatedPostCard key={item.id} post={item} />
              ))}
            </div>
          </aside>
        ) : null}
      </div>
    </main>
  );
}
