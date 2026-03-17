"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const constructionVideos = [
  { src: "/Videos/construction/01_cement_truck_trench_ext_v1.mp4", label: "Cement Truck Trench v1" },
  { src: "/Videos/construction/02_cement_truck_trench_ext_v2.mp4", label: "Cement Truck Trench v2" },
  { src: "/Videos/construction/03_cement_truck_trench_ext_v4.mp4", label: "Cement Truck Trench v4" },
  { src: "/Videos/construction/04_cement_truck_trench_ext_v3.mp4", label: "Cement Truck Trench v3" },
  { src: "/Videos/construction/06_motorcycle_parking_ext_v3.mp4", label: "Motorcycle Parking v3" },
  { src: "/Videos/construction/07_motorcycle_parking_initial_v2.mp4", label: "Motorcycle Parking Initial" },
  { src: "/Videos/construction/08_road_line_painting_initial_v2.mp4", label: "Road Line Painting" },
  { src: "/Videos/construction/09_asphalt_dump_truck_initial_v1.mp4", label: "Asphalt Dump Truck v1" },
  { src: "/Videos/construction/10_asphalt_dump_truck_ext_v3.mp4", label: "Asphalt Dump Truck Ext v3" },
  { src: "/Videos/construction/10_asphalt_dump_truck_initial_v3.mp4", label: "Asphalt Dump Truck Initial v3" },
  { src: "/Videos/construction/11_road_survey_trimmed_8s_v2.mp4", label: "Road Survey" },
  { src: "/Videos/sample_3-3.mp4", label: "Sample 3" },
  { src: "/Videos/construction/12_downloaded_v1.mp4", label: "Downloaded v1" },
  { src: "/Videos/construction/13_downloaded_v2.mp4", label: "Downloaded v2" },
  { src: "/Videos/construction/14_downloaded_v3.mp4", label: "Downloaded v3" },
  { src: "/Videos/construction/15_downloaded_v4.mp4", label: "Downloaded v4" },
];

const unusedVideos = [
  { src: "/Videos/construction/05_motorcycle_parking_ext_v2.mp4", label: "Motorcycle Parking v2" },
  { src: "/Videos/sample_0-3.mp4", label: "Sample 0" },
  { src: "/Videos/sample_1-3.mp4", label: "Sample 1" },
  { src: "/Videos/sample_2.mp4", label: "Sample 2" },
];

const projectImages = Array.from({ length: 20 }, (_, i) => ({
  src: `/Photos/project-${i + 1}.jpg`,
  label: `Project ${i + 1}`,
}));

const highResImages = [
  { src: "/HighRes/image-1772752030696.png", label: "AI Upgrade 5" },
  { src: "/HighRes/image-1772752202824.png", label: "AI Upgrade 6" },
  { src: "/HighRes/image-1772752212833.png", label: "AI Upgrade 7" },
  { src: "/HighRes/image-1772752230967.png", label: "AI Upgrade 8" },
  { src: "/HighRes/image-1772752810544.png", label: "AI Upgrade 9" },
  { src: "/HighRes/image-1772752818829.png", label: "AI Upgrade 10" },
  { src: "/HighRes/image-1772752827339.png", label: "AI Upgrade 11" },
  { src: "/HighRes/image-1772753104366.png", label: "AI Upgrade 12" },
  { src: "/HighRes/image-1772753163950.png", label: "AI Upgrade 13" },
  { src: "/HighRes/image-1772753356440.png", label: "AI Upgrade 14" },
  { src: "/HighRes/image-1772753366441.png", label: "AI Upgrade 15" },
  { src: "/HighRes/image-1772753640619.jpg", label: "AI Upgrade 16" },
  { src: "/HighRes/image-1772753660495.png", label: "AI Upgrade 17" },
  { src: "/HighRes/image-1772753675852.jpg", label: "AI Upgrade 18" },
  { src: "/HighRes/image-1772753692358.png", label: "AI Upgrade 19" },
  { src: "/HighRes/image-1772753736848.png", label: "AI Upgrade 20" },
  { src: "/HighRes/image-1772753878297.png", label: "AI Upgrade 21" },
  { src: "/HighRes/image-1772753887996.png", label: "AI Upgrade 22" },
  { src: "/HighRes/image-1772753897780.jpg", label: "AI Upgrade 23" },
];


function VideoCard({ src, label }: { src: string; label: string }) {
  return (
    <div className="group">
      <div className="relative rounded-2xl overflow-hidden border border-[#111111]/10 bg-black">
        <video
          src={`${src}#t=0.1`}
          controls
          preload="metadata"
          className="w-full aspect-video object-cover"
          playsInline
        />
      </div>
      <p className="mt-3 font-['Space_Mono'] text-xs text-[#111111]/60 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

const colorModes = [
  { id: "original", blue: "#063D64", red: "#A21B21", gray: "#918F90", bg: "bg-white", swatch: ["#063D64", "#A21B21"] },
  { id: "fresh", blue: "#1B6B9E", red: "#E63B2E", gray: "#8A8A8A", bg: "bg-white", swatch: ["#1B6B9E", "#E63B2E"] },
  { id: "black", blue: "#111111", red: "#111111", gray: "#111111", bg: "bg-white", swatch: ["#111111"] },
  { id: "white", blue: "#ffffff", red: "#ffffff", gray: "#ffffff", bg: "bg-[#111111]", swatch: ["#ffffff"] },
  { id: "proposal", blue: "#111111", red: "#E63B2E", gray: "#918F90", bg: "bg-[#F5F3EE]", swatch: ["#111111", "#E63B2E"] },
] as const;

function SvgLogoCard() {
  const [mode, setMode] = useState<string>("original");
  const c = colorModes.find((m) => m.id === mode) ?? colorModes[0];

  return (
    <div className="md:col-span-2">
      <div className={`relative rounded-2xl overflow-hidden border border-[#111111]/10 aspect-[5/3] ${c.bg} p-8 flex flex-col items-center justify-center gap-4 transition-colors duration-300`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 425.197 226.772" className="w-full object-contain p-4 transition-colors duration-300">
          {/* Gray subtitle - ΤΕΧΝΙΚΗ ΕΤΑΙΡΕΙΑ */}
          <g fill={c.gray}>
            <path d="M 99.054688 144.394531 L 94.449219 144.394531 L 94.449219 141.734375 L 106.625 141.734375 L 106.625 144.394531 L 101.996094 144.394531 L 101.996094 156.132812 L 99.054688 156.132812 Z" />
            <path d="M 111.835938 141.734375 L 121.523438 141.734375 L 121.523438 144.394531 L 114.78125 144.394531 L 114.78125 147.320312 L 119.734375 147.320312 L 119.734375 149.828125 L 114.78125 149.828125 L 114.78125 153.472656 L 121.785156 153.472656 L 121.785156 156.132812 L 111.835938 156.132812 Z" />
            <path d="M 135.699219 156.132812 L 132.648438 151.355469 L 129.59375 156.132812 L 126.234375 156.132812 L 131.011719 148.804688 L 126.515625 141.734375 L 129.875 141.734375 L 132.648438 146.273438 L 135.394531 141.734375 L 138.734375 141.734375 L 134.304688 148.804688 L 139.039062 156.132812 Z" />
            <path d="M 156.535156 141.734375 L 156.535156 156.394531 L 155.554688 156.394531 L 147.21875 147.496094 L 147.21875 156.132812 L 144.273438 156.132812 L 144.273438 141.472656 L 145.230469 141.472656 L 153.589844 150.328125 L 153.589844 141.734375 Z" />
            <path d="M 163.097656 141.734375 L 166.042969 141.734375 L 166.042969 156.132812 L 163.097656 156.132812 Z" />
            <path d="M 181.730469 156.132812 L 175.554688 148.628906 L 175.554688 156.132812 L 172.609375 156.132812 L 172.609375 141.734375 L 175.554688 141.734375 L 175.554688 148.410156 L 181.050781 141.734375 L 184.566406 141.734375 L 179.046875 148.519531 L 185.285156 156.132812 Z" />
            <path d="M 190.496094 141.734375 L 193.441406 141.734375 L 193.441406 147.253906 L 199.8125 147.253906 L 199.8125 141.734375 L 202.757812 141.734375 L 202.757812 156.132812 L 199.8125 156.132812 L 199.8125 149.914062 L 193.441406 149.914062 L 193.441406 156.132812 L 190.496094 156.132812 Z" />
            <path d="M 218.703125 141.734375 L 228.390625 141.734375 L 228.390625 144.394531 L 221.648438 144.394531 L 221.648438 147.320312 L 226.601562 147.320312 L 226.601562 149.828125 L 221.648438 149.828125 L 221.648438 153.472656 L 228.648438 153.472656 L 228.648438 156.132812 L 218.703125 156.132812 Z" />
            <path d="M 237.722656 144.394531 L 233.121094 144.394531 L 233.121094 141.734375 L 245.292969 141.734375 L 245.292969 144.394531 L 240.671875 144.394531 L 240.671875 156.132812 L 237.722656 156.132812 Z" />
            <path d="M 254.414062 146.96875 L 252.492188 151.835938 L 256.332031 151.835938 Z M 257.355469 154.257812 L 251.464844 154.257812 L 250.660156 156.132812 L 247.496094 156.132812 L 253.929688 141.472656 L 254.914062 141.472656 L 261.328125 156.132812 L 258.164062 156.132812 Z" />
            <path d="M 266.5625 141.734375 L 269.507812 141.734375 L 269.507812 156.132812 L 266.5625 156.132812 Z" />
            <path d="M 281.484375 148.476562 C 282.855469 148.476562 283.664062 147.625 283.664062 146.382812 C 283.664062 145.160156 282.8125 144.332031 281.484375 144.332031 L 279.019531 144.332031 L 279.019531 148.476562 Z M 276.074219 141.734375 L 281.484375 141.734375 C 284.496094 141.734375 286.675781 143.609375 286.675781 146.382812 C 286.675781 149.132812 284.496094 151.050781 281.484375 151.050781 L 279.019531 151.050781 L 279.019531 156.132812 L 276.074219 156.132812 Z" />
            <path d="M 292.304688 141.734375 L 301.988281 141.734375 L 301.988281 144.394531 L 295.246094 144.394531 L 295.246094 147.320312 L 300.199219 147.320312 L 300.199219 149.828125 L 295.246094 149.828125 L 295.246094 153.472656 L 302.25 153.472656 L 302.25 156.132812 L 292.304688 156.132812 Z" />
            <path d="M 308.074219 141.734375 L 311.019531 141.734375 L 311.019531 156.132812 L 308.074219 156.132812 Z" />
            <path d="M 323.125 146.96875 L 321.207031 151.835938 L 325.046875 151.835938 Z M 326.070312 154.257812 L 320.179688 154.257812 L 319.375 156.132812 L 316.210938 156.132812 L 322.644531 141.472656 L 323.628906 141.472656 L 330.042969 156.132812 L 326.878906 156.132812 Z" />
          </g>
          {/* Blue - ΑΛΚ */}
          <g fill={c.blue}>
            <path d="M 91.402344 83.144531 L 84.304688 101.132812 L 98.5 101.132812 Z M 102.292969 110.082031 L 80.515625 110.082031 L 77.53125 117.019531 L 65.839844 117.019531 L 89.628906 62.824219 L 93.257812 62.824219 L 116.96875 117.019531 L 105.277344 117.019531 Z" />
            <path d="M 153.367188 117.019531 L 139.496094 84.679688 L 125.625 117.019531 L 113.929688 117.019531 L 137.71875 62.824219 L 141.347656 62.824219 L 165.0625 117.019531 Z" />
            <path d="M 177.371094 99.304688 L 182.457031 94.089844 L 189.585938 101.519531 L 204.558594 101.519531 L 189.949219 86.601562 L 213.554688 62.820312 L 198.753906 62.820312 L 177.304688 84.105469 L 177.304688 62.820312 L 166.996094 62.820312 L 166.996094 116.53125 C 166.996094 116.667969 166.996094 116.773438 166.980469 117.027344 L 177.132812 107.035156 Z" />
          </g>
          {/* Red - ΑΤΕΡ */}
          <g fill={c.red}>
            <path d="M 250.847656 82.621094 L 233.828125 82.621094 L 233.828125 72.78125 L 278.832031 72.78125 L 278.832031 82.621094 L 261.734375 82.621094 L 261.734375 126.007812 L 250.847656 126.007812 Z" />
            <path d="M 278.832031 72.78125 L 314.640625 72.78125 L 314.640625 82.621094 L 289.71875 82.621094 L 289.71875 93.425781 L 308.027344 93.425781 L 308.027344 102.703125 L 289.71875 102.703125 L 289.71875 116.171875 L 315.609375 116.171875 L 315.609375 126.007812 L 278.832031 126.007812 Z" />
            <path d="M 339.152344 97.703125 C 344.234375 97.703125 347.21875 94.554688 347.21875 89.957031 C 347.21875 85.441406 344.074219 82.378906 339.152344 82.378906 L 330.042969 82.378906 L 330.042969 97.703125 Z M 319.152344 72.78125 L 339.152344 72.78125 C 350.285156 72.78125 358.347656 79.714844 358.347656 89.957031 C 358.347656 100.121094 350.285156 107.21875 339.152344 107.21875 L 330.042969 107.21875 L 330.042969 126.011719 L 319.152344 126.011719 Z" />
            <path d="M 204.558594 101.519531 L 189.585938 101.519531 L 166.964844 124.171875 L 167.011719 125.992188 L 179.957031 125.835938 L 197.09375 108.722656 Z" />
            <path d="M 228.210938 62.832031 L 200.941406 90.304688 L 208.066406 97.734375 L 218.875 87.097656 L 218.875 107.1875 L 208.164062 107.1875 L 198.308594 117.027344 L 218.875 117.027344 L 218.875 126.007812 L 229.183594 126.007812 L 229.183594 62.820312 Z" />
          </g>
        </svg>
        <div className="flex gap-2 justify-center">
          {colorModes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`w-7 h-7 rounded-full border-2 transition-all duration-200 overflow-hidden flex ${
                mode === m.id ? "border-[#E63B2E] scale-110" : "border-[#111111]/20 hover:border-[#111111]/40"
              }`}
            >
              {m.swatch.map((color, i) => (
                <span key={i} className="flex-1 h-full" style={{ backgroundColor: color }} />
              ))}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 font-['Space_Mono'] text-xs text-[#111111]/60 uppercase tracking-widest">
        Logo SVG
      </p>
    </div>
  );
}

function ImageCard({ src, label }: { src: string; label: string }) {
  return (
    <div className="group">
      <div className="relative rounded-2xl overflow-hidden border border-[#111111]/10 bg-[#E8E4DD] aspect-[4/3]">
        <Image
          src={src}
          alt={label}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <p className="mt-3 font-['Space_Mono'] text-xs text-[#111111]/60 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] selection:bg-[#E63B2E] selection:text-white font-['Space_Grotesk']">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Grotesk:wght@400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
      `}} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F5F3EE]/80 backdrop-blur-xl border-b border-[#111111]/10">
        <div className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/proposal"
            className="inline-flex items-center gap-2 font-['Space_Mono'] text-sm text-[#111111]/60 hover:text-[#E63B2E] transition-colors uppercase tracking-widest"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Proposal
          </Link>
          <div className="font-['Space_Grotesk'] font-bold text-xl tracking-tighter">
            ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-16">
        {/* Page Title */}
        <div className="mb-20">
          <p className="font-['Space_Mono'] text-[#E63B2E] uppercase tracking-widest text-sm mb-4 border-l-2 border-[#E63B2E] pl-4">
            Media Archive
          </p>
          <h1 className="font-['Space_Grotesk'] font-bold text-5xl md:text-7xl text-[#111111] tracking-tighter uppercase">
            Videos & Photos.
          </h1>
        </div>

        {/* Construction Videos */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-['Space_Mono'] text-[#E63B2E] text-xs uppercase tracking-widest">01</span>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-[#111111] tracking-tighter uppercase">
              Construction Videos
            </h2>
            <div className="flex-1 h-px bg-[#111111]/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {constructionVideos.map((v) => (
              <VideoCard key={v.src} {...v} />
            ))}
          </div>
        </section>

        {/* Sample Videos */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-['Space_Mono'] text-[#E63B2E] text-xs uppercase tracking-widest">02</span>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-[#111111] tracking-tighter uppercase">
              Unused / Bad Videos
            </h2>
            <div className="flex-1 h-px bg-[#111111]/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {unusedVideos.map((v) => (
              <VideoCard key={v.src} {...v} />
            ))}
          </div>
        </section>

        {/* Raw / Bad Images */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-['Space_Mono'] text-[#E63B2E] text-xs uppercase tracking-widest">03</span>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-[#111111] tracking-tighter uppercase">
              Raw / Bad Images
            </h2>
            <div className="flex-1 h-px bg-[#111111]/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectImages.map((img) => (
              <ImageCard key={img.src} {...img} />
            ))}
          </div>
        </section>

        {/* AI Upgrade Fixed */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-['Space_Mono'] text-[#E63B2E] text-xs uppercase tracking-widest">04</span>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-[#111111] tracking-tighter uppercase">
              AI Upgrade Fixed
            </h2>
            <div className="flex-1 h-px bg-[#111111]/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highResImages.map((img) => (
              <ImageCard key={img.src} {...img} />
            ))}
          </div>
        </section>

        {/* Logos */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-['Space_Mono'] text-[#E63B2E] text-xs uppercase tracking-widest">05</span>
            <h2 className="font-['Space_Grotesk'] font-bold text-3xl text-[#111111] tracking-tighter uppercase">
              Logos
            </h2>
            <div className="flex-1 h-px bg-[#111111]/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SvgLogoCard />
            <div>
              <div className="relative rounded-2xl overflow-hidden border border-[#111111]/10 bg-[#333333] aspect-[5/3] flex items-center justify-center">
                <div className="font-['Space_Grotesk'] font-bold text-5xl tracking-tighter text-white">
                  ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span>
                </div>
              </div>
              <p className="mt-3 font-['Space_Mono'] text-xs text-[#111111]/60 uppercase tracking-widest">
                Minimalist Text Logo
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#111111]/10 py-8">
        <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center font-['Space_Mono'] text-xs text-[#111111]/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} ALKATER S.A.</p>
          <p>Media Preview</p>
        </div>
      </footer>
    </div>
  );
}
