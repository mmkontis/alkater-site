import type { Metadata } from "next";
import { ProjectSubpage } from "@/components/landing/ProjectSubpage";
import { ThemeProvider } from "@/components/landing/ThemeContext";
import { PROJECTS } from "@/lib/projects";
import { getAlternates, getAbsoluteUrl, breadcrumbJsonLd, getSiteName } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};

  const url = getAbsoluteUrl(`/projects/${slug}`, locale);
  return {
    title: project.title,
    description: project.description.slice(0, 160),
    alternates: getAlternates(`/projects/${slug}`),
    openGraph: {
      title: project.title,
      description: project.description.slice(0, 160),
      type: "website",
      url,
      locale: locale === "el" ? "el_GR" : "en_US",
      siteName: getSiteName(locale),
      images: [{ url: project.image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description.slice(0, 160),
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  const homeLabel = locale === "el" ? "Αρχική" : "Home";
  const projectsLabel = locale === "el" ? "Έργα" : "Projects";

  return (
    <ThemeProvider>
      {project && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: homeLabel, url: getAbsoluteUrl("", locale) },
              { name: projectsLabel, url: getAbsoluteUrl("", locale) + "#projects" },
              { name: project.title, url: getAbsoluteUrl(`/projects/${slug}`, locale) },
            ]),
          ) }}
        />
      )}
      <ProjectSubpage slug={slug} />
    </ThemeProvider>
  );
}
