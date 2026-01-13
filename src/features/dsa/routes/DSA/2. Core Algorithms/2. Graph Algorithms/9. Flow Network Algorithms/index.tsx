import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'Constrained throughput modeling',
    detail: 'Captures networks where edges have capacity limits, preventing overload and ensuring realistic flow distribution.',
  },
  {
    title: 'Bottleneck identification',
    detail: 'Max-flow equals min-cut, revealing the tightest constraints without exhaustive enumeration.',
  },
  {
    title: 'Cancellation and reversibility',
    detail: 'Residual graphs allow flow adjustments, modeling real-world reversals like refunds or route changes.',
  },
]

const history = [
  {
    title: '1956: Ford-Fulkerson algorithm',
    detail: 'Lester Ford and Delbert Fulkerson introduced augmenting paths, revolutionizing network flow with a simple iterative method.',
  },
  {
    title: '1970: Dinic algorithm',
    detail: 'Yefim Dinic layered graphs for blocking flows, achieving O(V^2 E) time and inspiring modern optimizations.',
  },
  {
    title: '1972: Edmonds-Karp refinement',
    detail: 'Jack Edmonds and Richard Karp used BFS for shortest paths, guaranteeing polynomial time and preventing irrational loops.',
  },
  {
    title: '1985: Push-relabel preflow',
    detail: 'Andrew Goldberg introduced height-based pushing, offering practical speed on dense graphs with O(V^3) worst-case.',
  },
]

const pillars = [
  {
    title: 'Capacity constraints',
    detail: 'Flow on any edge cannot exceed its capacity; violations invalidate the model.',
  },
  {
    title: 'Flow conservation',
    detail: 'Except at source and sink, inflow equals outflow at every node.',
  },
  {
    title: 'Residual integrity',
    detail: 'Residual graph must reflect remaining capacity forward and cancellation potential backward.',
  },
]

const mentalModels = [
  {
    title: 'Pipes and reservoirs',
    detail: 'Edges as pipes with fixed diameters; nodes as junctions conserving volume. Breaks when modeling gains/losses.',
  },
  {
    title: 'Traffic highways',
    detail: 'Lanes with speed limits; residual shows open lanes forward and reversal opportunities. Fails on non-unit capacities.',
  },
]

const howItWorks = [
  {
    step: '1. Model as directed graph',
    detail: 'Assign capacities to edges; designate source and sink nodes.',
  },
  {
    step: '2. Initialize residuals',
    detail: 'Create residual graph with forward capacities and zero backward edges.',
  },
  {
    step: '3. Find augmenting paths',
    detail: 'Use BFS/DFS to locate s-t paths in residual graph.',
  },
  {
    step: '4. Augment flow',
    detail: 'Push minimum residual capacity along path; update forward (subtract) and backward (add).',
  },
  {
    step: '5. Repeat until no path',
    detail: 'Convergence when no augmenting path exists; flow is maximum.',
  },
]

const complexityTable = [
  { approach: 'Edmonds-Karp', time: 'O(VE^2)', space: 'O(V + E)', note: 'Reliable for sparse graphs; BFS ensures polynomial bound.' },
  { approach: 'Dinic', time: 'O(V^2 E)', space: 'O(V + E)', note: 'Faster on unit networks; blocking flows reduce phases.' },
  { approach: 'Push-relabel', time: 'O(V^3)', space: 'O(V + E)', note: 'Practical for dense graphs; heuristics improve convergence.' },
]

const applications = [
  {
    title: 'Network routing',
    detail: 'Maximize bandwidth between servers; used in Cisco routers for traffic engineering.',
  },
  {
    title: 'Bipartite matching',
    detail: 'Find maximum job assignments; powers dating apps like Tinder for optimal pairings.',
  },
  {
    title: 'Image segmentation',
    detail: 'Separate foreground/background in photos; core to Adobe Photoshop cutout tools.',
  },
  {
    title: 'Supply chain logistics',
    detail: 'Optimize goods flow in warehouses; Amazon uses variants for inventory routing.',
  },
]

const pitfalls = [
  'Ignoring reverse edges in residuals leads to incorrect flow cancellation and breaks correctness.',
  'Using floating-point capacities risks non-termination; stick to integers.',
  'Forgetting to update both directions during augmentation breaks conservation.',
  'Scaling issues with large capacities; use 64-bit integers or modular arithmetic.',
]

const whenToUse = [
  'Sparse graphs with moderate size: Edmonds-Karp for simplicity.',
  'Unit-capacity networks: Dinic excels with O(min(V^{2/3}, E^{1/2}) E) performance.',
  'Dense or large graphs: Push-relabel with global relabeling for speed.',
  'Need min-cut certificate: Any max-flow algorithm suffices.',
]

const advanced = [
  {
    title: 'Capacity scaling',
    detail: 'Augment only large capacities first; reduces iterations but adds overhead.',
  },
  {
    title: 'Stochastic optimization',
    detail: 'Randomize path selection; trades determinism for average-case speed.',
  },
  {
    title: 'Parallel variants',
    detail: 'Distribute augmentations across cores; scales to massive networks like internet routing.',
  },
]

const codeExamples = [
  {
    title: 'Edmonds-Karp implementation',
    code: `function edmondsKarp(capacity, source, sink):
    residual = copy(capacity)  // Initialize residual with capacities
    flow = 0
    while true:
        parent = bfs(residual, source, sink)  // Find shortest path
        if parent[sink] == -1: break
        pathFlow = infinity
        v = sink
        while v != source:
            u = parent[v]
            pathFlow = min(pathFlow, residual[u][v])
            v = u
        v = sink
        while v != source:
            u = parent[v]
            residual[u][v] -= pathFlow  // Update forward
            residual[v][u] += pathFlow  // Update backward
            v = u
        flow += pathFlow
    return flow`,
    explanation: 'BFS ensures each path is shortest, bounding augmentations to O(VE) for termination guarantee.',
  },
  {
    title: 'Dinic level graph construction',
    code: `function buildLevelGraph(residual, source, sink):
    level = array of -1 sized V
    level[source] = 0
    queue = [source]
    while queue not empty:
        u = dequeue(queue)
        for v in neighbors of u:
            if level[v] == -1 and residual[u][v] > 0:
                level[v] = level[u] + 1
                enqueue(queue, v)
    return level[sink] != -1  // True if path exists`,
    explanation: 'Levels prevent backward edges, ensuring DFS blocking flows respect monotonic increases.',
  },
]

const keyTakeaways = [
  'Max-flow models constrained movement; residual graphs enable reversals.',
  'Augmenting paths vs. preflows trade simplicity for dense-graph speed.',
  'Always maintain bidirectional residuals for correctness.',
  'Polynomial algorithms scale to thousands; heuristics handle millions.',
]

export default function FlowNetworkAlgorithms(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Flow Network Algorithms</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Maximizing throughput in constrained systems</div>
              <p className="win95-text">
                Flow networks model real-world constraints like bandwidth or traffic. Max-flow algorithms push limits while
                min-cut certifies optimality, with residuals allowing reversals and cancellations.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Big picture</legend>
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
            <legend>History</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental hooks</legend>
            <div className="win95-row">
              <div className="win95-panel">
                <div className="win95-subheading">Pillars</div>
                <div className="win95-stack">
                  {pillars.map((item) => (
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
            <legend>Complexity table</legend>
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
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">Failure story: Network overload</div>
              <p className="win95-text">
                In 2016, a major ISP ignored flow constraints in routing, causing cascading failures during peak traffic.
                Max-flow modeling could have prevented the outage by identifying bottlenecks early.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced</legend>
            <div className="win95-grid win95-grid-3">
              {advanced.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Code examples</legend>
            <div className="win95-stack">
              {codeExamples.map((example) => (
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
            <legend>Key takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item} className="win95-panel">
                  <p className="win95-text">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

