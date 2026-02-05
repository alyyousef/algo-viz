import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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

const graphFamilies = [
  {
    title: 'Directed vs undirected',
    detail: 'Directionality changes reachability, cuts, and cycles; treat SCCs and dominators as first-class in directed graphs.',
  },
  {
    title: 'Weighted, capacitated, multi-edges',
    detail: 'Weights affect shortest paths and Laplacians; multi-edges change bridge logic and capacity aggregation.',
  },
  {
    title: 'Special families',
    detail: 'Planar graphs, bipartite graphs, and low-treewidth graphs unlock faster or exact algorithms.',
  },
  {
    title: 'Dynamic graphs',
    detail: 'Edges are added/removed continuously; maintain summaries incrementally instead of recomputing from scratch.',
  },
]

const representationChecklist = [
  'Normalize edge direction and ensure each edge has a stable id for updates and certificates.',
  'Store reverse edge indices for flow residuals and for quick undo of augmentations.',
  'Track discovery time, low-link, and parent for DFS-based connectivity proofs.',
  'Separate node weights, edge weights, and capacities to avoid accidental mixing.',
  'Keep adjacency as arrays for iteration and hash maps only for fast deletes.',
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

const algorithmMap = [
  {
    goal: 'Reachability, cycles, condensation',
    primary: 'Tarjan/Kosaraju SCC',
    output: 'Condensation DAG, topological order',
    note: 'Compress strongly connected components before any global optimization.',
  },
  {
    goal: 'Resilience and failure analysis',
    primary: 'Bridges, articulation points, dominators',
    output: 'Bridge tree or dominator tree',
    note: 'Find single points of failure and minimal cut vertices/edges.',
  },
  {
    goal: 'Throughput and capacity',
    primary: 'Dinic / Push-relabel / Edmonds-Karp',
    output: 'Max flow + min cut',
    note: 'Cuts certify optimality; choose algorithm by density and capacity scale.',
  },
  {
    goal: 'Pairing and assignment',
    primary: 'Hopcroft-Karp / Hungarian',
    output: 'Maximum matching + min vertex cover',
    note: 'Bipartite structure gives strong duals and integrality.',
  },
  {
    goal: 'Shortest paths with constraints',
    primary: 'Dijkstra / Bellman-Ford / Johnson',
    output: 'Distance potentials',
    note: 'Potentials reweight edges to keep non-negative reduced costs.',
  },
  {
    goal: 'Clustering and cuts',
    primary: 'Spectral partition, Stoer-Wagner',
    output: 'Balanced cut or min cut',
    note: 'Spectral methods need numerical care for large sparse graphs.',
  },
  {
    goal: 'Structure-driven NP-hardness',
    primary: 'Treewidth DP / Branch and bound',
    output: 'Exact solutions on sparse graphs',
    note: 'Exploit bounded treewidth to keep exponential factor small.',
  },
]

const complexityTable = [
  { approach: 'Hopcroft-Karp (bipartite matching)', time: 'O(E sqrt V)', space: 'O(V + E)', note: 'Layered BFS/DFS shrinks augmentations; strong for large sparse graphs.' },
  { approach: 'Dinic with scaling (max flow)', time: 'O(E V^2)', space: 'O(V + E)', note: 'Blocking flows per level; scaling trims iterations on big capacities.' },
  { approach: 'Tarjan SCC + bridges', time: 'O(V + E)', space: 'O(V + E)', note: 'Single DFS yields SCCs, articulation points, and bridges for resilience analysis.' },
  { approach: 'Spectral partition (Laplacian Fiedler vector)', time: 'O(V^3) naive / O(E log V) iterative', space: 'O(V + E)', note: 'Eigen-solvers dominate; iterative methods suit million-node sparse graphs.' },
  { approach: 'Stoer-Wagner min cut', time: 'O(V E + V^2 log V)', space: 'O(V + E)', note: 'Exact global min cut for undirected graphs; practical on medium-sized dense graphs.' },
  { approach: 'Push-relabel with gap heuristics', time: 'O(V^3) worst-case', space: 'O(V + E)', note: 'Excellent in practice on dense networks; relabeling accelerates convergence.' },
  { approach: 'Treewidth DP (k-width)', time: 'O(f(k) * V)', space: 'O(f(k) * V)', note: 'Exact for NP-hard tasks when treewidth is small; exponential only in k.' },
]

const flowToolkit = [
  {
    title: 'Residual graph discipline',
    detail: 'Every augmentation updates forward and reverse edges; use edge indices for O(1) backtracking.',
  },
  {
    title: 'Cut extraction',
    detail: 'After max flow, BFS in residual graph from s gives the min-cut partition as a certificate.',
  },
  {
    title: 'Scaling and heuristics',
    detail: 'Capacity scaling or global relabel dramatically reduce iterations on large integer capacities.',
  },
]

const matchingToolkit = [
  {
    title: 'Layered BFS',
    detail: 'Build levels from free U-vertices; only traverse forward layers in DFS to bound augmentations.',
  },
  {
    title: 'Vertex cover dual',
    detail: 'From BFS layers, derive min vertex cover in bipartite graphs with no extra cost.',
  },
  {
    title: 'General matching',
    detail: 'Blossom shrink handles odd cycles; use for non-bipartite graphs but expect heavier constants.',
  },
]

const spectralToolkit = [
  {
    title: 'Laplacian basics',
    detail: 'L = D - A; eigenvalues encode connectivity and expansion, Fiedler vector yields a relaxed cut.',
  },
  {
    title: 'Numerical stability',
    detail: 'Center data, scale weights, and use iterative solvers with preconditioning for sparse graphs.',
  },
  {
    title: 'Approximate clustering',
    detail: 'Spectral methods trade exact optimality for speed; validate with modularity or conductance.',
  },
]

const decompositionToolkit = [
  {
    title: 'SCC condensation',
    detail: 'Collapse cycles into DAG nodes to simplify all downstream computations.',
  },
  {
    title: 'Bridge tree',
    detail: 'Contract 2-edge-connected components to reveal critical edges and cut structure.',
  },
  {
    title: 'Heavy-light and LCA',
    detail: 'Decompose trees for path queries and use Euler tours for subtree aggregation.',
  },
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

const debuggingSignals = [
  'Flow values increase but cut size decreases: residual graph update is likely incorrect.',
  'Low-link values climb above discovery time: parent/back-edge handling is wrong.',
  'Matching alternates but size stagnates: BFS layering or DFS pruning is flawed.',
  'Spectral clustering yields tiny singleton cuts: normalization or weight scaling is off.',
]

const whenToUse = [
  'Need provable throughput or resilience: pick flow/cut duals and output the cut as a certificate.',
  'Pairing problems on bipartite data: Hopcroft-Karp for sparse, Hungarian for dense with costs.',
  'Heavy repeated queries on mostly static graphs: decompose once (SCCs, bridges, LCA) and reuse the summary.',
  'Cluster discovery on sparse graphs: spectral methods with iterative eigensolvers to stay memory-light.',
]

const implementationChecklist = [
  'Define invariants: residual capacity >= 0, low-link <= discovery time, parent pointers set once.',
  'Cache edge ids and reverse indices before running any flow or matching routine.',
  'Guard against integer overflow when summing capacities or distances.',
  'Expose certificates in output: min-cut partition, vertex cover, condensation DAG.',
  'Add assertions for every augmentation or relabel step in debug builds.',
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
  {
    title: 'Dinic blocking flow (sketch)',
    code: `while bfsLevelGraph():
    it = [0..V-1]
    pushed = dfs(s, INF)
    while pushed > 0:
        flow += pushed
        pushed = dfs(s, INF)

function dfs(u, f):
    if u == t or f == 0: return f
    for i from it[u] to adj[u].size:
        e = adj[u][i]
        if level[e.v] == level[u] + 1 and e.cap > 0:
            pushed = dfs(e.v, min(f, e.cap))
            if pushed > 0:
                e.cap -= pushed; rev(e).cap += pushed
                return pushed
    return 0`,
    explanation: 'Level graphs restrict augmentations to shortest paths, while blocking flows saturate them efficiently.',
  },
  {
    title: 'Bridge tree construction (sketch)',
    code: `findBridges()
comp = [-1..V-1]
id = 0
for v in V:
    if comp[v] == -1:
        dfsComponent(v, id) // skip bridge edges
        id += 1
bridgeTree = adjacency of components for each bridge`,
    explanation: 'Contract non-bridge edges to components; each bridge becomes an edge in the bridge tree.',
  },
]

const glossary = [
  'Cut: partition of vertices into S and T; capacity is total weight of edges crossing.',
  'Flow: assignment that respects capacity and conservation; value is outgoing from source.',
  'Residual graph: edges with remaining capacity that allow more flow or cancellations.',
  'Matching: set of disjoint edges; in bipartite graphs, max matching equals min vertex cover.',
  'Treewidth: measure of how tree-like a graph is; small values enable DP on bags.',
  'Laplacian: L = D - A; spectrum encodes connectivity and expansion.',
  'Dominators: in a directed graph, node u dominates v if every path to v goes through u.',
  'Minor: graph obtained by deletions and edge contractions; excludes characterize families.',
]

const practicePrompts = [
  'Design a min-cut based certificate for a capacity planning tool and explain how you would verify it.',
  'Compare Hopcroft-Karp vs Hungarian for a 50k x 50k bipartite graph with sparse edges.',
  'Given a dynamic graph with edge deletions, outline how to maintain bridge information.',
  'Sketch a treewidth-based DP for vertex cover on a tree decomposition.',
  'Explain why SCC condensation allows topological DP even when the original graph has cycles.',
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
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
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
            <legend>Graph families and structure</legend>
            <div className="win95-grid win95-grid-2">
              {graphFamilies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Representation checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {representationChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm map</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Goal</th>
                    <th>Primary</th>
                    <th>Output</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {algorithmMap.map((row) => (
                    <tr key={row.goal}>
                      <td>{row.goal}</td>
                      <td>{row.primary}</td>
                      <td>{row.output}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <legend>Flow toolkit</legend>
            <div className="win95-grid win95-grid-3">
              {flowToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Matching toolkit</legend>
            <div className="win95-grid win95-grid-3">
              {matchingToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Spectral toolkit</legend>
            <div className="win95-grid win95-grid-3">
              {spectralToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Decomposition toolkit</legend>
            <div className="win95-grid win95-grid-3">
              {decompositionToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
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
            <legend>Debugging signals</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {debuggingSignals.map((item) => (
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
            <legend>Glossary</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {glossary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practice prompts</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {practicePrompts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
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

