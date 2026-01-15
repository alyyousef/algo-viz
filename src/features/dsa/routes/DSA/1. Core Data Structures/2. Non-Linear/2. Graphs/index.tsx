import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

export default function GraphsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Graphs</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-hero">
            <div className="win95-subheading">Networks that turn relationships into paths, flows, and influence</div>
            <p className="win95-text">
              Graphs generalize trees by allowing cycles, multiple paths, and weighted relationships. That flexibility lets us
              model roads, dependencies, friendships, power grids, and computation graphs. This page explores the history,
              mechanics, complexity, and engineering judgment needed to work confidently with graph structures.
            </p>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                A graph is a set of vertices plus edges that encode relationships. Edges can be directed or undirected,
                weighted or unweighted, parallel or unique. Because graphs allow cycles and multiple routes, they capture the
                richness of real systems that trees cannot: detours on roads, alternative dependencies, and feedback loops in
                control systems. The core task in graph algorithms is taming that richness, finding paths, orders, clusters, or
                flows without getting lost in the combinatorial explosion.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMoments.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
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
            <legend>Terminology that unlocks the rest</legend>
            <div className="win95-grid win95-grid-2">
              {terminology.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Graph types you should recognize</legend>
            <div className="win95-grid win95-grid-2">
              {graphTypes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: representations, traversal, optimization</legend>
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
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Choose representations that match sparsity. Choose traversals that match objectives. The right pairing turns
                an intractable search into a linear or near-linear pass.
              </p>
            </div>
            <div className="win95-grid win95-grid-2">
              {traversalCheatSheet.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Representation trade-offs</legend>
            <div className="win95-grid win95-grid-2">
              {representationTradeoffs.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm families at a glance</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmFamilies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Invariants and correctness checks</legend>
            <div className="win95-grid win95-grid-2">
              {invariantChecks.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and performance intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Asymptotic bounds mask hardware realities. For large graphs, memory traffic dwarfs arithmetic. Cache-friendly
                layouts, batching, and parallel traversals matter as much as algorithmic complexity, especially in production
                engines like routing or stream processors.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance considerations in practice</legend>
            <div className="win95-grid win95-grid-2">
              {performanceNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorld.map((item) => (
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
            <legend>Testing checklist</legend>
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

          <fieldset className="win95-fieldset">
            <legend>Practice and build challenges</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {practicePrompts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights and current frontiers</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

