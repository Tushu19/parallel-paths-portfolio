import { useEffect, useState } from "react";

const fmt = (d: Date) => {
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return { date: `${y}.${mo}.${da}`, time: `${h}:${mi}:${s}` };
};

export const ChronoHeader = ({ mailto }: { mailto: string }) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const { date, time } = fmt(now);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[hsl(var(--background)/0.72)] border-b border-[hsl(var(--hairline))]">
      <div className="container-chrono flex items-center justify-between h-12">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] tick" />
          <span className="hidden sm:inline">CHRONO-LOG</span>
          <span className="text-[hsl(var(--foreground))]">{date}</span>
          <span className="text-[hsl(var(--primary))]">·</span>
          <span className="text-[hsl(var(--foreground))]">{time}</span>
          <span className="hidden md:inline text-[hsl(var(--muted-foreground))]">IST</span>
        </div>
        <a
          href={mailto}
          className="font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 border border-[hsl(var(--primary)/0.4)] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors"
        >
          Transmit →
        </a>
      </div>
    </header>
  );
};
