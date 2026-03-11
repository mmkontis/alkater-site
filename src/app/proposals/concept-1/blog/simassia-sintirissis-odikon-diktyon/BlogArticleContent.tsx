"use client";

import { motion } from "framer-motion";
import { InnerPageLayout, PageHero } from "@/components/landing/InnerPageLayout";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogArticleContent({
  coverImage,
  title,
  excerpt,
  date,
}: {
  coverImage: string;
  title?: string;
  excerpt?: string;
  date?: string;
}) {
  const displayDate = date
    ? new Date(date).toLocaleDateString("el-GR", { day: "numeric", month: "long", year: "numeric" })
    : "10 Μαρτίου 2026";

  return (
    <InnerPageLayout>
      <PageHero
        label="Αρθρο"
        title={<>Σημασια Συντηρησης<br /><span className="text-[#E63B2E]">Οδικων Δικτυων.</span></>}
        subtitle={excerpt ?? "Γιατί η τακτική συντήρηση των οδικών δικτύων αποτελεί επένδυση στην ασφάλεια, την οικονομία και τη βιωσιμότητα των υποδομών."}
        image={coverImage}
      />

      {/* Article Meta */}
      <section className="border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl py-8 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-[#E8E4DD]/50 font-['Space_Mono'] text-sm">
            <Calendar className="w-4 h-4" />
            <span>{displayDate}</span>
          </div>
          <div className="flex items-center gap-2 text-[#E8E4DD]/50 font-['Space_Mono'] text-sm">
            <Clock className="w-4 h-4" />
            <span>5 λεπτά ανάγνωσης</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="space-y-8 text-[#E8E4DD]/80 font-['Space_Mono'] text-base leading-relaxed">
              <p className="text-xl text-[#E8E4DD]/90 leading-relaxed">
                Τα οδικά δίκτυα αποτελούν τη ραχοκοκαλιά κάθε σύγχρονης οικονομίας. Η συντήρησή τους δεν είναι απλά μια τεχνική υποχρέωση — είναι στρατηγική επένδυση στην ασφάλεια των πολιτών και τη βιωσιμότητα των υποδομών.
              </p>

              {/* Featured Image */}
              <div className="relative aspect-[21/9] overflow-hidden !my-12">
                <img
                  src={coverImage}
                  alt={title ?? "Σημασία Συντήρησης Οδικών Δικτύων"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3EE] tracking-tighter uppercase font-['Space_Grotesk'] !mb-4 !mt-16">
                Γιατι Η Συντηρηση <span className="text-[#E63B2E]">Εχει Σημασια</span>
              </h2>

              <p>
                Ένας δρόμος που δεν συντηρείται σωστά δεν αποτελεί μόνο κίνδυνο για τους οδηγούς — αυξάνει δραματικά το κόστος μεταφοράς, μειώνει την αξία των ακινήτων στην περιοχή και επιβαρύνει τα οχήματα με πρόσθετες φθορές. Σύμφωνα με μελέτες, κάθε 1 ευρώ που επενδύεται στη συντήρηση εξοικονομεί 6-10 ευρώ σε μελλοντικές αποκαταστάσεις.
              </p>

              <p>
                Οι κυριότεροι λόγοι που η τακτική συντήρηση είναι κρίσιμη:
              </p>

              <ul className="space-y-3 list-none pl-0">
                {[
                  "Πρόληψη ατυχημάτων — λακκούβες, ρωγμές και φθαρμένα οδοστρώματα αποτελούν κύρια αιτία τροχαίων.",
                  "Μείωση κόστους — η έγκαιρη επισκευή μικρών βλαβών αποτρέπει ακριβές ανακατασκευές.",
                  "Μεγαλύτερη διάρκεια ζωής — σωστά συντηρημένος δρόμος διαρκεί 2-3 φορές περισσότερο.",
                  "Βελτίωση οδικής ασφάλειας — καλή σήμανση, αποστράγγιση και φωτισμός σώζουν ζωές.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#E63B2E] rounded-full mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3EE] tracking-tighter uppercase font-['Space_Grotesk'] !mb-4 !mt-16">
                Ειδη <span className="text-[#E63B2E]">Συντηρησης</span>
              </h2>

              <p>
                Η συντήρηση οδικών δικτύων χωρίζεται σε δύο βασικές κατηγορίες:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 !my-8">
                <div className="bg-[#1A1A1A] p-6 border border-white/5">
                  <h3 className="text-xl font-bold text-[#F5F3EE] font-['Space_Grotesk'] uppercase mb-3">Προληπτικη Συντηρηση</h3>
                  <p className="text-sm !mb-0">
                    Περιλαμβάνει τακτικές επιθεωρήσεις, σφράγιση ρωγμών, αναβάθμιση σήμανσης και καθαρισμό αποστραγγιστικών συστημάτων. Στόχος είναι η αποτροπή μεγαλύτερων βλαβών πριν αυτές εμφανιστούν.
                  </p>
                </div>
                <div className="bg-[#1A1A1A] p-6 border border-white/5">
                  <h3 className="text-xl font-bold text-[#F5F3EE] font-['Space_Grotesk'] uppercase mb-3">Διορθωτικη Συντηρηση</h3>
                  <p className="text-sm !mb-0">
                    Αφορά την αποκατάσταση υφιστάμενων βλαβών: επισκευή λακκουβών, ανακατασκευή τμημάτων οδοστρώματος, αντικατάσταση φθαρμένων στηθαίων ασφαλείας και επαναδιαγράμμιση.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3EE] tracking-tighter uppercase font-['Space_Grotesk'] !mb-4 !mt-16">
                Η Εμπειρια Της <span className="text-[#E63B2E]">ΑΛΚΑΤΕΡ</span>
              </h2>

              <p>
                Η ΑΛΚΑΤΕΡ Α.Ε. διαθέτει πάνω από 25 χρόνια εμπειρίας στη συντήρηση και κατασκευή οδικών δικτύων σε ολόκληρη την Ήπειρο και τη Δυτική Ελλάδα. Με σύγχρονο στόλο μηχανημάτων ασφαλτόστρωσης και εξειδικευμένο προσωπικό, αναλαμβάνουμε έργα κάθε κλίμακας — από τοπικές επισκευές μέχρι ολοκληρωμένα προγράμματα συντήρησης δημοτικών και εθνικών οδών.
              </p>

              <p>
                Η προσέγγισή μας βασίζεται σε τρεις πυλώνες:
              </p>

              <ul className="space-y-3 list-none pl-0">
                {[
                  "Τεχνική αριστεία — χρήση πιστοποιημένων υλικών και τήρηση διεθνών προδιαγραφών.",
                  "Ταχύτητα εκτέλεσης — ελαχιστοποίηση των κυκλοφοριακών παρεμβάσεων.",
                  "Μακροπρόθεσμη αντοχή — κατασκευές που αντέχουν στον χρόνο και τις καιρικές συνθήκες.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-[#E63B2E] rounded-full mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-[#0a0a0a] border border-white/5 p-8 !my-12">
                <p className="text-lg italic text-[#E8E4DD]/90 !mb-0">
                  &laquo;Η ποιότητα ενός οδικού δικτύου δεν κρίνεται την ημέρα που κατασκευάζεται, αλλά δέκα χρόνια μετά. Γι' αυτό δεν κάνουμε εκπτώσεις στα υλικά και τις μεθόδους.&raquo;
                </p>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-[#F5F3EE] tracking-tighter uppercase font-['Space_Grotesk'] !mb-4 !mt-16">
                Συμπερασμα
              </h2>

              <p>
                Η συντήρηση οδικών δικτύων δεν είναι πολυτέλεια — είναι αναγκαιότητα. Η επένδυση στη σωστή συντήρηση εξασφαλίζει ασφαλέστερους δρόμους, χαμηλότερο κόστος μεταφοράς και καλύτερη ποιότητα ζωής για τους πολίτες. Η ΑΛΚΑΤΕΡ Α.Ε. παραμένει δεσμευμένη στην παροχή υπηρεσιών υψηλής ποιότητας που ανταποκρίνονται στις σύγχρονες ανάγκες.
              </p>
            </div>
          </motion.article>

          {/* Back to blog */}
          <div className="mt-16 pt-8 border-t border-white/5">
            <Link
              href="/proposals/concept-1"
              className="inline-flex items-center gap-2 font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E8E4DD]/50 hover:text-[#E63B2E] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Επιστροφη στην Αρχικη
            </Link>
          </div>
        </div>
      </section>
    </InnerPageLayout>
  );
}
