import { getBlogPostBySlug } from "@/lib/queries";
import { OG_SIZE, OG_CONTENT_TYPE, renderBrandOg } from "@/lib/og/shell";

export const runtime = "nodejs";
export const alt = "ALKATER — Article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = await getBlogPostBySlug(slug, locale).catch(() => null);

  const eyebrow = locale === "de" ? "Artikel" : locale === "en" ? "Article" : "Αρθρο";
  const fallbackTitle =
    locale === "de" ? "ALKATER Artikel" : locale === "en" ? "Construction Insights" : "Άρθρο της ΑΛΚΑΤΕΡ";
  const fallbackSubtitle =
    locale === "de"
      ? "Praktische Einblicke aus dem Straßen- und Tiefbau."
      : locale === "en"
        ? "Practical insights from the road and infrastructure construction industry."
        : "Πρακτικές αναλύσεις από τον κλάδο της οδοποιίας και των τεχνικών έργων.";

  const title = post?.title ?? fallbackTitle;
  const subtitle = post?.excerpt ?? fallbackSubtitle;

  const dateLocale = locale === "de" ? "de-DE" : locale === "en" ? "en-GB" : "el-GR";

  const badges: string[] = [];
  if (post?.created_at) {
    const date = new Date(post.created_at);
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
    title,
    subtitle,
    badges,
  });
}
