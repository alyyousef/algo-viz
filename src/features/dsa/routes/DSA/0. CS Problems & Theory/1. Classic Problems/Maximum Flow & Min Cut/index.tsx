import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Max flow finds the greatest possible flow from a source to a sink in a capacity-limited network.',
    notes:
      'Min cut finds the smallest total capacity of edges whose removal disconnects source from sink.',
  },
  {
    title: 'Why it matters',
    details: 'It models any system where something moves through a network with bottlenecks.',
    notes: 'The max-flow min-cut theorem ties optimization and separation into one elegant result.',
  },
  {
    title: 'What it teaches',
    details: 'Augmenting paths, residual graphs, and duality between flow and cuts.',
    notes: 'It is a gateway to matchings, circulation, and network optimization.',
  },
]

const historicalContext = [
  {
    title: '1956: Ford-Fulkerson',
    details: 'Introduced the augmenting path method for max flow in networks.',
    notes: 'It laid the foundation for a large portion of combinatorial optimization.',
  },
  {
    title: '1960s: Edmonds-Karp',
    details: 'Used BFS to choose shortest augmenting paths, yielding a polynomial-time bound.',
    notes: 'This is the most common teaching algorithm for max flow.',
  },
  {
    title: '1970s+: Dinic and beyond',
    details:
      "Dinic's blocking-flow algorithm improved practical performance and asymptotic bounds.",
    notes: 'Modern implementations use scaling, push-relabel, and advanced heuristics.',
  },
]

const quickGlossary = [
  {
    term: 'Flow',
    definition: 'An assignment of values to edges that respects capacity and conservation.',
  },
  {
    term: 'Capacity',
    definition: 'The maximum amount of flow an edge can carry.',
  },
  {
    term: 'Residual capacity',
    definition: 'How much additional flow can be pushed along an edge in the residual graph.',
  },
  {
    term: 'Augmenting path',
    definition: 'A path from source to sink in the residual graph with positive residual capacity.',
  },
  {
    term: 'Cut (s-t cut)',
    definition: 'A partition of vertices into S and T with s in S and t in T.',
  },
  {
    term: 'Cut capacity',
    definition: 'Sum of capacities of edges from S to T.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail: 'A directed graph G = (V, E) with source s, sink t, and capacities c(u, v).',
  },
  {
    title: 'Output',
    detail: 'A maximum feasible flow value and a corresponding min cut.',
  },
  {
    title: 'Constraints',
    detail: 'Flow must satisfy capacity limits and conservation at all intermediate vertices.',
  },
  {
    title: 'Decision version',
    detail: 'Is there a flow of value at least F... (reduces to max flow).',
  },
]

const flowRules = [
  {
    title: 'Capacity constraint',
    detail: '0 <= f(u, v) <= c(u, v) for every edge.',
  },
  {
    title: 'Conservation',
    detail: 'For any vertex other than s or t, inflow equals outflow.',
  },
  {
    title: 'Flow value',
    detail: 'The total flow out of s equals the total flow into t.',
  },
  {
    title: 'Skew symmetry',
    detail:
      'Flow on an edge implies an equal and opposite value on its reverse edge in the residual graph.',
  },
]

const residualGraph = [
  {
    title: 'Forward edges',
    detail: 'Each original edge (u, v) has residual capacity c(u, v) - f(u, v).',
  },
  {
    title: 'Backward edges',
    detail: 'Each original edge (u, v) creates a reverse edge (v, u) with capacity f(u, v).',
  },
  {
    title: 'Purpose',
    detail: 'Residual edges allow the algorithm to undo and reroute flow to improve the total.',
  },
]

const maxFlowMinCut = [
  {
    title: 'The theorem',
    detail: 'The maximum flow value equals the minimum cut capacity for any s-t network.',
  },
  {
    title: 'Why it holds',
    detail: 'Any flow is bounded by any cut; augmenting paths push flow until no path remains.',
  },
  {
    title: 'Certificate',
    detail:
      'When no augmenting path exists, the reachable set in the residual graph defines a min cut.',
  },
]

const algorithmLandscape = [
  {
    title: 'Ford-Fulkerson',
    detail:
      'Repeatedly find any augmenting path and push flow. Correct but may be slow with bad path choices.',
  },
  {
    title: 'Edmonds-Karp',
    detail: 'Use BFS to find shortest augmenting paths, guaranteeing O(VE^2) time.',
  },
  {
    title: 'Dinic',
    detail: 'Build level graphs and push blocking flows. Runs in O(V^2E) and is fast in practice.',
  },
  {
    title: 'Push-relabel',
    detail: 'Maintain preflows and heights, pushing excess locally. Often fastest in practice.',
  },
]

const fordFulkersonSteps = [
  'Initialize all flows to 0.',
  'Build residual graph from current flow.',
  'Find any augmenting path from s to t.',
  'Compute bottleneck capacity along the path.',
  'Augment flow along the path by the bottleneck.',
  'Repeat until no augmenting path exists.',
]

const edmondsKarpSteps = [
  'Run BFS in the residual graph to find the shortest augmenting path.',
  'Augment along that path by its bottleneck capacity.',
  'Repeat until BFS finds no path to t.',
  'Shortest augmenting paths ensure polynomial bound.',
]

const dinicSteps = [
  'Build a level graph with BFS from s.',
  'Repeatedly find blocking flows using DFS in the level graph.',
  'When no more blocking flow exists, rebuild the level graph.',
  'Stop when t is unreachable in the residual graph.',
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail: 'All flows always satisfy capacity constraints and conservation.',
  },
  {
    title: 'Augmenting path lemma',
    detail: 'If there is an augmenting path, the current flow is not maximum.',
  },
  {
    title: 'No path implies optimal',
    detail: 'If no augmenting path exists, the flow is maximum and yields a min cut.',
  },
]

const complexityNotes = [
  {
    title: 'Ford-Fulkerson',
    detail:
      'O(E * |f*|) for integer capacities, but can be exponential with irrational capacities.',
  },
  {
    title: 'Edmonds-Karp',
    detail: 'O(VE^2). Simple and guaranteed polynomial time.',
  },
  {
    title: 'Dinic',
    detail: 'O(V^2E) in general, faster on unit networks or bipartite matching.',
  },
  {
    title: 'Push-relabel',
    detail: 'O(V^3) worst-case, but excellent practical performance with heuristics.',
  },
]

const dataStructures = [
  {
    title: 'Adjacency list with edge objects',
    detail: 'Store capacity, flow, and a pointer to the reverse edge for residual updates.',
  },
  {
    title: 'Residual capacity check',
    detail: 'Augmenting path searches need quick access to positive residual edges.',
  },
  {
    title: 'Parent array',
    detail: 'BFS/DFS uses parents to reconstruct the path and bottleneck.',
  },
  {
    title: 'Level graph',
    detail: 'Dinic uses levels to ensure all augmenting paths are shortest in edges.',
  },
]

const edgeCases = [
  {
    title: 'No path from s to t',
    detail: 'Max flow is 0 and min cut is the cut that separates s from t immediately.',
  },
  {
    title: 'Parallel edges',
    detail: 'Allowed in flow networks; treat them as distinct edges or sum capacities.',
  },
  {
    title: 'Undirected edges',
    detail: 'Model as two directed edges with the same capacity.',
  },
  {
    title: 'Disconnected components',
    detail: 'Only the component containing s and t matters.',
  },
]

const applications = [
  {
    title: 'Bipartite matching',
    detail:
      'Reduce matching to max flow by connecting source to left nodes and right nodes to sink.',
  },
  {
    title: 'Image segmentation',
    detail: 'Min-cut separates foreground/background with boundary penalties.',
  },
  {
    title: 'Network routing',
    detail: 'Max flow models bandwidth routing through a network.',
  },
  {
    title: 'Scheduling',
    detail: 'Flow networks model feasible schedules under resource constraints.',
  },
]

const workedExamples = [
  {
    title: 'Small network',
    code: `Nodes: s, a, b, t
Edges: s->a (3), s->b (2), a->b (1), a->t (2), b->t (3)
One max flow: s->a=2, s->b=2, a->b=1, a->t=1, b->t=3
Total flow = 4`,
    explanation: 'The max flow is 4. The min cut is {s, a} | {b, t} with capacity 4.',
  },
  {
    title: 'Min cut from residual reachability',
    code: `After max flow, reachable from s in residual: {s, a}
Edges from S to T: s->b (2), a->t (2)
Cut capacity = 4`,
    explanation: 'Reachability in the residual graph gives the min cut directly.',
  },
]

const pitfalls = [
  {
    mistake: 'Forgetting reverse edges',
    description: 'Without reverse edges, you cannot reroute flow and may get stuck below optimal.',
  },
  {
    mistake: 'Using DFS in Edmonds-Karp',
    description: 'Edmonds-Karp relies on BFS shortest paths for the polynomial bound.',
  },
  {
    mistake: 'Not resetting visited states',
    description: 'Path searches must reset visited arrays each iteration.',
  },
  {
    mistake: 'Ignoring integer overflow',
    description: 'Large capacities can overflow 32-bit integers; use 64-bit types when needed.',
  },
]

const pseudocode = [
  {
    title: 'Ford-Fulkerson (conceptual)',
    code: `flow = 0
while exists augmenting path P:
  bottleneck = min residual along P
  augment flow along P by bottleneck
  flow += bottleneck
return flow`,
    explanation: 'The generic augmenting path method. Correct but path choice matters.',
  },
  {
    title: 'Edmonds-Karp (BFS)',
    code: `flow = 0
while BFS finds path P:
  bottleneck = min residual along P
  augment along P
  flow += bottleneck
return flow`,
    explanation: 'BFS ensures shortest augmenting paths and polynomial runtime.',
  },
  {
    title: 'Dinic (level graph)',
    code: `flow = 0
while BFS builds levels:
  while DFS finds blocking flow:
    flow += pushed
return flow`,
    explanation: 'Level graphs restrict searches and reduce redundant work.',
  },
]

const evaluationChecklist = [
  {
    title: 'Correctness',
    detail: 'Verify capacity constraints and conservation after each augmentation.',
  },
  {
    title: 'Residual graph integrity',
    detail: 'Check that reverse edges are updated with every augmentation.',
  },
  {
    title: 'Min cut extraction',
    detail: 'After max flow, compute reachable nodes from s in the residual graph.',
  },
  {
    title: 'Complexity fit',
    detail: 'Choose Edmonds-Karp for simplicity, Dinic or push-relabel for speed.',
  },
]

const keyTakeaways = [
  'Max flow and min cut are duals: the best flow equals the smallest separating cut.',
  'Residual graphs and augmenting paths are the core mechanics of flow algorithms.',
  'Edmonds-Karp is a safe baseline; Dinic and push-relabel are faster in practice.',
  'Flow networks model many real problems: matching, routing, segmentation, scheduling.',
  'The min cut can be read directly from reachability in the final residual graph.',
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
    { id: 'bp-setup', label: 'Problem Setup' },
    { id: 'bp-theorem', label: 'Max-Flow Min-Cut' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-rules', label: 'Flow Rules' },
    { id: 'core-residual', label: 'Residual Graph' },
    { id: 'core-landscape', label: 'Algorithm Landscape' },
    { id: 'core-ford', label: 'Ford-Fulkerson Steps' },
    { id: 'core-edmonds', label: 'Edmonds-Karp Steps' },
    { id: 'core-dinic', label: 'Dinic Steps' },
    { id: 'core-correctness', label: 'Correctness Notes' },
    { id: 'core-complexity', label: 'Complexity and Scaling' },
    { id: 'core-data', label: 'Data Structures' },
    { id: 'core-edge', label: 'Edge Cases' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-evaluate', label: 'Evaluation Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function MaximumFlowMinCutPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Maximum Flow &amp; Min Cut',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Maximum Flow &amp; Min Cut"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Maximum Flow &amp; Min Cut</h1>
      <p>
        Maximum flow finds how much &quot;stuff&quot; can move from a source to a sink through
        capacity-limited edges. Minimum cut finds the smallest total capacity that separates the
        source from the sink. The max-flow min-cut theorem guarantees these two quantities are
        equal, giving a powerful duality between sending flow and cutting the network.
      </p>
      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-setup" className="bin98-section">
            <h2 className="bin98-heading">Problem Setup</h2>
            {problemSetup.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-theorem" className="bin98-section">
            <h2 className="bin98-heading">Max-Flow Min-Cut Theorem</h2>
            {maxFlowMinCut.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-rules" className="bin98-section">
            <h2 className="bin98-heading">Flow Rules</h2>
            {flowRules.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-residual" className="bin98-section">
            <h2 className="bin98-heading">Residual Graph</h2>
            {residualGraph.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              The residual graph is what makes max flow work. It tracks not only remaining capacity
              but also how to undo or reroute earlier decisions.
            </p>
          </section>
          <section id="core-landscape" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Landscape</h2>
            {algorithmLandscape.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-ford" className="bin98-section">
            <h2 className="bin98-heading">Ford-Fulkerson Steps</h2>
            <ol>
              {fordFulkersonSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section id="core-edmonds" className="bin98-section">
            <h2 className="bin98-heading">Edmonds-Karp Steps</h2>
            <ol>
              {edmondsKarpSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section id="core-dinic" className="bin98-section">
            <h2 className="bin98-heading">Dinic Steps</h2>
            <ol>
              {dinicSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Notes</h2>
            {correctnessNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Scaling</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-data" className="bin98-section">
            <h2 className="bin98-heading">Data Structures</h2>
            {dataStructures.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-edge" className="bin98-section">
            <h2 className="bin98-heading">Edge Cases</h2>
            {edgeCases.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            {applications.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-evaluate" className="bin98-section">
            <h2 className="bin98-heading">How to Evaluate an Implementation</h2>
            {evaluationChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((pitfall) => (
                <li key={pitfall.mistake}>
                  <strong>{pitfall.mistake}:</strong> {pitfall.description}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-worked" className="bin98-section">
            <h2 className="bin98-heading">Worked Examples</h2>
            {workedExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-pseudocode" className="bin98-section">
            <h2 className="bin98-heading">Pseudocode Reference</h2>
            {pseudocode.map((example) => (
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
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
