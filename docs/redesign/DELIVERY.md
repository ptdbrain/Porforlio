# PTD. — Cinematic Editorial × Technical Precision

Implementation: 11 November 2026. Scope: local codebase, preserving PTD. and “Một con người. Hai câu chuyện.”

## Audit before implementation

- React 18, Vite 6, plain CSS, local Be Vietnam Pro / Manrope / Sora / IBM Plex Mono. Custom history router, VI/EN content, esbuild + React SSR prerender for 28 HTML pages. No Next.js migration was needed.
- Active entry: `src/App.jsx`, `src/components/editorial/*`, Work V4. Older cinema/work/portfolio implementations remain in the repository; they are not all active routes.
- Existing capabilities verified in source and tests: native View Transitions with WAAPI fallback; browser history and scroll restoration; project filters and saved origin focus; keyboard capability tabs; interactive pipeline; sticky Personal chapters; modal focus trap, Escape and focus return; scroll progress; motion toggle and OS/low-power preference; copy email status; CV and external links; route-specific metadata/prerender.
- GSAP and Motion are installed, but the active editorial motion already uses CSS, IntersectionObserver and WAAPI. No new animation dependency was introduced.
- Baseline problems: Home had no proof/highlights; Work archive followed capabilities and experience with no early visual featured section; every project cover was empty; case TOC had too many stops; all project lessons were empty; empty Present/Now/Future/hobby media still occupied public UI. Personal showed every award at once. Repeated folding/ambient effects competed with reading. The seven-second video was an automatic gate on first visit.
- Baseline screenshots at 1440/820/390 px and local PerformanceObserver measurements are saved by `scripts/audit-experience.cjs`. The production domain could not be inspected through the available web fetch, so visual/performance conclusions refer to the repository's production build.

## Implemented flow and files

| Area / file | Change |
| --- | --- |
| `Home.jsx` | Line-masked name reveal, real portrait, profession, CV, Highlights before Two Stories, opt-in intro replay. Research and applied-AI cards link directly to cases; experience card links to Work evidence. |
| `FeaturedProjects.jsx`, `Work.jsx` | Four curated projects: LLMFeed, AdverTest, MedTutor, ParkingAI. Order: Hero/proof → Featured → Experience → Capabilities → searchable 23-project archive → Contact. Roles and actual status/stack shown. |
| `ProjectVisual.jsx`, `CinemaFrame.jsx` | Reusable visual with real cover when supplied, otherwise a clearly labelled documentation diagram. No fake screenshot, dashboard, metric or before/after output. |
| `Personal.jsx` | Portrait-led intro, three populated chapters, four defining moments, remaining awards/training in disclosure, real sports photos, persistent bridge to Work. Empty content stays in JSON. |
| `CaseStudy.jsx`, `useReadingSections.js` | At a Glance from existing project text, six major TOC stops, desktop active indicator, mobile disclosure, scroll/manual pipeline selection, conditional contribution/results/lessons, visual Next Project. Internal section IDs preserved where content exists. |
| `Shared.jsx`, `images.mjs` | Responsive source sets and intrinsic image dimensions; empty Photo/EmptyText return no public placeholder; animated lightbox with grouped previous/next controls, keyboard arrows, Escape and focus return; finite modal exit; text-only training layout when no certificate exists. |
| `useRouteTransition.js`, `App.jsx` | Media snapshots from project cards to destination hero, story card to Work/Personal photo; no duplicate transition names. Existing cancellation, Back, scroll restoration and unsupported-browser/reduced-motion fallback retained. |
| `experience.css`, `useSiteMotion.js` | Shared durations/easing, line/image reveals, subtle fine-pointer portrait parallax (max ±5/6 px), restrained hover, FLIP archive reorder/entry, finite transitions (section accents use visibility rather than continuous background drift); Personal photo travel capped at 10px with no scroll folding on mobile. Ambient loops removed from active entry. |
| `NeuralIntro.jsx`, `index.html` | Video plays only after explicit request; skip/audio/pause available. Content loads independently. Font preload reduces late text changes. |
| `project-maps.mjs`, `public/project-maps/`, `public/og/` | 23 diagrams generated from the existing pipeline node titles/stack, with explicit documentation labels; matching PNG social previews. Canonical/sitemap defaults corrected to ptdbrain.vercel.app. |
| `optimize-photos.py`, `imageManifest.json`, `public/media/` | 14 actual photos converted to responsive WebP derivatives (up to 640/1280 px, never enlarged); original JPGs retained and used for lightbox/evidence. |
| `usePortfolioEvents.js` | Ephemeral `ptd:analytics` events for page views, CTA/CV/case opens and 25/50/75/100% scroll. No IDs, search terms, cookies, persistence or network sending. DNT/GPC respected. An analytics service is not configured. |

## Motion ownership

- `experience.css`: editorial tokens (180ms controls, 320ms cards, 560ms sections, 760ms image reveal, 460ms page enter; shared media 620ms).
- Home: clipped lines and portrait mask once; hover/focus arrows; pointer drift only with a fine pointer and full motion.
- Work: existing observer owns `[data-work-reveal]`; filter grid owns its FLIP animation; tab panels retain their footprint. No second library controls the same nodes.
- Personal: existing chapter observer and one photo hook, limited to translation; sticky images crossfade/slide 18px. Touch keeps photo surfaces stationary.
- Cases: selected architecture step responds to natural scroll until manually selected; no pinning or scroll hijack. Gallery transitions preserve dimensions; Next Project links to a real route.
- Route transitions commit navigation immediately; snapshot/fallback animation does not block links. OS reduced motion/manual Simple view disables parallax/FLIP/shared transforms. No permanently animated companion/particles.

## Asset generation / maintenance

- `npm run assets:photos` requires Python Pillow only on the authoring machine. It preserves `anh/` and `public/anh/` originals. The generated manifest/derivatives are committed; production needs no Python.
- `npm run assets:maps` requires ImageMagick `magick` on the authoring machine for PNG export. It reads `portfolio.json`; diagrams reflect the documented summary, not a claim to reproduce the full implementation. Production serves committed SVG/PNG files.
- Add real project covers at `projects[].media.cover` with bilingual `media.alt`. Add actual gallery assets to `media.gallery`; current components use them automatically. Regenerate diagram/OG assets when a documented pipeline changes.
- Add chapter text/image in `education`; empty chapters remain hidden. Fill `present` / `dreams` / hobby captions or images when ready; they are preserved but hidden while empty.

## Validation and measurement

Final validation and measurements are recorded below. Baseline and after screenshots/raw measurements: `/tmp/ptd-redesign/`. These are local laboratory checks, not CrUX/field p75 measurements or a guarantee of 60 FPS on all devices.

## Real material still needed

1. **LLMFeed:** paper figure/pipeline, approved experiment chart with protocol and limits; confirm publication link remains the intended public reference.
2. **AdverTest:** real comparison UI, clean/adversarial examples, evaluation protocol, current demo if available.
3. **MedTutor:** actual UI with citations, anonymized retrieval example and demo recording.
4. **PRISM:** stage/bit budget figure, measured quality/runtime/memory results with hardware and baseline context. No unverified speedup claims have been added.
5. **ParkingAI:** real dashboard/camera event screenshot, labelled demo/mock vs live mode.
6. Higher-resolution THCS/THPT/robotics originals: current small photos are 206×206. Portrait original without phone screenshot bar would also help.
7. VinUni completion certificate/date (completion itself is user-confirmed), optional LLMFeed/other milestone photos.
8. Actual personal reflections for the four moments; current learning/building/exploring, future plans, hobby photos/captions, project lessons and any missing personal contributions. Nothing has been invented to fill these gaps.
9. Optional analytics destination/consent policy if server-side collection is wanted. The current integration only emits in-memory events.

## Before / after screenshots

Screenshots use the production preview, a 900px-tall viewport and reduced motion to make the resting layout comparable. They are real browser captures, exported as JPEG for this report. All 12 original PNG views at 1440/820/390px remain in `/tmp/ptd-redesign/`.

| Page | Desktop before | Desktop after | Mobile before | Mobile after |
| --- | --- | --- | --- | --- |
| Home | [Before](screenshots/before-1440-_.jpg) | [After](screenshots/after-1440-_.jpg) | [Before](screenshots/before-390-_.jpg) | [After](screenshots/after-390-_.jpg) |
| Work | [Before](screenshots/before-1440-_work.jpg) | [After](screenshots/after-1440-_work.jpg) | [Before](screenshots/before-390-_work.jpg) | [After](screenshots/after-390-_work.jpg) |
| Personal | [Before](screenshots/before-1440-_personal.jpg) | [After](screenshots/after-1440-_personal.jpg) | [Before](screenshots/before-390-_personal.jpg) | [After](screenshots/after-390-_personal.jpg) |
| MedTutor | [Before](screenshots/before-1440-_projects_medtutor.jpg) | [After](screenshots/after-1440-_projects_medtutor.jpg) | [Before](screenshots/before-390-_projects_medtutor.jpg) | [After](screenshots/after-390-_projects_medtutor.jpg) |

Section views: [Highlights](screenshots/detail-highlights.jpg), [Featured Work](screenshots/detail-featured.jpg), [Chapters](screenshots/detail-chapters.jpg), [Architecture](screenshots/detail-architecture.jpg).

## Scroll profiling correction

The first full-motion lab run exposed high frame intervals despite fast loading. Isolating the causes on Work showed: original trial median ~83ms, disabling header blur alone ~67ms, disabling the inherited root progress variable alone ~50ms, disabling section drift writes ~17ms; disabling all three gave median ~17ms and p95 ~17ms in that diagnostic run. This diagnostic is not the final benchmark and is not a field FPS claim.

Implemented correction: reading progress now writes only the bar transform, `--work-progress` is registered as non-inheriting, section drift/arrival writes were removed, section accents use finite visibility transitions, and the Work header is opaque without backdrop blur. The complete benchmark is rerun after these corrections. Its raw first-pass results remain in `performance-first-pass.json` for traceability.


## Final checks

- `npm run lint`: pass, including new hooks/helpers.
- `npm test`: **34 / 34 pass**. The deploy test runs the production build and prerender.
- `npm run test:e2e`: **113 pass, 1 intentionally skipped**, 3.4 minutes. The skip is the desktop-only sticky Personal layout on mobile. Both the desktop and touch/mobile projects ran. An additional **2/2** regression checks confirm Back returns focus to the originating Featured card after the final focus refinement.
- Production build: **28 prerendered pages**. Final JS **403,706 bytes raw / 119,663 gzip**; CSS **162,004 raw / 30,599 gzip**. No added runtime animation dependency. Compared with the original build, JS grew ~18KB raw for the added content, visuals and interactions; the much larger bandwidth reduction comes from photos and eliminating automatic video loading.
- Axe checks: no WCAG 2 A/AA/2.1 AA violations in the tested Home/Work/Personal/Contact/representative cases. Keyboard tab order, dialogs/Escape/focus return, mobile menu, case TOC, copy email status and architecture selection covered. This is automated plus keyboard verification, not a full screen-reader certification.
- Browser: **Google Chrome 157.0.8103.38 on Linux**. Widths 1440, 820 and 390px captured; 320px capability layout and VI/EN tested. No horizontal overflow or page/hydration errors in the 12 final screenshot routes. Runtime reduced motion, low-power/manual Simple view, unsupported native transitions, Back/Forward, direct links and no-JS prerendered content checked.
- Firefox, Edge, Safari/iOS and physical midrange phones were **not** run in this environment. No cross-browser or device-wide 60 FPS claim is made.

## Final performance lab

Production preview on `127.0.0.1:4176`, Chrome headless, full motion forced, cache disabled, emulated 40ms network latency, 10Mbps download / 2Mbps upload. Three new-context load samples per route/viewport; the table uses their median LCP/CLS. Desktop 1440×900 uses CPU ×1; mobile viewport 390×900 uses CPU ×4. This is a viewport/CPU simulation, not a real phone. Browser font/OS caches and host scheduling can still affect results.

Scroll sample: one native CDP gesture per route/viewport, ~1800px at 600px/s, 184–186 observed requestAnimationFrame intervals. The p95 is the interval percentile during that gesture, not GPU presentation telemetry or a field FPS guarantee. No other Codex browser tests ran concurrently with the benchmark.

| Route | Desktop LCP | Mobile LCP (CPU ×4) | Max CLS across all six loads | Scroll interval p95 desktop / mobile |
| --- | ---: | ---: | ---: | ---: |
| `/` | 0.444s | 0.340s | 0.002242 | 16.7 / 16.7ms |
| `/work` | 0.504s | 0.356s | 0.000211 | 16.8 / 16.7ms |
| `/personal` | 0.428s | 0.336s | 0.000003 | 16.7 / 16.8ms |
| `/projects/medtutor` | 0.228s | 0.300s | 0.000003 | 16.7 / 16.8ms |

Across the recorded gestures, no observed interval exceeded 25ms after the scroll correction. This supports smooth motion in this specific test configuration. **INP, CrUX/field p75 and Lighthouse scores were not measured**; they are not inferred from these results.

Raw results: [final performance](performance.json), [first-pass performance before scroll correction](performance-first-pass.json), [original visual/load baseline](baseline.json). Reproduce with `npm run build`, `npm run preview -- --port 4176 --strictPort`, then `node scripts/measure-experience.cjs` serially after other browser tests finish.

In the separate sequential screenshot audit (same workflow before/after), cold Home transfer decreased from ~1.03MB to ~0.43MB desktop and ~0.37MB narrow viewport. This includes served resources in that workflow, not the whole repository's media size. Original JPGs are still available; automatic intro video transfer is zero until explicitly requested.
