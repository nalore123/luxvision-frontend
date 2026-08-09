"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CTASection() {
  const t = useTranslations("ctaSection");

  return (
    <section className="border-y border-gold/20 bg-background px-6 py-20 md:px-16 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-display text-4xl italic text-foreground md:text-5xl">
          {t("title")}
        </h2>
        <p className="mt-4 font-sans text-foreground/70 md:text-lg">
          {t("subtitle")}
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-block bg-gold px-10 py-4 font-sans text-sm uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-85"
        >
          {t("button")}
        </Link>
      </motion.div>
    </section>
  );
}