import { Server, Brain, Cloud, Layers, type LucideIcon } from "lucide-react";

export type UniverseId = "backend" | "ai" | "cloud" | "fullstack";

export interface Universe {
  id: UniverseId;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  particleType: "code" | "neural" | "grid" | "constellation";
  skills: string[];
  highlights: string[];
}

export const universes: Universe[] = [
  {
    id: "backend",
    name: "Backend Universe",
    tagline: "Java · Spring Boot · Microservices",
    description:
      "A reality forged in distributed systems — REST APIs, OData, multi-tenant SaaS architecture and battle-tested microservices.",
    icon: Server,
    particleType: "code",
    skills: [
      "Java 17", "Spring Boot", "REST APIs", "OData v4", "Apache Kafka",
      "Microservices", "OAuth2 / JWT", "Spring Security", "JPA / Hibernate",
      "PostgreSQL", "SAP HANA", "OpenAPI 3.0", "Maven", "JUnit",
    ],
    highlights: [
      "20+ REST endpoints for recommendation lifecycle",
      "Multi-tenant SaaS engine on SAP APM",
      "i18n error framework across 17 languages",
      "OData v4 across 50+ endpoints",
    ],
  },
  {
    id: "ai",
    name: "AI / ML Universe",
    tagline: "Python · FastAPI · LLMs · Agents",
    description:
      "A reality where machines reason — GPT-4o powered verification, autonomous agents, MCP servers and graph-based intelligence.",
    icon: Brain,
    particleType: "neural",
    skills: [
      "Python", "FastAPI", "PydanticAI", "LiteLLM", "GPT-4o",
      "SAP AI Core", "NetworkX", "MCP Protocol", "A2A Protocol",
      "asyncio", "pandas", "Levenshtein", "Soundex", "Joule / SAPDAS",
    ],
    highlights: [
      "99.85% time reduction (45 min → 4 sec) per candidate",
      "98.8% cost savings via 4-tier AI verification",
      "Joule + Business Agent Foundation integration",
      "Custom MCP servers + A2A multi-agent orchestration",
    ],
  },
  {
    id: "cloud",
    name: "Cloud Universe",
    tagline: "SAP BTP · Cloud Foundry · DevOps",
    description:
      "A reality of pipelines and platforms — zero-downtime deployments, async automation and observability across 100+ services.",
    icon: Cloud,
    particleType: "grid",
    skills: [
      "SAP BTP", "Cloud Foundry", "Docker", "Kubernetes",
      "Azure DevOps", "GitHub Actions", "CI/CD", "SonarQube",
      "Cloud Foundry V3 API", "mTLS", "Blue-Green Deploy", "Observability",
    ],
    highlights: [
      "100+ microservices across CF spaces",
      "70% deployment-time reduction via async CLI tools",
      "80% drop in pipeline-monitoring overhead",
      "Zero-downtime blue-green deployments",
    ],
  },
  {
    id: "fullstack",
    name: "Full-Stack Universe",
    tagline: "The Convergence — Everything, Everywhere",
    description:
      "All realities collapse into one. End-to-end product engineer: AI, backend, cloud and frontend woven into shippable systems.",
    icon: Layers,
    particleType: "constellation",
    skills: [
      "Python", "Java", "FastAPI", "Spring Boot", "React",
      "SAP UI5", "Node.js", "Kafka", "SAP HANA", "Docker",
      "GPT-4o", "NetworkX", "OAuth2", "CI/CD", "SAP BTP",
    ],
    highlights: [
      "Architected production systems end-to-end",
      "Shipped features from DB schema to UI",
      "Cross-functional impact across HR, ops, platform",
      "1000+ candidates processed monthly with 95%+ accuracy",
    ],
  },
];

export interface Project {
  title: string;
  blurb: string;
  stack: string[];
  metrics: string[];
  universes: UniverseId[];
}

export const projects: Project[] = [
  {
    title: "AI Candidate Verification Engine",
    blurb:
      "4-tier verification system combining manual rules, AI fuzzy matching, NetworkX graph analysis and job rules — replacing 750 hours/month of manual HR work.",
    stack: ["Python", "FastAPI", "GPT-4o", "SAP AI Core", "NetworkX", "SAP HANA", "asyncio"],
    metrics: ["45 min → 4 sec", "₹325 → ₹3.83 / candidate", "1000+ / month", "0% fatigue errors"],
    universes: ["ai", "fullstack"],
  },
  {
    title: "Joule + Business Agent Foundation",
    blurb:
      "Enterprise AI assistant integration with SAP Joule. Multi-agent orchestration via A2A protocol, custom MCP servers and 40+ YAML capability definitions.",
    stack: ["PydanticAI", "LiteLLM", "MCP", "A2A", "SAPDAS", "ORD"],
    metrics: ["4+ enterprise capabilities", "Streaming + token tracking", "Multi-model agents"],
    universes: ["ai", "fullstack"],
  },
  {
    title: "Multi-Tenant Recommendation Engine",
    blurb:
      "SaaS recommendation platform on SAP Asset Performance Management with 20+ REST endpoints, OData v4 and i18n across 17 languages.",
    stack: ["Java 17", "Spring Boot", "OData v4", "Spring Security", "SAP HANA", "Kafka"],
    metrics: ["50+ tenants", "20+ endpoints", "17 languages", "RBAC + ABAC"],
    universes: ["backend", "fullstack"],
  },
  {
    title: "Job Management Microservice",
    blurb:
      "Distributed job orchestration with Kafka event streaming, custom exception hierarchy and OpenAPI-driven design.",
    stack: ["Spring Boot", "Apache Kafka", "Java 17", "OpenAPI", "JUnit"],
    metrics: ["Event-driven", "Multi-tenant", "Production-grade"],
    universes: ["backend"],
  },
  {
    title: "Cloud Foundry Automation Suite",
    blurb:
      "Async Python CLI tools wrapping CF V3 API for bulk restage, deploy and monitor across 50+ microservices in parallel.",
    stack: ["Python", "asyncio", "aiohttp", "CF V3 API"],
    metrics: ["50+ services", "70% faster deploys", "Built-in retries"],
    universes: ["cloud", "fullstack"],
  },
  {
    title: "Azure DevOps → Teams Notifier",
    blurb:
      "Scheduled Python service on SAP BTP with cert-based auth and Teams webhooks for real-time pipeline status.",
    stack: ["Python", "Azure DevOps API", "MS Teams", "SAP BTP", "CF Job Scheduler"],
    metrics: ["80% less monitoring overhead", "5-min team adoption"],
    universes: ["cloud"],
  },
  {
    title: "Feature Flag Analysis Platform",
    blurb:
      "Full-stack Flask app scanning 100+ repos via GitHub API, generating multi-sheet Excel reports for technical-debt cleanup.",
    stack: ["Python", "Flask", "pandas", "openpyxl", "GitHub API"],
    metrics: ["200+ flags", "100+ repos", "+40% maintainability"],
    universes: ["ai", "cloud", "fullstack"],
  },
  {
    title: "IAS / XSUAA Migration",
    blurb:
      "Led technical analysis migrating XSUAA to SAP Cloud Identity Services with hybrid auth strategy and zero downtime.",
    stack: ["OAuth2 / OIDC", "XSUAA", "IAS", "SAML 2.0"],
    metrics: ["Zero downtime", "L0 + L1 migration paths"],
    universes: ["backend", "cloud"],
  },
];

export const coreStats = [
  { label: "Time Saved", value: "99.85%", sub: "per candidate verification" },
  { label: "Cost Reduced", value: "98.8%", sub: "₹325 → ₹3.83" },
  { label: "Throughput", value: "1000+", sub: "candidates / month" },
  { label: "Microservices", value: "100+", sub: "managed in production" },
];
