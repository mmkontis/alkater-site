-- ═══════════════════════════════════════════════════════════════
-- Full schema migration (slug + i18n + hero slides)
-- Project: pweugxepihnxrewqxehb
-- Status: ALREADY APPLIED — kept for reference / fresh deploys
-- ═══════════════════════════════════════════════════════════════

-- ── 1. Services slug column ──

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS slug TEXT;

UPDATE public.services SET slug = 'asfaltostroseis' WHERE name = 'Ασφαλτοστρώσεις' AND slug IS NULL;
UPDATE public.services SET slug = 'diagrammiseis-odon' WHERE name = 'Διαγραμμίσεις Οδών' AND slug IS NULL;
UPDATE public.services SET slug = 'chomatourgika-ypodomes' WHERE name = 'Χωματουργικά & Υποδομές' AND slug IS NULL;
UPDATE public.services SET slug = 'dimosia-erga' WHERE name = 'Δημόσια Έργα' AND slug IS NULL;
UPDATE public.services SET slug = 'technikes-meletes' WHERE name = 'Τεχνικές Μελέτες' AND slug IS NULL;
UPDATE public.services SET slug = 'poiotikos-elegchos' WHERE name = 'Ποιοτικός Έλεγχος' AND slug IS NULL;

UPDATE public.services SET slug = 'service-' || LEFT(id::text, 8) WHERE slug IS NULL;

ALTER TABLE public.services ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS services_slug_unique ON public.services (slug);

-- ── 2. Hero Slides table ──

CREATE TABLE IF NOT EXISTS public.hero_slides (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  heading text NOT NULL DEFAULT '',
  heading_accent text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  video_url text,
  image_url text,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  heading_en text,
  heading_accent_en text,
  subtitle_en text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'hero_slides' AND policyname = 'Hero slides are viewable by everyone') THEN
    CREATE POLICY "Hero slides are viewable by everyone"
      ON public.hero_slides FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'hero_slides' AND policyname = 'Authenticated users have full access to hero slides') THEN
    CREATE POLICY "Authenticated users have full access to hero slides"
      ON public.hero_slides FOR ALL
      USING (auth.role() = 'authenticated')
      WITH CHECK (auth.role() = 'authenticated');
  END IF;
END $$;

-- ── 3. English translation columns ──

-- Services
ALTER TABLE services ADD COLUMN IF NOT EXISTS name_en TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS description_en TEXT;

-- Projects
ALTER TABLE projects ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS description_en TEXT;

-- Blog posts
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt_en TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS content_en TEXT;

-- Hero slides (in case table existed before this migration)
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS heading_en TEXT;
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS heading_accent_en TEXT;
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS subtitle_en TEXT;
ALTER TABLE hero_slides ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Page content (About page — JSONB)
ALTER TABLE page_content ADD COLUMN IF NOT EXISTS content_en JSONB;

-- Team members
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS job_title_en TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS bio_en TEXT;
