import BlogForm from "@/components/dashboard/BlogForm";

export default function NewBlogPostPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl italic text-foreground">Nova blog objava</h1>
        <div className="mt-10">
          <BlogForm mode="create" />
        </div>
      </div>
    </main>
  );
}