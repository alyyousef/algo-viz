import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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
    <TopicLayout
      title="Graphs"
      subtitle="Networks that turn relationships into paths, flows, and influence"
      intro="Graphs generalize trees by allowing cycles, multiple paths, and weighted relationships. That flexibility lets us model roads, dependencies, friendships, power grids, and computation graphs. This page explores the history, mechanics, complexity, and engineering judgment needed to work confidently with graph structures."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          A graph is a set of vertices plus edges that encode relationships. Edges can be directed or undirected, weighted or
          unweighted, parallel or unique. Because graphs allow cycles and multiple routes, they capture the richness of real
          systems that trees cannot: detours on roads, alternative dependencies, and feedback loops in control systems. The core
          task in graph algorithms is taming that richness, finding paths, orders, clusters, or flows without getting lost in the
          combinatorial explosion.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMoments.map((item) => (
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

      <TopicSection heading="How it works: representations, traversal, optimization">
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
        <p className="mt-3 text-sm text-white/70">
          Choose representations that match sparsity. Choose traversals that match objectives. The right pairing turns an
          intractable search into a linear or near-linear pass.
        </p>
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
          Asymptotic bounds mask hardware realities. For large graphs, memory traffic dwarfs arithmetic. Cache-friendly layouts,
          batching, and parallel traversals matter as much as algorithmic complexity, especially in production engines like
          routing or stream processors.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorld.map((item) => (
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
        <p className="mt-3 text-sm text-white/70">
          Further reading: CLRS and Kleinberg-Tardos for fundamentals, Tarjan and Dijkstra original papers for algorithm design,
          GeeksforGeeks and LeetCode for practice patterns, and Tim Roughgarden's Algorithms Illuminated for intuition with proofs.
        </p>
      </TopicSection>
    </TopicLayout>
  )
}
