# clone-website

> Pixel-perfect website cloning. Any AI agent. One command.

<p align="center">
  <a href="video/out/promo.mp4">
    <img src="https://img.shields.io/badge/Watch%20Demo-Promo%20Video-6366f1?style=for-the-badge&logo=youtube&logoColor=white" alt="Watch Demo Video" />
  </a>
</p>

https://github.com/user-attachments/assets/promo.mp4

---

## What It Does

Point any AI coding agent at a URL and get a **pixel-perfect clone** built with modern web tech. The skill handles everything: screenshots, design token extraction, asset downloads, component specs, parallel building, and QA.

```
/clone-website https://stripe.com
```

That's it. The agent runs a 5-phase pipeline and outputs a production-ready Next.js site.

---

## Tech Stack

| Layer       | Choice                                         |
|-------------|-------------------------------------------------|
| Framework   | Next.js 16 -- App Router, React 19, TypeScript strict |
| Styling     | Tailwind CSS v4 -- oklch design tokens          |
| Components  | shadcn/ui (Radix primitives + Tailwind)        |
| Icons       | Lucide React (replaced by extracted SVGs)      |
| Pkg manager | npm                                            |

---

## The 5-Phase Pipeline

```
Phase 1  Reconnaissance     Screenshots at 3 breakpoints, design tokens, interaction sweep
Phase 2  Foundation          oklch colors, fonts, asset downloads, metadata
Phase 3  Component Specs     Per-section spec files with exact CSS and content
Phase 4  Parallel Build      One builder agent per component in isolated worktrees
Phase 5  QA                  Visual diff, build check, lint, responsive verification
```

### Phase 1 -- Reconnaissance
Takes full-page screenshots at desktop (1440px), tablet (768px), and mobile (375px). Extracts every design token from the page using `getComputedStyle()` -- colors, fonts, spacing, border-radius, shadows. Captures hover/focus/active states and scroll-triggered animations. Inventories every section with bounding-box coordinates.

### Phase 2 -- Foundation
Converts all extracted colors to `oklch()` format in `globals.css`. Configures fonts via `next/font/google` or custom `@font-face`. Downloads every image, video, favicon, and OG image into `public/`. Extracts SVG icons as React components. Updates layout metadata.

### Phase 3 -- Component Specs
Creates a detailed spec file for each section in `docs/research/components/`. Each spec includes exact layout, typography, colors, spacing, interaction states, responsive behavior, content copy, and asset paths. No guessing -- every value is measured.

### Phase 4 -- Parallel Build
Dispatches one builder agent per component. Each receives its full spec inline. Builders work in isolated git worktrees to avoid conflicts. Uses only Tailwind classes and oklch CSS variables. Assembles all components into `src/app/page.tsx`.

### Phase 5 -- QA
Runs `npm run build` (zero errors required). Takes new screenshots and compares against Phase 1 originals. Fixes spacing, color, typography, and interaction discrepancies. Runs `npm run lint`. Verifies responsive behavior at all three breakpoints.

---

## Supported AI Agents

Works with **13 platforms** out of the box:

| Agent | Install Method |
|-------|---------------|
| **Claude Code** | Native skill (`~/.claude/skills/`) |
| **Codex CLI** | `codex.md` project file |
| **Cursor** | `.cursorrules` project file |
| **Windsurf** | `.windsurfrules` project file |
| **Cline** | `.clinerules` project file |
| **Aider** | `.aider.conf.md` project file |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Roo Code** | `.roo/rules.md` |
| **Continue** | `.continue/config.md` |
| **Kiro** | `.kiro/rules.md` |
| **Trae** | `.trae/rules.md` |
| **Amazon Q** | `.amazonq/rules.md` |
| **Augment Code** | `.augment/rules.md` |

---

## Quick Start

### 1. Install the skill

**Claude Code (global -- works from any directory):**
```bash
bash scripts/install.sh --claude
```

**All platforms (generates project-level rule files):**
```bash
bash scripts/install.sh --all
```

**Specific project:**
```bash
bash scripts/install.sh --project ./my-project
```

### 2. Scaffold a project (if starting fresh)

```bash
node scripts/scaffold.mjs ./my-clone
cd my-clone
npm install
npm run dev  # verify at http://localhost:3000
```

The scaffold creates a complete Next.js 16 project with:
- oklch design tokens in `globals.css`
- Geist font configuration
- shadcn/ui Button component
- `cn()` utility, TypeScript types, media query hook
- All directory structure ready for cloning

### 3. Clone a website

**In Claude Code:**
```
/clone-website https://example.com
```

**In Cursor / Windsurf / Codex / other agents:**
```
Clone https://example.com following the instructions in .cursorrules
```

---

## Project Structure (after cloning)

```
src/
  app/
    globals.css              # oklch design tokens from target
    layout.tsx               # Fonts + metadata from target
    page.tsx                 # All sections assembled
  components/
    ui/button.tsx            # shadcn/ui primitives
    icons.tsx                # SVGs extracted from target
    Hero.tsx                 # Cloned section components
    Features.tsx
    Footer.tsx
    ...
  lib/utils.ts               # cn() utility
  types/index.ts              # Shared interfaces
  hooks/use-media-query.ts    # Responsive hook
public/
  images/                     # Downloaded from target
  videos/                     # Downloaded from target
  seo/                        # Favicon, OG images
docs/
  design-references/          # Screenshots at 3 breakpoints
  research/
    design-tokens.json        # Extracted tokens
    section-inventory.md      # Section bounding boxes
    interactions.md           # Interaction states
    components/               # Per-section spec files
```

---

## Skill Contents

```
clone-website/
  SKILL.md                              # Main skill (pipeline + instructions)
  scripts/
    scaffold.mjs                        # Bootstraps Next.js project from scratch
    install.sh                          # Multi-platform installer
  references/
    coding-standards.md                 # TypeScript, Tailwind, React, a11y rules
    component-spec-template.md          # Template for per-section specs
  video/                                # Promo video (Remotion)
    src/PromoVideo.tsx                  # Video compositions
    out/promo.mp4                       # Rendered 15s promo
```

---

## Coding Standards

The skill enforces strict standards (full details in `references/coding-standards.md`):

- **TypeScript strict** -- no `any`, no `@ts-ignore`
- **Server Components by default** -- `"use client"` only when needed
- **Tailwind only** -- no inline styles unless computed CSS requires it
- **oklch colors** -- via CSS custom properties, never hex/rgb
- **Semantic HTML** -- proper landmark elements
- **WCAG AA accessible** -- alt text, labels, contrast
- **No dead code** -- clean imports, no unused variables

---

## Promo Video

The `video/` directory contains a [Remotion](https://remotion.dev) project that generates the promo video programmatically with React.

```bash
cd video
npm install
npm run preview    # Live preview in browser
npm run render     # Render to video/out/promo.mp4
```

The video showcases the 5-phase pipeline, terminal demo, and platform support in a 15-second animated sequence.

---

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build
npm run lint       # ESLint check
```

---

## License

MIT
