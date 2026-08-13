"use client";
import React, { useEffect, useRef, useState } from "react";
import { EnvelopeSimple, LinkedinLogo, MapPin, Check } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReadyToBuild from "./shared/ReadyToBuild";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = () => {
    const timeout = setTimeout(() => {
      navigator.clipboard.writeText('juneco.mirande@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }, 300);
    window.addEventListener('blur', () => clearTimeout(timeout), { once: true });
  };

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

      gsap.fromTo(".contact-social",
        { scale: 0.8, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".contact-social-wrap",
            start: "top 99%",
          },
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-10 md:py-20 px-4 sm:px-8 md:px-16 md:pl-[120px] lg:pl-[140px]" id="contact">
      <div className="w-full flex flex-col items-center md:items-start">
        <div className="contact-item flex justify-center md:justify-start items-center gap-4 mb-6 md:mb-20 text-dark uppercase font-mono text-xs font-bold tracking-widest text-center md:text-left w-full">
          <span className="hidden md:block w-12 h-[1px] bg-accent" />
          Get In Touch
        </div>

        <h2 className="contact-item font-sans font-bold tracking-tighter uppercase text-dark mb-8 md:mb-16 leading-[0.9] text-left w-full" style={{ fontSize: 'clamp(2.5rem, 14vw, 6rem)' }}>
          <span className="font-sans font-bold">Let's </span><span className="font-sans font-black text-accent md:pr-4">Work.</span>
        </h2>

        <div className="flex flex-col gap-6 md:gap-12 w-full">
          <div className="contact-item border-t border-dark/20 pt-5 md:pt-8 flex flex-col sm:flex-row sm:items-center justify-between group">
            <div className="flex items-center gap-3 text-dark/50 text-xs font-mono uppercase tracking-widest mb-2 sm:mb-0">
              <EnvelopeSimple size={18} className="group-hover:text-accent transition-colors shrink-0" />
              Email
            </div>
            <a href="mailto:juneco.mirande@gmail.com"
              onClick={handleEmailClick}
              className="relative font-sans font-bold text-lg sm:text-4xl text-dark hover:text-accent transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:-translate-y-1 break-all sm:break-normal"
            >
              juneco.mirande@gmail.com
              {emailCopied && (
                <span className="absolute -top-8 left-0 whitespace-nowrap font-mono text-[9px] text-dark/70 bg-primary border border-dark/20 px-2 py-1 rounded-full flex items-center gap-1">
                  <Check size={10} /> Copied!
                </span>
              )}
            </a>
          </div>

          <div className="contact-item border-t border-dark/20 pt-5 md:pt-8 flex flex-col sm:flex-row sm:items-center justify-between group">
            <div className="flex items-center gap-3 text-dark/50 text-xs font-mono uppercase tracking-widest mb-2 sm:mb-0">
              <MapPin size={18} className="group-hover:text-accent transition-colors shrink-0" />
              Location
            </div>
            <div className="font-sans font-bold text-base sm:text-2xl text-dark sm:text-right">
              San Carlos City, Negros Occidental, PH
            </div>
          </div>

          <div className="contact-item border-t border-dark/20 pt-5 md:pt-8 flex flex-col sm:flex-row sm:items-center justify-between group">
            <div className="flex items-center gap-3 text-dark/50 text-xs font-mono uppercase tracking-widest mb-3 sm:mb-0">
              Socials
            </div>
            <div className="contact-social-wrap flex gap-4 sm:justify-end w-full sm:w-auto">
              {[
                { icon: LinkedinLogo, href: "https://www.linkedin.com/in/juneco-mirande/", label: "LinkedIn Profile" }
              ].map(({ icon: Icon, href, label }, idx) => (
                <a key={idx} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="contact-social w-12 h-12 md:w-16 md:h-16 rounded-full border border-dark/20 bg-primary/40 flex items-center justify-center text-dark hover:bg-accent hover:border-accent hover:text-background transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/20">
                  <Icon size={22} aria-hidden="true" />
                </a>
              ))}

            </div>
          </div>
        </div>

        <div className="w-full mt-10 md:mt-24">
          <ReadyToBuild />
        </div>
      </div>
    </section>
  );

}
