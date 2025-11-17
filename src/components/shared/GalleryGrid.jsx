import React from "react";

export function GalleryGrid({ works, onItemClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] max-w-[1400px]">
      {works.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick(index)}
          className="aspect-square bg-[#1a1a1a] overflow-hidden relative cursor-pointer group"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
          />

          {/* Title - Always Visible */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] via-[rgba(0,0,0,0.6)] to-transparent p-[30px] pointer-events-none">
            <div
              className="text-[24px] font-normal mb-[4px] text-[#fdf0d5]"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {item.title}
            </div>
            <div
              className="text-[12px] text-[#669bbc] tracking-[2px] uppercase"
              style={{ fontFamily: "'Chainprinter', monospace" }}
            >
              {item.category}
            </div>
          </div>

          {/* Tools Icons - Show on Hover */}
          <div className="absolute top-[20px] right-[20px] flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms]">
            {item.tools.map((tool, toolIndex) => (
              <div
                key={toolIndex}
                className="w-10 h-10 bg-[rgba(0,0,0,0.7)] rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <img
                  src={tool}
                  alt="Tool icon"
                  className="w-6 h-6 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// components/shared/ModalCloseButton.jsx
export function ModalCloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-20 right-8 bg-[#669BBC] text-white text-sm font-light tracking-[1px] uppercase hover:bg-[#003049] transition-colors duration-300 z-[2001] flex items-center gap-2 px-6 py-3 rounded"
      style={{ fontFamily: "'Chainprinter', monospace" }}
    >
      ← Return to Gallery
    </button>
  );
}

// components/shared/BackButton.jsx
export function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mb-[40px] text-[14px] font-light tracking-[1px] uppercase text-[#003049] hover:text-[#FDF0D5] transition-colors duration-300"
      style={{ fontFamily: "'Chainprinter', monospace" }}
    >
      ← Back to Home
    </button>
  );
}

// components/shared/PageTitle.jsx
export function PageTitle({ title }) {
  return (
    <div
      className="page-title text-[14px] font-light tracking-[3px] uppercase text-[#003049] mb-[80px]"
      style={{ fontFamily: "'Chainprinter', monospace" }}
    >
      {title}
    </div>
  );
}

// components/shared/PageSection.jsx
export function PageSection({ setActivePage, title, children }) {
  return (
    <section
      className="min-h-screen pt-[140px] px-4 sm:px-8 md:px-12 lg:px-16 pb-16 max-md:pt-[120px]"
      style={{ backgroundColor: "#669BBC" }}
    >
      <BackButton onClick={() => setActivePage("home")} />
      <PageTitle title={title} />
      {children}
    </section>
  );
}
