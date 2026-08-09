import Link from "next/link";
import { authenticatedFetch } from "@/lib/serverApi";
import DeleteVideoButton from "@/components/dashboard/DeleteVideoButton";

interface VideoRow {
  id: number;
  title: string;
  is_published: boolean;
}

export default async function DashboardVideosPage() {
  const res = await authenticatedFetch("/videos/?page_size=100", { cache: "no-store" });
  const { results: videos }: { results: VideoRow[] } = await res.json();

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl italic text-foreground">Videi</h1>
          <Link href="/dashboard/videos/new" className="bg-gold px-5 py-2 font-sans text-sm uppercase tracking-[0.2em] text-background">
            + Novi video
          </Link>
        </div>

        <div className="mt-10 divide-y divide-foreground/10">
          {videos.map((video) => (
            <div key={video.id} className="flex items-center justify-between py-4">
              <div>
                <p className="font-display text-lg italic text-foreground">{video.title}</p>
                <p className="text-xs uppercase tracking-wide text-foreground/50">
                  {video.is_published ? "Objavljeno" : "Skica"}
                </p>
              </div>
              <div className="flex gap-4 font-sans text-sm">
                <Link href={`/dashboard/videos/${video.id}/edit`} className="text-gold hover:opacity-70">
                  Uredi
                </Link>
                <DeleteVideoButton id={video.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}