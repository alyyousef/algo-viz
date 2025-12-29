import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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
                Floyd-Warshall is the canonical all-pairs shortest path algorithm for dense or medium-sized graphs. By considering
                intermediates one vertex at a time, it updates every pair in O(V^3) while gracefully handling negative edges and
                exposing negative cycles.
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
                Instead of running single-source searches V times, Floyd-Warshall builds a distance matrix that allows intermediates
                in layers. Each k-layer either keeps the old distance or routes through k if that is cheaper, converging to optimal
                all-pairs paths and flagging negative cycles on the diagonal.
              </p>
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
        </div>
      </div>
    </div>
  )
}
