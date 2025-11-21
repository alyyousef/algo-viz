import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const pillars = [
  {
    title: 'Optimal substructure',
    detail:
      'You can build the best answer from optimal answers to smaller pieces. If a sub-answer changes, the overall optimum changes.',
  },
  {
    title: 'Overlapping subproblems',
    detail:
      'The same sub-question appears many times. Caching or tabulating those results turns exponential recursion into polynomial time.',
  },
  {
    title: 'State and transition',
    detail:
      'Define a compact state (indices, capacity, masks). Describe how to move between states without losing correctness.',
  },
]

const shapes = [
  {
    title: '1D linear',
    detail: 'Single index with forward/backward transitions (Fibonacci, climb stairs, LIS by index).',
  },
  {
    title: '2D grid/table',
    detail: 'Row/column states for edit distance, knapsack capacities, or path counting on grids.',
  },
  {
    title: 'Tree DP',
    detail: 'Post-order combine child answers (tree diameters, subtree counts, independent set on trees).',
  },
  {
    title: 'Bitmask/state compression',
    detail: 'Small N subsets encoded as bits (TSP on subsets, DP for schedules with constraints).',
  },
]

const patterns = [
  {
    title: 'Top-down with memoization',
    detail: 'Express the recurrence naturally in recursion; cache results to avoid rework. Great for sparse state spaces.',
  },
  {
    title: 'Bottom-up tabulation',
    detail: 'Order states so dependencies are ready before use. Often faster and stack-safe once you trust the recurrence.',
  },
  {
    title: 'Space optimization',
    detail: 'Keep only the active frontier (rolling arrays) when transitions depend on limited previous rows/columns.',
  },
  {
    title: 'Reconstruction',
    detail: 'Store parent pointers or decisions to rebuild paths/choices after computing costs.',
  },
]

const checklist = [
  'Write the recurrence in plain language before coding; confirm base cases cover empty/edge states.',
  'Prove dependency order. In bottom-up, every read state must be filled earlier in the table.',
  'Control state size. Remove dimensions that do not affect future decisions; compress when possible.',
  "Handle large answers (modulo arithmetic, big integers) and define what 'infinity' means for impossible states.",
  'Add assertions or sentinels to catch uninitialized reads; they surface ordering mistakes quickly.',
]

export default function DynamicProgrammingParadigmPage(): JSX.Element {
  return (
    <TopicLayout
      title="Dynamic Programming Paradigm"
      subtitle="Reuse overlapping solutions"
      intro="Dynamic programming turns repetition into leverage. By defining clean states, a recurrence, and a fill order, you replace exponential branching with a predictable table or memo cache."
    >
      <TopicSection heading="Three pillars to check first">
        <div className="grid gap-3 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{pillar.title}</h3>
              <p className="text-sm text-white/80">{pillar.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common DP state shapes">
        <div className="grid gap-3 md:grid-cols-2">
          {shapes.map((shape) => (
            <article key={shape.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{shape.title}</p>
              <p className="text-sm text-white/80">{shape.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Execution patterns">
        <div className="grid gap-3 md:grid-cols-2">
          {patterns.map((pattern) => (
            <article key={pattern.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{pattern.title}</h3>
              <p className="text-sm text-white/80">{pattern.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Checklist before you ship the DP">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}

