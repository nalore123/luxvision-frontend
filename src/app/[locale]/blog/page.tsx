import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBlogPosts } from "@/lib/api";

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  const page = Number(pageParam ?? "1");

  const t = await getTranslations("nav");
  const { results: posts, next, previous } = await getBlogPosts(locale, page);

  return (
    <main className="px-6 py-24 md:px-16">
      <h1 className="mb-14 text-center font-display text-4xl italic text-foreground md:text-5xl">
        {t("blog")}
      </h1>

      {posts.length === 0 ? (
        <p className="text-center font-sans text-foreground/60">
          Uskoro novi članci.
        </p>
      ) : (
        <>
          <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {post.featured_image && (
                    <Image
                      src={post.featured_image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-gold">
                  {post.published_at &&
                    new Date(post.published_at).toLocaleDateString(locale, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                </p>
                <h2 className="mt-2 font-display text-2xl italic text-foreground transition-colors group-hover:text-gold">
                  {post.title}
                </h2>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex justify-center gap-6 font-sans text-sm uppercase tracking-[0.2em]">
            {previous && (
              <Link
                href={{ pathname: "/blog", query: { page: page - 1 } }}
                className="border-b border-gold text-gold hover:opacity-70"
              >
                ← Prethodna
              </Link>
            )}
            {next && (
              <Link
                href={{ pathname: "/blog", query: { page: page + 1 } }}
                className="border-b border-gold text-gold hover:opacity-70"
              >
                Sljedeća →
              </Link>
            )}
          </div>
        </>
      )}
    </main>
  );
}