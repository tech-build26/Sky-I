# Hero choreography and spacing — 6 October 2026

Review: http://localhost:3006/home/. Implements the owner's full hero animation request and subsequent slight drone-section lift. Visual acceptance remains with Ishe; no service-detail routes or deployment.

## Motion allocation

One scoped native WAAPI controller adds bounded entrance choreography to the existing composition. Logo image arrives from above while its independent GSAP scroll contraction stays on the parent link. Navigation shell moves from the right, with links entering alternately from above/below. Eyebrow enters from the top; masked headline lines rise/fall or arrive laterally according to scene placement, with a brief full-word scramble. Description comes from the opposite side. Every newly mounted photograph message gets its own entrance; existing gallery lateral/aperture/vertical reveals remain, with gentle CSS camera drift.

Service back/front words enter independently around their images. Internal aircraft arrives from the left, external aircraft from below and washing aircraft from the right, then settle into independently phased CSS hover/roll. Fine pointer gives bounded translate/roll to the image layer, preserving supplied geometry. Caption slides into place on hover/focus and remains readable on touch. MotionButton arrives inside a separate wrapper so its existing fill/text-roll/arrow hover and magnetic response do not conflict with entrance transforms. Intro line, vertical label, sister rail, benefit text/icons and outcome statement have allocated entrances. No new runtime dependencies or generated assets.

ScrambleText keeps original accessible text alongside stable measured visual word boxes. Only the aria-hidden ink changes; letters are shuffled, not typed or progressively inserted. Whitespace, punctuation/case positions and visible letter count remain intact. Visual words resolve in about 560–660ms. One throttled animation frame loop manages active words, without React frame-by-frame renders. Pointer hover and keyboard focus trigger the same effect. Pause/reduced motion disable it. Hidden/offscreen/menu/pause cleanup cancels pending entrance work, restores words and removes pointer offsets. Resume does not replay already introduced elements. A discrete nav pause/resume icon controls hero motion; no removed footer/inline pause text was restored. Existing unrelated content and button-label edits were preserved.

## Spacing refinement

The entire drone section uses translate: 0 -24px. The benefit row keeps its original flow position. spacing.json measures an exact 24px lift and 24px extra visible gap at 1440×900, 1366×768, 390×844 and 320×700, without horizontal overflow. This does not add hero height or push benefits lower on shorter screens. Text and buttons remain in the same row structure. Screenshot: spacing-desktop.png.

## Validation

Lint and typecheck clean; Next.js 16.3.8 isolated production build passed. No dependency/version changes. Build-generated explicit .next-hero-review tsconfig entries are redundant with existing wildcard includes and removed before handoff.

verification.json: 23 successful Chrome checks, zero page exceptions. Initial entry spans more than 15 independently animated targets and multiple direction recipes. Six hover targets (navigation, title, description, drone lettering, button and benefit) visibly scramble then resolve. Stable measured text dimensions and original accessible heading/link names verified. Keyboard resolves correctly. Global pause holds the current slide beyond its interval and leaves zero running hero animations. Second/third scene text and choreography verified. Service links still open the correct disclosures and offscreen effects stop.

Eight settled responsive layouts: 1366×768, 1280×720, 1024×768, 768×1024, 600×800, 390×844, 320×700 and 844×390. No horizontal overflow; buttons/header controls fit. Touch captions, mobile menu, Escape/focus restoration and mobile pause passed. Reduced motion leaves readable still copy with no scramble/slideshow/hero animations. No-JS desktop/320px heading and Safety navigation work. Screenshots remain local/ignored; JSON and notes are retained. Tests use Chrome emulation; no physical handset or additional browser-engine claim.

Exact next task: Ishe reviews animation pacing and the raised drone section, then continues remaining landing-section refinement. S03-H/S03-N final visual acceptance and existing claims/host gates remain open.
