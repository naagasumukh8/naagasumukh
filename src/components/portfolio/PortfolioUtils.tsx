import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";

// ============ IN-VIEW DETECTION ============
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ============ STATIC SECTION BACKDROP (no animation, no blur) ============
export function SectionBackdrop({
  variant,
}: {
  variant: "paths" | "dots" | "aurora-violet" | "aurora-gold" | "aurora-cyan" | "grid";
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.05);

  // All variants now use a simple static radial gradient — no animation, no blur
  const gradients: Record<string, string> = {
    paths: "radial-gradient(50% 50% at 20% 30%, rgba(255,255,255,0.06), transparent 70%), radial-gradient(40% 50% at 80% 70%, rgba(255,255,255,0.04), transparent 70%)",
    dots: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.05), transparent 70%)",
    "aurora-violet": "radial-gradient(50% 50% at 30% 40%, rgba(255,255,255,0.06), transparent 70%)",
    "aurora-gold": "radial-gradient(50% 50% at 70% 30%, rgba(255,255,255,0.05), transparent 70%)",
    "aurora-cyan": "radial-gradient(50% 50% at 40% 60%, rgba(255,255,255,0.05), transparent 70%)",
    grid: "radial-gradient(50% 50% at 50% 40%, rgba(255,255,255,0.04), transparent 70%)",
  };

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${inView ? "opacity-100" : "opacity-0"}`}
      style={{ transitionDelay: inView ? "0ms" : "0ms" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: gradients[variant] || gradients.paths }}
      />
    </div>
  );
}

// ============ TYPING EFFECT ============
export function Typing({
  text,
  className = "",
  speed = 18,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      setDone(true);
      return;
    }
    let i = 0;
    let iv: ReturnType<typeof setInterval>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        iv = setInterval(() => {
          i++;
          setShown(text.slice(0, i));
          if (i >= text.length) {
            clearInterval(iv);
            setDone(true);
          }
        }, speed);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (iv) clearInterval(iv);
    };
  }, [text, speed]);
  return (
    <span ref={ref} className={className}>
      {shown}
      <span
        className="ml-0.5 inline-block h-[1em] w-[2px] -mb-1 bg-white align-middle"
        style={{ opacity: done ? 0 : 1, animation: done ? "none" : "blink 0.8s steps(2) infinite" }}
      />
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </span>
  );
}

// ============ REVEAL ON SCROLL ============
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVis(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0) scale(1)" : "translateY(32px) scale(0.98)",
        filter: vis ? "blur(0px)" : "blur(4px)",
        transition: [
          `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          `transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          `filter 0.55s ease ${delay}ms`,
        ].join(", "),
      }}
    >
      {children}
    </div>
  );
}

// ============ SPLIT TEXT REVEAL ============
export function SplitWord({
  word,
  delay = 0,
  gradient = false,
}: {
  word: string;
  delay?: number;
  glitch?: boolean; // kept for API compat, ignored
  gradient?: boolean;
}) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <span className="inline-block overflow-hidden align-bottom">
      {word.split("").map((c, i) => (
        <span
          key={i}
          className={`inline-block ${gradient ? "gradient-text" : ""}`}
          style={{
            transform: vis ? "translateY(0)" : "translateY(110%)",
            opacity: vis ? 1 : 0,
            transition: `transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 30}ms, opacity 0.5s ease ${i * 30}ms`,
          }}
        >
          {c}
        </span>
      ))}
    </span>
  );
}

// ============ COUNTER ============
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  decimals,
  compact = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  compact?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const dp = decimals ?? (value % 1 !== 0 ? (value.toString().split(".")[1]?.length ?? 2) : 0);
  const format = (x: number) => {
    if (compact) {
      if (x >= 1_000_000) return `${(x / 1_000_000).toFixed(x % 1_000_000 === 0 ? 0 : 1)}M`;
      if (x >= 1_000) return `${(x / 1_000).toFixed(x % 1_000 === 0 ? 0 : 1)}K`;
      return Math.floor(x).toString();
    }
    if (dp > 0) return x.toFixed(dp);
    return x >= 1000 ? Math.floor(x).toLocaleString() : Math.floor(x).toString();
  };
  const [text, setText] = useState<string>(format(0));
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(format(value));
      return;
    }
    let started = false;
    const run = () => {
      if (started) return;
      started = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setText(format(value * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);
    const fallback = setTimeout(run, 2500);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [value, duration, compact, dp]);
  return (
    <span ref={ref}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}

// ============ TILT CARD ============
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const onEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    let r = rectRef.current;
    if (!el) return;
    if (!r) {
      r = el.getBoundingClientRect();
      rectRef.current = r;
    }
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    const x = px / r.width - 0.5;
    const y = py / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    rectRef.current = null;
    if (ref.current)
      ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0) translateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  );
}

// ============ SECTION LABEL ============
export function SectionLabel({ num, text }: { num: string; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="mb-6 inline-block font-mono text-[11px] uppercase tracking-[0.3em] text-gold relative pb-1.5"
    >
      [ {num} — {text} ]
      <span
        aria-hidden
        className="absolute left-0 bottom-0 h-px w-full bg-white/50 origin-left"
        style={{
          transform: seen ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 80ms",
        }}
      />
    </div>
  );
}

// ============ GLOW TILE (simplified — no infinite border spin) ============
export function GlowTile({
  children,
  className = "",
  padding = "p-5",
}: {
  children: ReactNode;
  className?: string;
  padding?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const handleEnter = () => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    let r = rectRef.current;
    if (!el) return;
    if (!r) {
      r = el.getBoundingClientRect();
      rectRef.current = r;
    }
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const handleLeave = () => {
    rectRef.current = null;
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-transform duration-200 motion-safe:hover:-translate-y-1 ${className}`}
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
    >
      <div className={`relative h-full ${padding}`}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(200px circle at var(--mx) var(--my), rgba(255,255,255,0.08), transparent 60%)",
          }}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

// ============ MARQUEE DIVIDER ============
export function Marquee({ reverse = false }: { reverse?: boolean }) {
  const text = "NAAGA SUMUKH B S · AI/ML ENGINEER · BENGALURU · 2027 · ";
  return (
    <div
      className="ticker-fade relative overflow-hidden border-y border-white/[0.04] py-4"
      aria-hidden
    >
      <div
        className="flex w-max whitespace-nowrap font-mono text-sm uppercase tracking-[0.3em]"
        style={{
          color: "rgba(230,241,245,0.08)",
          animation: `${reverse ? "marqueeR" : "marqueeL"} 60s linear infinite`,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="px-4">
            {text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marqueeL { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}
