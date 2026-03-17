-- Migration: Add slug column to services table
-- Run this in your Supabase SQL Editor

-- 1. Add slug column (nullable initially)
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS slug TEXT;

-- 2. Generate slugs for existing services based on their name
-- This handles Greek characters by transliterating to latin
UPDATE public.services SET slug = 'asfaltostroseis' WHERE name = 'Ασφαλτοστρώσεις' AND slug IS NULL;
UPDATE public.services SET slug = 'diagrammiseis-odon' WHERE name = 'Διαγραμμίσεις Οδών' AND slug IS NULL;
UPDATE public.services SET slug = 'chomatourgika-ypodomes' WHERE name = 'Χωματουργικά & Υποδομές' AND slug IS NULL;
UPDATE public.services SET slug = 'dimosia-erga' WHERE name = 'Δημόσια Έργα' AND slug IS NULL;
UPDATE public.services SET slug = 'technikes-meletes' WHERE name = 'Τεχνικές Μελέτες' AND slug IS NULL;
UPDATE public.services SET slug = 'poiotikos-elegchos' WHERE name = 'Ποιοτικός Έλεγχος' AND slug IS NULL;

-- For any remaining services without a slug, generate one from the id
UPDATE public.services SET slug = 'service-' || LEFT(id::text, 8) WHERE slug IS NULL;

-- 3. Make slug NOT NULL and UNIQUE
ALTER TABLE public.services ALTER COLUMN slug SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS services_slug_unique ON public.services (slug);
