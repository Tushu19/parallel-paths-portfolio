import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ParticleField } from "./ParticleField";
import { projects, type Universe } from "@/data/universes";

interface Props {
  universe: Universe;
  onBack: () => void;
}

export const UniverseView = ({ universe, onBack }: Props) => {
  const Icon = universe.icon;
  const relevant = projects.filter((p) => p.universes.includes(universe.id));
  const others = projects.filter((p) => !p.universes.includes(universe.id));

  return (
    <motion.div
      key={universe.id}
      initial={{ opacity: 0, scale: 0.92, filter: "blur(20px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.08, filter: "blur(20px)" }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
      className="relative min-h-screen"
    >
      {/* Particle background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 star-field animate-star-drift opacity-40" />
        <ParticleField universe={universe.id} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background/80" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 max-w-6xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 px-4 py-2 rounded-full glass hover:glow-border transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-mono uppercase tracking-wider">Return to Hub</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass">
            <span className="w-1.5 h-1.5 rounded-full bg-universe-glow animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Universe · {universe.id}
            </span>
          </div>
        </div>

        {/* Hero */}
        <motion.section
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl glass-strong mb-6 animate-glow-pulse">
            <Icon className="w-10 h-10 text-universe-glow" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black mb-4">
            <span className="text-cosmic">{universe.name}</span>
          </h1>
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-universe-glow mb-6">
            {universe.tagline}
          </p>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            {universe.description}
          </p>
        </motion.section>

        {/* Highlights */}
        <section className="mb-20">
          <SectionTitle>Universe Highlights</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-4">
            {universe.highlights.map((h, i) => (
              <motion.div
                key={h}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="glass rounded-xl p-5 flex items-start gap-3 hover:glow-border transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 text-universe-glow shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base">{h}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills constellation */}
        <section className="mb-20">
          <SectionTitle>Skill Constellation</SectionTitle>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {universe.skills.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.04, type: "spring", stiffness: 200 }}
                className="px-4 py-2 rounded-full glass text-sm font-mono hover:scale-110 hover:glow-border transition-all duration-300 cursor-default"
                style={{ animation: `float-slow ${4 + (i % 3)}s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Relevant Projects */}
        <section className="mb-20">
          <SectionTitle>Native Projects</SectionTitle>
          <div className="grid md:grid-cols-2 gap-5">
            {relevant.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} highlighted />
            ))}
          </div>
        </section>

        {/* Other Projects (dimmed) */}
        {others.length > 0 && (
          <section className="mb-20">
            <SectionTitle subtle>From Other Realities</SectionTitle>
            <div className="grid md:grid-cols-2 gap-5 opacity-50 hover:opacity-100 transition-opacity duration-500">
              {others.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </motion.div>
  );
};

const SectionTitle = ({ children, subtle }: { children: React.ReactNode; subtle?: boolean }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-universe/40" />
    <h2 className={`font-display text-sm uppercase tracking-[0.3em] ${subtle ? "text-muted-foreground" : "text-universe-glow"}`}>
      {children}
    </h2>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-universe/40" />
  </div>
);

const ProjectCard = ({ project, index, highlighted }: { project: typeof projects[number]; index: number; highlighted?: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 + index * 0.08 }}
    className={`relative overflow-hidden rounded-2xl p-6 glass scanlines ${highlighted ? "glow-border" : ""} hover:-translate-y-1 transition-all duration-300`}
  >
    <h3 className="font-display text-lg font-bold mb-2 text-foreground">{project.title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.blurb}</p>
    <div className="flex flex-wrap gap-1.5 mb-4">
      {project.stack.map((s) => (
        <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-universe/10 text-universe-glow border border-universe/25">
          {s}
        </span>
      ))}
    </div>
    <div className="flex flex-wrap gap-3 text-[11px] font-mono text-muted-foreground">
      {project.metrics.map((m) => (
        <span key={m} className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-universe-glow" /> {m}
        </span>
      ))}
    </div>
  </motion.article>
);
