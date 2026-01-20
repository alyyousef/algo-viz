import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const history = [
  '1959: Stephen Warshall publishes the transitive closure algorithm using a triple loop over a boolean matrix.',
  '1962: Robert Floyd adapts the pattern to weighted graphs (min-plus semiring) for all-pairs shortest paths with negative edges allowed.',
  '1970s-1990s: Dynamic programming and matrix formulations popularize Floyd-Warshall in CS curricula (Knuth, Tarjan, CLRS).',
  'Modern practice: reused with alternative semirings (max-min for bottlenecks, min-times for reliability) and blocked for cache efficiency.',
]

const formalDefinition = [
  {
    title: 'Problem statement',
    detail:
      'Given a weighted directed graph, compute the shortest-path distance between every ordered pair of vertices.',
  },
  {
    title: 'DP state',
    detail:
      'Let dist[k][i][j] be the shortest path from i to j using only intermediate vertices from 0..k.',
  },
  {
    title: 'Transition',
    detail:
      'Either avoid k or route through k: dist[k][i][j] = min(dist[k-1][i][j], dist[k-1][i][k] + dist[k-1][k][j]).',
  },
  {
    title: 'Final answer',
    detail:
      'After k = V-1, dist[V-1][i][j] is the shortest distance for all pairs.',
  },
]

const mechanics = [
  {
    heading: 'Triple-loop dynamic programming',
    bullets: [
      'The k loop controls which intermediates are allowed. The i, j loops update all pairs for that k.',
      'In-place update works because each k-layer depends only on values from the same or previous k, not future k.',
      'This is a min-plus matrix closure. Swap min-plus for another semiring to solve related problems.',
    ],
  },
  {
    heading: 'Initialization',
    bullets: [
      'dist[i][i] = 0 for all i (zero-length paths).',
      'dist[i][j] = w(i, j) if edge exists, else infinity.',
      'next[i][j] = j for direct edges to enable path reconstruction.',
    ],
  },
  {
    heading: 'Negative cycles and detection',
    bullets: [
      'After all k, any dist[v][v] < 0 flags a reachable negative cycle.',
      'To mark all affected pairs, propagate: if dist[i][k] and dist[k][j] are finite and dist[k][k] < 0, then i to j is -infinity.',
      'Many APIs throw or mark pairs when negative cycles exist because no finite shortest path exists.',
    ],
  },
]

const invariants = [
  {
    title: 'Layered intermediates',
    detail:
      'After processing k, dist[i][j] is optimal among all paths whose intermediates are in 0..k.',
  },
  {
    title: 'Monotonic improvement',
    detail:
      'dist values never increase. Each update only improves or leaves them unchanged.',
  },
  {
    title: 'Diagonal meaning',
    detail:
      'dist[v][v] is the best cycle weight through v. A negative value means a negative cycle is reachable.',
  },
]

const algorithmSteps = [
  {
    title: 'Build dense matrix',
    detail:
      'Convert edge lists to a dense dist matrix. This keeps inner loops tight and cache-friendly.',
  },
  {
    title: 'Seed base distances',
    detail:
      'Set dist[i][i] = 0. Copy edge weights, set others to infinity.',
  },
  {
    title: 'Run k, i, j loops',
    detail:
      'For each k, update dist[i][j] using dist[i][k] + dist[k][j].',
  },
  {
    title: 'Optional: reconstruct paths',
    detail:
      'Use next[i][j] pointers to recover the actual path, not just the distance.',
  },
  {
    title: 'Check negative cycles',
    detail:
      'If any dist[v][v] < 0, no finite shortest path exists for some pairs.',
  },
]

const workedExample = [
  {
    title: 'Graph',
    detail:
      'Vertices: 0, 1, 2, 3. Edges: 0->1 (3), 0->2 (10), 1->2 (1), 2->3 (2), 1->3 (8).',
  },
  {
    title: 'Initial dist matrix',
    detail:
      '    0   1   2   3\n0   0   3  10  inf\n1  inf  0   1   8\n2  inf inf  0   2\n3  inf inf inf  0',
  },
  {
    title: 'Key update',
    detail:
      'When k = 1, dist[0][2] becomes 4 via 0->1->2, and dist[0][3] becomes 11 via 0->1->3.',
  },
  {
    title: 'After k = 2',
    detail:
      'dist[0][3] improves to 6 via 0->1->2->3 (3 + 1 + 2).',
  },
]

const pathReconstruction = [
  {
    title: 'Initialize next',
    detail:
      'If edge i->j exists, next[i][j] = j. If i == j, next[i][i] = i.',
  },
  {
    title: 'Update rule',
    detail:
      'When dist[i][j] improves via k, set next[i][j] = next[i][k].',
  },
  {
    title: 'Recover path',
    detail:
      'Start at i, repeatedly jump to next[i][j] until you reach j.',
  },
]

const negativeCycleHandling = [
  {
    title: 'Detect',
    detail:
      'If dist[v][v] < 0 after all k, there is a negative cycle reachable from v.',
  },
  {
    title: 'Propagate',
    detail:
      'For each k with dist[k][k] < 0, if dist[i][k] and dist[k][j] are finite, mark dist[i][j] as -infinity.',
  },
  {
    title: 'API choice',
    detail:
      'Either throw, return a flag, or mark affected pairs. Be explicit about what you return.',
  },
]

const variantComparison = [
  {
    heading: 'Min-plus (shortest paths)',
    bullets: [
      'Standard Floyd-Warshall: min over path sums.',
      'Allows negative edges but not negative cycles.',
    ],
  },
  {
    heading: 'Boolean (reachability)',
    bullets: [
      'Warshall transitive closure: OR over AND.',
      'Answers reachability queries in O(1) after preprocessing.',
    ],
  },
  {
    heading: 'Max-min (bottleneck)',
    bullets: [
      'Maximize the minimum edge capacity along a path.',
      'Used for widest path or bandwidth planning.',
    ],
  },
  {
    heading: 'Min-times (reliability)',
    bullets: [
      'Multiply probabilities along edges and minimize total failure (or maximize success in log space).',
      'Used in reliability or risk models.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'O(V^3) time, O(V^2) space. Great for dense graphs or when you need all-pairs answers reused many times.',
  },
  {
    title: 'Cache and blocking',
    detail:
      'k outermost with i, j inner is common. Blocking (tiling) the matrix improves locality on large V.',
  },
  {
    title: 'Alternatives by sparsity',
    detail:
      'On sparse graphs with non-negative weights, Johnson (one Bellman-Ford + V Dijkstra) is O(V E log V) and wins for large V.',
  },
]

const optimizationPlaybook = [
  {
    title: 'Skip useless rows',
    detail:
      'If dist[i][k] is infinity, no path i -> k exists, so you can skip the j loop for that i.',
  },
  {
    title: 'Use wide types',
    detail:
      'Avoid overflow by using 64-bit ints or bigints for large weights. Guard inf additions explicitly.',
  },
  {
    title: 'Blocked loops',
    detail:
      'Tile i and j to improve cache reuse, similar to blocked matrix multiplication.',
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
                    next[i][j] = next[i][k]

    for v in range(n):
        if dist[v][v] < 0: raise NegativeCycle

    return dist, next`,
    explanation:
      'Each k-layer authorizes vertex k as an intermediate. next lets you rebuild a path by walking i -> next[i][j] until j.',
  },
  {
    title: 'Negative cycle propagation',
    code: `function markNegativePairs(n, dist):
    for k in range(n):
        if dist[k][k] >= 0: continue
        for i in range(n):
            if dist[i][k] == inf: continue
            for j in range(n):
                if dist[k][j] == inf: continue
                dist[i][j] = -inf
    return dist`,
    explanation:
      'If a negative cycle is reachable from i and can reach j, there is no finite shortest path from i to j.',
  },
  {
    title: 'Boolean transitive closure (Warshall)',
    code: `function transitiveClosure(n, reach):
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
  'Expecting it to scale to huge sparse graphs; past a few thousand nodes, O(V^3) dominates wall-clock and memory.',
]

const decisionGuidance = [
  'Dense or moderately sized graphs (hundreds to a few thousands), negative edges allowed, no negative cycles wanted: choose Floyd-Warshall.',
  'Sparse graphs, non-negative weights: choose Dijkstra per source or Johnson for all-pairs.',
  'Negative edges on sparse graphs: run Bellman-Ford per source or Johnson if all-pairs is needed.',
  'Reachability only: run the boolean version (Warshall) for transitive closure.',
  'Need widest or most reliable paths: swap in max-min or min-times semiring without changing the loop structure.',
]

const advancedInsights = [
  'Semiring view: replace min-plus with any associative combine/op pair to solve reachability, bottleneck, reliability, or precedence problems.',
  'Blocked variants mimic cache-friendly matrix multiply; crucial when V is large enough that naive triple loops thrash cache.',
  'Parallelization: k-outer loops can be tiled; inner i, j loops vectorize well on CPUs and map to GPU-style kernels.',
  'Path reconstruction: next[i][j] = next[i][k] when going through k ensures O(path length) recovery without storing parents per k.',
  'Negative cycle propagation: a second pass marking pairs that can reach and be reached from any vertex with dist[v][v] < 0 yields complete -infinity labeling.',
]

const miniFaq = [
  {
    question: 'Why is in-place update valid?',
    answer:
      'At step k you only rely on distances that already allow intermediates up to k. Using the current matrix preserves that invariant.',
  },
  {
    question: 'Do I need to store a 3D array?',
    answer:
      'No. The k dimension can be folded into a single 2D matrix because each layer depends only on the previous one.',
  },
  {
    question: 'Can Floyd-Warshall handle negative edges?',
    answer:
      'Yes, as long as there are no negative cycles. The diagonal test detects them.',
  },
  {
    question: 'When is it too slow?',
    answer:
      'If V is in the tens of thousands or the graph is very sparse, O(V^3) is usually too slow and memory-heavy.',
  },
]

const takeaways = [
  'Floyd-Warshall is the simplest all-pairs shortest path method with a clean DP recurrence.',
  'The k loop controls which intermediates are allowed, making correctness easy to reason about.',
  'Negative cycles are detectable via the diagonal and must be handled explicitly.',
  'Semiring swaps reuse the same triple-loop to solve many path problems.',
  'For sparse graphs, consider Johnson or repeated Dijkstra instead.',
]

export default function FloydWarshallPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Floyd-Warshall</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">All-pairs shortest paths via layered intermediates</div>
              <p className="win95-text">
                Floyd-Warshall is the canonical all-pairs shortest path algorithm for dense or medium-sized graphs. It builds a
                distance matrix by gradually allowing more intermediate vertices, handling negative edges and exposing negative cycles.
                This page breaks down the recurrence, invariants, path reconstruction, and practical trade-offs in detail.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Instead of running single-source searches V times, Floyd-Warshall updates every pair in a dense matrix. At each k,
                you decide whether going through vertex k is cheaper than the best path found so far. After k reaches the last vertex,
                the matrix contains all-pairs shortest distances.
              </p>
              <p className="win95-text">
                The algorithm is a perfect DP teaching tool: a clean recurrence, a simple loop order, and a clear correctness invariant.
                It also generalizes beyond shortest paths when you swap the min-plus semiring for other operations.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Formal definition</legend>
            <div className="win95-grid win95-grid-2">
              {formalDefinition.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {history.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core invariants</legend>
            <div className="win95-grid win95-grid-3">
              {invariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm steps</legend>
            <div className="win95-grid win95-grid-3">
              {algorithmSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked example</legend>
            <div className="win95-grid win95-grid-2">
              {workedExample.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <pre className="win95-code">
                    <code>{item.detail}</code>
                  </pre>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Path reconstruction</legend>
            <div className="win95-grid win95-grid-3">
              {pathReconstruction.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Negative cycle handling</legend>
            <div className="win95-grid win95-grid-3">
              {negativeCycleHandling.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variant comparison</legend>
            <div className="win95-grid win95-grid-4">
              {variantComparison.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and performance intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note, index) => (
                <div
                  key={note.title}
                  className={index === 0 ? 'win95-panel win95-panel--raised' : 'win95-panel'}
                >
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Optimization playbook</legend>
            <div className="win95-grid win95-grid-3">
              {optimizationPlaybook.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick FAQ</legend>
            <div className="win95-stack">
              {miniFaq.map((item) => (
                <div key={item.question} className="win95-panel">
                  <div className="win95-heading">{item.question}</div>
                  <p className="win95-text">{item.answer}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {advancedInsights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
