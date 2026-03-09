import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";


export default function Mockups({ setActivePage }) {
  const [openModal, setOpenModal] = useState(null);
  const navigate = useNavigate();

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
      className="min-h-screen pt-[140px] px-4 sm:px-8 md:px-12 md:pl-[120px] lg:px-24 lg:pl-[140px] pb-16 bg-background text-dark"
    >
      <button
        onClick={() => { setActivePage("home"); navigate("/"); window.scrollTo(0, 0); }}
        className="mb-[40px] text-[12px] font-mono font-bold tracking-[2px] uppercase text-dark/70 hover:text-accent transition-colors duration-300 flex items-center gap-2"
      >
        <CaretLeft size={20} weight="bold" /> Back to Index
      </button>


      <div className="font-sans font-bold text-5xl sm:text-7xl tracking-tighter uppercase text-dark mb-[80px]">
        Mockups
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
        {works.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`aspect-square overflow-hidden relative cursor-pointer group rounded-[2rem] border border-dark/10 hover:border-accent/40 shadow-sm ${!imagesLoaded[item.thumbnail] ? 'skeleton' : 'bg-primary'}`}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              onLoad={() => setImagesLoaded(prev => ({ ...prev, [item.thumbnail]: true }))}
              className={`w-full h-full object-cover transition-all duration-[800ms] ease-out group-hover:scale-105 opacity-80 mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100 ${imagesLoaded[item.thumbnail] ? 'opacity-100' : 'opacity-0'}`}
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
                  className="w-10 h-10 bg-dark/80 rounded-full flex items-center justify-center backdrop-blur-md border border-primary/20"
                >
                  <img src={tool} alt="Tool icon" className="w-5 h-5 object-contain filter invert" />
                </div>
              ))}
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
                  <img
                    src={img}
                    alt={`${works[openModal].title} ${imgIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
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
    </section>
  );
}
