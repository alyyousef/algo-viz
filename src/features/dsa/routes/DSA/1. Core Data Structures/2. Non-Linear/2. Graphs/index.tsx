import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  width: 100%;
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
  font-size: 12px;
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

.win95-page a:focus {
  outline: 1px dotted #000;
  outline-offset: 2px;
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
  font-size: 12px;
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

.win95-content {
  padding: 10px;
}

.win95-hero {
  margin-bottom: 10px;
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
  gap: 8px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.win95-stack {
  display: flex;
  flex-direction: column;
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
]

const pitfalls = [
  'Ignoring sparsity when choosing representation leads to O(V^2) blowups; use adjacency lists for sparse graphs.',
  'Running Dijkstra with negative edges gives wrong answers; use Bellman-Ford or Johnson instead.',
  'Forgetting visited sets in cyclic graphs causes infinite loops or exponential revisits.',
  'Not normalizing weights or units mixes costs (time versus distance), producing meaningless shortest paths.',
  'Assuming connectivity: many datasets have multiple components; algorithms must initialize across all or detect unreachable nodes.',
]

const decisionGuidance = [
  'Need shortest path with non-negative weights: use Dijkstra; add heuristics (A*) when you have admissible distance estimates.',
  'Need all-pairs paths on small dense graphs: use Floyd-Warshall; on large sparse graphs, run repeated Dijkstra or Johnson.',
  'Need build or task ordering: use topological sort on DAGs; detect and break cycles before scheduling.',
  'Need minimum backbone: use Prim or Kruskal for MST; Union-Find accelerates Kruskal on sparse graphs.',
  'Need capacities or matchings: start with Dinic or Push-Relabel for flow; specialize to bipartite matching with Hopcroft-Karp.',
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

export default function GraphsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Graphs</span>
          <div className="win95-title-controls">
            <button className="win95-control" type="button" aria-label="Close window">
              X
            </button>
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
