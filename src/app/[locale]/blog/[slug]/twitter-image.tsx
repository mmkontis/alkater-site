import { getBlogPostBySlug } from "@/lib/queries";
import { OG_SIZE, OG_CONTENT_TYPE, renderBrandOg } from "@/lib/og/shell";

export const runtime = "nodejs";
export const alt = "ALKATER — Article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function TwitterImage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = await getBlogPostBySlug(slug, locale).catch(() => null);
  const isEn = locale === "en";

  const eyebrow = isEn ? "Article" : "Αρθρο";
  const title = post?.title ?? (isEn ? "Construction Insights" : "Άρθρο της ΑΛΚΑΤΕΡ");
  const subtitle =
    post?.excerpt ??
    (isEn
      ? "Practical insights from the road and infrastructure construction industry."
      : "Πρακτικές αναλύσεις από τον κλάδο της οδοποιίας και των τεχνικών έργων.");

  const badges: string[] = [];
  if (post?.created_at) {
    const date = new Date(post.created_at);
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

  return renderBrandOg({ locale, eyebrow, title, subtitle, badges });
}
