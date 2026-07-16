import { useEffect, useState } from "react";
import { ArrowUpRight, Copy, Check, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { projects, coreStats, universes } from "@/data/universes";

const EMAIL = "gahlottushar19@gmail.com";
const PHONE = "+91 79764 66525";
const PHONE_HREF = "+917976466525";
const LINKEDIN = "https://www.linkedin.com/in/tush19/";
const GITHUB = "https://github.com/tushu19";

const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Opportunity for Tushar — [Role / Company]"
)}&body=${encodeURIComponent(
  "Hi Tushar,\n\nWe'd like to speak with you about a role at [Company].\n\nRole: \nLocation: \nAbout the team: \n\nAre you open to a short call this week?\n\n— [Your name]"
)}`;

const domains = [
  { key: "all",       label: "All" },
  { key: "ai",        label: "AI / ML" },
  { key: "backend",   label: "Backend" },
  { key: "cloud",     label: "Cloud" },
  { key: "fullstack", label: "Full-Stack" },
] as const;
type DomainKey = typeof domains[number]["key"];

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
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Tushar Gahlot — Software Engineer";
    const desc =
      "Tushar Gahlot — Software Engineer at SAP Labs. AI, backend, cloud and full-stack systems. Bangalore.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.setAttribute("name", "description"); document.head.appendChild(m); }
    m.setAttribute("content", desc);
  }, []);

  const copy = async (val: string, key: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch { /* noop */ }
  };

  const visibleProjects =
    filter === "all" ? projects : projects.filter((p) => p.universes.includes(filter));

  // Merge all skills, dedup, keep order
  const allSkills = Array.from(new Set(universes.flatMap((u) => u.skills)));

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="container-narrow flex items-center justify-between h-14">
          <a href="#top" className="font-serif text-lg tracking-tight">
            Tushar Gahlot<span className="text-primary">.</span>
          </a>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#work" className="link-underline">Work</a>
            <a href="#skills" className="link-underline">Skills</a>
            <a href="#experience" className="link-underline">Experience</a>
            <a href="#contact" className="link-underline">Contact</a>
          </nav>
          <a
            href={MAILTO}
            className="text-xs font-medium px-3.5 py-1.5 border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-sm"
          >
            Get in touch
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="container-narrow pt-24 sm:pt-36 pb-24">
        <p className="eyebrow mb-8 animate-fade-in">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 align-middle animate-pulse" />
          Available for new opportunities
        </p>
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02] tracking-tight animate-fade-up">
          Software engineer building <em className="text-primary not-italic italic-serif">quiet</em>,{" "}
          production-grade systems at the intersection of{" "}
          <em className="italic">AI, backend</em> and <em className="italic">cloud</em>.
        </h1>
        <p
          className="mt-10 max-w-2xl text-lg text-muted-foreground leading-relaxed animate-fade-up"
          style={{ animationDelay: "120ms" }}
        >
          Currently at <span className="text-foreground">SAP Labs, Bangalore</span> — shipping
          GPT-4o verification engines, multi-tenant SaaS on SAP BTP, and the pipelines that keep
          100+ microservices humming.
        </p>

        <div
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground animate-fade-up"
          style={{ animationDelay: "220ms" }}
        >
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" /> Bangalore, IN
          </span>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
          </a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
          <a href={MAILTO} className="link-underline inline-flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" /> Email
          </a>
        </div>
      </section>

      <div className="hair-divider" />

      {/* Impact / stats */}
      <section className="container-narrow py-20">
        <p className="eyebrow mb-10">Impact in numbers</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {coreStats.map((s) => (
            <div key={s.label} className="border-l border-border/70 pl-5">
              <p className="font-serif text-4xl sm:text-5xl text-foreground leading-none">{s.value}</p>
              <p className="mt-3 text-sm text-foreground">{s.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="hair-divider" />

      {/* Featured Work */}
      <section id="work" className="container-narrow py-24">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-6">
          <div>
            <p className="eyebrow mb-3">Selected work</p>
            <h2 className="font-serif text-4xl sm:text-5xl">Things I've shipped.</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {domains.map((d) => (
              <button
                key={d.key}
                onClick={() => setFilter(d.key)}
                className={`text-xs px-3 py-1.5 border rounded-sm transition-colors ${
                  filter === d.key
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border/60 border-y border-border/60">
          {visibleProjects.map((p, i) => (
            <article
              key={p.title}
              className="group grid grid-cols-12 gap-6 py-8 hover:bg-secondary/30 transition-colors px-2 -mx-2"
            >
              <div className="col-span-12 md:col-span-1 font-mono text-xs text-muted-foreground pt-1.5">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="col-span-12 md:col-span-7">
                <h3 className="font-serif text-2xl sm:text-3xl leading-tight flex items-start gap-3">
                  <span>{p.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground shrink-0 mt-2 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed max-w-xl">{p.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
                  {p.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 flex flex-col gap-2 md:items-end md:text-right">
                {p.metrics.map((m) => (
                  <span key={m} className="text-xs text-foreground/80 font-mono">
                    {m}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="hair-divider" />

      {/* Skills */}
      <section id="skills" className="container-narrow py-24">
        <p className="eyebrow mb-3">The toolkit</p>
        <h2 className="font-serif text-4xl sm:text-5xl mb-10">Skills, without the buzzwords.</h2>
        <div className="grid md:grid-cols-4 gap-10">
          {universes.map((u) => (
            <div key={u.id}>
              <h3 className="font-serif text-xl mb-4 text-primary">{u.name.replace(" Universe", "")}</h3>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {u.skills.slice(0, 8).map((s) => (
                  <li key={s} className="hover:text-foreground transition-colors">{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border/60">
          <p className="eyebrow mb-4">Also fluent in</p>
          <p className="font-mono text-xs text-muted-foreground leading-relaxed">
            {allSkills.slice(0, 30).join("  ·  ")}
          </p>
        </div>
      </section>

      <div className="hair-divider" />

      {/* Experience */}
      <section id="experience" className="container-narrow py-24">
        <p className="eyebrow mb-3">Path so far</p>
        <h2 className="font-serif text-4xl sm:text-5xl mb-12">Experience.</h2>
        <div className="space-y-12">
          {experience.map((e) => (
            <div key={e.role} className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-4">
                <p className="font-mono text-xs text-muted-foreground">{e.period}</p>
                <h3 className="font-serif text-2xl mt-2">{e.org}</h3>
                <p className="text-sm text-muted-foreground">{e.place}</p>
              </div>
              <div className="col-span-12 md:col-span-8">
                <p className="text-lg text-foreground mb-4">{e.role}</p>
                <ul className="space-y-2.5 text-muted-foreground leading-relaxed">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="text-primary mt-2 shrink-0">—</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="hair-divider" />

      {/* Contact */}
      <section id="contact" className="container-narrow py-28">
        <p className="eyebrow mb-3">Say hello</p>
        <h2 className="font-serif text-5xl sm:text-7xl leading-[1.02] mb-8">
          Let's build something{" "}
          <em className="text-primary not-italic">worth shipping</em>.
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mb-10">
          The fastest way to reach me is email — one click, subject pre-filled, no forms.
        </p>

        <a
          href={MAILTO}
          className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3.5 rounded-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Email Tushar
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <div className="mt-16 grid sm:grid-cols-2 gap-x-10 gap-y-6 max-w-2xl">
          <ContactRow
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            value={EMAIL}
            href={`mailto:${EMAIL}`}
            onCopy={() => copy(EMAIL, "email")}
            copied={copied === "email"}
          />
          <ContactRow
            icon={<Phone className="w-4 h-4" />}
            label="Phone"
            value={PHONE}
            href={`tel:${PHONE_HREF}`}
            onCopy={() => copy(PHONE_HREF, "phone")}
            copied={copied === "phone"}
          />
          <ContactRow
            icon={<Linkedin className="w-4 h-4" />}
            label="LinkedIn"
            value="in/tush19"
            href={LINKEDIN}
            external
          />
          <ContactRow
            icon={<Github className="w-4 h-4" />}
            label="GitHub"
            value="tushu19"
            href={GITHUB}
            external
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="container-narrow py-10 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            © {new Date().getFullYear()} Tushar Gahlot · Bangalore
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Designed &amp; built from scratch
          </p>
        </div>
      </footer>
    </main>
  );
};

interface RowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  onCopy?: () => void;
  copied?: boolean;
}
const ContactRow = ({ icon, label, value, href, external, onCopy, copied }: RowProps) => (
  <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-3">
    <div className="min-w-0">
      <p className="eyebrow mb-1.5 flex items-center gap-2">{icon}{label}</p>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="link-underline text-sm text-foreground truncate block"
      >
        {value}
      </a>
    </div>
    {onCopy && (
      <button
        onClick={onCopy}
        aria-label={`Copy ${label}`}
        className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
      </button>
    )}
  </div>
);

export default Index;
