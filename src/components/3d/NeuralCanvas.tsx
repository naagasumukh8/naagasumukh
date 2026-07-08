import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fixed full-screen Three.js neural particle canvas.
 * Sits behind all content at z-index -50.
 * Optimized to be extremely lightweight: minimal geometry, basic points material,
 * and no heavy post-processing shaders, ensuring 60fps buttery smooth scroll.
 * Hidden on mobile — CSS gradient fallback is used instead.
 */
export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ───────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // ── Scene + Camera ─────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 200);

    // ── Colour palette (Deep Space Cinematic) ──────────────────────────────
    const palette = [
      new THREE.Color("#ff8a3d"), // orange
      new THREE.Color("#7c6eff"), // violet
      new THREE.Color("#00d4ff"), // cyan
      new THREE.Color("#ffb347"), // gold
      new THREE.Color("#ffffff"), // white ×3 (dominant)
      new THREE.Color("#ffffff"),
      new THREE.Color("#ffffff"),
    ];

    // ── Particle Field (Decreased count for maximum smoothness) ────────────
    const COUNT = 1200;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 550;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 450;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 450;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // ── Synapse Lines (static decorative segments) ─────────────────────────
    const segCount = 40;
    const lPos = new Float32Array(segCount * 2 * 3);
    const lCol = new Float32Array(segCount * 2 * 3);

    for (let i = 0; i < segCount; i++) {
      const ox = (Math.random() - 0.5) * 400;
      const oy = (Math.random() - 0.5) * 350;
      const oz = (Math.random() - 0.5) * 300;
      const len = 10 + Math.random() * 20;
      const dx = (Math.random() - 0.5) * len;
      const dy = (Math.random() - 0.5) * len;
      const dz = (Math.random() - 0.5) * len;

      lPos[i * 6]     = ox;      lPos[i * 6 + 1] = oy;      lPos[i * 6 + 2] = oz;
      lPos[i * 6 + 3] = ox + dx; lPos[i * 6 + 4] = oy + dy; lPos[i * 6 + 5] = oz + dz;

      const c = palette[Math.floor(Math.random() * palette.length)];
      lCol[i * 6]     = c.r; lCol[i * 6 + 1] = c.g; lCol[i * 6 + 2] = c.b;
      lCol[i * 6 + 3] = c.r; lCol[i * 6 + 4] = c.g; lCol[i * 6 + 5] = c.b;
    }

    const lgeo = new THREE.BufferGeometry();
    lgeo.setAttribute("position", new THREE.BufferAttribute(lPos, 3));
    lgeo.setAttribute("color",    new THREE.BufferAttribute(lCol, 3));

    const lmat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lgeo, lmat);
    scene.add(lines);

    // ── Interaction state ──────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let scrollProgress = 0;
    let isCovered = false;

    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      const h = document.documentElement;
      scrollProgress = window.scrollY / Math.max(1, h.scrollHeight - h.clientHeight);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("scroll",    onScroll, { passive: true });

    // ── Intersection Observer to pause rendering when covered by Services ──
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the solid services section covers the entire viewport height,
          // the canvas is invisible. Account for sub-pixels with -2 safety margin.
          isCovered = entry.isIntersecting && entry.intersectionRect.height >= window.innerHeight - 2;
        });
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    const servicesEl = document.getElementById("services");
    if (servicesEl) {
      observer.observe(servicesEl);
    }

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Render loop ────────────────────────────────────────────────────────
    let rafId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      // Skip render and math calculations when canvas is covered or tab is hidden
      if (isCovered || document.hidden) return;

      const elapsed = clock.getElapsedTime();

      // Organic drift
      points.rotation.y = elapsed * 0.015;
      points.rotation.x = elapsed * 0.008;
      lines.rotation.y  = elapsed * 0.01;
      lines.rotation.x  = elapsed * 0.005;

      // Parallax camera tilt (smooth lerped transitions)
      camera.position.x += (mouseX * 10 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 6 - camera.position.y) * 0.03;

      // Scroll zoom
      const targetZ = 200 + scrollProgress * 70;
      camera.position.z += (targetZ - camera.position.z) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("resize",    onResize);
      observer.disconnect();
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      lgeo.dispose();
      lmat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 hidden md:block"
      style={{ zIndex: -50 }}
    />
  );
}
