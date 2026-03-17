import { createClient } from "@/lib/supabase/server";

// ── Types ──

export type HeroSlide = {
  id: string;
  heading: string;
  heading_accent: string;
  subtitle: string;
  video_url: string;
  sort_order: number;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  image_url: string | null;
  video_url: string | null;
  video_start_time: number;
  sort_order: number;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  description: string;
  image_url: string;
  gallery: string[];
  year: string;
  client: string;
  scope: string[];
  duration: string;
  sort_order: number;
  service_id: string | null;
};

// ── Queries ──

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hero_slides")
    .select("id, heading, heading_accent, subtitle, video_url, sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, slug, name, description, icon, image_url, video_url, video_start_time, sort_order")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, slug, title, location, category, description, image_url, gallery, year, client, scope, duration, sort_order, service_id")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, slug, name, description, icon, image_url, video_url, video_start_time, sort_order")
    .eq("slug", slug)
    .single();
  return data;
}

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  created_at: string;
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, cover_image, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export type BlogPostFull = BlogPost & { content: string | null };

export async function getBlogPostBySlug(slug: string): Promise<BlogPostFull | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, content, cover_image, created_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, slug, title, location, category, description, image_url, gallery, year, client, scope, duration, sort_order, service_id")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
}
