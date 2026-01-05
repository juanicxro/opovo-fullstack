import { Newspaper } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden flex-1 bg-blue-200 lg:block">
        <div className="flex h-full flex-col items-center justify-center px-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/30 bg-white/40 shadow-lg backdrop-blur">
            <Newspaper
              className="h-7 w-7 text-primary"
              aria-hidden="true"
            />
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight">
            OPOVO
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Teste Prático <br /> FullStack Pleno
          </p>
        </div>
      </div>
      <div className="flex-1 text-foreground">{children}</div>
    </div>
  );
}
