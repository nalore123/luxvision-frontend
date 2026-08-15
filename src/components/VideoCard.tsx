"use client";

import { useState } from "react";
import Image from "next/image";
import type { Video } from "@/types/videos";

export default function VideoCard({ video }: { video: Video }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <div className="relative aspect-video overflow-hidden">
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
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/40 transition-colors duration-500 group-hover:bg-background/20">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/70 bg-background/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
                <div className="ml-1 h-0 w-0 border-y-[8px] border-l-[13px] border-y-transparent border-l-gold" />
              </div>
            </div>
          </button>
        )}
      </div>
      <h2 className="mt-4 font-display text-xl italic text-foreground">
        {video.title}
      </h2>
      {video.description && (
        <p className="mt-1 font-sans text-sm text-foreground/60">
          {video.description}
        </p>
      )}
    </div>
  );
}