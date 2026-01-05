import { getAuthToken } from "@/app/actions/auth/session";
import { NavbarClient } from "@/components/navbar/navbar-client";

export async function Navbar() {
  const token = await getAuthToken();
  const isAuthenticated = Boolean(token);

  return <NavbarClient isAuthenticated={isAuthenticated} />;
}
