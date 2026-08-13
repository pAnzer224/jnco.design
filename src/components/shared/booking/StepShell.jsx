"use client";
import React from 'react';

// Every step shares this shape: a fixed title, then a scrollable field region
// that's exactly as tall as step 1 (height is locked by BookingForm), with a
// subtle gradient fade at the bottom to hint there's more content to scroll to.
export default function StepShell({ title, children }) {
    return (
        <div className="flex flex-col gap-2 flex-1 min-h-0">
            <div className="mb-2 flex-shrink-0">
                <h3 className="text-2xl font-bold text-dark font-sans tracking-tight">{title}</h3>
            </div>

            <div className="relative flex-1 min-h-0">
                <div className="h-full overflow-y-auto pr-1 -mr-1 pb-2 custom-scrollbar flex flex-col gap-6">
                    {children}
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-primary to-transparent" />
            </div>
        </div>
    );
}
