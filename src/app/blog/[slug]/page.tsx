import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) return { title: "Δεν βρέθηκε - Alkater" };

  return {
    title: `${post.title} - Alkater Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <header className="border-b border-zinc-200 bg-white px-8 py-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-sm font-medium text-[#1B7A7A] hover:underline"
          >
            &larr; Blog
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-8 py-10">
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="mb-8 h-64 w-full rounded-xl object-cover shadow-md"
          />
        )}

        <p className="text-sm font-medium text-zinc-400">
          {new Date(post.created_at).toLocaleDateString("el-GR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-zinc-800 md:text-4xl">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="mt-4 text-lg leading-relaxed text-zinc-500">
            {post.excerpt}
          </p>
        )}

        <hr className="my-8 border-zinc-200" />

        <div className="prose prose-zinc max-w-none whitespace-pre-wrap text-zinc-700 leading-relaxed">
          {post.content}
        </div>
      </article>
    </div>
  );
}
