"use client";

import { useRouter } from "next/navigation";

export default function DeleteVideoButton({ id }: { id: number }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Sigurno obrisati ovaj video?")) return;
    await fetch(`/api/videos/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="text-wine hover:opacity-70">
      Obriši
    </button>
  );
}