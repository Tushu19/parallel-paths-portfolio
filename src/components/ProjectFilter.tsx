import { cn } from "@/lib/utils";

type DomainKey = "all" | "ai" | "backend" | "cloud" | "fullstack";

interface ProjectFilterProps {
  filter: DomainKey;
  onChange: (key: DomainKey) => void;
}

const domains = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / ML" },
  { key: "backend", label: "Backend" },
  { key: "cloud", label: "Cloud" },
  { key: "fullstack", label: "Full-Stack" },
] as const;

export const ProjectFilter = ({ filter, onChange }: ProjectFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {domains.map((d) => (
        <button
          key={d.key}
          onClick={() => onChange(d.key)}
          className={cn(
            "rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-all duration-200",
            filter === d.key
              ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
              : "border border-[hsl(var(--tile-border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary)/0.35)] hover:text-[hsl(var(--foreground))]"
          )}
        >
          {d.label}
        </button>
      ))}
    </div>
  );
};
