"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowUpRight, CalendarBlank } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_IMAGE = "/images/projects-section/fractal-glass.webp";

const categories = [
  {
    title: "Graphic Design",
    desc: "Branding, Marketing & Visual Identity",
    path: "/graphics",
    serviceParam: "graphic",
    thumbs: [
      "/images/projects-section/graphic-thumb1.webp",
      "/images/projects-section/graphic-thumb2.webp",
      "/images/projects-section/graphic-thumb3.webp",
      "/images/projects-section/graphic-thumb4.webp",
    ],
  },
  {
    title: "UI/UX",
    desc: "Interface Design & User Experience",
    path: "/uiux",
    serviceParam: "uiux",
    thumb: "/images/projects-section/uiux-thumb.webp",
  },
  {
    title: "Web Dev",
    desc: "Full-Stack Applications & Code",
    path: "/webdev",
    serviceParam: "webdev",
    thumb: "/images/projects-section/webdev-thumb.webp",
  },
];

// ── Desktop/Tablet: original GSAP stacking card experience ──────────────────
const DesktopProjectsArchive = ({ setActivePage }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const router = useRouter();

  useEffect(() => {
    let ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          onEnter: () =>
            setActivePage && setActivePage(categories[index].path.substring(1)),
          onEnterBack: () =>
            setActivePage && setActivePage(categories[index].path.substring(1)),
        });

        if (index < cardsRef.current.length - 1) {
          gsap.to(card.querySelector(".card-inner"), {
            scrollTrigger: {
              trigger: cardsRef.current[index + 1],
              start: "top 90%",
              end: "top 0%",
              scrub: true,
            },
            scale: 0.9,
            ease: "none",
          });
        }
      });

      gsap.to(".projects-sticky-header", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 95%",
          end: "bottom 80%",
          scrub: true,
        },
        opacity: 0,
        y: -30,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onLeave: () => setActivePage && setActivePage("home"),
        onLeaveBack: () => setActivePage && setActivePage("home"),
      });
    }, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={containerRef}
      id="work-archive"
      className="relative w-full bg-background mt-0 min-h-screen md:pl-[120px] lg:pl-[140px]"
    >
      <div className="projects-sticky-header text-center sticky top-0 py-16 z-0 pointer-events-none">
        <h2 className="font-sans font-bold text-lg md:text-2xl tracking-[0.2em] uppercase text-dark/70">
          Projects
        </h2>
      </div>

      <div className="relative pb-32 z-10">
        {categories.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => (cardsRef.current[idx] = el)}
            className="w-full h-[100dvh] flex items-center justify-center px-4 sm:px-8"
          >
            <div
              onClick={() => {
                router.push(card.path);
              }}
              data-cursor-text="View"
              className="card-inner flex flex-col w-full max-w-5xl h-[70vh] rounded-tl-[2rem] rounded-tr-[2rem] rounded-br-[2rem] rounded-bl-lg sm:rounded-tl-[3rem] sm:rounded-tr-[3rem] sm:rounded-br-[3rem] sm:rounded-bl-2xl overflow-hidden cursor-pointer group shadow-2xl border-t-4 border-background bg-[#272726] text-primary p-3"
            >
              {/* Image — raw fractal-glass, hugs bottom-left */}
              <div className="relative w-full flex-1 min-h-0 rounded-[1.4rem] rounded-tr-[1.6rem] rounded-tl-[1.6rem] overflow-hidden bg-primary/5 sm:rounded-tr-[2.2rem] sm:rounded-tl-[2.2rem]">
                <div
                  className="absolute inset-0 bg-cover"
                  style={{
                    backgroundImage: `url('${PROJECT_IMAGE}')`,
                    backgroundPosition: "left bottom",
                  }}
                />
                {card.thumb && (
                  <img
                    src={card.thumb}
                    alt={`${card.title} thumbnail`}
                    className="absolute left-[5%] top-[58%] -translate-y-1/3 w-[135%] max-w-none pointer-events-none origin-top scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.15] sm:left-[15%] sm:top-1/2 sm:-translate-y-1/2 sm:w-[95%] sm:max-w-[843px]"
                  />
                )}

                {card.thumbs && (
                  <>
                    <img
                      src={card.thumbs[0]}
                      alt={`${card.title} thumbnail 1`}
                      className="absolute left-[17%] top-0 w-[95%] h-full object-contain object-left pointer-events-none scale-125 origin-top-left transition-transform duration-[1800ms] ease-out group-hover:translate-y-5 group-hover:scale-125"
                    />
                    <img
                      src={card.thumbs[1]}
                      alt={`${card.title} thumbnail 2`}
                      className="absolute left-[17%] top-0 w-[95%] h-full object-contain object-left pointer-events-none scale-125 origin-top-left transition-transform duration-[1800ms] ease-out group-hover:-translate-y-5 group-hover:scale-125"
                    />
                    <img
                      src={card.thumbs[2]}
                      alt={`${card.title} thumbnail 3`}
                      className="absolute left-[17%] top-0 w-[95%] h-full object-contain object-left pointer-events-none scale-125 origin-top-left transition-transform duration-[1800ms] ease-out group-hover:translate-y-5 group-hover:scale-125"
                    />
                    {card.thumbs[3] && (
                      <img
                        src={card.thumbs[3]}
                        alt={`${card.title} thumbnail 4`}
                        className="absolute left-[17%] top-0 w-[95%] h-full object-contain object-left pointer-events-none scale-125 origin-top-left transition-transform duration-[1800ms] ease-out group-hover:-translate-y-5 group-hover:scale-125"
                      />
                    )}
                  </>
                )}
              </div>

              {/* Footer: title + desc — moved to bottom */}
              <div className="flex items-center justify-between mt-3 px-2 pb-1">
                <div className="min-w-0">
                  <div className="font-sans font-bold text-2xl sm:text-3xl uppercase tracking-tight leading-tight truncate text-primary">
                    {card.title}
                  </div>
                  <div className="font-mono text-[10px] text-accent tracking-[2px] uppercase font-bold mt-0.5">
                    {card.desc}
                  </div>
                </div>
                <button
                  id={`inquire-${card.serviceParam}`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/booking?service=${card.serviceParam}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 text-primary/50 hover:border-accent hover:text-accent hover:bg-accent/10 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 flex-shrink-0 ml-2"
                >
                  <CalendarBlank size={13} weight="duotone" />
                  Inquire for this
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section >
  );
};

// ── Root ──────────────────────────────────────────────────────────────────
const ProjectsArchive = ({ setActivePage }) => {
  return <DesktopProjectsArchive setActivePage={setActivePage} />;
};

export default ProjectsArchive;