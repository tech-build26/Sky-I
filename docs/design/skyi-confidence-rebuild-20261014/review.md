# Confidence imagery and choreography rebuild — 14 October 2026

Owner rejects S03-N24 for reusing screenshot pixels and soft imagery, and explicitly requests fresh crisp images throughout this section. The follow-up requires complete directional slide/appearance/roll animation as part of section implementation, without another reminder. Preserve the accepted typography, blue Confidence/scope, white Clear, circular enquiry and reference composition.

## Independent assets and layout

The reference screenshot and copy-removal mask are no longer rendered or referenced by application code. `SkyIConfidenceArtwork.tsx` supplies three new built-in-generated photo sources, real individually positioned layers, and native SVG/CSS linework. Full prompts, source paths, measured native dimensions and tool provenance: [generation.md](generation.md).

- Main scene: 1774×887, industrial tank/drone/stairs. A targeted generated edit shifts the entire aircraft into the diagonal crop; the original generation remains preserved. Tank surfaces and stair edges remain focused, without a whole-image blur/filter.
- Access: 1086×1448, fresh tank/rail/stair photograph in its own diagonal mask. It is never extracted from the reference screenshot.
- Evidence: 1254×1254, fresh steel surface mapped onto three individual skewed planes. A restrained thermal-colour concept plane and report plane sit behind the front photo; these are diagrams, not actual thermal results.
- Compass, contour paths, index rail, inspection outlines/route, all diagram lettering/lines, wireframe tank and pale architectural baseline are native vector/CSS elements. They are independently sharp rather than enlarged text/linework inside a screenshot.

All photo outputs are copied unchanged into `web/public/images/skyi/`; originals remain under `.codex/generated_images/`. Gemini's mechanical derivative/setup assignment remains untouched. The source reference, earlier assets and their history remain preserved. No new dependency or other-site work. `next.config.ts` permits quality 90 alongside default 75; only these new section images request 90. Existing image consumers retain their previous quality. Responsive sizes and lazy loading reserve geometry. No local bitmap upscaling or recompression pipeline.

The visible illustrative-scene caption and decorative diagrams do not claim a real client/project/result, specific equipment ownership or verified coverage/elevation. Diagram labels use agreed visual scope rather than fabricated measured values. Copy, real Contact anchor, type treatment and section fragment remain. The original asymmetric upper scene/three lower panels/pale signoff composition stays; phones stack readable copy with each independent artwork. At 1916px the section is approximately 822px high; native content can extend the row on smaller desktop widths to retain clearance. Original supplied artwork elsewhere, hero, enquiry delivery and routing remain.

## Included animation roles

One existing owner, `SkyIReveals`, runs finite Web Animations entries. New `confidence-*` roles preserve the existing lifecycle and leave other section roles unchanged. Computed static transforms/opacity are retained for skewed evidence planes and subdued compass marks.

| Unit | Entrance |
| --- | --- |
| Eyebrow / introduction | Left, with staged delays |
| Heading / enquiry | Centre, rise and slight scale |
| Main scene | Right, restrained 1.5° roll / 1.03 scale; 1400ms |
| Compass / scene marks / signoff detail | Brief appearance, retaining original opacity |
| Answer copy | Left / centre / right |
| Access photograph | Left/up with -6° roll; 1250ms |
| Evidence planes | Independent rise/depth, 80 / 200 / 320ms delays; static skew retained |
| Evidence labels / wireframe tank | Appearance / centre rise |
| Closing labels / rule | Opposing sides / line grows from left |

Normal entries last 1100ms unless noted, occur once and settle with no remaining animations. Phone horizontal travel is smaller. No idle loop, new scroll controller, timer or motion dependency. Existing hidden/offscreen/menu pause, resumption, focus settling and live reduced-preference cleanup remain. Base HTML and artwork are visible without JS; reduced motion presents the complete static composition. The circular arrow keeps its finite blue/dark hover/focus feedback and static reduced-motion state. The owner's expectation of default section choreography is recorded in AGENTS.md for future section work.

## Validation evidence

ESLint with zero warnings, TypeScript, isolated **Next.js 16.3.8** production build and whitespace checks pass. Generated task-specific tsconfig inclusions are removed because existing `.next-*` wildcards cover them.

Development (`3006`) and temporary production (`3106`) each pass **15 layout/access checks plus four motion/imagery scenarios**, with no captured page exceptions. Nine layout sizes: 1916×1000, 1440×900, 1200×800, 1199×800, 768×1024, 390×844, 320×740, 844×390 and 2560×1440. These check loaded sources, full width/no horizontal overflow, native copy within panels, requested colours, 48px enquiry, three valid native terms/definitions and actual keyboard Contact activation. Normal desktop/phone, reduced, no-JS, failed-image and Chrome 200% CSS zoom paths pass.

Motion evidence captures actual initial/final keyframes, distinct directions, the photograph roll, layer delays and retained skew. Desktop/mobile settle **20 / 18** visible targets with no remaining animations. Simulated hidden pause/resume, fresh offscreen pause/resume, the phone's actual Menu suspension, live reduced cleanup and focus access pass. `motion-entry-350ms.png` is a requested 350ms entry sample (capture overhead is not an easing measurement); `motion-entry-settled.png` is the final normal-motion composition. Both were visually inspected alongside desktop, phone and short-landscape layouts. Hidden state is simulated; physical background-tab behavior is not claimed.

At device pixel ratio 2, both widths request independent quality-90 sources and no screenshot/mask. Encoded image bodies total approximately **682,198 bytes at 1916px / 317,808 bytes at 390px** in development. These are asset-response bodies, not total transfer or field-performance results. Five image elements reuse three independent source assets. Vector labels are actual SVG text. Source native pixel counts are recorded honestly in generation.md; no 4K resolution claim.

Evidence: `development-verification.json`, `verification.json`, `motion-imagery-development.json`, `motion-imagery-production.json`, paired layout PNGs, normal-motion captures and a 2× phone capture. Integrated owner approval, physical devices/other engines, field performance and existing SMTP/privacy/runtime/release gates remain open. No deployment, package, tracking or real mail.

Exact next task: Ishe reviews http://localhost:3006/home/#testimonials for generated-image clarity and the coordinated entrance, then continues S03-L integrated acceptance.
