import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'BFS formalized for shortest hops (1950s)',
    detail:
      'Moore\'s BFS delivered minimal hop counts on unweighted graphs, enabling circuit routing and early AI planning.',
  },
  {
    title: 'DFS becomes the graph backbone (1960s-70s)',
    detail:
      'DFS formalized depth-first ordering, enabling topological sort, SCCs, and lowlink-based cut detection.',
  },
  {
    title: 'Systems and compilers adopt traversals',
    detail:
      'Build systems, dependency analyzers, and compilers turned BFS/DFS into foundational passes for reachability and ordering.',
  },
  {
    title: 'Large-scale traversal engineering',
    detail:
      'Parallel BFS, iterative DFS, and cache-aware traversals emerged for billion-edge graphs and memory limits.',
  },
]

const mentalModels = [
  {
    title: 'BFS as concentric waves',
    detail:
      'BFS expands layer by layer, so the first time you see a node is the shortest hop distance.',
  },
  {
    title: 'DFS as a spelunker',
    detail:
      'DFS dives deep, backtracking only when it hits a dead end, which reveals ancestry and structural boundaries.',
  },
  {
    title: 'Queues vs stacks',
    detail:
      'BFS uses a queue to preserve layers; DFS uses a stack (explicit or recursion) to preserve depth.',
  },
]

const keyDefinitions = [
  {
    heading: 'Breadth-first search (BFS)',
    bullets: [
      'Queue-based traversal that visits nodes in nondecreasing distance.',
      'Guarantees shortest hop paths in unweighted graphs.',
      'Produces a shortest path tree via parent pointers.',
    ],
  },
  {
    heading: 'Depth-first search (DFS)',
    bullets: [
      'Stack or recursion-based traversal that explores a path to depth.',
      'Records discovery and finish times for ordering and structure.',
      'Produces a DFS forest that reveals ancestry and back edges.',
    ],
  },
  {
    heading: 'BFS levels',
    bullets: [
      'Nodes discovered at the same BFS distance form a level.',
      'Levels enable bipartite checks and layer-by-layer processing.',
      'Level count equals shortest hop distance from sources.',
    ],
  },
  {
    heading: 'DFS timestamps',
    bullets: [
      'Each node has entry and exit times from DFS.',
      'Intervals allow ancestor queries in trees and DAGs.',
      'Finish order powers topo sorting and SCC algorithms.',
    ],
  },
  {
    heading: 'Traversal forest',
    bullets: [
      'Disconnected graphs yield a forest, not a single tree.',
      'Running from all unvisited nodes ensures full coverage.',
      'Component labels come from the forest roots.',
    ],
  },
  {
    heading: 'DFS edge classification',
    bullets: [
      'Tree edges discover new vertices.',
      'Back edges indicate cycles (in directed graphs).',
      'Forward/cross edges expose partial order violations.',
    ],
  },
]

const workflowSteps = [
  {
    title: 'Model the graph',
    detail:
      'Pick directed vs undirected, build adjacency lists, and map data to ids.',
  },
  {
    title: 'Select traversal',
    detail:
      'Use BFS for shortest hops and layers; use DFS for structure and ordering.',
  },
  {
    title: 'Choose sources',
    detail:
      'Single source for paths, multi-source for nearest facilities or flood fill.',
  },
  {
    title: 'Track artifacts',
    detail:
      'Maintain distance, parent, colors, or timestamps depending on your goal.',
  },
  {
    title: 'Post-process outputs',
    detail:
      'Reconstruct paths, build component lists, or run DP on traversal order.',
  },
]

const coreUseCases = [
  {
    heading: 'Shortest paths in unweighted graphs (BFS)',
    bullets: [
      'Shortest hop counts in social graphs, grids, and routing problems.',
      'Multi-source BFS for nearest facility or flood fill distances.',
      'Parent pointers reconstruct shortest paths and BFS trees.',
    ],
  },
  {
    heading: 'Reachability and component labeling (BFS/DFS)',
    bullets: [
      'Check if two nodes are connected or list all connected components.',
      'Flood fill in grids, maps, and image segmentation.',
      'Count components or detect isolated subgraphs before heavier algorithms.',
    ],
  },
  {
    heading: 'Bipartite checking and 2-coloring (BFS/DFS)',
    bullets: [
      'Color levels with two colors and detect odd cycles.',
      'Used for conflict detection and scheduling constraints.',
      'BFS is common for layer coloring; DFS works too.',
    ],
  },
  {
    heading: 'Topological ordering and cycle detection (DFS)',
    bullets: [
      'DFS finishing order yields topo sort on DAGs.',
      'Back edges during DFS signal cycles in dependency graphs.',
      'Used in build systems, scheduling, and prerequisite resolution.',
    ],
  },
  {
    heading: 'Structural graph analysis (DFS)',
    bullets: [
      'Lowlink DFS finds bridges and articulation points.',
      'Tarjan SCC uses DFS stacks to collapse cycles into components.',
      'DFS tree structure reveals ancestors and subtree ranges.',
    ],
  },
  {
    heading: 'Grid and maze traversal (BFS/DFS)',
    bullets: [
      'BFS for shortest path on unit-cost grids and mazes.',
      'DFS for area marking, region labeling, and boundary detection.',
      'Multi-source BFS models wavefront expansion or fire spread.',
    ],
  },
  {
    heading: 'Pathfinding variants (BFS family)',
    bullets: [
      '0-1 BFS for graphs with edge weights 0 or 1.',
      'Layered BFS in Hopcroft-Karp for maximum bipartite matching.',
      'Level graphs in Dinic\'s algorithm for max flow.',
    ],
  },
  {
    heading: 'Backtracking and search (DFS)',
    bullets: [
      'Constraint solving (Sudoku, N-Queens) uses DFS with pruning.',
      'Enumerate paths, subsets, or permutations with DFS recursion.',
      'Iterative deepening blends BFS optimality with DFS memory profile.',
    ],
  },
  {
    heading: 'State space search (BFS vs DFS)',
    bullets: [
      'BFS guarantees the fewest moves for puzzles with unit costs.',
      'DFS explores deeply with pruning, useful when solutions are rare but deep.',
      'Iterative deepening DFS finds shallow solutions without BFS memory blowups.',
    ],
  },
  {
    heading: 'Tree algorithms (BFS/DFS)',
    bullets: [
      'Two BFS runs find tree diameter in unweighted trees.',
      'DFS computes subtree sizes, depths, and Euler tour intervals.',
      'Parent pointers enable LCA preprocessing and path queries.',
    ],
  },
  {
    heading: 'Graph preprocessing (DFS-heavy)',
    bullets: [
      'Order nodes by finish times to build condensation graphs.',
      'Compute entry/exit times for subtree or dominance queries.',
      'Detect cycles early to short-circuit downstream pipelines.',
    ],
  },
]

const traversalPatterns = [
  {
    title: 'Traversal frontier',
    detail:
      'BFS keeps a frontier queue of nodes at the current distance. DFS keeps a stack of the current path, diving until it must backtrack.',
  },
  {
    title: 'When to mark visited',
    detail:
      'Mark on enqueue/push to avoid duplicates and guarantee shortest distances in BFS.',
  },
  {
    title: 'Discovery guarantees',
    detail:
      'BFS discovery order equals shortest hop distance. DFS discovery order encodes ancestry but not shortest paths.',
  },
  {
    title: 'Parent pointers',
    detail:
      'BFS parent edges yield shortest paths in unweighted graphs. DFS parent edges yield a spanning tree useful for structure.',
  },
  {
    title: 'Coloring / visitation states',
    detail:
      'Using white-gray-black states helps detect back edges (cycles) in DFS and prevents duplicate queue entries in BFS.',
  },
  {
    title: 'Traversal forests',
    detail:
      'Restart from unvisited nodes to cover disconnected graphs and build a full forest.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Both BFS and DFS run in O(V + E) on adjacency lists. Edge count dominates for dense graphs.',
  },
  {
    title: 'Space cost',
    detail:
      'BFS needs O(V) for queues and visited sets. DFS uses O(V) for recursion or an explicit stack.',
  },
  {
    title: 'Memory vs optimality',
    detail:
      'BFS guarantees shortest hop paths but can be memory heavy. DFS is memory light but not optimal for shortest paths.',
  },
  {
    title: 'Traversal order impact',
    detail:
      'DFS order depends on adjacency ordering. BFS is more stable for layer distances but still depends on neighbor ordering.',
  },
]

const bfsDfsComparisons = [
  {
    title: 'Goal',
    bfs: 'Shortest hops, layers, distances',
    dfs: 'Structure, ordering, reachability',
  },
  {
    title: 'Memory profile',
    bfs: 'High on wide frontiers',
    dfs: 'Lower, proportional to depth',
  },
  {
    title: 'Typical output',
    bfs: 'Distance array, shortest path tree',
    dfs: 'Discovery/finish times, DFS tree',
  },
  {
    title: 'Weighted edges',
    bfs: 'Use 0-1 BFS or Dijkstra instead',
    dfs: 'Not suitable for shortest paths',
  },
  {
    title: 'Common pitfalls',
    bfs: 'Used on weighted edges without adaptation',
    dfs: 'Assumed to return shortest paths',
  },
  {
    title: 'Parallelization',
    bfs: 'Layer-wise parallelism is natural',
    dfs: 'Harder due to deep dependencies',
  },
]

const variantCatalog = [
  {
    title: 'Multi-source BFS',
    detail:
      'Seed the queue with multiple sources to compute nearest-source distances in one pass.',
  },
  {
    title: 'Bidirectional BFS',
    detail:
      'Run BFS from start and goal to meet in the middle, reducing explored nodes in large graphs.',
  },
  {
    title: '0-1 BFS',
    detail:
      'Replace the queue with a deque when edge weights are 0 or 1 to keep linear time.',
  },
  {
    title: 'K-limited BFS',
    detail:
      'Stop after K layers to answer bounded-radius reachability queries.',
  },
  {
    title: 'Iterative DFS',
    detail:
      'Use an explicit stack to avoid recursion limits and control traversal order.',
  },
  {
    title: 'Iterative deepening DFS',
    detail:
      'Run DFS with increasing depth limits to retain DFS memory while approaching BFS optimality.',
  },
  {
    title: 'Layered DFS on BFS levels',
    detail:
      'Use BFS to build levels, then DFS within level constraints (matching and flow algorithms).',
  },
  {
    title: 'DFS with entry/exit times',
    detail:
      'Compute Euler tour timestamps to support subtree queries and ancestor checks.',
  },
]

const realWorldUses = [
  {
    context: 'Routing and maps',
    detail:
      'BFS on unit-weight grids, with Dijkstra/A* for weighted road networks.',
  },
  {
    context: 'Compilers and build systems',
    detail:
      'DFS detects cycles, SCCs, and ordering constraints in dependency graphs.',
  },
  {
    context: 'Social graph queries',
    detail:
      'BFS powers degrees-of-separation and friend-of-friend discovery.',
  },
  {
    context: 'Network resilience',
    detail:
      'DFS lowlink finds bridges and articulation points to identify critical connections.',
  },
  {
    context: 'Image processing',
    detail:
      'Flood fill and connected component labeling are BFS/DFS staples.',
  },
  {
    context: 'AI and puzzle search',
    detail:
      'BFS ensures shortest solutions; DFS provides deep exploration with pruning heuristics.',
  },
  {
    context: 'Build and deploy pipelines',
    detail:
      'DFS detects cycles and orders tasks; BFS helps estimate critical levels or stage-by-stage scheduling.',
  },
  {
    context: 'Security and auditing',
    detail:
      'BFS finds shortest escalation paths; DFS enumerates reachable attack surfaces for coverage.',
  },
  {
    context: 'Knowledge graphs',
    detail:
      'BFS expands neighborhood layers; DFS explores deep relations for inference.',
  },
  {
    context: 'Gaming and simulation',
    detail:
      'BFS computes movement ranges; DFS explores state trees with pruning.',
  },
  {
    context: 'Data lineage',
    detail:
      'DFS uncovers dependency chains and cycles in pipelines and ETL graphs.',
  },
]

const examples = [
  {
    title: 'BFS shortest hops',
    code: `queue = [start]
dist[start] = 0
while queue not empty:
    v = pop_front(queue)
    for each w in adj[v]:
        if dist[w] is unset:
            dist[w] = dist[v] + 1
            parent[w] = v
            push_back(queue, w)`,
    explanation:
      'BFS expands level by level. The first time you see a node is the shortest hop distance.',
  },
  {
    title: 'Multi-source BFS',
    code: `queue = [s1, s2, s3]
for s in sources: dist[s] = 0
while queue not empty:
    v = pop_front(queue)
    for w in adj[v]:
        if dist[w] is unset:
            dist[w] = dist[v] + 1
            push_back(queue, w)`,
    explanation:
      'Seeding multiple sources computes the nearest source distance in one traversal.',
  },
  {
    title: '0-1 BFS (deque)',
    code: `deque = [start]
dist[start] = 0
while deque not empty:
    v = pop_front(deque)
    for (w, cost) in adj[v]: // cost is 0 or 1
        if dist[w] > dist[v] + cost:
            dist[w] = dist[v] + cost
            if cost == 0: push_front(deque, w)
            else: push_back(deque, w)`,
    explanation:
      'A deque preserves shortest distances when edges have cost 0 or 1.',
  },
  {
    title: 'DFS with finishing order',
    code: `dfs(v):
    seen[v] = true
    for each w in adj[v]:
        if not seen[w]: dfs(w)
    order.push(v) // finishing order`,
    explanation:
      'Finishing order is central to topo sort and Kosaraju SCC: reverse it for DAG ordering.',
  },
  {
    title: 'BFS vs DFS choice',
    code: `Need shortest path in unweighted graph -> BFS
Need cycle detection or topo order -> DFS
Need minimal memory on deep graphs -> DFS or iterative deepening`,
    explanation:
      'Pick the traversal based on the guarantee you need: BFS for shortest hops, DFS for structure.',
  },
  {
    title: 'Bipartite check (BFS)',
    code: `color[start] = 0
queue = [start]
while queue not empty:
    v = pop_front(queue)
    for w in adj[v]:
        if color[w] is unset:
            color[w] = 1 - color[v]
            push_back(queue, w)
        else if color[w] == color[v]:
            return NOT_BIPARTITE`,
    explanation:
      'Two-coloring with BFS (or DFS) detects odd cycles in undirected graphs.',
  },
  {
    title: 'BFS layer extraction',
    code: `levels = []
queue = [start]
seen = {start}
while queue not empty:
    level = []
    for i in 1..len(queue):
        v = pop_front(queue)
        level.append(v)
        for w in adj[v]:
            if w not seen:
                seen.add(w)
                push_back(queue, w)
    levels.append(level)`,
    explanation:
      'Layer extraction makes BFS useful for breadth summaries, bipartite checks, and level-based scheduling.',
  },
  {
    title: 'DFS for cycle detection in directed graphs',
    code: `dfs(v):
    color[v] = GRAY
    for w in adj[v]:
        if color[w] == GRAY: hasCycle = true
        else if color[w] == WHITE: dfs(w)
    color[v] = BLACK`,
    explanation:
      'Gray-to-gray edges are back edges and signal cycles, which invalidate topo ordering.',
  },
  {
    title: 'Iterative DFS to avoid recursion',
    code: `stack = [(start, 0)]
while stack not empty:
    (v, i) = stack.pop()
    if i == 0: seen[v] = true
    if i < len(adj[v]):
        stack.push((v, i + 1))
        w = adj[v][i]
        if not seen[w]: stack.push((w, 0))`,
    explanation:
      'Manual stacks avoid recursion limits and enable control over traversal order.',
  },
  {
    title: 'Iterative deepening DFS sketch',
    code: `for depth in 0..maxDepth:
    if dls(start, depth): return found

function dls(v, depth):
    if depth == 0: return v == goal
    for w in adj[v]:
        if dls(w, depth - 1): return true
    return false`,
    explanation:
      'Iterative deepening finds shortest depth solutions without BFS memory blowups.',
  },
  {
    title: 'Topo sort with DFS finish order',
    code: `order = []
for v in V:
    if not seen[v]: dfs(v)
topo = reverse(order)`,
    explanation:
      'Reverse DFS finishing order gives a topological ordering for DAGs.',
  },
]

const pitfalls = [
  'Using DFS when shortest paths in unweighted graphs are required.',
  'Forgetting to reset visited arrays when running multiple traversals.',
  'Recursion depth overflow in DFS on large graphs.',
  'Assuming BFS works on weighted graphs without Dijkstra or 0-1 BFS.',
  'Ignoring disconnected components by starting from only one node.',
  'Reusing mutable queues or stacks across test cases without clearing.',
  'Using recursion without tail-call optimization in deep trees.',
  'Assuming adjacency order is stable when it is not.',
]

const problemSolvingChecklist = [
  'Confirm if the graph is directed or undirected and model edges accordingly.',
  'Decide on BFS vs DFS based on the guarantee you need (shortest hops vs structure).',
  'Choose single-source vs multi-source traversal for the problem goal.',
  'Track the right artifacts: distance, parent, colors, or timestamps.',
  'Handle disconnected graphs by iterating through all nodes.',
]

const testingChecklist = [
  'Single node and empty graph.',
  'Disconnected components with isolated nodes.',
  'Graph with self-loops and parallel edges.',
  'Wide graph that stresses BFS queue size.',
  'Deep graph that stresses DFS recursion depth.',
  'Weighted edges to verify you do not use plain BFS.',
]

const implementationChecklist = [
  'Choose adjacency lists for sparse graphs; avoid adjacency matrices for large V.',
  'Track visited early (when enqueuing or pushing) to prevent duplicates.',
  'Store parent pointers if you need to reconstruct paths.',
  'Start from all unvisited nodes if the graph is disconnected.',
  'Prefer iterative DFS for deep graphs to avoid stack overflow.',
  'For weighted edges, switch to Dijkstra or 0-1 BFS as needed.',
  'Use color states in DFS to detect cycles in directed graphs.',
  'Use a deque for 0-1 BFS and a queue for standard BFS.',
]

const decisionGuidance = [
  'Need shortest hops in an unweighted graph: use BFS.',
  'Need reachability or component labeling: BFS or DFS both work.',
  'Need ordering, cycles, SCCs, or lowlink structure: DFS is the backbone.',
  'Need minimal memory on deep graphs: DFS or iterative deepening.',
  'Need weighted shortest paths: switch to Dijkstra or 0-1 BFS.',
  'Need nearest of many sources: use multi-source BFS.',
  'Need to detect directed cycles: DFS with coloring is the standard tool.',
]

const advancedInsights = [
  {
    title: 'Multi-source BFS as a distance transform',
    detail:
      'Seeding multiple sources yields nearest-source distances in one pass, useful for grids and Voronoi-like partitions.',
  },
  {
    title: 'DFS timestamps as intervals',
    detail:
      'Discovery/finish times create subtree intervals, enabling ancestor checks and offline queries.',
  },
  {
    title: 'Bidirectional BFS',
    detail:
      'When start and goal are known, BFS from both sides can cut search from O(b^d) to O(b^(d/2)).',
  },
  {
    title: 'Layered BFS in matching and flow',
    detail:
      'Hopcroft-Karp and Dinic use BFS layers to restrict DFS to shortest augmenting paths.',
  },
  {
    title: 'Shortest path counts with BFS',
    detail:
      'Track the number of ways to reach each node in BFS to count shortest paths.',
  },
  {
    title: 'DFS edge types',
    detail:
      'Tree, back, forward, and cross edges reveal cycles and partial order violations.',
  },
]

const takeaways = [
  'BFS is about shortest hops and layers; DFS is about structure and depth.',
  'Both run in O(V + E), but memory profiles and guarantees differ.',
  'BFS variants (multi-source, bidirectional, 0-1) widen its reach.',
  'DFS variants power SCCs, bridges, and topological order.',
  'Choosing the traversal is about the guarantee you need, not just speed.',
]

export default function BFSDFSUseCasesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">BFS & DFS Use Cases</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">When to use layer-wise BFS versus depth-first DFS</div>
              <p className="win95-text">
                BFS and DFS are the two fundamental graph traversals. BFS excels at shortest hop paths and layer structure,
                while DFS exposes ancestry, cycles, and deep structural properties. This page maps their most common use cases,
                variants, and the practical artifacts (distances, parents, timestamps) you can reuse downstream.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                BFS explores outward in layers, guaranteeing shortest paths in unweighted graphs. DFS dives deep, producing
                rich structure like finish times, lowlink values, and component boundaries. Together they power most graph tasks,
                from pathfinding and connectivity to ordering and cycle analysis.
              </p>
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
            <legend>Definitions that matter</legend>
            <div className="win95-grid win95-grid-2">
              {keyDefinitions.map((block) => (
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
            <legend>End-to-end workflow</legend>
            <div className="win95-grid win95-grid-2">
              {workflowSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: common use cases</legend>
            <div className="win95-grid win95-grid-3">
              {coreUseCases.map((block) => (
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
            <legend>Traversal patterns</legend>
            <div className="win95-grid win95-grid-2">
              {traversalPatterns.map((item) => (
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
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                BFS guarantees shortest hop paths but can be memory heavy. DFS is memory light and reveals structure but
                does not optimize path length. Choose based on the guarantee you need.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>BFS vs DFS quick comparison</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>BFS</th>
                    <th>DFS</th>
                  </tr>
                </thead>
                <tbody>
                  {bfsDfsComparisons.map((item) => (
                    <tr key={item.title}>
                      <td>{item.title}</td>
                      <td>{item.bfs}</td>
                      <td>{item.dfs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Operation summary</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Traversal</th>
                    <th>Best for</th>
                    <th>Guarantee</th>
                    <th>Memory profile</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BFS</td>
                    <td>Shortest hops, layers</td>
                    <td>Optimal in unweighted graphs</td>
                    <td>High on wide frontiers</td>
                  </tr>
                  <tr>
                    <td>DFS</td>
                    <td>Structure, cycles, ordering</td>
                    <td>Discovers depth-first tree</td>
                    <td>Lower, stack-based</td>
                  </tr>
                  <tr>
                    <td>Multi-source BFS</td>
                    <td>Nearest-source labels</td>
                    <td>Shortest to any source</td>
                    <td>Similar to BFS</td>
                  </tr>
                  <tr>
                    <td>Iterative DFS</td>
                    <td>Deep graphs</td>
                    <td>Same as recursive DFS</td>
                    <td>Explicit stack</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variant catalog</legend>
            <div className="win95-grid win95-grid-3">
              {variantCatalog.map((item) => (
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
            <legend>Problem-solving checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {problemSolvingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Testing and edge cases</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {testingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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

