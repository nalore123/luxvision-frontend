"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Prijava nije uspjela.");
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6"
      >
        <h1 className="text-center font-display text-3xl italic text-foreground">
          LUX Vision — Dashboard
        </h1>

        <input
          type="text"
          placeholder="Korisničko ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full border-b border-foreground/20 bg-transparent py-3 text-foreground outline-none focus:border-gold"
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border-b border-foreground/20 bg-transparent py-3 text-foreground outline-none focus:border-gold"
        />

        {error && <p className="text-sm text-wine">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold py-3 font-sans text-sm uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {isSubmitting ? "Prijava..." : "Prijavi se"}
        </button>
      </form>
    </main>
  );
}