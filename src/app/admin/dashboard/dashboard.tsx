"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { signout } from "../actions";
import ImageUpload from "./image-upload";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { User } from "@supabase/supabase-js";
import {
  Home,
  Building2,
  FileText,
  Mail,
  Users,
  Image as ImageIcon,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Layers,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  image_url: string | null;
  video_url: string | null;
  video_start_time: number;
  sort_order: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
  service_id: string | null;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

interface MediaFile {
  name: string;
  id: string;
  created_at: string;
  metadata: { size: number; mimetype: string };
}

type Section = "home" | "services" | "projects" | "blog" | "contacts" | "admins" | "media";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("el-GR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const sectionIcons: Record<Section, typeof Home> = {
  home: Home,
  services: Layers,
  projects: Building2,
  blog: FileText,
  contacts: Mail,
  admins: Users,
  media: ImageIcon,
};

const sectionLabels: Record<Section, string> = {
  home: "Αρχική",
  services: "Υπηρεσίες",
  projects: "Έργα",
  blog: "Blog",
  contacts: "Μηνύματα",
  admins: "Διαχειριστές",
  media: "Media",
};

const LOCAL_VIDEOS = [
  { name: "sample_0-3.mp4", path: "/Videos/sample_0-3.mp4" },
  { name: "sample_1-3.mp4", path: "/Videos/sample_1-3.mp4" },
  { name: "sample_2.mp4", path: "/Videos/sample_2.mp4" },
  { name: "sample_3-3.mp4", path: "/Videos/sample_3-3.mp4" },
];

export default function Dashboard({
  user,
  projects: initialProjects,
  blogPosts: initialBlogPosts,
  contacts: initialContacts,
  services: initialServices,
}: {
  user: User;
  projects: Project[];
  blogPosts: BlogPost[];
  contacts: ContactSubmission[];
  services: Service[];
}) {
  const supabase = createClient();
  const [section, setSection] = useState<Section>("home");

  // ── Services state ──
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [savingService, setSavingService] = useState(false);
  const [serviceTab, setServiceTab] = useState<"list" | "form">("list");

  const emptyService: Omit<Service, "id"> = {
    name: "",
    description: "",
    icon: "",
    image_url: null,
    video_url: null,
    video_start_time: 0,
    sort_order: 0,
  };
  const [serviceForm, setServiceForm] = useState(emptyService);

  // ── Projects state ──
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [savingProject, setSavingProject] = useState(false);
  const [projectTab, setProjectTab] = useState<"list" | "form">("list");

  const emptyProject: Omit<Project, "id" | "created_at"> = {
    title: "",
    description: "",
    category: "",
    image_url: null,
    published: false,
    service_id: null,
  };
  const [projectForm, setProjectForm] = useState(emptyProject);

  // ── Blog state ──
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [savingPost, setSavingPost] = useState(false);
  const [blogTab, setBlogTab] = useState<"list" | "form" | "ai">("list");

  const emptyPost: Omit<BlogPost, "id" | "created_at" | "updated_at"> = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    cover_image: null,
    published: false,
  };
  const [blogForm, setBlogForm] = useState(emptyPost);
  const [contentPreview, setContentPreview] = useState(false);

  // ── AI generation state ──
  const [aiTopic, setAiTopic] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiImageGenerating, setAiImageGenerating] = useState(false);
  const [aiImagePrompt, setAiImagePrompt] = useState("");
  const [aiGeneratedImage, setAiGeneratedImage] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // ── Contacts state ──
  const [contacts, setContacts] = useState<ContactSubmission[]>(initialContacts);
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  // ── Admin users state ──
  const [authUsers, setAuthUsers] = useState<{ id: string; email: string; created_at: string; last_sign_in_at: string | null }[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);

  // ── Media state ──
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const loadMedia = useCallback(async () => {
    setMediaLoading(true);
    const { data, error } = await supabase.storage.from("media").list("", {
      limit: 200,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (!error && data) {
      const allFiles: MediaFile[] = [];
      for (const item of data) {
        if (item.id) {
          allFiles.push(item as unknown as MediaFile);
        } else {
          const { data: sub } = await supabase.storage
            .from("media")
            .list(item.name, {
              limit: 200,
              sortBy: { column: "created_at", order: "desc" },
            });
          if (sub) {
            for (const f of sub) {
              if (f.id) {
                allFiles.push({
                  ...f,
                  name: `${item.name}/${f.name}`,
                } as unknown as MediaFile);
              }
            }
          }
        }
      }
      setMediaFiles(allFiles);
    }
    setMediaLoading(false);
  }, [supabase]);

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setAuthUsers(data.users ?? []);
      }
    } catch {
      // silently fail
    }
    setUsersLoading(false);
  }, []);

  useEffect(() => {
    if (section === "media") loadMedia();
    if (section === "admins") loadUsers();
  }, [section, loadMedia, loadUsers]);

  function getPublicUrl(path: string) {
    return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
  }

  async function handleDeleteMedia(path: string) {
    if (!confirm("Σίγουρα θέλετε να διαγράψετε αυτό το αρχείο;")) return;
    await supabase.storage.from("media").remove([path]);
    await loadMedia();
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  }

  // ═══════════════════════════════════════
  // PROJECT ACTIONS
  // ═══════════════════════════════════════

  async function refreshProjects() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProjects(data);
  }

  async function refreshServices() {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setServices(data);
  }

  async function handleSaveService() {
    setSavingService(true);
    const payload = {
      name: serviceForm.name,
      description: serviceForm.description,
      icon: serviceForm.icon,
      image_url: serviceForm.image_url || null,
      video_url: serviceForm.video_url || null,
      video_start_time: serviceForm.video_start_time,
      sort_order: serviceForm.sort_order,
    };
    if (editingService) {
      const { error } = await supabase
        .from("services")
        .update(payload)
        .eq("id", editingService.id);
      if (!error) {
        setEditingService(null);
        setServiceForm(emptyService);
        setServiceTab("list");
        await refreshServices();
      }
    } else {
      const { error } = await supabase.from("services").insert(payload);
      if (!error) {
        setServiceForm(emptyService);
        setServiceTab("list");
        await refreshServices();
      }
    }
    setSavingService(false);
  }

  async function handleDeleteService(id: string) {
    if (!confirm("Σίγουρα θέλετε να διαγράψετε αυτή την υπηρεσία;")) return;
    await supabase.from("services").delete().eq("id", id);
    await refreshServices();
  }

  function startEditService(service: Service) {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      description: service.description,
      icon: service.icon,
      image_url: service.image_url,
      video_url: service.video_url,
      video_start_time: service.video_start_time,
      sort_order: service.sort_order,
    });
    setServiceTab("form");
  }

  async function handleSaveProject() {
    setSavingProject(true);
    const payload = {
      title: projectForm.title,
      description: projectForm.description,
      category: projectForm.category,
      image_url: projectForm.image_url,
      published: projectForm.published,
      service_id: projectForm.service_id || null,
    };
    if (editingProject) {
      const { error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", editingProject.id);
      if (!error) {
        setEditingProject(null);
        setProjectForm(emptyProject);
        setProjectTab("list");
        await refreshProjects();
      }
    } else {
      const { error } = await supabase.from("projects").insert(payload);
      if (!error) {
        setProjectForm(emptyProject);
        setProjectTab("list");
        await refreshProjects();
      }
    }
    setSavingProject(false);
  }

  async function handleDeleteProject(id: string) {
    if (!confirm("Σίγουρα θέλετε να διαγράψετε αυτό το έργο;")) return;
    await supabase.from("projects").delete().eq("id", id);
    await refreshProjects();
  }

  function startEditProject(project: Project) {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      category: project.category,
      image_url: project.image_url,
      published: project.published,
      service_id: project.service_id,
    });
    setProjectTab("form");
  }

  async function toggleProjectPublished(project: Project) {
    await supabase
      .from("projects")
      .update({ published: !project.published })
      .eq("id", project.id);
    await refreshProjects();
  }

  // ═══════════════════════════════════════
  // BLOG ACTIONS
  // ═══════════════════════════════════════

  async function refreshBlogPosts() {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setBlogPosts(data);
  }

  async function resolveUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
    let candidate = baseSlug;
    let suffix = 0;
    while (true) {
      let query = supabase
        .from("blog_posts")
        .select("id")
        .eq("slug", candidate);
      if (excludeId) query = query.neq("id", excludeId);
      const { data } = await query.limit(1);
      if (!data || data.length === 0) return candidate;
      suffix++;
      candidate = `${baseSlug}-${suffix}`;
    }
  }

  async function handleSavePost() {
    setSavingPost(true);
    const baseSlug = blogForm.slug || slugify(blogForm.title);
    if (editingPost) {
      const slug = await resolveUniqueSlug(baseSlug, editingPost.id);
      const { error } = await supabase
        .from("blog_posts")
        .update({
          title: blogForm.title,
          slug,
          excerpt: blogForm.excerpt,
          content: blogForm.content,
          cover_image: blogForm.cover_image,
          published: blogForm.published,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingPost.id);
      if (!error) {
        setEditingPost(null);
        setBlogForm(emptyPost);
        setBlogTab("list");
        await refreshBlogPosts();
      }
    } else {
      const slug = await resolveUniqueSlug(baseSlug);
      const { error } = await supabase.from("blog_posts").insert({
        title: blogForm.title,
        slug,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        cover_image: blogForm.cover_image,
        published: blogForm.published,
      });
      if (!error) {
        setBlogForm(emptyPost);
        setBlogTab("list");
        await refreshBlogPosts();
      }
    }
    setSavingPost(false);
  }

  async function handleDeletePost(id: string) {
    if (!confirm("Σίγουρα θέλετε να διαγράψετε αυτό το άρθρο;")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    await refreshBlogPosts();
  }

  function startEditPost(post: BlogPost) {
    setEditingPost(post);
    setBlogForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image,
      published: post.published,
    });
    setBlogTab("form");
  }

  async function togglePostPublished(post: BlogPost) {
    await supabase
      .from("blog_posts")
      .update({ published: !post.published })
      .eq("id", post.id);
    await refreshBlogPosts();
  }

  // ═══════════════════════════════════════
  // AI GENERATION
  // ═══════════════════════════════════════

  async function handleAiGenerate() {
    if (!aiTopic.trim()) return;
    setAiGenerating(true);
    setAiError(null);
    setAiGeneratedImage(null);
    setAiImagePrompt("");
    try {
      const res = await fetch("/api/admin/ai-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: aiTopic, language: "el" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error || "Αποτυχία δημιουργίας");
        return;
      }
      const { article } = data;
      setBlogForm({
        title: article.title || "",
        slug: slugify(article.title || ""),
        excerpt: article.excerpt || "",
        content: article.content || "",
        cover_image: null,
        published: false,
      });
      if (article.imagePrompt) {
        setAiImagePrompt(article.imagePrompt);
      }
      setBlogTab("form");
    } catch {
      setAiError("Σφάλμα δικτύου. Δοκιμάστε ξανά.");
    } finally {
      setAiGenerating(false);
    }
  }

  async function handleAiImage(prompt?: string) {
    const p = prompt || aiImagePrompt;
    if (!p.trim()) return;
    setAiImageGenerating(true);
    setAiError(null);
    try {
      const res = await fetch("/api/admin/ai-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: p }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error || "Αποτυχία δημιουργίας εικόνας");
        return;
      }
      setAiGeneratedImage(data.imageUrl);
    } catch {
      setAiError("Σφάλμα δικτύου. Δοκιμάστε ξανά.");
    } finally {
      setAiImageGenerating(false);
    }
  }

  function useAiImageAsCover() {
    if (!aiGeneratedImage) return;
    setBlogForm((prev) => ({ ...prev, cover_image: aiGeneratedImage }));
    setAiGeneratedImage(null);
  }

  // ═══════════════════════════════════════
  // CONTACT ACTIONS
  // ═══════════════════════════════════════

  async function refreshContacts() {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setContacts(data);
  }

  async function toggleContactRead(contact: ContactSubmission) {
    await supabase
      .from("contact_submissions")
      .update({ read: !contact.read })
      .eq("id", contact.id);
    await refreshContacts();
  }

  async function handleDeleteContact(id: string) {
    if (!confirm("Σίγουρα θέλετε να διαγράψετε αυτό το μήνυμα;")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    await refreshContacts();
  }

  // ═══════════════════════════════════════
  // ADMIN USER ACTIONS
  // ═══════════════════════════════════════

  async function handleCreateAdmin() {
    setCreatingAdmin(true);
    setAdminError(null);
    setAdminSuccess(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newAdminEmail, password: newAdminPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAdminError(data.error || "Αποτυχία δημιουργίας");
      } else {
        setAdminSuccess(`Ο διαχειριστής ${newAdminEmail} δημιουργήθηκε επιτυχώς`);
        setNewAdminEmail("");
        setNewAdminPassword("");
        await loadUsers();
      }
    } catch {
      setAdminError("Σφάλμα δικτύου. Δοκιμάστε ξανά.");
    }
    setCreatingAdmin(false);
  }

  // ═══════════════════════════════════════
  // SHARED UI
  // ═══════════════════════════════════════

  const inputClass =
    "w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE] px-4 py-3 text-sm text-[#111111] outline-none transition-all focus:border-[#E63B2E] focus:ring-2 focus:ring-[#E63B2E]/10 font-['Space_Grotesk']";

  const labelClass =
    "mb-1.5 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/50";

  const btnPrimary =
    "cursor-pointer rounded-xl bg-[#111111] px-6 py-3 font-['Space_Mono'] text-[10px] uppercase tracking-widest text-white transition-all hover:bg-[#E63B2E] disabled:opacity-60";

  const btnSecondary =
    "cursor-pointer rounded-xl border border-[#111111]/10 px-6 py-3 font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/60 transition-all hover:border-[#111111]/20 hover:text-[#111111]";

  const btnSmall = (color: "default" | "accent" | "danger") => {
    const base =
      "cursor-pointer rounded-lg border px-3 py-1.5 font-['Space_Mono'] text-[9px] uppercase tracking-widest transition-all";
    if (color === "accent")
      return `${base} border-[#E63B2E]/20 text-[#E63B2E] hover:bg-[#E63B2E]/5`;
    if (color === "danger")
      return `${base} border-[#E63B2E]/20 text-[#E63B2E]/60 hover:bg-[#E63B2E]/5 hover:text-[#E63B2E]`;
    return `${base} border-[#111111]/10 text-[#111111]/50 hover:text-[#111111] hover:border-[#111111]/20`;
  };

  const unreadCount = contacts.filter((c) => !c.read).length;

  return (
    <div className="min-h-screen bg-[#F5F3EE] selection:bg-[#E63B2E] selection:text-white font-['Space_Grotesk']">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Space+Grotesk:wght@400;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
      `}} />

      {/* Left Sidebar — hidden on mobile, bottom nav used instead */}
      <aside
        className="fixed top-0 left-0 z-50 hidden md:flex h-full w-64 flex-col border-r border-[#111111]/10 bg-white"
      >
        {/* Logo */}
        <div className="flex items-center justify-center border-b border-[#111111]/10 px-5 py-7">
          <img
            src="/Photos/Logo/alkater-logo.svg"
            alt="ΑΛΚΑΤΕΡ"
            className="h-20 w-auto"
            style={{ filter: "brightness(0)" }}
          />
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-3 px-3 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#111111]/30">
            Διαχείριση
          </p>
          {(["home", "services", "projects", "blog", "contacts", "admins", "media"] as Section[]).map((s) => {
            const isActive = section === s;
            return (
              <button
                key={s}
                onClick={() => {
                  setSection(s);
                }}
                className={`mb-1 flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                  isActive
                    ? "bg-[#111111] text-white"
                    : "text-[#111111]/60 hover:bg-[#F5F3EE] hover:text-[#111111]"
                }`}
              >
                {(() => { const Icon = sectionIcons[s]; return <Icon size={16} className="shrink-0" />; })()}
                <span className="font-['Space_Grotesk'] text-sm font-medium tracking-tight">
                  {sectionLabels[s]}
                </span>
                {s === "contacts" && unreadCount > 0 && (
                  <span className={`ml-auto rounded-full px-2 py-0.5 font-['Space_Mono'] text-[9px] ${
                    isActive ? "bg-white/20 text-white" : "bg-[#E63B2E] text-white"
                  }`}>
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User info at bottom */}
        <div className="border-t border-[#111111]/10 px-4 py-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] font-['Space_Mono'] text-[10px] uppercase text-white">
              {user.email?.charAt(0) ?? "?"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-['Space_Mono'] text-[10px] text-[#111111]/70">
                {user.email}
              </p>
            </div>
          </div>
          <form action={signout}>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl border border-[#111111]/10 px-4 py-2 font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/50 transition-all hover:border-[#E63B2E] hover:text-[#E63B2E]"
            >
              Αποσύνδεση
            </button>
          </form>
        </div>
      </aside>

      {/* Main content area */}
      <main className="md:ml-64 min-h-screen pb-20 md:pb-0">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 md:py-10">
          {/* Page Title */}
          <div className="mb-6 md:mb-10">
            <p className="font-['Space_Mono'] text-[#E63B2E] uppercase tracking-widest text-xs sm:text-sm mb-2 sm:mb-3 border-l-2 border-[#E63B2E] pl-4">
              {sectionLabels[section]}
            </p>
            <h1 className="font-['Space_Grotesk'] font-bold text-2xl sm:text-3xl md:text-4xl text-[#111111] tracking-tighter uppercase">
              {section === "home" && "Dashboard."}
              {section === "services" && "Διαχείριση Υπηρεσιών."}
              {section === "projects" && "Διαχείριση Έργων."}
              {section === "blog" && "Διαχείριση Blog."}
              {section === "contacts" && "Μηνύματα Επικοινωνίας."}
              {section === "admins" && "Διαχειριστές."}
              {section === "media" && "Βιβλιοθήκη Media."}
            </h1>
          </div>

          {/* ═══════════ HOME SECTION ═══════════ */}
          {section === "home" && (
            <div className="space-y-6">
              {/* Stats cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <button
                  onClick={() => setSection("services")}
                  className="cursor-pointer rounded-2xl border border-[#111111]/10 bg-white p-5 text-left transition-all hover:border-[#111111]/20 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111]/5">
                      <Layers size={20} className="text-[#111111]/60" />
                    </div>
                    <span className="font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#111111]/40">
                      Υπηρεσίες
                    </span>
                  </div>
                  <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#111111] tracking-tighter">
                    {services.length}
                  </p>
                </button>

                <button
                  onClick={() => setSection("projects")}
                  className="cursor-pointer rounded-2xl border border-[#111111]/10 bg-white p-5 text-left transition-all hover:border-[#111111]/20 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111]/5">
                      <Building2 size={20} className="text-[#111111]/60" />
                    </div>
                    <span className="font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#111111]/40">
                      Έργα
                    </span>
                  </div>
                  <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#111111] tracking-tighter">
                    {projects.length}
                  </p>
                  <p className="mt-1 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-emerald-600">
                    {projects.filter((p) => p.published).length} δημοσιευμένα
                  </p>
                </button>

                <button
                  onClick={() => setSection("blog")}
                  className="cursor-pointer rounded-2xl border border-[#111111]/10 bg-white p-5 text-left transition-all hover:border-[#111111]/20 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111]/5">
                      <FileText size={20} className="text-[#111111]/60" />
                    </div>
                    <span className="font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#111111]/40">
                      Άρθρα
                    </span>
                  </div>
                  <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#111111] tracking-tighter">
                    {blogPosts.length}
                  </p>
                  <p className="mt-1 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-emerald-600">
                    {blogPosts.filter((p) => p.published).length} δημοσιευμένα
                  </p>
                </button>

                <button
                  onClick={() => setSection("contacts")}
                  className="cursor-pointer rounded-2xl border border-[#111111]/10 bg-white p-5 text-left transition-all hover:border-[#111111]/20 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111]/5">
                      <Mail size={20} className="text-[#111111]/60" />
                    </div>
                    <span className="font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#111111]/40">
                      Μηνύματα
                    </span>
                  </div>
                  <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#111111] tracking-tighter">
                    {contacts.length}
                  </p>
                  {unreadCount > 0 && (
                    <p className="mt-1 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#E63B2E]">
                      {unreadCount} αδιάβαστα
                    </p>
                  )}
                </button>

                <button
                  onClick={() => setSection("admins")}
                  className="cursor-pointer rounded-2xl border border-[#111111]/10 bg-white p-5 text-left transition-all hover:border-[#111111]/20 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111]/5">
                      <Users size={20} className="text-[#111111]/60" />
                    </div>
                    <span className="font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#111111]/40">
                      Διαχειριστές
                    </span>
                  </div>
                  <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#111111] tracking-tighter">
                    {authUsers.length}
                  </p>
                </button>
              </div>

              {/* Recent projects */}
              {projects.length > 0 && (
                <div className="rounded-2xl border border-[#111111]/10 bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-['Space_Grotesk'] font-bold text-lg text-[#111111] tracking-tighter uppercase">
                      Πρόσφατα Έργα
                    </h3>
                    <button onClick={() => setSection("projects")} className={btnSmall("accent")}>
                      Όλα
                    </button>
                  </div>
                  <div className="space-y-3">
                    {projects.slice(0, 5).map((p) => (
                      <div key={p.id} className="flex items-center gap-4">
                        {p.image_url && (
                          <img src={p.image_url} alt={p.title} className="h-10 w-16 rounded-lg object-cover" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-['Space_Grotesk'] font-medium text-sm text-[#111111]">{p.title}</p>
                          <p className="font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest">{p.category}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 font-['Space_Mono'] text-[9px] uppercase tracking-widest ${p.published ? "bg-emerald-50 text-emerald-600" : "bg-[#F5F3EE] text-[#111111]/30"}`}>
                          {p.published ? "Live" : "Draft"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent blog + contacts side by side */}
              <div className="grid gap-6 lg:grid-cols-2">
                {blogPosts.length > 0 && (
                  <div className="rounded-2xl border border-[#111111]/10 bg-white p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-['Space_Grotesk'] font-bold text-lg text-[#111111] tracking-tighter uppercase">
                        Πρόσφατα Άρθρα
                      </h3>
                      <button onClick={() => setSection("blog")} className={btnSmall("accent")}>
                        Όλα
                      </button>
                    </div>
                    <div className="space-y-3">
                      {blogPosts.slice(0, 4).map((post) => (
                        <div key={post.id} className="flex items-center gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-['Space_Grotesk'] font-medium text-sm text-[#111111]">{post.title}</p>
                            <p className="font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest">/blog/{post.slug}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 font-['Space_Mono'] text-[9px] uppercase tracking-widest ${post.published ? "bg-emerald-50 text-emerald-600" : "bg-[#F5F3EE] text-[#111111]/30"}`}>
                            {post.published ? "Live" : "Draft"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {contacts.length > 0 && (
                  <div className="rounded-2xl border border-[#111111]/10 bg-white p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-['Space_Grotesk'] font-bold text-lg text-[#111111] tracking-tighter uppercase">
                        Πρόσφατα Μηνύματα
                      </h3>
                      <button onClick={() => setSection("contacts")} className={btnSmall("accent")}>
                        Όλα
                      </button>
                    </div>
                    <div className="space-y-3">
                      {contacts.slice(0, 4).map((c) => (
                        <div key={c.id} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${c.read ? "bg-[#111111]/10" : "bg-[#E63B2E]"}`} />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-['Space_Grotesk'] font-medium text-sm text-[#111111]">{c.name}</p>
                            <p className="truncate font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest">{c.email}</p>
                          </div>
                          <span className="shrink-0 font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest">
                            {formatDate(c.created_at)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════ SERVICES SECTION ═══════════ */}
          {section === "services" && (
            <>
              <div className="mb-6 flex gap-3">
                <button
                  onClick={() => {
                    setServiceTab("list");
                    setEditingService(null);
                    setServiceForm(emptyService);
                  }}
                  className={`cursor-pointer rounded-xl px-5 py-2.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all ${
                    serviceTab === "list"
                      ? "bg-[#111111] text-white"
                      : "bg-white border border-[#111111]/10 text-[#111111]/50 hover:text-[#111111]"
                  }`}
                >
                  Λίστα
                </button>
                <button
                  onClick={() => {
                    setServiceTab("form");
                    setEditingService(null);
                    setServiceForm(emptyService);
                  }}
                  className={`cursor-pointer rounded-xl px-5 py-2.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all ${
                    serviceTab === "form"
                      ? "bg-[#111111] text-white"
                      : "bg-white border border-[#111111]/10 text-[#111111]/50 hover:text-[#111111]"
                  }`}
                >
                  {editingService ? "Επεξεργασία" : "+ Νέα Υπηρεσία"}
                </button>
              </div>

              {serviceTab === "list" && (
                <div className="space-y-4">
                  {services.length === 0 && (
                    <div className="rounded-2xl border-2 border-dashed border-[#111111]/10 bg-white py-20 text-center">
                      <p className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest">
                        Δεν υπάρχουν υπηρεσίες ακόμα
                      </p>
                    </div>
                  )}
                  {services.map((s) => (
                    <div
                      key={s.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-2xl border border-[#111111]/10 bg-white p-4 sm:p-5 transition-all hover:border-[#111111]/20"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#111111]/5">
                        <span className="font-['Space_Mono'] text-[10px] text-[#111111]/60 uppercase">{s.icon || "—"}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="font-['Space_Grotesk'] font-bold text-[#111111] truncate tracking-tight">
                            {s.name}
                          </h3>
                          <span className="shrink-0 rounded-full bg-[#F5F3EE] px-2.5 py-0.5 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#111111]/40">
                            #{s.sort_order}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-sm text-[#111111]/50">
                          {s.description}
                        </p>
                        {(s.video_url || s.image_url) && (
                          <p className="font-['Space_Mono'] text-[9px] text-[#E63B2E] uppercase tracking-widest mt-1">
                            {s.video_url && "Video"}
                            {s.video_url && s.image_url && " · "}
                            {s.image_url && "Image"}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-2 border-t sm:border-t-0 border-[#111111]/5 pt-3 sm:pt-0">
                        <button
                          onClick={() => startEditService(s)}
                          className={btnSmall("accent")}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteService(s.id)}
                          className={btnSmall("danger")}
                        >
                          Del
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {serviceTab === "form" && (
                <div className="rounded-2xl border border-[#111111]/10 bg-white p-4 sm:p-8">
                  <h2 className="mb-6 font-['Space_Grotesk'] font-bold text-2xl text-[#111111] tracking-tighter uppercase">
                    {editingService ? "Επεξεργασία Υπηρεσίας" : "Νέα Υπηρεσία"}
                  </h2>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className={labelClass}>Όνομα</label>
                      <input
                        type="text"
                        value={serviceForm.name}
                        onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                        className={inputClass}
                        placeholder="π.χ. Ασφαλτοστρώσεις"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Περιγραφή</label>
                      <textarea
                        value={serviceForm.description}
                        onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                        rows={3}
                        className={inputClass}
                        placeholder="Σύντομη περιγραφή της υπηρεσίας..."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Εικονίδιο (Lucide icon name)</label>
                        <input
                          type="text"
                          value={serviceForm.icon}
                          onChange={(e) => setServiceForm({ ...serviceForm, icon: e.target.value })}
                          className={inputClass}
                          placeholder="π.χ. Construction, Truck, HardHat"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Σειρά Ταξινόμησης</label>
                        <input
                          type="number"
                          value={serviceForm.sort_order}
                          onChange={(e) => setServiceForm({ ...serviceForm, sort_order: parseInt(e.target.value) || 0 })}
                          className={inputClass}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Εικόνα</label>
                      <ImageUpload
                        value={serviceForm.image_url}
                        onChange={(url) => setServiceForm({ ...serviceForm, image_url: url })}
                        folder="services"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Video URL</label>
                        <input
                          type="text"
                          value={serviceForm.video_url ?? ""}
                          onChange={(e) => setServiceForm({ ...serviceForm, video_url: e.target.value || null })}
                          className={inputClass}
                          placeholder="π.χ. /Videos/construction/09_asphalt.mp4"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Video Start Time (sec)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={serviceForm.video_start_time}
                          onChange={(e) => setServiceForm({ ...serviceForm, video_start_time: parseFloat(e.target.value) || 0 })}
                          className={inputClass}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-3">
                      <button
                        onClick={handleSaveService}
                        disabled={savingService || !serviceForm.name}
                        className={btnPrimary}
                      >
                        {savingService
                          ? "Αποθήκευση..."
                          : editingService
                            ? "Ενημέρωση"
                            : "Δημιουργία"}
                      </button>
                      {editingService && (
                        <button
                          onClick={() => {
                            setEditingService(null);
                            setServiceForm(emptyService);
                            setServiceTab("list");
                          }}
                          className={btnSecondary}
                        >
                          Ακύρωση
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ═══════════ PROJECTS SECTION ═══════════ */}
          {section === "projects" && (
            <>
              <div className="mb-6 flex gap-3">
                <button
                  onClick={() => {
                    setProjectTab("list");
                    setEditingProject(null);
                    setProjectForm(emptyProject);
                  }}
                  className={`cursor-pointer rounded-xl px-5 py-2.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all ${
                    projectTab === "list"
                      ? "bg-[#111111] text-white"
                      : "bg-white border border-[#111111]/10 text-[#111111]/50 hover:text-[#111111]"
                  }`}
                >
                  Λίστα
                </button>
                <button
                  onClick={() => {
                    setProjectTab("form");
                    setEditingProject(null);
                    setProjectForm(emptyProject);
                  }}
                  className={`cursor-pointer rounded-xl px-5 py-2.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all ${
                    projectTab === "form"
                      ? "bg-[#111111] text-white"
                      : "bg-white border border-[#111111]/10 text-[#111111]/50 hover:text-[#111111]"
                  }`}
                >
                  {editingProject ? "Επεξεργασία" : "+ Νέο Έργο"}
                </button>
              </div>

              {projectTab === "list" && (
                <div className="space-y-4">
                  {projects.length === 0 && (
                    <div className="rounded-2xl border-2 border-dashed border-[#111111]/10 bg-white py-20 text-center">
                      <p className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest">
                        Δεν υπάρχουν έργα ακόμα
                      </p>
                    </div>
                  )}
                  {projects.map((p) => (
                    <div
                      key={p.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-2xl border border-[#111111]/10 bg-white p-4 sm:p-5 transition-all hover:border-[#111111]/20"
                    >
                      {p.image_url && (
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="h-32 sm:h-16 w-full sm:w-24 rounded-xl object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="font-['Space_Grotesk'] font-bold text-[#111111] truncate tracking-tight">
                            {p.title}
                          </h3>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 font-['Space_Mono'] text-[9px] uppercase tracking-widest ${
                              p.published
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-[#F5F3EE] text-[#111111]/30"
                            }`}
                          >
                            {p.published ? "Live" : "Draft"}
                          </span>
                        </div>
                        {(p.category || p.service_id) && (
                          <p className="font-['Space_Mono'] text-[9px] text-[#E63B2E] uppercase tracking-widest mt-1">
                            {p.category}
                            {p.service_id && services.find((s) => s.id === p.service_id) && (
                              <span className="text-[#111111]/30 ml-2">
                                · {services.find((s) => s.id === p.service_id)!.name}
                              </span>
                            )}
                          </p>
                        )}
                        <p className="mt-1 line-clamp-1 text-sm text-[#111111]/50">
                          {p.description}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 border-t sm:border-t-0 border-[#111111]/5 pt-3 sm:pt-0">
                        <button
                          onClick={() => toggleProjectPublished(p)}
                          className={btnSmall("default")}
                        >
                          {p.published ? "Απόκρυψη" : "Δημοσίευση"}
                        </button>
                        <button
                          onClick={() => startEditProject(p)}
                          className={btnSmall("accent")}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className={btnSmall("danger")}
                        >
                          Del
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {projectTab === "form" && (
                <div className="rounded-2xl border border-[#111111]/10 bg-white p-4 sm:p-8">
                  <h2 className="mb-6 font-['Space_Grotesk'] font-bold text-2xl text-[#111111] tracking-tighter uppercase">
                    {editingProject ? "Επεξεργασία Έργου" : "Νέο Έργο"}
                  </h2>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className={labelClass}>Τίτλος</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, title: e.target.value })
                        }
                        className={inputClass}
                        placeholder="π.χ. Κατασκευή οδοποιίας - Λάρισα"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Κατηγορία</label>
                      <input
                        type="text"
                        value={projectForm.category}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, category: e.target.value })
                        }
                        className={inputClass}
                        placeholder="π.χ. Οδοποιία, Ασφαλτόστρωση, Συντήρηση"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Υπηρεσία</label>
                      <select
                        value={projectForm.service_id ?? ""}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, service_id: e.target.value || null })
                        }
                        className={inputClass}
                      >
                        <option value="">— Χωρίς υπηρεσία —</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Περιγραφή</label>
                      <textarea
                        value={projectForm.description}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, description: e.target.value })
                        }
                        rows={4}
                        className={inputClass}
                        placeholder="Περιγράψτε το έργο..."
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Εικόνα</label>
                      <ImageUpload
                        value={projectForm.image_url}
                        onChange={(url) =>
                          setProjectForm({ ...projectForm, image_url: url })
                        }
                        folder="projects"
                      />
                    </div>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={projectForm.published}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, published: e.target.checked })
                        }
                        className="h-4 w-4 rounded border-[#111111]/20 text-[#E63B2E] focus:ring-[#E63B2E]"
                      />
                      <span className="font-['Space_Mono'] text-[10px] text-[#111111]/60 uppercase tracking-widest">
                        Δημοσίευση αμέσως
                      </span>
                    </label>
                    <div className="flex gap-3 pt-3">
                      <button
                        onClick={handleSaveProject}
                        disabled={savingProject || !projectForm.title}
                        className={btnPrimary}
                      >
                        {savingProject
                          ? "Αποθήκευση..."
                          : editingProject
                            ? "Ενημέρωση"
                            : "Δημιουργία"}
                      </button>
                      {editingProject && (
                        <button
                          onClick={() => {
                            setEditingProject(null);
                            setProjectForm(emptyProject);
                            setProjectTab("list");
                          }}
                          className={btnSecondary}
                        >
                          Ακύρωση
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ═══════════ BLOG SECTION ═══════════ */}
          {section === "blog" && (
            <>
              <div className="mb-6 flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    setBlogTab("list");
                    setEditingPost(null);
                    setBlogForm(emptyPost);
                  }}
                  className={`cursor-pointer rounded-xl px-4 sm:px-5 py-2.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all ${
                    blogTab === "list"
                      ? "bg-[#111111] text-white"
                      : "bg-white border border-[#111111]/10 text-[#111111]/50 hover:text-[#111111]"
                  }`}
                >
                  Λίστα
                </button>
                <button
                  onClick={() => {
                    setBlogTab("form");
                    setEditingPost(null);
                    setBlogForm(emptyPost);
                  }}
                  className={`cursor-pointer rounded-xl px-4 sm:px-5 py-2.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all ${
                    blogTab === "form"
                      ? "bg-[#111111] text-white"
                      : "bg-white border border-[#111111]/10 text-[#111111]/50 hover:text-[#111111]"
                  }`}
                >
                  {editingPost ? "Επεξεργασία" : "+ Νέο Άρθρο"}
                </button>
                <button
                  onClick={() => {
                    setBlogTab("ai");
                    setEditingPost(null);
                    setBlogForm(emptyPost);
                    setAiError(null);
                    setAiGeneratedImage(null);
                  }}
                  className={`cursor-pointer rounded-xl px-4 sm:px-5 py-2.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all ${
                    blogTab === "ai"
                      ? "bg-[#E63B2E] text-white"
                      : "bg-white border border-[#E63B2E]/20 text-[#E63B2E]/60 hover:text-[#E63B2E]"
                  }`}
                >
                  AI Δημιουργία
                </button>
              </div>

              {blogTab === "list" && (
                <div className="space-y-4">
                  {blogPosts.length === 0 && (
                    <div className="rounded-2xl border-2 border-dashed border-[#111111]/10 bg-white py-20 text-center">
                      <p className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest">
                        Δεν υπάρχουν άρθρα ακόμα
                      </p>
                    </div>
                  )}
                  {blogPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-2xl border border-[#111111]/10 bg-white p-4 sm:p-5 transition-all hover:border-[#111111]/20"
                    >
                      {post.cover_image && (
                        <img
                          src={post.cover_image}
                          alt={post.title}
                          className="h-32 sm:h-16 w-full sm:w-24 rounded-xl object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="font-['Space_Grotesk'] font-bold text-[#111111] truncate tracking-tight">
                            {post.title}
                          </h3>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 font-['Space_Mono'] text-[9px] uppercase tracking-widest ${
                              post.published
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-[#F5F3EE] text-[#111111]/30"
                            }`}
                          >
                            {post.published ? "Live" : "Draft"}
                          </span>
                        </div>
                        <p className="font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest mt-1">
                          /blog/{post.slug}
                        </p>
                        <p className="mt-1 line-clamp-1 text-sm text-[#111111]/50">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 border-t sm:border-t-0 border-[#111111]/5 pt-3 sm:pt-0">
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-[#111111]/10 text-[#111111]/40 hover:text-[#111111] hover:border-[#111111]/30 transition-all"
                          title="Προβολή"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          onClick={() => togglePostPublished(post)}
                          className={btnSmall("default")}
                        >
                          {post.published ? "Απόκρυψη" : "Δημοσίευση"}
                        </button>
                        <button
                          onClick={() => startEditPost(post)}
                          className={btnSmall("accent")}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className={btnSmall("danger")}
                        >
                          Del
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {blogTab === "form" && (
                <div className="rounded-2xl border border-[#111111]/10 bg-white p-4 sm:p-8">
                  <h2 className="mb-6 font-['Space_Grotesk'] font-bold text-2xl text-[#111111] tracking-tighter uppercase">
                    {editingPost ? "Επεξεργασία Άρθρου" : "Νέο Άρθρο"}
                  </h2>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className={labelClass}>Τίτλος</label>
                      <input
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => {
                          const title = e.target.value;
                          setBlogForm({
                            ...blogForm,
                            title,
                            slug: editingPost ? blogForm.slug : slugify(title),
                          });
                        }}
                        className={inputClass}
                        placeholder="π.χ. Νέο έργο ασφαλτόστρωσης στη Θεσσαλονίκη"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Slug (URL)</label>
                      <div className="flex items-center gap-3">
                        <span className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest">
                          /blog/
                        </span>
                        <input
                          type="text"
                          value={blogForm.slug}
                          onChange={(e) =>
                            setBlogForm({ ...blogForm, slug: e.target.value })
                          }
                          className={inputClass}
                          placeholder="neo-ergo-asfaltostroshs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Περίληψη</label>
                      <textarea
                        value={blogForm.excerpt}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, excerpt: e.target.value })
                        }
                        rows={2}
                        className={inputClass}
                        placeholder="Σύντομη περιγραφή για την λίστα..."
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/50">
                          Περιεχόμενο (Markdown)
                        </label>
                        <button
                          type="button"
                          onClick={() => setContentPreview(!contentPreview)}
                          className={`cursor-pointer rounded-lg border px-3 py-1 font-['Space_Mono'] text-[9px] uppercase tracking-widest transition-all ${
                            contentPreview
                              ? "border-[#E63B2E]/20 bg-[#E63B2E]/5 text-[#E63B2E]"
                              : "border-[#111111]/10 text-[#111111]/40 hover:text-[#111111]"
                          }`}
                        >
                          {contentPreview ? "Επεξεργασία" : "Προεπισκόπηση"}
                        </button>
                      </div>
                      {contentPreview ? (
                        <div className="prose prose-zinc max-w-none rounded-xl border border-[#111111]/10 bg-white p-5 min-h-[300px] text-sm">
                          <MarkdownRenderer content={blogForm.content || "*Κενό περιεχόμενο*"} />
                        </div>
                      ) : (
                        <textarea
                          value={blogForm.content}
                          onChange={(e) =>
                            setBlogForm({ ...blogForm, content: e.target.value })
                          }
                          rows={12}
                          className={inputClass + " font-mono text-[13px]"}
                          placeholder="## Υπότιτλος&#10;&#10;Γράψτε το άρθρο εδώ σε **Markdown**..."
                        />
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Εξώφυλλο</label>
                      <ImageUpload
                        value={blogForm.cover_image}
                        onChange={(url) =>
                          setBlogForm({ ...blogForm, cover_image: url })
                        }
                        folder="blog"
                      />
                      {/* AI Image Generation */}
                      <div className="mt-3 rounded-xl border border-[#E63B2E]/15 bg-[#E63B2E]/[0.02] p-4">
                        <p className={labelClass}>AI Εικόνα (Humanlike)</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={aiImagePrompt}
                            onChange={(e) => setAiImagePrompt(e.target.value)}
                            className={inputClass + " flex-1"}
                            placeholder="π.χ. Road construction site, asphalt paving..."
                          />
                          <button
                            type="button"
                            onClick={() => handleAiImage()}
                            disabled={aiImageGenerating || !aiImagePrompt.trim()}
                            className="shrink-0 cursor-pointer rounded-xl bg-[#E63B2E] px-4 py-3 font-['Space_Mono'] text-[10px] uppercase tracking-widest text-white transition-all hover:bg-[#c4161c] disabled:opacity-60 flex items-center gap-2"
                          >
                            <Sparkles size={14} />
                            {aiImageGenerating ? "Δημιουργία..." : "AI Εικόνα"}
                          </button>
                        </div>
                        {aiGeneratedImage && (
                          <div className="mt-3">
                            <img
                              src={aiGeneratedImage}
                              alt="AI Generated"
                              className="w-full max-h-60 object-cover rounded-xl border border-[#111111]/10"
                            />
                            <div className="mt-2 flex gap-2">
                              <button
                                type="button"
                                onClick={useAiImageAsCover}
                                className={btnSmall("accent")}
                              >
                                Χρήση ως εξώφυλλο
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAiImage()}
                                disabled={aiImageGenerating}
                                className={btnSmall("default")}
                              >
                                Νέα εικόνα
                              </button>
                            </div>
                          </div>
                        )}
                        {aiError && (
                          <p className="mt-2 text-xs text-[#E63B2E]">{aiError}</p>
                        )}
                      </div>
                    </div>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={blogForm.published}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, published: e.target.checked })
                        }
                        className="h-4 w-4 rounded border-[#111111]/20 text-[#E63B2E] focus:ring-[#E63B2E]"
                      />
                      <span className="font-['Space_Mono'] text-[10px] text-[#111111]/60 uppercase tracking-widest">
                        Δημοσίευση αμέσως
                      </span>
                    </label>
                    <div className="flex gap-3 pt-3">
                      <button
                        onClick={handleSavePost}
                        disabled={savingPost || !blogForm.title}
                        className={btnPrimary}
                      >
                        {savingPost
                          ? "Αποθήκευση..."
                          : editingPost
                            ? "Ενημέρωση"
                            : "Δημιουργία"}
                      </button>
                      {editingPost && (
                        <button
                          onClick={() => {
                            setEditingPost(null);
                            setBlogForm(emptyPost);
                            setBlogTab("list");
                          }}
                          className={btnSecondary}
                        >
                          Ακύρωση
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* AI generation panel */}
              {blogTab === "ai" && (
                <div className="space-y-6">
                  {/* Step 1: Generate article */}
                  <div className="rounded-2xl border border-[#E63B2E]/20 bg-white p-6">
                    <h3 className="mb-4 font-['Space_Grotesk'] font-bold text-lg text-[#111111] tracking-tighter uppercase">
                      AI Δημιουργία Άρθρου
                    </h3>
                    <p className="mb-4 text-sm text-[#111111]/50">
                      Περιγράψτε το θέμα και η AI θα δημιουργήσει τίτλο, περίληψη, περιεχόμενο και πρόταση εικόνας.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        className={inputClass + " flex-1"}
                        placeholder="π.χ. Νέο έργο ασφαλτόστρωσης στην Αττική Οδό"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !aiGenerating) handleAiGenerate();
                        }}
                      />
                      <button
                        onClick={handleAiGenerate}
                        disabled={aiGenerating || !aiTopic.trim()}
                        className={btnPrimary + " shrink-0"}
                        style={{ backgroundColor: aiGenerating ? undefined : "#E63B2E" }}
                      >
                        {aiGenerating ? "Δημιουργία..." : "Δημιουργία"}
                      </button>
                    </div>

                    {aiError && (
                      <p className="mt-3 rounded-xl bg-[#E63B2E]/10 border border-[#E63B2E]/20 px-4 py-2.5 text-sm text-[#E63B2E] font-['Space_Grotesk']">
                        {aiError}
                      </p>
                    )}
                  </div>

                  {/* Step 2: Preview generated content */}
                  {blogForm.title && blogTab === "ai" && (
                    <div className="rounded-2xl border border-[#111111]/10 bg-white p-6">
                      <h3 className="mb-4 font-['Space_Grotesk'] font-bold text-lg text-[#111111] tracking-tighter uppercase">
                        Προεπισκόπηση
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className={labelClass}>Τίτλος</span>
                          <p className="font-['Space_Grotesk'] font-bold text-[#111111]">{blogForm.title}</p>
                        </div>
                        <div>
                          <span className={labelClass}>Περίληψη</span>
                          <p className="text-sm text-[#111111]/70">{blogForm.excerpt}</p>
                        </div>
                        <div>
                          <span className={labelClass}>Περιεχόμενο</span>
                          <p className="text-sm text-[#111111]/60 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto bg-[#F5F3EE] rounded-xl p-4">
                            {blogForm.content}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={() => setBlogTab("form")}
                          className={btnPrimary}
                        >
                          Επεξεργασία & Αποθήκευση
                        </button>
                        <button
                          onClick={handleAiGenerate}
                          disabled={aiGenerating}
                          className={btnSecondary}
                        >
                          Αναδημιουργία
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: AI Image generation */}
                  {aiImagePrompt && blogTab === "ai" && (
                    <div className="rounded-2xl border border-[#E63B2E]/20 bg-white p-6">
                      <h3 className="mb-4 font-['Space_Grotesk'] font-bold text-lg text-[#111111] tracking-tighter uppercase">
                        AI Εικόνα Εξωφύλλου
                      </h3>
                      <div className="mb-4">
                        <span className={labelClass}>Image Prompt</span>
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={aiImagePrompt}
                            onChange={(e) => setAiImagePrompt(e.target.value)}
                            className={inputClass + " flex-1"}
                          />
                          <button
                            onClick={() => handleAiImage()}
                            disabled={aiImageGenerating}
                            className={btnPrimary + " shrink-0"}
                            style={{ backgroundColor: aiImageGenerating ? undefined : "#E63B2E" }}
                          >
                            {aiImageGenerating ? "Δημιουργία..." : "Δημιουργία Εικόνας"}
                          </button>
                        </div>
                      </div>

                      {aiImageGenerating && (
                        <div className="flex items-center gap-3 py-8 justify-center">
                          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#E63B2E]/20 border-t-[#E63B2E]" />
                          <span className="font-['Space_Mono'] text-[10px] text-[#111111]/40 uppercase tracking-widest">
                            Δημιουργία εικόνας...
                          </span>
                        </div>
                      )}

                      {aiGeneratedImage && (
                        <div className="mt-4">
                          <img
                            src={aiGeneratedImage}
                            alt="AI Generated"
                            className="w-full max-h-80 object-cover rounded-xl border border-[#111111]/10"
                          />
                          <div className="mt-3 flex gap-3">
                            <button
                              onClick={useAiImageAsCover}
                              className={btnPrimary}
                            >
                              Χρήση ως εξώφυλλο
                            </button>
                            <button
                              onClick={() => handleAiImage()}
                              disabled={aiImageGenerating}
                              className={btnSecondary}
                            >
                              Νέα εικόνα
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ═══════════ CONTACTS SECTION ═══════════ */}
          {section === "contacts" && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  {unreadCount > 0 && (
                    <span className="inline-block bg-[#E63B2E] text-white font-['Space_Mono'] text-[10px] px-2 py-0.5 rounded-full">
                      {unreadCount} νέα
                    </span>
                  )}
                </div>
                <button onClick={refreshContacts} className={btnSecondary}>
                  Ανανέωση
                </button>
              </div>

              <div className="space-y-4">
                {contacts.length === 0 && (
                  <div className="rounded-2xl border-2 border-dashed border-[#111111]/10 bg-white py-20 text-center">
                    <p className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest">
                      Δεν υπάρχουν μηνύματα
                    </p>
                  </div>
                )}
                {contacts.map((c) => (
                  <div
                    key={c.id}
                    className={`rounded-2xl border bg-white transition-all ${
                      c.read
                        ? "border-[#111111]/10"
                        : "border-[#E63B2E]/30 shadow-sm"
                    }`}
                  >
                    <div
                      className="flex items-start sm:items-center gap-3 sm:gap-5 p-4 sm:p-5 cursor-pointer"
                      onClick={() =>
                        setExpandedContact(
                          expandedContact === c.id ? null : c.id
                        )
                      }
                    >
                      <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 sm:mt-0 ${c.read ? "bg-[#111111]/10" : "bg-[#E63B2E]"}`} />

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <h3 className="font-['Space_Grotesk'] font-bold text-[#111111] truncate tracking-tight">
                            {c.name}
                          </h3>
                          {c.subject && (
                            <span className="font-['Space_Mono'] text-[9px] text-[#111111]/40 uppercase tracking-widest truncate">
                              {c.subject}
                            </span>
                          )}
                        </div>
                        <p className="font-['Space_Mono'] text-[9px] text-[#E63B2E] uppercase tracking-widest mt-1">
                          {c.email}
                          {c.phone && ` · ${c.phone}`}
                        </p>
                        <p className="mt-1 line-clamp-1 text-sm text-[#111111]/50">
                          {c.message}
                        </p>
                        <p className="mt-1 sm:hidden font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest">
                          {formatDate(c.created_at)}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <span className="hidden sm:inline font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest">
                          {formatDate(c.created_at)}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-[#111111]/30 transition-transform ${
                            expandedContact === c.id ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {expandedContact === c.id && (
                      <div className="border-t border-[#111111]/5 px-4 sm:px-5 py-4 sm:py-5">
                        <div className="bg-[#F5F3EE] rounded-xl p-4 sm:p-5 mb-4">
                          <p className="text-sm text-[#111111]/80 whitespace-pre-wrap leading-relaxed">
                            {c.message}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => toggleContactRead(c)}
                            className={btnSmall("default")}
                          >
                            {c.read ? "Σήμανση ως μη αναγνωσμένο" : "Σήμανση ως αναγνωσμένο"}
                          </button>
                          <a
                            href={`mailto:${c.email}`}
                            className={btnSmall("accent")}
                          >
                            Απάντηση
                          </a>
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className={btnSmall("danger")}
                          >
                            Διαγραφή
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ═══════════ ADMINS SECTION ═══════════ */}
          {section === "admins" && (
            <>
              {/* Register new admin form */}
              <div className="mb-8 rounded-2xl border border-[#111111]/10 bg-white p-6">
                <h3 className="mb-4 font-['Space_Grotesk'] font-bold text-lg text-[#111111] tracking-tighter uppercase">
                  Εγγραφή Νέου Διαχειριστή
                </h3>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <label className={labelClass}>Email</label>
                    <input
                      type="email"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      className={inputClass}
                      placeholder="new-admin@alkater.gr"
                    />
                  </div>
                  <div className="flex-1">
                    <label className={labelClass}>Κωδικός</label>
                    <input
                      type="password"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      className={inputClass}
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                  <button
                    onClick={handleCreateAdmin}
                    disabled={creatingAdmin || !newAdminEmail || newAdminPassword.length < 6}
                    className={btnPrimary + " shrink-0"}
                  >
                    {creatingAdmin ? "Δημιουργία..." : "Προσθήκη"}
                  </button>
                </div>
                {adminError && (
                  <p className="mt-3 rounded-xl bg-[#E63B2E]/10 border border-[#E63B2E]/20 px-4 py-2.5 text-sm text-[#E63B2E] font-['Space_Grotesk']">
                    {adminError}
                  </p>
                )}
                {adminSuccess && (
                  <p className="mt-3 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-sm text-emerald-700 font-['Space_Grotesk']">
                    {adminSuccess}
                  </p>
                )}
              </div>

              {/* User list */}
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-['Space_Grotesk'] font-bold text-lg text-[#111111] tracking-tighter uppercase">
                  Υπάρχοντες Διαχειριστές ({authUsers.length})
                </h3>
                <button
                  onClick={loadUsers}
                  disabled={usersLoading}
                  className={btnSecondary}
                >
                  {usersLoading ? "Φόρτωση..." : "Ανανέωση"}
                </button>
              </div>

              {usersLoading && authUsers.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed border-[#111111]/10 bg-white py-20 text-center">
                  <p className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest">
                    Φόρτωση διαχειριστών...
                  </p>
                </div>
              )}

              {!usersLoading && authUsers.length === 0 && (
                <div className="rounded-2xl border border-[#111111]/10 bg-white p-8">
                  <p className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest mb-4">
                    Δεν βρέθηκαν διαχειριστές ή χρειάζεται API endpoint
                  </p>
                  <p className="text-sm text-[#111111]/50">
                    Βεβαιωθείτε ότι υπάρχει το API endpoint <code className="bg-[#F5F3EE] px-2 py-0.5 rounded text-[#E63B2E]">/api/admin/users</code>
                    {" "}και ότι έχετε ορίσει το <code className="bg-[#F5F3EE] px-2 py-0.5 rounded text-[#E63B2E]">SUPABASE_SERVICE_ROLE_KEY</code> στο .env.
                  </p>
                </div>
              )}

              {authUsers.length > 0 && (
                <div className="space-y-4">
                  {authUsers.map((u) => (
                    <div
                      key={u.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 rounded-2xl border border-[#111111]/10 bg-white p-4 sm:p-5"
                    >
                      <div className="flex items-center gap-3 sm:gap-5">
                        <div className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-white font-['Space_Mono'] text-xs uppercase shrink-0">
                          {u.email?.charAt(0) ?? "?"}
                        </div>
                        <div className="min-w-0 flex-1 sm:flex-none">
                          <h3 className="font-['Space_Grotesk'] font-bold text-[#111111] truncate tracking-tight">
                            {u.email}
                          </h3>
                          <p className="font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest mt-1">
                            ID: {u.id.slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                      <div className="sm:ml-auto sm:text-right border-t sm:border-t-0 border-[#111111]/5 pt-3 sm:pt-0 shrink-0">
                        <p className="font-['Space_Mono'] text-[9px] text-[#111111]/40 uppercase tracking-widest">
                          Εγγραφή: {formatDate(u.created_at)}
                        </p>
                        {u.last_sign_in_at && (
                          <p className="font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest mt-1">
                            Τελ. Σύνδεση: {formatDate(u.last_sign_in_at)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ═══════════ MEDIA SECTION ═══════════ */}
          {section === "media" && (
            <>
              {/* Upload zone */}
              <div className="mb-8">
                <ImageUpload
                  value={null}
                  onChange={() => loadMedia()}
                  folder="uploads"
                />
              </div>

              {/* Local Videos */}
              <div className="mb-8">
                <h3 className="mb-4 font-['Space_Grotesk'] font-bold text-lg text-[#111111] tracking-tighter uppercase">
                  Videos Έργων
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {LOCAL_VIDEOS.map((video) => (
                    <div
                      key={video.name}
                      className="group relative overflow-hidden rounded-2xl border border-[#111111]/10 bg-white transition-all hover:border-[#111111]/20"
                    >
                      <video
                        src={video.path}
                        className="h-44 w-full object-cover"
                        muted
                        playsInline
                        onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseLeave={(e) => {
                          const v = e.target as HTMLVideoElement;
                          v.pause();
                          v.currentTime = 0;
                        }}
                      />
                      <div className="p-3">
                        <p
                          className="truncate font-['Space_Mono'] text-[10px] text-[#111111]/70 uppercase tracking-widest"
                          title={video.name}
                        >
                          {video.name}
                        </p>
                        <p className="font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest">
                          Local · /Videos/
                        </p>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 bg-white/90 p-3 backdrop-blur transition-transform group-hover:translate-y-0">
                        <button
                          onClick={() => copyUrl(video.path)}
                          className="flex-1 cursor-pointer rounded-lg bg-[#111111] px-2 py-2 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-white transition-all hover:bg-[#E63B2E]"
                        >
                          {copiedUrl === video.path ? "Copied!" : "Copy Path"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supabase media */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-['Space_Grotesk'] font-bold text-lg text-[#111111] tracking-tighter uppercase">
                    Uploaded Media
                  </h3>
                  <button
                    onClick={loadMedia}
                    disabled={mediaLoading}
                    className={btnSecondary}
                  >
                    {mediaLoading ? "Φόρτωση..." : "Ανανέωση"}
                  </button>
                </div>

                {mediaLoading && mediaFiles.length === 0 && (
                  <div className="rounded-2xl border-2 border-dashed border-[#111111]/10 bg-white py-20 text-center">
                    <p className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest">
                      Φόρτωση αρχείων...
                    </p>
                  </div>
                )}

                {!mediaLoading && mediaFiles.length === 0 && (
                  <div className="rounded-2xl border-2 border-dashed border-[#111111]/10 bg-white py-20 text-center">
                    <p className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest">
                      Δεν υπάρχουν αρχεία
                    </p>
                  </div>
                )}

                {mediaFiles.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {mediaFiles.map((file) => {
                      const url = getPublicUrl(file.name);
                      const isImage =
                        file.metadata?.mimetype?.startsWith("image/") ??
                        /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name);
                      return (
                        <div
                          key={file.id}
                          className="group relative overflow-hidden rounded-2xl border border-[#111111]/10 bg-white transition-all hover:border-[#111111]/20"
                        >
                          {isImage ? (
                            <img
                              src={url}
                              alt={file.name}
                              className="h-40 w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-40 items-center justify-center bg-[#F5F3EE]">
                              <FileText size={48} className="text-[#111111]/20" />
                            </div>
                          )}
                          <div className="p-3">
                            <p
                              className="truncate font-['Space_Mono'] text-[10px] text-[#111111]/70 uppercase tracking-widest"
                              title={file.name}
                            >
                              {file.name.split("/").pop()}
                            </p>
                            <p className="font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest">
                              {file.metadata?.size
                                ? formatBytes(file.metadata.size)
                                : ""}
                            </p>
                          </div>
                          <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 bg-white/90 p-3 backdrop-blur transition-transform group-hover:translate-y-0">
                            <button
                              onClick={() => copyUrl(url)}
                              className="flex-1 cursor-pointer rounded-lg bg-[#111111] px-2 py-2 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-white transition-all hover:bg-[#E63B2E]"
                            >
                              {copiedUrl === url ? "Copied!" : "Copy URL"}
                            </button>
                            <button
                              onClick={() => handleDeleteMedia(file.name)}
                              className="cursor-pointer rounded-lg bg-[#E63B2E] px-3 py-2 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-white transition-all hover:bg-[#c4161c]"
                            >
                              Del
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="hidden md:block border-t border-[#111111]/10 py-8">
          <div className="mx-auto max-w-5xl px-6 flex justify-between items-center font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} ALKATER S.A.</p>
            <p>Admin Panel</p>
          </div>
        </footer>
      </main>

      {/* Bottom Navigation — mobile only */}
      <nav className="fixed bottom-0 inset-x-0 z-50 flex md:hidden border-t border-[#111111]/10 bg-white/95 backdrop-blur-lg">
        {(["home", "services", "projects", "blog", "contacts", "admins", "media"] as Section[]).map((s) => {
          const isActive = section === s;
          const Icon = sectionIcons[s];
          return (
            <button
              key={s}
              onClick={() => setSection(s)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 cursor-pointer transition-colors relative ${
                isActive ? "text-[#E63B2E]" : "text-[#111111]/40"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-[#E63B2E]" />
              )}
              <Icon size={18} />
              <span className="font-['Space_Mono'] text-[8px] uppercase tracking-widest leading-none">
                {sectionLabels[s]}
              </span>
              {s === "contacts" && unreadCount > 0 && (
                <span className="absolute top-1.5 right-1/2 -translate-x-[-10px] h-4 min-w-4 flex items-center justify-center rounded-full bg-[#E63B2E] font-['Space_Mono'] text-[8px] text-white px-1">
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
