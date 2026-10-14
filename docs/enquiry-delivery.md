# Sky I enquiry delivery — 13 October 2026

Ishe selected Afrihost SMTP and explicitly confirmed that every enquiry must reach **info@ropeaccess.co.za** and **reception@ropeaccess.co.za**. These are fixed server recipients; visitors cannot supply recipients. One SMTP message addresses both mailboxes. The authenticated sender is configured privately; the visitor is Reply-To.

## Private configuration

Use ignored `web/.env.local` locally and server environment variables on the eventual Node host. Never put secrets in chat, source control, browser code, screenshots or `NEXT_PUBLIC_` variables.

| Variable | Required value |
| --- | --- |
| `SMTP_HOST` | Exact authenticated mailbox hostname from Afrihost ClientZone/cPanel; do not guess |
| `SMTP_PORT` | `465` with implicit TLS, or `587` with required STARTTLS |
| `SMTP_USER` | Mailbox login supplied by Afrihost |
| `SMTP_PASSWORD` | Mailbox password, added privately |
| `SMTP_FROM` | A mail-server-authorised `@ropeaccess.co.za` address; example `info@ropeaccess.co.za` |
| `SITE_URL` | Confirmed public Sky I origin in production |

Restart the app after adding settings. From `web/`, run `node scripts/verify-smtp.mjs`. This checks TLS, connection and authentication without sending email. It does not establish sender permission, recipient delivery or inbox arrival.

Then submit one clearly labelled test through the configured form and confirm it appears in **both** inboxes, including spam folders, and that Reply targets the test visitor. Check the sender's authentication/delivery settings with the mailbox administrator if needed. Live delivery is **not yet verified**; no credentials were available during implementation and no real messages were sent.

## Behaviour and limits

- Missing configuration exposes the honest “Prepare email draft” fallback. All native email actions include both recipients. No-JavaScript visitors have direct email/phone links.
- Configured forms show pending, accessible field errors and actual SMTP failure/acceptance. Success requires acceptance of both addresses by SMTP; acceptance does not guarantee inbox arrival. Failed attempts keep form values and the planning brief.
- A 15-minute, bounded **per-process** idempotency cache joins concurrent requests and retries only missing recipients after partial acceptance. Restart, expiry, multiple workers and uncertain network outcomes can permit duplicate delivery. This is not a persistent delivery queue.
- Server validation, streamed body limits, honeypot/timing checks, origin/content-type gates and a bounded per-process rate limiter are implemented. Before publication, Afrihost must confirm the trusted forwarded-IP header and proxy sanitisation. Multi-worker/public abuse protection needs host-appropriate controls; origin checks alone do not stop non-browser bots.
- Credentials stay on the server; TLS certificate validation remains enabled. Payloads and credentials are not logged by this implementation. The website has no enquiry database; mailbox/host retention is separate. The short on-page notice does not settle the existing publication privacy/legal-identity gate.
- `/api/enquiry/` needs a supported Node runtime. Static export cannot provide this endpoint. Ishe handles upload; no package, DNS change or deployment is authorised here.

Evidence: [implementation review](design/skyi-conversion-implementation-20261013/review.md), actual route/mail modules tested with a mocked network transport, production form checks and failure scenarios. Conversion tracking remains deferred at Ishe's request.
