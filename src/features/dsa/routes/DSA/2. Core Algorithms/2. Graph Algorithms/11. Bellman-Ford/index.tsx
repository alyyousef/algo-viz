import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Bellman formalizes shortest paths as dynamic programming (1958)',
    detail:
      'Richard Bellman framed shortest paths as repeated relaxation of edges, showing that the best path with k edges can be built from best paths with k-1 edges.',
  },
  {
    title: 'Ford adapts the method for networks (1956 to 1959)',
    detail:
      'Lester Ford applied relaxation to transportation networks, leading to the algorithm now known as Bellman-Ford.',
  },
  {
    title: 'Negative weights and cycle detection become core strengths',
    detail:
      'Unlike Dijkstra, Bellman-Ford handles negative edges and can detect negative cycles, which makes it critical for constraint systems.',
  },
  {
    title: 'Routing protocols adopt distance-vector style (1980s)',
    detail:
      'Protocols like RIP used Bellman-Ford style updates, exchanging distance vectors between routers to converge on shortest paths.',
  },
]

const prerequisites = [
  {
    title: 'Directed weighted graph',
    detail:
      'Bellman-Ford works on directed graphs with positive, zero, or negative weights.',
  },
  {
    title: 'Single-source objective',
    detail:
      'Computes shortest paths from one source to all reachable nodes.',
  },
  {
    title: 'No negative cycles on shortest paths',
    detail:
      'If a reachable negative cycle exists, shortest paths are undefined.',
  },
  {
    title: 'Edge list access',
    detail:
      'The algorithm scans all edges repeatedly, so an explicit edge list is ideal.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Graph G(V, E) with weights, source s, and optionally a target t.',
  },
  {
    title: 'Output',
    detail:
      'Shortest distances to all nodes and parent pointers for paths, or a negative cycle report.',
  },
  {
    title: 'Optional',
    detail:
      'A list of nodes affected by negative cycles for diagnostics.',
  },
]

const formalDefinitions = [
  {
    title: 'Relaxation',
    detail:
      'If dist[u] + w < dist[v], update dist[v] and parent[v] = u.',
  },
  {
    title: 'Path length bound',
    detail:
      'Any simple path has at most V-1 edges, so V-1 rounds suffice for shortest paths.',
  },
  {
    title: 'Negative cycle test',
    detail:
      'If any edge relaxes on round V, a reachable negative cycle exists.',
  },
  {
    title: 'Infinity guard',
    detail:
      'Never relax from dist[u] = Infinity to avoid overflow and false updates.',
  },
]

const mentalModels = [
  {
    title: 'Relaxation as tightening a belt',
    detail:
      'Each pass tightens distance estimates. If an edge offers a shorter path, the estimate shrinks until no edge can improve it.',
  },
  {
    title: 'Layered paths',
    detail:
      'After the i-th pass, all shortest paths that use at most i edges are correct. After V-1 passes, all simple paths are covered.',
  },
  {
    title: 'Negative cycles as endless discounts',
    detail:
      'A negative cycle is a loop that keeps reducing cost. If you can still improve after V-1 passes, there is no well-defined shortest path.',
  },
]

const coreMechanics = [
  {
    title: 'Initialize distances',
    detail:
      'Set the start distance to 0 and all others to infinity. Store parents for reconstruction.',
  },
  {
    title: 'Relax every edge V-1 times',
    detail:
      'For each edge (u, v, w), if dist[u] + w < dist[v], update dist[v] and parent[v].',
  },
  {
    title: 'Detect negative cycles',
    detail:
      'Run one more pass. If any distance can still be improved, a negative cycle is reachable from the source.',
  },
]

const keyStructures = [
  {
    title: 'Edge list',
    detail:
      'Bellman-Ford iterates over all edges each pass, so an explicit list of (u, v, w) is the simplest representation.',
  },
  {
    title: 'Distance array',
    detail:
      'Holds the best-known distance from the source to every node. Infinity marks unreachable nodes.',
  },
  {
    title: 'Parent array',
    detail:
      'Tracks the predecessor used to reach each node. This is required to reconstruct paths after relaxation completes.',
  },
  {
    title: 'Updated flag',
    detail:
      'If no distances change in a full pass, you can stop early because all shortest paths are already settled.',
  },
]

const stepByStepFlow = [
  'Initialize dist[source] = 0 and all other distances to Infinity.',
  'Repeat V-1 times: scan all edges and relax whenever possible.',
  'Track parents for nodes that improve to enable path reconstruction.',
  'If a full pass makes no updates, stop early.',
  'Run one extra pass to check if any edge can still relax.',
  'If a relax is possible, report a reachable negative cycle.',
  'Otherwise, return distances and paths.',
]

const dataStructures = [
  {
    title: 'Edge list',
    detail:
      'List of (u, v, w) edges for fast iteration each round.',
  },
  {
    title: 'Distance array',
    detail:
      'Best-known distances from the source; Infinity marks unreachable nodes.',
  },
  {
    title: 'Parent array',
    detail:
      'Tracks last predecessor for path reconstruction.',
  },
  {
    title: 'Updated flag',
    detail:
      'Enables early termination when no edges relax in a round.',
  },
]

const correctnessNotes = [
  {
    title: 'Inductive path guarantee',
    detail:
      'After i rounds, all shortest paths using at most i edges are correct.',
  },
  {
    title: 'Cycle-free bound',
    detail:
      'Shortest paths without negative cycles use at most V-1 edges.',
  },
  {
    title: 'Negative cycle witness',
    detail:
      'Any relax on the V-th round implies a reachable negative cycle.',
  },
]

const terminationRules = [
  {
    title: 'Early stop',
    detail:
      'If a full pass yields no updates, the algorithm can terminate early because all distances are optimal.',
  },
  {
    title: 'Negative cycle check',
    detail:
      'If any edge can still be relaxed after V-1 passes, the graph has a reachable negative cycle.',
  },
  {
    title: 'Disconnected nodes',
    detail:
      'Unreachable nodes remain at infinity and are not affected by negative cycles in other components.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'O(VE) in the worst case, since each of V-1 passes scans all E edges. This is slower than Dijkstra on large sparse graphs.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(V + E) for storing edges and distance metadata. Distances themselves are O(V).',
  },
  {
    title: 'Early termination gain',
    detail:
      'If the graph has small diameter or few negative edges, early stop often reduces runtime significantly in practice.',
  },
  {
    title: 'Robustness tradeoff',
    detail:
      'Bellman-Ford trades speed for reliability under negative weights and for cycle detection, which many algorithms cannot provide.',
  },
]

const realWorldUses = [
  {
    context: 'Routing protocols',
    detail:
      'Distance-vector routing like RIP uses Bellman-Ford style updates to converge on shortest paths between routers.',
  },
  {
    context: 'Arbitrage detection',
    detail:
      'Currency exchange graphs can contain negative cycles after log-transforming rates, indicating risk-free profit loops.',
  },
  {
    context: 'Difference constraints',
    detail:
      'Scheduling problems can be expressed as inequalities. Bellman-Ford checks feasibility and derives minimal times.',
  },
  {
    context: 'Graph analytics with penalties',
    detail:
      'When edges represent costs with discounts or penalties, negative weights arise and Bellman-Ford remains valid.',
  },
]

const examples = [
  {
    title: 'Classic Bellman-Ford pseudocode',
    code: `function bellmanFord(vertices, edges, source):
    dist = array(|V|, Infinity)
    parent = array(|V|, null)
    dist[source] = 0

    for i in 1..|V|-1:
        updated = false
        for (u, v, w) in edges:
            if dist[u] != Infinity and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                updated = true
        if not updated: break

    for (u, v, w) in edges:
        if dist[u] != Infinity and dist[u] + w < dist[v]:
            return "negative cycle reachable"

    return dist, parent`,
    explanation:
      'The loop guarantees correct shortest paths for all nodes reachable by at most V-1 edges. A final pass tests for negative cycles.',
  },
  {
    title: 'Recovering a shortest path',
    code: `function buildPath(parent, target):
    path = []
    node = target
    while node != null:
        path.push(node)
        node = parent[node]
    return reverse(path)`,
    explanation:
      'Parents record the edge that last improved each node. Walking parents backward and reversing builds the path.',
  },
  {
    title: 'Difference constraints as a graph',
    code: `// Constraint: x_v - x_u <= w  => edge u -> v with weight w
edges = [
    (u, v, w1),
    (v, t, w2),
    (u, t, w3)
]
run bellmanFord to find shortest distances`,
    explanation:
      'If a negative cycle exists, the system is infeasible. Otherwise, distances give a valid assignment that satisfies all constraints.',
  },
]

const edgeCases = [
  'Unreachable nodes remain at Infinity.',
  'Negative cycle not reachable from the source does not affect results.',
  'Multiple edges between the same nodes should be treated separately.',
  'Undirected edges must be split into two directed edges.',
]

const pitfalls = [
  'Skipping the negative cycle check. Without it, you may report incorrect shortest paths.',
  'Using V passes instead of V-1 and then relying on the V-th pass for detection incorrectly.',
  'Overflowing when using large sentinel values for infinity. Guard against dist[u] + w when dist[u] is Infinity.',
  'Assuming parents always form a path. If a node is unreachable, its parent remains null.',
  'Mixing undirected edges without adding both directions. Bellman-Ford expects directed edges explicitly.',
]

const decisionGuidance = [
  'You need shortest paths with negative edge weights.',
  'You must detect negative cycles or infeasible constraints.',
  'The graph is small to medium, or you can tolerate O(VE) runtime.',
  "You want a reliable baseline or a subroutine for Johnson's algorithm.",
  'You can benefit from early termination in practice.',
]

const implementationNotes = [
  {
    title: 'Early stop is safe',
    detail:
      'If no updates occur in a full pass, all shortest paths are final.',
  },
  {
    title: 'Cycle extraction',
    detail:
      'To extract a negative cycle, follow parent pointers V times to enter the cycle.',
  },
  {
    title: 'Overflow protection',
    detail:
      'Use large sentinels and check dist[u] before adding weights.',
  },
  {
    title: 'Sparse optimization',
    detail:
      'SPFA can be faster on average but still has worst-case O(VE).',
  },
]

const advancedInsights = [
  {
    title: "Johnson's algorithm uses Bellman-Ford",
    detail:
      'Bellman-Ford computes a potential function to reweight edges and remove negative weights, enabling fast Dijkstra runs from every node.',
  },
  {
    title: 'Negative cycle localization',
    detail:
      'If a node relaxes on the V-th pass, it is part of or reachable from a negative cycle. Backtracking parents can help extract the cycle.',
  },
  {
    title: 'SPFA tradeoffs',
    detail:
      'The queue-based SPFA often runs faster on sparse graphs but still has worst-case O(VE) time and can degrade on adversarial inputs.',
  },
  {
    title: 'Edge ordering effects',
    detail:
      'Relaxing edges in topological-like order can reduce iterations. In practice, grouping edges by source improves cache locality.',
  },
]

const takeaways = [
  'Bellman-Ford is the go-to shortest path algorithm when negative edges are present.',
  'Relaxation over V-1 passes guarantees correct shortest paths on graphs without negative cycles.',
  'The algorithm detects negative cycles, enabling feasibility checks for constraint systems.',
  'Early termination and careful edge handling can improve runtime in real workloads.',
  'It trades speed for robustness and correctness in tricky graphs.',
]

const variantTable = [
  {
    variant: 'Bellman-Ford',
    graphType: 'Weighted, negative edges allowed',
    guarantee: 'Shortest paths or negative cycle detection',
    useCase: 'General shortest paths with negative weights',
  },
  {
    variant: 'Bellman-Ford + early stop',
    graphType: 'Weighted, negative edges allowed',
    guarantee: 'Same as Bellman-Ford, often faster',
    useCase: 'Practical graphs with small diameter',
  },
  {
    variant: 'SPFA',
    graphType: 'Weighted, negative edges allowed',
    guarantee: 'Same as Bellman-Ford, but worst-case slow',
    useCase: 'Sparse graphs, incremental updates',
  },
]

const glossaryTerms = [
  { term: 'Relaxation', definition: 'Updating a node distance when a shorter path is found through an edge.' },
  { term: 'Distance array', definition: 'Best-known shortest distances from the source to each node.' },
  { term: 'Parent array', definition: 'Predecessor pointers used to reconstruct shortest paths.' },
  { term: 'Infinity guard', definition: 'Skip relaxations from unreachable nodes to avoid invalid arithmetic.' },
  { term: 'Negative cycle', definition: 'A cycle with total weight less than zero, making shortest paths undefined.' },
  { term: 'Early stop', definition: 'Optimization that exits when a full pass produces no relaxations.' },
  { term: 'V-1 passes', definition: 'Maximum needed to settle all simple shortest paths in a graph of V nodes.' },
  { term: 'V-th pass check', definition: 'Extra pass used to detect reachable negative cycles.' },
  { term: 'SPFA', definition: 'Queue-based variant that is often faster in practice but same worst-case class.' },
  { term: 'Difference constraints', definition: 'Inequality systems reducible to shortest-path feasibility checks.' },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98BellmanHelpStyles = `
.bell-help-page{min-height:100dvh;background:#c0c0c0;padding:0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif;}
.bell-help-window{border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040;background:#c0c0c0;width:100%;min-height:100dvh;margin:0;display:flex;flex-direction:column;box-sizing:border-box;}
.bell-help-titlebar{position:relative;display:flex;align-items:center;min-height:22px;padding:2px 4px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700;}
.bell-help-title{position:absolute;left:50%;transform:translateX(-50%);font-size:16px;white-space:nowrap;}
.bell-help-controls{display:flex;gap:2px;margin-left:auto;}
.bell-help-control{width:18px;height:16px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font-size:11px;line-height:1;}
.bell-help-tabs{display:flex;gap:1px;padding:6px 8px 0;}
.bell-help-tab{border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;padding:5px 10px 4px;font-size:12px;cursor:pointer;}
.bell-help-tab.active{background:#fff;position:relative;top:1px;}
.bell-help-main{border-top:1px solid #404040;background:#fff;flex:1;min-height:0;display:grid;grid-template-columns:240px 1fr;}
.bell-help-toc{border-right:1px solid #808080;background:#f2f2f2;padding:12px;overflow:auto;}
.bell-help-toc-title{margin:0 0 10px;font-size:12px;font-weight:700;}
.bell-help-toc-list{list-style:none;margin:0;padding:0;}
.bell-help-toc-list li{margin:0 0 8px;}
.bell-help-toc-list a{color:#000;text-decoration:none;font-size:12px;}
.bell-help-content{padding:14px 20px 20px;overflow:auto;}
.bell-help-doc-title{margin:0 0 10px;font-size:20px;font-weight:700;}
.bell-help-content p,.bell-help-content li{font-size:12px;line-height:1.5;}
.bell-help-content p{margin:0 0 10px;}
.bell-help-content ul,.bell-help-content ol{margin:0 0 10px 20px;padding:0;}
.bell-help-section{margin:0 0 20px;}
.bell-help-heading{margin:0 0 8px;font-size:16px;font-weight:700;}
.bell-help-subheading{margin:0 0 6px;font-size:13px;font-weight:700;}
.bell-help-divider{border:0;border-top:1px solid #d0d0d0;margin:14px 0;}
.bell-help-codebox{margin:6px 0 10px;padding:8px;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff;background:#f4f4f4;}
.bell-help-codebox code{display:block;white-space:pre;font-family:"Courier New",Courier,monospace;font-size:12px;}
.bell-help-link{color:#000080;}
@media (max-width:900px){.bell-help-main{grid-template-columns:1fr;}.bell-help-toc{border-right:none;border-bottom:1px solid #808080;}}
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
    { id: 'bp-prerequisites', label: 'Prerequisites and Definitions' },
    { id: 'bp-io', label: 'Inputs and Outputs' },
    { id: 'bp-formal', label: 'Formal Concepts' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'Core Mechanics' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-structures', label: 'Data Structures and Invariants' },
    { id: 'core-termination', label: 'Termination Rules' },
    { id: 'core-correctness', label: 'Correctness Sketch' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-variants', label: 'Variants and Guarantees' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-edge-cases', label: 'Edge Cases' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decision', label: 'When to Use It' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function BellmanFordPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Bellman-Ford (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tab)
    setSearchParams(nextParams, { replace: true })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Bellman-Ford',
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
    <div className="bell-help-page">
      <style>{win98BellmanHelpStyles}</style>
      <div className="bell-help-window" role="presentation">
        <header className="bell-help-titlebar">
          <span className="bell-help-title">Bellman-Ford - Help</span>
          <div className="bell-help-controls">
            <button className="bell-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="bell-help-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="bell-help-tabs" role="tablist" aria-label="Major sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`bell-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bell-help-main">
          <aside className="bell-help-toc" aria-label="Table of contents">
            <h2 className="bell-help-toc-title">Contents</h2>
            <ul className="bell-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="bell-help-content">
            <h1 className="bell-help-doc-title">Bellman-Ford</h1>
            <p>
              Bellman-Ford computes shortest paths from a single source by repeatedly relaxing all edges. It is slower than
              Dijkstra, but it handles negative weights and detects negative cycles, making it a trusted baseline for
              constraint systems, routing, and graph analytics.
            </p>
            <p>
              <Link to="/algoViz" className="bell-help-link">
                Back to Catalog
              </Link>
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="bell-help-section">
                  <h2 className="bell-help-heading">Overview</h2>
                  <p>
                    Bellman-Ford is a dynamic programming shortest path algorithm that works on graphs with negative edges. It
                    iteratively improves distance estimates by checking every edge. After V-1 passes, the shortest path to each
                    reachable node is guaranteed to be correct, and an extra pass reveals any negative cycle.
                  </p>
                </section>
                <hr className="bell-help-divider" />
                <section id="bp-prerequisites" className="bell-help-section">
                  <h2 className="bell-help-heading">Prerequisites and Definitions</h2>
                  {prerequisites.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="bell-help-divider" />
                <section id="bp-io" className="bell-help-section">
                  <h2 className="bell-help-heading">Inputs and Outputs</h2>
                  {inputsOutputs.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="bell-help-divider" />
                <section id="bp-formal" className="bell-help-section">
                  <h2 className="bell-help-heading">Formal Concepts</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="bell-help-divider" />
                <section id="bp-history" className="bell-help-section">
                  <h2 className="bell-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="bell-help-divider" />
                <section id="bp-takeaways" className="bell-help-section">
                  <h2 className="bell-help-heading">Key Takeaways</h2>
                  <ul>{takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental-models" className="bell-help-section">
                  <h2 className="bell-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-mechanics" className="bell-help-section">
                  <h2 className="bell-help-heading">Core Mechanics</h2>
                  {coreMechanics.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-flow" className="bell-help-section">
                  <h2 className="bell-help-heading">Step-by-Step Flow</h2>
                  <ol>{stepByStepFlow.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section id="core-structures" className="bell-help-section">
                  <h2 className="bell-help-heading">Data Structures and Invariants</h2>
                  <h3 className="bell-help-subheading">Key Structures</h3>
                  {keyStructures.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                  <h3 className="bell-help-subheading">Implementation Structures</h3>
                  {dataStructures.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-termination" className="bell-help-section">
                  <h2 className="bell-help-heading">Termination Rules</h2>
                  {terminationRules.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                  <p>
                    The correctness guarantee comes from the fact that any shortest path without cycles has at most V-1 edges. Each
                    pass guarantees correctness for paths with one more edge, so V-1 passes suffice unless a negative cycle exists.
                  </p>
                </section>
                <section id="core-correctness" className="bell-help-section">
                  <h2 className="bell-help-heading">Correctness Sketch</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-complexity" className="bell-help-section">
                  <h2 className="bell-help-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                  <p>
                    Bellman-Ford is not the fastest for large graphs, but it is reliable in the presence of negative weights and
                    can provide critical cycle detection that faster algorithms cannot.
                  </p>
                </section>
                <section id="core-variants" className="bell-help-section">
                  <h2 className="bell-help-heading">Variants and Guarantees</h2>
                  <ul>
                    {variantTable.map((row) => (
                      <li key={row.variant}>
                        <strong>{row.variant}:</strong> Graph type: {row.graphType}. Guarantee: {row.guarantee}. Typical use case: {row.useCase}.
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-applications" className="bell-help-section">
                  <h2 className="bell-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}><strong>{item.context}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-edge-cases" className="bell-help-section">
                  <h2 className="bell-help-heading">Edge Cases Checklist</h2>
                  <ul>{edgeCases.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section id="core-pitfalls" className="bell-help-section">
                  <h2 className="bell-help-heading">Common Pitfalls</h2>
                  <ul>{pitfalls.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section id="core-decision" className="bell-help-section">
                  <h2 className="bell-help-heading">When to Use It</h2>
                  <ol>{decisionGuidance.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section id="core-implementation" className="bell-help-section">
                  <h2 className="bell-help-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-advanced" className="bell-help-section">
                  <h2 className="bell-help-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="bell-help-section">
                <h2 className="bell-help-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="bell-help-subheading">{example.title}</h3>
                    <div className="bell-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="bell-help-section">
                <h2 className="bell-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}><strong>{item.term}:</strong> {item.definition}</p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

