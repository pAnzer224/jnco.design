import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  {
    name: "React",
    icon: "/images/react.svg",
    animate: "animate-[spin_20s_linear_infinite]",
    baseOpacity: "opacity-[0.15]"
  },
  {
    name: "Next.js",
    icon: "/images/nextjs.svg",
    baseOpacity: "opacity-[0.15]"
  },
  {
    name: "Laravel",
    icon: "/images/laravel.svg",
    baseOpacity: "opacity-[0.15]"
  },
  {
    name: "PHP",
    icon: "/images/php.svg",
    baseOpacity: "opacity-[0.15]"
  },
  {
    name: "Supabase",
    icon: "/images/supabase.svg",
    baseOpacity: "opacity-[0.25]"
  },
  {
    name: "Firebase",
    icon: "/images/firebase.svg",
    baseOpacity: "opacity-[0.25]"
  },
  {
    name: "Tailwind",
    icon: "/images/tailwind.svg",
    baseOpacity: "opacity-[0.25]"
  },
  {
    name: "JavaScript",
    icon: "/images/javascript.svg",
    baseOpacity: "opacity-[0.15]"
  },
  {
    name: "GSAP",
    icon: "/images/gsap.svg",
    baseOpacity: "opacity-[0.15]"
  },
  {
    name: "Figma",
    icon: "/images/figma.svg",
    baseOpacity: "opacity-[0.15]"
  },
  {
    name: "Photoshop",
    icon: "/images/photoshop.svg",
    baseOpacity: "opacity-[0.15]"
  },
  {
    name: "Illustrator",
    icon: "/images/illustrator.svg",
    baseOpacity: "opacity-[0.15]"
  }
];

const TechStack = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-24 px-4 sm:px-8 md:pl-[120px] lg:pl-[140px] xl:pr-16" id="tech-toolbox">
      <div className="tech-header flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl tech-header-anim opacity-0 translate-y-10">
          <h2 className="font-sans font-black text-4xl sm:text-6xl text-dark tracking-tighter uppercase mb-6">
            technical skills
          </h2>
          <p className="font-mono text-xs text-dark/60 leading-relaxed uppercase tracking-widest pl-4 border-l-2 border-accent/20">
            A curated selection of technologies I use to bring digital experiences to life.
            Blending aesthetics with performance.
          </p>
        </div>
      </div>

      <div className="tech-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 sm:gap-6">
        {techStack.map((tech, i) => (
          <div
            key={i}
            className="tech-item opacity-0 translate-y-10 group relative bg-primary/80 backdrop-blur-md border-[1.5px] border-dark/10 rounded-[2.5rem] p-6 h-40 sm:h-48 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-accent/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 cursor-default"
          >
            {/* Label */}
            <div className="relative z-20">
              <span className="font-mono text-[10px] text-dark/50 uppercase tracking-widest font-black block mb-1 group-hover:text-accent transition-colors duration-300">
                {tech.name}
              </span>
              <div className="w-4 h-[1px] bg-dark/20 group-hover:w-8 group-hover:bg-accent transition-all duration-500" />
            </div>

            {/* Icon - "Hugging" the bottom and tilted */}
            <div className="absolute -bottom-6 -right-4 w-24 h-24 sm:w-32 sm:h-32 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform rotate-12 translate-y-4 group-hover:rotate-[-5deg] group-hover:translate-y-0 group-hover:scale-110">
              <div className={`w-full h-full ${tech.animate || ''}`}>
                <img
                  src={tech.icon}
                  alt=""
                  className={`w-full h-full object-contain grayscale ${tech.baseOpacity} group-hover:grayscale-0 group-hover:opacity-[0.4] transition-all duration-700`}
                />
              </div>
            </div>

            {/* Hover Decor */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
