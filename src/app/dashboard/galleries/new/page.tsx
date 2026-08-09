import GalleryForm from "@/components/dashboard/GalleryForm";

export default function NewGalleryPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl italic text-foreground">Nova galerija</h1>
        <div className="mt-10">
          <GalleryForm mode="create" />
        </div>
      </div>
    </main>
  );
}