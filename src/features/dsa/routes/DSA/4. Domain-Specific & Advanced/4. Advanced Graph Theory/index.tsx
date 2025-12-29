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
    title: 'Structure as leverage',
    detail: 'Advanced graph tools expose latent structure (cuts, matchings, treewidth) so problems shrink to simpler primitives.',
  },
  {
    title: 'Duality gives certificates',
    detail: 'Cuts certify flows, covers certify matchings, Laplacians certify connectivity; guarantees matter when stakes are high.',
  },
  {
    title: 'Scale through decomposition',
    detail: 'Break dense graphs into SCC DAGs, bridges, or heavy paths so thousands to millions of queries stay near-linear or log-time.',
  },
]

const history = [
  {
    title: '1736: Euler and the bridges of Konigsberg',
    detail: 'Sparked graph theory by formalizing traversal constraints and parity of degrees.',
  },
  {
    title: '1847: Kirchhoff matrix-tree theorem',
    detail: 'Connected Laplacians to spanning trees, grounding spectral and electrical analogies.',
  },
  {
    title: '1931: Konig and bipartite min-cover = max-matching',
    detail: 'Showed a clean duality that still powers assignment and resource allocation.',
  },
  {
    title: '1972-1973: Tarjan SCCs, Hopcroft-Karp matching',
    detail: 'Linear-time condensation and O(E sqrt V) matching made connectivity and pairing practical at scale.',
  },
]

const pillars = [
  {
    title: 'Connectivity lenses',
    detail: 'SCCs, bridges, and articulation points expose how information or failures propagate.',
  },
  {
    title: 'Optimization duals',
    detail: 'Flows vs cuts, matchings vs covers, potentials vs reduced costs; dual solutions certify optimality.',
  },
  {
    title: 'Decomposition-first thinking',
    detail: 'Condense, orient, and index before solving; preprocessing amortizes heavy work across many queries.',
  },
]

const mentalModels = [
  {
    title: 'Electrical networks',
    detail: 'Edges as resistors; effective resistance mirrors connectivity strength. Breaks when costs are asymmetric or directed.',
  },
  {
    title: 'Road closures and detours',
    detail: 'Bridges/articulation points are single-lane tunnels; one closure disconnects the city. Misleads if multiple parallel routes exist.',
  },
]

const howItWorks = [
  {
    step: '1. Choose the right representation',
    detail: 'Directed vs undirected, weighted vs unweighted; index edges for quick residual or low-link updates.',
  },
  {
    step: '2. Decompose early',
    detail: 'Run SCCs, bridge/articulation search, or tree decomposition to simplify the topology before heavy computation.',
  },
  {
    step: '3. Apply the dual view',
    detail: 'For throughput, inspect cuts; for pairing, inspect covers; for clustering, inspect Laplacian spectra.',
  },
  {
    step: '4. Maintain invariants',
    detail: 'Non-negative reduced costs, monotone heights, low-link <= discovery time; assert in debug builds.',
  },
  {
    step: '5. Certify and extract results',
    detail: 'Return both primal (flow, matching, ordering) and certificates (min-cut, cover, condensation DAG) to prove correctness.',
  },
]

const complexityTable = [
  { approach: 'Hopcroft-Karp (bipartite matching)', time: 'O(E sqrt V)', space: 'O(V + E)', note: 'Layered BFS/DFS shrinks augmentations; strong for large sparse graphs.' },
  { approach: 'Dinic with scaling (max flow)', time: 'O(E V^2)', space: 'O(V + E)', note: 'Blocking flows per level; scaling trims iterations on big capacities.' },
  { approach: 'Tarjan SCC + bridges', time: 'O(V + E)', space: 'O(V + E)', note: 'Single DFS yields SCCs, articulation points, and bridges for resilience analysis.' },
  { approach: 'Spectral partition (Laplacian Fiedler vector)', time: 'O(V^3) naive / O(E log V) iterative', space: 'O(V + E)', note: 'Eigen-solvers dominate; iterative methods suit million-node sparse graphs.' },
]

const applications = [
  {
    title: 'Compiler and build pipelines',
    detail: 'Condense SCCs to order strongly dependent modules; prevents cyclic imports from stalling builds.',
  },
  {
    title: 'Ad auctions and ride-sharing matching',
    detail: 'Hopcroft-Karp or Hungarian assign bidders to slots or drivers to riders with fairness and capacity constraints.',
  },
  {
    title: 'CDN routing and cut planning',
    detail: 'Min-cuts reveal brittle edges between regions; informs where to add links before peak events.',
  },
  {
    title: 'Community detection and clustering',
    detail: 'Spectral cuts or modularity methods group users; used in fraud detection and recommendation pipelines.',
  },
]

const pitfalls = [
  'Treating directed graphs as undirected breaks SCC and cut reasoning; orientations matter.',
  'Ignoring parallel edges or multi-edges causes undercounted capacity and wrong bridge detection.',
  'Running matching without layered BFS wastes iterations; augmentations become quadratic.',
  'Large weights in Laplacians lead to numeric instability; scale or use iterative solvers with tolerances.',
]

const whenToUse = [
  'Need provable throughput or resilience: pick flow/cut duals and output the cut as a certificate.',
  'Pairing problems on bipartite data: Hopcroft-Karp for sparse, Hungarian for dense with costs.',
  'Heavy repeated queries on mostly static graphs: decompose once (SCCs, bridges, LCA) and reuse the summary.',
  'Cluster discovery on sparse graphs: spectral methods with iterative eigensolvers to stay memory-light.',
]

const advanced = [
  {
    title: 'Gap and global relabel in push-relabel',
    detail: 'Periodically recompute heights to accelerate convergence on dense flow networks.',
  },
  {
    title: 'Small-to-large DSU on tree',
    detail: 'Merge child frequency maps from small to large to answer subtree color/frequency queries in near-linear time.',
  },
  {
    title: 'Treewidth-driven DP',
    detail: 'Exploit low treewidth to solve NP-hard problems (coloring, CSP) in O(f(w) * n); practical for sparse real-world graphs.',
  },
  {
    title: 'Iterative Laplacian solvers',
    detail: 'Use conjugate gradient with preconditioning to approximate Fiedler vectors on million-edge graphs.',
  },
]

const codeExamples = [
  {
    title: 'Tarjan SCC with bridges and articulation points',
    code: `function dfs(u, parent):
    disc[u] = low[u] = timer++
    stack.push(u)
    childCount = 0
    for v in adj[u]:
        if disc[v] == -1:
            dfs(v, u)
            low[u] = min(low[u], low[v])
            if low[v] >= disc[u]: markArticulation(u)  // u splits components
            if low[v] > disc[u]: markBridge(u, v)      // removing (u,v) disconnects
            childCount += 1
        else if v != parent:
            low[u] = min(low[u], disc[v])  // back edge
    if low[u] == disc[u]: pop stack until u to form SCC`,
    explanation: 'Low-link values track earliest reachable ancestor; SCCs form when a root cannot reach higher nodes, and bridges are edges that only appear in tree paths.',
  },
  {
    title: 'Hopcroft-Karp layering and augmentation',
    code: `while bfsLayers():
    for u in U:
        if pairU[u] == NIL and dfsAugment(u):
            matching += 1

function bfsLayers():
    queue = []
    for u in U:
        if pairU[u] == NIL: dist[u] = 0; enqueue(u)
        else: dist[u] = INF
    dist[NIL] = INF
    while queue not empty:
        u = dequeue(queue)
        if dist[u] < dist[NIL]:
            for v in adj[u]:
                if dist[pairV[v]] == INF:
                    dist[pairV[v]] = dist[u] + 1
                    enqueue(pairV[v])
    return dist[NIL] != INF  // path to free vertex exists`,
    explanation: 'Layered BFS finds the shortest augmenting paths, and DFS only explores forward along layers, giving O(E sqrt V) total augmentations.',
  },
]

const keyTakeaways = [
  'Decompose first: SCCs, bridges, and heavy paths turn messy graphs into tractable summaries.',
  'Use duality to certify results; cuts, covers, and spectra prove optimality or resilience.',
  'Layered or height-based search cuts augmentations from quadratic to near-linear.',
  'Iterative spectral tools unlock clustering on million-edge sparse graphs without cubic cost.',
]

export default function AdvancedGraphTheoryPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Advanced Graph Theory</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Flows, duals, decompositions, and spectral lenses</div>
              <p className="win95-text">
                Tough network problems yield when you expose structure: condense cycles, separate cuts, layer augmentations, and let
                dual certificates prove you are optimal.
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
              <div className="win95-heading">Failure story: Fragile articulation point</div>
              <p className="win95-text">
                A large transit operator modeled its rail map as tree-like and missed a single articulation bridge feeding multiple lines. A
                routine maintenance closure partitioned the network and stranded riders; a bridge/articulation audit would have flagged the
                weak cut long before scheduling.
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
