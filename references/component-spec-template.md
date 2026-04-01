# Component Spec Template

Use this template for every section spec in `docs/research/components/<name>.md`.
Fill in **exact values** from the target site — no approximations.

---

```markdown
# <Section Name>

## Layout
- Container: [max-width, centering, overflow]
- Display: [grid | flex | block]
- Grid/flex config: [columns, rows, direction, wrap]
- Gap: [value in px or rem]

## Typography
| Element         | Font Family | Size  | Weight | Line Height | Color (oklch)       | Letter Spacing |
|-----------------|-------------|-------|--------|-------------|---------------------|----------------|
| Heading         |             |       |        |             | var(--color-...)    |                |
| Subheading      |             |       |        |             |                     |                |
| Body text       |             |       |        |             |                     |                |
| Caption/label   |             |       |        |             |                     |                |

## Colors & Backgrounds
- Section background: [oklch value or var(--color-...)]
- Gradients: [if any]
- Border colors: [oklch values]

## Spacing
| Element         | Padding          | Margin           |
|-----------------|------------------|------------------|
| Section         |                  |                  |
| Container       |                  |                  |
| Cards/items     |                  |                  |

## Interactive States
| Element   | Hover                  | Focus                  | Active          | Transition            |
|-----------|------------------------|------------------------|-----------------|-----------------------|
| Button    |                        |                        |                 | duration easing       |
| Link      |                        |                        |                 |                       |
| Card      |                        |                        |                 |                       |

## Responsive Behavior
### Desktop (1440px)
[Default layout described above]

### Tablet (768px)
- [What changes: grid columns, font sizes, spacing, visibility]

### Mobile (375px)
- [What changes: stacking, hidden elements, adjusted sizing]

## Content
- Heading: "[exact text]"
- Subheading: "[exact text]"
- Body: "[exact text]"
- CTA: "[exact text]" → [link target]
- [Additional content items]

## Assets
- [asset-name]: `public/images/[filename]` — [description]
- [icon-name]: `src/components/icons.tsx` → `<IconName />` — [description]
```

---

## Notes for Spec Authors

1. **Use computed styles** — right-click → Inspect → Computed tab. Not approximate values.
2. **Convert colors to oklch** — use a converter if the site uses hex/rgb.
3. **Capture all breakpoints** — resize the browser and note every layout shift.
4. **Include ALL text** — every heading, paragraph, label, button, tooltip.
5. **Map every asset** — every image, icon, and video with its local download path.
