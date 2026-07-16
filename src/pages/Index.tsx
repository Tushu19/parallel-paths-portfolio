import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, coreStats, universes } from "@/data/universes";
import { BentoCard } from "@/components/BentoCard";
import { ProjectFilter } from "@/components/ProjectFilter";
import { StatTile } from "@/components/StatTile";
import { SkillGroup } from "@/components/SkillGroup";
import { ContactBlock } from "@/components/ContactBlock";

const EMAIL = "gahlottushar19@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/tush19/";
const GITHUB = "https://github.com/tushu19";

const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Opportunity for Tushar — [Role / Company]"
)}&body=${encodeURIComponent(
  "Hi Tushar,\n\nWe'd like to speak with you about a role at [Company].\n\nRole: \nLocation: \nAbout the team: \n\nAre you open to a short call this week?\n\n— [Your name]"
)}`;

type DomainKey = "all" | "ai" | "backend" | "cloud" | "fullstack";

const experience = [
  {
    role: "Software Engineer",
    org: "SAP Labs India",
    period: "2023 — Present",
    place: "Bangalore",
    points: [
      "Built a 4-tier AI candidate verification engine cutting 750 hrs/month of manual HR work — 45 min → 4 sec per candidate.",
      "Architected a multi-tenant SaaS recommendation engine on SAP APM with 20+ REST endpoints and OData v4 across 50+ services.",
      "Integrated Joule + Business Agent Foundation with custom MCP servers and A2A multi-agent orchestration.",
      "Automated Cloud Foundry deployments across 100+ microservices — 70% faster deploys, zero-downtime blue-green.",
    ],
  },
];

const Index = () => {
  const [filter, setFilter] = useState<DomainKey>("all");

  useEffect(() => {
    document.title = "Tushar Gahlot — Software Engineer";
    const desc = "Tushar Gahlot — Software Engineer at SAP Labs. AI, backend, cloud and full-stack systems. Bangalore.";
    let m = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, []);

  const visibleProjects =
    filter === "all" ? projects : projects.filter((p) => p.universes.includes(filter));

  const skillGroups = [
    { label: "Backend", skills: universes.find((u) => u.id === "backend")?.skills.slice(0, 6) ?? [] },
    { label: "AI / ML", skills: universes.find((u) => u.id === "ai")?.skills.slice(0, 6) ?? [] },
    { label: "Cloud", skills: universes.find((u) => u.id === "cloud")?.skills.slice(0, 6) ?? [] },
    { label: "Full-Stack", skills: universes.find((u) => u.id === "fullstack")?.skills.slice(0, 6) ?? [] },
  ];

  return (
    <main className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[hsl(var(--background)/0.75)] border-b border-[hsl(var(--tile-border))]">
        <div className="container-bento flex items-center justify-between h-16">
          <a href="#top" className="font-sora text-lg font-bold tracking-tight">
            Tushar<span className="text-[hsl(var(--primary))]">.</span>
          </a>
          <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-[hsl(var(--muted-foreground))]">
            <a href="#work" className="link-underline">Work</a>
            <a href="#skills" className="link-underline">Skills</a>
            <a href="#experience" className="link-underline">Experience</a>
            <a href="#contact" className="link-underline">Contact</a>
          </nav>
          <a
            href={MAILTO}
            className="text-xs font-bold px-4 py-2 rounded-full border border-[hsl(var(--primary)/0.4)] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all"
          >
            Get in touch
          </a>
        </div>
      </header>

      <div id="top" className="container-bento py-8 sm:py-12">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-min">
          {/* 01 Hero */}
          <BentoCard className="md:col-span-8 flex flex-col justify-between min-h-[320px]" number="01" delay={0}>
            <div className="flex justify-between items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[hsl(var(--primary)/0.10)] border border-[hsl(var(--primary)/0.25)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--primary))] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[hsl(var(--primary))]" />
                </span>
                <span className="text-[hsl(var(--primary))] text-[10px] font-bold uppercase tracking-wider">Available for new opportunities</span>
              </div>
            </div>
            <div className="mt-8">
              <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[hsl(var(--foreground))]">
                Tushar Gahlot
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-[hsl(var(--muted-foreground))] max-w-lg leading-relaxed">
                Software Engineer at SAP Labs, Bangalore — building production-grade systems across AI, backend, and cloud.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5" /> Bangalore, IN
                </span>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
                <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
                <a href={MAILTO} className="link-underline inline-flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
              </div>
            </div>
          </BentoCard>

          {/* 02 Impact */}
          <BentoCard className="md:col-span-4" number="02" delay={0.1}>
            <div className="h-full flex flex-col">
              <h2 className="text-sm font-bold text-[hsl(var(--foreground))] mb-4">Impact in numbers</h2>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {coreStats.map((s) => (
                  <StatTile key={s.label} value={s.value} label={s.label} sub={s.sub} />
                ))}
              </div>
            </div>
          </BentoCard>

          {/* 03 Skills */}
          <BentoCard id="skills" className="md:col-span-4" number="03" delay={0.2}>
            <h2 className="text-sm font-bold text-[hsl(var(--foreground))] mb-6">Core skills</h2>
            <div className="space-y-5">
              {skillGroups.map((g) => (
                <SkillGroup key={g.label} label={g.label} skills={g.skills} />
              ))}
            </div>
          </BentoCard>

          {/* 04 Selected Work */}
          <BentoCard id="work" className="md:col-span-8" number="04" delay={0.25}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-sm font-bold text-[hsl(var(--foreground))]">Selected work</h2>
              <ProjectFilter filter={filter} onChange={setFilter} />
            </div>
            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((p) => (
                  <motion.article
                    key={p.title}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative rounded-2xl border border-[hsl(var(--tile-border))] bg-[hsl(var(--background)/0.50)] p-4 transition-colors hover:border-[hsl(var(--primary)/0.25)] hover:bg-[hsl(var(--tile))]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-sora text-lg font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
                          <span>{p.title}</span>
                          <ArrowUpRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] transition-all group-hover:text-[hsl(var(--primary))] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </h3>
                        <p className="mt-1.5 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                          {p.blurb}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] text-[hsl(var(--muted-foreground))]">
                          {p.stack.map((s) => (
                            <span key={s} className="text-[hsl(var(--primary))]">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 sm:text-right shrink-0">
                        {p.metrics.map((m) => (
                          <span key={m} className="text-xs font-mono text-[hsl(var(--foreground))]">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </BentoCard>

          {/* 05 Experience */}
          <BentoCard id="experience" className="md:col-span-7" number="05" delay={0.3}>
            <h2 className="text-sm font-bold text-[hsl(var(--foreground))] mb-6">Career path</h2>
            <div className="space-y-8">
              {experience.map((e) => (
                <div key={e.role} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-4">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[hsl(var(--primary))]">{e.period}</p>
                    <h3 className="font-sora text-xl font-bold text-[hsl(var(--foreground))] mt-1">{e.org}</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{e.place}</p>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="text-base font-semibold text-[hsl(var(--foreground))] mb-3">{e.role}</p>
                    <ul className="space-y-2.5 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                      {e.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <span className="text-[hsl(var(--primary))] mt-1.5 shrink-0">—</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* 06 Contact */}
          <BentoCard id="contact" className="md:col-span-5" number="06" delay={0.35}>
            <ContactBlock />
          </BentoCard>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--tile-border))] mt-8">
        <div className="container-bento py-8 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--muted-foreground))]">
            © {new Date().getFullYear()} Tushar Gahlot · Bangalore
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--muted-foreground))]">
            Designed &amp; built from scratch
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
