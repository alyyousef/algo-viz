import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Tarjan, Kosaraju, and the SCC toolkit (1970s)',
    detail:
      'Multiple linear-time SCC algorithms emerged: Kosaraju’s two-pass DFS, Tarjan’s one-pass low-link method, and later Gabow’s stack-based approach. Together they cemented SCCs as a core graph primitive.',
  },
  {
    title: 'Cut/condense insight',
    detail:
      'Viewing SCCs as nodes of a DAG (the condensation graph) clarified why finishing times from one pass order SCCs for the next. This perspective underpins Kosaraju’s correctness proof.',
  },
  {
    title: 'SCCs in compilers and systems',
    detail:
      'Dependency analysis, dead code elimination, circuit timing, and package managers all adopted SCC decompositions to collapse cycles into single units for scheduling and optimization.',
  },
]

const mentalModels = [
  {
    title: 'Finish order as a topological hint',
    detail:
      'A DFS finishing stack orders SCCs reverse-topologically: if there is a path from A to B in the condensation DAG, B finishes before A. Processing in that order on the reversed graph peels SCCs cleanly.',
  },
  {
    title: 'Turn sinks into sources',
    detail:
      'Reversing edges converts sink SCCs into sources. Starting DFS from the latest finisher ensures you expand exactly one SCC before any incoming edges can pull you elsewhere.',
  },
  {
    title: 'Two mirrors of the same walk',
    detail:
      'Pass one paints a map of where you can finish; pass two follows the mirrors of those paths, revealing mutually reachable groups.',
  },
]

const mechanics = [
  {
    heading: 'Pass 1: finishing order on G',
    bullets: [
      'Run DFS over all vertices; on exit, push the vertex onto a stack/list.',
      'Finishing order ensures that edges in the condensation DAG point from later to earlier finishes.',
    ],
  },
  {
    heading: 'Pass 2: discovery on G^T',
    bullets: [
      'Traverse the reversed graph. Pop vertices from the finish stack.',
      'For each unvisited vertex popped, run DFS/BFS on G^T to collect one SCC.',
      'Because sinks became sources, each search stays within a single SCC.',
    ],
  },
  {
    heading: 'Outputs',
    bullets: [
      'List of SCCs (each a vertex set).',
      'Optional condensation DAG by contracting SCCs and adding edges between components.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(V + E): two graph traversals. Sorting is not needed; the stack order emerges from DFS finishes.',
  },
  {
    title: 'Space',
    detail:
      'O(V + E) to store the graph; O(V) for visited flags and the finish stack. A reversed adjacency list may double storage unless generated on the fly.',
  },
  {
    title: 'Iterative robustness',
    detail:
      'Recursive DFS can overflow on deep graphs. Iterative stacks keep the same complexity with better safety in production code.',
  },
]

const realWorldUses = [
  {
    context: 'Package and build systems',
    detail:
      'Collapse dependency cycles into single nodes to schedule builds or updates. Many build tools and package managers run SCC detection to break strongly connected dependency chains.',
  },
  {
    context: 'Program analysis and compilers',
    detail:
      'SCCs enable strongly connected region scheduling, dead code elimination, and identifying loops in control-flow graphs.',
  },
  {
    context: 'Model checking and games',
    detail:
      'Closed sets of states (attractors, recurrent classes) are SCCs. Finding them is central to reachability, liveness, and parity-game solvers.',
  },
  {
    context: 'Clustering on directed data',
    detail:
      'In web graphs or citation networks, SCCs reveal tightly knit communities of mutual reachability.',
  },
]

const examples = [
  {
    title: "Kosaraju's algorithm (iterative-friendly pseudocode)",
    code: `function kosaraju(graph):
    order = []
    visited = set()

    # pass 1: record finish order
    for u in graph.vertices():
        if u not in visited:
            iterative_dfs_finish(graph, u, visited, order)

    visited.clear()
    sccs = []
    for u in reversed(order):
        if u not in visited:
            comp = []
            iterative_dfs_collect(graph.rev(), u, visited, comp)
            sccs.append(comp)
    return sccs

function iterative_dfs_finish(g, start, visited, order):
    stack = [(start, 0)]  # (node, next_index)
    visited.add(start)
    while stack:
        u, idx = stack.pop()
        if idx < len(g.neighbors(u)):
            v = g.neighbors(u)[idx]
            stack.append((u, idx + 1))
            if v not in visited:
                visited.add(v)
                stack.append((v, 0))
        else:
            order.append(u)  # finished

function iterative_dfs_collect(g_rev, start, visited, comp):
    stack = [start]
    visited.add(start)
    while stack:
        u = stack.pop()
        comp.append(u)
        for v in g_rev.neighbors(u):
            if v not in visited:
                visited.add(v)
                stack.append(v)`,
    explanation:
      'Finishing order from the first pass provides a reverse topological ordering of SCCs. Iterative DFS avoids recursion limits while preserving O(V + E) cost.',
  },
]

const pitfalls = [
  'Forgetting to reverse edges in pass 2; using the original graph yields incorrect SCC grouping.',
  'Stack overflow from recursive DFS on large graphs; use iterative versions in production.',
  'Materializing the reversed graph can double memory; consider on-the-fly reverse adjacency iteration.',
  'Assuming uniqueness: multiple valid SCC orders exist; determinism may need vertex-id tie-breaks.',
]

const decisionGuidance = [
  'Need simple, linear-time SCCs and can afford two passes: use Kosaraju.',
  'Need single-pass SCCs or memory tightness: use Tarjan’s algorithm.',
  'Graph is extremely deep or large: prefer iterative DFS to avoid recursion limits.',
  'Streaming edges sorted by tail/head: consider on-the-fly reverse iteration to avoid building g^T fully.',
]

const advancedInsights = [
  {
    title: 'Condensation DAG ordering',
    detail:
      'Finishing times produce a reverse topological order of the condensation graph. This is why processing in that order on g^T isolates SCCs.',
  },
  {
    title: 'Comparison to Tarjan',
    detail:
      'Tarjan computes low-link values in one pass with one stack. Kosaraju splits work into two clean passes; both are O(V + E), but Tarjan saves the reverse graph cost.',
  },
  {
    title: 'Edge-reversal shortcuts',
    detail:
      'If the graph stores in-edges alongside out-edges, pass 2 can iterate in-edges directly, avoiding explicit reversal and halving memory.',
  },
  {
    title: 'Parallel opportunities',
    detail:
      'Parallelization is tricky because pass 2 depends on pass 1 ordering, but building the reverse graph and the first DFS can be parallelized in preprocessing.',
  },
]

const takeaways = [
  "Kosaraju runs two DFS passes: finish order on G, discovery on G^T, to output SCCs in linear time.",
  'Union-Find is not needed; correctness rests on finish ordering and edge reversal.',
  'Iterative DFS avoids recursion issues; implicit reversal saves memory.',
  'Pick Tarjan for one-pass tightness, Kosaraju for clarity, and Gabow for another stack-based alternative.',
]

export default function KosarajusAlgorithmPage(): JSX.Element {
  return (
    <TopicLayout
      title="Kosaraju's Algorithm"
      subtitle="Two DFS passes to expose strongly connected components"
      intro="Kosaraju’s algorithm finds strongly connected components with two DFS passes. The first records finishing order on the original graph; the second, on the reversed graph, peels components in reverse topological order of the condensation DAG."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          SCCs collapse a directed graph into a DAG. Kosaraju achieves this in O(V + E): one DFS to capture finishing order, and a
          second on the reversed graph to collect components. Sink components become sources after reversal, ensuring each search
          stays inside one SCC.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMilestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
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

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-4">
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

      <TopicSection heading="Complexity analysis">
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

      <TopicSection heading="Advanced insights">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
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
