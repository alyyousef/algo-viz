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
    title: 'Edward F. Moore formalizes BFS for shortest paths (1959)',
    detail:
      'Moore described level-by-level exploration to route telephone calls with minimum hops, setting the blueprint for unweighted shortest path search.',
  },
  {
    title: 'C. Y. Lee applies BFS to maze routing in PCBs (1961)',
    detail:
      "Lee's wave-propagation method used BFS to find the shortest feasible wire path on circuit boards, proving the algorithm's utility in physical design.",
  },
  {
    title: 'AI adopts BFS for state-space search (1970s)',
    detail:
      'Early AI planners and puzzle solvers used BFS to guarantee optimal solutions when all moves cost the same, contrasting with depth-first backtracking.',
  },
  {
    title: 'Bidirectional BFS popularized for social graphs (2000s)',
    detail:
      'Work on six-degrees queries and network diameter showed that meeting in the middle cuts exponential branching, making large-graph reachability practical.',
  },
  {
    title: 'Parallel and external-memory BFS mature (2010s)',
    detail:
      'Graph500 benchmarks and HPC research refined cache-aware, GPU, and out-of-core BFS to traverse billion-edge graphs efficiently.',
  },
]

const mentalModels = [
  {
    title: 'Ripples in a pond',
    detail:
      'Drop a stone and watch rings expand. BFS expands in perfect rings around the source; the first time a node gets wet is the shortest distance.',
  },
  {
    title: 'Queue as a conveyor belt',
    detail:
      'New discoveries join the back of the belt; processed nodes leave from the front. The belt ensures strictly increasing distance from the start.',
  },
  {
    title: 'Frontier fences',
    detail:
      'Each layer is a fence between explored and unexplored space. Marking visited when enqueuing locks the gate so future paths cannot sneak in with a shorter claim.',
  },
  {
    title: 'Level slicing',
    detail:
      'BFS slices a graph into distance levels. Any property that depends only on distance - shortest hops, bipartite coloring - falls out naturally from these slices.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Initialize queue with the start node(s); mark them visited with distance 0.',
      'Pop from the front, scan neighbors; enqueue any unvisited neighbor with distance +1.',
      'Stop when the queue empties or when the target is first dequeued (that visit is guaranteed shortest in unweighted graphs).',
    ],
  },
  {
    heading: 'Visited discipline',
    bullets: [
      'Mark visited at enqueue time to avoid duplicate work and to preserve optimality proofs.',
      'Store parent pointers to reconstruct shortest paths without extra passes.',
      'Use level counts (frontier size) to detect distance boundaries if you do not store distance in each node.',
    ],
  },
  {
    heading: 'Variants and add-ons',
    bullets: [
      'Multi-source BFS seeds the queue with many starts to compute nearest-source labels in one pass.',
      '0-1 BFS replaces the queue with a deque to handle edges of weight 0 or 1 in O(V+E).',
      'Bidirectional BFS runs forward and backward searches that meet in the middle, shrinking explored space when branching is high.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Asymptotic cost',
    detail:
      'O(V + E) time and O(V) memory for adjacency lists. The queue touches each vertex once and each edge once, then retires them.',
  },
  {
    title: 'Branching factor reality',
    detail:
      'In an implicit tree of branching factor b and depth d, visited nodes scale like b^d. BFS is memory-heavy when b is large, so shallow searches are its sweet spot.',
  },
  {
    title: 'Adjacency representation',
    detail:
      'Adjacency lists keep BFS at O(V + E); adjacency matrices push to O(V^2) regardless of sparsity, often a cache and memory liability.',
  },
  {
    title: 'Latency vs. throughput',
    detail:
      'Level-synchronous BFS has clear barriers: process frontier, build next. In parallel settings, frontier compaction and work-stealing determine throughput more than big-O.',
  },
]

const realWorldUses = [
  {
    context: 'Web crawling and link analysis',
    detail:
      'Search engines perform BFS from seed URLs to ensure breadth coverage and bounded depth, balancing freshness with crawl politeness.',
  },
  {
    context: 'Routing protocols and broadcast storms',
    detail:
      'Distance-vector and link-state protocols effectively propagate reachability in BFS waves; TTL-limited flooding mimics bounded-level BFS to avoid network meltdowns.',
  },
  {
    context: 'Social graphs',
    detail:
      'Shortest hop queries (friend-of-friend recommendations, graph distances) rely on BFS or bidirectional BFS to keep latency low on dense networks.',
  },
  {
    context: 'Grid navigation and robotics',
    detail:
      'Maze solvers, warehouse robots, and path planners on uniform grids use BFS to guarantee minimum-step paths before handing off to weighted planners when costs differ.',
  },
  {
    context: 'Puzzles and games',
    detail:
      "Rubik's Cube pattern databases, word ladders, and chess endgame tablebases use BFS to enumerate states in concentric layers and prove optimal move counts.",
  },
]

const examples = [
  {
    title: 'Classic single-source BFS',
    code: `function bfs(graph, start):
    queue = new Queue()
    queue.enqueue(start)
    dist = { start: 0 }
    parent = { start: null }

    while queue is not empty:
        node = queue.dequeue()
        for each neighbor in graph.neighbors(node):
            if neighbor not in dist:
                dist[neighbor] = dist[node] + 1
                parent[neighbor] = node
                queue.enqueue(neighbor)

    return { dist, parent }`,
    explanation:
      'Distance is recorded at enqueue time, so the first assignment to a node is optimal. Parent pointers let you backtrack to rebuild the shortest path.',
  },
  {
    title: 'Multi-source BFS for nearest facility',
    code: `function nearestWarehouse(graph, warehouses):
    queue = new Queue()
    dist = {}
    sourceOf = {}

    for w in warehouses:
        queue.enqueue(w)
        dist[w] = 0
        sourceOf[w] = w

    while queue not empty:
        node = queue.dequeue()
        for n in graph.neighbors(node):
            if n not in dist:
                dist[n] = dist[node] + 1
                sourceOf[n] = sourceOf[node]
                queue.enqueue(n)

    return { dist, sourceOf }`,
    explanation:
      'Seeding all warehouses at distance 0 fills the world with expanding circles. Every customer inherits the nearest warehouse and distance in a single pass.',
  },
  {
    title: '0-1 BFS with deque',
    code: `function zeroOneBFS(graph, start):
    deque = new Deque()
    deque.push_front(start)
    dist = { start: 0 }

    while deque not empty:
        node = deque.pop_front()
        for (neighbor, weight) in graph.edges(node):
            newDist = dist[node] + weight
            if weight not in {0, 1}: error
            if neighbor not in dist or newDist < dist[neighbor]:
                dist[neighbor] = newDist
                if weight == 0:
                    deque.push_front(neighbor)
                else:
                    deque.push_back(neighbor)

    return dist`,
    explanation:
      'Zero-cost edges stay on the current frontier; one-cost edges move to the back. The deque preserves Dijkstra-like optimality with O(V + E) work.',
  },
]

const pitfalls = [
  'Marking visited only on dequeue causes duplicate enqueues, blowing up memory and work.',
  'Using BFS on weighted graphs without adapting (Dijkstra, 0-1 BFS) yields incorrect shortest paths.',
  'Storing adjacency in dense matrices for sparse graphs increases memory and kills cache performance.',
  'Forgetting to track parents makes path reconstruction expensive or impossible after the fact.',
  'Large branching factors make naive BFS infeasible; prune states or switch to informed search to control explosion.',
]

const decisionGuidance = [
  'Need the fewest hops in an unweighted or unit-weight graph: use BFS.',
  'Need the cheapest path with positive weights: use Dijkstra; if weights are 0 or 1, use 0-1 BFS.',
  'Need reachability or component checks: BFS or DFS both work; choose BFS when level ordering is useful.',
  'Need shallow optimal solutions in huge branching spaces: prefer bidirectional BFS when start and goal are both known.',
  'Need any path but have tight memory: favor DFS or iterative deepening; BFS may exhaust RAM.',
]

const advancedInsights = [
  {
    title: 'Bidirectional BFS math',
    detail:
      'On branching factor b and depth d, forward BFS explores O(b^d); meeting in the middle explores roughly O(b^(d/2)) twice, often a dramatic cut on social or road graphs.',
  },
  {
    title: 'Frontier compression',
    detail:
      'Bitsets and Bloom filters shrink visited sets; compressed sparse row layouts and cache-aware ordering make traversal bandwidth-bound instead of latency-bound.',
  },
  {
    title: 'External and streamed BFS',
    detail:
      'Out-of-core BFS batches frontiers to disk to handle billion-edge graphs; in stream processing, level-by-level windows mirror BFS to control memory.',
  },
  {
    title: 'Bipartite testing via BFS',
    detail:
      'Coloring nodes by parity of distance catches odd cycles on the fly. If two neighbors demand the same color, the graph is not bipartite.',
  },
  {
    title: 'Heuristic overlays',
    detail:
      'Layering A* heuristics on top of BFS ordering narrows expansion; jump-point search on grids prunes symmetric branches without losing optimality.',
  },
]

const takeaways = [
  'BFS is about orderly expansion: first discovery is optimal when every edge costs the same.',
  'Queues and early visited marking preserve the guarantee; relax them and you lose optimality.',
  'Memory, not time, is usually the limiting factor; manage branching and representation to stay within budget.',
  'Variants like multi-source, bidirectional, and 0-1 BFS carry the same spirit to wider problem classes.',
]

export default function BreadthFirstSearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Breadth-First Search</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Shortest paths, level structure, and disciplined frontier expansion</div>
              <p className="win95-text">
                Breadth-first search explores evenly, like ripples moving outward. It guarantees minimum-edge paths in unweighted graphs,
                builds distance layers that power bipartite checks, and forms the backbone of crawling, routing, and puzzle solving.
                Understanding its mechanics, constraints, and variants turns a simple queue into a reliable workhorse for graph problems.
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
                BFS answers: what is the fewest steps to reach each node when every move costs the same? By expanding in perfect layers,
                it produces optimal hop counts, natural parent pointers for reconstruction, and a timeline of the graph in distance order.
                The catch is memory: level-wide frontiers can balloon, so engineering the representation matters as much as the algorithm.
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
            <legend>How it works: mechanics in motion</legend>
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
                Rule of thumb: BFS time usually matches graph size; memory is the constraint. Choose adjacency lists, compress frontiers,
                and prune branching to keep layers tractable.
              </p>
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

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel win95-panel--raised">
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
