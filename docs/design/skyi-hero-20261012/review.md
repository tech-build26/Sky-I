# Approved hero implementation — 12 October 2026

Ishe approved the full charcoal concept in this chat and authorised implementation. His refinements are included: centred right social rail, white circular background behind the supplied Sky I logo, supplied Skyriders logo after Contact, no Discover link/arrow. He confirmed Facebook and LinkedIn.

Three original drone cutouts sit in a shared charcoal composition. Each drone/title/caption/arrow is one native service link. No image-generation output is used in the application. Headline and all service labels remain readable throughout the finite artwork entrance. Narrow layouts use horizontal choices; short landscape can scroll normally.

## Validation

- Lint, TypeScript, Next.js 16.3.8 isolated production build and git whitespace checks pass.
- Production Chrome layouts: 1920×1080, 1440×900, 1024×768, 768×1024, 390×844, 320×700, 740×390. No document overflow or browser exceptions. Original images load. Three choices fit desktop and portrait first screens. Short landscape preserves native scrolling.
- Keyboard activation of all three links opens the correct disclosure, synchronises service imagery, focuses its summary and aligns it 120px below the viewport top. Explicit selections interrupt an in-progress automatic service transition. Alignment follows closing the previous disclosure and only applies to hero selections.
- Hover does not change label text. White circular logo, Skyriders after Contact and centred rail verified. Tablet artwork/rail clearance corrected, then measured at approximately 10px minimum between bounding boxes.
- Touch selection, menu isolation/Escape/focus restoration, logo restoration and Back to top pass. Existing pre-landing entry cover releases, home loads and browser Back restores root.
- Reduced motion shows zero active hero animations. No JavaScript retains native service links/disclosures/navigation. Failed artwork retains labels, link geometry and access.
- Production sister URL is https://ropeaccess.co.za/; local link is http://localhost:3000/. Root/home production HTML has no localhost. Original supplied assets are unchanged.
- One local production diagnostic at 1024px reports the optimised Elios image as LCP at 192ms, fonts loaded, CLS 0 and no remaining hero animation after settling. This is a local diagnostic, not Lighthouse or field performance.

Evidence: layout.json, verification.json, finish.json and hero PNGs in this directory. finish.json and hero-1024.png supersede the initial 1024 geometry after rail-clearance correction. The last rebuild changed only that breakpoint padding; full functional checks already passed on the preceding build.

Exact next task: Ishe reviews http://localhost:3006/home/ against the approved direction, then resumes integrated S03-L. Physical devices and other browser engines remain untested. No deployment or packaging.
