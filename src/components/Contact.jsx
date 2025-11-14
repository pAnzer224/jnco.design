import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current && sectionRef.current.children) {
      gsap.fromTo(
        sectionRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  const socialLinks = [
    {
      name: "IG",
      label: "Instagram",
      url: "https://www.instagram.com/yourprofile",
    },
    {
      name: "BE",
      label: "Behance",
      url: "https://www.behance.net/yourprofile",
    },
    {
      name: "IN",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/yourprofile",
    },
    { name: "DR", label: "Dribbble", url: "https://dribbble.com/yourprofile" },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-8 md:px-16 bg-[#F5F1E8]"
    >
      <div className="max-w-4xl w-full">
        <h2
          className="text-5xl md:text-7xl font-light mb-16 text-gray-900"
          style={{ fontFamily: "Lora, serif", letterSpacing: "-0.02em" }}
        >
          Let's work together
        </h2>

        <div className="space-y-12">
          <div className="border-b border-gray-300 pb-8">
            <div
              className="text-xs uppercase tracking-widest text-gray-500 mb-3"
              style={{ fontFamily: "Lora, serif" }}
            >
              Email
            </div>
            <a
              href="mailto:hello@jnco.design"
              className="text-3xl md:text-4xl text-gray-900 hover:text-amber-600 transition-colors duration-300"
              style={{ fontFamily: "Lora, serif" }}
            >
              hello@jnco.design
            </a>
          </div>

          <div className="border-b border-gray-300 pb-8">
            <div
              className="text-xs uppercase tracking-widest text-gray-500 mb-6"
              style={{ fontFamily: "Lora, serif" }}
            >
              Social
            </div>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url} // ✅ real URL
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-14 h-14 border border-gray-400 rounded-full flex items-center justify-center text-gray-600 hover:border-amber-600 hover:text-amber-600 hover:-translate-y-1 transition-all duration-300"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="border-b border-gray-300 pb-8">
            <div
              className="text-xs uppercase tracking-widest text-gray-500 mb-3"
              style={{ fontFamily: "Lora, serif" }}
            >
              Location
            </div>
            <div
              className="text-3xl md:text-4xl text-gray-900"
              style={{ fontFamily: "Lora, serif" }}
            >
              Cagayan de Oro, Philippines
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
