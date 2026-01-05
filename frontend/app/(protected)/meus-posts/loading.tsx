import { MyPostsTableSkeleton } from "@/components/posts/my-posts/my-posts-table-skeleton";

export default function Loading() {
  return (
    <main className="w-full min-h-[calc(100vh-56px)] px-4 py-6 sm:px-6 sm:py-10 lg:px-10 bg-muted">
      <MyPostsTableSkeleton />
    </main>
  );
}
