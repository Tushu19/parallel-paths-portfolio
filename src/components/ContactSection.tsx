import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Send, Copy, Check } from "lucide-react";
import { useState } from "react";

const EMAIL = "gahlottushar19@gmail.com";
const PHONE_DISPLAY = "+91 79764 66525";
const PHONE_RAW = "+917976466525";
const LINKEDIN = "https://www.linkedin.com/in/tush19/";
const GITHUB = "https://github.com/tushu19";

const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Opportunity for Tushar — [Role / Company]"
)}&body=${encodeURIComponent(
  `Hi Tushar,\n\nI came across your Multi-Verse Portfolio and would love to connect about an opportunity.\n\nRole: \nCompany: \nLocation / Remote: \nA bit about the role: \n\nWhen are you available for a quick call?\n\nThanks,\n`
)}`;

export const ContactSection = () => {
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  const copy = async (kind: "email" | "phone", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1600);
    } catch {/* no-op */}
  };

  const links = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      sub: "in/tush19",
      href: LINKEDIN,
      external: true,
    },
    {
      icon: Github,
      label: "GitHub",
      sub: "@tushu19",
      href: GITHUB,
      external: true,
    },
    {
      icon: Phone,
      label: "Phone",
      sub: PHONE_DISPLAY,
      href: `tel:${PHONE_RAW}`,
      external: false,
    },
    {
      icon: Mail,
      label: "Email",
      sub: EMAIL,
      href: MAILTO,
      external: false,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="container mx-auto px-4 sm:px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto"
      >
        {/* Glow halo */}
        <div
          className="absolute -inset-6 rounded-3xl blur-3xl opacity-40 -z-10"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, hsl(var(--universe-primary-glow) / 0.5), transparent 60%), radial-gradient(circle at 70% 70%, hsl(280 90% 55% / 0.35), transparent 60%)",
          }}
        />

        <div className="glass-strong glow-border rounded-3xl p-6 sm:p-10">
          <div className="text-center mb-8">
            <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-universe-glow mb-3">
              Open Channel · Subspace Frequency
            </p>
            <h2
              id="contact-heading"
              className="font-display text-3xl sm:text-5xl font-black mb-3"
            >
              <span className="text-foreground">Get in </span>
              <span className="text-cosmic">Touch</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
              One click. No forms. Hit the button and your mail client opens with
              a prefilled draft — just tell me about the role.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex justify-center mb-10">
            <motion.a
              href={MAILTO}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-3 px-7 sm:px-9 py-4 rounded-full glass-strong glow-border animate-glow-pulse"
            >
              <Send className="w-5 h-5 text-universe-glow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-display font-bold text-sm sm:text-base uppercase tracking-[0.2em] text-cosmic">
                Email Tushar Now
              </span>
            </motion.a>
          </div>

          {/* Channel grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {links.map(({ icon: Icon, label, sub, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center gap-4 p-4 rounded-2xl glass hover:glow-border transition-all"
                >
                  <span className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-universe/10 border border-universe/30 text-universe-glow group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="block font-medium text-sm sm:text-base text-foreground truncate">
                      {sub}
                    </span>
                  </span>
                  {(label === "Email" || label === "Phone") && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        copy(
                          label === "Email" ? "email" : "phone",
                          label === "Email" ? EMAIL : PHONE_DISPLAY
                        );
                      }}
                      aria-label={`Copy ${label.toLowerCase()}`}
                      className="shrink-0 p-2 rounded-lg glass hover:glow-border transition-all"
                    >
                      {(copied === "email" && label === "Email") ||
                      (copied === "phone" && label === "Phone") ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  )}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Avg response · under 24h · Bangalore (IST)
          </p>
        </div>
      </motion.div>
    </section>
  );
};
