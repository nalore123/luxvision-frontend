import VideoForm from "@/components/dashboard/VideoForm";

export default function NewVideoPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl italic text-foreground">Novi video</h1>
        <div className="mt-10">
          <VideoForm mode="create" />
        </div>
      </div>
    </main>
  );
}