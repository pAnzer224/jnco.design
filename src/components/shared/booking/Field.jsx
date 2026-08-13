"use client";
import React from 'react';

export default function Field({ label, required, error, hint, children }) {
    return (
        <div className="relative flex flex-col gap-2">
            <label className="text-dark/70 font-mono text-[10px] uppercase tracking-widest pl-0.5 font-bold">
                {label}
                {required && <span className="text-accent ml-1">*</span>}
            </label>
            {children}
            {hint && !error && (
                <p className="text-dark/50 font-mono text-[10px] pl-0.5 leading-relaxed">{hint}</p>
            )}
            {error && (
                <p className="absolute top-full left-0 mt-1 text-red-500 font-mono text-[10px] pl-0.5 font-bold whitespace-nowrap">
                    {error}
                </p>
            )}
        </div>
    );
}
