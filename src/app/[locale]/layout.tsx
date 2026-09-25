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
    verification: {
      google: "TzYQEsuaL-CzoNuzo6lv4ErfbVD0rU59EJ_pmpNRzjw",
    },
  };
}