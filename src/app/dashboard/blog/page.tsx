import Link from "next/link";
import { authenticatedFetch } from "@/lib/serverApi";
import DeleteBlogButton from "@/components/dashboard/DeleteBlogButton";

interface PostRow {
  id: number;
  title: string;
  slug: string;
  published_at: string | null;
}

export default async function DashboardBlogPage() {
  const res = await authenticatedFetch("/blog/posts/?page_size=100", { cache: "no-store" });
  const { results: posts }: { results: PostRow[] } = await res.json();

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl italic text-foreground">Blog</h1>
          <Link href="/dashboard/blog/new" className="bg-gold px-5 py-2 font-sans text-sm uppercase tracking-[0.2em] text-background">
            + Nova objava
          </Link>
        </div>

        <div className="mt-10 divide-y divide-foreground/10">
          {posts.map((post) => (
            <div key={post.id} className="flex items-center justify-between py-4">
              <div>
                <p className="font-display text-lg italic text-foreground">{post.title}</p>
                <p className="text-xs uppercase tracking-wide text-foreground/50">
                  {post.published_at ? "Objavljeno" : "Skica"}
                </p>
              </div>
              <div className="flex gap-4 font-sans text-sm">
                <Link href={`/dashboard/blog/${post.slug}/edit`} className="text-gold hover:opacity-70">
                  Uredi
                </Link>
                <DeleteBlogButton slug={post.slug} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}