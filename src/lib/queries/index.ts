import { createClient } from "@/lib/supabase/server";

// ── Types (clean — no _en/_de fields exposed) ──

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

// Pick the localized value for a row, with fallback chain: locale → en → el.
function pick<T>(row: Record<string, unknown>, base: string, locale: string): T {
  if (locale === "de") {
    return (row[`${base}_de`] || row[`${base}_en`] || row[base]) as T;
  }
  if (locale === "en") {
    return (row[`${base}_en`] || row[base]) as T;
  }
  return row[base] as T;
}

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
    .select("id, heading, heading_en, heading_de, heading_accent, heading_accent_en, heading_accent_de, subtitle, subtitle_en, subtitle_de, video_url, image_url, sort_order, published, created_at")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id as string,
    heading: pick<string>(row, "heading", locale),
    heading_accent: pick<string>(row, "heading_accent", locale),
    subtitle: pick<string>(row, "subtitle", locale),
    video_url: row.video_url as string | null,
    image_url: row.image_url as string | null,
    sort_order: row.sort_order as number,
    published: row.published as boolean,
    created_at: row.created_at as string | undefined,
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
    .select("id, slug, name, name_en, name_de, description, description_en, description_de, icon, image_url, video_url, video_start_time, sort_order")
    .order("sort_order", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id as string,
    slug: row.slug as string,
    name: pick<string>(row, "name", locale),
    description: pick<string>(row, "description", locale),
    icon: row.icon as string,
    image_url: row.image_url as string | null,
    video_url: row.video_url as string | null,
    video_start_time: row.video_start_time as number,
    sort_order: row.sort_order as number,
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
    .select("id, slug, name, name_en, name_de, description, description_en, description_de, icon, image_url, video_url, video_start_time, sort_order")
    .eq("slug", slug)
    .single();

  if (!data) return null;
  const row = data as Record<string, unknown>;
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: pick<string>(row, "name", locale),
    description: pick<string>(row, "description", locale),
    icon: row.icon as string,
    image_url: row.image_url as string | null,
    video_url: row.video_url as string | null,
    video_start_time: row.video_start_time as number,
    sort_order: row.sort_order as number,
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
    .select("id, slug, title, title_en, title_de, location, category, description, description_en, description_de, image_url, gallery, year, client, scope, duration, sort_order, service_id")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id as string,
    slug: row.slug as string,
    title: pick<string>(row, "title", locale),
    location: row.location as string,
    category: row.category as string,
    description: pick<string>(row, "description", locale),
    image_url: row.image_url as string,
    gallery: row.gallery as string[],
    year: row.year as string,
    client: row.client as string,
    scope: row.scope as string[],
    duration: row.duration as string,
    sort_order: row.sort_order as number,
    service_id: row.service_id as string | null,
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
    .select("id, slug, title, title_en, title_de, location, category, description, description_en, description_de, image_url, gallery, year, client, scope, duration, sort_order, service_id")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) return null;
  const row = data as Record<string, unknown>;
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: pick<string>(row, "title", locale),
    location: row.location as string,
    category: row.category as string,
    description: pick<string>(row, "description", locale),
    image_url: row.image_url as string,
    gallery: row.gallery as string[],
    year: row.year as string,
    client: row.client as string,
    scope: row.scope as string[],
    duration: row.duration as string,
    sort_order: row.sort_order as number,
    service_id: row.service_id as string | null,
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
    .select("id, title, title_en, title_de, slug, excerpt, excerpt_en, excerpt_de, cover_image, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (data ?? []).map((row) => ({
    id: row.id as string,
    title: pick<string>(row, "title", locale),
    slug: row.slug as string,
    excerpt: pick<string>(row, "excerpt", locale),
    cover_image: row.cover_image as string | null,
    created_at: row.created_at as string,
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
    .select("id, title, title_en, title_de, slug, excerpt, excerpt_en, excerpt_de, cover_image, created_at, content, content_en, content_de")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) return null;
  const row = data as Record<string, unknown>;
  return {
    id: row.id as string,
    title: pick<string>(row, "title", locale),
    slug: row.slug as string,
    excerpt: pick<string>(row, "excerpt", locale),
    cover_image: row.cover_image as string | null,
    created_at: row.created_at as string,
    content: pick<string | null>(row, "content", locale),
  };
}

export async function getPageContent(pageKey: string, locale: string = "el"): Promise<AboutPageContent | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("page_content")
    .select("content, content_en, content_de")
    .eq("page_key", pageKey)
    .single();
  if (!data) return null;
  if (locale === "de" && data.content_de) return data.content_de as unknown as AboutPageContent;
  if (locale === "de" && data.content_en) return data.content_en as unknown as AboutPageContent;
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
    .select("id, first_name, last_name, email, job_title, job_title_en, job_title_de, bio, bio_en, bio_de, photo_url, sort_order")
    .order("sort_order", { ascending: true });

  return (data ?? []).map((row) => ({
    id: row.id as string,
    first_name: row.first_name as string,
    last_name: row.last_name as string,
    email: row.email as string | null,
    job_title: pick<string>(row, "job_title", locale),
    bio: pick<string>(row, "bio", locale),
    photo_url: row.photo_url as string | null,
    sort_order: row.sort_order as number,
  }));
}
