# Current architecture — 6 October 2026

Two independent repositories, with fixed skyi identity here. See [site-split.md](site-split.md) for the current architecture and route contract. The older combined-site notes below are historical and superseded wherever they conflict.

# Proposed architecture

5 October local presentation override: `LOCAL_PRESENTATION_DIRECT_HOME=true` in ignored `.env.development.local` makes local `homeHref` cross-brand choices open `/home/` directly. Production always retains the compulsory destination root. Before deployment follow `docs/presentation-routing.md`: remove this flag and localhost origins, verify both pre-landings/handoffs/canonicals and reject localhost in built output.

One shared Next.js source under `web/`; build a separate configured artifact for each brand. Project research, source assets and `.agents/skills` stay in the workspace root. This avoids moving or overwriting existing files to satisfy create-next-app.

Local simultaneous brand previews may set server-only `NEXT_BUILD_DIR` (for example `.next-skyi`) to isolate generated output. Omit it for the regular `.next` directory. Both build and start must use the same value; it does not select the brand. Generated `.next-*` directories are ignored by Git and ESLint. Sky I's fresh home composition and photographic camera response are separate components under `src/components/skyi`, with copy in `src/content/skyi.ts` and styles in `src/app/home/skyi.css`. The rejected persistent-flight component was removed on 1 October.

Use Next.js 16.3.6 App Router, TypeScript strict, Tailwind CSS v4 plus readable CSS for art direction, Motion (`motion/react`) only where needed, and individually imported Lucide icons. No CMS, database, 3D engine, smooth-scroll interceptor or second animation framework without a concrete requirement.

Suggested boundaries: `src/config/brands.ts`, `src/content/`, `src/components/prelanding/`, `src/components/ui/`, `src/styles/`, and App Router pages. Server-render useful copy and links; client components own motion and interaction. Approved tokens are shared with explicit brand variations.

## Route contract

| Page/action | Behaviour |
| --- | --- |
| `/` on either domain | Brand-specific single-scene pre-landing; centred headline and both choices immediately visible. Do not redirect based solely on stored preference |
| Select current brand | Navigate to `/home/`, the individual site's full hero |
| Select other brand | Navigate to the other domain's `/` compulsory pre-landing, then choose a brand |
| Direct service/project URL | Open that content directly; never force the intro |
| Browser Back | Normal history behaviour; no repeated redirect or trapped animation |
| No JS/reduced motion | Usable brand links and stable content remain available |

P04 supplies real initial `/home/` pages with distinct brand metadata and meaningful visible content. The complete sites remain R01–R06 and S01–S06 work. Do not link to routes that are not built. Both roots contain distinct brand metadata; no blanket noindex on live content. `trailingSlash: true` preserves the agreed `/home/` URL. For local two-origin testing, `SKYRIDERS_SITE_URL` and `SKYI_SITE_URL` may override the opposite brand's production origin; same-brand links stay relative.

Build-time `NEXT_PUBLIC_SITE_ID=skyriders|skyi` selects an allowlisted config. `SITE_URL` sets server/build canonical URL. These are not secrets. Validate unknown values rather than silently displaying the wrong brand. Never infer canonicals from an untrusted Host header.

## Afrihost: runtime verification before packaging

User has requested Node.js on shared hosting; activation due 28 September 2026. Public documentation did not establish this account's capabilities. Obtain Node version, supported startup mechanism, app root, environment setup, port binding, logs/restart method and whether two application mappings are allowed. Build and deployment configuration must follow actual support.

Preferred if supported: Next standalone output, two independently configured deployments. Package standalone server plus `.next/static` and `public` in their correct relative positions. Build Linux-compatible artifacts or install/rebuild native dependencies on the host; do not blindly upload Windows node_modules. Provide exact commands matching the host, checksums, rollback instructions and file manifest. Ishe uploads; do not change DNS or deploy autonomously.

Fallback if persistent Node is unsupported: discuss `output: 'export'` static builds. Pre-landing and content pages can fit this model, but server actions, runtime route handlers, ISR and the default image optimiser cannot be assumed. Images need pre-generated assets or a compatible custom loader. Contact submission then requires a separately agreed endpoint. Do not claim plain source upload is a runnable Next deployment.

## Full-site functions

Start with typed file-based content and accessible semantic pages. Decide CMS only when editing roles/workflow are clear. Contact backend requires confirmed recipient, delivery mechanism, server validation, rate limiting, honeypot/appropriate spam handling and honest success/failure UI. Never simulate sent mail. Privacy/consent requirements follow actual data collection; request owner-approved legal copy before launch. Public copy, metadata, alt text, filenames and built output must exclude unapproved client names and marks such as Sasol and Eskom; use industry categories instead.

Version evidence: npm registry returned stable `16.3.6`, Node engine `>=20.9.0` on 27 September 2026. Use an actively supported compatible Node LTS available on Afrihost. Recheck [Next.js release/security notes](https://nextjs.org/blog) at setup and release. [Static-export limitations](https://nextjs.org/docs/app/guides/static-exports).

## Brand-entry presentation contract (30 September)

`BrandEntry.tsx` in the root layout enhances only normal activation of allowlisted brand-choice links from the pre-landing. Same-origin navigation retains Next routing. Cross-origin links carry a transient `_entry=skyriders|skyi` marker; the receiving application uses its own entry treatment and removes the marker with history replacement. Canonicals stay `/home/`. Direct/deep links do not start the presentation; Back/bfcache clears it. Modified clicks, no JavaScript and reduced motion retain normal anchor navigation. Short CSS/prepaint and stalled-request timeouts prevent the decorative cover becoming a loading gate. Inline prepaint reads only allowlisted presentation values and contains no credentials. This is shared navigation infrastructure; visual home/page structures for Sky I remain separately designed under S03.

## 1 October Sky I brief implementation override

Sky I home uses CSS Modules and scoped tokens with the existing self-hosted Jost/Cormorant fonts. The shared application and pre-landing/Skyriders styling remain. GSAP/ScrollTrigger and Lenis are dynamically imported inside Sky I's provider; Motion handles UI state. The latest owner instruction authorises full landing navigation: Home, About, Services, Industries, Our approach and Contact are actual section anchors. Business contact data sits in `src/config/site.ts`; hero scene descriptors in `src/content/skyi-scenes.ts`; focused components handle gallery, decorative drone, sector selection and a local inspection-brief builder. No server enquiry delivery or new routes. See docs/decisions.md and docs/qa-report.md.

Development-only `web/.env.development.local` routes Skyriders to http://localhost:3000/ and Sky I to http://localhost:3006/. Cross-brand links always reach the destination root; same-brand root choices reach `/home/`. `NEXT_PUBLIC_SKYRIDERS_URL` is normalised to its origin root. Before cleanup/packaging remove development overrides, confirm both public domains and check built HTML for localhost links. Production builds exclude the development env file and retain https://ropeaccess.co.za/ and https://skyi.co.za/. This rule is also in AGENTS.md and GEMINI.md.
