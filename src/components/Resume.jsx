import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

const RESUME_PATH = "/images/Mirande_Juneco_Resume.pdf";

export default function Resume({ setActivePage }) {
    useEffect(() => {
        setActivePage && setActivePage("resume");
        window.scrollTo({ top: 0 });

        const blockShortcuts = (e) => {
            const isSave = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s";
            const isPrint = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p";
            if (isSave || isPrint) e.preventDefault();
        };
        window.addEventListener("keydown", blockShortcuts);
        return () => window.removeEventListener("keydown", blockShortcuts);
    }, [setActivePage]);

    return (
        <section className="relative w-full min-h-screen bg-dark text-primary flex flex-col">
            <div className="flex items-center justify-between gap-4 px-4 sm:px-8 py-5 border-b border-primary/10">
                <Link
                    to="/"
                    className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary/60 hover:text-accent transition-colors duration-300"
                >
                    <ArrowLeft size={16} weight="bold" className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Back to Portfolio
                </Link>


                <span className="w-[72px] sm:w-[92px]" aria-hidden="true" />
            </div>

            <div className="flex-1 w-full px-2 sm:px-8 py-4 sm:py-8">
                <div
                    className="w-full h-[calc(100dvh-140px)] max-w-4xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden border border-primary/10 shadow-2xl bg-primary/5"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                >
                    <iframe
                        src={`${RESUME_PATH}#toolbar=0&navpanes=0`}
                        title="Juneco Mirande Resume"
                        className="w-full h-full"
                    />
                </div>
            </div>
        </section>
    );
}