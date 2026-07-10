import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
// hamburger icon is rendered inline as three animated bars
import portrait from "../assets/portrait-avatar.jpg.asset.json";

const links = [
  { hash: "", label: "Home", id: "hero" },
  { hash: "about", label: "About", id: "about" },
  { hash: "work", label: "Work", id: "work" },
  { hash: "journey", label: "Journey", id: "journey" },
  
  { hash: "contact", label: "Contact", id: "contact" },
] as const;

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = links.map((l) => l.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const isActive = (id: string) => active === id;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "[backdrop-filter:blur(16px)_saturate(140%)] bg-background/55 border-b border-white/[0.08]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-6">
        <Link to="/" className="group flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-2 ring-primary/40 shadow-lg shadow-primary/20 active:scale-[0.94] transition-transform duration-200">
            <img src={portrait.url} alt="Naaga Sumukh" className="h-full w-full object-cover" />
          </span>
          <span className="hidden md:inline font-mono text-[12px] font-bold tracking-[0.18em] text-foreground">
            NAAGA&nbsp;SUMUKH
          </span>
        </Link>

        <ul className="flex min-w-0 items-center gap-0.5 sm:gap-1 rounded-full border border-white/15 bg-white/[0.06] px-1 py-1 sm:px-2 [backdrop-filter:blur(18px)_saturate(160%)] shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]">
          {links.map((l) => {
            const act = isActive(l.id);
            return (
              <li key={l.label}>
                <a
                  href={l.hash ? `/#${l.hash}` : "/"}
                  onClick={(e) => smoothScrollOnSamePage(e, l.hash)}
                  aria-current={act ? "page" : undefined}
                  className={`relative inline-flex items-center rounded-full px-2 sm:px-3 py-1.5 text-[10px] sm:text-xs font-medium whitespace-nowrap transition-all ${
                    act
                      ? "text-white shadow-[0_0_22px_rgba(124,110,255,0.65)] ring-1 ring-[rgba(167,139,250,0.7)]"
                      : "text-foreground/70 hover:text-foreground hover:bg-white/10"
                  }`}
                  style={
                    act
                      ? {
                          background:
                            "linear-gradient(135deg, rgba(124,110,255,0.35), rgba(255,255,255,0.06))",
                        }
                      : undefined
                  }
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>

      </nav>

    </header>
  );
}

function smoothScrollOnSamePage(e: React.MouseEvent, hash: string) {
  if (typeof window === "undefined") return;
  if (window.location.pathname !== "/") return;
  e.preventDefault();
  if (!hash) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", "/");
    return;
  }
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `/#${hash}`);
  }
}

void Link;
void useRouterState;
