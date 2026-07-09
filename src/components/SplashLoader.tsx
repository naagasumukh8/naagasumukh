"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Lightweight CSS-only splash. No WebGL, no Three.js.
 * 2.5s duration. Shows once per session. Desktop/tablet only.
 */
export function SplashLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("splash:v6") === "1";
    if (isMobile || reduced || seen) return;

    setShow(true);
    sessionStorage.setItem("splash:v6", "1");

    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle radial glow — CSS only, no GPU pressure */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)",
            }}
          />

          {/* Name + progress */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
            <motion.h1
              initial={{ y: 12, opacity: 0, letterSpacing: "0.15em" }}
              animate={{ y: 0, opacity: 1, letterSpacing: "-0.02em" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
            >
              Naaga Sumukh
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="font-mono text-[11px] uppercase tracking-[0.5em] text-white/80"
            >
              AI · ML Engineer
            </motion.div>

            <div className="mt-4 h-px w-56 overflow-hidden bg-white/15 md:w-72">
              <div
                className="h-full origin-left bg-white"
                style={{ animation: "splashProgress 2.5s linear forwards" }}
              />
            </div>
            <style>{`@keyframes splashProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
