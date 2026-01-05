import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type PostCardSkeletonProps = HTMLAttributes<HTMLDivElement>;

export function PostCardSkeleton({
  className,
  ...props
}: PostCardSkeletonProps) {
  return (
    <Card
      className={cn(
        "backdrop-blur-xl bg-card/60 border-border/50 shadow-xl",
        className
      )}
      {...props}
    >
      <CardContent className="flex h-full flex-col gap-2 p-3 sm:p-4 animate-pulse">
        <div className="h-4 w-3/4 rounded-md bg-muted/50" />
        <div className="mt-auto space-y-2">
          <div className="h-3 w-1/2 rounded bg-muted/40" />
          <div className="h-3 w-2/3 rounded bg-muted/40" />
        </div>
      </CardContent>
    </Card>
  );
}
