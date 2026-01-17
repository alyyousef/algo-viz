import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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

const problemPatterns = [
  {
    title: 'Shortest hop paths',
    detail:
      'When every edge has equal cost, BFS gives the exact shortest path in number of edges.',
  },
  {
    title: 'Level-based properties',
    detail:
      'Layered expansion supports bipartite checks, distance labels, and k-step neighborhoods.',
  },
  {
    title: 'Reachability and components',
    detail:
      'BFS can discover all nodes reachable from a source and can be repeated to find components.',
  },
  {
    title: 'Grid or maze navigation',
    detail:
      'Uniform-cost movement on grids makes BFS a reliable baseline before weighted planners.',
  },
  {
    title: 'Not for weighted graphs',
    detail:
      'If edges have different costs, BFS is not optimal; use Dijkstra or 0-1 BFS.',
  },
]

const loopInvariants = [
  {
    title: 'Distance invariant',
    detail:
      'When a node is dequeued, its distance equals the shortest possible number of edges from the source.',
  },
  {
    title: 'Queue order invariant',
    detail:
      'Nodes in the queue are ordered by nondecreasing distance, so earlier nodes cannot be farther than later nodes.',
  },
  {
    title: 'Visited invariant',
    detail:
      'A node is enqueued at most once; the first time it is discovered, the recorded parent yields a shortest path.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: 'Graph: A-B, A-C, B-D, C-D, D-E; start = A',
    note: 'Initialize queue with A at distance 0.',
  },
  {
    step: 'Layer 1',
    state: 'Dequeue A -> enqueue B, C (dist 1)',
    note: 'Frontier now holds all nodes at distance 1.',
  },
  {
    step: 'Layer 2',
    state: 'Dequeue B -> enqueue D (dist 2); dequeue C -> D already visited',
    note: 'Visited-on-enqueue prevents duplicate work.',
  },
  {
    step: 'Layer 3',
    state: 'Dequeue D -> enqueue E (dist 3)',
    note: 'First time E is seen is the shortest hop count.',
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

const inputSensitivity = [
  {
    title: 'High branching factor',
    detail:
      'Frontiers explode quickly. Memory becomes the limiting factor well before time.',
  },
  {
    title: 'Sparse vs dense graphs',
    detail:
      'Sparse graphs benefit from adjacency lists; dense graphs can make BFS close to O(V^2).',
  },
  {
    title: 'Disconnected graphs',
    detail:
      'Single-source BFS only reaches the connected component of the start; remaining nodes are unreachable.',
  },
  {
    title: 'Weighted edges',
    detail:
      'BFS assumptions break if edge weights differ; shortest paths become incorrect.',
  },
]

const performanceProfile = [
  {
    title: 'Memory footprint',
    detail:
      'Visited arrays, parent pointers, and large frontiers dominate memory usage.',
  },
  {
    title: 'Queue behavior',
    detail:
      'A fast queue implementation avoids overhead; array-based queues are common in practice.',
  },
  {
    title: 'Cache locality',
    detail:
      'Neighbor scans are sequential, but random access to adjacency lists can limit cache efficiency.',
  },
  {
    title: 'Early exit',
    detail:
      'If searching for a target, stop at first dequeue or first discovery to cut work.',
  },
]

const comparisonTable = [
  {
    algorithm: 'BFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Unweighted shortest paths',
    notes: 'Optimal in hops, memory heavy.',
  },
  {
    algorithm: 'DFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Reachability, topological structure',
    notes: 'Lower memory in practice, but no shortest path guarantee.',
  },
  {
    algorithm: 'Dijkstra',
    time: 'O((V + E) log V)',
    space: 'O(V)',
    bestFor: 'Positive weights',
    notes: 'Uses a priority queue for weighted shortest paths.',
  },
  {
    algorithm: '0-1 BFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Weights 0 or 1',
    notes: 'Deque-based and faster than Dijkstra in this case.',
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

const variantsAndTweaks = [
  {
    title: 'Multi-source BFS',
    detail:
      'Seed the queue with multiple sources to compute nearest-source labels and distances in one pass.',
  },
  {
    title: 'Bidirectional BFS',
    detail:
      'Search from start and goal simultaneously; meet in the middle to reduce explored states.',
  },
  {
    title: '0-1 BFS',
    detail:
      'Use a deque to handle edges with weights 0 or 1 in linear time.',
  },
  {
    title: 'Level-by-level BFS',
    detail:
      'Track frontier sizes to process explicit layers and handle fixed-depth constraints.',
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
  {
    title: 'Reconstructing a shortest path',
    code: `function buildPath(parent, target):
    path = []
    node = target
    while node is not null:
        path.push(node)
        node = parent[node]
    return reverse(path)`,
    explanation:
      'Parent pointers from BFS let you reconstruct the exact shortest path without another search.',
  },
]

const pitfalls = [
  'Marking visited only on dequeue causes duplicate enqueues, blowing up memory and work.',
  'Using BFS on weighted graphs without adapting (Dijkstra, 0-1 BFS) yields incorrect shortest paths.',
  'Storing adjacency in dense matrices for sparse graphs increases memory and kills cache performance.',
  'Forgetting to track parents makes path reconstruction expensive or impossible after the fact.',
  'Large branching factors make naive BFS infeasible; prune states or switch to informed search to control explosion.',
  'Assuming BFS finds shortest paths when edges differ in cost or have negative weights.',
]

const decisionGuidance = [
  'Need the fewest hops in an unweighted or unit-weight graph: use BFS.',
  'Need the cheapest path with positive weights: use Dijkstra; if weights are 0 or 1, use 0-1 BFS.',
  'Need reachability or component checks: BFS or DFS both work; choose BFS when level ordering is useful.',
  'Need shallow optimal solutions in huge branching spaces: prefer bidirectional BFS when start and goal are both known.',
  'Need any path but have tight memory: favor DFS or iterative deepening; BFS may exhaust RAM.',
]

const implementationTips = [
  {
    title: 'Mark visited at enqueue time',
    detail:
      'This avoids duplicate work and preserves the shortest-path guarantee.',
  },
  {
    title: 'Use array-based queues',
    detail:
      'Simple arrays with head/tail indices are faster than shift-based queues.',
  },
  {
    title: 'Keep parent pointers',
    detail:
      'Parents make shortest path reconstruction cheap and deterministic.',
  },
  {
    title: 'Stop early when possible',
    detail:
      'If you only need a single target, terminate at first discovery or dequeue.',
  },
  {
    title: 'Choose adjacency lists',
    detail:
      'They preserve O(V + E) performance on sparse graphs.',
  },
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
  'References: Moore 1959, Lee routing, CLRS graph chapter, and Graph500 BFS benchmarks.',
]

export default function BreadthFirstSearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Breadth-First Search</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
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
            <legend>How to think about similar problems</legend>
            <div className="win95-grid win95-grid-3">
              {problemPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Loop invariants (why it is correct)</legend>
            <div className="win95-grid win95-grid-3">
              {loopInvariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked trace on a tiny graph</legend>
            <div className="win95-stack">
              {stepTrace.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <pre className="win95-code">
                    <code>{item.state}</code>
                  </pre>
                  <p className="win95-text">{item.note}</p>
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
            <legend>Input sensitivity</legend>
            <div className="win95-grid win95-grid-2">
              {inputSensitivity.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance profile</legend>
            <div className="win95-grid win95-grid-2">
              {performanceProfile.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and contrast</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Best for</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.algorithm}>
                      <td>{row.algorithm}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.bestFor}</td>
                      <td>{row.notes}</td>
                    </tr>
                  ))}
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
            <legend>Variants and performance tweaks</legend>
            <div className="win95-grid win95-grid-2">
              {variantsAndTweaks.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
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
            <legend>Implementation tips</legend>
            <div className="win95-grid win95-grid-2">
              {implementationTips.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
