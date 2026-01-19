import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Edge budget DP',
    detail:
      'After k rounds, you have the shortest paths that use at most k edges.',
  },
  {
    title: 'Wave of relaxations',
    detail:
      'Each pass pushes improved distances across all edges like a global wave.',
  },
  {
    title: 'Negative cycle alarm',
    detail:
      'If a distance improves on the V-th pass, costs can drop forever.',
  },
]

const keyDefinitions = [
  {
    heading: 'Relaxation',
    bullets: [
      'Try to improve dist[v] using edge (u, v, w).',
      'If dist[u] + w < dist[v], update dist and parent.',
      'Repeated relaxations converge to shortest paths.',
    ],
  },
  {
    heading: 'Negative cycle',
    bullets: [
      'A directed cycle whose total weight is negative.',
      'Shortest paths are undefined if reachable from source.',
      'Bellman-Ford detects this after V - 1 rounds.',
    ],
  },
  {
    heading: 'Difference constraints',
    bullets: [
      'Inequalities like x_v - x_u <= w(u,v).',
      'Convert constraints to edges and run Bellman-Ford.',
      'Negative cycles indicate inconsistent constraints.',
    ],
  },
  {
    heading: 'Super-source',
    bullets: [
      'Add a node s* connected to all nodes with 0-weight edges.',
      'Enables multi-source shortest paths or constraint systems.',
      'Used in Johnson and feasibility checks.',
    ],
  },
]


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

const workflowSteps = [
  {
    title: 'Model the graph',
    detail:
      'Use a directed edge list (u, v, w). For undirected edges, add both directions.',
  },
  {
    title: 'Initialize distances',
    detail:
      'Set dist[source] = 0 and dist[others] = INF, with parents unset.',
  },
  {
    title: 'Run V - 1 relaxations',
    detail:
      'Iterate over edges, updating distances. Optionally stop early if no change.',
  },
  {
    title: 'Detect negative cycles',
    detail:
      'Run one more pass; any improvement indicates a reachable negative cycle.',
  },
  {
    title: 'Reconstruct paths',
    detail:
      'Use parent pointers to recover shortest paths or extract a negative cycle.',
  },
]

const variantCatalog = [
  {
    title: 'Bellman-Ford + early stop',
    detail:
      'Break when a pass makes no updates. Same correctness, often faster.',
  },
  {
    title: 'SPFA (queue-based)',
    detail:
      'Relax only vertices whose distance changed; fast on many inputs, same worst-case.',
  },
  {
    title: 'Multi-source Bellman-Ford',
    detail:
      'Add a super-source with 0 edges to all nodes to handle multiple sources.',
  },
  {
    title: 'Johnson reweighting',
    detail:
      'Run Bellman-Ford once to compute potentials and remove negative edges.',
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
    context: 'Difference constraints',
    detail:
      'Scheduling with inequalities can be solved by converting constraints to edges and running Bellman-Ford.',
  },
  {
    context: 'Graph algorithms with reweighting',
    detail:
      'Johnson uses Bellman-Ford to compute vertex potentials that eliminate negative edges, enabling Dijkstra on all-pairs queries.',
  },
  {
    context: 'Risk-aware planning',
    detail:
      'Negative edges can represent discounts or rebates in cost models.',
  },
  {
    context: 'Network policy checks',
    detail:
      'Detect inconsistent routing metrics or policy loops with negative cycles.',
  },
]

const correctnessSketch = [
  {
    title: 'DP invariant',
    detail:
      'After k passes, dist[v] is the shortest path using at most k edges.',
  },
  {
    title: 'Why V - 1 passes',
    detail:
      'Any simple shortest path has at most V - 1 edges.',
  },
  {
    title: 'Negative cycle test',
    detail:
      'If any edge still relaxes, a path with more than V - 1 edges is cheaper, implying a reachable negative cycle.',
  },
  {
    title: 'Parent pointers',
    detail:
      'Each update preserves a valid shortest path tree over the processed edge budget.',
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
  {
    title: 'Negative cycle recovery',
    code: `for (u, v, w) in edges:
    if dist[u] + w < dist[v]:
        x = v
        repeat V times: x = parent[x]
        cycle = []
        cur = x
        repeat:
            cycle.append(cur)
            cur = parent[cur]
        until cur == x`,
    explanation:
      'Walk parent pointers V steps to land inside the cycle, then traverse until it repeats.',
  },
  {
    title: 'Difference constraints',
    code: `Constraints: x_v - x_u <= w
Add edge u -> v with weight w
Add super-source s* with 0 edges to all nodes
Run Bellman-Ford from s*`,
    explanation:
      'If a negative cycle exists, the constraints are inconsistent.',
  },
  {
    title: 'Early stop optimization',
    code: `for i in 1..V-1:
    changed = false
    for (u, v, w) in edges:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w
            changed = true
    if not changed: break`,
    explanation:
      'Stop when a full pass makes no improvements.',
  },
]

const pitfalls = [
  'Skipping the final detection pass can silently miss negative cycles.',
  'Using Bellman-Ford when all edges are non-negative is slower than necessary; prefer Dijkstra.',
  'Overflow on large negative sums can flip comparisons; use wide integers.',
  'Forgetting to initialize distances to infinity except the source breaks correctness.',
  'Mixing undirected edges without adding both directions explicitly.',
  'Failing to guard against INF + w overflow during relaxations.',
  'Assuming negative cycles matter if they are not reachable from the source.',
]

const implementationChecklist = [
  'Represent edges as a flat list for fast iteration.',
  'Use a large INF sentinel and guard additions to avoid overflow.',
  'Track parents when you need path or cycle reconstruction.',
  'Stop early when no updates occur to save time.',
  'Run a final pass to detect reachable negative cycles.',
]

const testingChecklist = [
  'Single node, no edges.',
  'Graph with a negative edge but no negative cycles.',
  'Graph with a reachable negative cycle.',
  'Graph with a negative cycle not reachable from the source.',
  'Disconnected graph with unreachable nodes.',
  'Large weights to verify overflow handling.',
]

const decisionGuidance = [
  'Edges can be negative: use Bellman-Ford (single-source).',
  'Many sources on a sparse graph with some negatives: run Bellman-Ford from a super-source (Johnson) then Dijkstra per source.',
  'All edges non-negative: prefer Dijkstra for speed.',
  'Need only to detect negative cycles: run V - 1 relaxations, then test once more and record improving edges.',
  'Need constraint feasibility: model as difference constraints and run Bellman-Ford from a super-source.',
]

export default function BellmanFordPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Bellman-Ford</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Shortest paths with negative weights</div>
              <p className="win95-text">
                Bellman-Ford relaxes every edge in rounds, allowing paths to gain at most one edge per round. It handles negative
                weights gracefully and signals negative cycles, making it the safer choice when Dijkstra&apos;s non-negative assumption
                is broken. It also powers constraint systems, distance-vector routing, and Johnson reweighting.
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
                This algorithm trades speed for generality: O(VE) time, O(V) space, but it works whenever edges may be negative. Its
                synchronous relaxation rounds map well to distributed updates and give a built-in mechanism to flag negative cycles.
                The DP view makes correctness intuitive: each pass extends shortest paths by one edge.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Definitions that matter</legend>
            <div className="win95-grid win95-grid-2">
              {keyDefinitions.map((block) => (
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
            <legend>End-to-end workflow</legend>
            <div className="win95-grid win95-grid-2">
              {workflowSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variant catalog</legend>
            <div className="win95-grid win95-grid-2">
              {variantCatalog.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Practical example</legend>
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
            <legend>Why it is correct (sketch)</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessSketch.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Implementation checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {implementationChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Testing and edge cases</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {testingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
        </div>
      </div>
    </div>
  )
}

