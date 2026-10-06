# design.md — Sky I (Industrial Drone Inspections)

Single source of truth for brand, content, design system, motion, SEO and QA.
The build prompt (`BUILD_PROMPT.md`) tells the agent HOW to build; this file says WHAT to build.

Legend: **[CONFIRMED]** = found in public sources · **[VERIFY]** = plausible, owner must confirm before publishing · **[FILL]** = owner must supply

---

## 1. Brand

| Item | Value |
|---|---|
| Brand name | **Sky I** (always written "Sky I", never "SkyI" or "Sky-Eye" in UI copy) |
| What it is | Industrial drone inspection company, the drone department of Skyriders, now its own brand |
| Sister company | **Skyriders Access Specialists**, industrial rope access / work at height — https://ropeaccess.co.za (new Skyriders site is being built separately by the owner; link target must be an env variable) |
| Relationship | Sister companies that complement each other. **Sky I inspects, Skyriders does the work.** Sky I finds and documents; Skyriders repairs, tests and maintains |
| Positioning line | **See inside before anyone goes in.** |
| Tone | Precise, calm, confident, engineer-to-engineer. No hype, no buzzwords, no exclamation marks |
| Audience | Plant managers, maintenance and reliability engineers, asset integrity managers, procurement and OHS leads in heavy industry |
| Client names | **Never published.** Clients do not allow it. Refer only to industries and anonymised scenarios ("a power station boiler", "a mining smelter stack") |
| Logo | Owner to supply. Treat as an independent floating element (see §6.2). Until supplied, use a text wordmark placeholder "Sky I" |
| Language / locale | English, South Africa (`en-ZA`) |

### 1.1 Facts gathered (public sources)
- **[CONFIRMED]** Skyriders began using drones for on-site inspection as part of a turnkey offering with rope access. Drone work gives access to confined spaces that may be too dangerous for client technicians. (Engineering News, March 2020)
- **[CONFIRMED]** A visual inspection of an average-sized power station boiler can take days or weeks with traditional access such as scaffolding; with a drone it takes about an hour and needs only an operator and an assistant. (Engineering News, March 2020)
- **[CONFIRMED]** Drone footage is streamed live to the operator and recorded to SD card or tablet storage. Findings can then be followed up with focused visual or NDT inspection by rope access technicians. (Engineering News, March 2020)
- **[CONFIRMED]** In 2018 the team used an Elios drone (Flyability, Switzerland) for a three-day inspection of lead and copper smokestacks and a cooling tower at a mining operation in Namibia, its first drone job outside South Africa. A six-person rope access team followed with detailed visual inspection, core sampling and hammer testing. Client name must NOT be shown. (Engineering News / Mining Weekly, 2018)
- **[CONFIRMED]** Turnkey workflow: drone visual inspection → detailed inspection by rope access → repairs by rope access → drone used again as quality control to verify the repairs. (Mining Weekly, 2018)
- **[CONFIRMED]** The drone result lets engineers and plant owners build a more focused inspection plan around the areas of concern.
- **[CONFIRMED]** Skyriders staff include operators trained as drone specialists (three at the time of the 2020 article) and technicians skilled in NDT. [VERIFY current numbers before using any figure]
- **[CONFIRMED]** Skyriders' core markets: power generation and petrochemical, plus mining, furnaces/kilns and related heavy industry.
- **[FILL]** Anything further on ropeaccess.co.za (services copy, certifications, safety stats, team, project list, recent contact details). The site blocks automated access, so the owner must paste these in §11.

### 1.2 Elios 3 (primary aircraft)
Owner has transparent PNG: `Elios_3.png` (place in `/public/images/`).

- Manufacturer: Flyability (Switzerland). Collision-tolerant caged drone designed for confined spaces: tanks, boilers, stacks, pipes, tunnels, silos, mines.
- Flight time: over 12 min 30 s (base), over 9 min with the LiDAR payload fitted.
- Payload bay: modular, two ports, one dedicated to LiDAR, one for auxiliary payloads (e.g. radiation survey, ultrasonic thickness testing).
- LiDAR: Ouster OS0, 32 beams; LiDAR payload rated IP68. Live 3D map built in flight (SLAM). Aircraft is rated IP44 by some retailers' listings. [VERIFY before publishing]
- Sensors: IMU, magnetometer, barometer, LiDAR, three computer-vision cameras, time-of-flight distance sensor.
- Flies indoors with no GPS. Recovers from collisions and flips. Noise about 83 dB(A) with LiDAR.
- Full flight data download in about 3 minutes.
- Use these as "telemetry" numbers in the HUD, each flagged [VERIFY] until the owner approves.

---

## 2. Services (landing + future pages)

Names are working titles, [VERIFY] with owner.

1. **Confined-space visual inspection** — boilers, furnaces, kilns, ducts, flues, tanks, silos, cooling towers
2. **Stack and chimney inspection** — internal condition survey without scaffolding or shutdown-length access
3. **LiDAR mapping and 3D models** — point clouds, volumes, as-found geometry, change over time
4. **Ultrasonic thickness readings via drone** — only if Sky I owns the payload [VERIFY]
5. **Post-repair verification** — second flight to confirm repairs after Skyriders' work (the quality-control loop)
6. **Inspection reporting** — annotated imagery, defect logs, 3D data handed over in client-ready form
7. **Pre-shutdown scoping** — a one-hour look that decides where humans actually need to go

## 3. Industries (anonymous, no client names)

Petroleum and petrochemical · Mining · Power generation · Construction and civil · Cement and kilns · Steel and smelting · Water and wastewater · Chemicals · Pulp and paper · Oil and gas storage · Renewable energy · Heavy manufacturing

Each has a custom line icon (§6.7). Icons must be drawn in one consistent stroke style (1.5 px, round caps, 32 px grid), as inline SVG components, not an icon font.

---

## 4. Information architecture

Phase 1 (build now): **Landing page only**, locked to perfection.
Later phases (do not build yet, but route placeholders and nav entries allowed):
`/services`, `/industries`, `/technology` (Elios 3), `/process`, `/projects` (anonymised case studies), `/safety`, `/about`, `/contact`, `/insights` (blog for SEO).

Global elements: independent logo, floating nav, sister-company link, footer, cookie/consent banner (POPIA-aware), WhatsApp quick contact [FILL].

### 4.1 Landing page sections (in order)

| # | Section | Purpose | Signature mechanic (used ONCE, see §7) |
|---|---|---|---|
| 0 | Boot sequence | 1.2 s branded intro, then reveal | LiDAR point-cloud assembles into the Sky I mark |
| 1 | Hero | Position + Elios 3 interactive | Pointer/gyro tilt-and-fly PNG with hotspot callouts |
| 2 | Statement | One-line promise | Per-letter mixed-style type reveal |
| 3 | The Pair | Sky I + Skyriders loop | Pinned horizontal flight path, SVG line draws itself |
| 4 | The Plant | Services | Isometric blueprint of an industrial plant; each structure is a service hotspot |
| 5 | Inside | Confined-space pitch | Scroll-driven tunnel fly-through (rings rushing at the viewer) |
| 6 | Time | Days vs 1 hour | Draggable time-compression comparator |
| 7 | The Aircraft | Elios 3 specs | Telemetry HUD with odometer digit rolls |
| 8 | The Data | LiDAR deliverables | Live WebGL point cloud, rotatable, density tied to scroll |
| 9 | Industries | Who we serve | Seamless dual-row infinite marquee with icons |
| 10 | Pre-flight | Safety and method | Checklist that types and ticks itself as it enters view |
| 11 | Request | Contact | Magnetic-field form with live "flight plan" summary |
| 12 | Footer | Links + sister link | Giant outlined wordmark that fills with colour as you scroll to the end |

---

## 5. Copy deck (draft, owner to approve)

**Hero**
- Eyebrow (mono, small): `INDUSTRIAL DRONE INSPECTION · SOUTH AFRICA`
- Headline (three lines, three styles): `SEE INSIDE` / `before anyone` / `GOES IN.`
- Sub: Collision-tolerant drones fly the places scaffolding takes weeks to reach. You get answers in hours, with 3D data.
- Primary action label: **Request an inspection**
- Secondary action label: **Meet the Elios 3** (scrolls to §7)

**Statement:** "Dangerous to enter. Slow to scaffold. Quick to fly."

**The Pair**
- Heading: **One finds it. One fixes it.**
- Steps: 01 Inspect (Sky I) → 02 Report (Sky I) → 03 Repair (Skyriders) → 04 Verify (Sky I)
- Sister link label: **Skyriders, our rope access sister company ↗** (opens in new tab, `rel="noopener"`)

**Time:** "A boiler survey: days to weeks on scaffold. About an hour in the air." (source: industry press, see §1.1)

**Industries heading:** "Heavy industry, quietly."

**Request:** Heading "Send us the asset." Fields: Name, Company, Email, Phone, Industry (select), Asset type (select), Location, "What needs to be seen?" Submit label: **Plan the flight**

**Banned CTA copy (hard rule):** "Learn more", "View more", "Read more", "Click here", "See more", "Discover", "Explore now", "Get started". Use verbs tied to the real action: *Request an inspection, Plan the flight, Meet the Elios 3, Open the data, Call the control room*.

---

## 6. Visual design system

### 6.1 Colour (CSS custom properties in `:root`)
```
--void:      #05070A   /* page background */
--graphite:  #0B1016   /* surfaces */
--steel:     #151D28   /* cards, panels */
--line:      #243040   /* hairlines */
--mist:      #8FA0B5   /* secondary text */
--ice:       #EAF2FF   /* primary text */
--lidar:     #3DFFB0   /* primary accent: LiDAR green */
--lidar-dim: #14A66F
--cyan:      #35D4FF   /* secondary accent: scan beam */
--amber:     #FFB020   /* "defect flagged" accent, use sparingly (max 1 per view) */
--danger:    #FF4D5E   /* form errors only */
```
Gradients: `--grad-scan: linear-gradient(90deg, var(--cyan), var(--lidar))`. Contrast: all text ≥ WCAG AA (4.5:1). Provide a light-surface inversion only for the form panel if needed.

### 6.2 Logo and navigation
- Logo is **independent**: `position: fixed; top/left` with safe-area insets, **not inside the nav element**. Size `clamp(72px, 9vw, 132px)`. Sits above everything (`z-index` highest), gets `mix-blend-mode` or a soft backing glow so it stays legible on any section. On scroll it shrinks to ~70% (once, smoothly), never disappears.
- Navigation is a **detached floating pill**, top-right on desktop/tablet-landscape, with glass effect (`backdrop-filter: blur(14px)`). It is not a full-width bar and does not hold the logo.
- Nav items (phase 1): Services · Aircraft · Industries · Request. Active item shows a traveling underline indicator.
- **Mobile menu:** a menu button (44×44 px minimum) opens a full-screen overlay with `backdrop-filter: blur(24px) saturate(1.2)` over a dark tint, links stagger in large display type, logo stays visible above the overlay, scroll locked while open, focus trapped, `Esc` closes, `aria-expanded` and `aria-controls` set. Contact details and the sister-company link sit at the bottom of the overlay.
- Sister-company link appears in: nav overlay, The Pair section, footer, and as a small fixed edge tab on desktop ("Part of the Skyriders family").

### 6.3 Typography (via `next/font`, self-hosted, `display: swap`)
- **Display:** Syne (800) for huge headlines
- **UI/body:** Space Grotesk (400/500/700)
- **Telemetry/labels:** JetBrains Mono (400/500), uppercase, letter-spacing 0.12em
- Mixed lettering rules (per section, never the same combo twice in a row):
  - **Solid** huge words
  - **Outlined** words (`-webkit-text-stroke: 1.5px var(--ice); color: transparent`)
  - **Small mono** captions in line with big words
  - **Colour-tail**: the last 1–3 letters of a word carry a cyan→green gradient that animates in (subtle, background-clip text)
  - Italic or lowercase for contrast against all-caps lines
- Fluid sizes with `clamp()`. Display: `clamp(2.75rem, 9vw, 9rem)`. Body: `clamp(1rem, 0.95rem + 0.3vw, 1.125rem)`. Never below 16 px body on mobile.

### 6.4 Layout rules
- Mobile-first CSS. Layout via **CSS Grid and Flexbox only**; no floats, no fixed pixel widths on containers.
- No default three-equal-card rows anywhere. Each section has its own composition (see §4.1). Use asymmetric grids, overlaps, offset columns, sticky columns, and diagonal clip-paths.
- Container: `width: min(100% - 2*var(--gutter), 1440px)`; `--gutter: clamp(16px, 4vw, 56px)`.
- Use `svh/dvh/lvh` units, never bare `100vh` for hero or pinned sections.
- Respect `env(safe-area-inset-*)` for notches.

### 6.5 Background and texture
Layered: near-black base, faint blueprint grid (CSS gradient lines at 4 % opacity), subtle film grain (SVG noise, 3 %), occasional radial LiDAR glow behind the aircraft. No stock photography in phase 1. No videos in phase 1 (slots reserved with `<VideoSlot />` component showing a poster-style placeholder; video added later).

### 6.6 Patterns (the owner is particular about these)
Use a distinct pattern per section; never repeat one:
dot-matrix (hero), blueprint grid (The Plant), concentric rings (Inside), diagonal hazard hatch (Time, amber, thin), crosshair ticks (Aircraft HUD), contour/topographic lines (The Data), hex lattice (Industries), scanline (Pre-flight), faint isometric cube grid (Request), radial rays (Footer).

### 6.7 Industry icon set (inline SVG, consistent stroke)
Fuel/oil drop, mining pick and rock, cooling tower, transmission pylon, crane/construction, kiln/furnace, smelter ladle, water drop with pipe, flask, paper roll, wind turbine, factory gears, storage tank, pipeline valve. One React component per icon, `currentColor`, `aria-hidden`, labelled by adjacent text.

---

## 7. Motion and interaction

### 7.1 Stack
Next.js App Router · React · **GSAP + ScrollTrigger** (scroll choreography) · **Lenis** (smooth scroll, synced to ScrollTrigger) · **Motion (framer-motion)** (UI state transitions, menu) · **React Three Fiber + drei** (point cloud only, lazy) · CSS keyframes for micro-motion. Disable smooth scroll on touch where it harms native feel; keep native momentum on iOS.

### 7.2 Effect ledger — THE ONE-USE RULE
Each effect below is assigned to **one** place only. The agent must keep a ledger in `/docs/effects-ledger.md` and never reuse an effect anywhere else on the site (including future pages unless explicitly approved).

| Effect | Used for | Not allowed elsewhere |
|---|---|---|
| Point-cloud assemble | Boot intro | yes |
| Tilt + inertia fly + hotspots | Hero aircraft | yes |
| Per-letter stagger rise with blur-to-sharp | Statement | yes |
| Pinned horizontal scroll + SVG path draw | The Pair | yes |
| Isometric hotspot reveal (stroke-dashoffset) | The Plant | yes |
| Z-axis tunnel zoom | Inside | yes |
| Drag-scrub comparator | Time | yes |
| Odometer digit roll | Aircraft HUD | yes |
| WebGL points | The Data | yes |
| Infinite marquee | Industries | yes |
| Typewriter + tick | Pre-flight | yes |
| Magnetic attraction | Request form and primary buttons | yes (cursor only) |
| Outline-to-fill on scroll | Footer wordmark | yes |
| Clip-path wipe | Section-to-section transitions: **only one wipe style per boundary, each boundary different** | yes |
| Slide-in from left / right / bottom / diagonal / rotate-in | Distribute so no two adjacent sections use the same entry direction or easing | rotate each |

"Lots of slide-ins" is wanted: every block enters (no static blocks), but each entry has a different direction, distance, easing and stagger to avoid sameness.

### 7.3 Hero aircraft interaction (Elios_3.png)
Because it is a flat transparent PNG, fake convincing depth:
1. **Layered depth:** render the PNG plus a derived blurred shadow layer, a radial glow layer, and a cage-shaped ring (SVG) at different parallax depths.
2. **Pointer tilt:** `perspective(1200px) rotateX/rotateY` driven by pointer with spring smoothing (max ±12°).
3. **Drag to fly:** pointer drag moves the drone with inertia and a slight roll; releasing lets it drift back to hover with a soft idle bob (translateY sine, 6 s).
4. **Scan beam:** a cyan sweep line masked to the PNG alpha (CSS `mask-image` with the PNG) passes over every few seconds.
5. **Hotspots:** 4 pulsing markers (Cage, LiDAR, Cameras, Payload bay) that open small mono-type callouts, keyboard focusable and tap-friendly.
6. **Mobile:** replace pointer tilt with drag, optional gyroscope tilt after a permission tap (iOS `DeviceOrientationEvent.requestPermission`), never auto-prompt.
7. **Scroll:** as the page scrolls out of the hero the drone scales, rolls and exits along a curved path, then the Aircraft section picks it up again statically with hotspots (no repeat of the tilt effect).
8. Respect `prefers-reduced-motion`: swap to a single fade and static hotspots.

### 7.4 Performance for motion
Animate only `transform` and `opacity`. `will-change` set just-in-time. Pause offscreen animation with IntersectionObserver. Lazy-load WebGL and GSAP plugins per section. Cap DPR at 1.5 on mobile; reduce particle counts on low-memory devices (`navigator.deviceMemory`, `hardwareConcurrency`). No layout thrash.

### 7.5 Accessibility for motion
`prefers-reduced-motion: reduce` disables parallax, tunnel, marquee movement (shows a static wrapped grid), and replaces entries with 150 ms fades. Provide a visible "Pause animations" toggle in the footer.

---

## 8. Responsive specification (critical)

### 8.1 Breakpoints and device matrix
Fluid first; named layout shifts at: **360 · 480 · 640 · 768 · 1024 · 1280 · 1536**. Dedicated **tablet layouts** at 768–1023 (portrait) and 1024–1279 (landscape and small laptops); tablets must not just inherit mobile or desktop.

Test and sign off at these viewports (portrait and landscape where relevant):
320×568 · 360×800 · 390×844 · 412×915 · 430×932 · 600×960 · 744×1133 · 768×1024 · 810×1080 · 820×1180 · 834×1194 · 1024×768 · 1024×1366 · 1112×834 · 1180×820 · 1280×800 · 1366×768 · 1440×900 · 1536×864 · 1920×1080 · 2560×1440 · plus foldables (280 wide cover screen, 884×1104 unfolded) and phones in landscape (e.g. 844×390).

### 8.2 Hard rules
- No horizontal scroll at any width (`overflow-x: clip` on body plus fixing the cause).
- Touch targets ≥ 44×44 px; spacing between targets ≥ 8 px.
- Hover-only behaviour must have a tap/focus equivalent (`@media (hover: hover) and (pointer: fine)` for hover effects).
- Pinned/scroll-jacked sections: on tablet and mobile either use a simplified vertical version or pin with `svh`, and call `ScrollTrigger.refresh()` on resize and orientation change. This addresses past tablet issues: address-bar resize jumps, pinned sections clipping, and 100vh miscalculation.
- Use `gsap.matchMedia()` so each breakpoint gets its own timeline and cleanup.
- Images use `sizes` correctly; Elios PNG exported as AVIF/WebP at 480/768/1080/1600 widths.
- Fixed logo never overlaps the menu button or hero headline; test at 320 px.
- Forms: `inputmode`, `autocomplete`, 16 px inputs (prevents iOS zoom), visible labels.

---

## 9. SEO and discoverability (built in from day one)

### 9.1 Keyword strategy
Primary: industrial drone inspection South Africa · confined space drone inspection · drone boiler inspection · Elios 3 inspection · indoor drone inspection · LiDAR drone mapping South Africa
Secondary: stack inspection drone · cooling tower inspection drone · tank inspection drone · silo inspection drone · mine drone inspection · power station drone inspection · petrochemical drone inspection · NDT drone · drone inspection Gauteng / Johannesburg / Witbank (eMalahleni) / Mpumalanga · rope access and drone inspection
Long-tail: how long does a boiler inspection take with a drone · is drone inspection safer than scaffolding · confined space entry alternative
The agent must **validate and expand this list with live keyword research** (search results, People Also Ask, related searches) before finalising metadata. Map one primary keyword per page; avoid cannibalisation.

### 9.2 Technical SEO checklist
- Next.js Metadata API: unique `title` (≤ 60 chars), `description` (≤ 155), canonical, `openGraph`, `twitter`, `robots`, `alternates`, `metadataBase`, `viewport`, `themeColor`
- Landing title pattern: `Sky I | Industrial Drone Inspections in South Africa`
- `app/sitemap.ts`, `app/robots.ts`, `opengraph-image` and `twitter-image` generated
- **JSON-LD:** `Organization`, `ProfessionalService`/`LocalBusiness` (with `areaServed`, `sameAs` linking Skyriders), `Service` list, `FAQPage`, `BreadcrumbList`, `WebSite`. Validate with Google Rich Results Test
- One `<h1>` per page, logical heading order, semantic landmarks (`header, nav, main, section, footer`)
- Descriptive `alt` text with natural keywords; no keyword stuffing
- Internal links between future pages, plus **reciprocal link to Skyriders** (`rel="noopener"`; no `nofollow` since it is a sister company, owner may choose)
- Clean URLs, `lang="en-ZA"`, `hreflang` if more languages are ever added
- Core Web Vitals targets (mobile, field-like): **LCP < 2.5 s, INP < 200 ms, CLS < 0.1**; Lighthouse mobile ≥ 95 Performance, 100 SEO, ≥ 95 Accessibility, ≥ 95 Best Practices
- Google Search Console and Bing verification slots, Google Business Profile [FILL], analytics with consent (GA4 or Plausible)
- Animated content must still be server-rendered in the DOM so crawlers see all text (no text only injected after scroll)
- Include an FAQ section on a later page to win rich results

---

## 10. Performance budget
- Landing initial JS ≤ 180 kB gzip excluding lazy chunks; Three.js chunk loads only when The Data section nears viewport
- Fonts: max 3 families, subsetted, preloaded, `font-display: swap`
- Hero LCP element is the headline or aircraft image with `priority`; no layout shift from fonts (use `next/font` size-adjust)
- Images AVIF/WebP, correct dimensions, lazy below the fold
- No third-party scripts before interaction except consent-gated analytics
- Run `next build` analyzer; remove unused libraries; code-split per section

---

## 11. Owner-supplied data (to complete before launch)

> The Skyriders site could not be read automatically (it blocks crawlers). Paste the recent details from https://ropeaccess.co.za/ here. These are the ones the site must use. Do not use old numbers found in press articles.

```
Company legal name:        [FILL]
Phone (main):              [FILL]
WhatsApp:                  [FILL]
Email (enquiries):         [FILL]
Physical address:          [FILL]
Operating hours:           [FILL]
Regions served:            [FILL]  (e.g. Gauteng, Mpumalanga, Limpopo, North West, Namibia, rest of Africa)
Social links:              [FILL]
Registration / VAT:        [FILL]
Certifications:            [FILL]  (e.g. SACAA RPAS Operator Certificate, remote pilot licences, ISO, safety ratings)
Insurance statement:       [FILL]
Safety stats:              [FILL]  (LTIFR etc., only if the owner wants them public)
Number of pilots / years:  [FILL]
Logo files (SVG):          [FILL]
Elios_3.png:               provided (transparent)
```

South African regulation note: commercial RPAS work is governed by SACAA (Part 101). Only mention an RPAS Operator Certificate or pilot licences if they are held and the owner confirms. Never claim a certification that is not confirmed.

---

## 12. Quality gates (definition of done for the landing page)
1. Every section built, labelled, and matching §4.1
2. Effect ledger shows zero duplicates
3. Zero banned CTA phrases (automated grep)
4. Every viewport in §8.1 checked with no overflow, overlap or clipped pinned content
5. Mobile menu: blur, focus trap, scroll lock, logo visible
6. Lighthouse mobile targets in §9.2 met; `next build` passes with no warnings
7. Reduced-motion and keyboard-only paths verified
8. Metadata, JSON-LD, sitemap, robots validated
9. All [VERIFY] facts either confirmed by owner or removed
10. Link to Skyriders works and uses the env variable
