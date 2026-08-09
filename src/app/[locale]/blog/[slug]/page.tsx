import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/api";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);

  if (!post) return {};

  const title = post.meta_title || post.title;
  const description = post.meta_description || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.featured_image ? [post.featured_image] : [],
      type: "article",
      publishedTime: post.published_at || undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug, locale);

  if (!post) notFound();

  return (
    <main className="px-6 py-24 md:px-16">
      <article className="mx-auto max-w-3xl">
        {post.published_at && (
          <p className="text-center font-sans text-xs uppercase tracking-[0.2em] text-gold">
            {new Date(post.published_at).toLocaleDateString(locale, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
        <h1 className="mt-3 text-center font-display text-4xl italic text-foreground md:text-5xl">
          {post.title}
        </h1>

        {post.featured_image && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-invert mt-10 max-w-none font-sans text-foreground/90"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}