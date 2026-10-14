# Skyline entrance and landing choreography — 7 October 2026

Review at http://localhost:3006/ by entering Sky I, then scrolling /home/. No deployment; final visual approval remains with Ishe.

## Owner scope

One animated hero entrance instead of static content followed by a second appearance; brief spectacular skyline handoff using skyline.png; slower animation throughout all landing sections; remove marked About bands and photo controls; hide the fixed main logo outside the hero; adapt pasted React testimonial columns with nine smaller tiles and no profiles. The supplied ERP quotes are reference/demo content. Ishe explicitly authorises writing fictional local/regional sample quotes while the client supplies real data; preview labelling remains clear. No skills used.

## Implementation

- Persistent night-city cover spans navigation, perspective flight, lit typography, light sweep, reflected horizon and orbital line. It reveals a hero already in motion. Direct home is guarded before paint; below-fold hero elements enter on intersection. Slideshow timing starts at reveal. Bounded fallback, Escape and reduced preference release the page.
- About begins with its remote-view heading; threshold, identity/signoff bands and photograph caption/toggle are absent. Supplied photograph/crop/frame and native story remain.
- One lower-page controller owns finite entries for headings, paragraphs, links, summaries, form labels, imagery and footer. Copy/controls take 1250ms, photo/drone 1650ms with restrained stagger. Existing About/Impact controllers retain reversible depth only. Hidden/offscreen/menu suspension, no menu replay, focus exposure and preference/static paths remain.
- Fixed main logo fades before crossing into lower content, contracts its mobile slot and returns at the hero. Footer retains its own small signature.
- Nine illustrated testimonial voices, not real endorsements or regional work evidence. Three/two/one columns, slow loops, masked edges, compact tiles, no profile images and an accessible static Read all nine mode. Replace samples with approved content before publication.

## Evidence

- Final npm lint, typecheck and isolated Next.js 16.3.8 production build pass; no dependency added.
- `entry-frames-production-desktop.json` captures all four phases. Hero directional transform/opacity progresses while the cover is still opaque/fading, and continues smoothly after the cover is hidden. `entry-frames-production-mobile.json` plus settled mobile capture confirms the route release and no inert page left behind. `entry-frames-dev.json` is the initial development timing probe.
- `responsive.json` is the authoritative final-build six-size check: 1440×1000, 1024×768, 768×1024, 390×844, 320×700, 740×390. Every quote window has state complete/opacity 1, nine unique original tiles, zero profile images and no document overflow. Corresponding final captures: testimonials-1440/1024/768/390/320/740.png.
- `section-final.json`: final desktop About/Services/Sectors/Impact/Contact/footer entrances settle, About photograph opacity 1, main fixed logo opacity 0 below hero and 1 after Back to top. Paired section-desktop-final.png captures show those settled compositions.
- `interactions.json`: Enter opens/closes About story, selects Window washing and opens Mining; Read all nine exposes nine originals/hides duplicates, and returns to motion. Console error capture is empty.
- `mobile-menu-focus.json`: mobile menu opens/closes; Tab from Name reaches Email, whose animated label is immediately visible. Main logo remains hidden.
- Original and served skyline SHA256: DBBABE6B95A910D125ADE3580FC792DBBF94E74DFDB23F561FF4BD0AFC43107B. Original artwork untouched.

The initial long-column observer could hide mobile quotes; final code observes a stable section trigger and animates the fixed quote window. Final six-size captures supersede early mobile scroll/column captures. The old About/Impact entrance controllers were removed so animation ownership is unambiguous.

## Limits and next task

No-JS/reduced-motion/failure paths inspected in source; not live-emulated in this pass. Actual devices, other browser engines, field performance, sent-email delivery and deployment readiness are not established by these checks. Ishe reviews the skyline/whole-page experience under S03-L and supplies approved testimonials, then agrees S04-A page scope. Keep confidentiality, public-origin restoration and hosting gates open.
