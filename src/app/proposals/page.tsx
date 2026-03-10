import Image from "next/image";
import Link from "next/link";
import { LOGO } from "@/lib/photos";

const CONCEPTS = [
  {
    id: 1,
    title: "Industrial Bold + Full Sections",
    desc: "Industrial Bold hero with diagonal accents, combined with full services, projects, about & contact sections.",
    palette: ["#1A1A1A", "#004868", "#A00000"],
    tag: "Bold · Complete · Full-page",
    href: "/proposals/concept-1",
  },
  {
    id: 2,
    title: "Industrial Bold (Original)",
    desc: "Heavy typography, diagonal accents, high-contrast — raw construction energy. Hero-only concept.",
    palette: ["#1A1A1A", "#1B7A7A", "#8B2020"],
    tag: "Bold · Dark · Structural",
    href: "/proposals/concept-2",
  },
  {
    id: 3,
    title: "Cinematic Hero",
    desc: "Full-bleed project photography drives emotion and impact above the fold.",
    palette: ["#0D0D0D", "#8B2020", "#1B7A7A"],
    tag: "Photo-first · Dramatic · Full-screen",
    href: "/proposals/concept-3",
  },
  {
    id: 4,
    title: "Refined Monolith",
    desc: "Complete landing page — 6 expanded services, masonry gallery, about section, trust band, and contact CTA.",
    palette: ["#F8F6F3", "#1A4D6E", "#8B1A2B"],
    tag: "Complete · Polished · Full-page",
    href: "/proposals/concept-4",
  },
  {
    id: 5,
    title: "Cinematic Dark",
    desc: "Video hero with scroll-driven parallax, brutalist typography, full services/projects/about/contact sections.",
    palette: ["#111111", "#E63B2E", "#F5F3EE"],
    tag: "Video · Parallax · Complete",
    href: "/proposals/concept-5",
  },
];

export default function ProposalsPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-8 py-5">
        <Image src={LOGO} alt="Alkater" width={160} height={52} className="object-contain" priority />
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Website</p>
          <p className="text-sm font-bold text-zinc-700">Concept Proposals</p>
        </div>
      </header>

      {/* Hero */}
      <section className="px-8 py-14 text-center">
        <span className="mb-3 inline-block rounded-full bg-[#1B7A7A]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1B7A7A]">
          5 Concepts
        </span>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-zinc-800 md:text-5xl">
          Επιλέξτε το στυλ σας
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-500">
          Διαφορετικές κατευθύνσεις για τον ιστότοπο της Alkater. Κάντε κλικ σε κάθε
          concept για να το εξερευνήσετε.
        </p>
      </section>

      {/* Grid */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {CONCEPTS.map((c) => (
          <Link
            key={c.id}
            href={c.href}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Colour swatch bar */}
            <div className="flex h-3 w-full">
              {c.palette.map((col) => (
                <div key={col} className="flex-1" style={{ background: col }} />
              ))}
            </div>

            {/* Concept number */}
            <div className="flex items-start justify-between px-6 pt-6">
              <span
                className="text-6xl font-black leading-none opacity-10"
                style={{ color: c.palette[1] }}
              >
                {String(c.id).padStart(2, "0")}
              </span>
              <span className="rounded-full border border-zinc-100 bg-zinc-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                {c.tag}
              </span>
            </div>

            <div className="flex flex-1 flex-col px-6 pb-6 pt-3">
              <h2 className="text-xl font-bold text-zinc-800 group-hover:text-[#1B7A7A] transition-colors">
                {c.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">{c.desc}</p>
              <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-[#8B2020]">
                Προβολή concept
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
