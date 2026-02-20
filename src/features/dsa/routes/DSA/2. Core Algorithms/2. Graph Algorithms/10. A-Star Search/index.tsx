import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'A* introduced by Hart, Nilsson, and Raphael (1968)',
    detail:
      'A* unified uniform-cost search and heuristic guidance, proving optimality when the heuristic is admissible and consistent.',
  },
  {
    title: 'Pathfinding in robotics and AI planning (1970s)',
    detail:
      'The algorithm became a default for navigation and planning tasks because it balances accuracy with speed.',
  },
  {
    title: 'Game development adoption (1990s)',
    detail:
      'Real-time games used A* on grids and navigation meshes, showing that heuristic search could scale to interactive workloads.',
  },
  {
    title: 'Modern variants and hybrid heuristics (2000s to now)',
    detail:
      'Techniques like weighted A*, hierarchical A*, and jump point search refined performance for large maps and routing.',
  },
]

const prerequisites = [
  {
    title: 'Graph with non-negative edge weights',
    detail:
      'A* assumes non-negative costs so that shorter paths remain valid during expansion.',
  },
  {
    title: 'Heuristic function h(n)',
    detail:
      'An estimate of the remaining cost to the goal. Quality of h determines speed.',
  },
  {
    title: 'State representation',
    detail:
      'Each node represents a state; neighbors and edge costs must be well-defined.',
  },
  {
    title: 'Start and goal nodes',
    detail:
      'A* solves a single-source single-target shortest path problem.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Graph G(V, E), start s, goal t, edge costs, and a heuristic h(n).',
  },
  {
    title: 'Output',
    detail:
      'Shortest path from s to t and its total cost, or failure if unreachable.',
  },
  {
    title: 'Optional',
    detail:
      'Explored set, cost maps, and parent links for visualization and debugging.',
  },
]

const formalDefinitions = [
  {
    title: 'g(n)',
    detail:
      'Cost of the best-known path from start to node n.',
  },
  {
    title: 'h(n)',
    detail:
      'Heuristic estimate of the cost from n to the goal.',
  },
  {
    title: 'f(n)',
    detail:
      'Evaluation function f(n) = g(n) + h(n) used to rank nodes.',
  },
  {
    title: 'Admissible heuristic',
    detail:
      'h(n) never overestimates the true remaining cost.',
  },
  {
    title: 'Consistent heuristic',
    detail:
      'h(n) <= cost(n, n2) + h(n2) for every edge (n, n2).',
  },
]

const mentalModels = [
  {
    title: 'Best-first with a compass',
    detail:
      'A* follows the cheapest known path so far, but the heuristic acts like a compass pointing toward the goal.',
  },
  {
    title: 'g + h scoring',
    detail:
      'The score f(n) = g(n) + h(n) blends exact cost traveled with estimated cost remaining.',
  },
  {
    title: 'Optimism keeps it safe',
    detail:
      'If the heuristic never overestimates, A* will never miss the optimal path. It explores just enough to prove optimality.',
  },
]

const coreMechanics = [
  {
    title: 'Open and closed sets',
    detail:
      'Open contains frontier nodes ordered by lowest f score. Closed contains nodes already fully expanded.',
  },
  {
    title: 'Relax neighbors with g scores',
    detail:
      'When a cheaper path to a neighbor is found, update its g score, parent, and f score.',
  },
  {
    title: 'Goal test at expansion',
    detail:
      'The first time the goal is popped from the priority queue, the optimal path is known (with consistent heuristics).',
  },
]

const heuristicRules = [
  {
    title: 'Admissible',
    detail:
      'Never overestimates the true remaining cost. Guarantees optimal paths but may explore more.',
  },
  {
    title: 'Consistent (monotone)',
    detail:
      'Heuristic obeys the triangle inequality: h(n) <= cost(n, n2) + h(n2). Ensures no re-expansions.',
  },
  {
    title: 'Informed',
    detail:
      'Closer to the true distance yields fewer expansions. Good heuristics can reduce the search dramatically.',
  },
]

const keyStructures = [
  {
    title: 'Priority queue (min-heap)',
    detail:
      'Orders nodes by f = g + h, so the most promising node is expanded first.',
  },
  {
    title: 'Distance maps',
    detail:
      'Store g scores (best known cost from start). Used to decide whether a better path exists.',
  },
  {
    title: 'Parent pointers',
    detail:
      'Track how each node was reached. Needed to reconstruct the final path.',
  },
  {
    title: 'Closed set',
    detail:
      'Marks nodes already expanded to avoid redundant work when the heuristic is consistent.',
  },
]

const stepByStepFlow = [
  'Initialize open set with start, g(start) = 0, f(start) = h(start).',
  'Pop the node with the smallest f from the priority queue.',
  'If it is the goal, reconstruct the path by following parent pointers.',
  'For each neighbor, compute tentative g and relax if it improves the best known g.',
  'Update the neighbor f and parent, then push or decrease-key in the open set.',
  'Mark the current node closed and repeat until open is empty.',
]

const dataStructures = [
  {
    title: 'Priority queue with decrease-key',
    detail:
      'Supports efficient updates when a better path to an open node is found.',
  },
  {
    title: 'g-score map',
    detail:
      'Tracks best-known cost from start to each node.',
  },
  {
    title: 'f-score map',
    detail:
      'Stores g + h to avoid recomputation in the heap.',
  },
  {
    title: 'Parent map',
    detail:
      'Allows path reconstruction after reaching the goal.',
  },
  {
    title: 'Closed set',
    detail:
      'Prevents redundant expansions when heuristics are consistent.',
  },
]

const terminationRules = [
  {
    title: 'Goal popped from open set',
    detail:
      'With a consistent heuristic, the first time the goal is expanded, the path is optimal.',
  },
  {
    title: 'No path',
    detail:
      'If the open set becomes empty, the goal is unreachable from the start.',
  },
  {
    title: 'Weighted A*',
    detail:
      'When you inflate h by a weight, you trade optimality for speed and should stop at first goal pop.',
  },
]

const correctnessNotes = [
  {
    title: 'Admissibility implies optimality',
    detail:
      'If h never overestimates, A* will not skip the optimal path.',
  },
  {
    title: 'Consistency prevents re-openings',
    detail:
      'With a consistent h, once a node is closed its best path is final.',
  },
  {
    title: 'Goal pop is a proof',
    detail:
      'When the goal is popped, no cheaper path remains in the open set.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Worst-case is exponential in path length, but good heuristics dramatically reduce expansions.',
  },
  {
    title: 'Space complexity',
    detail:
      'A* stores all frontier nodes, so memory can be the limiting factor on large graphs.',
  },
  {
    title: 'Heuristic sensitivity',
    detail:
      'A small heuristic improves over Dijkstra. A near-perfect heuristic can make search almost linear in path length.',
  },
  {
    title: 'Consistency advantage',
    detail:
      'Consistent heuristics avoid re-opening nodes, reducing overhead and simplifying correctness.',
  },
]

const realWorldUses = [
  {
    context: 'Game AI pathfinding',
    detail:
      'A* is the standard for grid and navmesh pathfinding because it is fast and reliable with geometric heuristics.',
  },
  {
    context: 'Robotics navigation',
    detail:
      'Robots use A* to plan collision-free paths by combining map costs with heuristic distance to targets.',
  },
  {
    context: 'Logistics and routing',
    detail:
      'Route planning uses A* with travel-time heuristics or landmarks to speed up shortest path queries.',
  },
  {
    context: 'Puzzle solving',
    detail:
      'A* is a classic solver for sliding puzzles and planning tasks where good heuristics are known.',
  },
]

const examples = [
  {
    title: 'A* pseudocode',
    code: `function aStar(graph, start, goal, h):
    open = MinHeap((f=0, node=start))
    g = Map(start -> 0)
    parent = Map(start -> null)
    closed = Set()

    while open not empty:
        current = open.popMin()
        if current == goal: return reconstruct(parent, goal)
        if current in closed: continue
        closed.add(current)
        for each (neighbor, cost) in graph[current]:
            tentative = g[current] + cost
            if tentative < g.get(neighbor, Infinity):
                g[neighbor] = tentative
                parent[neighbor] = current
                f = tentative + h(neighbor)
                open.push((f, neighbor))

    return null`,
    explanation:
      'The priority queue orders nodes by f score. With an admissible heuristic, the first time you expand the goal, the path is optimal.',
  },
  {
    title: 'Grid heuristic choices',
    code: `Manhattan: |dx| + |dy| for 4-way grids
Euclidean: sqrt(dx^2 + dy^2) for continuous space
Octile: max(dx, dy) + (sqrt(2) - 1) * min(dx, dy) for 8-way grids`,
    explanation:
      'Match the heuristic to the movement model. Using the wrong heuristic makes A* less informed or even inadmissible.',
  },
  {
    title: 'Weighted A* for speed',
    code: `f(n) = g(n) + w * h(n)  // w > 1
// Larger w explores fewer nodes but may yield suboptimal paths.`,
    explanation:
      'Weighted A* sacrifices optimality to reduce search time, useful in real-time systems where speed matters more than perfect paths.',
  },
  {
    title: 'Worked mini-example',
    code: `Edges (cost):
S-A:1, S-B:4, A-C:2, B-C:1, C-G:3
Heuristic h: h(S)=5, h(A)=4, h(B)=2, h(C)=2, h(G)=0

Start: g(S)=0 f(S)=5
Pop S -> relax A (g=1 f=5), B (g=4 f=6)
Pop A -> relax C (g=3 f=5)
Pop C -> relax G (g=6 f=6)
Pop B -> relax C via B (g=5) no improvement
Pop G -> done
Path: S-A-C-G cost 6`,
    explanation:
      'The heuristic guides the search toward C and G while still proving the optimal route.',
  },
]

const edgeCases = [
  'No path from start to goal: open set empties and returns failure.',
  'Zero-cost edges: still valid, but heuristics must remain admissible.',
  'Inconsistent heuristic: may need to re-open nodes when better paths appear.',
  'Multiple optimal paths: tie-breaking affects which path is returned.',
]

const pitfalls = [
  'Using a heuristic that overestimates, which breaks optimality guarantees.',
  'Forgetting to update a node in the open set when a shorter path is found.',
  'Using a closed set with an inconsistent heuristic, causing missed better paths.',
  'Ignoring edge costs on weighted graphs, effectively turning A* into greedy best-first.',
  'Letting the open set grow without bounds on huge graphs without pruning or hierarchy.',
]

const decisionGuidance = [
  'You need shortest paths and have a reasonable heuristic.',
  'The graph is too large for plain Dijkstra but you can estimate distance to goal.',
  'Optimality matters and negative edges are not involved.',
  'You can afford extra memory for the open set and parent tracking.',
  'You want tunable behavior through heuristics or weights.',
]

const implementationNotes = [
  {
    title: 'Tie-breaking',
    detail:
      'When f ties, prefer larger g to reduce zig-zag in grid maps.',
  },
  {
    title: 'Decrease-key workaround',
    detail:
      'If the heap lacks decrease-key, push duplicates and ignore stale entries.',
  },
  {
    title: 'Heuristic scaling',
    detail:
      'Weighted A* uses f = g + w*h. Pick w carefully to bound suboptimality.',
  },
  {
    title: 'Grid heuristics',
    detail:
      'Manhattan for 4-way, octile for 8-way, Euclidean for continuous movement.',
  },
]

const advancedInsights = [
  {
    title: 'Heuristic design matters most',
    detail:
      'A* performance lives or dies by h. Domain-specific heuristics or landmark-based estimates can cut expansions by orders of magnitude.',
  },
  {
    title: 'Consistency avoids re-openings',
    detail:
      'If h is consistent, once a node is closed it never needs revisiting. This simplifies implementation and boosts speed.',
  },
  {
    title: 'Hybrid with preprocessing',
    detail:
      'Combining A* with contraction hierarchies or hierarchical grids yields fast paths on huge graphs.',
  },
  {
    title: 'Tie-breaking strategies',
    detail:
      'When f scores tie, breaking by larger g can reduce path zig-zagging and improve performance in grids.',
  },
]

const variants = [
  {
    variant: 'A* with consistent heuristic',
    guarantee: 'Optimal and no node re-expansions',
    tradeoff: 'Requires careful heuristic design',
  },
  {
    variant: 'Weighted A*',
    guarantee: 'Bounded suboptimality (if w is fixed)',
    tradeoff: 'Faster but not always optimal',
  },
  {
    variant: 'IDA*',
    guarantee: 'Optimal with admissible h',
    tradeoff: 'Lower memory, more re-expansions',
  },
]

const takeaways = [
  'A* blends exact cost so far with heuristic guidance toward the goal.',
  'Admissible heuristics guarantee optimality; consistent heuristics simplify the algorithm.',
  'Performance scales with heuristic quality and open set size.',
  'Weighted A* trades optimality for speed when real-time response is required.',
  'A* is the default for shortest path in many practical domains.',
]

const variantTable = [
  {
    variant: 'A*',
    graphType: 'Weighted, non-negative edges',
    guarantee: 'Optimal with admissible heuristic',
    useCase: 'General pathfinding with good heuristics',
  },
  {
    variant: 'Weighted A*',
    graphType: 'Weighted, non-negative edges',
    guarantee: 'Bounded suboptimality',
    useCase: 'Real-time pathfinding where speed is critical',
  },
  {
    variant: 'Dijkstra (h = 0)',
    graphType: 'Weighted, non-negative edges',
    guarantee: 'Optimal without heuristic',
    useCase: 'Baseline shortest path when no heuristic exists',
  },
]

const glossaryTerms = [
  { term: 'A* search', definition: 'Shortest-path algorithm using f(n) = g(n) + h(n).' },
  { term: 'g(n)', definition: 'Best-known exact cost from start to node n.' },
  { term: 'h(n)', definition: 'Estimated remaining cost from n to the goal.' },
  { term: 'f(n)', definition: 'Evaluation score combining traveled and estimated remaining cost.' },
  { term: 'Admissible heuristic', definition: 'Heuristic that never overestimates the true remaining cost.' },
  { term: 'Consistent heuristic', definition: 'Heuristic obeying triangle inequality across edges.' },
  { term: 'Open set', definition: 'Priority queue of discovered frontier nodes not yet expanded.' },
  { term: 'Closed set', definition: 'Expanded nodes finalized under consistent heuristics.' },
  { term: 'Weighted A*', definition: 'Variant using f = g + w*h to trade optimality for speed.' },
  { term: 'IDA*', definition: 'Iterative deepening A* with lower memory and more re-expansions.' },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98AStarHelpStyles = `
.astar-help-page{min-height:100dvh;background:#c0c0c0;padding:0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif;}
.astar-help-window{border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040;background:#c0c0c0;width:100%;min-height:100dvh;margin:0;display:flex;flex-direction:column;box-sizing:border-box;}
.astar-help-titlebar{position:relative;display:flex;align-items:center;min-height:22px;padding:2px 4px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700;}
.astar-help-title{position:absolute;left:50%;transform:translateX(-50%);font-size:16px;white-space:nowrap;}
.astar-help-controls{display:flex;gap:2px;margin-left:auto;}
.astar-help-control{width:18px;height:16px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font-size:11px;line-height:1;}
.astar-help-tabs{display:flex;gap:1px;padding:6px 8px 0;}
.astar-help-tab{border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;padding:5px 10px 4px;font-size:12px;cursor:pointer;}
.astar-help-tab.active{background:#fff;position:relative;top:1px;}
.astar-help-main{border-top:1px solid #404040;background:#fff;flex:1;min-height:0;display:grid;grid-template-columns:240px 1fr;}
.astar-help-toc{border-right:1px solid #808080;background:#f2f2f2;padding:12px;overflow:auto;}
.astar-help-toc-title{margin:0 0 10px;font-size:12px;font-weight:700;}
.astar-help-toc-list{list-style:none;margin:0;padding:0;}
.astar-help-toc-list li{margin:0 0 8px;}
.astar-help-toc-list a{color:#000;text-decoration:none;font-size:12px;}
.astar-help-content{padding:14px 20px 20px;overflow:auto;}
.astar-help-doc-title{margin:0 0 10px;font-size:20px;font-weight:700;}
.astar-help-content p,.astar-help-content li{font-size:12px;line-height:1.5;}
.astar-help-content p{margin:0 0 10px;}
.astar-help-content ul,.astar-help-content ol{margin:0 0 10px 20px;padding:0;}
.astar-help-section{margin:0 0 20px;}
.astar-help-heading{margin:0 0 8px;font-size:16px;font-weight:700;}
.astar-help-subheading{margin:0 0 6px;font-size:13px;font-weight:700;}
.astar-help-divider{border:0;border-top:1px solid #d0d0d0;margin:14px 0;}
.astar-help-codebox{margin:6px 0 10px;padding:8px;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff;background:#f4f4f4;}
.astar-help-codebox code{display:block;white-space:pre;font-family:"Courier New",Courier,monospace;font-size:12px;}
.astar-help-link{color:#000080;}
@media (max-width:900px){.astar-help-main{grid-template-columns:1fr;}.astar-help-toc{border-right:none;border-bottom:1px solid #808080;}}
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
    { id: 'core-heuristics', label: 'Heuristic Rules' },
    { id: 'core-structures', label: 'Data Structures' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-termination', label: 'Termination Rules' },
    { id: 'core-correctness', label: 'Correctness Sketch' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-edge-cases', label: 'Edge Cases' },
    { id: 'core-variants-guarantees', label: 'Variants and Guarantees' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-decision', label: 'When to Use It' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-extensions', label: 'Variants and Extensions' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function AStarSearchPage(): JSX.Element {
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
    document.title = `A-Star Search (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tab)
    setSearchParams(nextParams, { replace: true })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'A-Star Search',
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
    <div className="astar-help-page">
      <style>{win98AStarHelpStyles}</style>
      <div className="astar-help-window" role="presentation">
        <header className="astar-help-titlebar">
          <span className="astar-help-title">A-Star Search - Help</span>
          <div className="astar-help-controls">
            <button className="astar-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="astar-help-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="astar-help-tabs" role="tablist" aria-label="Major sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`astar-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="astar-help-main">
          <aside className="astar-help-toc" aria-label="Table of contents">
            <h2 className="astar-help-toc-title">Contents</h2>
            <ul className="astar-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="astar-help-content">
            <h1 className="astar-help-doc-title">A-Star Search</h1>
            <p>
              A* Search finds the shortest path by combining the cost already traveled with a heuristic estimate of the cost
              remaining. When the heuristic is admissible, it is both fast and optimal, making it the go-to algorithm for
              routing, games, robotics, and puzzle solving.
            </p>
            <p>
              <Link to="/algoViz" className="astar-help-link">
                Back to Catalog
              </Link>
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="astar-help-section">
                  <h2 className="astar-help-heading">Overview</h2>
                  <p>
                    A* sits between Dijkstra and greedy best-first search. Dijkstra explores in all directions with guaranteed
                    optimality; greedy search rushes toward the goal but can miss the best path. A* mixes both: g(n) measures the
                    path cost so far, while h(n) estimates the remaining cost. The sum f(n) guides the search to explore the most
                    promising nodes first without sacrificing optimality.
                  </p>
                </section>
                <hr className="astar-help-divider" />
                <section id="bp-prerequisites" className="astar-help-section">
                  <h2 className="astar-help-heading">Prerequisites and Definitions</h2>
                  {prerequisites.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="astar-help-divider" />
                <section id="bp-io" className="astar-help-section">
                  <h2 className="astar-help-heading">Inputs and Outputs</h2>
                  {inputsOutputs.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="astar-help-divider" />
                <section id="bp-formal" className="astar-help-section">
                  <h2 className="astar-help-heading">Formal Concepts</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="astar-help-divider" />
                <section id="bp-history" className="astar-help-section">
                  <h2 className="astar-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <hr className="astar-help-divider" />
                <section id="bp-takeaways" className="astar-help-section">
                  <h2 className="astar-help-heading">Key Takeaways</h2>
                  <ul>{takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental-models" className="astar-help-section">
                  <h2 className="astar-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-mechanics" className="astar-help-section">
                  <h2 className="astar-help-heading">Core Mechanics</h2>
                  {coreMechanics.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-heuristics" className="astar-help-section">
                  <h2 className="astar-help-heading">Heuristic Rules of Thumb</h2>
                  {heuristicRules.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                  <p>A heuristic that is optimistic but informative is the sweet spot. Overestimation speeds the search but risks missing the true shortest path.</p>
                </section>
                <section id="core-structures" className="astar-help-section">
                  <h2 className="astar-help-heading">Data Structures and Invariants</h2>
                  <h3 className="astar-help-subheading">Key Structures</h3>
                  {keyStructures.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                  <h3 className="astar-help-subheading">Implementation Structures</h3>
                  {dataStructures.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-flow" className="astar-help-section">
                  <h2 className="astar-help-heading">Step-by-Step Flow</h2>
                  <ol>{stepByStepFlow.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section id="core-termination" className="astar-help-section">
                  <h2 className="astar-help-heading">Termination Rules</h2>
                  {terminationRules.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                  <p>
                    If h is admissible and consistent, A* expands nodes in nondecreasing optimal path cost. That is why the first
                    expansion of the goal yields the shortest path.
                  </p>
                </section>
                <section id="core-correctness" className="astar-help-section">
                  <h2 className="astar-help-heading">Correctness Sketch</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-complexity" className="astar-help-section">
                  <h2 className="astar-help-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}><strong>{note.title}:</strong> {note.detail}</p>
                  ))}
                  <p>
                    A* trades memory for speed. It can be dramatically faster than Dijkstra, but it requires storing the frontier
                    and heuristic metadata.
                  </p>
                </section>
                <section id="core-edge-cases" className="astar-help-section">
                  <h2 className="astar-help-heading">Edge Cases Checklist</h2>
                  <ul>{edgeCases.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section id="core-variants-guarantees" className="astar-help-section">
                  <h2 className="astar-help-heading">Variants and Guarantees</h2>
                  <ul>
                    {variantTable.map((row) => (
                      <li key={row.variant}>
                        <strong>{row.variant}:</strong> Graph type: {row.graphType}. Guarantee: {row.guarantee}. Typical use case: {row.useCase}.
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-applications" className="astar-help-section">
                  <h2 className="astar-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}><strong>{item.context}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-pitfalls" className="astar-help-section">
                  <h2 className="astar-help-heading">Common Pitfalls</h2>
                  <ul>{pitfalls.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section id="core-decision" className="astar-help-section">
                  <h2 className="astar-help-heading">When to Use It</h2>
                  <ol>{decisionGuidance.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section id="core-implementation" className="astar-help-section">
                  <h2 className="astar-help-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-advanced" className="astar-help-section">
                  <h2 className="astar-help-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="core-extensions" className="astar-help-section">
                  <h2 className="astar-help-heading">Variants and Extensions</h2>
                  <ul>
                    {variants.map((row) => (
                      <li key={row.variant}><strong>{row.variant}:</strong> Guarantee: {row.guarantee}. Tradeoff: {row.tradeoff}.</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="astar-help-section">
                <h2 className="astar-help-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="astar-help-subheading">{example.title}</h3>
                    <div className="astar-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="astar-help-section">
                <h2 className="astar-help-heading">Glossary</h2>
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

