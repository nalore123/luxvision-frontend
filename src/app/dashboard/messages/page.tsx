import { authenticatedFetch } from "@/lib/serverApi";
import MessageRow from "@/components/dashboard/MessageRow";

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

export default async function DashboardMessagesPage() {
  const res = await authenticatedFetch("/contact/messages/", { cache: "no-store" });
  const messages: Message[] = await res.json();

  return (
    <main className="min-h-screen bg-background px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl italic text-foreground">Poruke</h1>

        {messages.length === 0 ? (
          <p className="mt-10 font-sans text-foreground/60">Nema poruka.</p>
        ) : (
          <div className="mt-10">
            {messages.map((message) => (
              <MessageRow key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}