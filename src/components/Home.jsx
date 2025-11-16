import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Contact from "./Contact";

export default function Home({ setActivePage }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const text =
        "Designs that adjust to real needs and communicate clearly are my focus. I embed ideas and use various references when examining what truly improves the user's experience. Intuitive solutions and interfaces come together to be thoughtful, functional, and also visually engaging.";
      const letters = ["J", "U", "N", "E", "C", "O"];
      let letterIndex = 0;

      containerRef.current.innerHTML = "";

      const chars = text.split("");
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = "0";
        span.style.color = "#003049";

        if (
          char.toUpperCase() === letters[letterIndex] &&
          letterIndex < letters.length
        ) {
          span.style.color = "#c1121f";
          span.style.fontWeight = "600";
          span.dataset.juneco = "true";
          letterIndex++;
        }

        containerRef.current.appendChild(span);
      });

      const spans = containerRef.current.querySelectorAll("span");
      const junecoSpans = containerRef.current.querySelectorAll(
        '[data-juneco="true"]'
      );

      const tl = gsap.timeline();

      tl.to(junecoSpans, {
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
      });

      tl.to(
        Array.from(spans).filter((s) => !s.dataset.juneco),
        {
          opacity: 1,
          duration: 0.05,
          stagger: 0.05,
        },
        "+=0.3"
      );

      tl.to(
        junecoSpans,
        {
          color: "#003049",
          fontWeight: "300",
          duration: 0.8,
        },
        "+=0.5"
      );
    }
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById("contact-section");

      if (contactSection) {
        const contactTop = contactSection.offsetTop;
        const scrollPos = window.scrollY + 200; // Offset for better detection

        if (scrollPos >= contactTop) {
          setActivePage("contact");
        } else {
          setActivePage("home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActivePage]);

  return (
    <>
      <section
        className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-24"
        style={{
          backgroundColor: "#669BBC",
        }}
      >
        <div
          className="absolute inset-0 mt-20 sm:mt-24 mb-12 mx-4 sm:mx-8 md:mx-12 rounded-2xl"
          style={{
            backgroundImage: "url('/images/background.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          ref={containerRef}
          className="relative z-10 text-[clamp(18px,2.5vw,36px)] font-light leading-[1.5] w-full max-w-[90%] lg:max-w-[75%] xl:max-w-[70%] tracking-[-0.5px] text-[#003049]"
          style={{
            fontFamily: "'Chainprinter', 'Helvetica Neue', Arial, sans-serif",
          }}
        />
        <div className="bounce fixed bottom-[40px] left-1/2 -translate-x-1/2 text-[#003049] text-[12px] tracking-[2px] z-10">
          scroll
        </div>
      </section>

      <div id="contact-section">
        <Contact />
      </div>
    </>
  );
}
