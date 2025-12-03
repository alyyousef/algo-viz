import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Two-pass mirror walk',
    detail:
      'First walk the original graph to record finishing times, then walk the reversed graph in that order to reveal strongly connected components (SCCs).',
  },
  {
    title: 'Condensation peeling',
    detail:
      'Reversing the graph turns sinks into sources. Processing by reverse finish order peels SCCs from the condensed DAG, one source at a time.',
  },
]

const mechanics = [
  {
    heading: 'Pass 1: finishing order',
    bullets: [
      'Run DFS on the original graph, pushing nodes onto a stack/list on exit.',
      'Finishing times order nodes so that if there is a path u -> v in the condensation DAG, v finishes before u.',
    ],
  },
  {
    heading: 'Pass 2: reversed graph',
    bullets: [
      'Reverse all edges.',
      'Pop nodes from the finishing stack; for each unvisited node, DFS on the reversed graph to collect one SCC.',
      'Each DFS in pass 2 visits exactly one SCC because incoming edges from earlier components are reversed away.',
    ],
  },
  {
    heading: 'Outputs',
    bullets: [
      'List of SCCs (each a list of vertices).',
      'Optional condensation graph built by contracting SCCs into meta-nodes.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'Two DFS runs: O(V + E) time, O(V) space for visited/stack plus graph storage. Reversing edges can be done implicitly by iterating reverse adjacency.',
  },
  {
    title: 'Stability',
    detail:
      'Order of SCC discovery depends on DFS order but not correctness. Finishing stack preserves the partial order needed for correctness.',
  },
]

const realWorldUses = [
  {
    context: 'Component condensation',
    detail:
      'Build DAGs of mutually reachable modules (package dependency analysis, call graphs) to simplify reasoning about update order.',
  },
  {
    context: 'Model checking and games',
    detail:
      'SCCs identify closed sets of states for reachability, liveness, and attractor computations.',
  },
  {
    context: 'Deadlock and strongly connected subsystems',
    detail:
      'Detect cyclic dependencies in distributed systems or workflows by grouping mutually dependent nodes.',
  },
]

const examples = [
  {
    title: "Kosaraju's algorithm",
    code: `function kosaraju(graph):
    visited = set()
    order = []

    // first pass: record finish order
    function dfs1(u):
        visited.add(u)
        for v in graph.neighbors(u):
            if v not in visited:
                dfs1(v)
        order.append(u)

    for node in graph.vertices():
        if node not in visited:
            dfs1(node)

    // second pass on reversed graph
    rev = graph.reversed()
    visited.clear()
    sccs = []

    function dfs2(u, comp):
        visited.add(u)
        comp.append(u)
        for v in rev.neighbors(u):
            if v not in visited:
                dfs2(v, comp)

    for u in reversed(order):
        if u not in visited:
            comp = []
            dfs2(u, comp)
            sccs.append(comp)

    return sccs`,
    explanation:
      'Finishing order ensures each DFS on the reversed graph starts at a source of the condensation DAG, capturing exactly one SCC.',
  },
]

const pitfalls = [
  'Forgetting to reverse edges in the second pass breaks correctness.',
  'Stack overflow on deep graphs; use iterative DFS if recursion depth is a concern.',
  'Building an explicit reversed graph can be costly in memory; iterate reverse adjacency if available.',
]

const decisionGuidance = [
  'Need SCCs quickly with simple code: Kosaraju in O(V + E) is fine.',
  'Need one-pass SCCs with low memory: consider Tarjan (single DFS with low-link).',
  'Graph is huge and recursion risky: implement both passes iteratively.',
]

const takeaways = [
  "Kosaraju uses two DFS passes: finish order on the original, discovery on the reversed, to peel SCCs in topological order of the condensation DAG.",
  'Overall cost is linear in graph size; recursion depth and graph reversal are practical concerns to manage.',
]

export default function KosarajusAlgorithmPage(): JSX.Element {
  return (
    <TopicLayout
      title="Kosaraju's Algorithm"
      subtitle="Two-pass DFS for strongly connected components"
      intro="Kosaraju finds strongly connected components by leveraging DFS finishing times and a reversed graph. The first pass records an order; the second pass, on the reversed edges, peels SCCs in the right sequence."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          SCCs collapse a directed graph into a DAG. Kosaraju accomplishes this with two linear-time DFS passes, using finish order
          to ensure each reversed-graph search stays within one component.
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
