"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ className, title }: { className?: string; title?: string }) {
  const t = useTranslations("contactForm");
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
        setErrorMsg(data.error || t("errorGeneric"));
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
      setErrorMsg(t("errorConnection"));
    }
  }

  const inputClass =
    "w-full rounded-xl px-4 py-3 focus:outline-none focus:border-[#E63B2E] transition-colors text-sm backdrop-blur-sm";

  const inputStyle = {
    backgroundColor: "var(--form-bg)",
    border: "1px solid var(--form-border)",
    color: "var(--text-primary)",
  };

  if (status === "success") {
    return (
      <div className={`relative z-10 font-['Space_Mono'] flex flex-col items-center justify-center text-center py-12 md:py-16 ${className ?? ""}`}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
          style={{ backgroundColor: "var(--form-success)" }}
        >
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h3
          className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] uppercase tracking-tight mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {t("successTitle")}
        </h3>
        <p className="text-sm md:text-base mb-8 max-w-sm" style={{ color: "var(--text-muted)" }}>
          {t("successMessage")}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs uppercase tracking-widest px-6 py-3 rounded-xl border transition-colors hover:text-[#E63B2E]"
          style={{ borderColor: "var(--border-hover)", color: "var(--text-muted)" }}
        >
          {t("sendAnother")}
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
              {t("nameLabel")}
            </label>
            <input
              type="text"
              id="cf-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder={t("namePlaceholder")}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="cf-email" className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
              {t("emailLabel")}
            </label>
            <input
              type="email"
              id="cf-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              style={inputStyle}
              placeholder={t("emailPlaceholder")}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="cf-phone" className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            {t("phoneLabel")}
          </label>
          <input
            type="tel"
            id="cf-phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder={t("phonePlaceholder")}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="cf-subject" className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            {t("subjectLabel")}
          </label>
          <input
            type="text"
            id="cf-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClass}
            style={inputStyle}
            placeholder={t("subjectPlaceholder")}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="cf-message" className="text-[10px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
            {t("messageLabel")}
          </label>
          <textarea
            id="cf-message"
            rows={4}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} resize-none`}
            style={inputStyle}
            placeholder={t("messagePlaceholder")}
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
            {status === "sending" ? t("sending") : t("submit")}
          </span>
          <span className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 mix-blend-difference" />
        </button>
      </form>
    </div>
  );
}
