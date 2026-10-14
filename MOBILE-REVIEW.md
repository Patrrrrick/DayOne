# Mobile layout review — 14 October 2026

Applied mobile-design and Day One guidance to the existing HTML prototype. Design dials: variance 4/10, motion 2/10, density 4/10. Existing palette, real imagery, 15px maximum card radius, icon-only navigation and prototype scope are preserved.

Changes cover Home, Explore, planning, search/map place selection, route comparison, preview, stop editing, place detail, navigation demo, completion, Account and Healthcare Journey overview/detail.

- Shared typography, spacing, safe-area values, readable metadata and 48px primary control hit areas.
- Primary action dock sits above the measured navigation bar; content reserves both heights.
- Tools use two columns so names remain readable.
- Editing prioritises the itinerary and discovery shelf. Map is expandable; short windows can scroll. Drag/drop remains, with explicit move/remove alternatives.
- Route scroll position and action focus are retained where possible; new screens focus their heading.
- Journey detail typography and internal spacing improved, phase navigation and step-rail targets enlarged.
- Reduced-motion preference respected; narrow cards reflow into one column. Light theme is intentional.

Verified in the browser: 402×874 main flow, 320×667 editor horizontal-overflow check, 812×375 map-picker horizontal-overflow and action/nav separation; planning → comparison → preview → edit; discovery drag insertion; menu reorder; search empty state; map picker; Journey detail opening/closing; four simulated arrivals and completion; Account empty state. JavaScript syntax check passed.

Remaining device validation: real iOS/Android software keyboard, VoiceOver/TalkBack, OS large-text settings, notches/home indicators on physical devices, and offline network transitions. This is a responsive HTML prototype, not a certified native application. Browser hardware-back navigation remains outside this layout revision. Small map attribution links retain provider styling; the map also offers the full-sized searchable place list.
