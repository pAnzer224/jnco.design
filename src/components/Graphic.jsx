import React, { useState, useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";

export default function Graphics({ setActivePage }) {
  const [openModal, setOpenModal] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef([]);
  const containerRef = useRef(null);

  const works = useMemo(
    () => [
      {
        type: "gallery",
        thumbnail: "/images/neue/logo.jpg",
        images: [
          "/images/neue/logo.jpg",
          "/images/neue/logo2.jpg",
          "/images/neue/neue1.jpg",
          "/images/neue/neue2.jpg",
          "/images/neue/vid.mp4",
        ],
        title: "Neue Dept.",
        category: "Branding/Marketing Graphics",
        tools: ["/images/photoshop.svg"],
      },
      {
        type: "gallery",
        thumbnail: "/images/TI/english/thumb.jpg",
        images: [
          "/images/TI/english/1.jpg",
          "/images/TI/english/2.jpg",
          "/images/TI/english/3.jpg",
          "/images/TI/english/4.jpg",
          "/images/TI/english/5.jpg",
          "/images/TI/english/6.jpg",
        ],
        title: "TI",
        category: "Branding/Marketing Graphics",
        tools: ["/images/photoshop.svg"],
      },
      {
        type: "single",
        thumbnail: "/images/postermakingthumb.jpg",
        image: "/images/postermaking.jpg",
        title: "Poster Making",
        category: "Photo Manipulation",
        tools: ["/images/photoshop.svg"],
      },
      {
        type: "single",
        thumbnail: "/images/simulatedsanctuarythumb.jpg",
        image: "/images/simulatedsanctuary.jpg",
        title: "Simulated Sanctuary",
        category: "Photo Manipulation",
        tools: ["/images/photoshop.svg"],
      },
      {
        type: "single",
        thumbnail: "/images/graphic1.jpg",
        image: "/images/graphic1.jpg",
        title: "Infographic",
        category: "Information Design",
        tools: ["/images/photoshop.svg"],
      },
    ],
    []
  );

  const videoRefs = useRef({});

  const handleClick = (index) => {
    setOpenModal(index);
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (
      openModal !== null &&
      works[openModal].type === "gallery" &&
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
          const currentItem = works[openModal].images[index];
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
          const item = works[openModal].images[index];
          if (item.toLowerCase().endsWith(".mp4") && videoRefs.current[index]) {
            videoRefs.current[index].pause();
          }
        }
      });
    }
  }, [currentIndex, openModal, works]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : works[openModal].images.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < works[openModal].images.length - 1 ? prev + 1 : 0
    );
  };

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
        Graphic Design
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] max-w-[1400px]">
        {works.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
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

      {/* Modal */}
      {openModal !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-[2000] flex items-center justify-center p-4"
          onClick={() => setOpenModal(null)}
        >
          <button
            onClick={() => setOpenModal(null)}
            className="absolute top-20 right-8 bg-[#669BBC] text-white text-sm font-light tracking-[1px] uppercase hover:bg-[#003049] transition-colors duration-300 z-[2001] flex items-center gap-2 px-6 py-3 rounded"
            style={{ fontFamily: "'Chainprinter', monospace" }}
          >
            ← Return to Gallery
          </button>

          {/* Gallery Type - Next/Previous Navigation (Neue & TI) */}
          {works[openModal].type === "gallery" ? (
            <div
              ref={containerRef}
              className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Gallery Container */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {works[openModal].images.map((item, imgIndex) => {
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
                          style={{
                            pointerEvents:
                              imgIndex === currentIndex ? "auto" : "none",
                          }}
                        >
                          <source src={item} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={item}
                          alt={`${works[openModal].title} ${imgIndex + 1}`}
                          className="max-w-full max-h-full object-contain"
                          style={{
                            pointerEvents:
                              imgIndex === currentIndex ? "auto" : "none",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              {works[openModal].images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#669BBC] hover:bg-[#003049] text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 z-20"
                    style={{ fontFamily: "'Chainprinter', monospace" }}
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#669BBC] hover:bg-[#003049] text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 z-20"
                    style={{ fontFamily: "'Chainprinter', monospace" }}
                  >
                    →
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm z-20"
                style={{ fontFamily: "'Chainprinter', monospace" }}
              >
                {currentIndex + 1} / {works[openModal].images.length}
              </div>
            </div>
          ) : (
            /* Single Image Display - Full Screen Scrollable */
            <div
              className="w-full h-full overflow-y-auto overflow-x-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#669BBC #1a1a1a",
              }}
            >
              <div className="flex flex-col items-center py-8 px-4">
                <div className="w-full max-w-[1400px]">
                  <img
                    src={works[openModal].image}
                    alt={works[openModal].title}
                    className="w-full h-auto"
                    style={{ display: "block" }}
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
