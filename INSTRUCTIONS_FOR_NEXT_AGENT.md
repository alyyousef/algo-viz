# Instructions for the Next Agent

You are continuing **deep-dive upgrades** of the AlgoViz knowledge base (`src/features/kb/routes/KB/`). Do not start a new MEGA-scaffold pass. Most pages already exist as short stubs; the job is to rewrite them to the deep-dive template and tick the tracker.

**The user paused on 2026-09-05.** Resume when they ask to continue filling pages.

## Where we stand (2026-09-05)

|                      |                              Count |
| -------------------- | ---------------------------------: |
| Completed deep dives |                            **929** |
| Still pending        |                           **1694** |
| Source of truth      | `scripts/deep-dives/progress.json` |

**Last completed section:** 32. Computer Vision (all 24 pages).

**Next section:** 33. Reinforcement Learning.

**First pending path:**

```
src/features/kb/routes/KB/33. Reinforcement Learning/Actions/index.mdx
```

Work through `pending` in order (or by whole numbered section). After each batch, move those paths from `pending` to `completed`. Do not invent a second tracker.

This session already deep-dived:

- 3.1 Programming Paradigms (10)
- 3.2 Language Design & Theory (15)
- 30. RAG & Retrieval (15)
- 31. AI Agent Systems (19)
- 32. Computer Vision (24)

Earlier work (other agents) already completed large stretches of sections 1–14 and other domains; those paths are already in `completed`.

## Deep-dive page shape

Follow `DEEP_DIVE_PLAN.md`. Each page should include:

1. Overview
2. Deep dive and mechanics
3. Mathematical / theoretical foundation
4. Real-world implementation (code)
5. Mermaid diagram
6. Interview prep
7. Production use cases
8. Callouts

**Template and components (current codebase):**

- Wrap with `ConceptTemplate` + `export default function Layout`.
- `import { Callout } from '@/features/kb/components/mdx/Callout'` — `icon` is only `info | warning | error | tip` (not `success`).
- `import { ComparisonTable } from '@/features/kb/components/mdx/ComparisonTable'`.

**MDX pitfalls:**

- Do not put `{...}` in prose or inline backticks; Acorn treats `{` as JS.
- Do not put raw `<tag>` in prose (use words or fenced code).
- Fenced code blocks are fine.

## Workflow

1. Read the next slice of `pending` (a whole section is a good batch, ~10–24 pages).
2. Skip or lightly keep pages that are already long deep dives (~140+ lines with the full structure); still mark them completed if they are on `pending`.
3. Rewrite the short stubs in place.
4. Update `progress.json` (filter `pending`, append `completed`).
5. Verify: if the Vite dev server is up (`http://localhost:8889`), fetch each `index.mdx` and confirm `export default`. Otherwise `npm run build` (slow; whole KB).
6. Update this file and `DEEP_DIVE_PLAN.md` if you finish another section.

Dev server port is **8889**.

## Do not

- Do not clone other git repos into this working tree.
- Do not commit unless the user asks.
- Do not continue autonomous batches if the user said to stop or pause.
