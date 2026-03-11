-- Alkater Seed Data
-- Generated: 2026-03-10T15:27:38.045Z
-- Run after the schema migration

-- ═══════════════════════════════════════
-- SEED PROJECTS (full schema)
-- ═══════════════════════════════════════

INSERT INTO public.projects (slug, title, location, category, description, image_url, gallery, year, client, scope, duration, sort_order, published) VALUES (
  'asfaltostrosi-ethnikis-odou',
  'Ασφαλτόστρωση Εθνικής Οδού',
  'Ηγουμενίτσα - Ιωάννινα',
  'Οδοποιία',
  'Ολοκληρωμένο έργο ασφαλτόστρωσης τμήματος της εθνικής οδού Ηγουμενίτσας – Ιωαννίνων. Το έργο περιλάμβανε αποξήλωση παλαιού οδοστρώματος, κατασκευή νέων στρώσεων βάσης και επικάλυψη με ασφαλτοσκυρόδεμα υψηλών προδιαγραφών.',
  '/HighRes/image-1772752810544.png',
  ARRAY['/HighRes/image-1772752810544.png', '/HighRes/image-1772752818829.png', '/HighRes/image-1772752827339.png', '/HighRes/image-1772752230967.png'],
  '2025', 'Περιφέρεια Ηπείρου',
  ARRAY['Αποξήλωση παλαιού οδοστρώματος', 'Κατασκευή στρώσεων βάσης & υπόβασης', 'Ασφαλτόστρωση με ασφαλτοσκυρόδεμα', 'Οριζόντια & κατακόρυφη σήμανση'],
  '4 μήνες', 0, true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.projects (slug, title, location, category, description, image_url, gallery, year, client, scope, duration, sort_order, published) VALUES (
  'diagrammisi-limaniou',
  'Διαγράμμιση Χώρου Στάθμευσης',
  'Λιμάνι Ηγουμενίτσας',
  'Διαγραμμίσεις',
  'Εκτέλεση εργασιών διαγράμμισης στον χώρο στάθμευσης του λιμανιού Ηγουμενίτσας. Χρήση πιστοποιημένων θερμοπλαστικών υλικών υψηλής αντοχής και ανακλαστικότητας.',
  '/HighRes/image-1772753675852.jpg',
  ARRAY['/HighRes/image-1772753675852.jpg', '/HighRes/image-1772753660495.png', '/HighRes/image-1772753104366.png', '/HighRes/image-1772753163950.png'],
  '2025', 'ΟΛΗΓ Α.Ε.',
  ARRAY['Διαγράμμιση θέσεων στάθμευσης', 'Σήμανση διαδρόμων κυκλοφορίας', 'Τοποθέτηση βελών κατεύθυνσης', 'Αντιολισθηρή σήμανση πεζοδρομίων'],
  '2 εβδομάδες', 1, true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.projects (slug, title, location, category, description, image_url, gallery, year, client, scope, duration, sort_order, published) VALUES (
  'erga-ypodomis-ochetoi',
  'Έργα Υποδομής - Οχετοί',
  'Δήμος Σουλίου',
  'Χωματουργικά',
  'Κατασκευή οχετών απορροής ομβρίων υδάτων σε αγροτικό οδικό δίκτυο. Χωματουργικές εργασίες εκσκαφής, τοποθέτηση σωληνωτών οχετών, κατασκευή πτερυγοτοίχων και αποκατάσταση περιβάλλοντος χώρου.',
  '/HighRes/image-1772752202824.png',
  ARRAY['/HighRes/image-1772752202824.png', '/HighRes/image-1772752030696.png', '/HighRes/image-1772752212833.png'],
  '2024', 'Δήμος Σουλίου',
  ARRAY['Εκσκαφές θεμελίωσης', 'Τοποθέτηση σωληνωτών οχετών', 'Κατασκευή πτερυγοτοίχων', 'Επιχωματώσεις & αποκατάσταση'],
  '3 μήνες', 2, true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.projects (slug, title, location, category, description, image_url, gallery, year, client, scope, duration, sort_order, published) VALUES (
  'anakataskevi-odikou-diktyou',
  'Ανακατασκευή Οδικού Δικτύου',
  'Πάργα',
  'Οδοποιία',
  'Πλήρης ανακατασκευή εσωτερικού οδικού δικτύου στην πόλη της Πάργας. Αντικατάσταση φθαρμένου οδοστρώματος, βελτίωση αποχέτευσης ομβρίων, κατασκευή πεζοδρομίων και τελική ασφαλτόστρωση.',
  '/HighRes/image-1772753640619.jpg',
  ARRAY['/HighRes/image-1772753640619.jpg', '/HighRes/image-1772752810544.png', '/HighRes/image-1772752827339.png'],
  '2024', 'Δήμος Πάργας',
  ARRAY['Καθαίρεση παλαιού οδοστρώματος', 'Κατασκευή δικτύου αποχέτευσης', 'Ανακατασκευή πεζοδρομίων', 'Ασφαλτόστρωση & σήμανση'],
  '6 μήνες', 3, true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.projects (slug, title, location, category, description, image_url, gallery, year, client, scope, duration, sort_order, published) VALUES (
  'toichio-antistirixis',
  'Κατασκευή Τοιχίου Αντιστήριξης',
  'Σύβοτα',
  'Δημόσια Έργα',
  'Κατασκευή τοιχίου αντιστήριξης από οπλισμένο σκυρόδεμα σε παράπλευρη οδό στα Σύβοτα. Στατική μελέτη, εκσκαφή θεμελίωσης, κατασκευή σκελετού οπλισμού και σκυροδέτηση με σκυρόδεμα υψηλής αντοχής.',
  '/HighRes/image-1772753897780.jpg',
  ARRAY['/HighRes/image-1772753897780.jpg', '/HighRes/image-1772753692358.png', '/HighRes/image-1772753736848.png', '/HighRes/image-1772753878297.png', '/HighRes/image-1772753887996.png'],
  '2025', 'Δήμος Ηγουμενίτσας',
  ARRAY['Εκσκαφή θεμελίωσης', 'Κατασκευή σκελετού οπλισμού', 'Σκυροδέτηση C25/30', 'Στεγανοποίηση & αποστράγγιση'],
  '5 μήνες', 4, true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.projects (slug, title, location, category, description, image_url, gallery, year, client, scope, duration, sort_order, published) VALUES (
  'diagrammisi-eparxiakou-diktyou',
  'Διαγράμμιση Επαρχιακού Δικτύου',
  'Θεσπρωτία',
  'Διαγραμμίσεις',
  'Διαγράμμιση επαρχιακού οδικού δικτύου στον Νομό Θεσπρωτίας. Εφαρμογή αξονικών & πλευρικών γραμμών, σήμανση κόμβων, διαβάσεων πεζών και στάσεων λεωφορείων.',
  '/HighRes/image-1772753366441.png',
  ARRAY['/HighRes/image-1772753366441.png', '/HighRes/image-1772753356440.png', '/HighRes/image-1772753675852.jpg'],
  '2024', 'Περιφέρεια Ηπείρου',
  ARRAY['Αξονικές & πλευρικές γραμμές', 'Σήμανση κόμβων & διασταυρώσεων', 'Διαβάσεις πεζών', 'Σήμανση στάσεων & διαδρόμων'],
  '1 μήνας', 5, true
) ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════
-- SEED HERO SLIDES
-- ═══════════════════════════════════════

INSERT INTO public.hero_slides (heading, heading_accent, subtitle, video_url, sort_order, published) VALUES (
  'ΧΤΙΖΟΥΜΕ',
  'ΤΟ ΑΥΡΙΟ.',
  'Τεχνική αρτιότητα, εμπειρία δεκαετιών και δέσμευση στην ποιότητα — αυτές είναι οι αξίες που οικοδομούν κάθε μας έργο.',
  '/Videos/construction/01_cement_truck_trench_ext_v1.mp4',
  0,
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.hero_slides (heading, heading_accent, subtitle, video_url, sort_order, published) VALUES (
  'ΠΟΙΟΤΗΤΑ',
  'ΣΕ ΚΑΘΕ ΕΡΓΟ.',
  'Από μικρές επισκευές μέχρι μεγάλα έργα υποδομής, η ποιότητα είναι πάντα η προτεραιότητά μας.',
  '/Videos/construction/13_downloaded_v2.mp4',
  1,
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.hero_slides (heading, heading_accent, subtitle, video_url, sort_order, published) VALUES (
  'ΕΜΠΕΙΡΙΑ',
  'ΔΕΚΑΕΤΙΩΝ.',
  'Με πάνω από δεκαετίες εμπειρίας στον κατασκευαστικό κλάδο, φέρνουμε αξιοπιστία σε κάθε βήμα.',
  '/Videos/construction/08_road_line_painting_initial_v2.mp4',
  2,
  true
) ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════
-- SEED BLOG POSTS
-- ═══════════════════════════════════════

INSERT INTO public.blog_posts (title, slug, excerpt, content, cover_image, published) VALUES (
  'Νέες Τεχνικές Ασφαλτόστρωσης: Η Εξέλιξη στην Οδοποιία',
  'nees-texnikes-asfaltostrosis',
  'Ανακαλύψτε τις σύγχρονες τεχνικές ασφαλτόστρωσης που εφαρμόζουμε για μεγαλύτερη αντοχή και διάρκεια.',
  'Η ασφαλτόστρωση αποτελεί τον ακρογωνιαίο λίθο κάθε οδικού έργου. Στην ΑΛΚΑΤΕΡ Α.Ε., ακολουθούμε τις πιο σύγχρονες τεχνικές και πρότυπα για να εξασφαλίσουμε μέγιστη αντοχή και ασφάλεια.

Οι νέες τεχνολογίες περιλαμβάνουν τροποποιημένα ασφαλτικά μείγματα με πολυμερή, θερμοαναμιγμένα μείγματα χαμηλής θερμοκρασίας και ανακυκλωμένα υλικά. Αυτά μειώνουν τις εκπομπές CO2 κατά 30% και αυξάνουν τη διάρκεια ζωής του οδοστρώματος.

Η εταιρεία μας διαθέτει σύγχρονο στόλο μηχανημάτων, περιλαμβανομένων ασφαλτοστρωτήρων τελευταίας γενιάς και οδοστρωτήρων υψηλής ακρίβειας.

Με 25+ χρόνια εμπειρίας, η ΑΛΚΑΤΕΡ εγγυάται ποιότητα σε κάθε τετραγωνικό μέτρο ασφάλτου.',
  'https://pweugxepihnxrewqxehb.supabase.co/storage/v1/object/public/media/blog/seed-nees-texnikes-asfaltostrosis.png',
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blog_posts (title, slug, excerpt, content, cover_image, published) VALUES (
  'Η Σημασία της Συντήρησης Οδικών Δικτύων',
  'simassia-sintirissis-odikon-diktyon',
  'Γιατί η τακτική συντήρηση των δρόμων είναι κρίσιμη για την ασφάλεια και την οικονομία.',
  'Η συντήρηση των οδικών δικτύων δεν είναι απλά μια υποχρέωση — είναι μια επένδυση στην ασφάλεια και την ποιότητα ζωής. Ένας καλά συντηρημένος δρόμος μειώνει τα τροχαία ατυχήματα κατά 40%.

Στην ΑΛΚΑΤΕΡ εκτελούμε εργασίες προληπτικής και διορθωτικής συντήρησης, από την αποκατάσταση ρωγμών και λακκουβών μέχρι την πλήρη ανακατασκευή ασφαλτικού τάπητα.

Η εμπειρία μας δείχνει ότι η τακτική συντήρηση επεκτείνει τη διάρκεια ζωής ενός δρόμου κατά 50% και μειώνει το συνολικό κόστος κατά 30% σε βάθος χρόνου.

Επικοινωνήστε μαζί μας για αξιολόγηση του οδικού σας δικτύου.',
  'https://pweugxepihnxrewqxehb.supabase.co/storage/v1/object/public/media/blog/seed-simassia-sintirissis-odikon-diktyon.png',
  true
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.blog_posts (title, slug, excerpt, content, cover_image, published) VALUES (
  'Έργα Υποδομής στη Θεσπρωτία: Ένα Βήμα Μπροστά',
  'erga-ypodomes-thesprotia',
  'Τα μεγάλα έργα υποδομής που αλλάζουν το πρόσωπο της Θεσπρωτίας.',
  'Η Θεσπρωτία βρίσκεται σε μια φάση σημαντικής ανάπτυξης υποδομών. Η ΑΛΚΑΤΕΡ Α.Ε. συμμετέχει ενεργά στη μεταμόρφωση αυτή, κατασκευάζοντας δρόμους, δίκτυα ύδρευσης και αποχέτευσης.

Τα τελευταία χρόνια έχουμε ολοκληρώσει πάνω από 50km νέων δρόμων, 3 γέφυρες και 15km δικτύων ύδρευσης στην περιοχή. Κάθε έργο σχεδιάζεται με γνώμονα τη βιωσιμότητα.

Η συνεργασία μας με τους τοπικούς δήμους και την Περιφέρεια Ηπείρου εξασφαλίζει ότι τα έργα ανταποκρίνονται στις πραγματικές ανάγκες.

Στόχος μας είναι η Θεσπρωτία να αποκτήσει σύγχρονες υποδομές αντάξιες της φυσικής ομορφιάς της.',
  'https://pweugxepihnxrewqxehb.supabase.co/storage/v1/object/public/media/blog/seed-erga-ypodomes-thesprotia.png',
  true
) ON CONFLICT (slug) DO NOTHING;

