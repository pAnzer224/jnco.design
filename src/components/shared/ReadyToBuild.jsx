import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

export default function ReadyToBuild() {
  const navigate = useNavigate();

  return (
    <div className="w-full mt-24">
      {/* Book a Project — CTA Card */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-dark p-8 sm:p-12 md:p-14 flex flex-col md:flex-row items-center md:items-center justify-between gap-8 text-left">

        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at center, #E8E4DD 1px, transparent 1.5px)',
            backgroundSize: '6px 6px',
          }}
        />

        <div className="relative z-10 flex-1 min-w-0">
          <h3 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter leading-[0.95] uppercase text-primary mb-4">
            Ready to Build <br />
            <span className="italic text-accent">Something?</span>
          </h3>
          <p className="font-sans text-sm text-primary/60 max-w-md leading-relaxed border-l-2 border-accent/40 pl-4 uppercase">
            Answer a few questions to get started. <br /> Reply time: 24–48 hours.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center md:items-end gap-4 flex-shrink-0">
          <button
            id="shared-book-btn"
            onClick={() => {
              navigate('/booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative overflow-hidden bg-primary text-dark font-sans font-bold uppercase tracking-widest text-xs px-8 py-5 rounded-full flex items-center gap-4 hover:scale-[1.03] transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus:outline-none"
          >
            <span className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            <span className="relative z-10 group-hover:text-primary transition-colors duration-300">Book a Project</span>
            <ArrowRight weight="bold" className="relative z-10 w-4 h-4 group-hover:text-primary transition-colors duration-300 group-hover:translate-x-1" />
          </button>

          {/* Service tags */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {['UI/UX', 'Graphic', 'Web Dev', 'Mockups'].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full border border-primary/10 text-primary/30 font-mono text-[9px] uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
