import { NextRequest, NextResponse } from "next/server";
import { authenticatedFetch } from "@/lib/serverApi";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const formData = await request.formData();

  const res = await authenticatedFetch(`/galleries/${slug}/images/`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}