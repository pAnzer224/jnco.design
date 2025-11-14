import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  const text =
    "Designs that adjust to real needs and communicate clearly are my focus. I embed ideas and use various references when examining what truly improves the user's experience. Intuitive solutions and interfaces come together to be thoughtful, functional, and also visually engaging.";

  const highlightLetters = ["J", "U", "N", "E", "C", "O"];
  let letterIndex = 0;

  useEffect(() => {
    const chars = text.split("");
    const spans = chars.map((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.opacity = "0";

      const upperChar = char.toUpperCase();
      if (
        letterIndex < highlightLetters.length &&
        upperChar === highlightLetters[letterIndex]
      ) {
        span.style.color = "#D97706";
        span.style.fontWeight = "700";
        letterIndex++;
      }

      textRef.current.appendChild(span);
      return span;
    });

    // Typing animation
    gsap.to(spans, {
      opacity: 1,
      duration: 0.03,
      stagger: 0.03,
      ease: "none",
    });

    // Fade all text to dark after typing completes
    gsap.to(spans, {
      color: "#1F2937",
      duration: 1,
      delay: text.length * 0.03 + 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center px-8 md:px-16 bg-[#F5F1E8]"
    >
      <div
        ref={textRef}
        className="text-3xl md:text-5xl lg:text-6xl leading-relaxed max-w-6xl"
        style={{
          fontFamily: "Lora, serif",
          fontWeight: "300",
          letterSpacing: "-0.02em",
        }}
      />
    </section>
  );
};

export default Hero;
