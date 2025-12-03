import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mechanics = [
  {
    heading: 'Triple-loop dynamic programming',
    bullets: [
      'dp[k][i][j] stores the shortest path from i to j using only intermediate vertices from {0..k}.',
      'Transition: dp[k][i][j] = min(dp[k-1][i][j], dp[k-1][i][k] + dp[k-1][k][j]).',
      'Space can be reduced to dp[i][j] updated in place because each k-step only depends on the previous k - 1 slice.',
    ],
  },
  {
    heading: 'Initialization',
    bullets: [
      'dp[i][i] = 0 for all i.',
      'dp[i][j] = weight(i, j) if edge exists, else infinity.',
      'Parent or next-hop matrices capture reconstruction of actual paths.',
    ],
  },
  {
    heading: 'Negative cycles',
    bullets: [
      'After completion, any dp[i][i] < 0 indicates a negative cycle reachable from i.',
      'Propagation of negative cycles: optionally run another pass to mark all pairs influenced by such cycles as -infinity.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'O(V^3) time and O(V^2) space. Excellent for dense graphs or when all-pairs queries are required repeatedly.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Loop ordering matters; k outermost with i, j inner often improves locality. Blocking can help on large V to fit submatrices in cache.',
  },
  {
    title: 'When to choose it',
    detail:
      'Prefer Floyd-Warshall for dense graphs, small to medium V (hundreds to a few thousands), or when negative edges exist but no negative cycles are desired.',
  },
]

const realWorldUses = [
  {
    context: 'Routing and reachability matrices',
    detail:
      'Build full distance and next-hop tables for small networks, network simulators, or classroom routing labs.',
  },
  {
    context: 'Transitive closure and constraints',
    detail:
      'With boolean semiring, it computes reachability; with min-plus, it solves shortest paths; with other semirings, it handles precedence constraints.',
  },
  {
    context: 'Graph analytics for small graphs',
    detail:
      'All-pairs centrality, diameter, and clustering coefficients for small dense graphs often start from Floyd-Warshall outputs.',
  },
]

const examples = [
  {
    title: 'Standard Floyd-Warshall',
    code: `function floydWarshall(n, adjMatrix):
    // adjMatrix: n x n, infinity where no edge, 0 on diagonal
    dist = copy(adjMatrix)
    nextHop = initializeNextHop(adjMatrix) // optional reconstruction

    for k in range(n):
        for i in range(n):
            if dist[i][k] == infinity: continue
            for j in range(n):
                if dist[k][j] == infinity: continue
                alt = dist[i][k] + dist[k][j]
                if alt < dist[i][j]:
                    dist[i][j] = alt
                    nextHop[i][j] = nextHop[i][k]

    // negative cycle detection
    for v in range(n):
        if dist[v][v] < 0:
            throw NegativeCycleDetected

    return dist, nextHop`,
    explanation:
      'Each iteration k expands the allowed intermediates. Early infinity checks trim unnecessary work; nextHop tracks path reconstruction.',
  },
]

const pitfalls = [
  'Forgetting to set dist[i][i] = 0 leads to incorrect paths and missed negative cycles.',
  'Using an adjacency list directly is awkward; Floyd-Warshall expects or constructs a dense matrix.',
  'Not guarding against overflow on dist[i][k] + dist[k][j] when one side is infinity can wrap around.',
  'O(V^3) becomes prohibitive beyond a few thousand vertices; choose Johnson + Dijkstra or repeated Bellman-Ford on sparse larger graphs.',
]

const decisionGuidance = [
  'Need all-pairs shortest paths on dense or moderately sized graphs: use Floyd-Warshall.',
  'Need single-source on sparse graphs: prefer Dijkstra or Bellman-Ford depending on weights.',
  'Need all-pairs on sparse graphs with non-negative edges: use Johnson (Bellman-Ford once + many Dijkstra runs).',
  'Need reachability only: run Floyd-Warshall over boolean values (transitive closure).',
  'Negative cycles possible: detect via dist[v][v] after completion and handle accordingly.',
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
