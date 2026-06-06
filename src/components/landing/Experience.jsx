import React, { useEffect, useRef } from "react";
import { Briefcase, Calendar, CheckCircle } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".exp-header-anim", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.to(".exp-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: "power4.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-24 px-4 sm:px-8 md:pl-[120px] lg:pl-[140px] xl:pr-16" id="experience">
      <div className="flex flex-col md:flex-row gap-16">
        {/* Left Side: Header */}
        <div className="exp-header md:w-1/3">
          <h2 className="exp-header-anim opacity-0 -translate-x-10 font-sans font-black text-4xl sm:text-6xl text-dark tracking-tighter uppercase mb-6 leading-none">
            Career <br /> <span className="text-accent underline decoration-4 underline-offset-8">History</span>
          </h2>
          <p className="exp-header-anim opacity-0 -translate-x-10 font-mono text-xs text-dark/50 uppercase tracking-widest leading-relaxed">
            Professional trajectory and key milestones in design and development.
          </p>
        </div>

        {/* Right Side: Timeline/Cards */}
        <div className="md:w-2/3 space-y-12">
          {/* Experience Item */}
          <div className="exp-item opacity-0 translate-y-10 relative pl-8 md:pl-16 border-l-2 border-dark/5 pb-8 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-sans font-bold text-2xl text-dark uppercase tracking-tight">
                  Freelance Designer & Developer
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Briefcase size={14} className="text-accent" />
                  <span className="font-mono text-[10px] text-dark/60 uppercase tracking-widest">Self-Employed</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-primary/50 self-start px-4 py-1.5 rounded-full border border-dark/10">
                <Calendar size={14} className="text-dark/40" />
                <span className="font-mono text-[10px] font-bold text-dark/70 tracking-widest">2023 – PRESENT</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-primary/40 backdrop-blur-sm p-6 rounded-[2rem] border border-dark/5 hover:border-accent/30 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-dark/5">
                <p className="font-mono text-[11px] text-dark/70 leading-relaxed uppercase">
                  Delivered graphic design, UI/UX design, and web development services to multiple clients worldwide.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Created high-impact graphics & infographics",
                  "Built wireframes and low-fidelity prototypes",
                  "Developed apps in React, Next.js, and Vue.js",
                  "End-to-end project management"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle weight="fill" className="text-accent w-4 h-4 mt-0.5 shrink-0" />
                    <span className="font-sans text-xs font-medium text-dark/80 uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative background number */}
            <span className="absolute -right-4 -bottom-4 font-sans font-black text-[12rem] text-dark/[0.02] pointer-events-none select-none">
              01
            </span>
          </div>

          {/* Past Experience Hint or Placeholder for more */}
          <div className="pt-8 border-t border-dark/5 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-dark/10 shrink-0">
              <img src="/images/avatar.webp" alt="Juneco" className="w-full h-full object-cover grayscale hover:grayscale-0" />
            </div>
            <p className="font-sans text-sm font-semibold text-dark/80 tracking-wide uppercase">
              La Consolacion College Bacolod Graduate, 2026.<br />
              <span className="font-mono text-[10px] font-normal text-dark/50 tracking-widest mt-1 block">
                Earlier roles in Graphic Design & Digital Media (2015 - 2023) available upon request.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
