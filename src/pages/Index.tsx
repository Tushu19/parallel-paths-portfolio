import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PortalHub } from "@/components/PortalHub";
import { UniverseView } from "@/components/UniverseView";
import { MergeView } from "@/components/MergeView";
import { QuickView } from "@/components/QuickView";
import { MusicToggle } from "@/components/MusicToggle";
import { universes, type UniverseId } from "@/data/universes";

type View =
  | { kind: "hub" }
  | { kind: "universe"; id: UniverseId }
  | { kind: "merge" }
  | { kind: "quick" };

const Index = () => {
  const [view, setView] = useState<View>({ kind: "hub" });
  const [warping, setWarping] = useState(false);

  // Sync universe attribute on <html> for theme + music
  useEffect(() => {
    const root = document.documentElement;
    if (view.kind === "universe") root.setAttribute("data-universe", view.id);
    else root.setAttribute("data-universe", "fullstack");
  }, [view]);

  // SEO meta
  useEffect(() => {
    document.title = "Multi-Verse Portfolio · Software Engineer";
    const desc = "An interactive multi-verse portfolio showcasing Backend, AI/ML, Cloud and Full-Stack engineering work.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
    m.setAttribute("content", desc);
    let c = document.querySelector('link[rel="canonical"]');
    if (!c) { c = document.createElement("link"); c.setAttribute("rel", "canonical"); document.head.appendChild(c); }
    c.setAttribute("href", window.location.origin + "/");
  }, []);

  const warp = (next: View) => {
    setWarping(true);
    setTimeout(() => { setView(next); setWarping(false); window.scrollTo(0, 0); }, 280);
  };

  return (
    <main className="relative">
      <AnimatePresence mode="wait">
        {view.kind === "hub" && (
          <motion.div key="hub" exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <PortalHub
              onEnter={(id) => warp({ kind: "universe", id })}
              onMerge={() => warp({ kind: "merge" })}
              onQuickView={() => warp({ kind: "quick" })}
            />
          </motion.div>
        )}
        {view.kind === "universe" && (
          <UniverseView
            key={`u-${view.id}`}
            universe={universes.find((u) => u.id === view.id)!}
            onBack={() => warp({ kind: "hub" })}
          />
        )}
        {view.kind === "merge" && (
          <MergeView key="merge" onBack={() => warp({ kind: "hub" })} />
        )}
        {view.kind === "quick" && (
          <QuickView key="quick" onBack={() => warp({ kind: "hub" })} onEnter={(id) => warp({ kind: "universe", id })} />
        )}
      </AnimatePresence>

      {/* Warp flash overlay */}
      <AnimatePresence>
        {warping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 pointer-events-none"
            style={{
              background: "radial-gradient(circle at 50% 50%, hsl(var(--universe-primary-glow) / 0.6), hsl(var(--background)) 70%)",
            }}
          />
        )}
      </AnimatePresence>

      <MusicToggle />
    </main>
  );
};

export default Index;
