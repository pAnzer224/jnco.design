import React, { useEffect, useRef } from "react";
import { EnvelopeSimple, InstagramLogo, FigmaLogo, DribbbleLogo, MapPin } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".contact-item", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                },
                y: 20,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out"
            });

            gsap.from(".contact-social", {
                scrollTrigger: {
                    trigger: ".contact-social-wrap",
                    start: "top 95%",
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.7)"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-20 px-8 sm:px-16 container mx-auto" id="contact">
      <div className="max-w-4xl mx-auto flex flex-col items-center md:items-start">
        <div className="contact-item flex justify-center md:justify-start items-center gap-4 mb-20 text-primary uppercase font-mono text-xs font-bold tracking-widest text-center md:text-left w-full">
          <span className="hidden md:block w-12 h-[1px] bg-accent" />
          Get In Touch
        </div>

        <h2 className="contact-item font-sans font-bold text-5xl sm:text-7xl md:text-8xl tracking-tighter uppercase text-primary mb-16 leading-[0.9] text-center md:text-left w-full">
          Let's <br /><span className="font-sans font-black text-accent md:pr-4">Work.</span>
        </h2>

        <div className="flex flex-col gap-12 w-full">
          <div className="contact-item border-t border-primary/20 pt-8 flex flex-col sm:flex-row sm:items-center justify-between group items-center text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4 text-primary/50 text-xs font-mono uppercase tracking-widest mb-4 sm:mb-0">
              <EnvelopeSimple size={24} className="group-hover:text-accent transition-colors" />
              Email
            </div>
            <a href="mailto:juneco.mirande@gmail.com" className="font-sans font-bold text-2xl sm:text-4xl text-primary hover:text-accent transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:-translate-y-1 mt-4 sm:mt-0">
              juneco.mirande@gmail.com
            </a>
          </div>

          <div className="contact-item border-t border-primary/20 pt-8 flex flex-col sm:flex-row sm:items-center justify-between group items-center text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4 text-primary/50 text-xs font-mono uppercase tracking-widest mb-4 sm:mb-0">
              <MapPin size={24} className="group-hover:text-accent transition-colors" />
              Location
            </div>
            <div className="font-sans font-bold text-xl sm:text-2xl text-primary sm:text-right max-w-sm mt-4 sm:mt-0">
              San Carlos City, <br className="hidden sm:block" />Negros Occidental, PH
            </div>
          </div>

          <div className="contact-item border-t border-primary/20 pt-8 flex flex-col sm:flex-row sm:items-center justify-between group items-center text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4 text-primary/50 text-xs font-mono uppercase tracking-widest mb-4 sm:mb-0">
              Socials
            </div>
            <div className="contact-social-wrap flex gap-4 justify-center sm:justify-end mt-4 sm:mt-0 w-full sm:w-auto">
              {[
                { icon: InstagramLogo, href: "https://instagram.com" },
                { icon: FigmaLogo, href: "https://figma.com/@jnco" },
                { icon: DribbbleLogo, href: "https://dribbble.com/jnco" }
              ].map(({ icon: Icon, href }, idx) => (
                <a key={idx} href={href} className="contact-social w-16 h-16 rounded-full border border-primary/20 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-accent hover:border-accent hover:text-background transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/20">
                  <Icon size={28} />
                </a>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
