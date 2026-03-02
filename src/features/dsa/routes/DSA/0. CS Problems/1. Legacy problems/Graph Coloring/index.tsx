import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Assign a color (label) to every vertex so that adjacent vertices never share the same color.',
    notes: 'It is a classic constraint satisfaction problem with a clean graph-theory formulation.',
  },
  {
    title: 'Why it matters',
    details:
      'It models conflicts: two things that cannot share a resource must receive different colors.',
    notes:
      'Scheduling, register allocation, frequency assignment, and timetabling all reduce to coloring.',
  },
  {
    title: 'What it asks',
    details:
      'The decision version asks if k colors are enough; the optimization version seeks the minimum k.',
    notes: 'The minimum k is the chromatic number, written chi(G).',
  },
]

const historicalContext = [
  {
    title: '1850s: Map coloring puzzle',
    details:
      'The question of coloring maps so that neighboring regions differ gave the earliest popular motivation.',
    notes: 'This eventually became the Four Color Theorem for planar graphs.',
  },
  {
    title: 'Early 1900s: Graph theory formalizes coloring',
    details:
      'Vertices and edges gave a clean mathematical model for adjacency and conflict constraints.',
    notes: 'Graph coloring became a core topic alongside matchings and connectivity.',
  },
  {
    title: '1970s: Complexity theory classifies it',
    details: 'The k-coloring decision problem was shown to be NP-complete for k >= 3.',
    notes: 'This established that exact solutions scale poorly in the worst case.',
  },
  {
    title: '1990s+: Heuristics and SAT/ILP solvers',
    details: 'Modern solvers use branch-and-bound, DSATUR, and reductions to SAT or ILP.',
    notes:
      'These tools solve many real instances quickly even though the worst case is exponential.',
  },
]

const quickGlossary = [
  {
    term: 'Proper coloring',
    definition:
      'An assignment of colors to vertices where every edge has different colors at its ends.',
  },
  {
    term: 'Chromatic number chi(G)',
    definition: 'The smallest number of colors needed to properly color the graph.',
  },
  {
    term: 'k-coloring',
    definition: 'A proper coloring that uses at most k colors.',
  },
  {
    term: 'Clique',
    definition:
      'A set of vertices where every pair is adjacent. A clique of size w needs w colors.',
  },
  {
    term: 'Bipartite graph',
    definition: 'A graph with no odd cycles; it is 2-colorable.',
  },
  {
    term: 'Greedy coloring',
    definition: 'Color vertices one by one, giving each the smallest available color.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail:
      'A graph G = (V, E). Typically undirected, simple (no loops, no parallel edges) unless stated otherwise.',
  },
  {
    title: 'Output',
    detail:
      'A color assignment for each vertex, or a proof that no assignment exists for a given k.',
  },
  {
    title: 'Constraints',
    detail:
      'For every edge (u, v), color[u] != color[v]. All other constraints are optional variants.',
  },
  {
    title: 'Decision version',
    detail: 'Given k, determine whether a valid k-coloring exists.',
  },
]

const notation = [
  {
    title: 'n and m',
    detail: 'n = |V| is the number of vertices, m = |E| is the number of edges.',
  },
  {
    title: 'Adjacency',
    detail:
      'Adj(u) is the set of neighbors of u. A conflict exists if any neighbor has the same color.',
  },
  {
    title: 'Degree delta',
    detail:
      'delta is the maximum degree in the graph. A simple upper bound is chi(G) <= delta + 1.',
  },
  {
    title: 'Clique number omega',
    detail: 'omega is the size of the largest clique. A lower bound is chi(G) >= omega.',
  },
]

const boundsAndFacts = [
  {
    title: 'Trivial bounds',
    detail: '1 <= chi(G) <= n. Complete graphs use n colors; empty graphs use 1 color.',
  },
  {
    title: 'Degree bound',
    detail: 'chi(G) <= delta + 1 for any simple graph. Many graphs need far fewer.',
  },
  {
    title: 'Clique bound',
    detail: 'chi(G) >= omega because all vertices in a clique must be distinct colors.',
  },
  {
    title: 'Bipartite test',
    detail:
      'If the graph is bipartite (no odd cycle), then chi(G) = 2 unless the graph has no edges.',
  },
]

const algorithmLandscape = [
  {
    title: 'Exact search',
    detail:
      'Backtracking and branch-and-bound explore colorings and prune impossible partial assignments.',
  },
  {
    title: 'Greedy heuristics',
    detail: 'Fast and simple; quality depends heavily on vertex ordering and tie-breaking.',
  },
  {
    title: 'DSATUR',
    detail:
      'Chooses the next vertex with the highest saturation (number of distinct neighbor colors).',
  },
  {
    title: 'SAT/ILP reductions',
    detail: 'Encode coloring as boolean or integer constraints and use a solver for optimal k.',
  },
  {
    title: 'Approximation/Metaheuristics',
    detail: 'Tabu search, simulated annealing, and genetic algorithms trade optimality for speed.',
  },
]

const greedySteps = [
  'Choose a vertex order (simple order, degree order, or degeneracy order).',
  'For each vertex in order, collect colors used by its neighbors.',
  'Assign the smallest color not used by any neighbor.',
  'If all k colors are blocked, greedy fails for that k but may succeed with a different order.',
]

const backtrackingSteps = [
  'Pick the next uncolored vertex (often the most constrained first).',
  'Try each color from 1..k that does not conflict with neighbors.',
  'Assign a color and recurse.',
  'If all colors fail, unassign and backtrack to the previous vertex.',
]

const dsaturSteps = [
  'Start with all vertices uncolored; saturation of a vertex is the number of distinct neighbor colors.',
  'Pick the uncolored vertex with maximum saturation; break ties by highest degree.',
  'Assign the smallest available color that does not conflict with neighbors.',
  'Update saturation of its neighbors and repeat until all vertices are colored.',
]

const dataStructures = [
  {
    title: 'Adjacency list or matrix',
    detail: 'Lists are space efficient for sparse graphs; matrices give O(1) adjacency checks.',
  },
  {
    title: 'Color array',
    detail: 'color[v] stores the assigned color or 0 for uncolored.',
  },
  {
    title: 'Forbidden color cache',
    detail: 'A boolean array or bitset per vertex can speed up neighbor color checks.',
  },
  {
    title: 'Ordering structures',
    detail:
      'Priority queues or buckets help select the next vertex under DSATUR or degree heuristics.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail: 'All colored vertices always satisfy the constraint that adjacent colors differ.',
  },
  {
    title: 'Soundness',
    detail: 'A solution is returned only after all vertices are colored without conflicts.',
  },
  {
    title: 'Completeness (backtracking)',
    detail:
      'Backtracking explores all possible assignments consistent with constraints, so it finds a solution if one exists.',
  },
  {
    title: 'Greedy limitation',
    detail: 'Greedy coloring is correct when it succeeds but can use more colors than optimal.',
  },
]

const complexityNotes = [
  {
    title: 'Decision complexity',
    detail: 'k-coloring is NP-complete for k >= 3, so worst-case time is exponential.',
  },
  {
    title: 'Greedy time',
    detail: 'O(n + m) with adjacency lists if you track used colors efficiently.',
  },
  {
    title: 'Backtracking time',
    detail: 'Worst case is O(k^n), but pruning and ordering can dramatically cut search.',
  },
  {
    title: 'Space',
    detail: 'O(n + m) for the graph plus O(n) for colors and recursion stack.',
  },
]

const edgeCases = [
  {
    title: 'Disconnected graphs',
    detail:
      'Each component can be colored independently, but the same color set is shared across components.',
  },
  {
    title: 'Self-loops',
    detail:
      'A self-loop makes a graph uncolorable for any finite k because a vertex conflicts with itself.',
  },
  {
    title: 'Isolated vertices',
    detail: 'Vertices with no edges can take any color and do not affect the minimum k.',
  },
  {
    title: 'Odd cycle',
    detail: 'An odd cycle requires at least 3 colors. This is the minimal non-bipartite structure.',
  },
]

const practicalHeuristics = [
  {
    title: 'Order by degree',
    detail: 'Color high-degree vertices first to reduce branching later.',
  },
  {
    title: 'MRV (most constrained)',
    detail: 'Pick the vertex with the fewest available colors to force early failure or progress.',
  },
  {
    title: 'Forward checking',
    detail: 'After assigning a color, remove that color from neighbors and detect dead ends early.',
  },
  {
    title: 'Symmetry breaking',
    detail: 'Fix the color of one vertex to reduce equivalent permutations of color labels.',
  },
]

const variants = [
  {
    title: 'Chromatic number search',
    detail: 'Solve the decision problem for k from a lower bound upward until the first success.',
  },
  {
    title: 'List coloring',
    detail: 'Each vertex has its own allowed color list; constraints are per-vertex domains.',
  },
  {
    title: 'Edge coloring',
    detail:
      'Edges are colored so adjacent edges differ. This is a different problem with its own bounds.',
  },
  {
    title: 'Total coloring',
    detail: 'Both vertices and edges are colored so all adjacent or incident items differ.',
  },
  {
    title: 'Planar graph coloring',
    detail: 'Planar graphs can always be colored with at most four colors (Four Color Theorem).',
  },
]

const compareContrast = [
  {
    title: 'Coloring vs bipartite test',
    detail: 'If k = 2, coloring reduces to checking for an odd cycle using BFS/DFS.',
  },
  {
    title: 'Coloring vs clique finding',
    detail: 'Cliques provide lower bounds; a large clique proves that fewer colors are impossible.',
  },
  {
    title: 'Coloring vs independent set',
    detail:
      'A k-coloring partitions vertices into k independent sets. Maximizing an independent set helps bound k.',
  },
  {
    title: 'Vertex vs edge coloring',
    detail:
      'Vertex coloring prohibits same colors on adjacent vertices; edge coloring prohibits same colors on adjacent edges.',
  },
]

const realWorldConnections = [
  {
    title: 'Register allocation (compilers)',
    detail: 'Variables that interfere cannot share registers. Colors represent registers.',
  },
  {
    title: 'Timetabling',
    detail: 'Courses that share students cannot use the same time slot. Colors are time slots.',
  },
  {
    title: 'Frequency assignment',
    detail: 'Transmitters that are geographically close must use different frequencies.',
  },
  {
    title: 'Task scheduling',
    detail: 'Conflicting tasks cannot run at the same time on a shared resource.',
  },
  {
    title: 'Constraint programming',
    detail: 'Coloring is a canonical example used to benchmark CSP solvers.',
  },
]

const workedExamples = [
  {
    title: 'Triangle (K3)',
    code: `Vertices: A, B, C
Edges: AB, BC, CA
Lower bound: clique size = 3
Therefore chi(G) = 3 (needs three colors)`,
    explanation: 'A triangle is the smallest complete graph that forces 3 colors.',
  },
  {
    title: 'Square (C4)',
    code: `Vertices: A, B, C, D
Edges: AB, BC, CD, DA
Coloring: A=1, B=2, C=1, D=2
Therefore chi(G) = 2`,
    explanation: 'An even cycle is bipartite, so 2 colors suffice.',
  },
  {
    title: 'Square with diagonal (A-C)',
    code: `Edges: AB, BC, CD, DA, AC
One valid coloring:
A=1, B=2, C=3, D=2
Thus chi(G) = 3`,
    explanation: 'The diagonal creates a triangle, so 2 colors are impossible.',
  },
]

const pseudocode = [
  {
    title: 'Greedy coloring (simple)',
    code: `order = vertexOrdering(G)
for v in order:
  used = colorsOfNeighbors(v)
  color[v] = smallestPositiveNotIn(used)
return color`,
    explanation: 'Greedy is fast and easy, but the number of colors depends on ordering.',
  },
  {
    title: 'Backtracking decision (k colors)',
    code: `function color(v):
  if v == n: return true
  for c in 1..k:
    if canUse(v, c):
      color[v] = c
      if color(v + 1): return true
      color[v] = 0
  return false`,
    explanation: 'Backtracking is complete: it finds a k-coloring if one exists.',
  },
  {
    title: 'DSATUR sketch',
    code: `while uncolored vertices exist:
  pick v with max saturation (tie: max degree)
  assign smallest available color to v
  update saturation of neighbors`,
    explanation: 'DSATUR prioritizes hard vertices early and often uses near-optimal colors.',
  },
]

const evaluationChecklist = [
  {
    title: 'Correctness',
    detail: 'Every edge must connect two different colors. Validate by scanning all edges.',
  },
  {
    title: 'Color count',
    detail: 'Report the number of distinct colors used and compare to lower/upper bounds.',
  },
  {
    title: 'Determinism',
    detail: 'If using heuristics, confirm whether results are stable under the same input.',
  },
  {
    title: 'Performance',
    detail: 'Measure runtime as graph size increases. Note when exponential blowups appear.',
  },
]

const pitfalls = [
  {
    mistake: 'Assuming greedy is optimal',
    description:
      'Greedy can use more colors than necessary; different orderings can change the answer.',
  },
  {
    mistake: 'Confusing edge coloring with vertex coloring',
    description: 'Edge coloring is a different problem with different bounds and algorithms.',
  },
  {
    mistake: 'Ignoring self-loops',
    description: 'A single self-loop makes the graph impossible to color under standard rules.',
  },
  {
    mistake: 'Not enforcing constraints on every step',
    description: 'Skipping neighbor checks can accept invalid colorings and corrupt results.',
  },
]

const keyTakeaways = [
  'Graph coloring assigns labels so adjacent vertices never match, modeling conflict constraints.',
  'The decision problem is NP-complete for k >= 3, so exact algorithms can be exponential.',
  'Lower bounds (cliques) and upper bounds (degree or greedy) guide search for chi(G).',
  'Good ordering and pruning often matter more than raw CPU speed for exact search.',
  'Many practical problems are coloring problems in disguise, especially scheduling and allocation.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const graphColoringHelpStyles = `
.gc-legacy-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.gc-legacy-window {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.gc-legacy-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.gc-legacy-title {
  position: absolute;
  inset: 0 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  font-size: 16px;
  white-space: nowrap;
}

.gc-legacy-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.gc-legacy-control {
  width: 18px;
  height: 16px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  font: inherit;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.gc-legacy-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.gc-legacy-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  color: #000;
  padding: 5px 10px 4px;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.gc-legacy-tab.is-active {
  position: relative;
  top: 1px;
  background: #fff;
}

.gc-legacy-main {
  display: grid;
  grid-template-columns: 240px 1fr;
  flex: 1;
  min-height: 0;
  background: #fff;
  border-top: 1px solid #404040;
}

.gc-legacy-toc {
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
}

.gc-legacy-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.gc-legacy-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.gc-legacy-toc-list li {
  margin: 0 0 8px;
}

.gc-legacy-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.gc-legacy-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.gc-legacy-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.gc-legacy-section {
  margin: 0 0 20px;
}

.gc-legacy-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.gc-legacy-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.gc-legacy-content p,
.gc-legacy-content li {
  font-size: 12px;
  line-height: 1.5;
}

.gc-legacy-content p {
  margin: 0 0 10px;
}

.gc-legacy-content ul,
.gc-legacy-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.gc-legacy-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.gc-legacy-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  overflow: auto;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.gc-legacy-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

@media (max-width: 900px) {
  .gc-legacy-main {
    grid-template-columns: 1fr;
  }

  .gc-legacy-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 560px) {
  .gc-legacy-title {
    inset: 0 44px;
    font-size: 13px;
  }

  .gc-legacy-content {
    padding: 12px 14px 16px;
  }
}
`

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
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-setup', label: 'Problem Setup' },
    { id: 'core-notation', label: 'Notation and Facts' },
    { id: 'core-landscape', label: 'Algorithm Landscape' },
    { id: 'core-steps', label: 'Algorithm Steps' },
    { id: 'core-structures', label: 'Data Structures' },
    { id: 'core-correctness', label: 'Correctness' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-edge-cases', label: 'Edge Cases' },
    { id: 'core-heuristics', label: 'Practical Heuristics' },
    { id: 'core-variants', label: 'Variants' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-real-world', label: 'Real-World Connections' },
    { id: 'ex-evaluation', label: 'Evaluation Checklist' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

export default function GraphColoringLegacyPage(): JSX.Element {
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
    document.title = `Graph Coloring (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams)
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Graph Coloring',
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
    <div className="gc-legacy-help-page">
      <style>{graphColoringHelpStyles}</style>
      <div className="gc-legacy-window" role="presentation">
        <header className="gc-legacy-titlebar">
          <span className="gc-legacy-title">Graph Coloring</span>
          <div className="gc-legacy-controls">
            <button
              className="gc-legacy-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="gc-legacy-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="gc-legacy-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`gc-legacy-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="gc-legacy-main">
          <aside className="gc-legacy-toc" aria-label="Table of contents">
            <h2 className="gc-legacy-toc-title">Contents</h2>
            <ul className="gc-legacy-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="gc-legacy-content">
            <h1 className="gc-legacy-doc-title">Graph Coloring</h1>
            <p>
              Graph coloring is the problem of assigning labels to vertices so that adjacent
              vertices never share the same label. It is a foundational model for constraint
              satisfaction and scheduling. The decision version asks whether k colors are enough;
              the optimization version seeks the smallest k, the chromatic number. This page focuses
              on vertex coloring, not edge coloring.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="gc-legacy-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="gc-legacy-divider" />

                <section id="bp-history" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="gc-legacy-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="gc-legacy-divider" />

                <section id="bp-takeaways" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Key Takeaways</h2>
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
                <section id="core-setup" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Problem Setup</h2>
                  {problemSetup.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-notation" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Notation and Basic Facts</h2>
                  {notation.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="gc-legacy-subheading">Bounds and Key Properties</h3>
                  {boundsAndFacts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-landscape" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Algorithm Landscape</h2>
                  {algorithmLandscape.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-steps" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Algorithm Steps</h2>
                  <h3 className="gc-legacy-subheading">Greedy Coloring</h3>
                  <ol>
                    {greedySteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <h3 className="gc-legacy-subheading">Backtracking</h3>
                  <ol>
                    {backtrackingSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <h3 className="gc-legacy-subheading">DSATUR</h3>
                  <ol>
                    {dsaturSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-structures" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Data Structures Used</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-correctness" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Why the Algorithms Work</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Complexity and Scaling</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-edge-cases" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Edge Cases and Conventions</h2>
                  {edgeCases.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-heuristics" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Practical Heuristics</h2>
                  {practicalHeuristics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Heuristics do not change worst-case complexity, but they reduce the branching
                    factor and often make real instances easy.
                  </p>
                </section>

                <section id="core-variants" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Variants and Extensions</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-compare" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Compare and Contrast</h2>
                  {compareContrast.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Common Pitfalls</h2>
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
                <section id="ex-worked" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Worked Examples</h2>
                  {workedExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="gc-legacy-subheading">{example.title}</h3>
                      <pre className="gc-legacy-codebox">
                        <code>{example.code.trim()}</code>
                      </pre>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-pseudocode" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Pseudocode Reference</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="gc-legacy-subheading">{example.title}</h3>
                      <pre className="gc-legacy-codebox">
                        <code>{example.code.trim()}</code>
                      </pre>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-real-world" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">Real-World Connections</h2>
                  {realWorldConnections.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="ex-evaluation" className="gc-legacy-section">
                  <h2 className="gc-legacy-heading">How to Evaluate an Implementation</h2>
                  {evaluationChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="gc-legacy-section">
                <h2 className="gc-legacy-heading">Glossary</h2>
                {quickGlossary.map((item) => (
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
