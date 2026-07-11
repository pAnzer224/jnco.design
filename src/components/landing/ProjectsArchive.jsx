import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, CalendarBlank } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const categories = [
    {
        step: "01",
        title: "Graphic Design",
        desc: "Branding, Marketing & Visual Identity",
        bg: "/images/simulatedsanctuarythumb.webp",
        path: "/graphics",
        serviceParam: "graphic",
    },
    {
        step: "02",
        title: "UI/UX",
        desc: "Interface Design & User Experience",
        bg: "/images/laco.webp",
        path: "/uiux",
        serviceParam: "uiux",
    },
    {
        step: "03",
        title: "Mockups",
        desc: "Product Design & Brand Presentations",
        bg: "/images/artifythumb.webp",
        path: "/mockups",
        serviceParam: "mockups",
    },
    {
        step: "04",
        title: "Web Dev",
        desc: "Full-Stack Applications & Code",
        bg: "/images/drjas.webp",
        path: "/webdev",
        serviceParam: "webdev",
    },
];

// ── Desktop/Tablet: original GSAP stacking card experience ──────────────────
const DesktopProjectsArchive = ({ setActivePage }) => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const navigate = useNavigate();
    const [loadedImages, setLoadedImages] = useState({});

    useEffect(() => {
        let ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: containerRef.current,
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: false,
                    onEnter: () => setActivePage && setActivePage(categories[index].path.substring(1)),
                    onEnterBack: () => setActivePage && setActivePage(categories[index].path.substring(1)),
                });

                if (index < cardsRef.current.length - 1) {
                    gsap.to(card.querySelector('.card-inner'), {
                        scrollTrigger: {
                            trigger: cardsRef.current[index + 1],
                            start: "top 90%",
                            end: "top 0%",
                            scrub: true,
                        },
                        scale: 0.9,
                        opacity: 0.5,
                        filter: "blur(20px)",
                        ease: "none"
                    });
                }
            });

            gsap.to(".projects-sticky-header", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "bottom 95%",
                    end: "bottom 80%",
                    scrub: true,
                },
                opacity: 0,
                y: -30,
                ease: "none"
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                onLeave: () => setActivePage && setActivePage("home"),
                onLeaveBack: () => setActivePage && setActivePage("home"),
            });
        }, containerRef);
        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section ref={containerRef} id="work-archive" className="relative w-full bg-dark mt-32 min-h-screen md:pl-[120px] lg:pl-[140px]">

            <div className="projects-sticky-header text-center sticky top-0 py-16 z-0 pointer-events-none">
                <h2 className="font-sans font-bold text-lg md:text-2xl tracking-[0.2em] uppercase text-primary">Projects</h2>
            </div>

            <div className="relative pb-32 z-10">
                {categories.map((card, idx) => (
                    <div
                        key={idx}
                        ref={el => cardsRef.current[idx] = el}
                        className="w-full h-[100dvh] flex items-center justify-center px-4 sm:px-8"
                    >
                        <div
                            onClick={() => {
                                navigate(card.path);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className={`card-inner relative w-full max-w-5xl h-[70vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden cursor-pointer group shadow-2xl border-4 border-dark/5 ${!loadedImages[card.bg] ? 'skeleton' : ''}`}
                        >
                            {/* Hidden Image for Loading Listener */}
                            <img
                                src={card.bg}
                                alt=""
                                className="hidden"
                                onLoad={() => setLoadedImages(prev => ({ ...prev, [card.bg]: true }))}
                            />

                            {/* Background Image */}
                            <div
                                className={`absolute inset-0 bg-cover bg-center transition-all duration-[800ms] ease-[power3.out] opacity-80 md:opacity-60 md:mix-blend-luminosity md:grayscale group-hover:scale-110 md:group-hover:mix-blend-normal md:group-hover:grayscale-0 md:group-hover:opacity-100 ${loadedImages[card.bg] ? 'opacity-80' : 'opacity-0'}`}
                                style={{ backgroundImage: `url('${card.bg}')` }}
                            />
                            {/* Dark Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />

                            <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12 z-10 text-primary">

                                <div className="flex justify-between items-start">
                                    <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-accent border border-accent px-4 py-1 rounded-full uppercase">
                                        {card.step}
                                    </span>
                                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-dark/40 backdrop-blur-md group-hover:bg-accent group-hover:border-accent group-hover:text-dark transition-colors duration-300">
                                        <ArrowUpRight size={24} weight="bold" />
                                    </div>
                                </div>

                                <div className="mt-8 transition-transform duration-500 ease-[power2.out] group-hover:-translate-y-4">
                                    <h3 className="font-sans font-bold text-4xl sm:text-6xl md:text-8xl md:max-w-3xl uppercase tracking-tighter leading-none mb-4">
                                        {card.title}.
                                    </h3>
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                        <p className="font-mono text-xs sm:text-sm text-primary/70 tracking-widest uppercase">
                                            {card.desc}
                                        </p>
                                        {/* Inquire chip */}
                                        <button
                                            id={`inquire-${card.serviceParam}`}
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/booking?service=${card.serviceParam}`);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-dark/40 backdrop-blur-sm text-primary/70 hover:border-accent hover:text-accent hover:bg-accent/10 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 group/btn flex-shrink-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
                                        >
                                            <CalendarBlank size={13} weight="duotone" />
                                            Inquire for this
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// ── Mobile only: lightweight list ────────────────────────────────────────────
const MobileProjectsArchive = ({ setActivePage }) => {
    const navigate = useNavigate();

    return (
        <section id="work-archive" className="relative w-full bg-dark mt-32 pb-8">
            <div className="text-center py-12 pointer-events-none">
                <h2 className="font-sans font-bold text-lg tracking-[0.2em] uppercase text-primary">Projects</h2>
            </div>

            <div className="px-4 flex flex-col gap-3">
                {categories.map((card, idx) => (
                    <div
                        key={idx}
                        onClick={() => {
                            navigate(card.path);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="group relative flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 cursor-pointer overflow-hidden transition-all duration-300 hover:border-accent/50 active:scale-[0.99]"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-[1rem] overflow-hidden bg-white/10">
                            <img
                                src={card.bg}
                                alt={card.title}
                                fetchpriority="high"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                            <span className="font-mono text-[10px] font-bold tracking-[2px] text-accent uppercase">{card.step}</span>
                            <h3 className="font-sans font-bold text-xl uppercase tracking-tighter leading-none text-primary truncate">
                                {card.title}
                            </h3>
                            <p className="font-mono text-[10px] text-primary/50 tracking-widest uppercase mt-1 truncate">
                                {card.desc}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                id={`mobile-inquire-${card.serviceParam}`}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/booking?service=${card.serviceParam}`);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-primary/50 hover:border-accent/60 hover:text-accent font-mono text-[9px] uppercase tracking-widest transition-all duration-300"
                            >
                                <CalendarBlank size={11} weight="duotone" />
                                Inquire
                            </button>
                            <div className="w-10 h-10 flex-shrink-0 rounded-full border border-white/20 flex items-center justify-center bg-dark/40 group-hover:bg-accent group-hover:border-accent text-primary group-hover:text-dark transition-all duration-300 group-hover:rotate-45">
                                <ArrowUpRight size={20} weight="bold" />
                            </div>
                        </div>

                        {/* Subtle glow on hover */}
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.5rem]"
                            style={{ background: `radial-gradient(ellipse at center, rgba(230,59,46,0.06) 0%, transparent 70%)` }}
                        />
                    </div>
                ))}
            </div>

            <div className="h-12" />
        </section>
    );
};

// ── Root: render per breakpoint ───────────────────────────────────────────────
const ProjectsArchive = ({ setActivePage }) => {
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== "undefined") return window.innerWidth < 768;
        return false;
    });

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return isMobile
        ? <MobileProjectsArchive setActivePage={setActivePage} />
        : <DesktopProjectsArchive setActivePage={setActivePage} />;
};

export default ProjectsArchive;