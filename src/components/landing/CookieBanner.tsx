"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookies-accepted");
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-3rem)] max-w-lg"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <div
            className="relative rounded-2xl backdrop-blur-xl px-6 py-5 shadow-2xl transition-colors duration-300"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-hover)",
            }}
          >
            <button
              onClick={accept}
              className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:opacity-70"
              style={{ color: "var(--text-muted)" }}
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <Cookie className="w-5 h-5 shrink-0 mt-1" style={{ color: "var(--accent)" }} />

              <div className="flex-1 min-w-0">
                <p className="font-['Space_Grotesk'] font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                  Χρησιμοποιούμε cookies
                </p>
                <p className="font-['Space_Mono'] text-xs leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                  Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας στον ιστότοπό μας.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={accept}
                    className="rounded-xl px-5 py-2 text-xs font-['Space_Mono'] font-medium uppercase tracking-widest text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
                    style={{ backgroundColor: "var(--accent)" }}
                  >
                    Αποδοχη
                  </button>
                  <button
                    onClick={accept}
                    className="rounded-xl px-5 py-2 text-xs font-['Space_Mono'] uppercase tracking-widest transition-all hover:opacity-70"
                    style={{ color: "var(--text-muted)", border: "1px solid var(--border-hover)" }}
                  >
                    Απορριψη
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
