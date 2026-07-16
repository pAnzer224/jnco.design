import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Cursor, CursorClick, CursorTextIcon, ArrowUpRight } from "@phosphor-icons/react";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Graphics from "./components/Graphic";
import Mockups from "./components/Mockups";
import UIUX from "./components/UIUX";
import WebDev from "./components/WebDev";
import NotFound from "./components/NotFound";
import Booking from "./components/Booking";
import Resume from "./components/Resume";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const location = useLocation();


  const cursorRef = useRef(null);
  const tooltipRef = useRef(null);
  const [cursorState, setCursorState] = useState("default"); // default, click, text, hover-text
  const [cursorText, setCursorText] = useState("");
  const [cursorStyle, setCursorStyle] = useState("default"); // "default" or "tooltip"

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActivePage("home");
    else if (path === "/graphics") setActivePage("graphic");
    else if (path === "/mockups") setActivePage("mockups");
    else if (path === "/uiux") setActivePage("uiux");
    else if (path === "/webdev") setActivePage("webdev");
    else if (path === "/booking") setActivePage("booking");
    else if (path.includes("#contact") || activePage === "contact")
      setActivePage("contact");

    // Disable custom cursor on resume page
    if (path === "/resume") {
      document.body.classList.add("native-cursor");
    } else {
      document.body.classList.remove("native-cursor");
    }
  }, [location.pathname, activePage]);

  // Custom Cursor Logic
  useEffect(() => {
    const $cursor = cursorRef.current;
    const $tooltip = tooltipRef.current;

    const xTo = gsap.quickTo([$cursor, $tooltip], "x", {
      duration: 0.12,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo([$cursor, $tooltip], "y", {
      duration: 0.12,
      ease: "power3.out",
    });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseDown = () => {
      if (cursorState === "hover-text") return; // don't shrink if it's text
      setCursorState("click");
    };
    const onMouseUp = () => {
      if (cursorState === "hover-text") return;
      setCursorState("default");
    };

    const handleMouseOver = (e) => {
      // Ignore if native cursor is active
      if (document.body.classList.contains("native-cursor")) return;

      const interactableText = e.target.closest("[data-cursor-text]");
      if (interactableText) {
        setCursorState("hover-text");
        setCursorText(interactableText.getAttribute("data-cursor-text"));
        setCursorStyle(interactableText.getAttribute("data-cursor-style") || "default");
        return;
      }

      if (e.target.closest("button") || e.target.closest("a")) {
        setCursorState("default");
        setCursorText("");
        setCursorStyle("default");
        return;
      }

      const tag = e.target.tagName.toLowerCase();

      if (["p", "h1", "h2", "h3", "span"].includes(tag)) {
        setCursorState("text");
        setCursorText("");
        setCursorStyle("default");
      } else {
        setCursorState("default");
        setCursorText("");
        setCursorStyle("default");
      }
    };

    const handleMouseOut = () => {
      // Handled by mouseover on the new target usually, but keep this to reset if leaving window
      setCursorState("default");
      setCursorText("");
      setCursorStyle("default");
    };

    const handleScroll = () => {
      setCursorState("default");
      setCursorText("");
      setCursorStyle("default");
    };

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mousedown", onMouseDown);
    document.body.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mousedown", onMouseDown);
      document.body.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cursorState]); // added cursorState dependency for mousedown/up checks

  return (
    <div className="bg-background text-dark min-h-screen relative">
      {/* Global Noise Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[9990] opacity-[0.05]">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Custom Phosphor Cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[10020] hidden md:flex items-center justify-center mix-blend-difference"
      >
        <div className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)] relative flex items-center justify-center">
          {cursorState === "hover-text" && cursorStyle === "default" ? (
            null
          ) : cursorState === "click" ? (
            <CursorClick size={42} weight="duotone" className="absolute -top-[6px] -left-[6px]" />
          ) : cursorState === "text" ? (
            <CursorTextIcon size={40} weight="bold" className="absolute -top-[20px] -left-[20px]" />
          ) : (
            <Cursor size={42} weight="fill" className="absolute -top-[6px] -left-[6px]" />
          )}
        </div>
      </div>

      {/* Hover Tooltip Bubble - Isolated from mix-blend-difference */}
      <div
        ref={tooltipRef}
        className="custom-cursor-tooltip fixed top-0 left-0 pointer-events-none z-[10021] hidden md:flex items-center justify-center"
      >
        {cursorState === "hover-text" && (
          cursorStyle === "tooltip" ? (
            <div className="absolute -top-[60px] bg-dark/60 backdrop-blur-md text-primary text-sm font-medium px-5 py-2.5 rounded-full whitespace-nowrap transform -translate-x-1/2 border border-primary/20 shadow-2xl flex items-center gap-2">
              <span>{cursorText}</span>
              <ArrowUpRight size={16} weight="bold" />
            </div>
          ) : (
            <div className="absolute bg-dark/60 backdrop-blur-md text-primary text-sm font-medium px-5 py-2.5 rounded-full whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2 mt-4 ml-4 border border-primary/20 shadow-2xl flex items-center gap-2">
              <span>{cursorText}</span>
              <ArrowUpRight size={16} weight="bold" />
            </div>
          )
        )}
      </div>

      <Nav activePage={activePage} setActivePage={setActivePage} />

      <Routes>
        <Route path="/" element={<Home setActivePage={setActivePage} />} />
        <Route path="/graphics" element={<Graphics setActivePage={setActivePage} />} />
        <Route path="/mockups" element={<Mockups setActivePage={setActivePage} />} />
        <Route path="/uiux" element={<UIUX setActivePage={setActivePage} />} />
        <Route path="/webdev" element={<WebDev setActivePage={setActivePage} />} />
        <Route path="/booking" element={<Booking setActivePage={setActivePage} />} />
        <Route path="/resume" element={<Resume setActivePage={setActivePage} />} />
        <Route path="*" element={<NotFound setActivePage={setActivePage} />} />
      </Routes>
    </div>
  );
}