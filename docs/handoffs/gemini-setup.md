# Assign to Gemini — P01 environment setup

Use this document as the complete next-chat prompt for Ishe's Gemini assignment. F05 design approval was given with refinements on 27 September and is recorded in `docs/design/direction.md`. Work inside `C:\Users\ISHE-GAMING\Desktop\App Dev\Ropeaccess`. Read AGENTS.md, GEMINI.md, STATUS, the P01 task and `.agents/skills/skyriders-web/SKILL.md`.

## Outcome

Create a verified, minimal Next.js 16.3.6 development environment under the new `web/` child folder. Preserve every existing root file and source asset. This folder strategy avoids moving the brochure, images, research or skills. Do not implement the pre-landing or change the approved visual direction during setup.

## Steps

1. Inventory existing `web/`, Git state if any, Node and npm versions. If an application already exists, inspect and reuse it rather than recreating it. Do not initialise a nested Git repo.
2. Query npm for `next@16.3.6`, its peer dependencies/Node engine and current security notes. The version was confirmed on 27 September. If it has become unsuitable, record the concrete issue and obtain a version decision; no silent downgrade or upgrade. Match an actively supported Node LTS that Afrihost can run.
3. Scaffold using the official pinned create-next-app version in an empty `web/`, selecting TypeScript, ESLint, Tailwind, App Router, src directory and `@/*` alias. Inspect the CLI help for exact flags. Never invoke a scaffold over a nonempty folder or use overwrite/force to resolve collisions.
4. Verify `next` is exactly 16.3.6. Pin compatible React/React DOM/TypeScript and build dependencies to the resolved versions; commit an npm lockfile when Git is available and commits are authorized. Do not invent dependency versions from memory.
5. Add only Motion and Lucide React if required by the approved implementation plan. No GSAP, Lenis, Three.js, Redux, CMS, database or UI kit by default. Avoid telemetry installers or upstream skill launchers.
6. Keep starter application minimal; remove demo artwork only from new scaffold-generated files. Provide scripts for dev, build, start, lint (ESLint CLI), and typecheck (`tsc --noEmit`). Preserve generated version-matched framework guidance in nested AGENTS files without overriding root product rules.
7. Add `.env.example` with public brand selector and canonical URL placeholders as documented in architecture. Do not add credentials. `.gitignore` must exclude node_modules, build/cache output, local env files and scratch artifacts while allowing `.env.example`.
8. Verify `npm ci`, lint, typecheck and production build. Start a local server briefly and confirm the starter page responds; stop it if no preview is needed. Report genuine dependency/platform failures in STATUS with the relevant command and bounded error.
9. Keep root originals unchanged. As part of P01, copy `hero-bg.jpg`, `sky-bg.jpg`, `rope-cutout.png`, `elios_3.png` and `sky-logo.png` into `web/public/images/` with stable names; record the mapping. Do not resize or recompress them yet; P05 owns production derivatives. `sky-logo.png` is Skyriders, not Sky I. The approved wordmark serves Sky I until a logo arrives.
10. Update P01 checkbox only after checks pass. Record versions, commands, outcomes, files needed by the next model, remaining issues and next task P02 in STATUS. Do not deploy.

## Acceptance

Existing source assets unchanged; raw copies available in `web/public/images/`; reproducible lockfile; requested framework version; compatible runtime; lint/typecheck/build passing. No product design implementation. Root skills and documents remain discoverable.

## Response format

Follow AGENTS response rules. Mention only blocking errors or required environment details. Durable handoff belongs in STATUS rather than a long chat recap.

## Reusable new-chat prompt

"Continue the Ropeaccess / Sky I project at `C:\Users\ISHE-GAMING\Desktop\App Dev\Ropeaccess`. Read AGENTS.md and docs/STATUS.md. Execute only task [TASK ID] in alpha.md using its matching project skill. Preserve approved decisions. Update task status and the handoff with actual verification evidence. Follow the project's concise response rules."
