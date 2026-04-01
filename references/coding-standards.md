# Coding Standards Reference

Detailed standards for the clone-website skill. SKILL.md references this file
for the full rules; only the summary lives in the main skill.

---

## TypeScript

- **Strict mode** — enabled in `tsconfig.json`. No `any`, no `@ts-ignore`, no `@ts-expect-error`.
- Path alias `@/*` maps to `./src/*`.
- All component props must be typed explicitly (no inline `Record<string, any>`).
- Prefer `interface` for component props, `type` for unions/intersections.

## React & Next.js 16

- **Server Components by default.** Only add `"use client"` when the component
  uses hooks, event handlers, or browser APIs (`window`, `document`, `navigator`).
- One component per file. The filename matches the default export
  (e.g., `Hero.tsx` exports `Hero`).
- Use `next/font/google` or `next/font/local` for fonts — never `<link>` tags.
- Use `next/image` for raster images — never raw `<img>`.
- Metadata goes in `layout.tsx` via the `Metadata` export — never `<Head>`.

## Tailwind CSS v4

- All styling via Tailwind utility classes.
- No inline `style` props unless a computed CSS value from the target requires it
  (e.g., `style={{ '--progress': '72%' }}`).
- oklch colors only — defined as CSS custom properties in `globals.css`.
  Never hard-code `#hex`, `rgb()`, or `hsl()`.
- Use the `cn()` utility from `@/lib/utils` for conditional class merging.
- Responsive: mobile-first (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).

## Semantic HTML

Match the target site's landmark structure:

| Element     | Usage                                  |
|-------------|----------------------------------------|
| `<header>`  | Page or section header                 |
| `<nav>`     | Navigation blocks                      |
| `<main>`    | Primary content (one per page)         |
| `<section>` | Thematic grouping with heading         |
| `<article>` | Self-contained content                 |
| `<aside>`   | Tangentially related content           |
| `<footer>`  | Page or section footer                 |

## Accessibility (WCAG AA)

- Every `<img>` has an `alt` attribute. Decorative images use `alt=""`.
- Interactive elements (`<button>`, `<a>`, `<input>`) have visible or `aria-label` text.
- Color contrast: ≥ 4.5:1 for normal text, ≥ 3:1 for large text.
- Focus indicators: visible focus ring on all interactive elements.
- Keyboard navigable: all interactive elements reachable via Tab.

## Assets

- **Download everything.** No external URLs in production code.
- Images → `public/images/` — use `next/image` with local paths.
- Videos → `public/videos/` — use `<video>` with local `src`.
- SVG icons → extract as React components in `src/components/icons.tsx`.
- Favicons/OG → `public/seo/`.

## File Organization

```
src/
  app/
    globals.css          # oklch design tokens + Tailwind theme
    layout.tsx           # Root layout, fonts, metadata
    page.tsx             # Homepage assembly
  components/
    ui/                  # shadcn/ui primitives (Button, etc.)
    icons.tsx            # Extracted SVG icons
    Hero.tsx             # Section components (one per file)
    Features.tsx
    ...
  lib/
    utils.ts             # cn() and shared utilities
  types/
    index.ts             # Shared TypeScript interfaces
  hooks/
    use-media-query.ts   # Client hooks
```

## Git Conventions

- Conventional commits: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`
- One logical change per commit
- No dead code in commits — remove unused imports, variables, components

## Commands

```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build
npm run lint   # ESLint check
```

## Tips for AI Agents

- **Read before writing.** Always read existing files before modifying them.
- **Check the spec.** Component specs in `docs/research/components/` are the
  single source of truth for what each component should look like.
- **Use `cn()`.** Import from `@/lib/utils` for conditional class merging.
- **Download assets first.** Never reference external URLs in production code.
  Download to `public/` and use local paths.
- **Match the pixel grid.** Use the exact spacing, font sizes, and line heights
  from the spec. Don't approximate.
- **Test responsively.** Every component must work at 375px, 768px, and 1440px.