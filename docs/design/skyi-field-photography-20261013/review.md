# Supplied field photography — 13 October 2026

Owner request: inspect the five newly supplied root photographs, consider their dimensions and place suitable images within the Sky I landing page without interrupting its flow. Follow-up explicitly allows selecting only the strongest images. Local implementation is authorised; integrated visual acceptance and deployment remain separate.

## Selection and dimensions

| Original | Pixels | File bytes | Decision |
| --- | --- | --- | --- |
| 1.jpeg | 1079 × 1555 | 948456 | Selected: recognisable caged drone, team and access opening together. Services / Boilers & ducting. |
| 2.jpeg | 739 × 415 | 62384 | Retained unused: small landscape with dominant vehicle branding/contact artwork; less useful than the equipment-in-context photograph. |
| 3.jpeg | 1080 × 1920 | 173350 | Selected: team arriving with equipment. Before we fly / Safety & preparation. |
| 4.jpeg | 1080 × 1424 | 131258 | Selected: an interior detail and team member complement the access-point photograph. Services / Boilers & ducting. |
| 5.jpeg | 940 × 788 | 79733 | Retained unused: another team-arrival view repeats 3.jpeg, with a strong existing branded corner. |

## Placement

The first service's conceptual drawing is replaced by an unboxed pair of complete portrait photographs. The remaining four schematic drawings, service backgrounds, native exclusive disclosures, copy and anchors remain. An existing 215px drawing allowance holds the photographs on desktop; mobile adapts this bounded height to the available width. `object-fit: contain` keeps the whole supplied photograph visible, including the caged drone and helmeted team member. Caption: At the access point. Inside the structure. / On site with Skyriders. These are visible activities, not attributed project results or evidence for other services.

The team-arrival photograph sits alongside the existing live starting brief within Before we fly. Its native 9:16 ratio remains, bounded to 180px wide on larger screens. Mobile uses two readable columns before the planning controls. Without JavaScript the photograph remains, while the existing inactive live brief stays hidden. The section's inspection choices, native radios, notes and draft-preserving contact handoff remain.

At 1440px the Services section remains 1124px tall and Safety remains 1017px tall, matching their previous captured heights. No new section, gallery control, route or slideshow is introduced. Hero, About, pre-landing, other lower sections and routing remain.

Images use existing `next/image` optimisation, lazy loading and intrinsic width/height. The existing SkyIReveals controller owns the finite entrances; no extra motion system, hover loop, package or runtime setup is added. Alt text describes the observed scene without client identification, personnel names, accreditation or inspection findings. Original colour/artwork remains.

## Originals and public copies

No source file was edited or recompressed. Public copies are byte-identical:

| Root original | Public image | SHA256 |
| --- | --- | --- |
| 1.jpeg | web/public/images/skyi/field-access-point.jpeg | D1197CFA7C63DA609EE10EC93CE9BE358B13B0E32E2C37CADA33A3564FFD6044 |
| 3.jpeg | web/public/images/skyi/field-site-team.jpeg | FA421BE8376D499AAF376AA11F8DB28BE7CBB916B5602E8667741155C5EEA2D5 |
| 4.jpeg | web/public/images/skyi/field-interior-detail.jpeg | 63ED52D1DBCCF74F45FAD4A9FED69E1C004584104D781DE66819180A4A94DC10 |

Gemini setup handoff was reviewed. No Gemini executable/tool is available in this session. This integration uses simple unchanged public copies and the already-installed image optimiser; no setup or mechanical resizing/recompression pipeline was attempted. Further production derivatives remain assigned to Gemini when available.

## Verification

ESLint without warnings, TypeScript, isolated Next.js 16.3.8 production build and whitespace checks pass. Build-generated TypeScript include additions were restored to the existing configuration after the build.

Development and production Chrome checks at 1440×1000, 1920×1080, 1024×768, 768×1024, 390×844, 320×700 and 740×390 verify loaded/lazy photos, reserved image geometry, section/document bounds and clearance between every selected service detail and its closing strip. Native keyboard selection retains a single open service. Touch-sized normal-motion review verifies finite photo entrance, live inspection brief selection and contact handoff. A 320px no-JavaScript path retains photos/native access. Failed-image checks retain readable service/enquiry actions and bounded layout. Captured page exceptions are empty. Paired desktop/mobile PNGs, development-verification.json and verification.json are in this folder.

Limits: Chrome emulation is not physical-device or cross-engine acceptance; owner visual approval and integrated release gates remain open. No publication, package or deployment.

Exact next task: Ishe reviews http://localhost:3006/home/#services (Boilers & ducting) and http://localhost:3006/home/#safety, then continues S03-L integrated acceptance. Further project presentation needs separately agreed context/content; these photographs do not activate the pending Projects label.
