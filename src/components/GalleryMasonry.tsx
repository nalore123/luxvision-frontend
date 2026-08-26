"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { GalleryImage } from "@/types/gallery";

export default function GalleryMasonry({
  images,
  galleryTitle,
}: {
  images: GalleryImage[];
  galleryTitle: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <p className="text-center font-sans text-foreground/60">
        Uskoro nove fotografije.
      </p>
    );
  }

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
        {images.map((image, i) => (
          <button
            key={image.id}
            onClick={() => setOpenIndex(i)}
            className="mb-4 block w-full break-inside-avoid overflow-hidden"
          >
            {image.width && image.height ? (
              <Image
                src={image.image}
                alt={image.alt_text || galleryTitle}
                width={image.width}
                height={image.height}
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full transition-opacity duration-300 hover:opacity-80"
              />
            ) : (
              <img
                src={image.image}
                alt={image.alt_text || galleryTitle}
                loading="lazy"
                className="w-full transition-opacity duration-300 hover:opacity-80"
              />
            )}
          </button>
        ))}
      </div>

      <Lightbox
        open={openIndex !== null}
        index={openIndex ?? 0}
        close={() => setOpenIndex(null)}
        slides={images.map((image) => ({
          src: image.image,
          alt: image.alt_text || galleryTitle,
        }))}
        styles={{
          container: { backgroundColor: "rgba(21, 19, 15, 0.95)" },
        }}
      />
    </>
  );
}