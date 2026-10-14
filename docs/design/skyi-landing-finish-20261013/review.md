# Landing finish — 13 October 2026

Owner scope: redesign Sectors and Client confidence, strengthen Contact, clean up the footer, add one critical interactive section informed by the company profile, match Safety/Projects hover behaviour and verify responsive layouts. Preserve the existing A different perspective / practical next step composition, hero, About and Services. This authorises local implementation, not publication or deployment.

## Composition decisions

Compared a photographic sector collage, separate image-led sector panels and an editorial sector index. The collage repeats the About gallery; separate photographic panels repeat Services. The selected index gives the industrial context room: large serif choices, a shared low-key supplied sky-bg.jpg, blue selection arrows, an oversized context word and a useful site question. Six native exclusive disclosures place the selected context alongside the index on desktop and directly under its own choice on mobile. Full copy and real Contact links work without JavaScript. A small enhancement keeps the selected mobile summary clear after an earlier disclosure collapses. Original media is unchanged; no new generated or stock image.

Compared a light textured quote field and a dark architectural treatment. The selected blue field aligns the section with the latest hero/About/Services direction: broad stationary arcs, a restrained typographic quotation mark, translucent ink panels, readable pale copy and blue rules. The owner-approved quote motion, single-column hover pause and Read all remain; moving columns now also accept keyboard focus to pause. Nine voices remain conspicuously disclosed as fictional design samples, not endorsements or evidence of regional work. Approved real quotes/consent remain a publication gate.

Contact uses an oversized three-line invitation, an independently ruled enquiry area, visible direct email/phone channels, readable framed fields and a blue Prepare email action. It remains an email-draft handoff, with the existing honest tooltip/status. Required name/email/message, optional service and existing length limits stay. No stored submission, server delivery or artificial sent confirmation.

Footer uses a small original Sky I logo on a white circle, compact blue signature, three purposeful directory columns, paired office details, real section links and a restrained sister/social closing. Addresses, phone numbers and shared email are the owner-confirmed details. At the footer the floating return yields to the footer's own Back to top link. Sister links preserve the destination root.

## New section: Before we fly

The supplied 2026 company profile, physical PDF page 8 (printed 7), is the content basis: indoor/outdoor applications, photo/video documentation and thermal inspection. Its existing page render was visually reopened in docs/design/skyi-services-20261013/profile-page8.png; application scope and conflict decisions are in docs/research/findings.md. No aviation credential, payload ownership, safety record or client names are transferred from the brochure.

The new Safety & preparation section turns that range into three visitor decisions: inspection setting, operating conditions and evidence to discuss. Native radio groups update an accessible live starting brief and a contextual note. The chosen brief can be carried into Contact through an in-page typed event. Existing enquiry text is preserved; repeat identical seed is not duplicated; the 2000-character limit is respected. Nothing is sent or persisted by this interaction. Thermal suitability/equipment and site permissions/access remain job-specific discussions. Without JavaScript the section presents the planning questions and direct contact action, with no inactive chooser/form.

Safety now has a real anchor to this section. Projects keeps its explicit pending status and coming-soon title until actual approved project content exists; its hover colour/underline now match every other navigation item. No invented project destination or case study. No standalone page was added.

## Validation

- ESLint, TypeScript and isolated Next.js 16.3.8 production build pass. Build-generated type configuration is restored to its previous content after verification.
- Seven Chrome sizes: 1440×1000, 1920×1080, 1024×768, 768×1024, 390×844, 320×700 and 740×390. All five affected sections and all six sector choices retain document/section bounds and clearance above the sector baseline. The wide-sector overlap caught in the first pass was corrected. Desktop/mobile paired PNGs and layout.json retain evidence; element captures hide fixed chrome to avoid screenshot stitching artifacts.
- Development checks cover native sector keyboard/exclusivity, all nine quotes, hover pausing only one column, keyboard pause, Read all, live reduced motion, navigation computed blue/underline, planning radio keyboard selection and message handoff preserving existing text, invalid/valid email, tooltip focus/Escape, footer return and absence of duplicate floating return.
- 390px touch checks cover all six sectors and selected-summary header clearance, mobile Menu → Safety focus, radio selection and handoff. 320px JavaScript-disabled checks cover native disclosures, all nine static quotes, hidden inactive enquiry form and direct email. Failed-image checks retain readable content/actions and no overflow. development-verification.json records no captured page exceptions.
- Production verification.json records the same interaction/fallback checks plus public canonical, Skyriders root and no localhost links. Original hero/About/Services/Impact media and composition remain; no dependency or new raster artwork.

Limits: Chrome emulation is not physical-device or cross-engine acceptance. Owner integrated visual review, approved real quotes/projects, current legal/aviation/payload evidence, privacy/enquiry delivery and host/release checks remain open. No package or deployment.

Exact next task: Ishe reviews http://localhost:3006/home/#industries through the footer, including Before we fly and its enquiry handoff, then completes S03-L integrated visual acceptance. Projects needs actual approved material before activation; deeper routes remain deferred.
