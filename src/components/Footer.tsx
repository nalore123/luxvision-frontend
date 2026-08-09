"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CONTACT = {
    email: "lukaksc@gmail.com",
    phone: "+385 91 522 6932",
    instagram: "https://www.instagram.com/lukakosic.ph/",
    instagramHandle: "@lukakosic.ph",
};

export default function Footer() {
    const t = useTranslations("footer");
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-gold/20 bg-background px-6 py-16 md:px-16">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
                <div>
                    <p className="font-display text-2xl italic text-foreground">
                        LUX Vision
                    </p>
                    <p className="mt-3 font-sans text-sm text-foreground/60">
                        {t("tagline")}
                    </p>
                </div>

                <div className="font-sans text-sm text-foreground/80">
                    <p className="uppercase tracking-[0.2em] text-gold">{t("email")}</p>

                    <a href={`mailto:${CONTACT.email}`}
                        className="mt-2 inline-block transition-colors hover:text-gold"
                    >
                        {CONTACT.email}
                    </a>
                    <p className="mt-4 uppercase tracking-[0.2em] text-gold">
                        {t("phone")}
                    </p>

                    <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                        className="mt-2 inline-block transition-colors hover:text-gold"
                    >
                        {CONTACT.phone}
                    </a>
                </div>

                <div className="font-sans text-sm text-foreground/80">
                    <p className="uppercase tracking-[0.2em] text-gold">Instagram</p>

                    <a href={CONTACT.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block transition-colors hover:text-gold"
                    >
                        {CONTACT.instagramHandle}
                    </a>
                    <div className="mt-6 flex flex-col gap-2 text-foreground/60">
                        <Link href="/galleries" className="w-fit hover:text-gold">
                            Galerije
                        </Link>
                        <Link href="/videos" className="w-fit hover:text-gold">
                            Videi
                        </Link>
                        <Link href="/blog" className="w-fit hover:text-gold">
                            Blog
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-12 max-w-6xl border-t border-gold/10 pt-6 text-center font-sans text-xs text-foreground/40">
                © {year} LUX Vision — Luka Kosić. {t("rights")}
            </div>
        </footer>
    );
}