import React, { useEffect, useState } from "react";

import { FigmaLogo, PaintBrush, TerminalWindow } from "@phosphor-icons/react";

const messages = ["Initializing Photoshop workspace...", "Generating raster textures...", "Exporting high-fidelity vectors. "];

const FeatureCards = () => {
    // 1. UI/UX Layers
    const [layersDeck, setLayersDeck] = useState([
        { id: 1, label: "001 // Frames", desc: "Auto-layout components." },
        { id: 2, label: "002 // Prototyping", desc: "Interactive flows." },
        { id: 3, label: "003 // Tokens", desc: "Design system values." },
    ]);

    useEffect(() => {
        let interval = setInterval(() => {
            setLayersDeck(prev => {
                const newDeck = [...prev];
                const last = newDeck.pop();
                newDeck.unshift(last);
                return newDeck;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // 2. Graphic Design Terminal
    const [typewriter, setTypewriter] = useState("");
    const [msgIdx, setMsgIdx] = useState(0);


    useEffect(() => {
        let currentText = messages[msgIdx];
        let i = 0;
        setTypewriter("");
        let charInterval = setInterval(() => {
            setTypewriter(currentText.substring(0, i + 1));
            i++;
            if (i === currentText.length) {
                clearInterval(charInterval);
                setTimeout(() => {
                    setMsgIdx((m) => (m + 1) % messages.length);
                }, 2000);
            }
        }, 50);
        return () => clearInterval(charInterval);
    }, [msgIdx]);

    return (
        <section className="bg-background py-32 px-4 sm:px-8 md:pl-[120px] lg:pl-[140px] xl:pr-16 container mx-auto" id="skills">
            <div className="text-center mb-24">
                <h2 className="font-sans font-black text-4xl sm:text-6xl text-dark tracking-tighter uppercase mb-6">Execution Stack</h2>
                <div className="w-16 h-1 bg-accent mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Card 1: UI/UX Architecture */}
                <div className="relative bg-primary border-[1.5px] border-dark/10 rounded-[2rem] h-[400px] p-8 shadow-xl flex flex-col justify-between overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                    <div>
                        <div className="flex justify-between items-center mb-8 text-black">
                            <FigmaLogo size={32} weight="duotone" />
                            <span className="font-mono text-[10px] text-dark/50 tracking-widest font-bold">PROP: UI/UX</span>
                        </div>
                        <h3 className="font-sans font-bold text-2xl text-dark uppercase tracking-tight mb-2">Systems & logic</h3>
                        <p className="font-mono text-xs text-dark/70 leading-relaxed">I translate vague requirements into logical, pixel-perfect interfaces designed for seamless user experiences.</p>
                    </div>
                    <div className="relative h-48 w-full mt-4">
                        {layersDeck.map((card, i) => {
                            const zIndex = 3 - i;
                            const scale = 1 - (i * 0.05);
                            const translateY = i * 20;
                            const opacity = 1 - (i * 0.2);
                            return (
                                <div
                                    key={card.id}
                                    className="absolute bottom-0 w-full bg-background border border-dark/20 p-4 rounded-xl shadow-lg transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center gap-4"
                                    style={{
                                        zIndex,
                                        transform: `translateY(-${translateY}px) scale(${scale})`,
                                        opacity: opacity,
                                    }}
                                >
                                    <div className="w-8 h-8 rounded bg-dark/5 flex items-center justify-center border border-dark/10">
                                        <div className="w-3 h-3 border-2 border-accent rounded-sm" />
                                    </div>
                                    <div>
                                        <p className="font-mono text-xs font-bold text-dark">{card.label}</p>
                                        <p className="font-sans text-[10px] text-dark/60 mt-1 uppercase tracking-wider">{card.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Card 2: Graphic Design */}
                <div className="bg-dark rounded-[2rem] h-[400px] p-8 shadow-xl flex flex-col justify-between border-2 border-transparent hover:border-accent/30 transition-colors duration-500 group">
                    <div>
                        <div className="flex justify-between items-center mb-8 text-primary">
                            <PaintBrush size={32} weight="duotone" className="text-accent" />
                            <span className="font-mono text-[10px] text-primary/50 tracking-widest flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                ASSET GEN
                            </span>
                        </div>
                        <h3 className="font-sans font-bold text-2xl text-primary uppercase tracking-tight mb-2">Visual Identity</h3>
                        <p className="font-mono text-xs text-primary/50 leading-relaxed">Whether it's Illustrator or Photoshop, I craft raw assets, compelling typography, and striking graphics.</p>
                    </div>
                    <div className="bg-black/50 rounded-xl p-6 font-mono text-[11px] leading-loose text-accent flex flex-col justify-end min-h-[120px] shadow-inner border border-primary/5">
                        <p className="text-primary/70 mb-2">{"// Adobe Workflow Engine"}</p>

                        <p>
                            &gt; {typewriter}<span className="inline-block w-2 h-3 bg-primary ml-1 animate-pulse" />
                        </p>
                    </div>
                </div>

                {/* Card 3: Front-End */}
                <div className="relative bg-primary border-[1.5px] border-dark/10 rounded-[2rem] h-[400px] p-8 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform duration-500 overflow-hidden">
                    <div>
                        <div className="flex justify-between items-center mb-8 text-dark">
                            <TerminalWindow size={32} weight="duotone" />
                            <span className="font-mono text-[10px] text-dark/50 tracking-widest font-bold">PROP: CODE</span>
                        </div>
                        <h3 className="font-sans font-bold text-2xl text-dark uppercase tracking-tight mb-2">Build & Deploy</h3>
                        <p className="font-mono text-xs text-dark/70 leading-relaxed">I don't just design; I implement. Bridging the gap between the static canvas and live front-end code.</p>
                    </div>

                    <div className="relative bg-[#1e1e1e] border border-dark/20 rounded-xl p-4 h-40 shadow-inner flex flex-col">
                        <div className="flex gap-2 mb-4">
                            <div className="w-3 h-3 rounded-full bg-accent/80" />
                            <div className="w-3 h-3 rounded-full bg-primary/40" />
                            <div className="w-3 h-3 rounded-full bg-primary/40" />
                        </div>
                        <div className="font-mono text-[10px] leading-relaxed text-primary/70 flex-1">
                            <p><span className="text-accent">const</span> App = () =&gt; {"{"}</p>
                            <p className="pl-4">return (</p>
                            <p className="pl-8 text-white">&lt;div className=<span className="text-accent">"perfect"</span>&gt;</p>
                            <p className="pl-12">&lt;Design /&gt;</p>
                            <p className="pl-8 text-white">&lt;/div&gt;</p>
                            <p className="pl-4">)</p>
                            <p>{"}"}</p>
                        </div>

                        <svg className="absolute w-5 h-5 text-white drop-shadow-md top-1/2 left-1/2 -ml-2 -mt-2 animate-[cursorMove_3s_cubic-bezier(0.25,1,0.5,1)_infinite]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 2L21 16L14 17L12 22L7 2Z" />
                        </svg>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FeatureCards;
