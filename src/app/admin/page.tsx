"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "./actions";

function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const prefillEmail = searchParams.get("email") ?? "";
  const prefillCode = searchParams.get("code") ?? "";

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F3EE] selection:bg-[#E63B2E] selection:text-white font-['Space_Grotesk']">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Grotesk:wght@400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
      `}} />

      <div className="w-full max-w-sm rounded-2xl border border-[#111111]/10 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <img
            src="/Photos/Logo/alkater-logo.svg"
            alt="ΑΛΚΑΤΕΡ"
            className="mx-auto mb-3 h-32 w-auto"
            style={{ filter: "brightness(0)" }}
          />
          <p className="font-['Space_Mono'] text-[#111111]/50 uppercase tracking-widest text-[10px]">
            Admin Panel
          </p>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/50"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={prefillEmail}
              className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#111111] outline-none transition-all focus:border-[#E63B2E] focus:ring-2 focus:ring-[#E63B2E]/10 font-['Space_Grotesk']"
              placeholder="admin@alkater.gr"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/50"
            >
              Κωδικός
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              defaultValue={prefillCode}
              className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#111111] outline-none transition-all focus:border-[#E63B2E] focus:ring-2 focus:ring-[#E63B2E]/10 font-['Space_Grotesk']"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-[#E63B2E]/10 border border-[#E63B2E]/20 px-4 py-2.5 text-sm text-[#E63B2E] font-['Space_Grotesk']">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full cursor-pointer rounded-xl bg-[#111111] py-3 font-['Space_Mono'] text-xs uppercase tracking-widest text-white transition-all hover:bg-[#E63B2E] disabled:opacity-60"
          >
            {loading ? "Σύνδεση..." : "Σύνδεση"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginForm />
    </Suspense>
  );
}
