import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getGalleries } from "@/lib/api";

export default async function GalleriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("nav");
  const galleries = await getGalleries(locale);

  return (
    <main className="px-6 py-24 md:px-16">
      <h1 className="mb-14 text-center font-display text-4xl italic text-foreground md:text-5xl">
        {t("gallery")}
      </h1>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {galleries.map((gallery) => (
          <Link
            key={gallery.id}
            href={`/galleries/${gallery.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden"
          >
            {gallery.cover_image && (
              <Image
                src={gallery.cover_image.image}
                alt={gallery.cover_image.alt_text || gallery.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <h2 className="p-5 font-display text-xl italic text-foreground md:text-2xl">
                {gallery.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}