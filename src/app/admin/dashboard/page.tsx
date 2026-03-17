import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Dashboard from "./dashboard";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin");
  }

  const [{ data: projects }, { data: blogPosts }, { data: contacts }, { data: services }] =
    await Promise.all([
      supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true }),
    ]);

  return (
    <Dashboard
      user={user}
      projects={projects ?? []}
      blogPosts={blogPosts ?? []}
      contacts={contacts ?? []}
      services={services ?? []}
    />
  );
}
