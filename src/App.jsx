import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Cursor, CursorClick, CursorTextIcon } from "@phosphor-icons/react";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Graphics from "./components/Graphic";
import Mockups from "./components/Mockups";
import UIUX from "./components/UIUX";

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
    else if (path.includes("#contact") || activePage === "contact")
      setActivePage("contact");
  }, [location.pathname, activePage]);

  // Custom Cursor Logic
  useEffect(() => {
    const $cursor = cursorRef.current;

    const onMouseMove = (e) => {
      gsap.to($cursor, { duration: 0.1, x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setCursorState("click");
    const onMouseUp = () => setCursorState("default");

    const handleMouseOver = (e) => {
      // Don't show text cursor if hovering over a button or link
      if (e.target.closest('button') || e.target.closest('a')) {
        setCursorState("default");
        return;
      }

      if (
        e.target.tagName.toLowerCase() === "p" ||
        e.target.tagName.toLowerCase() === "h1" ||
        e.target.tagName.toLowerCase() === "h2" ||
        e.target.tagName.toLowerCase() === "h3" ||
        e.target.tagName.toLowerCase() === "span"
      ) {
        setCursorState("text");
      }
    };

    const handleMouseOut = (e) => {
      setCursorState("default");
    };

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mousedown", onMouseDown);
    document.body.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
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
        className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block mix-blend-difference"
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
      </Routes>
    </div>
  );
}
