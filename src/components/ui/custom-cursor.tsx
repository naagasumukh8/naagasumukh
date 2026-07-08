import { useEffect, useRef } from "react";

/**
 * Glowing custom cursor — dot + trailing ring.
 * Desktop only. Hides native cursor via CSS.
 */
export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let rx = 0, ry = 0;
    let mx = -200, my = -200;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const loop = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      rafId = requestAnimationFrame(loop);
    };

    const onEnterLink = () => {
      dot.style.transform  += " scale(2.5)";
      ring.style.width  = "56px";
      ring.style.height = "56px";
      ring.style.opacity = "0.4";
    };

    const onLeaveLink = () => {
      ring.style.width  = "38px";
      ring.style.height = "38px";
      ring.style.opacity = "0.25";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    loop();

    const links = document.querySelectorAll("a, button, [role='button'], [data-hover]");
    links.forEach(el => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      links.forEach(el => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-[9999] hidden md:block"
        style={{
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#ff8a3d",
          boxShadow: "0 0 10px 3px rgba(255,138,61,0.8)",
          transition: "transform 0.06s ease-out",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 z-[9998] hidden md:block"
        style={{
          top: 0,
          left: 0,
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: "1px solid rgba(255,138,61,0.5)",
          opacity: 0.25,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
          willChange: "transform",
        }}
      />
    </>
  );
}
