# Sky I effect ledger

Current authority: 6 October owner pre-landing entry correction and restricted word-effect policy, including explicit removal of manual pause controls. S03-H8 below supersedes earlier hover/pause allocations; 24px drone lift remains.

## S03-H8 current policy — entry and restricted word effects

Hero introduction defers past the Strict Mode preliminary effect pass and the BrandEntry cover; readiness event/DOM check plus bounded fallback handle entry races. Saved manual pause is retired and all manual pause UI removed by explicit owner instruction. Reduced-motion/static and hidden/offscreen/menu/keyboard suspension stay automatic.

Hover/focus word shuffle belongs only to navigation controls/links and drone selection labels. Eyebrow/title/description words run on scene introduction; intro/vertical and bottom benefit/outcome words run once on home introduction. Bottom words do not repeat for hover, menu or slide changes. Buttons retain fill/roll/magnetic treatment with stable letters. Native slide/aircraft choreography and 24px lift remain. Evidence: docs/design/skyi-entry-policy-20261006/review.md. Older allocations below are superseded where they differ.

| Effect | Sole allocation | Status |
| --- | --- | --- |
| Point-cloud assembly | Boot intro | Deferred; no loader added |
| Tilt, bounded drag, soft hover, alpha-masked scan, native hotspots | Hero aircraft | Implemented; stopped offscreen, hidden, paused, reduced-motion, menu-open or hotspot focus/open |
| Per-letter rise / blur-to-sharp | Statement | Reserved; hero entrances animate complete lines, not letters |
| Pinned horizontal flight path / SVG draw | The Pair | Reserved |
| Isometric stroke reveal | The Plant | Reserved |
| Z-axis rings | Inside | Reserved |
| Drag-scrub comparison | Time | Reserved; unrelated to hero aircraft positioning |
| Digit-roll HUD | Aircraft section | Reserved; no unverified specs in hero |
| WebGL points | The Data | Reserved; no Three.js in initial build |
| Dual-row continuous marquee | Industries | Reserved within Sky I home; existing shared pre-landing remains unchanged |
| Typed checklist | Pre-flight | Reserved |
| Magnetic attraction | Primary CTA / future Request form | Implemented on hero primary CTA; fine pointer only, disabled by pause/reduced-motion |
| Outline-to-fill | Footer wordmark | Reserved; hero outlined text is static |
| Section boundary wipes | Future boundaries | Unassigned until sections exist |
| UI motion | Detached navigation / mobile overlay | Travelling indicator and staggered menu; separate from section signatures |
| Entrance choreography | Hero only | Eyebrow enters left, headline lines rise, copy lifts a shorter distance, aircraft scales/fades; static no-JS/reduced-motion path |

Independent wordmark contracts to 70% through the initial scroll range using scoped GSAP ScrollTrigger. Lenis runs only for fine-pointer desktop scrolling and is removed on pause, menu-open or reduced motion. No inter-section flight is implemented before there is a following section.

## S03-H4 superseding allocation

Owner removed the equipment focus. Hero tilt/drag/hotspots/scan and Syne entrances are retired from active source. Hero now owns a restrained two-scene photographic opacity fade and one whole-copy entrance, with Cormorant/Jost and Skyriders colours. Model-specific future effects are reserved only if the owner later approves appropriate current equipment. Existing pre-landing effects remain unchanged. UI menu, navigation indicator and initial wordmark shrink remain scoped to their existing UI roles. No other landing sections are implemented.

## S03-H5 active allocation (supersedes H4)

| Area | Signature and useful interaction |
| --- | --- |
| Hero scene 1 | Lateral dissolve and slight scale; original supplied panorama |
| Hero scene 2 | Circular aperture reveal into generated interior |
| Hero scene 3 | Vertical inset reveal into generated infrastructure |
| Decorative desktop drone | Slow hover/roll and bounded fine-pointer perspective; unlabelled; stopped hidden/offscreen/menu/paused/reduced-motion |
| Gallery UI | Previous/next and direct scene selection, global pause, failure-aware progression, keyboard focus suspension; no live announcements for automatic rotation |
| About | Short lateral editorial entry |
| Services | Vertical entry and native details disclosures |
| Industries | Opposite lateral entry; keyboard/touch sector context selection |
| Approach | Subtle scale entry; static ordered editorial text, no graphical timeline |
| Contact | Slight rotation/uplift entry; live asset/location/question summary and validated draft/download |
| Existing UI | Floating nav indicator/mobile overlay and scroll-shrinking wordmark retained |

No new motion dependency. Section entries use native WAAPI/IntersectionObserver; useful content is visible without script. Reduced motion presents static sections and manual instantaneous slide selection. Full global pause removes active WAAPI work, desktop smooth scrolling and decorative drone movement. Pre-landing and protected Skyriders motion are unchanged.

## S03-H6 active allocation — 6 October

Hero photographs keep lateral/aperture/vertical reveal families; synchronized message and centre/right/offset-left placements now accompany them. Scene 1 is the requested generated SC35 illustration. Previous/next/numbered UI retired. Automatic rotation and its bounded reveal cancel on pause, menu, hidden/offscreen or visible keyboard focus. Reduced motion/no JS use scene one. Failed photography falls back through surviving scenes, then solid charcoal with readable copy.

## S03-H7 active allocation — hero choreography and spacing

Native WAAPI entry waves cover logo image/top, nav shell/right, alternating nav links/top-bottom, masked headline/rise-fall or lateral, eyebrow/top, description/opposing side, three aircraft/left-up-right, layered service words, button wrappers, benefit icons/text, vertical label and sister rail. Each photograph's mounted message gets new choreography. Camera scale/translation and irregular drone drift remain transform-only CSS; existing nav UI and scroll-logo logic retain their owners. Hover gives bounded drone pointer depth, layered label movement, caption slide, button fill/text roll/arrow/magnetism and icon response.

Whole-word scramble/resolve is hero/header-scoped. Fixed measured word boxes and separate original accessible text prevent changing layout or assistive names. Only visual ink shuffles; no typing. Punctuation/case slots and full character count remain. One throttled frame loop, no React per-frame state. Hover/focus equivalence, pause/reduced/static paths, menu/hidden/offscreen cleanup and a discrete nav motion icon apply. No new dependency or alteration of supplied artwork. The 24px upward translation of the whole service group creates a gap above benefits without moving the benefit row down. Technical evidence and owner-review gate: docs/design/skyi-hero-motion-20261006/review.md.

Three transparent service drones: CSS transform-only drift/roll, independent phases; stop hidden/offscreen/menu/paused/reduced-motion and for focused service controls. Hover grows the image slightly, raises the foreground service word and reveals the caption; keyboard focus is equivalent. Touch/no JS always show captions. Label layering is actual z-order around preserved cutouts, not a 3D model. MotionButton owns one bronze fill/vertical text roll/arrow-turn interaction; no additional dependency. Labels and buttons navigate to native service disclosures pending dedicated routes. Clean benefit icons are static. Larger fixed logo retains the independent scroll contraction without increasing navigation height. Existing lower-section motion/pre-landing remains intact.
