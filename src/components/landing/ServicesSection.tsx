"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { HardHat, Truck, Construction, PaintBucket } from "lucide-react";

const SERVICES = [
  {
    title: "Ασφαλτοστρώσεις",
    description: "Ολοκληρωμένες υπηρεσίες ασφαλτόστρωσης υψηλών προδιαγραφών για οδικά δίκτυα, χώρους στάθμευσης και ιδιωτικές εγκαταστάσεις.",
    icon: <Construction className="w-8 h-8 md:w-12 md:h-12 text-[#E63B2E]" />,
    video: "/Videos/construction/09_asphalt_dump_truck_initial_v1.mp4",
    startTime: 1,
  },
  {
    title: "Διαγραμμίσεις Οδών",
    description: "Επαγγελματικές διαγραμμίσεις οδικών δικτύων, χώρων στάθμευσης και βιομηχανικών εγκαταστάσεων με πιστοποιημένα υλικά.",
    icon: <PaintBucket className="w-8 h-8 md:w-12 md:h-12 text-[#E63B2E]" />,
    video: "/Videos/construction/08_road_line_painting_initial_v2.mp4",
  },
  {
    title: "Χωματουργικά & Υποδομές",
    description: "Εκσκαφές, επιχωματώσεις, διανοίξεις οδών, δημιουργία δικτύων αποχέτευσης και έργα υποδομής μεγάλης κλίμακας.",
    icon: <Truck className="w-8 h-8 md:w-12 md:h-12 text-[#E63B2E]" />,
    video: "/Videos/sample_3-3.mp4",
  },
  {
    title: "Δημόσια Έργα",
    description: "Ανάληψη και εκτέλεση δημοσίων έργων με συνέπεια, τήρηση χρονοδιαγραμμάτων και αυστηρών προδιαγραφών ποιότητας.",
    icon: <HardHat className="w-8 h-8 md:w-12 md:h-12 text-[#E63B2E]" />,
    video: "/Videos/construction/11_road_survey_trimmed_8s_v2.mp4",
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 md:py-40 font-['Space_Grotesk'] overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#333] to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[linear-gradient(#F5F3EE_1px,transparent_1px),linear-gradient(90deg,#F5F3EE_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.02]"></div>
      <div className="absolute inset-0 transition-colors duration-500 pointer-events-none" style={{ backgroundColor: "var(--tint-subtle)" }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[2px] bg-[#E63B2E]"></span>
              <span className="font-['Space_Mono'] uppercase tracking-widest text-sm text-[#E63B2E]">Εξειδικευση</span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase max-w-2xl leading-[0.9]">
              Οι <span className="text-[#E63B2E]">Υπηρεσιες</span> Μας.
            </h2>
          </div>

          <div className="max-w-md font-['Space_Mono'] text-sm md:text-base leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <p>
              Η ΑΛΚΑΤΕΡ εξειδικεύεται σε όλο το φάσμα των κατασκευαστικών έργων υποδομής,
              εστιάζοντας στην ποιότητα, την ασφάλεια και την καινοτομία, με άρτια
              εκπαιδευμένο προσωπικό και σύγχρονο εξοπλισμό.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {SERVICES.map((service, index) => (
            <a href="/proposals/concept-5/services/asphalt" key={index} className="block w-full">
              <ServiceCard
                service={service}
                index={index}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: { title: string; description: string; icon: React.ReactNode; video: string; startTime?: number }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      if (service.startTime) {
        videoRef.current.currentTime = service.startTime;
      }
      videoRef.current.play().catch(() => {});
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered, service.startTime]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative h-[350px] md:h-[450px] w-full overflow-hidden rounded-2xl border transition-colors duration-500"
      style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-color)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src={`${service.video}#t=0.1`}
          muted
          loop
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
            isHovered
              ? "opacity-60 scale-110 grayscale-0"
              : "opacity-40 scale-100 grayscale mix-blend-luminosity"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-end h-full p-6 md:p-10">
        <div className="mb-4 transform transition-transform duration-500 group-hover:-translate-y-2">
          {service.icon}
        </div>

        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-4 transform transition-transform duration-500 group-hover:-translate-y-2 text-white">
          {service.title}
        </h3>

        <div className="overflow-hidden h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <p className="font-['Space_Mono'] text-[#E8E4DD]/80 text-sm md:text-base">
            {service.description}
          </p>
        </div>
      </div>

      <div className="absolute top-6 right-6 font-['Space_Mono'] text-white/20 text-4xl font-bold group-hover:text-[#E63B2E]/20 transition-colors duration-500">
        0{index + 1}
      </div>
    </motion.div>
  );
}
