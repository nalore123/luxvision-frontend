"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function MessageRow({ message }: { message: Message }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isRead, setIsRead] = useState(message.is_read);

  async function handleOpen() {
    setIsOpen((prev) => !prev);
    if (!isRead) {
      setIsRead(true);
      await fetch(`/api/contact/messages/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: true }),
      });
      router.refresh();
    }
  }

  async function handleDelete() {
    if (!confirm("Obrisati ovu poruku?")) return;
    await fetch(`/api/contact/messages/${message.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="border-b border-foreground/10 py-4">
      <button onClick={handleOpen} className="flex w-full items-center justify-between text-left">
        <div className="flex items-center gap-3">
          {!isRead && <span className="h-2 w-2 rounded-full bg-gold" />}
          <div>
            <p className="font-display text-lg italic text-foreground">
              {message.first_name} {message.last_name}
            </p>
            <p className="text-xs text-foreground/50">
              {new Date(message.created_at).toLocaleString("hr-HR")}
            </p>
          </div>
        </div>
        <span className="font-sans text-xs uppercase tracking-wide text-gold">
          {isOpen ? "Zatvori" : "Otvori"}
        </span>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2 border-l-2 border-gold pl-4 font-sans text-sm text-foreground/80">
          <p><strong className="text-foreground">Email:</strong> {message.email}</p>
          {message.phone && <p><strong className="text-foreground">Telefon:</strong> {message.phone}</p>}
          <p className="whitespace-pre-wrap">{message.message}</p>
          <button onClick={handleDelete} className="mt-3 text-wine hover:opacity-70">
            Obriši poruku
          </button>
        </div>
      )}
    </div>
  );
}