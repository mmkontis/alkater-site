import { createClient } from "@/lib/supabase/server";

// ── Types (clean — no _en fields exposed) ──

export type HeroSlide = {
  id: string;
  heading: string;
  heading_accent: string;
  subtitle: string;
  video_url: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
  created_at?: string;
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

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  created_at: string;
};

export type BlogPostFull = BlogPost & { content: string | null };

export type TeamMember = {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  job_title: string;
  bio: string;
  photo_url: string | null;
  sort_order: number;
};

export type AboutPageContent = {
  hero: { label: string; title: string; title_accent: string; subtitle: string; image: string };
  stats: { value: string; label: string }[];
  mission: { label: string; title: string; title_accent: string; paragraphs: string[]; image: string };
  values: { label: string; title: string; title_accent: string; items: { icon: string; title: string; desc: string }[] };
  milestones: { label: string; title: string; title_accent: string; items: { year: string; text: string }[] };
};

// ── Queries ──

export async function getHeroSlides(locale: string = "el"): Promise<HeroSlide[]> {
  const supabase = await createClient();

  if (locale === "el") {
    const { data } = await supabase
      .from("hero_slides")
      .select("id, heading, heading_accent, subtitle, video_url, image_url, sort_order, published, created_at")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    return data ?? [];
  }

  const { data } = await supabase
    .from("hero_slides")
    .select("id, heading, heading_en, heading_accent, heading_accent_en, subtitle, subtitle_en, video_url, image_url, sort_order, published, created_at")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id,
    heading: row.heading_en || row.heading,
    heading_accent: row.heading_accent_en || row.heading_accent,
    subtitle: row.subtitle_en || row.subtitle,
    video_url: row.video_url,
    image_url: row.image_url,
    sort_order: row.sort_order,
    published: row.published,
    created_at: row.created_at,
  }));
}

export async function getServices(locale: string = "el"): Promise<Service[]> {
  const supabase = await createClient();

  if (locale === "el") {
    const { data } = await supabase
      .from("services")
      .select("id, slug, name, description, icon, image_url, video_url, video_start_time, sort_order")
      .order("sort_order", { ascending: true });
    return data ?? [];
  }

  const { data } = await supabase
    .from("services")
    .select("id, slug, name, name_en, description, description_en, icon, image_url, video_url, video_start_time, sort_order")
    .order("sort_order", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name_en || row.name,
    description: row.description_en || row.description,
    icon: row.icon,
    image_url: row.image_url,
    video_url: row.video_url,
    video_start_time: row.video_start_time,
    sort_order: row.sort_order,
  }));
}

export async function getServiceBySlug(slug: string, locale: string = "el"): Promise<Service | null> {
  const supabase = await createClient();

  if (locale === "el") {
    const { data } = await supabase
      .from("services")
      .select("id, slug, name, description, icon, image_url, video_url, video_start_time, sort_order")
      .eq("slug", slug)
      .single();
    return data;
  }

  const { data } = await supabase
    .from("services")
    .select("id, slug, name, name_en, description, description_en, icon, image_url, video_url, video_start_time, sort_order")
    .eq("slug", slug)
    .single();

  if (!data) return null;
  return {
    id: data.id,
    slug: data.slug,
    name: data.name_en || data.name,
    description: data.description_en || data.description,
    icon: data.icon,
    image_url: data.image_url,
    video_url: data.video_url,
    video_start_time: data.video_start_time,
    sort_order: data.sort_order,
  };
}

export async function getProjects(locale: string = "el"): Promise<Project[]> {
  const supabase = await createClient();

  if (locale === "el") {
    const { data } = await supabase
      .from("projects")
      .select("id, slug, title, location, category, description, image_url, gallery, year, client, scope, duration, sort_order, service_id")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    return data ?? [];
  }

  const { data } = await supabase
    .from("projects")
    .select("id, slug, title, title_en, location, category, description, description_en, image_url, gallery, year, client, scope, duration, sort_order, service_id")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title_en || row.title,
    location: row.location,
    category: row.category,
    description: row.description_en || row.description,
    image_url: row.image_url,
    gallery: row.gallery,
    year: row.year,
    client: row.client,
    scope: row.scope,
    duration: row.duration,
    sort_order: row.sort_order,
    service_id: row.service_id,
  }));
}

export async function getProjectBySlug(slug: string, locale: string = "el"): Promise<Project | null> {
  const supabase = await createClient();

  if (locale === "el") {
    const { data } = await supabase
      .from("projects")
      .select("id, slug, title, location, category, description, image_url, gallery, year, client, scope, duration, sort_order, service_id")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    return data;
  }

  const { data } = await supabase
    .from("projects")
    .select("id, slug, title, title_en, location, category, description, description_en, image_url, gallery, year, client, scope, duration, sort_order, service_id")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) return null;
  return {
    id: data.id,
    slug: data.slug,
    title: data.title_en || data.title,
    location: data.location,
    category: data.category,
    description: data.description_en || data.description,
    image_url: data.image_url,
    gallery: data.gallery,
    year: data.year,
    client: data.client,
    scope: data.scope,
    duration: data.duration,
    sort_order: data.sort_order,
    service_id: data.service_id,
  };
}

export async function getBlogPosts(locale: string = "el"): Promise<BlogPost[]> {
  const supabase = await createClient();

  if (locale === "el") {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, cover_image, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false });
    return data ?? [];
  }

  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, title_en, slug, excerpt, excerpt_en, cover_image, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title_en || row.title,
    slug: row.slug,
    excerpt: row.excerpt_en || row.excerpt,
    cover_image: row.cover_image,
    created_at: row.created_at,
  }));
}

export async function getBlogPostBySlug(slug: string, locale: string = "el"): Promise<BlogPostFull | null> {
  const supabase = await createClient();

  if (locale === "el") {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, cover_image, created_at, content")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    return data;
  }

  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, title_en, slug, excerpt, excerpt_en, cover_image, created_at, content, content_en")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) return null;
  return {
    id: data.id,
    title: data.title_en || data.title,
    slug: data.slug,
    excerpt: data.excerpt_en || data.excerpt,
    cover_image: data.cover_image,
    created_at: data.created_at,
    content: data.content_en || data.content,
  };
}

export async function getPageContent(pageKey: string, locale: string = "el"): Promise<AboutPageContent | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("page_content")
    .select("content, content_en")
    .eq("page_key", pageKey)
    .single();
  if (!data) return null;
  if (locale === "en" && data.content_en) return data.content_en as unknown as AboutPageContent;
  return data.content as unknown as AboutPageContent ?? null;
}

export async function getTeamMembers(locale: string = "el"): Promise<TeamMember[]> {
  const supabase = await createClient();

  if (locale === "el") {
    const { data } = await supabase
      .from("team_members")
      .select("id, first_name, last_name, email, job_title, bio, photo_url, sort_order")
      .order("sort_order", { ascending: true });
    return data ?? [];
  }

  const { data } = await supabase
    .from("team_members")
    .select("id, first_name, last_name, email, job_title, job_title_en, bio, bio_en, photo_url, sort_order")
    .order("sort_order", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
    job_title: row.job_title_en || row.job_title,
    bio: row.bio_en || row.bio,
    photo_url: row.photo_url,
    sort_order: row.sort_order,
  }));
}
