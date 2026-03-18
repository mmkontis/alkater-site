import Image from "next/image";

export default function UnderConstructionStatic() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#111111] selection:bg-[#E63B2E] selection:text-white font-[var(--font-space-grotesk)]">

      {/* Noise Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[100] opacity-5 mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Brutalist Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(#F5F3EE_1px,transparent_1px),linear-gradient(90deg,#F5F3EE_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03]"></div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-4xl mx-auto w-full">
        <div className="font-[var(--font-space-grotesk)] font-bold text-4xl md:text-5xl tracking-tighter mb-16 text-[#F5F3EE]">
          ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span>
        </div>

        <h1 className="mb-6 font-[var(--font-space-grotesk)] font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-[#F5F3EE] uppercase">
          ΣΥΝΤΟΜΑ<br/>ΚΟΝΤΑ ΣΑΣ.
        </h1>

        <div className="flex-1 bg-black/50 rounded-xl p-4 border border-white/10 font-[var(--font-space-mono)] text-[#E8E4DD] text-sm md:text-base leading-relaxed relative overflow-hidden max-w-lg mx-auto w-full text-left mb-12">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>
            <span className="text-[#E63B2E] mr-2">{"//"}</span> Ο ιστότοπος της ΑΛΚΑΤΕΡ βρίσκεται υπό κατασκευή.<br/><br/>
            <span className="text-[#E63B2E] mr-2">{">"}</span> Αναβαθμίζουμε τις ψηφιακές μας υποδομές. Θα είμαστε σύντομα διαθέσιμοι.
            <span className="animate-pulse text-[#E63B2E] ml-1">_</span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 text-[#F5F3EE]/60 font-['Space_Mono']">
          <p className="text-sm uppercase tracking-widest">Επικοινωνια</p>
          <a
            href="mailto:alkater2024@outlook.com"
            className="group relative inline-flex overflow-hidden rounded-full bg-[#E63B2E] px-8 py-4 text-sm font-['Space_Mono'] uppercase tracking-widest text-white hover:scale-[1.03] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          >
            <span className="relative z-10">alkater2024@outlook.com</span>
            <span className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 mix-blend-difference" />
          </a>
        </div>
      </div>
    </div>
  );
}
