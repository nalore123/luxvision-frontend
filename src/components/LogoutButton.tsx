"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/dashboard/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="font-sans text-sm uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-gold"
    >
      Odjava
    </button>
  );
}