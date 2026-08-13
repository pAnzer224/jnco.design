import React from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryNav({ activeCategory, setActivePage }) {
  const navigate = useNavigate();

  const navItems = [
    { id: "home", path: "/", label: "INDEX" },
    { id: "graphic", path: "/graphics", label: "GRAPHICS" },
    { id: "uiux", path: "/uiux", label: "UI/UX" },
    { id: "webdev", path: "/webdev", label: "WEB DEV" },
  ];

  const handleNav = (id, path) => {
    setActivePage(id);
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-wrap items-center gap-y-2 font-mono text-[10px] sm:text-xs font-bold tracking-[2px] uppercase mb-12">
      {navItems.map((item, index) => {
        const isActive = activeCategory === item.id;
        return (
          <React.Fragment key={item.id}>
            {index > 0 && <span className="mx-2 text-dark/30">→</span>}
            <button
              onClick={() => handleNav(item.id, item.path)}
              className={`transition-colors duration-300 ${
                isActive
                  ? "text-accent cursor-default pointer-events-none"
                  : "text-dark hover:text-accent"
              }`}
            >
              {item.label}
            </button>
          </React.Fragment>
        );
      })}
    </div>
  );
}
