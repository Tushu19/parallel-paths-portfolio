import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  life: number; // 1 -> 0
  size: number;
}

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100, hasMoved: false });
  const lastEmitRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!mouseRef.current.hasMoved) {
        mouseRef.current.hasMoved = true;
        lastEmitRef.current.x = e.clientX;
        lastEmitRef.current.y = e.clientY;
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let rafId = 0;
    const animate = () => {
      // Emit interpolated particles between last emit and current mouse for smoothness
      if (mouseRef.current.hasMoved) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const lx = lastEmitRef.current.x;
        const ly = lastEmitRef.current.y;
        const dx = mx - lx;
        const dy = my - ly;
        const dist = Math.hypot(dx, dy);
        const spacing = 4; // px between emitted particles
        if (dist > spacing) {
          const steps = Math.min(Math.floor(dist / spacing), 12);
          for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            particlesRef.current.push({
              x: lx + dx * t + (Math.random() - 0.5) * 1.5,
              y: ly + dy * t + (Math.random() - 0.5) * 1.5,
              life: 1,
              size: 3 + Math.random() * 2,
            });
          }
          lastEmitRef.current.x = mx;
          lastEmitRef.current.y = my;
        }
      }

      // Cap total particles
      if (particlesRef.current.length > 120) {
        particlesRef.current.splice(0, particlesRef.current.length - 120);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const decay = 0.045; // smooth fade
      particlesRef.current.forEach((p) => {
        p.life -= decay;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      ctx.globalCompositeOperation = 'lighter';
      for (const p of particlesRef.current) {
        const life = p.life;
        const size = p.size * life;
        const opacity = life;

        // Soft outer teal glow (Ocean Deep accent #5cbdb9)
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 4);
        grad.addColorStop(0, `rgba(92,189,185,${opacity * 0.55})`);
        grad.addColorStop(0.4, `rgba(92,189,185,${opacity * 0.2})`);
        grad.addColorStop(1, 'rgba(92,189,185,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Bright teal core
        ctx.fillStyle = `rgba(92,189,185,${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
};
