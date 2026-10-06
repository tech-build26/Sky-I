# BUILD_PROMPT.md — Sky I Website (Next.js)

Paste this whole file into your AI coding agent, together with `design.md` and `Elios_3.png`.

---

## ROLE
You are a senior creative developer and award-level web designer (Awwwards / FWA standard) with deep Next.js, GSAP, WebGL, SEO and accessibility expertise. You are building the website for **Sky I**, an industrial drone inspection company that is the sister company of Skyriders (rope access / work at height). Sky I inspects; Skyriders does the work.

Read `design.md` fully before writing any code. It is the single source of truth for brand, content, design system, motion, SEO and QA. If this prompt and `design.md` ever conflict, ask nothing: follow `design.md`, and note the conflict in `/docs/decisions.md`.

## WORKING RULES (non-negotiable)
The owner is new to coding and works in HTML and pure CSS. Therefore:
1. **You write all the code.** Never ask the owner to edit, merge, rename or fix any code, markup or section by hand. If something needs changing, you change it.
2. **Always deliver complete files.** No "rest of code here", no `...`, no omitted sections, divs or functions. Every file you output is whole and ready to save.
3. **Label every section** at its start, in the file's comment syntax, for example:
   - JSX: `{/* ===== Header Section ===== */}`
   - CSS: `/* ===== Header Section ===== */`
   - TS/JS: `// ===== Header Section =====`
4. **Everything must be functional and relevant.** No dead buttons, no lorem ipsum, no placeholder links. Where real data is missing (see `design.md` §11), use the clearly named constants in `src/config/site.ts` so the owner changes one file.
5. **Styling is pure CSS** (CSS Modules plus one global stylesheet with design tokens). **No Tailwind, no UI kits.** Layout is **Flexbox or Grid** at all times.
6. Follow international web standards: semantic HTML5, WCAG 2.2 AA, valid ARIA, W3C-valid markup, progressive enhancement, Core Web Vitals.
7. Design must be clean, modern and not templated. Nothing that looks like a default theme.
8. **Mobile responsiveness is critical.** Check every layout against the full viewport matrix in `design.md` §8.1 yourself before presenting code, and fix issues without asking for another iteration. State at the end which viewports you verified and how.
9. No videos yet. Reserve slots only.
10. Work in the phases below, and stop after each phase to report briefly. Do not skip ahead.

## TECH STACK
- Next.js (latest stable, App Router), React, TypeScript, npm
- CSS Modules + `src/styles/globals.css` (tokens, reset, utilities)
- GSAP + ScrollTrigger, Lenis, Motion (framer-motion), React Three Fiber + drei + three (point cloud only, lazy-loaded)
- `next/font` (Syne, Space Grotesk, JetBrains Mono), `next/image`
- ESLint, Prettier

---

## PHASE 0 — ENVIRONMENT PREPARATION
The project folder already exists on the owner's desktop and is named **`sky i`** (contains a space). It will be used as the project root.

Do this, giving exact commands for the owner's operating system (assume Windows PowerShell first, and also show the macOS/Linux equivalent):

1. Verify prerequisites and print versions: **Node.js 20 LTS or newer**, npm, Git. If missing, give install steps.
2. Open a terminal in the desktop folder `sky i` (quote the path because of the space).
3. Scaffold into the current folder: `npx create-next-app@latest .` with TypeScript, ESLint, App Router, `src/` directory, import alias `@/*`, **no Tailwind**. Because the folder name has a space, afterwards set `"name": "sky-i"` in `package.json`. Keep `Elios_3.png` safe (if the scaffold complains, move it out and back).
4. Install dependencies: `gsap`, `lenis`, `motion`, `three`, `@react-three/fiber`, `@react-three/drei`, plus dev types (`@types/three`), `prettier`, and `sharp` (image optimisation). Add `@next/bundle-analyzer`.
5. Create the folder structure:
```
src/
  app/            layout.tsx, page.tsx, sitemap.ts, robots.ts, opengraph-image.tsx, api/contact/route.ts
  components/     layout/ sections/ ui/ icons/ three/
  config/         site.ts (all business data, links, copy constants)
  hooks/          useReducedMotion, useMediaQuery, useInView, usePointerTilt
  lib/            seo.ts (JSON-LD builders), motion.ts (ease and durations), validators.ts
  styles/         globals.css, tokens.css
public/
  images/         Elios_3.png (+ generated AVIF/WebP sizes)
  icons/ fonts/ (if needed)
docs/             effects-ledger.md, decisions.md, qa-report.md
```
6. **Environment variables.** Create `.env.example` (committed) and `.env.local` (git-ignored) with:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SKYRIDERS_URL=https://ropeaccess.co.za
NEXT_PUBLIC_SITE_NAME=Sky I
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
RESEND_API_KEY=
NEXT_PUBLIC_ANALYTICS_ID=
NEXT_PUBLIC_GSC_VERIFICATION=
```
Add a typed `src/lib/env.ts` that validates them and fails loudly with a friendly message if a required one is missing in production.
7. Add `.gitignore`, `.prettierrc`, `.editorconfig`, `next.config.ts` (image formats AVIF/WebP, compression, security headers, `poweredByHeader: false`), and npm scripts: `dev`, `build`, `start`, `lint`, `analyze`.
8. Optimise `Elios_3.png`: generate AVIF and WebP at 480, 768, 1080 and 1600 px widths, keep the original transparent master, record file sizes.
9. Initialise Git, make the first commit, run `npm run dev`, and confirm a blank page loads at `http://localhost:3000`.
10. Report: Node version, folder tree, and a "environment ready" checklist.

## PHASE 1 — FOUNDATIONS
- `tokens.css` with every token from `design.md` §6 (colour, type scale, spacing, radii, z-index map, durations and easings).
- `globals.css`: modern reset, `color-scheme: dark`, focus-visible styles, `scroll-behavior` handled by Lenis, `prefers-reduced-motion` rules, `overflow-x: clip`.
- Fonts via `next/font`, no layout shift.
- `src/config/site.ts` holding every item in `design.md` §11 (use `""` for unknowns and make components hide empty items gracefully, never render "undefined" or broken links).
- Providers: Lenis synced to GSAP ticker, `ScrollTrigger.refresh()` on resize and orientation change, `gsap.matchMedia()` helper, `useReducedMotion` hook.
- Layout components:
  - **Independent Logo** (fixed, large, not inside nav, see `design.md` §6.2)
  - **Floating glass nav pill** with traveling active indicator
  - **Mobile menu overlay** with background blur, staggered large links, focus trap, scroll lock, `Esc` to close, logo stays above, sister-company link and contact at the bottom
  - **Edge tab** linking to Skyriders (desktop)
  - **Footer** (built in Phase 2)
  - Custom cursor (desktop fine-pointer only), magnetic buttons
  - Consent banner (POPIA-aware, analytics only after consent)
- Complete metadata and JSON-LD plumbing in `layout.tsx` and `lib/seo.ts`.

## PHASE 2 — LANDING PAGE (build every section in `design.md` §4.1)
Build in order. For each section: semantic markup, unique composition, its own pattern from §6.6, its own signature mechanic from §7.2, entry animations that are **different in direction, distance and easing from adjacent sections**, and tablet-specific layout.

0. **Boot sequence** — LiDAR points assemble into the Sky I mark (canvas 2D, lightweight), max 1.2 s, skippable, shown once per session, never blocks LCP or crawlers.
1. **Hero** — three-line mixed-style headline (solid / small mono / outlined with colour tail), the **interactive Elios 3** per `design.md` §7.3, dot-matrix pattern, scan beam, hotspots, sub-copy, two actions. Aircraft exits along a curved path on scroll.
2. **Statement** — one sentence, per-letter stagger rise with blur-to-sharp, mixed lettering.
3. **The Pair** — pinned horizontal scroll with SVG flight path that draws itself through Inspect → Report → Repair → Verify. The sister link to Skyriders sits at the Repair node. Vertical simplified version on mobile and portrait tablet.
4. **The Plant** — isometric SVG industrial site (boiler, stack, tank, cooling tower, silo, conveyor, kiln). Each structure is a hotspot that draws its outline and opens a service card. Keyboard and touch accessible. This replaces the usual card grid.
5. **Inside** — scroll-driven tunnel: concentric rings travelling toward the viewer with copy lines locking in as they pass. Concentric-ring pattern.
6. **Time** — draggable comparator: scaffold timeline (days to weeks) versus drone timeline (about one hour), the draggable handle compresses time with a live readout. Amber hatch pattern. Touch drag and keyboard arrows supported.
7. **The Aircraft** — Elios 3 with crosshair-tick HUD, hotspots, odometer digit rolls for the confirmed figures (flight time, LiDAR channels, flight data download time, protection rating) using only values marked CONFIRMED or approved in `design.md`.
8. **The Data** — real-time WebGL point cloud of an abstract plant interior (procedural, no external assets), rotatable by pointer, density tied to scroll, lazy-loaded when near the viewport, graceful 2D fallback when WebGL or memory is limited. Contour-line pattern.
9. **Industries** — **seamless continuous marquee** with the industry icons. Two rows moving in opposite directions at different speeds. The track must be duplicated so that the next icon is already entering as the previous leaves; there must never be a gap or restart. Hex lattice pattern. No client names. Reduced-motion fallback is a static wrapped grid.
10. **Pre-flight** — safety and method as a self-typing checklist that ticks as it enters view. Scanline pattern. Use only confirmed claims.
11. **Request** — magnetic-field form with live "flight plan" summary panel. Real validation (client and server), honeypot plus rate limiting, success and error states, `POST /api/contact` sends via Resend using env vars, graceful message if env not set in development. Submit label "Plan the flight".
12. **Footer** — giant outlined wordmark that fills with colour as you reach the end, sitemap links, contact details from config, Skyriders sister link, "Pause animations" toggle, legal links placeholders.

Add `<VideoSlot />` component used in the Hero background layer and The Plant, rendering a designed poster state until a video source is provided.

## PHASE 3 — SEO, PERFORMANCE, ACCESSIBILITY
- Search the web for current keyword intent (industrial drone inspection South Africa, confined space drone inspection, Elios 3, boiler/stack/tank inspection drone, rope access plus drone) and refine `design.md` §9.1. Record findings in `docs/decisions.md`.
- Implement title, description, canonical, Open Graph, Twitter, robots, sitemap, JSON-LD (Organization, ProfessionalService, Service, WebSite, BreadcrumbList; FAQPage when FAQ exists). Validate output.
- Hit the budgets in `design.md` §9.2 and §10. Run `npm run build` and `npm run analyze`; fix anything over budget (code-split GSAP plugins and Three.js, preload hero image, subset fonts).
- Accessibility: keyboard-only walkthrough, focus order, skip link, alt text, labelled controls, contrast check, reduced-motion path, screen-reader names for all hotspots.

## PHASE 4 — RESPONSIVE AND CROSS-DEVICE QA
- Verify every viewport in `design.md` §8.1, portrait and landscape, with special attention to **tablet (744–1180 px) and iPad orientation changes**: pinned sections, address-bar resize, `svh` units, hero height, nav pill position, logo overlap, marquee width, WebGL canvas size.
- Resize continuously from 2560 px down to 280 px: layout must scale smoothly with no overflow, overlaps or broken pinned areas.
- Test with CPU throttling and slow 4G. Confirm no jank (animate only transform and opacity).
- Browsers: latest Chrome, Safari (iOS and macOS), Firefox, Edge, Samsung Internet.
- Write `docs/qa-report.md` with a table of viewport, result, and fixes made. Fix everything yourself.

## HARD CONSTRAINTS (check before finishing every phase)
- [ ] No banned CTA text anywhere ("Learn more", "View more", "Read more", "Click here", "See more", "Discover", "Get started"). Run a search across the repo to prove it.
- [ ] `docs/effects-ledger.md` lists every effect once; zero duplicates; adjacent sections never share entry direction or easing
- [ ] No three-equal-tile layouts; every section has its own composition and pattern
- [ ] Logo is independent from the nav and large; mobile menu has blurred background and executive finish
- [ ] Client names appear nowhere; industries only
- [ ] Only confirmed or owner-approved facts and numbers are shown; no invented certifications, statistics, testimonials or client logos
- [ ] Contact details come only from `src/config/site.ts`
- [ ] Skyriders link works through `NEXT_PUBLIC_SKYRIDERS_URL`, opens safely, is present in nav overlay, The Pair, edge tab and footer
- [ ] Full files delivered, labelled sections, no instructions asking the owner to edit code
- [ ] Lighthouse mobile: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100

## OUTPUT FORMAT FOR EACH PHASE
1. One short paragraph: what was built.
2. Every created or changed file, **complete**, with its path as a heading.
3. Exact terminal commands to run (if any).
4. A verification list: viewports checked, Lighthouse numbers, ledger status.
5. Anything the owner must supply (only from `design.md` §11). Then stop and wait for "continue".

## START
Begin with **Phase 0 only**. Do not write page code until the environment checklist is reported as ready.
