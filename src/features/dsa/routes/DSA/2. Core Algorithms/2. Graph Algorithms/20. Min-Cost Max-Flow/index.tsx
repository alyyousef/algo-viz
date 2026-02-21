import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
  {
    title: 'Budgeted pipes',
    detail:
      'Capacities are pipe widths, costs are per-unit budgets. You want the largest throughput without overspending.',
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
    heading: 'Min-cost flow (fixed value)',
    bullets: [
      'Send a specified amount F from s to t at minimum cost.',
      'Stop after F units instead of pushing maximum flow.',
      'Same residual mechanics, different stopping condition.',
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
  {
    heading: 'Reduced cost optimality',
    bullets: [
      'No negative reduced-cost cycles implies optimality.',
      'Potentials encode a dual solution to the min-cost LP.',
      'Each augmentation preserves complementary slackness.',
    ],
  },
]

const problemVariants = [
  {
    title: 'Fixed-flow min cost',
    detail:
      'You already know the required flow value (F). Run the algorithm and stop when totalFlow = F.',
  },
  {
    title: 'Circulation with demands',
    detail:
      'Edges have lower bounds and nodes have supply/demand. Convert with a super source and super sink.',
  },
  {
    title: 'Assignment model',
    detail:
      'Bipartite matching with costs is min-cost flow with unit capacities and supply/demand of 1.',
  },
  {
    title: 'Min-cost max-flow with penalties',
    detail:
      'Add edges with large costs to model penalties or soft constraints.',
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

const correctnessSketch = [
  {
    title: 'Invariant: feasibility',
    detail:
      'Augmenting along a residual path preserves capacity constraints and flow conservation.',
  },
  {
    title: 'Invariant: reduced-cost non-negative',
    detail:
      'Potentials reweight edges so Dijkstra is valid, and each found path is shortest in original costs.',
  },
  {
    title: 'Optimality condition',
    detail:
      'When no s-to-t path exists, flow is maximum. When no negative reduced-cost cycle exists, cost is minimum.',
  },
  {
    title: 'Why shortest paths work',
    detail:
      'Each augmentation is a minimum-cost improvement; repeating until no path remains yields min-cost max-flow.',
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
    title: 'Path reconstruction',
    detail:
      'Store parent node and edge index from Dijkstra to rebuild the augmenting path efficiently.',
  },
  {
    title: 'Disconnected graphs',
    detail:
      'If t is unreachable, stop. Distances for unreachable nodes should not update potentials.',
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

const algorithmVariants = [
  {
    title: 'Successive shortest augmenting path',
    detail:
      'The standard approach with potentials and Dijkstra. Reliable and simple to implement.',
  },
  {
    title: 'Cycle canceling',
    detail:
      'Start with any feasible flow, then cancel negative cycles in the residual graph until none remain.',
  },
  {
    title: 'Cost scaling',
    detail:
      'Refines the solution with decreasing cost precision, reducing the number of shortest path runs.',
  },
  {
    title: 'Capacity scaling',
    detail:
      'Augment only along edges with large residual capacity first to reduce iterations.',
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
  {
    context: 'Supply chain planning',
    detail:
      'Balance production, transport, and storage costs with limits at each stage.',
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
    title: 'Fixed-flow variant',
    code: `Goal: send F = 4 units from s to t.
- Run SSAP normally
- Stop when totalFlow = 4 (even if more capacity remains)
- totalCost is minimal among all flows of value 4`,
    explanation:
      'This is useful when you have a strict demand or budget and do not want maximum throughput.',
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
  {
    title: 'Lower bounds transformation (sketch)',
    code: `For edge u->v with lower L and upper U:
- Replace capacity with (U-L)
- Track demand: demand[u] -= L, demand[v] += L
- Add super source Ss and super sink St
- Connect Ss -> v with capacity demand[v] (for demand > 0)
- Connect u -> St with capacity -demand[u] (for demand < 0)
- Add edge t -> s with capacity INF (for circulation)
- Feasible circulation exists if max flow from Ss to St saturates all Ss edges`,
    explanation:
      'This transforms circulation with lower bounds into a standard min-cost flow problem.',
  },
]

const pitfalls = [
  'Using Dijkstra without potentials in the presence of negative edge costs.',
  'Forgetting reverse edges or failing to update both directions during augmentation.',
  'Overflowing total cost with 32-bit integers on large graphs.',
  'Stopping early after a fixed flow when the requirement is max flow.',
  'Ignoring lower bounds or demands when the problem is a circulation with constraints.',
  'Updating potentials for unreachable nodes, which can introduce negative reduced costs.',
  'Reusing stale parent pointers when Dijkstra fails to reach t.',
]

const testingChecklist = [
  'Zero-cost edges and multiple shortest paths.',
  'Negative costs with no negative cycles (potentials must handle this).',
  'Disconnected graphs where no s-to-t path exists.',
  'Fixed-flow mode: stop exactly at F even if more capacity exists.',
  'Very large costs or capacities to verify 64-bit totals.',
  'Lower bounds transformation with a feasible circulation.',
]

const decisionGuidance = [
  'Use min-cost max-flow when you need the largest throughput and the cheapest total cost.',
  'If you only need max flow, use Dinic or Edmonds-Karp for simpler code.',
  'If edges have weights but capacity is 1, consider assignment algorithms like Hungarian.',
  'If the graph is undirected, convert each undirected edge into two directed edges.',
  'If you need fixed-flow min cost, stop after reaching that flow instead of max flow.',
  'If you need feasibility with lower bounds, solve circulation first, then optimize cost.',
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
  {
    title: 'Min-cost max-flow as LP',
    detail:
      'It is a linear program with flow conservation and capacity bounds; potentials are the dual variables.',
  },
]

const takeaways = [
  'Min-cost max-flow maximizes total flow while minimizing total cost across all edges.',
  'The residual graph and reverse edges are essential for optimality.',
  'Successive shortest augmenting paths plus potentials yields a reliable implementation.',
  'Complexity depends on max flow; large flows may need scaling optimizations.',
  'This model underpins logistics, assignment, and network optimization problems.',
  'Variants handle fixed flow, lower bounds, and circulation with demands.',
]

const glossaryTerms = [
  {
    term: 'Flow network',
    definition:
      'A directed graph with source s and sink t where each edge has capacity and per-unit cost.',
  },
  {
    term: 'Min-cost max-flow',
    definition:
      'A flow of maximum value from s to t that has minimum total cost among all maximum flows.',
  },
  {
    term: 'Residual graph',
    definition:
      'A graph of remaining options: forward edges with spare capacity and reverse edges to undo prior flow.',
  },
  {
    term: 'Reverse edge',
    definition:
      'An edge with negative cost used to cancel already-sent flow when a cheaper alternative appears.',
  },
  {
    term: 'Augmenting path',
    definition:
      'An s-to-t path in the residual graph along which additional flow can be pushed.',
  },
  {
    term: 'Bottleneck capacity',
    definition:
      'The minimum residual capacity on an augmenting path; this is the flow amount that can be sent.',
  },
  {
    term: 'Reduced cost',
    definition:
      'Reweighted edge cost c(u,v) + p(u) - p(v), computed using vertex potentials.',
  },
  {
    term: 'Potentials',
    definition:
      'Per-vertex values that keep reduced costs non-negative so Dijkstra can be used safely.',
  },
  {
    term: 'Fixed-flow min cost',
    definition:
      'A variant that sends exactly F units at minimum cost instead of maximizing total flow.',
  },
  {
    term: 'Circulation with demands',
    definition:
      'A constrained flow model with lower bounds and node supplies/demands transformed via super source/sink.',
  },
  {
    term: 'Cycle canceling',
    definition:
      'An approach that repeatedly removes negative-cost cycles in residual space until optimality is reached.',
  },
  {
    term: 'Cost scaling',
    definition:
      'A speed-up family that solves progressively finer cost approximations to reduce shortest-path iterations.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.mcmf-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.mcmf-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.mcmf-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.mcmf-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.mcmf-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.mcmf-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
}

.mcmf-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.mcmf-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.mcmf-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.mcmf-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.mcmf-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.mcmf-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.mcmf-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mcmf-toc-list li {
  margin: 0 0 8px;
}

.mcmf-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.mcmf-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.mcmf-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.mcmf-section {
  margin: 0 0 20px;
}

.mcmf-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.mcmf-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.mcmf-content p,
.mcmf-content li {
  font-size: 12px;
  line-height: 1.5;
}

.mcmf-content p {
  margin: 0 0 10px;
}

.mcmf-content ul,
.mcmf-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.mcmf-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.mcmf-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.mcmf-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .mcmf-main {
    grid-template-columns: 1fr;
  }

  .mcmf-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-definitions', label: 'Definitions' },
    { id: 'core-variants', label: 'Problem Variants' },
    { id: 'core-ssap', label: 'SSAP Workflow' },
    { id: 'core-correctness', label: 'Correctness Sketch' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-algo-variants', label: 'Algorithm Variants' },
    { id: 'core-decision', label: 'When To Use It' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-testing', label: 'Testing and Edge Cases' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function MinCostMaxFlowPage(): JSX.Element {
  const location = useLocation()
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
    document.title = `Min-Cost Max-Flow (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Min-Cost Max-Flow',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="mcmf-help-page">
      <style>{win98HelpStyles}</style>
      <div className="mcmf-window" role="presentation">
        <header className="mcmf-titlebar">
          <span className="mcmf-title-text">Min-Cost Max-Flow</span>
          <div className="mcmf-title-controls">
            <button className="mcmf-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="mcmf-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="mcmf-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`mcmf-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mcmf-main">
          <aside className="mcmf-toc" aria-label="Table of contents">
            <h2 className="mcmf-toc-title">Contents</h2>
            <ul className="mcmf-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="mcmf-content">
            <h1 className="mcmf-doc-title">Min-Cost Max-Flow</h1>
            <p>
              Min-cost max-flow finds a flow of maximum value from a source to a sink while minimizing the sum of edge costs.
              It is the workhorse for routing, assignment, and allocation problems where capacity and cost matter at the same
              time. This page covers the theory, the residual mechanics, and the standard efficient implementation.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="mcmf-section">
                  <h2 className="mcmf-heading">Overview</h2>
                  <h3 className="mcmf-subheading">Send the most flow while paying the least total cost</h3>
                  <p>
                    A max-flow ignores cost and only pushes as much as possible. A min-cost flow finds the cheapest way to ship a
                    specified amount. Min-cost max-flow combines both: first maximize the amount of flow, then choose the
                    cheapest configuration among all maximum flows.
                  </p>
                </section>
                <hr className="mcmf-divider" />
                <section id="bp-history" className="mcmf-section">
                  <h2 className="mcmf-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="mcmf-divider" />
                <section id="bp-models" className="mcmf-section">
                  <h2 className="mcmf-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="mcmf-divider" />
                <section id="bp-applications" className="mcmf-section">
                  <h2 className="mcmf-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="mcmf-divider" />
                <section id="bp-takeaways" className="mcmf-section">
                  <h2 className="mcmf-heading">Key Takeaways</h2>
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
                <section id="core-definitions" className="mcmf-section">
                  <h2 className="mcmf-heading">Definitions</h2>
                  {coreDefinitions.map((item) => (
                    <div key={item.heading}>
                      <h3 className="mcmf-subheading">{item.heading}</h3>
                      <ul>
                        {item.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-variants" className="mcmf-section">
                  <h2 className="mcmf-heading">Problem Variants and Modeling Tricks</h2>
                  {problemVariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-ssap" className="mcmf-section">
                  <h2 className="mcmf-heading">Successive Shortest Augmenting Path Workflow</h2>
                  <ol>
                    {algorithmSteps.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </li>
                    ))}
                  </ol>
                  <p>
                    Correctness idea: each augmentation sends flow along the cheapest available residual path. Potentials
                    preserve non-negative reduced costs so Dijkstra finds the true cheapest path in the original costs. Repeating
                    until no path exists yields maximum flow with minimum total cost.
                  </p>
                </section>
                <section id="core-correctness" className="mcmf-section">
                  <h2 className="mcmf-heading">Correctness Sketch</h2>
                  {correctnessSketch.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-implementation" className="mcmf-section">
                  <h2 className="mcmf-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="mcmf-section">
                  <h2 className="mcmf-heading">Complexity Analysis and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Performance depends on how large the max flow is. For huge flows or very large graphs, consider cost-scaling
                    or capacity scaling variants to reduce the number of augmentations.
                  </p>
                </section>
                <section id="core-algo-variants" className="mcmf-section">
                  <h2 className="mcmf-heading">Algorithm Variants and Upgrades</h2>
                  {algorithmVariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decision" className="mcmf-section">
                  <h2 className="mcmf-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-pitfalls" className="mcmf-section">
                  <h2 className="mcmf-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-testing" className="mcmf-section">
                  <h2 className="mcmf-heading">Testing and Edge Cases</h2>
                  <ul>
                    {testingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-advanced" className="mcmf-section">
                  <h2 className="mcmf-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="mcmf-section">
                <h2 className="mcmf-heading">Practical Examples</h2>
                {examples.map((item) => (
                  <div key={item.title}>
                    <h3 className="mcmf-subheading">{item.title}</h3>
                    <div className="mcmf-codebox">
                      <code>{item.code.trim()}</code>
                    </div>
                    <p>{item.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="mcmf-section">
                <h2 className="mcmf-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
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
