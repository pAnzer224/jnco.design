"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import {
  ChatCircleDots,
  X,
  PaperPlaneTilt,
  Spinner,
  House,
  ArrowLeft,
  CaretRight,
  Sparkle,
  Briefcase,
  FileText,
} from "@phosphor-icons/react";

// ─── Worker endpoint — set NEXT_PUBLIC_CHAT_WORKER_URL in .env.local ──────────
const WORKER_URL = process.env.NEXT_PUBLIC_CHAT_WORKER_URL || "";

// ─── Client-side input sanitiser (basic — server does the real work) ──────────
function sanitiseInput(raw) {
  return raw
    .replace(/<[^>]*>/g, "")
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim()
    .slice(0, 500);
}

// ─── Keyword-first response layer ─────────────────────────────────────────────
const KB = [
  {
    triggers: [
      "hi",
      "hello",
      "hey",
      "sup",
      "good morning",
      "good afternoon",
      "good evening",
      "yo",
    ],
    response:
      "Hey! 👋 I'm Juneco's portfolio assistant. Ask me about his work, skills, experience, or how to get in touch.",
  },
  {
    triggers: ["who", "about", "juneco", "introduce", "yourself"],
    response:
      "Juneco Mirande is a Graphic Designer, UI/UX Designer, and Frontend Developer based in San Carlos City, Negros Occidental, Philippines. He sketches ideas fast, refines them in Figma, then builds them himself so nothing gets lost between design and code.",
  },
  {
    triggers: [
      "skill",
      "specialize",
      "what do you do",
      "service",
      "offer",
      "expert",
    ],
    response:
      "Juneco's core skills are:\n• **UI/UX Design** — Figma, wireframes, prototypes, design systems\n• **Graphic Design** — Photoshop, branding, marketing creatives, Meta ads\n• **Frontend Dev** — React, Next.js, Vue, GSAP, Tailwind\n• **Backend** — Laravel, Firebase, Supabase\n\nHe's also heavy on AI-assisted workflows (Claude, Cursor, Antigravity, Google Flow).",
  },
  {
    triggers: ["experience", "year", "how long", "career"],
    response:
      "Close to 3 years of experience — freelance since 2023, plus a 486-hour internship at Choros.io (UK-based) in Jan–Apr 2026, where he worked on real client projects spanning sitemaps, dashboards, and brand assets.",
  },
  {
    triggers: ["intern", "choros", "internship"],
    response:
      "Juneco interned at Choros.io, a UK-based IT company, from January to April 2026 (486 hours). He worked on projects like Good Plumbing (full redesign in 8 hours), YourEventCover.co (landing page + admin dashboard), YCOM dark mode, and restructured 362 sitemaps for SEO.",
  },
  {
    triggers: [
      "code",
      "develop",
      "build",
      "program",
      "frontend",
      "backend",
      "fullstack",
    ],
    response:
      "Yes — Juneco is genuinely fullstack-capable. React, Next.js, Vue, Laravel, PHP, Firebase, Supabase. He builds out his own designs rather than handing them off, so nothing gets lost in translation.",
  },
  {
    triggers: [
      "ai",
      "artificial intelligence",
      "machine learning",
      "tools",
      "workflow",
    ],
    response:
      "AI is a real part of Juneco's daily workflow — not just casual use. He uses Claude, Cursor, and Antigravity for design thinking and production, ChatGPT and Google Flow for image generation, and Google Stitch for UI concepting. He led an 8-hour AI-assisted full website redesign at his internship.",
  },
  {
    triggers: ["award", "achievement", "win", "champion", "best"],
    response:
      "Juneco's awards:\n🏆 UI/UX Figma Champion — IT Month 2025 (LCC Bacolod)\n🏆 Best Designer — Capstone Project, May 2026\n🏆 Best Designer — Batch 2025–2026, May 2026",
  },
  {
    triggers: [
      "book",
      "hire",
      "project",
      "work together",
      "collaborate",
      "commission",
    ],
    response:
      "You can book Juneco directly through the Booking page on this portfolio! He's open to freelance projects covering branding, UI/UX, and frontend development. [Head to /booking to get started.]",
  },
  {
    triggers: ["price", "cost", "rate", "how much", "charge", "fee", "budget"],
    response:
      "Pricing varies by project scope and timeline. The best way to get a quote is to book a free discovery call through the Booking page — Juneco communicates directly with clients from day one.",
  },
  {
    triggers: ["contact", "email", "reach", "get in touch", "message"],
    response:
      "You can reach Juneco at **juneco.mirande@gmail.com**, or use the contact section on this portfolio. He responds promptly and is open to both freelance and employment conversations.",
  },
  {
    triggers: ["remote", "location", "available", "hire", "job", "open to"],
    response:
      "Juneco is based in the Philippines and fully open to remote work worldwide. He's also available for on-site or hybrid roles within Negros Island (Negros Occidental and Negros Oriental).",
  },
  {
    triggers: ["resume", "cv", "curriculum"],
    response:
      "You can view Juneco's full resume at https://juneco-mirande.web.app/resume — it opens in a new tab from the portfolio.",
  },
  {
    triggers: ["portfolio", "link", "website", "site"],
    response:
      "You're already on Juneco's portfolio! You can also access it directly at https://juneco-mirande.web.app/",
  },
  {
    triggers: ["figma", "design system", "prototype", "wireframe"],
    response:
      "Figma is Juneco's primary UI/UX tool — he works across wireframes, high-fidelity mockups, auto layout, component libraries, variables, design systems, and developer handoff documentation.",
  },
  {
    triggers: ["photoshop", "graphic", "branding", "poster", "logo"],
    response:
      "Adobe Photoshop is Juneco's primary graphic design tool — photo manipulation, retouching, branding, social media graphics, and production-ready Meta advertising creatives across multiple industries.",
  },
  {
    triggers: [
      "certif",
      "course",
      "study",
      "education",
      "school",
      "college",
      "degree",
    ],
    response:
      "Juneco holds a BS in Information Technology from La Consolacion College–Bacolod (2021–2026). Certifications include:\n• Adobe Certified Professional - Photoshop Cert Prep (May 2026)\n• Figma for UX Design (March 2025)\n• Currently pursuing Coursera DTI x Google UX Design Certificate",
  },
  {
    triggers: ["language", "speak", "filipino", "english", "cebuano"],
    response: "Juneco is fluent in Filipino, Cebuano, Hiligaynon, and English.",
  },
  {
    triggers: ["thanks", "thank you", "ty", "thx", "appreciate"],
    response:
      "Happy to help! Let me know if you have any other questions about Juneco's work. 🙌",
  },
  {
    triggers: ["bye", "goodbye", "see you", "later", "ciao"],
    response: "Take care! Feel free to come back anytime. ✌️",
  },
];

function matchKeyword(input) {
  const lower = input.toLowerCase().trim();
  for (const entry of KB) {
    if (entry.triggers.some((t) => lower.includes(t))) return entry.response;
  }
  return null;
}

// ─── Home screen quick actions ─────────────────────────────────────────────
const SUGGESTED_PROMPTS = [
  "What services do you offer?",
  "Tell me about your experience",
  "How can I book a project?",
];

const QUICK_OPTIONS = [
  {
    icon: Sparkle,
    title: "Ask a question",
    desc: "AI assistant, answers instantly",
    action: "chat",
  },
  {
    icon: Briefcase,
    title: "Book a project",
    desc: "Start a freelance inquiry",
    href: "/booking",
  },
  {
    icon: FileText,
    title: "View resume",
    desc: "Experience, skills & awards",
    href: "/resume",
  },
];
// ─── Inline markdown renderer ─────────────────────────────────────────────────
function RenderMessage({ text }) {
  return (
    <div className="flex flex-col gap-0.5">
      {text.split("\n").map((line, i) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="leading-relaxed">
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j} className="font-bold text-accent">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                part
              ),
            )}
          </p>
        );
      })}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ChatBot({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hey! 👋 I'm Juneco's portfolio assistant. Ask me anything about his design, frontend work, or availability.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [screen, setScreen] = useState("home");

  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // ── Track nav visibility so the panel hides/reveals in sync with Nav ───────
  const [navVisible, setNavVisible] = useState(false);
  useEffect(() => {
    const handleNavScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const isHomePage = pathname === "/";
      setNavVisible(!isHomePage || scrollTop > winHeight * 0.4);
    };
    window.addEventListener("scroll", handleNavScroll, { passive: true });
    handleNavScroll();
    return () => window.removeEventListener("scroll", handleNavScroll);
  }, [pathname]);

  // ── Reappearance animation — independent from the hide transition ─────────
  // The CSS class handles disappearing (synced 1:1 with Nav's own -translate-x-12
  // duration-700 exit). Reappearing is handled separately here so it can use a
  // shorter travel distance + its own delay, instead of mirroring the hide.
  const hasMountedNav = useRef(false);
  useEffect(() => {
    if (!panelRef.current) return;
    if (!hasMountedNav.current) {
      hasMountedNav.current = true;
      return;
    }
    if (navVisible) {
      gsap.set(panelRef.current, { transitionProperty: "none" });
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: -8 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.22,
          ease: "power2.out",
          clearProps: "opacity,transform,transitionProperty",
        },
      );
    }
  }, [navVisible]);

  // ── Panel open/close animation (also hides when nav is out of view) ───────
  // clearProps hands opacity/transform back to the same CSS classes that
  // drive navVisible, so the panel fades out in sync with Nav's own
  // duration-700 transition instead of a separate GSAP fade.
  useEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      if (messages.length <= 1) setScreen("home");
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.95, x: -15, transformOrigin: "bottom left" },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.3,
          ease: "power3.out",
          clearProps: "opacity,transform",
        },
      );
    } else {
      gsap.to(panelRef.current, {
        opacity: 0,
        scale: 0.95,
        x: -10,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  // ── Autofocus input only once the chat screen is active ────────────────────
  useEffect(() => {
    if (isOpen && screen === "chat") {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, screen]);

  // ── Auto-scroll to bottom ──────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Send message ───────────────────────────────────────────────────────────
  const sendMessage = async (overrideText) => {
    const raw = (
      typeof overrideText === "string" ? overrideText : input
    ).trim();
    if (!raw || isTyping) return;

    const trimmed = sanitiseInput(raw);
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    await new Promise((r) => setTimeout(r, 400));

    // 1. Keyword layer
    const kw = matchKeyword(trimmed);
    if (kw) {
      setMessages((prev) => [...prev, { role: "bot", text: kw }]);
      setIsTyping(false);
      return;
    }

    // 2. AI fallback
    if (!WORKER_URL) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Reach Juneco directly at juneco.mirande@gmail.com!",
        },
      ]);
      setIsTyping(false);
      return;
    }

    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "You're sending messages a bit fast. Please give it a moment! 🙂",
          },
        ]);
        return;
      }

      if (!res.ok) throw new Error("upstream");

      const data = await res.json();
      const reply = typeof data?.reply === "string" ? data.reply : null;
      if (reply) {
        setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      } else {
        throw new Error("bad_response");
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "I ran into an issue there. Try asking something else, or email Juneco at juneco.mirande@gmail.com.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Hide on booking page
  if (pathname === "/booking") return null;

  return (
    <>
      {/* ── Chat Panel — premium round design styled to match UIUX cards ──────── */}
      {isOpen && (
        <div
          ref={panelRef}
          className={`fixed z-[54] flex flex-col rounded-[2rem] border border-dark/10 shadow-2xl bg-primary text-dark overflow-hidden transition-all duration-700 ${navVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12 pointer-events-none"}`}
          style={{
            bottom: "10rem",
            left: "6.5rem", // Sits beautifully next to/just above the exclamation dot layout next to Nav
            width: "22rem",
            maxWidth: "calc(100vw - 8rem)",
            height: screen === "home" ? "auto" : "28rem",
            maxHeight: screen === "home" ? "none" : "60vh",
          }}
        >
          {screen === "home" ? (
            <>
              {/* Hero header */}
              <div className="relative bg-dark px-6 pt-10 pb-8 shrink-0 overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 0% 100%, var(--color-accent, #E63B2E) 0%, transparent 60%)",
                    opacity: 0.35,
                  }}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center border border-primary/10 hover:border-primary/30 text-primary/50 hover:text-primary transition-all duration-200 z-10"
                >
                  <X size={14} weight="bold" />
                </button>
                <p className="relative z-10 font-mono text-[9px] text-accent tracking-[2px] uppercase font-bold mb-4">
                  Hey there
                </p>
                <h3 className="relative z-10 font-sans font-black text-3xl text-primary tracking-tighter uppercase leading-[0.95]">
                  How can
                  <br />I help?
                </h3>
              </div>

              {/* Quick actions */}
              <div className="px-4 py-4 flex flex-col gap-2">
                {QUICK_OPTIONS.map((opt, i) => {
                  const row = (
                    <>
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                        <opt.icon size={18} weight="duotone" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans font-bold text-sm text-dark truncate">
                          {opt.title}
                        </p>
                        <p className="font-mono text-[9px] text-dark/45 uppercase tracking-widest truncate">
                          {opt.desc}
                        </p>
                      </div>
                      <CaretRight size={14} className="text-dark/25 shrink-0" />
                    </>
                  );
                  return opt.href ? (
                    <Link
                      key={i}
                      href={opt.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-4 p-3 rounded-2xl border border-dark/10 hover:border-accent/40 hover:bg-accent/5 transition-all duration-200"
                    >
                      {row}
                    </Link>
                  ) : (
                    <button
                      key={i}
                      onClick={() => setScreen("chat")}
                      className="flex items-center gap-4 p-3 rounded-2xl border border-dark/10 hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 text-left"
                    >
                      {row}
                    </button>
                  );
                })}
              </div>

              {/* Bottom tab bar */}
              <div className="flex items-center justify-around border-t border-dark/5 px-4 py-3 shrink-0">
                <button className="flex flex-col items-center gap-1 text-dark">
                  <House size={18} weight="fill" />
                  <span className="font-mono text-[8px] uppercase tracking-widest font-bold">
                    Home
                  </span>
                </button>
                <button
                  onClick={() => setScreen("chat")}
                  className="flex flex-col items-center gap-1 text-dark/45 hover:text-dark transition-colors duration-200"
                >
                  <ChatCircleDots size={18} weight="fill" />
                  <span className="font-mono text-[8px] uppercase tracking-widest font-bold">
                    Chat
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-dark/5 shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setScreen("home")}
                    className="w-8 h-8 rounded-full flex items-center justify-center border border-dark/5 hover:border-dark/20 text-dark/60 hover:text-dark transition-all duration-200"
                  >
                    <ArrowLeft size={14} weight="bold" />
                  </button>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-accent/10">
                    <Image
                      src="/images/chatbot-avatar.webp"
                      alt="Chatbot avatar"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-accent ring-2 ring-primary" />
                  </div>
                  <div>
                    <p className="font-sans font-bold text-sm text-dark">
                      Juneco's Bot
                    </p>
                    <p className="font-mono text-[9px] text-dark/50 tracking-wide">
                      Portfolio assistant
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center border border-dark/5 hover:border-dark/20 text-dark/60 hover:text-dark transition-all duration-200"
                >
                  <X size={14} weight="bold" />
                </button>
              </div>

              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4"
                style={{ scrollbarWidth: "none" }}
                data-lenis-prevent
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-dark text-primary rounded-[1.5rem_1.5rem_0.25rem_1.5rem]"
                          : "bg-background text-dark border border-dark/5 rounded-[1.5rem_1.5rem_1.5rem_0.25rem]"
                      }`}
                    >
                      <RenderMessage text={msg.text} />
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-background text-dark/40 border border-dark/5 px-4 py-3 rounded-[1.5rem_1.5rem_1.5rem_0.25rem] text-xs font-mono tracking-widest flex gap-1">
                      <span className="animate-bounce font-black">.</span>
                      <span className="animate-bounce delay-100 font-black">
                        .
                      </span>
                      <span className="animate-bounce delay-200 font-black">
                        .
                      </span>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {messages.length === 1 && !isTyping && (
                <div className="flex flex-wrap items-center justify-center gap-2 px-6 pb-3">
                  {SUGGESTED_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(prompt)}
                      className="px-3.5 py-2 rounded-full border border-dark/10 text-dark/55 text-[10px] font-mono hover:border-accent/40 hover:text-accent hover:bg-accent/5 transition-all duration-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Panel */}
              <div className="px-6 py-4 border-t border-dark/5 shrink-0">
                <div className="flex items-center gap-2 bg-background border border-dark/10 rounded-[1.5rem] p-1.5 pl-4">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question..."
                    className="flex-1 bg-transparent text-xs text-dark outline-none placeholder:text-dark/30"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    className="w-8 h-8 rounded-full bg-accent hover:bg-accent/90 text-white flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-30"
                  >
                    {isTyping ? (
                      <Spinner size={14} className="animate-spin" />
                    ) : (
                      <PaperPlaneTilt size={14} weight="fill" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
