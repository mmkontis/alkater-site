-- Alkater Seed Data
-- Generated: 2026-03-10T15:27:38.045Z
-- Run after the schema migration

-- ═══════════════════════════════════════
-- SEED PROJECTS
-- ═══════════════════════════════════════

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Ασφαλτόστρωση Εθνικής Οδού Ηγουμενίτσας - Ιωαννίνων',
  'Ολοκληρωμένη ασφαλτόστρωση τμήματος 12km της Εθνικής Οδού με χρήση υψηλής ποιότητας ασφαλτικού μείγματος και σύγχρονο εξοπλισμό.',
  'Οδοποιία',
  '/Photos/project-1.jpg',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Κατασκευή Δημοτικού Οδικού Δικτύου Φιλιατών',
  'Κατασκευή νέου δημοτικού οδικού δικτύου μήκους 8km στην περιοχή Φιλιατών, συμπεριλαμβανομένων πεζοδρομίων και φωτισμού.',
  'Δημόσια Έργα',
  '/Photos/project-2.jpg',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Συντήρηση Οδοστρώματος Εθνικής Οδού',
  'Εργασίες συντήρησης και αποκατάστασης φθορών σε τμήμα εθνικής οδού, με αντικατάσταση ασφαλτικού τάπητα.',
  'Συντήρηση',
  '/Photos/project-3.jpg',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Χωματουργικά Έργα Βιομηχανικής Ζώνης',
  'Εκτεταμένες χωματουργικές εργασίες για τη διαμόρφωση βιομηχανικής ζώνης, εκσκαφές και επιχώσεις.',
  'Χωματουργικά',
  '/Photos/project-4.jpg',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Κατασκευή Δικτύου Ύδρευσης Παραμυθιάς',
  'Κατασκευή νέου δικτύου ύδρευσης σε αγροτική περιοχή με εγκατάσταση σωληνώσεων και αντλιοστασίων.',
  'Υποδομές',
  '/Photos/project-5.jpg',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Ανακατασκευή Πλατείας Κέντρου Ηγουμενίτσας',
  'Πλήρης ανακατασκευή κεντρικής πλατείας με νέα πλακόστρωση, αστικό εξοπλισμό και χώρους πρασίνου.',
  'Αστικά Έργα',
  '/Photos/project-6.jpg',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Διάνοιξη Δασικού Οδικού Δικτύου',
  'Διάνοιξη και κατασκευή δασικού οδικού δικτύου μήκους 15km για την πρόσβαση σε ορεινές περιοχές.',
  'Οδοποιία',
  '/Photos/project-7.jpg',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Αποχέτευση & Βιολογικός Καθαρισμός Μαργαριτίου',
  'Κατασκευή δικτύου αποχέτευσης και μονάδας βιολογικού καθαρισμού για τον οικισμό Μαργαριτίου.',
  'Υποδομές',
  '/Photos/project-8.jpg',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Κατασκευή Γέφυρας ποταμού Καλαμά',
  'Κατασκευή γέφυρας μήκους 45m πάνω από τον ποταμό Καλαμά, με οπλισμένο σκυρόδεμα.',
  'Τεχνικά Έργα',
  '/Photos/project-9.jpg',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Ασφαλτόστρωση Περιφερειακής Οδού Πρέβεζας',
  'Νέα ασφαλτόστρωση περιφερειακής οδού με τρεις λωρίδες κυκλοφορίας και σύγχρονη σήμανση.',
  'Οδοποιία',
  '/Photos/project-10.jpg',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Αντιπλημμυρικά Έργα Ρέματος Σουλίου',
  'Κατασκευή αντιπλημμυρικών έργων για την προστασία οικισμών, περιλαμβάνει τοιχία αντιστήριξης.',
  'Υδραυλικά',
  '/Photos/project-11.jpg',
  true
) ON CONFLICT DO NOTHING;

INSERT INTO public.projects (title, description, category, image_url, published) VALUES (
  'Οδοποιία Αγροτικών Δρόμων Θεσπρωτίας',
  'Βελτίωση και ασφαλτόστρωση αγροτικών δρόμων συνολικού μήκους 20km στο νομό Θεσπρωτίας.',
  'Αγροτικά Έργα',
  '/Photos/project-12.jpg',
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

