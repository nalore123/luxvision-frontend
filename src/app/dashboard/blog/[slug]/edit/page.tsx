import { notFound } from "next/navigation";
import { authenticatedFetch } from "@/lib/serverApi";
import BlogForm from "@/components/dashboard/BlogForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await authenticatedFetch(`/blog/posts/${slug}/admin_detail/`, { cache: "no-store" });

  if (!res.ok) notFound();
  const post = await res.json();

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl italic text-foreground">Uredi objavu</h1>
        <div className="mt-10">
          <BlogForm mode="edit" postSlug={slug} initialData={post} />
        </div>
      </div>
    </main>
  );
}