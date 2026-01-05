"use client";

import { useState } from "react";
import { Eye, PenLine, Search, Trash2 } from "lucide-react";
import { useQueryStates } from "nuqs";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { postPreviewQueryState } from "../preview/post-preview-query";
import { PostPreviewDialog } from "../preview/post-preview-dialog";
import { DeletePostDialog } from "../shared/delete-post-dialog";
import { useDeletePost } from "../shared/hooks/use-delete-post";
import type { PostListItem } from "../shared/post-types";
import { formatPostDate } from "../shared/post-date";
import { useMyPostsQuery } from "./hooks/use-my-posts-query";

const PAGE_SIZE = 8;

type MyPostsTableProps = {
  posts: PostListItem[];
  isAuthenticated?: boolean;
};

export function MyPostsTable({
  posts,
  isAuthenticated,
}: MyPostsTableProps) {
  const [, setPostPreview] = useQueryStates(postPreviewQueryState);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(
    null
  );
  const {
    searchValue,
    filteredPosts,
    pageItems,
    currentPage,
    totalPages,
    handleSearchChange,
    handlePrevPage,
    handleNextPage,
  } = useMyPostsQuery({ posts, pageSize: PAGE_SIZE });
  const { isDeleting, deletePost } = useDeletePost({
    onSuccess: () => setDeleteTargetId(null),
    onError: () => setDeleteTargetId(null),
  });

  const handlePreview = (postId: number) => {
    void setPostPreview(
      { dialog: true, postId, edit: null },
      { history: "push" }
    );
  };

  const handleEdit = (postId: number) => {
    void setPostPreview(
      { dialog: true, postId, edit: true },
      { history: "push" }
    );
  };

  const handleDelete = async () => {
    if (deleteTargetId === null) {
      return;
    }

    void deletePost(deleteTargetId);
  };

  const handleDeleteDialogChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setDeleteTargetId(null);
    }
  };

  return (
    <section className="space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-3 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Meus posts
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Gerencie os posts publicados com sua conta.
          </p>
        </div>
      </header>

      <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
        <CardContent className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Buscar por nome"
                className="pl-9"
                aria-label="Buscar posts por nome"
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {filteredPosts.length} post
              {filteredPosts.length === 1 ? "" : "s"}
            </span>
          </div>

          {pageItems.length > 0 ? (
            <Table>
              <TableHeader className="text-xs uppercase text-muted-foreground">
                <TableRow className="border-border/50">
                  <TableHead className="px-3">Titulo</TableHead>
                  <TableHead className="px-3">Criado em</TableHead>
                  <TableHead className="px-3 text-right">Acoes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-border/50">
                {pageItems.map((post) => (
                  <TableRow
                    key={post.id}
                    className="border-border/50 hover:bg-muted/40"
                  >
                    <TableCell className="px-3 py-3 font-medium whitespace-normal">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/${post.id}`}
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                          onClick={() => handlePreview(post.id)}
                          aria-label={`Preview do post ${post.title}`}
                        >
                          <Eye className="h-4 w-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="px-3 py-3 text-muted-foreground">
                      {post.created_at ? (
                        <time dateTime={post.created_at}>
                          {formatPostDate(post.created_at)}
                        </time>
                      ) : (
                        <span>{formatPostDate(post.created_at)}</span>
                      )}
                    </TableCell>
                    <TableCell className="px-3 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => handleEdit(post.id)}
                        >
                          <PenLine className="h-4 w-4" aria-hidden="true" />
                          Editar
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-2 text-destructive"
                          onClick={() => setDeleteTargetId(post.id)}
                          disabled={
                            isDeleting && deleteTargetId === post.id
                          }
                          aria-busy={
                            isDeleting && deleteTargetId === post.id
                          }
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                          Excluir
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="rounded-md border border-dashed border-border/60 bg-muted/30 px-4 py-10 text-center text-sm text-muted-foreground">
              Nenhum post encontrado com esse nome.
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-muted-foreground">
              Pagina {currentPage} de {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Proximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <PostPreviewDialog isAuthenticated={isAuthenticated} />
      <DeletePostDialog
        open={deleteTargetId !== null}
        onOpenChange={handleDeleteDialogChange}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </section>
  );
}
