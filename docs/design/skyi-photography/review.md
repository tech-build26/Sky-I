# Sky I photography revision

1 October 2026. Latest owner instructions supersede the equipment/type/palette parts of `design.md`: Sky I uses different drones, avoid Elios focus, use background images and match Skyriders colours. Current scope remains hero only.

The hero uses existing locally hosted Cormorant for the large headline and Jost for navigation/body, charcoal `#111b20`, ivory `#f0ece3`, bronze `#d8af7b`. The two background scenes are owner-supplied `hero-bg.jpg` (industrial panorama) and a CSS crop of the **left-hand tank surface** in `sky-bg.jpg`. The second frame's container is 330% of the visible width, keeping the aircraft outside the visible crop. The source originals and pre-landing are untouched. There is no replacement drone, model claim, aircraft-stage image, hotspot, scan or numerical specification on this hero.

The headline addresses the inspection outcome rather than an aircraft model. Native details opens inspection-to-intervention context inside the hero, with a real sister-company link. No working-looking enquiry submission or unbuilt route is added. Navigation exposes only current hero/context/sister destinations. Independent wordmark and mobile menu are retained. Later enquiry/backend/landing sections are not built.

Photography fades every nine seconds. Reduced motion/no JavaScript shows a complete static frame. Pause, keyboard focus on controls, menu-open, hidden document and offscreen state stop rotation. An unavailable image falls back to the other scene; if both fail, charcoal keeps text readable.

Evidence: `verification.json`, representative 1440/390/768/280 PNGs and `tank-detail.png`; driver `tmp/verify-skyi-photography.mjs`. Existing Sky I development server: http://localhost:3006/home/. All 24 supplied viewports pass document overflow, headline fit, wordmark/menu separation, matching palette/type, single-section scope and native details interaction. Menu focus trap/Escape/restoration, no JS, reduced motion, background progression/pause/preference change, failed background loads and preserved Sky I-left pre-landing touch/Back also pass. No unexpected browser errors. Both brand production builds, lint and typecheck pass.

Limits: Chrome viewport/touch emulation and development-server browser checks, not physical devices or production performance. No Lighthouse scores, Safari/Firefox verification or live deployment claimed. Owner approval remains open. Further current drone inventory and matching owner-approved drone imagery are needed before any aircraft-specific content is revisited.
