# Direction 02 review

Date: 27 September 2026. Scope: disposable `preview.html`, not a production Next.js app.

- Verified in the browser: both desktop brand variants, Skyriders at a 320px viewport and Sky I at a 390px viewport. The document reported no horizontal overflow at the mobile widths. Both links, the site-specific vertical label, social destinations, larger logos, subject images and all six industry entries were visible in the accessibility tree.
- The combined scene puts the headline and both brand choices in one page. On mobile, the current brand appears first in natural scroll flow. The transparent technician needs no CSS polygon or added glow. Sky I uses `sky-bg.jpg`, cropped to prevent its photographed drone from competing with the selectable Elios foreground.
- Saved captures: `desktop-skyriders.png`, `desktop-skyi.png`, `mobile-skyi.png`. The local review URL is `http://127.0.0.1:8765/docs/design/preview.html` while the server is running. The preview is also a standalone HTML file with local fonts and assets.
- Motion: short staggered entries from four directions, gentle drone drift, seamless six-industry track with a pause control. `prefers-reduced-motion` removes all movement and keeps everything visible. Semantic links and copy remain in the HTML without JavaScript; preview link destinations deliberately point to review notes until full-site routes exist.
- Client confidentiality is recorded in `AGENTS.md`, `GEMINI.md`, the content/release skills and the project plan. No restricted client names appear in the preview's public copy or metadata.
- Production accessibility, assistive technology, performance, contact behaviour and host compatibility remain implementation acceptance work. The future Sky I logo is still unsupplied; the typographic wordmark is the approved interim mark.
