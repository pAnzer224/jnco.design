import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaretLeft, X } from "@phosphor-icons/react";



export default function UIUX({ setActivePage }) {
  const [openModal, setOpenModal] = useState(null);
  const navigate = useNavigate();


  const works = [
    {
      type: "figma",
      src: "https://embed.figma.com/proto/5wBwyF60CDZL3ePNyHKVFH/UI-UX-Design-Contest?node-id=7-315&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A315&embed-host=share",
      thumbnail: "/images/laco.webp",
      title: "UI/UX Design Contest",
      category: "First Place Winner",
      tools: ["/images/figma.svg"],
    },
    {
      type: "link",
      url: "https://drjaspetcare.vercel.app/",
      thumbnail: "/images/drjas.webp",
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
      thumbnail: "/images/negrosdelight.webp",
      title: "Negros Delights",
      category: "Mobile Application",
      tools: ["/images/figma.svg"],
    },
    {
      type: "link",
      url: "https://lemake.vercel.app/",
      thumbnail: "/images/lemake.webp",
      title: "Lemake",
      category: "Resume Builder",
      tools: ["/images/react.svg", "/images/tailwind.svg"],
    },
    {
      type: "figma",
      src: "https://embed.figma.com/proto/0qFy3Aq3XfHb8GE1sXmMIz/SAD?node-id=105-2838&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=105%3A2838&embed-host=share",
      thumbnail: "/images/maestro.webp",
      title: "Maestro Solutions",
      category: "Software Engineering Project",
      tools: ["/images/figma.svg"],
    },
    {
      type: "figma",
      src: "https://embed.figma.com/proto/QONWszrkRHmMBeWeHepbgp/Task-3---Vertical-and-Horizontal-Scrolling?node-id=5-505&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=5%3A505&show-proto-sidebar=1&embed-host=share",
      thumbnail: "/images/smartcart.webp",
      title: "SmartCart",
      category: "Mobile App Design",
      tools: ["/images/figma.svg"],
    },
    {
      type: "scrollable-image",
      images: ["/images/cw4a1.webp"],
      thumbnail: "/images/cw4a.webp",
      title: "CW4A",
      category: "Web Design",
      tools: ["/images/photoshop.svg"],
    },
    {
      type: "scrollable-image",
      images: [
        "/images/oracle1.gif",
        "/images/oracle1.webp",
        "/images/oracle2.webp",
        "/images/oracle3.webp",
      ],
      thumbnail: "/images/oracle.webp",
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

  const [imagesLoaded, setImagesLoaded] = useState({});

  return (
    <section
      className="min-h-screen pt-12 sm:pt-16 px-4 sm:px-8 md:px-12 md:pl-[120px] lg:px-24 lg:pl-[140px] pb-16 bg-background text-dark"
    >
      <button
        onClick={() => { setActivePage("home"); navigate("/"); window.scrollTo(0, 0); }}
        className="mb-[40px] text-[12px] font-mono font-bold tracking-[2px] uppercase text-dark/70 hover:text-accent transition-colors duration-300 flex items-center gap-2"
      >
        <CaretLeft size={20} weight="bold" /> Back to Index
      </button>


      <div className="font-sans font-bold text-5xl sm:text-7xl tracking-tighter uppercase text-dark mb-[80px]">
        UI/UX Design
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
        {works.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item, index)}
            className={`aspect-square overflow-hidden relative cursor-pointer group rounded-[2rem] border border-dark/10 hover:border-accent/40 shadow-sm ${!imagesLoaded[item.thumbnail] ? 'skeleton' : 'bg-primary'}`}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              onLoad={() => setImagesLoaded(prev => ({ ...prev, [item.thumbnail]: true }))}
              className={`w-full h-full object-cover transition-all duration-[800ms] ease-out group-hover:scale-105 lg:opacity-80 lg:mix-blend-luminosity lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:mix-blend-normal group-hover:opacity-100 ${imagesLoaded[item.thumbnail] ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Title */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent p-6 pointer-events-none">
              <div className="text-2xl font-bold mb-1 text-primary font-sans uppercase tracking-tight">
                {item.title}
              </div>
              <div className="text-[10px] text-accent tracking-[2px] uppercase font-mono font-bold">
                {item.category}
              </div>
            </div>

            {/* Tools Icons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
              {item.tools.map((tool, toolIndex) => (
                <div
                  key={toolIndex}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-primary/20"
                >
                  <img src={tool} alt="Tool icon" className="w-5 h-5 object-contain" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for all content types */}
      {openModal !== null && (
        <div
          className="fixed inset-0 bg-dark/95 backdrop-blur-xl z-[2000] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setOpenModal(null)}
        >
          <button
            onClick={() => setOpenModal(null)}
            className="absolute top-8 right-8 text-primary/50 hover:text-accent transition-colors duration-300 z-[2001] flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 hover:border-accent bg-dark"
          >
            <X size={24} weight="bold" />
          </button>


          {/* Scrollable Images (CW4A and Oracle) */}
          {works[openModal].type === "scrollable-image" ? (
            <div
              className="w-full h-full overflow-y-auto overflow-x-hidden mt-16 rounded-[2rem] border border-primary/10 bg-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center py-8 px-4">
                {works[openModal].images.map((img, imgIndex) => (
                  <div key={imgIndex} className="w-full max-w-5xl mb-4">
                    <img src={img} alt={`${works[openModal].title} ${imgIndex + 1}`} className="w-full h-auto rounded-xl" />
                  </div>
                ))}
              </div>
            </div>
          ) : /* Mobile app prototypes */
            isMobilePrototype(works[openModal]) && works[openModal].type === "figma" ? (
              <div
                className="relative w-full h-full flex items-center justify-center rounded-[2rem] overflow-hidden bg-black"
                style={{
                  backgroundImage: `url(${works[openModal].thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 backdrop-blur-3xl bg-dark/80"></div>
                <div className="relative z-10 w-[400px] h-[85vh] max-h-[800px] rounded-[40px] overflow-hidden shadow-2xl border border-primary/20" onClick={(e) => e.stopPropagation()}>
                  <iframe
                    title={works[openModal].title}
                    style={{ border: "none" }}
                    width="100%"
                    height="100%"
                    src={works[openModal].src}
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              /* Vercel links and Desktop prototypes - fullscreen iframe */
              <div className="w-full h-full pt-16" onClick={(e) => e.stopPropagation()}>
                <iframe
                  title={works[openModal].title}
                  className="w-full h-full rounded-[2rem] border border-primary/20 bg-dark shadow-2xl"
                  src={works[openModal].type === "link" ? works[openModal].url : works[openModal].src}
                  allowFullScreen
                />
              </div>
            )}
        </div>
      )}
    </section>
  );
}
