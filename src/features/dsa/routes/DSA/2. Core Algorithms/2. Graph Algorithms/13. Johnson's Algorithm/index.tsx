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
    title: 'All-pairs on sparse graphs',
    detail:
      'Johnson runs one Bellman-Ford plus V Dijkstra passes, beating Floyd-Warshall when edges are far fewer than V^2.',
  },
  {
    title: 'Negative edges, no negative cycles',
    detail:
      'It tolerates negative weights by reweighting them to nonnegative values while preserving shortest paths.',
  },
  {
    title: 'Reusable single-source core',
    detail:
      'After reweighting, you can plug in any fast Dijkstra implementation and reuse it for every source.',
  },
]

const historicalMilestones = [
  {
    title: '1958: Bellman-Ford handles negatives',
    detail:
      'Dynamic relaxation across edges lets single-source shortest paths work even with negative weights.',
  },
  {
    title: '1959: Dijkstra unlocks speed',
    detail:
      'Greedy selection yields fast shortest paths when all edge weights are nonnegative.',
  },
  {
    title: '1962: Floyd-Warshall for all pairs',
    detail:
      'A clean O(V^3) dynamic program solved APSP but struggled with large sparse graphs.',
  },
  {
    title: '1977: Johnson merges the best of both',
    detail:
      'Reweighting + Dijkstra enables APSP on sparse graphs with negative edges, avoiding cubic time.',
  },
]

const coreConcepts = [
  {
    title: 'Potential function h(v)',
    detail:
      'Bellman-Ford on a super-source computes potentials h(v) used to shift edge weights without changing shortest paths.',
  },
  {
    title: 'Edge reweighting',
    detail:
      "Each edge (u, v) becomes w'(u, v) = w(u, v) + h(u) - h(v). This guarantees nonnegative weights.",
  },
  {
    title: 'Distance recovery',
    detail:
      "Run Dijkstra on the reweighted graph to get d'. Convert back: d(u, v) = d'(u, v) - h(u) + h(v).",
  },
  {
    title: 'Negative cycle detection',
    detail:
      'If Bellman-Ford finds a negative cycle, no finite shortest paths exist and Johnson must stop.',
  },
]

const mentalModels = [
  {
    title: 'Terrain leveling',
    detail:
      'Potentials act like raising or lowering the ground so every downhill edge disappears, yet relative path lengths stay the same.',
  },
  {
    title: 'Tax and rebate',
    detail:
      'Add a tax h(u) when leaving u and rebate h(v) when arriving at v. Total path cost is unchanged.',
  },
]

const pipelineSteps = [
  {
    step: '1. Add a super-source',
    detail: 'Connect a new node s* to every vertex with edge weight 0.',
  },
  {
    step: '2. Run Bellman-Ford',
    detail: 'Compute h(v) shortest distances from s*. Detect any negative cycle.',
  },
  {
    step: '3. Reweight edges',
    detail: "Shift every edge using w'(u, v) = w(u, v) + h(u) - h(v).",
  },
  {
    step: '4. Run Dijkstra per source',
    detail: 'Use Dijkstra from every vertex on the nonnegative reweighted graph.',
  },
  {
    step: '5. Recover original distances',
    detail: "Convert d' back to true distances using d(u, v) = d'(u, v) - h(u) + h(v).",
  },
]

const reweightingDetails = [
  {
    title: 'Why weights become nonnegative',
    detail:
      "Because h(v) is a shortest distance from s*, Bellman-Ford guarantees h(v) <= h(u) + w(u, v). Rearranging gives w'(u, v) >= 0.",
  },
  {
    title: 'Why paths are preserved',
    detail:
      'Every path cost shifts by h(source) - h(target), so the relative ordering of paths between the same endpoints is unchanged.',
  },
  {
    title: 'What breaks the algorithm',
    detail:
      'A negative cycle means distances are not well-defined. Bellman-Ford detects this before any Dijkstra runs.',
  },
  {
    title: 'Directed and undirected graphs',
    detail:
      'Johnson works for directed graphs. For undirected graphs with negative edges, a negative cycle exists immediately.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Bellman-Ford is O(VE). Dijkstra repeated V times is O(VE log V) with a binary heap.',
  },
  {
    title: 'Space complexity',
    detail:
      'Store the graph plus distance table: O(V + E) for adjacency lists and O(V^2) for all-pairs results.',
  },
  {
    title: 'When it wins',
    detail:
      'Sparse graphs (E near V) make Johnson faster than Floyd-Warshall. Dense graphs favor O(V^3).',
  },
  {
    title: 'Priority queue choice',
    detail:
      'Fibonacci heaps reduce Dijkstra to O(E + V log V) but are complex; binary heaps win in practice.',
  },
]

const complexityTable = [
  {
    approach: 'Johnson (Bellman-Ford + Dijkstra)',
    time: 'O(VE log V)',
    space: 'O(V^2 + E)',
    note: 'Best for sparse graphs with possible negative edges.',
  },
  {
    approach: 'Floyd-Warshall',
    time: 'O(V^3)',
    space: 'O(V^2)',
    note: 'Simple and cache friendly on dense graphs.',
  },
  {
    approach: 'Repeated Dijkstra (no negatives)',
    time: 'O(VE log V)',
    space: 'O(V^2 + E)',
    note: 'Same as Johnson without the reweighting step.',
  },
]

const realWorldUses = [
  {
    context: 'Routing with penalties',
    detail:
      'Model tolls or discounts as negative edges, but avoid negative cycles so shortest paths remain meaningful.',
  },
  {
    context: 'Graph analytics pipelines',
    detail:
      'Precompute all-pairs distances for recommendations or clustering on sparse, directed graphs.',
  },
  {
    context: 'Timetable networks',
    detail:
      'Transfers with credits (negative edges) can be handled safely while still finding cheapest routes.',
  },
  {
    context: 'Constraint graphs',
    detail:
      'Difference constraints reduce to shortest paths; Johnson enables fast multi-source queries after reweighting.',
  },
]

const examples = [
  {
    title: "Johnson's algorithm (high level)",
    code: `function johnson(graph):
    add superSource s* with 0 edges to all vertices
    h = bellmanFord(graph + s*, s*)
    if h has negative cycle: error
    for each edge (u, v):
        w'(u, v) = w(u, v) + h[u] - h[v]
    for each vertex s:
        d' = dijkstra(graph', s)
        for each vertex v:
            d[s][v] = d'[v] - h[s] + h[v]
    return d`,
    explanation:
      'The potentials h remove all negative edges. Dijkstra then runs safely for each source and distances are shifted back.',
  },
  {
    title: 'Bellman-Ford to compute potentials',
    code: `function bellmanFord(graph, source):
    dist = array(V, +infinity)
    dist[source] = 0
    repeat V - 1 times:
        for each edge (u, v, w):
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    for each edge (u, v, w):
        if dist[u] + w < dist[v]:
            return NEGATIVE_CYCLE
    return dist`,
    explanation:
      'A final relaxation pass detects negative cycles. These make shortest paths undefined.',
  },
  {
    title: 'Reweighting and recovery',
    code: `// After computing h
for each edge (u, v, w):
    wPrime = w + h[u] - h[v]  // nonnegative

// After Dijkstra from source s
for each vertex v:
    originalDist = distPrime[v] - h[s] + h[v]`,
    explanation:
      'Reweighting preserves path ordering, and the recovery formula restores true distances.',
  },
]

const pitfalls = [
  'Skipping the negative cycle check. If a negative cycle exists, Johnson must terminate immediately.',
  'Using Dijkstra on the original graph. It only works after reweighting produces nonnegative edges.',
  'Forgetting to add the super-source with zero edges, leading to incorrect potentials for disconnected vertices.',
  'Mixing adjacency matrix and list assumptions; Johnson is tuned for sparse adjacency lists.',
  'Storing all-pairs results for huge graphs without a memory plan; O(V^2) can dominate.',
]

const decisionGuidance = [
  'Need all-pairs shortest paths on sparse graphs with some negative edges: choose Johnson.',
  'Need all-pairs on dense graphs: Floyd-Warshall is simpler and often faster in practice.',
  'Need only one or few sources: run Bellman-Ford (if negatives) or Dijkstra (if nonnegative).',
  'Need repeated queries after a fixed graph: precompute Johnson once and reuse the distance table.',
  'Need to detect negative cycles: Bellman-Ford already gives the answer, no need for Johnson.',
]

const advancedInsights = [
  {
    title: 'Potential reuse',
    detail:
      'If the graph changes slightly, incremental updates to h can sometimes avoid rerunning full Bellman-Ford.',
  },
  {
    title: 'Sparse priority queues',
    detail:
      'Pairing heaps or radix heaps can be faster than binary heaps when edge weights are small integers.',
  },
  {
    title: 'Hybrid APSP strategies',
    detail:
      'Some systems run Johnson for sparse regions and Floyd-Warshall for dense subgraphs to balance time and memory.',
  },
  {
    title: 'Matrix output compression',
    detail:
      'When only a subset of sources is queried, store rows lazily to avoid allocating the full V^2 table.',
  },
]

const takeaways = [
  'Johnson turns negative edges into nonnegative ones without changing shortest paths.',
  'A single Bellman-Ford pass plus V Dijkstra runs delivers fast all-pairs results on sparse graphs.',
  'Negative cycles stop everything; detect them early and report clearly.',
  'Performance depends on priority queues and graph sparsity more than on the reweighting math.',
]

export default function JohnsonSAlgorithmPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Johnson's Algorithm</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">
                All-pairs shortest paths on sparse graphs, even with negative edges
              </div>
              <p className="win95-text">
                Johnson's Algorithm blends Bellman-Ford and Dijkstra to solve all-pairs shortest paths efficiently on sparse graphs.
                It uses a potential function to reweight edges so every Dijkstra run is safe, then shifts distances back to the original
                weights. The result is a practical APSP method that stays fast without giving up correctness on negative edges.
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
            <legend>How it works: Johnson pipeline</legend>
            <div className="win95-grid win95-grid-3">
              {pipelineSteps.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: reweighting details</legend>
            <div className="win95-grid win95-grid-2">
              {reweightingDetails.map((item) => (
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
                Johnson's advantage grows as the graph gets sparser. If E is close to V^2, the overhead of running Dijkstra V times
                can outweigh Floyd-Warshall's simplicity.
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
