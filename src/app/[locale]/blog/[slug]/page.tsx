import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/queries";
import { getAlternates, getAbsoluteUrl, articleJsonLd, breadcrumbJsonLd, getSiteName } from "@/lib/seo";
import BlogArticleClient from "./BlogArticleClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getBlogPostBySlug(slug, locale);
  if (!post) return {};

  const url = getAbsoluteUrl(`/blog/${slug}`, locale);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: getAlternates(`/blog/${slug}`),
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

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const post = await getBlogPostBySlug(slug, locale);

  if (!post) notFound();

  const url = getAbsoluteUrl(`/blog/${slug}`, locale);
  const homeLabel = locale === "el" ? "Αρχική" : "Home";
  const blogLabel = locale === "el" ? "Άρθρα" : "Articles";

  return (
    <>
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
      <BlogArticleClient
        coverImage={post.cover_image ?? "/HighRes/image-1772752810544.png"}
        title={post.title}
        excerpt={post.excerpt}
        date={post.created_at}
        content={post.content}
      />
    </>
  );
}
