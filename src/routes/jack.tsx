import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Magnet } from "../components/ui/Magnet";
import { AnimatedText } from "../components/ui/AnimatedText";
import { FadeIn } from "../components/ui/FadeIn";

export const Route = createFileRoute("/jack")({
  head: () => ({
    meta: [
      { title: "Jack -- 3D Creator" },
      {
        name: "description",
        content: "Jack's 3D Creator Portfolio Landing Page.",
      },
    ],
  }),
  component: JackPortfolio,
});

// ContactButton Component
function ContactButton({ className = "" }: { className?: string }) {
  return (
    <button
      className={`rounded-full uppercase tracking-widest font-medium text-white transition-all active:scale-95 duration-200 cursor-pointer ${className}`}
      style={{
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
        outline: "2px solid white",
        outlineOffset: "-3px",
      }}
    >
      Contact Me
    </button>
  );
}

// LiveProjectButton Component
function LiveProjectButton({ className = "" }: { className?: string }) {
  return (
    <button
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-colors hover:bg-[#D7E2EA]/10 cursor-pointer ${className}`}
    >
      Live Project
    </button>
  );
}

const marqueeImages = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const row1Images = marqueeImages.slice(0, 11);
const row2Images = marqueeImages.slice(11);

// Stacking project card data
const projectsData = [
  {
    num: "01",
    name: "Nextlevel Studio",
    category: "Client",
    col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
    col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
    col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
  },
  {
    num: "02",
    name: "Aura Brand Identity",
    category: "Personal",
    col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
    col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
    col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
  },
  {
    num: "03",
    name: "Solaris Digital",
    category: "Client",
    col1Img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
    col1Img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
    col2Img: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
  },
];

// Individual Stacking Card Component
function StackingCard({
  project,
  index,
  totalCards,
}: {
  project: typeof projectsData[0];
  index: number;
  totalCards: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky h-[85vh] flex items-center justify-center top-24 md:top-32 w-full"
    >
      <motion.div
        style={{
          scale,
          top: `${index * 28}px`,
        }}
        className="w-full h-full max-w-5xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-2xl relative"
      >
        {/* Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-6">
            <div className="font-black text-[clamp(2.5rem,6vw,8rem)] text-[#D7E2EA] leading-none">
              {project.num}
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D7E2EA]/60">
                {project.category}
              </span>
              <h3 className="font-black uppercase text-xl sm:text-2xl md:text-3xl text-[#D7E2EA] leading-tight">
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton className="px-6 py-2 text-xs sm:text-sm" />
        </div>

        {/* Bottom Row - Two Column Image Grid */}
        <div className="grid grid-cols-[40%_60%] gap-3 sm:gap-4 md:gap-6 w-full flex-1 mt-4 sm:mt-6 overflow-hidden items-stretch">
          {/* Left Column - 2 stacked images */}
          <div className="flex flex-col justify-between gap-3 sm:gap-4 h-full">
            <div className="w-full relative overflow-hidden rounded-[20px] sm:rounded-[35px] md:rounded-[45px] flex-1">
              <img
                src={project.col1Img1}
                alt={`${project.name} preview 1`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover rounded-[20px] sm:rounded-[35px] md:rounded-[45px]"
              />
            </div>
            <div className="w-full relative overflow-hidden rounded-[20px] sm:rounded-[35px] md:rounded-[45px] flex-1">
              <img
                src={project.col1Img2}
                alt={`${project.name} preview 2`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover rounded-[20px] sm:rounded-[35px] md:rounded-[45px]"
              />
            </div>
          </div>

          {/* Right Column - 1 tall image */}
          <div className="w-full h-full relative overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px]">
            <img
              src={project.col2Img}
              alt={`${project.name} full preview`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function JackPortfolio() {
  const [offset, setOffset] = useState(0);
  const marqueeSectionRef = useRef<HTMLDivElement>(null);

  // Passive scroll listener for Marquee calculations
  useEffect(() => {
    const handleScroll = () => {
      const section = marqueeSectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const computedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(computedOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans selection:bg-[#D7E2EA] selection:text-[#0C0C0C] overflow-x-clip relative"
      style={{ fontFamily: "'Kanit', sans-serif" }}
    >
      {/* 1. HERO SECTION */}
      <section className="h-screen flex flex-col justify-between overflow-x-clip relative">
        {/* Navbar */}
        <FadeIn delay={0} y={-20} as="nav" className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 w-full z-20">
          <div className="font-black text-xl md:text-2xl tracking-wider text-[#D7E2EA]">
            JACK
          </div>
          <div className="flex gap-6 sm:gap-10">
            {["About", "Price", "Projects", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-medium uppercase tracking-wider text-xs md:text-sm lg:text-[1.1rem] text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70"
              >
                {link}
              </a>
            ))}
          </div>
        </FadeIn>

        {/* Hero Portrait - Absolutely Centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <FadeIn
            delay={0.6}
            y={30}
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] pointer-events-auto"
          >
            <Magnet
              strength={3}
              padding={150}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
            >
              <img
                src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
                alt="Jack Portrait"
                className="w-full h-auto object-cover select-none pointer-events-none"
              />
            </Magnet>
          </FadeIn>
        </div>

        {/* Hero Heading Container */}
        <div className="flex-1 flex items-center justify-center w-full z-0 px-4 mt-6 sm:mt-4 md:-mt-5">
          <div className="w-full overflow-hidden text-center">
            <FadeIn delay={0.15} y={40} as="h1" className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
              Hi, i&apos;m jack
            </FadeIn>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 w-full z-20">
          <FadeIn delay={0.35} y={20} as="p" className="font-light uppercase tracking-wide leading-snug text-left max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}>
            a 3d creator driven by crafting striking and unforgettable projects
          </FadeIn>
          <FadeIn delay={0.5} y={20}>
            <ContactButton className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base" />
          </FadeIn>
        </div>
      </section>

      {/* 2. MARQUEE SECTION */}
      <section
        ref={marqueeSectionRef}
        className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden relative"
      >
        <div className="flex flex-col gap-3 md:gap-4 w-full">
          {/* Row 1 - Moves Right */}
          <div className="w-full overflow-hidden">
            <div
              className="flex gap-3 md:gap-4 w-max transition-transform duration-75 ease-out"
              style={{
                transform: `translateX(${offset - 200}px)`,
                willChange: "transform",
              }}
            >
              {[...row1Images, ...row1Images, ...row1Images].map((img, i) => (
                <img
                  key={`r1-${i}`}
                  src={img}
                  alt={`Showcase item ${i}`}
                  loading="lazy"
                  className="w-[420px] h-[270px] rounded-2xl object-cover"
                />
              ))}
            </div>
          </div>

          {/* Row 2 - Moves Left */}
          <div className="w-full overflow-hidden">
            <div
              className="flex gap-3 md:gap-4 w-max transition-transform duration-75 ease-out"
              style={{
                transform: `translateX(${-(offset - 200)}px)`,
                willChange: "transform",
              }}
            >
              {[...row2Images, ...row2Images, ...row2Images].map((img, i) => (
                <img
                  key={`r2-${i}`}
                  src={img}
                  alt={`Showcase item ${i}`}
                  loading="lazy"
                  className="w-[420px] h-[270px] rounded-2xl object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="min-h-screen relative flex items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
        {/* Corner 3D Decorative Images */}
        {/* Top Left */}
        <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0">
          <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
              alt="Decorative 3D Moon"
              className="w-[120px] sm:w-[160px] md:w-[210px] h-auto pointer-events-none"
            />
          </FadeIn>
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0">
          <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
              alt="Decorative 3D Ring Object"
              className="w-[100px] sm:w-[140px] md:w-[180px] h-auto pointer-events-none"
            />
          </FadeIn>
        </div>

        {/* Top Right */}
        <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0">
          <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
              alt="Decorative 3D Lego"
              className="w-[120px] sm:w-[160px] md:w-[210px] h-auto pointer-events-none"
            />
          </FadeIn>
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0">
          <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
              alt="Decorative 3D Group Objects"
              className="w-[130px] sm:w-[170px] md:w-[220px] h-auto pointer-events-none"
            />
          </FadeIn>
        </div>

        {/* Main About content block */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40} className="w-full">
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
              About me
            </h2>
          </FadeIn>

          <AnimatedText
            text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] text-center"
            style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" } as any}
          />

          <FadeIn delay={0.3} y={20}>
            <ContactButton className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base" />
          </FadeIn>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section
        id="services"
        className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28 text-[#0C0C0C] leading-none">
            Services
          </h2>

          <div className="w-full flex flex-col border-t border-[rgba(12,12,12,0.15)]">
            {[
              {
                num: "01",
                name: "3D Modeling",
                desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
              },
              {
                num: "02",
                name: "Rendering",
                desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
              },
              {
                num: "03",
                name: "Motion Design",
                desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
              },
              {
                num: "04",
                name: "Branding",
                desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.",
              },
              {
                num: "05",
                name: "Web Design",
                desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
              },
            ].map((service, i) => (
              <FadeIn
                key={service.num}
                delay={i * 0.1}
                y={30}
                className="flex items-center justify-between border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[200px_1fr] items-center gap-6 w-full text-left">
                  {/* Huge Number */}
                  <span className="font-black text-[clamp(3rem,10vw,140px)] text-[#0C0C0C] leading-none select-none">
                    {service.num}
                  </span>

                  {/* Name and description stacked */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium uppercase text-[clamp(1.1rem,2.2vw,2.1rem)] text-[#0C0C0C] leading-none">
                      {service.name}
                    </h3>
                    <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C]/60">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section
        id="projects"
        className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-20 pb-32 px-5 sm:px-8 md:px-10 relative z-15"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <FadeIn delay={0} y={40} className="w-full">
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)] mb-10 sm:mb-16">
              Project
            </h2>
          </FadeIn>

          {/* Sticky Stacking Cards */}
          <div className="w-full flex flex-col gap-10 md:gap-20">
            {projectsData.map((project, idx) => (
              <StackingCard
                key={project.num}
                project={project}
                index={idx}
                totalCards={projectsData.length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Trigger (Footer style contact) */}
      <footer className="w-full bg-[#0C0C0C] border-t border-[#D7E2EA]/10 py-16 flex flex-col items-center justify-center px-6 text-center gap-6">
        <h2 className="font-black text-2xl sm:text-3xl md:text-4xl text-[#D7E2EA]">
          LET&apos;S WORK TOGETHER
        </h2>
        <ContactButton className="px-8 py-3.5 sm:px-12 sm:py-4 text-sm sm:text-base" />
        <p className="text-[#D7E2EA]/40 text-xs sm:text-sm mt-8">
          © {new Date().getFullYear()} JACK. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
