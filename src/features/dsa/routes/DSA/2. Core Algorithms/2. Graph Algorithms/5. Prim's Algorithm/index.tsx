import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Prim and Dijkstra formalize greedy trees (1957-1959)',
    detail:
      'Prim proposed growing a tree outward by always taking the cheapest crossing edge; Dijkstra independently described the same method while studying shortest paths.',
  },
  {
    title: 'Heap-based implementations mature (1970s-1980s)',
    detail:
      'Priority queues made Prim efficient on sparse graphs, and pairing/Fibonacci heaps shaped asymptotic bounds in theory.',
  },
  {
    title: 'MSTs enter practice at scale (1990s-2010s)',
    detail:
      'Network design and clustering systems used Prim as a backbone algorithm on dense proximity graphs.',
  },
]

const mentalModels = [
  {
    title: 'Growing coral reef',
    detail:
      'Start with a seed node and keep attaching the cheapest edge that touches the reef without creating a cycle.',
  },
  {
    title: 'Cut property in action',
    detail:
      'At any step, the lightest edge crossing the cut between the tree and the rest is always safe to add.',
  },
  {
    title: 'Expanding frontier',
    detail:
      'Think of the current tree as a frontier. Each step selects the cheapest bridge to expand that frontier by one vertex.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Pick an arbitrary start node; mark it visited.',
      'Push all outgoing edges to a min-heap keyed by weight.',
      'Pop the lightest edge; if it reaches an unvisited node, add it to the tree, mark the node visited, and push its outgoing edges.',
      'Repeat until all vertices are visited or the heap empties (disconnected graphs yield a forest).',
    ],
  },
  {
    heading: 'Data structure choices',
    bullets: [
      'Binary heap: O((V + E) log V) with simple code.',
      'Fibonacci/pairing heap: O(E + V log V) in theory, with higher constants.',
      'Array for dense graphs: O(V^2) but often faster when V is small and E is dense.',
    ],
  },
  {
    heading: 'Correctness levers',
    bullets: [
      'Relies on the cut property: minimum crossing edge is always in some MST.',
      'Visited set prevents cycles; heap ensures we always pick the cheapest crossing edge.',
      'Disconnected graphs produce a minimum spanning forest if you reseed after exhaustion.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Cheapest connectivity',
    detail:
      'When the goal is to keep everything connected at minimum total cost, Prim is a direct fit.',
  },
  {
    title: 'Dense proximity graphs',
    detail:
      'On dense graphs (e.g., full distance matrices), Prim with array selection can be competitive.',
  },
  {
    title: 'Single-tree growth',
    detail:
      'If you want a tree that grows from a seed (for visualization or incremental expansion), Prim is natural.',
  },
  {
    title: 'Not for shortest paths',
    detail: 'Prim minimizes total tree weight, not the distance between any specific pair.',
  },
  {
    title: 'Disconnected components',
    detail: 'If the graph is disconnected, rerun Prim from each component to build a forest.',
  },
]

const loopInvariants = [
  {
    title: 'Cut property invariant',
    detail:
      'The lightest edge crossing the cut between visited and unvisited vertices is always safe to add.',
  },
  {
    title: 'Tree invariant',
    detail: 'The selected edges always form a tree (no cycles) over the visited vertices.',
  },
  {
    title: 'Visited invariant',
    detail:
      'Once a vertex is marked visited, it stays in the tree and its best connecting edge is finalized.',
  },
]

const stepTrace = [
  {
    step: 'Initialize',
    state: 'Start at A. Push edges (A-B 1), (A-C 3) into the heap.',
    note: 'Frontier has two candidate edges.',
  },
  {
    step: 'Pick cheapest',
    state: 'Pop (A-B 1). Add B to tree. Push B-D 2, B-C 4.',
    note: 'Tree edges: A-B.',
  },
  {
    step: 'Expand',
    state: 'Pop (B-D 2). Add D to tree. Push D-C 5.',
    note: 'Tree edges: A-B, B-D.',
  },
  {
    step: 'Finish',
    state: 'Pop (A-C 3). Add C. Tree complete with 3 edges.',
    note: 'We now have V - 1 edges, so the MST is complete.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O((V + E) log V) with a binary heap and adjacency lists; O(V^2) with adjacency matrix or array-based selection.',
  },
  {
    title: 'Space',
    detail: 'O(V) for visited and parent; heap holds up to O(E) edges in the worst case.',
  },
  {
    title: 'Practical guidance',
    detail:
      'On dense graphs or small V, the simple array implementation can beat heaps. On sparse large graphs, heaps dominate.',
  },
]

const inputSensitivity = [
  {
    title: 'Dense graphs',
    detail: 'Array-based Prim can be faster than heap-based Prim due to fewer log factors.',
  },
  {
    title: 'Sparse graphs',
    detail: 'Heap-based Prim is faster when edges are much fewer than V^2.',
  },
  {
    title: 'Duplicate weights',
    detail: 'Multiple MSTs may exist; any valid MST is acceptable.',
  },
  {
    title: 'Disconnected inputs',
    detail: 'A single run only covers one component; reseed to build a forest.',
  },
]

const performanceProfile = [
  {
    title: 'Heap overhead',
    detail: 'Most runtime comes from push/pop operations; constant factors matter.',
  },
  {
    title: 'Edge scanning',
    detail:
      'Prim is adjacency-driven; it avoids full edge sorting and is efficient when adjacency access is cheap.',
  },
  {
    title: 'Memory growth',
    detail: 'Heap can contain many candidate edges; prune with visited checks to keep it smaller.',
  },
  {
    title: 'Early termination',
    detail: 'Once V - 1 edges are chosen, the MST is complete and the algorithm can stop.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Prim',
    time: 'O((V + E) log V)',
    space: 'O(V + E)',
    bestFor: 'Dense graphs, adjacency access',
    notes: 'Grows one tree outward from a seed.',
  },
  {
    algorithm: 'Kruskal',
    time: 'O(E log E)',
    space: 'O(V + E)',
    bestFor: 'Sparse graphs with edge list',
    notes: 'Sorts edges and uses Union-Find.',
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
      'Builds low-cost backbones for fiber, power, or road planning when a connected, minimal-cost scaffold is needed.',
  },
  {
    context: 'Approximation baselines',
    detail:
      'Provides cheap spanning structures used in approximation algorithms (e.g., for TSP heuristics).',
  },
  {
    context: 'Graphics and clustering',
    detail:
      'MST-based clustering and mesh generation can start from Prim, especially on dense proximity graphs.',
  },
  {
    context: 'Facility layout',
    detail:
      'Designs minimal wiring or piping layouts where every node must be connected at least once.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Eager Prim (decrease-key)',
    detail:
      'Maintain the best known edge to each unvisited vertex and decrease-key when improved, reducing heap size.',
  },
  {
    title: 'Lazy Prim (edge heap)',
    detail:
      'Push all candidate edges and skip stale ones at pop time; simpler code with more heap entries.',
  },
  {
    title: 'Bucketed Prim',
    detail: 'For small integer weights, use buckets to avoid log factors.',
  },
  {
    title: 'Prim on grids',
    detail:
      'With implicit neighbors, Prim can be used to generate mazes or minimal corridor layouts.',
  },
]

const examples = [
  {
    title: "Prim's with min-heap (lazy)",
    code: `function prim(graph, start):
    visited = set([start])
    heap = new MinHeap() // (w, u, v)
    mst = []

    for (v, w) in graph.neighbors(start):
        heap.push((w, start, v))

    while heap and len(visited) < graph.size():
        (w, u, v) = heap.pop_min()
        if v in visited:
            continue
        visited.add(v)
        mst.append((u, v, w))
        for (nxt, wt) in graph.neighbors(v):
            if nxt not in visited:
                heap.push((wt, v, nxt))

    return mst`,
    explanation:
      'Heap ordering guarantees the lightest crossing edge is picked next, satisfying the cut property at every step.',
  },
  {
    title: 'Eager Prim with decrease-key',
    code: `function primEager(graph, start):
    dist = map with default infinity
    parent = map
    dist[start] = 0
    pq = new MinHeap()
    pq.push((0, start))

    while pq not empty:
        (d, u) = pq.pop_min()
        if d != dist[u]:
            continue
        for (v, w) in graph.neighbors(u):
            if w < dist[v]:
                dist[v] = w
                parent[v] = u
                pq.push((dist[v], v))

    return parent`,
    explanation:
      'Eager Prim tracks the best edge to each vertex. The parent map defines the MST edges.',
  },
  {
    title: 'Prim with adjacency matrix',
    code: `function primDense(matrix):
    n = size(matrix)
    inTree = [false]*n
    key = [infinity]*n
    parent = [-1]*n
    key[0] = 0

    for i in 0..n-1:
        u = argmin key where not inTree
        inTree[u] = true
        for v in 0..n-1:
            if matrix[u][v] < key[v] and not inTree[v]:
                key[v] = matrix[u][v]
                parent[v] = u

    return parent`,
    explanation: 'The O(V^2) array-based version is simple and often fastest on dense graphs.',
  },
]

const pitfalls = [
  'Forgetting the visited check can add duplicate vertices and cycles.',
  'Using Prim on a graph with non-existent edges (disconnected) without reseeding yields incomplete trees; treat components separately.',
  'Sorting all edges first turns Prim into Kruskal with extra overhead; stick to adjacency-driven pushes.',
  'Assuming the first time a node is seen is final; only the chosen minimum crossing edge is safe.',
  'Comparing exact edge sets in tests when weights tie; multiple MSTs can exist.',
]

const decisionGuidance = [
  'Dense graphs or adjacency-driven contexts: Prim is often faster than Kruskal.',
  'Sparse graphs with edge lists ready: Kruskal may be simpler with Union-Find.',
  'Small integer weights: consider bucketed Prim to reduce heap overhead.',
  'Disconnected graph: run Prim from each component to get a minimum spanning forest.',
  'Need a step-by-step growing tree (visualization): Prim is a natural fit.',
]

const implementationTips = [
  {
    title: 'Pick lazy vs eager',
    detail: 'Lazy Prim is simpler; eager Prim keeps the heap smaller with decrease-key semantics.',
  },
  {
    title: 'Use adjacency lists for sparse graphs',
    detail: 'They keep runtime proportional to edges instead of V^2 scans.',
  },
  {
    title: 'Stop after V - 1 edges',
    detail: 'Once the MST has V - 1 edges, you can exit early.',
  },
  {
    title: 'Handle disconnected graphs',
    detail: 'If the heap empties early, reseed from an unvisited vertex to build a forest.',
  },
  {
    title: 'Track parent edges',
    detail: 'Record the edge that brought a vertex in so you can return the MST explicitly.',
  },
]

const advancedInsights = [
  {
    title: 'Cut property proof sketch',
    detail:
      'If the lightest edge across a cut were excluded, any spanning tree crossing the cut must use a heavier edge, increasing total weight.',
  },
  {
    title: 'Prim vs Dijkstra',
    detail:
      'The structure is identical; Dijkstra orders by total path cost, Prim orders by edge cost to the tree.',
  },
  {
    title: 'Hybrid strategies',
    detail: 'On huge graphs, Boruvka rounds can shrink components, then Prim finishes quickly.',
  },
  {
    title: 'Sensitivity to weights',
    detail:
      'Small perturbations can change the chosen edges when weights tie, but total weight stays minimal.',
  },
]

const takeaways = [
  "Prim's grows one tree outward, always picking the cheapest edge crossing the current cut.",
  'Heap choice affects constants; array-based selection can shine on dense graphs.',
  'Visited checks preserve correctness and avoid cycles.',
  'References: Prim 1957, Dijkstra 1959, and CLRS MST chapter.',
]

const glossaryTerms = [
  {
    term: 'Minimum Spanning Tree (MST)',
    definition: 'A spanning tree that connects all vertices with minimum total edge weight.',
  },
  {
    term: 'Cut property',
    definition:
      'For any partition of vertices, the lightest edge crossing that cut is safe for some MST.',
  },
  {
    term: 'Crossing edge',
    definition: 'An edge with one endpoint in the current tree and one endpoint outside it.',
  },
  {
    term: 'Lazy Prim',
    definition:
      'A Prim variant that pushes many candidate edges and discards stale ones when popped.',
  },
  {
    term: 'Eager Prim',
    definition:
      'A Prim variant that tracks best-known connection per vertex and updates keys when improved.',
  },
  {
    term: 'Decrease-key',
    definition:
      'Priority queue operation that lowers an item key when a better edge is discovered.',
  },
  {
    term: 'Minimum Spanning Forest',
    definition: 'The union of MSTs across all connected components in a disconnected graph.',
  },
  {
    term: 'Frontier',
    definition: 'The set of candidate crossing edges considered for the next Prim expansion.',
  },
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
    { id: 'bp-mental-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mechanics', label: 'Mechanics in Motion' },
    { id: 'core-patterns', label: 'Problem Patterns' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-complexity', label: 'Complexity Analysis' },
    { id: 'core-sensitivity', label: 'Input Sensitivity' },
    { id: 'core-performance', label: 'Performance Profile' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-uses', label: 'Real-World Applications' },
    { id: 'core-variants', label: 'Variants and Extensions' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decision', label: 'When to Use It' },
    { id: 'core-implementation', label: 'Implementation Tips' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-trace', label: 'Worked Trace' },
    { id: 'ex-practical', label: 'Practical Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function PrimsAlgorithmPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: "Prim's Algorithm",
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Prim\'s Algorithm"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Prim's Algorithm</h1>
      <p>
        Prim's algorithm builds a minimum spanning tree by always adding the lightest edge that
        connects the current tree to a new vertex. It is a cut-property-driven greedy that thrives
        on adjacency access and dense graphs.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Where Kruskal sorts edges globally, Prim grows locally from a seed. It maintains a
              frontier of crossing edges and repeatedly picks the cheapest one, ensuring every
              addition is safe for the MST.
            </p>
            <p>Growing an MST from a single seed is the defining pattern of Prim's algorithm.</p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Core Concept and Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-mechanics" className="bin98-section">
            <h2 className="bin98-heading">How It Works: Mechanics in Motion</h2>
            {mechanics.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">How to Think About Similar Problems</h2>
            {problemPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-invariants" className="bin98-section">
            <h2 className="bin98-heading">Loop Invariants (Why It Is Correct)</h2>
            {loopInvariants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis and Intuition</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-sensitivity" className="bin98-section">
            <h2 className="bin98-heading">Input Sensitivity</h2>
            {inputSensitivity.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance Profile</h2>
            {performanceProfile.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            <table className="bin98-table">
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
          <section id="core-uses" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">Variants and Extensions</h2>
            {variantsAndTweaks.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-decision" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-implementation" className="bin98-section">
            <h2 className="bin98-heading">Implementation Tips</h2>
            {implementationTips.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
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
          <section id="ex-trace" className="bin98-section">
            <h2 className="bin98-heading">Worked Trace on a Tiny Graph</h2>
            {stepTrace.map((item) => (
              <div key={item.step}>
                <h3 className="bin98-subheading">{item.step}</h3>
                <p>
                  <strong>State:</strong> {item.state}
                </p>
                <p>
                  <strong>Note:</strong> {item.note}
                </p>
              </div>
            ))}
          </section>
          <section id="ex-practical" className="bin98-section">
            <h2 className="bin98-heading">Practical Examples</h2>
            {examples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
