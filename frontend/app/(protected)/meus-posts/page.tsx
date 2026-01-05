import { getMyPosts } from "./my-posts-data";
import { MyPostsTable } from "@/components/posts/my-posts/my-posts-table";

export default async function MyPostsPage() {
  const posts = await getMyPosts();

  return (
    <main className="w-full min-h-[calc(100vh-56px)] px-4 py-6 sm:px-6 sm:py-10 lg:px-10 bg-muted">
      <MyPostsTable posts={posts} isAuthenticated />
    </main>
  );
}
