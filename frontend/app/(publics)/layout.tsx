import { Navbar } from "@/components/navbar/navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-svh">
      <Navbar />
      {children}
    </div>
  );
}
