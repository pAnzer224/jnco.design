"use client";
import React from "react";
import Link from "next/link";
import { ArrowUpRight, House, Palette, DeviceMobile, Code } from "@phosphor-icons/react";

export default function CategoryNav({ activeCategory }) {

  const navItems = [
    { id: "home", path: "/", label: "INDEX", icon: House },
    { id: "graphic", path: "/graphics", label: "GRAPHICS", icon: Palette },
    { id: "uiux", path: "/uiux", label: "UI/UX", icon: DeviceMobile },
    { id: "webdev", path: "/webdev", label: "WEB DEV", icon: Code },
  ];

  // handled by next/link

  return (
    <div className="flex flex-wrap items-center gap-y-2 font-mono text-[10px] sm:text-xs font-bold tracking-[2px] uppercase mb-12">
      {navItems.map((item, index) => {
        const isActive = activeCategory === item.id;
        return (
          <React.Fragment key={item.id}>
            {index > 0 && <span className="mx-2 text-dark/30">•</span>}
            <Link
              href={item.path}
              className={`group inline-flex items-center gap-1.5 transition-colors duration-300 ${isActive ? "text-accent cursor-default pointer-events-none" : "text-dark hover:text-accent"}`}
            >
              <item.icon
                size={13}
                weight="duotone"
                className={`transition-transform duration-300 ${isActive ? "-rotate-12" : "rotate-0 group-hover:-rotate-12"}`}
              />
              {item.label}
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}

