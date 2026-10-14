# About introduction — 6 October 2026

Review: http://localhost:3006/home/#about. Technical implementation is complete; Ishe's visual acceptance remains open.

The owner requested a complete replacement of the old static “A remote view” section, an inviting monologue, a custom About invitation and visible slide/reveal animation. “About Sky I” remains unnumbered, as does the mobile menu. Owner selected a short story preview until the dedicated About page is created. No About route has been invented.

The first-person introduction connects a remote perspective to the visitor's inspection question. It adds no equipment inventory, certification, performance, named clients, legal identity or portfolio claims. The original supplied sky-bg.jpg is reused without rewriting or generating artwork. Crop changes are presentation interactions, not inspection results. Sister-company context remains inside the preview and reaches the compulsory Skyriders root.

Each headline line, paragraph, invitation, image and closing line has its own in-view finite entrance. Titles slide in opposing directions through masks; image slides/scales through an aperture; paragraphs and invitation enter separately as they become visible. Native scrolling changes title/image placement and paragraph emphasis. Fine pointer adds bounded photograph depth. Native details preserves touch/keyboard/no-JS story access and has an animated opening. The invitation uses large editorial text and an orbiting circular arrow rather than a regular filled button. About-specific header backing prevents the existing fixed logo/menu overlapping readable copy.

## Validation

- ESLint and TypeScript checks pass. Isolated `.next-about-review` production build passes Next.js 16.3.8; build-added tsconfig entries were restored afterwards.
- Browser views at 1440×1000, 390×844, 320×700 and 740×390 have no document overflow. Desktop and mobile typography/photograph/CTA inspected; mobile menu has unnumbered readable labels.
- Story opens and closes by click and Enter. Crop controls change aria-pressed and the photograph crop in both directions. Mobile About navigation closes the menu and returns to the section.
- Native scroll variables and paragraph emphasis change with viewport position. Motion source uses individual visibility observers and automatic menu/hidden/offscreen suspension; no frame-based React state or new dependency.
- Browser error log empty. Production HTML retains the complete monologue, custom summary and story content, `https://skyi.co.za/home/` canonical, public cross-brand root links and no localhost or unbuilt `/about/` destination.
- Reduced-motion and static/no-JS paths inspected in source/prerendered HTML. Live browser preference/no-JS emulation, image-failure injection, physical devices and other browser engines were not tested in this bounded pass.

Screenshots are local ignored evidence: desktop.jpg (complete section), mobile-390.jpg. Parent S03-N visual acceptance, service/equipment confirmation and host/release gates remain open. No deployment/upload.

Exact next task: Ishe reviews this About introduction, then continues S03-N section refinements. When the About page is requested and implemented, connect the existing invitation to that real page and retain accessible static routing.

## Follow-up: social rail

Owner replaces the fixed family link with the pre-landing's vertical social rail. Shared SocialRail preserves the original SVG paths, circular styling, separator lines, platform colours, external destinations and accessible Skyriders ownership labels. Desktop uses the former right-hand fixed position; mobile has the same vertical rail inside the menu. It participates in menu background isolation and retains the existing home entrance. Other sister-company links remain.

Lint/typecheck and production build pass. Desktop 1440×900 rail and mobile 390×844 menu checked: both links are 44×44, match original Facebook/LinkedIn destinations, no page overflow or browser errors, and background rail is inert while the menu opens. Production home HTML excludes the former family rail and root HTML preserves both social destinations. Local screenshot: social-rail-desktop.jpg. No deployment.

## Follow-up: sketch frame and shadow

Owner adds an overlapping sketch border and shadow around the About photograph. Two irregular bronze SVG strokes, slightly rotated, cross inside/outside the image edge; non-scaling strokes maintain their pen weight. Soft layered CSS shadow increases on hover/focus. Frame is decorative, pointer-transparent and included in the existing photo reveal; no image changes or dependencies. Mobile frame offsets shrink to remain inside the page gutter.

Lint/typecheck/Next.js 16.3.8 production build pass. Browser review at 1440×1000, 390×844 and 320×700 shows no horizontal overflow; mobile crop selection remains functional. Screenshot: sketch-frame-desktop.jpg. Exact next task remains owner review; no deployment.

## Follow-up: thicker sketch, transition and stuck-header repair

Outer sketch stroke increases to 3.4px; inner line/shadow unchanged. SkyIThreshold provides a connected curved aperture and large “Look closer” text that shifts/inverts contrast across the opening surface. Native scrolling drives/reverses it; no fixed cover, pinning, wheel capture or idle animation. About opening spacing joins the bridge. Static/no-JS/reduced-motion rendering keeps the edge and readable copy.

The white strip was the fixed page pseudo-element added in N1, gated by stale About state. The old intersection observer omitted the hero and never reset on scrolling up. That pseudo-element is removed. Navigation now derives state from actual ordered section positions on scroll, resize/content changes and pageshow, with explicit hero inclusion and state writes only when the section changes.

Lint/typecheck/Next.js 16.3.8 production build pass. Two desktop 1440×900 scroll-down/up passes reached About/progress=1 and returned to hero at scrollY=0, opening state, zero current links and progress=0 without reloading. Mobile 390×844 Menu/About routing and 320×700 reverse scroll work; layouts have no overflow. Production HTML keeps the static transition/story/canonical and excludes localhost. Browser error log checked. Source paths cover no-JS/reduced motion; live preference emulation, other engines and physical devices remain untested. Evidence: scroll-verification.json, threshold-desktop.jpg, threshold-mobile-320.jpg, hero-return.jpg. Exact next task: owner reviews this transition from /home/ and back up, then continues S03-N. No deployment.
