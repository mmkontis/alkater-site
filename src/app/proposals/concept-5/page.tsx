import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { ThemeProvider } from "@/components/landing/ThemeContext";

export default function Concept5() {
  return (
    <ThemeProvider>
      <main className="bg-[#111111] min-h-screen text-[#F5F3EE] antialiased selection:bg-[#E63B2E] selection:text-white">
        <style dangerouslySetInnerHTML={{__html: `
          html { scroll-behavior: smooth; }
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        `}} />

        <div className="pointer-events-none fixed inset-0 z-[100] opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
            <filter id="globalNoiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#globalNoiseFilter)" />
          </svg>
        </div>

        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </ThemeProvider>
  );
}
