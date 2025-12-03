import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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
    <TopicLayout
      title="Breadth-First Search"
      subtitle="Shortest paths, level structure, and disciplined frontier expansion"
      intro="Breadth-first search explores evenly, like ripples moving outward. It guarantees minimum-edge paths in unweighted graphs, builds distance layers that power bipartite checks, and forms the backbone of crawling, routing, and puzzle solving. Understanding its mechanics, constraints, and variants turns a simple queue into a reliable workhorse for graph problems."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          BFS answers: what is the fewest steps to reach each node when every move costs the same? By expanding in perfect layers,
          it produces optimal hop counts, natural parent pointers for reconstruction, and a timeline of the graph in distance order.
          The catch is memory: level-wide frontiers can balloon, so engineering the representation matters as much as the algorithm.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMilestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: mechanics in motion">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Rule of thumb: BFS time usually matches graph size; memory is the constraint. Choose adjacency lists, compress frontiers,
          and prune branching to keep layers tractable.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorldUses.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and current frontiers">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
