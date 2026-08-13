"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  LinkedinLogo,
  X,
  ArrowsHorizontal,
} from "@phosphor-icons/react";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const graphicRef = useRef(null);
  const uiuxWrapRef = useRef(null);
  const linkedinBtnRef = useRef(null);
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [isMobileView, setIsMobileView] = useState(false);
  const [hoveredHeroImg, setHoveredHeroImg] = useState(null);
  const router = useRouter();

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
          transformOrigin: "left center",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: "power4.out",
        },
      );

      tl.addLabel("uiuxIn", "-=0.1");

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
        "uiuxIn",
      );

      tl.set(".uiux-cursor", { left: "0%", opacity: 1 }, "uiuxIn");
      tl.to(
        ".uiux-highlight-bg",
        { scaleX: 1, duration: 0.8, ease: "sine.inOut" },
        "uiuxIn",
      );
      tl.to(
        ".uiux-cursor",
        { left: "89%", duration: 0.8, ease: "sine.inOut" },
        "uiuxIn",
      );
      tl.to(
        ".uiux-cursor",
        { opacity: 0, duration: 0.35, ease: "power1.out" },
        "uiuxIn+=0.75",
      );
      // Keep the icons fully hidden until their reveal moment
      tl.set([".hero-pop-shadow", ".hero-pop-img"], { opacity: 0, force3D: true }, 0);
      // Snap to visible (no fade) right as the slide begins
      tl.set([".hero-pop-shadow", ".hero-pop-img"], { opacity: 1 }, "uiuxIn+=0.6");
      tl.fromTo(
        ".hero-pop-shadow",
        { y: 80 },
        {
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          force3D: true,
        },
        "uiuxIn+=0.6",
      );
      tl.fromTo(
        ".hero-pop-img",
        { y: 80 },
        {
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.out",
          force3D: true,
        },
        "uiuxIn+=0.6",
      );

      // Only let the cursor tooltip trigger once the icons have fully appeared
      tl.set(".hero-pop-wrap", { pointerEvents: "auto" }, "uiuxIn+=1.2");
      const filterVars = { scale: 50, freq: 0.05 };
      tl.addLabel("graphicIn", "uiuxIn+=0.3");
      tl.fromTo(
        graphicRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.inOut" },
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

      // Scroll indicator - only appears once everything else has settled in
      tl.fromTo(
        ".scroll-indicator",
        { opacity: 0, y: -8 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "+=1.5",
      );

      gsap.to(".scroll-dot", {
        y: 14,
        opacity: 0,
        duration: 1.2,
        repeat: -1,
        ease: "power1.in",
        delay: 3.5,
      });

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

  const uiuxText = "UI/UX";

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100dvh] flex items-center justify-center px-4 sm:px-8 overflow-hidden bg-dark transition-all duration-300"
      id="hero"
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
        className="absolute left-0 top-0 w-[800px] aspect-square rounded-full pointer-events-none z-0 opacity-40 mix-blend-screen"
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

      <div className="relative z-10 w-full text-primary flex flex-col items-start md:items-center justify-center">
        <h1 className="sr-only">Juneco Mirande — Frontend Developer & UI/UX Designer in the Philippines. Bridging the gap between aesthetic design and robust React architectures.</h1>
        <div className="flex flex-col items-start w-fit">
          <div className="font-sans font-black tracking-tighter leading-[0.85] flex flex-col justify-start uppercase" style={{ fontSize: 'clamp(3.5rem, 6.5vw, 6rem)' }} aria-hidden="true">
            <span className="text-primary font-mono font-bold not-italic tracking-[0.2em] mb-4 hero-intro opacity-0 translate-y-10 whitespace-nowrap" style={{ fontSize: '0.25em' }}>
              Hey, I'm Juneco
            </span>
            <div className="grid">
              <span className="relative inline-flex items-center italic leading-[0.85] uiux-highlight-wrap">              <span className="absolute top-0 bottom-0 left-0 w-[89%] bg-accent uiux-highlight-bg origin-left scale-x-0" />
                <span className="relative z-10 text-background py-0.5">
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
                <ArrowsHorizontal
                  weight="bold"
                  className="uiux-cursor absolute z-20 top-1/2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary opacity-0 pointer-events-none drop-shadow-md"
                  style={{ left: 0, transform: "translate(-50%, -35%)" }}
                />
                <div className="absolute bottom-0 right-0 pointer-events-none overflow-hidden" style={{ height: '2.167em', transform: 'translateX(-0.4em)' }}>
                  <div className="grid h-full justify-items-end items-end">
                    <div className="col-start-1 row-start-1 flex items-end">
                      {[
                        { src: "graphics", shadow: "graphics2" },
                        { src: "phone", shadow: "phone2" },
                        { src: "tablet", shadow: "tablet2" },
                      ].map((item, i) => (
                        <div
                          key={`shadow-${item.src}`}
                          className={`relative origin-bottom transition-transform duration-300 pointer-events-none ${hoveredHeroImg === item.src ? 'scale-[1.04] translate-y-[1%]' : ''}`}
                          style={{ height: '1.333em', marginLeft: i === 0 ? 0 : i === 1 ? '-0.375em' : '-0.208em' }}
                        >
                          <img
                            src={`/images/hero/${item.shadow}.webp`}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className={`hero-pop-shadow hero-pop-${i + 1} z-0 w-auto h-full object-contain`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-start-1 row-start-1 flex items-end">
                      {[
                        { src: "graphics", alt: "Graphic design work", category: "Graphic Design", icon: "Palette", to: "/graphics/" },
                        { src: "phone", alt: "Mobile UI work", category: "UI/UX", icon: "DeviceMobile", to: "/uiux" },
                        { src: "tablet", alt: "Tablet UI work", category: "Web Dev", icon: "Code", to: "/webdev" },
                      ].map((item, i) => (
                        <Link
                          href={item.to}
                          key={`main-${item.src}`}
                          className={`hero-pop-wrap block relative cursor-pointer origin-bottom transition-transform duration-300 pointer-events-none ${hoveredHeroImg === item.src ? 'scale-[1.04] translate-y-[1%]' : ''}`}
                          style={{ height: '1.333em', marginLeft: i === 0 ? 0 : i === 1 ? '-0.375em' : '-0.208em' }}
                          data-cursor-text={item.category}
                          data-cursor-icon={item.icon}
                          onMouseEnter={() => setHoveredHeroImg(item.src)}
                          onMouseLeave={() => setHoveredHeroImg(null)}
                        >
                          <img
                            src={`/images/hero/${item.src}.webp`}
                            alt={item.alt}
                            loading="lazy"
                            className={`hero-pop-img hero-pop-${i + 1} z-10 w-auto h-full object-contain pointer-events-none`}
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </span>
              <span
                ref={graphicRef}
                className="text-gradient-graphic -mt-[0.1em] displacement-text opacity-0 leading-[1] py-2 pr-4 -mr-4" style={{ fontSize: '0.683em' }}            >
                & Graphic{" "}
                Designer
              </span>
            </div>
          </div>
          <p className="mt-8 font-mono text-[11px] md:text-xs lg:text-sm uppercase tracking-[0.15em] text-primary text-left md:text-center hero-desc opacity-0 translate-y-10 w-0 min-w-full">
            An award-winning designer creating intuitive{" "}
            interfaces and striking visuals{" "}
            that help brands tell their story.{" "}
            Let's build something meaningful together.
          </p>
        </div>
        <div className="flex items-center justify-start md:justify-center flex-wrap gap-3 mt-8 sm:mt-12 w-full">
          <div className="hero-btn opacity-0 translate-y-10">
            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative overflow-hidden bg-primary text-dark font-sans font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full flex items-center gap-4 hover:scale-[1.03] transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:outline-none"
            >
              <span className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                Hire Me
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
                                width="80"
                                height="20"
                                loading="lazy"
                                className="h-4 w-auto brightness-0 invert opacity-90"
                              />
                            </div>
                            <div className="p-5">
                              <img
                                src="/images/avatars/linkedin-avatar.webp"
                                alt="Juneco Mirande"
                                width="64"
                                height="64"
                                loading="lazy"
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
                              width="80"
                              height="20"
                              loading="lazy"
                              className="h-4 w-auto brightness-0 invert opacity-90"
                            />
                          </div>
                          <div className="p-5">
                            <img
                              src="/images/avatars/linkedin-avatar.webp"
                              alt="Juneco Mirande"
                              width="64"
                              height="64"
                              loading="lazy"
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

      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-0 pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary/50">
          Scroll
        </span>
        <div className="relative w-[22px] h-[36px] rounded-full border border-primary/30 flex justify-center pt-2">
          <span className="scroll-dot w-1 h-1.5 rounded-full bg-primary/70" />
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
