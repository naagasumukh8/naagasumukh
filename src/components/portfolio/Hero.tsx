import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Play, Pause, Volume2, VolumeX, ArrowDown } from "lucide-react";
import { SplitWord } from "./PortfolioUtils";
import styles from "./Hero.module.css";
import harshTalkingAsset from "@/assets/harsh-talking.mp4.asset.json";

// ============ SIMPLE ROLE CYCLER (CSS-only, clean morphing) ============
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

// ============ MAIN HERO ============
export function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  // GSAP element references
  const taglineRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLSpanElement>(null);
  const row2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const mediaRightRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fallback trigger if the video is slow to load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Sync play/pause changes
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Sync mute changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // GSAP animations when video signals it is ready
  useEffect(() => {
    if (!isVideoReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Fade-in tagline
      tl.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      // Name lines slide up
      tl.to([row1Ref.current, row2Ref.current], {
        y: 0,
        duration: 1.0,
        stagger: 0.1,
        ease: "power4.out",
      }, "-=0.35");

      // Subtitle reveal
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.5");

      // Role cycler reveal
      tl.to(rolesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.45");

      // Buttons row reveal
      tl.to(ctaRowRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.4");

      // Right Column (Video frame) fade-in & slide-up
      tl.to(mediaRightRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.5");

      // Scroll indicator reveal
      tl.to(scrollRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.2");
    });

    return () => ctx.revert();
  }, [isVideoReady]);

  const handleVideoCanPlay = () => {
    setIsVideoReady(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className={styles.heroContainer}>
      <div className={styles.ambientWash} />

      <div className={styles.gridContainer}>
        {/* Left column: Text Content */}
        <div className={styles.contentLeft}>
          {/* Tagline */}
          <div ref={taglineRef} className={styles.tagline}>
            AI/ML Engineer & Intelligent Systems Architect
          </div>

          {/* Stacked Name */}
          <h1 className={styles.nameWrapper}>
            <span className={styles.nameRow}>
              <span ref={row1Ref} className={styles.nameSpan}>
                Naaga Sumukh
              </span>
            </span>
            <span className={styles.nameRow}>
              <span ref={row2Ref} className={`${styles.nameSpan} ${styles.nameGradient}`}>
                B S
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className={styles.subtitle}>
            Student at NMIT Bengaluru (2023–2027) building secure, data-driven systems.
            Top 0.095% global LinkedIn rank. Specialized in Machine Learning, NLP, and workflow automation.
          </p>

          {/* Dynamic Role Cycler */}
          <div
            ref={rolesRef}
            className="h-10 flex items-center opacity-0 translate-y-3 mb-6"
          >
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-[#ff8a3d]">
              <RoleCycler
                roles={["Artificial Intelligence", "Machine Learning", "Workflow Automation", "Leadership"]}
              />
            </span>
          </div>

          {/* Call to Actions (Standard premium buttons like Apple/Google) */}
          <div ref={ctaRowRef} className={styles.ctaRow}>
            <a
              href="/resume.pdf"
              download="Naaga_Sumukh_BS_Resume.pdf"
              className="glass-pill text-xs font-semibold px-6 py-3"
            >
              Download Resume <span className="ml-1">↓</span>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-pill text-xs font-semibold px-6 py-3"
            >
              View Resume <span className="ml-1">↗</span>
            </a>
          </div>
        </div>

        {/* Right column: Floating media showcase */}
        <div ref={mediaRightRef} className={styles.mediaRight}>
          <div className={styles.videoFrame}>
            <div className={styles.mediaGlow} />
            <video
              ref={videoRef}
              src={harshTalkingAsset.url}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onCanPlayThrough={handleVideoCanPlay}
              className={`${styles.videoElement} ${isVideoReady ? styles.videoReady : ""}`}
            />
            {/* Integrated, clean glass controllers */}
            <div className={styles.controlsOverlay}>
              <button
                onClick={toggleMute}
                className={styles.glassButton}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={togglePlay}
                className={styles.glassButton}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div
        ref={scrollRef}
        onClick={scrollToAbout}
        className={`${styles.scrollIndicator} opacity-0`}
      >
        <span className={styles.scrollText}>Explore Work</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollPulse} />
        </div>
      </div>
    </section>
  );
}
export default Hero;
