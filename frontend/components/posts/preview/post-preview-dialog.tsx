"use client";

import { useEffect, useState } from "react";
import { FileText, Trash2, X } from "lucide-react";
import { useQueryStates } from "nuqs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { postPreviewQueryState } from "./post-preview-query";
import type { PostPreview } from "../shared/post-types";
import { PostPreviewEditForm } from "./post-preview-edit-form";
import { PostPreviewDetails } from "./post-preview-details";
import { DeletePostDialog } from "../shared/delete-post-dialog";
import { PostPreviewSkeleton } from "./post-preview-skeleton";
import { useDeletePost } from "../shared/hooks/use-delete-post";

type PreviewStatus = "idle" | "loading" | "success" | "error";

type PostPreviewDialogProps = {
  isAuthenticated?: boolean;
};

export function PostPreviewDialog({ isAuthenticated }: PostPreviewDialogProps) {
  const [{ dialog, postId, edit }, setQuery] = useQueryStates(
    postPreviewQueryState
  );
  const [status, setStatus] = useState<PreviewStatus>("idle");
  const [post, setPost] = useState<PostPreview | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const isOpen = Boolean(dialog && postId !== null);
  const canManage = Boolean(isAuthenticated);
  const { isDeleting, deletePost } = useDeletePost({
    onSuccess: () => {
      setIsDeleteDialogOpen(false);
      void setQuery(
        { dialog: null, postId: null, edit: null },
        { history: "replace" }
      );
    },
    onError: () => setIsDeleteDialogOpen(false),
  });

  useEffect(() => {
    if (!isOpen || postId === null) {
      setStatus("idle");
      setPost(null);
      setIsEditing(false);
      setIsDeleteDialogOpen(false);
      return;
    }

    setIsEditing(Boolean(edit) && canManage);

    const controller = new AbortController();
    let isMounted = true;

    const loadPost = async () => {
      setStatus("loading");
      setPost(null);

      try {
        const response = await fetch(`/api/posts/${postId}`, {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = (await response.json()) as PostPreview | null;

        if (!isMounted) {
          return;
        }

        if (!data) {
          setStatus("error");
          return;
        }

        setPost(data);
        setStatus("success");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setStatus("error");
      }
    };

    void loadPost();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [isOpen, postId, edit, canManage]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      return;
    }

    setIsEditing(false);
    setIsDeleteDialogOpen(false);
    void setQuery(
      { dialog: null, postId: null, edit: null },
      { history: "replace" }
    );
  };

  const showActions = canManage && status === "success" && post;

  const handleDelete = async () => {
    if (!post) {
      return;
    }

    await deletePost(post.id);
  };

  const handleDeleteDialogChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="border-none bg-transparent p-0 shadow-none sm:max-w-2xl"
        >
          <Card className="relative mx-auto w-full backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
            <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
              <X />
              <span className="sr-only">Fechar</span>
            </DialogClose>
            <CardHeader className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left pb-3 sm:pb-4 px-4 sm:px-6">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center">
                <FileText
                  className="h-6 w-6 sm:h-7 sm:w-7 text-primary"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-1 w-full">
                <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {post ? (
                    post.title
                  ) : (
                    <span className="block h-6 w-3/4 rounded-md bg-muted/40 animate-pulse" />
                  )}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {post ? (
                    "Previa do post"
                  ) : (
                    <span className="block h-4 w-1/2 rounded-md bg-muted/30 animate-pulse" />
                  )}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 max-h-[65svh] overflow-y-auto">
              {status === "loading" ? <PostPreviewSkeleton /> : null}
              {status === "error" ? (
                <p className="text-sm text-muted-foreground">
                  Nao foi possivel carregar o post.
                </p>
              ) : null}
              {status === "success" && post && !isEditing ? (
                <PostPreviewDetails post={post} />
              ) : null}
              {status === "success" && post && isEditing ? (
                <PostPreviewEditForm
                  post={post}
                  onCancel={() => setIsEditing(false)}
                  onSaved={(updatedPost) => {
                    setPost(updatedPost);
                    setIsEditing(false);
                  }}
                />
              ) : null}
            </CardContent>
            {showActions ? (
              <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing((value) => !value)}
                >
                  {isEditing ? "Voltar" : "Atualizar"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="text-destructive"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  disabled={isDeleting}
                  aria-busy={isDeleting}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Deletar
                </Button>
              </CardFooter>
            ) : null}
          </Card>
        </DialogContent>
      </Dialog>
      <DeletePostDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogChange}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
