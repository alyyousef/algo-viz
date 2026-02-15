import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMoments = [
  {
    title: 'Leonhard Euler solves the Seven Bridges of Konigsberg (1736)',
    detail:
      'Euler abstracted landmasses as nodes and bridges as edges to prove no walk crosses each bridge exactly once, effectively launching graph theory.',
  },
  {
    title: 'Cayley counts trees and chemical isomers (1857)',
    detail:
      'Cayley used labeled trees to enumerate molecular structures, pushing graph ideas into chemistry and combinatorics.',
  },
  {
    title: 'Ford and Fulkerson frame max-flow min-cut (1956)',
    detail:
      'Their augmenting path method tied maximum flow to minimum cuts, influencing logistics, matching, and modern streaming algorithms.',
  },
  {
    title: 'Dijkstra publishes a shortest path algorithm (1959)',
    detail:
      'Edsger Dijkstra showed how greedy selection with a priority queue finds single-source shortest paths on non-negative weights in near-linear time for sparse graphs.',
  },
  {
    title: 'Tarjan popularizes linear-time DFS applications (1970s)',
    detail:
      'Robert Tarjan demonstrated that depth-first search exposes structure such as strongly connected components and articulation points in O(V+E) time.',
  },
]

const mentalModels = [
  {
    title: 'Cities and roads',
    detail:
      'Vertices are locations; edges are roads with direction and tolls. Shortest path is commute time; flow is traffic volume; cuts are roadblocks.',
  },
  {
    title: 'Dependency ledgers',
    detail:
      'Directed edges point from prerequisite to dependent. Topological sort is a valid execution order. Cycles reveal impossible or deadlocked requirements.',
  },
  {
    title: 'Energy landscape',
    detail:
      'Weights are costs or energies. Algorithms like Dijkstra and Bellman-Ford try to roll downhill. Negative cycles are perpetual motion machines you must detect and avoid.',
  },
  {
    title: 'Connectivity as resilience',
    detail:
      'Bridges and articulation points are single points of failure. High edge-connectivity and vertex-connectivity mean the graph survives outages.',
  },
]

const terminology = [
  {
    term: 'Vertex, edge, adjacency',
    detail:
      'Vertices are entities. Edges are relationships. Adjacency means two vertices share an edge.',
  },
  {
    term: 'Directed vs undirected',
    detail:
      'Directed edges have orientation; undirected edges are bidirectional. Algorithms often change with direction.',
  },
  {
    term: 'Weighted vs unweighted',
    detail:
      'Weights model costs or distances. Unweighted graphs assume unit cost per edge.',
  },
  {
    term: 'Degree, indegree, outdegree',
    detail:
      'Degree counts incident edges; indegree/outdegree split incoming and outgoing edges in directed graphs.',
  },
  {
    term: 'Path, walk, cycle',
    detail:
      'A walk can repeat vertices/edges; a path cannot. A cycle returns to the start without repeating edges.',
  },
  {
    term: 'Connectedness',
    detail:
      'Connected components group reachable vertices. In directed graphs, SCCs capture mutual reachability.',
  },
  {
    term: 'Bipartite and DAG',
    detail:
      'Bipartite graphs split vertices into two sets with edges only across. DAGs are directed graphs with no cycles.',
  },
]

const graphTypes = [
  {
    title: 'Simple graphs',
    detail:
      'No self-loops or parallel edges. Most textbook algorithms assume this baseline.',
  },
  {
    title: 'Multigraphs',
    detail:
      'Allow parallel edges; needed for modeling multiple relationships or capacities.',
  },
  {
    title: 'Directed acyclic graphs (DAGs)',
    detail:
      'No cycles. Enable topological ordering, DP on graphs, and scheduling.',
  },
  {
    title: 'Weighted graphs',
    detail:
      'Edges carry costs. Choice of algorithm depends on weight properties (non-negative, bounded, etc.).',
  },
  {
    title: 'Bipartite graphs',
    detail:
      'Two disjoint sets; edges cross the partition. Perfect for matching and assignment problems.',
  },
  {
    title: 'Planar and geometric graphs',
    detail:
      'Planar graphs embed without crossings; geometric graphs use spatial distance, enabling specialized algorithms.',
  },
  {
    title: 'Hypergraphs',
    detail:
      'Edges can connect many vertices at once, modeling group relationships.',
  },
]

const mechanics = [
  {
    heading: 'Representations',
    bullets: [
      'Adjacency list: per-vertex neighbor lists; O(V+E) space; ideal for sparse graphs (E near V).',
      'Adjacency matrix: V x V boolean or weight grid; O(V^2) space; constant-time edge checks; good for dense graphs or bitset operations.',
      'Edge list: flat list of (u, v, w); compact input format; suited for Kruskal or offline processing.',
    ],
  },
  {
    heading: 'Traversal scaffolding',
    bullets: [
      'Depth-first search (DFS) uses a stack or recursion to explore components and uncover structure such as SCCs, articulation points, and topological order.',
      'Breadth-first search (BFS) uses a queue to find shortest paths in unweighted graphs and to layer expansions in bipartite checks.',
      'Visited sets prevent cycles; parent pointers reconstruct paths; timestamps (discovery and finish times) classify edges.',
    ],
  },
  {
    heading: 'Optimization patterns',
    bullets: [
      'Shortest paths: BFS (unweighted), Dijkstra (non-negative), Bellman-Ford (handles negatives), Floyd-Warshall (all-pairs), A* (heuristic-guided).',
      'Connectivity and structure: Union-Find for components and MSTs; Tarjan or Kosaraju for SCC; Kahn or DFS for topological sort.',
      'Flows and cuts: Edmonds-Karp (BFS augmentations), Dinic (level graph plus blocking flow), Push-Relabel for high-capacity networks.',
    ],
  },
]

const traversalCheatSheet = [
  {
    title: 'BFS',
    detail:
      'Level-order expansion. Shortest paths on unweighted graphs; detects bipartiteness by level coloring.',
  },
  {
    title: 'DFS',
    detail:
      'Depth-first exploration. Reveals cycles, topological order (postorder), and structure like SCCs.',
  },
  {
    title: 'Bidirectional search',
    detail:
      'Search from source and target simultaneously; reduces explored nodes in large graphs.',
  },
  {
    title: '0-1 BFS',
    detail:
      'Deque-based BFS for graphs with edge weights 0 or 1; O(V+E) time.',
  },
]

const invariantChecks = [
  {
    title: 'Graph validity',
    detail:
      'Index bounds, symmetric adjacency for undirected graphs, and no missing reverse edges.',
  },
  {
    title: 'DAG property',
    detail:
      'No cycles: verify with DFS color states or Kahn indegree method.',
  },
  {
    title: 'Shortest path correctness',
    detail:
      'Dijkstra requires non-negative weights; Bellman-Ford handles negatives and detects negative cycles.',
  },
  {
    title: 'Flow constraints',
    detail:
      'Capacity and conservation must hold for all internal vertices in flow networks.',
  },
]

const representationTradeoffs = [
  {
    title: 'Adjacency list',
    detail:
      'O(V+E) storage, best for sparse graphs and traversal-heavy workloads.',
  },
  {
    title: 'Adjacency matrix',
    detail:
      'O(V^2) storage, O(1) edge checks; good for dense graphs or bitset operations.',
  },
  {
    title: 'CSR/CSC (compressed sparse)',
    detail:
      'Packed arrays with offsets; excellent cache locality and GPU friendliness.',
  },
  {
    title: 'Edge list',
    detail:
      'Compact input format; ideal for Kruskal, offline analytics, and streaming.',
  },
]

const algorithmFamilies = [
  {
    title: 'Shortest paths',
    detail:
      'BFS (unweighted), Dijkstra (non-negative), Bellman-Ford (negatives), A* (heuristic), Johnson (all-pairs).',
  },
  {
    title: 'Connectivity and components',
    detail:
      'Union-Find, DFS/BFS, SCC algorithms (Tarjan, Kosaraju), bridges/articulation points.',
  },
  {
    title: 'Spanning structures',
    detail:
      'MST via Prim/Kruskal; maximum spanning for bottleneck and clustering applications.',
  },
  {
    title: 'Flows and matchings',
    detail:
      'Max flow (Dinic, Push-Relabel), bipartite matching (Hopcroft-Karp), min-cost flow.',
  },
  {
    title: 'Ordering and scheduling',
    detail:
      'Topological sort for DAGs; longest path in DAGs via DP; critical path scheduling.',
  },
  {
    title: 'Graph analytics',
    detail:
      'Centrality, PageRank, community detection, and spectral methods for clustering.',
  },
]

const complexityNotes = [
  {
    title: 'Traversal cost',
    detail:
      'DFS and BFS run in O(V+E). For a million-node sparse graph with about three million edges, that is roughly four million operations plus memory bandwidth, a few milliseconds in native code and more in high-level runtimes.',
  },
  {
    title: 'Representation trade-offs',
    detail:
      'Adjacency matrices cost O(V^2) space, impossible at web scale. Lists scale with O(V+E) but pay pointer-chasing penalties; storing neighbors in sorted arrays enables binary search and better cache locality.',
  },
  {
    title: 'Shortest path costs',
    detail:
      'Dijkstra with a binary heap is O(E log V); with a Fibonacci heap, O(V log V + E). On sparse road networks the heap constant dominates; specialized buckets (Dial, radix) approach O(E + V log C) when weights are small integers.',
  },
  {
    title: 'Flow algorithms',
    detail:
      'Edmonds-Karp is O(VE^2) and best for teaching. Dinic averages O(E sqrt(V)) on many inputs. Push-Relabel variants achieve O(V^3) worst case yet excel with dense capacities. Implementation details can swing performance by orders of magnitude.',
  },
  {
    title: 'Memory and locality',
    detail:
      'Graphs stress memory bandwidth. Compact adjacency (CSR or CSC) improves cache hits and vectorization. For 100 million edges, 64-bit endpoints alone consume about 1.6 GB; metadata doubles that if not packed.',
  },
]

const performanceNotes = [
  {
    title: 'Memory dominates',
    detail:
      'Graph workloads often bottleneck on memory bandwidth rather than arithmetic. CSR/CSC layouts help.',
  },
  {
    title: 'Frontier size matters',
    detail:
      'BFS performance depends on the size of each level. Power-law graphs can explode early.',
  },
  {
    title: 'Priority queues cost',
    detail:
      'Dijkstra performance is often dominated by heap operations. Buckets help when weights are small.',
  },
  {
    title: 'Parallel traversals',
    detail:
      'Frontier-based BFS and label propagation parallelize well; DFS is harder to parallelize safely.',
  },
]

const realWorld = [
  {
    context: 'Routing and navigation',
    detail:
      'Mapping services run Dijkstra or A* on road graphs with heuristics like landmarks and contraction hierarchies to return sub-second routes across millions of nodes.',
  },
  {
    context: 'Compilers and build systems',
    detail:
      'Dependency graphs drive incremental builds; topological sort orders compilation; cycle detection prevents impossible builds. Tools like Bazel and Rustc lean on these properties.',
  },
  {
    context: 'Social and recommendation networks',
    detail:
      'Graph databases model friendships and follows. Algorithms such as PageRank, HITS, and personalized random walks surface influential nodes or relevant content.',
  },
  {
    context: 'Security and observability',
    detail:
      'Attack graphs map possible exploits; service meshes track call graphs; reachability determines blast radius. SCCs and cut analysis reveal lateral-movement choke points.',
  },
  {
    context: 'Data processing and ML',
    detail:
      'Execution DAGs underpin Spark and TensorFlow; graph neural networks use message passing on adjacency to learn embeddings for drugs, fraud detection, and recommendation.',
  },
]

const examples = [
  {
    title: 'DFS and BFS skeletons',
    code: `function dfs(graph, start):
    stack = [start]
    visited = set()
    while stack not empty:
        node = stack.pop()
        if node in visited: continue
        visited.add(node)
        visit(node)
        for neighbor in graph.neighbors(node):
            stack.push(neighbor)

function bfs(graph, start):
    queue = new Queue()
    queue.enqueue(start)
    visited = set([start])
    while queue not empty:
        node = queue.dequeue()
        visit(node)
        for neighbor in graph.neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)`,
    explanation:
      'DFS uncovers structure like articulation points and SCCs; BFS discovers shortest unweighted paths and layers for bipartite checks. Both rely on visited sets to tame cycles.',
  },
  {
    title: 'Dijkstra with a min-heap',
    code: `function dijkstra(graph, source):
    dist = map(default=Infinity)
    dist[source] = 0
    heap = new MinHeap()
    heap.push((0, source))
    while heap not empty:
        (d, u) = heap.pop()
        if d != dist[u]: continue  // stale entry
        for (v, w) in graph.neighbors(u):  // w is edge weight
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heap.push((dist[v], v))
    return dist`,
    explanation:
      'Stale-vertex skipping keeps complexity near O(E log V). Non-negative weights are mandatory; otherwise switch to Bellman-Ford or SPFA.',
  },
  {
    title: 'Topological sort via Kahn',
    code: `function topo_sort(graph):
    indegree = map(vertex -> 0)
    for (u, v) in graph.edges():
        indegree[v] += 1
    queue = all vertices with indegree 0
    order = []
    while queue not empty:
        u = queue.dequeue()
        order.append(u)
        for v in graph.neighbors(u):
            indegree[v] -= 1
            if indegree[v] == 0:
                queue.enqueue(v)
    if length(order) != V: error("cycle detected")
    return order`,
    explanation:
      "Kahn's algorithm returns a valid execution order for DAGs. If nodes remain with indegree greater than zero, the graph has a cycle and no valid ordering.",
  },
  {
    title: 'Union-Find for components',
    code: `function find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])
    return parent[x]

function union(a, b):
    ra = find(a)
    rb = find(b)
    if ra == rb: return
    if rank[ra] < rank[rb]: swap(ra, rb)
    parent[rb] = ra
    if rank[ra] == rank[rb]: rank[ra] += 1`,
    explanation:
      'Union-Find with path compression and union by rank keeps find/union near O(1) amortized and powers MST and connectivity checks.',
  },
  {
    title: 'Bridge detection with DFS low-links',
    code: `function dfs(u, parent):
    visited[u] = true
    tin[u] = low[u] = timer++
    for v in adj[u]:
        if v == parent: continue
        if visited[v]:
            low[u] = min(low[u], tin[v])
        else:
            dfs(v, u)
            low[u] = min(low[u], low[v])
            if low[v] > tin[u]:
                bridge(u, v)`,
    explanation:
      'An edge is a bridge if its removal disconnects the graph. Low-link values capture the earliest reachable ancestor.',
  },
]

const pitfalls = [
  'Ignoring sparsity when choosing representation leads to O(V^2) blowups; use adjacency lists for sparse graphs.',
  'Running Dijkstra with negative edges gives wrong answers; use Bellman-Ford or Johnson instead.',
  'Forgetting visited sets in cyclic graphs causes infinite loops or exponential revisits.',
  'Not normalizing weights or units mixes costs (time versus distance), producing meaningless shortest paths.',
  'Assuming connectivity: many datasets have multiple components; algorithms must initialize across all or detect unreachable nodes.',
  'Treating a directed graph as undirected breaks SCCs, flow constraints, and topological order.',
  'Using recursion for deep DFS can overflow; prefer iterative stacks on large graphs.',
  'Failing to clear visited state between passes causes subtle bugs in multi-phase algorithms.',
]

const decisionGuidance = [
  'Need shortest path with non-negative weights: use Dijkstra; add heuristics (A*) when you have admissible distance estimates.',
  'Need all-pairs paths on small dense graphs: use Floyd-Warshall; on large sparse graphs, run repeated Dijkstra or Johnson.',
  'Need build or task ordering: use topological sort on DAGs; detect and break cycles before scheduling.',
  'Need minimum backbone: use Prim or Kruskal for MST; Union-Find accelerates Kruskal on sparse graphs.',
  'Need capacities or matchings: start with Dinic or Push-Relabel for flow; specialize to bipartite matching with Hopcroft-Karp.',
  'Need community structure or centrality: consider PageRank, spectral clustering, or label propagation.',
  'Need dynamic connectivity: Euler tour trees or link-cut trees for fully dynamic updates.',
]

const advancedInsights = [
  {
    title: 'Cache-aware layouts',
    detail:
      'Compressed sparse row (CSR) and van Emde Boas layouts reduce cache misses and vectorize neighbor scans. They matter more than asymptotic tweaks on modern CPUs.',
  },
  {
    title: 'Dynamic and streaming graphs',
    detail:
      'Fully dynamic connectivity uses Euler tours or link-cut trees; streaming algorithms approximate PageRank or connectivity with sublinear memory, trading exactness for scale.',
  },
  {
    title: 'Spectral and linear-algebra views',
    detail:
      'Laplacian matrices connect graphs to eigenvalues, enabling spectral clustering, Cheeger cuts, and fast solvers for near-linear-time approximations.',
  },
  {
    title: 'Probabilistic and random walks',
    detail:
      'PageRank, HITS, and personalized walks turn connectivity into stationary distributions. Mixing times reveal how fast information diffuses through a network.',
  },
  {
    title: 'Verification and robustness',
    detail:
      'Property tests ensure invariants (no negative edges in Dijkstra, DAG checks before topo sort). Cross-check with reference implementations on small graphs. In safety-critical systems, formal models guard against overflow, disconnected components, and priority queue errors.',
  },
]

const testingChecklist = [
  'Check adjacency integrity (symmetry for undirected graphs).',
  'Validate results on small hand-crafted graphs with known answers.',
  'Cross-check shortest paths with brute force on tiny graphs.',
  'Inject negative edges to verify Bellman-Ford or Johnson behavior.',
  'Test disconnected graphs, single-node graphs, and empty edge sets.',
  'Fuzz graphs to catch visited-state bugs and overflow in distances.',
]

const practicePrompts = [
  'Implement BFS/DFS iteratively and compare memory usage.',
  'Build Dijkstra with a binary heap and with buckets; benchmark.',
  'Implement SCC with both Tarjan and Kosaraju.',
  'Solve bipartite matching and min-cost flow on sample datasets.',
  'Write a topological sorter that detects cycles with good error output.',
  'Add a graph serializer to CSR/CSC and compare traversal speed.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const graph98HelpStyles = `
.graph98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.graph98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.graph98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.graph98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.graph98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.graph98-control {
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

.graph98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.graph98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.graph98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.graph98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.graph98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.graph98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.graph98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.graph98-toc-list li {
  margin: 0 0 8px;
}

.graph98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.graph98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.graph98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.graph98-section {
  margin: 0 0 20px;
}

.graph98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.graph98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.graph98-content p,
.graph98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.graph98-content p {
  margin: 0 0 10px;
}

.graph98-content ul,
.graph98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.graph98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.graph98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.graph98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .graph98-main {
    grid-template-columns: 1fr;
  }

  .graph98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-types', label: 'Graph Types' },
    { id: 'bp-real-world', label: 'Real-World Applications' },
  ],
  'core-concepts': [
    { id: 'core-terms', label: 'Terminology' },
    { id: 'core-mechanics', label: 'Mechanics' },
    { id: 'core-traversals', label: 'Traversal Cheat Sheet' },
    { id: 'core-representations', label: 'Representation Trade-offs' },
    { id: 'core-families', label: 'Algorithm Families' },
    { id: 'core-invariants', label: 'Invariant Checks' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-performance', label: 'Performance Notes' },
    { id: 'core-decision', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
    { id: 'ex-testing', label: 'Testing Checklist' },
    { id: 'ex-practice', label: 'Practice Prompts' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function GraphsPage(): JSX.Element {
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
    document.title = `Graphs (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Graphs',
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
    <div className="graph98-help-page">
      <style>{graph98HelpStyles}</style>
      <div className="graph98-window" role="presentation">
        <header className="graph98-titlebar">
          <span className="graph98-title-text">Graphs</span>
          <div className="graph98-title-controls">
            <button className="graph98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="graph98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="graph98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`graph98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="graph98-main">
          <aside className="graph98-toc" aria-label="Table of contents">
            <h2 className="graph98-toc-title">Contents</h2>
            <ul className="graph98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="graph98-content">
            <h1 className="graph98-doc-title">Graphs</h1>
            <p>
              Graphs generalize trees by allowing cycles, multiple paths, and weighted relationships. That flexibility lets us model roads,
              dependencies, friendships, power grids, and computation graphs.
            </p>
            <p>
              A graph is a set of vertices plus edges that encode relationships. Edges can be directed or undirected, weighted or
              unweighted, parallel or unique. The core task in graph algorithms is taming that richness: finding paths, orders, clusters, or
              flows without combinatorial blowups.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="graph98-section">
                  <h2 className="graph98-heading">Overview</h2>
                  <p>
                    Because graphs allow cycles and multiple routes, they capture real systems that trees cannot: detours on roads,
                    alternative dependencies, and feedback loops in control systems.
                  </p>
                </section>
                <hr className="graph98-divider" />
                <section id="bp-history" className="graph98-section">
                  <h2 className="graph98-heading">Historical Context</h2>
                  {historicalMoments.map((item) => (
                    <div key={item.title}>
                      <h3 className="graph98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="graph98-section">
                  <h2 className="graph98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-types" className="graph98-section">
                  <h2 className="graph98-heading">Graph Types You Should Recognize</h2>
                  {graphTypes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-real-world" className="graph98-section">
                  <h2 className="graph98-heading">Real-World Applications</h2>
                  {realWorld.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-terms" className="graph98-section">
                  <h2 className="graph98-heading">Terminology</h2>
                  {terminology.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics" className="graph98-section">
                  <h2 className="graph98-heading">How It Works: Representations, Traversal, Optimization</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="graph98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p>
                    Choose representations that match sparsity. Choose traversals that match objectives. The right pairing turns an
                    intractable search into a linear or near-linear pass.
                  </p>
                </section>
                <section id="core-traversals" className="graph98-section">
                  <h2 className="graph98-heading">Traversal Cheat Sheet</h2>
                  {traversalCheatSheet.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-representations" className="graph98-section">
                  <h2 className="graph98-heading">Representation Trade-offs</h2>
                  {representationTradeoffs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-families" className="graph98-section">
                  <h2 className="graph98-heading">Algorithm Families at a Glance</h2>
                  {algorithmFamilies.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-invariants" className="graph98-section">
                  <h2 className="graph98-heading">Invariants and Correctness Checks</h2>
                  {invariantChecks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="graph98-section">
                  <h2 className="graph98-heading">Complexity Analysis and Performance Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    Asymptotic bounds mask hardware realities. For large graphs, memory traffic dwarfs arithmetic. Cache-friendly layouts,
                    batching, and parallel traversals matter as much as algorithmic complexity.
                  </p>
                </section>
                <section id="core-performance" className="graph98-section">
                  <h2 className="graph98-heading">Performance Considerations in Practice</h2>
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decision" className="graph98-section">
                  <h2 className="graph98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="graph98-section">
                  <h2 className="graph98-heading">Advanced Insights and Current Frontiers</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="graph98-section">
                  <h2 className="graph98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-practical" className="graph98-section">
                  <h2 className="graph98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="graph98-subheading">{example.title}</h3>
                      <div className="graph98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-testing" className="graph98-section">
                  <h2 className="graph98-heading">Testing Checklist</h2>
                  <ul>
                    {testingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="ex-practice" className="graph98-section">
                  <h2 className="graph98-heading">Practice and Build Challenges</h2>
                  <ul>
                    {practicePrompts.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="graph98-section">
                <h2 className="graph98-heading">Glossary</h2>
                {terminology.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.detail}
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

