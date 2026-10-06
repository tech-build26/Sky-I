---
name: skyriders-release
description: Prepare and verify Afrihost upload artifacts, runtime configuration and launch checks for the Skyriders and Sky I websites. Ishe performs the upload.
---

Read the hosting section of `docs/architecture.md` and current STATUS. Afrihost shared hosting has a requested Node.js service activating 28 September 2026; account capabilities are not verified. Confirm runtime/startup/app mappings before choosing standalone Node or an approved static-export fallback.

Produce separate brand artifacts with verified canonical URLs, correct internal destinations, runtime dependencies and public assets. Keep generated outputs outside source folders. A Windows build with native modules is not automatically Linux-deployable. Use a compatible build/runtime path and verify it.

For standalone Next output, include the generated server and dependencies, `.next/static` and `public` in correct relative locations. Test from the packaged directory, not only the source checkout. For static export, prove there are no required server features and document the agreed enquiry backend/image strategy.

Package only deployable files: no source brochure, scratch renders, secrets, local .env, instruction files or node_modules copied indiscriminately from Windows. Include a manifest, checksums, actual startup/upload paths, environment setup, restart and rollback instructions matching the host. Never promise uploading TypeScript source alone starts the app.

Verify each brand's routes, assets, metadata, redirects, error pages and enquiry behaviour. Search built HTML, metadata, image/asset names and sitemap for restricted client names, including Sasol and Eskom; remove any unapproved publication before packaging. Distinguish local checks from live checks. Assign mechanical packaging to Gemini; use Sol for release review. Ishe uploads himself; no DNS changes or deployment without a new explicit request.

Current independent-workspace boundary (6 October): operate on Sky I here. Read docs/site-split.md and this repository's alpha.md; the sister site has its own application/repository. Shared historical skill names do not authorise rebuilding its home here. Next.js 16.3.8 is owner-approved for both. Cross-brand links reach the other root pre-landing.
