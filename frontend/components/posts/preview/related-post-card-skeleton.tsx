import { Card, CardContent } from "@/components/ui/card";

export function RelatedPostCardSkeleton() {
  return (
    <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-xl">
      <CardContent className="flex flex-col gap-2 p-4 animate-pulse">
        <div className="h-4 w-3/4 rounded bg-muted/40" />
        <div className="h-3 w-1/2 rounded bg-muted/30" />
        <div className="h-3 w-2/3 rounded bg-muted/30" />
      </CardContent>
    </Card>
  );
}
