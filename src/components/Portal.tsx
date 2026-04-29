import { motion } from "framer-motion";
import type { Universe } from "@/data/universes";

interface Props {
  universe: Universe;
  onEnter: (id: Universe["id"]) => void;
  index: number;
}

/* Glowing portal disc — themed per universe via inline CSS vars */
export const Portal = ({ universe, onEnter, index }: Props) => {
  const Icon = universe.icon;
  // Per-portal palette (matches index.css universe themes)
  const palettes: Record<Universe["id"], { p: string; g: string; s: string }> = {
    backend:   { p: "25 95% 58%",  g: "35 100% 68%",  s: "0 85% 60%"   },
    ai:        { p: "165 90% 50%", g: "175 95% 65%",  s: "200 100% 60%"},
    cloud:     { p: "210 100% 60%",g: "195 100% 70%", s: "260 90% 65%" },
    fullstack: { p: "280 90% 65%", g: "290 100% 75%", s: "330 90% 60%" },
  };
  const c = palettes[universe.id];
  const style = {
    "--universe-primary": c.p,
    "--universe-primary-glow": c.g,
    "--universe-secondary": c.s,
  } as React.CSSProperties;

  return (
    <motion.button
      onClick={() => onEnter(universe.id)}
      style={style}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      whileHover={{ scale: 1.06, y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-center gap-5 p-6 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-universe"
      aria-label={`Enter ${universe.name}`}
    >
      {/* Portal disc */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full animate-portal-spin"
          style={{
            background: `conic-gradient(from 0deg,
              hsl(${c.p}) 0deg,
              hsl(${c.g}) 90deg,
              hsl(${c.s}) 180deg,
              hsl(${c.p}) 270deg,
              hsl(${c.g}) 360deg)`,
            mask: "radial-gradient(circle, transparent 58%, #000 60%, #000 78%, transparent 80%)",
            WebkitMask: "radial-gradient(circle, transparent 58%, #000 60%, #000 78%, transparent 80%)",
          }}
        />
        {/* Glow core */}
        <div className="absolute inset-4 rounded-full portal-ring animate-portal-pulse" />
        {/* Inner content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-32 h-32 rounded-full glass-strong">
          <Icon className="w-10 h-10 mb-1" style={{ color: `hsl(${c.g})` }} strokeWidth={1.5} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {universe.id}
          </span>
        </div>

        {/* Hover preview */}
        <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 glass rounded-xl px-4 py-3 w-64 z-20">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
            Skills preview
          </p>
          <div className="flex flex-wrap gap-1">
            {universe.skills.slice(0, 5).map((s) => (
              <span key={s} className="text-[10px] px-2 py-0.5 rounded-full"
                style={{ background: `hsl(${c.p} / 0.15)`, color: `hsl(${c.g})`, border: `1px solid hsl(${c.p} / 0.3)` }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-display text-lg sm:text-xl font-bold tracking-wide" style={{ color: `hsl(${c.g})` }}>
          {universe.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 font-mono">{universe.tagline}</p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-strong text-[10px] font-mono uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity duration-200">
          <span className="w-1.5 h-1.5 rounded-full bg-universe-glow animate-pulse" />
          Click to Explore
        </div>
      </div>
    </motion.button>
  );
};
