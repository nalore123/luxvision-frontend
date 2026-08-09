"use client";

import { motion } from "motion/react";

export default function Hero({
  imageUrl,
  subtitle,
}: {
  imageUrl: string | null;
  subtitle: string;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background/80" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-display text-6xl italic tracking-tight text-foreground md:text-8xl"
        >
          LUX Vision
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="mt-4 font-sans text-sm uppercase tracking-[0.3em] text-muted md:text-base"
        >
          {subtitle}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="h-10 w-px animate-pulse bg-gold/60" />
      </motion.div>
    </section>
  );
}