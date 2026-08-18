"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  const navLinks = [
    { href: "/about", label: t("about") },
    { href: "/galleries", label: t("gallery") },
    { href: "/videos", label: t("videos") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <nav className="border-b border-muted/20 bg-background px-6 py-4 md:px-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl italic text-foreground"
          onClick={() => setIsOpen(false)}
        >
          LUX Vision
        </Link>

        {/* Desktop nav — vidljivo tek od md breakpointa naviše */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop jezik switcher */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => switchLocale("hr")}
            className={`font-sans text-sm ${
              locale === "hr" ? "text-gold" : "text-foreground/60"
            }`}
          >
            HR
          </button>
          <span className="text-foreground/30">/</span>
          <button
            onClick={() => switchLocale("en")}
            className={`font-sans text-sm ${
              locale === "en" ? "text-gold" : "text-foreground/60"
            }`}
          >
            EN
          </button>
        </div>

        {/* Hamburger gumb — vidljiv samo ispod md breakpointa */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile meni — otvara se ispod navbara kad je isOpen true */}
      {isOpen && (
        <div className="mt-6 flex flex-col gap-6 border-t border-muted/20 pt-6 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-sans text-sm uppercase tracking-[0.15em] text-foreground/80"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                switchLocale("hr");
                setIsOpen(false);
              }}
              className={`font-sans text-sm ${
                locale === "hr" ? "text-gold" : "text-foreground/60"
              }`}
            >
              HR
            </button>
            <span className="text-foreground/30">/</span>
            <button
              onClick={() => {
                switchLocale("en");
                setIsOpen(false);
              }}
              className={`font-sans text-sm ${
                locale === "en" ? "text-gold" : "text-foreground/60"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}