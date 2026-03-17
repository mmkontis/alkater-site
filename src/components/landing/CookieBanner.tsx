"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ExternalLink } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(false);
  };

  return (
    <>
      <AnimatePresence>
        {visible && !showModal && (
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
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-70"
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

                  {/* Desktop: full text */}
                  <p className="hidden sm:block font-['Space_Mono'] text-xs leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                    Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας στον ιστότοπό μας.
                  </p>

                  {/* Mobile: learn more link */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="sm:hidden flex items-center gap-1.5 font-['Space_Mono'] text-xs mb-4 hover:opacity-80 transition-opacity"
                    style={{ color: "var(--accent)" }}
                  >
                    Μαθετε περισσοτερα
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={accept}
                      className="w-full rounded-xl px-5 py-3 text-xs font-['Space_Mono'] font-medium uppercase tracking-widest text-white transition-all hover:scale-[1.03] active:scale-[0.97]"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      Αποδοχη
                    </button>
                    <button
                      onClick={accept}
                      className="w-full rounded-xl px-5 py-3 text-xs font-['Space_Mono'] uppercase tracking-widest transition-all hover:opacity-70"
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

      {/* Fullscreen cookie modal (mobile) */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex flex-col"
            style={{ fontFamily: "'Space Grotesk', sans-serif", backgroundColor: "var(--bg-primary)" }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "var(--border-color)" }}>
              <div className="flex items-center gap-3">
                <Cookie className="w-5 h-5" style={{ color: "var(--accent)" }} />
                <h2 className="font-['Space_Grotesk'] font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                  Cookies
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
                style={{ color: "var(--text-muted)" }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
              <div>
                <h3 className="font-['Space_Grotesk'] font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>
                  Τι ειναι τα cookies;
                </h3>
                <p className="font-['Space_Mono'] text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Τα cookies είναι μικρά αρχεία κειμένου που αποθηκεύονται στη συσκευή σας
                  όταν επισκέπτεστε έναν ιστότοπο. Μας βοηθούν να κατανοήσουμε πώς
                  χρησιμοποιείτε τον ιστότοπό μας.
                </p>
              </div>

              <div>
                <h3 className="font-['Space_Grotesk'] font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>
                  Πως τα χρησιμοποιουμε;
                </h3>
                <p className="font-['Space_Mono'] text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Χρησιμοποιούμε cookies για να βελτιώσουμε την εμπειρία σας στον ιστότοπό μας,
                  να αναλύσουμε την επισκεψιμότητα και να προσαρμόσουμε το περιεχόμενο
                  στις ανάγκες σας.
                </p>
              </div>

              <div>
                <h3 className="font-['Space_Grotesk'] font-semibold text-base mb-3" style={{ color: "var(--text-primary)" }}>
                  Οι επιλογες σας
                </h3>
                <p className="font-['Space_Mono'] text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  Μπορείτε να αποδεχτείτε ή να απορρίψετε τα cookies. Η απόρριψη μπορεί
                  να επηρεάσει ορισμένες λειτουργίες του ιστοτόπου.
                </p>
              </div>
            </div>

            <div className="px-6 py-6 border-t space-y-3" style={{ borderColor: "var(--border-color)" }}>
              <button
                onClick={accept}
                className="w-full rounded-xl px-5 py-4 text-sm font-['Space_Mono'] font-medium uppercase tracking-widest text-white transition-all active:scale-[0.97]"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Αποδοχη
              </button>
              <button
                onClick={accept}
                className="w-full rounded-xl px-5 py-4 text-sm font-['Space_Mono'] uppercase tracking-widest transition-all active:scale-[0.97]"
                style={{ color: "var(--text-muted)", border: "1px solid var(--border-hover)" }}
              >
                Απορριψη
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
