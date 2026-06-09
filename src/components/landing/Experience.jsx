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
        <div className="exp-header md:w-1/3 flex flex-col gap-8 md:sticky md:top-32 md:self-start">
          <div>
            <h2 className="exp-header-anim opacity-0 -translate-x-10 font-sans font-black text-4xl sm:text-6xl text-dark tracking-tighter uppercase mb-6 leading-none">
              Career <br /> <span className="text-accent underline decoration-4 underline-offset-8">History</span>
            </h2>
            <p className="exp-header-anim opacity-0 -translate-x-10 font-mono text-xs text-dark/50 uppercase tracking-widest leading-relaxed">
              Professional trajectory and key milestones in design and development.
            </p>
          </div>

          {/* Avatar + Identity */}
          <div className="exp-header-anim opacity-0 -translate-x-10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-dark/10 shrink-0">
              <img src="/images/avatar.webp" alt="Juneco" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
            </div>
            <div>
              <p className="font-sans font-bold text-sm text-dark uppercase tracking-tight">Juneco Mirande</p>
              <span className="font-mono text-[10px] text-dark/50 uppercase tracking-widest">San Carlos City, PH</span>
            </div>
          </div>

          {/* Action */}
          <div className="exp-header-anim opacity-0 -translate-x-10 flex flex-col gap-4">
            <a href="https://www.linkedin.com/in/juneco-mirande-59a940390/" target="_blank" rel="noopener noreferrer" className="bg-accent/10 rounded-2xl p-4 border border-accent/20 flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-colors duration-300 group cursor-pointer">
              <p className="font-mono text-[10px] text-accent uppercase tracking-widest font-bold group-hover:text-background transition-colors duration-300">Connect on LinkedIn</p>
            </a>
          </div>

          {/* Education: LCCB */}
          <div className="exp-header-anim opacity-0 -translate-x-10 mt-4 p-6 rounded-3xl border border-dark/5 bg-primary/40 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-30 transition-opacity duration-500 pointer-events-none">
              <img
                src="/images/lcc-logo.webp"
                alt="La Consolacion College Bacolod logo"
                className="w-28 h-28 object-contain"
              />
            </div>
            <div className="relative z-10">
              <h3 className="font-sans font-bold text-lg text-dark uppercase tracking-tight mb-1">
                BS Information Technology
              </h3>
              <p className="font-mono text-[10px] text-dark/60 uppercase tracking-widest mb-4">La Consolacion College Bacolod</p>

              <div className="inline-flex items-center gap-2 bg-background/50 px-3 py-1 rounded-full border border-dark/5">
                <Calendar size={12} className="text-dark/40" />
                <span className="font-mono text-[9px] font-bold text-dark/70 tracking-widest">JUN 2021 – MAY 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Timeline/Cards */}
        <div className="md:w-2/3 space-y-12">
          {/* Experience Item 1: 2023 - Present */}
          <div className="exp-item opacity-0 translate-y-10 relative pl-8 md:pl-16 border-l-2 border-dark/5 pb-12 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-sans font-bold text-2xl text-dark uppercase tracking-tight">
                  Freelance Designer & Developer
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Briefcase size={14} className="text-accent" />
                  <span className="font-mono text-[10px] text-dark/60 uppercase tracking-widest">Independent Projects</span>
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
                  Designing and building end-to-end web applications, interactive wireframes, and digital media campaigns for client portfolios.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Built a secure clinic records & booking management system using React and Laravel",
                  "Developed a veterinarian clinic web app with custom scheduling and service directory features",
                  "Designed low-fidelity wireframes and user flows for 'RePlate', a food sharing mobile application",
                  "Produced animated campaign videos for digital privacy advocacy and F&B marketing infographics"
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

          {/* Experience Item 2: Choros OJT */}
          <div className="exp-item opacity-0 translate-y-10 relative pl-8 md:pl-16 border-l-2 border-dark/5 pb-12 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-sans font-bold text-2xl text-dark uppercase tracking-tight flex items-center gap-2 flex-wrap">
                  OJT Intern @{" "}
                  <a href="https://choros.io" target="_blank" rel="noopener noreferrer">
                    <img
                      src="/images/choros-logo.webp"
                      alt="Choros.io"
                      className="h-6 w-auto object-contain hover:opacity-70 transition-opacity duration-300"
                    />
                  </a>
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Briefcase size={14} className="text-accent" />
                  <span className="font-mono text-[10px] text-dark/60 uppercase tracking-widest">Remote, United Kingdom</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-primary/50 self-start px-4 py-1.5 rounded-full border border-dark/10">
                <Calendar size={14} className="text-dark/40" />
                <span className="font-mono text-[10px] font-bold text-dark/70 tracking-widest">JAN – APR 2026</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-primary/40 backdrop-blur-sm p-6 rounded-[2rem] border border-dark/5 hover:border-accent/30 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-dark/5">
                <p className="font-mono text-[11px] text-dark/70 leading-relaxed uppercase">
                  Completed 486-hour OJT with a UK-based IT company. Worked across UI/UX design, frontend development, and QA in a fully remote setup.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "UI/UX design and Figma prototyping for live product screens",
                  "Frontend development using React, Laravel, and Tailwind CSS",
                  "Mobile responsiveness audits and cross-browser QA testing",
                  "Adobe Photoshop asset production for digital deliverables"
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
              02
            </span>
          </div>

          {/* Experience Item 3: 2015 - 2023 */}
          <div className="exp-item opacity-0 translate-y-10 relative pl-8 md:pl-16 border-l-2 border-dark/5 pb-8 group">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="font-sans font-bold text-2xl text-dark uppercase tracking-tight">
                  Graphic & Digital Media Designer
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Briefcase size={14} className="text-accent" />
                  <span className="font-mono text-[10px] text-dark/60 uppercase tracking-widest">Various Clients</span>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-primary/50 self-start px-4 py-1.5 rounded-full border border-dark/10">
                <Calendar size={14} className="text-dark/40" />
                <span className="font-mono text-[10px] font-bold text-dark/70 tracking-widest">2015 – 2023</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-primary/40 backdrop-blur-sm p-6 rounded-[2rem] border border-dark/5 hover:border-accent/30 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-dark/5">
                <p className="font-mono text-[11px] text-dark/70 leading-relaxed uppercase">
                  Eight years of visual communication — photo manipulation, compositing, and brand identity work across print and digital.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Created layouts, branding guides, and identity systems for local businesses",
                  "Collaborated on social media design, digital flyers, and print media campaigns"
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
              03
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
