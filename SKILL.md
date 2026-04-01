---
name: clone-website
description: >
  Clone any website as a pixel-perfect Next.js 16 reproduction. Takes a URL,
  scaffolds a project (if needed), extracts design tokens and assets, writes
  component specs, and dispatches parallel builders. Use when asked to clone,
  replicate, copy, or rebuild an existing website. Triggers on: "clone this
  site", "replicate this page", "rebuild this website", "copy this design",
  "/clone-website URL", or any request to recreate a live website as code.
  Works with Claude Code, Codex, Cursor, Windsurf, Cline, Copilot, and any
  AI coding agent.
---

# Clone Website

Clone `{{url}}` into a pixel-perfect Next.js 16 site. Follow each phase in
order — do not skip or combine phases.

## Quick Reference

| Layer       | Choice                                         |
|-------------|-------------------------------------------------|
| Framework   | Next.js 16 — App Router, React 19, TS strict  |
| Styling     | Tailwind CSS v4 — oklch design tokens          |
| Components  | shadcn/ui (Radix primitives + Tailwind)        |
| Icons       | Lucide React (replaced by extracted SVGs)      |
| Pkg manager | npm                                            |

For full coding standards, read [references/coding-standards.md](references/coding-standards.md).

---

## Phase 0 — Scaffold (if needed)

Check if the current directory has a valid Next.js project (`package.json` with
`next` dependency, `src/app/layout.tsx` exists). If not:

```bash
node <skill-path>/scripts/scaffold.mjs .
npm install
```

Verify with `npm run dev` — should start without errors on localhost:3000.

**Skip this phase** if the project already exists and is valid.

---

## Phase 1 — Reconnaissance

### 1.1 Screenshots
Capture full-page screenshots using Playwright, browser MCP, or any available
browser tool:

| Viewport | Size      | Save to                              |
|----------|-----------|--------------------------------------|
| Desktop  | 1440×900  | `docs/design-references/desktop.png` |
| Tablet   | 768×1024  | `docs/design-references/tablet.png`  |
| Mobile   | 375×812   | `docs/design-references/mobile.png`  |

### 1.2 Design Token Extraction
Inject JavaScript in the browser to extract `getComputedStyle()` from every
visible element. Collect unique: colors, font families, font sizes, font
weights, line heights, letter spacings, border-radii, box-shadows, spacing
values. Save to `docs/research/design-tokens.json`.

### 1.3 Interaction Sweep
For each interactive element (buttons, links, dropdowns, carousels, modals):
- Capture hover, focus, active, and open state screenshots
- Note scroll-triggered animations and transitions (duration, easing)

Save to `docs/research/interactions.md`.

### 1.4 Section Inventory
List every distinct section/component on the page:
- Descriptive name (e.g. `hero`, `features-grid`, `testimonials`, `footer`)
- Bounding-box coordinates
- Assets contained (images, icons, videos)

Save to `docs/research/section-inventory.md`.

---

## Phase 2 — Foundation

### 2.1 Colors
Convert all extracted colors to `oklch()`. Update `src/app/globals.css`:
- Map to semantic names: `--color-primary`, `--color-background`, etc.
- Include dark mode variants if the target has them.

### 2.2 Fonts
- **Google Fonts**: configure in `src/app/layout.tsx` via `next/font/google`.
- **Custom fonts**: download to `public/fonts/`, create `@font-face` rules.

### 2.3 Assets
Download ALL assets from the target — nothing references external URLs:

| Asset type | Destination                                      |
|------------|--------------------------------------------------|
| Images     | `public/images/`                                 |
| Videos     | `public/videos/`                                 |
| Favicon    | `public/seo/favicon.ico`                         |
| OG image   | `public/seo/og-image.png`                        |
| SVG icons  | `src/components/icons.tsx` (as React components) |

### 2.4 Metadata
Update `src/app/layout.tsx` with the target's `<title>`, `<meta description>`,
favicon, and OpenGraph metadata.

---

## Phase 3 — Component Specs

For **each section** from Phase 1.4, create a spec at
`docs/research/components/<section-name>.md`.

Use the template in [references/component-spec-template.md](references/component-spec-template.md).

Every spec must include:
- Layout (container, grid/flex, gaps)
- Typography (font, size, weight, line-height, color, letter-spacing per element)
- Colors & backgrounds (oklch values)
- Spacing (padding, margin — exact values)
- Interactive states (hover, focus, active, transitions)
- Responsive behavior (1440px, 768px, 375px)
- Exact content/copy
- Asset paths (local, from Phase 2.3)

---

## Phase 4 — Build

For each component spec:

1. Create `src/components/<SectionName>.tsx`
2. Use **only** Tailwind classes + oklch CSS variables from `globals.css`
3. Import assets via local paths from `public/`
4. Match the spec exactly — every pixel, every interaction state
5. Export as default

**Parallel agents**: if your platform supports it, dispatch one builder agent
per component in an isolated git worktree. Each builder receives its full
component spec inline.

After all components are built, assemble the page:

```tsx
// src/app/page.tsx
import Hero from "@/components/Hero";
import Features from "@/components/Features";
// ... all section imports in visual order

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      {/* all sections in order */}
    </main>
  );
}
```

---

## Phase 5 — QA

1. Run `npm run build` — must complete with zero errors.
2. Run `npm run dev` and take new screenshots at 1440px, 768px, 375px.
3. Visual diff against Phase 1 screenshots. Fix discrepancies in:
   - Spacing / alignment
   - Colors / gradients
   - Typography (size, weight, line-height)
   - Interactive states (hover, focus)
   - Responsive layout shifts
4. Run `npm run lint` — fix any warnings.
5. Verify all images load, no broken links, no console errors.

---

## Completion Checklist

- [ ] All sections from the target implemented
- [ ] Colors match (oklch tokens in globals.css)
- [ ] Fonts match (next/font or @font-face)
- [ ] All assets local (no external URLs)
- [ ] Responsive at 375px, 768px, 1440px
- [ ] Interactive states match (hover, focus)
- [ ] `npm run build` passes
- [ ] `npm run lint` passes

---

## Multi-Platform Installation

This skill works natively with Claude Code. To install for other AI agents:

```bash
# Claude Code (global skill)
bash <skill-path>/scripts/install.sh --claude

# All agents (generates project-level rule files)
bash <skill-path>/scripts/install.sh --all

# Specific project directory
bash <skill-path>/scripts/install.sh --project /path/to/project
```

Supported: Claude Code, Codex, Cursor, Windsurf, Cline, Aider, GitHub Copilot,
Roo Code, Continue, Kiro, Trae, Amazon Q, Augment Code.
