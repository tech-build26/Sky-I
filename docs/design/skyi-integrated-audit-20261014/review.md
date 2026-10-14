# Integrated landing-page audit — 14 October 2026

Owner requested a hero-to-footer review, optimisation assessment and suggestions only, with application changes and a commit withheld until his next decision. **Application source is unchanged:** 91 source/configuration/package files match their before-audit SHA256 hashes. Next's build-generated changes to tsconfig and next-env were restored byte-for-byte. This folder and project handoff/task notes are review artifacts, not an implementation.

## Verdict

The visual direction is coherent, the three-choice hero works particularly well on phones, and the tested section controls, video playback, native disclosures, brief handoff and field validation work. No horizontal document overflow or captured application console errors appeared in the inspected desktop/phone/landscape states. The existing order is understandable; a targeted closing-section reorder would improve the enquiry journey.

There is **one confirmed mobile control defect**, meaningful loading opportunities and unfinished publication gates. This is suitable for owner review, not an assertion that every release check is complete. No application fix, asset replacement, dependency update, valid enquiry, mail, commit or deployment was performed.

## Confirmed defect to address first

**At 320×740, the floating Back to top button completely covers Contact's enquiry-help button after keyboard focus moves into Email.** The help button is at x=241, y=679.641 with a 44×44px box; Back to top is at x=241, y=680 with a 44×44px box. Their overlap is 44×43.641px. A tap at (263,702) navigates to `#opening`, focuses the hero and leaves the help tooltip closed. This is an actual misdirected tap, not just a theoretical collision.

Suggested adjustment, requiring the owner's go-ahead: suppress or relocate the floating return control while the Contact form/actions are visible, or reserve a separate safe position for it. Keep the footer's return link and keyboard access. The existing floating control styling is in `web/src/components/skyi/SkyINavigation.module.css`; the Contact action row is in `SkyIContact.module.css`.

Evidence: `narrow-phone-help-overlap.png`, `browser-verification.json` scenarios `narrow-phone-help-overlap` and `narrow-phone-help-hit`.

## Section review

| Section | Observed result | Suggested refinement, not applied |
| --- | --- | --- |
| Hero | Original drones, typography and blue emphasis form a strong service-led hierarchy. All three service groups fit within the 390×844 and 320×740 first view. Their keyboard destinations open/focus Internal, External and Window washing correctly. | Keep the composition. Consider shortening the introductory message hold only if quicker access to the settled question is desired; the sequence remains an approved owner decision. |
| Inspection Perspective / About | Supplied footage plays in its full 16:9 frame; phones place it below readable copy. The partner link reaches/focuses the lower panel. About footage pauses when Services is reached. | Shorten repeated scope/access wording if reducing phone scroll length. The generated rope-access partner background has no visible illustrative caption in the current component; add a quiet label to distinguish it from an actual crew/project photograph. |
| Services | Five native asset panels switch exclusively; inspected panel bounds clear the section's end. Three FAQ/washing disclosures work by keyboard, and the selected phone panel sits in normal flow. Original field photographs and their irregular frames remain readable. | Load backgrounds near this section rather than at the hero; defer inactive options. Keep the detailed service scope, but reduce repeated boilerplate if copy is tightened later. Window washing currently reaches its native closing disclosure, consistent with deferred dedicated service pages. |
| Sectors | All six choices switch exclusively on desktop and phone. Selected context is alongside the index on desktop and beneath its own summary on phones; longer labels/content fit at 320px. | Keep the current treatment. Some introductory scope language repeats Services/Confidence and can be shortened without losing useful sector detail. |
| Before we fly | Radio choices update the live starting point, the process disclosure works, and the selected brief reaches Contact intact on desktop and phone. | Move this practical brief builder immediately before Contact. Consider naming its navigation link “Before we fly” or “Plan an inspection” rather than “Safety,” since it is principally a scoping tool. |
| Exterior Inspection | Real footage plays, mobile framing remains 16:9, the text has a readable dark surface, and the lower charcoal blend separates it from Confidence. Local HTTP byte-range responses work. | Retain placement before Confidence in the proposed closing sequence. Produce a lighter phone rendition before publication if inspection detail remains adequate. |
| Confidence | Fresh imagery, crisp vector diagrams, three native terms/definitions and the circular Contact action work. Its independent entrances settle; the removed pale signoff stays removed. | The phone illustrative caption is **9px** and the discipline line **10px**; increase these to a more comfortable readable size. Review the length of this approximately 2.1kpx phone section alongside repeated copy elsewhere, rather than removing useful answers or shrinking imagery indiscriminately. |
| Contact | Brief preservation, required-field rejection, invalid-email focus, accessible field labels, direct dual-recipient links and the help tooltip work. Fields have 16px text and 48px minimum heights. | Fix the confirmed floating-control collision. At 320px Name/Email are only 123.5px wide each; a single-column arrangement would make long names/email addresses easier to see. Settle or shorten copy/form entrances for direct enquiry links; current arrival captures briefly show an empty/dim text surface. |
| Footer | Brand signature, two offices, telephone/email links, section navigation, sister-company root and social links form a clear directory. Group entrances settle, and Back to top returns/focuses the hero. | Keep the directory. It is approximately 900px tall at 390px and 1115px at 320px; modest spacing/copy reductions are optional, while retaining the useful contacts. |

The sticky header currently hides Sky I's logo after the hero and leaves the Skyriders sister-company mark visible. A small persistent Sky I wordmark/mark would reinforce which site's content is being viewed, while retaining the sister link. This is an optional refinement of accepted behavior, not a new brand decision.

## Proposed section order

**Hero → Inspection Perspective/About → Services → Sectors → Exterior Inspection → Confidence → Before we fly → Contact → Footer.**

The first four sections establish the service, relationship and asset/sector fit. Exterior footage then supplies a practical view, Confidence explains the commission, and the brief builder leads directly into the enquiry. Moving Before we fly is the only suggested relocation; no whole-page redesign is needed. Its light-to-blue Contact boundary would need visual review if that change is approved.

## Loading and optimisation findings

One serial local HTTP sample of resources observed on the first **1440px production home load** totals **2,039,100 encoded response-body bytes**, including HTML. Images account for 1,568,400 bytes; thirteen script resources total 269,941 compressed bytes, two CSS resources 26,717 compressed bytes, and the two self-hosted WOFF2 fonts 131,252 bytes. HTML is gzip-compressed (29,267 bytes). These measurements exclude headers/TLS/cache effects and are not cellular transfer, a Lighthouse score or field Core Web Vitals.

Three clear opportunities dominate the initial image budget:

- Five Services backgrounds are `loading="eager"`, including inactive panels well below the hero: **455,878 bytes** in this sample. Start loading near Services and preload only imagery needed for an upcoming selection.
- The decorative entry skyline is requested even on a direct home visit with no entry presentation: **340,148 bytes**. Load it for an actual brand entry while preserving the approved entry effect.
- Both raw video posters are requested before either video is reached: **493,599 bytes combined**. Defer lower-page posters and use lighter responsive delivery where practical.

The About and Exterior videos are **25,479,879 / 11,810,401 bytes** respectively, approximately **37.3MB combined**. Neither video source is assigned in the fresh hero state; they load/play on entry and pause offscreen. Save-data/reduced/menu/hidden guards remain in the shared source. This is good initial-load discipline, but a full viewing session can still be expensive on a phone. Owner/Gemini could prepare mobile renditions and the confirmed host could set suitable versioned media caching. Local media responses currently use `public, max-age=0`; 1024-byte range tests returned 206 correctly. Afrihost's actual caching/runtime must be confirmed before drawing a hosting conclusion.

Local HTML TTFB was 26.5ms in this single loopback request. **No new LCP/CLS/INP measurement is claimed**: the available browser inspection surface does not expose the required performance-observer APIs. Earlier performance notes remain historical. Asset-body budgets establish useful priorities without pretending to certify phone-network speed.

`http-and-assets.json` is the summary budget evidence. Other tab inventories can contain earlier requests or a different tab viewport; the cumulative `phone-image-bodies.json` sample is explicitly excluded from initial-loading conclusions. It is not a fresh phone transfer budget.

## Before publication

| Gate | Current evidence / required decision |
| --- | --- |
| Enquiry delivery | Production preview `/api/enquiry/` returns `available:false`; the interface correctly offers a dual-recipient email draft. Configure/verify Afrihost SMTP and actual arrival in both approved inboxes with correct Reply-To before treating the form as website sending. No valid request or mail was sent in this audit. |
| Crawl/share metadata | Root/home canonicals use `https://skyi.co.za/` and `/home/`; the page title/description are present. `/robots.txt` and `/sitemap.xml` return 404, and home has no `og:image`. Finish the existing metadata task before launch. Missing robots.txt is not itself a crawler block. |
| Entry-page claims | A routing follow-through exposed “Certified rope access execution” on the root; the rotating source also retains “Zero scaffolding, zero blind spots, minimal operational downtime.” The conflict register explicitly marks those owner-draft phrases as awaiting qualification/evidence. Verify/qualify or remove them before publication. Main landing copy avoids those absolute phrases. See `docs/research/findings.md`, conflict register row “Absolute access/performance language,” and `web/src/content/prelanding.ts`. |
| Illustrative imagery | Confidence identifies its main scene as illustrative. Add the same clarity to the generated About partner scene; retain all originals and never present generated scenes as actual projects/crew/results. |
| Confidentiality | No restricted client names were found in the searched public text/source or public filenames. The old brochure/live website remains research, not client-publication permission. This is a targeted text/filename check, not frame-by-frame OCR of every image/video. |
| Sister-company review | Production sister links point to the other public root; development links point to `http://localhost:3000/`. The Sky I preview responds on 3006. Port 3000 was unavailable during the local HTTP check, so a complete local cross-site handoff remains unverified; its URL is correct. No other repository was changed or started. |
| Release acceptance | Privacy/legal identity, physical-device/Safari/other-engine, actual 200% browser zoom, host/runtime and public release checks remain open. They are separate from a source commit. |

## Verification and limits

ESLint with zero warnings, TypeScript and a fresh isolated **Next.js 16.3.8** build pass. The current production dependency audit returns **zero findings**; no dependency change was made. Whitespace checks pass.

Browser review covered 1440×900, 390×844, 320×740 and 844×390, plus a 1024×768 menu-resize state. This is viewport emulation in the in-app browser, not physical touch hardware or multiple browser engines. Screenshots were inspected from hero to footer. Some captures deliberately include entrance states; settled captures/DOM states distinguish these from persistent missing content.

Checks include all five service and six sector selections, native keyboard FAQs, all three phone hero destinations, menu focus wrapping/Escape/scroll unlock/inert isolation, menu closure on desktop resize, planning choices/live statement, desktop/phone brief preservation, required and malformed-email focus, immediate form visibility on keyboard access, tooltip opening/Escape, video progress/offscreen pause, normal footer return, real root-to-home entry and settled browser Back, no missing local fragments and no loaded failed images in the recorded views. An early root-history sample occurred before the departure finished and is superseded by `root-home-history-settled`. A first mobile service click during the menu's exit was also retested after it closed; the corresponding panels then opened normally.

Native forward/reverse hero/About scroll updates the existing parallax progress without changing the 7669px settled desktop page height. Base/closing content settles readably. Source review confirms current reduced-motion, no-JavaScript, hidden/offscreen/menu and save-data paths; **live reduced/no-JS/failed-media/hidden-state emulation was not repeated in this audit**. Earlier section-specific evidence exists, but this report does not claim a new full-page run of those conditions or field-performance certification.

The unconfigured API rejects empty fields with 400, foreign origins with 403 and wrong content type with 415; requests were deliberately invalid and did not reach sending. Phone inputs retain 16px text/48px heights. Fresh hero videos have no source and remain paused; About/Exterior advance when viewed and pause when offscreen. Captured browser error logs are saved separately.

Evidence: `browser-verification.json`, `source-before.json`, `source-integrity.json`, `http-and-assets.json`, `api-negative-checks.json`, `development-routing.json`, `production-dependency-audit.json`, browser asset inventories, console JSON and PNGs in this folder. Authorisation for changes or a commit remains with Ishe. Exact next task: Ishe reviews the confirmed mobile defect and prioritised suggestions, then explicitly authorises selected fixes or committing the reviewed source.
