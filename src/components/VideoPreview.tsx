"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Video } from "@/types/videos";

export default function VideoPreview({ video }: { video: Video | null }) {
  const t = useTranslations("videoPreview");
  const [isPlaying, setIsPlaying] = useState(false);

  if (!video) return null;

  return (
    <section className="bg-background px-6 py-16 md:px-16 md:py-20">
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

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="relative mx-auto mt-14 aspect-video max-w-4xl overflow-hidden"
      >
        {isPlaying && video.embed_url ? (
          <iframe
            src={`${video.embed_url}?autoplay=1`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0 h-full w-full"
          >
            <Image
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/40 transition-colors duration-500 group-hover:bg-background/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/70 bg-background/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-gold" />
              </div>
            </div>
          </button>
        )}
      </motion.div>

      {video.title && (
        <p className="mx-auto mt-6 max-w-4xl text-center font-display text-xl italic text-foreground/90">
          {video.title}
        </p>
      )}

      <div className="mt-14 text-center">
        <Link
          href="/videos"
          className="inline-block border-b border-gold pb-1 font-sans text-sm uppercase tracking-[0.2em] text-gold transition-opacity hover:opacity-70"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}