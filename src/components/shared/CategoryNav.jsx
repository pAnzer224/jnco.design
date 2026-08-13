"use client";
import React from "react";
import Link from "next/link";

export default function CategoryNav({ activeCategory }) {

  const navItems = [
    { id: "home", path: "/", label: "INDEX" },
    { id: "graphic", path: "/graphics", label: "GRAPHICS" },
    { id: "uiux", path: "/uiux", label: "UI/UX" },
    { id: "webdev", path: "/webdev", label: "WEB DEV" },
  ];

  // handled by next/link

  return (
    <div className="flex flex-wrap items-center gap-y-2 font-mono text-[10px] sm:text-xs font-bold tracking-[2px] uppercase mb-12">
      {navItems.map((item, index) => {
        const isActive = activeCategory === item.id;
        return (
          <React.Fragment key={item.id}>
            {index > 0 && <span className="mx-2 text-dark/30">â†’</span>}
            <Link
              href={item.path}
              className={`transition-colors duration-300 ${
                isActive
                  ? "text-accent cursor-default pointer-events-none"
                  : "text-dark hover:text-accent"
              }`}
            >
              {item.label}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}

