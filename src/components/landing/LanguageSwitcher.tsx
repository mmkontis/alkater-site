"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { ChevronDown, Check } from "lucide-react";

type LocaleCode = "el" | "en" | "de";

const LOCALES: { code: LocaleCode; label: string; full: string; flag: string; aria: string }[] = [
  { code: "el", label: "GR", full: "Ελληνικά", flag: "🇬🇷", aria: "Ελληνικά" },
  { code: "en", label: "EN", full: "English", flag: "🇬🇧", aria: "English" },
  { code: "de", label: "DE", full: "Deutsch", flag: "🇩🇪", aria: "Deutsch" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as LocaleCode;
  const a = useTranslations("a11y");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function switchLocale(newLocale: LocaleCode) {
    setOpen(false);
    if (newLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <div
      ref={rootRef}
      className={`relative inline-block font-['Space_Mono'] text-xs uppercase tracking-[0.12em] ${className ?? ""}`}
      style={{ opacity: isPending ? 0.5 : 1, transition: "opacity 0.3s" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${current.aria} — ${a("changeLanguage")}`}
        className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 transition-all duration-200 hover:scale-105"
        style={{ color: "var(--text-secondary)" }}
      >
        <span aria-hidden="true" className="text-base leading-none">{current.flag}</span>
        <span className="font-bold">{current.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={a("localeSelect")}
          className="absolute right-0 top-full mt-2 min-w-[10rem] rounded-xl border shadow-lg overflow-hidden z-50"
          style={{
            backgroundColor: "var(--nav-bg, #ffffff)",
            borderColor: "var(--accent-border-20, rgba(0,0,0,0.1))",
            backdropFilter: "blur(12px)",
          }}
        >
          {LOCALES.map((l) => {
            const isActive = l.code === locale;
            return (
              <li key={l.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => switchLocale(l.code)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors ${
                    isActive ? "font-bold" : "hover:opacity-100"
                  }`}
                  style={{
                    color: isActive ? "var(--accent, #E63B2E)" : "var(--text-secondary)",
                    backgroundColor: isActive ? "var(--accent-border-20, rgba(230,59,46,0.08))" : "transparent",
                  }}
                >
                  <span aria-hidden="true" className="text-base leading-none">{l.flag}</span>
                  <span className="flex-1">{l.full}</span>
                  {isActive && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
