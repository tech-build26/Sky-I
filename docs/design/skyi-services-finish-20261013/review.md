# Services background finish — 13 October 2026

S03-N12 follows Ishe's acceptance of the asset-led preview. Requests: background per asset; modestly shorter height; a different purposeful transition for each selection. Follow-up: varied image treatments, transparency at selected edges, monochrome and an overarching readability gradient. Preserve blue drawings and controls. Full service routes/expansion remain deferred.

Existing imagery (not modified or regenerated):

| Asset | Existing decorative image | Treatment / reveal |
| --- | --- | --- |
| Boilers & ducting | /images/skyi/service-m1.jpg | Low saturation, left-edge transparency; central band opening |
| Tanks & silos | /images/skyi/about-tank-20261013.png | Cool desaturation, bottom-edge fade; circular iris |
| Towers & stacks | /images/skyi/about-stack-20261013.png | Monochrome, left-edge fade; rising reveal |
| Buildings & roofs | /images/skyi/about-facade-20261013.png | Subdued colour, asymmetric edge fade; stepped band unfold |
| Thermal inspection | /images/skyi/inspection-infrastructure.png | Near monochrome, top/bottom fade; vertical aperture |

The owner-requested backgrounds reuse authorised illustrations. Thermal's image is environmental context, not a fabricated thermogram or inspection finding. All images are decorative, not actual projects/clients/equipment inventory evidence. About generator masters/provenance remain in its assets.md; originals are untouched.

A fixed shared charcoal/mineral-blue gradient covers all background layers. Blue #01b0fc drawings, headings and focus remain in independent foreground elements. CSS filters/masks vary the photographs without editing their raster files. Native named details select the matching layer using attribute-based :has selectors; CSS Modules ID scoping was caught and corrected in the first browser pass.

Five finite 950ms clip/transform transitions plus 380ms opacity replace a generic crossfade. New clicks directly retarget the native state, without queues/timers/autoplay. Existing SkyIReveals owns foreground entries. An observer and the existing reduced/menu context settle imagery offscreen, hidden or during the menu; CSS preference also removes transition timing. Closing the menu does not replay. Next Image optimises existing assets; eager, low-priority fetch prepares choices without elevating these backgrounds over the hero. Initial lazy images were caught taking too long to be ready for selection, then corrected and all five loaded states rechecked.

The section's own padding overrides the shared landing spacing; heading spacing, selection rows and schematic height contract. Desktop preserves clear spacing above the closing strip; 1024px has a larger reserve for text wrapping. Tablet/mobile keep panels beneath their own selection and the previous tap/keyboard correction. Matched 1440px element captures: 1383px before, 1124px after (18.7% shorter). Mobile remains naturally scrollable; no fixed-height clipping.

Validation:

- Final ESLint, TypeScript, isolated Next.js 16.3.8 production build and whitespace checks pass.
- Seven development Chrome widths: 1440, 1920, 1024, 768, 390, 320, 740. Every asset's background loads, selects uniquely and retains no document overflow/detail-vs-closing collision. `layout.json`, desktop asset and mobile PNGs.
- Production captures measure distinct intermediate masks for all five choices and settled opacity 1/no running background animation. Rapid 80ms selection sequence leaves exactly the latest requested image. `verification.json`, `transition-*.png`.
- Production live reduced-motion changes are immediate. Keyboard Enter, all three hero destinations/open state/focus, direct thermal fragment, public canonical/no localhost links pass.
- Actual production 390px touch taps across all five choices retain selected-summary header clearance and visible enquiry actions. 320px no-JS selection and images work through native details/CSS. Aborted images preserve readable copy, drawings and enquiry links. No captured page exceptions. `touch.png`, `no-js.png`, `failed-art.png`.
- Production mobile menu settles background transitions, closes via Escape and does not restart them. `menu.json`.

Limits: Chrome emulation does not establish physical-device/cross-engine or field-performance acceptance. Publication claims and integrated owner approval remain separate; no deployment/package.

Next: Ishe reviews http://localhost:3006/home/#services, then continues individually scoped lower-section reviews. Safety/Projects and full service routes remain deferred.
