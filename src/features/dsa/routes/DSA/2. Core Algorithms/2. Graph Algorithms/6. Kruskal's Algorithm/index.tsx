import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Global sorting, local joining',
    detail:
      'Line up all edges from lightest to heaviest and take them if they connect different components. Think of stitching islands with the cheapest bridges first.',
  },
  {
    title: 'Cycle avoider',
    detail:
      'The algorithm trusts the cycle property: in any cycle, the heaviest edge is never needed for an MST.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Sort all edges by non-decreasing weight.',
      'Initialize each vertex as its own set in a Union-Find.',
      'Scan edges: if endpoints are in different sets, union them and add the edge to the MST.',
      'Stop after V - 1 edges are chosen or all edges are processed.',
    ],
  },
  {
    heading: 'Union-Find details',
    bullets: [
      'Path compression and union by rank/size give almost constant-time find/union.',
      'Cycle prevention is automatic: edges joining the same set are skipped.',
    ],
  },
  {
    heading: 'Correctness',
    bullets: [
      'Cycle property: skipping the heaviest edge in any cycle is safe; sorting ensures heavier cycle edges appear later and get skipped.',
      'Cut property equivalently guarantees the lightest edge crossing any cut is safe and will be accepted when encountered.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(E log E) for sorting plus near O(E alpha(V)) for Union-Find operations (alpha is inverse Ackermann, tiny). With integer weights and buckets, sorting can approach O(E).',
  },
  {
    title: 'Space',
    detail:
      'O(V) for Union-Find and O(E) to hold/sort edges.',
  },
  {
    title: 'Practical guidance',
    detail:
      'Excellent for sparse graphs and when edges arrive as a list. Dense graphs might prefer Prim to avoid full-edge sorts.',
  },
]

const realWorldUses = [
  {
    context: 'Network backbones',
    detail:
      'Designing minimal-cost wiring, pipelines, or roads from an edge list - Kruskal fits well when costs are already tabulated.',
  },
  {
    context: 'Clustering',
    detail:
      'Single-linkage clustering can remove the largest k - 1 edges from the MST built by Kruskal to form k clusters.',
  },
  {
    context: 'Approximation and baselines',
    detail:
      'Provides cost baselines for heuristic TSP tours or redundancy analysis in infrastructure audits.',
  },
]

const examples = [
  {
    title: "Kruskal's with Union-Find",
    code: `function kruskal(vertices, edges):
    // edges: list of (u, v, w)
    sort edges by w ascending
    uf = new UnionFind(vertices)
    mst = []

    for (u, v, w) in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            mst.append((u, v, w))
        if len(mst) == len(vertices) - 1:
            break

    return mst`,
    explanation:
      'Sorting once and using Union-Find keeps cycles out. Early exit avoids wasted scans once the tree is complete.',
  },
]

const pitfalls = [
  'Forgetting path compression/union by rank slows finds dramatically.',
  'Skipping early exit in dense graphs wastes time after the MST is already complete.',
  'Assuming connectivity: disconnected graphs yield a forest; handle that if needed.',
  'Sorting with unstable or incorrect comparator can misorder equal weights; stable sort keeps determinism if desired.',
]

const decisionGuidance = [
  'Edge list ready and graph is sparse: Kruskal is a strong choice.',
  'Graph dense or adjacency-driven: consider Prim to avoid sorting all edges.',
  'Integer small weights: use bucket/radix sort to trim the log factor.',
  'Disconnected input: Kruskal naturally produces a minimum spanning forest.',
]

const takeaways = [
  "Kruskal's scans globally lightest to heaviest, unioning components to avoid cycles.",
  'Union-Find makes it near-linear after sorting.',
  'Cycle and cut properties justify the greedy choices and keep the tree minimal.',
]

export default function KruskalsAlgorithmPage(): JSX.Element {
  return (
    <TopicLayout
      title="Kruskal's Algorithm"
      subtitle="Sorting edges into a minimum spanning forest"
      intro="Kruskal builds a minimum spanning tree by sorting edges and adding them if they connect different components. Powered by the cycle and cut properties, it stays simple and fast with a Union-Find backbone."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          MST construction can be global (Kruskal) or local (Prim). Kruskal is global: sort edges once, then greedily accept the
          lightest edges that do not form cycles until you have V - 1 edges per component.
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
