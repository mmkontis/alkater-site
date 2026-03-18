"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  Construction,
  HardHat,
  Truck,
  PaintBucket,
  Ruler,
  ShieldCheck,
  Wrench,
  Hammer,
  Cone,
  Shovel,
  Fence,
  Drill,
  Landmark,
  Building,
  Factory,
  Warehouse,
  Blocks,
  Combine,
  MapPin,
  Map,
  Route,
  Compass,
  Gauge,
  Cog,
  Settings,
  Shield,
  BadgeCheck,
  ClipboardCheck,
  ClipboardList,
  FileCheck,
  FileCog,
  Scan,
  ScanLine,
  Pipette,
  Paintbrush,
  PenTool,
  Shapes,
  Triangle,
  Square,
  Circle,
  Hexagon,
  Mountain,
  TreePine,
  Leaf,
  Droplets,
  Zap,
  Bolt,
  Cable,
  Container,
  Package,
  Weight,
  Milestone,
  Signpost,
  TrafficCone,
  Info,
  UsersRound,
  Plus,
  Trash2,
  Film,
  type LucideIcon,
} from "lucide-react";

const SERVICE_ICONS: { name: string; icon: LucideIcon; label: string }[] = [
  { name: "Construction", icon: Construction, label: "Κατασκευή" },
  { name: "HardHat", icon: HardHat, label: "Κράνος" },
  { name: "Truck", icon: Truck, label: "Φορτηγό" },
  { name: "PaintBucket", icon: PaintBucket, label: "Βαφή" },
  { name: "Ruler", icon: Ruler, label: "Χάρακας" },
  { name: "ShieldCheck", icon: ShieldCheck, label: "Ποιοτ. Έλεγχος" },
  { name: "Wrench", icon: Wrench, label: "Κλειδί" },
  { name: "Hammer", icon: Hammer, label: "Σφυρί" },
  { name: "Cone", icon: Cone, label: "Κώνος" },
  { name: "Shovel", icon: Shovel, label: "Φτυάρι" },
  { name: "Fence", icon: Fence, label: "Φράχτης" },
  { name: "Drill", icon: Drill, label: "Τρυπάνι" },
  { name: "TrafficCone", icon: TrafficCone, label: "Κώνος Οδικός" },
  { name: "Landmark", icon: Landmark, label: "Μνημείο" },
  { name: "Building", icon: Building, label: "Κτίριο" },
  { name: "Building2", icon: Building2, label: "Κτίριο 2" },
  { name: "Factory", icon: Factory, label: "Εργοστάσιο" },
  { name: "Warehouse", icon: Warehouse, label: "Αποθήκη" },
  { name: "Blocks", icon: Blocks, label: "Τούβλα" },
  { name: "Combine", icon: Combine, label: "Μηχάνημα" },
  { name: "MapPin", icon: MapPin, label: "Τοποθεσία" },
  { name: "Map", icon: Map, label: "Χάρτης" },
  { name: "Route", icon: Route, label: "Διαδρομή" },
  { name: "Compass", icon: Compass, label: "Πυξίδα" },
  { name: "Milestone", icon: Milestone, label: "Χιλιομετρικό" },
  { name: "Signpost", icon: Signpost, label: "Πινακίδα" },
  { name: "Gauge", icon: Gauge, label: "Μετρητής" },
  { name: "Cog", icon: Cog, label: "Γρανάζι" },
  { name: "Settings", icon: Settings, label: "Ρυθμίσεις" },
  { name: "Shield", icon: Shield, label: "Ασπίδα" },
  { name: "BadgeCheck", icon: BadgeCheck, label: "Πιστοποίηση" },
  { name: "ClipboardCheck", icon: ClipboardCheck, label: "Έλεγχος" },
  { name: "ClipboardList", icon: ClipboardList, label: "Λίστα Ελέγχου" },
  { name: "FileCheck", icon: FileCheck, label: "Αρχείο OK" },
  { name: "FileCog", icon: FileCog, label: "Τεχν. Αρχείο" },
  { name: "Scan", icon: Scan, label: "Σάρωση" },
  { name: "ScanLine", icon: ScanLine, label: "Γραμμή Σάρωσης" },
  { name: "Pipette", icon: Pipette, label: "Πιπέτα" },
  { name: "Paintbrush", icon: Paintbrush, label: "Πινέλο" },
  { name: "PenTool", icon: PenTool, label: "Σχεδίαση" },
  { name: "Shapes", icon: Shapes, label: "Σχήματα" },
  { name: "Triangle", icon: Triangle, label: "Τρίγωνο" },
  { name: "Hexagon", icon: Hexagon, label: "Εξάγωνο" },
  { name: "Mountain", icon: Mountain, label: "Βουνό" },
  { name: "TreePine", icon: TreePine, label: "Δέντρο" },
  { name: "Leaf", icon: Leaf, label: "Φύλλο" },
  { name: "Droplets", icon: Droplets, label: "Σταγόνες" },
  { name: "Zap", icon: Zap, label: "Ενέργεια" },
  { name: "Bolt", icon: Bolt, label: "Μπουλόνι" },
  { name: "Cable", icon: Cable, label: "Καλώδιο" },
  { name: "Container", icon: Container, label: "Κοντέινερ" },
  { name: "Package", icon: Package, label: "Πακέτο" },
  { name: "Weight", icon: Weight, label: "Βάρος" },
  { name: "Layers", icon: Layers, label: "Στρώσεις" },
];

interface Service {
  id: string;
  slug: string;
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
  slug: string;
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

interface TeamMemberRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  job_title: string;
  bio: string;
  photo_url: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
}

interface AboutContent {
  hero: { label: string; title: string; title_accent: string; subtitle: string; image: string };
  stats: { value: string; label: string }[];
  mission: { label: string; title: string; title_accent: string; paragraphs: string[]; image: string };
  values: { label: string; title: string; title_accent: string; items: { icon: string; title: string; desc: string }[] };
  milestones: { label: string; title: string; title_accent: string; items: { year: string; text: string }[] };
}

interface HeroSlideRow {
  id: string;
  heading: string;
  heading_accent: string;
  subtitle: string;
  video_url: string | null;
  image_url: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
}

type Section = "home" | "slides" | "services" | "projects" | "blog" | "contacts" | "admins" | "media" | "about" | "team";

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
  slides: Film,
  services: Layers,
  projects: Building2,
  blog: FileText,
  contacts: Mail,
  about: Info,
  team: UsersRound,
  admins: Users,
  media: ImageIcon,
};

const sectionLabels: Record<Section, string> = {
  home: "Αρχική",
  slides: "Hero Slides",
  services: "Υπηρεσίες",
  projects: "Έργα",
  blog: "Blog",
  contacts: "Μηνύματα",
  about: "Σελ. Εταιρείας",
  team: "Ομάδα",
  admins: "Διαχειριστές",
  media: "Media",
};

const LOCAL_VIDEOS = [
  { name: "sample_0-3.mp4", path: "/Videos/sample_0-3.mp4" },
  { name: "sample_1-3.mp4", path: "/Videos/sample_1-3.mp4" },
  { name: "sample_2.mp4", path: "/Videos/sample_2.mp4" },
  { name: "sample_3-3.mp4", path: "/Videos/sample_3-3.mp4" },
];

function IconPicker({ value, onChange }: { value: string; onChange: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = search
    ? SERVICE_ICONS.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.label.toLowerCase().includes(search.toLowerCase())
      )
    : SERVICE_ICONS;

  const selected = SERVICE_ICONS.find((i) => i.name === value);
  const SelectedIcon = selected?.icon;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 text-left font-['Space_Grotesk'] text-sm text-[#111111] transition-all hover:border-[#111111]/20 focus:outline-none focus:ring-2 focus:ring-[#E63B2E]/20"
      >
        {SelectedIcon ? (
          <SelectedIcon className="h-5 w-5 shrink-0 text-[#111111]/70" />
        ) : (
          <Layers className="h-5 w-5 shrink-0 text-[#111111]/30" />
        )}
        <span className={`flex-1 truncate ${value ? "text-[#111111]" : "text-[#111111]/40"}`}>
          {selected ? `${selected.label} (${selected.name})` : "Επιλέξτε εικονίδιο..."}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-[#111111]/40 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-xl border border-[#111111]/10 bg-white shadow-xl">
          <div className="border-b border-[#111111]/5 p-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Αναζήτηση εικονιδίου..."
              className="w-full rounded-lg bg-[#F5F3EE]/50 px-3 py-2 font-['Space_Grotesk'] text-sm text-[#111111] placeholder:text-[#111111]/30 outline-none focus:ring-2 focus:ring-[#E63B2E]/20"
              autoFocus
            />
          </div>
          <div className="grid max-h-64 grid-cols-4 gap-1 overflow-y-auto p-2 sm:grid-cols-6">
            {filtered.map((item) => {
              const Icon = item.icon;
              const isSelected = item.name === value;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    onChange(item.name);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`group flex cursor-pointer flex-col items-center gap-1 rounded-lg p-2 transition-all ${
                    isSelected
                      ? "bg-[#E63B2E]/10 ring-1 ring-[#E63B2E]/30"
                      : "hover:bg-[#F5F3EE]"
                  }`}
                  title={`${item.label} (${item.name})`}
                >
                  <Icon
                    className={`h-6 w-6 ${
                      isSelected ? "text-[#E63B2E]" : "text-[#111111]/60 group-hover:text-[#111111]"
                    }`}
                  />
                  <span
                    className={`line-clamp-1 font-['Space_Mono'] text-[8px] uppercase tracking-wider ${
                      isSelected ? "text-[#E63B2E]" : "text-[#111111]/40"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-full py-6 text-center font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest">
                Κανένα αποτέλεσμα
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function resolveServiceIcon(name: string): LucideIcon {
  const found = SERVICE_ICONS.find((i) => i.name === name);
  return found?.icon ?? Layers;
}

export default function Dashboard({
  user,
  projects: initialProjects,
  blogPosts: initialBlogPosts,
  contacts: initialContacts,
  services: initialServices,
  heroSlides: initialHeroSlides,
  aboutContent: initialAboutContent,
  teamMembers: initialTeamMembers,
}: {
  user: User;
  projects: Project[];
  blogPosts: BlogPost[];
  contacts: ContactSubmission[];
  services: Service[];
  heroSlides: HeroSlideRow[];
  aboutContent: AboutContent | null;
  teamMembers: TeamMemberRow[];
}) {
  const supabase = createClient();
  const [section, setSection] = useState<Section>("home");

  // ── Services state ──
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [savingService, setSavingService] = useState(false);
  const [serviceTab, setServiceTab] = useState<"list" | "form">("list");

  const emptyService: Omit<Service, "id"> = {
    slug: "",
    name: "",
    description: "",
    icon: "",
    image_url: null,
    video_url: null,
    video_start_time: 0,
    sort_order: 0,
  };
  const [serviceForm, setServiceForm] = useState(emptyService);

  // ── Hero Slides state ──
  const [heroSlides, setHeroSlides] = useState<HeroSlideRow[]>(initialHeroSlides);
  const [editingSlide, setEditingSlide] = useState<HeroSlideRow | null>(null);
  const [savingSlide, setSavingSlide] = useState(false);
  const [slideTab, setSlideTab] = useState<"list" | "form">("list");
  const emptySlide: Omit<HeroSlideRow, "id" | "created_at"> = {
    heading: "", heading_accent: "", subtitle: "", video_url: null, image_url: null, sort_order: 0, published: true,
  };
  const [slideForm, setSlideForm] = useState(emptySlide);

  // ── Projects state ──
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [savingProject, setSavingProject] = useState(false);
  const [projectTab, setProjectTab] = useState<"list" | "form">("list");

  const emptyProject: Omit<Project, "id" | "created_at"> = {
    slug: "",
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
  const [slugConflict, setSlugConflict] = useState<Record<string, string | null>>({});

  async function checkSlugConflict(table: "services" | "projects" | "blog_posts", slug: string, excludeId?: string) {
    if (!slug) { setSlugConflict((prev) => ({ ...prev, [table]: null })); return; }
    let query = supabase.from(table).select("id").eq("slug", slug);
    if (excludeId) query = query.neq("id", excludeId);
    const { data } = await query.limit(1);
    setSlugConflict((prev) => ({
      ...prev,
      [table]: data && data.length > 0 ? `Το slug "${slug}" χρησιμοποιείται ήδη. Θα προστεθεί αριθμός αυτόματα.` : null,
    }));
  }

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

  // ── About page content state ──
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(initialAboutContent);
  const [aboutForm, setAboutForm] = useState<AboutContent | null>(initialAboutContent);
  const [savingAbout, setSavingAbout] = useState(false);

  // ── Team members state ──
  const [teamMembers, setTeamMembers] = useState<TeamMemberRow[]>(initialTeamMembers);
  const [editingMember, setEditingMember] = useState<TeamMemberRow | null>(null);
  const [savingMember, setSavingMember] = useState(false);
  const [teamTab, setTeamTab] = useState<"list" | "form">("list");
  const emptyMember: Omit<TeamMemberRow, "id" | "created_at"> = {
    first_name: "", last_name: "", email: null, job_title: "", bio: "", photo_url: null, sort_order: 0, published: true,
  };
  const [memberForm, setMemberForm] = useState(emptyMember);

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
  // AUTO-TRANSLATE HELPER
  // ═══════════════════════════════════════

  async function autoTranslateFields(
    table: string,
    id: string,
    texts: Record<string, string>,
    fieldMap: Record<string, string>
  ) {
    try {
      const res = await fetch("/api/admin/auto-translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "fields", texts }),
      });
      if (!res.ok) return;
      const { translated } = await res.json();
      if (!translated || Object.keys(translated).length === 0) return;
      const updateObj: Record<string, string> = {};
      for (const [srcKey, enCol] of Object.entries(fieldMap)) {
        if (translated[srcKey]) updateObj[enCol] = translated[srcKey];
      }
      if (Object.keys(updateObj).length > 0) {
        await supabase.from(table).update(updateObj).eq("id", id);
      }
    } catch {
      // silent — translation is best-effort
    }
  }

  async function autoTranslateJson(
    table: string,
    pageKey: string,
    json: Record<string, unknown>
  ) {
    try {
      const res = await fetch("/api/admin/auto-translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "json", json }),
      });
      if (!res.ok) return;
      const { translated } = await res.json();
      if (!translated || Object.keys(translated).length === 0) return;
      await supabase
        .from(table)
        .update({ content_en: translated })
        .eq("page_key", pageKey);
    } catch {
      // silent — translation is best-effort
    }
  }

  // ═══════════════════════════════════════
  // HERO SLIDES ACTIONS
  // ═══════════════════════════════════════

  async function refreshHeroSlides() {
    const { data } = await supabase
      .from("hero_slides")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setHeroSlides(data);
  }

  async function handleSaveSlide() {
    setSavingSlide(true);
    if (editingSlide) {
      const { error } = await supabase
        .from("hero_slides")
        .update({
          heading: slideForm.heading,
          heading_accent: slideForm.heading_accent,
          subtitle: slideForm.subtitle,
          video_url: slideForm.video_url || null,
          image_url: slideForm.image_url || null,
          sort_order: slideForm.sort_order,
          published: slideForm.published,
        })
        .eq("id", editingSlide.id);
      if (!error) {
        autoTranslateFields("hero_slides", editingSlide.id,
          { heading: slideForm.heading, heading_accent: slideForm.heading_accent, subtitle: slideForm.subtitle },
          { heading: "heading_en", heading_accent: "heading_accent_en", subtitle: "subtitle_en" });
        setEditingSlide(null);
        setSlideForm(emptySlide);
        setSlideTab("list");
        await refreshHeroSlides();
      }
    } else {
      const { error, data } = await supabase.from("hero_slides").insert({
        heading: slideForm.heading,
        heading_accent: slideForm.heading_accent,
        subtitle: slideForm.subtitle,
        video_url: slideForm.video_url || null,
        image_url: slideForm.image_url || null,
        sort_order: slideForm.sort_order,
        published: slideForm.published,
      }).select("id").single();
      if (!error && data) {
        autoTranslateFields("hero_slides", data.id,
          { heading: slideForm.heading, heading_accent: slideForm.heading_accent, subtitle: slideForm.subtitle },
          { heading: "heading_en", heading_accent: "heading_accent_en", subtitle: "subtitle_en" });
        setSlideForm(emptySlide);
        setSlideTab("list");
        await refreshHeroSlides();
      }
    }
    setSavingSlide(false);
  }

  async function handleDeleteSlide(id: string) {
    if (!confirm("Σίγουρα θέλετε να διαγράψετε αυτό το slide;")) return;
    await supabase.from("hero_slides").delete().eq("id", id);
    await refreshHeroSlides();
  }

  function startEditSlide(slide: HeroSlideRow) {
    setEditingSlide(slide);
    setSlideForm({
      heading: slide.heading,
      heading_accent: slide.heading_accent,
      subtitle: slide.subtitle,
      video_url: slide.video_url,
      image_url: slide.image_url,
      sort_order: slide.sort_order,
      published: slide.published,
    });
    setSlideTab("form");
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
    const baseSlug = serviceForm.slug || slugify(serviceForm.name);
    if (editingService) {
      const slug = await resolveUniqueSlug("services", baseSlug, editingService.id);
      const { error } = await supabase
        .from("services")
        .update({
          slug,
          name: serviceForm.name,
          description: serviceForm.description,
          icon: serviceForm.icon,
          image_url: serviceForm.image_url || null,
          video_url: serviceForm.video_url || null,
          video_start_time: serviceForm.video_start_time,
          sort_order: serviceForm.sort_order,
        })
        .eq("id", editingService.id);
      if (!error) {
        autoTranslateFields("services", editingService.id,
          { name: serviceForm.name, description: serviceForm.description },
          { name: "name_en", description: "description_en" });
        setEditingService(null);
        setServiceForm(emptyService);
        setServiceTab("list");
        await refreshServices();
      }
    } else {
      const slug = await resolveUniqueSlug("services", baseSlug);
      const { error, data } = await supabase.from("services").insert({
        slug,
        name: serviceForm.name,
        description: serviceForm.description,
        icon: serviceForm.icon,
        image_url: serviceForm.image_url || null,
        video_url: serviceForm.video_url || null,
        video_start_time: serviceForm.video_start_time,
        sort_order: serviceForm.sort_order,
      }).select("id").single();
      if (!error && data) {
        autoTranslateFields("services", data.id,
          { name: serviceForm.name, description: serviceForm.description },
          { name: "name_en", description: "description_en" });
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
      slug: service.slug,
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
    const baseSlug = projectForm.slug || slugify(projectForm.title);
    if (editingProject) {
      const slug = await resolveUniqueSlug("projects", baseSlug, editingProject.id);
      const { error } = await supabase
        .from("projects")
        .update({
          slug,
          title: projectForm.title,
          description: projectForm.description,
          category: projectForm.category,
          image_url: projectForm.image_url,
          published: projectForm.published,
          service_id: projectForm.service_id || null,
        })
        .eq("id", editingProject.id);
      if (!error) {
        autoTranslateFields("projects", editingProject.id,
          { title: projectForm.title, description: projectForm.description },
          { title: "title_en", description: "description_en" });
        setEditingProject(null);
        setProjectForm(emptyProject);
        setProjectTab("list");
        await refreshProjects();
      }
    } else {
      const slug = await resolveUniqueSlug("projects", baseSlug);
      const { error, data } = await supabase.from("projects").insert({
        slug,
        title: projectForm.title,
        description: projectForm.description,
        category: projectForm.category,
        image_url: projectForm.image_url,
        published: projectForm.published,
        service_id: projectForm.service_id || null,
      }).select("id").single();
      if (!error && data) {
        autoTranslateFields("projects", data.id,
          { title: projectForm.title, description: projectForm.description },
          { title: "title_en", description: "description_en" });
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
      slug: project.slug,
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

  async function resolveUniqueSlug(table: "services" | "projects" | "blog_posts", baseSlug: string, excludeId?: string): Promise<string> {
    let candidate = baseSlug;
    let suffix = 0;
    while (true) {
      let query = supabase
        .from(table)
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
      const slug = await resolveUniqueSlug("blog_posts", baseSlug, editingPost.id);
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
        autoTranslateFields("blog_posts", editingPost.id,
          { title: blogForm.title, excerpt: blogForm.excerpt, content: blogForm.content },
          { title: "title_en", excerpt: "excerpt_en", content: "content_en" });
        setEditingPost(null);
        setBlogForm(emptyPost);
        setBlogTab("list");
        await refreshBlogPosts();
      }
    } else {
      const slug = await resolveUniqueSlug("blog_posts", baseSlug);
      const { error, data } = await supabase.from("blog_posts").insert({
        title: blogForm.title,
        slug,
        excerpt: blogForm.excerpt,
        content: blogForm.content,
        cover_image: blogForm.cover_image,
        published: blogForm.published,
      }).select("id").single();
      if (!error && data) {
        autoTranslateFields("blog_posts", data.id,
          { title: blogForm.title, excerpt: blogForm.excerpt, content: blogForm.content },
          { title: "title_en", excerpt: "excerpt_en", content: "content_en" });
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

  // ═══════════════════════════════════════
  // ABOUT PAGE ACTIONS
  // ═══════════════════════════════════════

  async function handleSaveAbout() {
    if (!aboutForm) return;
    setSavingAbout(true);
    const { error } = await supabase
      .from("page_content")
      .upsert({ page_key: "about", content: aboutForm, updated_at: new Date().toISOString() }, { onConflict: "page_key" });
    if (!error) {
      setAboutContent(aboutForm);
      autoTranslateJson("page_content", "about", aboutForm as unknown as Record<string, unknown>);
    }
    setSavingAbout(false);
  }

  // ═══════════════════════════════════════
  // TEAM MEMBER ACTIONS
  // ═══════════════════════════════════════

  async function refreshTeamMembers() {
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data) setTeamMembers(data);
  }

  async function handleSaveMember() {
    setSavingMember(true);
    if (editingMember) {
      const { error } = await supabase
        .from("team_members")
        .update({
          first_name: memberForm.first_name,
          last_name: memberForm.last_name,
          email: memberForm.email || null,
          job_title: memberForm.job_title,
          bio: memberForm.bio,
          photo_url: memberForm.photo_url || null,
          sort_order: memberForm.sort_order,
          published: memberForm.published,
        })
        .eq("id", editingMember.id);
      if (!error) {
        autoTranslateFields("team_members", editingMember.id,
          { job_title: memberForm.job_title, bio: memberForm.bio },
          { job_title: "job_title_en", bio: "bio_en" });
        setEditingMember(null);
        setMemberForm(emptyMember);
        setTeamTab("list");
        await refreshTeamMembers();
      }
    } else {
      const { error, data } = await supabase.from("team_members").insert({
        first_name: memberForm.first_name,
        last_name: memberForm.last_name,
        email: memberForm.email || null,
        job_title: memberForm.job_title,
        bio: memberForm.bio,
        photo_url: memberForm.photo_url || null,
        sort_order: memberForm.sort_order,
        published: memberForm.published,
      }).select("id").single();
      if (!error && data) {
        autoTranslateFields("team_members", data.id,
          { job_title: memberForm.job_title, bio: memberForm.bio },
          { job_title: "job_title_en", bio: "bio_en" });
        setMemberForm(emptyMember);
        setTeamTab("list");
        await refreshTeamMembers();
      }
    }
    setSavingMember(false);
  }

  async function handleDeleteMember(id: string) {
    if (!confirm("Σίγουρα θέλετε να διαγράψετε αυτό το μέλος;")) return;
    await supabase.from("team_members").delete().eq("id", id);
    await refreshTeamMembers();
  }

  function startEditMember(member: TeamMemberRow) {
    setEditingMember(member);
    setMemberForm({
      first_name: member.first_name,
      last_name: member.last_name,
      email: member.email,
      job_title: member.job_title,
      bio: member.bio,
      photo_url: member.photo_url,
      sort_order: member.sort_order,
      published: member.published,
    });
    setTeamTab("form");
  }

  async function toggleMemberPublished(member: TeamMemberRow) {
    await supabase
      .from("team_members")
      .update({ published: !member.published })
      .eq("id", member.id);
    await refreshTeamMembers();
  }

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
          {(["home", "services", "projects", "blog", "contacts", "about", "team", "admins", "media"] as Section[]).map((s) => {
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
              {section === "slides" && "Hero Slides."}
              {section === "services" && "Διαχείριση Υπηρεσιών."}
              {section === "projects" && "Διαχείριση Έργων."}
              {section === "blog" && "Διαχείριση Blog."}
              {section === "contacts" && "Μηνύματα Επικοινωνίας."}
              {section === "about" && "Σελίδα Εταιρείας."}
              {section === "team" && "Μέλη Ομάδας."}
              {section === "admins" && "Διαχειριστές."}
              {section === "media" && "Βιβλιοθήκη Media."}
            </h1>
          </div>

          {/* ═══════════ HOME SECTION ═══════════ */}
          {section === "home" && (
            <div className="space-y-6">
              {/* Stats cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                <button
                  onClick={() => setSection("slides")}
                  className="cursor-pointer rounded-2xl border border-[#111111]/10 bg-white p-5 text-left transition-all hover:border-[#111111]/20 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111]/5">
                      <Film size={20} className="text-[#111111]/60" />
                    </div>
                    <span className="font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#111111]/40">
                      Hero Slides
                    </span>
                  </div>
                  <p className="font-['Space_Grotesk'] text-3xl font-bold text-[#111111] tracking-tighter">
                    {heroSlides.length}
                  </p>
                  <p className="mt-1 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-emerald-600">
                    {heroSlides.filter((s) => s.published).length} ενεργά
                  </p>
                </button>

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

          {/* ═══════════ HERO SLIDES SECTION ═══════════ */}
          {section === "slides" && (
            <>
              <div className="mb-6 flex gap-3">
                <button
                  onClick={() => {
                    setSlideTab("list");
                    setEditingSlide(null);
                    setSlideForm(emptySlide);
                  }}
                  className={`cursor-pointer rounded-xl px-5 py-2.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all ${
                    slideTab === "list"
                      ? "bg-[#111111] text-white"
                      : "bg-white border border-[#111111]/10 text-[#111111]/50 hover:text-[#111111]"
                  }`}
                >
                  Λίστα
                </button>
                <button
                  onClick={() => {
                    setSlideTab("form");
                    setEditingSlide(null);
                    setSlideForm(emptySlide);
                  }}
                  className={`cursor-pointer rounded-xl px-5 py-2.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all ${
                    slideTab === "form"
                      ? "bg-[#111111] text-white"
                      : "bg-white border border-[#111111]/10 text-[#111111]/50 hover:text-[#111111]"
                  }`}
                >
                  {editingSlide ? "Επεξεργασία" : "+ Νέο Slide"}
                </button>
              </div>

              {slideTab === "list" && (
                <div className="space-y-4">
                  {heroSlides.length === 0 && (
                    <div className="rounded-2xl border-2 border-dashed border-[#111111]/10 bg-white py-20 text-center">
                      <p className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest">
                        Δεν υπάρχουν slides ακόμα
                      </p>
                    </div>
                  )}
                  {heroSlides.map((slide) => (
                    <div
                      key={slide.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 rounded-2xl border border-[#111111]/10 bg-white p-4 sm:p-5 transition-all hover:border-[#111111]/20"
                    >
                      <div className="relative h-16 w-24 shrink-0 rounded-xl overflow-hidden bg-[#111111]/5">
                        {slide.video_url ? (
                          <video src={slide.video_url} muted className="h-full w-full object-cover" />
                        ) : slide.image_url ? (
                          <img src={slide.image_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Film className="h-5 w-5 text-[#111111]/20" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <h3 className="font-['Space_Grotesk'] font-bold text-[#111111] truncate tracking-tight">
                            {slide.heading} <span className="text-[#E63B2E]">{slide.heading_accent}</span>
                          </h3>
                          <span className="shrink-0 rounded-full bg-[#F5F3EE] px-2.5 py-0.5 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#111111]/40">
                            #{slide.sort_order}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-sm text-[#111111]/50">{slide.subtitle}</p>
                        <p className="font-['Space_Mono'] text-[9px] uppercase tracking-widest mt-1">
                          {slide.video_url && <span className="text-[#E63B2E]">Video</span>}
                          {slide.video_url && slide.image_url && <span className="text-[#111111]/20 mx-1">·</span>}
                          {slide.image_url && <span className="text-blue-500">Image</span>}
                          {!slide.video_url && !slide.image_url && <span className="text-[#111111]/20">No media</span>}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 border-t sm:border-t-0 border-[#111111]/5 pt-3 sm:pt-0">
                        <span className={`rounded-full px-2 py-0.5 font-['Space_Mono'] text-[9px] uppercase tracking-widest ${slide.published ? "bg-emerald-50 text-emerald-600" : "bg-[#F5F3EE] text-[#111111]/30"}`}>
                          {slide.published ? "Live" : "Draft"}
                        </span>
                        <button onClick={() => startEditSlide(slide)} className={btnSmall("accent")}>Edit</button>
                        <button onClick={() => handleDeleteSlide(slide.id)} className={btnSmall("danger")}>Del</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {slideTab === "form" && (
                <div className="rounded-2xl border border-[#111111]/10 bg-white p-4 sm:p-8">
                  <h2 className="mb-6 font-['Space_Grotesk'] font-bold text-2xl text-[#111111] tracking-tighter uppercase">
                    {editingSlide ? "Επεξεργασία Slide" : "Νέο Slide"}
                  </h2>
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className={labelClass}>Τίτλος (Heading)</label>
                      <input
                        type="text"
                        value={slideForm.heading}
                        onChange={(e) => setSlideForm({ ...slideForm, heading: e.target.value })}
                        className={inputClass}
                        placeholder="π.χ. ΚΑΤΑΣΚΕΥΕΣ"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Τίτλος Accent</label>
                      <input
                        type="text"
                        value={slideForm.heading_accent}
                        onChange={(e) => setSlideForm({ ...slideForm, heading_accent: e.target.value })}
                        className={inputClass}
                        placeholder="π.χ. ΥΨΗΛΗΣ ΠΟΙΟΤΗΤΑΣ"
                      />
                      <p className="mt-1 font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest">
                        Εμφανίζεται με κόκκινο χρώμα
                      </p>
                    </div>
                    <div>
                      <label className={labelClass}>Υπότιτλος (Subtitle)</label>
                      <textarea
                        value={slideForm.subtitle}
                        onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                        rows={2}
                        className={inputClass}
                        placeholder="Σύντομο κείμενο κάτω από τον τίτλο..."
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Σειρά Ταξινόμησης</label>
                        <input
                          type="number"
                          value={slideForm.sort_order}
                          onChange={(e) => setSlideForm({ ...slideForm, sort_order: parseInt(e.target.value) || 0 })}
                          className={inputClass}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Κατάσταση</label>
                        <div className="flex items-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => setSlideForm({ ...slideForm, published: !slideForm.published })}
                            className={`relative inline-flex h-7 w-12 cursor-pointer items-center rounded-full transition-colors ${slideForm.published ? "bg-emerald-500" : "bg-[#111111]/15"}`}
                          >
                            <span
                              className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${slideForm.published ? "translate-x-6" : "translate-x-1"}`}
                            />
                          </button>
                          <span className="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/50">
                            {slideForm.published ? "Δημοσιευμένο" : "Πρόχειρο"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-[#111111]/5 pt-5">
                      <p className="mb-4 font-['Space_Grotesk'] font-bold text-sm text-[#111111] tracking-tight uppercase">
                        Background Media
                      </p>
                      <p className="mb-4 font-['Space_Mono'] text-[9px] text-[#111111]/40 uppercase tracking-widest">
                        Προσθέστε video ή εικόνα. Αν υπάρχει video, θα χρησιμοποιηθεί αυτό.
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>Video URL</label>
                      <input
                        type="text"
                        value={slideForm.video_url ?? ""}
                        onChange={(e) => setSlideForm({ ...slideForm, video_url: e.target.value || null })}
                        className={inputClass}
                        placeholder="π.χ. /Videos/construction/01_cement_truck.mp4"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Εικόνα Background</label>
                      <ImageUpload
                        value={slideForm.image_url}
                        onChange={(url) => setSlideForm({ ...slideForm, image_url: url })}
                        folder="hero"
                      />
                    </div>

                    {(slideForm.video_url || slideForm.image_url) && (
                      <div className="rounded-xl border border-[#111111]/10 bg-[#F5F3EE] p-4">
                        <p className="mb-2 font-['Space_Mono'] text-[9px] text-[#111111]/40 uppercase tracking-widest">
                          Προεπισκόπηση
                        </p>
                        <div className="relative h-40 w-full overflow-hidden rounded-lg bg-black">
                          {slideForm.video_url ? (
                            <video src={slideForm.video_url} muted autoPlay loop playsInline className="h-full w-full object-cover" />
                          ) : slideForm.image_url ? (
                            <img src={slideForm.image_url} alt="Preview" className="h-full w-full object-cover" />
                          ) : null}
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center text-white">
                              <p className="font-['Space_Grotesk'] font-bold text-xl tracking-tighter uppercase">
                                {slideForm.heading} <span className="text-[#E63B2E]">{slideForm.heading_accent}</span>
                              </p>
                              <p className="font-['Space_Mono'] text-[10px] mt-1 opacity-70">{slideForm.subtitle}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-3">
                      <button
                        onClick={handleSaveSlide}
                        disabled={savingSlide || !slideForm.heading}
                        className={btnPrimary}
                      >
                        {savingSlide ? "Αποθήκευση..." : editingSlide ? "Ενημέρωση" : "Δημιουργία"}
                      </button>
                      <button
                        onClick={() => {
                          setSlideTab("list");
                          setEditingSlide(null);
                          setSlideForm(emptySlide);
                        }}
                        className={btnSecondary}
                      >
                        Ακύρωση
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
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
                        {(() => {
                          const Icon = resolveServiceIcon(s.icon);
                          return <Icon className="h-5 w-5 text-[#111111]/60" />;
                        })()}
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
                        <p className="font-['Space_Mono'] text-[9px] uppercase tracking-widest mt-1">
                          {s.slug && (
                            <span className="text-[#111111]/30">/services/{s.slug}</span>
                          )}
                          {s.slug && (s.video_url || s.image_url) && <span className="text-[#111111]/20 mx-1">·</span>}
                          {s.video_url && <span className="text-[#E63B2E]">Video</span>}
                          {s.video_url && s.image_url && <span className="text-[#111111]/20 mx-1">·</span>}
                          {s.image_url && <span className="text-[#E63B2E]">Image</span>}
                        </p>
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
                        onChange={(e) => {
                          const name = e.target.value;
                          setServiceForm({
                            ...serviceForm,
                            name,
                            slug: editingService ? serviceForm.slug : slugify(name),
                          });
                        }}
                        className={inputClass}
                        placeholder="π.χ. Ασφαλτοστρώσεις"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Slug (URL)</label>
                      <div className="flex items-center gap-3">
                        <span className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest whitespace-nowrap">
                          /services/
                        </span>
                        <input
                          type="text"
                          value={serviceForm.slug}
                          onChange={(e) =>
                            setServiceForm({ ...serviceForm, slug: e.target.value })
                          }
                          onBlur={() => checkSlugConflict("services", serviceForm.slug, editingService?.id)}
                          className={inputClass}
                          placeholder="asfaltostroseis"
                        />
                      </div>
                      {slugConflict.services && (
                        <p className="mt-1.5 font-['Space_Mono'] text-[10px] text-amber-600">{slugConflict.services}</p>
                      )}
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
                        <label className={labelClass}>Εικονίδιο</label>
                        <IconPicker
                          value={serviceForm.icon}
                          onChange={(name) => setServiceForm({ ...serviceForm, icon: name })}
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
                        disabled={savingService || !serviceForm.name || !serviceForm.slug}
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
                        {p.slug && (
                          <p className="font-['Space_Mono'] text-[9px] text-[#111111]/30 uppercase tracking-widest mt-1">
                            /projects/{p.slug}
                          </p>
                        )}
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
                        onChange={(e) => {
                          const title = e.target.value;
                          setProjectForm({
                            ...projectForm,
                            title,
                            slug: editingProject ? projectForm.slug : slugify(title),
                          });
                        }}
                        className={inputClass}
                        placeholder="π.χ. Κατασκευή οδοποιίας - Λάρισα"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Slug (URL)</label>
                      <div className="flex items-center gap-3">
                        <span className="font-['Space_Mono'] text-[10px] text-[#111111]/30 uppercase tracking-widest whitespace-nowrap">
                          /projects/
                        </span>
                        <input
                          type="text"
                          value={projectForm.slug}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, slug: e.target.value })
                          }
                          onBlur={() => checkSlugConflict("projects", projectForm.slug, editingProject?.id)}
                          className={inputClass}
                          placeholder="kataskevi-odopoiias-larisa"
                        />
                      </div>
                      {slugConflict.projects && (
                        <p className="mt-1.5 font-['Space_Mono'] text-[10px] text-amber-600">{slugConflict.projects}</p>
                      )}
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
                        disabled={savingProject || !projectForm.title || !projectForm.slug}
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
                          onBlur={() => checkSlugConflict("blog_posts", blogForm.slug, editingPost?.id)}
                          className={inputClass}
                          placeholder="neo-ergo-asfaltostroshs"
                        />
                      </div>
                      {slugConflict.blog_posts && (
                        <p className="mt-1.5 font-['Space_Mono'] text-[10px] text-amber-600">{slugConflict.blog_posts}</p>
                      )}
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
                        disabled={savingPost || !blogForm.title || !blogForm.slug}
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

          {/* ═══════════ ABOUT PAGE SECTION ═══════════ */}
          {section === "about" && aboutForm && (
            <div className="space-y-8">
              {/* Hero */}
              <div className="rounded-2xl border border-[#111111]/10 bg-white p-6">
                <h2 className="mb-4 font-['Space_Grotesk'] text-lg font-bold text-[#111111] uppercase tracking-tight">Hero</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Label</label>
                    <input value={aboutForm.hero.label} onChange={(e) => setAboutForm({ ...aboutForm, hero: { ...aboutForm.hero, label: e.target.value } })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                  </div>
                  <div>
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Τίτλος</label>
                    <input value={aboutForm.hero.title} onChange={(e) => setAboutForm({ ...aboutForm, hero: { ...aboutForm.hero, title: e.target.value } })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                  </div>
                  <div>
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Accent λέξη</label>
                    <input value={aboutForm.hero.title_accent} onChange={(e) => setAboutForm({ ...aboutForm, hero: { ...aboutForm.hero, title_accent: e.target.value } })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                  </div>
                  <div>
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Εικόνα URL</label>
                    <input value={aboutForm.hero.image} onChange={(e) => setAboutForm({ ...aboutForm, hero: { ...aboutForm.hero, image: e.target.value } })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Υπότιτλος</label>
                    <textarea value={aboutForm.hero.subtitle} onChange={(e) => setAboutForm({ ...aboutForm, hero: { ...aboutForm.hero, subtitle: e.target.value } })} rows={3} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="rounded-2xl border border-[#111111]/10 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-['Space_Grotesk'] text-lg font-bold text-[#111111] uppercase tracking-tight">Στατιστικά</h2>
                  <button onClick={() => setAboutForm({ ...aboutForm, stats: [...aboutForm.stats, { value: "", label: "" }] })} className="flex cursor-pointer items-center gap-1 rounded-lg border border-[#111111]/10 px-3 py-1.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/60 transition-all hover:border-[#111111]/20 hover:text-[#111111]"><Plus size={12} /> Προσθήκη</button>
                </div>
                <div className="space-y-3">
                  {aboutForm.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input value={stat.value} onChange={(e) => { const s = [...aboutForm.stats]; s[i] = { ...s[i], value: e.target.value }; setAboutForm({ ...aboutForm, stats: s }); }} placeholder="π.χ. 25+" className="w-28 rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-2.5 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                      <input value={stat.label} onChange={(e) => { const s = [...aboutForm.stats]; s[i] = { ...s[i], label: e.target.value }; setAboutForm({ ...aboutForm, stats: s }); }} placeholder="Label" className="flex-1 rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-2.5 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                      <button onClick={() => setAboutForm({ ...aboutForm, stats: aboutForm.stats.filter((_, j) => j !== i) })} className="cursor-pointer rounded-lg p-2 text-[#111111]/30 transition-colors hover:bg-[#E63B2E]/10 hover:text-[#E63B2E]"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mission */}
              <div className="rounded-2xl border border-[#111111]/10 bg-white p-6">
                <h2 className="mb-4 font-['Space_Grotesk'] text-lg font-bold text-[#111111] uppercase tracking-tight">Αποστολή</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Label</label>
                    <input value={aboutForm.mission.label} onChange={(e) => setAboutForm({ ...aboutForm, mission: { ...aboutForm.mission, label: e.target.value } })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                  </div>
                  <div>
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Τίτλος</label>
                    <input value={aboutForm.mission.title} onChange={(e) => setAboutForm({ ...aboutForm, mission: { ...aboutForm.mission, title: e.target.value } })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                  </div>
                  <div>
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Accent λέξη</label>
                    <input value={aboutForm.mission.title_accent} onChange={(e) => setAboutForm({ ...aboutForm, mission: { ...aboutForm.mission, title_accent: e.target.value } })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                  </div>
                  <div>
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Εικόνα URL</label>
                    <input value={aboutForm.mission.image} onChange={(e) => setAboutForm({ ...aboutForm, mission: { ...aboutForm.mission, image: e.target.value } })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Παράγραφοι</label>
                    {aboutForm.mission.paragraphs.map((p, i) => (
                      <div key={i} className="mb-2 flex gap-2">
                        <textarea value={p} onChange={(e) => { const ps = [...aboutForm.mission.paragraphs]; ps[i] = e.target.value; setAboutForm({ ...aboutForm, mission: { ...aboutForm.mission, paragraphs: ps } }); }} rows={3} className="flex-1 rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                        <button onClick={() => setAboutForm({ ...aboutForm, mission: { ...aboutForm.mission, paragraphs: aboutForm.mission.paragraphs.filter((_, j) => j !== i) } })} className="cursor-pointer self-start rounded-lg p-2 text-[#111111]/30 transition-colors hover:bg-[#E63B2E]/10 hover:text-[#E63B2E]"><Trash2 size={14} /></button>
                      </div>
                    ))}
                    <button onClick={() => setAboutForm({ ...aboutForm, mission: { ...aboutForm.mission, paragraphs: [...aboutForm.mission.paragraphs, ""] } })} className="flex cursor-pointer items-center gap-1 rounded-lg border border-[#111111]/10 px-3 py-1.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/60 transition-all hover:border-[#111111]/20 hover:text-[#111111]"><Plus size={12} /> Παράγραφος</button>
                  </div>
                </div>
              </div>

              {/* Values */}
              <div className="rounded-2xl border border-[#111111]/10 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-['Space_Grotesk'] text-lg font-bold text-[#111111] uppercase tracking-tight">Αξίες</h2>
                  <button onClick={() => setAboutForm({ ...aboutForm, values: { ...aboutForm.values, items: [...aboutForm.values.items, { icon: "Target", title: "", desc: "" }] } })} className="flex cursor-pointer items-center gap-1 rounded-lg border border-[#111111]/10 px-3 py-1.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/60 transition-all hover:border-[#111111]/20 hover:text-[#111111]"><Plus size={12} /> Προσθήκη</button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Label</label>
                    <input value={aboutForm.values.label} onChange={(e) => setAboutForm({ ...aboutForm, values: { ...aboutForm.values, label: e.target.value } })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                  </div>
                  <div>
                    <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Τίτλος</label>
                    <input value={aboutForm.values.title} onChange={(e) => setAboutForm({ ...aboutForm, values: { ...aboutForm.values, title: e.target.value } })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                  </div>
                </div>
                <div className="mt-4 space-y-3">
                  {aboutForm.values.items.map((v, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl border border-[#111111]/5 bg-[#F5F3EE]/30 p-4">
                      <div className="flex-1 grid gap-3 sm:grid-cols-3">
                        <input value={v.icon} onChange={(e) => { const items = [...aboutForm.values.items]; items[i] = { ...items[i], icon: e.target.value }; setAboutForm({ ...aboutForm, values: { ...aboutForm.values, items } }); }} placeholder="Icon (Target/Eye/Heart)" className="rounded-xl border border-[#111111]/10 bg-white px-3 py-2.5 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                        <input value={v.title} onChange={(e) => { const items = [...aboutForm.values.items]; items[i] = { ...items[i], title: e.target.value }; setAboutForm({ ...aboutForm, values: { ...aboutForm.values, items } }); }} placeholder="Τίτλος" className="rounded-xl border border-[#111111]/10 bg-white px-3 py-2.5 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                        <input value={v.desc} onChange={(e) => { const items = [...aboutForm.values.items]; items[i] = { ...items[i], desc: e.target.value }; setAboutForm({ ...aboutForm, values: { ...aboutForm.values, items } }); }} placeholder="Περιγραφή" className="rounded-xl border border-[#111111]/10 bg-white px-3 py-2.5 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                      </div>
                      <button onClick={() => setAboutForm({ ...aboutForm, values: { ...aboutForm.values, items: aboutForm.values.items.filter((_, j) => j !== i) } })} className="cursor-pointer rounded-lg p-2 text-[#111111]/30 transition-colors hover:bg-[#E63B2E]/10 hover:text-[#E63B2E]"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="rounded-2xl border border-[#111111]/10 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-['Space_Grotesk'] text-lg font-bold text-[#111111] uppercase tracking-tight">Χρονολόγιο</h2>
                  <button onClick={() => setAboutForm({ ...aboutForm, milestones: { ...aboutForm.milestones, items: [...aboutForm.milestones.items, { year: "", text: "" }] } })} className="flex cursor-pointer items-center gap-1 rounded-lg border border-[#111111]/10 px-3 py-1.5 font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/60 transition-all hover:border-[#111111]/20 hover:text-[#111111]"><Plus size={12} /> Προσθήκη</button>
                </div>
                <div className="space-y-3">
                  {aboutForm.milestones.items.map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <input value={m.year} onChange={(e) => { const items = [...aboutForm.milestones.items]; items[i] = { ...items[i], year: e.target.value }; setAboutForm({ ...aboutForm, milestones: { ...aboutForm.milestones, items } }); }} placeholder="Έτος" className="w-24 rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-2.5 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                      <input value={m.text} onChange={(e) => { const items = [...aboutForm.milestones.items]; items[i] = { ...items[i], text: e.target.value }; setAboutForm({ ...aboutForm, milestones: { ...aboutForm.milestones, items } }); }} placeholder="Περιγραφή" className="flex-1 rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-2.5 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                      <button onClick={() => setAboutForm({ ...aboutForm, milestones: { ...aboutForm.milestones, items: aboutForm.milestones.items.filter((_, j) => j !== i) } })} className="cursor-pointer rounded-lg p-2 text-[#111111]/30 transition-colors hover:bg-[#E63B2E]/10 hover:text-[#E63B2E]"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveAbout}
                  disabled={savingAbout}
                  className="cursor-pointer rounded-xl bg-[#111111] px-8 py-3 font-['Space_Mono'] text-xs uppercase tracking-widest text-white transition-all hover:bg-[#E63B2E] disabled:opacity-50"
                >
                  {savingAbout ? "Αποθήκευση..." : "Αποθήκευση Αλλαγών"}
                </button>
              </div>
            </div>
          )}

          {/* ═══════════ TEAM MEMBERS SECTION ═══════════ */}
          {section === "team" && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex gap-2">
                  <button onClick={() => { setTeamTab("list"); setEditingMember(null); setMemberForm(emptyMember); }} className={`cursor-pointer rounded-xl px-4 py-2 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all ${teamTab === "list" ? "bg-[#111111] text-white" : "border border-[#111111]/10 text-[#111111]/50 hover:text-[#111111]"}`}>Λίστα ({teamMembers.length})</button>
                  <button onClick={() => { setTeamTab("form"); setEditingMember(null); setMemberForm(emptyMember); }} className={`cursor-pointer rounded-xl px-4 py-2 font-['Space_Mono'] text-[10px] uppercase tracking-widest transition-all ${teamTab === "form" ? "bg-[#111111] text-white" : "border border-[#111111]/10 text-[#111111]/50 hover:text-[#111111]"}`}>+ Νέο Μέλος</button>
                </div>
              </div>

              {teamTab === "list" && (
                <div className="space-y-3">
                  {teamMembers.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-[#111111]/10 py-16 text-center">
                      <UsersRound size={48} className="mx-auto mb-4 text-[#111111]/10" />
                      <p className="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/30">Δεν υπάρχουν μέλη ομάδας</p>
                    </div>
                  )}
                  {teamMembers.map((m) => (
                    <div key={m.id} className="flex items-center gap-4 rounded-2xl border border-[#111111]/10 bg-white p-4 transition-all hover:border-[#111111]/20">
                      {m.photo_url ? (
                        <img src={m.photo_url} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F5F3EE]">
                          <UsersRound size={24} className="text-[#111111]/20" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-['Space_Grotesk'] text-sm font-bold text-[#111111]">{m.first_name} {m.last_name}</p>
                        <p className="truncate font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">{m.job_title}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <button onClick={() => toggleMemberPublished(m)} className={`cursor-pointer rounded-lg px-3 py-1.5 font-['Space_Mono'] text-[9px] uppercase tracking-widest transition-all ${m.published ? "bg-green-50 text-green-600" : "bg-[#F5F3EE] text-[#111111]/30"}`}>{m.published ? "Ενεργό" : "Κρυφό"}</button>
                        <button onClick={() => startEditMember(m)} className="cursor-pointer rounded-lg border border-[#111111]/10 px-3 py-1.5 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#111111]/50 transition-all hover:border-[#111111]/20 hover:text-[#111111]">Edit</button>
                        <button onClick={() => handleDeleteMember(m.id)} className="cursor-pointer rounded-lg border border-[#E63B2E]/20 px-3 py-1.5 font-['Space_Mono'] text-[9px] uppercase tracking-widest text-[#E63B2E]/60 transition-all hover:bg-[#E63B2E]/5 hover:text-[#E63B2E]">Del</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {teamTab === "form" && (
                <div className="rounded-2xl border border-[#111111]/10 bg-white p-6">
                  <h2 className="mb-6 font-['Space_Grotesk'] text-lg font-bold text-[#111111] uppercase tracking-tight">
                    {editingMember ? "Επεξεργασία Μέλους" : "Νέο Μέλος Ομάδας"}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Όνομα *</label>
                      <input value={memberForm.first_name} onChange={(e) => setMemberForm({ ...memberForm, first_name: e.target.value })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                    </div>
                    <div>
                      <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Επίθετο *</label>
                      <input value={memberForm.last_name} onChange={(e) => setMemberForm({ ...memberForm, last_name: e.target.value })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                    </div>
                    <div>
                      <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Email</label>
                      <input type="email" value={memberForm.email ?? ""} onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value || null })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                    </div>
                    <div>
                      <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Θέση Εργασίας *</label>
                      <input value={memberForm.job_title} onChange={(e) => setMemberForm({ ...memberForm, job_title: e.target.value })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                    </div>
                    <div>
                      <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Φωτογραφία URL</label>
                      <ImageUpload value={memberForm.photo_url} onChange={(url) => setMemberForm({ ...memberForm, photo_url: url })} folder="team" />
                    </div>
                    <div>
                      <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Σειρά Εμφάνισης</label>
                      <input type="number" value={memberForm.sort_order} onChange={(e) => setMemberForm({ ...memberForm, sort_order: Number(e.target.value) })} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/40">Βιογραφικό</label>
                      <textarea value={memberForm.bio} onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })} rows={4} className="w-full rounded-xl border border-[#111111]/10 bg-[#F5F3EE]/50 px-4 py-3 font-['Space_Grotesk'] text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#E63B2E]/20" />
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-3">
                      <label className="flex cursor-pointer items-center gap-2">
                        <input type="checkbox" checked={memberForm.published} onChange={(e) => setMemberForm({ ...memberForm, published: e.target.checked })} className="h-4 w-4 rounded border-[#111111]/20 accent-[#E63B2E]" />
                        <span className="font-['Space_Mono'] text-[10px] uppercase tracking-widest text-[#111111]/60">Δημοσιευμένο</span>
                      </label>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={handleSaveMember}
                      disabled={savingMember || !memberForm.first_name || !memberForm.last_name}
                      className="cursor-pointer rounded-xl bg-[#111111] px-8 py-3 font-['Space_Mono'] text-xs uppercase tracking-widest text-white transition-all hover:bg-[#E63B2E] disabled:opacity-50"
                    >
                      {savingMember ? "Αποθήκευση..." : editingMember ? "Ενημέρωση" : "Δημιουργία"}
                    </button>
                    <button
                      onClick={() => { setTeamTab("list"); setEditingMember(null); setMemberForm(emptyMember); }}
                      className="cursor-pointer rounded-xl border border-[#111111]/10 px-6 py-3 font-['Space_Mono'] text-xs uppercase tracking-widest text-[#111111]/50 transition-all hover:text-[#111111]"
                    >
                      Ακύρωση
                    </button>
                  </div>
                </div>
              )}
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
        {(["home", "services", "projects", "blog", "contacts", "about", "team", "admins", "media"] as Section[]).map((s) => {
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
