import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Persistent ambient background + lightweight route-change cross-fade.
 * Optimized with performant opacity + translateY transitions (no heavy blur filters).
 * Respects prefers-reduced-motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* Persistent ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-50"
        style={{
          background:
            "radial-gradient(1200px 800px at 15% 10%, hsl(var(--primary) / 0.10), transparent 60%), radial-gradient(900px 700px at 85% 90%, hsl(var(--accent, var(--primary)) / 0.08), transparent 60%), hsl(var(--background))",
        }}
      />
      {/* Noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-40 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Page content cross-fade keyed by route */}
      <AnimatePresence mode="wait" initial={false}>
        {prefersReducedMotion ? (
          <div key={pathname}>{children}</div>
        ) : (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "opacity, transform" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
