import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, ArrowUpRight, Play, ExternalLink } from "lucide-react";
import sachhaiVideo from "@/assets/sachhai-demo.mp4.asset.json";
import FadeIn from "./FadeIn";

interface ProjectData {
  number: string;
  category: string;
  name: string;
  badge: string;
  desc: string;
  tags: string[];
  liveUrl: string;
  ctaText: string;
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
    media: { kind: "iframe", src: "https://easyhospital.lovable.app" },
  },
  {
    number: "03",
    category: "NLP · Fraud Detection",
    name: "JobShield",
    badge: "Multi-level verification",
    desc: "Multi-stage fraud detector classifying job listings using Natural Language Processing (NLP) and Machine Learning. Verifies recruiters via email domains, WHOIS registrations, and automated company website checks to output clear confidence scores.",
    tags: ["Python", "Scikit-learn", "spaCy", "BeautifulSoup", "WHOIS", "Pandas", "Random Forest"],
    liveUrl: "https://github.com/naagasumukh8/Job_Verify_FYP",
    ctaText: "View on GitHub",
    media: { kind: "graphic", src: "JobShield" },
  },
];

interface ProjectCardProps {
  project: ProjectData;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ProjectCard = ({ project, index, total, containerRef }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [loadIframe, setLoadIframe] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Scale down cards beneath the active one — increased differential for visible depth
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky h-[85vh] w-full"
      style={{ top: `${86 + index * 24}px` }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-full w-full flex flex-col gap-4 sm:gap-6 rounded-[30px] sm:rounded-[40px] border-2 border-white/10 bg-[#07121F] p-5 sm:p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
      >
        {/* Card Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-3 sm:gap-6 border-b border-white/10 pb-4">
          <div className="flex items-start gap-4 md:gap-8 min-w-0 flex-1">
            <div
              className="font-display font-black text-white/10 leading-none select-none"
              style={{ fontSize: "clamp(2rem, 8vw, 100px)" }}
            >
              {project.number}
            </div>
            <div className="flex flex-col gap-1 pt-1 md:pt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                  {project.category}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#ff8a3d]">
                  {project.badge}
                </span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-black uppercase text-body">
                {project.name}
              </h3>
            </div>
          </div>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 self-start sm:self-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-body hover:bg-white/15 hover:text-white transition-all duration-300 active:scale-95"
          >
            {project.ctaText} <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Content Body Row (Double Column layout) */}
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-6 flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
          {/* Info Column */}
          <div className="flex flex-col justify-between gap-4 py-2">
            <div>
              <p className="text-sm sm:text-base leading-relaxed text-muted-soft mb-6">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-body"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Custom Interactive Elements */}
            {project.media.kind === "video" && (
              <div className="hidden md:block">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff8a3d] text-black font-semibold text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#ff9d5c] transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  {isPlaying ? "Pause Demo In Card" : "Preview Demo"}
                </button>
              </div>
            )}
          </div>

          {/* Interactive Screen Preview Column */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 min-h-[220px] md:h-full flex items-center justify-center">
            {project.media.kind === "video" && (
              <video
                src={project.media.src}
                autoPlay={isPlaying}
                controls={isPlaying}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            )}
            
            {project.media.kind === "iframe" && (
              <div className="w-full h-full relative group flex flex-col items-center justify-center bg-gradient-to-br from-[#0A1224] to-[#07121F] p-6 text-center select-none">
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
                      className="absolute top-3 right-3 z-20 bg-black/75 hover:bg-black/95 text-white border border-white/15 rounded-lg px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider transition-colors cursor-pointer active:scale-95"
                    >
                      Deactivate Sandbox
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center max-w-sm">
                    <div className="h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl flex mb-4 text-[#ff8a3d]">
                      🏥
                    </div>
                    <h4 className="font-display text-lg font-black uppercase text-white mb-2">
                      MediConnect Sandbox
                    </h4>
                    <p className="text-xs text-muted-soft mb-6 leading-relaxed">
                      To prevent background script execution and main-thread stutter, this interactive demo is offline. Click below to activate.
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
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0F2540] to-[#07121F] p-6 text-center select-none">
                <div className="h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl flex mb-4 text-[#ff8a3d]">
                  🛡️
                </div>
                <h4 className="font-display text-xl font-black uppercase text-white mb-2">
                  JobShield Platform
                </h4>
                <p className="text-xs text-muted-soft max-w-sm">
                  Security-first verification dashboard utilizing spaCy NLP entity mapping and DNS/WHOIS scrapers.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="work"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#05080F] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="text-center font-display font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28 text-white"
          style={{ fontSize: "clamp(3rem, 10vw, 120px)" }}
        >
          Selected Projects
        </h2>
      </FadeIn>

      <div ref={containerRef} className="mx-auto max-w-7xl flex flex-col gap-10">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            total={PROJECTS.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
}
export default Projects;
