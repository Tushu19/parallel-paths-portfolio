
# The Time Traveler — Portfolio Plan

A single-page, recruiter-first portfolio framed as a journey through Tushar's career timeline. Content stays scannable in 30 seconds; the "time" theme adds character without hiding information.

## Concept

You are the traveler. The page is a **chrono-log**: past → present → future. A persistent **Time Dial** on the side lets recruiters jump between eras (Origin, Ascent, Present, Horizon). No hidden content, no forced interactions — the dial is a gimmick, not a gate.

## Visual Direction

- **Palette**: Deep midnight navy `#0a0e1a` background, warm parchment `#e8dcc4` text, brass/amber accent `#d4a24c`, faint cyan glow `#6ec5d4` for "active timeline" highlights. Feels like an antique chronometer meets sci-fi HUD.
- **Typography**: `Instrument Serif` for display (elegant, timeless) + `JetBrains Mono` for timestamps/coordinates + `Inter` for body. Serif gives the "traveler's journal" feel; mono gives the "time machine readout" feel.
- **Texture**: Subtle film-grain overlay, faint concentric-circle chronometer rings behind the hero, gold hairline dividers.
- **Motion**: Content fades in with a soft "temporal blur" (blur + opacity) as you scroll. The Time Dial ticks. Section transitions have a brief scanline sweep.

## Layout (single page, top → bottom)

```text
┌────────────────────────────────────────────────┐
│ [Chrono-Log 2026.11]        [◐ Time Dial]     │
│                                                │
│   TUSHAR GAHLOT                                │
│   Traveler across backend, AI, and cloud.      │
│   Currently: SAP Labs · Bangalore              │
│   [ Send transmission → ] [ LinkedIn ] [ GH ]  │
│                                                │
│   ── chronometer rings, avatar orb ──          │
├────────────────────────────────────────────────┤
│ COORDINATES  (impact stats in a row)           │
│  99.85% ↓ time   100+ services   6 patents...  │
├────────────────────────────────────────────────┤
│ THE TIMELINE                                   │
│  ● 2020 — Origin: first commits, foundations   │
│  ● 2022 — Ascent: SAP Labs, scale              │
│  ● 2024 — Breakthrough: AI systems in prod     │
│  ● 2026 — Present: architect + AI              │
│  ○ Horizon — where I'm heading                 │
│  (vertical spine with era cards on alternating │
│   sides; each card = role + 2-3 highlights)    │
├────────────────────────────────────────────────┤
│ ARTIFACTS  (projects, filterable)              │
│  [ All | Backend | AI | Cloud ]                │
│  Card grid — each card: title, era stamp,      │
│  stack chips, one-line impact, metric badge.   │
├────────────────────────────────────────────────┤
│ INSTRUMENTS  (skills grouped by domain)        │
│  Backend · AI/ML · Cloud · Tools               │
│  Compact chip clusters, no clutter.            │
├────────────────────────────────────────────────┤
│ TRANSMISSION  (contact)                        │
│  Big "Open a channel" mailto CTA               │
│  Email · Phone · LinkedIn · GitHub (all copy)  │
└────────────────────────────────────────────────┘
```

## The Gimmick — Time Dial (subtle, optional)

A small fixed dial on the right edge (desktop) / bottom (mobile) with 4 era markers. Clicking smooth-scrolls to that era and briefly "rewinds" the section with a scanline + hue shift. Keyboard `←/→` also cycles. **All content is visible without touching it** — recruiters can just scroll.

Bonus micro-touch: header shows a live "Chrono-Log 2026.11.20 · 14:32 IST" readout that ticks every second.

## Recruiter Guardrails

- Hero states name, role, location, availability, and CTA within the first viewport.
- Impact numbers appear immediately after hero — no scroll hunt.
- Projects are a scannable grid, not a story to unlock.
- Contact is one click (`mailto:` with pre-filled subject/body) — unchanged from current.
- All text uses `text-balance`/`text-pretty` and tested line-lengths so nothing overflows on 1024px, 1280px, 1440px, and mobile.

## Technical Plan

1. **Tokens** — rewrite `src/index.css` palette + fonts (Instrument Serif, JetBrains Mono, Inter). Update `tailwind.config.ts` font families.
2. **New components**
   - `ChronoHeader.tsx` — top bar with live chrono readout.
   - `TimeDial.tsx` — fixed side dial, 4 era markers, click + keyboard nav, active-era highlight based on scroll position (IntersectionObserver).
   - `EraCard.tsx` — timeline entry (year, role, 2-3 bullets, era color accent).
   - `TimelineSpine.tsx` — vertical line + alternating era cards.
   - `ArtifactCard.tsx` — project card with era stamp + metric badge.
   - `InstrumentPanel.tsx` — grouped skill chips.
   - `TransmissionBlock.tsx` — reworked contact section on-theme.
   - `ChronometerRings.tsx` — SVG concentric rings behind hero.
   - `GrainOverlay.tsx` — subtle film-grain layer.
3. **Rewrite** `src/pages/Index.tsx` to compose the sections above.
4. **Cursor trail** — retune to warm amber `#d4a24c` at low opacity to fit theme.
5. **Motion** — framer-motion fade+blur on scroll, dial tick animation, scanline sweep on era jump.
6. **Text-fit audit** — explicit `max-w-*`, `text-balance`, responsive font sizes (clamp), and manual check at 375 / 768 / 1024 / 1440 widths.
7. **SEO** — update `index.html` title/description to match the new framing.
8. **Cleanup** — remove now-unused bento components (`BentoCard`, `StatTile`, `ProjectFilter`, `SkillGroup`, `ContactBlock`) once new ones land.

## Out of Scope

- No actual mini-game (kept as gimmick only, per your priority on recruiter-first).
- No routing changes — stays single-page scroll.
- Music toggle stays removed.
