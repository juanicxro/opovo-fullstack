import { Calendar, User } from "lucide-react";
import { formatPostDate } from "../shared/post-date";
import type { PostPreview } from "../shared/post-types";

type PostPreviewDetailsProps = {
  post: PostPreview;
};

export function PostPreviewDetails({ post }: PostPreviewDetailsProps) {
  const formattedDate = formatPostDate(post.created_at ?? null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <User className="h-3.5 w-3.5" aria-hidden="true" />
          {post.author ?? "Autor desconhecido"}
        </span>
        <span className="inline-flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
          {post.created_at ? (
            <time dateTime={post.created_at}>{formattedDate}</time>
          ) : (
            <span>{formattedDate}</span>
          )}
        </span>
      </div>
      <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
}
