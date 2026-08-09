import { NextRequest, NextResponse } from "next/server";
import { authenticatedFetch } from "@/lib/serverApi";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const res = await authenticatedFetch("/galleries/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}