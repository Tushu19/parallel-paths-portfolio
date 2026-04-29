import { motion } from "framer-motion";
import { Grid3x3, Sparkles } from "lucide-react";
import { Portal } from "./Portal";
import { universes } from "@/data/universes";
import type { UniverseId } from "@/data/universes";

interface Props {
  onEnter: (id: UniverseId) => void;
  onMerge: () => void;
  onQuickView: () => void;
}

export const PortalHub = ({ onEnter, onMerge, onQuickView }: Props) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Cosmic background layers */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 star-field animate-star-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background/80" />
        {/* Drifting nebula blobs */}
        <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full opacity-30 blur-3xl animate-drift"
          style={{ background: "radial-gradient(circle, hsl(280 90% 50% / 0.5), transparent 70%)" }} />
        <div className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full opacity-25 blur-3xl animate-drift"
          style={{ background: "radial-gradient(circle, hsl(200 95% 55% / 0.45), transparent 70%)", animationDelay: "4s" }} />
        <div className="absolute -bottom-40 left-1/4 w-[32rem] h-[32rem] rounded-full opacity-25 blur-3xl animate-drift"
          style={{ background: "radial-gradient(circle, hsl(165 90% 50% / 0.4), transparent 70%)", animationDelay: "8s" }} />
      </div>

      {/* Top nav */}
      <header className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-universe-glow animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Multi-Verse Portfolio · v1.0
          </span>
        </div>
        <button
          onClick={onQuickView}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full glass hover:glow-border transition-all text-xs font-mono uppercase tracking-wider"
        >
          <Grid3x3 className="w-3.5 h-3.5" /> Recruiter Quick View
        </button>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-universe-glow mb-5">
            Choose your reality
          </p>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black mb-6 leading-[0.95]">
            <span className="text-cosmic">Four Universes.</span><br />
            <span className="text-foreground">One Engineer.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            Every portal opens a different version of me — Backend, AI, Cloud, Full-Stack.
            Same achievements, distilled through the lens of each reality.
          </p>
        </motion.div>
      </section>

      {/* Portals */}
      <section className="container mx-auto px-4 sm:px-6 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 max-w-6xl mx-auto">
          {universes.map((u, i) => (
            <Portal key={u.id} universe={u} onEnter={onEnter} index={i} />
          ))}
        </div>
      </section>

      {/* Merge CTA */}
      <section className="container mx-auto px-4 sm:px-6 py-16 text-center">
        <motion.button
          onClick={onMerge}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass-strong glow-border animate-glow-pulse"
        >
          <Sparkles className="w-5 h-5 text-universe-glow" />
          <span className="font-display font-bold text-sm sm:text-base uppercase tracking-[0.2em] text-cosmic">
            Merge All Universes
          </span>
        </motion.button>
        <p className="text-xs text-muted-foreground mt-4 font-mono">
          Collapse the multiverse into one comprehensive view
        </p>

        <button
          onClick={onQuickView}
          className="sm:hidden mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-mono uppercase tracking-wider"
        >
          <Grid3x3 className="w-3.5 h-3.5" /> Recruiter Quick View
        </button>
      </section>

      <footer className="container mx-auto px-4 sm:px-6 py-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          SAP Labs · Software Engineer · Bangalore
        </p>
      </footer>
    </div>
  );
};
