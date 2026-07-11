import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Cursor, CursorClick, CursorTextIcon } from "@phosphor-icons/react";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Graphics from "./components/Graphic";
import Mockups from "./components/Mockups";
import UIUX from "./components/UIUX";
import WebDev from "./components/WebDev";
import NotFound from "./components/NotFound";
import Booking from "./components/Booking";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const location = useLocation();


  const cursorRef = useRef(null);
  const [cursorState, setCursorState] = useState("default"); // default, click, text

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
  }, [location.pathname, activePage]);

  // Custom Cursor Logic
  useEffect(() => {
    const $cursor = cursorRef.current;

    const xTo = gsap.quickTo($cursor, "x", {
      duration: 0.12,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo($cursor, "y", {
      duration: 0.12,
      ease: "power3.out",
    });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseDown = () => setCursorState("click");
    const onMouseUp = () => setCursorState("default");

    const handleMouseOver = (e) => {
      if (e.target.closest("button") || e.target.closest("a")) {
        setCursorState("default");
        return;
      }

      const tag = e.target.tagName.toLowerCase();

      if (["p", "h1", "h2", "h3", "span"].includes(tag)) {
        setCursorState("text");
      }
    };

    const handleMouseOut = () => {
      setCursorState("default");
    };

    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mousedown", onMouseDown);
    document.body.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mousedown", onMouseDown);
      document.body.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

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
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block mix-blend-difference"
      >
        <div className="text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)] relative">
          {cursorState === "click" ? (
            <CursorClick size={42} weight="duotone" className="absolute -top-[6px] -left-[6px]" />
          ) : cursorState === "text" ? (
            <CursorTextIcon size={40} weight="bold" className="absolute -top-[20px] -left-[20px]" />
          ) : (
            <Cursor size={42} weight="fill" className="absolute -top-[6px] -left-[6px]" />
          )}
        </div>
      </div>

      <Nav activePage={activePage} setActivePage={setActivePage} />

      <Routes>
        <Route path="/" element={<Home setActivePage={setActivePage} />} />
        <Route path="/graphics" element={<Graphics setActivePage={setActivePage} />} />
        <Route path="/mockups" element={<Mockups setActivePage={setActivePage} />} />
        <Route path="/uiux" element={<UIUX setActivePage={setActivePage} />} />
        <Route path="/webdev" element={<WebDev setActivePage={setActivePage} />} />
        <Route path="/booking" element={<Booking setActivePage={setActivePage} />} />
        <Route path="*" element={<NotFound setActivePage={setActivePage} />} />
      </Routes>
    </div>
  );
}
