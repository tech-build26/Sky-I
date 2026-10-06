# Sky I full website task plan

Updated: 6 October 2026, Africa/Johannesburg.

Workspace: C:/Users/ISHE-GAMING/Desktop/App Dev/Sky-I Website
Repository: tech-build26/Sky-I

Build only Sky I in this independent Next.js 16.3.8 application. Keep the approved root pre-landing and enter this site's hero at /home/. Cross-brand links open the other site's root. Sky I's pre-landing is Sky I left / Skyriders right, with its own sky-bg.jpg. No runtime/code dependency on the sibling workspace.

Exact next creative task: Ishe reviews S03-H/S03-N hero and linked sections; service/legal inventory in S01 remains open.

## Foundation and separation

- [x] F01 — Preserve the approved complete root pre-landing, both brand choices, supplied background/subjects/logos, social rail and industry strip. Original acceptance history: docs/history/combined-alpha.md and docs/STATUS.md.
- [x] F02 — Reuse the implemented /home/ and its approved refinements, fonts, motion, mobile and static fallbacks; keep final visual acceptance open where recorded below.
- [x] X01 — Independent application and GitHub import: own source, lockfile, installed dependencies and fixed brand; Next.js 16.3.8 approved by Ishe; verify both roots, home navigation, cross-brand root handoffs, no-JS/reduced-motion/keyboard/touch, canonicals and production builds; commit to the site's own repository. Evidence: docs/site-split-verification.json and remote main tree check.
- [ ] P06 — Complete release pre-landing QA across supported browsers, keyboard, touch, reduced motion, no JavaScript, loading and image failure. The split check is focused routing evidence, not this full release acceptance.
- [ ] P07 — Ishe reviews representative physical desktop/mobile devices; record final accepted layouts and any fixes.

## Local skills and durable handoff

Read AGENTS.md, docs/STATUS.md and the current task before substantial work. All six skills are local to this repository; their shared names are retained for compatibility and do not require the other folder.

| Work | Local skill |
| --- | --- |
| Composition and typography | .agents/skills/skyriders-design/SKILL.md |
| Next.js routes, components and forms | .agents/skills/skyriders-web/SKILL.md |
| Intro, hero and scroll motion | .agents/skills/skyriders-motion/SKILL.md |
| Verified copy and metadata | .agents/skills/skyriders-content/SKILL.md |
| Accessibility and visual finishing | .agents/skills/skyriders-quality/SKILL.md |
| Afrihost release packages | .agents/skills/skyriders-release/SKILL.md |

Environment/mechanical asset work goes to Gemini when available. Follow docs/handoffs/gemini-setup.md as historical setup guidance with the current independent repository/version override in AGENTS.md. Normal implementation stays in this workspace. Read supporting briefs only as needed. Record accepted decisions, evidence, remaining questions and the exact next task in docs/STATUS.md; mark [x] only after real acceptance evidence.

### 3. Sky I — owner-supplied design brief, 1 October

Ishe rejected earlier Sky I directions and supplied `design.md` and `BUILD_PROMPT.md`. Reuse the existing Next.js 16.3.6 application. Preserve Sky I's pre-landing with Sky I on the left and Skyriders on the right, and the unchanged Skyriders pre-landing. Latest scope supersedes hero-only: retain first image, generate second/third industrial scenes, add varied slideshow/motion and unlabelled desktop drone, full local navigation and working About/Contact destinations. All cross-brand links reach the destination root pre-landing. Brief conflicts/resolutions: `docs/decisions.md`. Preserve originals, confidentiality and verified-content requirements.

- [ ] S01 — Confirm brand/legal identity and current service/payload inventory. Contact recipient/details confirmed by Ishe on 1 October: both brands share the official Skyriders contact page; `info@ropeaccess.co.za`. Do not transfer historical aviation credentials or infer optional equipment ownership. **Ishe + Sol.**
- [ ] S02 — Follow the new brief's landing-section roles after the hero review. Only landing page now; future routes wait. Validate current service scope and claims before expanding content. **Sol + Ishe.**
- [ ] S03 — Approve the fresh Sky I visual language and section-specific interaction. **Sol + Ishe.**
  - [ ] S03-H — Ishe reviews the latest three-scene photography hero/navigation on desktop/mobile. Skyriders' charcoal/ivory/bronze and Cormorant/Jost, first supplied photograph, two authorised generated environments, unlabelled decorative desktop drone; no aircraft-specific positioning/specifications. Independent wordmark, floating pill and accessible static paths. Visual approval remains open.
    - [x] S03-H2 — Historical photographic replacement and evidence at docs/design/skyi-reset/review.md. **Rejected by Ishe; no longer rendered.** Earlier S03-HR is also rejected historical work.
    - [x] S03-H3 — New supplied-brief hero implementation and bounded foundations. 24 Chrome viewport checks, menu/keyboard/hotspots/drag/pause/fallbacks and retained pre-landing pass; lint/typecheck and both brand production builds pass. `docs/design/skyi-brief/verification.json`, `docs/qa-report.md`. Preview: http://localhost:3006/home/. No later sections implemented; parent approval still open.
    - [x] S03-H4 — Owner's revision: photography-led hero, no Elios stage/specs/navigation, Cormorant/Jost and exact Skyriders family palette. Existing industrial panorama plus tank-detail crop (aircraft excluded), restrained crossfade, native company-workflow context. 24 Chrome layouts, menu/fallbacks/background-pause, retained pre-landing and both brand builds pass. `docs/design/skyi-photography/verification.json`; preview http://localhost:3006/home/. H3's equipment/font/palette direction is superseded; visual approval remains open.
    - [x] S03-H5 — Latest owner revision: three industrial scenes with distinct transitions/manual controls; unlabelled desktop drone; full section navigation and real local destinations; native service disclosures, interactive sectors, validated email-draft/download brief, sourced shared contacts. Both compulsory pre-landings/local handoffs verified. 24 Chrome layouts, focus/keyboard/no-JS/reduced-motion/all-image-failure checks, lint/typecheck and both production builds pass. Evidence: `docs/design/skyi-interactive/review.md`, `verification.json`. Production origins restored automatically outside development; cleanup rule recorded. Technical implementation complete, final visual acceptance separate.
  - [ ] S03-N — Review/refine the now-built About, Services, Industries, Approach and Contact compositions with Ishe. Latest explicit full-navigation instruction authorises these landing destinations; deeper supplied-brief narrative sections/new routes remain to be agreed. Maintain `docs/effects-ledger.md`.
  - [ ] S03-L — Integrated desktop/mobile review after sections are individually accepted. Verify hierarchy, assets, motion, loading/failure states and usable enquiries; obtain Ishe's integrated approval.
- [ ] S04 — Implement the routes and enquiry flow agreed under the new S02/S03 decisions. Share reliable infrastructure while keeping Sky I's composition distinct. Delivery requires confirmed host support and recipient.
- [ ] S05 — Populate verified content and owner-supplied media; optimise/prepare metadata. Mechanical asset work goes to Gemini when tools are available; Sol reviews claims and confidentiality.
- [ ] S06 — Accessibility, mobile/browser, performance, enquiry and cross-brand release verification. Do not infer this from the local hero review.


## Sky I full-site implementation after section review

- [ ] S04-A — Confirm the full-site sitemap with Ishe: decide which existing landing sections remain anchors and which need standalone About, Services, Industries, Approach and Contact routes. Specify each page's visitor question, media allocation and navigation contract; do not invent deeper routes before agreement.
- [ ] S04-B — Implement the agreed page and service-detail compositions, complete real cross-page links and breadcrumbs where useful, and preserve the independent Sky I hero/pre-landing. Each major composition needs desktop/mobile acceptance; do not repeat a generic template.
- [ ] S04-C — Build the agreed inspection enquiry workflow after Afrihost support and delivery provider are confirmed. Confirm the shared recipient; server validation, abuse controls, honest delivery/failure states and accessible field errors are mandatory. The current email-draft/download brief is not sent-mail delivery.
- [ ] S04-D — Agree privacy/data handling and enquiry consent copy with Ishe; match stored fields, delivery, retention and any analytics to actual functionality. No legal or aviation credential claims without evidence.
- [ ] S05-A — Populate approved business/service/equipment copy and authorised media; generated industrial environments stay illustrative. Resolve current payload/legal identity gates in S01 before publication.
- [ ] S05-B — Add per-route metadata, sitemap/robots, meaningful alternative text, public brand canonicals and any agreed redirects. Sister links always open Skyriders' root pre-landing.
- [ ] S06-A — Verify all interactive services/sectors, navigation, contact flow and drone/hero motion under keyboard/touch/reduced-motion/no-JS and failure conditions.
- [ ] S06-B — Complete Q01–Q05 and obtain integrated site approval before L01–L04 packaging/upload.

## Completion and release

- [ ] Q01 — Review every implemented route and component for coherent visual hierarchy, purposeful interaction, responsive fit at 320px/short landscape/200% zoom, focus order, mobile menus and contrast. Acceptance includes Ishe's final visual decision.
- [ ] Q02 — Cross-browser and failure testing: JavaScript disabled, reduced motion, slow/failed media, direct URLs, refresh/Back, cross-brand roots and corresponding /home/ entry; no console exceptions or broken routes.
- [ ] Q03 — Measure representative production LCP/CLS/INP or clearly labelled lab equivalents, check transfer sizes/font/image loading, remove unused runtime code and maintain the effects ledger. Targets and field-vs-lab limits are in AGENTS.md.
- [ ] Q04 — Validate final public copy, current service scope, contact recipient/details, privacy/legal requirements and safety/accreditation evidence. No restricted named clients, invented credentials or generated environment presented as real work.
- [ ] Q05 — Verify titles/descriptions/canonicals/Open Graph, crawlable links, sitemap/robots, old URL redirects, 404/error states and any enquiry delivery/abuse handling.
- [ ] L01 — Confirm Afrihost Node version, startup/Passenger support, app root, ports, environment, logs/restarts and filesystem limits. Ishe supplies account capabilities without passwords in chat.
- [ ] L02 — After runtime confirmation, prepare the site's reproducible Linux-compatible upload package, exact installation/start/restart steps, manifest/checksums and rollback. Gemini packages when available; implementation agent verifies. Never upload Windows node_modules.
- [ ] L03 — Remove all localhost overrides and presentation flags from deliverables. Confirm public origins; verify both root pre-landings, all sister-site handoffs, canonicals, SSL and no localhost in built output. Recheck dependency security and resolve version decisions before release.
- [ ] L04 — Ishe uploads, activates and approves this site. Source commits are not deployment approval. Perform read-only live checks only within authorised scope.
- [ ] L05 — Document maintenance: security updates, content/media changes, enquiry health, certificates, backups/rollback and known limitations.

Historical combined-project task evidence is retained in docs/history/combined-alpha.md. This alpha.md is the active site-specific build plan. The other brand's unfinished tasks belong in its own repository.
