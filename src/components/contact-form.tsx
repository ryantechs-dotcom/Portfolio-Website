"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { site } from "@/data/site";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white/70 px-4 py-3 text-sm placeholder:text-zinc-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950/40";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) throw new Error("EmailJS env vars are not set");
      // Same template params the EmailJS template already expects.
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: data.get("name"),
          from_email: data.get("email"),
          message: data.get("message"),
          name: "Ryan",
        },
        { publicKey: PUBLIC_KEY },
      );
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Name" aria-label="Name" className={inputClass} />
        <input name="email" type="email" required placeholder="Email" aria-label="Email" className={inputClass} />
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Message"
        aria-label="Message"
        className={`${inputClass} resize-none`}
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-gradient-brand rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p role="status" className="text-sm text-zinc-600 dark:text-zinc-400">
          {status === "sent" && "Thanks! I'll get back to you soon."}
          {status === "error" && (
            <>
              Something went wrong. Email me at{" "}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
