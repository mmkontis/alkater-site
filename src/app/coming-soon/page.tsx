import Image from "next/image";

export default function ComingSoon() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#111111] selection:bg-[#E63B2E] selection:text-white font-[var(--font-space-grotesk)]">

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover object-top sm:hidden"
      >
        <source src="/underconstruction-video-loop-mobile.mp4" type="video/mp4" />
      </video>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover hidden sm:block"
      >
        <source src="/underconstruction-video-loop.mp4" type="video/mp4" />
      </video>

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

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center px-6 text-center max-w-4xl mx-auto w-full">
        <div className="mt-8 flex flex-col items-center gap-4 text-[#F5F3EE]/60 font-[var(--font-space-mono)]">
          <p className="text-sm uppercase tracking-widest">Επικοινωνια</p>
          <a
            href="mailto:alkater2024@outlook.com"
            className="group relative inline-flex overflow-hidden rounded-full bg-[#E63B2E] px-8 py-4 text-sm font-[var(--font-space-mono)] uppercase tracking-widest text-white hover:scale-[1.03] transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
          >
            <span className="relative z-10">alkater2024@outlook.com</span>
            <span className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 mix-blend-difference" />
          </a>
        </div>
      </div>
    </div>
  );
}
