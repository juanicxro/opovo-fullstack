"use client";

import { Trash2, X } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeletePostDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export function DeletePostDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  title = "Excluir post",
  description = "Essa acao nao pode ser desfeita.",
  confirmLabel = "Excluir",
  cancelLabel = "Cancelar",
}: DeletePostDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="border-none bg-transparent p-0 shadow-none !w-[min(92vw,360px)] !max-w-[min(92vw,360px)]"
      >
        <Card className="relative mx-auto w-full backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
          <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <X />
            <span className="sr-only">Fechar</span>
          </DialogClose>
          <CardHeader className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left pb-3 sm:pb-4 px-4 sm:px-6">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center">
              <Trash2
                className="h-6 w-6 sm:h-7 sm:w-7 text-destructive"
                aria-hidden="true"
              />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
                {title}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end px-4 sm:px-6 pb-4 sm:pb-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
              >
                {cancelLabel}
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="secondary"
              className="text-destructive"
              onClick={onConfirm}
              disabled={isLoading}
              aria-busy={isLoading}
            >
              {confirmLabel}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
