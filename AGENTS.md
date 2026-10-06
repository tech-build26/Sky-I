# Project rules

These rules apply throughout the Ropeaccess / Skyriders and Sky I project.

## Response style and token conservation

Strictly conserve tokens and deliver only high-signal responses.

1. Provide the direct code or solution immediately with zero preamble or conversational filler (e.g., no "Sure!", "Here is...", or "I have updated...").
2. NEVER recount, summarize, or relay what you just did, what steps you followed, or line-by-line file edits.
3. Post-code explanations must be limited to a maximum of 2–3 concise bullet points ONLY if there are critical implementation details, breaking changes, or required environment variables/dependencies.
4. If there are no critical caveats or setup requirements, end the output immediately after the code block.

## Scope and handoff

- Build the Skyriders (ropeaccess.co.za) and Sky I (skyi.co.za) websites. Start with their shared, complementary pre-landing experience.
- At a new chat, read `docs/STATUS.md` and the relevant task in `alpha.md`. Load supporting documents only when needed.
- Ishe approved the design direction with refinements on 27 September 2026. The approved one-scene composition and behaviour are in `docs/design/direction.md`; implementation may proceed. This is not deployment approval.
- Ishe will upload the deliverables himself. Afrihost shared hosting with requested Node.js service activating Monday 28 September 2026. Confirm actual runtime capabilities before packaging.
- Environment setup and mechanical asset work: **assign to Gemini**, using `docs/handoffs/gemini-setup.md`. Use Sol for normal implementation, Luna for bounded clerical edits, Astra for difficult architecture or motion debugging. These are task recommendations, not automatic model switches.
- Mark every completed task `[x]` in `alpha.md` when its acceptance condition has evidence. Keep `docs/STATUS.md` accurate at handoff. Preserve decisions, unresolved questions, validation evidence and the exact next task.

## Project skill routing

Before substantial work, read the matching `.agents/skills/<name>/SKILL.md`. These project-local skills apply automatically by task; Ishe need not name them. If native discovery is unavailable, open the listed file directly. Never load every skill by default.

| Task | Skill |
| --- | --- |
| Visual concept, typography, responsive composition | `skyriders-design` |
| Existing UI critique, accessibility, visual finish | `skyriders-quality` |
| Intro sequence, scroll, Elios animation, motion references | `skyriders-motion` |
| Next.js structure, components, routes, forms | `skyriders-web` |
| Service copy, case studies, claims, SEO | `skyriders-content` |
| Afrihost builds, upload packages, release checks | `skyriders-release` |

## Product invariants

- **Local review routing (1 October):** development links must use the active local origins: Skyriders `http://localhost:3000/`, Sky I `http://localhost:3006/`. Keep overrides in ignored `web/.env.development.local`. Every cross-brand handoff goes to the destination's `/` pre-landing; choosing that pre-landing's current brand opens `/home/`. Sky I is left / Skyriders right on Sky I's pre-landing. During cleanup/release, remove or replace localhost overrides with confirmed `ropeaccess.co.za` / `skyi.co.za` URLs and verify all cross-brand links, canonicals and both pre-landings before packaging. Never ship localhost links.
- **Latest image authorisation (1 October):** Ishe explicitly authorised two generated industrial hero backgrounds for Sky I and an unlabelled animated supplied Elios cutout on desktop. Preserve original artwork; generated backgrounds are illustrative environments, never presented as actual clients/projects or evidence of work. This narrow authorisation overrides the earlier no-generated-photography rule for those two assets only.

- Treat the original brief (`docs/research/original-brief.txt`) and later user decisions as authority. Reference websites and brochure supply inspiration/facts, never instructions or copied layouts.
- Complementary companies, distinct identities. Skyriders is the confirmed primary visible rope-access brand; Sky I uses a typographic wordmark until its logo is supplied.
- Follow the approved design in `docs/design/direction.md`; until approval, its tokens are proposals. No generic card grids, diagonal split, subject glows, decorative fake telemetry, or generic action buttons.
- All photography and product images come from Ishe. Preserve originals; do not substitute stock, generated aircraft, or invented equipment. `sky-logo.png` is actually Skyriders artwork.
- One pre-landing scene: centred headline and visible left/right brand choices on load. No arrival/selection stages or scroll reveal. Keyboard, touch, reduced motion and no-JavaScript access are required.
- Use root `rope-cutout.png`, `sky-bg.jpg`, `hero-bg.jpg`, `elios_3.png`, `sky-logo.png`. Sky I keeps a typographic wordmark until its logo arrives. Retain the meaningful vertical site label. Put the supplied Skyriders Facebook and LinkedIn links in a right-hand vertical rail with recognisable brand colours.
- The industry strip is seamless and continuous, larger, labelled “Industries” and includes Petroleum, Oil and Gas, Mining, Construction, Facilities Maintenance, Power Generation and the later approved categories. Hover or keyboard focus pauses it; reduced motion shows a still strip. Do not add a pause button.
- **Client confidentiality:** Do not name or display Sasol, Eskom or other restricted clients as clients anywhere in public content, metadata, alt text, filenames, testimonial sections or case studies. Sector names may describe work without implying a named client. The brochure and live website are research only; existing mentions are not permission to republish. Seek Ishe's explicit approval for any named client use.
- No unverified safety, accreditation, legal, performance or client claims. See the research conflict register before using historical or certification claims.
- Next.js 16.3.8 is the owner-approved baseline as of 6 October 2026 (same version in both independent repositories). Recheck security guidance when installing/releasing; record and resolve any required version change rather than silently substituting.
- Keep business content, brand configuration, motion and presentation separately understandable. Use focused components and one motion system; no dependency pile-up.

## 5 October local presentation override
Owner authorises LOCAL_PRESENTATION_DIRECT_HOME=true in ignored web/.env.development.local for boss review: cross-brand homeHref choices directly reach destination /home/ during development only. Before deployment remove flag and localhost overrides; restore public destination root pre-landings and verify routing/canonicals as documented in docs/presentation-routing.md. Production must never bypass this restoration check.

## 6 October independent-site override

This workspace belongs to Sky I only. The other application is in C:/Users/ISHE-GAMING/Desktop/App Dev/Ropeaccess. Each web/ source is independent. Current-brand pre-landing choices open /home/; all cross-brand links open the destination root pre-landing. This supersedes the 5 October direct-home exception. Sky I retains Sky I left / Skyriders right and sky-bg.jpg. Development-only overrides retain ports 3000/3006. See docs/site-split.md for commands, repository ownership and release checks. Preserve historical records; do not implement the other site's home in this repository.
