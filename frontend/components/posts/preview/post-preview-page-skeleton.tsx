import { FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostPreviewSkeleton } from "./post-preview-skeleton";

export function PostPreviewPageSkeleton() {
  return (
    <Card className="mx-auto w-full backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
      <CardHeader className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left pb-3 sm:pb-4 px-4 sm:px-6">
        <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-border/30 bg-card/70 shadow-sm">
          <FileText className="h-6 w-6 sm:h-7 sm:w-7 text-primary/70" aria-hidden="true" />
        </div>
        <div className="space-y-2 w-full">
          <CardTitle>
            <span className="block h-6 w-3/4 rounded-md bg-muted/40 animate-pulse" />
          </CardTitle>
          <CardDescription>
            <span className="block h-4 w-1/2 rounded-md bg-muted/30 animate-pulse" />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <PostPreviewSkeleton />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <div className="h-9 w-24 rounded-md bg-muted/40 animate-pulse" />
        <div className="h-9 w-28 rounded-md bg-muted/30 animate-pulse" />
      </CardFooter>
    </Card>
  );
}
