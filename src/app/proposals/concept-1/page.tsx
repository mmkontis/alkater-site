import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { CertificationsSection } from "@/components/landing/CertificationsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { BlogSection } from "@/components/landing/BlogSection";
import { Footer } from "@/components/landing/Footer";
import { CookieBanner } from "@/components/landing/CookieBanner";
import { ThemeProvider } from "@/components/landing/ThemeContext";
import { NavMenu } from "@/components/landing/NavMenu";
import { getHeroSlides, getProjects, getBlogPosts, getServices } from "@/lib/queries";

// Revalidate every hour — slides & projects cached as static HTML
export const revalidate = 3600;

export default async function Concept1() {
  const [slides, projects, blogPosts, services] = await Promise.all([getHeroSlides(), getProjects(), getBlogPosts(), getServices()]);

  return (
    <ThemeProvider>
      <main className="min-h-screen antialiased selection:bg-[#E63B2E] selection:text-white overflow-x-hidden" style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>
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

        <NavMenu />
        <HeroSection slides={slides} />
        <ServicesSection services={services} />
        <AboutSection />
        {/* <ProjectsSection projects={projects} /> */}
        <CertificationsSection />
        <ContactSection />
        <BlogSection posts={blogPosts} />
        <Footer />
        <CookieBanner />
      </main>
    </ThemeProvider>
  );
}
