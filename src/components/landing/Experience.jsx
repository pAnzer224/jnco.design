import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Calendar, CheckCircle } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);
  const [hoverImage, setHoverImage] = useState(null);
  const [lastHoverImage, setLastHoverImage] = useState("/images/drjas/drjas.webp");
  const cursorImgRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const hasHover = window.matchMedia("(hover: hover)").matches;
      setIsDesktop(window.innerWidth >= 1024 && hasHover);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    if (hoverImage) {
      setLastHoverImage(hoverImage);
      gsap.to(cursorImgRef.current, {
        scale: 1,
        opacity: 1,
        autoAlpha: 1,
        duration: 0.3,
        ease: "back.out(1.5)",
        overwrite: "auto"
      });
    } else {
      gsap.to(cursorImgRef.current, {
        scale: 0,
        opacity: 0,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto"
      });
    }
  }, [hoverImage, isDesktop]);

  useEffect(() => {
    if (!isDesktop) {
      setHoverImage(null);
      return;
    }

    const onMouseMove = (e) => {
      if (cursorImgRef.current) {
        gsap.to(cursorImgRef.current, {
          x: e.clientX + 15,
          y: e.clientY + 15,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto"
        });
      }

      if (!e.target.closest('.exp-hover-link')) {
        setHoverImage(null);
      }
    };

    const onScroll = () => {
      setHoverImage(null);
    };

    const onMouseLeaveWindow = () => {
      setHoverImage(null);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
    };
  }, [isDesktop]);

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
    <>
      {/* Floating Hover Image */}
      {isDesktop && (
        <div
          ref={cursorImgRef}
          className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-xl overflow-hidden shadow-2xl border border-primary/20 bg-dark w-[150px] h-auto flex flex-col"
          style={{ opacity: 0, transform: "scale(0)", transformOrigin: "top left" }}
        >
          <img src={lastHoverImage} alt="Preview" width="150" height="150" className="w-full h-full object-cover" />
          <div className="bg-dark text-primary py-1.5 px-2 text-[8px] font-mono uppercase tracking-widest text-center border-t border-primary/10">
            Click to view
          </div>
        </div>
      )}

      <section ref={sectionRef} className="bg-background py-14 md:py-24 px-4 sm:px-8 md:pl-[120px] lg:pl-[140px] xl:pr-16" id="experience">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side: Header */}
          <div className="exp-header lg:w-1/3 flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
            <div>
              <h2 className="exp-header-anim opacity-0 -translate-x-10 font-sans font-black text-4xl sm:text-6xl text-dark tracking-tighter uppercase mb-6 leading-none">
                Career <br /> <span className="text-accent underline decoration-4 underline-offset-8">History</span>
              </h2>
              <p className="exp-header-anim opacity-0 -translate-x-10 font-mono text-xs text-dark/70 uppercase tracking-widest leading-relaxed">
                Professional trajectory and key milestones in design and development.
              </p>
            </div>

            {/* Avatar + Identity */}
            <div className="exp-header-anim opacity-0 -translate-x-10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-dark/10 shrink-0">
                <img src="/images/avatars/avatar.webp" alt="Juneco" width="56" height="56" loading="lazy" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <div>
                <p className="font-sans font-bold text-sm text-dark uppercase tracking-tight">Juneco Mirande</p>
                <span className="font-mono text-[10px] text-dark/70 uppercase tracking-widest">San Carlos City, PH</span>
              </div>
            </div>

            {/* Action */}
            <div className="exp-header-anim opacity-0 -translate-x-10 flex flex-col gap-3">
              <a href="https://www.linkedin.com/in/juneco-mirande/" target="_blank" rel="noopener noreferrer" data-cursor-text="View" data-cursor-style="tooltip" className="bg-accent/10 rounded-2xl p-4 border border-accent/20 flex items-center justify-center hover:bg-accent hover:text-white transition-colors duration-300 group cursor-pointer">
                <p className="font-mono text-[10px] text-accent uppercase tracking-widest font-bold group-hover:text-background transition-colors duration-300">Connect on LinkedIn</p>
              </a>
              <button
                type="button"
                data-cursor-text="View"
                data-cursor-style="tooltip"
                onClick={() => window.open("/resume", "_blank")}
                className="flex items-center justify-center transition-colors duration-300 cursor-pointer"
              >
                <p className="font-mono text-[10px] text-dark/70 hover:text-dark uppercase tracking-widest font-bold transition-colors duration-300">View Resume</p>
              </button>
            </div>

            {/* Education: LCCB */}
            <div className="exp-header-anim opacity-0 -translate-x-10 mt-4 p-6 rounded-3xl border border-dark/5 bg-primary relative overflow-hidden group will-change-transform">
              <div className="absolute -right-4 -bottom-4 opacity-[0.3] group-hover:opacity-[0.5] transition-opacity duration-500 pointer-events-none">
                <img
                  src="/images/logos/lcc-logo.webp"
                  alt="La Consolacion College Bacolod logo"
                  width="128"
                  height="128"
                  loading="lazy"
                  className="w-32 h-32 object-contain group-hover:scale-105 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"
                />
              </div>
              <div className="relative z-10">
                <h3 className="font-sans font-bold text-lg text-dark uppercase tracking-tight mb-1">
                  BS Information Technology
                </h3>
                <p className="font-mono text-[10px] text-dark/80 uppercase tracking-widest mb-4">La Consolacion College Bacolod</p>

                <div className="inline-flex items-center gap-2 bg-background/50 px-3 py-1 rounded-full border border-dark/5">
                  <Calendar size={12} className="text-dark/60" />
                  <span className="font-mono text-[9px] font-bold text-dark/80 tracking-widest">JUN 2021 – MAY 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Timeline/Cards */}
          <div className="lg:w-2/3 space-y-12">
            {/* Experience Item 1: 2023 - Present */}
            <div className="exp-item opacity-0 translate-y-10 relative pl-8 md:pl-16 border-l-2 border-dark/5 pb-12 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-sans font-bold text-2xl text-dark uppercase tracking-tight">
                    Freelance Designer & Developer
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Briefcase size={14} className="text-accent" />
                    <span className="font-mono text-[10px] text-dark/80 uppercase tracking-widest">Independent Projects</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-primary/50 self-start px-4 py-1.5 rounded-full border border-dark/10">
                  <Calendar size={14} className="text-dark/60" />
                  <span className="font-mono text-[10px] font-bold text-dark/80 tracking-widest">2023 – PRESENT</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-primary/90 p-6 rounded-[2rem] border border-dark/5 hover:border-accent/30 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-dark/5 will-change-transform">
                  <p className="font-mono text-[11px] text-dark leading-relaxed uppercase">
                    Designing and building websites and apps for clients, from first wireframe to final launch.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    "Built booking and records systems for clinics",
                    "Designed wireframes and user flows for a mobile app concept",
                    "Created marketing graphics and campaign visuals for various brands",
                    "Managed projects end-to-end, working directly with clients"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle weight="fill" className="text-accent w-4 h-4 mt-0.5 shrink-0" />
                      <span className="font-sans text-xs font-medium text-dark uppercase tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <span className="absolute -right-4 -bottom-4 font-sans font-black text-[12rem] text-dark/[0.02] pointer-events-none select-none">
                01
              </span>
            </div>

            {/* Experience Item 2: Choros OJT */}
            <div className="exp-item opacity-0 translate-y-10 relative pl-8 md:pl-16 border-l-2 border-dark/5 pb-12 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-sans font-bold text-2xl text-dark uppercase tracking-tight flex items-center gap-2 flex-wrap">
                    OJT Intern @{" "}
                    <a href="https://choros.io" target="_blank" rel="noopener noreferrer">
                      <img
                        src="/images/logos/choros-logo.webp"
                        alt="Choros.io"
                        width="80"
                        height="24"
                        loading="lazy"
                        className="h-6 w-auto object-contain hover:opacity-70 transition-opacity duration-300"
                      />
                    </a>
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Briefcase size={14} className="text-accent" />
                    <span className="font-mono text-[10px] text-dark/80 uppercase tracking-widest">Remote, United Kingdom</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-primary/50 self-start px-4 py-1.5 rounded-full border border-dark/10">
                  <Calendar size={14} className="text-dark/60" />
                  <span className="font-mono text-[10px] font-bold text-dark/80 tracking-widest">JAN – APR 2026</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-primary/90 p-6 rounded-[2rem] border border-dark/5 hover:border-accent/30 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-dark/5 will-change-transform">
                  <p className="font-mono text-[11px] text-dark leading-relaxed uppercase">
                    Remote internship with a UK-based IT company, spanning UI/UX design, graphic design, and frontend development.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { hoverText: "Redesigned live sites in Figma, including dark mode versions", img: "/images/choros-gfx/sailing-pass-1.webp", link: "/graphics#ojt-choros" },
                    {
                      hoverText: "Built and maintained sites with React, Laravel, and Tailwind CSS",
                      img: "/images/goodplumbing/goodplumbing.webp",
                      link: "/webdev#ojt-choros"
                    },
                    { text: "Handled responsiveness, QA, and bug fixes across projects" },
                    { hoverText: "Produced marketing graphics for client campaigns", img: "/images/choros-gfx/shane-bowden-1.webp", link: "/graphics#ojt-choros" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle weight="fill" className="text-accent w-4 h-4 mt-0.5 shrink-0" />
                      <div className="font-sans text-xs font-medium uppercase tracking-tight text-dark/80">
                        {item.link ? (
                          <Link to={item.link}
                            className="exp-hover-link text-dark/80 hover:text-accent transition-all cursor-pointer relative z-20 inline group/link"
                            onMouseEnter={() => {
                              setHoverImage(item.img);
                              setLastHoverImage(item.img);
                            }}
                            onMouseLeave={() => setHoverImage(null)}
                          >
                            <span className="group-hover/link:font-bold transition-all">{item.hoverText || item.text}</span>
                            {item.restText && <span> {item.restText}</span>}
                          </Link>
                        ) : (
                          <span>{item.text}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <span className="absolute -right-4 -bottom-4 font-sans font-black text-[12rem] text-dark/[0.02] pointer-events-none select-none">
                02
              </span>
            </div>

            {/* Experience Item 3: 2015 - 2023 */}
            <div className="exp-item opacity-0 translate-y-10 relative pl-8 md:pl-16 border-l-2 border-dark/5 pb-8 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-sans font-bold text-2xl text-dark uppercase tracking-tight">
                    Graphic & Digital Media Designer
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Briefcase size={14} className="text-accent" />
                    <span className="font-mono text-[10px] text-dark/80 uppercase tracking-widest">Various Clients</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-primary/50 self-start px-4 py-1.5 rounded-full border border-dark/10">
                  <Calendar size={14} className="text-dark/60" />
                  <span className="font-mono text-[10px] font-bold text-dark/80 tracking-widest">2015 – 2023</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-primary/90 p-6 rounded-[2rem] border border-dark/5 hover:border-accent/30 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-dark/5 will-change-transform">
                  <p className="font-mono text-[11px] text-dark leading-relaxed uppercase">
                    Eight years designing branding and visual content for local businesses, across print and digital.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    "Designed logos, layouts, and identity systems for local businesses",
                    "Created social media graphics and print materials for marketing campaigns"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle weight="fill" className="text-accent w-4 h-4 mt-0.5 shrink-0" />
                      <span className="font-sans text-xs font-medium text-dark uppercase tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <span className="absolute -right-4 -bottom-4 font-sans font-black text-[12rem] text-dark/[0.02] pointer-events-none select-none">
                03
              </span>
            </div>

            {/* Experience Item 4: Awards */}
            <div className="exp-item opacity-0 translate-y-10 relative pl-8 md:pl-16 border-l-2 border-dark/5 pb-8 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent group-hover:scale-125 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-sans font-bold text-2xl text-dark uppercase tracking-tight">
                    Awards & Recognitions
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Briefcase size={14} className="text-accent" />
                    <span className="font-mono text-[10px] text-dark/80 uppercase tracking-widest">LCC Bacolod</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-primary/50 self-start px-4 py-1.5 rounded-full border border-dark/10">
                  <Calendar size={14} className="text-dark/60" />
                  <span className="font-mono text-[10px] font-bold text-dark/80 tracking-widest">2025 – 2026</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-primary/90 p-6 rounded-[2rem] border border-dark/5 hover:border-accent/30 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-xl hover:shadow-dark/5 will-change-transform">
                  <p className="font-mono text-[11px] text-dark leading-relaxed uppercase">
                    Recognized for design and technical skills at school and industry events.
                  </p>
                </div>
                <div className="space-y-4">
                  {[
                    { hoverText: "Best Designer", restText: "for Capstone Project", img: "/images/drjas/drjas.webp", link: "/webdev", projectState: "Dr. Jas Pet Care" },
                    { text: "Best Designer, Batch 2025–2026" },
                    { hoverText: "UI/UX Figma Champion", restText: "for IT Month", img: "/images/LACO/laco.webp", link: "/uiux", projectState: "LACO Innovation Hub" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle weight="fill" className="text-accent w-4 h-4 mt-0.5 shrink-0" />
                      <div className="font-sans text-xs font-medium uppercase tracking-tight text-dark/80">
                        {item.link ? (
                          <Link to={item.link}
                            state={item.projectState ? { openProject: item.projectState } : {}}
                            className="exp-hover-link text-dark/80 hover:text-accent transition-all cursor-pointer relative z-20 inline group/link"
                            onMouseEnter={() => {
                              setHoverImage(item.img);
                              setLastHoverImage(item.img);
                            }}
                            onMouseLeave={() => setHoverImage(null)}
                          >
                            <span className="group-hover/link:font-bold transition-all">{item.hoverText || item.text}</span>
                            {item.restText && <span> {item.restText}</span>}
                          </Link>
                        ) : (
                          <span>{item.text}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <span className="absolute -right-4 -bottom-4 font-sans font-black text-[12rem] text-dark/[0.02] pointer-events-none select-none">
                04
              </span>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Experience;