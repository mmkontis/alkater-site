"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const STRIPES = Array.from({ length: 12 });

export default function Home() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const id = setInterval(
      () => setDots((d) => (d.length >= 3 ? "." : d + ".")),
      600
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#F5F3EF]">
      {/* ── Diagonal warning stripes top bar ── */}
      <div className="absolute inset-x-0 top-0 h-4 overflow-hidden">
        <div className="flex h-full w-[200%]">
          {STRIPES.map((_, i) => (
            <div
              key={i}
              className="h-full flex-1"
              style={{
                background:
                  i % 2 === 0 ? "#1B7A7A" : "#8B2020",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Diagonal warning stripes bottom bar ── */}
      <div className="absolute inset-x-0 bottom-0 h-4 overflow-hidden">
        <div className="flex h-full w-[200%]">
          {STRIPES.map((_, i) => (
            <div
              key={i}
              className="h-full flex-1"
              style={{
                background:
                  i % 2 === 0 ? "#8B2020" : "#1B7A7A",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Scaffold side accents ── */}
      <div
        className="absolute left-0 top-4 bottom-4 w-1.5 opacity-30"
        style={{ background: "repeating-linear-gradient(to bottom, #1B7A7A 0px, #1B7A7A 20px, transparent 20px, transparent 40px)" }}
      />
      <div
        className="absolute right-0 top-4 bottom-4 w-1.5 opacity-30"
        style={{ background: "repeating-linear-gradient(to bottom, #8B2020 0px, #8B2020 20px, transparent 20px, transparent 40px)" }}
      />

      {/* ── Card ── */}
      <div className="relative mx-6 flex max-w-lg flex-col items-center gap-8 rounded-2xl border border-zinc-200 bg-white px-10 py-14 shadow-2xl shadow-zinc-300/60">

        {/* Hard-hat icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1B7A7A]/10 text-5xl select-none">
          🏗️
        </div>

        {/* Logo */}
        <Image
          src="/Photos/Logo/αλκατερ-logo.jpg"
          alt="Alkater logo"
          width={240}
          height={80}
          className="object-contain"
          priority
        />

        {/* Divider */}
        <div className="flex w-full items-center gap-3">
          <div className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Υπό Κατασκευή
          </span>
          <div className="h-px flex-1 bg-zinc-200" />
        </div>

        {/* Headline */}
        <h1 className="text-center text-3xl font-bold leading-tight text-zinc-800">
          Ετοιμαζόμαστε<br />
          <span style={{ color: "#1B7A7A" }}>για εσάς</span>
          <span style={{ color: "#8B2020" }}>{dots}</span>
        </h1>

        {/* Sub-text */}
        <p className="text-center text-base leading-relaxed text-zinc-500">
          Ο ιστότοπος της{" "}
          <span className="font-semibold text-zinc-700">Alkater Τεχνική Εταιρεία</span>{" "}
          βρίσκεται υπό κατασκευή. Σύντομα θα είμαστε σε πλήρη λειτουργία!
        </p>

        {/* Progress bar */}
        <div className="w-full">
          <div className="mb-1.5 flex justify-between text-xs text-zinc-400">
            <span>Πρόοδος</span>
            <span style={{ color: "#1B7A7A" }}>75%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: "75%",
                background: "linear-gradient(90deg, #1B7A7A, #8B2020)",
              }}
            />
          </div>
        </div>

        {/* Contact */}
        <p className="text-center text-sm text-zinc-400">
          Επικοινωνήστε μαζί μας:{" "}
          <a
            href="mailto:info@alkater.gr"
            className="font-medium underline underline-offset-2 transition-colors hover:text-[#1B7A7A]"
            style={{ color: "#8B2020" }}
          >
            info@alkater.gr
          </a>
        </p>
      </div>
    </div>
  );
}
