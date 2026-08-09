import { notFound } from "next/navigation";
import { authenticatedFetch } from "@/lib/serverApi";
import GalleryForm from "@/components/dashboard/GalleryForm";
import ImageManager from "@/components/dashboard/ImageManager";

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await authenticatedFetch(`/galleries/${slug}/admin_detail/`, {
    cache: "no-store",
  });

  if (!res.ok) notFound();
  const gallery = await res.json();

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl space-y-16">
        <div>
          <h1 className="font-display text-3xl italic text-foreground">Uredi galeriju</h1>
          <div className="mt-10">
            <GalleryForm mode="edit" gallerySlug={slug} initialData={gallery} />
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl italic text-foreground">Slike</h2>
          <div className="mt-6">
            <ImageManager gallerySlug={slug} initialImages={gallery.images} />
          </div>
        </div>
      </div>
    </main>
  );
}