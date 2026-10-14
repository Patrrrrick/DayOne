# Day One — Illustrated Journey

Open `index.html` in a modern browser. Keep the adjacent `assets` folder with it. No build or installation is needed. Images are local, so the prototype also works offline; official source links require internet.

Optional local preview:
```sh
python3 -m http.server 8123 --bind 127.0.0.1
```
Visit http://127.0.0.1:8123.

## Current design
Single-column cards inspired by the supplied journey reference: warm ivory background (#F7F6F1), navy text (#20344A), cobalt actions (#194CCA), light borders, 20px rounded cards and 2.4:1 illustration covers. The 52px top system-safe region is retained. Each step includes a longer explanation from the previous iteration.

Six original AI-generated editorial illustrations are stored in `assets/step-1.png` through `step-6.png`. They depict care selection, finding a clinic, booking, preparation, reception and follow-up. They are conceptual illustrations, not photographs of the named clinic. The user's latest reference overrides the prior flat-vector-only illustration direction.

## Components and behavior
- `cards`: shared six-step data, rendered as ordered single-column cards.
- Phase links jump to Before, During and After sections.
- All six cards open a shared, data-driven detail modal. Start guide opens Step 01. Each detail contains What this step is for, Why it matters, practical guidance, a resource, Good to know, and linked sources.
- Modal: card-origin animation, independent scrolling, fixed actions, background lock, focus trap, Escape/X dismissal and scroll restoration.
- Save uses localStorage with an in-memory fallback.
- Save is independent for each step, persisted locally. The previous Find a GP saved state is migrated.

## Verification
Latest in-app browser checks: 402 × 874 and 375 × 874, no horizontal overflow; all six local cover images loaded; Find a GP opens the existing modal and X closes it. Updated overview screenshots are `overview-illustrated-402.jpg` and `overview-illustrated-375.jpg` beside this folder. Full-page captures show all six steps.

Earlier interaction checks confirmed independent modal scrolling, Save toggling, keyboard focus wrapping, Escape dismissal, and restoration of non-zero overview scroll. Reduced-motion handling is present but not emulated in browser QA.

Official source: https://services.unimelb.edu.au/health (retrieved 14 October 2026). No current fees, opening hours or appointment availability are invented.

## Six-detail expansion
All six modal titles, purpose sections and source links checked at 402px and 375px with no horizontal overflow. Verified independent Save state, internal scrolling, background locking and X/Escape dismissal. Fixed Escape during opening animation. The same modal renderer and animation logic is used for every step, with focus returned to its triggering card (or Start guide).

Content verification and per-step links: see SOURCES.md. Sources are also shown inside each detail with the verification date, 14 October 2026. This date is our check date, not the source publication date.

## Real-photography iteration
All visible illustrations have been replaced with six locally stored Pexels stock photos (assets/photo-1.jpg to photo-6.jpg). Photo credits and source/license links are in PHOTO-CREDITS.html, also linked from the overview footer. Stock scenes do not depict the named Melbourne clinic. The supplied Day One logo is displayed via a CSS crop of brand-reference.png. The header now follows the supplied brand / categories / photographic banner structure. The four category labels are static prototype context; the Before/During/After links remain functional. Title: Health Care Journey. All CSS corner radii are at most 15px.

## Mobile step navigation update
Removed Start guide. Each detail now has one plain-language introduction instead of separate What/Why headings. Swipe vertically on the fixed header/hint or left rail to change steps; normal body scrolling is preserved, with outward edge swipes also changing steps. The left rail marks the current step and supports direct selection. Per-step Save remains independent. Desktop drag and keyboard arrows (from close/rail controls) are supported.

Before/During/After is sticky at top:0, scrolls to the chosen phase and updates its selected state as the overview scrolls. Category labels are now pills, an explicit exception to the preceding 15px radius cap.

Validated at 375px: rail selection, upward pointer drag from Step 05 to Step 06, independent Save, close, no horizontal overflow; During navigation reached top:0 with During selected. Touch handlers are implemented, but a physical phone was not available for hardware touch testing.

## Outside-card gestures
The persistent swipe hint is removed. Vertical gestures must begin outside the card (and outside the numbered controls). Swipe up for next / down for previous. Tap the blank area above the card for previous, or below for next. The card body only scrolls; its edges no longer change steps. The first opening briefly flashes up/down arrows, recorded in localStorage so later openings do not repeat it. Reduced-motion preferences use stationary arrows. X and Escape still close the modal; the backdrop no longer dismisses it.

Verified at 375px: bottom tap 02→03, top tap 03→02, exterior upward drag 02→03; opening again did not repeat the intro; no horizontal overflow. Physical mobile touch has not been hardware-tested.

## Compact spacing revision
Detail scroll content now has 24px inset (previously 12px); header and footer use 16px horizontal padding. Step numbers are 28px circles with no border; the active one uses the shared --link blue with white text. Overview phase headings separate Before, During and After, and phase navigation now targets these headings. Cover ratio is 3.2:1 and card titles/actions are more compact. Phase navigation is 44px high with a 32px visual selection surface; when pinned, a translucent background and 16px backdrop blur reveal scrolling content beneath. JavaScript syntax checked after this revision.

## Full app iteration — 14 October 2026
Open index.html for the app shell. journey.html preserves the approved healthcare guide, embedded under Simulate. app.css and app.js implement Home, Explore, planner, place picker, map picker, route comparison, preview, draft stop editor, simulated navigation, completion and saved routes.

Tools are presentation-only. Navigation uses icons with accessible names. Cards/buttons use max 15px radii; pills and circular indicators preserve the approved exceptions. The existing Journey palette takes precedence for consistency.

Routes/maps/timings are explicitly illustrative. No GPS, routing service, transit timetables or account backend. Search selects from seeded demo places. Interests sort route suggestions. Time includes travel and pauses. Stop editing supports insertion, removal, up/down ordering, undo and cancel/commit. Routes save in localStorage (session fallback). Navigation/completion are user-controlled demos and never create real visit records. All assets are local; opening index.html directly requires no build.

## Real map and drag editing iteration — 14 October 2026

Default journey now runs Queen Victoria Market → Baillieu Library. Seven verified discovery places replace fictional stops. See MAP-SOURCES.md for official sources, opening restrictions, image provenance, and routing methodology.

All map screens use OpenFreeMap’s standard street basemap with MapLibre/Leaflet. A packaged OSM vector snapshot provides a local fallback. The online basemap needs internet; app code, the route geometry and place data are local. No location permission or API key is required.

Edit your stops now keeps the route and a horizontal discovery shelf visible together. Drag a discovery card into the route, or drag an existing stop’s grip to reorder it. The insertion line appears only during dragging; no permanent insert rows are shown. Edge scrolling supports longer routes. Dropping outside cancels. Added cards become numbered stop rows. Keyboard: focus a card/grip, Space, arrows, Enter; Escape cancels. +Add is an accessible fallback. Undo and Cancel preserve draft/committed separation. Category tabs and shelf arrows expose the larger discovery collection.

Validation for this iteration: checked 375×812 and 402×874 layouts; dragged Lincoln Square between two stops, reordered it, cancelled an outside drop, inserted using the keyboard, opened source details, and verified undo/cancel and over-budget blocking. All 81 precomputed walking legs passed finite-distance, reversed-distance and geographic-continuity checks. Online street-map loading was verified with OpenFreeMap attribution visible.
