## Goal
Transform the current flat, text-heavy editorial portfolio into a calm but characterful bento-grid landing page using the **Ocean Deep** palette and **Sora + Manrope** typography. Every existing section (hero, stats, projects, skills, experience, contact) is preserved, but chunked into scannable tiles with ambient motion and clear hierarchy.

## Design locks
- **Palette:** `#0c2340` (deep navy background), `#1a4a6e` (card surface), `#2d8a9e` (mid accent), `#5cbdb9` (bright teal accent) — mapped to HSL CSS variables.
- **Typography:** `Sora` for headings, `Manrope` for body, `JetBrains Mono` for stats/labels/tech tags.
- **Layout:** responsive 12-column bento grid: large hero tile, impact stats tile, grouped skills tile, project list tile, experience timeline tile, contact CTA tile.
- **Shape language:** large rounded-3xl tiles, 1px subtle borders, numbered tile badges, soft inner glows.

## Plan

### 1. Design tokens & typography
- Update `src/index.css` to set the Ocean Deep HSL palette and import `Sora`, `Manrope`.
- Update `tailwind.config.ts` to register `font-sora` and `font-manrope`.
- Add CSS variables for the bento card surface, accent glow, and tile border color.

### 2. Data model
- Reuse `src/data/universes.ts` for projects, skills, stats, and experience.
- Keep the project filter state (All / AI / Backend / Cloud / Full-Stack).
- Keep the one-click `mailto:` link with pre-filled subject/body.

### 3. Page layout (`src/pages/Index.tsx`)
Replace the single long column with a single-page bento grid:

```text
[Sticky nav: name + links + "Get in touch"]

Bento grid (max-w-6xl, 12 cols, gap-4):
┌──────────────────────┬─────────────┐
│ 01 Hero              │ 02 Impact  │
│ (8 cols)             │ (4 cols)   │
├────────────┬─────────┴────────────┤
│ 03 Skills  │ 04 Selected Work     │
│ (4 cols)   │ (8 cols)             │
├──────────────────────┬─────────────┤
│ 05 Career Path       │ 06 Contact  │
│ (7 cols)             │ (5 cols)   │
└──────────────────────┴─────────────┘

[Footer]
```

Tile contents:
- **01 Hero:** availability badge, name, tagline, quick links (LinkedIn, GitHub, Email, Location).
- **02 Impact:** 2–4 key stats in teal-on-navy or navy-on-teal blocks.
- **03 Skills:** grouped by domain (Frontend/Backend/DevOps/AI) with tech tags.
- **04 Selected Work:** domain filter pills, then project rows with title, blurb, stack, metrics.
- **05 Career Path:** SAP Labs experience with period and bullet points.
- **06 Contact:** heading, subtext, "Email Tushar" button, copyable email/phone rows.

### 4. Components to create
- `src/components/BentoCard.tsx`: consistent tile wrapper with border, glow, hover state, and optional number badge.
- `src/components/ProjectFilter.tsx`: pill filter for project domains.
- `src/components/StatTile.tsx`: large number + label.
- `src/components/SkillGroup.tsx`: domain label + comma-separated skills.
- `src/components/ContactBlock.tsx`: email CTA + copy rows.

### 5. Motion & interactions
- Use `framer-motion` for:
  - staggered tile reveal on load (fade + translateY),
  - subtle hover lift/glow on tiles,
  - smooth project filter rearrangement.
- Add a slow ambient teal gradient sweep on the hero tile background.
- Keep the cursor trail but recolor it to match the teal accent (or disable if it clashes).
- Respect `prefers-reduced-motion`.

### 6. Responsive behavior
- Mobile: single-column stack, tiles become full-width, stats tile collapses into a 2x2 grid, project rows become vertical cards.
- Tablet: 6-column grid.
- Desktop: 12-column bento as designed.

### 7. SEO / meta
- Update `index.html` title and description to match the new tone.
- Ensure OpenGraph / Twitter card tags match.

### 8. Cleanup
- Remove unused imports and components from the previous editorial version (ParticleField, Portal, etc.).
- Keep files like `PortalHub.tsx` only if they are no longer imported; otherwise delete or archive them.

### 9. Verification
- Run `bun run build` or `vite build` to confirm no errors.
- Check responsive breakpoints at 375px, 768px, 1440px.
- Confirm all hyperlinks work (mailto pre-filled, LinkedIn, GitHub, phone).
- Confirm the one-click email copy and mailto CTA function as before.
