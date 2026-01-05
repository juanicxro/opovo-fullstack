import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type FormCardProps = {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function FormCard({
  icon,
  title,
  description,
  children,
  footer,
}: FormCardProps) {
  return (
    <div className="flex min-h-svh items-start justify-center px-3 py-4 sm:items-center sm:px-6 sm:py-6 lg:px-8 overflow-x-hidden">
      <Card className="mx-auto w-full max-w-md backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
        <CardHeader className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left pb-3 sm:pb-4 px-4 sm:px-6">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center">
            {icon}
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold tracking-tight sm:text-2xl">
              {title}
            </CardTitle>
            {description ? (
              <CardDescription className="text-sm sm:text-base">
                {description}
              </CardDescription>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">{children}</CardContent>
        {footer ? (
          <CardFooter className="justify-center gap-1 text-sm text-muted-foreground pt-2 pb-3 sm:pb-4 px-4 sm:px-6">
            {footer}
          </CardFooter>
        ) : null}
      </Card>
    </div>
  );
}
