export function PostPreviewSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 w-24 rounded bg-muted/40" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-muted/30" />
        <div className="h-3 w-5/6 rounded bg-muted/30" />
        <div className="h-3 w-4/6 rounded bg-muted/30" />
      </div>
    </div>
  );
}
