import FadeIn from "./FadeIn";

const SERVICES = [
  {
    number: "01",
    title: "AI / ML Engineering",
    description:
      "Developing robust natural language processing (NLP) models, classical machine learning architectures, and modern Generative AI / RAG pipelines that bring intelligence to real products.",
  },
  {
    number: "02",
    title: "Workflow Automation & Ops",
    description:
      "Creating highly efficient, automated background workflows using N8N, Python scripts, and Supabase database triggers, saving hours of manual administration and sync processes.",
  },
  {
    number: "03",
    title: "Full-Stack Development",
    description:
      "Building responsive, high-performance web applications using React, TypeScript, and Tailwind CSS. Clean component systems, reliable API integrations, and secure data layers.",
  },
  {
    number: "04",
    title: "Data & Insights Dashboards",
    description:
      "Analyzing business data with Pandas and NumPy, setting up descriptive visualizations, and presenting interactive Power BI dashboards that drive stakeholder decisions.",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative z-10 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28 text-black"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <FadeIn y={40}>
          <div className="flex flex-col items-center mb-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "#ff8a3d" }}>
              [ 03 — Services ]
            </span>
          </div>
          <h2
            className="text-center font-display font-black uppercase tracking-tight leading-none mb-12 sm:mb-16 md:mb-20 text-[#07121F]"
            style={{ fontSize: "clamp(3rem, 10vw, 120px)" }}
          >
            Services
          </h2>
        </FadeIn>

        {/* Services List */}
        <div className="flex flex-col border-t border-black/15">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.number} delay={i * 0.1} y={30} className="w-full">
              <div className="flex flex-col md:grid md:grid-cols-[1fr_2fr] gap-6 md:gap-10 py-8 md:py-12 border-b border-black/15 group hover:bg-[#07121F]/5 px-4 transition-colors duration-300">
                {/* Number & Title */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-black/50 pt-1">
                    {s.number}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-black">
                    {s.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-sans text-base sm:text-lg leading-relaxed text-black/75 max-w-2xl">
                  {s.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Services;
