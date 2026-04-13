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

AlgoViz is a single-page application that wraps a 437-page DSA knowledge base inside a Windows 96-style desktop experience. Every topic — from primitive types to bioinformatics — lives as a lazily loaded route behind a folder window, navigable from a taskbar-driven Start menu or a full-text search panel.

## Motivation

Learning DSA is hard enough without fighting a bloated interface. Most references are either dry textbook PDFs, scattered Stack Overflow threads, or LeetCode editorials that assume you already know the answer. Nothing ties the full landscape together in one place with consistent depth.

AlgoViz is built to fix that — a single destination where every data structure, algorithm, paradigm, and applied domain is covered with the same structure and the same level of care, wrapped in an interface that's actually enjoyable to explore.

- Covers everything from Big O fundamentals to bioinformatics and blockchain in one repo
- Every page follows the same structure: big picture, core concepts, examples, glossary
- Navigation mirrors a real filesystem — browse by folder or search across all 437 topics instantly
- Retro Win96 aesthetic makes it feel like an app, not a wall of markdown

## What's Inside

**8 top-level knowledge domains, 437 fully written topic pages:**

| #   | Domain                     | Covers                                                                                                                             |
| --- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 0   | **Fundamentals**           | Primitive types, Big O / complexity analysis, bit manipulation, concurrency & synchronization                                      |
| 0   | **CS Problems & Theory**   | Classic problems (TSP, Stable Marriage, SAT, Pebble Games…), advanced theoretical problems                                         |
| 0   | **Languages & Ecosystems** | 60+ tech comparisons, frameworks, databases, cloud platforms, mobile ecosystems, paradigms, AI/ML tools                            |
| 1   | **Core Data Structures**   | Linear, non-linear, hash-based, and advanced specialized structures                                                                |
| 2   | **Core Algorithms**        | Sorting & searching, graph algorithms, dynamic programming, greedy, divide & conquer, backtracking                                 |
| 3   | **Algorithmic Paradigms**  | Brute force, D&C, DP, greedy, backtracking, randomized, branch & bound, meet-in-the-middle, two pointers & sliding window          |
| 4   | **Advanced Topics**        | String algorithms, mathematical algorithms, computational geometry, systems & concurrency                                          |
| 5   | **Applied Domains**        | Systems design, database internals, OS & kernel, distributed algorithms, cryptography, game dev, AI/ML, blockchain, bioinformatics |

## Tech Stack

**Core:**

- **React 19** — UI framework with functional components and hooks
- **React Router 7** — file-system-driven lazy route registration via `import.meta.glob`
- **Vite 7** — dev server and production bundler
- **TypeScript 5** — strict typing throughout

**Styling:**

- **Tailwind CSS 4** — utility classes for layout
- **Custom CSS** — hand-crafted Win96/Win97 desktop chrome, window chrome, taskbar, and DSA help-page shell

**Quality:**

- **Vitest** — unit and integration tests
- **ESLint** — zero-warning policy enforced in CI
- **Prettier** — consistent formatting
- **Husky + lint-staged** — pre-commit gate (lint + format on staged files)
- **`validate:repo` script** — custom structural checks on the route/content tree

## Repo Structure

```
src/
├── app/                        # Bootstrapping, route registration, providers
├── features/
│   ├── dsa/
│   │   ├── routes/DSA/         # 437 topic pages (index.tsx per topic)
│   │   ├── components/         # TopicPageShell, shared DSA UI
│   │   ├── hooks/              # useTopicTabs, sibling navigation
│   │   ├── routeManifest.ts    # Auto-discovery via import.meta.glob
│   │   └── utils/              # Slug generation, helpers
│   └── win96-desktop/
│       └── components/         # DesktopChrome, taskbar, start menu, search
├── systems/
│   └── win96/                  # Window manager context + reducer + tests
├── data/                       # Explorer tree generation from route filesystem
├── styles/                     # win96.css, win97.css, global styles
scripts/                        # Repo maintenance and generation scripts
```

## Architecture

### Route Discovery

Routes are auto-registered — no manual route list to maintain. `routeManifest.ts` runs `import.meta.glob('./routes/DSA/**/index.tsx', { eager: false })` and derives slugified URL paths from the directory names. Adding a new topic page is as simple as creating a folder with an `index.tsx`.

### Desktop Window Manager

The Win96 desktop is powered by a reducer-backed context in `src/systems/win96/context/Win96WindowManager.tsx`. It tracks open windows, z-index ordering, minimize state, and folder hierarchy — all in local React state with no external state library.

### Topic Page Shell

Every topic page uses `TopicPageShell` with `useTopicTabs` for tabbed navigation (Big Picture, Core Concepts, Examples, Glossary). The shell handles the TOC sidebar, sibling prev/next navigation, and tab URL sync automatically.

### Taskbar

The taskbar (`Taskbar97`) is composed of three zones:

- **Start** — opens the folder-based Start Menu
- **Quick Launch** — Find button for full-text search across all 437 pages
- **Tray** — live clock showing local date, time, and seconds (timezone-aware)

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

Runs at `http://localhost:8889` by default.

**All commands:**

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run preview       # Preview production build locally
npm run lint          # ESLint (0 warnings policy)
npm run typecheck     # TypeScript strict check
npm run test          # Vitest test suite
npm run format        # Prettier write
npm run validate:repo # Custom repo structure validation
```

## Quality Gates

Every commit must pass all of the following:

```bash
npm run lint          # ✓ Zero ESLint warnings
npm run typecheck     # ✓ No TypeScript errors
npm run test          # ✓ All Vitest tests pass
npm run build         # ✓ Production build succeeds
npm run validate:repo # ✓ Route/content structure valid
```

Pre-commit hooks (Husky + lint-staged) run lint and format automatically on staged `.ts`/`.tsx` files before every commit.

## Code Style

**TypeScript:**

- Strict mode enabled — no `any`, no implicit returns
- Named exports preferred; default exports for route components only
- Types colocated with the files that own them

**React:**

- Functional components only with hooks
- No external state library — React context + reducers for shared state
- `JSX.Element` return types on all components

**CSS:**

- BEM-style class names (`win96-taskbar__clock`, `bin98-section`, etc.)
- CSS custom properties for all theme tokens
- Responsive breakpoints at 440px, 480px, 600px, 768px, 1800px, 2400px

**Naming conventions:**

- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities
- CSS classes: `kebab-case` with feature prefix (`win96-`, `win97-`, `bin98-`, `dsa-`)
- Route directories: `N. Title Case` — the number prefix controls sort order

## Code Examples

**Route auto-discovery (`routeManifest.ts`):**

```typescript
const dsaModuleFactories = import.meta.glob<{ default: ComponentType<Record<string, unknown>> }>(
  './routes/DSA/**/index.tsx',
  { eager: false },
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
      {/* tab content */}
    </TopicPageShell>
  )
}
```

**Window manager dispatch:**

```typescript
dispatch({ type: 'OPEN_FOLDER', folderId, title, children })
dispatch({ type: 'TOGGLE_MINIMIZE', windowId })
dispatch({ type: 'BRING_TO_FRONT', windowId })
```

## Roadmap

What ships today:

- 437 lazily loaded, fully written topic pages
- Win96 desktop with folder windows and window manager
- Filesystem-derived route registration and explorer tree
- Taskbar with Start menu, Find search panel, and live clock
- Responsive layout across all screen sizes

What does not ship yet:

- Interactive algorithm visualizations (step-through animations)
- Backend / API layer
- User progress tracking, gamification, or achievements
- Code playground / sandbox

## Credits

**Built by:** Ali Yousef

**Tools & open-source libraries that made this possible:**

- [React](https://react.dev) — UI framework
- [Vite](https://vite.dev) — build tooling
- [React Router](https://reactrouter.com) — routing
- [Tailwind CSS](https://tailwindcss.com) — utility styling
- [Vitest](https://vitest.dev) — testing
- [Inter](https://rsms.me/inter/) — typeface

---

**Last Updated:** April 2026
