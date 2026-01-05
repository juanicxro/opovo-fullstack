"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deletePostAction } from "@/app/actions/posts";

type UseDeletePostOptions = {
  onSuccess?: () => void;
  onError?: (message: string) => void;
  refreshOnSuccess?: boolean;
  redirectTo?: string;
};

export function useDeletePost(options: UseDeletePostOptions = {}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const deletePost = async (postId: number) => {
    setIsDeleting(true);

    try {
      const { status, data } = await deletePostAction({ id: postId });

      if (status >= 200 && status < 300) {
        toast.success("Post deletado com sucesso.");
        options.onSuccess?.();

        if (options.redirectTo) {
          router.push(options.redirectTo);
        }

        if (options.refreshOnSuccess !== false) {
          router.refresh();
        }

        return true;
      }

      const message =
        typeof (data as { message?: string } | null)?.message === "string"
          ? (data as { message?: string }).message ??
            "Nao foi possivel deletar o post."
          : "Nao foi possivel deletar o post.";
      toast.error(message);
      options.onError?.(message);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    deletePost,
  };
}
