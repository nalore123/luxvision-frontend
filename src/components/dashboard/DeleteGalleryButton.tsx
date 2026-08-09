"use client";

import { useRouter } from "next/navigation";

export default function DeleteGalleryButton({ slug }: { slug: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Sigurno obrisati ovu galeriju? Brišu se i sve slike unutra.")) return;
    await fetch(`/api/galleries/${slug}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="text-wine hover:opacity-70">
      Obriši
    </button>
  );
}