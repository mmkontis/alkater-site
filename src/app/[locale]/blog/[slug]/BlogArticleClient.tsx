"use client";

import { motion } from "framer-motion";
import { InnerPageLayout, PageHero } from "@/components/landing/InnerPageLayout";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogArticleClient({
  coverImage,
  title,
  excerpt,
  date,
  content,
}: {
  coverImage: string;
  title: string;
  excerpt: string;
  date: string;
  content: string | null;
}) {
  const displayDate = new Date(date).toLocaleDateString("el-GR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const paragraphs = content?.split(/\n\n+/).filter(Boolean) ?? [];

  return (
    <InnerPageLayout>
      <PageHero
        label="Αρθρο"
        title={title}
        subtitle={excerpt}
        image={coverImage}
      />

      <section className="border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl py-8 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-[#E8E4DD]/50 font-['Space_Mono'] text-sm">
            <Calendar className="w-4 h-4" />
            <span>{displayDate}</span>
          </div>
          <div className="flex items-center gap-2 text-[#E8E4DD]/50 font-['Space_Mono'] text-sm">
            <Clock className="w-4 h-4" />
            <span>{Math.max(1, Math.ceil((content?.length ?? 0) / 1000))} λεπτά ανάγνωσης</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="space-y-8 text-[#E8E4DD]/80 font-['Space_Mono'] text-base leading-relaxed">
              {paragraphs.length > 0 && (
                <p className="text-xl text-[#E8E4DD]/90 leading-relaxed">
                  {paragraphs[0]}
                </p>
              )}

              <div className="relative aspect-[21/9] overflow-hidden !my-12">
                <img
                  src={coverImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent" />
              </div>

              {paragraphs.slice(1).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.article>

          <div className="mt-16 pt-8 border-t border-white/5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E8E4DD]/50 hover:text-[#E63B2E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Επιστροφη στην Αρχικη
            </Link>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
