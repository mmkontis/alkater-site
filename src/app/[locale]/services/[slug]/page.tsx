import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/lib/queries";
import { getAlternates, getAbsoluteUrl, serviceJsonLd, breadcrumbJsonLd, getSiteName } from "@/lib/seo";
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
      locale: locale === "el" ? "el_GR" : "en_US",
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

export default async function ServicePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;

  const service = await getServiceBySlug(slug, locale);
  if (!service) notFound();

  const supabase = await createClient();

  if (locale === "en") {
    const { data } = await supabase
      .from("projects")
      .select("id, slug, title, title_en, location, category, description, description_en, image_url, sort_order")
      .eq("service_id", service.id)
      .eq("published", true)
      .order("sort_order", { ascending: true });

    const projects = (data ?? []).map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title_en || p.title,
      location: p.location,
      category: p.category,
      description: p.description_en || p.description,
      image_url: p.image_url,
      sort_order: p.sort_order,
    }));

    const url = getAbsoluteUrl(`/services/${slug}`, locale);
    const homeLabel = "Home";
    const servicesLabel = "Services";

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

  const { data: projects } = await supabase
    .from("projects")
    .select("id, slug, title, location, category, description, image_url, sort_order")
    .eq("service_id", service.id)
    .eq("published", true)
    .order("sort_order", { ascending: true });

  const url = getAbsoluteUrl(`/services/${slug}`, locale);
  const homeLabel = locale === "el" ? "Αρχική" : "Home";
  const servicesLabel = locale === "el" ? "Υπηρεσίες" : "Services";

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
      <ServiceDetailClient service={service} projects={projects ?? []} />
    </>
  );
}
