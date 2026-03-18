import { createClient } from "@/lib/supabase/server";
import BlogArticleContent from "./BlogArticleContent";

export default async function BlogArticlePage() {
  const supabase = await createClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt, cover_image, created_at")
    .eq("slug", "simassia-sintirissis-odikon-diktyon")
    .eq("published", true)
    .single();

  return (
    <BlogArticleContent
      coverImage={post?.cover_image ?? "/HighRes/image-1772752810544.png"}
      title={post?.title}
      excerpt={post?.excerpt}
      date={post?.created_at}
    />
  );
}
