import React, { useEffect, useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import gsap from "gsap";

const HeroSection = () => {
    const sectionRef = useRef(null);
    const glowRef = useRef(null);
    const graphicRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.set(glowRef.current, { xPercent: -50, yPercent: -50 });

            // Entrance animation for the hero text
            const tl = gsap.timeline({ delay: 0.5 });

            // 1. First, the introduction "Hey, I'm Juneco"
            const isMobile = window.innerWidth < 768;
            tl.fromTo(".hero-intro",
                {
                    opacity: 0,
                    y: 20,
                    scale: isMobile ? 1.5 : 1,
                    transformOrigin: isMobile ? "center center" : "left center"
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.0, // Slightly faster (Original was 1.2, previous fix 0.8)
                    ease: "power4.out"
                }
            );

            // 2. Then, the UI/UX typing (Sequential but snappy)
            tl.fromTo(".uiux-char",
                { opacity: 0, y: 15 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.07, // Just a tiny bit faster (Original was 0.08)
                    stagger: 0.04,
                    ease: "back.out(1.7)"
                },
                "-=0.1" // Very slight overlap so it feels continuous
            );

            // 3. Finally, the Graphic Designer reveal with displacement
            const filterVars = { scale: 50, freq: 0.05 };
            tl.fromTo(graphicRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 1.5, ease: "power2.inOut" },
                "-=0.4"
            );

            tl.to(filterVars, {
                scale: 0,
                freq: 0,
                duration: 2,
                ease: "power3.inOut",
                onUpdate: () => {
                    const dispMap = document.querySelector("#displacementFilter feDisplacementMap");
                    const turb = document.querySelector("#displacementFilter feTurbulence");
                    if (dispMap) dispMap.setAttribute("scale", filterVars.scale);
                    if (turb) turb.setAttribute("baseFrequency", filterVars.freq);
                }
            }, "-=1.5");

            // Moving gradient animation for Graphic Designer
            gsap.to(".text-gradient-graphic", {
                backgroundPosition: "100% 0%",
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            tl.to(".hero-desc", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=1");

            tl.to(".hero-btn", {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");

            const handleMouseEnter = () => {
                gsap.to(glowRef.current, { scale: 1.5, opacity: 0.8, duration: 1.5, ease: "power3.out" });
            };
            const handleMouseLeave = () => {
                gsap.to(glowRef.current, { scale: 1, opacity: 0.4, x: sectionRef.current.offsetWidth / 2, y: sectionRef.current.offsetHeight / 2, duration: 1.5, ease: "power3.out" });
            };
            const handleMouseMove = (e) => {
                const rect = sectionRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                gsap.to(glowRef.current, { x: x, y: y, duration: 1, ease: "power2.out" });
            };

            const section = sectionRef.current;
            if (section) {
                section.addEventListener("mouseenter", handleMouseEnter);
                section.addEventListener("mouseleave", handleMouseLeave);
                section.addEventListener("mousemove", handleMouseMove);

                // Initial center
                gsap.set(glowRef.current, { x: section.offsetWidth / 2, y: section.offsetHeight / 2 });
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

    const uiuxText = "UI/UX &";

    return (
        <section ref={sectionRef} className="relative w-full h-[100dvh] flex items-end justify-center md:justify-start pb-20 md:pb-32 px-4 sm:px-8 md:px-16 md:pl-[120px] lg:pl-[140px] overflow-hidden bg-dark">
            {/* SVG Displacement Filter */}
            <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                <filter id="displacementFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>

            {/* The Interactive Gradient Glow */}
            <div
                ref={glowRef}
                className="absolute left-0 top-0 w-[500px] md:w-[800px] aspect-square bg-background/20 rounded-full blur-[100px] md:blur-[160px] pointer-events-none z-0 opacity-40 mix-blend-screen"
            />

            {/* Halftone Pattern Background */}
            <div
                className="absolute inset-0 z-0 opacity-[0.15]"
                style={{
                    backgroundImage: "radial-gradient(circle at center, #E8E4DD 1px, transparent 1.5px)",
                    backgroundSize: "6px 6px"
                }}
            />
            <div className="absolute inset-0 z-1 bg-gradient-to-t from-dark via-dark/40 to-transparent pointer-events-none" />

            {/* Content wrapper */}
            <div className="relative z-10 w-full text-primary flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="font-sans font-black text-6xl md:text-8xl tracking-tighter leading-[0.85] flex flex-col justify-center md:justify-start uppercase">
                    <span className="text-primary font-mono font-bold not-italic text-[12px] sm:text-[14px] md:text-2xl tracking-[0.3em] mb-4 hero-intro opacity-0 translate-y-10 whitespace-nowrap">Hey, I'm Juneco</span>
                    <span className="text-accent italic leading-[0.85]">
                        {uiuxText.split("").map((char, i) => (char === " " ? <span key={i}>&nbsp;</span> : <span key={i} className="uiux-char inline-block">{char}</span>))}
                    </span>
                    <span ref={graphicRef} className="text-gradient-graphic text-4xl sm:text-5xl md:text-7xl -mt-[0.1em] displacement-text opacity-0 italic leading-[1] py-2 pr-6">
                        Graphic Designer
                    </span>
                </h1>
                <p className="mt-8 font-mono text-[10px] sm:text-xs tracking-[0.15em] text-primary/60 max-w-xl border-l-2 border-accent pl-4 hero-desc opacity-0 translate-y-10 uppercase">
                    I CREATE INTUITIVE INTERFACES AND STRIKING VISUALS THAT HELP BRANDS TELL THEIR STORY. LET'S BUILD SOMETHING MEANINGFUL TOGETHER.
                </p>
                <button
                    onClick={() => {
                        document.getElementById("work-archive")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-12 group relative overflow-hidden bg-primary text-dark font-sans font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full flex items-center gap-4 hover:scale-[1.03] transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hero-btn opacity-0 translate-y-10 focus:outline-none"
                >
                    <span className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                    <span className="relative z-10 group-hover:text-primary transition-colors duration-300">View Archive</span>
                    <ArrowRight weight="bold" className="relative z-10 w-4 h-4 group-hover:text-primary transition-colors duration-300 group-hover:translate-x-1" />
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
