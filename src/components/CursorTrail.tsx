import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  timestamp: number;
  id: number;
}

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const particleIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const lastPos = lastPosRef.current;
      
      // Calculate distance moved
      const dx = clientX - lastPos.x;
      const dy = clientY - lastPos.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only add particles on fast movement (threshold: 5 pixels)
      if (distance > 5) {
        particlesRef.current.push({
          x: clientX,
          y: clientY,
          timestamp: Date.now(),
          id: particleIdRef.current++
        });

        // Keep only last 8 particles
        if (particlesRef.current.length > 8) {
          particlesRef.current.shift();
        }
      }

      lastPosRef.current = { x: clientX, y: clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const now = Date.now();
      const maxAge = 500; // Particles fade out after 500ms

      // Remove old particles
      particlesRef.current = particlesRef.current.filter(
        p => now - p.timestamp < maxAge
      );

      // Draw particles
      particlesRef.current.forEach((particle, index) => {
        const age = now - particle.timestamp;
        const life = 1 - age / maxAge; // 1 to 0

        // Size decreases over time
        const size = 4 * life;
        
        // Opacity fades out
        const opacity = life * 0.8;

        // Create gradient for cosmic effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, size * 3
        );
        
        // Cosmic colors (purple to blue to cyan)
        const hue = 200 + (index * 20) % 80; // Varies between 200-280
        gradient.addColorStop(0, `hsla(${hue}, 90%, 70%, ${opacity})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 80%, 60%, ${opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${hue}, 70%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.fillStyle = `hsla(${hue}, 100%, 90%, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
