import { useState } from "react";
import { createPortal } from "react-dom";
import sachhaiVideo from "@/assets/sachhai-demo.mp4.asset.json";

import {
  Reveal,
  SectionLabel,
  SectionBackdrop,
} from "./PortfolioUtils";

// ============ SELECTED WORK / PROJECTS ============
export function Projects() {
  const projects = [
    {
      n: "01",
      name: "SacchAI",
      desc: "Browser extension for real-time detection of unauthorized AI assistance during online interviews — monitors behavioural signals, clipboard activity, tab-switching and speech/response patterns. Custom ensemble classifier generates recruiter-facing reports with genuineness scores, suspicious-activity flags and plagiarism analysis.",
      badge: "88.4% accuracy",
      tags: [
        "JavaScript",
        "TypeScript",
        "React",
        "Chrome APIs",
        "Python",
        "Scikit-learn",
        "Node.js",
        "REST APIs",
      ],
      link: "https://github.com/naagasumukh8",
      cta: "Watch demo",
      media: { kind: "video" as const, src: sachhaiVideo.url },
    },
    {
      n: "02",
      name: "MediConnect",
      desc: "Full-stack HealthcareOS: multi-hospital management, role-based access, appointment scheduling, digital prescriptions, inter-department referrals, pharmacy inventory and AI-assisted patient support. Automated follow-ups, shared medical memory, family accounts and secure file storage via Supabase RLS, validated end-to-end with Playwright + TypeScript.",
      badge: "Live product",
      tags: [
        "React",
        "TypeScript",
        "Tailwind",
        "Supabase RLS",
        "Google Calendar API",
        "Playwright",
      ],
      link: "https://easyhospital.lovable.app",
      cta: "Visit live site",
      media: { kind: "iframe" as const, src: "https://easyhospital.lovable.app" },
    },
    {
      n: "03",
      name: "JobShield — AI-Powered Fake Job Detection",
      desc: "Final-year project. Multi-stage fraud detector: NLP + ML on job posts, recruiter verification via email domains, WHOIS and company sites. Explainable verdicts — Likely Genuine, Suspicious, or High Scam Risk.",
      badge: "Multi-level verification",
      tags: [
        "Python",
        "Scikit-learn",
        "spaCy",
        "BeautifulSoup",
        "WHOIS",
        "Pandas",
        "TF-IDF",
        "Random Forest",
      ],
      link: "https://github.com/naagasumukh8/Job_Verify_FYP",
      cta: "View on GitHub",
      media: { kind: "none" as const, src: "" },
    },
  ];

  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section id="work" className="relative overflow-hidden">
      <SectionBackdrop variant="grid" />
      <div className="px-5 pt-16 sm:px-6 sm:pt-20 md:px-12 md:pt-24">
        <div className="mx-auto max-w-[1300px]">
          <Reveal>
            <SectionLabel num="03" text="Selected Work" />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mb-8 font-display text-4xl font-bold text-body md:mb-10 md:text-6xl">
              Each project is <span className="text-violet">its own world</span>.
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="px-5 pb-20 sm:px-6 md:px-12 md:pb-24">
        <div className="mx-auto grid max-w-[1300px] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.n} delay={i * 80}>
              <article
                data-hover
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F2540] via-[#0B1A2E] to-[#07121F] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-black/40">
                  {p.media.kind === "video" && (
                    <video
                      src={p.media.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  )}
                  {p.media.kind === "iframe" && (
                    <iframe
                      src={p.media.src}
                      title={p.name}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                      className="pointer-events-none h-full w-full origin-top-left scale-[0.65] border-0"
                      style={{ width: "153.8%", height: "153.8%" }}
                    />
                  )}
                  {p.media.kind === "none" && (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/5 to-white/[0.02]">
                      <span className="font-display text-8xl font-bold text-white/10">{p.n}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-gold">
                      Project {p.n} / 0{projects.length}
                    </div>
                    {p.badge && (
                      <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mb-2 font-display text-2xl font-bold leading-tight text-body group-hover:text-violet">
                    {p.name}
                  </h3>
                  <p className="mb-3 line-clamp-3 text-sm text-muted-soft">{p.desc}</p>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 8).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-body"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.cta === "Watch demo" && p.media.kind === "video" ? (
                    <button
                      type="button"
                      onClick={() => setDemoOpen(true)}
                      className="mt-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-body transition-colors duration-200 hover:bg-white/15 hover:text-white"
                    >
                      {p.cta} <span aria-hidden>▶</span>
                    </button>
                  ) : (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-body transition-colors duration-200 hover:bg-white/15 hover:text-white"
                    >
                      {p.cta} <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {demoOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4"
            onClick={() => setDemoOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setDemoOpen(false)}
                aria-label="Close demo"
                className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white hover:bg-white/20"
              >
                ✕
              </button>
              <video
                src={sachhaiVideo.url}
                autoPlay
                controls
                playsInline
                className="aspect-video w-full bg-black"
              />
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}

// Live3D removed — was loading Spline 3D runtime (~300KB+), creating a WebGL context,
// and running a continuous render loop for an interactive 3D scene.
// The performance cost far outweighed the visual value.
