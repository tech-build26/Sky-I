# Sky I effect ledger

Authority: `design.md` §7.2. Updated 1 October 2026. Current implementation scope: hero only.

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
