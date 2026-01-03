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

const historicalMilestones = [
  {
    title: 'BFS formalized for shortest hops (1950s)',
    detail:
      'Moore’s BFS delivered minimal hop counts on unweighted graphs, enabling circuit routing and early AI planning.',
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

const coreUseCases = [
  {
    heading: 'Shortest paths in unweighted graphs (BFS)',
    bullets: [
      'Shortest hop counts in social graphs, grids, and network routing.',
      'Multi-source BFS for nearest facility or flood fill distances.',
      'Bidirectional BFS reduces search on large branching graphs.',
    ],
  },
  {
    heading: 'Reachability and component labeling (BFS/DFS)',
    bullets: [
      'Check if two nodes are connected or list all connected components.',
      'Flood fill in grids, maps, and image segmentation.',
      'Detect isolated subgraphs before running heavier algorithms.',
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
    heading: 'Pathfinding variants (BFS family)',
    bullets: [
      '0-1 BFS for graphs with edge weights 0 or 1.',
      'Layered BFS in Hopcroft-Karp for maximum bipartite matching.',
      'Level graphs in Dinic’s algorithm for max flow.',
    ],
  },
  {
    heading: 'Backtracking and search (DFS)',
    bullets: [
      'Constraint solving (Sudoku, N-Queens) uses DFS with pruning.',
      'Enumerate paths or permutations with DFS recursion.',
      'Iterative deepening combines DFS depth control with BFS-like optimality.',
    ],
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
]

const pitfalls = [
  'Using DFS when shortest paths in unweighted graphs are required.',
  'Forgetting to reset visited arrays when running multiple traversals.',
  'Recursion depth overflow in DFS on large graphs.',
  'Assuming BFS works on weighted graphs without Dijkstra or 0-1 BFS.',
  'Ignoring disconnected components by starting from only one node.',
]

const decisionGuidance = [
  'Need shortest hops in an unweighted graph: use BFS.',
  'Need reachability or component labeling: BFS or DFS both work.',
  'Need ordering, cycles, SCCs, or lowlink structure: DFS is the backbone.',
  'Need minimal memory on deep graphs: DFS or iterative deepening.',
  'Need weighted shortest paths: switch to Dijkstra or 0-1 BFS.',
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
                while DFS exposes ancestry, cycles, and deep structural properties. This page maps their most common use cases.
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
                rich structure like finish times, lowlink values, and component boundaries. Together they power most graph tasks.
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
