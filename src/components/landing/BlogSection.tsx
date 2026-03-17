"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { BlogPost } from "@/lib/queries";

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "simassia-sintirissis-odikon-diktyon",
    title: "Σημασία Συντήρησης Οδικών Δικτύων",
    excerpt: "Γιατί η τακτική συντήρηση των οδικών δικτύων αποτελεί επένδυση στην ασφάλεια, την οικονομία και τη βιωσιμότητα των υποδομών.",
    cover_image: "/HighRes/image-1772752810544.png",
    created_at: "2026-03-10T00:00:00Z",
  },
];

export function BlogSection({ posts: postsProp }: { posts?: BlogPost[] }) {
  const posts = postsProp?.length ? postsProp : FALLBACK_POSTS;
  return (
    <section id="blog" className="py-24 md:py-32 relative border-t overflow-hidden" style={{ borderColor: "var(--border-color)", backgroundColor: "color-mix(in srgb, var(--bg-primary) 88%, var(--tint))" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 100%, color-mix(in srgb, var(--tint) 12%, transparent), transparent)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 90% 0%, color-mix(in srgb, var(--tint) 8%, transparent), transparent)" }} />
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section heading */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-[2px]" style={{ backgroundColor: "var(--link-color)" }} />
            <span className="font-['Space_Mono'] uppercase tracking-widest text-sm" style={{ color: "var(--link-color)" }}>Blog</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-[1.1]" style={{ color: "var(--text-primary)" }}>
            Αρθρα & <span style={{ color: "var(--link-color)" }}>Νεα.</span>
          </h2>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex"
            >
              <Link
                href={`/proposals/concept-1/blog/${post.slug}`}
                className="group flex flex-col border transition-all duration-500 overflow-hidden w-full hover:border-[color:var(--link-color)]/30"
                style={{ borderColor: "color-mix(in srgb, var(--tint) 20%, var(--border-color))", backgroundColor: "color-mix(in srgb, var(--bg-secondary, #1A1A1A) 92%, var(--tint))" }}
              >
                {post.cover_image && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-0 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--tint) 25%, transparent), transparent)" }} />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3" style={{ color: "var(--text-muted)" }}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-['Space_Mono'] text-xs">
                      {new Date(post.created_at).toLocaleDateString("el-GR", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-3 transition-colors" style={{ color: "var(--text-primary)" }}>
                    {post.title}
                  </h3>
                  <p className="font-['Space_Mono'] text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-muted)" }}>
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-['Space_Mono'] text-xs uppercase tracking-widest transition-colors" style={{ color: "var(--link-color)" }}>
                    Διαβασε περισσοτερα
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
