import { Newspaper } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PostCard } from "./post-card";
import { PostPreviewDialog } from "../preview/post-preview-dialog";
import type { PostListItem } from "../shared/post-types";
import { buildPostColumns } from "./post-list-layout";

export type { PostListItem } from "../shared/post-types";

type PostListProps = {
  posts: PostListItem[];
  isAuthenticated?: boolean;
};

const PostListHeader = () => (
  <header className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-border/50 bg-card/80 shadow-xl backdrop-blur">
      <Newspaper
        className="h-6 w-6 sm:h-7 sm:w-7 text-primary"
        aria-hidden="true"
      />
    </div>
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Posts recentes
      </h1>
      <p className="text-sm sm:text-base text-muted-foreground">
        Veja o que a comunidade tem publicado.
      </p>
    </div>
  </header>
);

const PostListEmptyState = () => (
  <Card className="col-span-6 backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
    <CardContent className="px-4 sm:px-6 py-8 text-center text-sm sm:text-base text-muted-foreground">
      Ainda nao ha posts publicados.
    </CardContent>
  </Card>
);

export function PostList({ posts, isAuthenticated }: PostListProps) {
  const columns = buildPostColumns(posts);

  return (
    <section className="space-y-6 sm:space-y-8">
      <PostListHeader />

      <div className="grid grid-cols-6 gap-3 sm:gap-4">
        {posts.length > 0 ? (
          columns.map((column, index) => (
            <div
              key={`column-${index}`}
              className="grid auto-rows-[72px] gap-3 sm:auto-rows-[88px] sm:gap-4 lg:auto-rows-[104px]"
            >
              {column.type === "single" ? (
                <PostCard post={column.post} className="row-span-2" />
              ) : (
                column.posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
              )}
            </div>
          ))
        ) : (
          <PostListEmptyState />
        )}
      </div>
      <PostPreviewDialog isAuthenticated={isAuthenticated} />
    </section>
  );
}
