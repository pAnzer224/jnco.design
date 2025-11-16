import React from "react";

export default function Mockups({ setActivePage }) {
  const works = [
    {
      img: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&h=600&fit=crop",
      title: "Product Packaging",
      category: "Package Design",
    },
    {
      img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=600&fit=crop",
      title: "Type Experiments",
      category: "Typography",
    },
    {
      img: "https://images.unsplash.com/photo-1600132806608-231446b2e7af?w=600&h=600&fit=crop",
      title: "Editorial Layout",
      category: "Print Design",
    },
  ];

  return (
    <section className="min-h-screen pt-[140px] px-[60px] pb-[60px] max-md:px-[30px] max-md:pt-[120px]">
      <button
        onClick={() => setActivePage("works")}
        className="mb-[40px] text-[14px] font-light tracking-[1px] uppercase text-[#999] hover:text-white transition-colors duration-300"
      >
        ← Back to Works
      </button>
      <div className="page-title text-[14px] font-light tracking-[3px] uppercase text-[#666] mb-[80px]">
        Mockups
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
              <div className="text-[24px] font-normal mb-[8px]">
                {item.title}
              </div>
              <div className="text-[12px] text-[#999] tracking-[2px] uppercase">
                {item.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
