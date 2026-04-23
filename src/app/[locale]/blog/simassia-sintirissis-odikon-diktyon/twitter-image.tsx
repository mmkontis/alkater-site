import { createClient } from "@/lib/supabase/server";
import { OG_SIZE, OG_CONTENT_TYPE, renderBrandOg } from "@/lib/og/shell";

const SLUG = "simassia-sintirissis-odikon-diktyon";

export const runtime = "nodejs";
export const alt = "ALKATER — Article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function TwitterImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  let title: string | null = null;
  let excerpt: string | null = null;
  let createdAt: string | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("title, title_en, excerpt, excerpt_en, created_at")
      .eq("slug", SLUG)
      .eq("published", true)
      .single();
    if (data) {
      const d = data as { title?: string | null; title_en?: string | null; excerpt?: string | null; excerpt_en?: string | null; created_at?: string | null };
      title = (isEn ? d.title_en : null) || d.title || null;
      excerpt = (isEn ? d.excerpt_en : null) || d.excerpt || null;
      createdAt = d.created_at ?? null;
    }
  } catch {}

  const fallbackTitle = isEn
    ? "Importance of road network maintenance"
    : "Σημασια συντηρησης οδικων δικτυων";
  const fallbackExcerpt = isEn
    ? "Why regular maintenance of road networks is an investment in safety, economy and sustainability."
    : "Γιατί η τακτική συντήρηση των οδικών δικτύων είναι επένδυση σε ασφάλεια, οικονομία και βιωσιμότητα.";

  const badges: string[] = [];
  if (createdAt) {
    const date = new Date(createdAt);
    if (!isNaN(date.getTime())) {
      badges.push(
        date.toLocaleDateString(isEn ? "en-GB" : "el-GR", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );
    }
  }
  badges.push(isEn ? "ALKATER Blog" : "ΑΛΚΑΤΕΡ Blog");

  return renderBrandOg({
    locale,
    eyebrow: isEn ? "Article" : "Αρθρο",
    title: title ?? fallbackTitle,
    subtitle: excerpt ?? fallbackExcerpt,
    badges,
  });
}
