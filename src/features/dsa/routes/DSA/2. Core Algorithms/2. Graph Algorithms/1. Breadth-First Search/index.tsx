import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

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

const glossary = [
  { term: 'Breadth-First Search (BFS)', definition: 'A traversal that explores a graph level-by-level using a queue.' },
  { term: 'Frontier', definition: 'The current boundary of discovered nodes waiting to be processed.' },
  { term: 'Level', definition: 'All nodes at the same shortest-hop distance from the source.' },
  { term: 'Visited-on-enqueue', definition: 'Marking a node as visited when enqueued to avoid duplicate insertion.' },
  { term: 'Parent pointer', definition: 'A predecessor record used to reconstruct shortest paths.' },
  { term: 'Multi-source BFS', definition: 'A BFS seeded by multiple starts to compute nearest-source distances in one pass.' },
  { term: 'Bidirectional BFS', definition: 'Two BFS waves (source and target) that meet in the middle.' },
  { term: '0-1 BFS', definition: 'Deque-based BFS for graphs with edge weights only 0 or 1.' },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mechanics', label: 'Mechanics' },
    { id: 'core-patterns', label: 'Problem Patterns' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-sensitivity', label: 'Input Sensitivity' },
    { id: 'core-profile', label: 'Performance Profile' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-uses', label: 'Real-World Uses' },
    { id: 'core-variants', label: 'Variants and Tweaks' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-tips', label: 'Implementation Tips' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-trace', label: 'Worked Trace' },
    { id: 'ex-code', label: 'Practical Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const bfs98Styles = `
.bfs98-page{min-height:100dvh;background:#c0c0c0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif}
.bfs98-window{width:100%;min-height:100dvh;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040;box-sizing:border-box;display:flex;flex-direction:column}
.bfs98-titlebar{position:relative;display:flex;align-items:center;padding:2px 4px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700}
.bfs98-title{position:absolute;left:50%;transform:translateX(-50%);font-size:16px}
.bfs98-title-controls{display:flex;gap:2px;margin-left:auto}
.bfs98-control{width:18px;height:16px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font-size:11px;line-height:1}
.bfs98-tabs{display:flex;gap:1px;padding:6px 8px 0}
.bfs98-tab{border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;padding:5px 10px 4px;font-size:12px;cursor:pointer}
.bfs98-tab.active{background:#fff;position:relative;top:1px}
.bfs98-main{border-top:1px solid #404040;background:#fff;flex:1;min-height:0;display:grid;grid-template-columns:240px 1fr}
.bfs98-toc{border-right:1px solid #808080;background:#f2f2f2;padding:12px;overflow:auto}
.bfs98-toc-title{margin:0 0 10px;font-size:12px;font-weight:700}
.bfs98-toc-list{list-style:none;margin:0;padding:0}
.bfs98-toc-list li{margin:0 0 8px}
.bfs98-toc-list a{color:#000;text-decoration:none;font-size:12px}
.bfs98-content{padding:14px 20px 20px;overflow:auto}
.bfs98-doc-title{margin:0 0 12px;font-size:20px;font-weight:700}
.bfs98-section{margin:0 0 20px}
.bfs98-heading{margin:0 0 8px;font-size:16px;font-weight:700}
.bfs98-subheading{margin:0 0 6px;font-size:13px;font-weight:700}
.bfs98-content p,.bfs98-content li,.bfs98-content td,.bfs98-content th{font-size:12px;line-height:1.5}
.bfs98-content p{margin:0 0 10px}
.bfs98-content ul,.bfs98-content ol{margin:0 0 10px 20px;padding:0}
.bfs98-divider{border:0;border-top:1px solid #d0d0d0;margin:14px 0}
.bfs98-table{width:100%;border-collapse:collapse;margin:0 0 10px}
.bfs98-table th,.bfs98-table td{border:1px solid #a0a0a0;padding:4px 6px;text-align:left;vertical-align:top}
.bfs98-state{font-family:"Courier New",Courier,monospace}
.bfs98-codebox{background:#f4f4f4;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff;padding:8px;margin:6px 0 10px}
.bfs98-codebox code{display:block;white-space:pre;font-family:"Courier New",Courier,monospace;font-size:12px}
@media (max-width:900px){.bfs98-main{grid-template-columns:1fr}.bfs98-toc{border-right:none;border-bottom:1px solid #808080}}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function BreadthFirstSearchPage(): JSX.Element {
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
    document.title = `Breadth-First Search (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="bfs98-page">
      <style>{bfs98Styles}</style>
      <div className="bfs98-window" role="presentation">
        <header className="bfs98-titlebar">
          <span className="bfs98-title">Breadth-First Search</span>
          <div className="bfs98-title-controls">
            <button className="bfs98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="bfs98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="bfs98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`bfs98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bfs98-main">
          <aside className="bfs98-toc" aria-label="Table of contents">
            <h2 className="bfs98-toc-title">Contents</h2>
            <ul className="bfs98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="bfs98-content">
            <h1 className="bfs98-doc-title">Breadth-First Search</h1>
            <p>
              Breadth-first search explores evenly, like ripples moving outward. It guarantees minimum-edge paths in unweighted graphs,
              builds distance layers that power bipartite checks, and forms the backbone of crawling, routing, and puzzle solving.
              Understanding its mechanics, constraints, and variants turns a simple queue into a reliable workhorse for graph problems.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="bfs98-section">
                  <h2 className="bfs98-heading">Overview</h2>
                  <p>
                    BFS answers: what is the fewest steps to reach each node when every move costs the same? By expanding in perfect layers,
                    it produces optimal hop counts, natural parent pointers for reconstruction, and a timeline of the graph in distance order.
                    The catch is memory: level-wide frontiers can balloon, so engineering the representation matters as much as the algorithm.
                  </p>
                  {problemPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="bfs98-divider" />
                <section id="bp-history" className="bfs98-section">
                  <h2 className="bfs98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-models" className="bfs98-section">
                  <h2 className="bfs98-heading">Mental Models</h2>
                  <p>
                    BFS expands in exact distance order from the source. This level-by-level structure is what guarantees shortest-hop
                    optimality in unweighted graphs.
                  </p>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="bfs98-section">
                  <h2 className="bfs98-heading">Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mechanics" className="bfs98-section">
                  <h2 className="bfs98-heading">Mechanics in Motion</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="bfs98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-patterns" className="bfs98-section">
                  <h2 className="bfs98-heading">How to Think About Similar Problems</h2>
                  {problemPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-invariants" className="bfs98-section">
                  <h2 className="bfs98-heading">Loop Invariants (Why It Is Correct)</h2>
                  {loopInvariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="bfs98-section">
                  <h2 className="bfs98-heading">Complexity Analysis and Performance Intuition</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Rule of thumb: BFS time usually matches graph size; memory is the constraint. Choose adjacency lists, compress frontiers,
                    and prune branching to keep layers tractable.
                  </p>
                </section>
                <section id="core-sensitivity" className="bfs98-section">
                  <h2 className="bfs98-heading">Input Sensitivity</h2>
                  {inputSensitivity.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-profile" className="bfs98-section">
                  <h2 className="bfs98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="bfs98-section">
                  <h2 className="bfs98-heading">Compare and Contrast</h2>
                  <table className="bfs98-table">
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
                </section>
                <section id="core-uses" className="bfs98-section">
                  <h2 className="bfs98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="bfs98-section">
                  <h2 className="bfs98-heading">Variants and Performance Tweaks</h2>
                  {variantsAndTweaks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="bfs98-section">
                  <h2 className="bfs98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-tips" className="bfs98-section">
                  <h2 className="bfs98-heading">Implementation Tips</h2>
                  {implementationTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decisions" className="bfs98-section">
                  <h2 className="bfs98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="bfs98-section">
                  <h2 className="bfs98-heading">Advanced Insights and Current Frontiers</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-trace" className="bfs98-section">
                  <h2 className="bfs98-heading">Worked Trace on a Tiny Graph</h2>
                  <ol>
                    {stepTrace.map((item) => (
                      <li key={item.step}>
                        <p><strong>{item.step}:</strong> {item.note}</p>
                        <p className="bfs98-state">{item.state}</p>
                      </li>
                    ))}
                  </ol>
                </section>
                <section id="ex-code" className="bfs98-section">
                  <h2 className="bfs98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="bfs98-subheading">{example.title}</h3>
                      <div className="bfs98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="bfs98-section">
                <h2 className="bfs98-heading">Glossary</h2>
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
