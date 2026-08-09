import { NextRequest, NextResponse } from "next/server";
import { authenticatedFetch } from "@/lib/serverApi";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const res = await authenticatedFetch("/videos/", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}