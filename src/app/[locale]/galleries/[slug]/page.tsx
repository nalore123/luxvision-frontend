import { notFound } from "next/navigation";
import { getGallery } from "@/lib/api";
import GalleryMasonry from "@/components/GalleryMasonry";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const gallery = await getGallery(slug, locale);

  if (!gallery) return {};

  const title = gallery.meta_title || gallery.title;
  const description = gallery.meta_description || gallery.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: gallery.images[0] ? [gallery.images[0].image] : [],
    },
  };
}

export default async function GalleryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const gallery = await getGallery(slug, locale);

  if (!gallery) notFound();

  return (
    <main className="px-6 py-24 md:px-16">
      <div className="mx-auto max-w-6xl text-center">
        <h1 className="font-display text-4xl italic text-foreground md:text-5xl">
          {gallery.title}
        </h1>
        {gallery.description && (
          <p className="mx-auto mt-4 max-w-2xl font-sans text-foreground/80">
            {gallery.description}
          </p>
        )}
      </div>

      <div className="mx-auto mt-14 max-w-6xl">
        <GalleryMasonry images={gallery.images} galleryTitle={gallery.title} />
      </div>
    </main>
  );
}