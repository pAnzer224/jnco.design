import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import Contact from "./Contact";

export default function Home({ setActivePage }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();

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
      const categoriesSection = document.getElementById("categories-section");

      if (contactSection && categoriesSection) {
        const contactTop = contactSection.offsetTop;
        const categoriesTop = categoriesSection.offsetTop;
        const scrollPos = window.scrollY + 200;

        if (scrollPos >= contactTop) {
          setActivePage("contact");
        } else if (scrollPos >= categoriesTop) {
          setActivePage("home");
        } else {
          setActivePage("home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setActivePage]);

  const categories = [
    {
      title: "Graphic Design",
      path: "/graphics",
      description: "Branding, Marketing & Visual Identity",
      image: "/images/neue/logo.jpg",
    },
    {
      title: "Mockups",
      path: "/mockups",
      description: "Product Design & Brand Presentations",
      image: "/images/artifythumb.jpg",
    },
    {
      title: "UI/UX",
      path: "/uiux",
      description: "Interface Design & User Experience",
      image: "/images/laco.jpg",
    },
  ];

  const handleCategoryClick = (path, pageId) => {
    setActivePage(pageId);
    navigate(path);
  };

  return (
    <>
      {/* Hero Section */}
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

      {/* Categories Section */}
      <section
        id="categories-section"
        className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-24"
        style={{
          backgroundColor: "#669BBC",
        }}
      >
        <div className="w-full max-w-[1400px]">
          <h2
            className="text-[14px] font-light tracking-[3px] uppercase text-[#003049] mb-[80px] text-center"
            style={{ fontFamily: "'Chainprinter', monospace" }}
          >
            Explore Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() =>
                  handleCategoryClick(
                    category.path,
                    category.title.toLowerCase().replace(/\//g, "")
                  )
                }
                className="aspect-square bg-[#1a1a1a] overflow-hidden relative cursor-pointer group hoverableArea"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.4)] to-transparent opacity-100 transition-opacity duration-[400ms]" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-[40px] text-center">
                  <h3
                    className="text-[clamp(32px,4vw,48px)] font-normal mb-[12px] text-[#fdf0d5] transition-transform duration-[400ms] group-hover:scale-110"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {category.title}
                  </h3>
                  <p
                    className="text-[14px] text-[#669bbc] tracking-[1px] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]"
                    style={{ fontFamily: "'Chainprinter', monospace" }}
                  >
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div id="contact-section">
        <Contact />
      </div>
    </>
  );
}
