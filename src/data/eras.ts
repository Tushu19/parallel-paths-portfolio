export interface Era {
  id: string;
  year: string;
  label: string;
  title: string;
  blurb: string;
  bullets: string[];
}

export const eras: Era[] = [
  {
    id: "origin",
    year: "2018 — 2022",
    label: "Origin",
    title: "Foundations",
    blurb:
      "Learned the craft. Built the muscle for systems thinking, algorithms, and shipping code that survives real users.",
    bullets: [
      "B.Tech in Computer Science — deep dive into DS/A, OS, DBMS and distributed systems.",
      "Early production experience across Java, Python and web fundamentals.",
      "First taste of building for scale: internships and side projects across full-stack.",
    ],
  },
  {
    id: "ascent",
    year: "2023",
    label: "Ascent",
    title: "Enter SAP Labs",
    blurb:
      "Joined SAP Labs India as a Software Engineer. Started shipping into enterprise-grade systems used across the SAP cloud.",
    bullets: [
      "Owned multi-tenant recommendation engine on SAP Asset Performance Management.",
      "Built 20+ REST endpoints, OData v4 across 50+ services, i18n for 17 languages.",
      "Battle-tested Spring Boot, Kafka, SAP HANA, OAuth2/JWT in production.",
    ],
  },
  {
    id: "breakthrough",
    year: "2024 — 2025",
    label: "Breakthrough",
    title: "AI at Scale",
    blurb:
      "Shipped a 4-tier AI candidate verification engine that replaced 750 hours/month of manual HR work. 45 min → 4 sec per candidate.",
    bullets: [
      "GPT-4o + NetworkX graph reasoning + fuzzy matching + job rules — end-to-end pipeline.",
      "₹325 → ₹3.83 per candidate. 98.8% cost reduction, 1000+ candidates/month, 0% fatigue errors.",
      "Automated Cloud Foundry across 100+ microservices — 70% faster deploys, blue-green zero-downtime.",
    ],
  },
  {
    id: "present",
    year: "2026 — Now",
    label: "Present",
    title: "Architect + Agents",
    blurb:
      "Building the next layer: Joule + Business Agent Foundation. Multi-agent orchestration via A2A, custom MCP servers, 40+ YAML capabilities.",
    bullets: [
      "PydanticAI + LiteLLM agents wired into SAP's enterprise assistant stack.",
      "Designing hybrid auth (XSUAA → IAS) migration paths with zero downtime.",
      "Cross-functional impact across HR, ops, and platform teams.",
    ],
  },
  {
    id: "horizon",
    year: "Next",
    label: "Horizon",
    title: "What's Next",
    blurb:
      "Looking for a team building ambitious AI-native products — where backend depth meets agentic systems and cloud architecture.",
    bullets: [
      "Interested in: applied AI / agents, distributed systems, developer platforms.",
      "Open to remote, hybrid, or relocation for the right team.",
      "Available for new opportunities — let's talk.",
    ],
  },
];
