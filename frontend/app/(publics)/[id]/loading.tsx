import { PostPreviewPageSkeleton } from "@/components/posts/preview/post-preview-page-skeleton";
import { RelatedPostCardSkeleton } from "@/components/posts/preview/related-post-card-skeleton";

const relatedSkeletons = Array.from({ length: 3 });

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="w-full max-w-2xl mx-auto">
          <PostPreviewPageSkeleton />
        </div>
        <aside className="space-y-3">
          <div className="h-4 w-40 rounded bg-muted/40 animate-pulse" />
          <div className="grid gap-4">
            {relatedSkeletons.map((_, index) => (
              <RelatedPostCardSkeleton key={`related-skel-${index}`} />
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
