import { getAuthToken } from "@/app/actions/auth/session";
import { PostList, type PostListItem } from "@/components/posts/list/post-list";
import { getPosts } from "./home-page-data";

export default async function HomePage() {
  const posts = await getPosts();
  const token = await getAuthToken();

  return (
    <main className="w-full min-h-[calc(100vh-56px)] px-4 py-6 sm:px-6 sm:py-10 lg:px-10 bg-muted">
      <PostList posts={posts} isAuthenticated={Boolean(token)} />
    </main>
  );
}
