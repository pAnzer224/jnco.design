import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  LinkedinLogo,
  X,
  FigmaLogo,
  PaintBrush,
  TerminalWindow,
  Cube,
} from "@phosphor-icons/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import CardSwap, { Card } from "./CardSwap";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const graphicRef = useRef(null);
  const cardSwapRef = useRef(null);
  const linkedinBtnRef = useRef(null);
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();

  const openLinkedIn = () => {
    if (!isMobileView && linkedinBtnRef.current) {
      const rect = linkedinBtnRef.current.getBoundingClientRect();
      setPopupPos({ top: rect.top, left: rect.left + rect.width / 2 });
    }
    setShowLinkedIn(true);
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobileView(mq.matches);
    const handler = (e) => setIsMobileView(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.set(glowRef.current, { xPercent: -50, yPercent: -50 });

      const tl = gsap.timeline({ delay: 0.5 });

      const isMobile = window.innerWidth < 768;
      tl.fromTo(
        ".hero-intro",
        {
          opacity: 0,
          y: 20,
          scale: isMobile ? 1.5 : 1,
          transformOrigin: isMobile ? "center center" : "left center",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "power4.out",
        },
      );

      tl.fromTo(
        ".uiux-char",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.07,
          stagger: 0.04,
          ease: "back.out(1.7)",
        },
        "-=0.1",
      );

      const filterVars = { scale: 50, freq: 0.05 };
      tl.addLabel("graphicIn", "-=0.4");
      tl.fromTo(
        graphicRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.inOut" },
        "graphicIn",
      );

      tl.fromTo(
        cardSwapRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.inOut" },
        "graphicIn",
      );

      tl.to(
        filterVars,
        {
          scale: 0,
          freq: 0,
          duration: 2,
          ease: "power3.inOut",
          onUpdate: () => {
            const dispMap = document.querySelector(
              "#displacementFilter feDisplacementMap",
            );
            const turb = document.querySelector(
              "#displacementFilter feTurbulence",
            );
            if (dispMap) dispMap.setAttribute("scale", filterVars.scale);
            if (turb) turb.setAttribute("baseFrequency", filterVars.freq);
          },
        },
        "-=1.5",
      );

      gsap.to(".text-gradient-graphic", {
        backgroundPosition: "100% 0%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      tl.to(
        ".hero-desc",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=1",
      );

      tl.to(
        ".hero-btn",
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8",
      );

      const handleMouseEnter = () => {
        gsap.to(glowRef.current, {
          scale: 1.5,
          opacity: 0.8,
          duration: 1.5,
          ease: "power3.out",
        });
      };
      const handleMouseLeave = () => {
        gsap.to(glowRef.current, {
          scale: 1,
          opacity: 0.4,
          x: sectionRef.current.offsetWidth / 2,
          y: sectionRef.current.offsetHeight / 2,
          duration: 1.5,
          ease: "power3.out",
        });
      };
      const handleMouseMove = (e) => {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.to(glowRef.current, {
          x: x,
          y: y,
          duration: 1,
          ease: "power2.out",
        });
      };

      const section = sectionRef.current;
      if (section) {
        section.addEventListener("mouseenter", handleMouseEnter);
        section.addEventListener("mouseleave", handleMouseLeave);
        section.addEventListener("mousemove", handleMouseMove);

        gsap.set(glowRef.current, {
          x: section.offsetWidth / 2,
          y: section.offsetHeight / 2,
        });
      }

      return () => {
        if (section) {
          section.removeEventListener("mouseenter", handleMouseEnter);
          section.removeEventListener("mouseleave", handleMouseLeave);
          section.removeEventListener("mousemove", handleMouseMove);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (showLinkedIn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showLinkedIn]);

  const uiuxText = "UI/UX &";

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] flex items-end justify-center md:justify-start pb-20 md:pb-32 px-4 sm:px-8 md:px-16 md:pl-[120px] lg:pl-[140px] overflow-hidden bg-dark transition-all duration-300"
    >
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
      >
        <filter id="displacementFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        ref={glowRef}
        className="absolute left-0 top-0 w-[500px] md:w-[800px] aspect-square rounded-full pointer-events-none z-0 opacity-40 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(245,243,238,0.25) 0%, transparent 70%)' }}
      />

      <div
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #E8E4DD 1px, transparent 1.5px)",
          backgroundSize: "6px 6px",
        }}
      />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-dark via-dark/40 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full text-primary flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="sr-only">Juneco Mirande — Frontend Developer & UI/UX Designer in the Philippines. Bridging the gap between aesthetic design and robust React architectures.</h1>
        <div className="font-sans font-black text-6xl md:text-8xl tracking-tighter leading-[0.85] flex flex-col justify-center md:justify-start uppercase" aria-hidden="true">
          <span className="text-primary font-mono font-bold not-italic text-[12px] sm:text-[14px] md:text-2xl tracking-[0.3em] mb-4 hero-intro opacity-0 translate-y-10 whitespace-nowrap">
            Hey, I'm Juneco
          </span>
          <span className="text-accent italic leading-[0.85]">
            {uiuxText.split("").map((char, i) =>
              char === " " ? (
                <span key={i}>&nbsp;</span>
              ) : (
                <span key={i} className="uiux-char inline-block opacity-0">
                  {char}
                </span>
              ),
            )}
          </span>
          <span
            ref={graphicRef}
            className="text-gradient-graphic text-4xl sm:text-5xl md:text-7xl -mt-[0.1em] displacement-text opacity-0 italic leading-[1] py-2 pr-6"
          >
            Graphic{" "}
            <br className="hidden min-[1045px]:block min-[1301px]:hidden" />
            Designer
          </span>
        </div>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-primary/60 max-w-xl border-l-2 border-accent pl-4 hero-desc opacity-0 translate-y-10">
          An award-winning designer creating intuitive{" "}
          <br className="hidden min-[1045px]:block min-[1301px]:hidden" />
          interfaces and striking visuals{" "}
          <br className="hidden min-[1045px]:block min-[1301px]:hidden" />
          that help brands tell their story.{" "}
          <br className="hidden min-[1045px]:block min-[1301px]:hidden" />
          Let's build something meaningful together.
        </p>
        <div className="flex items-center flex-wrap gap-3 mt-8 sm:mt-12">
          <div className="hero-btn opacity-0 translate-y-10">
            <button
              onClick={() => {
                document
                  .getElementById("work-archive")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative overflow-hidden bg-primary text-dark font-sans font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full flex items-center gap-4 hover:scale-[1.03] transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:outline-none"
            >
              <span className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                View Archive
              </span>
              <ArrowRight
                weight="bold"
                className="relative z-10 w-4 h-4 group-hover:text-primary transition-colors duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>

          <div className={`hero-btn opacity-0 translate-y-10 relative`}>
            <button
              ref={linkedinBtnRef}
              onClick={openLinkedIn}
              className="group relative overflow-hidden border border-primary/30 text-primary font-sans font-bold uppercase tracking-widest text-xs w-12 h-12 rounded-full flex items-center justify-center hover:scale-[1.03] hover:border-[#0A66C2] hover:text-[#0A66C2] transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:outline-none"
              aria-label="Toggle LinkedIn Profile"
              title="View LinkedIn Profile"
            >
              <LinkedinLogo weight="bold" className="w-5 h-5" />
            </button>

            {showLinkedIn && (
              <>
                {createPortal(
                  <div
                    className="fixed inset-0 z-[10002] bg-black/80 animate-[fadeIn_0.2s_ease-out]"
                    onClick={() => setShowLinkedIn(false)}
                  />,
                  document.body,
                )}

                {isMobileView
                  ? createPortal(
                      <div className="fixed inset-0 z-[10003] flex items-center justify-center px-4 pointer-events-none">
                        <div className="pointer-events-auto w-full max-w-[340px]">
                          <div className="animate-[scaleIn_0.25s_ease-out] origin-bottom">
                            <div className="relative bg-[#0F0F0F] rounded-xl shadow-2xl overflow-hidden border border-white/10">
                              <button
                                onClick={() => setShowLinkedIn(false)}
                                className="absolute top-2 right-2 w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors duration-200 text-white/50 hover:text-white z-10"
                                aria-label="Close"
                              >
                                <X weight="bold" className="w-4 h-4" />
                              </button>
                              <div className="bg-[#1C2329] px-5 py-3 border-b border-white/5">
                                <img
                                  src="/images/logos/LinkedIn_logo.svg"
                                  alt="LinkedIn"
                                  className="h-4 w-auto brightness-0 invert opacity-90"
                                />
                              </div>
                              <div className="p-5">
                                <img
                                  src="/images/avatars/linkedin-avatar.webp"
                                  alt="Juneco Mirande"
                                  className="w-16 h-16 rounded-full border border-white/10 mb-3 object-cover shadow-sm bg-gray-800"
                                />
                                <a
                                  href="https://www.linkedin.com/in/juneco-mirande/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white font-sans font-semibold text-[17px] leading-tight hover:text-[#0A66C2] hover:underline transition-colors block w-max"
                                >
                                  Juneco Mirande
                                </a>
                                <p className="text-white/80 font-sans text-[12px] mt-1.5 leading-relaxed">
                                  Frontend Developer & UI/UX Designer · React ·
                                  Next.js · Figma · Adobe Photoshop
                                </p>
                                <p className="text-white/40 font-sans text-[11px] mt-3 leading-snug">
                                  Self-Employed | La Consolacion College -
                                  Bacolod
                                </p>
                                <a
                                  href="https://www.linkedin.com/in/juneco-mirande/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-5 inline-block px-5 py-1.5 rounded-full border border-white/50 text-white/90 font-sans text-[14px] font-medium hover:border-white hover:text-white hover:bg-white/5 transition-all duration-200"
                                >
                                  View profile
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>,
                      document.body,
                    )
                  : createPortal(
                      <div
                        className="fixed z-[10003] w-[340px] pointer-events-none"
                        style={{
                          top: popupPos.top - 8,
                          left: popupPos.left,
                          transform: "translate(-50%, -100%)",
                        }}
                      >
                        <div className="pointer-events-auto animate-[scaleIn_0.25s_ease-out] origin-bottom">
                          <div className="relative bg-[#0F0F0F] rounded-xl shadow-2xl overflow-hidden border border-white/10">
                            <button
                              onClick={() => setShowLinkedIn(false)}
                              className="absolute top-2 right-2 w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors duration-200 text-white/50 hover:text-white z-10"
                              aria-label="Close"
                            >
                              <X weight="bold" className="w-4 h-4" />
                            </button>
                            <div className="bg-[#1C2329] px-5 py-3 border-b border-white/5">
                              <img
                                src="/images/logos/LinkedIn_logo.svg"
                                alt="LinkedIn"
                                className="h-4 w-auto brightness-0 invert opacity-90"
                              />
                            </div>
                            <div className="p-5">
                              <img
                                src="/images/avatars/linkedin-avatar.webp"
                                alt="Juneco Mirande"
                                className="w-16 h-16 rounded-full border border-white/10 mb-3 object-cover shadow-sm bg-gray-800"
                              />
                              <a
                                href="https://www.linkedin.com/in/juneco-mirande/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white font-sans font-semibold text-[17px] leading-tight hover:text-[#0A66C2] hover:underline transition-colors block w-max"
                              >
                                Juneco Mirande
                              </a>
                              <p className="text-white/80 font-sans text-[12px] mt-1.5 leading-relaxed">
                                Frontend Developer & UI/UX Designer · React ·
                                Next.js · Figma · Adobe Photoshop
                              </p>
                              <p className="text-white/40 font-sans text-[11px] mt-3 leading-snug">
                                Self-Employed | La Consolacion College - Bacolod
                              </p>
                              <a
                                href="https://www.linkedin.com/in/juneco-mirande/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-block px-5 py-1.5 rounded-full border border-white/50 text-white/90 font-sans text-[14px] font-medium hover:border-white hover:text-white hover:bg-white/5 transition-all duration-200"
                              >
                                View profile
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>,
                      document.body,
                    )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="hidden min-[1045px]:block absolute z-0 bottom-10 right-10">
        <div ref={cardSwapRef} className="opacity-0 translate-y-10">
          <CardSwap
            width={480}
            height={540}
            cardDistance={70}
            verticalDistance={80}
            delay={2800}
            pauseOnHover={true}
            skewAmount={5}
          >
            <Card
              onClick={() => navigate("/graphics")}
              className="cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{
                  backgroundImage: "url('/images/poster-making/fb-meta-ads.webp')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 h-full p-6 flex flex-col">
                <span className="absolute top-4 left-6 font-mono text-[10px] text-primary/40 tracking-widest font-bold">
                  01
                </span>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <PaintBrush
                    size={28}
                    weight="duotone"
                    className="text-accent"
                  />
                  <h4 className="font-sans font-bold text-xl text-primary uppercase tracking-tight">
                    Graphic Design
                  </h4>
                </div>
              </div>
            </Card>
            <Card
              onClick={() => navigate("/uiux")}
              className="cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/backgrounds/uiux-bg.webp')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 h-full p-6 flex flex-col">
                <span className="absolute top-4 left-6 font-mono text-[10px] text-primary/40 tracking-widest font-bold">
                  02
                </span>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <FigmaLogo
                    size={28}
                    weight="duotone"
                    className="text-accent"
                  />
                  <h4 className="font-sans font-bold text-xl text-primary uppercase tracking-tight">
                    UI/UX
                  </h4>
                </div>
              </div>
            </Card>
            <Card
              onClick={() => navigate("/mockups")}
              className="cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/backgrounds/mockups-bg.webp')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 h-full p-6 flex flex-col">
                <span className="absolute top-4 left-6 font-mono text-[10px] text-primary/40 tracking-widest font-bold">
                  03
                </span>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <Cube size={28} weight="duotone" className="text-accent" />
                  <h4 className="font-sans font-bold text-xl text-primary uppercase tracking-tight">
                    Mockups
                  </h4>
                </div>
              </div>
            </Card>
            <Card
              onClick={() => navigate("/webdev")}
              className="cursor-pointer overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-50"
                style={{ backgroundImage: "url('/images/backgrounds/webdev-bg.webp')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 h-full p-6 flex flex-col">
                <span className="absolute top-4 left-6 font-mono text-[10px] text-primary/40 tracking-widest font-bold">
                  04
                </span>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <TerminalWindow
                    size={28}
                    weight="duotone"
                    className="text-accent"
                  />
                  <h4 className="font-sans font-bold text-xl text-primary uppercase tracking-tight">
                    Web Dev
                  </h4>
                </div>
              </div>
            </Card>
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
