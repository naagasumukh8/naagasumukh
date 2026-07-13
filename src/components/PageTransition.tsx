import { AnimatePresence, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * Persistent ambient background + lightweight route-change cross-fade.
 * The old diagonal backdrop-filter sheen was removed — it was tanking
 * desktop smoothness on every navigation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });



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
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "opacity, transform, filter", transform: "translateZ(0)" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Sheen wipe removed — full-viewport backdrop-filter blur on every route
          change was a major desktop stutter source. Cross-fade above is enough. */}

    </>
  );
}
