import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Play, ExternalLink } from "lucide-react";
import sachhaiVideo from "@/assets/sachhai-demo.mp4.asset.json";
import FadeIn from "./FadeIn";

gsap.registerPlugin(ScrollTrigger);

interface ProjectData {
  number: string;
  category: string;
  name: string;
  badge: string;
  desc: string;
  tags: string[];
  liveUrl: string;
  ctaText: string;
  accent: string;
  media: {
    kind: "video" | "iframe" | "graphic";
    src: string;
  };
}

const PROJECTS: ProjectData[] = [
  {
    number: "01",
    category: "Browser Extension · Machine Learning",
    name: "SacchAI",
    badge: "88.4% Accuracy",
    desc: "Browser extension for real-time detection of unauthorized AI assistance during online interviews. Monitors behavioral signals, clipboard activity, tab-switching, and speech/response patterns. A custom ensemble classifier generates recruiter-facing reports with genuineness scores and suspicious-activity flags.",
    tags: ["JavaScript", "TypeScript", "React", "Chrome APIs", "Python", "Scikit-learn", "Node.js"],
    liveUrl: "https://github.com/naagasumukh8",
    ctaText: "Watch Demo",
    accent: "#ff8a3d",
    media: { kind: "video", src: sachhaiVideo.url },
  },
  {
    number: "02",
    category: "Full-Stack Web Application · Supabase",
    name: "MediConnect",
    badge: "Live Product",
    desc: "Full-stack HealthcareOS: multi-hospital management, role-based access, appointment scheduling, digital prescriptions, pharmacy inventory, and AI-assisted patient support. Integrated Google Calendar, automated follow-ups, and secure file storage with Supabase RLS.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase RLS", "Google Calendar API", "Playwright"],
    liveUrl: "https://easyhospital.lovable.app",
    ctaText: "Visit Live Site",
    accent: "#00d4ff",
    media: { kind: "iframe", src: "https://easyhospital.lovable.app" },
  },
  {
    number: "03",
    category: "NLP · Fraud Detection",
    name: "JobShield",
    badge: "Multi-level Verification",
    desc: "Multi-stage fraud detector classifying job listings using Natural Language Processing (NLP) and Machine Learning. Verifies recruiters via email domains, WHOIS registrations, and automated company website checks to output clear confidence scores.",
    tags: ["Python", "Scikit-learn", "spaCy", "BeautifulSoup", "WHOIS", "Pandas", "Random Forest"],
    liveUrl: "https://github.com/naagasumukh8/Job_Verify_FYP",
    ctaText: "View on GitHub",
    accent: "#7c6eff",
    media: { kind: "graphic", src: "JobShield" },
  },
];

// ── Single Panel (Original two-column desktop look, but horizontally scrolling) ──
function ProjectPanel({ project }: { project: ProjectData }) {
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [loadIframe, setLoadIframe] = useState(false);

  return (
    <div
      className="project-panel flex-shrink-0 w-full h-screen flex flex-col justify-center px-5 md:px-16 relative overflow-hidden"
    >
      {/* Large background identifier numbers */}
      <div
        className="pointer-events-none absolute right-[-0.05em] top-1/2 -translate-y-1/2 font-display font-black leading-none select-none z-0"
        style={{
          fontSize: "clamp(200px, 32vw, 450px)",
          color: project.accent,
          opacity: 0.03,
          letterSpacing: "-0.06em",
        }}
      >
        {project.number}
      </div>

      {/* Accent glow backdrop */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(45% 55% at 75% 50%, ${project.accent}12, transparent 75%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 md:gap-12 items-center">
        {/* Left Side: Info */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: project.accent }}>
                {project.category}
              </span>
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider border"
                style={{ color: project.accent, borderColor: `${project.accent}30`, background: `${project.accent}08` }}
              >
                {project.badge}
              </span>
            </div>

            <h3
              className="font-display font-black uppercase text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
            >
              {project.name}
            </h3>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-muted-soft">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider border"
                style={{ color: "#a0a0c0", borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 mt-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-all duration-300 hover:text-black"
              style={{
                borderColor: `${project.accent}50`,
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = project.accent)}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
            >
              {project.ctaText} <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Side: Media Showcase */}
        <div
          className="relative overflow-hidden rounded-2xl border"
          style={{
            height: "clamp(240px, 40vh, 480px)",
            borderColor: "rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          {project.media.kind === "video" && (
            <div className="relative w-full h-full">
              <video
                src={project.media.src}
                autoPlay={isPlaying}
                controls={isPlaying}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all hover:bg-black/40">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="inline-flex items-center gap-2 rounded-full font-semibold text-xs uppercase tracking-widest px-6 py-3 transition-all hover:scale-105"
                    style={{ background: project.accent, color: "#000" }}
                  >
                    <Play className="w-3.5 h-3.5 fill-black" /> Preview Demo
                  </button>
                </div>
              )}
            </div>
          )}

          {project.media.kind === "iframe" && (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0A1224] to-[#050510] p-6 text-center select-none">
              {loadIframe ? (
                <>
                  <iframe
                    src={project.media.src}
                    title={project.name}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    className="w-full h-full border-0"
                  />
                  <button
                    onClick={() => setLoadIframe(false)}
                    className="absolute top-3 right-3 z-20 bg-black/75 hover:bg-black/95 text-white border border-white/15 rounded-lg px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider"
                  >
                    Deactivate
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 max-w-sm">
                  <div className="h-14 w-14 rounded-2xl border border-white/10 bg-white/5 text-2xl flex items-center justify-center" style={{ color: project.accent }}>
                    🏥
                  </div>
                  <h4 className="font-display text-lg font-black uppercase text-white">MediConnect Sandbox</h4>
                  <p className="text-xs leading-relaxed text-muted-soft">
                    Interactive sandbox demo. Click below to initialize live preview.
                  </p>
                  <button
                    onClick={() => setLoadIframe(true)}
                    className="glass-pill text-[10px] font-bold uppercase tracking-widest px-6 py-3"
                  >
                    Initialize Live Preview
                  </button>
                </div>
              )}
            </div>
          )}

          {project.media.kind === "graphic" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none"
              style={{ background: "linear-gradient(135deg, #0F2540, #050510)" }}>
              <div className="h-16 w-16 rounded-2xl border border-white/10 bg-white/5 text-2xl flex items-center justify-center mb-4" style={{ color: project.accent }}>
                🛡️
              </div>
              <h4 className="font-display text-xl font-black uppercase text-white mb-2">JobShield Platform</h4>
              <p className="text-xs max-w-sm text-muted-soft">
                Security-first verification dashboard utilizing spaCy NLP entity mapping and DNS/WHOIS scrapers.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Projects Section ──────────────────────────────────────────────────────────
export function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track   = trackRef.current;
    if (!wrapper || !track) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
      const count  = panels.length;

      // Horizontal Scroll pinning
      gsap.to(track, {
        xPercent: -100 * (count - 1),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${(count - 1) * window.innerWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx  = Math.round(self.progress * (count - 1));
            const dots = document.querySelectorAll(".work-panel-dot");
            dots.forEach((d, i) =>
              d.setAttribute("data-active", String(i === idx))
            );
          },
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="relative z-10 bg-transparent">
      {/* Header section before horizontal pin */}
      <div className="relative -mt-10 pt-20 pb-8 px-5 md:px-16 bg-transparent">
        <FadeIn y={30}>
          <div className="flex items-end justify-between max-w-7xl mx-auto">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: "#ff8a3d" }}>
                [ 04 — Selected Projects ]
              </div>
              <h2
                className="font-display font-black uppercase text-white"
                style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 0.9, letterSpacing: "-0.03em" }}
              >
                Selected<br />
                <span className="gradient-text">Projects</span>
              </h2>
            </div>
            {/* Panel indicators */}
            <div className="hidden md:flex flex-col gap-2 pb-2">
              {PROJECTS.map((_, i) => (
                <div
                  key={i}
                  className="work-panel-dot h-1.5 rounded-full transition-all duration-300"
                  data-active={String(i === 0)}
                  style={{
                    width: 24,
                    background: "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Pin Wrapper */}
      <div ref={wrapperRef} className="relative overflow-hidden" style={{ height: "100vh" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,138,61,0.3), transparent)" }} />

        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${PROJECTS.length * 100}vw` }}
        >
          {PROJECTS.map((project) => (
            <ProjectPanel key={project.number} project={project} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce animate-duration-1000" style={{ opacity: 0.3 }}>
          <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">scroll</span>
          <div className="w-px h-8 bg-white/20" />
        </div>
      </div>

      <style>{`
        .work-panel-dot[data-active="true"] {
          background: #ff8a3d !important;
          box-shadow: 0 0 8px rgba(255,138,61,0.8);
          width: 36px !important;
        }
      `}</style>
    </section>
  );
}

export default Projects;
