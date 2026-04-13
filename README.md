<div align="center">

# AlgoViz

### A retro desktop knowledge base for Data Structures & Algorithms

![React](https://img.shields.io/badge/-React_19-black?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/-TypeScript-black?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/-Vite_7-black?style=flat-square&logo=vite)
![React Router](https://img.shields.io/badge/-React_Router_7-black?style=flat-square&logo=reactrouter)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS_4-black?style=flat-square&logo=tailwindcss)
![Vitest](https://img.shields.io/badge/-Vitest-black?style=flat-square&logo=vitest)
![ESLint](https://img.shields.io/badge/-ESLint-black?style=flat-square&logo=eslint)
![Prettier](https://img.shields.io/badge/-Prettier-black?style=flat-square&logo=prettier)

<br>

</div>

AlgoViz is a single-page application that wraps a 437-page DSA knowledge base inside a Windows 96-style desktop experience. Every topic, from primitive types to bioinformatics, lives as a lazily loaded route behind a folder window, navigable from a taskbar-driven Start menu or a full-text search panel.

## Motivation

Learning DSA is hard enough without fighting a bloated interface. Most references are either dry textbook PDFs, scattered Stack Overflow threads, or LeetCode editorials that assume you already know the answer. Nothing ties the full landscape together in one place with consistent depth.

AlgoViz is built to fix that: a single destination where every data structure, algorithm, paradigm, and applied domain is covered with the same structure and the same level of care, wrapped in an interface that's actually enjoyable to explore.

- Covers everything from Big O fundamentals to bioinformatics and blockchain in one repo
- Every page follows the same structure: big picture, core concepts, examples, glossary
- Navigation mirrors a real filesystem: browse by folder or search across all 437 topics instantly
- Retro Win96 aesthetic makes it feel like an app, not a wall of markdown

## What's Inside

**8 top-level knowledge domains, 437 fully written topic pages:**

| #   | Domain                     | Covers                                                                                                                             |
| --- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 0   | **Fundamentals**           | Primitive types, Big O / complexity analysis, bit manipulation, concurrency & synchronization                                      |
| 0   | **CS Problems & Theory**   | Classic problems (TSP, Stable Marriage, SAT, Pebble Games...), advanced theoretical problems                                       |
| 0   | **Languages & Ecosystems** | 60+ tech comparisons, frameworks, databases, cloud platforms, mobile ecosystems, paradigms, AI/ML tools                            |
| 1   | **Core Data Structures**   | Linear, non-linear, hash-based, and advanced specialized structures                                                                |
| 2   | **Core Algorithms**        | Sorting & searching, graph algorithms, dynamic programming, greedy, divide & conquer, backtracking                                 |
| 3   | **Algorithmic Paradigms**  | Brute force, D&C, DP, greedy, backtracking, randomized, branch & bound, meet-in-the-middle, two pointers & sliding window          |
| 4   | **Advanced Topics**        | String algorithms, mathematical algorithms, computational geometry, systems & concurrency                                          |
| 5   | **Applied Domains**        | Systems design, database internals, OS & kernel, distributed algorithms, cryptography, game dev, AI/ML, blockchain, bioinformatics |

## Tech Stack

**Core:**

- **React 19**: UI framework with functional components and hooks
- **React Router 7**: file-system-driven lazy route registration via `import.meta.glob`
- **Vite 7**: dev server and production bundler (port 8889)
- **TypeScript 5**: strict typing throughout

**Styling:**

- **Tailwind CSS 4**: utility classes for layout
- **Custom CSS**: hand-crafted Win96/Win97 desktop chrome, window chrome, taskbar, and DSA help-page shell

**Quality:**

- **Vitest**: unit and integration tests
- **ESLint**: zero-warning policy enforced in CI
- **Prettier**: consistent formatting
- **Husky + lint-staged**: pre-commit gate (lint + format on staged files)
- **`validate:repo` script**: custom structural checks on the route/content tree

## Repo Structure

```
src/
├── app/                            # Bootstrapping, route registration, providers
│   ├── App.tsx                     # Route declarations, Suspense wrappers
│   └── AppProviders.tsx            # Context menu, return handler, watermark
├── features/
│   ├── dsa/
│   │   ├── routes/DSA/             # 437 topic pages — one index.tsx per topic
│   │   ├── components/             # TopicPageShell, TopicPageNavigation
│   │   ├── hooks/                  # useTopicTabs (tab state + URL sync)
│   │   ├── routeManifest.ts        # Auto-discovery, slug building, legacy redirects
│   │   └── utils/                  # slugifySegment, topicPageState
│   └── win96-desktop/
│       └── components/             # DesktopChrome, StartMenu96, DesktopSearch96
├── systems/
│   └── win96/
│       └── context/                # Win96WindowManager (reducer + context)
├── data/
│   └── algoviz-explorer.ts         # Explorer tree built from route filesystem
├── styles/
│   ├── win96.css                   # Desktop, window, taskbar chrome
│   ├── win97.css                   # Button, form, and base component styles
│   ├── bin98.css                   # DSA help-page shell styles
│   └── globals.css                 # Reset + Tailwind integration
scripts/
├── validate-repo.mjs               # Structural lint (class names, encoding, staleness)
├── generate-dsa-structure.js       # Scaffold new topic pages from hierarchy config
└── migrate-to-topic-shell.mjs      # One-time migration utility
```

## Architecture

### Route System

The route system is entirely automatic; no manual route list exists anywhere in the codebase. `routeManifest.ts` is the single source of truth for all DSA pages.

**Discovery via `import.meta.glob`:**

```typescript
const dsaModuleFactories = import.meta.glob<{ default: ComponentType<Record<string, unknown>> }>(
  './routes/DSA/**/index.tsx',
  { eager: false },
)
```

The `{ eager: false }` flag tells Vite to code-split every matched file into its own lazy chunk. The result is a plain object mapping file paths to dynamic import functions. Nothing is loaded until a user navigates to a page.

**Slug building:**

Directory names like `"1. Core Data Structures"` are converted to URL segments through `slugifySegment`:

```typescript
const baseSlugify = (segment: string): string =>
  segment
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section'

export const slugifySegment = (segment: string): string =>
  baseSlugify(segment.replace(/&/g, ' and '))
```

For directories containing `&`, two URL variants are generated: one with `and` (primary) and one with a plain space (alternate). Both resolve to the same page component, which allows old links to keep working without 404s.

**Natural sort order:**

Routes are sorted using `Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })`. This ensures `10. Advanced` sorts after `2. Core` rather than before it, which is the critical detail that makes the numbered prefix system work for ordering both routes and sibling navigation.

**Adjacent navigation:**

The manifest exposes `getAdjacentDsaRoutes(pathname)` which looks up the current route in `dsaOrderedRouteDefinitions` (the numerically sorted list) and returns `{ current, previous, next }`. Topic pages use this to render prev/next buttons at the bottom of every page.

**Legacy redirects:**

37 `LegacyRouteMapping` entries declare old-to-new segment mappings. They are generated into `LegacyRedirectEntry[]` objects (`{ from, to }`) which App.tsx renders as `<Navigate replace />` routes. This keeps all old bookmarks functional as the topic hierarchy evolves.

**APIs exported from `routeManifest.ts`:**

| Export                           | Purpose                                                    |
| -------------------------------- | ---------------------------------------------------------- |
| `dsaRouteDefinitions`            | All routes with paths, alternates, and lazy factories      |
| `dsaOrderedRouteDefinitions`     | Numerically sorted list for sequential navigation          |
| `getAdjacentDsaRoutes(pathname)` | Returns `{ current, previous, next }` for a given URL      |
| `dsaLegacyRedirectEntries`       | Array of `{ from, to }` redirect pairs consumed by App.tsx |

---

### App Bootstrapping

**`App.tsx`** declares three categories of routes:

```tsx
<Routes>
  <Route path="/" element={<Navigate to="/algoViz" replace />} />
  <Route path="/algoViz" element={<Win96AlgoVizDesktop />} />

  {/* 37 legacy redirects — all use replace to avoid polluting history */}
  {dsaLegacyRedirectEntries.map(({ from, to }) => (
    <Route key={from} path={from} element={<Navigate to={to} replace />} />
  ))}

  {/* 437 DSA topic routes — each wrapped in Suspense with a Win98 loading dialog */}
  {dsaRouteDefinitions.map(({ path, factory }) => (
    <Route
      key={path}
      path={path}
      element={
        <Suspense fallback={<PageLoader />}>
          <LazyComponent factory={factory} />
        </Suspense>
      }
    />
  ))}

  <Route path="*" element={<NotFound />} />
</Routes>
```

**`AppProviders.tsx`** wraps the entire app in four providers, applied inside-out:

1. **`BrowserRouter`**: React Router's history provider.
2. **`Win95ContextMenu`**: Listens for `contextmenu` events on elements with a `data-context-url` attribute and presents a Win95-styled popup with "Open in new tab" and "Cancel". Position is clamped to stay at least 6px inside the viewport.
3. **`GlobalWatermark`**: Overlays a faint image on non-desktop routes.
4. **`Win95ReturnHandler`**: Intercepts clicks on elements with `data-return-target="history-or-desktop"` (the close button on every topic page) and navigates back in browser history, or to `/algoViz` if there is no history.

---

### Desktop Window Manager

The window manager is a self-contained React Context + Reducer that powers the Win96 desktop. It has no external dependencies and no persistence; state resets on page reload.

**State shape:**

```typescript
interface WindowState {
  id: string // crypto.randomUUID()
  kind: 'folder'
  nodeId: string // Explorer tree node ID
  title: string
  isMinimized: boolean
  zIndex: number // Monotonically increasing; never decremented
  initialPosition: { x: number; y: number }
  path: string[] // Breadcrumb of node IDs from root to current folder
  history: string[][] // Back stack (each entry is a full path array)
  forwardHistory: string[][] // Forward stack
}
```

**Z-index management:**

A `zCounter` in reducer state starts at 10 and increments by 1 on every focus event. When a window is focused, its `zIndex` is set to the new counter value. All other windows keep their existing z-indices. This means the most recently touched window is always on top without any re-sorting of siblings.

**Window cascading:**

When a new folder window opens, its position is calculated as:

```
x = 160 + (nextOffset % 72)
y = 120 + (nextOffset % 72)
nextOffset = (nextOffset + 24) % 72
```

This cascades windows diagonally across the screen in a cycle of 3 positions, mimicking classic Windows behaviour.

**Duplicate prevention:**

If a user opens a folder that already has an open (but possibly minimized) window, the manager restores and focuses the existing window instead of creating a duplicate.

**Folder navigation (back/forward/up):**

Each window carries its own independent navigation history. `NAVIGATE_TO_CHILD` pushes the current `path` onto `history` and clears `forwardHistory`. `NAVIGATE_BACK` pops from `history` and pushes to `forwardHistory`. `NAVIGATE_UP` slices the last segment from `path` without touching the history stacks. This mirrors browser navigation semantics at the folder level.

**Reducer action summary:**

| Action               | Effect                                                                                   |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `OPEN_FOLDER_WINDOW` | Creates new window or restores minimized duplicate; cascades position                    |
| `FOCUS_WINDOW`       | Bumps `zIndex` to new counter value, sets `activeWindowId`                               |
| `CLOSE_WINDOW`       | Removes window; clears `activeWindowId` if it matched                                    |
| `MINIMIZE_WINDOW`    | Sets `isMinimized: true`, clears `activeWindowId`                                        |
| `RESTORE_WINDOW`     | Unminimizes and focuses                                                                  |
| `TOGGLE_MINIMIZE`    | Minimizes if active; restores if minimized or inactive                                   |
| `NAVIGATE_TO_CHILD`  | Updates `nodeId`, `path`, `title`; pushes old path to `history`; clears `forwardHistory` |
| `NAVIGATE_BACK`      | Pops from `history`, pushes current path to `forwardHistory`                             |
| `NAVIGATE_FORWARD`   | Pops from `forwardHistory`, pushes current path to `history`                             |
| `NAVIGATE_UP`        | Slice `path` by -1; no-op if already at root                                             |

---

### Explorer Tree

The explorer tree is the data structure that powers both the Start Menu and the folder windows. It is generated once at module load time from `dsaRouteDefinitions` and never mutated.

**Construction algorithm:**

1. For every route, collect its `segments` array (the raw directory name components).
2. Build a prefix map: for every route, record every prefix (depth 1, depth 2, ..., full length). Track which prefixes have children deeper than themselves. These are "folder" prefixes; the rest are "leaf" prefixes (topic pages).
3. Sort all prefixes using `Intl.Collator` with `numeric: true` to respect numbered folder names.
4. Traverse the sorted prefixes in depth-first order. For each folder prefix, create an `ExplorerFolderNode`; for each leaf, create an `ExplorerVisualizationNode` pointing to its route URL.
5. Wire each node into its parent's `children` array.

**Node types:**

```typescript
interface ExplorerFolderNode {
  id: string // e.g., 'folder:1-core-data-structures'
  kind: 'folder'
  name: string // Numeric prefix stripped: '1. Linear' → 'Linear'
  children: ExplorerNode[]
}

interface ExplorerVisualizationNode {
  id: string // e.g., 'page:binary-search'
  kind: 'visualization'
  name: string
  route: string // e.g., '/dsa/2-core-algorithms/1-sorting/binary-search'
}
```

**Index:**

A `Map<string, ExplorerIndexEntry>` is built alongside the tree, mapping every node ID to its node, its parent ID, and its full breadcrumb path from root. This makes `getExplorerNode(id)` and `getExplorerChildren(id)` O(1) lookups.

**Desktop alias:**

The "Languages and Frameworks" desktop shortcut is created by extracting 9 curated sub-folders from the "Languages & Ecosystems" tree branch and re-exposing them under an alias node. This gives the most commonly used categories first-class desktop access without duplicating data.

---

### Topic Page Shell

Every one of the 437 topic pages renders inside `TopicPageShell`, a shared Win98-style help window component. Pages do not manage their own chrome; they only provide content.

**Layout:**

```
┌─────────────────────────────────────────────────────────┐
│  [Title Bar]  Topic Name                          [✕]   │
├──────────────────┬──────────────────────────────────────┤
│  [Tab Bar]  Big Picture | Core Concepts | Examples | ... │
├──────────────────┴──────────────────────────────────────┤
│  TOC sidebar   │  Content area (max-width: 1120px)       │
│  (190-240px)   │                                         │
│  • Section 1   │  <children rendered here>               │
│  • Section 2   │                                         │
│  • Section 3   │  [← Previous]              [Next →]     │
└────────────────┴─────────────────────────────────────────┘
```

The TOC sidebar uses anchor links (`href="#section-id"`). Section IDs must match `id` attributes in the page content. The sidebar is populated per-tab via the `tocLinks` prop, so switching tabs updates the TOC to match the active content.

**Sibling navigation:**

`TopicPageNavigation` calls `getAdjacentDsaRoutes(location.pathname)` and renders Previous/Next `<Link>` elements. The `to` value preserves the current `?tab=` search param so the user lands on the same tab when moving between pages.

**Close button:**

The title bar close button has `data-return-target="history-or-desktop"`. The `Win95ReturnHandler` provider (in `AppProviders.tsx`) intercepts clicks on this attribute and calls `navigateToDesktopOrHistory()`, which does `window.history.back()` if there is history, or `navigate('/algoViz')` otherwise.

---

### Tab State and URL Sync

`useTopicTabs` is a custom hook that owns tab selection state and keeps it in sync with the URL's `?tab=` search parameter.

**Initialization:**

On mount, the hook reads `searchParams.get('tab')`. If the value matches a valid tab ID, that tab is selected. If the value is missing or invalid, it falls back to `defaultTab`. This means deep links like `/dsa/2-core-algorithms/1-sorting/binary-search?tab=examples` open directly on the Examples tab.

**Sync:**

```typescript
useEffect(() => {
  setSearchParams({ tab: activeTab }, { replace: true })
  document.title = `${pageTitle} - ${activeTabLabel}`
}, [activeTab])
```

`replace: true` means tab switches do not create browser history entries. Navigating back from a topic page takes the user back to wherever they came from, not to the previous tab.

---

### Search

The search panel (`DesktopSearch96`) is fully client-side with no API calls. The search index is built once at module load time from `dsaRouteDefinitions`.

**Search entry structure:**

```typescript
interface DesktopSearchEntry {
  id: string // File path (unique key)
  title: string // Last segment, numeric prefix stripped
  breadcrumb: string // Parent segments joined with ' / '
  route: string // Full URL path
  matchText: string // Normalized: lowercase, & → 'and', non-alphanumeric → space
}
```

**Scoring algorithm:**

Every character typed triggers a re-score of all 437 entries (memoized via `useMemo`). The query is normalized the same way as `matchText`, then split into tokens. Each entry is scored by summing per-token weights:

| Match type                            | Points                    |
| ------------------------------------- | ------------------------- |
| Title exact match                     | +140                      |
| Title starts with token               | +100                      |
| Title contains token at word boundary | +80                       |
| Title contains token anywhere         | +56                       |
| Breadcrumb starts with token          | +28                       |
| Breadcrumb contains token             | +18                       |
| Route label contains token            | +8                        |
| Breadcrumb length (longer = worse)    | penalty                   |
| Any token missing from `matchText`    | score = -1 (filtered out) |

Results are sorted by score descending, then alphabetically by breadcrumb and title as a tiebreaker. An empty query returns the full list in alphabetical order.

**UI behaviour:**

- The panel opens with Ctrl+K / Cmd+K, or by clicking the Find button in the taskbar.
- `useDeferredValue(query)` defers the scoring pass so the input stays responsive while results update.
- Keyboard navigation: arrow keys move through results; Home/End jump to first/last; Enter navigates.
- A custom scrollbar renders with a draggable thumb; thumb height and position are derived from the viewport/content ratio via `ResizeObserver`.
- The active result is always scrolled into view via `scrollIntoView`.
- Full `aria-combobox` + `aria-listbox` markup for screen reader compatibility.

---

### Taskbar

`Taskbar97` is a generic component with three composable zones:

| Zone             | Class                       | Content                                               |
| ---------------- | --------------------------- | ----------------------------------------------------- |
| **Start**        | `.taskbar-97__start`        | `StartButton97` — opens the Start Menu                |
| **Quick Launch** | `.taskbar-97__quick-launch` | Find button — opens the search panel                  |
| **Items**        | `.taskbar-97__items`        | Running folder windows (scrollable, hidden scrollbar) |
| **Tray**         | `.taskbar-97__tray`         | `DesktopClock` — local date, time with seconds        |

The `quickLaunch` prop is optional; the zone only renders if the prop is provided. This keeps `Taskbar97` reusable in other contexts without the Find button.

**Clock:**

`DesktopClock` uses `setInterval` at 1-second intervals and `new Date()` on every tick. `toLocaleTimeString` and `toLocaleDateString` with no explicit locale argument default to the user's system locale and timezone automatically. On screens narrower than 440px, the date span is hidden via CSS to keep the tray compact.

---

### Styling System

The project has four CSS files, each with a distinct scope. There is no CSS-in-JS; all styles are static.

**`win97.css`**: Base component styles and CSS custom properties.

```css
:root {
  --win97-bg: #c0c0c0;
  --win97-text: #000;
  --win97-3d-light: #fff; /* Bevel highlight */
  --win97-3d-dark: #808080; /* Bevel shadow */
  --win97-3d-darker: #404040;
  --win97-accent: #000080; /* Navy blue */
  --win97-taskbar: #bfbfbf;
  --win97-start-green: #008080; /* Teal Start button */
  --win97-font: 'Tahoma', 'MS Sans Serif', system-ui, sans-serif;
}
```

Button sizes via `.btn-97` modifier classes: `--sm` (22px), `--md` (26px, default), `--lg` (30px). The 3D bevel effect is achieved with a single `--b` variable controlling border width, applied as four directional borders with alternating light/dark values.

**`win96.css`**: Desktop, window, and taskbar overrides.

- `.win96-window`: Absolute positioning, flex column, 3D borders, configurable `min-width`/`min-height`
- `.win96-window__title-bar`: Gradient from `#0a246a` to `#3a6ea5` (the classic Win95 blue)
- `.win96-window__body`: White background, inset 3D borders, `overflow: auto`
- Resize handles: 8px invisible regions on all eight sides (N, S, E, W, NE, NW, SE, SW)
- Responsive breakpoints: adjustments at 440px, 480px, 600px, 720px, 768px (mobile taskbar taller, fonts larger, menus full-width)

**`bin98.css`**: DSA help-page shell.

- Layout: CSS Grid with `clamp(190px, 22vw, 240px) 1fr` for the TOC/content split
- Title bar: Gradient from `#000080` to `#1084d0`
- Active tab: White background, positioned 1px lower to visually merge with content area (the classic Windows tab trick)
- Content area: Max-width 1120px, flex column, `overflow: auto`

**`globals.css`**: Tailwind base reset + Inter font import.

**BEM naming convention:**

All custom class names follow BEM with feature prefixes:

- `win96-`: desktop chrome, windows, taskbar
- `win97-`: buttons, forms, base components
- `bin98-`: DSA help-page content
- `dsa-`: any DSA-specific overrides

---

### Scripts

**`validate-repo.mjs`** runs as part of `npm run validate:repo` and blocks commits if any check fails.

Three checks are performed:

1. **Route class name audit**: Scans all `src/features/dsa/routes/**/*.tsx` files for leftover generator artifacts: old `help-*`/`helper-*` class names, malformed `bin98-` variants, and `"Page"` title suffixes that the scaffold script used to emit. These would indicate a page was generated but not properly reviewed.

2. **Mojibake detection**: Scans `src/`, `scripts/`, and `README.md` for Unicode sequences characteristic of encoding corruption (`\u00c3`, `\u00c2`, `\u00e2`, and others). Reports exact file paths and line numbers.

3. **Script staleness check**: Verifies that `migrate-to-topic-shell.mjs` and `generate-dsa-structure.js` do not contain removed hook signatures or outdated taxonomy names that would indicate the scripts are out of sync with the current codebase.

**`generate-dsa-structure.js`** scaffolds new topic pages.

A `hierarchy` object in the script defines the full topic tree. Running the script recursively traverses that tree, creates any missing directories, and writes `index.tsx` stub files using a template that imports `TopicPageShell` and `useTopicTabs` with correct tab definitions. Existing files with real content are never overwritten; the script checks file length and content before touching anything.

---

### Data Flow

```
dsaRouteDefinitions  (source of truth — built once from import.meta.glob)
        │
        ├──► desktopSearchEntries     (search index — built once at module load)
        │
        ├──► explorerRoot / explorerIndex  (folder tree — built once at module load)
        │         │
        │         └──► Win96WindowManager  (runtime state — reducer, local only)
        │                   │
        │                   └──► StartMenu96, FolderWindow (read context)
        │
        ├──► dsaLegacyRedirectEntries  (consumed by App.tsx as <Navigate> routes)
        │
        └──► App.tsx routing           (each route lazy-loads its index.tsx chunk)
                   │
                   └──► TopicPageShell + useTopicTabs
                               │
                               └──► URL ?tab= param  (replace-mode, no history entry)
```

---

## Development

**Prerequisites:** Node.js 18+, npm

**Install dependencies:**

```bash
npm install
```

**Start the dev server:**

```bash
npm run dev
```

Runs at `http://localhost:8889`.

**All commands:**

```bash
npm run dev            # Start dev server
npm run build          # Production build (code-split by route)
npm run preview        # Preview production build locally
npm run lint           # ESLint (0 warnings policy)
npm run typecheck      # TypeScript strict check
npm run test           # Vitest test suite
npm run format         # Prettier write
npm run validate:repo  # Custom structural and encoding validation
```

---

## Quality Gates

Every commit must pass all of the following:

```bash
npm run lint           # Zero ESLint warnings
npm run typecheck      # No TypeScript errors
npm run test           # All Vitest tests pass
npm run build          # Production build succeeds
npm run validate:repo  # Route/content structure valid
```

Pre-commit hooks (Husky + lint-staged) run lint and Prettier automatically on every staged `.ts`/`.tsx` file before the commit lands.

**Test coverage:**

| File                         | Cases | What is tested                                                                                                                              |
| ---------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `Win96WindowManager.test.ts` | 85    | All reducer actions: focus, close, minimize, restore, navigate back/forward/up, z-index ordering, cascade positioning, duplicate prevention |
| `routeManifest.test.ts`      | 10    | Slug building, ampersand variants, no duplicate paths, natural sort order, adjacent route resolution, legacy redirect correctness           |
| `desktopSearch.test.ts`      | 5     | One entry per route, numeric prefix stripping, empty query returns all, multi-token matching, breadcrumb matching                           |

---

## Code Style

**TypeScript:**

- Strict mode enabled; no `any`, no implicit returns
- Named exports preferred; default exports for route components only
- Types colocated with the files that own them

**React:**

- Functional components only with hooks
- No external state library: React context + reducers for shared state
- `JSX.Element` return types on all components

**CSS:**

- BEM-style class names (`win96-taskbar__clock`, `bin98-section`, etc.)
- CSS custom properties for all theme tokens
- Responsive breakpoints at 440px, 480px, 600px, 768px, 1800px, 2400px

**Naming conventions:**

- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- CSS classes: `kebab-case` with feature prefix (`win96-`, `win97-`, `bin98-`, `dsa-`)
- Route directories: `N. Title Case`, where the number prefix controls sort order

---

## Code Examples

**Route auto-discovery with lazy loading:**

```typescript
// routeManifest.ts
const dsaModuleFactories = import.meta.glob<{ default: ComponentType<Record<string, unknown>> }>(
  './routes/DSA/**/index.tsx',
  { eager: false }, // each file becomes a separate Vite chunk
)
```

**Slug generation from directory name:**

```typescript
const baseSlugify = (segment: string): string =>
  segment
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section'

export const slugifySegment = (segment: string): string =>
  baseSlugify(segment.replace(/&/g, ' and '))
// '1. Arrays & Lists' → '1-arrays-and-lists'
```

**Window manager reducer dispatch:**

```typescript
dispatch({ type: 'OPEN_FOLDER_WINDOW', nodeId: 'folder:1-linear' })
dispatch({ type: 'NAVIGATE_TO_CHILD', windowId, nodeId: 'folder:1-arrays' })
dispatch({ type: 'NAVIGATE_BACK', windowId })
dispatch({ type: 'TOGGLE_MINIMIZE', windowId })
dispatch({ type: 'FOCUS_WINDOW', windowId })
```

**Topic page shell usage:**

```tsx
export default function BinarySearchPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Binary Search',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Binary Search"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      {activeTab === 'big-picture' && <BigPictureContent />}
      {activeTab === 'core-concepts' && <CoreConceptsContent />}
      {activeTab === 'examples' && <ExamplesContent />}
      {activeTab === 'glossary' && <GlossaryContent />}
    </TopicPageShell>
  )
}
```

**Search scoring (simplified):**

```typescript
function scoreEntry(entry: DesktopSearchEntry, tokens: string[]): number {
  let score = 0
  for (const token of tokens) {
    if (!entry.matchText.includes(token)) return -1 // must match all tokens
    if (entry.title === token) score += 140
    else if (entry.title.startsWith(token)) score += 100
    else if (entry.title.includes(` ${token}`)) score += 80
    else if (entry.title.includes(token)) score += 56
    if (entry.breadcrumb.startsWith(token)) score += 28
    else if (entry.breadcrumb.includes(token)) score += 18
    if (entry.routeLabel.includes(token)) score += 8
  }
  return score - entry.breadcrumb.length // penalise deeply nested results
}
```

---

## Roadmap

What ships today:

- 437 lazily loaded, fully written topic pages across 8 domains
- Win96 desktop with folder windows, cascading positions, and independent navigation history per window
- Filesystem-derived route registration and explorer tree (zero manual route config)
- Client-side full-text search with multi-token weighted scoring across all 437 pages
- Taskbar with Start menu, Find search panel, and live locale-aware clock
- Responsive layout across all screen sizes (mobile through 4K)
- 100 test cases across window manager, route manifest, and search

What does not ship yet:

- Interactive algorithm visualizations (step-through animations)
- Backend or API layer
- User progress tracking, gamification, or achievements
- Code playground or sandbox

---

## Credits

**Built by:** Ali Yousef

**Tools & open-source libraries that made this possible:**

- [React](https://react.dev): UI framework
- [Vite](https://vite.dev): build tooling
- [React Router](https://reactrouter.com): routing
- [Tailwind CSS](https://tailwindcss.com): utility styling
- [Vitest](https://vitest.dev): testing
- [Inter](https://rsms.me/inter/): typeface

---

**Last Updated:** April 2026
