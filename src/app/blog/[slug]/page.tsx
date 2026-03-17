import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/queries";
import BlogArticleClient from "./BlogArticleClient";

export const dynamic = "force-dynamic";

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return (
    <BlogArticleClient
      coverImage={post.cover_image ?? "/HighRes/image-1772752810544.png"}
      title={post.title}
      excerpt={post.excerpt}
      date={post.created_at}
      content={post.content}
    />
  );
}
