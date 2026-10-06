# Sky I hero QA

1 October 2026. Scope: new hero and its navigation only. Source: `design.md`, owner instruction to stop after hero.

Evidence: `docs/design/skyi-brief/verification.json`, six representative PNGs; driver `tmp/verify-skyi-brief.mjs`. Chrome headless with viewport/touch/reduced-motion emulation against existing Sky I **development** server, `http://localhost:3006/home/`. Both brands separately compile as production builds; this does not establish production runtime performance.

| Viewports | Result |
| --- | --- |
| 320×568, 360×800, 390×844, 412×915, 430×932 | Pass |
| 600×960, 744×1133, 768×1024, 810×1080, 820×1180, 834×1194 | Pass |
| 1024×768, 1024×1366, 1112×834, 1180×820 | Pass |
| 1280×800, 1366×768, 1440×900, 1536×864 | Pass |
| 1920×1080, 2560×1440 | Pass |
| 280×653 foldable cover, 884×1104 unfolded, 844×390 phone landscape | Pass |

All 24: no document horizontal overflow; headline stays within viewport; wordmark/menu do not overlap; exactly one main section; all four hotspot callouts fit and toggle. Desktop/mobile screenshots inspected. Wide Syne glyphs initially caused the first headline line and wordmark to wrap; corrected with measured type sizing and an unbroken wordmark. Mobile hotspots use a separate touch grid to preserve legibility rather than crowding the image.

Behaviour passes: mobile focus trap, reversible body scroll lock, Escape/restored opener focus, target focus after menu navigation; keyboard skip link focuses heading; bounded tilt/drag/reset; persistent pause and changing reduced motion; no-JS native hotspots/readable hero; supplied drone image failure; preserved Sky I-left / Skyriders-right pre-landing, touch selection and browser Back. No unexpected page errors.

Static source scan: no restricted client names or prohibited CTA strings in `web/src`. Lint, typecheck and both brand production builds pass. Next.js remains 16.3.6; dependency install audit reported zero vulnerabilities. No stock/generated media or client marks introduced.

Limits: no physical devices, Safari/Firefox/Edge/Samsung testing or actual browser 200% zoom in this turn. Lighthouse/field performance/SEO rich-results scores are **not measured**. The remaining page, backend enquiries, final contact/legal data, host packaging and deployment remain outside this hero-only scope.

Final visual pass: portrait tablets use a larger headline and offset aircraft underneath, with a separate landscape/compact-laptop composition. Increased separation between camera and payload hotspot targets. All 24 viewport/interaction checks pass again against the final source; both production builds pass again. The review remains hero-only.

## S03-H4 photography revision

Latest evidence supersedes H3's hero checks: docs/design/skyi-photography/verification.json and review.md, tmp/verify-skyi-photography.mjs. 24 Chrome viewports pass with Cormorant/Jost, Skyriders palette, no hero equipment-model language, two supplied backgrounds and working native details; mobile menu, no JS, reduced motion, background progression/pause, image failures and unchanged pre-landing touch/Back pass. Both brand production builds, lint/typecheck pass. Physical-device/other-browser/Lighthouse limits remain unchanged.

## S03-H5 interactive landing revision

Current evidence: docs/design/skyi-interactive/review.md, verification.json and PNGs; tmp/verify-skyi-interactive.mjs. All 24 Chrome layouts pass overflow, hero/section/field fit, logo/menu separation and desktop-only drone visibility. Seven behaviour groups cover full mobile navigation/focus, sector keyboard interaction, real brief download/email draft, three distinct recorded hero transitions/auto progression/pause/reduced-motion, no JS, image failure and both compulsory local pre-landing journeys. No page exceptions. Both production builds and lint/typecheck pass; production HTML uses public cross-brand roots without local overrides. Original first hero file preserved. Limits remain development-server Chrome emulation, no physical-device/other-browser/Lighthouse/field performance or backend delivery evidence. Visual acceptance and deployment remain open.
