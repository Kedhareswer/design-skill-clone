import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

/* ── Color Palette (oklch-inspired hex equivalents for Remotion) ────── */
const COLORS = {
  bg: "#0a0a1a",
  bgGradient: "#0f0f2e",
  primary: "#6366f1",
  primaryLight: "#818cf8",
  accent: "#22d3ee",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  green: "#4ade80",
  orange: "#fb923c",
  pink: "#f472b6",
  surface: "#1e1b4b",
  surfaceLight: "#312e81",
};

/* ── Shared Styles ──────────────────────────────────────────────────── */
const centerFlex: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
};

/* ── Scene: Intro ───────────────────────────────────────────────────── */
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const lineWidth = interpolate(frame, [10, 50], [0, 600], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const techOpacity = interpolate(frame, [40, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        ...centerFlex,
        background: `radial-gradient(ellipse at 50% 40%, ${COLORS.bgGradient}, ${COLORS.bg})`,
      }}
    >
      {/* Floating grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.primary}08 1px, transparent 1px), linear-gradient(90deg, ${COLORS.primary}08 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: interpolate(frame, [0, 30], [0, 0.5], {
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Command prompt icon */}
      <div
        style={{
          fontSize: 64,
          marginBottom: 20,
          opacity: interpolate(frame, [0, 15], [0, 1], {
            extrapolateRight: "clamp",
          }),
          transform: `translateY(${interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: "clamp" })}px)`,
        }}
      >
        <span style={{ color: COLORS.accent }}>{">"}_</span>
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 88,
          fontWeight: 800,
          color: COLORS.text,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "-0.03em",
          transform: `scale(${titleScale})`,
        }}
      >
        clone-website
      </div>

      {/* Accent line */}
      <div
        style={{
          height: 4,
          width: lineWidth,
          background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})`,
          borderRadius: 2,
          marginTop: 16,
          marginBottom: 24,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          fontSize: 32,
          color: COLORS.textMuted,
          fontFamily: "system-ui, sans-serif",
          opacity: subtitleOpacity,
          fontWeight: 400,
        }}
      >
        Pixel-perfect website cloning. Any AI agent. One command.
      </div>

      {/* Tech stack pills */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 40,
          opacity: techOpacity,
        }}
      >
        {["Next.js 16", "React 19", "Tailwind v4", "TypeScript", "shadcn/ui"].map(
          (tech, i) => (
            <div
              key={tech}
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                border: `1px solid ${COLORS.primary}60`,
                color: COLORS.primaryLight,
                fontSize: 20,
                fontFamily: "monospace",
                background: `${COLORS.primary}15`,
                transform: `translateY(${interpolate(frame, [40 + i * 3, 55 + i * 3], [15, 0], { extrapolateRight: "clamp" })}px)`,
                opacity: interpolate(frame, [40 + i * 3, 55 + i * 3], [0, 1], {
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {tech}
            </div>
          )
        )}
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene: Pipeline Phases ─────────────────────────────────────────── */
interface PhaseProps {
  number: string;
  title: string;
  items: string[];
  color: string;
  icon: string;
}

const PhaseScene: React.FC<PhaseProps> = ({
  number,
  title,
  items,
  color,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const badgeScale = spring({
    frame: frame - 5,
    fps,
    config: { damping: 10, mass: 0.4 },
  });

  return (
    <AbsoluteFill
      style={{
        ...centerFlex,
        background: `radial-gradient(ellipse at 30% 50%, ${color}12, ${COLORS.bg})`,
      }}
    >
      {/* Phase badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 48,
          transform: `scale(${Math.max(0, badgeScale)})`,
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: `${color}25`,
            border: `2px solid ${color}60`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
          }}
        >
          {icon}
        </div>
        <div>
          <div
            style={{
              fontSize: 22,
              color: color,
              fontFamily: "monospace",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Phase {number}
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: COLORS.text,
              fontFamily: "system-ui, sans-serif",
              transform: `scale(${titleSpring})`,
              transformOrigin: "left center",
            }}
          >
            {title}
          </div>
        </div>
      </div>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {items.map((item, i) => {
          const itemOpacity = interpolate(
            frame,
            [15 + i * 8, 25 + i * 8],
            [0, 1],
            { extrapolateRight: "clamp" }
          );
          const itemX = interpolate(
            frame,
            [15 + i * 8, 25 + i * 8],
            [40, 0],
            { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
          );

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: itemOpacity,
                transform: `translateX(${itemX}px)`,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  background: color,
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontSize: 28,
                  color: COLORS.textMuted,
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene: Platforms ───────────────────────────────────────────────── */
const PlatformsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const platforms = [
    "Claude Code",
    "Codex CLI",
    "Cursor",
    "Windsurf",
    "Cline",
    "Aider",
    "GitHub Copilot",
    "Roo Code",
    "Continue",
    "Kiro",
    "Trae",
    "Amazon Q",
    "Augment",
  ];

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        ...centerFlex,
        background: `radial-gradient(ellipse at 50% 50%, ${COLORS.bgGradient}, ${COLORS.bg})`,
      }}
    >
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: COLORS.text,
          fontFamily: "system-ui, sans-serif",
          marginBottom: 16,
          transform: `scale(${titleSpring})`,
        }}
      >
        Works with{" "}
        <span style={{ color: COLORS.accent }}>13 AI Agents</span>
      </div>

      <div
        style={{
          fontSize: 24,
          color: COLORS.textMuted,
          marginBottom: 48,
          opacity: interpolate(frame, [10, 25], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        One skill. Every platform.
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
          maxWidth: 1200,
          padding: "0 80px",
        }}
      >
        {platforms.map((p, i) => {
          const delay = 15 + i * 3;
          const s = spring({
            frame: frame - delay,
            fps,
            config: { damping: 10, mass: 0.3 },
          });
          return (
            <div
              key={p}
              style={{
                padding: "14px 28px",
                borderRadius: 12,
                background: COLORS.surface,
                border: `1px solid ${COLORS.surfaceLight}`,
                color: COLORS.text,
                fontSize: 22,
                fontFamily: "system-ui, sans-serif",
                fontWeight: 500,
                transform: `scale(${Math.max(0, s)})`,
              }}
            >
              {p}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene: Command Demo ────────────────────────────────────────────── */
const CommandScene: React.FC = () => {
  const frame = useCurrentFrame();

  const command = "/clone-website https://stripe.com";
  const typedLength = Math.min(
    command.length,
    Math.floor(interpolate(frame, [10, 60], [0, command.length], {
      extrapolateRight: "clamp",
    }))
  );
  const typed = command.slice(0, typedLength);

  const cursorVisible = frame % 30 < 20 || frame < 60;
  const resultOpacity = interpolate(frame, [65, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        ...centerFlex,
        background: COLORS.bg,
      }}
    >
      {/* Terminal window */}
      <div
        style={{
          width: 1100,
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${COLORS.surfaceLight}`,
          boxShadow: `0 20px 60px ${COLORS.primary}20`,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: COLORS.surface,
            padding: "14px 20px",
            display: "flex",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#ef4444",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#eab308",
            }}
          />
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 7,
              background: "#22c55e",
            }}
          />
          <div
            style={{
              flex: 1,
              textAlign: "center",
              color: COLORS.textMuted,
              fontSize: 16,
              fontFamily: "monospace",
            }}
          >
            Terminal
          </div>
        </div>

        {/* Terminal body */}
        <div
          style={{
            background: "#0d0d1f",
            padding: 40,
            minHeight: 300,
          }}
        >
          {/* Prompt line */}
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 28,
              lineHeight: 1.8,
            }}
          >
            <span style={{ color: COLORS.green }}>$</span>{" "}
            <span style={{ color: COLORS.text }}>{typed}</span>
            {cursorVisible && (
              <span
                style={{
                  display: "inline-block",
                  width: 14,
                  height: 32,
                  background: COLORS.accent,
                  marginLeft: 2,
                  verticalAlign: "middle",
                }}
              />
            )}
          </div>

          {/* Output */}
          <div style={{ opacity: resultOpacity, marginTop: 24 }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 22,
                color: COLORS.accent,
                lineHeight: 2,
              }}
            >
              Phase 1 -- Reconnaissance ............ done
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 22,
                color: COLORS.green,
                lineHeight: 2,
              }}
            >
              Phase 2 -- Foundation ................. done
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 22,
                color: COLORS.orange,
                lineHeight: 2,
              }}
            >
              Phase 3 -- Component Specs ............ done
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 22,
                color: COLORS.pink,
                lineHeight: 2,
              }}
            >
              Phase 4 -- Parallel Build ............. done
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 22,
                color: COLORS.primaryLight,
                lineHeight: 2,
              }}
            >
              Phase 5 -- QA ......................... done
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene: Outro ───────────────────────────────────────────────────── */
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 12 } });
  const cmdOpacity = interpolate(frame, [20, 35], [0, 1], {
    extrapolateRight: "clamp",
  });
  const starOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        ...centerFlex,
        background: `radial-gradient(ellipse at 50% 40%, ${COLORS.bgGradient}, ${COLORS.bg})`,
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: COLORS.text,
          fontFamily: "system-ui, sans-serif",
          transform: `scale(${titleSpring})`,
          marginBottom: 32,
        }}
      >
        Get Started
      </div>

      <div
        style={{
          opacity: cmdOpacity,
          padding: "20px 48px",
          borderRadius: 16,
          background: COLORS.surface,
          border: `1px solid ${COLORS.surfaceLight}`,
          marginBottom: 40,
        }}
      >
        <code
          style={{
            fontSize: 32,
            fontFamily: "monospace",
            color: COLORS.accent,
          }}
        >
          bash install.sh --claude
        </code>
      </div>

      <div
        style={{
          opacity: starOpacity,
          fontSize: 26,
          color: COLORS.textMuted,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        github.com/your-repo/clone-website-skill
      </div>
    </AbsoluteFill>
  );
};

/* ── Main Composition ───────────────────────────────────────────────── */
export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: COLORS.bg }}>
      {/* Scene 1: Intro (0-89, ~3s) */}
      <Sequence from={0} durationInFrames={90}>
        <IntroScene />
      </Sequence>

      {/* Scene 2: Command Demo (90-179, ~3s) */}
      <Sequence from={90} durationInFrames={90}>
        <CommandScene />
      </Sequence>

      {/* Scene 3-7: Pipeline phases (180-379, ~1.3s each) */}
      <Sequence from={180} durationInFrames={40}>
        <PhaseScene
          number="1"
          title="Reconnaissance"
          items={[
            "Full-page screenshots at 3 breakpoints",
            "Design token extraction (colors, fonts, spacing)",
            "Interaction sweep (hover, focus, animations)",
          ]}
          color={COLORS.accent}
          icon={"\u25CE"}
        />
      </Sequence>

      <Sequence from={220} durationInFrames={40}>
        <PhaseScene
          number="2"
          title="Foundation"
          items={[
            "oklch color tokens in globals.css",
            "Font configuration via next/font",
            "All assets downloaded to public/",
          ]}
          color={COLORS.green}
          icon={"\u2699"}
        />
      </Sequence>

      <Sequence from={260} durationInFrames={40}>
        <PhaseScene
          number="3"
          title="Component Specs"
          items={[
            "Per-section spec files with exact CSS",
            "Typography, spacing, responsive rules",
            "Asset paths and content mapping",
          ]}
          color={COLORS.orange}
          icon={"\u2630"}
        />
      </Sequence>

      <Sequence from={300} durationInFrames={40}>
        <PhaseScene
          number="4"
          title="Parallel Build"
          items={[
            "One builder agent per component",
            "Isolated git worktrees",
            "Tailwind + oklch CSS variables only",
          ]}
          color={COLORS.pink}
          icon={"\u26A1"}
        />
      </Sequence>

      <Sequence from={340} durationInFrames={40}>
        <PhaseScene
          number="5"
          title="QA"
          items={[
            "Visual diff against original screenshots",
            "npm run build + lint pass",
            "Responsive at 375px, 768px, 1440px",
          ]}
          color={COLORS.primaryLight}
          icon={"\u2713"}
        />
      </Sequence>

      {/* Scene 8: Platforms (380-419, ~1.3s) */}
      <Sequence from={380} durationInFrames={40}>
        <PlatformsScene />
      </Sequence>

      {/* Scene 9: Outro (420-449, ~1s) */}
      <Sequence from={420} durationInFrames={30}>
        <OutroScene />
      </Sequence>
    </AbsoluteFill>
  );
};
