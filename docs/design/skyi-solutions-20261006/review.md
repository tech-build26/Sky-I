# Three-drone hero review — 6 October 2026

Local review: http://localhost:3006/home/. Technical implementation complete; owner visual acceptance remains S03-H/S03-N. No upload, deployment or service-detail routes authorised in this revision.

## Owner request and scope

The attached client image supplied navigation, three service names/taglines and benefit wording. Its tile layout, photography in each tile, blue palette and typography were deliberately not adopted: Ishe requested the existing design/fonts, transparent animated equipment and an unboxed composition. The supplied MotionButton example was a usage API without a component implementation; a reusable label/href/button implementation was added locally using CSS and existing fonts. Each drone and its centred button open a working matching landing disclosure until the dedicated service pages are requested. No dead future-page URLs.

Scene order: new SC35 window-washing illustration with the client's solution statement centred; retained inspection interior with previous default headline/copy on the right; retained dusk infrastructure with new “See further / Think ahead” copy offset left to clear the larger independent logo. No numbered hero selector. Pause control is above the drone row and in the footer. Sister-company paragraph/link is in About. Six requested nav labels have actual anchor targets; Projects offers an honest enquiry about shareable examples rather than invented case studies. Safety discusses site requirements rather than credentials. Brand roots/order and origins remain as documented in site-split.md.

## Verification

Lint and typecheck clean; Next.js 16.3.8 production build passed. Build used ignored .next-hero-review to preserve the running development preview; generated explicit tsconfig includes were removed because existing .next-* wildcard patterns already cover them. No dependency install or version changes.

verification.json records 20 successful focused Chrome checks, with zero page exceptions: all three photographed/copy placements; 1920×1080, 1366×768, 1280×720, 1024×768, 768×1024, 600×800, 390×844, 320×700, 844×390 and 720×450; hover/focus caption, pause beyond rotation interval, working service disclosure/link and local sister root; touch menu/Escape/Safety; reduced motion beyond rotation interval; no JavaScript at 1440/390/320; all optimized images failed with usable headings/actions. No horizontal overflow or button targets below 44px. 720×450 is a zoom-equivalent layout, not an actual browser zoom test. Physical handsets and other browser engines were not tested.

mobile-polish.json records the final larger background source (tall object-fit crops need more pixels than viewport width), 11.68px caption/button text and responsive buttons at 390/320/600. The three drones remain in one row; short/narrow screens scroll naturally. Relevant screenshots: desktop-scene-1/2/3.png, desktop-caption.png, layout-1366.png, layout-320.png, layout-844.png, mobile-polish-390/320/600.png, nojs-1440/390/320.png. These local screenshots are ignored by Git; JSON/notes are retained.

motion-finish.json verifies the final reveal lifecycle: visible keyboard focus cancels an in-progress photograph reveal, reveals the service caption and global pause reaches the paused state. Resume leaves the settled photograph in place rather than replaying its completed transition. Final lint and isolated production build passed after that refinement.

production.json verifies one h1, https://skyi.co.za/home/ canonical, public https://ropeaccess.co.za/ root link, same-brand /home/ pre-landing choice and no localhost in prerendered root/home HTML. New transparent served images match original SHA-256 bytes. Original first scene remains on disk and the pre-landing retains sky-bg.jpg. Generated image source, exact prompt and authorisation are in artwork.md.

## Remaining acceptance

Ishe reviews the revised hero on representative desktop/mobile devices, then continues About and remaining landing-section refinement. Dedicated internal/external/window-washing pages stay deferred. Service/equipment/legal inventory and current evidence for supplied marketing wording (including safety/sustainability outcomes) remain S01/Q04 release gates. Generated environments are illustrative and are not used as evidence of an actual project/client. Afrihost runtime remains unconfirmed. No sister-repository changes.
