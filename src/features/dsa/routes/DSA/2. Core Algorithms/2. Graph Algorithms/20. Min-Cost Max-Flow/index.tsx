import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '1956: Ford-Fulkerson for maximum flow',
    detail:
      'Early flow algorithms established the residual graph and augmenting path paradigm that min-cost max-flow builds on.',
  },
  {
    title: '1958: Busacker and Gowen introduce costs',
    detail:
      'They extended flow to include per-edge costs, opening the door to routing and assignment optimization.',
  },
  {
    title: '1970s: Successive shortest augmenting path',
    detail:
      'SSAP showed that repeatedly sending flow along cheapest residual paths yields an optimal min-cost solution.',
  },
  {
    title: '1980s: Potentials and reweighting',
    detail:
      'Using reduced costs and Johnson-style potentials enabled Dijkstra for faster shortest paths in residual networks.',
  },
]

const mentalModels = [
  {
    title: 'Water with toll roads',
    detail:
      'Flow units must travel from source to sink. Every edge charges a toll, so you want the cheapest routes for every unit.',
  },
  {
    title: 'Residual bargains',
    detail:
      'The residual graph shows where you can push more flow or undo expensive choices via reverse edges with negative cost.',
  },
  {
    title: 'Cheapest next unit',
    detail:
      'Each augmentation sends as much as possible along the current cheapest path, then recomputes costs.',
  },
  {
    title: 'Potentials as rebates',
    detail:
      'Vertex potentials adjust edge prices so all reduced costs stay non-negative, enabling fast Dijkstra.',
  },
]

const coreDefinitions = [
  {
    heading: 'Flow network',
    bullets: [
      'Directed graph with source s and sink t.',
      'Each edge has capacity and cost per unit.',
      'Flow respects capacity and conservation at intermediate nodes.',
    ],
  },
  {
    heading: 'Min-cost max-flow',
    bullets: [
      'Find the maximum possible flow from s to t.',
      'Among all max flows, choose the one with minimum total cost.',
      'Total cost is sum(flow on edge * edge cost).',
    ],
  },
  {
    heading: 'Residual graph',
    bullets: [
      'Forward edges with remaining capacity keep original cost.',
      'Reverse edges allow canceling flow with negative cost.',
      'Shortest paths here define cheapest improvements.',
    ],
  },
  {
    heading: 'Reduced cost',
    bullets: [
      'Cost adjusted by vertex potentials: c(u,v) + p(u) - p(v).',
      'Maintains shortest path optimality while ensuring non-negative edges.',
      'Potentials update after each shortest path computation.',
    ],
  },
  {
    heading: 'Augmenting path',
    bullets: [
      'A path from s to t in the residual graph.',
      'Its bottleneck capacity dictates how much flow can be sent.',
      'Augmenting reduces total cost optimally when shortest.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Build residual graph with reverse edges',
    detail:
      'For each edge, add a reverse edge with zero capacity and negative cost. Track pointers to update both.',
  },
  {
    title: 'Initialize potentials',
    detail:
      'If there are negative costs, run Bellman-Ford once to compute initial potentials; otherwise set all to zero.',
  },
  {
    title: 'Find shortest path by reduced cost',
    detail:
      'Use Dijkstra on reduced costs to find the cheapest s-to-t path in the residual graph.',
  },
  {
    title: 'Augment along the path',
    detail:
      'Push the bottleneck flow, update forward and reverse capacities, and add path cost * flow to total.',
  },
  {
    title: 'Update potentials and repeat',
    detail:
      'Update p(v) += dist(v) from Dijkstra. Stop when no s-to-t path remains (max flow reached).',
  },
]

const implementationNotes = [
  {
    title: 'Edge structure',
    detail:
      'Store to, capacity, cost, and rev index. Updating flow means updating both edge and reverse edge.',
  },
  {
    title: 'Cost type',
    detail:
      'Use 64-bit integers to avoid overflow when total cost is large (flow * cost can exceed 32-bit).',
  },
  {
    title: 'Negative edges',
    detail:
      'Dijkstra requires non-negative reduced costs. Always update potentials correctly to preserve that property.',
  },
  {
    title: 'Stop criteria',
    detail:
      'If Dijkstra cannot reach t, no more flow can be sent; you have max flow with min cost.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'SSAP with Dijkstra runs in O(F * E log V), where F is max flow. Bellman-Ford adds O(VE) once.',
  },
  {
    title: 'Space cost',
    detail:
      'Adjacency lists with reverse edges require O(V + E) memory.',
  },
  {
    title: 'Scaling considerations',
    detail:
      'If costs are large or capacities huge, cost-scaling variants can improve performance.',
  },
  {
    title: 'When flow is large',
    detail:
      'If F is very big, each augmentation may push a lot of flow but still F can dominate runtime.',
  },
]

const realWorldUses = [
  {
    context: 'Logistics and transport',
    detail:
      'Ship goods from factories to warehouses while minimizing shipping cost under capacity constraints.',
  },
  {
    context: 'Assignment and scheduling',
    detail:
      'Assign people to tasks with costs such as travel time, preference, or skill mismatch.',
  },
  {
    context: 'Telecom routing',
    detail:
      'Route data through a network to maximize throughput while minimizing latency or monetary cost.',
  },
  {
    context: 'Budgeted ad delivery',
    detail:
      'Serve ads to impressions with capacity constraints and per-impression costs or penalties.',
  },
]

const examples = [
  {
    title: 'Min-cost max-flow in a small network',
    code: `nodes: s, a, b, t
edges:
s->a (cap 3, cost 1)
s->b (cap 2, cost 2)
a->b (cap 1, cost 0)
a->t (cap 2, cost 3)
b->t (cap 3, cost 1)

max flow = 5
min cost chooses s-a-b-t for 1 unit,
then fills remaining cheapest paths.`,
    explanation:
      'The algorithm sends units along the cheapest residual routes first, using the zero-cost a->b edge to lower total cost.',
  },
  {
    title: 'Successive shortest augmenting path (pseudocode)',
    code: `function minCostMaxFlow(graph, s, t):
    totalFlow = 0
    totalCost = 0
    potentials = [0..V-1] = 0

    if hasNegativeCostEdges:
        potentials = bellmanFord(graph, s)

    while shortestPath(graph, s, t, potentials):
        path = rebuildPath(t)
        bottleneck = minResidual(path)
        augment(path, bottleneck)
        totalFlow += bottleneck
        totalCost += bottleneck * pathCost(path)
        updatePotentials(potentials, dist)
    return (totalFlow, totalCost)`,
    explanation:
      'Potentials keep reduced costs non-negative so Dijkstra remains valid, while augmentation updates both flow and total cost.',
  },
  {
    title: 'Residual edge update',
    code: `// forward edge e and its reverse edge rev
function addFlow(e, amount):
    e.cap -= amount
    rev = graph[e.to][e.rev]
    rev.cap += amount
    // cost is tracked in totalCost only`,
    explanation:
      'Reverse edges allow undoing expensive flow later, which is critical for achieving minimum total cost.',
  },
]

const pitfalls = [
  'Using Dijkstra without potentials in the presence of negative edge costs.',
  'Forgetting reverse edges or failing to update both directions during augmentation.',
  'Overflowing total cost with 32-bit integers on large graphs.',
  'Stopping early after a fixed flow when the requirement is max flow.',
  'Ignoring lower bounds or demands when the problem is a circulation with constraints.',
]

const decisionGuidance = [
  'Use min-cost max-flow when you need the largest throughput and the cheapest total cost.',
  'If you only need max flow, use Dinic or Edmonds-Karp for simpler code.',
  'If edges have weights but capacity is 1, consider assignment algorithms like Hungarian.',
  'If the graph is undirected, convert each undirected edge into two directed edges.',
  'If you need fixed-flow min cost, stop after reaching that flow instead of max flow.',
]

const advancedInsights = [
  {
    title: 'Cycle canceling view',
    detail:
      'Min-cost flow can be seen as repeatedly canceling negative cycles in the residual graph until none remain.',
  },
  {
    title: 'Lower bounds and demands',
    detail:
      'Transform circulation with lower bounds into a standard min-cost flow by adding a super source/sink.',
  },
  {
    title: 'Cost scaling',
    detail:
      'Scaling reduces the number of shortest path computations and is faster for large costs or huge capacities.',
  },
  {
    title: 'Dual interpretation',
    detail:
      'Potentials correspond to a dual solution in linear programming, explaining why reduced costs stay non-negative.',
  },
]

const takeaways = [
  'Min-cost max-flow maximizes total flow while minimizing total cost across all edges.',
  'The residual graph and reverse edges are essential for optimality.',
  'Successive shortest augmenting paths plus potentials yields a reliable implementation.',
  'Complexity depends on max flow; large flows may need scaling optimizations.',
  'This model underpins logistics, assignment, and network optimization problems.',
]

export default function MinCostMaxFlowPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Min-Cost Max-Flow</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Send the most flow while paying the least total cost</div>
              <p className="win95-text">
                Min-cost max-flow finds a flow of maximum value from a source to a sink while minimizing the sum of edge costs.
                It is the workhorse for routing, assignment, and allocation problems where capacity and cost matter at the same time.
                This page covers the theory, the residual mechanics, and the standard efficient implementation.
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
                A max-flow ignores cost and only pushes as much as possible. A min-cost flow finds the cheapest way to ship a
                specified amount. Min-cost max-flow combines both: first maximize the amount of flow, then choose the cheapest
                configuration among all maximum flows.
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
            <legend>How it works: definitions</legend>
            <div className="win95-grid win95-grid-3">
              {coreDefinitions.map((block) => (
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
            <legend>How it works: successive shortest augmenting path</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Correctness idea: each augmentation sends flow along the cheapest available residual path. Potentials preserve
                non-negative reduced costs so Dijkstra finds the true cheapest path in the original costs. Repeating until no
                path exists yields maximum flow with minimum total cost.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation notes</legend>
            <div className="win95-grid win95-grid-2">
              {implementationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
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
                Performance depends on how large the max flow is. For huge flows or very large graphs, consider cost-scaling
                or capacity scaling variants to reduce the number of augmentations.
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
            <legend>Advanced insights</legend>
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
            <div className="win95-panel">
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

