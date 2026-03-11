/**
 * Seed script: Generates blog cover images via Nano Banana 2 API,
 * uploads them to Supabase storage, and outputs seed SQL
 * for projects and blog posts.
 *
 * Usage: node scripts/seed-content.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { writeFileSync } from "fs";

const SUPABASE_URL = "https://pweugxepihnxrewqxehb.supabase.co";
const SUPABASE_SERVICE_KEY = "sb_secret_UyoHD3OUgMSmMW7yKh5nwA_uHqX-7Ak";
const NANO_BANANA_HOST = "https://humanlike-node-production.up.railway.app";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── Projects (from homepage, using local photos) ──
const PROJECTS = [
  { title: "Ασφαλτόστρωση Εθνικής Οδού Ηγουμενίτσας - Ιωαννίνων", category: "Οδοποιία", description: "Ολοκληρωμένη ασφαλτόστρωση τμήματος 12km της Εθνικής Οδού με χρήση υψηλής ποιότητας ασφαλτικού μείγματος και σύγχρονο εξοπλισμό.", image_url: "/Photos/project-1.jpg" },
  { title: "Κατασκευή Δημοτικού Οδικού Δικτύου Φιλιατών", category: "Δημόσια Έργα", description: "Κατασκευή νέου δημοτικού οδικού δικτύου μήκους 8km στην περιοχή Φιλιατών, συμπεριλαμβανομένων πεζοδρομίων και φωτισμού.", image_url: "/Photos/project-2.jpg" },
  { title: "Συντήρηση Οδοστρώματος Εθνικής Οδού", category: "Συντήρηση", description: "Εργασίες συντήρησης και αποκατάστασης φθορών σε τμήμα εθνικής οδού, με αντικατάσταση ασφαλτικού τάπητα.", image_url: "/Photos/project-3.jpg" },
  { title: "Χωματουργικά Έργα Βιομηχανικής Ζώνης", category: "Χωματουργικά", description: "Εκτεταμένες χωματουργικές εργασίες για τη διαμόρφωση βιομηχανικής ζώνης, εκσκαφές και επιχώσεις.", image_url: "/Photos/project-4.jpg" },
  { title: "Κατασκευή Δικτύου Ύδρευσης Παραμυθιάς", category: "Υποδομές", description: "Κατασκευή νέου δικτύου ύδρευσης σε αγροτική περιοχή με εγκατάσταση σωληνώσεων και αντλιοστασίων.", image_url: "/Photos/project-5.jpg" },
  { title: "Ανακατασκευή Πλατείας Κέντρου Ηγουμενίτσας", category: "Αστικά Έργα", description: "Πλήρης ανακατασκευή κεντρικής πλατείας με νέα πλακόστρωση, αστικό εξοπλισμό και χώρους πρασίνου.", image_url: "/Photos/project-6.jpg" },
  { title: "Διάνοιξη Δασικού Οδικού Δικτύου", category: "Οδοποιία", description: "Διάνοιξη και κατασκευή δασικού οδικού δικτύου μήκους 15km για την πρόσβαση σε ορεινές περιοχές.", image_url: "/Photos/project-7.jpg" },
  { title: "Αποχέτευση & Βιολογικός Καθαρισμός Μαργαριτίου", category: "Υποδομές", description: "Κατασκευή δικτύου αποχέτευσης και μονάδας βιολογικού καθαρισμού για τον οικισμό Μαργαριτίου.", image_url: "/Photos/project-8.jpg" },
  { title: "Κατασκευή Γέφυρας ποταμού Καλαμά", category: "Τεχνικά Έργα", description: "Κατασκευή γέφυρας μήκους 45m πάνω από τον ποταμό Καλαμά, με οπλισμένο σκυρόδεμα.", image_url: "/Photos/project-9.jpg" },
  { title: "Ασφαλτόστρωση Περιφερειακής Οδού Πρέβεζας", category: "Οδοποιία", description: "Νέα ασφαλτόστρωση περιφερειακής οδού με τρεις λωρίδες κυκλοφορίας και σύγχρονη σήμανση.", image_url: "/Photos/project-10.jpg" },
  { title: "Αντιπλημμυρικά Έργα Ρέματος Σουλίου", category: "Υδραυλικά", description: "Κατασκευή αντιπλημμυρικών έργων για την προστασία οικισμών, περιλαμβάνει τοιχία αντιστήριξης.", image_url: "/Photos/project-11.jpg" },
  { title: "Οδοποιία Αγροτικών Δρόμων Θεσπρωτίας", category: "Αγροτικά Έργα", description: "Βελτίωση και ασφαλτόστρωση αγροτικών δρόμων συνολικού μήκους 20km στο νομό Θεσπρωτίας.", image_url: "/Photos/project-12.jpg" },
];

// ── Hero slides ──
const HERO_SLIDES = [
  { heading: "ΧΤΙΖΟΥΜΕ", heading_accent: "ΤΟ ΑΥΡΙΟ.", subtitle: "Τεχνική αρτιότητα, εμπειρία δεκαετιών και δέσμευση στην ποιότητα — αυτές είναι οι αξίες που οικοδομούν κάθε μας έργο.", video_url: "/Videos/construction/01_cement_truck_trench_ext_v1.mp4", sort_order: 0 },
  { heading: "ΠΟΙΟΤΗΤΑ", heading_accent: "ΣΕ ΚΑΘΕ ΕΡΓΟ.", subtitle: "Από μικρές επισκευές μέχρι μεγάλα έργα υποδομής, η ποιότητα είναι πάντα η προτεραιότητά μας.", video_url: "/Videos/construction/13_downloaded_v2.mp4", sort_order: 1 },
  { heading: "ΕΜΠΕΙΡΙΑ", heading_accent: "ΔΕΚΑΕΤΙΩΝ.", subtitle: "Με πάνω από δεκαετίες εμπειρίας στον κατασκευαστικό κλάδο, φέρνουμε αξιοπιστία σε κάθε βήμα.", video_url: "/Videos/construction/08_road_line_painting_initial_v2.mp4", sort_order: 2 },
];

// ── Blog posts ──
const BLOG_POSTS = [
  {
    title: "Νέες Τεχνικές Ασφαλτόστρωσης: Η Εξέλιξη στην Οδοποιία",
    slug: "nees-texnikes-asfaltostrosis",
    excerpt: "Ανακαλύψτε τις σύγχρονες τεχνικές ασφαλτόστρωσης που εφαρμόζουμε για μεγαλύτερη αντοχή και διάρκεια.",
    content: `Η ασφαλτόστρωση αποτελεί τον ακρογωνιαίο λίθο κάθε οδικού έργου. Στην ΑΛΚΑΤΕΡ Α.Ε., ακολουθούμε τις πιο σύγχρονες τεχνικές και πρότυπα για να εξασφαλίσουμε μέγιστη αντοχή και ασφάλεια.\n\nΟι νέες τεχνολογίες περιλαμβάνουν τροποποιημένα ασφαλτικά μείγματα με πολυμερή, θερμοαναμιγμένα μείγματα χαμηλής θερμοκρασίας και ανακυκλωμένα υλικά. Αυτά μειώνουν τις εκπομπές CO2 κατά 30% και αυξάνουν τη διάρκεια ζωής του οδοστρώματος.\n\nΗ εταιρεία μας διαθέτει σύγχρονο στόλο μηχανημάτων, περιλαμβανομένων ασφαλτοστρωτήρων τελευταίας γενιάς και οδοστρωτήρων υψηλής ακρίβειας.\n\nΜε 25+ χρόνια εμπειρίας, η ΑΛΚΑΤΕΡ εγγυάται ποιότητα σε κάθε τετραγωνικό μέτρο ασφάλτου.`,
    imagePrompt: "Modern asphalt paving machine working on a new road in Greece, photorealistic, construction site, golden hour lighting, professional equipment",
  },
  {
    title: "Η Σημασία της Συντήρησης Οδικών Δικτύων",
    slug: "simassia-sintirissis-odikon-diktyon",
    excerpt: "Γιατί η τακτική συντήρηση των δρόμων είναι κρίσιμη για την ασφάλεια και την οικονομία.",
    content: `Η συντήρηση των οδικών δικτύων δεν είναι απλά μια υποχρέωση — είναι μια επένδυση στην ασφάλεια και την ποιότητα ζωής. Ένας καλά συντηρημένος δρόμος μειώνει τα τροχαία ατυχήματα κατά 40%.\n\nΣτην ΑΛΚΑΤΕΡ εκτελούμε εργασίες προληπτικής και διορθωτικής συντήρησης, από την αποκατάσταση ρωγμών και λακκουβών μέχρι την πλήρη ανακατασκευή ασφαλτικού τάπητα.\n\nΗ εμπειρία μας δείχνει ότι η τακτική συντήρηση επεκτείνει τη διάρκεια ζωής ενός δρόμου κατά 50% και μειώνει το συνολικό κόστος κατά 30% σε βάθος χρόνου.\n\nΕπικοινωνήστε μαζί μας για αξιολόγηση του οδικού σας δικτύου.`,
    imagePrompt: "Road maintenance crew repairing asphalt road surface in Mediterranean landscape, construction workers, heavy machinery, bright daylight, photorealistic",
  },
  {
    title: "Έργα Υποδομής στη Θεσπρωτία: Ένα Βήμα Μπροστά",
    slug: "erga-ypodomes-thesprotia",
    excerpt: "Τα μεγάλα έργα υποδομής που αλλάζουν το πρόσωπο της Θεσπρωτίας.",
    content: `Η Θεσπρωτία βρίσκεται σε μια φάση σημαντικής ανάπτυξης υποδομών. Η ΑΛΚΑΤΕΡ Α.Ε. συμμετέχει ενεργά στη μεταμόρφωση αυτή, κατασκευάζοντας δρόμους, δίκτυα ύδρευσης και αποχέτευσης.\n\nΤα τελευταία χρόνια έχουμε ολοκληρώσει πάνω από 50km νέων δρόμων, 3 γέφυρες και 15km δικτύων ύδρευσης στην περιοχή. Κάθε έργο σχεδιάζεται με γνώμονα τη βιωσιμότητα.\n\nΗ συνεργασία μας με τους τοπικούς δήμους και την Περιφέρεια Ηπείρου εξασφαλίζει ότι τα έργα ανταποκρίνονται στις πραγματικές ανάγκες.\n\nΣτόχος μας είναι η Θεσπρωτία να αποκτήσει σύγχρονες υποδομές αντάξιες της φυσικής ομορφιάς της.`,
    imagePrompt: "Infrastructure construction in beautiful Greek countryside, bridge being built over river, Thesprotia Epirus landscape, aerial view, photorealistic",
  },
];

async function generateImage(prompt) {
  console.log(`  Generating image: "${prompt.slice(0, 60)}..."`);
  const res = await fetch(`${NANO_BANANA_HOST}/studio/media/generate-image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
      model: "nano-banana-2",
      resolution: "1K",
      aspectRatio: "16:9",
      count: 1,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Image generation failed: ${err}`);
  }

  const data = await res.json();
  if (!data.success || !data.imageUrls?.length) {
    throw new Error("No image returned");
  }

  console.log(`  Generated in ${data.timing}ms`);
  return data.imageUrls[0]; // base64 data URI
}

async function uploadToSupabase(dataUri, filename) {
  console.log(`  Uploading ${filename} to Supabase...`);

  // Convert data URI to buffer
  const base64 = dataUri.split(",")[1];
  const buffer = Buffer.from(base64, "base64");

  const { error } = await supabase.storage
    .from("media")
    .upload(filename, buffer, {
      upsert: true,
      contentType: "image/png",
    });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(filename);

  console.log(`  Uploaded: ${publicUrl}`);
  return publicUrl;
}

function escapeSql(str) {
  return str.replace(/'/g, "''");
}

async function main() {
  console.log("=== ALKATER Seed Content Generator ===\n");

  // Generate and upload blog cover images
  const blogImageUrls = [];
  for (let i = 0; i < BLOG_POSTS.length; i++) {
    const post = BLOG_POSTS[i];
    console.log(`\n[${i + 1}/${BLOG_POSTS.length}] Blog: ${post.title}`);
    try {
      const dataUri = await generateImage(post.imagePrompt);
      const filename = `blog/seed-${post.slug}.png`;
      const url = await uploadToSupabase(dataUri, filename);
      blogImageUrls.push(url);
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      blogImageUrls.push(null);
    }
  }

  // Generate seed SQL
  console.log("\n\n=== Generating seed SQL ===\n");

  let sql = `-- Alkater Seed Data\n-- Generated: ${new Date().toISOString()}\n-- Run after the schema migration\n\n`;

  // Projects
  sql += `-- ═══════════════════════════════════════\n-- SEED PROJECTS\n-- ═══════════════════════════════════════\n\n`;
  for (const p of PROJECTS) {
    sql += `INSERT INTO public.projects (title, description, category, image_url, published) VALUES (\n`;
    sql += `  '${escapeSql(p.title)}',\n`;
    sql += `  '${escapeSql(p.description)}',\n`;
    sql += `  '${escapeSql(p.category)}',\n`;
    sql += `  '${escapeSql(p.image_url)}',\n`;
    sql += `  true\n`;
    sql += `) ON CONFLICT DO NOTHING;\n\n`;
  }

  // Hero slides
  sql += `-- ═══════════════════════════════════════\n-- SEED HERO SLIDES\n-- ═══════════════════════════════════════\n\n`;
  for (const s of HERO_SLIDES) {
    sql += `INSERT INTO public.hero_slides (heading, heading_accent, subtitle, video_url, sort_order, published) VALUES (\n`;
    sql += `  '${escapeSql(s.heading)}',\n`;
    sql += `  '${escapeSql(s.heading_accent)}',\n`;
    sql += `  '${escapeSql(s.subtitle)}',\n`;
    sql += `  '${escapeSql(s.video_url)}',\n`;
    sql += `  ${s.sort_order},\n`;
    sql += `  true\n`;
    sql += `) ON CONFLICT DO NOTHING;\n\n`;
  }

  // Blog posts
  sql += `-- ═══════════════════════════════════════\n-- SEED BLOG POSTS\n-- ═══════════════════════════════════════\n\n`;
  for (let i = 0; i < BLOG_POSTS.length; i++) {
    const post = BLOG_POSTS[i];
    const coverUrl = blogImageUrls[i];
    sql += `INSERT INTO public.blog_posts (title, slug, excerpt, content, cover_image, published) VALUES (\n`;
    sql += `  '${escapeSql(post.title)}',\n`;
    sql += `  '${escapeSql(post.slug)}',\n`;
    sql += `  '${escapeSql(post.excerpt)}',\n`;
    sql += `  '${escapeSql(post.content)}',\n`;
    sql += `  ${coverUrl ? `'${escapeSql(coverUrl)}'` : "NULL"},\n`;
    sql += `  true\n`;
    sql += `) ON CONFLICT (slug) DO NOTHING;\n\n`;
  }

  const outputPath = "scripts/seed-data.sql";
  writeFileSync(outputPath, sql);
  console.log(`\nSeed SQL written to: ${outputPath}`);
  console.log("Done!");
}

main().catch(console.error);
