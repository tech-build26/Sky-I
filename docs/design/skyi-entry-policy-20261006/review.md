# Pre-landing entry and word-effect policy — 6 October 2026

Review from http://localhost:3006/: choose Sky I, rather than testing only direct /home/ refresh. Owner visual acceptance remains open.

## Fix and behaviour

Soft navigation could start the hero's first effect pass before the handoff cover cleared. Development Strict Mode setup/cleanup cancelled those animations after marking elements introduced, leaving the following pass with nothing to animate. An old persisted manual-pause setting was another suppression path. Startup is now scheduled for the next frame and waits for brand-entry-ready/idle cover state, with a bounded fallback. Preliminary cleanup cancels its scheduled frame without consuming introduction markers. BrandEntry emits readiness only after its cover is idle. Direct visits and fast/late event races use the DOM-state check. No new loading gate or source dependency.

All manual pause controls, toggle component, styles, persistence/subscription and toggle API are removed per the owner's explicit request. Old localStorage state is ignored. This overrides earlier pause-control design/skill defaults. System reduced-motion, visibility/offscreen, menu and keyboard safeguards stay automatic.

Hover and keyboard-focus scrambling is allowlisted on navigation links/controls and the three drone selection labels. It is removed from hero titles, descriptions, benefit/outcome text, intro, vertical label and action buttons. Eyebrow/title/description load/scene word effects remain. Benefit/outcome words scramble once on home introduction, including below-fold words on narrow layouts, and remain static on later hovers, menu transitions and scene changes. Buttons retain their existing non-scramble fill/text-roll/arrow/magnetic treatment. Three scene photography, type, 24px drone lift, unboxed composition and service-route deferral are preserved.

## Evidence

Lint and typecheck clean; isolated Next.js 16.3.8 production build passed. Public canonical, compulsory public sister root and no-localhost output passed the production check. No package/asset/version changes. Redundant build-added tsconfig includes removed; existing wildcard coverage retained.

verification.json records 14 successful Chrome checks with zero page exceptions. Both the main Sky I choice and brand-logo choice were activated from the actual root, including Back/repeated entry. Tests seed the retired skyi-motion-paused=true setting. More than 15 independent hero entrances are observed after the overlay is idle, with readable load text resolving correctly. Titles, descriptions, intro, benefit text and buttons do not scramble on hover. Navigation/drone labels do scramble and resolve. Scene two repeats title/description entry effects without repeating bottom benefit words. Actual keyboard modality holds the photograph while comparing hover behaviour so a timed scene change is not mistaken for a hover effect.

Touch-emulated 390px/320px root-to-home entry and menu/Escape pass without horizontal overflow or pause UI. Reduced motion remains static, and 320px no-JS root-to-home navigation/readable heading passes. Screenshots: desktop-scene-two.png, mobile-390.png, mobile-320.png (local, ignored). Chrome emulation is not a physical-device or multi-engine certification.

Exact next task: Ishe reviews from the pre-landing, then continues remaining landing sections. Parent visual approval, service inventory/claims and hosting gates remain; no upload or deployment.
