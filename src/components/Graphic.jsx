import React, { useState, useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import CategoryNav from "./shared/CategoryNav";




export default function Graphics({ setActivePage }) {
  const [openModal, setOpenModal] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef([]);
  const containerRef = useRef(null);

  const works = useMemo(
    () => [
      {
        type: "gallery",
        thumbnail: "/images/neue/logo.webp",
        images: [
          "/images/neue/logo.webp",
          "/images/neue/logo2.webp",
          "/images/neue/neue1.webp",
          "/images/neue/neue2.webp",
          "/images/neue/vid.mp4",
        ],
        title: "Neue Dept.",
        category: "Branding/Marketing Graphics",
        tools: ["/images/photoshop.svg"],
      },
      {
        type: "gallery",
        thumbnail: "/images/TI/english/thumb.webp",
        images: [
          "/images/TI/english/1.webp",
          "/images/TI/english/2.webp",
          "/images/TI/english/3.webp",
          "/images/TI/english/4.webp",
          "/images/TI/english/5.webp",
          "/images/TI/english/6.webp",
        ],
        title: "TI",
        category: "Branding/Marketing Graphics",
        tools: ["/images/photoshop.svg"],
      },
      {
        type: "single",
        thumbnail: "/images/postermakingthumb.webp",
        image: "/images/postermaking.webp",
        title: "Poster Making",
        category: "Photo Manipulation",
        tools: ["/images/photoshop.svg"],
      },
      {
        type: "single",
        thumbnail: "/images/simulatedsanctuarythumb.webp",
        image: "/images/simulatedsanctuary.webp",
        title: "Simulated Sanctuary",
        category: "Photo Manipulation",
        tools: ["/images/photoshop.svg"],
      },
      {
        type: "single",
        thumbnail: "/images/graphic1.webp",
        image: "/images/graphic1.webp",
        title: "Infographic",
        category: "Information Design",
        tools: ["/images/photoshop.svg"],
      },
    ],
    []
  );

  const chorosGfxWorks = useMemo(
    () => [
      {
        type: "gallery",
        thumbnail: "/images/choros-gfx/sailing-pass-1.webp",
        images: [
          "/images/choros-gfx/sailing-pass-1.webp",
          "/images/choros-gfx/sailing-pass-2.webp",
        ],
        title: "Sailing Pass",
        category: "Graphic Design",
        tools: ["/images/photoshop.svg", "/images/illustrator.svg"],
      },
      {
        type: "gallery",
        thumbnail: "/images/choros-gfx/shane-bowden-1.webp",
        images: [
          "/images/choros-gfx/shane-bowden-1.webp",
          "/images/choros-gfx/shane-bowden-2.webp",
        ],
        title: "Shane Bowden",
        category: "Graphic Design",
        tools: ["/images/photoshop.svg", "/images/illustrator.svg"],
      },
    ],
    []
  );

  // allWorks = personal works + choros works, indexed together for the modal
  const allWorks = useMemo(() => [...works, ...chorosGfxWorks], [works, chorosGfxWorks]);

  const videoRefs = useRef({});

  const handleClick = (index) => {
    setOpenModal(index);
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (
      openModal !== null &&
      allWorks[openModal].type === "gallery" &&
      imageRefs.current.length > 0
    ) {
      const images = imageRefs.current;

      images.forEach((img, index) => {
        if (!img) return;

        const distance = index - currentIndex;
        const absDistance = Math.abs(distance);

        if (distance === 0) {
          // Current image - center, full scale, no blur
          gsap.to(img, {
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            opacity: 1,
            zIndex: 10,
            duration: 0.6,
            ease: "power2.out",
          });

          // Play video if current item is video
          const currentItem = allWorks[openModal].images[index];
          if (
            currentItem.toLowerCase().endsWith(".mp4") &&
            videoRefs.current[index]
          ) {
            videoRefs.current[index].play();
          }
        } else {
          // Other images - offset, scaled down, blurred
          const offset = distance * 45; // percentage offset
          gsap.to(img, {
            x: `${offset}%`,
            scale: 0.7 - absDistance * 0.1,
            filter: `blur(${absDistance * 8}px)`,
            opacity: absDistance === 1 ? 0.6 : 0.3,
            zIndex: 10 - absDistance,
            duration: 0.6,
            ease: "power2.out",
          });

          // Pause video if not current
          const item = allWorks[openModal].images[index];
          if (item.toLowerCase().endsWith(".mp4") && videoRefs.current[index]) {
            videoRefs.current[index].pause();
          }
        }
      });
    }
  }, [currentIndex, openModal, allWorks]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : allWorks[openModal].images.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < allWorks[openModal].images.length - 1 ? prev + 1 : 0
    );
  };

  const [imagesLoaded, setImagesLoaded] = useState({});

  return (
    <section
      className="min-h-screen pt-12 sm:pt-16 px-4 sm:px-8 md:px-12 md:pl-[120px] lg:px-24 lg:pl-[140px] pb-16 bg-background text-dark"
    >
      <div className="font-sans font-bold text-5xl sm:text-7xl tracking-tighter uppercase text-dark mb-4">
        Graphic Design
      </div>

      <CategoryNav activeCategory="graphic" setActivePage={setActivePage} />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
        {works.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
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
                    <img src={tool} alt={`${tool.split('/').pop().replace('.svg','').replace('.png','')} icon`} className="w-4 h-4 object-contain" />
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
              Graphic Designer
            </div>
          </div>
          <div className="max-w-md font-mono text-sm leading-relaxed text-dark/80 bg-primary/20 p-6 rounded-[2rem] border-2 border-dark/10">
            Produced graphic design assets for client projects at{" "}
            <a
              href="https://choros.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-bold hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Choros.io
            </a>
            , a UK-based IT company — marketing materials, event passes, and branded collateral.
          </div>
        </div>

        {/* Choros GFX Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
          {chorosGfxWorks.map((item, index) => (
            <div
              key={`choros-${index}`}
              onClick={() => { handleClick(works.length + index); }}
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
                      <img src={tool} alt={`${tool.split('/').pop().replace('.svg','').replace('.png','')} icon`} className="w-4 h-4 object-contain" />
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

      {/* Modal */}
      {openModal !== null && (
        <div
          className="fixed inset-0 bg-dark/95 backdrop-blur-xl z-[2000] flex items-center justify-center p-4 sm:p-8"
          onClick={() => setOpenModal(null)}
        >
          <button
            onClick={() => setOpenModal(null)}
            className="absolute top-8 right-8 text-primary/50 hover:text-accent transition-colors duration-300 z-[2001] flex items-center justify-center w-12 h-12 rounded-full border border-primary/20 hover:border-accent"
          >
            <X size={24} weight="bold" />
          </button>


          {/* Gallery Type - Next/Previous Navigation (Neue & TI) */}
          {allWorks[openModal].type === "gallery" ? (
            <div
              ref={containerRef}
              className="relative w-full max-w-7xl h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Gallery Container */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[2rem] bg-black border border-primary/10 shadow-2xl">
                {allWorks[openModal].images.map((item, imgIndex) => {
                  const isVideo = item.toLowerCase().endsWith(".mp4");
                  return (
                    <div
                      key={imgIndex}
                      ref={(el) => (imageRefs.current[imgIndex] = el)}
                      className="absolute w-full h-full flex items-center justify-center"
                      style={{ willChange: "transform, filter, opacity" }}
                    >
                      {isVideo ? (
                        <video
                          ref={(el) => (videoRefs.current[imgIndex] = el)}
                          key={item}
                          src={item}
                          className="max-w-full max-h-full object-contain"
                          loop
                          playsInline
                          preload="auto"
                          style={{ pointerEvents: imgIndex === currentIndex ? "auto" : "none" }}
                        >
                          <source src={item} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={item}
                          alt={`${allWorks[openModal].title} ${imgIndex + 1}`}
                          className="max-w-full max-h-full object-contain"
                          style={{ pointerEvents: imgIndex === currentIndex ? "auto" : "none" }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              {allWorks[openModal].images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 bg-dark hover:bg-accent text-primary w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 z-20 border border-primary/20"
                  >
                    <CaretLeft size={32} weight="bold" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 bg-dark hover:bg-accent text-primary w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 z-20 border border-primary/20"
                  >
                    <CaretRight size={32} weight="bold" />
                  </button>

                </>
              )}

              {/* Image Counter */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-primary/50 tracking-[3px] font-mono text-xs z-20 font-bold uppercase flex items-center gap-4">
                <span className="w-8 h-[1px] bg-accent" />
                {currentIndex + 1} / {allWorks[openModal].images.length}
                <span className="w-8 h-[1px] bg-accent" />
              </div>
            </div>
          ) : (
            /* Single Image Display - Full Screen Scrollable */
            <div
              className="w-full h-full overflow-y-auto overflow-x-hidden mt-16 rounded-[2rem] border border-primary/10 bg-black/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center py-8 px-4">
                <div className="w-full max-w-[1400px]">
                  <img
                    src={allWorks[openModal].image}
                    alt={allWorks[openModal].title}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
