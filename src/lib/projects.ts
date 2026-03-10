export interface Project {
  id: number;
  slug: string;
  title: string;
  location: string;
  category: string;
  image: string;
  gallery: string[];
  year: string;
  client: string;
  description: string;
  scope: string[];
  duration: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: "asfaltostrosi-ethnikis-odou",
    title: "Ασφαλτόστρωση Εθνικής Οδού",
    location: "Ηγουμενίτσα - Ιωάννινα",
    category: "Οδοποιία",
    image: "/HighRes/image-1772752810544.png",
    gallery: ["/HighRes/image-1772752810544.png", "/HighRes/image-1772752818829.png", "/HighRes/image-1772752827339.png", "/HighRes/image-1772752230967.png"],
    year: "2025",
    client: "Περιφέρεια Ηπείρου",
    description:
      "Ολοκληρωμένο έργο ασφαλτόστρωσης τμήματος της εθνικής οδού Ηγουμενίτσας – Ιωαννίνων. Το έργο περιλάμβανε αποξήλωση παλαιού οδοστρώματος, κατασκευή νέων στρώσεων βάσης και επικάλυψη με ασφαλτοσκυρόδεμα υψηλών προδιαγραφών, εξασφαλίζοντας μεγαλύτερη ασφάλεια και διάρκεια ζωής του οδικού δικτύου.",
    scope: [
      "Αποξήλωση παλαιού οδοστρώματος",
      "Κατασκευή στρώσεων βάσης & υπόβασης",
      "Ασφαλτόστρωση με ασφαλτοσκυρόδεμα",
      "Οριζόντια & κατακόρυφη σήμανση",
    ],
    duration: "4 μήνες",
  },
  {
    id: 2,
    slug: "diagrammisi-limaniou",
    title: "Διαγράμμιση Χώρου Στάθμευσης",
    location: "Λιμάνι Ηγουμενίτσας",
    category: "Διαγραμμίσεις",
    image: "/HighRes/image-1772753675852.jpg",
    gallery: ["/HighRes/image-1772753675852.jpg", "/HighRes/image-1772753660495.png", "/HighRes/image-1772753104366.png", "/HighRes/image-1772753163950.png"],
    year: "2025",
    client: "ΟΛΗΓ Α.Ε.",
    description:
      "Εκτέλεση εργασιών διαγράμμισης στον χώρο στάθμευσης του λιμανιού Ηγουμενίτσας. Χρήση πιστοποιημένων θερμοπλαστικών υλικών υψηλής αντοχής και ανακλαστικότητας, σύμφωνα με τις ευρωπαϊκές προδιαγραφές ασφάλειας.",
    scope: [
      "Διαγράμμιση θέσεων στάθμευσης",
      "Σήμανση διαδρόμων κυκλοφορίας",
      "Τοποθέτηση βελών κατεύθυνσης",
      "Αντιολισθηρή σήμανση πεζοδρομίων",
    ],
    duration: "2 εβδομάδες",
  },
  {
    id: 3,
    slug: "erga-ypodomis-ochetoi",
    title: "Έργα Υποδομής - Οχετοί",
    location: "Δήμος Σουλίου",
    category: "Χωματουργικά",
    image: "/HighRes/image-1772752202824.png",
    gallery: ["/HighRes/image-1772752202824.png", "/HighRes/image-1772752030696.png", "/HighRes/image-1772752212833.png"],
    year: "2024",
    client: "Δήμος Σουλίου",
    description:
      "Κατασκευή οχετών απορροής ομβρίων υδάτων σε αγροτικό οδικό δίκτυο. Χωματουργικές εργασίες εκσκαφής, τοποθέτηση σωληνωτών οχετών, κατασκευή πτερυγοτοίχων και αποκατάσταση περιβάλλοντος χώρου.",
    scope: [
      "Εκσκαφές θεμελίωσης",
      "Τοποθέτηση σωληνωτών οχετών",
      "Κατασκευή πτερυγοτοίχων",
      "Επιχωματώσεις & αποκατάσταση",
    ],
    duration: "3 μήνες",
  },
  {
    id: 4,
    slug: "anakataskevi-odikou-diktyou",
    title: "Ανακατασκευή Οδικού Δικτύου",
    location: "Πάργα",
    category: "Οδοποιία",
    image: "/HighRes/image-1772753640619.jpg",
    gallery: ["/HighRes/image-1772753640619.jpg", "/HighRes/image-1772752810544.png", "/HighRes/image-1772752827339.png"],
    year: "2024",
    client: "Δήμος Πάργας",
    description:
      "Πλήρης ανακατασκευή εσωτερικού οδικού δικτύου στην πόλη της Πάργας. Αντικατάσταση φθαρμένου οδοστρώματος, βελτίωση αποχέτευσης ομβρίων, κατασκευή πεζοδρομίων και τελική ασφαλτόστρωση.",
    scope: [
      "Καθαίρεση παλαιού οδοστρώματος",
      "Κατασκευή δικτύου αποχέτευσης",
      "Ανακατασκευή πεζοδρομίων",
      "Ασφαλτόστρωση & σήμανση",
    ],
    duration: "6 μήνες",
  },
  {
    id: 5,
    slug: "toichio-antistirixis",
    title: "Κατασκευή Τοιχίου Αντιστήριξης",
    location: "Σύβοτα",
    category: "Δημόσια Έργα",
    image: "/HighRes/image-1772753897780.jpg",
    gallery: ["/HighRes/image-1772753897780.jpg", "/HighRes/image-1772753692358.png", "/HighRes/image-1772753736848.png", "/HighRes/image-1772753878297.png", "/HighRes/image-1772753887996.png"],
    year: "2025",
    client: "Δήμος Ηγουμενίτσας",
    description:
      "Κατασκευή τοιχίου αντιστήριξης από οπλισμένο σκυρόδεμα σε παράπλευρη οδό στα Σύβοτα. Στατική μελέτη, εκσκαφή θεμελίωσης, κατασκευή σκελετού οπλισμού και σκυροδέτηση με σκυρόδεμα υψηλής αντοχής.",
    scope: [
      "Εκσκαφή θεμελίωσης",
      "Κατασκευή σκελετού οπλισμού",
      "Σκυροδέτηση C25/30",
      "Στεγανοποίηση & αποστράγγιση",
    ],
    duration: "5 μήνες",
  },
  {
    id: 6,
    slug: "diagrammisi-eparxiakou-diktyou",
    title: "Διαγράμμιση Επαρχιακού Δικτύου",
    location: "Θεσπρωτία",
    category: "Διαγραμμίσεις",
    image: "/HighRes/image-1772753366441.png",
    gallery: ["/HighRes/image-1772753366441.png", "/HighRes/image-1772753356440.png", "/HighRes/image-1772753675852.jpg"],
    year: "2024",
    client: "Περιφέρεια Ηπείρου",
    description:
      "Διαγράμμιση επαρχιακού οδικού δικτύου στον Νομό Θεσπρωτίας. Εφαρμογή αξονικών & πλευρικών γραμμών, σήμανση κόμβων, διαβάσεων πεζών και στάσεων λεωφορείων, με χρήση θερμοπλαστικού υλικού ανακλαστικότητας.",
    scope: [
      "Αξονικές & πλευρικές γραμμές",
      "Σήμανση κόμβων & διασταυρώσεων",
      "Διαβάσεις πεζών",
      "Σήμανση στάσεων & διαδρόμων",
    ],
    duration: "1 μήνας",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project | undefined; next: Project | undefined } {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? PROJECTS[index - 1] : PROJECTS[PROJECTS.length - 1],
    next: index < PROJECTS.length - 1 ? PROJECTS[index + 1] : PROJECTS[0],
  };
}
