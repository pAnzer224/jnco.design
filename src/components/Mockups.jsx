import React, { useState, useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import CategoryNav from "./shared/CategoryNav";
import ReadyToBuild from "./shared/ReadyToBuild";
import GlareHover from "./GlareHover";

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function Mockups({ setActivePage }) {
  const [openModal, setOpenModal] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef([]);
  const containerRef = useRef(null);

  const works = useMemo(() => [
    {
      thumbnail: "/images/artify/thumb.webp",
      images: [
        "/images/artify/artify0.webp",
        "/images/artify/artify1.webp",
        "/images/artify/artify2.webp",
        "/images/artify/artify3.webp",
      ],
      title: "Artify",
      category: "Brand Design",
      tools: ["/images/logos/photoshop.svg"],
    },
    {
      thumbnail: "/images/panzer-exotics/thumb.webp",
      images: [
        "/images/panzer-exotics/panzerexotics2.webp",
        "/images/panzer-exotics/panzerexotics3.webp",
        "/images/panzer-exotics/panzerexotics4.webp",
        "/images/panzer-exotics/panzerexotics5.webp",
        "/images/panzer-exotics/panzerexotics6.webp",
        "/images/panzer-exotics/panzerexotics7.webp",
      ],
      title: "Panzer Exotics",
      category: "Product Design",
      tools: ["/images/logos/photoshop.svg"],
    },
    {
      thumbnail: "/images/SmartCart/thumb.webp",
      images: ["/images/SmartCart/smartcart1.webp"],
      title: "SmartCart",
      category: "Mobile Design",
      tools: ["/images/logos/photoshop.svg"],
    },
  ], []);

  const handleClick = (index) => {
    navigate(`/mockups/${slugify(works[index].title)}${location.hash}`);
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
            opacity: 1,
            zIndex: 10,
            duration: 0.6,
            ease: "power2.out",
          });
        } else {
          // Other images - offset, scaled down, no blur
          const offset = distance * 45; // percentage offset
          gsap.to(img, {
            x: `${offset}%`,
            scale: 0.7 - absDistance * 0.1,
            opacity: absDistance === 1 ? 0.6 : 0.3,
            zIndex: 10 - absDistance,
            duration: 0.6,
            ease: "power2.out",
          });
        }
      });
    }
  }, [currentIndex, openModal]);

  useEffect(() => {
    if (projectId) {
      const idx = works.findIndex((w) => slugify(w.title) === projectId);
      if (idx !== -1) {
        setOpenModal(idx);
        setCurrentIndex(0);
      }
    } else if (location.state?.openProject) {
      const idx = works.findIndex((w) => w.title === location.state.openProject);
      if (idx !== -1) {
        navigate(`/mockups/${slugify(works[idx].title)}${location.hash}`, { replace: true, state: {} });
      }
    } else {
      setOpenModal(null);
    }
  }, [projectId, location.state?.openProject, location.hash, works, navigate]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : works[openModal].images.length - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < works[openModal].images.length - 1 ? prev + 1 : 0,
    );
  };

  const [imagesLoaded, setImagesLoaded] = useState({});

  return (
    <section className="min-h-screen pt-12 sm:pt-16 px-4 sm:px-8 md:px-12 md:pl-[120px] lg:px-24 lg:pl-[140px] pb-16 bg-background text-dark">
      <Helmet>
        <title>Product Mockups Portfolio | Juneco Mirande Philippines</title>
        <meta name="description" content="Explore Juneco Mirande's product mockups and 3D visual design concepts." />
        <link rel="canonical" href="https://juneco-mirande.web.app/mockups" />
        <meta property="og:title" content="Product Mockups Portfolio | Juneco Mirande" />
        <meta property="og:url" content="https://juneco-mirande.web.app/mockups" />
      </Helmet>

      <h1 className="font-sans font-bold text-5xl sm:text-7xl tracking-tighter uppercase text-dark mb-4">
        Mockups
      </h1>

      <CategoryNav activeCategory="mockups" setActivePage={setActivePage} />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
        {works.map((item, index) => {
          const imageCount = item.images.length;
          const showBadge = imageCount >= 2;
          return (
            <button
              type="button"
              key={index}
              onClick={() => handleClick(index)}
              className="text-left flex flex-col cursor-pointer group rounded-[2rem] border border-dark/10 shadow-sm bg-primary transition-all duration-300 ease-out hover:border-dark/20"
            >
              <GlareHover
                width="100%"
                height="100%"
                borderRadius="2rem"
                glareColor="#ffffff"
                glareOpacity={0.15}
                glareAngle={-30}
                glareSize={220}
                transitionDuration={900}
                className="flex flex-col p-3"
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
                  {/* Tool icons + badge */}
                  <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                    {showBadge && (
                      <span
                        aria-label={`${imageCount} items`}
                        className="font-mono text-[10px] font-bold leading-none px-2 py-1 rounded-full border bg-dark/6 border-dark/10 text-dark/35"
                      >
                        {imageCount}
                      </span>
                    )}
                    {item.tools.map((tool, toolIndex) => (
                      <div
                        key={toolIndex}
                        className="w-7 h-7 rounded-full bg-background flex items-center justify-center border border-dark/10"
                      >
                        <img
                          src={tool}
                          alt={`${tool.split("/").pop().replace(".svg", "").replace(".png", "")} icon`}
                          className="w-4 h-4 object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inner Thumbnail */}
                <div
                  className={`relative w-full aspect-[4/3] rounded-[1.4rem] overflow-hidden transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] ${!imagesLoaded[item.thumbnail] ? "skeleton" : "bg-dark/5"}`}
                >
                  <img
                    src={item.thumbnail}
                    alt={`${item.title} — ${item.category} by Juneco Mirande`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() =>
                      setImagesLoaded((prev) => ({
                        ...prev,
                        [item.thumbnail]: true,
                      }))
                    }
                    className={`w-full h-full object-cover transition-all duration-[700ms] ease-out lg:grayscale lg:group-hover:grayscale-0 ${imagesLoaded[item.thumbnail] ? "opacity-100" : "opacity-0"}`}
                  />
                </div>
              </GlareHover>
            </button>
          );
        })}
      </div>

      {/* Modal with Horizontal Gallery */}
      {openModal !== null && (
        <div
          className="fixed inset-0 bg-dark/95 z-[2000] flex items-center justify-center p-4 sm:p-8"
          onClick={() => {
            navigate(`/mockups${location.hash}`);
          }}
        >
          <button
            onClick={() => {
              navigate(`/mockups${location.hash}`);
            }}
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
                    alt={`${works[openModal].title} — Juneco Mirande`}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain"
                    style={{
                      pointerEvents:
                        imgIndex === currentIndex ? "auto" : "none",
                    }}
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
      <div className="w-full mt-20">
        <ReadyToBuild />
      </div>
    </section>
  );
}
