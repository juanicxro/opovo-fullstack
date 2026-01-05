import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const skeletonRows = Array.from({ length: 6 });

export function MyPostsTableSkeleton() {
  return (
    <section className="space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-3 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div className="space-y-2">
          <div className="h-6 w-40 rounded-md bg-muted/40 animate-pulse sm:h-7 sm:w-52" />
          <div className="h-4 w-56 rounded-md bg-muted/30 animate-pulse" />
        </div>
      </header>

      <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
        <CardContent className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-10 w-full rounded-md bg-muted/40 animate-pulse sm:max-w-xs" />
            <div className="h-4 w-16 rounded-md bg-muted/30 animate-pulse" />
          </div>

          <Table>
            <TableHeader className="text-xs uppercase text-muted-foreground">
              <TableRow className="border-border/50">
                <TableHead className="px-3">Titulo</TableHead>
                <TableHead className="px-3">Criado em</TableHead>
                <TableHead className="px-3 text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border/50">
              {skeletonRows.map((_, index) => (
                <TableRow
                  key={`my-posts-skeleton-${index}`}
                  className="border-border/50"
                >
                  <TableCell className="px-3 py-3">
                    <div className="h-4 w-3/4 rounded bg-muted/40 animate-pulse" />
                  </TableCell>
                  <TableCell className="px-3 py-3">
                    <div className="h-3 w-2/3 rounded bg-muted/30 animate-pulse" />
                  </TableCell>
                  <TableCell className="px-3 py-3 text-right">
                    <div className="ml-auto h-8 w-24 rounded bg-muted/30 animate-pulse" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-4 w-24 rounded-md bg-muted/30 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 w-20 rounded-md bg-muted/40 animate-pulse" />
              <div className="h-8 w-20 rounded-md bg-muted/30 animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
