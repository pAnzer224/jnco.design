import React, { useState, useEffect } from "react";
import { X, ArrowUpRight } from "@phosphor-icons/react";
import CategoryNav from "./shared/CategoryNav";

export default function WebDev({ setActivePage }) {
  const [openModalItem, setOpenModalItem] = useState(null);

  const works = [
    {
      type: "link",
      url: "https://trekkorentals.web.app/",
      thumbnail: "/images/trekko.webp",
      title: "Trekko Rentals",
      category: "Full-Stack Web App",
      tools: [
        "/images/nextjs.svg",
        "/images/tailwind.svg",
        "/images/firebase.svg",
      ],
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
  ];

  const chorosWorks = [
    {
      type: "link",
      url: "https://youreventcover.co.uk/",
      thumbnail: "/images/youreventcover.webp",
      title: "Your Event Cover",
      category: "Front-end & UI/UX Design",
      tools: ["/images/figma.svg", "/images/laravel.svg", "/images/tailwind.svg"],
    },
    {
      type: "link",
      url: "https://goodplumbing.co.uk/",
      thumbnail: "/images/goodplumbing.webp",
      title: "Good Plumbing",
      category: "Front-end & UI/UX Design",
      tools: ["/images/figma.svg", "/images/laravel.svg", "/images/tailwind.svg"],
    },
    {
      type: "link",
      url: "https://manorvale-main.laravel.cloud/",
      thumbnail: "/images/manorvale.webp",
      title: "Manorvale",
      category: "Front-end & UI/UX Design",
      tools: ["/images/figma.svg", "/images/laravel.svg", "/images/tailwind.svg"],
    },
    {
      type: "link",
      url: "https://mould-damp.co.uk/",
      thumbnail: "/images/mould.webp",
      title: "Mould Damp",
      category: "Front-end & UI/UX Design",
      tools: ["/images/figma.svg", "/images/laravel.svg", "/images/tailwind.svg"],
    },
    {
      type: "link",
      url: "https://wefit-main.laravel.cloud/",
      thumbnail: "/images/wefit.webp",
      title: "We Fit",
      category: "Front-end & UI/UX Design",
      tools: ["/images/figma.svg", "/images/laravel.svg", "/images/tailwind.svg"],
    },
  ];

  const handleClick = (item) => {
    setOpenModalItem(item);
  };

  useEffect(() => {
    if (openModalItem !== null) {
      document.body.classList.add("modal-open");
      if (openModalItem.type !== "scrollable-image") {
        document.body.classList.add("iframe-modal-open");
      }
    } else {
      document.body.classList.remove("modal-open", "iframe-modal-open");
    }
    return () => document.body.classList.remove("modal-open", "iframe-modal-open");
  }, [openModalItem]);

  const [imagesLoaded, setImagesLoaded] = useState({});

  return (
    <section
      className="min-h-screen pt-12 sm:pt-16 px-4 sm:px-8 md:px-12 md:pl-[120px] lg:px-24 lg:pl-[140px] pb-16 bg-background text-dark"
    >
      <div className="font-sans font-bold text-5xl sm:text-7xl tracking-tighter uppercase text-dark mb-4">
        Web Development
      </div>

      <CategoryNav activeCategory="webdev" setActivePage={setActivePage} />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
        {works.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
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

      {/* OJT Section */}
      <div className="mt-32 pt-16 border-t-4 border-dark">
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
              Front-end & UI/UX Designer
            </div>
          </div>
          <div className="max-w-md font-mono text-sm leading-relaxed text-dark/80 bg-primary/20 p-6 rounded-[2rem] border-2 border-dark/10">
            Worked with a team at{" "}
            <a
              href="https://choros.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-bold hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Choros.io
            </a>
            , a UK-based IT company, on front-end builds and UI design for multiple client websites. Part of a team — not flying solo.
          </div>
        </div>

        {/* OJT Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
          {chorosWorks.map((item, index) => (
            <div
              key={index}
              onClick={() => handleClick(item)}
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
      {openModalItem !== null && (
        <div
          className="fixed inset-0 bg-dark/95 backdrop-blur-xl z-[2000] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setOpenModalItem(null)}
        >
          {openModalItem.type === "link" && openModalItem.url && (
            <a
              href={openModalItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-8 left-8 text-primary/50 hover:text-primary transition-all duration-300 z-[2001] flex items-center gap-3 px-6 py-3 rounded-full border border-primary/20 hover:border-primary/40 bg-dark hover:bg-dark/80 group"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Visit Website</span>
              <ArrowUpRight size={18} weight="bold" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}

          <button
            onClick={() => setOpenModalItem(null)}
            className="absolute top-8 right-8 text-primary/50 hover:text-accent transition-colors duration-300 z-[2001] flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 hover:border-accent bg-dark"
          >
            <X size={24} weight="bold" />
          </button>

          {/* Vercel links and Desktop prototypes - fullscreen iframe */}
          <div className="w-full h-full pt-16" onClick={(e) => e.stopPropagation()}>
            <iframe
              title={openModalItem.title}
              className="w-full h-full rounded-[2rem] border border-primary/20 bg-dark shadow-2xl"
              src={openModalItem.url}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
