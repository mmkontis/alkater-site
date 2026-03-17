import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ServiceDetailClient from "./service-detail";

export const revalidate = 3600;

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (!service) notFound();

  const { data: projects } = await supabase
    .from("projects")
    .select("id, slug, title, location, category, description, image_url, sort_order")
    .eq("service_id", id)
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return <ServiceDetailClient service={service} projects={projects ?? []} />;
}
