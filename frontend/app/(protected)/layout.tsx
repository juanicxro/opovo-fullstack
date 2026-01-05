import { requireAuthToken } from "@/app/actions/auth/session";
import { Navbar } from "@/components/navbar/navbar";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuthToken();

  return (
    <div className="min-h-svh">
      <Navbar />
      {children}
    </div>
  );
}
