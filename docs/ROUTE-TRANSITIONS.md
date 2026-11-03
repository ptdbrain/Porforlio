# Home / Work / Personal transitions

- Work enters from the left; Personal enters from the right. Returning Home reverses the direction from that story.
- Native View Transitions crossfade and subtly translate/scale the page: 680 ms desktop, 480 ms mobile. Header, progress and ambient decoration have separate snapshots to stay anchored.
- Theme colors settle before snapshot capture so text keeps its intended contrast. Hero introduction animations do not replay after navigation. Work's map nodes are already visible in the incoming snapshot.
- Navigation and Back/Forward share one controller. New navigation cancels the old animation; a version guard prevents stale callbacks from committing an outdated route. History, focus, hash destinations and Work context are preserved.
- Native snapshot callbacks commit synchronously: requesting animation frames inside them can deadlock against suspended browser rendering.
- Browsers without native support use a short Web Animations entrance. Simple view and reduced motion skip transitions.

`tests/e2e/route-transitions.spec.js` checks all six story directions, repeated navigation, header position, native transition errors, rapid cancellation, Back scroll restoration, touch navigation and fallback/reduced motion on desktop and mobile.
