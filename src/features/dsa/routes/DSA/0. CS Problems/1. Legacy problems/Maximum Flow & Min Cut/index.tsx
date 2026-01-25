import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

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
    details:
      'It models any system where something moves through a network with bottlenecks.',
    notes:
      'The max-flow min-cut theorem ties optimization and separation into one elegant result.',
  },
  {
    title: 'What it teaches',
    details:
      'Augmenting paths, residual graphs, and duality between flow and cuts.',
    notes:
      'It is a gateway to matchings, circulation, and network optimization.',
  },
]

const historicalContext = [
  {
    title: '1956: Ford-Fulkerson',
    details:
      'Introduced the augmenting path method for max flow in networks.',
    notes:
      'It laid the foundation for a large portion of combinatorial optimization.',
  },
  {
    title: '1960s: Edmonds-Karp',
    details:
      'Used BFS to choose shortest augmenting paths, yielding a polynomial-time bound.',
    notes:
      'This is the most common teaching algorithm for max flow.',
  },
  {
    title: '1970s+: Dinic and beyond',
    details:
      'Dinic?s blocking-flow algorithm improved practical performance and asymptotic bounds.',
    notes:
      'Modern implementations use scaling, push-relabel, and advanced heuristics.',
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
    detail:
      'A directed graph G = (V, E) with source s, sink t, and capacities c(u, v).',
  },
  {
    title: 'Output',
    detail:
      'A maximum feasible flow value and a corresponding min cut.',
  },
  {
    title: 'Constraints',
    detail:
      'Flow must satisfy capacity limits and conservation at all intermediate vertices.',
  },
  {
    title: 'Decision version',
    detail:
      'Is there a flow of value at least F... (reduces to max flow).',
  },
]

const flowRules = [
  {
    title: 'Capacity constraint',
    detail:
      '0 <= f(u, v) <= c(u, v) for every edge.',
  },
  {
    title: 'Conservation',
    detail:
      'For any vertex other than s or t, inflow equals outflow.',
  },
  {
    title: 'Flow value',
    detail:
      'The total flow out of s equals the total flow into t.',
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
    detail:
      'Each original edge (u, v) has residual capacity c(u, v) - f(u, v).',
  },
  {
    title: 'Backward edges',
    detail:
      'Each original edge (u, v) creates a reverse edge (v, u) with capacity f(u, v).',
  },
  {
    title: 'Purpose',
    detail:
      'Residual edges allow the algorithm to undo and reroute flow to improve the total.',
  },
]

const maxFlowMinCut = [
  {
    title: 'The theorem',
    detail:
      'The maximum flow value equals the minimum cut capacity for any s-t network.',
  },
  {
    title: 'Why it holds',
    detail:
      'Any flow is bounded by any cut; augmenting paths push flow until no path remains.',
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
    detail:
      'Use BFS to find shortest augmenting paths, guaranteeing O(VE^2) time.',
  },
  {
    title: 'Dinic',
    detail:
      'Build level graphs and push blocking flows. Runs in O(V^2E) and is fast in practice.',
  },
  {
    title: 'Push-relabel',
    detail:
      'Maintain preflows and heights, pushing excess locally. Often fastest in practice.',
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
    detail:
      'All flows always satisfy capacity constraints and conservation.',
  },
  {
    title: 'Augmenting path lemma',
    detail:
      'If there is an augmenting path, the current flow is not maximum.',
  },
  {
    title: 'No path implies optimal',
    detail:
      'If no augmenting path exists, the flow is maximum and yields a min cut.',
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
    detail:
      'O(VE^2). Simple and guaranteed polynomial time.',
  },
  {
    title: 'Dinic',
    detail:
      'O(V^2E) in general, faster on unit networks or bipartite matching.',
  },
  {
    title: 'Push-relabel',
    detail:
      'O(V^3) worst-case, but excellent practical performance with heuristics.',
  },
]

const dataStructures = [
  {
    title: 'Adjacency list with edge objects',
    detail:
      'Store capacity, flow, and a pointer to the reverse edge for residual updates.',
  },
  {
    title: 'Residual capacity check',
    detail:
      'Augmenting path searches need quick access to positive residual edges.',
  },
  {
    title: 'Parent array',
    detail:
      'BFS/DFS uses parents to reconstruct the path and bottleneck.',
  },
  {
    title: 'Level graph',
    detail:
      'Dinic uses levels to ensure all augmenting paths are shortest in edges.',
  },
]

const edgeCases = [
  {
    title: 'No path from s to t',
    detail:
      'Max flow is 0 and min cut is the cut that separates s from t immediately.',
  },
  {
    title: 'Parallel edges',
    detail:
      'Allowed in flow networks; treat them as distinct edges or sum capacities.',
  },
  {
    title: 'Undirected edges',
    detail:
      'Model as two directed edges with the same capacity.',
  },
  {
    title: 'Disconnected components',
    detail:
      'Only the component containing s and t matters.',
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
    detail:
      'Min-cut separates foreground/background with boundary penalties.',
  },
  {
    title: 'Network routing',
    detail:
      'Max flow models bandwidth routing through a network.',
  },
  {
    title: 'Scheduling',
    detail:
      'Flow networks model feasible schedules under resource constraints.',
  },
]

const workedExamples = [
  {
    title: 'Small network',
    code: `Nodes: s, a, b, t
Edges: s->a (3), s->b (2), a->b (1), a->t (2), b->t (3)
One max flow: s->a=2, s->b=2, a->b=1, a->t=1, b->t=3
Total flow = 4`,
    explanation:
      'The max flow is 4. The min cut is {s, a} | {b, t} with capacity 4.',
  },
  {
    title: 'Min cut from residual reachability',
    code: `After max flow, reachable from s in residual: {s, a}
Edges from S to T: s->b (2), a->t (2)
Cut capacity = 4`,
    explanation:
      'Reachability in the residual graph gives the min cut directly.',
  },
]

const pitfalls = [
  {
    mistake: 'Forgetting reverse edges',
    description:
      'Without reverse edges, you cannot reroute flow and may get stuck below optimal.',
  },
  {
    mistake: 'Using DFS in Edmonds-Karp',
    description:
      'Edmonds-Karp relies on BFS shortest paths for the polynomial bound.',
  },
  {
    mistake: 'Not resetting visited states',
    description:
      'Path searches must reset visited arrays each iteration.',
  },
  {
    mistake: 'Ignoring integer overflow',
    description:
      'Large capacities can overflow 32-bit integers; use 64-bit types when needed.',
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
    explanation:
      'The generic augmenting path method. Correct but path choice matters.',
  },
  {
    title: 'Edmonds-Karp (BFS)',
    code: `flow = 0
while BFS finds path P:
  bottleneck = min residual along P
  augment along P
  flow += bottleneck
return flow`,
    explanation:
      'BFS ensures shortest augmenting paths and polynomial runtime.',
  },
  {
    title: 'Dinic (level graph)',
    code: `flow = 0
while BFS builds levels:
  while DFS finds blocking flow:
    flow += pushed
return flow`,
    explanation:
      'Level graphs restrict searches and reduce redundant work.',
  },
]

const evaluationChecklist = [
  {
    title: 'Correctness',
    detail:
      'Verify capacity constraints and conservation after each augmentation.',
  },
  {
    title: 'Residual graph integrity',
    detail:
      'Check that reverse edges are updated with every augmentation.',
  },
  {
    title: 'Min cut extraction',
    detail:
      'After max flow, compute reachable nodes from s in the residual graph.',
  },
  {
    title: 'Complexity fit',
    detail:
      'Choose Edmonds-Karp for simplicity, Dinic or push-relabel for speed.',
  },
]

const keyTakeaways = [
  'Max flow and min cut are duals: the best flow equals the smallest separating cut.',
  'Residual graphs and augmenting paths are the core mechanics of flow algorithms.',
  'Edmonds-Karp is a safe baseline; Dinic and push-relabel are faster in practice.',
  'Flow networks model many real problems: matching, routing, segmentation, scheduling.',
  'The min cut can be read directly from reachability in the final residual graph.',
]

export default function MaximumFlowMinCutPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Maximum Flow & Min Cut</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Pushing flow to the limit and finding the tightest cut</div>
              <p className="win95-text">
                Maximum flow finds how much "stuff" can move from a source to a sink through capacity-limited edges. Minimum cut
                finds the smallest total capacity that separates the source from the sink. The max-flow min-cut theorem guarantees
                these two quantities are equal, giving a powerful duality between sending flow and cutting the network.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical Context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalContext.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {quickGlossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Problem Setup</legend>
            <div className="win95-grid win95-grid-2">
              {problemSetup.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Flow Rules</legend>
            <div className="win95-grid win95-grid-2">
              {flowRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Residual Graph</legend>
            <div className="win95-grid win95-grid-2">
              {residualGraph.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The residual graph is what makes max flow work. It tracks not only remaining capacity but also how to undo
                or reroute earlier decisions.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Max-Flow Min-Cut Theorem</legend>
            <div className="win95-grid win95-grid-2">
              {maxFlowMinCut.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm Landscape</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmLandscape.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Ford-Fulkerson Steps</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {fordFulkersonSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Edmonds-Karp Steps</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {edmondsKarpSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Dinic Steps</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {dinicSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness Notes</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and Scaling</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data Structures</legend>
            <div className="win95-grid win95-grid-2">
              {dataStructures.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Edge Cases</legend>
            <div className="win95-grid win95-grid-2">
              {edgeCases.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {workedExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode Reference</legend>
            <div className="win95-stack">
              {pseudocode.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How to Evaluate an Implementation</legend>
            <div className="win95-grid win95-grid-2">
              {evaluationChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((takeaway) => (
                <div key={takeaway} className="win95-panel">
                  <p className="win95-text">{takeaway}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
