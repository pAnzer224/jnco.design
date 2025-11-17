import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Graphics from "./components/Graphic";
import Mockups from "./components/Mockups";
import UIUX from "./components/UIUX";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const bigCircleRef = useRef(null);
  const smallCircleRef = useRef(null);
  const plusRef = useRef(null);
  const plusAreaRef = useRef(null);

  // Sync activePage with current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setActivePage("home");
    else if (path === "/graphics") setActivePage("graphic");
    else if (path === "/mockups") setActivePage("mockups");
    else if (path === "/uiux") setActivePage("uiux");
    else if (path.includes("#contact") || activePage === "contact")
      setActivePage("contact");
  }, [location.pathname, activePage]);

  // Handle page navigation
  const handlePageChange = (page) => {
    if (page === "home") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "contact") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const contactSection = document.getElementById("contact-section");
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const contactSection = document.getElementById("contact-section");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else if (page === "graphic") {
      navigate("/graphics");
    } else if (page === "mockups") {
      navigate("/mockups");
    } else if (page === "uiux") {
      navigate("/uiux");
    }
    setActivePage(page);
  };

  // Custom cursor logic
  useEffect(() => {
    const $bigCircle = bigCircleRef.current;
    const $smallCircle = smallCircleRef.current;
    const $smallPlus = plusRef.current;
    const $smallPlusArea = plusAreaRef.current;

    const onMouseMove = (e) => {
      gsap.to($bigCircle, {
        duration: 0.4,
        x: e.clientX,
        y: e.clientY,
      });
      gsap.to($smallCircle, {
        duration: 0.1,
        x: e.clientX,
        y: e.clientY,
      });
      gsap.to($smallPlus, {
        duration: 0.1,
        x: e.clientX,
        y: e.clientY,
      });
    };

    const onMouseHover = () => {
      gsap.to("#bigCircle", {
        attr: { r: 25 },
      });
    };

    const onMouseHoverOut = () => {
      gsap.to("#bigCircle", {
        attr: { r: 18 },
      });
    };

    const onMouseHoverArea = () => {
      gsap.to($bigCircle, {
        duration: 0.3,
        fill: "#003049",
        mixBlendMode: "normal",
      });
      gsap.to($smallCircle, {
        duration: 0.3,
        fill: "transparent",
      });
      gsap.to($smallPlusArea, {
        duration: 0.3,
        stroke: "#003049",
      });
    };

    const onMouseHoverAreaOut = () => {
      gsap.to($bigCircle, {
        duration: 0.3,
        fill: "transparent",
        mixBlendMode: "difference",
      });
      gsap.to($smallCircle, {
        duration: 0.3,
        fill: "#003049",
      });
      gsap.to($smallPlusArea, {
        duration: 0.3,
        stroke: "transparent",
      });
    };

    document.body.addEventListener("mousemove", onMouseMove);

    const hoverables = document.querySelectorAll(".hoverable");
    const hoverablesArea = document.querySelectorAll(".hoverableArea");

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseHover);
      el.addEventListener("mouseleave", onMouseHoverOut);
    });

    hoverablesArea.forEach((el) => {
      el.addEventListener("mouseenter", onMouseHoverArea);
      el.addEventListener("mouseleave", onMouseHoverAreaOut);
    });

    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseHover);
        el.removeEventListener("mouseleave", onMouseHoverOut);
      });
      hoverablesArea.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseHoverArea);
        el.removeEventListener("mouseleave", onMouseHoverAreaOut);
      });
    };
  }, [location.pathname]);

  const isWorkDetailPage = location.pathname !== "/";

  return (
    <div
      className="bg-[#fdf0d5] text-[#003049] min-h-screen overflow-x-hidden"
      style={{
        cursor: "none",
        backgroundImage: !isWorkDetailPage
          ? "url('/images/background.svg')"
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Custom Cursor */}
      <div className="cursor pointer-events-none">
        <div
          ref={bigCircleRef}
          className="cursor__circle cursor__circle--big fixed top-0 left-0 mix-blend-difference z-[10000] -translate-x-1/2 -translate-y-1/2"
        >
          <svg height="60" width="60">
            <circle
              id="bigCircle"
              cx="30"
              cy="30"
              r="18"
              strokeWidth="0.8"
              stroke="#003049"
              fill="transparent"
            ></circle>
          </svg>
        </div>
        <div
          ref={smallCircleRef}
          className="cursor__circle cursor__circle--small fixed top-0 left-0 mix-blend-difference z-[10000] -translate-x-1/2 -translate-y-1/2"
        >
          <svg height="10" width="10">
            <circle cx="5" cy="5" r="3" strokeWidth="0" fill="#003049"></circle>
          </svg>
        </div>
        <div
          ref={plusRef}
          className="cursor__plus fixed top-0 left-0 z-[10000] -translate-x-1/2 -translate-y-1/2"
        >
          <svg
            ref={plusAreaRef}
            className="cursor__plus--area"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g strokeWidth="1" stroke="transparent">
              <path d="M12.5,1.87037037 L12.5,11.4993704 L22.5,11.5 L22.5,12.5 L12.5,12.4993704 L12.5,22.1296296 L11.5,22.1296296 L11.5,12.4993704 L1.5,12.5 L1.5,11.5 L11.5,11.4993704 L11.5,1.87037037 L12.5,1.87037037 Z"></path>
            </g>
          </svg>
        </div>
      </div>

      <Nav activePage={activePage} setActivePage={handlePageChange} />

      <Routes>
        <Route path="/" element={<Home setActivePage={setActivePage} />} />
        <Route
          path="/graphics"
          element={<Graphics setActivePage={handlePageChange} />}
        />
        <Route
          path="/mockups"
          element={<Mockups setActivePage={handlePageChange} />}
        />
        <Route
          path="/uiux"
          element={<UIUX setActivePage={handlePageChange} />}
        />
      </Routes>
    </div>
  );
}
