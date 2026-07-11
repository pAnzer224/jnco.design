import React from 'react';
import { ClockCounterClockwise } from '@phosphor-icons/react';

export default function ResumeDraftModal({ onResume, onDiscard }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-dark/70 backdrop-blur-sm">
            <div className="bg-primary text-dark border border-dark/10 rounded-[2rem] p-8 max-w-sm w-full shadow-2xl text-center flex flex-col items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <ClockCounterClockwise size={26} weight="duotone" className="text-accent" />
                </div>
                <div>
                    <h3 className="text-xl font-bold font-sans tracking-tight mb-2">
                        Pick up where you left off?
                    </h3>
                    <p className="text-dark/60 font-mono text-xs leading-relaxed">
                        You have an unfinished inquiry saved on this device.
                    </p>
                </div>
                <div className="flex gap-3 w-full">
                    <button
                        type="button"
                        id="booking-draft-discard"
                        onClick={onDiscard}
                        className="flex-1 px-5 py-3 rounded-full border border-dark/15 text-dark/60 hover:text-dark hover:border-dark/25 font-mono text-[11px] uppercase tracking-widest transition-all duration-200"
                    >
                        Start Over
                    </button>
                    <button
                        type="button"
                        id="booking-draft-resume"
                        onClick={onResume}
                        className="flex-1 px-5 py-3 rounded-full bg-accent text-primary font-mono text-[11px] uppercase tracking-widest hover:bg-accent/80 transition-all duration-200"
                    >
                        Resume
                    </button>
                </div>
            </div>
        </div>
    );
}