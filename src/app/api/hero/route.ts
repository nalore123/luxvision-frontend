import { NextRequest, NextResponse } from "next/server";
import { authenticatedFetch } from "@/lib/serverApi";

export async function GET() {
  const res = await authenticatedFetch("/hero/manage/", { method: "GET" });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(request: NextRequest) {
  const formData = await request.formData();

  const res = await authenticatedFetch("/hero/manage/", {
    method: "PATCH",
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}