import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { universes, projects, type UniverseId } from "@/data/universes";

interface Props { onBack: () => void; onEnter: (id: UniverseId) => void }

/* Recruiter-friendly: all 4 universes in a grid, simultaneously */
export const QuickView = ({ onBack, onEnter }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen"
    >
      <div className="fixed inset-0 -z-10 star-field animate-star-drift opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <button onClick={onBack} className="group flex items-center gap-2 px-4 py-2 rounded-full glass hover:glow-border transition-all">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-mono uppercase tracking-wider">Back to Hub</span>
          </button>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-universe-glow">Recruiter Quick View</span>
        </div>

        <header className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-5xl font-black mb-3 text-cosmic">All Universes at a Glance</h1>
          <p className="text-muted-foreground">Skim every reality at once. Click any panel to dive in.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-5">
          {universes.map((u, i) => {
            const palettes: Record<UniverseId, { p: string; g: string; s: string }> = {
              backend:   { p: "25 95% 58%",  g: "35 100% 68%",  s: "0 85% 60%"   },
              ai:        { p: "165 90% 50%", g: "175 95% 65%",  s: "200 100% 60%"},
              cloud:     { p: "210 100% 60%",g: "195 100% 70%", s: "260 90% 65%" },
              fullstack: { p: "280 90% 65%", g: "290 100% 75%", s: "330 90% 60%" },
            };
            const c = palettes[u.id];
            const Icon = u.icon;
            const top = projects.filter(p => p.universes.includes(u.id)).slice(0, 3);
            return (
              <motion.button
                key={u.id}
                onClick={() => onEnter(u.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  "--universe-primary": c.p,
                  "--universe-primary-glow": c.g,
                  "--universe-secondary": c.s,
                } as React.CSSProperties}
                className="text-left glass rounded-2xl p-6 hover:glow-border hover:-translate-y-1 transition-all duration-300 scanlines relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl glass-strong flex items-center justify-center">
                    <Icon className="w-6 h-6" style={{ color: `hsl(${c.g})` }} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg" style={{ color: `hsl(${c.g})` }}>{u.name}</h2>
                    <p className="text-[11px] font-mono text-muted-foreground">{u.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{u.description}</p>

                <div className="mb-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Top Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {u.skills.slice(0, 8).map(s => (
                      <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{ background: `hsl(${c.p} / 0.12)`, color: `hsl(${c.g})`, border: `1px solid hsl(${c.p} / 0.25)` }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Featured Projects</p>
                  <ul className="space-y-1.5">
                    {top.map(p => (
                      <li key={p.title} className="text-xs flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: `hsl(${c.g})` }} />
                        <span>{p.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
