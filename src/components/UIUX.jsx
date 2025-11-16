import React, { useState } from "react";

export default function UIUX({ setActivePage }) {
  const [openModal, setOpenModal] = useState(null);

  const works = [
    {
      type: "figma",
      src: "https://embed.figma.com/proto/5wBwyF60CDZL3ePNyHKVFH/UI-UX-Design-Contest?node-id=7-315&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A315&embed-host=share",
      thumbnail: "/images/drjas.png",
      title: "UI/UX Design Contest",
      category: "First Place Winner",
    },
    {
      type: "link",
      url: "https://drjaspetcare.vercel.app/",
      thumbnail: "/images/drjas.png",
      title: "Dr. Jas Pet Care",
      category: "Capstone Project",
    },
    {
      type: "figma",
      src: "https://embed.figma.com/proto/1AS1gmmD7h2v9Mm8w9tynZ/negros-shit?node-id=12-83&starting-point-node-id=2%3A2&embed-host=share",
      thumbnail: "/images/negros.png",
      title: "Negros Delights",
      category: "Web Application",
    },
    {
      type: "link",
      url: "https://lemake.vercel.app/",
      thumbnail: "/images/lemake.png",
      title: "Lemake",
      category: "Resume Builder",
    },
    {
      type: "figma",
      src: "https://embed.figma.com/proto/0qFy3Aq3XfHb8GE1sXmMIz/SAD?node-id=105-2838&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=105%3A2838&embed-host=share",
      thumbnail: "/images/maestro.png",
      title: "Maestro Solutions",
      category: "Software Engineering Project",
    },
    {
      type: "figma",
      src: "https://embed.figma.com/proto/QONWszrkRHmMBeWeHepbgp/Task-3---Vertical-and-Horizontal-Scrolling?node-id=5-505&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=5%3A505&show-proto-sidebar=1&embed-host=share",
      thumbnail: "/images/smartcart.png",
      title: "SmartCart",
      category: "Mobile App Design",
    },
  ];

  const handleClick = (item, index) => {
    if (item.type === "link") {
      window.open(item.url, "_blank");
    } else {
      setOpenModal(index);
    }
  };

  return (
    <section
      className="min-h-screen pt-[140px] px-4 sm:px-8 md:px-12 lg:px-16 pb-16 max-md:pt-[120px]"
      style={{
        backgroundColor: "#669BBC",
      }}
    >
      <button
        onClick={() => setActivePage("home")}
        className="mb-[40px] text-[14px] font-light tracking-[1px] uppercase text-[#003049] hover:text-[#FDF0D5] transition-colors duration-300"
      >
        ← Back to Home
      </button>
      <div className="page-title text-[14px] font-light tracking-[3px] uppercase text-[#003049] mb-[80px]">
        UI/UX Design
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] max-w-[1400px]">
        {works.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item, index)}
            className="aspect-square bg-[#1a1a1a] overflow-hidden relative cursor-pointer group"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-transparent p-[40px_30px] translate-y-full transition-transform duration-[400ms] ease-out group-hover:translate-y-0">
              <div className="text-[24px] font-normal mb-[8px] text-[#fdf0d5]">
                {item.title}
              </div>
              <div className="text-[12px] text-[#669bbc] tracking-[2px] uppercase">
                {item.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Figma embeds */}
      {openModal !== null && works[openModal].type === "figma" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-[2000] flex items-center justify-center"
          onClick={() => setOpenModal(null)}
        >
          <button
            onClick={() => setOpenModal(null)}
            className="absolute top-8 right-8 text-white text-4xl hover:text-[#669bbc] transition-colors duration-300 z-[2001]"
          >
            ×
          </button>
          {/* Mobile app prototypes (SmartCart and Negros Delights) */}
          {works[openModal].title === "SmartCart" ||
          works[openModal].title === "Negros Delights" ? (
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                backgroundImage: `url(${works[openModal].thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(0px)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backdropFilter: "blur(20px)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              ></div>
              <div
                className="relative z-10 w-[400px] h-[85vh] max-h-[800px]"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  title={works[openModal].title}
                  style={{ border: "none", borderRadius: "40px" }}
                  width="100%"
                  height="100%"
                  src={works[openModal].src}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            /* Desktop prototypes - fullscreen */
            <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
              <iframe
                title={works[openModal].title}
                style={{ border: "none" }}
                width="100%"
                height="100%"
                src={works[openModal].src}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
