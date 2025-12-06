import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const history = [
  '1959: Stephen Warshall publishes the transitive closure algorithm using a triple loop over a boolean matrix.',
  '1962: Robert Floyd adapts the pattern to weighted graphs (min-plus semiring) for all-pairs shortest paths with negative edges allowed.',
  '1970s-1990s: Dynamic programming and matrix formulations popularize Floyd-Warshall in CS curricula (Knuth, Tarjan, CLRS).',
  'Modern practice: reused with alternative semirings (max-min for bottlenecks, min-times for reliability) and blocked for cache efficiency.',
]

const mechanics = [
  {
    heading: 'Triple-loop dynamic programming',
    bullets: [
      'dist[k][i][j] is the best distance from i to j using only intermediates in {0..k}.',
      'Transition: dist[k][i][j] = min(dist[k-1][i][j], dist[k-1][i][k] + dist[k-1][k][j]).',
      'In-place update works because each k-layer depends only on the previous k-1 layer, so a 2D dist is enough.',
    ],
  },
  {
    heading: 'Initialization',
    bullets: [
      'dist[i][i] = 0 for all i.',
      'dist[i][j] = w(i, j) if edge exists, else infinity.',
      'next[i][j] = j if an edge exists; used to reconstruct paths.',
    ],
  },
  {
    heading: 'Negative cycles and detection',
    bullets: [
      'After all k, any dist[v][v] < 0 flags a negative cycle reachable from v.',
      'To mark pairs affected by a negative cycle, iterate k again: if dist[i][k] + dist[k][j] < dist[i][j] and dist[k][k] < 0, mark as -infinity.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'O(V^3) time, O(V^2) space. Great for dense graphs or when you need all-pairs answers reused many times. Becomes heavy past a few thousand vertices.',
  },
  {
    title: 'Cache and blocking',
    detail:
      'k outermost with i, j inner is common. Blocking (tiling) the matrix improves locality on large V, similar to blocked matrix multiply.',
  },
  {
    title: 'Alternatives by sparsity',
    detail:
      'On sparse graphs with non-negative weights, Johnson (one Bellman-Ford + V Dijkstra) is O(V E log V) and wins for large V. Repeated Dijkstra without reweighting fails on graphs with negative edges.',
  },
]

const realWorldUses = [
  {
    context: 'Routing tables and simulators',
    detail: 'Small or simulated networks precompute all-pairs latencies and next hops for instant lookup.',
  },
  {
    context: 'Compilers and static analysis',
    detail: 'Transitive closure over dependency or precedence graphs; min-plus variants handle timing and cost constraints.',
  },
  {
    context: 'Graph analytics on dense data',
    detail: 'Betweenness centrality, diameter, and clustering on dense social or biological graphs often start from an all-pairs matrix.',
  },
  {
    context: 'Reliability and bottleneck paths',
    detail: 'Using max-min semiring finds widest bottleneck paths; min-times models reliability multiplication.',
  },
]

const examples = [
  {
    title: 'Standard Floyd-Warshall with path reconstruction',
    code: `function floydWarshall(n, adj):
    // adj: n x n matrix, inf where no edge, 0 on diagonal
    dist = copy(adj)
    next = matrix(n, n, null)
    for i in range(n):
        for j in range(n):
            if i == j: next[i][j] = i
            else if adj[i][j] < inf: next[i][j] = j

    for k in range(n):
        for i in range(n):
            if dist[i][k] == inf: continue
            for j in range(n):
                alt = dist[i][k] + dist[k][j]
                if alt < dist[i][j]:
                    dist[i][j] = alt
                    next[i][j] = next[i][k]  // step toward j

    // detect negative cycles
    for v in range(n):
        if dist[v][v] < 0: raise NegativeCycle

    return dist, next`,
    explanation:
      'Each k-layer authorizes vertex k as an intermediate. next lets you rebuild an actual path by walking i -> next[i][j] until j. Infinity checks avoid overflow when no connection exists.',
  },
  {
    title: 'Boolean transitive closure (Warshall)',
    code: `function transitiveClosure(n, reach):
    // reach[i][j] = true if edge exists
    for k in range(n):
        for i in range(n):
            if not reach[i][k]: continue
            for j in range(n):
                reach[i][j] = reach[i][j] or (reach[i][k] and reach[k][j])
    return reach`,
    explanation:
      'Same structure over the boolean semiring. Answers reachability queries in O(1) after O(V^3) preprocessing.',
  },
]

const pitfalls = [
  'Failing to set dist[i][i] = 0 breaks correctness and hides negative cycles.',
  'Updating next incorrectly (or not copying adjacency to dist) yields wrong reconstructions even if distances are right.',
  'Using adjacency lists directly hurts performance; convert to a dense matrix first for tight loops and cache locality.',
  'Integer overflow when adding infinities or large weights; guard with sentinel inf checks and wide integer types.',
  'Expecting it to scale to huge sparse graphs; past a few thousand nodes, O(V^3) can dominate wall-clock and memory.',
]

const decisionGuidance = [
  'Dense or moderately sized graphs (hundreds to a few thousands), negative edges allowed, no negative cycles wanted: choose Floyd-Warshall.',
  'Sparse graphs, non-negative weights: choose Dijkstra per source or Johnson for all-pairs.',
  'Negative edges on sparse graphs: run Bellman-Ford per source or Johnson (with reweighting) if all-pairs is needed.',
  'Reachability only: run the boolean version (Warshall) for transitive closure.',
  'Need widest or most reliable paths: swap in max-min or min-times semiring without changing the loop structure.',
]

const advancedInsights = [
  'Semiring view: replace min-plus with any associative combine/op pair to solve reachability, bottleneck, reliability, or precedence problems.',
  'Blocked variants mimic cache-friendly matrix multiply; crucial when V is large enough that naive triple loops thrash cache.',
  'Parallelization: k-outer loops can be tiled; inner i, j loops vectorize well on CPUs and map to GPU-style matrix kernels.',
  'Path reconstruction: next[i][j] = next[i][k] when going through k ensures O(path length) recovery without storing parents per k.',
  'Negative cycle propagation: a second pass marking pairs that can reach and be reached from any vertex with dist[v][v] < 0 yields complete -infinity labeling.',
]

export default function FloydWarshallPage(): JSX.Element {
  return (
    <TopicLayout
      title="Floyd-Warshall"
      subtitle="All-pairs shortest paths via layered intermediates"
      intro="Floyd-Warshall is the canonical all-pairs shortest path algorithm for dense or medium-sized graphs. By considering intermediates one vertex at a time, it updates every pair in O(V^3) while gracefully handling negative edges and exposing negative cycles."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Instead of running single-source searches V times, Floyd-Warshall builds a distance matrix that allows intermediates in
          layers. Each k-layer either keeps the old distance or routes through k if that is cheaper, converging to optimal all-pairs
          paths and flagging negative cycles on the diagonal.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {history.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="How it works">
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

      <TopicSection heading="Complexity and performance intuition">
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
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {advancedInsights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>
    </TopicLayout>
  )
}
