import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
  {
    approach: 'Hopcroft-Karp (bipartite matching)',
    time: 'O(E sqrt V)',
    space: 'O(V + E)',
    note: 'Layered BFS/DFS shrinks augmentations; strong for large sparse graphs.',
  },
  {
    approach: 'Dinic with scaling (max flow)',
    time: 'O(E V^2)',
    space: 'O(V + E)',
    note: 'Blocking flows per level; scaling trims iterations on big capacities.',
  },
  {
    approach: 'Tarjan SCC + bridges',
    time: 'O(V + E)',
    space: 'O(V + E)',
    note: 'Single DFS yields SCCs, articulation points, and bridges for resilience analysis.',
  },
  {
    approach: 'Spectral partition (Laplacian Fiedler vector)',
    time: 'O(V^3) naive / O(E log V) iterative',
    space: 'O(V + E)',
    note: 'Eigen-solvers dominate; iterative methods suit million-node sparse graphs.',
  },
  {
    approach: 'Stoer-Wagner min cut',
    time: 'O(V E + V^2 log V)',
    space: 'O(V + E)',
    note: 'Exact global min cut for undirected graphs; practical on medium-sized dense graphs.',
  },
  {
    approach: 'Push-relabel with gap heuristics',
    time: 'O(V^3) worst-case',
    space: 'O(V + E)',
    note: 'Excellent in practice on dense networks; relabeling accelerates convergence.',
  },
  {
    approach: 'Treewidth DP (k-width)',
    time: 'O(f(k) * V)',
    space: 'O(f(k) * V)',
    note: 'Exact for NP-hard tasks when treewidth is small; exponential only in k.',
  },
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

const failureStory =
  'A large transit operator modeled its rail map as tree-like and missed a single articulation bridge feeding multiple lines. A routine maintenance closure partitioned the network and stranded riders; a bridge/articulation audit would have flagged the weak cut long before scheduling.'

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
    explanation:
      'Low-link values track earliest reachable ancestor; SCCs form when a root cannot reach higher nodes, and bridges are edges that only appear in tree paths.',
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
    explanation:
      'Layered BFS finds the shortest augmenting paths, and DFS only explores forward along layers, giving O(E sqrt V) total augmentations.',
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
  {
    term: 'Cut',
    definition: 'A partition of vertices into S and T; capacity is the total weight of edges crossing.',
  },
  {
    term: 'Flow',
    definition: 'An assignment that respects capacity and conservation; value is outgoing from the source.',
  },
  {
    term: 'Residual graph',
    definition: 'Edges with remaining capacity that allow more flow or cancellations.',
  },
  {
    term: 'Matching',
    definition: 'A set of disjoint edges; in bipartite graphs, max matching equals min vertex cover.',
  },
  {
    term: 'Treewidth',
    definition: 'A measure of how tree-like a graph is; small values enable DP on bags.',
  },
  {
    term: 'Laplacian',
    definition: 'L = D - A; its spectrum encodes connectivity and expansion.',
  },
  {
    term: 'Dominators',
    definition: 'In a directed graph, node u dominates v if every path to v goes through u.',
  },
  {
    term: 'Minor',
    definition: 'A graph obtained by deletions and edge contractions; excluded minors characterize families.',
  },
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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'History' },
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Core Pillars' },
    { id: 'core-families', label: 'Graph Families' },
    { id: 'core-representation', label: 'Representation Checklist' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-algorithms', label: 'Algorithm Map' },
    { id: 'core-workflow', label: 'How It Works' },
    { id: 'core-flow', label: 'Flow Toolkit' },
    { id: 'core-matching', label: 'Matching Toolkit' },
    { id: 'core-spectral', label: 'Spectral Toolkit' },
    { id: 'core-decomposition', label: 'Decomposition Toolkit' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-debugging', label: 'Debugging Signals' },
    { id: 'core-when', label: 'When to Use' },
    { id: 'core-implementation', label: 'Implementation Checklist' },
    { id: 'core-advanced', label: 'Advanced Topics' },
  ],
  examples: [
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-prompts', label: 'Practice Prompts' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const graphHelpStyles = `
.graph-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.graph-help-window {
  width: 100%;
  min-height: 100dvh;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.graph-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.graph-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.graph-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.graph-help-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  padding: 0;
}

.graph-help-control:active {
  border-top: 1px solid #404040;
  border-left: 1px solid #404040;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
}

.graph-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.graph-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.graph-help-tab.is-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.graph-help-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  background: #fff;
  border-top: 1px solid #404040;
}

.graph-help-toc {
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
  overflow: auto;
}

.graph-help-toc h2 {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.graph-help-toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.graph-help-toc li {
  margin: 0 0 8px;
}

.graph-help-toc a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.graph-help-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.graph-help-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.graph-help-intro {
  margin: 0 0 14px;
  font-size: 12px;
  line-height: 1.5;
}

.graph-help-section {
  margin: 0 0 20px;
}

.graph-help-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.graph-help-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.graph-help-content p,
.graph-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.graph-help-content p {
  margin: 0 0 10px;
}

.graph-help-content ul,
.graph-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.graph-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.graph-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  overflow-x: auto;
}

.graph-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .graph-help-main {
    grid-template-columns: 1fr;
  }

  .graph-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .graph-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto 0 6px;
    font-size: 13px;
    white-space: normal;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function AdvancedGraphTheoryPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Advanced Graph Theory (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Advanced Graph Theory',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="graph-help-page">
      <style>{graphHelpStyles}</style>
      <div className="graph-help-window" role="presentation">
        <header className="graph-help-titlebar">
          <span className="graph-help-titletext">Advanced Graph Theory</span>
          <div className="graph-help-controls">
            <button className="graph-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="graph-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="graph-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`graph-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="graph-help-main">
          <aside className="graph-help-toc" aria-label="Table of contents">
            <h2>Contents</h2>
            <ul>
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="graph-help-content">
            <h1 className="graph-help-doc-title">Advanced Graph Theory</h1>
            <p className="graph-help-intro">
              Hard graph problems become manageable when the structure is explicit: condense cycles, certify duals, separate critical
              cuts, and choose algorithms that preserve the right invariants. This page keeps the original material intact while
              presenting it as a Windows-style help manual focused on decomposition, certificates, and scalable implementation.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="graph-help-section">
                  <h2 className="graph-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="graph-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="graph-help-divider" />

                <section id="bp-history" className="graph-help-section">
                  <h2 className="graph-help-heading">History</h2>
                  {history.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="graph-help-divider" />

                <section id="bp-applications" className="graph-help-section">
                  <h2 className="graph-help-heading">Applications and Failure Story</h2>
                  {applications.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="graph-help-subheading">Failure story: Fragile articulation point</h3>
                  <p>{failureStory}</p>
                </section>

                <hr className="graph-help-divider" />

                <section id="bp-takeaways" className="graph-help-section">
                  <h2 className="graph-help-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-pillars" className="graph-help-section">
                  <h2 className="graph-help-heading">Core Pillars</h2>
                  {pillars.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-families" className="graph-help-section">
                  <h2 className="graph-help-heading">Graph Families and Structure</h2>
                  {graphFamilies.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-representation" className="graph-help-section">
                  <h2 className="graph-help-heading">Representation Checklist</h2>
                  <ul>
                    {representationChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-models" className="graph-help-section">
                  <h2 className="graph-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-algorithms" className="graph-help-section">
                  <h2 className="graph-help-heading">Algorithm Map</h2>
                  {algorithmMap.map((item) => (
                    <div key={item.goal}>
                      <h3 className="graph-help-subheading">{item.goal}</h3>
                      <p><strong>Primary:</strong> {item.primary}</p>
                      <p><strong>Output:</strong> {item.output}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>

                <section id="core-workflow" className="graph-help-section">
                  <h2 className="graph-help-heading">How It Works</h2>
                  {howItWorks.map((item) => (
                    <p key={item.step}>
                      <strong>{item.step}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-flow" className="graph-help-section">
                  <h2 className="graph-help-heading">Flow Toolkit</h2>
                  {flowToolkit.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-matching" className="graph-help-section">
                  <h2 className="graph-help-heading">Matching Toolkit</h2>
                  {matchingToolkit.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-spectral" className="graph-help-section">
                  <h2 className="graph-help-heading">Spectral Toolkit</h2>
                  {spectralToolkit.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-decomposition" className="graph-help-section">
                  <h2 className="graph-help-heading">Decomposition Toolkit</h2>
                  {decompositionToolkit.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="graph-help-section">
                  <h2 className="graph-help-heading">Complexity Table</h2>
                  {complexityTable.map((item) => (
                    <p key={item.approach}>
                      <strong>{item.approach}:</strong> time {item.time}, space {item.space}. {item.note}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="graph-help-section">
                  <h2 className="graph-help-heading">Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-debugging" className="graph-help-section">
                  <h2 className="graph-help-heading">Debugging Signals</h2>
                  <ul>
                    {debuggingSignals.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-when" className="graph-help-section">
                  <h2 className="graph-help-heading">When to Use</h2>
                  <ol>
                    {whenToUse.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-implementation" className="graph-help-section">
                  <h2 className="graph-help-heading">Implementation Checklist</h2>
                  <ul>
                    {implementationChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-advanced" className="graph-help-section">
                  <h2 className="graph-help-heading">Advanced Topics</h2>
                  {advanced.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-code" className="graph-help-section">
                  <h2 className="graph-help-heading">Code Examples</h2>
                  {codeExamples.map((item) => (
                    <div key={item.title}>
                      <h3 className="graph-help-subheading">{item.title}</h3>
                      <pre className="graph-help-codebox">
                        <code>{item.code.trim()}</code>
                      </pre>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-prompts" className="graph-help-section">
                  <h2 className="graph-help-heading">Practice Prompts</h2>
                  <ol>
                    {practicePrompts.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="graph-help-section">
                <h2 className="graph-help-heading">Glossary</h2>
                {glossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
