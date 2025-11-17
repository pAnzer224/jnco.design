import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav({ activePage, setActivePage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (page, path) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "home", path: "/" },
    { id: "graphic", label: "graphic design", path: "/graphics" },
    { id: "mockups", label: "mockups", path: "/mockups" },
    { id: "uiux", label: "ui/ux", path: "/uiux" },
    { id: "contact", label: "contact", path: "/#contact" },
  ];

  const NavLink = ({ item, isMobile = false }) => {
    const isActive = activePage === item.id;

    if (item.id === "contact") {
      return (
        <a
          href="/#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(item.id);
            setActivePage("contact");
          }}
          className={`no-underline font-light tracking-[1px] transition-all duration-300 hover:text-[#669bbc] ${
            isMobile ? "text-2xl" : "text-sm nav-link relative"
          }`}
          style={{
            color: "#FDF0D5",
            fontFamily: "'Lora', serif",
            textShadow: isActive
              ? "0 0 15px rgba(253, 240, 213, 0.7), 0 0 25px rgba(253, 240, 213, 0.4)"
              : "none",
            fontWeight: isActive ? "600" : "300",
          }}
        >
          {item.label}
        </a>
      );
    }

    return (
      <Link
        to={item.path}
        onClick={() => handleNavClick(item.id, item.path)}
        className={`no-underline font-light tracking-[1px] transition-all duration-300 hover:text-[#669bbc] ${
          isMobile ? "text-2xl" : "text-sm nav-link relative"
        }`}
        style={{
          color: "#FDF0D5",
          fontFamily: "'Lora', serif",
          textShadow: isActive
            ? "0 0 15px rgba(253, 240, 213, 0.7), 0 0 25px rgba(253, 240, 213, 0.4)"
            : "none",
          fontWeight: isActive ? "600" : "300",
        }}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <nav className="absolute top-0 w-full flex justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 z-[1000]">
      <Link
        to="/"
        onClick={() => handleNavClick("home", "/")}
        className="logo text-lg sm:text-xl md:text-2xl font-light tracking-[2px] text-[#FDF0D5] no-underline relative z-[1001]"
        style={{ fontFamily: "'Lora', serif" }}
      >
        jnco.design
      </Link>

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
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink item={item} isMobile={true} />
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-4 md:gap-6 lg:gap-8 list-none">
        {navItems.map((item) => (
          <li key={item.id}>
            <NavLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
