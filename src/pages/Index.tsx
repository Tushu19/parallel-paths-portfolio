import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Copy, Check, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { projects, coreStats, universes, type UniverseId } from "@/data/universes";
import { eras } from "@/data/eras";
import { ChronoHeader } from "@/components/ChronoHeader";
import { TimeDial } from "@/components/TimeDial";
import { ChronometerRings } from "@/components/ChronometerRings";

const EMAIL = "gahlottushar19@gmail.com";
const PHONE = "+91-7976466525";
const LINKEDIN = "https://www.linkedin.com/in/tush19/";
const GITHUB = "https://github.com/tushu19";

const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Opportunity for Tushar — [Role / Company]"
)}&body=${encodeURIComponent(
  "Hi Tushar,\n\nWe'd like to speak with you about a role at [Company].\n\nRole: \nLocation: \nAbout the team: \n\nAre you open to a short call this week?\n\n— [Your name]"
)}`;

type Filter = "all" | UniverseId;

const filterLabels: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / ML" },
  { id: "backend", label: "Backend" },
  { id: "cloud", label: "Cloud" },
  { id: "fullstack", label: "Full-Stack" },
];

// Wrapper that fades in on scroll with a soft "temporal blur"
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const SectionHeader = ({ eyebrow, title, kicker }: { eyebrow: string; title: string; kicker?: string }) => (
  <div className="mb-8">
    <p className="eyebrow-mono">{eyebrow}</p>
    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[hsl(var(--foreground))] mt-2 leading-[1.05] text-balance">
      {title}
    </h2>
    {kicker && (
      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[hsl(var(--muted-foreground))]">
        {kicker}
      </p>
    )}
  </div>
);

const CopyRow = ({ label, value, href, icon: Icon }: { label: string; value: string; href: string; icon: React.ElementType }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-[hsl(var(--hairline))] last:border-b-0">
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-3 min-w-0 flex-1"
      >
        <Icon className="h-4 w-4 text-[hsl(var(--primary))] shrink-0" />
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">{label}</p>
          <p className="text-sm text-[hsl(var(--foreground))] truncate group-hover:text-[hsl(var(--primary))] transition-colors">
            {value}
          </p>
        </div>
      </a>
      <button
        onClick={() => {
          navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        }}
        className="shrink-0 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1 border border-[hsl(var(--hairline))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] text-[hsl(var(--muted-foreground))] transition-colors"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
};

const Index = () => {
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    document.title = "Tushar Gahlot — Chrono-Log of a Software Engineer";
  }, []);

  const visibleProjects = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.universes.includes(filter))),
    [filter]
  );

  const skillGroups = [
    { label: "Backend", skills: universes.find((u) => u.id === "backend")?.skills ?? [] },
    { label: "AI / ML", skills: universes.find((u) => u.id === "ai")?.skills ?? [] },
    { label: "Cloud", skills: universes.find((u) => u.id === "cloud")?.skills ?? [] },
    { label: "Tools & Platform", skills: ["React", "SAP UI5", "Node.js", "OAuth2 / OIDC", "SAP HANA", "OpenAPI 3.0", "SonarQube", "GitHub Actions"] },
  ];

  return (
    <main className="grain relative min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <ChronoHeader mailto={MAILTO} />
      <TimeDial eras={eras.map((e) => ({ id: e.id, year: e.year, label: e.label }))} />

      {/* ============ HERO — Origin era ============ */}
      <section
        id="era-origin"
        className="relative overflow-hidden pt-16 sm:pt-24 pb-24 sm:pb-32"
      >
        {/* Chronometer backdrop */}
        <div className="absolute left-1/2 top-8 -translate-x-1/2 w-[720px] h-[720px] max-w-[110vw] max-h-[110vw] pointer-events-none">
          <ChronometerRings />
        </div>

        <div className="container-chrono relative">
          <Reveal>
            <p className="eyebrow-mono">Chrono-Log · Entry 01 · Origin</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-4 font-serif text-[42px] sm:text-6xl md:text-7xl lg:text-[88px] leading-[0.98] tracking-tight text-balance text-[hsl(var(--foreground))]">
              Tushar Gahlot,
              <br />
              <span className="italic text-[hsl(var(--primary))]">time-traveler</span> across
              <br />
              backend, AI &amp; cloud.
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-[hsl(var(--muted-foreground))] text-pretty">
              Software Engineer at <span className="text-[hsl(var(--foreground))]">SAP Labs, Bangalore</span>. I ship
              production systems that turn 45-minute manual jobs into 4-second AI pipelines, and orchestrate
              100+ microservices in the cloud. This is my chrono-log.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={MAILTO}
                className="group inline-flex items-center gap-2 px-5 py-3 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-mono text-xs uppercase tracking-[0.22em] hover:bg-[hsl(var(--primary-glow))] transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                Send Transmission
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-[hsl(var(--hairline))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] font-mono text-xs uppercase tracking-[0.22em] transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 border border-[hsl(var(--hairline))] hover:border-[hsl(var(--primary)/0.5)] hover:text-[hsl(var(--primary))] font-mono text-xs uppercase tracking-[0.22em] transition-colors"
              >
                <Github className="h-3.5 w-3.5" /> GitHub
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] text-[hsl(var(--muted-foreground))]">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))] tick" />
                Available for new opportunities
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> Bangalore, IN
              </span>
              <span>· 3+ yrs @ SAP Labs</span>
            </div>
          </Reveal>
        </div>

        {/* Impact strip */}
        <div className="container-chrono relative mt-20 sm:mt-28">
          <Reveal>
            <p className="eyebrow-mono">Coordinates · Impact recorded across the timeline</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 border-t border-b border-[hsl(var(--hairline))] divide-x divide-[hsl(var(--hairline))]">
              {coreStats.map((s) => (
                <div key={s.label} className="p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
                    {s.label}
                  </p>
                  <p className="font-serif text-4xl sm:text-5xl text-[hsl(var(--primary))] mt-2 leading-none">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[11px] text-[hsl(var(--muted-foreground))] leading-snug">{s.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ TIMELINE — Ascent + Breakthrough + Present ============ */}
      <section className="relative py-20 sm:py-28 border-t border-[hsl(var(--hairline))]">
        <div className="container-chrono">
          <Reveal>
            <SectionHeader
              eyebrow="The Timeline · Entries 02 — 04"
              title="Log of significant events."
              kicker="Every worthwhile system has a beginning, a breakthrough, and a next chapter. Here are mine."
            />
          </Reveal>

          <div className="relative mt-8">
            {/* Vertical spine */}
            <div
              aria-hidden
              className="absolute left-[7px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[hsl(var(--primary)/0.5)] via-[hsl(var(--hairline))] to-transparent"
            />

            <div className="space-y-14 sm:space-y-16">
              {eras.slice(1, 4).map((e, i) => (
                <Reveal key={e.id} delay={i * 0.05}>
                  <article id={`era-${e.id}`} className="relative pl-8 sm:pl-12 scroll-mt-24">
                    {/* Node */}
                    <span className="absolute left-0 top-2 flex items-center justify-center">
                      <span className="absolute h-5 w-5 rounded-full bg-[hsl(var(--primary)/0.15)]" />
                      <span className="relative h-3 w-3 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_12px_hsl(var(--primary)/0.7)]" />
                    </span>

                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--primary))]">
                        {e.year}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
                        · {e.label}
                      </p>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[hsl(var(--foreground))] mt-2 leading-tight text-balance">
                      {e.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[hsl(var(--muted-foreground))] text-pretty">
                      {e.blurb}
                    </p>

                    <ul className="mt-5 space-y-2.5 max-w-2xl">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm text-[hsl(var(--foreground))]/85 leading-relaxed">
                          <span className="text-[hsl(var(--primary))] mt-2 shrink-0 h-px w-3 bg-[hsl(var(--primary))]" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ ARTIFACTS ============ */}
      <section id="artifacts" className="relative py-20 sm:py-28 border-t border-[hsl(var(--hairline))]">
        <div className="container-chrono">
          <Reveal>
            <SectionHeader
              eyebrow="Artifacts · Recovered from the timeline"
              title="Selected work."
              kicker="Projects shipped to production. Filter by domain to see the ones most relevant to you."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-8">
              {filterLabels.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-1.5 border transition-colors ${
                    filter === f.id
                      ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--primary))]"
                      : "border-[hsl(var(--hairline))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:border-[hsl(var(--primary)/0.5)]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleProjects.map((p, i) => (
              <Reveal key={p.title} delay={(i % 4) * 0.05}>
                <article className="group h-full relative p-6 border border-[hsl(var(--hairline))] hover:border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--surface))] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-xl sm:text-2xl leading-tight text-[hsl(var(--foreground))] text-balance">
                      {p.title}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </div>

                  <p className="mt-3 text-[13.5px] leading-relaxed text-[hsl(var(--muted-foreground))] text-pretty">
                    {p.blurb}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[hsl(var(--hairline))] flex flex-wrap gap-x-4 gap-y-1">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-[11px] text-[hsl(var(--primary))]"
                      >
                        · {m}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ INSTRUMENTS (skills) ============ */}
      <section id="instruments" className="relative py-20 sm:py-28 border-t border-[hsl(var(--hairline))]">
        <div className="container-chrono">
          <Reveal>
            <SectionHeader
              eyebrow="Instruments · The traveler's kit"
              title="What I build with."
              kicker="Grouped by domain. The tools I reach for most in production."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 mt-4">
            {skillGroups.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.05}>
                <div>
                  <div className="flex items-baseline justify-between border-b border-[hsl(var(--hairline))] pb-3">
                    <h3 className="font-serif text-xl text-[hsl(var(--foreground))]">{g.label}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
                      0{i + 1} / 04
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {g.skills.map((s) => (
                      <span key={s} className="chip chip-amber">{s}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HORIZON — Contact / next chapter ============ */}
      <section
        id="era-horizon"
        className="relative py-20 sm:py-28 border-t border-[hsl(var(--hairline))] scroll-mt-24"
      >
        <div className="container-chrono">
          <Reveal>
            <p className="eyebrow-mono">Chrono-Log · Entry 05 · Horizon</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight text-balance text-[hsl(var(--foreground))]">
              Open a channel to the
              <br />
              <span className="italic text-[hsl(var(--primary))]">next timeline.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[hsl(var(--muted-foreground))] text-pretty">
              {eras[4].blurb} One click below opens your mail client with a pre-filled draft — or grab any
              of the contact details directly.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
              {/* Primary transmit CTA */}
              <div className="lg:col-span-3">
                <a
                  href={MAILTO}
                  className="group relative block p-8 sm:p-10 border border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.06)] hover:bg-[hsl(var(--primary)/0.1)] transition-colors overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow-mono">Primary Channel</p>
                      <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-[hsl(var(--foreground))] leading-tight">
                        Email Tushar now
                      </h3>
                      <p className="mt-3 font-mono text-sm text-[hsl(var(--primary))] break-all">
                        {EMAIL}
                      </p>
                      <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))] max-w-md">
                        Opens your mail app with subject &amp; body pre-filled. Just tweak and hit send.
                      </p>
                    </div>
                    <Send className="h-6 w-6 text-[hsl(var(--primary))] shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </a>
              </div>

              {/* Other channels */}
              <div className="lg:col-span-2 border border-[hsl(var(--hairline))] p-6 sm:p-8 bg-[hsl(var(--surface))]">
                <p className="eyebrow-mono">Other Channels</p>
                <div className="mt-3">
                  <CopyRow label="Email" value={EMAIL} href={`mailto:${EMAIL}`} icon={Mail} />
                  <CopyRow label="Phone" value={PHONE} href={`tel:${PHONE.replace(/[^+\d]/g, "")}`} icon={Phone} />
                  <CopyRow label="LinkedIn" value="linkedin.com/in/tush19" href={LINKEDIN} icon={Linkedin} />
                  <CopyRow label="GitHub" value="github.com/tushu19" href={GITHUB} icon={Github} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-[hsl(var(--hairline))]">
        <div className="container-chrono py-8 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
            © {new Date().getFullYear()} Tushar Gahlot · Chrono-log ends here
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
            Coordinates: Bangalore, IN
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
