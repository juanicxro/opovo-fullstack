"use client";

import { useState } from "react";
import { FileText, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PostPreview } from "../shared/post-types";
import { PostPreviewEditForm } from "./post-preview-edit-form";
import { PostPreviewDetails } from "./post-preview-details";
import { DeletePostDialog } from "../shared/delete-post-dialog";
import { useDeletePost } from "../shared/hooks/use-delete-post";

type PostPreviewPageProps = {
  post: PostPreview;
  isAuthenticated?: boolean;
};

export function PostPreviewPage({
  post: initialPost,
  isAuthenticated,
}: PostPreviewPageProps) {
  const [post, setPost] = useState<PostPreview>(initialPost);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const canManage = Boolean(isAuthenticated);
  const { isDeleting, deletePost } = useDeletePost({
    redirectTo: "/",
    onSuccess: () => setIsDeleteDialogOpen(false),
    onError: () => setIsDeleteDialogOpen(false),
  });

  const handleDelete = async () => {
    await deletePost(post.id);
  };

  const handleDeleteDialogChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="mx-auto w-full backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
        <CardHeader className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left pb-3 sm:pb-4 px-4 sm:px-6">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center">
            <FileText
              className="h-6 w-6 sm:h-7 sm:w-7 text-primary"
              aria-hidden="true"
            />
          </div>
          <div className="space-y-1 w-full">
            <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
              {post.title}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Previa do post
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          {!isEditing ? (
            <PostPreviewDetails post={post} />
          ) : (
            <PostPreviewEditForm
              post={post}
              onCancel={() => setIsEditing(false)}
              onSaved={(updatedPost) => {
                setPost(updatedPost);
                setIsEditing(false);
              }}
            />
          )}
        </CardContent>
        {canManage ? (
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
      <DeletePostDialog
        open={isDeleteDialogOpen}
        onOpenChange={handleDeleteDialogChange}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}
