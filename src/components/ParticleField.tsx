import { useEffect, useRef } from "react";
import type { UniverseId } from "@/data/universes";

interface Props { universe: UniverseId }

/* Lightweight canvas particle field, theme-aware via CSS vars */
export const ParticleField = ({ universe }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0, h = 0;
    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const getColor = () => {
      const root = getComputedStyle(document.documentElement);
      const primary = root.getPropertyValue("--universe-primary").trim();
      const glow = root.getPropertyValue("--universe-primary-glow").trim();
      return { primary, glow };
    };

    interface P { x: number; y: number; vx: number; vy: number; r: number; }
    const count = universe === "ai" ? 80 : universe === "cloud" ? 60 : 70;
    const particles: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.6,
    }));

    const codeChars = "01{}<>=();/*+-".split("");
    const codeDrops = universe === "backend"
      ? Array.from({ length: 40 }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          s: Math.random() * 1 + 0.5,
          c: codeChars[Math.floor(Math.random() * codeChars.length)],
        }))
      : [];

    const tick = () => {
      const { primary, glow } = getColor();
      ctx.clearRect(0, 0, w, h);

      // Code rain (backend)
      if (universe === "backend") {
        ctx.font = `${12 * devicePixelRatio}px JetBrains Mono`;
        codeDrops.forEach((d) => {
          ctx.fillStyle = `hsl(${primary} / 0.55)`;
          ctx.fillText(d.c, d.x, d.y);
          d.y += d.s * devicePixelRatio;
          if (d.y > h) { d.y = 0; d.x = Math.random() * w; d.c = codeChars[Math.floor(Math.random() * codeChars.length)]; }
        });
      }

      // Particles
      particles.forEach((p) => {
        p.x += p.vx * devicePixelRatio;
        p.y += p.vy * devicePixelRatio;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${glow} / 0.85)`;
        ctx.shadowBlur = 12 * devicePixelRatio;
        ctx.shadowColor = `hsl(${primary})`;
        ctx.fill();
      });

      // Neural connections (AI / fullstack)
      if (universe === "ai" || universe === "fullstack") {
        ctx.shadowBlur = 0;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i], b = particles[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            const max = 140 * devicePixelRatio;
            if (d < max) {
              ctx.strokeStyle = `hsl(${primary} / ${(1 - d / max) * 0.35})`;
              ctx.lineWidth = devicePixelRatio * 0.6;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      // Grid (cloud)
      if (universe === "cloud") {
        ctx.strokeStyle = `hsl(${primary} / 0.12)`;
        ctx.lineWidth = devicePixelRatio;
        const step = 80 * devicePixelRatio;
        for (let x = 0; x < w; x += step) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y < h; y += step) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }
      }

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [universe]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />;
};
