import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export function AnimatedText({ text, className = "" }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");
  const totalChars = chars.length;

  return (
    <p ref={ref} className={`relative flex flex-wrap justify-center ${className}`}>
      {chars.map((char, index) => {
        // Calculate the relative scroll range for this character
        const startRange = index / totalChars;
        const endRange = Math.min(1, (index + 3) / totalChars); // small overlap for smooth transition

        // Map scroll progress to opacity [0.2, 1] for this specific character
        const opacity = useTransform(scrollYProgress, [startRange, endRange], [0.2, 1]);

        return (
          <span key={index} className="relative inline-block whitespace-pre">
            {/* Invisible placeholder for layout */}
            <span className="opacity-0">{char}</span>
            {/* Absolute positioned animated span */}
            <motion.span style={{ opacity }} className="absolute inset-0 select-none">
              {char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}
