"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(newLocale: "el" | "en") {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <div
      role="group"
      aria-label="Επιλογή γλώσσας"
      className={`inline-flex items-center gap-1 font-['Space_Mono'] text-xs uppercase tracking-[0.12em] ${className ?? ""}`}
      style={{ opacity: isPending ? 0.5 : 1, transition: "opacity 0.3s" }}
    >
      <button
        onClick={() => switchLocale("el")}
        aria-label="Ελληνικά"
        aria-current={locale === "el" ? "true" : undefined}
        className={`px-1.5 py-1 rounded transition-all duration-200 ${locale === "el" ? "font-bold" : "cursor-pointer hover:opacity-100 opacity-50 hover:scale-110"}`}
        style={{ color: locale === "el" ? "var(--accent, #E63B2E)" : "var(--text-muted)" }}
        disabled={locale === "el"}
      >
        GR
      </button>
      <span aria-hidden="true" style={{ color: "var(--text-muted)", opacity: 0.3 }}>|</span>
      <button
        onClick={() => switchLocale("en")}
        aria-label="English"
        aria-current={locale === "en" ? "true" : undefined}
        className={`px-1.5 py-1 rounded transition-all duration-200 ${locale === "en" ? "font-bold" : "cursor-pointer hover:opacity-100 opacity-50 hover:scale-110"}`}
        style={{ color: locale === "en" ? "var(--accent, #E63B2E)" : "var(--text-muted)" }}
        disabled={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
