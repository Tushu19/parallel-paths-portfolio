import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  number?: string;
  delay?: number;
  glow?: boolean;
  id?: string;
}

export const BentoCard = ({
  children,
  className,
  number,
  delay = 0,
  glow = true,
  id,
}: BentoCardProps) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[hsl(var(--tile-border))] bg-[hsl(var(--tile))] p-6 sm:p-8",
        "transition-all duration-300 ease-out",
        "hover:border-[hsl(var(--primary)/0.35)] hover:shadow-[0_0_40px_-12px_hsl(var(--primary-glow)/0.25)]",
        glow && "shadow-[0_0_0_1px_hsl(var(--tile-border))]",
        className
      )}
    >
      {glow && (
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-[hsl(var(--primary)/0.06)] blur-3xl" />
      )}
      {number && (
        <span className="absolute right-6 top-6 flex h-6 w-6 items-center justify-center rounded border border-[hsl(var(--primary)/0.35)] text-[10px] font-semibold text-[hsl(var(--primary))]">
          {number}
        </span>
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
