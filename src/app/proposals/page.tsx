import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
    palette: ["#1A1A1A", "#004868", "#A00000"],
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
  {
    id: 6,
    title: "Brutalist Signal",
    desc: "Paper-toned landing with GSAP scroll animations, stacking protocol cards, serif drama typography, and signal-red accents.",
    palette: ["#F5F3EE", "#E63B2E", "#111111"],
    tag: "Brutalist · Animated · Full-page",
    href: "/proposals/concept-6",
  },
];

/* ── Mini preview components per concept ── */

function Preview1() {
  return (
    <div className="w-full h-full bg-[#1A1A1A] flex flex-col relative overflow-hidden">
      {/* Diagonal teal accent */}
      <div className="absolute -right-8 top-0 w-24 h-full bg-[#004868]/15 skew-x-[-12deg]" />
      <div className="absolute -left-8 bottom-0 w-16 h-1/2 bg-[#A00000]/10 skew-x-[12deg]" />
      {/* Hero text */}
      <div className="flex-1 flex flex-col justify-end p-4 relative z-10">
        <div className="w-8 h-px bg-[#004868] mb-2" />
        <p className="text-[6px] text-[#004868] font-[var(--font-space-mono)] uppercase tracking-widest mb-1">ALKATER</p>
        <p className="text-[10px] font-bold text-white font-[var(--font-space-grotesk)] leading-tight tracking-tight">
          ΧΤΙΖΟΥΜΕ
        </p>
        <p className="text-[10px] font-bold text-white font-[var(--font-space-grotesk)] leading-tight tracking-tight">
          ΤΟ <span className="text-[#A00000]">ΑΥΡΙΟ</span>
        </p>
      </div>
      {/* Fake nav dots */}
      <div className="flex gap-1 p-3">
        <div className="w-4 h-1 rounded-full bg-[#A00000]" />
        <div className="w-4 h-1 rounded-full bg-white/20" />
        <div className="w-4 h-1 rounded-full bg-white/20" />
      </div>
    </div>
  );
}

function Preview2() {
  return (
    <div className="w-full h-full bg-[#1A1A1A] flex flex-col relative overflow-hidden">
      {/* Diagonal shapes */}
      <div className="absolute -right-6 top-0 w-20 h-full bg-[#004868]/20 skew-x-[-12deg]" />
      <div className="absolute -left-4 bottom-0 w-12 h-2/3 bg-[#A00000]/10 skew-x-[12deg]" />
      {/* Hero */}
      <div className="flex-1 flex flex-col justify-end p-4 relative z-10">
        <p className="text-[6px] text-[#004868] font-[var(--font-space-mono)] uppercase tracking-widest mb-1">ALKATER</p>
        <p className="text-[12px] font-bold text-white font-[var(--font-space-grotesk)] leading-tight tracking-tight">
          ΧΤΙΖΟΥΜΕ
        </p>
        <p className="text-[12px] font-bold text-white font-[var(--font-space-grotesk)] leading-tight tracking-tight">
          ΤΟ <span className="text-[#A00000]">ΑΥΡΙΟ</span>
        </p>
        <div className="flex gap-1.5 mt-3">
          <div className="w-10 h-3 rounded-full bg-[#A00000]" />
          <div className="w-10 h-3 rounded-full border border-white/20" />
        </div>
      </div>
    </div>
  );
}

function Preview3() {
  return (
    <div className="w-full h-full bg-black flex flex-col relative overflow-hidden">
      {/* Fake full-bleed photo effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-[#2a2015]" />
      {/* Floating nav */}
      <div className="relative z-10 flex justify-between items-center p-3">
        <p className="text-[6px] text-white/60 font-[var(--font-space-mono)] uppercase tracking-widest">ALKATER</p>
        <div className="w-6 h-2 rounded-full border border-white/20" />
      </div>
      {/* Hero text */}
      <div className="flex-1 flex flex-col justify-end p-4 relative z-10">
        <p className="text-[10px] font-bold text-white font-[var(--font-space-grotesk)] leading-tight tracking-tight">
          Κάθε Έργο,
        </p>
        <p className="text-[10px] font-bold text-white font-[var(--font-space-grotesk)] leading-tight tracking-tight">
          μια <span className="text-[#8B2020]">Ιστορία</span>
        </p>
      </div>
      {/* Thumbnail strip */}
      <div className="flex gap-1 p-3 relative z-10">
        <div className="w-6 h-4 rounded-sm bg-white/20 ring-1 ring-white/40" />
        <div className="w-6 h-4 rounded-sm bg-white/10" />
        <div className="w-6 h-4 rounded-sm bg-white/10" />
        <div className="w-6 h-4 rounded-sm bg-white/10" />
      </div>
    </div>
  );
}

function Preview4() {
  return (
    <div className="w-full h-full bg-[#F8F6F3] flex flex-col relative overflow-hidden">
      {/* Dark hero top */}
      <div className="h-3/5 bg-gradient-to-b from-[#0F3249] to-[#1A4D6E] relative flex flex-col justify-end p-4">
        <div className="absolute top-0 right-0 w-px h-full bg-white/10" />
        <p className="text-[6px] text-white/40 font-[var(--font-space-mono)] uppercase tracking-widest mb-1">ALKATER</p>
        <p className="text-[9px] font-bold text-white font-[var(--font-space-grotesk)] leading-tight tracking-tight">
          Χτίζουμε Υποδομές
        </p>
        <p className="text-[9px] font-bold font-[var(--font-space-grotesk)] leading-tight tracking-tight">
          <span className="text-[#A83245]">που Αντέχουν</span>
        </p>
        <div className="w-8 h-2.5 rounded-full bg-[#8B1A2B] mt-2" />
      </div>
      {/* Stats bar */}
      <div className="flex gap-1 p-2">
        <div className="flex-1 bg-white rounded p-1.5 text-center">
          <p className="text-[7px] font-bold text-[#1A4D6E] font-[var(--font-space-grotesk)]">25+</p>
          <p className="text-[4px] text-[#111111]/40 font-[var(--font-space-mono)]">YEARS</p>
        </div>
        <div className="flex-1 bg-white rounded p-1.5 text-center">
          <p className="text-[7px] font-bold text-[#8B1A2B] font-[var(--font-space-grotesk)]">150+</p>
          <p className="text-[4px] text-[#111111]/40 font-[var(--font-space-mono)]">PROJECTS</p>
        </div>
        <div className="flex-1 bg-white rounded p-1.5 text-center">
          <p className="text-[7px] font-bold text-[#1A4D6E] font-[var(--font-space-grotesk)]">50+</p>
          <p className="text-[4px] text-[#111111]/40 font-[var(--font-space-mono)]">CREW</p>
        </div>
      </div>
    </div>
  );
}

function Preview5() {
  return (
    <div className="w-full h-full bg-[#111111] flex flex-col relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px]" />
      {/* Floating pill nav */}
      <div className="relative z-10 flex justify-center pt-3">
        <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1 border border-white/10">
          <p className="text-[6px] text-white font-[var(--font-space-grotesk)] font-bold tracking-tighter">ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span></p>
          <div className="w-6 h-2 rounded-full bg-[#E63B2E]" />
        </div>
      </div>
      {/* Hero */}
      <div className="flex-1 flex flex-col justify-end p-4 relative z-10">
        <div className="w-8 h-px bg-[#E63B2E] mb-2" />
        <p className="text-[5px] text-[#E63B2E] font-[var(--font-space-mono)] uppercase tracking-widest mb-1">ALKATER — CONSTRUCT</p>
        <p className="text-[11px] font-bold text-[#F5F3EE] font-[var(--font-space-grotesk)] leading-tight tracking-tighter">
          CONSTRUCT THE
        </p>
        <p className="text-[13px] italic text-[#E8E4DD] font-[var(--font-dm-serif)] leading-tight ml-2">
          Infrastructure.
        </p>
        <div className="w-12 h-3 rounded-full bg-[#E63B2E] mt-3" />
      </div>
    </div>
  );
}

function Preview6() {
  return (
    <div className="w-full h-full bg-[#F5F3EE] flex flex-col relative overflow-hidden">
      {/* Noise-like texture hint */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#E8E4DD_0%,transparent_60%)]" />
      {/* Floating pill nav */}
      <div className="relative z-10 flex justify-center pt-3">
        <div className="flex items-center gap-3 bg-white/60 rounded-full px-3 py-1 border border-[#111111]/10">
          <p className="text-[6px] text-[#111111] font-[var(--font-space-grotesk)] font-bold tracking-tighter">ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span></p>
          <div className="w-6 h-2 rounded-full bg-[#E63B2E]" />
        </div>
      </div>
      {/* Hero */}
      <div className="flex-1 flex flex-col justify-end p-4 relative z-10">
        <div className="border-l-2 border-[#E63B2E] pl-2 mb-2">
          <p className="text-[4px] text-[#E63B2E] font-[var(--font-space-mono)] uppercase tracking-widest">ALKATER — ΚΑΤΑΣΚΕΥΑΖΟΥΜΕ</p>
        </div>
        <p className="text-[11px] font-bold text-[#111111] font-[var(--font-space-grotesk)] leading-tight tracking-tighter">
          CONSTRUCT THE
        </p>
        <p className="text-[14px] italic text-[#E8E4DD] font-[var(--font-dm-serif)] leading-tight ml-2" style={{ WebkitTextStroke: '0.3px #111111' }}>
          Infrastructure.
        </p>
        <div className="w-12 h-3 rounded-full bg-[#E63B2E] mt-3" />
      </div>
      {/* Feature cards hint */}
      <div className="flex gap-1 p-2 relative z-10">
        <div className="flex-1 bg-white rounded-lg p-1.5 border border-[#111111]/5">
          <div className="w-full h-1 bg-[#E8E4DD] rounded mb-1" />
          <div className="w-2/3 h-1 bg-[#E8E4DD] rounded" />
        </div>
        <div className="flex-1 bg-[#111111] rounded-lg p-1.5">
          <div className="w-full h-1 bg-white/10 rounded mb-1" />
          <div className="w-2/3 h-1 bg-white/10 rounded" />
        </div>
        <div className="flex-1 bg-[#E8E4DD] rounded-lg p-1.5 border border-[#111111]/5">
          <div className="w-full h-1 bg-white rounded mb-1" />
          <div className="w-2/3 h-1 bg-white rounded" />
        </div>
      </div>
    </div>
  );
}

const PREVIEWS: Record<number, () => React.JSX.Element> = {
  1: Preview1,
  2: Preview2,
  3: Preview3,
  4: Preview4,
  5: Preview5,
  6: Preview6,
};

function ConceptCard({ concept }: { concept: (typeof CONCEPTS)[number] }) {
  const PreviewComponent = PREVIEWS[concept.id];

  return (
    <Link href={concept.href} className="group block">
      <div className="relative rounded-2xl overflow-hidden border border-[#111111]/10 bg-white aspect-[4/3] flex flex-col">
        {/* Visual preview */}
        <div className="flex-1 relative overflow-hidden">
          <PreviewComponent />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full px-4 py-2 font-[var(--font-space-mono)] text-[10px] uppercase tracking-widest text-[#111111] shadow-lg">
              Preview
            </span>
          </div>
        </div>
        {/* Bottom info bar */}
        <div className="p-4 border-t border-[#111111]/5 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="text-2xl font-bold leading-none opacity-20 font-[var(--font-space-grotesk)]"
                style={{ color: concept.palette[1] }}
              >
                {String(concept.id).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-[var(--font-space-grotesk)] font-bold text-sm text-[#111111] group-hover:text-[#E63B2E] transition-colors leading-tight">
                  {concept.title}
                </h3>
                <span className="font-[var(--font-space-mono)] text-[9px] text-[#111111]/40 uppercase tracking-widest">
                  {concept.tag}
                </span>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-[#111111]/20 group-hover:text-[#E63B2E] group-hover:translate-x-1 transition-all shrink-0" />
          </div>
        </div>
      </div>
      <p className="mt-3 font-[var(--font-space-mono)] text-xs text-[#111111]/60 uppercase tracking-widest">
        {concept.desc}
      </p>
    </Link>
  );
}

export default function ProposalsPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] selection:bg-[#E63B2E] selection:text-white font-[var(--font-space-grotesk)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F5F3EE]/80 backdrop-blur-xl border-b border-[#111111]/10">
        <div className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/progress"
            className="inline-flex items-center gap-2 font-[var(--font-space-mono)] text-sm text-[#111111]/60 hover:text-[#E63B2E] transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="font-[var(--font-space-grotesk)] font-bold text-xl tracking-tighter">
            ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-16">
        {/* Page Title */}
        <div className="mb-20">
          <p className="font-[var(--font-space-mono)] text-[#E63B2E] uppercase tracking-widest text-sm mb-4 border-l-2 border-[#E63B2E] pl-4">
            Website Concepts
          </p>
          <h1 className="font-[var(--font-space-grotesk)] font-bold text-5xl md:text-7xl text-[#111111] tracking-tighter uppercase">
            Design Proposals.
          </h1>
          <p className="mt-6 font-[var(--font-space-mono)] text-[#111111]/50 text-sm max-w-xl leading-relaxed">
            6 different design directions for the Alkater website. Click on each concept to explore the full preview.
          </p>
        </div>

        {/* Concepts Grid */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-[var(--font-space-mono)] text-[#E63B2E] text-xs uppercase tracking-widest">01</span>
            <h2 className="font-[var(--font-space-grotesk)] font-bold text-3xl text-[#111111] tracking-tighter uppercase">
              All Concepts
            </h2>
            <div className="flex-1 h-px bg-[#111111]/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CONCEPTS.map((c) => (
              <ConceptCard key={c.id} concept={c} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#111111]/10 py-8">
        <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center font-[var(--font-space-mono)] text-xs text-[#111111]/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} ALKATER S.A.</p>
          <p>Design Proposals</p>
        </div>
      </footer>
    </div>
  );
}
