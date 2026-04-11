import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Constrained throughput modeling',
    detail:
      'Captures networks where edges have capacity limits, preventing overload and ensuring realistic flow distribution.',
  },
  {
    title: 'Bottleneck identification',
    detail:
      'Max-flow equals min-cut, revealing the tightest constraints without exhaustive enumeration.',
  },
  {
    title: 'Cancellation and reversibility',
    detail:
      'Residual graphs allow flow adjustments, modeling real-world reversals like refunds or route changes.',
  },
]

const prerequisites = [
  {
    title: 'Directed graph',
    detail: 'Flow networks are directed; capacities apply to each directed edge.',
  },
  {
    title: 'Single source and sink',
    detail:
      'Classic max-flow assumes one source s and one sink t. Multiple sources can be reduced.',
  },
  {
    title: 'Nonnegative capacities',
    detail: 'Capacities are nonnegative, usually integers; negatives break standard theory.',
  },
  {
    title: 'Feasible flow',
    detail:
      'A flow must respect capacity constraints and flow conservation at all nodes except s and t.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail: 'Flow network G = (V, E) with capacities c(u, v), plus source s and sink t.',
  },
  {
    title: 'Output',
    detail: 'Maximum flow value and optionally the flow on each edge, plus a min-cut certificate.',
  },
  {
    title: 'Optional',
    detail: 'All-pairs or multi-source variants can be reduced using super source and super sink.',
  },
]

const formalDefinitions = [
  {
    title: 'Capacity constraint',
    detail: 'For every edge (u, v), 0 <= f(u, v) <= c(u, v).',
  },
  {
    title: 'Flow conservation',
    detail: 'For each v not in {s, t}, sum_in f(u, v) = sum_out f(v, w).',
  },
  {
    title: 'Residual capacity',
    detail: 'r(u, v) = c(u, v) - f(u, v) for forward, and r(v, u) = f(u, v) for reverse.',
  },
  {
    title: 'Augmenting path',
    detail: 'An s-t path in the residual graph with positive residual capacity on every edge.',
  },
  {
    title: 'Cut and min-cut',
    detail: 'A cut (S, T) separates s and t. Its capacity is sum of edges from S to T.',
  },
]

const history = [
  {
    title: '1956: Ford-Fulkerson algorithm',
    detail:
      'Lester Ford and Delbert Fulkerson introduced augmenting paths, revolutionizing network flow with a simple iterative method.',
  },
  {
    title: '1970: Dinic algorithm',
    detail:
      'Yefim Dinic layered graphs for blocking flows, achieving O(V^2 E) time and inspiring modern optimizations.',
  },
  {
    title: '1972: Edmonds-Karp refinement',
    detail:
      'Jack Edmonds and Richard Karp used BFS for shortest paths, guaranteeing polynomial time and preventing irrational loops.',
  },
  {
    title: '1985: Push-relabel preflow',
    detail:
      'Andrew Goldberg introduced height-based pushing, offering practical speed on dense graphs with O(V^3) worst-case.',
  },
]

const pillars = [
  {
    title: 'Capacity constraints',
    detail: 'Flow on any edge cannot exceed its capacity; violations invalidate the model.',
  },
  {
    title: 'Flow conservation',
    detail: 'Except at source and sink, inflow equals outflow at every node.',
  },
  {
    title: 'Residual integrity',
    detail:
      'Residual graph must reflect remaining capacity forward and cancellation potential backward.',
  },
]

const mentalModels = [
  {
    title: 'Pipes and reservoirs',
    detail:
      'Edges as pipes with fixed diameters; nodes as junctions conserving volume. Breaks when modeling gains/losses.',
  },
  {
    title: 'Traffic highways',
    detail:
      'Lanes with speed limits; residual shows open lanes forward and reversal opportunities. Fails on non-unit capacities.',
  },
  {
    title: 'Budget reallocation',
    detail: 'Forward residuals are unused budget; reverse residuals are refunds you can reclaim.',
  },
]

const howItWorks = [
  {
    step: '1. Model as directed graph',
    detail: 'Assign capacities to edges; designate source and sink nodes.',
  },
  {
    step: '2. Initialize residuals',
    detail: 'Create residual graph with forward capacities and zero backward edges.',
  },
  {
    step: '3. Find augmenting paths',
    detail: 'Use BFS/DFS to locate s-t paths in residual graph.',
  },
  {
    step: '4. Augment flow',
    detail:
      'Push minimum residual capacity along path; update forward (subtract) and backward (add).',
  },
  {
    step: '5. Repeat until no path',
    detail: 'Convergence when no augmenting path exists; flow is maximum.',
  },
]

const stepByStepFlow = [
  'Represent capacities and initialize flow f(u, v) = 0 for all edges.',
  'Build residual graph with forward residuals c(u, v) and backward residuals 0.',
  'Find an augmenting path from s to t (method depends on algorithm).',
  'Compute bottleneck as minimum residual along that path.',
  'Augment: increase flow on forward edges, decrease on reverse edges.',
  'Repeat until no augmenting path exists; resulting flow is maximum.',
]

const dataStructures = [
  {
    title: 'Adjacency list',
    detail:
      'Stores edges; commonly paired with edge structs for capacity, flow, and reverse index.',
  },
  {
    title: 'Residual graph',
    detail: 'Implicit through edge structs; forward and backward edges are updated together.',
  },
  {
    title: 'Queue or stack',
    detail:
      'BFS for Edmonds-Karp, DFS for Dinic blocking flows, push-relabel uses active node queues.',
  },
  {
    title: 'Level array',
    detail: 'Dinic builds a BFS level graph to restrict DFS to monotone paths.',
  },
  {
    title: 'Excess and height',
    detail: 'Push-relabel tracks excess flow and node heights to guide local pushes.',
  },
]

const correctnessNotes = [
  {
    title: 'Max-flow min-cut theorem',
    detail:
      'If no augmenting path exists in the residual graph, the flow is maximum and equals a min-cut.',
  },
  {
    title: 'Residual soundness',
    detail:
      'Every augmentation keeps capacity constraints and conservation intact by symmetric updates.',
  },
  {
    title: 'Termination',
    detail: 'With integer capacities, augmentations strictly increase total flow by at least 1.',
  },
]

const complexityTable = [
  {
    approach: 'Edmonds-Karp',
    time: 'O(VE^2)',
    space: 'O(V + E)',
    note: 'Reliable for sparse graphs; BFS ensures polynomial bound.',
  },
  {
    approach: 'Dinic',
    time: 'O(V^2 E)',
    space: 'O(V + E)',
    note: 'Faster on unit networks; blocking flows reduce phases.',
  },
  {
    approach: 'Push-relabel',
    time: 'O(V^3)',
    space: 'O(V + E)',
    note: 'Practical for dense graphs; heuristics improve convergence.',
  },
]

const algorithmFamilies = [
  {
    name: 'Ford-Fulkerson',
    idea: 'Repeatedly augment any residual s-t path.',
    bestFor: 'Small graphs, teaching, when simplicity matters.',
  },
  {
    name: 'Edmonds-Karp',
    idea: 'BFS chooses shortest augmenting paths by edges.',
    bestFor: 'Predictable runtime and easy correctness.',
  },
  {
    name: 'Dinic',
    idea: 'BFS levels + DFS blocking flows in layered graph.',
    bestFor: 'Medium to large graphs; fast in practice.',
  },
  {
    name: 'Push-relabel',
    idea: 'Local pushes from high nodes; relabel to allow movement.',
    bestFor: 'Dense graphs and high-performance implementations.',
  },
]

const applications = [
  {
    title: 'Network routing',
    detail: 'Maximize bandwidth between servers; used in Cisco routers for traffic engineering.',
  },
  {
    title: 'Bipartite matching',
    detail: 'Find maximum job assignments; powers dating apps like Tinder for optimal pairings.',
  },
  {
    title: 'Image segmentation',
    detail: 'Separate foreground/background in photos; core to Adobe Photoshop cutout tools.',
  },
  {
    title: 'Supply chain logistics',
    detail: 'Optimize goods flow in warehouses; Amazon uses variants for inventory routing.',
  },
  {
    title: 'Sports elimination',
    detail:
      'Model remaining games as capacities to determine if a team is mathematically eliminated.',
  },
  {
    title: 'Circulation with demands',
    detail: 'Feasibility in supply-demand networks reduces to max-flow with super nodes.',
  },
]

const pitfalls = [
  'Ignoring reverse edges in residuals leads to incorrect flow cancellation and breaks correctness.',
  'Using floating-point capacities risks non-termination; stick to integers.',
  'Forgetting to update both directions during augmentation breaks conservation.',
  'Scaling issues with large capacities; use 64-bit integers or modular arithmetic.',
  'Mixing undirected edges without splitting into two directed edges with separate capacities.',
]

const edgeCases = [
  'No path from source to sink: max flow is 0.',
  'Zero-capacity edges: they should be ignored by residual searches.',
  'Multiple edges between nodes: treat as parallel edges or merge capacities carefully.',
  'Self-loops: irrelevant to s-t flow and can be discarded.',
]

const whenToUse = [
  'Sparse graphs with moderate size: Edmonds-Karp for simplicity.',
  'Unit-capacity networks: Dinic excels with O(min(V^{2/3}, E^{1/2}) E) performance.',
  'Dense or large graphs: Push-relabel with global relabeling for speed.',
  'Need min-cut certificate: Any max-flow algorithm suffices.',
]

const implementationNotes = [
  {
    title: 'Edge struct pattern',
    detail: 'Store edges as {to, cap, rev} and add a reverse edge for every forward edge.',
  },
  {
    title: 'Overflow safety',
    detail: 'Use 64-bit integers for capacities and flow totals to avoid overflow.',
  },
  {
    title: 'Determinism',
    detail:
      'Neighbor order affects path choices and runtime; fix ordering for reproducible outputs.',
  },
  {
    title: 'Min-cut extraction',
    detail: 'After max flow, BFS in residual from s; reachable nodes form S of min-cut.',
  },
]

const advanced = [
  {
    title: 'Capacity scaling',
    detail: 'Augment only large capacities first; reduces iterations but adds overhead.',
  },
  {
    title: 'Stochastic optimization',
    detail: 'Randomize path selection; trades determinism for average-case speed.',
  },
  {
    title: 'Parallel variants',
    detail:
      'Distribute augmentations across cores; scales to massive networks like internet routing.',
  },
]

const advancedInsights = [
  {
    title: 'Flow decomposition',
    detail:
      'Any flow can be decomposed into s-t paths and cycles, useful for debugging and proofs.',
  },
  {
    title: 'Max-flow to min-cut',
    detail: 'When augmentation halts, the residual reachability of s defines a minimum cut.',
  },
  {
    title: 'Lower bounds on edges',
    detail: 'Edges with demands can be transformed by shifting capacities and adding super nodes.',
  },
]

const variantTable = [
  {
    variant: 'Integral max-flow',
    guarantee: 'Integer capacities yield integer flows',
    useCase: 'Matching and assignment problems',
  },
  {
    variant: 'Min-cost max-flow',
    guarantee: 'Optimizes cost among max flows',
    useCase: 'Scheduling with costs, transportation',
  },
  {
    variant: 'Circulation with demands',
    guarantee: 'Feasibility with lower bounds',
    useCase: 'Supply-demand balancing',
  },
]

const codeExamples = [
  {
    title: 'Edmonds-Karp implementation',
    code: `function edmondsKarp(capacity, source, sink):
    residual = copy(capacity)  // Initialize residual with capacities
    flow = 0
    while true:
        parent = bfs(residual, source, sink)  // Find shortest path
        if parent[sink] == -1: break
        pathFlow = infinity
        v = sink
        while v != source:
            u = parent[v]
            pathFlow = min(pathFlow, residual[u][v])
            v = u
        v = sink
        while v != source:
            u = parent[v]
            residual[u][v] -= pathFlow  // Update forward
            residual[v][u] += pathFlow  // Update backward
            v = u
        flow += pathFlow
    return flow`,
    explanation:
      'BFS ensures each path is shortest, bounding augmentations to O(VE) for termination guarantee.',
  },
  {
    title: 'Dinic level graph construction',
    code: `function buildLevelGraph(residual, source, sink):
    level = array of -1 sized V
    level[source] = 0
    queue = [source]
    while queue not empty:
        u = dequeue(queue)
        for v in neighbors of u:
            if level[v] == -1 and residual[u][v] > 0:
                level[v] = level[u] + 1
                enqueue(queue, v)
    return level[sink] != -1  // True if path exists`,
    explanation:
      'Levels prevent backward edges, ensuring DFS blocking flows respect monotonic increases.',
  },
]

const keyTakeaways = [
  'Max-flow models constrained movement; residual graphs enable reversals.',
  'Augmenting paths vs. preflows trade simplicity for dense-graph speed.',
  'Always maintain bidirectional residuals for correctness.',
  'Polynomial algorithms scale to thousands; heuristics handle millions.',
]

const glossaryTerms = [
  {
    term: 'Flow network',
    definition:
      'A directed graph with capacities and designated source and sink for transporting flow.',
  },
  {
    term: 'Capacity constraint',
    definition: 'Every edge flow stays between zero and edge capacity.',
  },
  {
    term: 'Flow conservation',
    definition: 'At intermediate nodes, total incoming flow equals total outgoing flow.',
  },
  {
    term: 'Residual graph',
    definition:
      'Graph of remaining forward capacity plus reverse cancellation capacity for current flow.',
  },
  {
    term: 'Augmenting path',
    definition: 'A source-to-sink residual path whose every edge has positive residual capacity.',
  },
  {
    term: 'Bottleneck',
    definition: 'Minimum residual capacity along an augmenting path; this limits the push amount.',
  },
  {
    term: 'Min-cut',
    definition:
      'A source-sink partition with minimum outgoing cut capacity, equal to max-flow value.',
  },
  {
    term: 'Blocking flow',
    definition: 'In Dinic, a flow that saturates all source-sink paths in the current level graph.',
  },
  {
    term: 'Preflow',
    definition: 'Push-relabel state where nodes can temporarily hold excess inflow.',
  },
  {
    term: 'Super source/sink',
    definition: 'Reduction gadget that combines many sources/sinks into one source and one sink.',
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
    { id: 'bp-prerequisites', label: 'Prerequisites and Definitions' },
    { id: 'bp-io', label: 'Inputs and Outputs' },
    { id: 'bp-formal', label: 'Formal Concepts' },
    { id: 'bp-history', label: 'History' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Core Pillars' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-families', label: 'Algorithm Families' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-data', label: 'Data Structures and Invariants' },
    { id: 'core-correctness', label: 'Correctness Sketch' },
    { id: 'core-apps', label: 'Applications' },
    { id: 'core-risk', label: 'Pitfalls and Edge Cases' },
    { id: 'core-when', label: 'When to Use' },
    { id: 'core-impl', label: 'Implementation Notes' },
    { id: 'core-advanced', label: 'Advanced Topics' },
    { id: 'core-variants', label: 'Variants and Extensions' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function FlowNetworkAlgorithms(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Flow Network Algorithms',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Flow Network Algorithms"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Flow Network Algorithms</h1>
      <p>
        Flow networks model real-world constraints like bandwidth or traffic. Max-flow algorithms
        push limits while min-cut certifies optimality, with residuals allowing reversals and
        cancellations.
      </p>
      <p>
        <Link to="/algoViz" className="flow-help-link">
          Back to Catalog
        </Link>
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-prerequisites" className="bin98-section">
            <h2 className="bin98-heading">Prerequisites and Definitions</h2>
            {prerequisites.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-io" className="bin98-section">
            <h2 className="bin98-heading">Inputs and Outputs</h2>
            {inputsOutputs.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-formal" className="bin98-section">
            <h2 className="bin98-heading">Formal Concepts</h2>
            {formalDefinitions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History</h2>
            {history.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars" className="bin98-section">
            <h2 className="bin98-heading">Core Pillars</h2>
            {pillars.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-mechanics" className="bin98-section">
            <h2 className="bin98-heading">How It Works</h2>
            {howItWorks.map((item) => (
              <p key={item.step}>
                <strong>{item.step}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-flow" className="bin98-section">
            <h2 className="bin98-heading">Step-by-Step Flow</h2>
            <ol>
              {stepByStepFlow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-families" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Families</h2>
            {algorithmFamilies.map((row) => (
              <p key={row.name}>
                <strong>{row.name}:</strong> {row.idea} Best for: {row.bestFor}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Notes</h2>
            <ul>
              {complexityTable.map((row) => (
                <li key={row.approach}>
                  <strong>{row.approach}:</strong> Time {row.time}, Space {row.space}. {row.note}
                </li>
              ))}
            </ul>
          </section>
          <section id="core-data" className="bin98-section">
            <h2 className="bin98-heading">Data Structures and Invariants</h2>
            {dataStructures.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Sketch</h2>
            {correctnessNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-apps" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            {applications.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-risk" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls and Edge Cases</h2>
            <h3 className="bin98-subheading">Common Pitfalls</h3>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="bin98-subheading">Edge Cases Checklist</h3>
            <ul>
              {edgeCases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use</h2>
            <ol>
              {whenToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-impl" className="bin98-section">
            <h2 className="bin98-heading">Implementation Notes</h2>
            {implementationNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Topics</h2>
            {advanced.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">Variants and Extensions</h2>
            <ul>
              {variantTable.map((row) => (
                <li key={row.variant}>
                  <strong>{row.variant}:</strong> {row.guarantee}. Typical use case: {row.useCase}.
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-code" className="bin98-section">
          <h2 className="bin98-heading">Code Examples</h2>
          {codeExamples.map((example) => (
            <div key={example.title}>
              <h3 className="bin98-subheading">{example.title}</h3>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
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
