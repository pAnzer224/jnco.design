import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { X, ArrowUpRight, ArrowsLeftRight } from "@phosphor-icons/react";
import { Helmet } from "react-helmet-async";

import CategoryNav from "./shared/CategoryNav";
import ReadyToBuild from "./shared/ReadyToBuild";
import GlareHover from "./GlareHover";

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export default function WebDev({ setActivePage }) {
  const [openModalItem, setOpenModalItem] = useState(null);
  const [iframeWidth, setIframeWidth] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const centerX = window.innerWidth / 2;
      const distanceFromCenter = Math.abs(e.clientX - centerX);
      const newWidthPx = distanceFromCenter * 2;
      const percentage = (newWidthPx / window.innerWidth) * 100;
      setIframeWidth(Math.max(30, Math.min(100, percentage)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  const works = useMemo(
    () => [
      {
        type: "link",
        url: "https://trekkorentals.web.app/",
        thumbnail: "/images/trekko/trekko-background.webp",
        thumbnailSubject: "/images/trekko/trekko-subject.webp",
        subjectHoverScale:
          "group-hover:scale-[1.18] group-hover:translate-y-[3rem]",
        title: "Trekko Rentals",
        category: "Full-Stack Web App",
        tools: [
          "/images/logos/nextjs.svg",
          "/images/logos/tailwind.svg",
          "/images/logos/firebase.svg",
        ],
        role: "Full-Stack Developer",
        challenge:
          "Develop a user-friendly rental platform for outdoor enthusiasts to browse inventory, understand the booking process, and manage rental requirements efficiently.",
        solution:
          "Designed a responsive web interface featuring a streamlined rental guide, clear procedural FAQ, and an intuitive product catalog to simplify equipment bookings for hikers and campers.",
      },
      {
        type: "link",
        url: "https://drjaspetcare.vercel.app/",
        thumbnail: "/images/drjas/drjas-background.webp",
        thumbnailSubject: "/images/drjas/drjas-subject.webp",
        subjectHoverScale:
          "group-hover:scale-[1.18] group-hover:translate-y-[3rem]",
        title: "Dr. Jas Pet Care",
        category: "Capstone Project",
        tools: [
          "/images/logos/nextjs.svg",
          "/images/logos/tailwind.svg",
          "/images/logos/supabase.svg",
        ],
        role: "Full-Stack Developer (Best Capstone Designer)",
        challenge:
          "Build a secure patient portal and appointment booker for a local veterinary clinic to replace manual entry workflows.",
        solution:
          "Engineered a Next.js frontend with Supabase backend tables, integrating real-time scheduling widgets and patient health histories.",
      },
    ],
    [],
  );

  const chorosWorks = useMemo(
    () => [
      {
        type: "link",
        url: "https://youreventcover.co.uk/",
        thumbnail: "/images/youreventcover/youreventcover.webp",
        title: "Your Event Cover",
        category: "Front-end & UI/UX Design",
        tools: [
          "/images/logos/figma.svg",
          "/images/logos/laravel.svg",
          "/images/logos/tailwind.svg",
        ],
        disableIframe: true,
        role: "OJT Frontend Developer & QA",
        challenge:
          "Develop and test responsive agency-designed interface elements for a UK event insurance platform.",
        solution:
          "Optimized Blade template rendering, styled card grids with Tailwind CSS, and verified mobile interface responsiveness.",
      },
      {
        type: "link",
        url: "https://goodplumbing.co.uk/",
        thumbnail: "/images/goodplumbing/goodplumbing.webp",
        title: "Good Plumbing",
        category: "Front-end & UI/UX Design",
        tools: [
          "/images/logos/figma.svg",
          "/images/logos/laravel.svg",
          "/images/logos/tailwind.svg",
        ],
        disableIframe: true,
        role: "OJT Frontend Developer & QA",
        challenge:
          "Collaborate on a clean frontend build to showcase plumbing services and simplify local service bookings.",
        solution:
          "Designed and implemented CSS layouts, aligned assets with visual guidelines, and ran cross-browser compatibility tests.",
      },
      {
        type: "link",
        url: "https://manorvale-main.laravel.cloud/",
        thumbnail: "/images/manorvale/manorvale.webp",
        title: "Manorvale",
        category: "Front-end & UI/UX Design",
        tools: [
          "/images/logos/figma.svg",
          "/images/logos/laravel.svg",
          "/images/logos/tailwind.svg",
        ],
        disableIframe: true,
        role: "OJT Frontend Developer & QA",
        challenge:
          "Translate approved Figma desktop designs into a responsive, component-driven Laravel build.",
        solution:
          "Built custom cards and headers, styled interactive client components, and fixed mobile alignment bugs.",
      },
      {
        type: "link",
        url: "https://mould-damp.co.uk/",
        thumbnail: "/images/mould/mould.webp",
        title: "Mould Damp",
        category: "Front-end & UI/UX Design",
        tools: [
          "/images/logos/figma.svg",
          "/images/logos/laravel.svg",
          "/images/logos/tailwind.svg",
        ],
        disableIframe: true,
        role: "OJT Frontend Developer & QA",
        challenge:
          "Develop a content-heavy service directory focusing on clean readability and quick loading speeds.",
        solution:
          "Refactored template stylesheets, optimized layout structures, and audited site files to improve overall page weight.",
      },
      {
        type: "link",
        url: "https://wefit-main.laravel.cloud/",
        thumbnail: "/images/wefit/wefit.webp",
        title: "We Fit",
        category: "Front-end & UI/UX Design",
        tools: [
          "/images/logos/figma.svg",
          "/images/logos/laravel.svg",
          "/images/logos/tailwind.svg",
        ],
        disableIframe: true,
        role: "OJT Frontend Developer & QA",
        challenge:
          "Deploy interactive frontend components for a fitness installation landing page.",
        solution:
          "Developed contact request forms, styled high-fidelity hero grids, and audited interactive page elements.",
      },
    ],
    [],
  );

  const handleClick = (item) => {
    navigate(`/webdev/${slugify(item.title)}${location.hash}`);
  };

  useEffect(() => {
    if (openModalItem !== null) {
      setIframeWidth(100); // Reset width when opening a new project
      document.body.classList.add("modal-open");
      if (openModalItem.type !== "scrollable-image") {
        document.body.classList.add("iframe-modal-open");
      }
    } else {
      document.body.classList.remove("modal-open", "iframe-modal-open");
    }
    return () =>
      document.body.classList.remove("modal-open", "iframe-modal-open");
  }, [openModalItem]);

  useEffect(() => {
    if (projectId) {
      const project =
        works.find((w) => slugify(w.title) === projectId) ||
        chorosWorks.find((w) => slugify(w.title) === projectId);
      if (project) {
        setOpenModalItem(project);
      }
    } else if (location.state?.openProject) {
      const project =
        works.find((w) => w.title === location.state.openProject) ||
        chorosWorks.find((w) => w.title === location.state.openProject);
      if (project) {
        navigate(`/webdev/${slugify(project.title)}${location.hash}`, { replace: true, state: {} });
      }
    } else {
      setOpenModalItem(null);
    }
  }, [projectId, location.state?.openProject, works, chorosWorks, location.hash, navigate]);

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

  const [imagesLoaded, setImagesLoaded] = useState({});

  return (
    <section className="min-h-screen pt-12 sm:pt-16 px-4 sm:px-8 md:px-12 md:pl-[120px] lg:px-24 lg:pl-[140px] pb-16 bg-background text-dark">
      <Helmet>
        <title>Web Development Portfolio | Juneco Mirande Philippines</title>
        <meta name="description" content="Explore Juneco Mirande's web development portfolio featuring Next.js apps, Laravel projects, and fully responsive websites." />
        <link rel="canonical" href="https://juneco-mirande.web.app/webdev" />
        <meta property="og:title" content="Web Development Portfolio | Juneco Mirande" />
        <meta property="og:url" content="https://juneco-mirande.web.app/webdev" />
      </Helmet>

      <h1 className="font-sans font-bold text-5xl sm:text-7xl tracking-tighter uppercase text-dark mb-4">
        Web Development
      </h1>

      <CategoryNav activeCategory="webdev" setActivePage={setActivePage} />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
        {works.map((item, index) => (
          <button
            type="button"
            key={index}
            onClick={() => handleClick(item)}
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

              {/* Inner Thumbnail */}
              <div
                className={`relative w-full aspect-[4/3] rounded-[1.4rem] overflow-hidden transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] ${!imagesLoaded[item.thumbnail] ? "skeleton" : "bg-dark/5"}`}
              >
                <img
                  src="/images/backgrounds/thumbnail-background.webp"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  onLoad={() =>
                    setImagesLoaded((prev) => ({
                      ...prev,
                      [item.thumbnail]: true,
                    }))
                  }
                  className={`hidden lg:block absolute inset-0 w-full h-full object-cover transition-opacity duration-[700ms] ease-out ${imagesLoaded[item.thumbnail] ? "opacity-100" : "opacity-0"} lg:group-hover:opacity-0`}
                />
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
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[700ms] ease-out ${imagesLoaded[item.thumbnail] ? "opacity-100" : "opacity-0"} lg:opacity-0 lg:group-hover:opacity-100`}
                />
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
        ))}
      </div>

      {/* OJT Section */}
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
            , a UK-based IT company, on front-end builds and UI design for
            multiple client websites. Part of a team — not flying solo.
          </div>
        </div>

        {/* OJT Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full border-t border-dark/10 pt-10">
          {chorosWorks.map((item, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handleClick(item)}
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

                {/* Inner Thumbnail */}
                <div
                  className={`relative w-full aspect-[4/3] rounded-[1.4rem] overflow-hidden transition-all duration-300 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] ${!imagesLoaded[item.thumbnail] ? "skeleton" : "bg-dark/5"}`}
                >
                  <img
                    src={item.thumbnail}
                    alt={`${item.title} — ${item.category} by Juneco Mirande at Choros.io`}
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
          ))}
        </div>
      </div>

      {/* Modal for all content types */}
      {openModalItem !== null && (
        <div
          className="fixed inset-0 bg-dark/95 z-[2000] flex items-center justify-center p-4 md:p-8"
          onClick={() => {
            navigate(`/webdev${location.hash}`);
          }}
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
                  {openModalItem.category}
                </span>
                <h3 className="font-sans font-black text-2xl uppercase tracking-tight text-white mt-1 leading-tight">
                  {openModalItem.title}
                </h3>

                <div className="mt-6 space-y-5">
                  {/* Role */}
                  {openModalItem.role && (
                    <div>
                      <span className="font-mono text-[10px] text-primary/40 uppercase tracking-wider block font-bold">
                        My Role
                      </span>
                      <span className="text-sm font-semibold text-primary/95">
                        {openModalItem.role}
                      </span>
                    </div>
                  )}

                  {/* Challenge */}
                  {openModalItem.challenge && (
                    <div>
                      <span className="font-mono text-[10px] text-primary/40 uppercase tracking-wider block font-bold">
                        The Challenge
                      </span>
                      <p className="text-xs sm:text-sm text-primary/70 leading-relaxed mt-1 font-sans">
                        {openModalItem.challenge}
                      </p>
                    </div>
                  )}

                  {/* Solution */}
                  {openModalItem.solution && (
                    <div>
                      <span className="font-mono text-[10px] text-primary/40 uppercase tracking-wider block font-bold">
                        The Solution
                      </span>
                      <p className="text-xs sm:text-sm text-primary/70 leading-relaxed mt-1 font-sans">
                        {openModalItem.solution}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom CTA / Action Link */}
              <div className="mt-8 pt-4 border-t border-primary/5 flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  {openModalItem.tools.map((tool, idx) => (
                    <img
                      key={idx}
                      src={tool}
                      className="w-5 h-5 object-contain opacity-70"
                      alt="tool logo"
                    />
                  ))}
                </div>
                {openModalItem.url && (
                  <a
                    href={openModalItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest transition-all animate-pulse"
                  >
                    Open Live <ArrowUpRight size={12} weight="bold" />
                  </a>
                )}
              </div>
            </div>

            {/* 2. Right Interactive Canvas (70% Width) */}
            <div className="flex-1 bg-black/40 relative flex items-center justify-center p-4 overflow-hidden">
              <button
                onClick={() => {
                  navigate(`/webdev${location.hash}`);
                }}
                className="absolute top-4 right-4 text-primary/50 hover:text-accent transition-colors duration-300 z-[2010] flex items-center justify-center w-10 h-10 rounded-full border border-primary/10 bg-dark/80"
              >
                <X size={20} weight="bold" />
              </button>

              <div className="w-full h-full">
                {openModalItem.disableIframe ? (
                  <div className="w-full h-full flex flex-col overflow-hidden relative">
                    {/* Mock Browser Header */}
                    <div className="w-full h-10 bg-background/5 border-b border-primary/10 flex items-center px-4 gap-2 shrink-0">
                      <div className="flex gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block"></span>
                      </div>
                      <div className="flex-1 max-w-sm mx-auto h-6 bg-dark/45 rounded flex items-center px-3 border border-primary/5 select-none justify-center">
                        <span className="font-mono text-[10px] text-primary/40 truncate tracking-wide">
                          {openModalItem.url}
                        </span>
                      </div>
                    </div>

                    {/* Mock Browser Content */}
                    <div className="flex-1 relative w-full overflow-y-auto flex items-center justify-center p-4 sm:p-6">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-25 scale-110 pointer-events-none"
                        style={{
                          backgroundImage: `url('${openModalItem.thumbnail}')`,
                        }}
                      />

                      {/* Glassmorphic presentation card */}
                      <div className="relative z-10 w-full max-w-md bg-dark/90 rounded-[2rem] border border-primary/10 p-5 text-center flex flex-col items-center shadow-2xl my-auto">
                        <div className="w-full aspect-[16/9] rounded-[1rem] overflow-hidden mb-4 border border-primary/15 bg-dark/20 relative group">
                          <img
                            src={openModalItem.thumbnail}
                            alt={openModalItem.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>

                        <p className="font-mono text-[11px] text-primary/70 leading-relaxed max-w-xs mb-4">
                          This project is hosted on a secure production server.
                          Click below to launch the live site in a new tab!
                        </p>

                        <a
                          href={openModalItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-accent hover:bg-accent/90 text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-accent/25 hover:scale-[1.02]"
                        >
                          Launch Live Project
                          <ArrowUpRight size={14} weight="bold" />
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full pb-4 sm:pb-8">
                    {/* Iframe Container */}
                    <div
                      className={`h-full relative flex-shrink-0 ${isDragging ? "" : "transition-all duration-300 ease-out"}`}
                      style={{ width: `${iframeWidth}%` }}
                    >
                      {/* The actual iframe */}
                      <iframe
                        title={openModalItem.title}
                        className="w-full h-full rounded-[1.5rem] border border-primary/20 bg-dark shadow-2xl"
                        src={openModalItem.url}
                        allowFullScreen
                        style={{ pointerEvents: isDragging ? "none" : "auto" }}
                      />

                      {/* Draggable vertical bar on the right (Hidden on mobile) */}
                      <div
                        className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-32 cursor-col-resize hidden sm:flex items-center justify-center group z-[2005]"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        title="Drag to resize screen"
                      >
                        {/* Visual handle */}
                        <div
                          className={`relative h-full rounded-full border shadow-lg transition-all duration-300 flex items-center justify-center overflow-hidden ${isDragging ? "w-5 bg-accent border-accent text-dark" : "w-1.5 bg-primary/30 border-primary/20 group-hover:w-5 group-hover:bg-accent/80 group-hover:border-accent group-hover:text-dark text-transparent"}`}
                        >
                          {/* Inner grip line (fades out on hover) */}
                          <div
                            className={`absolute w-0.5 h-8 bg-dark/40 rounded-full transition-opacity duration-300 ${isDragging ? "opacity-0" : "group-hover:opacity-0"}`}
                          />

                          {/* Left-Right Arrows Icon (fades in on hover) */}
                          <ArrowsLeftRight
                            size={14}
                            weight="bold"
                            className={`absolute transition-opacity duration-300 ${isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
