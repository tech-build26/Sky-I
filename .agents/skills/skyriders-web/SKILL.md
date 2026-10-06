---
name: skyriders-web
description: Implement Next.js components, routes, brand configuration and enquiry functions for the Skyriders and Sky I websites. Use for this project's application engineering.
---

Check the assigned task and design approval in `docs/STATUS.md`. Read `docs/architecture.md` for shared boundaries and route semantics. Setup P01 is assigned to Gemini through its handoff; do not spend an implementation turn re-scaffolding it.

Use the verified requested Next.js baseline and installed version-matched documentation. Keep brand data typed and allowlisted; do not scatter hostname checks through components. Store approved business copy separately from animation. Server-render readable content and links; isolate interactive components. Never expose secret environment values through NEXT_PUBLIC variables.

The two roots offer one complete pre-landing scene. Latest owner decision: a same-brand choice enters `/home/`; a cross-brand link reaches the other site's compulsory root pre-landing first. Service links bypass the pre-landing. Development uses ports 3000/3006 via development-only overrides; cleanup restores verified production domains. Verify Back, refresh, keyboard activation and real destinations. The headline and both destinations are visible on load without a scroll gate. Never hide important content behind a mandatory animation or show a working-looking link to an unbuilt live route.

Build forms only after recipient and host delivery mechanism are known. Validate on the server, handle abuse and failed delivery, and show success only after genuine acceptance. No artificial success state or invented contact address.

Use plain semantic links/buttons, visible focus, responsive imagery and meaningful alt text. Decorative duplicate imagery gets empty alt text. Verify behaviour appropriate to the change: typecheck/lint/build plus focused tests for routing, state or form logic; no tests that merely restate class names or static copy.

Preserve source assets and unrelated edits. Update relevant checkboxes and handoff evidence at completion.

Current independent-workspace boundary (6 October): operate on Sky I here. Read docs/site-split.md and this repository's alpha.md; the sister site has its own application/repository. Shared historical skill names do not authorise rebuilding its home here. Next.js 16.3.8 is owner-approved for both. Cross-brand links reach the other root pre-landing.
