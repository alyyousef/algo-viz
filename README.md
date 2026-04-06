# AlgoViz

AlgoViz is a React + Vite single-page application for browsing a large data-structures-and-algorithms knowledge base through a retro desktop metaphor.

The current product is primarily a documentation and learning experience:

- A Win96-style desktop launches folders and topic pages.
- DSA content is organized as filesystem-backed routes under `src/features/dsa/routes`.
- Topic pages use a shared Win98 help-page shell with tabbed sections and sibling navigation.
- App state is local React state plus a reducer-backed window manager and `localStorage`.

## Current Scope

What ships today:

- Hundreds of lazily loaded topic pages
- A desktop / folder / window system
- Filesystem-derived route registration
- Filesystem-derived explorer tree generation
- Shared styling for global shell, desktop chrome, and DSA help pages

What does not ship today:

- A populated interactive visualization registry
- A backend or API layer
- Gamification, achievements, or progress tracking
- Recharts / Framer Motion / Zustand-based flows

## Tech Stack

- React 19
- React Router 7
- Vite 7
- TypeScript
- Tailwind CSS 4
- ESLint
- Prettier
- Vitest
- Husky + lint-staged

## Repo Structure

Key directories:

- `src/app`: app bootstrapping, route registration, providers
- `src/features/dsa`: route pages, shared DSA components, hooks
- `src/features/win96-desktop`: desktop UI and folder-window content
- `src/systems/win96`: window-manager state and tests
- `src/data`: explorer-tree generation from the route filesystem
- `src/styles`: global, desktop, and shared help-page styling
- `scripts`: repo maintenance / generation scripts

## Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Useful commands:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run format
```

## Architecture Notes

- Route modules are discovered with `import.meta.glob` in `src/app/App.tsx`.
- The explorer tree is generated separately from the same route directory in `src/data/algoviz-explorer.ts`.
- The desktop window manager lives in `src/systems/win96/context/Win96WindowManager.tsx`.
- Topic pages are moving toward a shared shell in `src/features/dsa/components/TopicPageShell.tsx` and shared tab state in `src/features/dsa/hooks/useTopicTabs.ts`.

## Quality Gates

The repo is expected to pass:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Pre-commit checks are wired through Husky and `lint-staged`.
