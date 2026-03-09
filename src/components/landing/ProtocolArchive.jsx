import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const protocols = [
    {
        step: "001",
        title: "Graphic Design",
        desc: "Branding, Marketing & Visual Identity",
        bg: "/images/neue/logo.webp",
        path: "/graphics",
    },
    {
        step: "002",
        title: "UI/UX",
        desc: "Interface Design & User Experience",
        bg: "/images/laco.webp",
        path: "/uiux",
    },
    {
        step: "003",
        title: "Mockups",
        desc: "Product Design & Brand Presentations",
        bg: "/images/artifythumb.webp",
        path: "/mockups",
    },
];

const ProtocolArchive = () => {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const navigate = useNavigate();

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Pinning logic for sticky stacking cards
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // Pin the card when it reaches top
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: containerRef.current,
                    end: "bottom bottom",
                    pin: true,
                    pinSpacing: false,
                });

                // Scale and fade it out as the next one comes
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
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="work-archive" className="relative w-full bg-background mt-32 min-h-screen md:pl-[120px] lg:pl-[140px]">

            <div className="text-center sticky top-0 py-16 z-0 pointer-events-none">
                <h2 className="font-sans font-bold text-lg md:text-2xl tracking-[0.2em] uppercase text-dark">Work Archive</h2>
            </div>

            <div className="relative pb-32 z-10">

                {protocols.map((card, idx) => (
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
                            className="card-inner relative w-full max-w-5xl h-[70vh] rounded-[2rem] sm:rounded-[3rem] overflow-hidden cursor-pointer group shadow-2xl border-4 border-dark/5"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-[800ms] ease-[power3.out] opacity-80 md:opacity-60 md:mix-blend-luminosity md:grayscale group-hover:scale-110 md:group-hover:mix-blend-normal md:group-hover:grayscale-0 md:group-hover:opacity-100"
                                style={{ backgroundImage: `url('${card.bg}')` }}
                            />
                            {/* Dark Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />

                            <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-12 z-10 text-primary">

                                <div className="flex justify-between items-start">
                                    <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-accent border border-accent px-4 py-1 rounded-full uppercase">
                                        Phase {card.step}
                                    </span>
                                    <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-dark/40 backdrop-blur-md group-hover:bg-accent group-hover:border-accent transition-colors duration-300">
                                        <ArrowUpRight size={24} weight="bold" />
                                    </div>
                                </div>

                                <div className="mt-8 transition-transform duration-500 ease-[power2.out] group-hover:-translate-y-4">
                                    <h3 className="font-sans font-bold text-4xl sm:text-6xl md:text-8xl md:max-w-3xl uppercase tracking-tighter leading-none mb-4">
                                        {card.title}.
                                    </h3>
                                    <p className="font-mono text-xs sm:text-sm text-primary/70 tracking-widest uppercase">
                                        {card.desc}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProtocolArchive;
