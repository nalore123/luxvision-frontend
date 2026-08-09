"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import type { ContactFormData } from "@/types/contact";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full border-b border-foreground/20 bg-transparent py-3 font-sans text-foreground placeholder:text-foreground/40 outline-none transition-colors focus:border-gold";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState<ContactFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.status === 429) {
        setErrorMessage(t("errorRateLimit"));
        setStatus("error");
        return;
      }

      if (!res.ok) {
        setErrorMessage(t("errorGeneric"));
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ first_name: "", last_name: "", email: "", phone: "", message: "" });
    } catch {
      setErrorMessage(t("errorNetwork"));
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-center font-display text-2xl italic text-gold">
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <input
          name="first_name"
          placeholder={t("firstName")}
          value={formData.first_name}
          onChange={handleChange}
          required
          className={inputClasses}
        />
        <input
          name="last_name"
          placeholder={t("lastName")}
          value={formData.last_name}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>

      <input
        type="email"
        name="email"
        placeholder={t("email")}
        value={formData.email}
        onChange={handleChange}
        required
        className={inputClasses}
      />

      <input
        name="phone"
        placeholder={t("phone")}
        value={formData.phone}
        onChange={handleChange}
        className={inputClasses}
      />

      <textarea
        name="message"
        placeholder={t("message")}
        value={formData.message}
        onChange={handleChange}
        rows={5}
        required
        className={`${inputClasses} resize-none`}
      />

      {status === "error" && (
        <p className="font-sans text-sm text-wine">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-gold py-4 font-sans text-sm uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-85 disabled:opacity-50"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}