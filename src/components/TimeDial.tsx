import { useEffect, useState, useCallback } from "react";

export interface Era {
  id: string;
  year: string;
  label: string;
}

interface Props {
  eras: Era[];
  onJump?: (id: string) => void;
}

export const TimeDial = ({ eras, onJump }: Props) => {
  const [active, setActive] = useState(eras[0]?.id ?? "");
  const [sweep, setSweep] = useState(false);

  // Track which era section is in view
  useEffect(() => {
    const els = eras
      .map((e) => document.getElementById(`era-${e.id}`))
      .filter((n): n is HTMLElement => !!n);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const id = en.target.id.replace("era-", "");
            setActive(id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [eras]);

  const jumpTo = useCallback(
    (id: string) => {
      const el = document.getElementById(`era-${id}`);
      if (!el) return;
      setSweep(false);
      requestAnimationFrame(() => setSweep(true));
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      onJump?.(id);
      setActive(id);
      window.setTimeout(() => setSweep(false), 950);
    },
    [onJump]
  );

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
      const idx = eras.findIndex((x) => x.id === active);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        jumpTo(eras[Math.min(idx + 1, eras.length - 1)].id);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        jumpTo(eras[Math.max(idx - 1, 0)].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, eras, jumpTo]);

  return (
    <>
      {sweep && <div className="scan-sweep" />}

      {/* Desktop: right side vertical dial */}
      <aside className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-4">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))] pr-1">
          Time Dial
        </div>
        <div className="relative flex flex-col gap-5 pr-4 border-r border-[hsl(var(--hairline))]">
          {eras.map((e) => {
            const isActive = e.id === active;
            return (
              <button
                key={e.id}
                onClick={() => jumpTo(e.id)}
                className="group flex items-center gap-3 text-right"
                aria-label={`Jump to ${e.label} (${e.year})`}
              >
                <div className="flex flex-col items-end leading-tight">
                  <span
                    className={`font-mono text-[10px] tracking-[0.22em] uppercase transition-colors ${
                      isActive ? "text-[hsl(var(--primary))]" : "text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--foreground))]"
                    }`}
                  >
                    {e.label}
                  </span>
                  <span
                    className={`font-mono text-[9px] transition-colors ${
                      isActive ? "text-[hsl(var(--foreground))]" : "text-[hsl(var(--muted-foreground))]/70"
                    }`}
                  >
                    {e.year}
                  </span>
                </div>
                <span
                  className={`relative -mr-[7px] h-2.5 w-2.5 rounded-full border transition-all ${
                    isActive
                      ? "bg-[hsl(var(--primary))] border-[hsl(var(--primary))] shadow-[0_0_12px_hsl(var(--primary)/0.7)]"
                      : "bg-[hsl(var(--background))] border-[hsl(var(--muted-foreground)/0.5)] group-hover:border-[hsl(var(--primary))]"
                  }`}
                />
              </button>
            );
          })}
        </div>
        <div className="font-mono text-[9px] text-[hsl(var(--muted-foreground))] pr-1 opacity-70">
          ← → keys
        </div>
      </aside>

      {/* Mobile / tablet: bottom bar */}
      <nav className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-2 py-1.5 rounded-full border border-[hsl(var(--hairline))] bg-[hsl(var(--background)/0.85)] backdrop-blur-md">
        {eras.map((e) => {
          const isActive = e.id === active;
          return (
            <button
              key={e.id}
              onClick={() => jumpTo(e.id)}
              className={`font-mono text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full transition-colors ${
                isActive
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                  : "text-[hsl(var(--muted-foreground))]"
              }`}
            >
              {e.label}
            </button>
          );
        })}
      </nav>
    </>
  );
};
