-- Alkater CMS: Services + Projects + Blog + Contact Submissions + Storage
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)

-- ═══════════════════════════════════════
-- SERVICES (project categories)
-- ═══════════════════════════════════════

create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text not null default '',
  icon text not null default '',
  image_url text,
  video_url text,
  video_start_time real default 0,
  sort_order integer not null default 0,
  name_en text,
  description_en text,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;

create policy "Services are viewable by everyone"
  on public.services for select
  using (true);

create policy "Authenticated users have full access to services"
  on public.services for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ═══════════════════════════════════════
-- PROJECTS
-- ═══════════════════════════════════════

create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique,
  description text not null default '',
  category text not null default '',
  location text not null default '',
  image_url text,
  gallery text[] not null default '{}',
  year text not null default '',
  client text not null default '',
  scope text[] not null default '{}',
  duration text not null default '',
  sort_order integer not null default 0,
  service_id uuid references public.services(id) on delete set null,
  published boolean not null default false,
  title_en text,
  description_en text,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Published projects are viewable by everyone"
  on public.projects for select
  using (published = true);

create policy "Authenticated users have full access to projects"
  on public.projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ═══════════════════════════════════════
-- BLOG POSTS
-- ═══════════════════════════════════════

create table if not exists public.blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  published boolean not null default false,
  title_en text,
  excerpt_en text,
  content_en text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "Published blog posts are viewable by everyone"
  on public.blog_posts for select
  using (published = true);

create policy "Authenticated users have full access to blog posts"
  on public.blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ═══════════════════════════════════════
-- CONTACT SUBMISSIONS
-- ═══════════════════════════════════════

create table if not exists public.contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Anyone can insert (public contact form)
create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  with check (true);

-- Only authenticated users can view/manage submissions
create policy "Authenticated users can view contact submissions"
  on public.contact_submissions for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update contact submissions"
  on public.contact_submissions for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete contact submissions"
  on public.contact_submissions for delete
  using (auth.role() = 'authenticated');

-- ═══════════════════════════════════════
-- HERO SLIDES
-- ═══════════════════════════════════════

create table if not exists public.hero_slides (
  id uuid default gen_random_uuid() primary key,
  heading text not null default '',
  heading_accent text not null default '',
  subtitle text not null default '',
  video_url text,
  image_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  heading_en text,
  heading_accent_en text,
  subtitle_en text,
  created_at timestamptz not null default now()
);

alter table public.hero_slides enable row level security;

create policy "Hero slides are viewable by everyone"
  on public.hero_slides for select
  using (true);

create policy "Authenticated users have full access to hero slides"
  on public.hero_slides for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ═══════════════════════════════════════
-- STORAGE BUCKETS
-- ═══════════════════════════════════════

-- Create the "media" bucket (public so images can be served via URL)
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Anyone can view files in the media bucket (public bucket)
create policy "Public read access for media"
  on storage.objects for select
  using (bucket_id = 'media');

-- Only authenticated users can upload
create policy "Authenticated users can upload media"
  on storage.objects for insert
  with check (
    bucket_id = 'media'
    and auth.role() = 'authenticated'
  );

-- Only authenticated users can update their uploads
create policy "Authenticated users can update media"
  on storage.objects for update
  using (
    bucket_id = 'media'
    and auth.role() = 'authenticated'
  );

-- Only authenticated users can delete
create policy "Authenticated users can delete media"
  on storage.objects for delete
  using (
    bucket_id = 'media'
    and auth.role() = 'authenticated'
  );

-- ═══════════════════════════════════════
-- PAGE CONTENT (flexible CMS for static pages)
-- ═══════════════════════════════════════

create table if not exists public.page_content (
  id uuid default gen_random_uuid() primary key,
  page_key text unique not null,
  content jsonb not null default '{}',
  content_en jsonb,
  updated_at timestamptz not null default now()
);

alter table public.page_content enable row level security;

create policy "Page content is viewable by everyone"
  on public.page_content for select
  using (true);

create policy "Authenticated users have full access to page content"
  on public.page_content for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ═══════════════════════════════════════
-- TEAM MEMBERS
-- ═══════════════════════════════════════

create table if not exists public.team_members (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text,
  job_title text not null default '',
  bio text not null default '',
  photo_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  job_title_en text,
  bio_en text,
  created_at timestamptz not null default now()
);

alter table public.team_members enable row level security;

create policy "Published team members are viewable by everyone"
  on public.team_members for select
  using (published = true);

create policy "Authenticated users have full access to team members"
  on public.team_members for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ═══════════════════════════════════════
-- ADMIN USER
-- ═══════════════════════════════════════
-- Created via Supabase Auth Admin API (not SQL).
-- Email:    alkater2024@outlook.com
-- Password: Alk@t3r!Adm1n#2024$Xq
-- NOTE: This repo is private. If it ever becomes public, rotate this password immediately.
