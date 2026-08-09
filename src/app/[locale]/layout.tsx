import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";
import Navigation from "@/components/Navigation";
import { Fraunces, Inter } from "next/font/google";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";


const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    metadataBase: new URL("https://luxvision.hr"),
    title: {
      default: "LUX Vision — Luka Kosić | Fotograf i snimatelj, otok Krk",
      template: "%s | LUX Vision",
    },
    description:
      locale === "hr"
        ? "Profesionalna fotografija i videografija za vjenčanja, evente i kreativne projekte na otoku Krku i šire."
        : "Professional photography and videography for weddings, events, and creative projects on the island of Krk and beyond.",
    alternates: {
      languages: {
        hr: "/hr",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: "LUX Vision",
      locale: locale === "hr" ? "hr_HR" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "hr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${fraunces.variable} ${inter.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <StructuredData />
          <Navigation />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}