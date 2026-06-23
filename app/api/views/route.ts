import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page")?.trim();

  if (page) {
    const { data, error } = await supabase
      .from("page_views")
      .select("page, views")
      .eq("page", page)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      page,
      views: data?.views ?? 0,
    });
  }

  const { data, error } = await supabase
    .from("page_views")
    .select("page, views")
    .order("page");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    pages: data ?? [],
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const page =
    typeof body?.page === "string" ? body.page.trim() : "";

  if (!page) {
    return NextResponse.json(
      { error: "page is required" },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("increment_page_view", {
    p_page: page,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    page,
    views: typeof data === "number" ? data : 0,
  });
}
