import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Otakar Boruvka electrifies Moravia (1926)',
    detail:
      'Boruvka devised a greedy edge-picking procedure to minimize the cost of rural power networks, introducing one of the earliest MST algorithms.',
  },
  {
    title: 'Kruskal and Prim formalize greedy spanning (1956-1957)',
    detail:
      'Joseph Kruskal proposed sorting edges by weight and building a forest; Robert Prim showed how to grow a tree outward with a priority queue.',
  },
  {
    title: 'Dijkstra generalizes Prim (1959)',
    detail:
      'Edsger Dijkstra independently described the same tree-growing method as Prim, tying it to his shortest-path framework and popularizing heap-based implementations.',
  },
  {
    title: 'Union-Find proves its worth (1964-1973)',
    detail:
      'Tarjan and colleagues analyzed disjoint sets with near-constant amortized operations, making Kruskal blazingly fast for sparse graphs.',
  },
  {
    title: 'Parallel and dynamic MSTs emerge (1980s-2010s)',
    detail:
      'Shiloach-Vishkin, Karger-Klein-Tarjan, and later dynamic algorithms allowed MST maintenance under edge updates and parallel hardware.',
  },
]

const mentalModels = [
  {
    title: 'Cheapest backbone',
    detail:
      'An MST is the lean skeleton that keeps every vertex connected with minimal total weight. Any extra edge is a muscle you can trim without breaking connectivity.',
  },
  {
    title: 'Cycle breaker',
    detail:
      'Within any cycle, the heaviest edge is never needed in a minimum spanning tree. Removing it is like dropping the priciest plank from a closed loop.',
  },
  {
    title: 'Growing coral',
    detail:
      'Prim grows a coral reef from a seed, always attaching the lightest nearby branch. Kruskal grows many tiny corals that fuse when a cheap bridge appears.',
  },
  {
    title: 'Global versus local cheapest edge',
    detail:
      'Kruskal picks the globally cheapest eligible edge; Boruvka lets every component pick its local cheapest edge simultaneously, a pattern that parallelizes well.',
  },
]

const mechanics = [
  {
    heading: 'Kruskal: sort then union',
    bullets: [
      'Sort all edges by non-decreasing weight.',
      'Initialize each vertex as its own component (Union-Find).',
      'Scan edges in order; add an edge if its endpoints are in different components, then union them.',
      'Stop after adding V - 1 edges or when all vertices share one component.',
    ],
  },
  {
    heading: 'Prim/Dijkstra style: grow a tree',
    bullets: [
      'Pick any start vertex; push its incident edges into a min-priority queue keyed by weight.',
      'Repeatedly extract the lightest edge that leads to an unvisited vertex; add that vertex and its outgoing edges to the queue.',
      'Continue until all vertices are visited; the chosen edges form the MST.',
      'Binary heap gives O((V + E) log V); Fibonacci or pairing heaps can lower the decrease-key cost on dense graphs.',
    ],
  },
  {
    heading: 'Boruvka: rounds of local minima',
    bullets: [
      'For each component, pick its cheapest outgoing edge and add them all at once.',
      'Components merge in batches, shrinking the graph quickly; repeat rounds until one component remains.',
      'Parallel-friendly because each component chooses independently within a round.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Kruskal cost profile',
    detail:
      'Sorting dominates: O(E log E) time with Union-Find nearly constant. With integer weights and buckets, it approaches O(E). Memory is O(V + E).',
  },
  {
    title: 'Prim variants',
    detail:
      'With a binary heap and adjacency lists: O((V + E) log V). With a Fibonacci heap: O(E + V log V). With a simple array: O(V^2), acceptable for dense graphs.',
  },
  {
    title: 'Boruvka behavior',
    detail:
      'Each round halves the number of components in expectation; total time is O(E log V) with straightforward structures, often faster in practice on parallel hardware.',
  },
  {
    title: 'Edge cases',
    detail:
      'Disconnected graphs yield a minimum spanning forest. Duplicate edge weights are fine; any MST of minimum total weight is valid.',
  },
]

const realWorldUses = [
  {
    context: 'Network design',
    detail:
      'Telecom, fiber, and power grids use MSTs to plan cheapest backbone deployments before layering redundancy and capacity upgrades.',
  },
  {
    context: 'Approximation schemes',
    detail:
      'Metric traveling salesperson approximations (e.g., doubling tree tours) start from an MST to bound total tour cost.',
  },
  {
    context: 'Image segmentation',
    detail:
      'Minimum spanning forests over pixel similarity graphs underpin algorithms like Felzenszwalb-Huttenlocher for grouping coherent regions.',
  },
  {
    context: 'Clustering',
    detail:
      'Single-linkage hierarchical clustering cuts the longest edges of an MST to form clusters, revealing chaining structure in data.',
  },
  {
    context: 'Infrastructure audits',
    detail:
      'MSTs provide a cost baseline; edges outside the MST indicate redundancies that can be pruned or justified for reliability.',
  },
]

const examples = [
  {
    title: 'Kruskal with Union-Find',
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
      'Sorting once and doing near-constant Union-Find operations keeps Kruskal lean. Early exit after V - 1 edges avoids needless scans in dense graphs.',
  },
  {
    title: 'Prim with a min-heap',
    code: `function prim(graph, start):
    visited = set()
    mst = []
    pq = new MinHeap() // entries: (w, u, v) where v is outside the tree

    visited.add(start)
    for (v, w) in graph.neighbors(start):
        pq.push((w, start, v))

    while pq not empty and len(visited) < graph.size():
        (w, u, v) = pq.pop_min()
        if v in visited:
            continue
        visited.add(v)
        mst.append((u, v, w))
        for (nxt, wt) in graph.neighbors(v):
            if nxt not in visited:
                pq.push((wt, v, nxt))

    return mst`,
    explanation:
      'The heap always surfaces the cheapest edge crossing the cut between the tree and the remaining vertices, satisfying the cut property that keeps the tree minimal.',
  },
  {
    title: 'Boruvka rounds',
    code: `function boruvka(graph):
    uf = new UnionFind(graph.vertices)
    mst = []

    while uf.component_count() > 1:
        cheapest = map from component -> (u, v, w) default null
        for (u, v, w) in graph.edges:
            cu = uf.find(u); cv = uf.find(v)
            if cu == cv:
                continue
            if cheapest[cu] is null or w < cheapest[cu].w:
                cheapest[cu] = (u, v, w)
            if cheapest[cv] is null or w < cheapest[cv].w:
                cheapest[cv] = (u, v, w)
        for edge in cheapest.values():
            if edge is null:
                continue
            (u, v, w) = edge
            if uf.find(u) != uf.find(v):
                uf.union(u, v)
                mst.append(edge)

    return mst`,
    explanation:
      'Each component grabs its cheapest outgoing edge. Parallelizing the per-edge scan and per-component choice makes Boruvka attractive on large hardware.',
  },
]

const pitfalls = [
  'Feeding negative cycles into MST algorithms is fine; weights can be negative, but remember MST optimizes total weight, not shortest paths.',
  'Using an adjacency matrix with Kruskal wastes memory and time on sparse graphs; store edges explicitly.',
  'Forgetting early exit in Kruskal on dense graphs does unnecessary work after the tree is already complete.',
  'Implementing Prim without a visited check can add duplicate vertices and corrupt the tree.',
  'Assuming a unique MST when edge weights tie can cause brittle tests; multiple valid MSTs may exist.',
]

const decisionGuidance = [
  'Sparse graph with many edges already listed: use Kruskal with Union-Find.',
  'Dense graph or implicit adjacency lists: use Prim with a heap (or array for very dense, moderate-sized graphs).',
  'Small integer edge weights: consider bucketed Kruskal or a bucketed Prim variant.',
  'Need parallelism: Boruvka or hybrid Boruvka + Prim often scales better.',
  'Graph is disconnected: run the same algorithm; result is a minimum spanning forest.',
]

const advancedInsights = [
  {
    title: 'Cut and cycle properties',
    detail:
      'Cut property: the lightest edge crossing any cut of the graph is safe to include. Cycle property: the heaviest edge in any cycle is unsafe. Both justify greedy steps.',
  },
  {
    title: 'Hybrid strategies',
    detail:
      'Boruvka rounds shrink components quickly, then Prim finishes on the contracted graph, combining fast convergence with low overhead.',
  },
  {
    title: 'Dynamic MST maintenance',
    detail:
      'Link-cut trees, Euler tour trees, and dynamic trees support edge insertions and deletions while maintaining an MST in polylogarithmic time per update.',
  },
  {
    title: 'Sensitivity analysis',
    detail:
      'Replacing one edge in the MST with a non-tree edge forms a cycle; swapping the heaviest edge on that cycle tests how cost changes under perturbations.',
  },
  {
    title: 'Parallel and external memory',
    detail:
      'PRAM-friendly Boruvka variants and external-memory MSTs reduce I/O or synchronize rounds to traverse billion-edge graphs efficiently.',
  },
]

const takeaways = [
  'Minimum spanning trees give the cheapest way to stay connected; they are backbones, not routes.',
  'Greedy stays safe because of cut and cycle properties; every chosen edge is locally optimal yet globally consistent.',
  'Choose Kruskal for edge-sorted workflows, Prim for adjacency-driven growth, and Boruvka or hybrids when parallelism or contraction speed matters.',
  'Union-Find and good priority queues turn the theory into practical, near-linear implementations on sparse graphs.',
]

export default function MinimumSpanningTreePage(): JSX.Element {
  return (
    <TopicLayout
      title="Minimum Spanning Tree"
      subtitle="Cheapest backbone through greedy cuts"
      intro="A minimum spanning tree keeps every vertex connected with the smallest possible total weight. The secret is the cut and cycle properties: pick the lightest edge that crosses a frontier, or drop the heaviest edge in a cycle, and you never hurt optimality. Kruskal, Prim, and Boruvka are greedy by design, but their guardrails make the greed safe."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          MSTs strip a weighted graph to its essential scaffold: no cycles, exactly V - 1 edges, and minimum cost to keep the
          graph connected. They are perfect for designing cheap infrastructure, benchmarking redundancy, and seeding approximation
          algorithms that need a low-cost baseline.
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

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          In practice, sorting edges plus fast Union-Find often dominates. On dense graphs, Prim with a heap can edge ahead by
          avoiding a full sort. When weights are small integers, bucketed approaches remove the log factors entirely.
        </p>
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

      <TopicSection heading="Practical examples">
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

      <TopicSection heading="Advanced insights and current frontiers">
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
