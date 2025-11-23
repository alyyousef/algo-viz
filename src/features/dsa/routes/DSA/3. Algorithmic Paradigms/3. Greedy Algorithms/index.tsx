import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const pillars = [
  {
    title: 'Greedy choice property',
    detail:
      'A locally best pick can be part of a global optimum. Exchange or cut arguments show your choice can replace the optimal one without losing quality.',
  },
  {
    title: 'Monotone progress',
    detail:
      'Each step only moves forward; you never need to undo choices. Sorting or a priority queue usually defines the next candidate to accept.',
  },
  {
    title: 'Compact state',
    detail:
      'You carry a tiny amount of information (current cost, deadline set, visited set) rather than a full search tree. That keeps the loop O(n log n) instead of exponential.',
  },
]

const signals = [
  'Objective is additive or linear, so local gains stack without hidden future penalties.',
  'Feasibility behaves like a matroid: adding a valid choice does not force you to remove earlier picks.',
  'A sort order or priority queue emerges naturally (earliest finish time, lowest weight edge, smallest distance).',
  'Exchange arguments feel straightforward: you can swap any optimal step with your greedy pick and stay optimal.',
]

const patterns = [
  {
    title: 'Interval scheduling',
    detail: 'Sort by earliest finish time and pick non-overlapping intervals to maximize the schedule size.',
  },
  {
    title: 'Minimum spanning tree',
    detail: 'Kruskal and Prim add the lightest safe edge while maintaining cut and cycle properties.',
  },
  {
    title: 'Shortest paths without negatives',
    detail: 'Dijkstra expands the closest unvisited node and relaxes edges; non-negative weights keep the invariant intact.',
  },
  {
    title: 'Resource and capacity choices',
    detail: 'Fractional knapsack by value density, Huffman coding by merging two lightest nodes, and scheduling by deadlines.',
  },
]

const hygiene = [
  'Write the invariant that every accepted choice keeps the set feasible; assert it in code when possible.',
  'Sort once, then treat the input as a stream; use a priority queue when the "best next" item changes over time.',
  'Prove correctness with an exchange argument before trusting the heuristic.',
  'Scan for counterexamples: negative weights, lookahead penalties, or hard constraints often break greedy choice.',
  'Test the greedy result against a small brute-force or DP on tiny inputs to catch surprises early.',
]

export default function GreedyAlgorithmsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Greedy Algorithms"
      subtitle="Local picks, global wins"
      intro="Greedy algorithms commit to the best-looking option at each step and never revisit previous choices. When the greedy choice property holds, that simple loop delivers optimal answers with minimal state."
    >
      <TopicSection heading="Three pillars of a safe greedy">
        <div className="grid gap-3 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{pillar.title}</h3>
              <p className="text-sm text-white/80">{pillar.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Signals a greedy fit">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {signals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Common greedy patterns">
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
