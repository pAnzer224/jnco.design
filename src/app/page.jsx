import React from "react";
import HeroSection from "../components/landing/HeroSection";
import ProjectsArchive from "../components/landing/ProjectsArchive";
import TechStack from "../components/landing/TechStack";
import Experience from "../components/landing/Experience";
import Philosophy from "../components/landing/Philosophy";
import Contact from "../components/Contact";

export const metadata = {
  title: "Juneco Mirande · UI/UX and Graphic Designer",
  description: "Portfolio of Juneco Mirande — a Filipino UI/UX and Graphic Designer specializing in Figma-based interface design, Photoshop-driven graphic and brand work, and front-end development.",
  alternates: {
    canonical: "https://juneco-mirande.web.app/",
  },
  openGraph: {
    title: "Juneco Mirande · UI/UX and Graphic Designer",
    url: "https://juneco-mirande.web.app/",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Juneco Mirande",
  "alternateName": "jnco",
  "url": "https://juneco-mirande.web.app",
  "image": "https://juneco-mirande.web.app/summary_large_image.jpg",
  "sameAs": [
    "https://juneco-mirande.web.app"
  ],
  "jobTitle": "UI/UX Designer & Graphic Designer",
  "description": "Filipino UI/UX designer and graphic designer specializing in Figma-based interface design, Photoshop-driven graphic and brand work, and front-end development.",
  "nationality": {
    "@type": "Country",
    "name": "Philippines"
  },
  "knowsAbout": ["UI/UX Design", "Graphic Design", "Branding", "Interface Design", "Front-End Development", "Mockup Design"],
  "offers": {
    "@type": "Offer",
    "description": "Freelance UI/UX design, graphic design, branding, and front-end development services",
    "availability": "https://schema.org/InStock"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Juneco Mirande – juneco-mirande.web.app",
  "alternateName": ["Juneco Mirande Portfolio", "jnco design", "juneco-mirande"],
  "url": "https://juneco-mirande.web.app",
  "description": "Portfolio of Juneco Mirande — a Filipino UI/UX designer and graphic designer.",
  "inLanguage": "en-PH",
  "author": {
    "@type": "Person",
    "name": "Juneco Mirande"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://juneco-mirande.web.app/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <main className="bg-background min-h-screen text-dark selection:bg-accent selection:text-background w-full">
        <HeroSection />

        <ProjectsArchive />

        <TechStack />

        <Experience />

        <Philosophy />

        <div className="footer-clip-transition pb-10 md:pb-20 pt-16 md:pt-40 -mt-20 relative z-10">
          <Contact />
          {/* Footer extension */}
          <div className="px-4 sm:px-8 md:px-16 md:pl-[120px] lg:pl-[140px] mt-16 flex flex-col md:flex-row justify-center md:justify-between items-center text-dark/50 font-mono text-xs text-center md:text-left gap-4 md:gap-0 border-t border-dark/5 pt-8">
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
