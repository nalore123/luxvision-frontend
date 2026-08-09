import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("aboutPage");

  return (
    <main className="px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-3xl">
        <p className="text-center font-sans text-sm uppercase tracking-[0.3em] text-gold">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 text-center font-display text-4xl italic text-foreground md:text-5xl">
          {t("title")}
        </h1>

        <div className="mx-auto mt-14 space-y-6 font-sans text-base leading-relaxed text-foreground/90 md:text-lg">
          <p className="font-display text-xl italic text-foreground md:text-2xl">
            {t("intro")}
          </p>
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <p>{t("paragraph3")}</p>
          <p>{t("paragraph4")}</p>
          <p className="border-l-2 border-gold pl-5 font-display text-xl italic text-gold md:text-2xl">
            {t("quote")}
          </p>
        </div>
      </div>
    </main>
  );
}