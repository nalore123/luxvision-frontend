export default function Loading() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-background">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full border-2 border-gold/40"
          style={{ animation: "aperture-pulse 2s ease-in-out infinite" }}
        />
        <div
          className="absolute inset-3 rounded-full border border-gold/70"
          style={{ animation: "aperture-pulse 2s ease-in-out infinite 0.3s" }}
        />
        <div className="h-2 w-2 rounded-full bg-gold" />
      </div>

      <div className="text-center">
        <p className="font-display text-2xl italic text-foreground">LUX Vision</p>
        <p className="mt-2 font-sans text-xs uppercase tracking-[0.3em] text-foreground/50">
          Trenutak svjetla...
        </p>
      </div>
    </main>
  );
}