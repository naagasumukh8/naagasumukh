"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WebGLShader } from "./ui/web-gl-shader";

/**
 * Renders the splash BEFORE mounting the app. The app (Spline robot,
 * neural canvas, etc.) only mounts after the splash exits, so the
 * splash's WebGL never competes with the landing page for GPU — no
 * smoothness hit on the actual site.
 */
export function SplashGate({ children }: { children: ReactNode }) {
  // Server + first client render: assume splash is needed. This avoids a
  // hydration flash. We flip it off in an effect if the user has seen it
  // or prefers reduced motion.
  const [phase, setPhase] = useState<"splash" | "exiting" | "done">("splash");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("splash:v6") === "1";
    if (reduced || seen) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("splash:v6", "1");
    const DURATION = 5200;
    const t = setTimeout(() => setPhase("exiting"), DURATION);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {phase !== "done" && (
        <AnimatePresence onExitComplete={() => setPhase("done")}>
          {phase === "splash" && (
            <motion.div
              key="splash"
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black overflow-hidden"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(12px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0">
                <WebGLShader />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.55)_75%)]" />
              <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
                <motion.h1
                  initial={{ y: 16, opacity: 0, letterSpacing: "0.2em" }}
                  animate={{ y: 0, opacity: 1, letterSpacing: "-0.02em" }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl"
                  style={{
                    textShadow:
                      "0 0 40px rgba(255,255,255,0.45), 0 0 80px rgba(124,110,255,0.35)",
                  }}
                >
                  Naaga Sumukh
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="font-mono text-[11px] uppercase tracking-[0.5em] text-white/80"
                >
                  AI · ML Engineer
                </motion.div>
                <div className="mt-4 h-px w-56 overflow-hidden bg-white/15 md:w-72">
                  <div
                    className="h-full origin-left bg-white"
                    style={{ animation: "splashProgress 5.2s linear forwards" }}
                  />
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/80">
                  Loading
                </div>
                <style>{`@keyframes splashProgress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {/* Only mount the real app AFTER splash is fully gone — this is the
          whole point: no WebGL/Spline/scroll work happens behind the splash. */}
      {phase === "done" && children}
    </>
  );
}
