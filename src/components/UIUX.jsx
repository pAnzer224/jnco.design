import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { X, ArrowUpRight } from "@phosphor-icons/react";

import CategoryNav from "./shared/CategoryNav";
import ReadyToBuild from "./shared/ReadyToBuild";
import GlareHover from "./GlareHover";

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

function WorkCard({ item, onClick, isChoros = false }) {
  const [loaded, setLoaded] = useState(false);
  const attribution = isChoros
    ? "by Juneco Mirande at Choros.io"
    : "by Juneco Mirande";

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left cursor-pointer group rounded-[2rem] border border-dark/10 shadow-sm bg-primary transition-all duration-300 ease-out hover:border-dark/20"
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
          {/* Tool icons */}
          <div className="flex gap-1.5 flex-shrink-0 ml-2">
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

        {/* Inner Thumbnail — every card shares the same background/reveal treatment */}
        <div
          className={`relative w-full aspect-[4/3] rounded-[1.4rem] overflow-hidden transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] ${!loaded ? "skeleton" : "bg-dark/5"}`}
        >
          {/* Shared background plate, visible by default on desktop, fades out on hover */}
          <img
            src="/images/backgrounds/thumbnail-background.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`hidden lg:block absolute inset-0 w-full h-full object-cover transition-opacity duration-[700ms] ease-out ${loaded ? "opacity-100" : "opacity-0"} lg:group-hover:opacity-0`}
          />

          {/* Real thumbnail — always visible on mobile/tablet, revealed on hover on desktop */}
          <img
            src={item.thumbnail}
            alt={`${item.title} — ${item.category} ${attribution}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[700ms] ease-out ${loaded ? "opacity-100" : "opacity-0"} lg:opacity-0 lg:group-hover:opacity-100`}
          />

          {item.thumbnailMid && (
            <img
              src={item.thumbnailMid}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-contain scale-100 origin-center transition-all duration-[700ms] ease-out ${item.subjectHoverScale || "group-hover:scale-110"}`}
            />
          )}

          {item.thumbnailSubject && (
            <img
              src={item.thumbnailSubject}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-contain scale-100 origin-center transition-all duration-[700ms] ease-out lg:grayscale lg:group-hover:grayscale-0 ${item.subjectHoverScale || "group-hover:scale-110"}`}
            />
          )}
        </div>
      </GlareHover>
    </button>
  );
}

export default function UIUX({ setActivePage }) {
  const [openModal, setOpenModal] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();

  const works = useMemo(
    () => [
      {
        type: "scrollable-image",
        images: ["/images/CW4A/cw4a1.webp"],
        thumbnail: "/images/CW4A/CW4A-background.webp",
        thumbnailSubject: "/images/CW4A/CW4A-subject.webp",
        subjectHoverScale:
          "group-hover:scale-[1.18] group-hover:translate-y-[3rem]",
        title: "CW4A",
        category: "Web Design",
        tools: ["/images/logos/photoshop.svg"],
        role: "Web Graphic Designer",
        challenge:
          "Create an engaging, modern web page for a non-profit that clearly communicates global water issues and inspires visitors to take action.",
        solution:
          "Crafted custom visual assets, photo-composites, and a warm visual hierarchy to make the organization’s mission memorable and drive community involvement.",
      },

      {
        type: "figma",
        src: "https://embed.figma.com/proto/1AS1gmmD7h2v9Mm8w9tynZ/negros-shit?node-id=12-83&starting-point-node-id=2%3A2&embed-host=share",
        thumbnail: "/images/ND/ND-background.webp",
        thumbnailSubject: "/images/ND/ND-subject.webp",
        subjectHoverScale: "group-hover:scale-110",
        title: "Negros Delights",
        category: "Mobile Application",
        tools: ["/images/logos/figma.svg"],
        role: "Product Designer & Researcher",
        challenge:
          "Create a mobile ordering experience that highlights regional delicacies of Negros, solving poor local search visibility.",
        solution:
          "Designed a user-friendly shopping checkout flow, rich localized food cards, and trackable map-delivery flows in Figma.",
        images: ["/images/negrosdelight.webp", "/images/negrosdelight.webp"],
      },

      {
        type: "scrollable-image",
        images: [
          "/images/Oracle/oracle-vid.webm",
          "/images/Oracle/oracle1.webp",
          "/images/Oracle/oracle2.webp",
          "/images/Oracle/oracle3.webp",
        ],
        thumbnail: "/images/Oracle/Oracle-background.webp",
        thumbnailMid: "/images/Oracle/Oracle-laptop.webp",
        thumbnailSubject: "/images/Oracle/Oracle-subject.gif",
        subjectHoverScale:
          "group-hover:scale-[1.18] group-hover:translate-y-[3rem]",
        title: "Oracle UI/UX Redesign",
        category: "Interface Redesign",
        tools: ["/images/logos/photoshop.svg"],
        role: "Visual UI Designer",
        challenge:
          "Redesign complex enterprise pages like corporate blogs, photo galleries, and data charts into clean and readable web layouts.",
        solution:
          "Designed structured grids, photo composites, and visual infographics in Photoshop while using the Timeline feature to animate key landing page elements.",
      },

      {
        type: "figma",
        src: "https://embed.figma.com/proto/5wBwyF60CDZL3ePNyHKVFH/UI-UX-Design-Contest?node-id=7-315&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=7%3A315&embed-host=share",
        thumbnail: "/images/LACO/LACO-background.webp",
        thumbnailSubject: "/images/LACO/LACO-subject.webp",
        subjectHoverScale:
          "group-hover:scale-[1.18] group-hover:translate-y-[3rem]",
        title: "LACO Innovation Hub",
        category: "UI/UX Figma Champion (1st Place)",
        tools: ["/images/logos/figma.svg"],
        role: "Lead UI/UX Designer",
        challenge:
          "Design a collaborative workspace for students and innovators to pitch projects, collaborate on team boards, and share IT Month resources.",
        solution:
          "Designed a clean dashboard layout in Figma featuring modular project overview widgets, gamified user statuses, and dark-themed interface states.",
        images: [
          "/images/LACO/laco1.webp",
          "/images/LACO/laco2.webp",
          "/images/LACO/laco3.webp",
          "/images/LACO/laco4.webp",
          "/images/LACO/laco5.webp",
          "/images/LACO/laco6.webp",
          "/images/LACO/laco7.webp",
        ],
        noGap: true,
      },

      {
        type: "figma",
        src: "https://embed.figma.com/proto/QONWszrkRHmMBeWeHepbgp/Task-3---Vertical-and-Horizontal-Scrolling?node-id=5-505&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=5%3A505&embed-host=share",
        thumbnail: "/images/SmartCart/SC-background.webp",
        thumbnailSubject: "/images/SmartCart/SC-subject.webp",
        subjectHoverScale: "group-hover:scale-110",
        title: "SmartCart",
        category: "Mobile App Design",
        tools: ["/images/logos/figma.svg"],
        role: "Interface Designer",
        challenge:
          "Design an intuitive mobile e-commerce interface that guides users seamlessly from product browsing through to checkout.",
        solution:
          "Crafted full mobile app screen flows featuring structured product cards, a clear cart checkout system, and a user account dashboard.",
      },

      {
        type: "figma",
        src: "https://embed.figma.com/proto/0qFy3Aq3XfHb8GE1sXmMIz/SAD?node-id=105-2838&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=105%3A2838&embed-host=share",
        thumbnail: "/images/Maestro/Maestro-background.webp",
        thumbnailSubject: "/images/Maestro/Maestro-subject.webp",
        subjectHoverScale:
          "group-hover:scale-[1.18] group-hover:translate-y-[3rem]",
        title: "Maestro Solutions",
        category: "Software Engineering Project",
        tools: ["/images/logos/figma.svg"],
        role: "Lead UI/UX Designer",
        challenge:
          "Design a modern landing page and onboarding flow for a B2B platform selling educational software and hardware to schools.",
        solution:
          "Crafted a clean hero section highlighting IT solutions alongside a multi step registration flow featuring institutional email authentication and streamlined account setup.",
        images: [
          "/images/Maestro/Maestro1.webp",
          "/images/Maestro/Maestro2.webp",
          "/images/Maestro/Maestro3.webp",
        ],
      },

      {
        type: "figma",
        src: "https://embed.figma.com/proto/jlktYX3YdOKSPDmKLWhbeC/BusyBee?node-id=18-59&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=18%3A59&embed-host=share",
        thumbnail: "/images/Busybee/BusyBee-background.webp",
        thumbnailSubject: "/images/Busybee/BusyBee-subject.webp",
        subjectHoverScale:
          "group-hover:scale-[1.18] group-hover:translate-y-[3rem]",
        title: "BusyBee",
        category: "Productivity App",
        tools: ["/images/logos/figma.svg"],
        role: "Product Designer",
        challenge:
          "Design a full to-do app experience across desktop and mobile that makes staying on top of your day feel simple instead of another chore.",
        solution:
          "Designed quick task entry, category-based organization, and clear completed/priority states across both desktop and mobile, backed by a calm, purposeful visual system that stays legible even when the list gets long.",
        images: [

          "/images/Busybee/desktop.webp",
          "/images/Busybee/desktop-empty-state.webp",
          "/images/Busybee/phone-mockup.webp",
          "/images/Busybee/color-system.webp",
        ],
      },
    ],
    [],
  );

  const chorosUIUXWorks = useMemo(
    () => [
      {
        type: "figma",
        src: "https://embed.figma.com/proto/TDPUe0WucO2hRtQSkrldip/Choros.io?node-id=4-529&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4%3A529&embed-host=share&hide-ui=1",
        thumbnail: "/images/choros-redesign/choros-background.webp",
        thumbnailSubject: "/images/choros-redesign/choros-subject.webp",
        subjectHoverScale:
          "group-hover:scale-[1.18] group-hover:translate-y-[3rem]",
        title: "Choros.io Redesign",
        category: "Skills Display",
        tools: ["/images/logos/figma.svg"],
        role: "OJT UI/UX Designer",
        challenge:
          "Redesign the core landing page for an AI website builder to clearly communicate product features, step by step workflows, and pricing tiers.",
        solution:
          "Created a full SaaS landing page layout featuring a high impact hero banner, a three step visual guide, detailed feature grids, and structured pricing cards.",
        images: [
          "/images/choros-redesign/choros1.webp",
          "/images/choros-redesign/choros2.webp",
          "/images/choros-redesign/choros3.webp",
          "/images/choros-redesign/choros4.webp",
          "/images/choros-redesign/choros5.webp",
          "/images/choros-redesign/choros6.webp",
          "/images/choros-redesign/choros7.webp",
          "/images/choros-redesign/choros8.webp",
        ],
        noGap: true,
      },
      {
        type: "figma",
        src: "https://embed.figma.com/proto/TDPUe0WucO2hRtQSkrldip/Choros.io?node-id=18-157&scaling=scale-down-width&content-scaling=fixed&page-id=2%3A2&starting-point-node-id=18%3A157&embed-host=share&hide-ui=1",
        thumbnail: "/images/ycom/ycom-background.webp",
        thumbnailSubject: "/images/ycom/ycom-subject.webp",
        subjectHoverScale:
          "group-hover:scale-[1.18] group-hover:translate-y-[3rem]",
        title: "Y-Commerce",
        category: "Figma Prototype",
        tools: ["/images/logos/figma.svg"],
        role: "OJT UI/UX Designer",
        challenge:
          "Redesign an AI-driven fintech platform to clearly present complex business funding options, loan estimation tools, and virtual advisory services.",
        solution:
          "Created responsive light and dark theme landing page components featuring interactive calculator widgets, structured funding cards, and an intuitive three-step application guide.",
        images: [
          "/images/ycom/ycom1.webp",
          "/images/ycom/ycom2.webp",
          "/images/ycom/ycom3.webp",
          "/images/ycom/ycom4.webp",
        ],
        noGap: true,
      },
    ],
    [],
  );

  const allWorks = useMemo(
    () => [...works, ...chorosUIUXWorks],
    [works, chorosUIUXWorks],
  );

  const handleClick = (index) => {
    navigate(`/uiux/${slugify(allWorks[index].title)}${location.hash}`);
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
    return () =>
      document.body.classList.remove("modal-open", "iframe-modal-open");
  }, [openModal, allWorks]);

  useEffect(() => {
    if (projectId) {
      const index = allWorks.findIndex((w) => slugify(w.title) === projectId);
      if (index !== -1) {
        setOpenModal(index);
      }
    } else if (location.state?.openProject) {
      const index = works.findIndex(
        (w) => w.title === location.state.openProject,
      );
      if (index !== -1) {
        navigate(`/uiux/${slugify(works[index].title)}${location.hash}`, { replace: true, state: {} });
      }
    } else {
      setOpenModal(null);
    }
  }, [projectId, location.state?.openProject, works, allWorks, location.hash, navigate]);

  useEffect(() => {
    if (location.hash === "#ojt-choros") {
      setTimeout(() => {
        document
          .getElementById("ojt-choros")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <section className="min-h-screen pt-12 sm:pt-16 px-4 sm:px-8 md:px-12 md:pl-[120px] lg:px-24 lg:pl-[140px] pb-16 bg-background text-dark">
      <Helmet>
        <title>UI/UX Design Portfolio | Juneco Mirande Philippines</title>
        <meta name="description" content="Explore Juneco Mirande's UI/UX design portfolio featuring mobile apps, web redesigns, and interactive Figma prototypes." />
        <link rel="canonical" href="https://juneco-mirande.web.app/uiux" />
        <meta property="og:title" content="UI/UX Design Portfolio | Juneco Mirande" />
        <meta property="og:url" content="https://juneco-mirande.web.app/uiux" />
      </Helmet>

      <h1 className="font-sans font-bold text-5xl sm:text-7xl tracking-tighter uppercase text-dark mb-4">
        UI/UX Design
      </h1>

      <CategoryNav activeCategory="uiux" setActivePage={setActivePage} />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
        {works.map((item, index) => (
          <WorkCard
            key={index}
            item={item}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      {/* OJT @ Choros Section */}
      <div id="ojt-choros" className="mt-32 pt-16 border-t-4 border-dark">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-16">
          <div>
            <h2 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tighter text-dark mb-2 flex items-center gap-3 flex-wrap">
              OJT @
              <a
                href="https://choros.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:opacity-70 transition-opacity duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src="/images/logos/choros-logo.webp"
                  alt="Choros.io"
                  loading="lazy"
                  decoding="async"
                  className="h-10 sm:h-14 w-auto object-contain"
                />
              </a>
            </h2>
            <div className="font-mono text-xs sm:text-sm text-dark/70 uppercase tracking-widest font-bold">
              UI/UX Designer & Frontend
            </div>
          </div>
          <div className="max-w-md font-mono text-sm leading-relaxed text-dark/80 bg-primary/20 p-6 rounded-[2rem] border-2 border-dark/10">
            Designed interactive prototypes and developed UI components for
            client projects at{" "}
            <a
              href="https://choros.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent font-bold hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Choros.io
            </a>
            , a UK-based IT company, ensuring responsive and intuitive user
            experiences.
          </div>
        </div>

        {/* Choros UI/UX Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
          {chorosUIUXWorks.map((item, index) => (
            <WorkCard
              key={`choros-${index}`}
              item={item}
              onClick={() => handleClick(works.length + index)}
              isChoros
            />
          ))}
        </div>
      </div>

      {/* Modal for all content types */}
      {openModal !== null && (
        <div
          className="fixed inset-0 bg-dark/95 z-[2000] flex items-center justify-center p-0 sm:p-4 md:p-8"
          onClick={() => {
            navigate(`/uiux${location.hash}`);
          }}
        >
          {/* Main Split Layout Container */}
          <div
            className="w-full max-w-7xl h-full sm:h-[90vh] md:h-[85vh] bg-[#161616]/90 border-0 sm:border border-primary/10 rounded-none sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Left Context Sidebar (30% Width on Desktop) */}
            <div className="w-full md:w-[320px] lg:w-[380px] shrink-0 order-2 md:order-1 max-h-[38vh] md:max-h-none border-t md:border-t-0 md:border-r border-primary/10 p-5 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto text-primary" data-lenis-prevent>
              <div>
                {/* Header */}
                <span className="font-mono text-[9px] text-accent tracking-[3px] uppercase font-bold">
                  {allWorks[openModal].category}
                </span>
                <h3 className="font-sans font-black text-2xl uppercase tracking-tight text-white mt-1 leading-tight">
                  {allWorks[openModal].title}
                </h3>

                <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-5">
                  {/* Role */}
                  {allWorks[openModal].role && (
                    <div>
                      <span className="font-mono text-[10px] text-primary/40 uppercase tracking-wider block font-bold">
                        My Role
                      </span>
                      <span className="text-sm font-semibold text-primary/95">
                        {allWorks[openModal].role}
                      </span>
                    </div>
                  )}

                  {/* Challenge */}
                  {allWorks[openModal].challenge && (
                    <div>
                      <span className="font-mono text-[10px] text-primary/40 uppercase tracking-wider block font-bold">
                        The Challenge
                      </span>
                      <p className="text-xs sm:text-sm text-primary/70 leading-relaxed mt-1 font-sans">
                        {allWorks[openModal].challenge}
                      </p>
                    </div>
                  )}

                  {/* Solution */}
                  {allWorks[openModal].solution && (
                    <div>
                      <span className="font-mono text-[10px] text-primary/40 uppercase tracking-wider block font-bold">
                        The Solution
                      </span>
                      <p className="text-xs sm:text-sm text-primary/70 leading-relaxed mt-1 font-sans">
                        {allWorks[openModal].solution}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom CTA / Action Link */}
              <div className="mt-6 sm:mt-8 pt-4 border-t border-primary/5 flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex gap-2">
                  {allWorks[openModal].tools.map((tool, idx) => (
                    <img
                      key={idx}
                      src={tool}
                      className="w-5 h-5 object-contain opacity-70"
                      alt="tool logo"
                    />
                  ))}
                </div>
                {(allWorks[openModal].type === "link" ||
                  allWorks[openModal].type === "figma") && (
                    <a
                      href={
                        allWorks[openModal].type === "link"
                          ? allWorks[openModal].url
                          : allWorks[openModal].src
                      }
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
            <div className="flex-1 order-1 md:order-2 bg-black/40 relative flex items-center justify-center p-0 sm:p-4 overflow-hidden min-h-[40vh] md:min-h-0">
              <button
                onClick={() => {
                  navigate(`/uiux${location.hash}`);
                }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-primary/70 hover:text-accent active:scale-95 transition-all duration-300 z-[2010] flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-primary/10 bg-dark/95"
              >
                <X size={18} weight="bold" />
              </button>

              <div className="w-full h-full">
                {allWorks[openModal].type === "scrollable-image" ||
                  allWorks[openModal].images ? (
                  <div className="w-full h-full overflow-y-auto py-4 sm:py-8 select-none" data-lenis-prevent>
                    <div
                      className={`flex flex-col items-center max-w-3xl mx-auto ${allWorks[openModal].noGap ? "gap-0" : "gap-4"}`}
                    >
                      {allWorks[openModal].images.map((img, imgIndex) =>
                        img.toLowerCase().endsWith(".webm") ||
                          img.toLowerCase().endsWith(".mp4") ? (
                          <video
                            key={imgIndex}
                            src={img}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls={false}
                            disablePictureInPicture
                            controlsList="nodownload noplaybackrate nofullscreen"
                            className={
                              allWorks[openModal].noGap
                                ? "w-full h-auto block pointer-events-none"
                                : "w-full h-auto rounded-xl border border-primary/5 shadow-lg pointer-events-none"
                            }
                          />
                        ) : (
                          <img
                            key={imgIndex}
                            src={img}
                            loading="lazy"
                            decoding="async"
                            className={
                              allWorks[openModal].noGap
                                ? "w-full h-auto block"
                                : "w-full h-auto rounded-xl border border-primary/5 shadow-lg"
                            }
                            alt={`Screenshot of ${allWorks[openModal].title}`}
                          />
                        ),
                      )}
                    </div>
                  </div>
                ) : (
                  <iframe
                    title={allWorks[openModal].title}
                    className="w-full h-full border-0 bg-dark shadow-2xl"
                    src={
                      allWorks[openModal].type === "link"
                        ? allWorks[openModal].url
                        : allWorks[openModal].src
                    }
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
