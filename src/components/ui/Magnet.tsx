import React, { useRef, useState, useEffect } from "react";

interface MagnetProps {
  children: React.ReactNode;
  strength?: number;
  padding?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export function Magnet({
  children,
  strength = 3,
  padding = 150,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: "translate3d(0px, 0px, 0px)",
    transition: inactiveTransition,
    willChange: "transform",
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - elX, e.clientY - elY);

      // Check if mouse is within active padding distance from center
      const maxDistance = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < maxDistance) {
        const deltaX = (e.clientX - elX) / strength;
        const deltaY = (e.clientY - elY) / strength;
        setStyle({
          transform: `translate3d(${deltaX}px, ${deltaY}px, 0px)`,
          transition: activeTransition,
          willChange: "transform",
        });
      } else {
        setStyle({
          transform: "translate3d(0px, 0px, 0px)",
          transition: inactiveTransition,
          willChange: "transform",
        });
      }
    };

    const handleMouseLeave = () => {
      setStyle({
        transform: "translate3d(0px, 0px, 0px)",
        transition: inactiveTransition,
        willChange: "transform",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, padding, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
