# Closing section spacing and transitions — 14 October

S03-N27: owner requests modest padding above/below Confidence, above Contact only, and smooth section transitions from Exterior Inspection through the footer. S03-N26's removed pale signoff strip stays removed.

Confidence has 28–48px top and 24–40px bottom padding. Contact adds 24–40px top padding; its existing internal bottom spacing stays. Section-specific variables pass through the existing page padding rules. The exterior video's final 90px fades to the next section's charcoal; Confidence blends towards Contact's mineral blue, and Contact shades into the footer. These are static background gradients, with no text or video filter.

Existing SkyIReveals retains Confidence's independent scene/roll/evidence entrances. Contact's copy and enquiry now have one entrance each (left/right 24px desktop, 12px phone, 16px rise; 140ms form delay). Six footer groups use a 20px rise and alternating small horizontal travel, with 0–220ms delays. Entries take 950ms, once, using the existing easing. Child labels/actions inherit their group instead of running competing entrances. Contact's absolute background photograph is outside the animated copy, so its containing block remains the entire section. No new controller, dependency, scroll pin, added scroll range or loop.

Keyboard focus cancels the containing entrance immediately. Registration also skips a group already containing focus. Existing hidden/offscreen/menu suspension and reduced-preference cleanup continue in the same owner. Base HTML/CSS is visible without animation. Supplied media, accepted copy, actual enquiry behavior, public/local routing and other compositions remain.

## Evidence

- ESLint with zero warnings, TypeScript, isolated Next.js 16.3.8 production build and whitespace checks pass. Task-specific auto-added tsconfig entries were removed; existing wildcard inclusions cover the build.
- In-app browser inspection: development 1280px/390px; production 320×740, 844×390 and 1440×900. No horizontal overflow. All three Confidence definitions and four visible enquiry fields remain.
- Measured 1280px padding: Confidence 38.4px/32px, Contact 32px/0px. At 1440px: 43.2px/36px and 36px/0px. Phone/landscape: 28px/24px and 24px/0px. Contact's own layout retains its existing bottom padding.
- Normal scroll shows opposing Contact poses and staggered footer groups. Six development and production footer groups settle at opacity 1/transform none. Fourteen visible production Confidence/Contact targets settle complete. No nested reveal owners inside the eight new groups.
- At 390px, keyboard activation reaches Email with form opacity 1/transform none. At 320px production, the offscreen enquiry starts in waiting state, stays waiting while Menu is open, and becomes complete/opacity 1/transform none immediately when keyboard focus reaches its field after Menu closes. No form submission or mail.
- Production HTTP response contains Confidence, Contact, footer, native fields and all eight group hooks, with no removed signoff phrases. Reduced-motion/no-JS, hidden-document and offscreen resume guards were reviewed in source in this pass; actual live preference switching, disabled-JavaScript rendering and document-hidden simulation were not repeated. This does not claim new physical-device/other-engine coverage.
- Captured browser logs contain development Fast Refresh reload warnings; no captured runtime errors. JSON and PNGs here record the focused browser checks, desktop boundary/footer, phone Confidence/form and production narrow/landscape views.

Owner integrated visual acceptance and existing SMTP, privacy/legal identity, physical-device, runtime and release gates remain open. No packaging, deployment or tracking. Exact next task: Ishe reviews http://localhost:3006/home/#impact through Confidence, Contact and footer, then continues S03-L.

S03-N26 evidence retained: the preceding removal passed lint/typecheck/isolated build/whitespace and local desktop inspection; the answer row, section bottom and Contact top all measured 771.734px before this requested spacing revision.
