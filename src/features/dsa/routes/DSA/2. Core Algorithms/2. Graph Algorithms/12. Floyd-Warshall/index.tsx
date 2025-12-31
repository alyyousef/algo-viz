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

const bigPicture = [
  {
    title: 'All-pairs shortest paths',
    detail:
      'Floyd-Warshall computes the shortest distance between every pair of vertices in one unified dynamic program.',
  },
  {
    title: 'Dense graph friendly',
    detail:
      'Runs in O(V^3), making it practical when E is close to V^2 or when V is small to medium.',
  },
  {
    title: 'Negative edges allowed',
    detail:
      'Works with negative weights, but fails if any negative cycle exists. It can detect those cycles.',
  },
]

const historicalMilestones = [
  {
    title: '1956: Roy defines transitive closure',
    detail:
      'Bernard Roy described a dynamic programming approach for reachability that foreshadowed Floyd-Warshall.',
  },
  {
    title: '1959: Warshall formalizes the DP',
    detail:
      'Stephen Warshall presented a clean recursion for path closure, setting the stage for shortest paths.',
  },
  {
    title: '1962: Floyd adds weights',
    detail:
      'Robert Floyd extended the method to weighted shortest paths, yielding the algorithm used today.',
  },
  {
    title: 'Modern era: matrix-friendly APSP',
    detail:
      'Floyd-Warshall remains a go-to for dense graphs and for GPU or SIMD-accelerated variants.',
  },
]

const coreConcepts = [
  {
    title: 'Intermediate set DP',
    detail:
      'Define dist[k][i][j] as the shortest path from i to j using only intermediate vertices 1..k.',
  },
  {
    title: 'Relaxation via a middle vertex',
    detail:
      'At step k, decide whether going through k improves the path: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).',
  },
  {
    title: 'Matrix viewpoint',
    detail:
      'The algorithm is a triple nested loop over k, i, j; it is essentially min-plus matrix closure.',
  },
  {
    title: 'Negative cycle detection',
    detail:
      'If any dist[v][v] becomes negative after processing, a negative cycle is present.',
  },
]

const mentalModels = [
  {
    title: 'Checkpoint routing',
    detail:
      'Each iteration adds one more allowed checkpoint. Paths can only use checkpoints up to k.',
  },
  {
    title: 'Spreadsheet minimizer',
    detail:
      'You repeatedly update a distance table by checking whether a new column-and-row pair improves any cell.',
  },
]

const howItWorks = [
  {
    step: '1. Initialize distance matrix',
    detail:
      'Set dist[i][j] to edge weight, 0 on diagonal, and Infinity if no edge exists.',
  },
  {
    step: '2. Iterate over intermediates',
    detail:
      'For each k, allow k as an intermediate and update all i, j pairs.',
  },
  {
    step: '3. Relax all pairs',
    detail:
      'If dist[i][k] + dist[k][j] beats dist[i][j], replace it.',
  },
  {
    step: '4. Detect negative cycles',
    detail:
      'After the loop, if any dist[v][v] < 0, shortest paths are undefined.',
  },
  {
    step: '5. Optional path reconstruction',
    detail:
      'Maintain a next matrix to rebuild actual paths, not just distances.',
  },
]

const matrixInsights = [
  {
    title: 'Infinity handling',
    detail:
      'Represent missing edges with a large sentinel and guard against overflow when adding dist[i][k] + dist[k][j].',
  },
  {
    title: 'Path reconstruction',
    detail:
      'Use next[i][j] to store the first hop from i to j. Update it when a shorter path is found.',
  },
  {
    title: 'Boolean variant',
    detail:
      'Replacing min-plus with logical OR/AND gives Warshall transitive closure for reachability.',
  },
  {
    title: 'In-place safety',
    detail:
      'You can update dist in place because the recurrence for k only depends on previous k values.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'O(V^3) operations. Performance depends on cache locality and tight loops.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(V^2) memory for the distance matrix, plus optional O(V^2) for next matrix.',
  },
  {
    title: 'When it wins',
    detail:
      'Small-to-medium dense graphs or when you need a complete distance matrix quickly.',
  },
  {
    title: 'When it loses',
    detail:
      'Large sparse graphs. Johnson or repeated Dijkstra usually wins for E near V.',
  },
]

const complexityTable = [
  {
    approach: 'Floyd-Warshall',
    time: 'O(V^3)',
    space: 'O(V^2)',
    note: 'Simple APSP with negative edges, great for dense graphs.',
  },
  {
    approach: 'Johnson',
    time: 'O(VE log V)',
    space: 'O(V^2 + E)',
    note: 'Best for sparse graphs with negative edges.',
  },
  {
    approach: 'Repeated Dijkstra',
    time: 'O(VE log V)',
    space: 'O(V^2 + E)',
    note: 'Only works with nonnegative weights.',
  },
]

const realWorldUses = [
  {
    context: 'Routing tables',
    detail:
      'Precompute shortest distances between every pair of routers in dense network cores.',
  },
  {
    context: 'Urban transit grids',
    detail:
      'Small city networks with many transfers benefit from all-pairs distance matrices.',
  },
  {
    context: 'Compiler optimization',
    detail:
      'Data-flow analysis uses transitive closure variants to compute reachability and dominance.',
  },
  {
    context: 'Game AI navigation',
    detail:
      'Static maps with small node counts can precompute all-pairs paths for instant lookup.',
  },
]

const examples = [
  {
    title: 'Floyd-Warshall core loop',
    code: `function floydWarshall(dist):
    n = number of vertices
    for k in 0..n-1:
        for i in 0..n-1:
            for j in 0..n-1:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist`,
    explanation:
      'The triple loop is the entire algorithm. Start with direct edges; each k adds a new allowed waypoint.',
  },
  {
    title: 'Initialization with Infinity',
    code: `function initMatrix(graph):
    n = number of vertices
    dist = matrix(n, n, +infinity)
    for v in 0..n-1:
        dist[v][v] = 0
    for each edge (u, v, w):
        dist[u][v] = min(dist[u][v], w)
    return dist`,
    explanation:
      'Use Infinity for missing edges. Multiple edges keep the minimum weight.',
  },
  {
    title: 'Path reconstruction',
    code: `function buildNext(dist, graph):
    next = matrix(n, n, null)
    for each edge (u, v, w):
        if w < dist[u][v]:
            dist[u][v] = w
            next[u][v] = v
    for k in 0..n-1:
        for i in 0..n-1:
            for j in 0..n-1:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next[i][j] = next[i][k]
    return next`,
    explanation:
      'The next matrix stores the first hop. If next[i][j] is null, no path exists.',
  },
]

const pitfalls = [
  'Forgetting to guard Infinity + Infinity, which can overflow and corrupt updates.',
  'Not checking dist[v][v] after the loop, missing negative cycles.',
  'Assuming the graph is sparse; O(V^3) becomes expensive quickly.',
  'Failing to initialize dist[i][i] = 0 causes incorrect paths.',
  'Storing large weights in 32-bit integers when sums may exceed the range.',
]

const decisionGuidance = [
  'Need all-pairs shortest paths on a dense graph: use Floyd-Warshall.',
  'Need all-pairs on a sparse graph: prefer Johnson or repeated Dijkstra.',
  'Need only reachability (not distances): use Warshall transitive closure.',
  'Need to detect negative cycles: Floyd-Warshall exposes them via dist[v][v] < 0.',
  'Need fast online queries on a fixed small graph: precompute once with Floyd-Warshall.',
]

const advancedInsights = [
  {
    title: 'Min-plus matrix multiplication',
    detail:
      'Floyd-Warshall is a closure under min-plus algebra, connecting it to matrix methods and GPU acceleration.',
  },
  {
    title: 'Bitset optimization',
    detail:
      'For transitive closure, bitsets can speed up the boolean variant with word-level parallelism.',
  },
  {
    title: 'Path counting',
    detail:
      'You can augment the DP to count shortest paths by tracking equal-distance alternatives.',
  },
  {
    title: 'Sparse tiling',
    detail:
      'Block the matrix to improve cache locality; this can deliver large speedups on modern CPUs.',
  },
]

const takeaways = [
  'Floyd-Warshall is the simplest APSP algorithm: a clean DP over intermediate vertices.',
  'It handles negative edges but fails with negative cycles, which it can detect.',
  'Best for dense graphs or when you want a full distance matrix for repeated queries.',
  'Path reconstruction is easy with a next-hop matrix, not just distances.',
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
              <div className="win95-subheading">
                A dynamic program for all-pairs shortest paths on dense graphs
              </div>
              <p className="win95-text">
                Floyd-Warshall computes shortest paths between every pair of vertices by gradually allowing more intermediate nodes.
                It is compact, reliable, and easy to implement. With O(V^3) time and O(V^2) space, it shines on dense graphs and small
                networks where a full distance matrix unlocks instant queries.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-row">
              <div className="win95-panel">
                <div className="win95-subheading">Core concepts</div>
                <div className="win95-stack">
                  {coreConcepts.map((item) => (
                    <div key={item.title} className="win95-panel">
                      <div className="win95-heading">{item.title}</div>
                      <p className="win95-text">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="win95-panel">
                <div className="win95-subheading">Mental models</div>
                <div className="win95-stack">
                  {mentalModels.map((item) => (
                    <div key={item.title} className="win95-panel">
                      <div className="win95-heading">{item.title}</div>
                      <p className="win95-text">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {howItWorks.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Matrix mechanics</legend>
            <div className="win95-grid win95-grid-2">
              {matrixInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Floyd-Warshall is the APSP workhorse when the graph is dense or the vertex count is small enough to fit a full V^2
                distance table in memory.
              </p>
            </div>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Approach</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {complexityTable.map((row) => (
                    <tr key={row.approach}>
                      <td>{row.approach}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
