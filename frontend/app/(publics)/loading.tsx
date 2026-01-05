import { PostListSkeleton } from "@/components/posts/list/post-list-skeleton";

export default function Loading() {
  return (
    <main className="w-full px-4 py-6 sm:px-6 sm:py-10 lg:px-10 overflow-hidden">
      <PostListSkeleton />
    </main>
  );
}
