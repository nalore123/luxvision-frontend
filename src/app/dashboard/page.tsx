import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

const SECTIONS = [
  { href: "/dashboard/galleries", label: "Galerije", description: "Upravljaj galerijama i slikama" },
  { href: "/dashboard/videos", label: "Videi", description: "Dodaj i uredi videe" },
  { href: "/dashboard/blog", label: "Blog", description: "Piši i uređuj blog objave" },
  { href: "/dashboard/messages", label: "Poruke", description: "Pregledaj kontakt upite" },
  { href: "/dashboard/settings", label: "Postavke", description: "Promijeni naslovnu (hero) sliku" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl italic text-foreground">
            LUX Vision — Dashboard
          </h1>
          <LogoutButton />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="block border border-foreground/10 p-6 transition-colors hover:border-gold"
            >
              <h2 className="font-display text-xl italic text-foreground">
                {section.label}
              </h2>
              <p className="mt-2 font-sans text-sm text-foreground/60">
                {section.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}