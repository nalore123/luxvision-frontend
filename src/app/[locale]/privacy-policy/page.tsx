import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo.privacyPolicy" }); 
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("privacyPolicy");

  const dataCollected = t.raw("dataCollected") as string[];
  const rights = t.raw("rights") as string[];

  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-4xl italic text-foreground md:text-5xl">
        {t("title")}
      </h1>
      <p className="mt-4 font-sans text-sm text-foreground/60">
        {t("lastUpdated")}
      </p>

      <div className="mt-12 space-y-10 font-sans leading-relaxed text-foreground/80">
        <p>{t("intro")}</p>

        <div>
          <h2 className="font-display text-2xl italic text-gold">
            {t("controllerTitle")}
          </h2>
          <p className="mt-3">{t("controllerText")}</p>
        </div>

        <div>
          <h2 className="font-display text-2xl italic text-gold">
            {t("dataCollectedTitle")}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {dataCollected.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl italic text-gold">
            {t("purposeTitle")}
          </h2>
          <p className="mt-3">{t("purposeText")}</p>
        </div>

        <div>
          <h2 className="font-display text-2xl italic text-gold">
            {t("retentionTitle")}
          </h2>
          <p className="mt-3">{t("retentionText")}</p>
        </div>

        <div>
          <h2 className="font-display text-2xl italic text-gold">
            {t("cookiesTitle")}
          </h2>
          <p className="mt-3">{t("cookiesIntro")}</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>{t("cookieAuth")}</li>
            <li>{t("cookieLocale")}</li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl italic text-gold">
            {t("rightsTitle")}
          </h2>
          <p className="mt-3">{t("rightsIntro")}</p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {rights.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-2xl italic text-gold">
            {t("contactTitle")}
          </h2>
          <p className="mt-3">{t("contactText")}</p>
        </div>

        <div>
          <h2 className="font-display text-2xl italic text-gold">
            {t("changesTitle")}
          </h2>
          <p className="mt-3">{t("changesText")}</p>
        </div>
      </div>
    </section>
  );
}