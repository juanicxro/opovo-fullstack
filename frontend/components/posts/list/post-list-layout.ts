import type { PostListItem } from "../shared/post-types";

export type PostListColumn =
  | { type: "single"; post: PostListItem }
  | { type: "double"; posts: [PostListItem, PostListItem] };

export type PostListSkeletonColumn =
  | { type: "single" }
  | { type: "double" };

const getPostColumnLayoutByIndex = (
  index: number
): PostListSkeletonColumn["type"] => {
  return index % 2 === 0 ? "single" : "double";
};

export function buildPostColumns(posts: PostListItem[]): PostListColumn[] {
  const columns: PostListColumn[] = [];
  let index = 0;
  let columnIndex = 0;

  while (index < posts.length) {
    const post = posts[index];
    const layout = getPostColumnLayoutByIndex(columnIndex);

    if (layout === "double" && index + 1 < posts.length) {
      columns.push({
        type: "double",
        posts: [post, posts[index + 1]],
      });
      index += 2;
      columnIndex += 1;
      continue;
    }

    columns.push({ type: "single", post });
    index += 1;
    columnIndex += 1;
  }

  return columns;
}

export function buildSkeletonColumns(
  count: number
): PostListSkeletonColumn[] {
  return Array.from({ length: count }, (_, index) => ({
    type: getPostColumnLayoutByIndex(index),
  }));
}
