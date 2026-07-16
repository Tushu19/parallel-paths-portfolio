import { useState } from "react";
import { Mail, Phone, Linkedin, Github, Copy, Check, ArrowUpRight } from "lucide-react";

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
  <div className="flex items-center justify-between gap-4 border-b border-[hsl(var(--tile-border))] pb-3">
    <div className="min-w-0">
      <p className="eyebrow mb-1.5 flex items-center gap-2">{icon}{label}</p>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="link-underline block truncate text-sm text-[hsl(var(--foreground))]"
      >
        {value}
      </a>
    </div>
    {onCopy && (
      <button
        onClick={onCopy}
        aria-label={`Copy ${label}`}
        className="shrink-0 text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
      >
        {copied ? <Check className="h-4 w-4 text-[hsl(var(--primary))]" /> : <Copy className="h-4 w-4" />}
      </button>
    )}
  </div>
);

export const ContactBlock = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (val: string, key: string) => {
    try {
      await navigator.clipboard.writeText(val);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch { /* noop */ }
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h3 className="font-sora text-2xl font-bold text-[hsl(var(--foreground))] sm:text-3xl">
          Start a conversation
        </h3>
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
          One-click email — subject and body pre-filled. No forms.
        </p>
      </div>

      <a
        href={MAILTO}
        className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[hsl(var(--primary))] px-6 py-4 text-sm font-bold text-[hsl(var(--primary-foreground))] transition-all hover:-translate-y-0.5 hover:bg-[hsl(var(--primary-glow))] active:scale-[0.98]"
      >
        <Mail className="h-4 w-4" />
        Email Tushar
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ContactRow
          icon={<Mail className="h-3.5 w-3.5" />}
          label="Email"
          value={EMAIL}
          href={`mailto:${EMAIL}`}
          onCopy={() => copy(EMAIL, "email")}
          copied={copied === "email"}
        />
        <ContactRow
          icon={<Phone className="h-3.5 w-3.5" />}
          label="Phone"
          value={PHONE}
          href={`tel:${PHONE_HREF}`}
          onCopy={() => copy(PHONE_HREF, "phone")}
          copied={copied === "phone"}
        />
        <ContactRow
          icon={<Linkedin className="h-3.5 w-3.5" />}
          label="LinkedIn"
          value="in/tush19"
          href={LINKEDIN}
          external
        />
        <ContactRow
          icon={<Github className="h-3.5 w-3.5" />}
          label="GitHub"
          value="tushu19"
          href={GITHUB}
          external
        />
      </div>
    </div>
  );
};
