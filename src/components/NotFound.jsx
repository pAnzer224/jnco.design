import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

export default function NotFound({ setActivePage }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const codeRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      codeRef.current,
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9 }
    )
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        btnRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );
  }, []);

  const handleGoHome = () => {
    setActivePage("home");
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-background text-dark relative overflow-hidden px-6"
    >
      {/* Background decorative glyphs */}
      <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
        <span className="font-sans font-black text-[40vw] leading-none tracking-tighter text-dark">
          404
        </span>
      </div>

      {/* Noise overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04]">
        <svg className="w-full h-full">
          <filter id="nf404">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#nf404)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">
        {/* 404 code */}
        <div
          ref={codeRef}
          className="font-sans font-black text-[10rem] sm:text-[14rem] leading-none tracking-tighter text-dark mb-2 opacity-0"
          style={{ letterSpacing: "-0.06em" }}
        >
          <span>4</span>
          <span className="text-accent">0</span>
          <span>4</span>
        </div>

        {/* Message */}
        <div ref={textRef} className="opacity-0 mb-10">
          <div className="font-mono text-xs sm:text-sm uppercase tracking-[3px] text-dark/50 font-bold mb-3">
            Page not found
          </div>
          <p className="font-sans text-base sm:text-lg text-dark/70 leading-relaxed">
            Looks like this page wandered off. It doesn't exist&nbsp;—&nbsp;or maybe it never did.
          </p>
        </div>

        {/* Back button */}
        <button
          ref={btnRef}
          onClick={handleGoHome}
          id="back-to-home-btn"
          className="opacity-0 group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-dark text-primary font-mono text-xs uppercase tracking-[2px] font-bold transition-all duration-300 hover:bg-accent hover:scale-105 hover:shadow-[0_0_40px_rgba(0,0,0,0.15)] border border-dark/10"
        >
          <ArrowLeft
            size={18}
            weight="bold"
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          Back to Index
        </button>
      </div>
    </section>
  );
}
