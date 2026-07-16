import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";
import type { Universe } from "@/data/universes";

interface Props {
  universe: Universe;
  onEnter: (id: Universe["id"]) => void;
  index: number;
}

/* Boarding-pass style universe card */
export const Portal = ({ universe, onEnter, index }: Props) => {
  const Icon = universe.icon;
  const palettes: Record<Universe["id"], { p: string; g: string; s: string; code: string }> = {
    backend:   { p: "25 95% 58%",  g: "35 100% 68%",  s: "0 85% 60%",    code: "BKN" },
    ai:        { p: "165 90% 50%", g: "175 95% 65%",  s: "200 100% 60%", code: "AI/" },
    cloud:     { p: "210 100% 60%",g: "195 100% 70%", s: "260 90% 65%",  code: "CLD" },
    fullstack: { p: "280 90% 65%", g: "290 100% 75%", s: "330 90% 60%",  code: "FSK" },
  };
  const c = palettes[universe.id];
  const style = {
    "--universe-primary": c.p,
    "--universe-primary-glow": c.g,
    "--universe-secondary": c.s,
  } as React.CSSProperties;

  const seat = String(index + 1).padStart(2, "0");

  return (
    <motion.button
      onClick={() => onEnter(universe.id)}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.985 }}
      className="group relative text-left w-full focus:outline-none"
      aria-label={`Enter ${universe.name}`}
    >
      {/* Glow halo on hover */}
      <div
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10"
        style={{ background: `radial-gradient(circle, hsl(${c.p} / 0.45), transparent 70%)` }}
      />

      <div
        className="relative overflow-hidden rounded-2xl glass-strong border transition-all duration-300 group-hover:border-[hsl(var(--universe-primary)/0.7)]"
        style={{ borderColor: `hsl(${c.p} / 0.35)` }}
      >
        {/* Perforation strip (ticket stub) */}
        <div
          className="absolute top-0 bottom-0 right-[86px] w-px opacity-40 hidden sm:block"
          style={{
            backgroundImage: `repeating-linear-gradient(to bottom, hsl(${c.g}) 0 4px, transparent 4px 10px)`,
          }}
        />
        {/* Notches */}
        <div className="absolute right-[80px] -top-2 w-4 h-4 rounded-full bg-background hidden sm:block" />
        <div className="absolute right-[80px] -bottom-2 w-4 h-4 rounded-full bg-background hidden sm:block" />

        {/* Header bar */}
        <div
          className="flex items-center justify-between px-5 py-2.5 border-b"
          style={{
            borderColor: `hsl(${c.p} / 0.25)`,
            background: `linear-gradient(90deg, hsl(${c.p} / 0.18), transparent 70%)`,
          }}
        >
          <div className="flex items-center gap-2">
            <Plane className="w-3.5 h-3.5" style={{ color: `hsl(${c.g})` }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Boarding Pass · Universe {seat}
            </span>
          </div>
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
            style={{ color: `hsl(${c.g})`, background: `hsl(${c.p} / 0.15)` }}
          >
            {c.code}
          </span>
        </div>

        {/* Main body */}
        <div className="flex">
          <div className="flex-1 p-5 sm:pr-8">
            {/* Icon + route */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="relative shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, hsl(${c.p} / 0.25), hsl(${c.s} / 0.15))`,
                  border: `1px solid hsl(${c.p} / 0.4)`,
                }}
              >
                <Icon className="w-7 h-7" style={{ color: `hsl(${c.g})` }} strokeWidth={1.75} />
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-opacity"
                  style={{ background: `hsl(${c.p} / 0.5)` }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                  <span>HUB</span>
                  <span className="flex-1 border-t border-dashed opacity-40" style={{ borderColor: `hsl(${c.g})` }} />
                  <span style={{ color: `hsl(${c.g})` }}>{c.code}</span>
                </div>
                <h3
                  className="font-display text-lg sm:text-xl font-black leading-tight truncate"
                  style={{ color: `hsl(${c.g})` }}
                >
                  {universe.name}
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground font-mono mt-0.5 truncate">
                  {universe.tagline}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
                Cargo · Top Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {universe.skills.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                    style={{
                      background: `hsl(${c.p} / 0.12)`,
                      color: `hsl(${c.g})`,
                      border: `1px solid hsl(${c.p} / 0.3)`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg transition-all group-hover:translate-x-0.5"
              style={{
                background: `linear-gradient(90deg, hsl(${c.p} / 0.22), hsl(${c.s} / 0.15))`,
                border: `1px solid hsl(${c.p} / 0.45)`,
              }}
            >
              <span
                className="font-display font-bold text-sm uppercase tracking-[0.15em]"
                style={{ color: `hsl(${c.g})` }}
              >
                Enter Universe
              </span>
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                style={{ color: `hsl(${c.g})` }}
              />
            </div>
          </div>

          {/* Stub */}
          <div
            className="hidden sm:flex flex-col items-center justify-between w-[86px] p-4 shrink-0"
            style={{ background: `hsl(${c.p} / 0.08)` }}
          >
            <div className="text-center">
              <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground mb-1">
                Gate
              </p>
              <p className="font-display font-black text-2xl leading-none" style={{ color: `hsl(${c.g})` }}>
                {seat}
              </p>
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center animate-portal-spin"
              style={{
                background: `conic-gradient(from 0deg, hsl(${c.p}), hsl(${c.g}), hsl(${c.s}), hsl(${c.p}))`,
                mask: "radial-gradient(circle, transparent 45%, #000 48%)",
                WebkitMask: "radial-gradient(circle, transparent 45%, #000 48%)",
              }}
            />
            <div className="text-center">
              <p className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground mb-0.5">
                Seat
              </p>
              <p className="font-mono text-xs font-bold" style={{ color: `hsl(${c.g})` }}>
                {seat}A
              </p>
            </div>
          </div>
        </div>

        {/* Shimmer on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(115deg, transparent 40%, hsl(${c.g} / 0.08) 50%, transparent 60%)`,
          }}
        />
      </div>
    </motion.button>
  );
};
