import Link from "next/link";
import { Calendar, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { formatPostDate } from "../shared/post-date";
import type { PostListItem } from "../shared/post-types";

type RelatedPostCardProps = {
  post: PostListItem;
};

export function RelatedPostCard({ post }: RelatedPostCardProps) {
  const formattedDate = formatPostDate(post.created_at ?? null);

  return (
    <Link href={`/${post.id}`} className="block">
      <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-border/70">
        <CardContent className="flex flex-col gap-2 p-4">
          <CardTitle className="text-sm font-semibold tracking-tight sm:text-base">
            {post.title}
          </CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <User className="h-3 w-3" aria-hidden="true" />
              {post.author ?? "Autor desconhecido"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {post.created_at ? (
                <time dateTime={post.created_at}>{formattedDate}</time>
              ) : (
                <span>{formattedDate}</span>
              )}
            </span>
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
