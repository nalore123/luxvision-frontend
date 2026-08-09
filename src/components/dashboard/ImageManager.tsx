"use client";

import { useState } from "react";

interface ManagedImage {
  id: number;
  image: string;
  order: number;
}

export default function ImageManager({
  gallerySlug,
  initialImages,
}: {
  gallerySlug: string;
  initialImages: ManagedImage[];
}) {
  const [images, setImages] = useState(
    [...initialImages].sort((a, b) => a.order - b.order)
  );
  const [file, setFile] = useState<File | null>(null);
  const [altHr, setAltHr] = useState("");
  const [altEn, setAltEn] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("alt_text_hr", altHr);
    formData.append("alt_text_en", altEn);
    formData.append("order", String(images.length));

    const res = await fetch(`/api/galleries/${gallerySlug}/images`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      setError("Upload nije uspio. Provjeri veličinu (max 15MB) i format slike.");
      setIsUploading(false);
      return;
    }

    const newImage = await res.json();
    setImages((prev) => [...prev, newImage]);
    setFile(null);
    setAltHr("");
    setAltEn("");
    setIsUploading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Obrisati ovu sliku?")) return;
    await fetch(`/api/galleries/${gallerySlug}/images/${id}`, { method: "DELETE" });
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  async function saveOrder(newImages: ManagedImage[]) {
    setImages(newImages);
    const payload = newImages.map((img, index) => ({ id: img.id, order: index }));
    await fetch(`/api/galleries/${gallerySlug}/images/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const next = [...images];
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
    saveOrder(next);
  }

  function moveDown(index: number) {
    if (index === images.length - 1) return;
    const next = [...images];
    [next[index], next[index + 1]] = [next[index + 1], next[index]];
    saveOrder(next);
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {images.map((img, index) => (
          <div key={img.id} className="space-y-2">
            <img src={img.image} alt="" className="aspect-square w-full object-cover" />
            <div className="flex justify-between text-xs">
              <button onClick={() => moveUp(index)} disabled={index === 0} className="text-gold disabled:opacity-30">↑</button>
              <button onClick={() => moveDown(index)} disabled={index === images.length - 1} className="text-gold disabled:opacity-30">↓</button>
              <button onClick={() => handleDelete(img.id)} className="text-wine">Obriši</button>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleUpload} className="space-y-4 border-t border-foreground/10 pt-8">
        <p className="font-sans text-sm uppercase tracking-wide text-gold">Dodaj sliku</p>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required className="block font-sans text-sm text-foreground" />
        <div className="grid gap-4 sm:grid-cols-2">
          <input placeholder="Alt tekst (HR)" value={altHr} onChange={(e) => setAltHr(e.target.value)} className="border-b border-foreground/20 bg-transparent py-2 text-foreground outline-none focus:border-gold" />
          <input placeholder="Alt text (EN)" value={altEn} onChange={(e) => setAltEn(e.target.value)} className="border-b border-foreground/20 bg-transparent py-2 text-foreground outline-none focus:border-gold" />
        </div>
        {error && <p className="text-sm text-wine">{error}</p>}
        <button type="submit" disabled={isUploading} className="bg-gold px-6 py-2 font-sans text-sm uppercase tracking-[0.2em] text-background disabled:opacity-50">
          {isUploading ? "Uploadam..." : "Upload"}
        </button>
      </form>
    </div>
  );
}