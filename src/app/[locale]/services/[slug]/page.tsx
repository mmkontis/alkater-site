import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/queries";
import { getAlternates, getAbsoluteUrl, getOgLocale, serviceJsonLd, breadcrumbJsonLd, getSiteName, pickByLocale } from "@/lib/seo";
import ServiceDetailClient from "./service-detail";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = await getServiceBySlug(slug, locale);
  if (!service) return {};

  const url = getAbsoluteUrl(`/services/${slug}`, locale);
  return {
    title: service.name,
    description: service.description,
    alternates: getAlternates(`/services/${slug}`),
    openGraph: {
      title: service.name,
      description: service.description,
      type: "website",
      url,
      locale: getOgLocale(locale),
      siteName: getSiteName(locale),
      images: service.image_url ? [{ url: service.image_url, width: 1200, height: 630, alt: service.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: service.name,
      description: service.description,
      images: service.image_url ? [service.image_url] : [],
    },
  };
}

function pickLocalized<T>(row: Record<string, unknown>, base: string, locale: string): T {
  if (locale === "de") return (row[`${base}_de`] || row[`${base}_en`] || row[base]) as T;
  if (locale === "en") return (row[`${base}_en`] || row[base]) as T;
  return row[base] as T;
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;

  const service = await getServiceBySlug(slug, locale);
  if (!service) notFound();

  const supabase = await createClient();

  let projects: { id: string; slug: string; title: string; location: string; category: string; description: string; image_url: string | null; sort_order: number }[] = [];

  if (locale === "el") {
    const { data } = await supabase
      .from("projects")
      .select("id, slug, title, location, category, description, image_url, sort_order")
      .eq("service_id", service.id)
      .eq("published", true)
      .order("sort_order", { ascending: true });
    projects = data ?? [];
  } else {
    const { data } = await supabase
      .from("projects")
      .select("id, slug, title, title_en, title_de, location, category, description, description_en, description_de, image_url, sort_order")
      .eq("service_id", service.id)
      .eq("published", true)
      .order("sort_order", { ascending: true });

    projects = (data ?? []).map((p) => {
      const row = p as Record<string, unknown>;
      return {
        id: row.id as string,
        slug: row.slug as string,
        title: pickLocalized<string>(row, "title", locale),
        location: row.location as string,
        category: row.category as string,
        description: pickLocalized<string>(row, "description", locale),
        image_url: row.image_url as string | null,
        sort_order: row.sort_order as number,
      };
    });
  }

  const url = getAbsoluteUrl(`/services/${slug}`, locale);
  const homeLabel = pickByLocale(locale, "Αρχική", "Home", "Startseite");
  const servicesLabel = pickByLocale(locale, "Υπηρεσίες", "Services", "Leistungen");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          serviceJsonLd({ name: service.name, description: service.description, url, image: service.image_url ?? undefined, locale }),
          breadcrumbJsonLd([
            { name: homeLabel, url: getAbsoluteUrl("", locale) },
            { name: servicesLabel, url: getAbsoluteUrl("", locale) + "#services" },
            { name: service.name, url },
          ]),
        ]) }}
      />
      <ServiceDetailClient service={service} projects={projects} />
    </>
  );
}
