import { PostCardSkeleton } from "./post-card-skeleton";
import { buildSkeletonColumns } from "./post-list-layout";

const skeletonColumnCount = 12;

const PostListSkeletonHeader = () => (
  <header className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-border/50 bg-card/80 shadow-xl backdrop-blur" />
    <div className="space-y-2">
      <div className="h-5 w-40 rounded-md bg-muted/40 animate-pulse sm:h-6 sm:w-56" />
      <div className="h-4 w-64 rounded-md bg-muted/30 animate-pulse" />
    </div>
  </header>
);

export function PostListSkeleton() {
  const columns = buildSkeletonColumns(skeletonColumnCount);

  return (
    <section className="space-y-6 sm:space-y-8 ">
      <PostListSkeletonHeader />

      <div className="grid grid-cols-6 gap-3 sm:gap-4">
        {columns.map((column, index) => (
          <div
            key={`skeleton-column-${index}`}
            className="grid auto-rows-[72px] gap-3 sm:auto-rows-[88px] sm:gap-4 lg:auto-rows-[104px]"
          >
            {column.type === "single" ? (
              <PostCardSkeleton className="row-span-2" />
            ) : (
              <>
                <PostCardSkeleton />
                <PostCardSkeleton />
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
