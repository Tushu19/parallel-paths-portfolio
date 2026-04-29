import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { coreStats, projects, universes } from "@/data/universes";

interface Props { onBack: () => void }

export const MergeView = ({ onBack }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.7 }}
      className="relative min-h-screen"
    >
      <div className="fixed inset-0 -z-10 star-field animate-star-drift opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-4 py-2 rounded-full glass hover:glow-border transition-all duration-300 mb-12"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-mono uppercase tracking-wider">Return to Hub</span>
        </button>

        <header className="text-center mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-universe-glow mb-4">
            All Realities · Collapsed
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-black mb-6">
            <span className="text-cosmic">The Convergence</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Every universe, every skill, every shipped project — superimposed into a single profile.
          </p>
        </header>

        {/* Core stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {coreStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 text-center hover:glow-border transition-all"
            >
              <div className="font-display text-3xl sm:text-4xl font-black text-cosmic mb-1">{s.value}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-universe-glow">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
            </motion.div>
          ))}
        </section>

        {/* Venn-style universe overlap (SVG for perfect alignment) */}
        <section className="mb-20">
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-universe-glow text-center mb-10">
            Universe Overlap
          </h2>
          <div className="relative w-full max-w-xl mx-auto aspect-square">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                {[
                  { id: "g0", c: "25 95% 58%", g: "35 100% 68%" },
                  { id: "g1", c: "165 90% 50%", g: "175 95% 65%" },
                  { id: "g2", c: "210 100% 60%", g: "195 100% 70%" },
                  { id: "g3", c: "280 90% 65%", g: "290 100% 75%" },
                ].map((d) => (
                  <radialGradient key={d.id} id={d.id} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={`hsl(${d.g} / 0.55)`} />
                    <stop offset="55%" stopColor={`hsl(${d.c} / 0.22)`} />
                    <stop offset="100%" stopColor={`hsl(${d.c} / 0)`} />
                  </radialGradient>
                ))}
              </defs>

              {/* Four overlapping circles arranged around center */}
              {universes.slice(0, 4).map((u, i) => {
                const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
                const offset = 60; // distance from center
                const cx = 200 + offset * Math.cos(angle);
                const cy = 200 + offset * Math.sin(angle);
                const colors = ["25 95% 58%", "165 90% 50%", "210 100% 60%", "280 90% 65%"];
                const glows  = ["35 100% 68%", "175 95% 65%", "195 100% 70%", "290 100% 75%"];
                // label position: pushed outward from center
                const lr = 150;
                const lx = 200 + lr * Math.cos(angle);
                const ly = 200 + lr * Math.sin(angle);
                return (
                  <g key={u.id}>
                    <motion.circle
                      cx={cx} cy={cy} r={110}
                      fill={`url(#g${i})`}
                      stroke={`hsl(${colors[i]} / 0.5)`}
                      strokeWidth={1}
                      style={{ mixBlendMode: "screen" }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                    />
                    <motion.text
                      x={lx} y={ly}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={`hsl(${glows[i]})`}
                      className="font-mono"
                      fontSize="11"
                      letterSpacing="2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      style={{ textTransform: "uppercase", filter: `drop-shadow(0 0 8px hsl(${glows[i]} / 0.6))` }}
                    >
                      {u.id}
                    </motion.text>
                  </g>
                );
              })}

              {/* Center label */}
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                <circle cx="200" cy="200" r="34" fill="hsl(240 30% 5% / 0.85)" stroke="hsl(var(--universe-primary) / 0.5)" />
                <text x="200" y="196" textAnchor="middle" dominantBaseline="middle"
                  fill="hsl(var(--universe-primary-glow))" fontSize="14" fontWeight="900"
                  fontFamily="Orbitron, sans-serif">
                  YOU
                </text>
                <text x="200" y="212" textAnchor="middle" dominantBaseline="middle"
                  fill="hsl(var(--muted-foreground))" fontSize="7" letterSpacing="2"
                  fontFamily="JetBrains Mono, monospace" style={{ textTransform: "uppercase" }}>
                  all four
                </text>
              </motion.g>
            </svg>
          </div>
        </section>

        {/* Project timeline */}
        <section className="mb-20">
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-universe-glow text-center mb-10">
            Complete Project Timeline
          </h2>
          <div className="space-y-3">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="glass rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 hover:glow-border transition-all"
              >
                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest sm:w-20">
                  #{String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold">{p.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1">{p.blurb}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.universes.map((uid) => (
                    <span key={uid} className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-universe/15 text-universe-glow border border-universe/30 uppercase tracking-wider">
                      {uid}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Full stack */}
        <section className="mb-20">
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-universe-glow text-center mb-8">
            Full Technical Stack
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {Array.from(new Set(universes.flatMap((u) => u.skills))).map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-full glass text-xs font-mono hover:glow-border transition-all">
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};
