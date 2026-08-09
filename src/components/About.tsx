"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function About() {
  const t = useTranslations("about");

  return (
    <section className="bg-background px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative aspect-[4/5] w-full overflow-hidden"
        >
          <Image
            src="/images/luka-portrait.jpg"
            alt="Luka, LUX Vision"
            fill
            className="object-cover object-[center_25%]"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 font-display text-4xl italic text-foreground md:text-5xl">
            {t("title")}
          </h2>
          <div className="mt-6 space-y-5 font-sans text-base leading-relaxed text-foreground/90 md:text-lg">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
            <p>{t("paragraph3")}</p>
            <p className="border-l-2 border-gold pl-5 font-display text-xl italic text-gold md:text-2xl">
              {t("quote")}
            </p>
            <Link
              href="/about"
              className="inline-block border-b border-gold pb-1 font-sans text-sm uppercase tracking-[0.2em] text-gold transition-opacity hover:opacity-70"
            >
              {t("readMore")}
            </Link>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}