import { getTranslations } from "next-intl/server";
import { getGalleries, getHeroSection } from "@/lib/api";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Signature from "@/components/Signature";
import GalleryPreview from "@/components/GalleryPreview";
import { getVideos } from "@/lib/api";
import VideoPreview from "@/components/VideoPreview";
import CTASection from "@/components/CTASection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const galleries = await getGalleries(locale);
  const { results: videos } = await getVideos(locale);
  const featuredVideo = videos[0] ?? null;

  const hero = await getHeroSection();
  const heroAlt = locale === "hr" ? hero.alt_text_hr : hero.alt_text_en;

  return (
    <main>
      <Hero imageUrl={hero.image} imageAlt={heroAlt} subtitle={t("heroSubtitle")} />
      <About />
      <Signature />
      <GalleryPreview galleries={galleries} />
      <VideoPreview video={featuredVideo} />
      <CTASection />
    </main>
  );
}