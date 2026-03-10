"use client";

import { useParams } from "next/navigation";
import { ProjectSubpage } from "@/components/landing/ProjectSubpage";

export default function SubprojectDetailPage() {
  const params = useParams<{ slug: string }>();
  return <ProjectSubpage slug={params.slug} />;
}
