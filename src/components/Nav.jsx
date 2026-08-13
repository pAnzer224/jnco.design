"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

import {
  House,
  PaintBrush,
  Devices,
  PenNib,
  EnvelopeSimple,
  List,
  X,
  Code
} from "@phosphor-icons/react";

const navLinks = [
  { id: "home", path: "/", label: "HOME", icon: House },
  { id: "graphic", path: "/graphics", label: "GRAPHICS", icon: PaintBrush },
  { id: "uiux", path: "/uiux", label: "UI / UX", icon: PenNib },
  { id: "webdev", path: "/webdev", label: "WEB DEV", icon: Code },
];

export default function Nav({ activePage, setActivePage }) {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef(null);
  const lightBgRef = useRef(null);
  const lightContentRef = useRef(null);

  // Handle scroll progress and conditional visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight - winHeight;

      // Reveal past 40% of viewport on home page, or always on other pages
      const isHomePage = pathname === "/";
      setIsVisible(!isHomePage || scrollTop > winHeight * 0.4);

      if (docHeight > 0) {
        // Adjust scroll progress to reach 100% at the socials section in the footer
        const scrollLimit = Math.max(0, docHeight - 450);
        const pct = scrollLimit > 0 ? Math.min(1, scrollTop / scrollLimit) : 1;
        setScrollPct(pct);
      } else {
        setScrollPct(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Per-frame clip-path calculation for light overlay on dark sections
  useEffect(() => {
    let ticking = false;
    const darkSelectors = ["#hero", "#tech-toolbox", "#philosophy"];
    const isResumePage = pathname === "/resume";

    const checkOverlap = () => {
      const nav = navRef.current;
      const lBg = lightBgRef.current;
      const lContent = lightContentRef.current;
      if (!nav || !lBg || !lContent) { ticking = false; return; }

      if (isResumePage) {
        const fullMask = "linear-gradient(to bottom, black 0%, black 100%)";
        lBg.style.clipPath = "none";
        lBg.style.WebkitMaskImage = fullMask;
        lBg.style.maskImage = fullMask;

        lContent.style.clipPath = "none";
        lContent.style.WebkitMaskImage = fullMask;
        lContent.style.maskImage = fullMask;

        ticking = false;
        return;
      }

      const navRect = nav.getBoundingClientRect();
      const navTop = navRect.top;
      const navBottom = navRect.bottom;
      const navHeight = navRect.height;

      let hasOverlap = false;
      let bestClipTop = 100;
      let bestClipBottom = 100;

      for (const sel of darkSelectors) {
        const el = document.querySelector(sel);
        if (!el) continue;
        const r = el.getBoundingClientRect();

        let elBottom = r.bottom;

        const overlapTop = Math.max(navTop, r.top);
        const overlapBottom = Math.min(navBottom, elBottom);

        if (overlapTop < overlapBottom) {
          hasOverlap = true;
          const clipTop = ((overlapTop - navTop) / navHeight) * 100;
          const clipBottom = ((navBottom - overlapBottom) / navHeight) * 100;
          bestClipTop = Math.min(bestClipTop, clipTop);
          bestClipBottom = Math.min(bestClipBottom, clipBottom);
        }
      }

      if (hasOverlap) {
        const mask = `linear-gradient(to bottom, 
          transparent calc(${bestClipTop}% - 4px), 
          black calc(${bestClipTop}% + 4px),  
          black calc(${100 - bestClipBottom}% - 4px), 
          transparent calc(${100 - bestClipBottom}% + 4px))`;

        lBg.style.clipPath = "none";
        lBg.style.WebkitMaskImage = mask;
        lBg.style.maskImage = mask;

        lContent.style.clipPath = "none";
        lContent.style.WebkitMaskImage = mask;
        lContent.style.maskImage = mask;
      } else {
        const hiddenMask = "linear-gradient(to bottom, transparent 0%, transparent 100%)";
        lBg.style.clipPath = "none";
        lBg.style.WebkitMaskImage = hiddenMask;
        lBg.style.maskImage = hiddenMask;

        lContent.style.clipPath = "none";
        lContent.style.WebkitMaskImage = hiddenMask;
        lContent.style.maskImage = hiddenMask;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkOverlap);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Handle GSAP animations for expanded/collapsed state elements
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Safety check to ensure elements exist in the DOM before animating
      const chars = document.querySelectorAll(".logo-char, .logo-char-light");
      const labels = document.querySelectorAll(".nav-label, .nav-label-light");
      if (!chars.length || !labels.length) return;

      if (isHovered && window.innerWidth >= 768) {
        gsap.to(".logo-char, .logo-char-light", {
          opacity: 1, x: 0, duration: 0.2, stagger: 0.03, ease: "power3.out", overwrite: true
        });
        gsap.to(".nav-label, .nav-label-light", {
          opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: "power3.out", delay: 0.05, overwrite: true
        });
      } else if (window.innerWidth >= 768) {
        gsap.to(".logo-char, .logo-char-light", {
          opacity: 0, x: -5, duration: 0.2, stagger: { amount: 0.1, from: "end" }, ease: "power3.inOut", overwrite: true
        });
        gsap.to(".nav-label, .nav-label-light", {
          opacity: 0, x: -8, duration: 0.2, stagger: { amount: 0.1, from: "start" }, ease: "power3.inOut", overwrite: true
        });
      }
    }, navRef);
    return () => ctx.revert();
  }, [isHovered]);

  // Handle Mobile Menu Animation
  const menuOverlayRef = useRef(null);


  useEffect(() => {
    if (!menuOverlayRef.current) return;

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuOverlayRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.fromTo(".mobile-nav-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuOverlayRef.current, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.4,
        ease: "power2.inOut"
      });
    }
  }, [isMobileMenuOpen]);

  const p = scrollPct * 100;
  const pStart = Math.max(0, p - 15);

  const easingClass = isHovered
    ? "ease-[cubic-bezier(0.215,0.61,0.355,1)]"
    : "ease-[cubic-bezier(0.645,0.045,0.355,1)]";

  const widthClass = isHovered ? "w-[11.5rem]" : "w-[4.5rem]";

  const handleContactClick = () => {
    if (window.opener && !window.opener.closed) {
      window.opener.postMessage({ type: "PORTFOLIO_NAV", path: "/#contact" }, window.location.origin);
      window.opener.focus();
      window.close();
      return;
    }
    if (setActivePage) setActivePage("contact");
    if (pathname !== "/") {
      router.push("/#contact");
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Listen for nav requests coming from a resume popup tab
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "PORTFOLIO_NAV" && e.data.path) {
        router.push(e.data.path);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  const isBookingPage = pathname === "/booking";
  if (isBookingPage) return null;

  // If this tab was opened as a popup (resume tab), clicking any nav
  // link tells the original portfolio tab to navigate there instead,
  // then closes this tab.
  const handleNavLinkClick = (e, path, id) => {
    if (window.opener && !window.opener.closed) {
      e.preventDefault();
      window.opener.postMessage({ type: "PORTFOLIO_NAV", path }, window.location.origin);
      window.opener.focus();
      window.close();
    } else {
      if (setActivePage) setActivePage(id);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden fixed top-6 right-6 z-[70] w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-500 ${isMobileMenuOpen ? "bg-accent text-primary rotate-90" : "bg-dark text-primary mix-blend-difference"
          } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12 pointer-events-none"}`}
      >
        {isMobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
      </button>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuOverlayRef}
        className="invisible opacity-0 fixed inset-0 z-[60] bg-dark flex flex-col p-8 md:hidden"
      >
        <div className="flex justify-between items-center mb-16">
          <div className="text-primary font-drama italic text-3xl">Juneco.</div>
        </div>

        <div className="flex flex-col gap-6 flex-1 justify-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || activePage === link.id;
            return (
              <Link
                key={link.id}
                href={link.path}
                onClick={(e) => {
                  if (window.opener && !window.opener.closed) {
                    e.preventDefault();
                    window.opener.postMessage({ type: "PORTFOLIO_NAV", path: link.path }, window.location.origin);
                    window.opener.focus();
                    window.close();
                    return;
                  }
                  if (setActivePage) setActivePage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`mobile-nav-item flex items-center gap-6 group`}
              >
                <div className={`p-4 rounded-2xl transition-colors duration-300 ${isActive ? "bg-accent text-primary" : "bg-primary/10 text-primary/60"}`}>
                  <link.icon size={32} weight="duotone" />
                </div>
                <span className={`text-4xl sm:text-5xl font-sans font-black tracking-tighter uppercase transition-colors duration-300 ${isActive ? "text-accent" : "text-primary hover:text-accent"}`}>
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mobile-nav-item mt-auto">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (window.opener && !window.opener.closed) {
                window.opener.postMessage({ type: "PORTFOLIO_NAV", path: "/#contact" }, window.location.origin);
                window.opener.focus();
                window.close();
                return;
              }
              if (setActivePage) setActivePage("contact");
              if (pathname !== "/") {
                router.push("/#contact");
              } else {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="w-full bg-primary text-dark py-6 rounded-3xl font-sans font-bold uppercase tracking-widest text-lg flex items-center justify-center gap-4 hover:bg-accent hover:text-primary transition-colors duration-300"
          >
            <EnvelopeSimple size={24} weight="fill" />
            Contact Me
          </button>
        </div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <nav
        ref={navRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col justify-between pt-8 pb-5 rounded-[2rem] transition-all duration-700 shadow-2xl overflow-hidden ${easingClass} ${widthClass} ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12 pointer-events-none"
          }`}
      >
        {/* Scroll-Driven Gradient Border Layer */}
        <div className="absolute inset-0 pointer-events-none rounded-[2rem] overflow-hidden p-[2px] transition-all duration-700">
          <div
            className="absolute inset-0 z-0"
            style={{
              background: `linear-gradient(to bottom, transparent ${pStart}%, var(--color-accent, #E63B2E) ${p}%, transparent ${p}%)`
            }}
          />
          {/* Default dark background */}
          <div className="absolute inset-[2px] bg-dark rounded-[calc(2rem-2px)] z-10" />
        </div>

        {/* Light background overlay â€” clipped to dark-section overlap */}
        <div
          ref={lightBgRef}
          className="absolute inset-[2px] rounded-[calc(2rem-2px)] z-[15]"
          style={{
            backgroundColor: "rgba(232, 228, 221, 0.97)",
            maskImage: "linear-gradient(to bottom, transparent 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 100%)"
          }}
        />

        {/* ===== DARK THEME CONTENT (default â€” interactive) ===== */}
        <div className="relative z-20 flex flex-col h-full w-full gap-8">

          {/* Logo */}
          <div className="w-full h-10 flex items-center overflow-hidden px-6 shrink-0">
            <div className="flex items-center text-primary font-drama italic tracking-tighter text-3xl select-none">
              <div className="w-[24px] flex justify-center shrink-0">
                <span className="shrink-0 tracking-normal">J</span>
              </div>
              <span className="flex -ml-2.5">
                {["u", "n", "e", "c", "o", "."].map((char, i) => (
                  <span key={i} className="logo-char opacity-0 -translate-x-1 inline-block">
                    {char}
                  </span>
                ))}
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col w-full gap-4 shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || activePage === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.path}
                  className="group relative flex items-center w-full px-6 h-10 cursor-pointer overflow-hidden"
                  onClick={(e) => handleNavLinkClick(e, link.path, link.id)}
                >
                  <div className={`w-[24px] flex justify-center shrink-0 transition-colors duration-300 ${isActive ? "text-accent" : "text-primary/70 group-hover:text-accent"}`}>
                    <link.icon size={24} weight="duotone" />
                  </div>
                  <span className={`nav-label ml-4 text-[12px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 transition-colors duration-300 ${isActive ? "bg-accent text-background py-0.5 " : "text-primary/70 group-hover:text-accent py-0.5 bg-transparent px-2"
                    }`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Contact Button */}
          <div className="w-full px-4 shrink-0 mt-2">
            <button
              onClick={handleContactClick}
              className="group relative flex items-center w-full h-[40px] rounded-full bg-primary text-dark hover:bg-accent hover:text-primary transition-colors duration-300 overflow-hidden"
            >
              <div className="w-[40px] flex items-center justify-center shrink-0 h-full">
                <EnvelopeSimple size={20} weight="fill" />
              </div>
              <span className="nav-label font-bold uppercase tracking-widest text-[11px] whitespace-nowrap opacity-0">
                Contact Me
              </span>
            </button>
          </div>

        </div>

        {/* ===== LIGHT THEME CONTENT (overlay â€” visual only, clipped to dark sections) ===== */}
        <div
          ref={lightContentRef}
          className="absolute inset-0 z-30 pointer-events-none pt-8 pb-5"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, transparent 100%)"
          }}
        >
          <div className="flex flex-col h-full w-full gap-8">

            {/* Logo (light variant) */}
            <div className="w-full h-10 flex items-center overflow-hidden px-6 shrink-0">
              <div className="flex items-center text-dark font-drama italic tracking-tighter text-3xl select-none">
                <div className="w-[24px] flex justify-center shrink-0">
                  <span className="shrink-0 tracking-normal">J</span>
                </div>
                <span className="flex -ml-2.5">
                  {["u", "n", "e", "c", "o", "."].map((char, i) => (
                    <span key={i} className="logo-char-light opacity-0 -translate-x-1 inline-block">
                      {char}
                    </span>
                  ))}
                </span>
              </div>
            </div>

            {/* Nav Links (light variant) */}
            <div className="flex flex-col w-full gap-4 shrink-0">
              {navLinks.map((link) => {
                const isActive = pathname === link.path || activePage === link.id;
                return (
                  <div
                    key={link.id}
                    className="group relative flex items-center w-full px-6 h-10 overflow-hidden"
                  >
                    <div className={`w-[24px] flex justify-center shrink-0 ${isActive ? "text-accent" : "text-dark/70"}`}>
                      <link.icon size={24} weight="duotone" />
                    </div>
                    <span className={`nav-label-light ml-4 text-[12px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 ${isActive ? "bg-accent text-background py-0.5" : "text-dark/70 py-0.5 bg-transparent px-2"
                      }`}>
                      {link.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Contact Button (light variant) */}
            <div className="w-full px-4 shrink-0 mt-2">
              <div className="flex items-center w-full h-[40px] rounded-full bg-dark text-primary overflow-hidden">
                <div className="w-[40px] flex items-center justify-center shrink-0 h-full">
                  <EnvelopeSimple size={20} weight="fill" />
                </div>
                <span className="nav-label-light font-bold uppercase tracking-widest text-[11px] whitespace-nowrap opacity-0">
                  Contact Me
                </span>
              </div>
            </div>

          </div>
        </div>

      </nav>
    </>
  );
}
