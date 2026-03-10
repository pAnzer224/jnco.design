import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
    const containerRef = useRef(null);
    const textRevealRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Find all chars and animate them with stagger
            // We'll pin the entire container so it's fully readable before they can scroll past it.
            const chars = containerRef.current.querySelectorAll('.desc-char');

            const tlText = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top", // Pin when section reaches top
                    end: "+=150%", // Scroll distance required to un-pin and finish animation
                    scrub: 1,
                    pin: true,
                }
            });

            tlText.fromTo(chars,
                { opacity: 0.1, color: "#111111" },
                {
                    opacity: 1,
                    color: "#E8E4DD",
                    duration: 1,
                    stagger: 0.02,
                    ease: "none",
                }
            );

            // Animate the big manifesto lines independently
            const parts = textRevealRef.current.querySelectorAll('.reveal-text');
            gsap.from(parts, {
                scrollTrigger: {
                    trigger: textRevealRef.current,
                    start: "top 85%",
                },
                y: 40,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const description = "Frontend Developer and UI/UX Designer with 8 years of experience in graphic design and digital media. Proficient in modern web technologies and design tools with a strong foundation in creating responsive, user-centered applications. Demonstrated ability to adapt quickly to new technologies and frameworks while delivering quality results in collaborative environments.";
 
     return (
        <section ref={containerRef} className="relative bg-dark text-primary min-h-screen flex flex-col justify-center overflow-hidden py-32 md:pl-[120px] lg:pl-[140px] w-full" id="philosophy">
             <div
                 className="absolute inset-0 opacity-10 bg-cover bg-fixed bg-center mix-blend-lighten grayscale"
                 style={{ backgroundImage: "url('/images/laco.webp')" }}
             />
 
             <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center md:items-start md:text-left pb-20 border-b border-primary/10 px-4 md:pl-0 md:pr-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-8 font-bold">Professional Summary</h3>
                <p className="font-sans font-bold text-xl sm:text-2xl md:text-3xl leading-[1.6] text-dark tracking-tight" style={{ wordBreak: 'break-word' }}>
                    {description.split(" ").map((word, wordIndex) => (
                        <span key={`word-${wordIndex}`} className="inline-flex mr-[0.35em]">
                            {word.split("").map((char, charIndex) => (
                                <span key={`char-${charIndex}`} className="desc-char">{char}</span>
                            ))}
                        </span>
                    ))}
                </p>
            </div>

            <div ref={textRevealRef} className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center md:items-start md:text-left pt-20 px-4 md:pl-0 md:pr-4">
                <p className="font-sans font-bold text-sm sm:text-base md:text-xl text-primary/40 uppercase tracking-widest reveal-text mb-8">
                    The Goal
                </p>
                <h2 className="reveal-text flex flex-col text-4xl sm:text-6xl md:text-[6rem] leading-[0.9] tracking-tighter">
                    <span className="font-sans font-bold uppercase">Less Noise</span>
                    <span className="font-sans font-black mt-2 text-accent md:pr-4 uppercase tracking-tighter">More clarity.</span>
                </h2>
            </div>
        </section>
    );
};

export default Philosophy;
