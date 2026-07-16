interface StatTileProps {
  value: string;
  label: string;
  sub?: string;
  variant?: "default" | "accent";
}

export const StatTile = ({ value, label, sub, variant = "default" }: StatTileProps) => {
  const isAccent = variant === "accent";
  return (
    <div
      className={`flex flex-col justify-center rounded-3xl p-6 ${
        isAccent
          ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
          : "border border-[hsl(var(--tile-border))] bg-[hsl(var(--tile))]"
      }`}
    >
      <p
        className={`font-sora text-4xl font-extrabold tracking-tight ${
          isAccent ? "text-[hsl(var(--primary-foreground))]" : "text-[hsl(var(--foreground))]"
        }`}
      >
        {value}
      </p>
      <p className={`mt-1 text-xs font-semibold uppercase tracking-wider ${isAccent ? "opacity-80" : "text-[hsl(var(--primary))]"}`}>
        {label}
      </p>
      {sub && (
        <p className={`mt-1 text-[10px] ${isAccent ? "opacity-70" : "text-[hsl(var(--muted-foreground))]"}`}>
          {sub}
        </p>
      )}
    </div>
  );
};
