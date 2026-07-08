"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// ============ SYNTHESIZED TECH BOOT SOUND (ASUS ROG/THX style) ============
function playBootSound() {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();

  const triggerSynth = (audioCtx: AudioContext) => {
    // 1. Create a master gain node with volume envelope
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, audioCtx.currentTime);
    // Smooth ramp up
    masterGain.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 0.35);
    // Smooth ramp down
    masterGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.3);
    masterGain.connect(audioCtx.destination);

    // 2. Detuned sci-fi chord notes (a warm, powerful major/suspended chord: C2, C3, G3, C4, D4, G4)
    const frequencies = [65.41, 130.81, 196.00, 261.63, 293.66, 392.00];

    frequencies.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();
      
      // Mix waveform shapes: warm triangles and buzzy sawtooths
      osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      // ASUS ROG-style pitch sweep/bend: rises then settles
      osc.frequency.exponentialRampToValueAtTime(freq * 1.45, audioCtx.currentTime + 0.6);
      osc.frequency.exponentialRampToValueAtTime(freq, audioCtx.currentTime + 2.0);

      // Slightly detune to create a lush, rich chorus effect
      osc.detune.setValueAtTime((Math.random() - 0.5) * 12, audioCtx.currentTime);

      oscGain.gain.setValueAtTime(0.12, audioCtx.currentTime);

      // Biquad filter for a sweeping lowpass frequency envelope
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(60, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1600, audioCtx.currentTime + 0.55);
      filter.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 2.1);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(masterGain);

      osc.start();
      osc.stop(audioCtx.currentTime + 2.4);
    });

    // 3. Synthesize a white noise chime/whoosh at the start
    const bufferSize = audioCtx.sampleRate * 1.5;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(800, audioCtx.currentTime);
    noiseFilter.frequency.exponentialRampToValueAtTime(7000, audioCtx.currentTime + 0.3);
    noiseFilter.frequency.exponentialRampToValueAtTime(1500, audioCtx.currentTime + 1.1);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0, audioCtx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.08);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.1);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);
    
    noise.start();
  };

  // If AudioContext is suspended, wait for user interaction to resume
  if (ctx.state === "suspended") {
    const resumeAndPlay = () => {
      ctx.resume().then(() => {
        if (ctx.state === "running") {
          triggerSynth(ctx);
        }
      });
      window.removeEventListener("click", resumeAndPlay);
      window.removeEventListener("touchstart", resumeAndPlay);
    };
    window.addEventListener("click", resumeAndPlay);
    window.addEventListener("touchstart", resumeAndPlay);
  } else {
    triggerSynth(ctx);
  }
}

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

    // Play synthesized boot sound
    playBootSound();

    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: "#000000" }}
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
