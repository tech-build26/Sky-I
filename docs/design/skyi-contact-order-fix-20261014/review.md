# Contact clearance and closing order — 14 October 2026

Owner authorises two findings from S03-N28: correct the 320px Contact help/Back to top collision and place Before we fly between Confidence and Contact. SMTP is explicitly deferred until the remaining pages are built. Other audit suggestions remain proposals; no commit or deployment is authorised.

## Accepted scope

The floating return is suppressed whenever any part of Contact intersects the viewport, using the navigation's existing geometry update and scroll/resize lifecycle. This clears the enquiry controls before Contact becomes the active reading section and in either scroll direction. The return remains available elsewhere and the footer keeps its native return link. No extra observer, scroll/motion owner, dependency or styling change.

The closing DOM sequence is Exterior Inspection (`impact`) → Confidence (`testimonials`) → Before we fly (`safety`) → Contact → footer. The builder's original spacing, native choices, artwork and coordinated shared entrances remain intact; its selected brief goes directly into the adjacent enquiry.

## Validation

- ESLint without warnings, TypeScript and an isolated Next.js 16.3.8 production build pass. Build-generated TypeScript config changes were restored byte-for-byte.
- Development 320×740 and 390×844: Contact has no floating return, help opens and the hash remains `#contact`. At 320px an actual coordinate tap at (263,717) activates the help button rather than the hero. The selected Outside a structure / Planned downtime / Video brief reaches Contact with focus on the section.
- Development 844×390 landscape: no horizontal overflow, native builder selection works, and the immediate siblings are Confidence → Before we fly → Contact.
- Production 1440×900: keyboard builder selection and Enter handoff retain all selected values. A fresh reload confirms the expected brief without prior text. A repeated handoff appends rather than replaces existing enquiry text, as designed.
- Production 320×740: native help tap opens the explanation with no navigation away or floating obstruction; the floating return from Services and footer return both reach `#opening` and focus the hero. No horizontal overflow at the four inspected widths.
- Existing reveal roles remain registered on Before we fly. Focus completes the affected input/action entrance immediately. Static native content/order, reduced-motion/no-JS and hidden/offscreen/menu safeguards are unchanged and were source-reviewed; live fallback emulation was not repeated for this bounded fix.
- No captured browser errors; two development Fast Refresh reload warnings. Initial radio automation during hydration/entrance was retried after the client-ready action appeared, using native keyboard input. No valid enquiry or mail was submitted.

Evidence: `browser-verification.json`, `contact-help-320.png`, `production-contact-help-320.png`, `planning-desktop.png`. Phone/desktop captures visually inspected. Physical-device and other-engine acceptance, other S03-N28 suggestions and existing publication/release gates remain open.

Exact next task: Ishe reviews the selected corrections at http://localhost:3006/home/#safety and Contact, then gives explicit commit approval if satisfied. Continue remaining pages separately; defer actual SMTP configuration and two-inbox/Reply-To verification to that page work. S03-L integrated acceptance remains open.
