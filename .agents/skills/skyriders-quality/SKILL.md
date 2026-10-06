---
name: skyriders-quality
description: Review existing Skyriders or Sky I interfaces for visual coherence, accessibility, responsive defects and release quality. Use for review or finishing work in this project.
---

Review against the approved direction, not personal preference. Identify defects that affect hierarchy, reading, navigation, responsive composition, motion tolerance or credible presentation. Avoid redesigning an approved page during a polish task.

Inspect representative desktop and mobile views in one bounded pass. Include a short landscape viewport, keyboard focus, reduced motion and a no-JS path where relevant. Fix observed issues together, then confirm the affected states. Broaden verification only for a new change or unresolved defect.

Product-specific checks: the logo file is mapped to the correct brand; Elios cage geometry stays recognisable; transparent technician has no opaque rectangle or added glow; both branch links work without scroll, hover or animation; vertical labels remain meaningful and do not collide with copy; social icons have accessible names and the supplied destinations; no mobile clipping or body overflow; seamless ticker can pause and duplicated content is hidden from assistive technology.

Distinguish measured performance from targets. Check the hero's actual LCP resource, image dimensions, font loading, layout shifts and animation main-thread load. Avoid declaring a perfect Lighthouse score without a real run. Keep quality fixes proportional to the task.

Place durable evidence and unresolved defects in `docs/design/review.md` or the task's validation notes. Do not flood chat with a step-by-step recap.

Adapted from pbakaus/impeccable, Apache-2.0: scoped critique and bounded review principles; upstream launcher/hook infrastructure is intentionally omitted. Revision and license: `docs/research/skill-sources.md` and `docs/research/licenses/impeccable-LICENSE`.

Current independent-workspace boundary (6 October): operate on Sky I here. Read docs/site-split.md and this repository's alpha.md; the sister site has its own application/repository. Shared historical skill names do not authorise rebuilding its home here. Next.js 16.3.8 is owner-approved for both. Cross-brand links reach the other root pre-landing.
