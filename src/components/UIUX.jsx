import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const UIUX = () => {
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
      title: "Mobile App Design",
      category: "iOS & Android",
      description:
        "Intuitive mobile experiences with user-centered design principles and seamless interactions.",
      color: "bg-blue-100",
    },
    {
      title: "Web Applications",
      category: "Responsive Design",
      description:
        "Clean, functional web interfaces that prioritize usability and aesthetic appeal across devices.",
      color: "bg-indigo-100",
    },
    {
      title: "Design Systems",
      category: "Component Libraries",
      description:
        "Scalable design systems with reusable components, ensuring consistency across products.",
      color: "bg-purple-100",
    },
    {
      title: "User Research",
      category: "Research & Testing",
      description:
        "User interviews, surveys, and usability testing to inform data-driven design decisions.",
      color: "bg-blue-200",
    },
    {
      title: "Wireframing",
      category: "Information Architecture",
      description:
        "Low to high-fidelity wireframes mapping user flows and content structure.",
      color: "bg-indigo-200",
    },
    {
      title: "Prototyping",
      category: "Interactive Prototypes",
      description:
        "Clickable prototypes for testing concepts and validating designs before development.",
      color: "bg-purple-200",
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
          UI/UX Design
        </h2>
        <p
          className="text-2xl md:text-3xl text-gray-800 max-w-3xl"
          style={{ fontFamily: "Lora, serif" }}
        >
          Crafting digital experiences that balance user needs with business
          goals through research-driven design.
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
              className="text-2xl font-semibold mb-3 text-gray-900 group-hover:text-indigo-700 transition-colors"
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

export default UIUX;
