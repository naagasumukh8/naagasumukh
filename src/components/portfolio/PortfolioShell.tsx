import { useEffect, useRef, useState, type ReactNode } from "react";
import { PaperShaderBackdrop } from "@/components/ui/paper-shader-backdrop";

// ============ SCROLL PROGRESS BAR (CSS-only, no Framer Motion) ============
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const ratio = max > 0 ? window.scrollY / max : 0;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${ratio})`;
        }
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[80] h-[2px] bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          background: "#ffffff",
          boxShadow: "0 0 8px rgba(255,255,255,0.4)",
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
}

// ============ SECTION DOTS NAV ============
const SECTIONS = [
  { id: "hero", label: "Top" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "journey", label: "Journey" },
  { id: "recognition", label: "Recognition" },
  { id: "certs", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export function DotsNav() {
  const [active, setActive] = useState("hero");
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsHome(window.location.pathname === "/");
    if (window.location.pathname !== "/") return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  if (!isHome) return null;

  return (
    <nav className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 md:flex">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center gap-3"
          aria-label={s.label}
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-soft opacity-0 transition-opacity group-hover:opacity-100">
            {s.label}
          </span>
          <span
            className="block h-1.5 rounded-full transition-all duration-200"
            style={{
              width: active === s.id ? 24 : 8,
              backgroundColor: active === s.id ? "#ffffff" : "#3a3a55",
            }}
          />
        </a>
      ))}
    </nav>
  );
}

// ============ SHELL ============
export function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-screen bg-[#07121F] text-body">
      <PaperShaderBackdrop />
      <div className="relative z-10">
        <ScrollProgress />
        <DotsNav />
        {children}
      </div>
    </main>
  );
}
