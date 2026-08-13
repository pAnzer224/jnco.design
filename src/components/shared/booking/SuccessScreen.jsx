"use client";
import React from 'react';
import { CheckCircle } from '@phosphor-icons/react';

export default function SuccessScreen({ firstName, onBackToPortfolio, onNewInquiry }) {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-8 py-24 px-6 bg-primary text-dark border border-dark/10 rounded-[2rem] shadow-2xl">
            <div className="w-24 h-24 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center animate-[scaleIn_0.4s_ease-out]">
                <CheckCircle size={52} weight="duotone" className="text-accent" />
            </div>
            <div>
                <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Sent Successfully</p>
                <h3 className="text-3xl sm:text-4xl font-bold text-dark mb-3 font-sans tracking-tight">
                    Talk soon, {firstName}!
                </h3>
                <p className="text-dark/60 font-mono text-xs leading-relaxed max-w-sm">
                    I'll review your brief and get back to you within 24â€“48 hours with a quote and a plan.
                </p>
            </div>
            <div className="flex gap-3 mt-2">
                <button
                    id="booking-back-portfolio"
                    onClick={onBackToPortfolio}
                    className="px-6 py-3 bg-dark/5 border border-dark/10 hover:bg-dark/10 text-dark rounded-full font-mono text-xs uppercase tracking-widest transition-all"
                >
                    Back to Portfolio
                </button>
                <button
                    id="booking-new-inquiry"
                    onClick={onNewInquiry}
                    className="px-6 py-3 bg-accent text-primary rounded-full font-mono text-xs uppercase tracking-widest transition-all hover:bg-accent/80"
                >
                    New Inquiry
                </button>
            </div>
        </div>
    );
}
