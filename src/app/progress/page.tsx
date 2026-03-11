import Link from "next/link";
import { ArrowRight, ExternalLink, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const COMPLETED_ITEMS = [
  "Website domain & hosting setup (Vercel)",
  "Next.js project scaffolding with TypeScript & Tailwind CSS",
  "5 design concept proposals (landing page variations)",
  "Original full landing page proposal (Brutalist Signal theme)",
  "Logo design proposal page",
  "SVG logo with multiple colour modes",
  "16 construction videos sourced & organized",
  "20 project photos collected",
  "19 AI-upgraded high-resolution images",
  "Videos & Photos archive page",
  "Blog system with Supabase CMS",
  "Admin panel with login (Supabase Auth)",
  "Admin dashboard — blog editor, AI article & image generation",
  "Contact form API endpoint",
  "VR gallery page",
  "SEO metadata & Open Graph tags",
  "Cookie banner component",
];

const IN_PROGRESS_ITEMS = [
  "Final design direction selection (pending client feedback)",
  "Email system setup (Outlook SMTP)",
  "Content population — service descriptions in Greek",
];

const PENDING_ITEMS = [
  "Custom domain DNS configuration",
  "Google Analytics / Search Console integration",
  "Final content review & launch",
];

const LINKS = [
  {
    label: "Design Proposals",
    desc: "5 concept directions + original proposal",
    href: "/proposals",
    internal: true,
  },
  {
    label: "Original Proposal",
    desc: "Full landing page — Brutalist Signal theme",
    href: "/proposal",
    internal: true,
  },
  {
    label: "Videos & Photos Archive",
    desc: "All videos, photos & AI-upgraded images",
    href: "/videos",
    internal: true,
  },
  {
    label: "Admin Panel",
    desc: "Blog management, AI tools, user management",
    href: "/admin",
    internal: true,
  },
  {
    label: "Blog",
    desc: "Blog page powered by Supabase",
    href: "/blog",
    internal: true,
  },
  {
    label: "VR Gallery",
    desc: "360° project gallery",
    href: "/vr",
    internal: true,
  },
];

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EE] selection:bg-[#E63B2E] selection:text-white font-[var(--font-space-grotesk)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F5F3EE]/80 backdrop-blur-xl border-b border-[#111111]/10">
        <div className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="font-[var(--font-space-grotesk)] font-bold text-xl tracking-tighter">
            ΑΛΚΑΤΕΡ<span className="text-[#E63B2E]">.</span>
          </div>
          <div className="font-[var(--font-space-mono)] text-xs text-[#111111]/50 uppercase tracking-widest">
            Project Progress
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl px-6 py-16">
        {/* Page Title */}
        <div className="mb-20">
          <p className="font-[var(--font-space-mono)] text-[#E63B2E] uppercase tracking-widest text-sm mb-4 border-l-2 border-[#E63B2E] pl-4">
            Project Status
          </p>
          <h1 className="font-[var(--font-space-grotesk)] font-bold text-5xl md:text-7xl text-[#111111] tracking-tighter uppercase">
            Progress Overview.
          </h1>
          <p className="mt-6 font-[var(--font-space-mono)] text-[#111111]/50 text-sm max-w-xl leading-relaxed">
            Everything that has been built so far for the Alkater website project, along with quick links and next steps.
          </p>
        </div>

        {/* Quick Links */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-[var(--font-space-mono)] text-[#E63B2E] text-xs uppercase tracking-widest">01</span>
            <h2 className="font-[var(--font-space-grotesk)] font-bold text-3xl text-[#111111] tracking-tighter uppercase">
              Quick Links
            </h2>
            <div className="flex-1 h-px bg-[#111111]/10" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group block rounded-2xl border border-[#111111]/10 bg-white p-6 hover:border-[#E63B2E]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-[var(--font-space-grotesk)] font-bold text-lg text-[#111111] group-hover:text-[#E63B2E] transition-colors">
                    {link.label}
                  </h3>
                  {link.internal ? (
                    <ArrowRight className="h-4 w-4 text-[#111111]/30 group-hover:text-[#E63B2E] group-hover:translate-x-1 transition-all" />
                  ) : (
                    <ExternalLink className="h-4 w-4 text-[#111111]/30 group-hover:text-[#E63B2E] transition-colors" />
                  )}
                </div>
                <p className="font-[var(--font-space-mono)] text-xs text-[#111111]/50 leading-relaxed">
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Completed */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-[var(--font-space-mono)] text-[#E63B2E] text-xs uppercase tracking-widest">02</span>
            <h2 className="font-[var(--font-space-grotesk)] font-bold text-3xl text-[#111111] tracking-tighter uppercase">
              Completed
            </h2>
            <div className="flex-1 h-px bg-[#111111]/10" />
            <span className="font-[var(--font-space-mono)] text-xs text-[#111111]/40 uppercase tracking-widest">
              {COMPLETED_ITEMS.length} items
            </span>
          </div>
          <div className="rounded-2xl border border-[#111111]/10 bg-white overflow-hidden">
            {COMPLETED_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 px-6 py-4 ${
                  i < COMPLETED_ITEMS.length - 1 ? "border-b border-[#111111]/5" : ""
                }`}
              >
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <span className="font-[var(--font-space-mono)] text-sm text-[#111111]/70">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* In Progress */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-[var(--font-space-mono)] text-[#E63B2E] text-xs uppercase tracking-widest">03</span>
            <h2 className="font-[var(--font-space-grotesk)] font-bold text-3xl text-[#111111] tracking-tighter uppercase">
              In Progress
            </h2>
            <div className="flex-1 h-px bg-[#111111]/10" />
          </div>
          <div className="rounded-2xl border border-[#E63B2E]/20 bg-[#E63B2E]/5 overflow-hidden">
            {IN_PROGRESS_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 px-6 py-4 ${
                  i < IN_PROGRESS_ITEMS.length - 1 ? "border-b border-[#E63B2E]/10" : ""
                }`}
              >
                <Clock className="h-5 w-5 text-[#E63B2E] shrink-0 mt-0.5" />
                <span className="font-[var(--font-space-mono)] text-sm text-[#111111]/70">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Pending */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-[var(--font-space-mono)] text-[#E63B2E] text-xs uppercase tracking-widest">04</span>
            <h2 className="font-[var(--font-space-grotesk)] font-bold text-3xl text-[#111111] tracking-tighter uppercase">
              Pending
            </h2>
            <div className="flex-1 h-px bg-[#111111]/10" />
          </div>
          <div className="rounded-2xl border border-[#111111]/10 bg-[#111111]/5 overflow-hidden">
            {PENDING_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 px-6 py-4 ${
                  i < PENDING_ITEMS.length - 1 ? "border-b border-[#111111]/5" : ""
                }`}
              >
                <AlertCircle className="h-5 w-5 text-[#111111]/30 shrink-0 mt-0.5" />
                <span className="font-[var(--font-space-mono)] text-sm text-[#111111]/50">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Outlook SMTP Instructions */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-[var(--font-space-mono)] text-[#E63B2E] text-xs uppercase tracking-widest">05</span>
            <h2 className="font-[var(--font-space-grotesk)] font-bold text-3xl text-[#111111] tracking-tighter uppercase">
              Outlook SMTP Setup
            </h2>
            <div className="flex-1 h-px bg-[#111111]/10" />
          </div>
          <div className="rounded-2xl border border-[#111111]/10 bg-white p-8 md:p-10">
            <p className="font-[var(--font-space-mono)] text-sm text-[#111111]/70 mb-6 leading-relaxed">
              To enable the contact form to send emails through your Outlook account (alkater2024@outlook.com),
              we need an App Password. Here is how to generate one:
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="font-[var(--font-space-grotesk)] font-bold text-2xl text-[#E63B2E]/20">01</span>
                <div>
                  <h4 className="font-[var(--font-space-grotesk)] font-bold text-[#111111] mb-1">
                    Enable Two-Factor Authentication
                  </h4>
                  <p className="font-[var(--font-space-mono)] text-xs text-[#111111]/50 leading-relaxed">
                    Go to{" "}
                    <span className="text-[#E63B2E]">account.microsoft.com</span>{" "}
                    &rarr; Security &rarr; Advanced security options &rarr; Turn on Two-step verification.
                    This is required before you can create an app password.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="font-[var(--font-space-grotesk)] font-bold text-2xl text-[#E63B2E]/20">02</span>
                <div>
                  <h4 className="font-[var(--font-space-grotesk)] font-bold text-[#111111] mb-1">
                    Generate an App Password
                  </h4>
                  <p className="font-[var(--font-space-mono)] text-xs text-[#111111]/50 leading-relaxed">
                    Once 2FA is enabled, go to Security &rarr; Advanced security options &rarr;{" "}
                    <span className="text-[#E63B2E]">App passwords</span> &rarr; Create a new app password.
                    Name it something like &quot;Alkater Website&quot;.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="font-[var(--font-space-grotesk)] font-bold text-2xl text-[#E63B2E]/20">03</span>
                <div>
                  <h4 className="font-[var(--font-space-grotesk)] font-bold text-[#111111] mb-1">
                    Copy the Generated Password
                  </h4>
                  <p className="font-[var(--font-space-mono)] text-xs text-[#111111]/50 leading-relaxed">
                    Microsoft will show a 16-character password (e.g.{" "}
                    <code className="bg-[#F5F3EE] px-2 py-0.5 rounded text-[#E63B2E] text-[11px]">
                      abcd efgh ijkl mnop
                    </code>
                    ). Copy it and send it to us. This password is shown only once —
                    if you lose it, you will need to generate a new one.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="font-[var(--font-space-grotesk)] font-bold text-2xl text-[#E63B2E]/20">04</span>
                <div>
                  <h4 className="font-[var(--font-space-grotesk)] font-bold text-[#111111] mb-1">
                    We Configure the Server
                  </h4>
                  <p className="font-[var(--font-space-mono)] text-xs text-[#111111]/50 leading-relaxed">
                    Once we receive the app password, we will configure the website&apos;s contact form to send
                    emails through your Outlook account using secure SMTP (smtp-mail.outlook.com, port 587, TLS).
                    Your regular Outlook password remains unchanged.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-[#F5F3EE] border border-[#111111]/10 p-5">
              <p className="font-[var(--font-space-mono)] text-xs text-[#111111]/50 leading-relaxed">
                <span className="text-[#E63B2E] font-bold">Note:</span>{" "}
                The app password is only used by the website server to send emails on your behalf.
                It does not give access to read your emails or change your account settings.
                Your regular login password stays the same.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#111111]/10 py-8">
        <div className="container mx-auto max-w-7xl px-6 flex justify-between items-center font-[var(--font-space-mono)] text-xs text-[#111111]/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} ALKATER S.A.</p>
          <p>Project Progress</p>
        </div>
      </footer>
    </div>
  );
}
