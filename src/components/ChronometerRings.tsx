export const ChronometerRings = () => {
  return (
    <svg
      viewBox="0 0 600 600"
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.22]"
      aria-hidden
    >
      <defs>
        <radialGradient id="rg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(40 62% 56% / 0.35)" />
          <stop offset="60%" stopColor="hsl(40 62% 56% / 0.05)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="290" fill="url(#rg)" />

      <g className="ring-slow" style={{ transformOrigin: "300px 300px" }}>
        <circle cx="300" cy="300" r="260" fill="none" stroke="hsl(40 62% 56% / 0.35)" strokeWidth="0.6" strokeDasharray="1 6" />
        <circle cx="300" cy="300" r="210" fill="none" stroke="hsl(40 62% 56% / 0.25)" strokeWidth="0.6" strokeDasharray="2 10" />
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * Math.PI * 2;
          const long = i % 5 === 0;
          const r1 = 250;
          const r2 = long ? 236 : 244;
          return (
            <line
              key={i}
              x1={300 + Math.cos(angle) * r1}
              y1={300 + Math.sin(angle) * r1}
              x2={300 + Math.cos(angle) * r2}
              y2={300 + Math.sin(angle) * r2}
              stroke="hsl(40 62% 56% / 0.45)"
              strokeWidth={long ? 1.2 : 0.6}
            />
          );
        })}
      </g>

      <g className="ring-slower" style={{ transformOrigin: "300px 300px" }}>
        <circle cx="300" cy="300" r="170" fill="none" stroke="hsl(190 55% 62% / 0.28)" strokeWidth="0.6" />
        <circle cx="300" cy="300" r="120" fill="none" stroke="hsl(190 55% 62% / 0.20)" strokeWidth="0.6" strokeDasharray="4 4" />
      </g>

      <circle cx="300" cy="300" r="3" fill="hsl(40 62% 56%)" />
    </svg>
  );
};
