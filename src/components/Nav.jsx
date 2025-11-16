import React, { useState } from "react";

export default function Nav({ activePage, setActivePage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 w-full flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 z-[1000]">
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick("home");
        }}
        className="logo text-lg sm:text-xl md:text-2xl font-light tracking-[2px] text-[#FDF0D5] no-underline relative z-[1001]"
        style={{ fontFamily: "'Lora', serif" }}
      >
        jnco.design
      </a>

      {/* Burger Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden flex flex-col gap-1.5 w-7 h-6 relative z-[1001]"
        aria-label="Toggle menu"
      >
        <span
          className={`w-full h-0.5 bg-[#FDF0D5] transition-all duration-300 ${
            isMenuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`w-full h-0.5 bg-[#FDF0D5] transition-all duration-300 ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`w-full h-0.5 bg-[#FDF0D5] transition-all duration-300 ${
            isMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-[#003049] transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("home");
              }}
              className="text-[#FDF0D5] no-underline text-2xl font-light tracking-[1px] transition-colors duration-300 hover:text-[#669bbc]"
              style={{
                color: activePage === "home" ? "#669bbc" : "#FDF0D5",
                fontFamily: "'Lora', serif",
              }}
            >
              home
            </a>
          </li>
          <li>
            <a
              href="#graphic"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("graphic");
              }}
              className="text-[#FDF0D5] no-underline text-2xl font-light tracking-[1px] transition-colors duration-300 hover:text-[#669bbc]"
              style={{
                color: activePage === "graphic" ? "#669bbc" : "#FDF0D5",
                fontFamily: "'Lora', serif",
              }}
            >
              graphic design
            </a>
          </li>
          <li>
            <a
              href="#mockups"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("mockups");
              }}
              className="text-[#FDF0D5] no-underline text-2xl font-light tracking-[1px] transition-colors duration-300 hover:text-[#669bbc]"
              style={{
                color: activePage === "mockups" ? "#669bbc" : "#FDF0D5",
                fontFamily: "'Lora', serif",
              }}
            >
              mockups
            </a>
          </li>
          <li>
            <a
              href="#uiux"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("uiux");
              }}
              className="text-[#FDF0D5] no-underline text-2xl font-light tracking-[1px] transition-colors duration-300 hover:text-[#669bbc]"
              style={{
                color: activePage === "uiux" ? "#669bbc" : "#FDF0D5",
                fontFamily: "'Lora', serif",
              }}
            >
              ui/ux
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("contact");
              }}
              className="text-[#FDF0D5] no-underline text-2xl font-light tracking-[1px] transition-colors duration-300 hover:text-[#669bbc]"
              style={{
                color: activePage === "contact" ? "#669bbc" : "#FDF0D5",
                fontFamily: "'Lora', serif",
              }}
            >
              contact
            </a>
          </li>
        </ul>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-4 md:gap-6 lg:gap-8 list-none">
        <li>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className="nav-link relative text-[#FDF0D5] no-underline text-sm font-light tracking-[1px] transition-colors duration-300 hover:text-[#669bbc]"
            style={{
              color: activePage === "home" ? "#669bbc" : "#FDF0D5",
              fontFamily: "'Lora', serif",
            }}
          >
            home
          </a>
        </li>
        <li>
          <a
            href="#graphic"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("graphic");
            }}
            className="nav-link relative text-[#FDF0D5] no-underline text-sm font-light tracking-[1px] transition-colors duration-300 hover:text-[#669bbc]"
            style={{
              color: activePage === "graphic" ? "#669bbc" : "#FDF0D5",
              fontFamily: "'Lora', serif",
            }}
          >
            graphic design
          </a>
        </li>
        <li>
          <a
            href="#mockups"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("mockups");
            }}
            className="nav-link relative text-[#FDF0D5] no-underline text-sm font-light tracking-[1px] transition-colors duration-300 hover:text-[#669bbc]"
            style={{
              color: activePage === "mockups" ? "#669bbc" : "#FDF0D5",
              fontFamily: "'Lora', serif",
            }}
          >
            mockups
          </a>
        </li>
        <li>
          <a
            href="#uiux"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("uiux");
            }}
            className="nav-link relative text-[#FDF0D5] no-underline text-sm font-light tracking-[1px] transition-colors duration-300 hover:text-[#669bbc]"
            style={{
              color: activePage === "uiux" ? "#669bbc" : "#FDF0D5",
              fontFamily: "'Lora', serif",
            }}
          >
            ui/ux
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("contact");
            }}
            className="nav-link relative text-[#FDF0D5] no-underline text-sm font-light tracking-[1px] transition-colors duration-300 hover:text-[#669bbc]"
            style={{
              color: activePage === "contact" ? "#669bbc" : "#FDF0D5",
              fontFamily: "'Lora', serif",
            }}
          >
            contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
