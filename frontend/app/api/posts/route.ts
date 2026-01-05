import { NextResponse } from "next/server";
import { api } from "@/app/server/laravel/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const { status, data } = await api.get("posts");

  return NextResponse.json(data, { status });
}
