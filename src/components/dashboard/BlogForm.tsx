"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";

interface BlogFormData {
  title_hr: string;
  title_en: string;
  slug_hr: string;
  slug_en: string;
  content_hr: string;
  content_en: string;
  is_published: boolean;
  published_at: string;
}

interface BlogInitialData extends Partial<BlogFormData> {
  featured_image?: string | null;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const inputClasses =
  "w-full border-b border-foreground/20 bg-transparent py-2 text-foreground outline-none focus:border-gold";

export default function BlogForm({
  mode,
  postSlug,
  initialData,
}: {
  mode: "create" | "edit";
  postSlug?: string;
  initialData?: BlogInitialData;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogFormData>(() => ({
    title_hr: initialData?.title_hr ?? "",
    title_en: initialData?.title_en ?? "",
    slug_hr: initialData?.slug_hr ?? "",
    slug_en: initialData?.slug_en ?? "",
    content_hr: initialData?.content_hr ?? "",
    content_en: initialData?.content_en ?? "",
    is_published: initialData?.is_published ?? false,
    published_at: initialData?.published_at?.slice(0, 16) ?? "",
  }));
  const [slugTouchedHr, setSlugTouchedHr] = useState(mode === "edit");
  const [slugTouchedEn, setSlugTouchedEn] = useState(mode === "edit");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      };
      if (name === "title_hr" && !slugTouchedHr) next.slug_hr = slugify(value);
      if (name === "title_en" && !slugTouchedEn) next.slug_en = slugify(value);
      return next;
    });

    if (name === "slug_hr") setSlugTouchedHr(true);
    if (name === "slug_en") setSlugTouchedEn(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "published_at" && !value) return; // prazno = nezakazano, ne šalji
      data.append(key, String(value));
    });
    if (featuredImage) data.append("featured_image", featuredImage);

    const url = mode === "create" ? "/api/blog/posts" : `/api/blog/posts/${postSlug}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(url, { method, body: data });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      setError(JSON.stringify(errorData));
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard/blog");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-gold">Hrvatski</p>
          <input name="title_hr" placeholder="Naslov" value={formData.title_hr} onChange={handleChange} required className={inputClasses} />
          <input name="slug_hr" placeholder="Slug" value={formData.slug_hr} onChange={handleChange} required className={inputClasses} />
          <RichTextEditor
            value={formData.content_hr}
            onChange={(html) => setFormData((prev) => ({ ...prev, content_hr: html }))}
          />
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-gold">English</p>
          <input name="title_en" placeholder="Title" value={formData.title_en} onChange={handleChange} required className={inputClasses} />
          <input name="slug_en" placeholder="Slug" value={formData.slug_en} onChange={handleChange} required className={inputClasses} />
          <RichTextEditor
            value={formData.content_en}
            onChange={(html) => setFormData((prev) => ({ ...prev, content_en: html }))}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-wide text-gold">
          Naslovna slika {mode === "edit" && "(ostavi prazno da zadržiš postojeću)"}
        </p>
        {initialData?.featured_image && (
          <img src={initialData.featured_image} alt="" className="mb-3 h-32 w-auto object-cover" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFeaturedImage(e.target.files?.[0] ?? null)}
          className="font-sans text-sm text-foreground"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="flex items-center gap-2 font-sans text-sm text-foreground/80">
          <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} />
          Objavljeno
        </label>
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-gold">Datum objave</p>
          <input
            type="datetime-local"
            name="published_at"
            value={formData.published_at}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>
      </div>

      {error && <p className="break-all text-sm text-wine">{error}</p>}

      <button type="submit" disabled={isSubmitting} className="bg-gold px-8 py-3 font-sans text-sm uppercase tracking-[0.2em] text-background disabled:opacity-50">
        {isSubmitting ? "Spremam..." : "Spremi"}
      </button>
    </form>
  );
}