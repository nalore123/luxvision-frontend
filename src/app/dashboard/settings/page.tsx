"use client";

import { useState, useEffect } from "react";

interface HeroData {
  image: string | null;
  alt_text_hr: string;
  alt_text_en: string;
  updated_at: string;
}

const inputClasses =
  "w-full border-b border-foreground/20 bg-transparent py-2 text-foreground outline-none focus:border-gold";

export default function HeroSettingsPage() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [altTextHr, setAltTextHr] = useState("");
  const [altTextEn, setAltTextEn] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data: HeroData) => {
        setHero(data);
        setAltTextHr(data.alt_text_hr);
        setAltTextEn(data.alt_text_en);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("alt_text_hr", altTextHr);
    formData.append("alt_text_en", altTextEn);

    const res = await fetch("/api/hero", {
      method: "PATCH",
      body: formData,
    });

    if (res.ok) {
      const data: HeroData = await res.json();
      setHero(data);
      setFile(null);
      setSuccess(true);
    } else {
      setError("Nešto je pošlo po krivu. Provjeri jesi li odabrala sliku i pokušaj ponovno.");
    }

    setSaving(false);
  }

  if (!hero) {
    return (
      <main className="min-h-screen bg-background px-6 py-16 md:px-12">
        <div className="mx-auto max-w-2xl">
          <p className="font-sans text-sm text-foreground/60">Učitavanje...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl italic text-foreground">
          Postavke — Hero sekcija
        </h1>
        <p className="mt-2 font-sans text-sm text-foreground/60">
          Slika koja se prikazuje na naslovnoj stranici, neovisno o galerijama.
        </p>

        {hero.image && (
          <div className="mt-10">
            <p className="text-xs uppercase tracking-wide text-gold">Trenutna slika</p>
            <img src={hero.image} alt={hero.alt_text_hr} className="mt-3 w-full" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-gold">Nova slika</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="block w-full font-sans text-sm text-foreground/80"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wide text-gold">Hrvatski</p>
              <input
                name="alt_text_hr"
                placeholder="Alt tekst"
                value={altTextHr}
                onChange={(e) => setAltTextHr(e.target.value)}
                className={inputClasses}
              />
            </div>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-wide text-gold">English</p>
              <input
                name="alt_text_en"
                placeholder="Alt text"
                value={altTextEn}
                onChange={(e) => setAltTextEn(e.target.value)}
                className={inputClasses}
              />
            </div>
          </div>

          {error && <p className="text-sm text-wine">{error}</p>}
          {success && <p className="text-sm text-gold">Spremljeno.</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-gold px-8 py-3 font-sans text-sm uppercase tracking-[0.2em] text-background disabled:opacity-50"
          >
            {saving ? "Spremanje..." : "Spremi"}
          </button>
        </form>
      </div>
    </main>
  );
}