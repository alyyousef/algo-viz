import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mechanics = [
  {
    heading: 'Core idea',
    bullets: [
      'Relax all edges up to V - 1 times; each pass allows shortest paths with that many edges.',
      'Initialization: dist[source] = 0; all others = infinity.',
      'Each relaxation: if dist[u] + w < dist[v], update dist[v] and parent[v].',
    ],
  },
  {
    heading: 'Negative cycle detection',
    bullets: [
      'After V - 1 passes, one more full relaxation pass reveals any edge that can still improve distance.',
      'If an improvement occurs, the graph contains a negative cycle reachable from the source.',
      'Track predecessors to recover the actual cycle when needed.',
    ],
  },
  {
    heading: 'Optimizations',
    bullets: [
      'Early stop when a pass makes no updates.',
      'Queue-based variants (SPFA) push only changed vertices, though worst-case is still O(VE).',
      'Edge ordering can improve cache behavior but not the asymptotic bound.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'O(VE) time and O(V) space. Works on any directed or undirected graph with negative weights, as long as negative cycles are handled.',
  },
  {
    title: 'When it beats Dijkstra',
    detail:
      'Required when edges can be negative. On dense graphs with small V, O(VE) can be acceptable. On sparse graphs with only non-negative weights, Dijkstra is usually faster.',
  },
  {
    title: 'Batch updates',
    detail:
      'Because edges are relaxed in parallel conceptually, Bellman-Ford maps well to GPU and distributed settings where synchronous rounds are natural.',
  },
]

const realWorldUses = [
  {
    context: 'Routing protocols',
    detail:
      'RIP (Routing Information Protocol) uses Bellman-Ford style distance vectors to propagate shortest path estimates through networks.',
  },
  {
    context: 'Arbitrage detection',
    detail:
      'Currency exchange graphs model logarithms of rates as weights; a negative cycle corresponds to an arbitrage opportunity.',
  },
  {
    context: 'Graph algorithms with reweighting',
    detail:
      'Johnson uses Bellman-Ford to compute vertex potentials that eliminate negative edges, enabling Dijkstra on all-pairs queries.',
  },
]

const examples = [
  {
    title: 'Standard Bellman-Ford',
    code: `function bellmanFord(vertices, edges, source):
    dist = map with default infinity
    parent = map
    dist[source] = 0

    for i in range(1, len(vertices)):
        changed = false
        for (u, v, w) in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                changed = true
        if not changed:
            break

    // detect negative cycles
    for (u, v, w) in edges:
        if dist[u] + w < dist[v]:
            throw NegativeCycleDetected

    return dist, parent`,
    explanation:
      'Relax edges V - 1 times, bail early if nothing changes, and then probe once more to catch negative cycles.',
  },
]

const pitfalls = [
  'Skipping the final detection pass can silently miss negative cycles.',
  'Using Bellman-Ford when all edges are non-negative is slower than necessary; prefer Dijkstra.',
  'Overflow on large negative sums can flip comparisons; use wide integers.',
  'Forgetting to initialize distances to infinity except the source breaks correctness.',
]

const decisionGuidance = [
  'Edges can be negative: use Bellman-Ford (single-source).',
  'Many sources on a sparse graph with some negatives: run Bellman-Ford from a super-source (Johnson) then Dijkstra per source.',
  'All edges non-negative: prefer Dijkstra for speed.',
  'Need only to detect negative cycles: run V - 1 relaxations, then test once more and record improving edges.',
]

export default function BellmanFordPage(): JSX.Element {
  return (
    <TopicLayout
      title="Bellman-Ford"
      subtitle="Shortest paths with negative weights"
      intro="Bellman-Ford relaxes every edge in rounds, allowing paths to gain at most one edge per round. It handles negative weights gracefully and signals negative cycles, making it the safer choice when Dijkstra's non-negative assumption is broken."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          This algorithm trades speed for generality: O(VE) time, O(V) space, but it works whenever edges may be negative. Its
          synchronous relaxation rounds map well to distributed updates and give a built-in mechanism to flag negative cycles.
        </p>
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
    </TopicLayout>
  )
}
