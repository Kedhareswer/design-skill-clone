#!/usr/bin/env node
/**
 * scaffold.mjs — Bootstrap a complete Next.js 16 project for website cloning.
 *
 * Usage:  node scaffold.mjs [target-directory]
 *
 * If target-directory is omitted, scaffolds into the current working directory.
 * Skips files that already exist (safe to re-run).
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, resolve } from "path";

const TARGET = resolve(process.argv[2] || ".");

/* ── helpers ────────────────────────────────────────────────────────────── */

function ensureDir(rel) {
  const abs = join(TARGET, rel);
  mkdirSync(abs, { recursive: true });
  return abs;
}

function writeIfMissing(rel, content) {
  const abs = join(TARGET, rel);
  mkdirSync(join(abs, "..").replace(/\\/g, "/").split("/").slice(0, -0).join("/") || ".", {
    recursive: true,
  });
  // Ensure parent directory exists
  const parentDir = rel.split("/").slice(0, -1).join("/");
  if (parentDir) ensureDir(parentDir);

  if (existsSync(abs)) {
    console.log(`  skip  ${rel} (exists)`);
    return;
  }
  writeFileSync(abs, content, "utf-8");
  console.log(`  create  ${rel}`);
}

/* ── directory structure ────────────────────────────────────────────────── */

const dirs = [
  "src/app",
  "src/components/ui",
  "src/lib",
  "src/types",
  "src/hooks",
  "public/images",
  "public/videos",
  "public/seo",
  "docs/research/components",
  "docs/design-references",
];

/* ── file contents ──────────────────────────────────────────────────────── */

const FILES = {
  "package.json": JSON.stringify(
    {
      name: "cloned-website",
      version: "0.1.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start",
        lint: "eslint",
      },
      dependencies: {
        "@radix-ui/react-slot": "^1.2.4",
        "class-variance-authority": "^0.7.1",
        clsx: "^2.1.1",
        "lucide-react": "^1.7.0",
        next: "16.2.1",
        react: "19.2.4",
        "react-dom": "19.2.4",
        "tailwind-merge": "^3.5.0",
      },
      devDependencies: {
        "@tailwindcss/postcss": "^4",
        "@types/node": "^20",
        "@types/react": "^19",
        "@types/react-dom": "^19",
        "babel-plugin-react-compiler": "1.0.0",
        eslint: "^9",
        "eslint-config-next": "16.2.1",
        tailwindcss: "^4",
        typescript: "^5",
      },
    },
    null,
    2
  ),

  "tsconfig.json": JSON.stringify(
    {
      compilerOptions: {
        target: "ES2017",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: "esnext",
        moduleResolution: "bundler",
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: "react-jsx",
        incremental: true,
        plugins: [{ name: "next" }],
        paths: { "@/*": ["./src/*"] },
      },
      include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".next/dev/types/**/*.ts", "**/*.mts"],
      exclude: ["node_modules"],
    },
    null,
    2
  ),

  "next.config.ts": `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default nextConfig;
`,

  "postcss.config.mjs": `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`,

  "eslint.config.mjs": `import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
`,

  ".gitignore": `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`,

  "src/app/globals.css": `@import "tailwindcss";

/* ── oklch Design Tokens ── */
/* These are placeholder tokens. During cloning, the /clone-website skill
   extracts the target site's exact colors and overwrites these values. */

:root {
  /* Brand palette — oklch(lightness chroma hue) */
  --color-primary: oklch(0.55 0.25 260);
  --color-primary-foreground: oklch(0.98 0.005 260);
  --color-secondary: oklch(0.70 0.08 260);
  --color-secondary-foreground: oklch(0.20 0.02 260);
  --color-accent: oklch(0.65 0.20 150);
  --color-accent-foreground: oklch(0.98 0.005 150);

  /* Surfaces */
  --color-background: oklch(0.99 0.002 260);
  --color-foreground: oklch(0.15 0.02 260);
  --color-card: oklch(1.0 0 0);
  --color-card-foreground: oklch(0.15 0.02 260);
  --color-muted: oklch(0.95 0.01 260);
  --color-muted-foreground: oklch(0.50 0.03 260);

  /* Borders & input */
  --color-border: oklch(0.90 0.01 260);
  --color-input: oklch(0.90 0.01 260);
  --color-ring: oklch(0.55 0.25 260);

  /* Semantic */
  --color-destructive: oklch(0.55 0.22 27);
  --color-destructive-foreground: oklch(0.98 0.005 27);

  /* Radius */
  --radius: 0.625rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: oklch(0.70 0.20 260);
    --color-primary-foreground: oklch(0.15 0.02 260);
    --color-background: oklch(0.13 0.02 260);
    --color-foreground: oklch(0.93 0.01 260);
    --color-card: oklch(0.17 0.02 260);
    --color-card-foreground: oklch(0.93 0.01 260);
    --color-muted: oklch(0.22 0.02 260);
    --color-muted-foreground: oklch(0.65 0.02 260);
    --color-border: oklch(0.30 0.02 260);
    --color-input: oklch(0.30 0.02 260);
    --color-ring: oklch(0.70 0.20 260);
    --color-destructive: oklch(0.60 0.22 27);
    --color-destructive-foreground: oklch(0.98 0.005 27);
  }
}

@theme inline {
  --color-background: var(--color-background);
  --color-foreground: var(--color-foreground);
  --color-primary: var(--color-primary);
  --color-primary-foreground: var(--color-primary-foreground);
  --color-secondary: var(--color-secondary);
  --color-secondary-foreground: var(--color-secondary-foreground);
  --color-accent: var(--color-accent);
  --color-accent-foreground: var(--color-accent-foreground);
  --color-muted: var(--color-muted);
  --color-muted-foreground: var(--color-muted-foreground);
  --color-card: var(--color-card);
  --color-card-foreground: var(--color-card-foreground);
  --color-border: var(--color-border);
  --color-input: var(--color-input);
  --color-ring: var(--color-ring);
  --color-destructive: var(--color-destructive);
  --color-destructive-foreground: var(--color-destructive-foreground);
  --radius: var(--radius);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans), system-ui, sans-serif;
}
`,

  "src/app/layout.tsx": `import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Website Cloner",
  description: "Pixel-perfect website cloning powered by AI coding agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={\`\${geistSans.variable} \${geistMono.variable} h-full antialiased\`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
`,

  "src/app/page.tsx": `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          AI Website Cloner
        </h1>
        <p className="text-lg text-muted-foreground">
          Ready to clone. Run{" "}
          <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
            /clone-website &lt;url&gt;
          </code>{" "}
          in your AI coding agent to get started.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
          <span>Next.js 16</span>
          <span className="text-border">|</span>
          <span>React 19</span>
          <span className="text-border">|</span>
          <span>Tailwind v4</span>
          <span className="text-border">|</span>
          <span>shadcn/ui</span>
          <span className="text-border">|</span>
          <span>TypeScript</span>
        </div>
      </div>
    </main>
  );
}
`,

  "src/components/ui/button.tsx": `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
`,

  "src/components/icons.tsx": `// Extracted SVG icons from the target website.
// During cloning, this file is populated with SVGs captured from the target site.
// Until then, re-export Lucide icons as defaults.

export { Menu, X, ChevronDown, ChevronRight, ArrowRight, ExternalLink } from "lucide-react";
`,

  "src/lib/utils.ts": `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,

  "src/types/index.ts": `export interface SiteMetadata {
  title: string;
  description: string;
  favicon: string;
  ogImage?: string;
}

export interface DesignTokens {
  colors: Record<string, string>;
  fonts: Record<string, string>;
  spacing: Record<string, string>;
  breakpoints: Record<string, string>;
}
`,

  "src/hooks/use-media-query.ts": `"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot(query: string) {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => getSnapshot(query),
    getServerSnapshot
  );
}
`,
};

/* ── main ───────────────────────────────────────────────────────────────── */

console.log(`\nScaffolding clone project in: ${TARGET}\n`);

// Create directories
for (const d of dirs) {
  ensureDir(d);
  console.log(`  dir  ${d}/`);
}

// Write files
for (const [rel, content] of Object.entries(FILES)) {
  writeIfMissing(rel, content);
}

console.log(`
✅ Scaffold complete!

Next steps:
  cd ${TARGET}
  npm install
  npm run dev        # verify at http://localhost:3000
  # Then run the clone pipeline (Phase 1–5)
`);
