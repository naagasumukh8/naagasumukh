import { useEffect, useState } from "react";

/**
 * Global subtle compositor-based shader backdrop.
 * Replaces heavy WebGL shader loop to keep the GPU 100% free for scrolling kinetics.
 */
export function PaperShaderBackdrop() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 -z-50 bg-[#07121F]" />;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-[#07121F]"
    >
      {/* High-performance static ambient lighting (completely GPU-composited) */}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          background: `radial-gradient(55% 55% at 15% 20%, rgba(124,110,255,0.18) 0%, transparent 100%),
                       radial-gradient(50% 60% at 85% 15%, rgba(92,189,185,0.14) 0%, transparent 100%),
                       radial-gradient(65% 55% at 50% 85%, rgba(244,196,107,0.10) 0%, transparent 100%),
                       radial-gradient(45% 45% at 35% 50%, rgba(255,140,90,0.08) 0%, transparent 100%)`,
        }}
      />
      {/* Soft vignette overlay */}
      <div
        className="absolute inset-0 bg-radial-vignette"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(7,18,31,0.1) 0%, rgba(7,18,31,0.92) 100%)",
        }}
      />
    </div>
  );
}
