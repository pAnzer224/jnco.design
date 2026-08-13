"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";

const RESUME_PATH = "/images/resume_portfolio.html";

export default function Resume() {
    useEffect(() => {
        window.scrollTo({ top: 0 });

        const blockShortcuts = (e) => {
            const isSave = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s";
            const isPrint = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p";
            if (isSave || isPrint) e.preventDefault();
        };
        window.addEventListener("keydown", blockShortcuts);
        return () => window.removeEventListener("keydown", blockShortcuts);
    }, []);

    return (
        <section className="relative w-full h-svh overflow-hidden bg-dark text-primary flex flex-col">
            <div className="shrink-0 flex items-center justify-between gap-4 px-4 sm:px-8 py-5 border-b border-primary/10">
                <Link
                    href="/"
                    className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary/60 hover:text-accent transition-colors duration-300"
                >
                    <ArrowLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Back to Portfolio
                </Link>


                <span className="w-[72px] sm:w-[92px]" aria-hidden="true" />
            </div>

            <div className="relative z-0 flex-1 min-h-0 w-full px-0 md:px-8 py-0 md:py-8">
                <div
                    className="relative z-0 w-full h-full md:h-[calc(100dvh-140px)] md:max-w-4xl md:mx-auto rounded-t-2xl md:rounded-2xl overflow-hidden border-0 md:border md:border-primary/10 shadow-none md:shadow-2xl bg-primary/5"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                >
                    <iframe
                        src={RESUME_PATH}
                        title="Juneco Mirande Resume"
                        className="absolute inset-0 w-full h-full"
                    />
                </div>
            </div>
        </section>
    );
}