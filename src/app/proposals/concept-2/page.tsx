import Image from "next/image";
import Link from "next/link";
import { LOGO, PHOTOS } from "@/lib/photos";

const HIGH_RES_PHOTOS = [
  "/HighRes/image-1772753897780.jpg",
  "/HighRes/image-1772753887996.jpg",
  "/HighRes/image-1772753878297.jpg",
  "/HighRes/image-1772753736848.jpg",
  "/HighRes/image-1772753692358.jpg",
];

export default function Concept2() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-white/10 px-8 py-5">
        <Image src={LOGO} alt="Alkater" width={150} height={50} className="object-contain" />
        <Link href="/proposals" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">← Πίσω</Link>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-8 py-28 min-h-[600px] flex flex-col justify-center">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
          >
            <source src="/Videos/sample_3-3.mp4" type="video/mp4" />
          </video>
          {/* Dark gradient overlay to blend video with background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent" />
        </div>

        {/* Big diagonal teal accent */}
        <div
          className="pointer-events-none absolute -right-32 top-0 z-10 h-full w-96 opacity-15"
          style={{ background: "#004868", transform: "skewX(-12deg)" }}
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 z-10 h-64 w-64 opacity-10"
          style={{ background: "#A00000", transform: "skewX(-12deg)" }}
        />

        <div className="relative z-20">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#004868]">
            Concept 01 — Industrial Bold
          </span>
          <h1 className="mt-4 max-w-2xl text-6xl font-black leading-none tracking-tight md:text-8xl">
            ΧΤΙΖΟΥΜΕ<br />
            <span style={{ color: "#A00000" }}>ΤΟ</span> ΑΥΡΙΟ
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/50">
            Τεχνική αρτιότητα, εμπειρία δεκαετιών και δέσμευση στην ποιότητα
            — αυτές είναι οι αξίες που οικοδομούν κάθε μας έργο.
          </p>
          <div className="mt-10 flex gap-4">
            <button
              className="rounded-none px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors"
              style={{ background: "#A00000" }}
            >
              Τα Έργα μας
            </button>
            <button className="rounded-none border border-white/20 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white/70 hover:border-white hover:text-white transition-colors">
              Επικοινωνία
            </button>
          </div>
        </div>
      </section>

      {/* Photo strip */}
      <section className="flex gap-2 overflow-hidden px-8 pb-16">
        <div className="relative h-48 flex-1 overflow-hidden group" style={{ minWidth: 120 }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
          >
            <source src="/Videos/sample_3-3.mp4" type="video/mp4" />
          </video>
        </div>
        {HIGH_RES_PHOTOS.slice(1, 5).map((src, i) => (
          <div key={i} className="relative h-48 flex-1 overflow-hidden" style={{ minWidth: 120 }}>
            <Image src={src} alt="" fill className="object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
          </div>
        ))}
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-3 border-t border-white/10 px-8 py-12">
        {[["200+", "Έργα"], ["25+", "Χρόνια"], ["100%", "Δέσμευση"]].map(([n, l]) => (
          <div key={l} className="border-r border-white/10 px-6 last:border-r-0">
            <p className="text-5xl font-black" style={{ color: "#004868" }}>{n}</p>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-white/40">{l}</p>
          </div>
        ))}
      </section>

      <footer className="border-t border-white/10 px-8 py-6 text-xs text-white/30">
        Concept 02 · Industrial Bold (Original) — <Link href="/proposals" className="underline hover:text-white">Επιστροφή στα proposals</Link>
      </footer>
    </div>
  );
}
