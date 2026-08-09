import Link from "next/link";
import { authenticatedFetch } from "@/lib/serverApi";
import DeleteGalleryButton from "@/components/dashboard/DeleteGalleryButton";

interface GalleryRow {
  id: number;
  title: string;
  slug: string;
  is_published: boolean;
}

export default async function DashboardGalleriesPage() {
  const res = await authenticatedFetch("/galleries/", { cache: "no-store" });
  const galleries: GalleryRow[] = await res.json();

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl italic text-foreground">Galerije</h1>
          <Link
            href="/dashboard/galleries/new"
            className="bg-gold px-5 py-2 font-sans text-sm uppercase tracking-[0.2em] text-background"
          >
            + Nova galerija
          </Link>
        </div>

        <div className="mt-10 divide-y divide-foreground/10">
          {galleries.map((gallery) => (
            <div key={gallery.id} className="flex items-center justify-between py-4">
              <div>
                <p className="font-display text-lg italic text-foreground">{gallery.title}</p>
                <p className="text-xs uppercase tracking-wide text-foreground/50">
                  {gallery.is_published ? "Objavljeno" : "Skica"}
                </p>
              </div>
              <div className="flex gap-4 font-sans text-sm">
                <Link href={`/dashboard/galleries/${gallery.slug}/edit`} className="text-gold hover:opacity-70">
                  Uredi
                </Link>
                <DeleteGalleryButton slug={gallery.slug} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}