import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Growing coral reef',
    detail:
      'Start with a seed node and keep attaching the cheapest edge that touches the reef without creating a cycle.',
  },
  {
    title: 'Cut property in action',
    detail:
      'At any step, the lightest edge crossing the cut between the tree and the rest is always safe to add.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Pick an arbitrary start node; mark it visited.',
      'Push all outgoing edges to a min-heap keyed by weight.',
      'Pop the lightest edge; if it reaches an unvisited node, add it to the tree, mark the node visited, and push its outgoing edges.',
      'Repeat until all vertices are visited or the heap empties (disconnected graphs yield a forest).',
    ],
  },
  {
    heading: 'Data structure choices',
    bullets: [
      'Binary heap: O((V + E) log V) with simple code.',
      'Fibonacci/pairing heap: O(E + V log V) in theory, with higher constants.',
      'Array for dense graphs: O(V^2) but often faster when V is small and E is dense.',
    ],
  },
  {
    heading: 'Correctness levers',
    bullets: [
      'Relies on the cut property: minimum crossing edge is always in some MST.',
      'Visited set prevents cycles; heap ensures we always pick the cheapest crossing edge.',
      'Disconnected graphs produce a minimum spanning forest if you reseed after exhaustion.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O((V + E) log V) with a binary heap and adjacency lists; O(V^2) with adjacency matrix or array-based selection.',
  },
  {
    title: 'Space',
    detail:
      'O(V) for visited and parent; heap holds up to O(E) edges in the worst case.',
  },
  {
    title: 'Practical guidance',
    detail:
      'On dense graphs or small V, the simple array implementation can beat heaps. On sparse large graphs, heaps dominate.',
  },
]

const realWorldUses = [
  {
    context: 'Network design',
    detail:
      'Builds low-cost backbones for fiber, power, or road planning when a connected, minimal-cost scaffold is needed.',
  },
  {
    context: 'Approximation baselines',
    detail:
      'Provides cheap spanning structures used in approximation algorithms (e.g., for TSP heuristics).',
  },
  {
    context: 'Graphics and clustering',
    detail:
      'MST-based clustering and mesh generation can start from Prim, especially on dense proximity graphs.',
  },
]

const examples = [
  {
    title: "Prim's with min-heap",
    code: `function prim(graph, start):
    visited = set([start])
    heap = new MinHeap() // (w, u, v)
    mst = []

    for (v, w) in graph.neighbors(start):
        heap.push((w, start, v))

    while heap and len(visited) < graph.size():
        (w, u, v) = heap.pop_min()
        if v in visited:
            continue
        visited.add(v)
        mst.append((u, v, w))
        for (nxt, wt) in graph.neighbors(v):
            if nxt not in visited:
                heap.push((wt, v, nxt))

    return mst`,
    explanation:
      'Heap ordering guarantees the lightest crossing edge is picked next, satisfying the cut property at every step.',
  },
]

const pitfalls = [
  'Forgetting the visited check can add duplicate vertices and cycles.',
  'Using Prim on a graph with non-existent edges (disconnected) without reseeding yields incomplete trees; treat components separately.',
  'Sorting all edges first turns Prim into Kruskal with extra overhead; stick to adjacency-driven pushes.',
]

const decisionGuidance = [
  'Dense graphs or adjacency-driven contexts: Prim is often faster than Kruskal.',
  'Sparse graphs with edge lists ready: Kruskal may be simpler with Union-Find.',
  'Small integer weights: consider bucketed Prim to reduce heap overhead.',
  'Disconnected graph: run Prim from each component to get a minimum spanning forest.',
]

const takeaways = [
  "Prim's grows one tree outward, always picking the cheapest edge crossing the current cut.",
  'Heap choice affects constants; array-based selection can shine on dense graphs.',
  'Visited checks preserve correctness and avoid cycles.',
]

export default function PrimsAlgorithmPage(): JSX.Element {
  return (
    <TopicLayout
      title="Prim's Algorithm"
      subtitle="Growing an MST from a single seed"
      intro="Prim's algorithm builds a minimum spanning tree by always adding the lightest edge that connects the current tree to a new vertex. It is a cut-property-driven greedy that thrives on adjacency access and dense graphs."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Where Kruskal sorts edges globally, Prim grows locally from a seed. It maintains a frontier of crossing edges and
          repeatedly picks the cheapest one, ensuring every addition is safe for the MST.
        </p>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: mechanics in motion">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity analysis and intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorldUses.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical example">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
