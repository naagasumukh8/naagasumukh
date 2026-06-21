import { useEffect, useRef, useState } from "react";
import { SplitWord } from "./PortfolioUtils";

// ============ SIMPLE ROLE CYCLER (CSS-only, no blur morphing) ============
function RoleCycler({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 200);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles]);

  return (
    <span
      className="inline-block transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {roles[index]}
    </span>
  );
}

// ============ HERO ============
export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Simple grid background — CSS only */}
      <div className="absolute inset-0 grid-bg opacity-25" />

      {/* Static radial gradient — replaces NeuralCanvas + Spline 3D */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.08) 0%, transparent 55%), radial-gradient(ellipse at 75% 65%, rgba(255,255,255,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Left-to-right + bottom fade overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#05080F] via-[#05080F]/80 to-transparent md:via-[#05080F]/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#05080F]" />

      {/* Content */}
      <div className="pointer-events-none relative z-10 flex w-full md:w-1/2 max-w-[1600px] flex-col items-start px-6 md:px-12 text-left [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
        <div
          className="hero-badge mb-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-body"
          style={{ opacity: 0, animation: "fadeUp 0.6s 0.2s forwards" }}
        >
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22ff88] shadow-[0_0_10px_rgba(34,255,136,0.85)]" />
          </span>
          Available for opportunities
          <span className="text-white">→</span>
        </div>

        <h1 className="font-display font-bold leading-[0.82] tracking-tight text-body">
          <div
            className="block w-full whitespace-nowrap"
            style={{ fontSize: "clamp(48px, 9.5vw, 150px)" }}
          >
            <SplitWord word="Building" delay={300} />
          </div>
          <div
            className="block w-full whitespace-nowrap"
            style={{ fontSize: "clamp(48px, 9.5vw, 150px)" }}
          >
            <SplitWord word="Intelligent" delay={600} />
          </div>
          <div
            className="block w-full whitespace-nowrap"
            style={{ fontSize: "clamp(48px, 9.5vw, 150px)" }}
          >
            <SplitWord word="Systems." delay={900} gradient />
          </div>
        </h1>

        <div
          className="mt-10 h-16 md:h-20 w-full max-w-2xl flex items-center"
          style={{ opacity: 0, animation: "fadeUp 0.6s 1.4s forwards" }}
        >
          <span className="font-mono text-xl md:text-3xl uppercase tracking-[0.3em] text-body">
            <RoleCycler roles={["Artificial Intelligence", "Machine Learning", "Automation", "Leadership"]} />
          </span>
        </div>

        <div
          className="mt-8 hidden md:flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70"
          style={{ opacity: 0, animation: "fadeUp 0.6s 1.8s forwards" }}
        >
          <span className="h-px w-10 bg-white/40" />
          Scroll to explore the work
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="block h-14 w-px overflow-hidden bg-white/10 relative">
          <span
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white to-transparent"
            style={{ animation: "heartbeatLine 1.8s ease-in-out infinite" }}
          />
        </span>
        <span className="font-mono text-[10px] text-muted-soft leading-none">↓</span>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heartbeatLine { 0%{transform:translateY(-100%);opacity:0} 20%{opacity:1} 60%{transform:translateY(180%);opacity:0.2} 100%{transform:translateY(220%);opacity:0} }
      `}</style>
    </section>
  );
}
