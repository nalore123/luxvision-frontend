"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { GalleryListItem } from "@/types/gallery";

export default function GalleryPreview({
  galleries,
}: {
  galleries: GalleryListItem[];
}) {
  const t = useTranslations("galleryPreview");
  const preview = galleries.slice(0, 6);

  if (preview.length === 0) return null;

  return (
    <section className="bg-background px-6 py-10 md:px-16 md:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-6xl text-center"
      >
        <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold">
          {t("eyebrow")}
        </p>
        <h2 className="mt-4 font-display text-4xl italic text-foreground md:text-5xl">
          {t("title")}
        </h2>
      </motion.div>

      <div className="mx-auto mt-10 max-w-6xl grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {preview.map((gallery, i) => (
          <motion.div
            key={gallery.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: "easeOut" }}
          >
            <Link
              href={`/galleries/${gallery.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden"
            >
              {gallery.cover_image && (
                <Image
                  src={gallery.cover_image.image}
                  alt={gallery.cover_image.alt_text || gallery.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-background/80 via-background/0 to-background/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="p-5 font-display text-xl italic text-foreground md:text-2xl">
                  {gallery.title}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/galleries"
          className="inline-block border-b border-gold pb-1 font-sans text-sm uppercase tracking-[0.2em] text-gold transition-opacity hover:opacity-70"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}