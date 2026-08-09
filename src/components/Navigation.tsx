"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem 2rem", borderBottom: "1px solid #eee" }}>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link href="/">LUX Vision</Link>
        <Link href="/about">{t("about")}</Link>
        <Link href="/galleries">{t("gallery")}</Link>
        <Link href="/videos">{t("videos")}</Link>
        <Link href="/blog">{t("blog")}</Link>
        <Link href="/contact">{t("contact")}</Link>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          onClick={() => switchLocale("hr")}
          style={{ fontWeight: locale === "hr" ? "bold" : "normal" }}
        >
          HR
        </button>
        <button
          onClick={() => switchLocale("en")}
          style={{ fontWeight: locale === "en" ? "bold" : "normal" }}
        >
          EN
        </button>
      </div>
    </nav>
  );
}