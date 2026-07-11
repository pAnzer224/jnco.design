import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, ArrowUpRight } from "@phosphor-icons/react";
import CategoryNav from "./shared/CategoryNav";
import ReadyToBuild from "./shared/ReadyToBuild";



export default function UIUX({ setActivePage }) {
  const [openModal, setOpenModal] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();


  const works = useMemo(
    () => [
      {
        type: "figma",
        src: "https://embed.figma.com/proto/5wBwyF60CDZL3ePNyHKVFH/UI-UX-Design-Contest?node-id=7-315&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A315&embed-host=share",
        thumbnail: "/images/laco.webp",
        title: "LACO Innovation Hub",
        category: "UI/UX Figma Champion (1st Place)",
        tools: ["/images/figma.svg"],
        role: "Lead UI/UX Designer",
        challenge: "Design a collaborative workspace for students and innovators to pitch projects, collaborate on team boards, and share IT Month resources.",
        solution: "Designed a clean dashboard layout in Figma featuring modular project overview widgets, gamified user statuses, and dark-themed interface states.",
        images: ["/images/laco.webp", "/images/laco.webp"]
      },

      {
        type: "figma",
        src: "https://embed.figma.com/proto/1AS1gmmD7h2v9Mm8w9tynZ/negros-shit?node-id=12-83&starting-point-node-id=2%3A2&embed-host=share",
        thumbnail: "/images/negrosdelight.webp",
        title: "Negros Delights",
        category: "Mobile Application",
        tools: ["/images/figma.svg"],
        role: "Product Designer & Researcher",
        challenge: "Create a mobile ordering experience that highlights regional delicacies of Negros, solving poor local search visibility.",
        solution: "Designed a user-friendly shopping checkout flow, rich localized food cards, and trackable map-delivery flows in Figma.",
        images: ["/images/negrosdelight.webp", "/images/negrosdelight.webp"]
      },

      {
        type: "figma",
        src: "https://embed.figma.com/proto/0qFy3Aq3XfHb8GE1sXmMIz/SAD?node-id=105-2838&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=105%3A2838&embed-host=share",
        thumbnail: "/images/maestro.webp",
        title: "Maestro Solutions",
        category: "Software Engineering Project",
        tools: ["/images/figma.svg"],
        role: "Lead UI/UX Designer",
        challenge: "Design a robust software management suite for academic developer teams to track project backlogs and milestones.",
        solution: "Created task boards, progress tracking widgets, and resource management states to bridge design-to-development collaboration.",
        images: ["/images/maestro.webp", "/images/maestro.webp"]
      },
      {
        type: "figma",
        src: "https://embed.figma.com/proto/QONWszrkRHmMBeWeHepbgp/Task-3---Vertical-and-Horizontal-Scrolling?node-id=5-505&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=5%3A505&embed-host=share",
        thumbnail: "/images/smartcart.webp",
        title: "SmartCart",
        category: "Mobile App Design",
        tools: ["/images/figma.svg"],
        role: "Interface Designer",
        challenge: "Design an optimized mobile checkout interface to simplify offline-to-online item scanning and purchase confirmation.",
        solution: "Implemented horizontal product scrolling layouts, rapid checkout sheets, and high-contrast total breakdown tables.",
        images: ["/images/smartcart.webp", "/images/smartcart.webp"]
      },
      {
        type: "scrollable-image",
        images: ["/images/cw4a1.webp"],
        thumbnail: "/images/cw4a.webp",
        title: "CW4A",
        category: "Web Design",
        tools: ["/images/photoshop.svg"],
        role: "Web Graphic Designer",
        challenge: "Design modern, advocacy-driven web pages for community wellness programs.",
        solution: "Produced visual assets, Photoshop photo-composites, and coordinated typography styles to increase visitor engagement.",
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
        role: "Visual UI Designer",
        challenge: "Redesign complex legacy database tables and widgets to fit a clean visual identity.",
        solution: "Designed modernized dashboard graphs, search states, and tables using high contrast colors and balanced paddings.",
      },
    ],
    []
  );

  const chorosUIUXWorks = useMemo(
    () => [
      {
        type: "figma",
        src: "https://embed.figma.com/proto/TDPUe0WucO2hRtQSkrldip/Choros.io?node-id=4-529&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4%3A529&embed-host=share&hide-ui=1",
        thumbnail: "/images/choros-figma.webp",
        title: "Choros.io Redesign",
        category: "Skills Display",
        tools: ["/images/figma.svg"],
        role: "OJT UI/UX Designer",
        challenge: "Assist in redesigning the core business service platform layout to enhance usability and feature discovery.",
        solution: "Drafted grid structures, interactive wireframes, and component states under senior oversight.",
        images: ["/images/choros-figma.webp", "/images/choros-figma.webp"]
      },
      {
        type: "figma",
        src: "https://embed.figma.com/proto/TDPUe0WucO2hRtQSkrldip/Choros.io?node-id=18-157&scaling=scale-down-width&content-scaling=fixed&page-id=2%3A2&starting-point-node-id=18%3A157&embed-host=share&hide-ui=1",
        thumbnail: "/images/y-commerce.webp",
        title: "Y-Commerce",
        category: "Figma Prototype",
        tools: ["/images/figma.svg"],
        role: "OJT UI/UX Designer",
        challenge: "Build a responsive mobile e-commerce mockup to present feature capabilities during client pitches.",
        solution: "Designed checkout sheets, cart views, and catalog navigations using unified Figma design components.",
        images: ["/images/y-commerce.webp", "/images/y-commerce.webp"]
      },
    ],
    []
  );

  const allWorks = useMemo(() => [...works, ...chorosUIUXWorks], [works, chorosUIUXWorks]);

  const handleClick = (item, index) => {
    setOpenModal(index);
  };

  useEffect(() => {
    if (openModal !== null) {
      document.body.classList.add("modal-open");
      if (allWorks[openModal].type !== "scrollable-image") {
        document.body.classList.add("iframe-modal-open");
      }
    } else {
      document.body.classList.remove("modal-open", "iframe-modal-open");
    }
    return () => document.body.classList.remove("modal-open", "iframe-modal-open");
  }, [openModal, allWorks]);

  useEffect(() => {
    if (location.state?.openProject) {
      const index = works.findIndex(w => w.title === location.state.openProject);
      if (index !== -1) {
        setOpenModal(index);
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location.state, works, navigate, location.pathname]);

  useEffect(() => {
    if (location.hash === "#ojt-choros") {
      setTimeout(() => {
        document.getElementById("ojt-choros")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  const [imagesLoaded, setImagesLoaded] = useState({});

  return (
    <section
      className="min-h-screen pt-12 sm:pt-16 px-4 sm:px-8 md:px-12 md:pl-[120px] lg:px-24 lg:pl-[140px] pb-16 bg-background text-dark"
    >
      <div className="font-sans font-bold text-5xl sm:text-7xl tracking-tighter uppercase text-dark mb-4">
        UI/UX Design
      </div>

      <CategoryNav activeCategory="uiux" setActivePage={setActivePage} />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
        {works.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item, index)}
            className={`flex flex-col cursor-pointer group rounded-[2rem] border border-dark/10 shadow-sm bg-primary p-3 transition-all duration-300 ease-out hover:border-dark/20`}
          >
            {/* Text + Tools above thumbnail */}
            <div className="flex items-center justify-between mb-3 px-2 pt-1">
              <div className="min-w-0">
                <div className="font-sans font-bold text-base uppercase tracking-tight text-dark leading-tight truncate">
                  {item.title}
                </div>
                <div className="font-mono text-[10px] text-accent tracking-[2px] uppercase font-bold mt-0.5">
                  {item.category}
                </div>
              </div>
              {/* Tool icons */}
              <div className="flex gap-1.5 flex-shrink-0 ml-2">
                {item.tools.map((tool, toolIndex) => (
                  <div
                    key={toolIndex}
                    className="w-7 h-7 rounded-full bg-background flex items-center justify-center border border-dark/10"
                  >
                    <img src={tool} alt={`${tool.split('/').pop().replace('.svg', '').replace('.png', '')} icon`} className="w-4 h-4 object-contain" />
                  </div>
                ))}
              </div>
            </div>

            {/* Inner Thumbnail */}
            <div className={`relative w-full aspect-[4/3] rounded-[1.4rem] overflow-hidden transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] ${!imagesLoaded[item.thumbnail] ? 'skeleton' : 'bg-dark/5'}`}>
              <img
                src={item.thumbnail}
                alt={`${item.title} — ${item.category} by Juneco Mirande`}
                onLoad={() => setImagesLoaded(prev => ({ ...prev, [item.thumbnail]: true }))}
                className={`w-full h-full object-cover transition-all duration-[700ms] ease-out lg:grayscale lg:group-hover:grayscale-0 ${imagesLoaded[item.thumbnail] ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* OJT @ Choros Section */}
      <div id="ojt-choros" className="mt-32 pt-16 border-t-4 border-dark">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-16">
          <div>
            <h3 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tighter text-dark mb-2 flex items-center gap-3 flex-wrap">
              OJT @
              <a
                href="https://choros.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:opacity-70 transition-opacity duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src="/images/choros-logo.webp"
                  alt="Choros.io"
                  className="h-10 sm:h-14 w-auto object-contain"
                />
              </a>
            </h3>
            <div className="font-mono text-xs sm:text-sm text-dark/70 uppercase tracking-widest font-bold">
              UI/UX Designer & Frontend
            </div>
          </div>
          <div className="max-w-md font-mono text-sm leading-relaxed text-dark/80 bg-primary/20 p-6 rounded-[2rem] border-2 border-dark/10">
            Designed interactive prototypes and developed UI components for client projects at{" "}
            <a
              href="https://choros.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-bold hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Choros.io
            </a>
            , a UK-based IT company, ensuring responsive and intuitive user experiences.
          </div>
        </div>

        {/* Choros UI/UX Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
          {chorosUIUXWorks.map((item, index) => (
            <div
              key={`choros-${index}`}
              onClick={() => { handleClick(item, works.length + index); }}
              className="flex flex-col cursor-pointer group rounded-[2rem] border border-dark/10 shadow-sm bg-primary p-3 transition-all duration-300 ease-out hover:border-dark/20"
            >
              <div className="flex items-center justify-between mb-3 px-2 pt-1">
                <div className="min-w-0">
                  <div className="font-sans font-bold text-base uppercase tracking-tight text-dark leading-tight truncate">{item.title}</div>
                  <div className="font-mono text-[10px] text-accent tracking-[2px] uppercase font-bold mt-0.5">{item.category}</div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0 ml-2">
                  {item.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="w-7 h-7 rounded-full bg-background flex items-center justify-center border border-dark/10">
                      <img src={tool} alt={`${tool.split('/').pop().replace('.svg', '').replace('.png', '')} icon`} className="w-4 h-4 object-contain" />
                    </div>
                  ))}
                </div>
              </div>
              <div className={`relative w-full aspect-[4/3] rounded-[1.4rem] overflow-hidden transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] ${!imagesLoaded[item.thumbnail] ? 'skeleton' : 'bg-dark/5'}`}>
                <img
                  src={item.thumbnail}
                  alt={`${item.title} — ${item.category} by Juneco Mirande at Choros.io`}
                  onLoad={() => setImagesLoaded(prev => ({ ...prev, [item.thumbnail]: true }))}
                  className={`w-full h-full object-cover transition-all duration-[700ms] ease-out lg:grayscale lg:group-hover:grayscale-0 ${imagesLoaded[item.thumbnail] ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for all content types */}
      {openModal !== null && (
        <div
          className="fixed inset-0 bg-dark/95 backdrop-blur-xl z-[2000] flex items-center justify-center p-4 md:p-8"
          onClick={() => setOpenModal(null)}
        >
          {/* Main Split Layout Container */}
          <div
            className="w-full max-w-7xl h-[85vh] bg-[#161616]/90 border border-primary/10 rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Left Context Sidebar (30% Width on Desktop) */}
            <div className="w-full md:w-[320px] lg:w-[380px] shrink-0 border-b md:border-b-0 md:border-r border-primary/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto text-primary">
              <div>
                {/* Header */}
                <span className="font-mono text-[9px] text-accent tracking-[3px] uppercase font-bold">
                  {allWorks[openModal].category}
                </span>
                <h3 className="font-sans font-black text-2xl uppercase tracking-tight text-white mt-1 leading-tight">
                  {allWorks[openModal].title}
                </h3>

                <div className="mt-6 space-y-5">
                  {/* Role */}
                  {allWorks[openModal].role && (
                    <div>
                      <span className="font-mono text-[10px] text-primary/40 uppercase tracking-wider block font-bold">My Role</span>
                      <span className="text-sm font-semibold text-primary/95">{allWorks[openModal].role}</span>
                    </div>
                  )}

                  {/* Challenge */}
                  {allWorks[openModal].challenge && (
                    <div>
                      <span className="font-mono text-[10px] text-primary/40 uppercase tracking-wider block font-bold">The Challenge</span>
                      <p className="text-xs sm:text-sm text-primary/70 leading-relaxed mt-1 font-sans">
                        {allWorks[openModal].challenge}
                      </p>
                    </div>
                  )}

                  {/* Solution */}
                  {allWorks[openModal].solution && (
                    <div>
                      <span className="font-mono text-[10px] text-primary/40 uppercase tracking-wider block font-bold">The Solution</span>
                      <p className="text-xs sm:text-sm text-primary/70 leading-relaxed mt-1 font-sans">
                        {allWorks[openModal].solution}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom CTA / Action Link */}
              <div className="mt-8 pt-4 border-t border-primary/5 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  {allWorks[openModal].tools.map((tool, idx) => (
                    <img key={idx} src={tool} className="w-5 h-5 object-contain opacity-70" alt="tool logo" />
                  ))}
                </div>
                {(allWorks[openModal].type === "link" || allWorks[openModal].type === "figma") && (
                  <a
                    href={allWorks[openModal].type === "link" ? allWorks[openModal].url : allWorks[openModal].src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest transition-all"
                  >
                    Open Live <ArrowUpRight size={12} weight="bold" />
                  </a>
                )}
              </div>
            </div>

            {/* 2. Right Interactive / Image View */}
            <div className="flex-1 bg-black/40 relative flex items-center justify-center p-4 overflow-hidden">
              <button
                onClick={() => setOpenModal(null)}
                className="absolute top-4 right-4 text-primary/50 hover:text-accent transition-colors duration-300 z-[2010] flex items-center justify-center w-10 h-10 rounded-full border border-primary/10 bg-dark/80"
              >
                <X size={20} weight="bold" />
              </button>

              <div className="w-full h-full">
                {allWorks[openModal].type === "scrollable-image" || allWorks[openModal].images ? (
                  <div className="w-full h-full overflow-y-auto py-8 select-none">
                    <div className="flex flex-col items-center gap-4 max-w-3xl mx-auto">
                      {(allWorks[openModal].images || allWorks[openModal].images).map((img, imgIndex) => (
                        <img key={imgIndex} src={img} className="w-full h-auto rounded-xl border border-primary/5 shadow-lg" alt="work frame" />
                      ))}
                    </div>
                  </div>
                ) : (
                  <iframe
                    title={allWorks[openModal].title}
                    className="w-full h-full border-0 bg-dark shadow-2xl"
                    src={allWorks[openModal].type === "link" ? allWorks[openModal].url : allWorks[openModal].src}
                    allowFullScreen
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      )}
      {/* Shared Ready to Build CTA */}
      <div className="w-full mt-20">
        <ReadyToBuild />
      </div>
    </section>
  );
}
