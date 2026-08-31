"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { Cursor, CursorClick, CursorTextIcon, ArrowUpRight, Palette, DeviceMobile, Code } from "@phosphor-icons/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Nav from "../components/Nav";
import ChatBot from "../components/ChatBot";
import { trackVisit } from "../lib/pipeline-api";

const cursorIconMap = {
  Palette: Palette,
  DeviceMobile: DeviceMobile,
  Code: Code,
};

export default function ClientLayout({ children }) {
  const [activePage, setActivePage] = useState("home");
  const pathname = usePathname();

  const cursorRef = useRef(null);
  const tooltipRef = useRef(null);
  const [cursorState, setCursorState] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [cursorStyle, setCursorStyle] = useState("default");
  const [cursorIcon, setCursorIcon] = useState("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    const path = pathname;
    if (path === "/") setActivePage("home");
    else if (path === "/graphics") setActivePage("graphic");
    else if (path === "/uiux") setActivePage("uiux");
    else if (path === "/webdev") setActivePage("webdev");
    else if (path === "/booking") setActivePage("booking");
    else if (path.includes("#contact") || activePage === "contact")
      setActivePage("contact");

    setCursorState("default");
    setCursorText("");
    setCursorStyle("default");
    setCursorIcon("");

    if (path === "/resume") {
      document.body.classList.add("native-cursor");
    } else {
      document.body.classList.remove("native-cursor");
    }
    
    // Track page visit
    trackVisit(path);
  }, [pathname, activePage]);

  // Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Custom Cursor Logic
  useEffect(() => {
    const $cursor = cursorRef.current;
    const $tooltip = tooltipRef.current;
    if (!$cursor || !$tooltip) return;

    const xTo = gsap.quickTo([$cursor, $tooltip], "x", {
      duration: 0.05,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo([$cursor, $tooltip], "y", {
      duration: 0.05,
      ease: "power3.out",
    });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseDown = () => {
      if (cursorState === "hover-text") return;
      setCursorState("click");
    };
    const onMouseUp = () => {
      if (cursorState === "hover-text") return;
      setCursorState("default");
    };

    const handleMouseOver = (e) => {
      if (document.body.classList.contains("native-cursor")) return;

      const interactableText = e.target.closest("[data-cursor-text]");
      if (interactableText) {
        setCursorState("hover-text");
        setCursorText(interactableText.getAttribute("data-cursor-text"));
        setCursorStyle(interactableText.getAttribute("data-cursor-style") || "default");
        setCursorIcon(interactableText.getAttribute("data-cursor-icon") || "");
        return;
      }

      if (e.target.closest("button") || e.target.closest("a")) {
        setCursorState("default");
        setCursorText("");
        setCursorStyle("default");
        setCursorIcon("");
        return;
      }

      const tag = e.target.tagName.toLowerCase();
      if (["p", "h1", "h2", "h3", "span"].includes(tag)) {
        setCursorState("text");
        setCursorText("");
        setCursorStyle("default");
        setCursorIcon("");
      } else {
        setCursorState("default");
        setCursorText("");
        setCursorStyle("default");
        setCursorIcon("");
      }
    };

    const handleMouseOut = () => {
      setCursorState("default");
      setCursorText("");
      setCursorStyle("default");
      setCursorIcon("");
    };

    const handleScroll = () => {
      setCursorState("default");
      setCursorText("");
      setCursorStyle("default");
      setCursorIcon("");
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
  }, [cursorState]);

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="bg-background text-dark min-h-screen relative">
      <div
        ref={cursorRef}
        aria-hidden="true"
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

      <div
        ref={tooltipRef}
        aria-hidden="true"
        className="custom-cursor-tooltip fixed top-0 left-0 pointer-events-none z-[10021] hidden md:flex items-center justify-center"
      >
        {cursorState === "hover-text" && (() => {
          const TooltipIcon = cursorIconMap[cursorIcon] || ArrowUpRight;
          return cursorStyle === "tooltip" ? (
            <div className="absolute -top-[60px] bg-dark/95 text-primary text-sm font-medium px-5 py-2.5 rounded-full whitespace-nowrap transform -translate-x-1/2 border border-primary/20 shadow-2xl flex items-center gap-1">
              <TooltipIcon size={16} weight="bold" className="-rotate-12" />
              <span>{cursorText}</span>
            </div>
          ) : (
            <div className="absolute bg-dark/95 text-primary text-sm font-medium px-5 py-2.5 rounded-full whitespace-nowrap transform -translate-x-1/2 -translate-y-1/2 mt-4 ml-4 border border-primary/20 shadow-2xl flex items-center gap-1">
              <TooltipIcon size={16} weight="bold" className="-rotate-12" />
              <span>{cursorText}</span>
            </div>
          );
        })()}
      </div>

      <Nav activePage={activePage} setActivePage={setActivePage} isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
      <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      {children}
    </div>
  );
}
