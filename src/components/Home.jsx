import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "./landing/HeroSection";
import FeatureCards from "./landing/FeatureCards";
import TechStack from "./landing/TechStack";
import Experience from "./landing/Experience";
import Philosophy from "./landing/Philosophy";
import ProjectsArchive from "./landing/ProjectsArchive";
import Contact from "./Contact";

export default function Home({ setActivePage }) {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#contact") {
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <>
      <main className="bg-background min-h-screen text-dark selection:bg-accent selection:text-background w-full">
        <HeroSection />

        <FeatureCards />

        <TechStack />

        <Experience />

        <Philosophy />

        <ProjectsArchive />

        <div className="footer-clip-transition pb-20 pt-40 -mt-20 relative z-10">
          <Contact />
          {/* Footer extension */}
          <div className="max-w-7xl mx-auto px-8 md:pl-[120px] lg:pl-[140px] mt-16 flex flex-col md:flex-row justify-center md:justify-between items-center text-primary/50 font-mono text-xs text-center md:text-left gap-4 md:gap-0 border-t border-primary/5 pt-8">
            <div>
              Currently available for freelance projects.
            </div>
            <div>&copy; {new Date().getFullYear()} Juneco Mirande. All rights reserved.</div>
          </div>
        </div>
      </main>
    </>
  );
}
