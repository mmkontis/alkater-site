"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Map, X } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { useTranslations } from "next-intl";

export function ContactSection() {
  const t = useTranslations("contact");

  const MAP_THEMES = [
    {
      name: t("mapThemeDark"),
      tiles: "dark",
      filter: "none",
    },
    {
      name: t("mapThemeRed"),
      tiles: "dark",
      filter: "sepia(0.4) hue-rotate(-10deg) saturate(1.5)",
    },
    {
      name: t("mapThemeBlue"),
      tiles: "dark",
      filter: "sepia(0.3) hue-rotate(180deg) saturate(1.3)",
    },
    {
      name: t("mapThemeGreen"),
      tiles: "dark",
      filter: "sepia(0.3) hue-rotate(90deg) saturate(1.3)",
    },
    {
      name: t("mapThemeClassic"),
      tiles: "voyager",
      filter: "none",
    },
  ];
  const [showMap, setShowMap] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendTheme = (index: number) => {
    const theme = MAP_THEMES[index];
    iframeRef.current?.contentWindow?.postMessage(
      { type: "setTheme", tiles: theme.tiles, filter: theme.filter },
      "*"
    );
  };

  useEffect(() => {
    if (showMap) {
      const timer = setTimeout(() => sendTheme(themeIndex), 500);
      return () => clearTimeout(timer);
    }
  }, [showMap]);

  const handleThemeChange = (i: number) => {
    setThemeIndex(i);
    sendTheme(i);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 font-['Space_Grotesk'] overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: "var(--surface-tinted)" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--border-color),transparent_50%)]"></div>
      <div className="absolute inset-0 transition-colors duration-500 pointer-events-none" style={{ backgroundColor: "var(--tint-subtle)" }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-8 h-[2px]" style={{ backgroundColor: "var(--text-muted)" }}></span>
                <span className="font-['Space_Mono'] uppercase tracking-widest text-sm" style={{ color: "var(--text-muted)" }}>{t("sectionLabel")}</span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase mb-8 leading-[1.1]" style={{ color: "var(--text-primary)" }}>
                {t("titleMain")} <br/>
                <span className="text-[#E63B2E]">{t("titleAccent")}</span>
              </h2>

              <p className="font-['Space_Mono'] text-base md:text-lg leading-relaxed mb-12 max-w-md" style={{ color: "var(--text-muted)" }}>
                {t("description")}
              </p>
            </div>

            <div className="space-y-8 mt-auto">
              <a
                href="mailto:alkater2024@outlook.com"
                className="group flex items-center gap-6 p-6 rounded-2xl transition-colors"
                style={{ backgroundColor: "var(--contact-card-bg)", border: "1px solid var(--border-color)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: "var(--border-color)", color: "var(--text-muted)" }}>
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-['Space_Mono'] text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>{t("emailLabel")}</p>
                  <p className="font-['Space_Mono'] text-sm md:text-base" style={{ color: "var(--text-primary)" }}>alkater2024@outlook.com</p>
                </div>
                <ArrowUpRight className="ml-auto w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" style={{ color: "var(--text-muted)" }} />
              </a>

              <div
                className="flex items-center gap-6 p-6 rounded-2xl"
                style={{ backgroundColor: "var(--contact-card-bg)", border: "1px solid var(--border-color)" }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--border-color)", color: "var(--text-muted)" }}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-['Space_Mono'] text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>{t("hqLabel")}</p>
                  <p className="font-['Space_Mono'] text-sm md:text-base" style={{ color: "var(--text-primary)" }}>{t("hqValue")}</p>
                </div>
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl transition-colors font-['Space_Mono'] text-xs uppercase tracking-widest hover:text-[#E63B2E]"
                  style={{ border: "1px solid var(--border-hover)", color: "var(--text-muted)" }}
                >
                  {showMap ? <X className="w-4 h-4" /> : <Map className="w-4 h-4" />}
                  {showMap ? t("closeMap") : t("openMap")}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 md:p-12 rounded-3xl relative overflow-hidden border"
            style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-hover)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" style={{ backgroundColor: "var(--accent-8)" }}></div>

            <ContactForm title={t("formTitle")} />
          </motion.div>

        </div>

        {/* Inline map */}
        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "min(450px, 60vh)" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="mt-12 rounded-3xl overflow-hidden relative"
              style={{ border: "1px solid var(--border-hover)" }}
            >
              <iframe
                ref={iframeRef}
                src="/map.html"
                className="w-full h-full border-0"
                loading="lazy"
                title="Leaflet map"
              />

              {/* Theme toggle buttons */}
              <div className="absolute top-4 right-4 z-10 flex gap-2 flex-wrap justify-end">
                {MAP_THEMES.map((t, i) => (
                  <button
                    key={t.name}
                    onClick={() => handleThemeChange(i)}
                    className={`px-3 py-2 min-h-[36px] rounded-lg font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all duration-300 backdrop-blur-sm ${
                      i === themeIndex
                        ? "bg-[#E63B2E] text-white border border-[#E63B2E]"
                        : "bg-black/60 text-white/70 border border-white/20 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>

              {/* Location label */}
              <div className="absolute bottom-4 left-4 z-10 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-sm border border-white/20 font-['Space_Mono'] text-xs text-white/80 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E63B2E]" />
                {t("hqValue")}
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowMap(false)}
                aria-label="Κλείσιμο χάρτη"
                className="absolute top-4 left-4 z-10 w-9 h-9 rounded-xl bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-[#E63B2E]/50 transition-all"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
