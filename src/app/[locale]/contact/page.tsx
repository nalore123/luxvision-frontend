import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.contact" });
  return {
    title: t("title"),
    description: t("description"),
  };
}


export default async function ContactPage() {
  const t = await getTranslations("nav");
  const tContact = await getTranslations("contact");

  return (
    <main className="px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-4xl italic text-foreground md:text-5xl">
          {t("contact")}
        </h1>
        <p className="mt-4 font-sans text-foreground/70">
          {tContact("intro")}
        </p>
      </div>

      <div className="mt-14">
        <ContactForm />
      </div>
    </main>
  );
}