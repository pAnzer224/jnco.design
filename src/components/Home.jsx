import React, { useEffect } from "react";
import gsap from "gsap";
import HeroSection from "./landing/HeroSection";
import FeatureCards from "./landing/FeatureCards";
import Philosophy from "./landing/Philosophy";
import ProtocolArchive from "./landing/ProtocolArchive";
import Contact from "./Contact";

export default function Home({ setActivePage }) {
  // Intro GSAP logic for Hero
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to('.hero-text', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <main className="bg-background min-h-screen text-dark selection:bg-accent selection:text-background w-full">
        <HeroSection />


        <FeatureCards />

        <Philosophy />

        <ProtocolArchive />

        <div id="contact-section" className="footer-clip-transition pb-20 pt-40 -mt-20 relative z-10">
          <Contact />
          {/* Footer extension */}
          <div className="max-w-6xl mx-auto px-8 md:pl-[120px] lg:pl-[140px] mt-16 flex flex-col md:flex-row justify-center md:justify-between items-center text-primary/50 font-mono text-xs text-center md:text-left gap-4 md:gap-0 border-t border-primary/5 pt-8">
            <div>
              Currently available for freelance projects.
            </div>
            <div>&copy; {new Date().getFullYear()} Juneco. All rights reserved.</div>
          </div>
        </div>
      </main>
    </>
  );
}
