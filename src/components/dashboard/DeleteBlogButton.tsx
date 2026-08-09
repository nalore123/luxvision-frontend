"use client";

import { useRouter } from "next/navigation";

export default function DeleteBlogButton({ slug }: { slug: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Sigurno obrisati ovaj blog post?")) return;
    await fetch(`/api/blog/posts/${slug}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="text-wine hover:opacity-70">
      Obriši
    </button>
  );
}