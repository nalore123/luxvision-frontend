import { NextRequest, NextResponse } from "next/server";
import { authenticatedFetch } from "@/lib/serverApi";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const res = await authenticatedFetch("/blog/posts/", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}