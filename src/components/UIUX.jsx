import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, ArrowUpRight } from "@phosphor-icons/react";
import CategoryNav from "./shared/CategoryNav";



export default function UIUX({ setActivePage }) {
  const [openModal, setOpenModal] = useState(null);
  const [showFigmaNotice, setShowFigmaNotice] = useState(false);
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
      },
      {
        type: "figma",
        src: "https://embed.figma.com/proto/TDPUe0WucO2hRtQSkrldip/Choros.io?node-id=18-157&scaling=scale-down-width&content-scaling=fixed&page-id=2%3A2&starting-point-node-id=18%3A157&embed-host=share&hide-ui=1",
        thumbnail: "/images/y-commerce.webp",
        title: "Y-Commerce",
        category: "Figma Prototype",
        tools: ["/images/figma.svg"],
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
    if (openModal !== null && allWorks[openModal].type === "figma") {
      setShowFigmaNotice(true);
      const timer = setTimeout(() => setShowFigmaNotice(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowFigmaNotice(false);
    }
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

  const isMobilePrototype = (work) =>
    work.title === "SmartCart" || work.title === "Negros Delights";

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
          className="fixed inset-0 bg-dark/95 backdrop-blur-xl z-[2000] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setOpenModal(null)}
        >
          {(allWorks[openModal].type === "link" || allWorks[openModal].type === "figma") && (
            <a
              href={allWorks[openModal].type === "link" ? allWorks[openModal].url : allWorks[openModal].src}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-8 left-8 text-primary/50 hover:text-primary transition-all duration-300 z-[2001] flex items-center gap-3 px-6 py-3 rounded-full border border-primary/20 hover:border-primary/40 bg-dark hover:bg-dark/80 group"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-mono text-xs uppercase tracking-widest font-bold">{allWorks[openModal].type === "figma" ? "Open in Figma" : "Visit Website"}</span>
              <ArrowUpRight size={18} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}

          {showFigmaNotice && allWorks[openModal].type === "figma" && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent px-6 py-3 rounded-full font-mono text-xs uppercase tracking-widest font-bold z-[2001] shadow-xl animate-pulse flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
              Please wait, Figma prototype is loading...
            </div>
          )}

          <button
            onClick={() => setOpenModal(null)}
            className="absolute top-8 right-8 text-primary/50 hover:text-accent transition-colors duration-300 z-[2001] flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 hover:border-accent bg-dark"
          >
            <X size={24} weight="bold" />
          </button>


          {/* Scrollable Images (CW4A and Oracle) */}
          {allWorks[openModal].type === "scrollable-image" ? (
            <div
              className="w-full h-full overflow-y-auto overflow-x-hidden mt-16 rounded-[2rem] border border-primary/10 bg-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center py-8 px-4">
                {allWorks[openModal].images.map((img, imgIndex) => (
                  <div key={imgIndex} className="w-full max-w-5xl mb-4">
                    <img src={img} alt={`${allWorks[openModal].title} ${imgIndex + 1}`} className="w-full h-auto rounded-xl" />
                  </div>
                ))}
              </div>
            </div>
          ) : /* Mobile app prototypes */
            isMobilePrototype(allWorks[openModal]) && allWorks[openModal].type === "figma" ? (
              <div
                className="relative w-full h-full flex items-center justify-center rounded-[2rem] overflow-hidden bg-black"
                style={{
                  backgroundImage: `url(${allWorks[openModal].thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 backdrop-blur-3xl bg-dark/80"></div>
                <div className="relative z-10 w-[400px] h-[85vh] max-h-[800px] rounded-[40px] overflow-hidden shadow-2xl border border-primary/20" onClick={(e) => e.stopPropagation()}>
                  <iframe
                    title={allWorks[openModal].title}
                    style={{ border: "none" }}
                    width="100%"
                    height="100%"
                    src={allWorks[openModal].src}
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              /* Vercel links and Desktop prototypes - fullscreen iframe */
              <div className="w-full h-full pt-16" onClick={(e) => e.stopPropagation()}>
                <iframe
                  title={allWorks[openModal].title}
                  className="w-full h-full rounded-[2rem] border border-primary/20 bg-dark shadow-2xl"
                  src={allWorks[openModal].type === "link" ? allWorks[openModal].url : allWorks[openModal].src}
                  allowFullScreen
                />
              </div>
            )}
        </div>
      )}
    </section>
  );
}
