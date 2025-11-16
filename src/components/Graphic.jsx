import React from "react";

export default function Graphic({ setActivePage }) {
  const works = [
    {
      img: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&h=600&fit=crop",
      title: "Brand Identity",
      category: "Logo Design",
    },
    {
      img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop",
      title: "Event Campaign",
      category: "Poster Design",
    },
    {
      img: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=600&fit=crop",
      title: "Creative Composites",
      category: "Photo Manipulation",
    },
  ];

  return (
    <section
      className="min-h-screen pt-[140px] px-[60px] pb-[60px] max-md:px-[30px] max-md:pt-[120px]"
      style={{
        backgroundImage: "url('/images/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <button
        onClick={() => setActivePage("works")}
        className="mb-[40px] text-[14px] font-light tracking-[1px] uppercase text-[#669bbc] hover:text-[#003049] transition-colors duration-300"
      >
        ← Back to Works
      </button>
      <div className="page-title text-[14px] font-light tracking-[3px] uppercase text-[#003049] mb-[80px]">
        Graphic Design
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-[2px] max-w-[1400px] max-md:grid-cols-1">
        {works.map((item, index) => (
          <div
            key={index}
            className="aspect-square bg-[#1a1a1a] overflow-hidden relative cursor-pointer group"
          >
            <img
              src={item.img}
              alt={item.category}
              className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-transparent p-[40px_30px] translate-y-full transition-transform duration-[400ms] ease-out group-hover:translate-y-0">
              <div className="text-[24px] font-normal mb-[8px] text-[#fdf0d5]">
                {item.title}
              </div>
              <div className="text-[12px] text-[#669bbc] tracking-[2px] uppercase">
                {item.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
