# R03 — Skyriders landing review

Status: Ishe approved the interactive hero/navigation on 28 September 2026. R03-HI is implemented and locally verified; Ishe waived a separate approval step for that task. The access/approach section is a new draft for review. Services, industries, contact and the service template remain provisional examples. No deployment is approved.

## Current review: hero and navigation only

- Three Ishe-supplied Skyriders photographs form a single hero: `skyriders-bg-1.jpg` (facade access), `skyriders-bg-2.jpg` (steel structure) and `skyriders-bg-3.jpg` (team). The photos are editorial images, not attributed case studies. The headline and two useful paths stay readable over each image.
- The three photographs crossfade automatically while the hero is visible and idle. Pointer hover, keyboard focus, a hidden tab and reduced-motion preference stop progression. There are no thumbnails, progress bars or other next-image indicators.
- The navigation stays at the top during page scroll, without its former white divider. The hero holds position while the following section scrolls over it. On short viewports (700px high or less), the hero scrolls normally so its content remains reachable.
- The mobile menu uses larger editorial type. Opening it blurs and darkens the page beneath, and the menu can close through its control, backdrop, Escape key or navigation selection.
- Numbered visual markers were removed from the hero, section labels, service rows and service template. Names and section meaning carry the hierarchy.
- A short entrance and small scroll-triggered text reveals add movement without hiding content when JavaScript is absent. The supplied Elios image has restrained movement in the lower provisional Sky I section.
- The interaction study staggers the logo, navigation, eyebrow, headline, supporting copy, paths and vertical label. Lower sections and the provisional service example reveal their text, media and links as they enter view. Links, imagery and menu items respond to hover and keyboard focus. Copy and links stay in the document and visible without JavaScript; reduced motion removes the movement.

## Review evidence — 28 September 2026

The photograph-control checks below describe the earlier implementation; Ishe subsequently removed those controls.

- Browser checked at 1440 × 900, 390 × 844 and 320 × 700. The 320px layout has no horizontal overflow. All three supplied hero JPEGs returned HTTP 200; labelled photograph controls change the active image and `aria-pressed` state.
- The mobile menu opens above the blurred page, moves focus to its first link, and Escape closes it while returning focus to Menu. A narrow viewport with the review toolbar still set to Desktop initially hid the menu; the responsive CSS was corrected and rechecked.
- Browser console returned no warnings or errors during the checked interactions. Automatic image rotation pauses on hover, focus, hidden tab and reduced-motion preference by design; R03-HI checks are recorded below.

## R03-HI validation — 28 September 2026

The touch scene-selection and scene-progress checks below also describe the earlier implementation. The current hero has automatic crossfades with no selection UI.

- Chrome touch emulation at 390 × 844 CSS px and DPR 3: a touch event selected the steelwork scene, a touch opened the mobile menu, and a touch on Services closed it and navigated to `#services`. Document width remained 390 CSS px throughout.
- With `prefers-reduced-motion: reduce` emulated, the first scene remained active beyond the 6.5-second rotation interval (checked after 7.2 seconds). The scene transition was `0s`; scene progress was hidden; the heading had no entry animation. Document width remained 390 CSS px. This validates the browser implementation, not a physical handset's operating-system setting.
- Chrome's **actual Page zoom setting** was changed from 100% to 200% in a temporary test profile, with a 1440 × 900 physical viewport. The page reported `innerWidth: 720`, `devicePixelRatio: 2`, and `scrollWidth: 712`. The mobile menu displayed and opened; its bottom was at CSS px 448 in a 450px-high viewport. The hero heading, links and photograph controls remained in natural vertical flow. Screenshots: `tmp/r03-hi-zoom-200.png` and `tmp/r03-hi-zoom-200-menu.png`.
- The checks ran against the local Skyriders `/home/` development server. Touch input was browser-emulated; a physical touch device was not available in this session. Earlier pointer, keyboard, static HTML and separate brand build checks remain recorded in `docs/STATUS.md`.

## Later hero/navigation refinement — 28 September 2026

- The Skyriders header is sticky across `/home/` and has no bottom border. It uses a solid dark background so navigation stays legible over the light sections. Anchor targets account for the 95px desktop or 72px mobile header.
- At 1440 × 900, the hero remained at viewport top while the access section moved over it (`scrollY: 900`, access section top: 15px). At 390 × 844, the hero remained at top during the same transition; the sticky menu opened after scrolling and Services closed it, landing at `#services` with the section top at 88px, below the 72px header.
- Photograph thumbnails and progress indicators were removed from markup and CSS. At 320 × 700, the hero scrolls normally; root minimum width was removed after a 15px horizontal scrollbar appeared with a classic vertical scrollbar. The final 320px check measured `clientWidth: 305` and `scrollWidth: 305`.
- JavaScript enables the sticky hero after hydration; without JavaScript the hero stays in normal flow. As the following section covers the hero links, those links become inert and leave the keyboard focus order; returning to the top restores them. Browser checks confirmed this at desktop scroll positions.
- `npm run typecheck`, `npm run lint` and the Skyriders production build passed after the refinement. No deployment was attempted.

## Desktop hero fit correction — 28 September 2026

- Ishe's 24-inch monitor screenshot showed the earlier oversized headline wrapping into five lines, with the supporting copy and links below the visible browser window. The desktop headline now scales with viewport width and height, the text column is wider, and the vertical spacing is tighter. The hero height equals the visible viewport so the following section starts below it.
- At a 1900 × 910 CSS px viewport matching the screenshot's visible browser area, the hero bottom was 910px and both hero links ended at 806px. At 1366 × 768, links ended at 646px; at 1024 × 768, at 627px; at 1900 × 800, at 681px. The full headline, copy and both links were visible without scrolling in each checked desktop viewport. A 390 × 844 mobile check retained its natural-flow layout.
- `npm run typecheck`, `npm run lint` and the Skyriders production build passed. The page was not deployed.

## Rope technician refinement — 29 September 2026

- Ishe supplied `public/skyriders/rope-tech.png` and marked the start, middle and end positions in three screenshots. The original is preserved; an identical copy is served from `web/public/images/skyriders/rope-tech.png`. The fixed decorative artwork enters from behind the sticky header, sways subtly, and follows native document scroll progress. Its top rope is extended when the artwork moves below its own image height.
- Headless Chrome at 2048 × 1024 measured artwork bottom positions of 165px at page start, 581px halfway and 996px at page end. Adding 1200px of content left the end at 996px. At 390 × 844 the positions were 142px, 479px and 816px, with the longer page still ending at 816px. At 320 × 700 the end was 672px. All three viewport widths had zero horizontal overflow. Screenshots are in `tmp/rope-desktop-*.png` and `tmp/rope-mobile-*.png`.
- At 390 × 844 with reduced motion emulated, the artwork stayed at its start position after scrolling to the end. The image loaded in all checked sizes. `npm run lint`, `npm run typecheck` and the Skyriders production build passed. This was local browser emulation, not a physical handset test; no deployment was attempted.

## Next decision

Review the access/approach section now in the local `/home/` route. `alpha.md` records the full section sequence and individual acceptance checks.

## Boundaries

The preview is a disposable design artifact. Its non-hero links may point to review sections rather than finished routes. The local Next.js `/home/` links target actual page anchors, the existing Sky I destination and the currently published Skyriders email; the email needs owner confirmation before launch. The service template has not been approved for rollout. No deployment is authorised by this review.

## Hero and pre-landing motion revision — 30 September 2026

Ishe approved the plan and required distinct photograph-change choreography with full mobile support. The local Next.js `/home/` is the current review surface; the older HTML preview does not contain this revision.

The hero now displays `rope-hero-1` through `rope-hero-4`. Four reveal silhouettes (lateral opening, aperture, vertical peel, split opening) use a monotonically increasing sequence to vary direction, origin, geometry, camera scale, easing and duration; subsequent photo loops do not replay the exact keyframe/timing recipe. These families are a controlled visual vocabulary, not infinitely new animation categories. Desktop photography has small pointer depth; mobile has separate crops, a clear photographic area below the header, smaller camera/reveal movement and natural flow on short screens. Pointer presence over the photo does not freeze progression. Only controls/focus-visible interactions and menus pause it; touch does not leave an artificial mouse-hover pause behind.

The shared pre-landing drone has more noticeable station-keeping, plus small pointer translation/tilt. Its technician gets small rope-axis sway and pointer response. The `/home/` scroll follower and its CSS are untouched. The letter-scramble implementation and hover styling are preserved. No new dependencies, stock media, client claims, lower-section rollout or deployment.

Validation artifacts: `hero-refresh/verification.json` and `details.json`; desktop, mobile, small, landscape, zoom-equivalent, no-JS and four mobile photograph PNGs in the same directory. Drivers: `tmp/verify-hero-refresh.mjs` and `tmp/verify-hero-details.mjs` (use the bundled Playwright runtime and installed Chrome).

- Eight CSS viewport sizes: 1440x900, 1900x800, 1366x768, 1024x768, 390x844, 320x700, 844x390 and 720x450. All have zero horizontal overflow; desktop hero links remain in view. At 320x700/landscape the content remains reachable through natural scrolling. Hero link targets are at least 44px high.
- Normal-time progression continues with the pointer over the hero; pointer depth responds. Visible keyboard focus pauses the photograph; covering the hero pauses it and makes covered links inert.
- Twelve successive complete keyframe/timing signatures differ across three photo laps. This stress test accelerates timers and native animation playback; the layout checks and first hover/focus checks use normal playback. Four distinct initial reveal families are verified.
- Touch emulation at 390x844/DPR2: the menu opens, closes and resumes the hero without a persistent mouse-hover state; Services closes the menu and lands at 88px, below the 72px header. A Skyriders choice tap opens `/home/`. Menu bottom is 437px.
- Reduced motion on load leaves photo 1 still. Enabling it during a reveal settles a full, unclipped photo and holds the sequence; restoring the preference resumes it. Page lifecycle freeze/resume leaves content usable.
- Without JavaScript, photo 1, readable copy and real anchor navigation are present. The inactive menu button is hidden. Blocking photo 2 causes the sequence to skip it and show photo 3, preserving usable hero copy. No unexpected browser errors were captured.
- First-photo preload plus responsive image requests; copies are byte-identical to Ishe's originals. Warm localhost dev observation: LCP 172ms, CLS 0.000265; no throttling/field data, so these are not publication performance claims. Desktop four-photo decoded transfer is 707,382 bytes before other assets. Portrait-cover `sizes` account for the wider intrinsic photo crop to avoid soft mobile images.
- Lint, typecheck and separate Skyriders/Sky I production builds pass. No physical handset, new actual Page zoom or cross-browser run in this revision; 720x450 is the CSS viewport equivalent of a 1440x900 window at 200%. P06/P07/R03-L remain open for their full matrix.

Next section remains R03-A. New lower sections should use motion suited to their content rather than reusing the hero reveal recipes.

## Brand-entry handoff and roadmap — 30 September 2026

Ishe requested an expressive departure from the shared scene into each individual website, preservation of the unused photographs and a stronger, non-generic development plan. `alpha.md` now makes distinct brand worlds, section-specific motion, no default information tiles/vague CTAs/timelines, and an accurate 3D asset path part of future acceptance. Remaining Skyriders sections have concrete visitor purposes and compositions; Sky I has its own theme/concept/model/hero/equipment/inspection/application/closing/integrated-review tasks. `motion-ledger.md` records current protected signatures and future roles. `reference-riotters.md` records live browser sampling and its limits.

`BrandEntry.tsx` provides the navigation response: the selected scene draws closer; Skyriders uses a warm edge pull and vertical release into its photograph, whereas Sky I uses a cool perspective plane and a depth reveal. Desktop durations are 410ms departure and 480ms arrival; mobile uses 280/320ms. The overlay is decorative, does not capture focus/pointers and does not wait for image downloads. Same-origin entry uses the existing Next router. Cross-origin entry adds an allowlisted `_entry` marker for the receiving site, which is removed from history on arrival. A prepaint marker prevents an unbranded flash; a 900ms CSS deadline clears the cover even if client scripts fail. A stalled request restores the original scene after 1800ms. Direct entry, normal Back, reduced motion and no-JS links remain usable; cached-document restoration clears the departure effect.

Evidence: `hero-refresh/entry-verification.json`, two entry PNGs, and `tmp/verify-brand-entry.mjs`, `verify-entry-recovery.mjs`, `verify-entry-script-failure.mjs`. Verified same-origin pointer/keyboard entry, actual separate local Sky I origin (3006), marker cleanup, Back, touch at 390x844, reduced motion, no JS, direct arrival, modified-click handling left unprevented, delayed-route recovery, and blocked client-script fallback. The native modified-click contract was inspected with a cancelable event; a new-tab UI was not part of the successful automated evidence. No unexpected browser errors in the navigation matrix. The separate local Sky I production test server was temporary, with only test-DOM link overrides; public hosting/URLs were not changed. Lint, typecheck and both brand builds pass.

The current Sky I `/home/` is still its earlier implementation. Its new entry theme is not a completed Sky I redesign. Unused `skyriders-bg-*` originals remain reserved for subsequent sections. Next: R03-A, an intentional access/approach composition with assigned real photography, reviewed on desktop and mobile.

## Hero-to-approach scroll wipe — 30 September 2026

Ishe requested the marked animation at https://weevolveit.com/ while explicitly preserving our colours. Live browser scrolling showed a light front entering from below, developing an irregular ink edge and spreading across the preceding dark surface; reverse scrolling exposed the dark surface again. The screenshot's circle is annotation, not the geometry of the effect. The adaptation uses an original procedural SVG contour with displacement detail, never their source/media or page layout.

`HeroSectionWipe.tsx` adds a decorative edge to Skyriders `/home/` approach. The section still moves through native page flow over the sticky hero. Scroll position changes the edge's vertical extent and contour; a single queued frame updates it, with no autonomous loop, scroll interception or React state updates per frame. A small responsive SVG band limits the filter area. It shares the existing mineral ivory (#f0ece3); photographs, layout, copy and all other palette values are preserved. The extended front also informs covered-link inertness and photography pause. Navigation and the rope follower remain above the section. RopeTechnician.tsx and LetterMotion.tsx hashes match the previous protected hashes.

Reduced motion and no JS show the plain section boundary. Preference changes midway remove/reinstate the edge at the current scroll position. Short screens retain the existing naturally scrolling hero. On mobile, progress uses the stable layout viewport height, and hero/section ResizeObservers account for settling copy/fonts. A literal hidden server SVG path avoids server/browser floating-point hydration mismatches before client geometry is generated.

Production Chrome evidence: `hero-wipe/verification.json`, five middle-transition PNGs plus reduced-motion/no-JS PNGs; driver `tmp/verify-hero-wipe.mjs`. Layouts: 1440x900, 390x844, 320x700, 844x390 and 720x450 (responsive zoom equivalent). All have zero horizontal overflow, stable document height during scrolling, deterministic reversal and sticky-header visibility. Covered hero interactions are inert and covered/offscreen photography pauses; naturally scrolled-off links on short screens retain normal anchor behaviour. Desktop keyboard About activation and mobile touch-emulated menu/About activation land below the header (111px desktop, 88px mobile). Reduced-motion mobile Services and no-JS About links work. Preference interruption/resume passes. No browser errors, including hydration errors. Lint, typecheck and separate Skyriders/Sky I builds pass. No physical handset, actual browser zoom, network-throttled performance or new cross-browser measurement in this bounded refinement.

R03-HW is complete. R03-A remains the next decision: the approach composition is still provisional, and this transition request does not approve it or deployment.

## R03-HW2: scroll-only spreading refinement — later 30 September

Ishe requested faster, uninterrupted morphing through the page, then clarified that the surface should consume/spread over the hero and that all motion must respond exclusively to scrolling. The final implementation has no independent animation clock or idle loop. Native scroll travel drives contour phase and filter texture without the old initial-transition ceiling; the rise remains bounded, with its approved subtle start and increasing intensity. Reverse scrolling restores the same geometry, and stopping freezes it immediately.

The entrance band is broader (120–280px desktop, 160px mobile) with moving breaks/flecks. After covering the hero, it becomes a narrow 56px desktop/44px mobile edge beneath the sticky navigation, remaining visible/responding through the last page scroll. It uses each section's existing background and the existing header charcoal; no new palette values. Rendering stays a single queued scroll/resize frame. The decoration sits directly under the main element so later section stacking contexts cannot cover it. Anchor margins are 145px desktop/115px mobile to clear the edge. Protected rope/letter motion and original imagery remain intact.

`hero-wipe/verification.json` and the middle/end PNGs now represent this revision. Five production Chrome layouts pass idle stability at the main transition and page bottom, deterministic scroll reversal, morph response over the final 45px of page travel, visible pinned edge across four page fractions, zero horizontal overflow, unchanged document height, covered hero inertness/pause, desktop keyboard and touch-emulated mobile anchors, reduced-motion interruption/restoration and no-JS links. No browser errors. Lint/typecheck and both brand builds pass. These supersede the earlier narrower, capped contour and its 111/88px anchor offsets. R03-A, physical-device/cross-browser/performance and deployment gates remain open.

## R03-HW3: connected seam and supplied video — later 30 September

Ishe's `Screenshot 2026-09-30 083612.png` exposes the defect: the entrance switched to a small pinned header strip before the approach reached it, leaving a horizontal band of photograph between two ivory areas. R03-HW2's narrow pinned-border interpretation is superseded. The front now stays attached to the approach as both scroll past the header. Its contour remains scroll-only, uncapped and reversible; stopping freezes it. No independent header strip, snap threshold or idle animation. A final unfiltered SVG base closes the join beneath the displaced contour. Original 111px desktop/88px mobile anchor margins are restored; imagery, colours, follower and letter motion are preserved.

Video: `C:/Users/ISHE-GAMING/Videos/scroll-effect.mp4`, 2560x1392, duration 10.366633s. FFmpeg/ffprobe were unavailable; bundled Chrome decoded the original over a temporary loopback-only range server. No upload, installation or original-file alteration. `tmp/inspect-scroll-video.mjs` captured exactly eight frames; metadata and PNGs are in `hero-wipe/reference-video/`. Approximate observations in the sampled frames:

| Time | Observed covering front |
| --- | --- |
| 0.000s | Irregular light edge near the bottom, dark hero above; light surface remains joined below |
| 1.296s | Front rises to around the viewport middle and covers the review area |
| 2.592s | Front reaches/passes the header; the light surface is uninterrupted below it |
| 3.887s | Reverse scroll brings the joined front back toward the middle |
| 5.183s | Front returns close to the bottom; hero is exposed again |
| 6.479s | Only a thin portion of the front remains at the bottom |
| 7.775s | Forward scroll raises the connected surface into the lower-middle viewport |
| 9.071s | Front rises toward the middle again with changed contour detail |

These samples establish position/coverage/reversal, not exact easing or intermediate-frame motion. They show no separate pinned border after the covering front passes the top.

Updated production Chrome evidence: `hero-wipe/verification.json`, six header-join/middle/end PNG sets, reduced-motion/no-JS PNGs. Viewports: 2533x1249 (owner screenshot dimensions), 1440x900, 390x844, 320x700, 844x390 and 720x450. At each size the front's base remains at approach top +1px through seven positions spanning the former snap threshold and header, checked in both directions. No pinned class/straight photograph gap. The attached surface continues offscreen naturally. Zero overflow/stable document height, deterministic reversal, idle stability, final-scroll contour response, covered-link inertness/photography pause, keyboard/touch anchors, preference interruption/restoration and no-JS navigation all pass. No browser errors. Lint/typecheck and both configured builds pass. Physical-device/cross-browser/performance and deployment gates remain open. Exact next task: R03-A.
