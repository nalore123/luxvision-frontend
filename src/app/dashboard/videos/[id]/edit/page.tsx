import { notFound } from "next/navigation";
import { authenticatedFetch } from "@/lib/serverApi";
import VideoForm from "@/components/dashboard/VideoForm";

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await authenticatedFetch(`/videos/${id}/admin_detail/`, { cache: "no-store" });

  if (!res.ok) notFound();
  const video = await res.json();

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl italic text-foreground">Uredi video</h1>
        <div className="mt-10">
          <VideoForm mode="edit" videoId={Number(id)} initialData={video} />
        </div>
      </div>
    </main>
  );
}