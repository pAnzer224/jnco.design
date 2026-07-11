import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import CategoryNav from "./shared/CategoryNav";
import ReadyToBuild from "./shared/ReadyToBuild";


export default function Mockups({ setActivePage }) {
  const [openModal, setOpenModal] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef([]);
  const containerRef = useRef(null);

  const works = [
    {
      thumbnail: "/images/artifythumb.webp",
      images: [
        "/images/artify0.webp",
        "/images/artify1.webp",
        "/images/artify2.webp",
        "/images/artify3.webp",
      ],
      title: "Artify",
      category: "Brand Design",
      tools: ["/images/photoshop.svg"],
    },
    {
      thumbnail: "/images/panzerexoticsthumb.webp",
      images: [
        "/images/panzerexotics2.webp",
        "/images/panzerexotics3.webp",
        "/images/panzerexotics4.webp",
        "/images/panzerexotics5.webp",
        "/images/panzerexotics6.webp",
        "/images/panzerexotics7.webp",
      ],
      title: "Panzer Exotics",
      category: "Product Design",
      tools: ["/images/photoshop.svg"],
    },
    {
      thumbnail: "/images/smartcartthumb.webp",
      images: ["/images/smartcart1.webp"],
      title: "SmartCart",
      category: "Mobile Design",
      tools: ["/images/photoshop.svg"],
    },
  ];

  const handleClick = (index) => {
    setOpenModal(index);
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (openModal !== null && imageRefs.current.length > 0) {
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
        }
      });
    }
  }, [currentIndex, openModal]);

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

  const [imagesLoaded, setImagesLoaded] = useState({});

  return (
    <section
      className="min-h-screen pt-12 sm:pt-16 px-4 sm:px-8 md:px-12 md:pl-[120px] lg:px-24 lg:pl-[140px] pb-16 bg-background text-dark"
    >
      <div className="font-sans font-bold text-5xl sm:text-7xl tracking-tighter uppercase text-dark mb-4">
        Mockups
      </div>

      <CategoryNav activeCategory="mockups" setActivePage={setActivePage} />

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

      {/* Modal with Horizontal Gallery */}
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


          <div
            ref={containerRef}
            className="relative w-full max-w-7xl h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[2rem] bg-black border border-primary/10 shadow-2xl">
              {works[openModal].images.map((img, imgIndex) => (
                <div
                  key={imgIndex}
                  ref={(el) => (imageRefs.current[imgIndex] = el)}
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{ willChange: "transform, filter, opacity" }}
                >
                  <img src={img} alt={`${works[openModal].title} — Juneco Mirande`} className="max-w-full max-h-full object-contain"
                    style={{ pointerEvents: imgIndex === currentIndex ? "auto" : "none" }}
                  />
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            {works[openModal].images.length > 1 && (
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
              {currentIndex + 1} / {works[openModal].images.length}
              <span className="w-8 h-[1px] bg-accent" />
            </div>
          </div>
        </div>
      )}
      {/* Shared Ready to Build CTA */}
      <div className="max-w-4xl mx-auto mt-20">
        <ReadyToBuild />
      </div>
    </section>
  );
}
