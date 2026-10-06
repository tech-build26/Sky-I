# Independent-site routing — 6 October 2026

The owner requested independent sites and restored compulsory pre-landings, superseding the 5 October direct-home presentation exception.

| Workspace | Repository | Development origin |
| --- | --- | --- |
| Ropeaccess | tech-build26/Skyriders-Website | http://localhost:3000/ |
| Sky-I Website | tech-build26/Sky-I | http://localhost:3006/ |

Each workspace has its own web/ application, package-lock.json, source, public assets, node_modules and build output. Run npm --prefix web ci once, then npm run dev from the workspace root. Both servers must run for local cross-brand navigation. No brand-selection environment variable or sibling imports are used.

Both roots retain their existing one-scene pre-landings and background photographs. Sky I is left and Skyriders right on Sky I. A current-brand choice opens /home/ in the current site. Every cross-brand link reaches the other site's / first; selecting its current brand then opens its /home/. Direct home, Back, refresh, no JavaScript and reduced motion remain supported.

Next.js and eslint-config-next are pinned to 16.3.8 in both applications with the owner's explicit 6 October approval. Security reference: https://nextjs.org/blog/september-2026-security-release . React and other working dependency versions are retained. Sky I alone retains its GSAP/Lenis home dependencies; Skyriders retains its own rope and scroll motion.

Local origin overrides exist only in ignored web/.env.development.local. LOCAL_PRESENTATION_DIRECT_HOME was removed and its bypass logic retired. Never commit or package these environment files. Production must use confirmed https://ropeaccess.co.za/ and https://skyi.co.za/ roots and correct canonicals; host capability confirmation, claims review, owner upload and release approval remain required.

Original artwork and research remain preserved in Ropeaccess. Served copies retain original bytes; each application carries both pre-landing subjects and logos. The generated Sky I hero environments remain illustrative. Detached source recovery copies are local-only in Ropeaccess/tmp/site-split-backup. Historical combined-site documents describe earlier work; this document governs current workspace architecture.

Validation evidence: docs/site-split-verification.json. Final visual acceptance remains with Ishe, with R03-A and S03-H/S03-N still open. No deployment is authorised by the source split or GitHub commits.
