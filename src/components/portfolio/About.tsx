import { useRef, useState, useEffect } from "react";
import {
  Brain,
  Workflow,
  BarChart3,
  Code2,
  Database,
  Atom,
  Sparkles,
  Boxes,
  GraduationCap,
  Users,
} from "lucide-react";
import portrait from "@/assets/portrait-avatar.jpg.asset.json";

import {
  Reveal,
  SectionLabel,
  GlowTile,
  SectionBackdrop,
} from "./PortfolioUtils";

// ============ ABOUT ============
export function About() {
  const tiles: Array<{
    label: string;
    value: string;
    sub?: string;
    accent: "violet" | "gold";
    wide?: boolean;
    italic?: boolean;
  }> = [
    {
      label: "Statement",
      value: '"Building real systems, not just demos."',
      accent: "violet",
      wide: true,
      italic: true,
    },
    { label: "LinkedIn Impressions", value: "1M+", sub: "Last 12 months", accent: "gold" },
    { label: "Cleve AI Users", value: "Top 0.095%", sub: "Global rank", accent: "gold" },
    { label: "CGPA · NMIT", value: "7.95", sub: "B.E. Information Science", accent: "gold" },
    { label: "Projects Shipped", value: "3+", sub: "Production systems", accent: "gold" },
    { label: "Based in", value: "Bengaluru", sub: "Available for opportunities", accent: "violet" },
  ];

  const focus = [
    {
      icon: Brain,
      title: "AI / ML Engineering",
      text: "NLP, classical ML, GenAI pipelines, RAG and agentic workflows.",
    },
    {
      icon: Workflow,
      title: "Automation & Ops",
      text: "End-to-end automations with N8N, Python, and Supabase.",
    },
    {
      icon: BarChart3,
      title: "Data & Insights",
      text: "Pandas, Power BI dashboards, storytelling with business data.",
    },
    {
      icon: Code2,
      title: "Full-Stack Delivery",
      text: "React, TypeScript, Tailwind — shipping recruiter-ready products.",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-40"
    >
      <SectionBackdrop variant="paths" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/70" />

      <div className="relative mx-auto max-w-[1300px]">
        <Reveal>
          <SectionLabel num="01" text="Professional Summary" />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-[420px_1fr] md:items-center md:gap-20">
          {/* PORTRAIT — simplified, no infinite spinning rings */}
          <Reveal>
            <div className="relative mx-auto h-56 w-56 md:h-[26rem] md:w-[26rem]">
              <div className="absolute -inset-6 rounded-full bg-white/5 md:-inset-10" />
              <div
                className="absolute -inset-[2px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 140deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 40%, rgba(255,255,255,0.05) 60%, rgba(255,255,255,0.25) 100%)",
                }}
              />
              <div className="absolute inset-[3px] rounded-full bg-background" />
              <div className="absolute inset-[10px] rounded-full border border-white/10" />
              <img
                src={portrait.url}
                alt="Naaga Sumukh B S"
                loading="lazy"
                className="absolute inset-[12px] h-[calc(100%-24px)] w-[calc(100%-24px)] rounded-full object-cover"
                style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7)" }}
              />
            </div>
          </Reveal>

          {/* COPY */}
          <div>
            <Reveal delay={80}>
              <h2 className="mb-6 font-display text-3xl font-bold leading-[1.05] text-body sm:text-4xl md:text-6xl">
                AI/ML engineer — <span className="text-violet">building real systems</span>, not
                just demos.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-soft sm:mb-10 sm:text-base md:text-lg">
                I thrive on turning complex machine learning research into practical,
                production-ready systems that solve real human needs. As an Information Science
                student at NMIT Bengaluru, I focus on building intelligent agentic workflows,
                natural language interfaces, and end-to-end automations.
                <span className="text-gold">
                  {" "}
                  Driven by impact, backed by 1M+ LinkedIn impressions and a top 0.095% global
                  ranking.
                </span>
              </p>
            </Reveal>

            {/* STAT TILES */}
            <div className="mb-10 grid grid-cols-2 gap-3 sm:mb-12 md:grid-cols-3">
              {tiles.map((t, i) => (
                <Reveal key={t.label} delay={220 + i * 70}>
                  <GlowTile className={t.wide ? "md:col-span-2" : ""}>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-soft">
                      {t.label}
                    </div>
                    <div
                      className={`mt-2 font-display font-bold ${t.accent === "gold" ? "text-gold" : "text-body"} ${
                        t.italic ? "text-lg italic leading-snug md:text-xl" : "text-2xl md:text-3xl"
                      }`}
                    >
                      {t.value}
                    </div>
                    {t.sub && <div className="mt-1 text-[10px] sm:text-[11px] leading-tight text-muted-soft/80">{t.sub}</div>}
                  </GlowTile>
                </Reveal>
              ))}
            </div>

            <Reveal delay={760}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/resume.pdf"
                  download="Naaga_Sumukh_BS_Resume.pdf"
                  className="glass-pill text-xs font-semibold px-6 py-3 inline-flex items-center justify-center gap-2"
                >
                  Download Resume <span className="ml-1">↓</span>
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-pill flex items-center justify-center font-mono text-xs uppercase tracking-widest text-white"
                  style={{ padding: "0.85rem 1.75rem", fontSize: "11px" }}
                >
                  View Resume <span className="ml-1">↗</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* FOCUS AREAS — static grid, no ContainerScroll or scroll-linked transforms */}
        <div className="mt-16 sm:mt-24 md:mt-32">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-body sm:text-3xl md:text-4xl mb-8">
              Core Expertise
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {focus.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-4 md:p-5 transition-colors duration-200 hover:bg-white/[0.07]">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
                    <f.icon size={18} />
                  </div>
                  <div className="mb-1 font-display text-sm md:text-base font-semibold text-white">
                    {f.title}
                  </div>
                  <div className="text-xs md:text-sm leading-relaxed text-white/60">
                    {f.text}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ SKILLS ============
export function Skills() {
  const row1 = [
    "Python", "C", "SQL", "R", "Scikit-learn", "Pandas", "NumPy", "NLP", "TF-IDF", "Random Forest",
  ];
  const row2 = [
    "Generative AI", "N8N", "Power BI", "Supabase", "React", "TypeScript", "Tailwind", "GitHub",
    "Jupyter", "Google Colab", "Canva", "Antigravity",
  ];
  const skillsTimeline = [
    { id: 1, title: "Python", date: "Core", content: "Primary language for data, ML pipelines, and automation.", category: "Language", icon: Code2, status: "completed" as const },
    { id: 2, title: "Scikit-learn", date: "ML", content: "Classical ML — Random Forest, SVMs, regression, clustering.", category: "ML", icon: Atom, status: "completed" as const },
    { id: 3, title: "NLP", date: "AI", content: "TF-IDF, transformers, text classification and embeddings.", category: "AI", icon: Brain, status: "completed" as const },
    { id: 4, title: "Pandas", date: "Data", content: "Dataframes, ETL, feature engineering at scale.", category: "Data", icon: Database, status: "completed" as const },
    { id: 5, title: "GenAI", date: "AI", content: "LLMs, RAG, prompt orchestration, agentic workflows.", category: "AI", icon: Sparkles, status: "in-progress" as const },
    { id: 6, title: "N8N", date: "Ops", content: "Low-code automation for AI pipelines and integrations.", category: "Ops", icon: Workflow, status: "in-progress" as const },
    { id: 7, title: "Power BI", date: "BI", content: "Dashboards and storytelling with business data.", category: "BI", icon: BarChart3, status: "completed" as const },
    { id: 8, title: "Supabase", date: "Stack", content: "Postgres, auth, edge functions for full-stack apps.", category: "Stack", icon: Boxes, status: "in-progress" as const },
    { id: 9, title: "React", date: "Web", content: "Component-driven UIs with TypeScript + Tailwind.", category: "Web", icon: Code2, status: "completed" as const },
  ];

  const Ticker = ({ items, reverse }: { items: string[]; reverse?: boolean }) => (
    <div className="relative overflow-hidden py-3">
      <div className={`flex w-max gap-4 ${reverse ? "animate-ticker-reverse" : "animate-ticker"}`}>
        {[...items, ...items, ...items, ...items].map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-4 whitespace-nowrap font-display text-3xl font-bold text-body md:text-5xl"
          >
            {s} <span className="text-white/60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id="skills"
      className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28 md:px-12 md:py-40"
    >
      <SectionBackdrop variant="aurora-violet" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />

      <div className="relative mx-auto max-w-[1300px]">
        <Reveal>
          <SectionLabel num="02" text="Skills" />
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-12 font-display text-3xl font-bold text-body sm:mb-16 sm:text-4xl md:text-6xl">
            A constellation of <span className="text-violet">capabilities</span>.
          </h2>
        </Reveal>

        <div className="mb-16 -mx-5 sm:mb-20 sm:-mx-6 md:-mx-12">
          <Ticker items={row1} />
          <Ticker items={row2} reverse />
        </div>

        {/* Skills grid — static, replaces RadialOrbitalTimeline */}
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10"
            style={{
              background:
                "radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.04), rgba(10,10,20,0.9) 55%)",
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-2.5 px-6 py-8 md:px-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-soft mr-2">
                [ Skills ]
              </span>
              {skillsTimeline.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-body transition-colors duration-200"
                  title={s.content}
                >
                  <s.icon size={11} className="text-white/60" />
                  <span>{s.title}</span>
                  <span className="text-[9px] text-muted-soft">({s.date})</span>
                  {s.status === "in-progress" && (
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ============ SKILLS CHIPS (categorised) ============
export function SkillsChips() {
  const categories: Array<{ title: string; chips: string[]; accent: string }> = [
    { title: "Programming", chips: ["Python", "C", "SQL", "R"], accent: "#ffffff" },
    {
      title: "ML / Data",
      chips: ["Pandas", "NumPy", "Scikit-learn", "NLP", "EDA", "TF-IDF", "Random Forest"],
      accent: "#ffffff",
    },
    {
      title: "AI & Automation",
      chips: ["Generative AI", "N8N", "Antigravity", "Manus", "Emergent", "Workflow Automation"],
      accent: "#ffffff",
    },
    {
      title: "Tools",
      chips: ["Power BI", "Google Colab", "Lovable", "GitHub", "Jupyter Notebook", "Canva"],
      accent: "#ffffff",
    },
    {
      title: "Soft Skills",
      chips: ["Leadership", "Communication", "Collaboration"],
      accent: "#ffffff",
    },
  ];
  return (
    <section
      id="skills-chips"
      className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1300px]">
        <Reveal>
          <h3 className="mb-10 font-display text-2xl font-bold text-body md:text-4xl">
            Stack, <span className="text-violet">categorised</span>.
          </h3>
        </Reveal>
        <div className="space-y-8">
          {categories.map((cat, ci) => (
            <Reveal key={cat.title} delay={ci * 100}>
              <div>
                <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-soft">
                  <span className="mr-3" style={{ color: cat.accent }}>
                    ◆
                  </span>
                  {cat.title}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-body transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-white/40"
                      />
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ EDUCATION ============
export function Education() {
  const items = [
    {
      yr: "2023 – 2027",
      title: "B.E. Information Science & Engineering",
      org: "NMIT, Bengaluru",
      scoreLabel: "CGPA",
      score: 7.95,
      max: 10,
    },
    {
      yr: "2020 – 2022",
      title: "Pre-University (PU)",
      org: "Siddaganga PU College",
      scoreLabel: "Score",
      score: 95,
      max: 100,
    },
    {
      yr: "2020",
      title: "Class X (CBSE)",
      org: "CBSE Board",
      scoreLabel: "Score",
      score: 91.2,
      max: 100,
    },
  ];
  return (
    <section
      id="education"
      className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28 md:px-12 md:py-32"
    >
      <SectionBackdrop variant="aurora-gold" />
      <div className="relative mx-auto max-w-[1100px]">
        <Reveal>
          <SectionLabel num="03" text="Education" />
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-14 font-display text-4xl font-bold text-body md:text-6xl">
            Built on a <span className="text-gold">solid base</span>.
          </h2>
        </Reveal>
        <div className="grid gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 120}>
              <EducationCard {...it} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  yr,
  title,
  org,
  scoreLabel,
  score,
  max,
}: {
  yr: string;
  title: string;
  org: string;
  scoreLabel: string;
  score: number;
  max: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const pct = Math.min(100, (score / max) * 100);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setWidth(pct);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setWidth(pct);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pct]);
  return (
    <div
      ref={ref}
      className="grid items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:grid-cols-[160px_1fr] md:p-8"
    >
      <div className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-center font-mono text-xs uppercase tracking-widest text-white md:text-sm">
        {yr}
      </div>
      <div>
        <h3 className="font-display text-xl font-bold text-body md:text-2xl">{title}</h3>
        <div className="mt-1 text-sm text-white/70">{org}</div>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-soft">
          <span className="font-mono uppercase tracking-widest">{scoreLabel}</span>
          <span className="font-display text-lg font-bold text-white">
            {score}
            {max === 100 ? "%" : ` / ${max}`}
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-white/40"
            style={{
              width: `${width}%`,
              transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ============ BEYOND CODE ============
export function BeyondCode() {
  const items = [
    {
      icon: GraduationCap,
      title: "BooksforHER Volunteer",
      text: "Book Donation Drive at IIM Bangalore and Saanidhya, Mangalore. Helped curate, sort, and distribute educational material to under-served learners.",
    },
    {
      icon: Users,
      title: "Career Guidance Program",
      text: "Conducted an industry-readiness session for ISE department students at NMIT — covering portfolio, projects, and interview prep.",
    },
  ];
  return (
    <section
      id="beyond-code"
      className="relative overflow-hidden px-5 py-20 sm:px-6 sm:py-28 md:px-12 md:py-32"
    >
      <SectionBackdrop variant="aurora-violet" />
      <div className="relative mx-auto max-w-[1200px]">
        <Reveal>
          <SectionLabel num="04" text="Beyond Code" />
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mb-14 font-display text-4xl font-bold text-body md:text-6xl">
            Work that <span className="text-violet">isn&apos;t shipped to prod</span>.
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 120}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-200 hover:-translate-y-1">
                <div className="relative">
                  <div
                    className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white"
                  >
                    <it.icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-body md:text-2xl">
                    {it.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-soft">{it.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
