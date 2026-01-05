import { NextResponse } from "next/server";
import { api } from "@/app/server/laravel/client";

export const dynamic = "force-dynamic";

export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;

  const { status, data } = await api.get(`posts/${id}`);

  return NextResponse.json(data, { status });
}
