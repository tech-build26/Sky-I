---
name: skyriders-motion
description: Design or implement the Skyriders and Sky I intro, scroll transitions, Elios movement and reference-video analysis. Applies to this project's animated web experiences.
---

Read the interaction contract in `docs/design/direction.md`. Make both destinations usable before animation. Native scroll drives progress; never consume wheel/touch to trap the visitor. Use one motion system and transform/opacity for sustained movement. Avoid React state updates every animation frame.

Implement one complete pre-landing scene. Headline, technician, Elios 3, labels and links enter from different directions on load, then remain visible. Do not add an arrival/selection toggle, scroll gate or hidden first scene. Keyboard focus reaches either destination immediately. Reduced motion and no JS show the stable complete choice. Continuous motion has a pause control; suspend it offscreen or when the document is hidden.

Elios 3 is the supplied caged industrial drone. Limit idle drift to the agreed small motion range. Do not substitute DJI or infer optional payload capabilities. Technician movement follows the rope axis; never mirror lettering. No subject glow or invented propeller animation. A PNG tilt is 2D, not a true 3D rotation.

When analysing a supplied video, use local ffprobe/FFmpeg if available: inspect duration, sample at most 6-8 frames across the relevant short interval, view each frame and record timestamps with observed position/scale/camera changes. Tighten sampling around a demonstrated transition only when needed. Sampled frames cannot prove exact easing or behaviour between them; state such inferences. For live sites, browser scroll observations are preferable to downloading their media.

Do not install video toolchains, scrape restricted video, upload local footage or enable paid transcription automatically. No video is required for current development. If unavailable, continue from the documented motion contract and record the evidence limit.

Reference-analysis workflow adapted from bradautomates/claude-video (MIT); this is an instruction-only local adaptation, not its full download/transcription tool. Attribution and license: `docs/research/skill-sources.md`, `docs/research/licenses/claude-video-LICENSE`.

Current independent-workspace boundary (6 October): operate on Sky I here. Read docs/site-split.md and this repository's alpha.md; the sister site has its own application/repository. Shared historical skill names do not authorise rebuilding its home here. Next.js 16.3.8 is owner-approved for both. Cross-brand links reach the other root pre-landing.
