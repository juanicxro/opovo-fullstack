"use client";

import { useState } from "react";
import { PenLine, Plus, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreatePostForm } from "./create-post-form";

export function CreatePostDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" aria-label="Novo post">
          <Plus className="h-8 w-8 text-primary" aria-hidden="true" />
          <span className="sr-only">Novo post</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="border-none bg-transparent p-0 shadow-none sm:max-w-xl"
      >
        <Card className="relative mx-auto w-full backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
          <DialogClose className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <X />
            <span className="sr-only">Fechar</span>
          </DialogClose>
          <CardHeader className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left pb-3 sm:pb-4 px-4 sm:px-6">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center">
              <PenLine
                className="h-6 w-6 sm:h-7 sm:w-7 text-primary"
                aria-hidden="true"
              />
            </div>
            <div className="space-y-1">
              <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
                Novo post
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Compartilhe um post com a comunidade.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <CreatePostForm onSuccess={() => setOpen(false)} />
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
