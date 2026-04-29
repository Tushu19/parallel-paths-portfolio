import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/* Quantum Music — synthesised tone via WebAudio so we don't ship audio files.
   Per-universe frequency profile is set by data-universe on <html>. */
export const MusicToggle = () => {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; osc2: OscillatorNode; gain: GainNode; filter: BiquadFilterNode } | null>(null);

  const profileFor = (u: string | null) => {
    switch (u) {
      case "backend":   return { f1: 110, f2: 165, type: "sawtooth" as const, cutoff: 600 };
      case "ai":        return { f1: 196, f2: 261.6, type: "sine" as const, cutoff: 1200 };
      case "cloud":     return { f1: 146.8, f2: 220, type: "triangle" as const, cutoff: 900 };
      case "fullstack": return { f1: 130.8, f2: 196, type: "sine" as const, cutoff: 1000 };
      default:          return { f1: 130.8, f2: 196, type: "sine" as const, cutoff: 1000 };
    }
  };

  const applyProfile = () => {
    if (!nodesRef.current || !ctxRef.current) return;
    const u = document.documentElement.getAttribute("data-universe");
    const p = profileFor(u);
    const t = ctxRef.current.currentTime;
    nodesRef.current.osc.frequency.linearRampToValueAtTime(p.f1, t + 1.2);
    nodesRef.current.osc2.frequency.linearRampToValueAtTime(p.f2, t + 1.2);
    nodesRef.current.osc.type = p.type;
    nodesRef.current.osc2.type = p.type;
    nodesRef.current.filter.frequency.linearRampToValueAtTime(p.cutoff, t + 1.2);
  };

  // Watch for universe attribute change
  useEffect(() => {
    const obs = new MutationObserver(applyProfile);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-universe"] });
    return () => obs.disconnect();
  }, []);

  const toggle = async () => {
    if (on) {
      // Fade out + stop
      if (nodesRef.current && ctxRef.current) {
        const t = ctxRef.current.currentTime;
        nodesRef.current.gain.gain.cancelScheduledValues(t);
        nodesRef.current.gain.gain.setValueAtTime(nodesRef.current.gain.gain.value, t);
        nodesRef.current.gain.gain.linearRampToValueAtTime(0, t + 0.4);
        const nodes = nodesRef.current;
        setTimeout(() => { nodes.osc.stop(); nodes.osc2.stop(); }, 500);
        nodesRef.current = null;
      }
      setOn(false);
      return;
    }
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = ctxRef.current ?? new Ctx();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();
    const p = profileFor(document.documentElement.getAttribute("data-universe"));
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = p.cutoff;
    filter.Q.value = 4;
    osc.type = p.type; osc2.type = p.type;
    osc.frequency.value = p.f1; osc2.frequency.value = p.f2;
    gain.gain.value = 0;
    osc.connect(filter); osc2.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc2.start();
    const t = ctx.currentTime;
    gain.gain.linearRampToValueAtTime(0.06, t + 1.2);
    nodesRef.current = { osc, osc2, gain, filter };
    setOn(true);
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute quantum music" : "Play quantum music"}
      aria-pressed={on}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:glow-border transition-all duration-300 group"
    >
      {on ? (
        <Volume2 className="w-5 h-5 text-universe-glow animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-universe-glow transition-colors" />
      )}
      <span className="sr-only">{on ? "Mute" : "Unmute"} quantum soundtrack</span>
    </button>
  );
};
