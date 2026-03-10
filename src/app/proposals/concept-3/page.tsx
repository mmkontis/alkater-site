"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LOGO, PHOTOS, BRAND } from "@/lib/photos";

const HIGH_RES_PHOTOS = [
  "/HighRes/image-1772753897780.jpg",
  "/HighRes/image-1772753887996.jpg",
  "/HighRes/image-1772753878297.jpg",
  "/HighRes/image-1772753736848.jpg",
  "/HighRes/image-1772753692358.jpg",
  "/HighRes/image-1772753675852.jpg",
  "/HighRes/image-1772753660495.jpg",
  "/HighRes/image-1772753640619.jpg",
];

export default function Concept3() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Full-bleed hero */}
      <section className="relative h-screen overflow-hidden">
        {active === 0 ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          >
            <source src="/Videos/sample_3-3.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src={HIGH_RES_PHOTOS[active]}
            alt="Hero"
            fill
            className="object-cover transition-all duration-700"
            priority
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Nav */}
        <nav className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-10 py-7">
          <Image src={LOGO} alt="Alkater" width={140} height={46} className="object-contain" />
          <Link href="/proposals" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">← Proposals</Link>
        </nav>

        {/* Copy */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-10 pb-20">
          <span className="text-xs font-semibold uppercase tracking-[0.25em]" style={{ color: BRAND.blue }}>
            Concept 03 — Cinematic Hero
          </span>
          <h1 className="mt-3 max-w-3xl text-5xl font-black leading-none md:text-7xl">
            Κάθε Έργο,<br />μια Ιστορία
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/60">
            Φωτογραφία πρώτης γραμμής που μεταφέρει το μέγεθος και την ποιότητα
            κάθε κατασκευαστικού μας έργου.
          </p>
          <button
            className="mt-8 rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest"
            style={{ background: BRAND.red }}
          >
            Εξερευνήστε τα Έργα
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-8 right-10 z-10 flex gap-2">
          {HIGH_RES_PHOTOS.slice(0, 5).map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-14 w-20 overflow-hidden rounded transition-all ${i === active ? "ring-2 ring-white" : "opacity-50 hover:opacity-100"}`}
            >
              {i === 0 ? (
                <video
                  muted
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                >
                  <source src="/Videos/sample_3-3.mp4" type="video/mp4" />
                </video>
              ) : (
                <Image src={src} alt="" fill className="object-cover" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Below fold */}
      <section className="grid gap-px bg-white/5 md:grid-cols-3">
        {[
          ["Κατασκευές", HIGH_RES_PHOTOS[5]],
          ["Ανακαινίσεις", HIGH_RES_PHOTOS[6]],
          ["Τεχνικά Έργα", HIGH_RES_PHOTOS[7]],
        ].map(([label, src]) => (
          <div key={label} className="group relative h-64 overflow-hidden cursor-pointer">
            <Image src={src as string} alt={label as string} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
            <p className="absolute bottom-6 left-6 text-lg font-bold">{label}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-white/10 px-10 py-6 text-xs text-white/30">
        Concept 03 · Cinematic Hero — <Link href="/proposals" className="underline hover:text-white">Επιστροφή</Link>
      </footer>
    </div>
  );
}
