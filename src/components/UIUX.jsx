import React, { useState } from "react";

export default function UIUX({ setActivePage }) {
  const [openModal, setOpenModal] = useState(null);

  const works = [
    {
      type: "figma",
      src: "https://embed.figma.com/proto/5wBwyF60CDZL3ePNyHKVFH/UI-UX-Design-Contest?node-id=7-315&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A315&embed-host=share",
      thumbnail: "/images/laco.jpg",
      title: "UI/UX Design Contest",
      category: "First Place Winner",
      tools: ["/images/figma.svg"],
    },
    {
      type: "link",
      url: "https://drjaspetcare.vercel.app/",
      thumbnail: "/images/drjas.jpg",
      title: "Dr. Jas Pet Care",
      category: "Capstone Project",
      tools: [
        "/images/nextjs.svg",
        "/images/tailwind.svg",
        "/images/supabase.svg",
      ],
    },
    {
      type: "figma",
      src: "https://embed.figma.com/proto/1AS1gmmD7h2v9Mm8w9tynZ/negros-shit?node-id=12-83&starting-point-node-id=2%3A2&embed-host=share",
      thumbnail: "/images/negrosdelight.jpg",
      title: "Negros Delights",
      category: "Mobile Application",
      tools: ["/images/figma.svg"],
    },
    {
      type: "link",
      url: "https://lemake.vercel.app/",
      thumbnail: "/images/lemake.jpg",
      title: "Lemake",
      category: "Resume Builder",
      tools: ["/images/react.svg", "/images/tailwind.svg"],
    },
    {
      type: "figma",
      src: "https://embed.figma.com/proto/0qFy3Aq3XfHb8GE1sXmMIz/SAD?node-id=105-2838&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=105%3A2838&embed-host=share",
      thumbnail: "/images/maestro.jpg",
      title: "Maestro Solutions",
      category: "Software Engineering Project",
      tools: ["/images/figma.svg"],
    },
    {
      type: "figma",
      src: "https://embed.figma.com/proto/QONWszrkRHmMBeWeHepbgp/Task-3---Vertical-and-Horizontal-Scrolling?node-id=5-505&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=5%3A505&show-proto-sidebar=1&embed-host=share",
      thumbnail: "/images/smartcart.jpg",
      title: "SmartCart",
      category: "Mobile App Design",
      tools: ["/images/figma.svg"],
    },
    {
      type: "scrollable-image",
      images: ["/images/cw4a1.jpg"],
      thumbnail: "/images/cw4a.jpg",
      title: "CW4A",
      category: "Web Design",
      tools: ["/images/photoshop.svg"],
    },
    {
      type: "scrollable-image",
      images: [
        "/images/oracle1.gif",
        "/images/oracle1.jpg",
        "/images/oracle2.jpg",
        "/images/oracle3.jpg",
      ],
      thumbnail: "/images/oracle.jpg",
      title: "Oracle UI/UX Redesign",
      category: "Interface Redesign",
      tools: ["/images/photoshop.svg"],
    },
  ];

  const handleClick = (item, index) => {
    setOpenModal(index);
  };

  const isMobilePrototype = (work) =>
    work.title === "SmartCart" || work.title === "Negros Delights";

  return (
    <section
      className="min-h-screen pt-[140px] px-4 sm:px-8 md:px-12 lg:px-16 pb-16 max-md:pt-[120px]"
      style={{ backgroundColor: "#669BBC" }}
    >
      <button
        onClick={() => setActivePage("home")}
        className="mb-[40px] text-[14px] font-light tracking-[1px] uppercase text-[#003049] hover:text-[#FDF0D5] transition-colors duration-300"
        style={{ fontFamily: "'Chainprinter', monospace" }}
      >
        ← Back to Home
      </button>
      <div
        className="page-title text-[14px] font-light tracking-[3px] uppercase text-[#003049] mb-[80px]"
        style={{ fontFamily: "'Chainprinter', monospace" }}
      >
        UI/UX Design
      </div>

      {/* Gallery Grid */}
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
            {/* Title - Always Visible */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.6)] to-transparent p-[30px] pointer-events-none">
              <div
                className="text-[24px] font-normal mb-[4px] text-[#fdf0d5]"
                style={{ fontFamily: "'Lora', serif" }}
              >
                {item.title}
              </div>
              <div
                className="text-[12px] text-[#669bbc] tracking-[2px] uppercase"
                style={{ fontFamily: "'Chainprinter', monospace" }}
              >
                {item.category}
              </div>
            </div>

            {/* Tools Icons - Show on Hover */}
            <div className="absolute top-[20px] right-[20px] flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]">
              {item.tools.map((tool, toolIndex) => (
                <div
                  key={toolIndex}
                  className="w-10 h-10 bg-[rgba(0,0,0,0.7)] rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  <img
                    src={tool}
                    alt="Tool icon"
                    className="w-6 h-6 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for all content types */}
      {openModal !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-[2000] flex items-center justify-center"
          onClick={() => setOpenModal(null)}
        >
          <button
            onClick={() => setOpenModal(null)}
            className="absolute top-20 right-8 bg-[#669BBC] text-white text-sm font-light tracking-[1px] uppercase hover:bg-[#003049] transition-colors duration-300 z-[2001] flex items-center gap-2 px-6 py-3 rounded"
            style={{ fontFamily: "'Chainprinter', monospace" }}
          >
            ← Return to Gallery
          </button>

          {/* Scrollable Images (CW4A and Oracle) */}
          {works[openModal].type === "scrollable-image" ? (
            <div
              className="w-full h-full overflow-y-auto overflow-x-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#669BBC #1a1a1a",
              }}
            >
              <div className="flex flex-col items-center py-8 px-4">
                {works[openModal].images.map((img, imgIndex) => (
                  <div key={imgIndex} className="w-full max-w-[1920px] mb-4">
                    <img
                      src={img}
                      alt={`${works[openModal].title} ${imgIndex + 1}`}
                      className="w-full h-auto"
                      style={{ display: "block" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : /* Mobile app prototypes (SmartCart and Negros Delights) */
          isMobilePrototype(works[openModal]) &&
            works[openModal].type === "figma" ? (
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                backgroundImage: `url(${works[openModal].thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
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
            /* Vercel links and Desktop prototypes - fullscreen iframe */
            <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
              <iframe
                title={works[openModal].title}
                style={{ border: "none" }}
                width="100%"
                height="100%"
                src={
                  works[openModal].type === "link"
                    ? works[openModal].url
                    : works[openModal].src
                }
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
