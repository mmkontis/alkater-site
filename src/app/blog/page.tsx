import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Blog - Alkater",
  description: "Νέα και ενημερώσεις από την Alkater Τεχνική Εταιρεία",
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#F5F3EF]">
      <header className="border-b border-zinc-200 bg-white px-8 py-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/"
            className="text-sm font-medium text-[#1B7A7A] hover:underline"
          >
            &larr; Αρχική
          </Link>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-zinc-800">
            Blog
          </h1>
          <p className="mt-1 text-zinc-500">
            Νέα, ενημερώσεις και άρθρα από την Alkater
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-8 py-10">
        {(!posts || posts.length === 0) && (
          <div className="rounded-xl border border-dashed border-zinc-300 bg-white py-20 text-center">
            <p className="text-lg text-zinc-400">
              Δεν υπάρχουν δημοσιευμένα άρθρα ακόμα.
            </p>
          </div>
        )}

        <div className="space-y-6">
          {posts?.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex gap-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="h-32 w-48 shrink-0 rounded-lg object-cover"
                />
              )}
              <div className="flex flex-col justify-center">
                <p className="text-xs font-medium text-zinc-400">
                  {new Date(post.created_at).toLocaleDateString("el-GR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h2 className="mt-1 text-xl font-bold text-zinc-800 transition-colors group-hover:text-[#1B7A7A]">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500">
                    {post.excerpt}
                  </p>
                )}
                <span className="mt-3 text-xs font-semibold text-[#8B2020]">
                  Διαβάστε περισσότερα &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
