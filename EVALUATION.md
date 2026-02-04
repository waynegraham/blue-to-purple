# Application Evaluation

## Overview
The application is a React/Vite single-page interface that renders a curriculum of Brazilian Jiu-Jitsu techniques. Users can search through curriculum data, open an embedded YouTube video for a specific technique, toggle dark mode via Flowbite's `DarkThemeToggle`, and access related belt-level guides through the navigation bar. The curriculum data itself lives in `src/data/moves.json`, while presentation is primarily handled by `App.jsx`, `Navigation.jsx`, and `Footer.jsx`.

## Existing Strengths
- **Search-driven filtering** – `App.jsx` filters curriculum sections client-side based on the search field, narrowing both section titles and individual move metadata without mutating the source data. 
- **Video modal workflow** – Selecting a move opens a modal overlay that embeds the move's YouTube clip and provides clear controls for dismissal.
- **Dark-mode awareness** – The Flowbite-based navigation exposes a built-in theme toggle so that both light and dark palettes are handled with the same markup.

## Gaps and Risks Observed
- **Analytics initialization duplication** – `ReactGA.initialize` is called both directly within the `App` function body and inside `useEffect`, which risks duplicate initializations and redundant network calls each render.【F:src/App.jsx†L13-L34】 Consolidating initialization into a dedicated module or guarding execution is recommended.
- **Modal state cleanup** – Closing the modal clears the `selectedVideoId` but leaves `modalTitle` populated, causing the stale title to flash briefly if the modal re-opens before the effect completes.【F:src/App.jsx†L22-L27】【F:src/App.jsx†L120-L152】 Resetting both pieces of state together would avoid leaking previous context.
- **Keyboard accessibility** – The Escape key handler is registered globally but relies on the component re-render to keep the closure fresh. A React ref combined with `useCallback` would better encapsulate the handler and prevent unnecessary add/remove cycles as modal visibility toggles.【F:src/App.jsx†L36-L59】
- **Navigation affordance** – The active navigation link uses both `active` and `md:text-purple-700 bg-purple-700 underline`, which can result in inadequate contrast in dark mode. Tailoring a variant for dark backgrounds would improve accessibility.【F:src/components/Navigation.jsx†L17-L33】

## Recommended Automated Tests
1. **Escape key modal dismissal** – Render `App`, open a move, then dispatch an `Escape` keyboard event and assert the iframe and title disappear. This covers the keyboard handler logic and ensures the cleanup path works.
2. **ReactGA instrumentation** – Mock `react-ga4` and verify that `initialize` and `send` are invoked exactly once despite re-renders, catching regressions when the analytics bootstrap sequence is refactored.
3. **Navigation state** – Render `Navigation` and assert that the "Blue to Purple" link is marked active while the other links are not. This ensures Flowbite props and styling remain intact during future changes.
4. **Search resilience** – Provide mixed-case search terms and confirm case-insensitive filtering, plus ensure sections with no matching moves disappear entirely.
5. **Modal title reset** – After closing the modal, reopen a different move and assert that the heading updates to the newly selected move, preventing stale state bugs.

## Additional Edits Worth Considering
- Extract the modal into a dedicated component so that keyboard handling, focus trapping, and animations can evolve independently of `App.jsx`.
- Precompute normalized search tokens (e.g., slugified names) during build time or load to improve runtime filtering performance as the curriculum grows.
- Persist dark mode preference to local storage so that user-selected themes survive page reloads.
- Add ARIA attributes to the modal container (`role="dialog"`, `aria-modal="true"`) and ensure focus shifts to the modal when opened for improved accessibility.
- Expand CI tooling beyond Jest to include ESLint and Prettier checks, aligning with the existing configuration in `package.json`.
- Install the newly declared `babel-jest` dependency (network access pending) so Jest can compile JSX during automated runs.
