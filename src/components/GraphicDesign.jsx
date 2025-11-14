import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const GraphicDesign = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    );
  }, []);

  const projects = [
    {
      title: "Brand Identity",
      category: "Logo Design & Guidelines",
      description:
        "Comprehensive brand identity systems with logo design, color palettes, typography, and usage guidelines.",
      color: "bg-amber-100",
    },
    {
      title: "Print Design",
      category: "Editorial & Collateral",
      description:
        "Magazine layouts, brochures, business cards, and promotional materials with attention to typography and composition.",
      color: "bg-orange-100",
    },
    {
      title: "Packaging Design",
      category: "Product Packaging",
      description:
        "Creative packaging solutions that communicate brand values and enhance the unboxing experience.",
      color: "bg-yellow-100",
    },
    {
      title: "Poster Design",
      category: "Visual Communication",
      description:
        "Eye-catching posters for events, campaigns, and exhibitions with strong visual hierarchy.",
      color: "bg-amber-200",
    },
    {
      title: "Typography",
      category: "Custom Type Design",
      description:
        "Custom typefaces and typographic compositions that bring unique personality to projects.",
      color: "bg-orange-200",
    },
    {
      title: "Illustration",
      category: "Digital & Hand-drawn",
      description:
        "Original illustrations that complement brand narratives and add distinctive visual elements.",
      color: "bg-yellow-200",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen pt-32 pb-20 px-8 md:px-16 bg-[#F5F1E8]"
    >
      <div className="mb-16">
        <h2
          className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4"
          style={{ fontFamily: "Lora, serif" }}
        >
          Graphic Design
        </h2>
        <p
          className="text-2xl md:text-3xl text-gray-800 max-w-3xl"
          style={{ fontFamily: "Lora, serif" }}
        >
          Visual communication through thoughtful design solutions that resonate
          with audiences and strengthen brand presence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`${project.color} p-8 rounded-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer group`}
          >
            <div className="mb-4">
              <span
                className="text-xs uppercase tracking-widest text-gray-600"
                style={{ fontFamily: "Lora, serif" }}
              >
                {project.category}
              </span>
            </div>
            <h3
              className="text-2xl font-semibold mb-3 text-gray-900 group-hover:text-amber-700 transition-colors"
              style={{ fontFamily: "Lora, serif" }}
            >
              {project.title}
            </h3>
            <p
              className="text-gray-700 leading-relaxed"
              style={{ fontFamily: "Lora, serif" }}
            >
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GraphicDesign;
