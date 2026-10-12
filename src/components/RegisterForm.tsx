"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface RegisterFormProps {
  plotId: string;
  onBack: () => void;
}

export default function RegisterForm({ plotId, onBack }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // TODO: ჩაანაცვლე რეალური endpoint-ით (Resend / EmailJS / API route)
      await new Promise((r) => setTimeout(r, 1200));
      console.log("Form submitted:", { plotId, name, phone, email, comment });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-8 text-center space-y-3"
      >
        <div className="text-4xl">✓</div>
        <h3 className="font-serif-display text-2xl text-[var(--gold-soft)]">
          მადლობა!
        </h3>
        <p className="text-sm text-[var(--fg)]/70">
          ჩვენ მალე დაგიკავშირდებით {plotId}-ის შესახებ.
        </p>
        <button
          onClick={onBack}
          className="mt-3 text-xs text-[var(--gold)] hover:text-[var(--gold-soft)] transition"
        >
          ← უკან
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="px-6 py-5 space-y-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-[var(--gold)]/70 uppercase tracking-widest">
          რეგისტრაცია
        </p>
        <button
          type="button"
          onClick={onBack}
          className="text-[var(--fg)]/50 hover:text-[var(--gold)] text-xs"
        >
          ← უკან
        </button>
      </div>

      <input
        type="text"
        placeholder="სახელი"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-[var(--gold)]/20
                   text-sm text-[var(--fg)] placeholder:text-[var(--fg)]/30
                   focus:border-[var(--gold)]/60 focus:outline-none transition"
      />

      <input
        type="tel"
        placeholder="ტელეფონი"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-[var(--gold)]/20
                   text-sm text-[var(--fg)] placeholder:text-[var(--fg)]/30
                   focus:border-[var(--gold)]/60 focus:outline-none transition"
      />

      <input
        type="email"
        placeholder="ელფოსტა"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-[var(--gold)]/20
                   text-sm text-[var(--fg)] placeholder:text-[var(--fg)]/30
                   focus:border-[var(--gold)]/60 focus:outline-none transition"
      />

      <textarea
        placeholder="კომენტარი (არასავალდებულო)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-[var(--gold)]/20
                   text-sm text-[var(--fg)] placeholder:text-[var(--fg)]/30
                   focus:border-[var(--gold)]/60 focus:outline-none transition resize-none"
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-2.5 rounded-lg bg-[var(--gold)] text-black font-medium
                   text-sm hover:bg-[var(--gold-soft)] transition disabled:opacity-50"
      >
        {status === "sending" ? "იგზავნება..." : "გაგზავნა"}
      </button>

      {status === "error" && (
        <p className="text-xs text-red-400 text-center">
          შეცდომა. სცადე თავიდან.
        </p>
      )}
    </form>
  );
}