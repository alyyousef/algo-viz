import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Otakar Boruvka electrifies Moravia (1926)',
    detail:
      'Boruvka devised a greedy edge-picking procedure to minimize the cost of rural power networks, introducing one of the earliest MST algorithms.',
  },
  {
    title: 'Kruskal and Prim formalize greedy spanning (1956-1957)',
    detail:
      'Joseph Kruskal proposed sorting edges by weight and building a forest; Robert Prim showed how to grow a tree outward with a priority queue.',
  },
  {
    title: 'Dijkstra generalizes Prim (1959)',
    detail:
      'Edsger Dijkstra independently described the same tree-growing method as Prim, tying it to his shortest-path framework and popularizing heap-based implementations.',
  },
  {
    title: 'Union-Find proves its worth (1964-1973)',
    detail:
      'Tarjan and colleagues analyzed disjoint sets with near-constant amortized operations, making Kruskal blazingly fast for sparse graphs.',
  },
  {
    title: 'Parallel and dynamic MSTs emerge (1980s-2010s)',
    detail:
      'Shiloach-Vishkin, Karger-Klein-Tarjan, and later dynamic algorithms allowed MST maintenance under edge updates and parallel hardware.',
  },
]

const mentalModels = [
  {
    title: 'Cheapest backbone',
    detail:
      'An MST is the lean skeleton that keeps every vertex connected with minimal total weight. Any extra edge is a muscle you can trim without breaking connectivity.',
  },
  {
    title: 'Cycle breaker',
    detail:
      'Within any cycle, the heaviest edge is never needed in a minimum spanning tree. Removing it is like dropping the priciest plank from a closed loop.',
  },
  {
    title: 'Growing coral',
    detail:
      'Prim grows a coral reef from a seed, always attaching the lightest nearby branch. Kruskal grows many tiny corals that fuse when a cheap bridge appears.',
  },
  {
    title: 'Global versus local cheapest edge',
    detail:
      'Kruskal picks the globally cheapest eligible edge; Boruvka lets every component pick its local cheapest edge simultaneously, a pattern that parallelizes well.',
  },
]

const mechanics = [
  {
    heading: 'Kruskal: sort then union',
    bullets: [
      'Sort all edges by non-decreasing weight.',
      'Initialize each vertex as its own component (Union-Find).',
      'Scan edges in order; add an edge if its endpoints are in different components, then union them.',
      'Stop after adding V - 1 edges or when all vertices share one component.',
    ],
  },
  {
    heading: 'Prim/Dijkstra style: grow a tree',
    bullets: [
      'Pick any start vertex; push its incident edges into a min-priority queue keyed by weight.',
      'Repeatedly extract the lightest edge that leads to an unvisited vertex; add that vertex and its outgoing edges to the queue.',
      'Continue until all vertices are visited; the chosen edges form the MST.',
      'Binary heap gives O((V + E) log V); Fibonacci or pairing heaps can lower the decrease-key cost on dense graphs.',
    ],
  },
  {
    heading: 'Boruvka: rounds of local minima',
    bullets: [
      'For each component, pick its cheapest outgoing edge and add them all at once.',
      'Components merge in batches, shrinking the graph quickly; repeat rounds until one component remains.',
      'Parallel-friendly because each component chooses independently within a round.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Cheapest connectivity',
    detail:
      'When the goal is to keep everything connected at minimum total cost, MSTs are the right abstraction.',
  },
  {
    title: 'Backbone before redundancy',
    detail:
      'Start with an MST as a baseline, then add extra edges for fault tolerance and capacity.',
  },
  {
    title: 'Clustering by cutting edges',
    detail:
      'Removing the heaviest edges of an MST yields single-linkage clusters and hierarchical structure.',
  },
  {
    title: 'Similarity graphs',
    detail:
      'MSTs capture the most economical connections in similarity graphs for segmentation or feature grouping.',
  },
  {
    title: 'Not for shortest paths',
    detail:
      'MSTs minimize total weight of a connecting tree, not the cost between any particular pair of nodes.',
  },
]

const loopInvariants = [
  {
    title: 'Cut property invariant',
    detail:
      'The lightest edge crossing any cut that separates the current tree from the rest is always safe to add.',
  },
  {
    title: 'Cycle property invariant',
    detail:
      'Within any cycle, the heaviest edge is never required in an MST.',
  },
  {
    title: 'Forest invariant (Kruskal)',
    detail:
      'At every step, the selected edges form a forest of components that can be extended to some MST.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: 'Edges sorted: (A-B 1), (B-C 2), (A-C 3), (C-D 4)',
    note: 'Kruskal will pick edges in ascending order if they do not form cycles.',
  },
  {
    step: 'Pick A-B (1)',
    state: 'Forest: {A-B} | {C} | {D}',
    note: 'No cycle, so include the edge.',
  },
  {
    step: 'Pick B-C (2)',
    state: 'Forest: {A-B-C} | {D}',
    note: 'Still no cycle, merge components.',
  },
  {
    step: 'Skip A-C (3)',
    state: 'Would form cycle A-B-C-A',
    note: 'Cycle property says the heaviest edge in a cycle is never needed.',
  },
  {
    step: 'Pick C-D (4)',
    state: 'MST complete with 3 edges',
    note: 'We now have V - 1 edges, so the MST is complete.',
  },
]

const complexityNotes = [
  {
    title: 'Kruskal cost profile',
    detail:
      'Sorting dominates: O(E log E) time with Union-Find nearly constant. With integer weights and buckets, it approaches O(E). Memory is O(V + E).',
  },
  {
    title: 'Prim variants',
    detail:
      'With a binary heap and adjacency lists: O((V + E) log V). With a Fibonacci heap: O(E + V log V). With a simple array: O(V^2), acceptable for dense graphs.',
  },
  {
    title: 'Boruvka behavior',
    detail:
      'Each round halves the number of components in expectation; total time is O(E log V) with straightforward structures, often faster in practice on parallel hardware.',
  },
  {
    title: 'Edge cases',
    detail:
      'Disconnected graphs yield a minimum spanning forest. Duplicate edge weights are fine; any MST of minimum total weight is valid.',
  },
]

const inputSensitivity = [
  {
    title: 'Disconnected graphs',
    detail:
      'Algorithms return a minimum spanning forest, one MST per connected component.',
  },
  {
    title: 'Duplicate weights',
    detail:
      'Multiple valid MSTs can exist; do not assume uniqueness in tests.',
  },
  {
    title: 'Dense graphs',
    detail:
      'Prim with an array-based priority queue can be competitive due to O(V^2) scanning.',
  },
  {
    title: 'Sparse graphs',
    detail:
      'Kruskal with Union-Find tends to be fastest because edge sorting dominates.',
  },
]

const performanceProfile = [
  {
    title: 'Sorting cost',
    detail:
      'Kruskal spends most time sorting; for large E, sorting dominates everything else.',
  },
  {
    title: 'Union-Find efficiency',
    detail:
      'Path compression and union by rank make merges nearly constant amortized.',
  },
  {
    title: 'Priority queue overhead',
    detail:
      'Prim depends on heap operations; decrease-key efficiency can matter in dense graphs.',
  },
  {
    title: 'Parallel friendliness',
    detail:
      'Boruvka is easy to parallelize by letting each component choose its cheapest edge in a round.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Kruskal',
    time: 'O(E log E)',
    space: 'O(V + E)',
    bestFor: 'Sparse graphs with edge list',
    notes: 'Simple with Union-Find, easy to implement.',
  },
  {
    algorithm: 'Prim',
    time: 'O((V + E) log V)',
    space: 'O(V + E)',
    bestFor: 'Dense graphs or adjacency lists',
    notes: 'Grows a single tree from a start node.',
  },
  {
    algorithm: 'Boruvka',
    time: 'O(E log V)',
    space: 'O(V + E)',
    bestFor: 'Parallel or distributed settings',
    notes: 'Merges components in rounds.',
  },
  {
    algorithm: 'Prim (array)',
    time: 'O(V^2)',
    space: 'O(V^2)',
    bestFor: 'Very dense graphs',
    notes: 'No heap; simpler but heavy memory.',
  },
]

const realWorldUses = [
  {
    context: 'Network design',
    detail:
      'Telecom, fiber, and power grids use MSTs to plan cheapest backbone deployments before layering redundancy and capacity upgrades.',
  },
  {
    context: 'Approximation schemes',
    detail:
      'Metric traveling salesperson approximations (e.g., doubling tree tours) start from an MST to bound total tour cost.',
  },
  {
    context: 'Image segmentation',
    detail:
      'Minimum spanning forests over pixel similarity graphs underpin algorithms like Felzenszwalb-Huttenlocher for grouping coherent regions.',
  },
  {
    context: 'Clustering',
    detail:
      'Single-linkage hierarchical clustering cuts the longest edges of an MST to form clusters, revealing chaining structure in data.',
  },
  {
    context: 'Infrastructure audits',
    detail:
      'MSTs provide a cost baseline; edges outside the MST indicate redundancies that can be pruned or justified for reliability.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Reverse-delete algorithm',
    detail:
      'Sort edges by descending weight and remove them if the graph stays connected; illustrates the cycle property.',
  },
  {
    title: 'Randomized MST',
    detail:
      'Karger-Klein-Tarjan uses random sampling to reduce edges before building the MST, improving performance on huge graphs.',
  },
  {
    title: 'Hybrid Boruvka + Prim',
    detail:
      'Use Boruvka rounds to shrink components, then Prim to finish quickly on the contracted graph.',
  },
  {
    title: 'Dynamic MST',
    detail:
      'Maintain an MST under edge insertions/deletions with link-cut or Euler tour trees.',
  },
]

const examples = [
  {
    title: 'Kruskal with Union-Find',
    code: `function kruskal(vertices, edges):
    // edges: list of (u, v, w)
    sort edges by w ascending
    uf = new UnionFind(vertices)
    mst = []

    for (u, v, w) in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            mst.append((u, v, w))
        if len(mst) == len(vertices) - 1:
            break

    return mst`,
    explanation:
      'Sorting once and doing near-constant Union-Find operations keeps Kruskal lean. Early exit after V - 1 edges avoids needless scans in dense graphs.',
  },
  {
    title: 'Prim with a min-heap',
    code: `function prim(graph, start):
    visited = set()
    mst = []
    pq = new MinHeap() // entries: (w, u, v) where v is outside the tree

    visited.add(start)
    for (v, w) in graph.neighbors(start):
        pq.push((w, start, v))

    while pq not empty and len(visited) < graph.size():
        (w, u, v) = pq.pop_min()
        if v in visited:
            continue
        visited.add(v)
        mst.append((u, v, w))
        for (nxt, wt) in graph.neighbors(v):
            if nxt not in visited:
                pq.push((wt, v, nxt))

    return mst`,
    explanation:
      'The heap always surfaces the cheapest edge crossing the cut between the tree and the remaining vertices, satisfying the cut property that keeps the tree minimal.',
  },
  {
    title: 'Boruvka rounds',
    code: `function boruvka(graph):
    uf = new UnionFind(graph.vertices)
    mst = []

    while uf.component_count() > 1:
        cheapest = map from component -> (u, v, w) default null
        for (u, v, w) in graph.edges:
            cu = uf.find(u); cv = uf.find(v)
            if cu == cv:
                continue
            if cheapest[cu] is null or w < cheapest[cu].w:
                cheapest[cu] = (u, v, w)
            if cheapest[cv] is null or w < cheapest[cv].w:
                cheapest[cv] = (u, v, w)
        for edge in cheapest.values():
            if edge is null:
                continue
            (u, v, w) = edge
            if uf.find(u) != uf.find(v):
                uf.union(u, v)
                mst.append(edge)

    return mst`,
    explanation:
      'Each component grabs its cheapest outgoing edge. Parallelizing the per-edge scan and per-component choice makes Boruvka attractive on large hardware.',
  },
  {
    title: 'Reverse-delete algorithm',
    code: `function reverseDelete(vertices, edges):
    sort edges by w descending
    graph = buildGraph(vertices, edges)

    for (u, v, w) in edges:
        graph.removeEdge(u, v)
        if not graph.isConnected(u, v):
            graph.addEdge(u, v, w)

    return graph.edges`,
    explanation:
      'Reverse-delete removes heavy edges that are not needed to keep connectivity, illustrating the cycle property in action.',
  },
]

const pitfalls = [
  'Feeding negative cycles into MST algorithms is fine; weights can be negative, but remember MST optimizes total weight, not shortest paths.',
  'Using an adjacency matrix with Kruskal wastes memory and time on sparse graphs; store edges explicitly.',
  'Forgetting early exit in Kruskal on dense graphs does unnecessary work after the tree is already complete.',
  'Implementing Prim without a visited check can add duplicate vertices and corrupt the tree.',
  'Assuming a unique MST when edge weights tie can cause brittle tests; multiple valid MSTs may exist.',
  'Confusing MST with shortest path trees; MST does not minimize pairwise distances.',
]

const decisionGuidance = [
  'Sparse graph with many edges already listed: use Kruskal with Union-Find.',
  'Dense graph or implicit adjacency lists: use Prim with a heap (or array for very dense, moderate-sized graphs).',
  'Small integer edge weights: consider bucketed Kruskal or a bucketed Prim variant.',
  'Need parallelism: Boruvka or hybrid Boruvka + Prim often scales better.',
  'Graph is disconnected: run the same algorithm; result is a minimum spanning forest.',
]

const implementationTips = [
  {
    title: 'Sort once, scan once',
    detail:
      'Kruskal can stop after V - 1 edges, which saves time on dense graphs.',
  },
  {
    title: 'Use Union-Find with path compression',
    detail:
      'It keeps find/union operations nearly constant amortized.',
  },
  {
    title: 'Track visited vertices in Prim',
    detail:
      'It prevents cycles and ensures the tree only grows outward.',
  },
  {
    title: 'Keep edges compact',
    detail:
      'Store edges in a flat list to improve sorting and cache locality.',
  },
  {
    title: 'Handle duplicates in tests',
    detail:
      'If weights tie, multiple MSTs are valid; compare total weight instead of exact edges.',
  },
]

const advancedInsights = [
  {
    title: 'Cut and cycle properties',
    detail:
      'Cut property: the lightest edge crossing any cut of the graph is safe to include. Cycle property: the heaviest edge in any cycle is unsafe. Both justify greedy steps.',
  },
  {
    title: 'Hybrid strategies',
    detail:
      'Boruvka rounds shrink components quickly, then Prim finishes on the contracted graph, combining fast convergence with low overhead.',
  },
  {
    title: 'Dynamic MST maintenance',
    detail:
      'Link-cut trees, Euler tour trees, and dynamic trees support edge insertions and deletions while maintaining an MST in polylogarithmic time per update.',
  },
  {
    title: 'Sensitivity analysis',
    detail:
      'Replacing one edge in the MST with a non-tree edge forms a cycle; swapping the heaviest edge on that cycle tests how cost changes under perturbations.',
  },
  {
    title: 'Parallel and external memory',
    detail:
      'PRAM-friendly Boruvka variants and external-memory MSTs reduce I/O or synchronize rounds to traverse billion-edge graphs efficiently.',
  },
]

const takeaways = [
  'Minimum spanning trees give the cheapest way to stay connected; they are backbones, not routes.',
  'Greedy stays safe because of cut and cycle properties; every chosen edge is locally optimal yet globally consistent.',
  'Choose Kruskal for edge-sorted workflows, Prim for adjacency-driven growth, and Boruvka or hybrids when parallelism or contraction speed matters.',
  'Union-Find and good priority queues turn the theory into practical, near-linear implementations on sparse graphs.',
  'References: Boruvka 1926, Kruskal 1956, Prim 1957, and CLRS MST chapter.',
]

export default function MinimumSpanningTreePage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Minimum Spanning Tree</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Cheapest backbone through greedy cuts</div>
              <p className="win95-text">
                A minimum spanning tree keeps every vertex connected with the smallest possible total weight. The secret is the cut and
                cycle properties: pick the lightest edge that crosses a frontier, or drop the heaviest edge in a cycle, and you never hurt
                optimality. Kruskal, Prim, and Boruvka are greedy by design, but their guardrails make the greed safe.
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
                MSTs strip a weighted graph to its essential scaffold: no cycles, exactly V - 1 edges, and minimum cost to keep the
                graph connected. They are perfect for designing cheap infrastructure, benchmarking redundancy, and seeding approximation
                algorithms that need a low-cost baseline.
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
                In practice, sorting edges plus fast Union-Find often dominates. On dense graphs, Prim with a heap can edge ahead by
                avoiding a full sort. When weights are small integers, bucketed approaches remove the log factors entirely.
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
