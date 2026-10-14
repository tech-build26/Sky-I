# Sky I landing polish — 7 October 2026

Owner authorises all six direct review recommendations, requires Window washing as the service name, removes Your brief and asks for a compact appealing Contact section. Implemented directly without applying skills, as requested. S03-N7 technical implementation is complete; owner integrated visual approval remains open.

## Final composition

Mobile/tablet navigation contracts after 180px native scroll into one compact dark header, with both supplied identities and a 44px Menu target. Returning to the opening restores its original presentation. GSAP logo shrink now applies only at desktop widths; it cannot shrink the compact mobile identity twice. Header still yields to the footer and the menu retains isolation/Escape/focus behaviour.

Mobile services become three full-width selection links, with larger supplied artwork and full titles, practical captions and inline Explore. The invisible caption reserves and separated bottom buttons no longer create empty mobile gaps. Desktop keeps its existing layered lettering, three drones, buttons and choreography. The vertical discipline label stays. Window washing replaces the old Façade selector and remains consistent in the hero, service accordion and form.

Scene/About/service/sector/Impact copy now identifies structures, site conditions and the visual documentation to discuss rather than repeatedly restating perspective/clarity/next step. Examples come from already-present inspection/service contexts; no new equipment, accreditation, client, legal or quantified performance claim is introduced. Artwork/photographs remain unchanged.

Sectors use native details/summary elements. Desktop shows the selected content beside the choices; mobile shows it immediately beneath its selected heading, with one open item in the enhanced interface. Keyboard Enter opens/closes the native control. Static/no-JS layout keeps disclosure content in normal flow and direct contact actions remain available.

Contact is a mineral ivory editorial close, separating its purpose from the dark preceding sections/footer. Large ink/bronze typography and a short invitation sit beside four open underline fields. Shared email and both phone channels stay visible; full addresses live in the footer. Name, email and message are required; service is optional. Company/phone/industry/asset/location fields, the separate Your brief panel and download action are retired. Prepare email encodes those four fields into a mailto draft with a service-specific subject. The form explicitly explains the email-app handoff and does not imply server delivery.

## Validation

- Final lint/typecheck and isolated `.next-polish-review` production build pass on pinned Next.js 16.3.8. Build-added tsconfig paths removed; existing wildcard coverage retained.
- Seven production viewports: 1440×1000, 1024×768, 768×1024, 390×844, 320×700, 740×390 and 720×450. Document width checked against clientWidth (excluding the scrollbar), with no document/field overflow or broken loaded images. Contact heights approximately 586/495/771/803/935/769/767px respectively. `layout.json`. 720×450 is a viewport equivalent, not actual browser zoom testing.
- Mobile header contracts and restores at scrollY=0. Mobile Menu → Sectors closes/navigates and focuses its target. Hero Internal inspections link reaches the real service disclosure. Window washing selector is pressed and opens its matching service in production.
- Native sector changes expose context immediately (measured 0px gap after selected summary). Mining opens and closes with Enter. First Power generation click closes the default-open item; subsequent selections each show exactly one inline detail. `sector-selection.json`, `verification.json`.
- Empty submission focuses required Name; invalid email focuses Email and blocks draft generation, with native readable validation feedback. Keyboard order after Name is Email → Service → Message → Prepare email, each with a visible solid outline. Service selector includes Window washing; only Name/Email/Message are required. `verification.json`.
- Captured production console errors: none. Prerendered root/home exclude localhost/127.0.0.1, preserve `https://skyi.co.za/home/` canonical and `https://ropeaccess.co.za/` sister handoffs, and exclude retired brief/download/old service UI.
- No-JS/reduced-motion source paths inspected, not live-emulated in this pass: unenhanced form hidden, direct mail/phone links available, native sector disclosures use normal flow, no-JS header identities remain absolute, reduced-motion styles/runtime gates retained.
- Paired production Contact captures: `contact-desktop.png`, `contact-mobile-390.png`, `contact-mobile-320.png`. Mobile hero/choices and inline sector captures accompany them. Browser review uses the Codex in-app Chromium browser on Windows; no physical device/other-engine certification.

No external mail-app draft opening or actual mail delivery tested. Hosting/delivery, claims inventory, deeper routes and release gates remain open. Exact next task: Ishe reviews `http://localhost:3006/home/#contact` and the integrated six refinements under S03-L, then agrees S04-A scope. No deployment or upload.
