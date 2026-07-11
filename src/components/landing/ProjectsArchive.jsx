import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const ProjectsArchive = ({ setActivePage }) => {
  return (
    <section className="bg-dark text-primary py-24 relative z-10" id="projects">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl relative">
        <div className="mb-8 md:mb-16 text-center">
          <h2 className="font-sans font-black text-4xl sm:text-6xl tracking-tighter uppercase mb-4">
            Our <span className="text-accent underline decoration-4 underline-offset-8">Projects</span>
          </h2>
          <p className="font-mono text-xs text-primary/50 uppercase tracking-widest">
            A showcase of our creative services and capabilities.
          </p>
        </div>

        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={100}
          baseScale={0.85}
          itemScale={0.03}
          blurAmount={0}
        >
          {/* Card 1: Graphic Design */}
          <ScrollStackItem itemClassName="bg-background text-dark flex flex-col justify-center items-center text-center !h-[30rem] sm:!h-[35rem] !p-8 sm:!p-16 border border-dark/5 shadow-2xl">
            <h3 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter mb-6 text-gradient-graphic">
              Graphic Design
            </h3>
            <p className="font-mono text-xs sm:text-sm max-w-xl opacity-70 uppercase tracking-widest leading-relaxed">
              Crafting visual identities, brand materials, and striking graphic elements that leave a lasting impression in both print and digital spaces.
            </p>
          </ScrollStackItem>

          {/* Card 2: Mockups */}
          <ScrollStackItem itemClassName="bg-primary text-dark flex flex-col justify-center items-center text-center !h-[30rem] sm:!h-[35rem] !p-8 sm:!p-16 border border-dark/5 shadow-2xl">
            <h3 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter mb-6">
              Mockups
            </h3>
            <p className="font-mono text-xs sm:text-sm max-w-xl opacity-70 uppercase tracking-widest leading-relaxed">
              Creating realistic, high-fidelity mockups to visualize products, packaging, and digital designs in the real world before they launch.
            </p>
          </ScrollStackItem>

          {/* Card 3: UI/UX */}
          <ScrollStackItem itemClassName="bg-[#181818] text-primary flex flex-col justify-center items-center text-center !h-[30rem] sm:!h-[35rem] !p-8 sm:!p-16 border border-primary/10 shadow-2xl">
            <h3 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter mb-6 text-gradient-uiux">
              UI/UX Design
            </h3>
            <p className="font-mono text-xs sm:text-sm max-w-xl opacity-60 uppercase tracking-widest leading-relaxed">
              Designing intuitive, user-centered interfaces and mapping out seamless user journeys that provide engaging digital experiences.
            </p>
          </ScrollStackItem>

          {/* Card 4: Web Dev */}
          <ScrollStackItem itemClassName="bg-accent text-background flex flex-col justify-center items-center text-center !h-[30rem] sm:!h-[35rem] !p-8 sm:!p-16 border border-dark/10 shadow-2xl">
            <h3 className="font-sans font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter mb-6">
              Web Dev
            </h3>
            <p className="font-mono text-xs sm:text-sm max-w-xl opacity-90 uppercase tracking-widest leading-relaxed">
              Building responsive, performant, and scalable web applications tailored to solve complex problems and elevate your online presence.
            </p>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
};

export default ProjectsArchive;
