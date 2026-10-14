# Sky I footer revision — 7 October 2026

Owner request: reduce the footer and give it a sleek, informative structure that gracefully closes the landing page without a generic default layer. S03-N6 is technically complete; owner visual acceptance remains open.

The compact brand signature uses the original Sky I artwork and existing italic Cormorant phrase. The repeated CTA headline is removed. Shared email and section navigation occupy the first directory column; the two confirmed offices sit alongside it, with phone baselines aligned independently of address wrapping. A concise Skyriders artwork/link and explicitly labelled sister-company social pages complete the family connection. Copyright, country and company selection close the page. Contact is unchanged, all artwork is preserved and no new company/client/legal claim or route is introduced. Business details remain sourced from config/site.ts and the owner's 1 October confirmation in docs/research/findings.md.

The shorter footer may sit below the header reading line even at the document end. Navigation now recognises that end condition, so its fixed identities and rail yield to the footer and restore when following an anchor back up. No additional animation system/dependency or mandatory reveal is introduced; reduced motion disables the footer arrow transitions.

## Evidence

- `npm run lint`, `npm run typecheck`, isolated `NEXT_BUILD_DIR=.next-footer-review npm run build`: pass on Next.js 16.3.8. Build-added tsconfig paths removed; existing wildcard coverage retained.
- Production layouts: 1440×1000, 1024×768, 768×1024, 390×844, 320×700, 740×390 and 720×450. No page overflow, escaped footer text, unloaded artwork or footer anchor targets below 44px high. Footer heights: approximately 436px at 1440/1024, 523px at 768/740/720, 657px at 390 and 669px at 320. Previous desktop capture is approximately 885px; the new closing is about 51% shorter. `layout.json`, `footer-*.jpg`, `closing-*.jpg`.
- All footer links reachable sequentially by Tab with a visible outline; email, both phones, social accounts and section anchors verified. Services anchor restores header/section state; Back to top restores opening state and scroll position. End-of-page header yields on all seven layouts. `verification.json`.
- 320px no-JS: footer navigation/contact/social links available, header artwork uses absolute placement. 390px reduced motion: complete footer and disabled arrow transitions. Zero browser exceptions in these focused checks. `verification.json`.
- Prerendered production root/home contain no localhost/127.0.0.1 origins; home canonical remains `https://skyi.co.za/home/`; footer sister handoff is `https://ropeaccess.co.za/`; shared email and both phone links remain. `production.json`.

Screenshots include full footer and its join with Contact at desktop/390/320, captured from the isolated production preview. Chrome on Windows only. 720×450 is a 200%-zoom-equivalent viewport, not a claim of actual browser zoom testing. Physical handsets/other engines, field performance, sent-mail delivery, hosting and release checks are outside this bounded footer revision.

Exact next task: Ishe reviews `http://localhost:3006/home/#skyi-footer`, then continues the S03-L integrated landing review before agreeing S04-A standalone-page scope. No deployment or upload approval.
