import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Trémaux tree origins (19th century)',
    detail:
      'Early maze-solving strategies used depth-first exploration, later formalized as traversal trees for graphs.',
  },
  {
    title: 'Hopcroft-Tarjan DFS era (1970s)',
    detail:
      'Depth-first traversal enabled linear-time algorithms for SCCs, bridges, articulation points, and planarity testing.',
  },
  {
    title: 'Algorithmic tool of choice in textbooks',
    detail:
      'DFS became the canonical way to build discovery/finish times, edge classification, and topological ordering.',
  },
]

const mentalModels = [
  {
    title: 'Hand on the wall',
    detail:
      'Like walking a maze with one hand on the wall, DFS keeps pushing forward until it cannot, then backtracks to the last junction.',
  },
  {
    title: 'Call stack explorer',
    detail:
      'Recursion or an explicit stack records the return path. Each push dives deeper; each pop returns to an unfinished branch.',
  },
  {
    title: 'Time stamps',
    detail:
      'Entry and exit times give a natural ordering of edges: tree, back, forward, and cross, which power cycle detection and topological sorting.',
  },
  {
    title: 'Backtracking search',
    detail:
      'DFS explores a choice, commits, and backtracks on failure. This is the backbone of combinatorial search and constraint solving.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Mark node as visited; record entry time (discovery).',
      'For each neighbor: if unvisited, recurse/push; otherwise classify edge as back/forward/cross as needed.',
      'On return, record exit time; push to a finishing stack if building a topo order or SCC meta-graph.',
    ],
  },
  {
    heading: 'Iterative vs. recursive',
    bullets: [
      'Recursive DFS is concise but risks stack overflow on very deep graphs.',
      'Iterative DFS uses an explicit stack; push children manually to control order and avoid recursion limits.',
      'If you need entry/exit times iteratively, store a (node, state) pair to simulate recursion.',
    ],
  },
  {
    heading: 'Classification and utilities',
    bullets: [
      'Back edge to an ancestor signals a cycle in directed graphs.',
      'Finishing times reversed yield a topological order in DAGs.',
      'Edge types feed articulation point and bridge detection via low-link values.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Reachability and components',
    detail:
      'DFS finds all nodes in the same component; repeating DFS yields connected components.',
  },
  {
    title: 'Ordering problems',
    detail:
      'Topological ordering and dependency resolution use DFS finish times.',
  },
  {
    title: 'Cycle detection',
    detail:
      'Back edges in directed graphs indicate cycles quickly and cleanly.',
  },
  {
    title: 'Structural graph insights',
    detail:
      'Low-link values reveal bridges and articulation points in networks.',
  },
  {
    title: 'Not for shortest paths',
    detail:
      'DFS does not minimize hops or weights; use BFS or Dijkstra instead.',
  },
]

const loopInvariants = [
  {
    title: 'Stack path invariant',
    detail:
      'The recursion stack (or explicit stack) always represents a simple path from the start to the current node.',
  },
  {
    title: 'Discovery invariant',
    detail:
      'Once a node is marked visited, it will never be re-entered; all edges are processed exactly once from that node.',
  },
  {
    title: 'Finish-time invariant',
    detail:
      'A node finishes after all nodes in its DFS subtree have finished.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: 'Graph: A-B, A-C, B-D, C-E; start = A',
    note: 'Push A, mark visited, record entry time.',
  },
  {
    step: 'Dive',
    state: 'A -> B -> D (dead end)',
    note: 'Backtrack after D has no unvisited neighbors.',
  },
  {
    step: 'Backtrack',
    state: 'Return to B, then A; next neighbor is C',
    note: 'DFS resumes at the last unfinished branch.',
  },
  {
    step: 'Finish',
    state: 'Visit C -> E, then unwind to finish all nodes',
    note: 'Finish times reflect subtree completion order.',
  },
]

const complexityNotes = [
  {
    title: 'Work and space',
    detail:
      'O(V + E) time with adjacency lists; O(V) memory for visited plus recursion/stack depth proportional to path length.',
  },
  {
    title: 'Ordering effects',
    detail:
      'Neighbor order changes traversal order but not complexity; it can matter for tie-breaking in applications like maze generation.',
  },
  {
    title: 'Sparse vs. dense',
    detail:
      'Adjacency lists keep DFS linear. Adjacency matrices push work toward O(V^2) regardless of E.',
  },
]

const inputSensitivity = [
  {
    title: 'Deep graphs',
    detail:
      'Very deep paths can overflow recursion stacks; iterative DFS avoids this.',
  },
  {
    title: 'High branching',
    detail:
      'DFS does not blow up memory like BFS, but it may explore irrelevant branches deeply.',
  },
  {
    title: 'Graph cycles',
    detail:
      'Visited marking prevents infinite loops; forgetting it causes exponential blowups.',
  },
  {
    title: 'Neighbor order',
    detail:
      'Traversal sequence depends on neighbor ordering, affecting deterministic outputs.',
  },
]

const performanceProfile = [
  {
    title: 'Memory footprint',
    detail:
      'Stores only the current path and visited set, making it memory-light compared to BFS.',
  },
  {
    title: 'Stack depth',
    detail:
      'Worst-case depth is V on a chain; choose iterative DFS if recursion limits are tight.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Linear neighbor scans are cache-friendly, but recursion may bounce between adjacency lists.',
  },
  {
    title: 'Early exits',
    detail:
      'When searching for a target, DFS can return as soon as it is found, which is useful when solutions are deep.',
  },
]

const comparisonTable = [
  {
    algorithm: 'DFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Structure, ordering',
    notes: 'Great for topo order, SCCs, and bridges.',
  },
  {
    algorithm: 'BFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Shortest hops',
    notes: 'Layered expansion yields shortest unweighted paths.',
  },
  {
    algorithm: 'Dijkstra',
    time: 'O((V + E) log V)',
    space: 'O(V)',
    bestFor: 'Weighted shortest paths',
    notes: 'Requires non-negative weights.',
  },
  {
    algorithm: 'IDDFS',
    time: 'O(V + E)',
    space: 'O(V)',
    bestFor: 'Deep solutions with memory limits',
    notes: 'Iterative deepening combines DFS space with BFS depth guarantees.',
  },
]

const realWorldUses = [
  {
    context: 'Topological sorting and cycle detection',
    detail:
      'DFS finishing times produce topo orders for DAGs and quickly expose back edges (cycles) in dependency graphs.',
  },
  {
    context: 'Strongly connected components',
    detail:
      'Kosaraju and Tarjan both rely on DFS passes to group vertices with mutual reachability.',
  },
  {
    context: 'Bridge and articulation points',
    detail:
      'Low-link DFS computes critical edges and nodes in networks (e.g., connectivity resilience).',
  },
  {
    context: 'Puzzle and state search',
    detail:
      'Depth-first backtracking drives Sudoku solvers, N-queens, and DFS-based SAT/constraint searches.',
  },
  {
    context: 'Compiler analysis',
    detail:
      'Control-flow and call-graph traversals rely on DFS ordering to find loops and dominance relations.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Iterative deepening DFS (IDDFS)',
    detail:
      'Run DFS with depth limits 0,1,2,... to get BFS-like depth guarantees with DFS memory usage.',
  },
  {
    title: 'Color marking',
    detail:
      'Use white/gray/black states to classify edges and detect cycles in directed graphs.',
  },
  {
    title: 'Tarjan low-link',
    detail:
      'Augment DFS with low-link values to extract SCCs, bridges, and articulation points.',
  },
  {
    title: 'Graph pruning',
    detail:
      'Stop exploring branches that violate constraints to accelerate backtracking search.',
  },
]

const examples = [
  {
    title: 'Iterative DFS',
    code: `function dfsIterative(graph, start):
    visited = set()
    stack = [start]

    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        for neighbor in graph.neighbors(node):
            if neighbor not in visited:
                stack.push(neighbor)
    return visited`,
    explanation:
      'Explicit stack avoids recursion depth limits and allows custom neighbor ordering (e.g., reverse to mimic recursive order).',
  },
  {
    title: 'Recursive DFS with finishing order',
    code: `function dfs(node):
    visited.add(node)
    for neigh in graph.neighbors(node):
        if neigh not in visited:
            dfs(neigh)
    finish.append(node)`,
    explanation:
      'Appending on exit records finishing order. Reversing finish yields a topological sort in DAGs.',
  },
  {
    title: 'DFS with colors for cycle detection',
    code: `function dfsCycle(u):
    color[u] = 'gray'
    for v in graph.neighbors(u):
        if color[v] == 'gray':
            return true // back edge
        if color[v] == 'white' and dfsCycle(v):
            return true
    color[u] = 'black'
    return false`,
    explanation:
      'Gray-to-gray edges indicate cycles in directed graphs; black nodes are fully explored.',
  },
  {
    title: 'Iterative DFS with entry/exit times',
    code: `function dfsTimes(start):
    stack = [(start, 'enter')]
    while stack:
        (node, state) = stack.pop()
        if state == 'enter':
            if node in visited: continue
            visited.add(node)
            entry[node] = timer++
            stack.push((node, 'exit'))
            for neigh in reverse(graph.neighbors(node)):
                if neigh not in visited:
                    stack.push((neigh, 'enter'))
        else:
            exit[node] = timer++`,
    explanation:
      'The explicit enter/exit states simulate recursion and give timestamps without risking stack overflow.',
  },
]

const pitfalls = [
  'Recursion depth overflow on large/deep graphs; switch to iterative.',
  'Forgetting to mark visited before recursion can cause exponential blowup on cyclic graphs.',
  'Assuming DFS finds shortest paths in edge count - it does not; use BFS for that.',
  'Using DFS finishing order as topo sort on graphs with cycles yields invalid orders; detect cycles first.',
  'Neighbor ordering affects output; tests should be robust to different but valid DFS traversals.',
]

const decisionGuidance = [
  'Need reachability, component labeling, or ordering tasks: use DFS.',
  'Need shortest hop paths: prefer BFS.',
  'Need weighted shortest paths: use Dijkstra or Bellman-Ford.',
  'Need SCCs, articulation points, bridges, or topo sort: DFS variants are the backbone.',
  'Need memory efficiency and can tolerate deep exploration: DFS is a strong default.',
]

const implementationTips = [
  {
    title: 'Mark on entry',
    detail:
      'Record visited as soon as you first see a node to prevent cycles.',
  },
  {
    title: 'Avoid recursion limits',
    detail:
      'Use an explicit stack for very deep or adversarial graphs.',
  },
  {
    title: 'Track timestamps',
    detail:
      'Entry/exit times enable edge classification and topological ordering.',
  },
  {
    title: 'Control neighbor order',
    detail:
      'If deterministic output matters, sort neighbors or push in reverse order.',
  },
  {
    title: 'Guard against disconnected graphs',
    detail:
      'Loop over all nodes to cover every component, not just the start node.',
  },
]

const advancedInsights = [
  {
    title: 'Low-link values',
    detail:
      'Tarjan-style DFS tracks the lowest reachable ancestor, enabling bridges, articulation points, and SCCs in linear time.',
  },
  {
    title: 'DFS tree structure',
    detail:
      'Tree edges define a DFS forest; back edges indicate cycles; forward/cross edges clarify reachability in directed graphs.',
  },
  {
    title: 'Iterative deepening',
    detail:
      'IDDFS blends DFS memory usage with BFS depth guarantees, useful in game trees and AI search.',
  },
  {
    title: 'Planarity testing',
    detail:
      'Linear-time planarity algorithms use DFS to build embedding constraints and detect crossings.',
  },
  {
    title: 'SCC condensation graphs',
    detail:
      'Compressing SCCs into a DAG reveals high-level structure and simplifies dependency analysis.',
  },
]

const takeaways = [
  'DFS dives deep, using a stack to remember the path; it runs in O(V + E) and excels at structural graph questions.',
  'Edge classifications and finishing times turn DFS into a multipurpose tool: topo sorts, SCCs, bridges, cycles.',
  'Control recursion depth with an explicit stack on large or adversarial inputs.',
  'References: Hopcroft-Tarjan, CLRS DFS chapter, and classic backtracking texts.',
]

const glossaryTerms = [
  {
    term: 'Depth-First Search (DFS)',
    definition:
      'Traversal strategy that explores one branch deeply, then backtracks to the last unfinished branch.',
  },
  {
    term: 'Discovery time',
    definition:
      'Timestamp captured when a node is first visited in DFS.',
  },
  {
    term: 'Finish time',
    definition:
      'Timestamp captured when DFS finishes exploring a node and its descendants.',
  },
  {
    term: 'Back edge',
    definition:
      'An edge to an ancestor in the DFS tree; in directed graphs it indicates a cycle.',
  },
  {
    term: 'Low-link value',
    definition:
      'The smallest discovery index reachable from a node; used for SCCs, bridges, and articulation points.',
  },
  {
    term: 'DFS tree / forest',
    definition:
      'Tree edges formed by DFS in one component (tree) or across disconnected components (forest).',
  },
  {
    term: 'Iterative deepening DFS (IDDFS)',
    definition:
      'Depth-limited DFS repeated with larger limits to balance memory usage and depth guarantees.',
  },
  {
    term: 'Topological ordering',
    definition:
      'A DAG ordering often produced by reversing DFS finish times.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const dfsWin98HelpStyles = `
.dfs98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  padding: 0;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.dfs98-window {
  width: 100%;
  min-height: 100dvh;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.dfs98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  color: #fff;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  font-size: 13px;
  font-weight: 700;
}

.dfs98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.dfs98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.dfs98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.dfs98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.dfs98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.dfs98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.dfs98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.dfs98-toc {
  padding: 12px;
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.dfs98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.dfs98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.dfs98-toc-list li {
  margin: 0 0 8px;
}

.dfs98-toc-list a {
  font-size: 12px;
  color: #000;
  text-decoration: none;
}

.dfs98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.dfs98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.dfs98-section {
  margin: 0 0 20px;
}

.dfs98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.dfs98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.dfs98-content p,
.dfs98-content li,
.dfs98-content td,
.dfs98-content th {
  font-size: 12px;
  line-height: 1.5;
}

.dfs98-content p {
  margin: 0 0 10px;
}

.dfs98-content ul,
.dfs98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.dfs98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.dfs98-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 10px;
}

.dfs98-table th,
.dfs98-table td {
  border: 1px solid #808080;
  text-align: left;
  vertical-align: top;
  padding: 4px 6px;
}

.dfs98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  overflow-x: auto;
}

.dfs98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

@media (max-width: 900px) {
  .dfs98-main {
    grid-template-columns: 1fr;
  }

  .dfs98-toc {
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

export default function DepthFirstSearchPage(): JSX.Element {
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
    document.title = `Depth-First Search (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Depth-First Search',
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
    <div className="dfs98-help-page">
      <style>{dfsWin98HelpStyles}</style>
      <div className="dfs98-window" role="presentation">
        <header className="dfs98-titlebar">
          <span className="dfs98-title-text">Depth-First Search</span>
          <div className="dfs98-title-controls">
            <button className="dfs98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="dfs98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="dfs98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`dfs98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="dfs98-main">
          <aside className="dfs98-toc" aria-label="Table of contents">
            <h2 className="dfs98-toc-title">Contents</h2>
            <ul className="dfs98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="dfs98-content">
            <h1 className="dfs98-doc-title">Depth-First Search</h1>
            <p>
              Depth-first search explores by diving until it must backtrack. With O(V + E) work and a simple stack discipline, it
              powers topological sorts, cycle detection, articulation point finding, and SCC algorithms.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="dfs98-section">
                  <h2 className="dfs98-heading">Overview</h2>
                  <p>
                    DFS is the opposite of BFS: it commits to a branch until blocked, then rewinds. This behavior exposes ancestry
                    relationships and finishing times that become the backbone of many graph analyses beyond mere reachability.
                  </p>
                  <p>Backtracking through the graph frontier is the central execution model of DFS.</p>
                </section>
                <hr className="dfs98-divider" />
                <section id="bp-history" className="dfs98-section">
                  <h2 className="dfs98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="dfs98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="dfs98-divider" />
                <section id="bp-mental-models" className="dfs98-section">
                  <h2 className="dfs98-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="dfs98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="dfs98-divider" />
                <section id="bp-takeaways" className="dfs98-section">
                  <h2 className="dfs98-heading">Key Takeaways</h2>
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
                <section id="core-mechanics" className="dfs98-section">
                  <h2 className="dfs98-heading">How It Works: Mechanics in Motion</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="dfs98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-patterns" className="dfs98-section">
                  <h2 className="dfs98-heading">How to Think About Similar Problems</h2>
                  {problemPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-invariants" className="dfs98-section">
                  <h2 className="dfs98-heading">Loop Invariants (Why It Is Correct)</h2>
                  {loopInvariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="dfs98-section">
                  <h2 className="dfs98-heading">Complexity Analysis and Intuition</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-sensitivity" className="dfs98-section">
                  <h2 className="dfs98-heading">Input Sensitivity</h2>
                  {inputSensitivity.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="dfs98-section">
                  <h2 className="dfs98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="dfs98-section">
                  <h2 className="dfs98-heading">Compare and Contrast</h2>
                  <table className="dfs98-table">
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
                <section id="core-uses" className="dfs98-section">
                  <h2 className="dfs98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="dfs98-section">
                  <h2 className="dfs98-heading">Variants and Extensions</h2>
                  {variantsAndTweaks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="dfs98-section">
                  <h2 className="dfs98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-decision" className="dfs98-section">
                  <h2 className="dfs98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-implementation" className="dfs98-section">
                  <h2 className="dfs98-heading">Implementation Tips</h2>
                  {implementationTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="dfs98-section">
                  <h2 className="dfs98-heading">Advanced Insights</h2>
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
                <section id="ex-trace" className="dfs98-section">
                  <h2 className="dfs98-heading">Worked Trace on a Tiny Graph</h2>
                  {stepTrace.map((item) => (
                    <div key={item.step}>
                      <h3 className="dfs98-subheading">{item.step}</h3>
                      <p><strong>State:</strong> {item.state}</p>
                      <p><strong>Note:</strong> {item.note}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-practical" className="dfs98-section">
                  <h2 className="dfs98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="dfs98-subheading">{example.title}</h3>
                      <div className="dfs98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="dfs98-section">
                <h2 className="dfs98-heading">Glossary</h2>
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

