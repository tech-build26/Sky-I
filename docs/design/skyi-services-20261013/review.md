# Sky I service preview — 13 October 2026

S03-N11 implements the owner's request for a distinctive, responsive introductory service section. Full service pages remain deferred. Source: supplied company brochure, physical PDF page 8 / printed 7, and the official drone-inspection page checked on 13 October: https://www.ropeaccess.co.za/services/drone-inspection/. `profile-page8.png` is the rendered research page; it is not a public-site asset.

Five asset contexts replace repeated hero choices: boilers/ducting; tanks/silos; towers/stacks; buildings/roofs; thermal inspection. Copy gives an inspection question, a scoped explanation and concrete applications. Thermal suitability/equipment stays brief-dependent. Window washing remains the owner-confirmed offer in a separate disclosure. Aviation credentials, legal-entity assumptions, named clients, guarantees and optional-payload ownership are omitted.

The composition uses a continuous unboxed editorial index with a conceptual SVG drawing and highlighted inspection areas beside it on desktop. Below 1024px, each detail opens beneath its own choice; below 640px drawing and text stack. Illustrations represent asset areas, not actual equipment/scan data/projects. Native named details support keyboard and no-JS selection. Existing hero IDs remain; JavaScript assists direct fragment opening and selected-hero focus/clearance. Contact actions use the actual #contact anchor; no deeper route is invented.

Palette: About ends and Services starts at #111b20; static mineral-blue gradient; #01b0fc shared emphasis/focus/schematic features. Back to top uses the same accent. Supplied photographs and product originals remain preserved. No generated assets, new dependency or environment setup.

Motion: existing SkyIReveals owns finite copy/control/drawing entrances; reduced motion stays static. Arrow feedback uses transform only. Former image preload, 12-column shutters, autoplay, stateful transition and reset timers are removed. Native disclosure is the interaction owner, with no automatic selection changes.

Validation:

- Final ESLint, TypeScript and isolated Next.js 16.3.8 production build pass; whitespace check passes.
- Production Chrome at 1440x1000, 1920x1080, 1024x768, 768x1024, 390x844, 320x700 and 740x390: all five selections, exactly one named disclosure open, blue emphasis, no horizontal overflow, and detail panels remain above the closing strip. `layout.json`, `section-*.png`, `preview-*.png`.
- Desktop and 390px touch-context keyboard Enter/Space disclosures, action visibility, native window prompt and inline mobile details pass. All three hero links open their matching disclosure, move focus to its summary and retain header clearance. Direct thermal fragment opens on reload. No captured page exceptions. `verification.json`; touch-context keyboard checks are distinguished from the explicit production tap below.
- 320px no-JS disclosure selection/actions and 390px reduced motion pass. `no-js.png`, `reduced.png`.
- Final production captures at 1440, 390 and 320 include a real touch tap on Tanks & silos and a no-JS mobile view. Public canonical and sister root, no localhost links pass. `production.json`, `production-*.png`.

Limits: Chrome emulation is not physical-device or cross-engine acceptance. Standalone service expansion, current legal/aviation identity and publication claim gates remain open. Ishe's visual acceptance is separate from technical checks. No deployment or package.

Next: owner reviews http://localhost:3006/home/#services beside the accepted hero/About. Continue lower-section review; Safety/Projects and dedicated service routes remain deferred.

S03-N11 final touch refinement: explicit asset selections on widths below 1024px retain the selected summary below the header when closing its preceding disclosure shifts it above the viewport. Initial hydration/direct unrelated anchors do not trigger this correction. Production five-asset tap sequence passes at 390px with summary clearance, alongside final lint/typecheck/build. Evidence: docs/design/skyi-services-20261013/touch-selection.json and touch-selection.png.
