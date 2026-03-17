import { ProjectSubpage } from "@/components/landing/ProjectSubpage";
import { ThemeProvider } from "@/components/landing/ThemeContext";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <ThemeProvider>
      <ProjectSubpage slug={slug} />
    </ThemeProvider>
  );
}
