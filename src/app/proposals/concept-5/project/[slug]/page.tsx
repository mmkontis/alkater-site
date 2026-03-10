"use client";

import { useParams } from "next/navigation";
import { ProjectSubpage } from "@/components/landing/ProjectSubpage";

export default function ProjectDetailPage() {
  const params = useParams<{ slug: string }>();
  return <ProjectSubpage slug={params.slug} />;
}
