import { createClient } from "@/lib/supabase/server";
import { OG_SIZE, OG_CONTENT_TYPE, renderBrandOg } from "@/lib/og/shell";

const SLUG = "simassia-sintirissis-odikon-diktyon";

export const runtime = "nodejs";
export const alt = "ALKATER — Article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

function localized<T>(row: Record<string, unknown>, base: string, locale: string): T | null {
  if (locale === "de") return (row[`${base}_de`] || row[`${base}_en`] || row[base] || null) as T | null;
  if (locale === "en") return (row[`${base}_en`] || row[base] || null) as T | null;
  return (row[base] || null) as T | null;
}

export default async function TwitterImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let title: string | null = null;
  let excerpt: string | null = null;
  let createdAt: string | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("title, title_en, title_de, excerpt, excerpt_en, excerpt_de, created_at")
      .eq("slug", SLUG)
      .eq("published", true)
      .single();
    if (data) {
      const row = data as Record<string, unknown>;
      title = localized<string>(row, "title", locale);
      excerpt = localized<string>(row, "excerpt", locale);
      createdAt = (row.created_at as string | null) ?? null;
    }
  } catch {}

  const eyebrow = locale === "de" ? "Artikel" : locale === "en" ? "Article" : "Αρθρο";
  const fallbackTitle =
    locale === "de"
      ? "Bedeutung der Straßennetz-Instandhaltung"
      : locale === "en"
        ? "Importance of road network maintenance"
        : "Σημασια συντηρησης οδικων δικτυων";
  const fallbackExcerpt =
    locale === "de"
      ? "Warum die regelmäßige Wartung von Straßennetzen eine Investition in Sicherheit, Wirtschaftlichkeit und Nachhaltigkeit ist."
      : locale === "en"
        ? "Why regular maintenance of road networks is an investment in safety, economy and sustainability."
        : "Γιατί η τακτική συντήρηση των οδικών δικτύων είναι επένδυση σε ασφάλεια, οικονομία και βιωσιμότητα.";

  const dateLocale = locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : "el-GR";

  const badges: string[] = [];
  if (createdAt) {
    const date = new Date(createdAt);
    if (!isNaN(date.getTime())) {
      badges.push(
        date.toLocaleDateString(dateLocale, {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );
    }
  }
  badges.push(locale === "el" ? "ΑΛΚΑΤΕΡ Blog" : "ALKATER Blog");

  return renderBrandOg({
    locale,
    eyebrow,
    title: title ?? fallbackTitle,
    subtitle: excerpt ?? fallbackExcerpt,
    badges,
  });
}
