"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { Calendar, Eye, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPostDate } from "../shared/post-date";
import type { PostListItem } from "../shared/post-types";
import { postPreviewQueryState } from "../preview/post-preview-query";

type PostCardProps = {
  post: PostListItem;
  className?: string;
};

export function PostCard({ post, className }: PostCardProps) {
  const formattedDate = formatPostDate(post.created_at);
  const router = useRouter();
  const [, setPostPreview] = useQueryStates(postPreviewQueryState);

  const handlePreview = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    void setPostPreview(
      { dialog: true, postId: post.id, edit: null },
      { history: "push" }
    );
  };

  const handleNavigate = () => {
    router.push(`/${post.id}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigate();
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      className={cn(
        "group block text-left w-full cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
        className
      )}
      aria-label={`Abrir post ${post.title}`}
    >
      <Card className="h-full backdrop-blur-xl bg-card/80 border-border/50 shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-border/70">
        <CardContent className="flex h-full flex-col gap-2 p-3 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-semibold tracking-tight sm:text-base">
              <span className="transition-colors group-hover:text-primary">
                {post.title}
              </span>
            </CardTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-primary"
              onClick={handlePreview}
              aria-label={`Preview do post ${post.title}`}
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <CardDescription className="mt-auto flex flex-col gap-1 text-[11px] sm:text-xs">
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
    </div>
  );
}
