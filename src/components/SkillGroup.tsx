interface SkillGroupProps {
  label: string;
  skills: string[];
}

export const SkillGroup = ({ label, skills }: SkillGroupProps) => {
  return (
    <div>
      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--primary))]">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-[hsl(var(--foreground))]">
        {skills.join(" · ")}
      </p>
    </div>
  );
};
