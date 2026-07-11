import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, EnvelopeSimple, LinkedinLogo, FileText } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import BookingForm from './shared/booking/BookingForm';

export default function Booking({ setActivePage }) {
  const containerRef = useRef(null);
  const [formStep, setFormStep] = useState(1);

  useEffect(() => {
    if (setActivePage) setActivePage('booking');
    window.scrollTo(0, 0);
  }, [setActivePage]);

  // Re-run the hero text fade-in whenever we land on step 1 —
  // covers the initial page load AND returning here via the form's Back button
  useEffect(() => {
    if (formStep !== 1) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.booking-hero-text',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [formStep]);

  return (
    <main
      ref={containerRef}
      className="bg-dark min-h-screen text-primary selection:bg-accent selection:text-dark flex flex-col justify-center items-center overflow-x-hidden py-16"
    >
      {/* Subtle background overlay elements */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

      {/* Minimal dot grid layout (low opacity to prevent load/render lag) */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #E8E4DD 1px, transparent 1.5px)',
          backgroundSize: '8px 8px',
        }}
      />

      {/* ── Two Column Layout (Step 1) → Centered Single Column (Step 2+) ── */}
      <div
        className={`w-full grid grid-cols-1 gap-12 xl:gap-16 items-start relative z-10 transition-all duration-500 ease-out mx-auto ${formStep === 1
          ? 'max-w-7xl xl:grid-cols-[22rem_1fr]'
          : 'max-w-3xl xl:grid-cols-1'
          }`}
      >

        {/* Left Column: Top details & branding — step 1 only */}
        {formStep === 1 && (
          <section className="flex flex-col items-center xl:items-start text-center xl:text-left px-6 md:px-12 pt-6 xl:pt-16 xl:sticky xl:top-16">
            {/* Breadcrumb */}
            <Link
              to="/"
              id="booking-breadcrumb"
              className="booking-hero-text opacity-0 inline-flex items-center gap-2 font-mono text-[10px] text-primary/45 uppercase tracking-widest mb-6 hover:text-accent transition-colors duration-200 group"
            >
              <ArrowLeft
                size={12}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              Back to Portfolio
            </Link>

            <h2 className="booking-hero-text opacity-0 font-sans font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter uppercase mb-4 text-primary leading-none">
              WORK <br className="hidden lg:block" /> WITH ME
            </h2>
            <p className="booking-hero-text opacity-0 font-mono text-[11px] text-primary/50 uppercase tracking-[0.15em] max-w-md leading-relaxed border-t lg:border-t-0 lg:border-l border-primary/20 pt-4 lg:pt-0 lg:pl-4">
              Reply time: 24–48 hours.
            </p>
            <div className="booking-hero-text opacity-0 flex items-center justify-center lg:justify-start gap-3 mt-4 lg:pl-4">
              <a href="mailto:juneco.mirande@gmail.com?subject=Let%27s%20work%20together" className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-primary/50 hover:text-accent hover:border-accent transition-colors duration-200">
                <EnvelopeSimple size={16} />
              </a>
              <a href="https://www.linkedin.com/in/juneco-mirande/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-primary/50 hover:text-accent hover:border-accent transition-colors duration-200">
                <LinkedinLogo size={16} />
              </a>
              <button
                type="button"
                onClick={() => window.open("/resume", "_blank")}
                className="w-9 h-9 rounded-full border border-primary/20 flex items-center justify-center text-primary/50 hover:text-accent hover:border-accent transition-colors duration-200"
                aria-label="View Resume"
              >
                <FileText size={16} />
              </button>
            </div>
          </section>
        )}

        {/* Right Column: Carousel Steps Form */}
        <section className="w-full overflow-visible mx-auto flex flex-col gap-4">
          {formStep !== 1 && (
            <Link
              to="/"
              id="booking-breadcrumb-compact"
              className="inline-flex items-center gap-2 font-mono text-[10px] text-primary/45 uppercase tracking-widest hover:text-accent transition-colors duration-200 group w-fit px-6 md:px-12"
            >
              <ArrowLeft
                size={12}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              Back to Portfolio
            </Link>
          )}
          <BookingForm onStepChange={setFormStep} />
        </section>

      </div>
    </main>
  );
}
