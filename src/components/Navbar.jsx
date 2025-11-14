import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 px-8 md:px-16 py-6 flex justify-between items-center bg-[#F5F1E8]/80 backdrop-blur-sm"
    >
      <div
        className="text-2xl font-bold tracking-wider text-gray-900"
        style={{ fontFamily: "Lora, serif" }}
      >
        jnco.design
      </div>
      <ul className="flex gap-8 md:gap-12">
        {["home", "graphic", "uiux", "contact"].map((page) => (
          <li key={page}>
            <button
              onClick={() => setCurrentPage(page)}
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                currentPage === page
                  ? "text-gray-900 font-semibold"
                  : "text-gray-500 hover:text-gray-900"
              }`}
              style={{ fontFamily: "Lora, serif" }}
            >
              {page === "uiux" ? "UI/UX" : page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
