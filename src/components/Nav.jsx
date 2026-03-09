import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import {
  House,
  PaintBrush,
  Devices,
  PenNib,
  EnvelopeSimple,
  List,
  X
} from "@phosphor-icons/react";

const navLinks = [
  { id: "home", path: "/", label: "HOME", icon: House },
  { id: "graphic", path: "/graphics", label: "GRAPHICS", icon: PaintBrush },
  { id: "mockups", path: "/mockups", label: "MOCKUPS", icon: Devices },
  { id: "uiux", path: "/uiux", label: "UI / UX", icon: PenNib },
];

export default function Nav({ activePage, setActivePage }) {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);

  // Handle scroll progress and conditional visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.body.scrollHeight - winHeight;

      // Reveal past 40% of viewport on home page, or always on other pages
      const isHomePage = location.pathname === "/";
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
  }, [location.pathname]);

  // Handle GSAP animations for expanded/collapsed state elements
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isHovered && window.innerWidth >= 768) {
        gsap.to(".logo-char", {
          opacity: 1, x: 0, duration: 0.2, stagger: 0.03, ease: "power3.out", overwrite: true
        });
        gsap.to(".nav-label", {
          opacity: 1, x: 0, duration: 0.3, stagger: 0.04, ease: "power3.out", delay: 0.05, overwrite: true
        });
      } else if (window.innerWidth >= 768) {
        gsap.to(".logo-char", {
          opacity: 0, x: -5, duration: 0.2, stagger: { amount: 0.1, from: "end" }, ease: "power3.inOut", overwrite: true
        });
        gsap.to(".nav-label", {
          opacity: 0, x: -8, duration: 0.2, stagger: { amount: 0.1, from: "start" }, ease: "power3.inOut", overwrite: true
        });
      }
    }, navRef);
    return () => ctx.revert();
  }, [isHovered]);

  // Handle Mobile Menu Animation
  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);

  useEffect(() => {
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

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`md:hidden fixed top-6 right-6 z-[70] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${isMobileMenuOpen ? "bg-accent text-primary rotate-90" : "bg-dark text-primary"
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
            const isActive = location.pathname === link.path || activePage === link.id;
            return (
              <Link
                key={link.id}
                to={link.path}
                onClick={() => {
                  if (setActivePage) setActivePage(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`mobile-nav-item flex items-center gap-6 group`}
              >
                <div className={`p-4 rounded-2xl transition-colors duration-300 ${isActive ? "bg-accent text-primary" : "bg-primary/10 text-primary/60"}`}>
                  <link.icon size={32} weight="duotone" />
                </div>
                <span className={`text-5xl font-sans font-black tracking-tighter uppercase transition-colors duration-300 ${isActive ? "text-accent" : "text-primary hover:text-accent"}`}>
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
              if (setActivePage) setActivePage("contact");
              if (location.pathname !== "/") {
                navigate("/");
                setTimeout(() => {
                  gsap.to(window, { duration: 1.2, scrollTo: "#contact", ease: "power3.inOut" });
                }, 500);
              } else {
                gsap.to(window, { duration: 1.2, scrollTo: "#contact", ease: "power3.inOut" });
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
        className={`hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col justify-between py-8 rounded-[2rem] transition-all duration-700 shadow-2xl ${easingClass} ${widthClass} ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12 pointer-events-none"
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
          <div className="absolute inset-[2px] bg-dark/95 rounded-[calc(2rem-2px)] backdrop-blur-xl z-10" />
        </div>

        <div className="relative z-20 flex flex-col h-full w-full gap-8">

          {/* Section 1: Logo */}
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


          {/* Section 2: Nav Links */}
          <div className="flex flex-col w-full gap-4 shrink-0">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || activePage === link.id;

              return (
                <Link
                  key={link.id}
                  to={link.path}
                  className="group relative flex items-center w-full px-6 h-10 cursor-pointer overflow-hidden"
                  onClick={() => setActivePage && setActivePage(link.id)}
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

          {/* Section 3: Contact Trigger */}
          <div className="w-full px-4 shrink-0 mt-2">
            <button
              onClick={() => {
                if (setActivePage) setActivePage("contact");
                if (location.pathname !== "/") {
                  navigate("/");
                  setTimeout(() => {
                    gsap.to(window, { duration: 1.2, scrollTo: "#contact", ease: "power3.inOut" });
                  }, 500);
                } else {
                  gsap.to(window, { duration: 1.2, scrollTo: "#contact", ease: "power3.inOut" });
                }
              }}
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
      </nav>
    </>
  );
}
