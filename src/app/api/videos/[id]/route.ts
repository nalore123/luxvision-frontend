import { NextRequest, NextResponse } from "next/server";
import { authenticatedFetch } from "@/lib/serverApi";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const formData = await request.formData();

  const res = await authenticatedFetch(`/videos/${id}/`, {
    method: "PATCH",
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await authenticatedFetch(`/videos/${id}/`, { method: "DELETE" });

  if (res.status === 204) return new NextResponse(null, { status: 204 });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}