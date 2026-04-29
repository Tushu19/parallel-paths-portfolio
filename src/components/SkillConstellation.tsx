import { motion } from "framer-motion";
import { useMemo, useState } from "react";

interface Props { skills: string[] }

interface Node { x: number; y: number; r: number; label: string }

// Deterministic pseudo-random based on seed for stable layout per universe
const seeded = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const layoutNodes = (skills: string[]): Node[] => {
  const rand = seeded(skills.join("").length * 7 + skills.length);
  const W = 800;
  const H = 480;
  const pad = 60;
  const nodes: Node[] = [];
  const minDist = 95;
  for (const label of skills) {
    let x = 0, y = 0, ok = false;
    for (let attempt = 0; attempt < 80 && !ok; attempt++) {
      x = pad + rand() * (W - pad * 2);
      y = pad + rand() * (H - pad * 2);
      ok = nodes.every((n) => Math.hypot(n.x - x, n.y - y) > minDist);
    }
    nodes.push({ x, y, r: 3 + rand() * 2.5, label });
  }
  return nodes;
};

// connect each node to its 2 nearest neighbors
const buildEdges = (nodes: Node[]) => {
  const edges: Array<[number, number]> = [];
  const seen = new Set<string>();
  nodes.forEach((n, i) => {
    const dists = nodes
      .map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const { j } of dists) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) { seen.add(key); edges.push([i, j]); }
    }
  });
  return edges;
};

export const SkillConstellation = ({ skills }: Props) => {
  const nodes = useMemo(() => layoutNodes(skills), [skills]);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);
  const [hover, setHover] = useState<number | null>(null);

  const W = 800;
  const H = 480;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl glass scanlines">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
        {/* Faint grid */}
        <defs>
          <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--universe-primary-glow))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--universe-primary-glow))" stopOpacity="0" />
          </radialGradient>
          <filter id="star-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Edges (constellation lines) */}
        {edges.map(([a, b], i) => {
          const na = nodes[a]; const nb = nodes[b];
          const active = hover === a || hover === b;
          return (
            <motion.line
              key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="hsl(var(--universe-primary))"
              strokeOpacity={active ? 0.9 : 0.22}
              strokeWidth={active ? 1.2 : 0.6}
              strokeDasharray="2 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.02, duration: 0.8 }}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const active = hover === i;
          return (
            <motion.g
              key={n.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 180 }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Glow halo */}
              <circle
                cx={n.x} cy={n.y} r={n.r * 4}
                fill="url(#star-glow)"
                filter="url(#star-blur)"
                opacity={active ? 0.9 : 0.45}
              >
                <animate
                  attributeName="opacity"
                  values={`${active ? 0.7 : 0.3};${active ? 1 : 0.55};${active ? 0.7 : 0.3}`}
                  dur={`${2.5 + (i % 4) * 0.7}s`}
                  repeatCount="indefinite"
                />
              </circle>
              {/* Star core */}
              <circle
                cx={n.x} cy={n.y} r={active ? n.r + 1.2 : n.r}
                fill="hsl(var(--universe-primary-glow))"
                stroke="hsl(0 0% 100% / 0.9)"
                strokeWidth={0.5}
              />
              {/* 4-point cross sparkle */}
              <g stroke="hsl(var(--universe-primary-glow))" strokeWidth="0.7" opacity={active ? 1 : 0.5}>
                <line x1={n.x - n.r * 2.5} y1={n.y} x2={n.x + n.r * 2.5} y2={n.y} />
                <line x1={n.x} y1={n.y - n.r * 2.5} x2={n.x} y2={n.y + n.r * 2.5} />
              </g>
              {/* Label */}
              <text
                x={n.x}
                y={n.y - n.r * 3.5}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize={active ? 11 : 9}
                fill={active ? "hsl(var(--universe-primary-glow))" : "hsl(var(--foreground) / 0.85)"}
                style={{
                  filter: active
                    ? "drop-shadow(0 0 6px hsl(var(--universe-primary-glow) / 0.9))"
                    : "drop-shadow(0 0 3px hsl(0 0% 0% / 0.8))",
                  pointerEvents: "none",
                  transition: "all 0.2s",
                }}
              >
                {n.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};
