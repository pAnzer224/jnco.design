import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  {
    name: "React",
    icon: "/images/logos/react.svg",
    animate: "animate-[spin_20s_linear_infinite]",
    baseOpacity: "opacity-[0.15]",
    color: "#61DAFB"
  },
  {
    name: "Next.js",
    icon: "/images/logos/nextjs.svg",
    baseOpacity: "opacity-[0.15]",
    color: "#000000"
  },
  {
    name: "Laravel",
    icon: "/images/logos/laravel.svg",
    baseOpacity: "opacity-[0.15]",
    color: "#FF2D20"
  },
  {
    name: "PHP",
    icon: "/images/logos/php.svg",
    baseOpacity: "opacity-[0.15]",
    color: "#777BB4"
  },
  {
    name: "Supabase",
    icon: "/images/logos/supabase.svg",
    baseOpacity: "opacity-[0.25]",
    color: "#3ECF8E"
  },
  {
    name: "Firebase",
    icon: "/images/logos/firebase.svg",
    baseOpacity: "opacity-[0.25]",
    color: "#FFCA28"
  },
  {
    name: "Tailwind",
    icon: "/images/logos/tailwind.svg",
    baseOpacity: "opacity-[0.25]",
    color: "#38BDF8"
  },
  {
    name: "JavaScript",
    icon: "/images/logos/javascript.svg",
    baseOpacity: "opacity-[0.15]",
    color: "#F7DF1E"
  },
  {
    name: "GSAP",
    icon: "/images/logos/gsap.svg",
    baseOpacity: "opacity-[0.15]",
    color: "#88CE02"
  },
  {
    name: "Figma",
    icon: "/images/logos/figma.svg",
    baseOpacity: "opacity-[0.15]",
    color: "#F24E1E"
  },
  {
    name: "Photoshop",
    icon: "/images/logos/photoshop.svg",
    baseOpacity: "opacity-[0.15]",
    color: "#31A8FF"
  },
  {
    name: "Illustrator",
    icon: "/images/logos/illustrator.svg",
    baseOpacity: "opacity-[0.15]",
    color: "#FF9A00"
  }
];

const TechStack = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for header
      gsap.to(".tech-header-anim", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Entrance animation for grid items
      gsap.to(".tech-item", {
        scrollTrigger: {
          trigger: ".tech-grid",
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)"
      });

      const cards = gsap.utils.toArray(".tech-item");

      // Setup sequential color animation on timeline
      const setupTimelineAnimations = (timeline) => {
        cards.forEach((card, index) => {
          const tech = techStack[index];
          const baseOpacityVal = tech.baseOpacity.includes("0.25") ? 0.3 : 0.2;

          const img = card.querySelector(".tech-icon-img");
          const nameText = card.querySelector(".tech-name-text");
          const line = card.querySelector(".tech-line");
          const decorDot = card.querySelector(".tech-decor-dot");
          const iconContainer = card.querySelector(".tech-icon-container");

          if (!img || !nameText || !line || !decorDot || !iconContainer) return;

          const cardTime = index * 0.25; // Shorter stagger delay between each card's activation sequence

          timeline.fromTo(card,
            { y: 0 },
            { y: -8, duration: 0.5, ease: "power2.out" },
            cardTime
          )
            .fromTo(img,
              { filter: "grayscale(100%)", opacity: baseOpacityVal },
              { filter: "grayscale(0%)", opacity: 0.85, duration: 0.5, ease: "power2.out" },
              cardTime
            )
            .fromTo(iconContainer,
              { rotate: 12, y: 16, scale: 1 },
              { rotate: -5, y: 0, scale: 1.1, duration: 0.5, ease: "power2.out" },
              cardTime
            )
            .fromTo(nameText,
              { color: "rgba(232, 228, 221, 0.3)" },
              { color: "#E63B2E", duration: 0.5, ease: "power2.out" },
              cardTime
            )
            .fromTo(line,
              { width: "1rem", backgroundColor: "rgba(232, 228, 221, 0.15)" },
              { width: "2rem", backgroundColor: "#E63B2E", duration: 0.5, ease: "power2.out" },
              cardTime
            )
            .fromTo(decorDot,
              { opacity: 0, scale: 0 },
              { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
              cardTime
            );
        });
      };

      const mm = gsap.matchMedia();

      // Desktop and Tablet: Pin the section and scrub card color transitions one-by-one
      mm.add("(min-width: 768px)", () => {
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            scrub: 1,
            pin: true,
          }
        });
        setupTimelineAnimations(pinTl);
        // Short hold after last card fully colors — keeps section pinned briefly before releasing
        const lastCardTime = (techStack.length - 1) * 0.25 + 0.5;
        pinTl.to({}, { duration: lastCardTime * 0.5 });
      });

      // Mobile: Scrub card color transitions as user scrolls past without pinning to avoid clipping issues
      mm.add("(max-width: 767px)", () => {
        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 45%",
            end: "bottom 85%",
            scrub: 1,
          }
        });
        setupTimelineAnimations(mobileTl);
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-dark py-14 md:py-24 px-4 sm:px-8 md:pl-[120px] lg:pl-[140px] xl:pr-16 md:min-h-screen md:flex md:flex-col md:justify-center" id="tech-toolbox">
      {/* Dynamic Style Injection for hover override */}
      <style>{`
        #tech-toolbox .tech-item {
          transition: all 0.3s ease;
        }

        #tech-toolbox .tech-item:hover {
          border-color: rgba(232, 228, 221, 0.15) !important;
          box-shadow: 0 10px 25px -10px rgba(0,0,0,0.3) !important;
          transform: translateY(-8px) !important;
        }

        #tech-toolbox .tech-item:hover .tech-icon-container {
          transform: rotate(-5deg) translateY(0) scale(1.1) !important;
        }

        #tech-toolbox .tech-item:hover .tech-icon-img {
          filter: grayscale(0%) !important;
          opacity: 0.85 !important;
        }

        #tech-toolbox .tech-item:hover .tech-name-text {
          color: #E63B2E !important;
        }

        #tech-toolbox .tech-item:hover .tech-line {
          width: 2rem !important;
          background-color: #E63B2E !important;
        }

        #tech-toolbox .tech-item:hover .tech-decor-dot {
          opacity: 1 !important;
          transform: scale(1) !important;
        }
      `}</style>

      <div className="tech-header flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16 gap-8">
        <div className="max-w-2xl tech-header-anim opacity-0 translate-y-10">
          <h2 className="font-sans font-black text-4xl sm:text-6xl text-primary tracking-tighter uppercase mb-6">
            technical skills
          </h2>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary/60 leading-relaxed pl-4 border-l-2 border-accent/40">
            Technologies and tools I use to design and build digital experiences.
          </p>
        </div>
      </div>

      <div className="tech-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 sm:gap-6">
        {techStack.map((tech, i) => (
          <div
            key={i}
            className="tech-item opacity-0 translate-y-10 group relative bg-primary/90 border-[1.5px] border-primary/10 rounded-[2.5rem] p-6 h-40 sm:h-48 overflow-hidden cursor-default"
          >
            <div className="relative z-20">
              <span className="tech-name-text font-mono text-[10px] text-primary/40 uppercase tracking-widest font-bold block mb-1 transition-colors duration-300">
                {tech.name}
              </span>
              <div className="tech-line w-4 h-[1px] bg-primary/20 transition-all duration-500" />
            </div>

            {/* Icon - "Hugging" the bottom and tilted */}
            <div className="tech-icon-container absolute -bottom-6 -right-4 w-24 h-24 sm:w-32 sm:h-32 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform rotate-12 translate-y-4">
              <div className={`w-full h-full ${tech.animate || ''}`}>
                <img
                  src={tech.icon}
                  alt=""
                  width="96"
                  height="96"
                  loading="lazy"
                  className={`tech-icon-img w-full h-full object-contain grayscale ${tech.baseOpacity} transition-all duration-700`}
                />
              </div>
            </div>

            {/* Hover Decor */}
            <div className="tech-decor-dot absolute top-6 right-6 opacity-0 transition-all duration-500 transform scale-0">
              <div className="w-2 h-2 rounded-full bg-accent" style={{ backgroundColor: 'var(--brand-color)' }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
