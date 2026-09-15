"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

export default function Navigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navBarRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navBarRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setNavHeight(entry.contentRect.height);
      }
    });

    observer.observe(navBarRef.current);
    return () => observer.disconnect();
  }, []);

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
    <>
      <nav
        className={`fixed left-0 top-0 z-50 w-full border-b border-muted/20 bg-background transition-transform duration-300 ${
          isVisible || isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          ref={navBarRef}
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-16"
        >
          <Link
            href="/"
            className="font-display text-xl italic text-foreground"
            onClick={() => setIsOpen(false)}
          >
            LUX Vision
          </Link>

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

        {isOpen && (
          <div className="mt-0 flex flex-col gap-6 border-t border-muted/20 px-6 py-6 md:hidden">
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

      <div style={{ height: navHeight }} aria-hidden="true" />
    </>
  );
}