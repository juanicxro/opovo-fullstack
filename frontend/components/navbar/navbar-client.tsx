"use client";

import Link from "next/link";
import { useState } from "react";
import { List } from "lucide-react";
import { LoginForm } from "@/app/(auth)/login/components/login-form";
import { logoutAction } from "@/app/actions/auth";
import { CreatePostDialog } from "@/components/posts/create/create-post-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "../theme-provider/toggle";
import { useRouter } from "next/navigation";

type NavbarClientProps = {
  isAuthenticated: boolean;
};

export function NavbarClient({ isAuthenticated }: NavbarClientProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleRedirectHome = () => router.replace("/");
  const handleRedirectMyPosts = () => router.push("/meus-posts");

  return (
    <header className="w-full border-b border-border/50 bg-muted-foreground backdrop-blur">
      <div className="mx-auto w-full px-10">
        <div className="flex flex-row justify-between h-14 items-center">
          <Button
            onClick={handleRedirectHome}
            className="text-center max-w-20 text-md font-semibold tracking-tight"
          >
            OPOVO
          </Button>
          <div className="relative flex gap-2 justify-end">
            {isAuthenticated ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  aria-label="Meus posts"
                  onClick={handleRedirectMyPosts}
                >
                  <List className="h-5 w-5 text-primary" aria-hidden="true" />
                  <span className="sr-only">Meus posts</span>
                </Button>
                <CreatePostDialog />
                <form action={logoutAction}>
                  <Button
                    className="text-primary "
                    variant="outline"
                    type="submit"
                  >
                    Sair
                  </Button>
                </form>
              </>
            ) : (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button type="button" aria-haspopup="dialog">
                    Entrar
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  side="bottom"
                  sideOffset={12}
                  className="w-[min(90vw,360px)] border-none bg-transparent p-0 shadow-none"
                >
                  <Card className="border-border/60 bg-card/95 shadow-xl backdrop-blur">
                    <CardContent className="pt-4 pb-3">
                      <LoginForm onSuccess={() => setOpen(false)} />
                    </CardContent>
                    <CardFooter className="justify-center gap-1 text-xs text-muted-foreground pt-0">
                      <span>Nao tem conta?</span>
                      <Link
                        href="/register"
                        className="text-primary hover:underline font-medium transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        Criar conta
                      </Link>
                    </CardFooter>
                  </Card>
                </PopoverContent>
              </Popover>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
