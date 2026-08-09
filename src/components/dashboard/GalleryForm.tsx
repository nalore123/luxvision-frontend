"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface GalleryFormData {
  title_hr: string;
  title_en: string;
  slug_hr: string;
  slug_en: string;
  description_hr: string;
  description_en: string;
  is_published: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // makni dijakritiku (č→c, š→s, ž→z...)
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const inputClasses =
  "w-full border-b border-foreground/20 bg-transparent py-2 text-foreground outline-none focus:border-gold";

export default function GalleryForm({
  mode,
  gallerySlug,
  initialData,
}: {
  mode: "create" | "edit";
  gallerySlug?: string;
  initialData?: GalleryFormData;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<GalleryFormData>(() => ({
    title_hr: initialData?.title_hr ?? "",
    title_en: initialData?.title_en ?? "",
    slug_hr: initialData?.slug_hr ?? "",
    slug_en: initialData?.slug_en ?? "",
    description_hr: initialData?.description_hr ?? "",
    description_en: initialData?.description_en ?? "",
    is_published: initialData?.is_published ?? true,
  }));
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugTouchedHr, setSlugTouchedHr] = useState(mode === "edit");
  const [slugTouchedEn, setSlugTouchedEn] = useState(mode === "edit");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => {
      const next = { ...prev, [name]: type === "checkbox" ? checked : value };

      if (name === "title_hr" && !slugTouchedHr) {
        next.slug_hr = slugify(value);
      }
      if (name === "title_en" && !slugTouchedEn) {
        next.slug_en = slugify(value);
      }

      return next;
    });

    if (name === "slug_hr") setSlugTouchedHr(true);
    if (name === "slug_en") setSlugTouchedEn(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const url = mode === "create" ? "/api/galleries" : `/api/galleries/${gallerySlug}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      setError("Nešto je pošlo po krivu. Provjeri jesu li slugovi jedinstveni.");
      setIsSubmitting(false);
      return;
    }

    const data = await res.json();
    const slug = mode === "create" ? data.slug_hr : gallerySlug;
    router.push(`/dashboard/galleries/${slug}/edit`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-gold">Hrvatski</p>
          <input name="title_hr" placeholder="Naslov" value={formData.title_hr} onChange={handleChange} required className={inputClasses} />
          <input name="slug_hr" placeholder="Slug (npr. vjencanja)" value={formData.slug_hr} onChange={handleChange} required className={inputClasses} />
          <textarea name="description_hr" placeholder="Opis" value={formData.description_hr} onChange={handleChange} rows={4} className={inputClasses} />
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-gold">English</p>
          <input name="title_en" placeholder="Title" value={formData.title_en} onChange={handleChange} required className={inputClasses} />
          <input name="slug_en" placeholder="Slug (e.g. weddings)" value={formData.slug_en} onChange={handleChange} required className={inputClasses} />
          <textarea name="description_en" placeholder="Description" value={formData.description_en} onChange={handleChange} rows={4} className={inputClasses} />
        </div>
      </div>

      <label className="flex items-center gap-2 font-sans text-sm text-foreground/80">
        <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} />
        Objavljeno (vidljivo javnosti)
      </label>

      {error && <p className="text-sm text-wine">{error}</p>}

      <button type="submit" disabled={isSubmitting} className="bg-gold px-8 py-3 font-sans text-sm uppercase tracking-[0.2em] text-background disabled:opacity-50">
        {isSubmitting ? "Spremam..." : "Spremi"}
      </button>
    </form>
  );
}