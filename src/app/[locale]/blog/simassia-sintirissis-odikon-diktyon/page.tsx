import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getAlternates, getAbsoluteUrl, articleJsonLd, breadcrumbJsonLd, getSiteName } from "@/lib/seo";
import BlogArticleContent from "./BlogArticleContent";

const SLUG = "simassia-sintirissis-odikon-diktyon";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt, cover_image, created_at")
    .eq("slug", SLUG)
    .eq("published", true)
    .single();

  if (!post) return {};

  const url = getAbsoluteUrl(`/blog/${SLUG}`, locale);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: getAlternates(`/blog/${SLUG}`),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.created_at,
      locale: locale === "el" ? "el_GR" : "en_US",
      siteName: getSiteName(locale),
      images: post.cover_image ? [{ url: post.cover_image, width: 1200, height: 630, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : [],
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt, cover_image, created_at")
    .eq("slug", SLUG)
    .eq("published", true)
    .single();

  const url = getAbsoluteUrl(`/blog/${SLUG}`, locale);
  const homeLabel = locale === "el" ? "Αρχική" : "Home";
  const blogLabel = locale === "el" ? "Άρθρα" : "Articles";

  return (
    <>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([
            articleJsonLd({ title: post.title, description: post.excerpt, url, image: post.cover_image ?? undefined, datePublished: post.created_at, locale }),
            breadcrumbJsonLd([
              { name: homeLabel, url: getAbsoluteUrl("", locale) },
              { name: blogLabel, url: getAbsoluteUrl("", locale) + "#blog" },
              { name: post.title, url },
            ]),
          ]) }}
        />
      )}
      <BlogArticleContent
        coverImage={post?.cover_image ?? "/HighRes/image-1772752810544.png"}
        title={post?.title}
        excerpt={post?.excerpt}
        date={post?.created_at}
      />
    </>
  );
}
