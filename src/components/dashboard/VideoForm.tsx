"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface VideoInitialData {
  id?: number;
  title_hr: string;
  title_en: string;
  description_hr: string;
  description_en: string;
  platform: string;
  video_url: string;
  is_published: boolean;
}

const inputClasses =
  "w-full border-b border-foreground/20 bg-transparent py-2 text-foreground outline-none focus:border-gold";

export default function VideoForm({
  mode,
  videoId,
  initialData,
}: {
  mode: "create" | "edit";
  videoId?: number;
  initialData?: VideoInitialData;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<VideoInitialData>(() => ({
    title_hr: initialData?.title_hr ?? "",
    title_en: initialData?.title_en ?? "",
    description_hr: initialData?.description_hr ?? "",
    description_en: initialData?.description_en ?? "",
    platform: initialData?.platform ?? "youtube",
    video_url: initialData?.video_url ?? "",
    is_published: initialData?.is_published ?? true,
  }));
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, String(value));
    });
    if (thumbnail) data.append("thumbnail", thumbnail);

    const url = mode === "create" ? "/api/videos" : `/api/videos/${videoId}`;
    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(url, { method, body: data });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      setError(JSON.stringify(errorData));
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard/videos");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-gold">Hrvatski</p>
          <input name="title_hr" placeholder="Naslov" value={formData.title_hr} onChange={handleChange} required className={inputClasses} />
          <textarea name="description_hr" placeholder="Opis" value={formData.description_hr} onChange={handleChange} rows={3} className={inputClasses} />
        </div>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-gold">English</p>
          <input name="title_en" placeholder="Title" value={formData.title_en} onChange={handleChange} required className={inputClasses} />
          <textarea name="description_en" placeholder="Description" value={formData.description_en} onChange={handleChange} rows={3} className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <select name="platform" value={formData.platform} onChange={handleChange} className={inputClasses}>
          <option value="youtube">YouTube</option>
          <option value="vimeo">Vimeo</option>
        </select>
        <input name="video_url" placeholder="Link na video" value={formData.video_url} onChange={handleChange} required className={inputClasses} />
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-wide text-gold">
          Thumbnail {mode === "edit" && "(ostavi prazno da zadržiš postojeći)"}
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setThumbnail(e.target.files?.[0] ?? null)}
          required={mode === "create"}
          className="font-sans text-sm text-foreground"
        />
      </div>

      <label className="flex items-center gap-2 font-sans text-sm text-foreground/80">
        <input type="checkbox" name="is_published" checked={formData.is_published} onChange={handleChange} />
        Objavljeno
      </label>

      {error && <p className="text-sm text-wine">{error}</p>}

      <button type="submit" disabled={isSubmitting} className="bg-gold px-8 py-3 font-sans text-sm uppercase tracking-[0.2em] text-background disabled:opacity-50">
        {isSubmitting ? "Spremam..." : "Spremi"}
      </button>
    </form>
  );
}