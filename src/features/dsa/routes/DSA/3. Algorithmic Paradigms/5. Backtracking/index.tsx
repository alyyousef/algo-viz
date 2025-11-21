import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const pillars = [
  {
    title: 'Incremental construction',
    detail:
      'Build the solution step by step (choose -> explore -> unchoose). Each level adds one decision to a partial candidate.',
  },
  {
    title: 'Feasibility checks',
    detail:
      'After each choice, quickly test if the partial candidate can still lead to a full solution. Early vetoes keep the tree shallow.',
  },
  {
    title: 'Systematic undo',
    detail:
      'Always revert state on the way back up. Deterministic push/pop routines prevent subtle leaks when the tree gets deep.',
  },
]

const signals = [
  'The search space can be enumerated as sequences of choices (permutations, subsets, assignments).',
  'You have pruning rules that can prove impossibility early (bounds, conflicts, partial objective limits).',
  'You only need one valid arrangement, or you can stop after finding a small set of them.',
]

const patterns = [
  {
    title: 'Constraint satisfaction',
    detail: 'Sudoku, N-Queens, graph coloring: pick a variable, try values, prune when constraints break.',
  },
  {
    title: 'Combinatorial generation',
    detail: 'Generate permutations, subsets, or partitions by adding items and backtracking when counts exceed limits.',
  },
  {
    title: 'Branch and bound',
    detail: 'Prune branches whose best possible score cannot beat the current best. Works for knapsack, TSP variants, scheduling.',
  },
  {
    title: 'Path search with constraints',
    detail: 'DFS-style search through states (mazes, word ladders) with visited tracking and constraint checks.',
  },
]

const hygiene = [
  'Keep choice, explore, and undo code adjacent so the mutation story is obvious.',
  'Order choices to prune earlier (heuristics like most-constrained-first).',
  'Memoize or cache impossible prefixes when the state is small enough to hash.',
  'Track global best/first solutions carefully; reset them if you rerun search in tests.',
  'Instrument with counters to see how many nodes were pruned vs explored.',
]

export default function BacktrackingParadigmPage(): JSX.Element {
  return (
    <TopicLayout
      title="Backtracking Paradigm"
      subtitle="Try, retract, repeat"
      intro="Backtracking explores choices depth-first, pruning as soon as a partial path cannot succeed. Clear predicates and disciplined undo steps turn exponential trees into manageable searches."
    >
      <TopicSection heading="Three pillars before you recurse">
        <div className="grid gap-3 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{pillar.title}</h3>
              <p className="text-sm text-white/80">{pillar.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When backtracking shines">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {signals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Common backtracking patterns">
        <div className="grid gap-3 md:grid-cols-2">
          {patterns.map((pattern) => (
            <article key={pattern.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{pattern.title}</p>
              <p className="text-sm text-white/80">{pattern.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Hygiene before you ship">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {hygiene.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
