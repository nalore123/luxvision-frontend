import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getVideos } from "@/lib/api";
import VideoCard from "@/components/VideoCard";

export default async function VideosPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam ?? "1");

  const t = await getTranslations("nav");
  const { results: videos, next, previous } = await getVideos(locale, page);

  return (
    <main className="px-6 py-24 md:px-16">
      <h1 className="mb-14 text-center font-display text-4xl italic text-foreground md:text-5xl">
        {t("videos")}
      </h1>

      {videos.length === 0 ? (
        <p className="text-center font-sans text-foreground/60">
          Uskoro novi videi.
        </p>
      ) : (
        <>
          <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          <div className="mt-16 flex justify-center gap-6 font-sans text-sm uppercase tracking-[0.2em]">
            {previous && (
              <Link
                href={{ pathname: "/videos", query: { page: page - 1 } }}
                className="border-b border-gold text-gold hover:opacity-70"
              >
                ← Prethodna
              </Link>
            )}
            {next && (
              <Link
                href={{ pathname: "/videos", query: { page: page + 1 } }}
                className="border-b border-gold text-gold hover:opacity-70"
              >
                Sljedeća →
              </Link>
            )}
          </div>
        </>
      )}
    </main>
  );
}