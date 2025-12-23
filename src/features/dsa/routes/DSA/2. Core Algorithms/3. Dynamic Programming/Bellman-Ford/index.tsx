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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Bellman-Ford</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Shortest paths with negative weights</div>
              <p className="win95-text">
                Bellman-Ford relaxes every edge in rounds, allowing paths to gain at most one edge per round. It handles negative
                weights gracefully and signals negative cycles, making it the safer choice when Dijkstra&apos;s non-negative assumption
                is broken.
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
              </p>
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
        </div>
      </div>
    </div>
  )
}
