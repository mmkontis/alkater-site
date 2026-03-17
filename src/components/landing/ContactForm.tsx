"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ className, title }: { className?: string; title?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Κάτι πήγε στραβά.");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
      setErrorMsg("Αποτυχία σύνδεσης. Δοκιμάστε ξανά.");
    }
  }

  const inputClass =
    "w-full rounded-xl px-4 py-3 focus:outline-none focus:border-[#E63B2E] transition-colors text-sm backdrop-blur-sm";

  const inputStyle = {
    backgroundColor: "color-mix(in srgb, var(--bg-primary) 80%, var(--tint, #1B6B9E))",
    border: "1px solid color-mix(in srgb, var(--tint, #1B6B9E) 20%, var(--border-hover))",
    color: "var(--text-primary)",
  };

  if (status === "success") {
    return (
      <div className={`relative z-10 font-['Space_Mono'] flex flex-col items-center justify-center text-center py-12 md:py-16 ${className ?? ""}`}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "color-mix(in srgb, #22c55e 15%, var(--bg-primary))" }}
        >
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3
          className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] uppercase tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Ευχαριστουμε!
        </h3>
        <p className="text-sm md:text-base mb-8 max-w-sm" style={{ color: "var(--text-muted)" }}>
          Το μήνυμά σας στάλθηκε επιτυχώς. Θα επικοινωνήσουμε μαζί σας σύντομα.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs uppercase tracking-widest px-6 py-3 rounded-xl border transition-colors hover:text-[#E63B2E]"
          style={{ borderColor: "var(--border-hover)", color: "var(--text-muted)" }}
        >
          Στειλτε νεο μηνυμα
        </button>
      </div>
    );
  }

  return (
    <div className={className ?? ""}>
      {title && (
        <h3 className="text-xl font-bold font-['Space_Grotesk'] uppercase tracking-tight mb-8" style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>
      )}
      <form
        className="space-y-5 relative z-10 font-['Space_Mono']"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label htmlFor="cf-name" className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Ονοματεπωνυμο *
            </label>
            <input
              type="text"
              id="cf-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="π.χ. Γιάννης Παπαδόπουλος"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="cf-email" className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              Email *
            </label>
            <input
              type="email"
              id="cf-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder="π.χ. email@example.com"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="cf-phone" className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Τηλεφωνο
          </label>
          <input
            type="tel"
            id="cf-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="π.χ. 69XXXXXXXX"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="cf-subject" className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Θεμα
          </label>
          <input
            type="text"
            id="cf-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder="Τι αφορά το μήνυμά σας;"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="cf-message" className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            Μηνυμα *
          </label>
          <textarea
            id="cf-message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} resize-none`}
            style={inputStyle}
            placeholder="Περιγράψτε το έργο ή το αίτημά σας..."
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-500">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-[#E63B2E] px-8 py-4 text-sm font-['Space_Mono'] uppercase tracking-widest text-white hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className="relative z-10">
            {status === "sending" ? "Αποστολη..." : "Αποστολη Μηνυματος"}
          </span>
          <span className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 mix-blend-difference" />
        </button>
      </form>
    </div>
  );
}
