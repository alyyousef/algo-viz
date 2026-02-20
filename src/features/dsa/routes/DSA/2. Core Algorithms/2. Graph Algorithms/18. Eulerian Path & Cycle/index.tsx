import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '1736: Euler and the Seven Bridges of Konigsberg',
    detail:
      'Euler showed that you cannot walk each bridge exactly once, creating the first graph theory proof and motivating Eulerian trails.',
  },
  {
    title: '1873: Hierholzer formalizes the construction',
    detail:
      'Hierholzer introduced a linear-time method to build Eulerian circuits by stitching cycles, still the standard approach today.',
  },
  {
    title: '1960s: Chinese Postman and routing research',
    detail:
      'Finding short routes that cover every edge inspired Eulerian augmentations and practical logistics algorithms.',
  },
  {
    title: '1990s: Genome assembly via de Bruijn graphs',
    detail:
      'DNA reads became edges in de Bruijn graphs, and Eulerian paths provided efficient reconstructions of long sequences.',
  },
]

const prerequisites = [
  {
    title: 'Graph type',
    detail:
      'Eulerian checks differ for undirected and directed graphs; pick the correct rules.',
  },
  {
    title: 'Edge-centric goal',
    detail:
      'Eulerian paths use every edge exactly once; vertices may repeat.',
  },
  {
    title: 'Connectivity concept',
    detail:
      'Only vertices with non-zero degree must be connected (ignore isolated vertices).',
  },
  {
    title: 'Degree bookkeeping',
    detail:
      'Undirected graphs need degree parity; directed graphs need in/out balance.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Graph G(V, E), directed or undirected, with adjacency lists.',
  },
  {
    title: 'Output',
    detail:
      'Eulerian path or cycle as a vertex list, or a failure if none exists.',
  },
  {
    title: 'Optional',
    detail:
      'Status classification: none, path only, or cycle.',
  },
]

const formalDefinitions = [
  {
    title: 'Eulerian path (trail)',
    detail:
      'A walk that uses each edge exactly once and may start/end at different vertices.',
  },
  {
    title: 'Eulerian cycle (circuit)',
    detail:
      'An Eulerian path that starts and ends at the same vertex.',
  },
  {
    title: 'Degree balance (undirected)',
    detail:
      'A cycle requires all even degrees; a path requires exactly two odd degrees.',
  },
  {
    title: 'Degree balance (directed)',
    detail:
      'A cycle requires in-degree == out-degree for all nodes; a path allows one start and one end mismatch.',
  },
]

const mentalModels = [
  {
    title: 'Edge coverage, not vertex coverage',
    detail:
      'Eulerian paths care about using every edge exactly once. Repeating vertices is fine as long as edges are not reused.',
  },
  {
    title: 'Odd degree means loose ends',
    detail:
      'In undirected graphs, every time you enter a vertex you must leave it. Odd-degree vertices create unmatched entrances or exits.',
  },
  {
    title: 'Balance sheets for directed graphs',
    detail:
      'In a directed graph, in-degree and out-degree must balance. A start vertex can have one extra outgoing edge, and an end vertex one extra incoming edge.',
  },
  {
    title: 'Cycle splicing',
    detail:
      'Hierholzer builds a tour by walking until stuck, then splicing smaller cycles into the main trail where they intersect.',
  },
]

const existenceConditions = [
  {
    heading: 'Undirected Eulerian cycle',
    bullets: [
      'Every vertex with non-zero degree has even degree.',
      'All vertices with non-zero degree belong to a single connected component.',
      'Isolated vertices are ignored; a graph with no edges is trivially Eulerian.',
    ],
  },
  {
    heading: 'Undirected Eulerian path',
    bullets: [
      'Exactly 0 or 2 vertices have odd degree.',
      'If 2 are odd, the path must start at one odd vertex and end at the other.',
      'All vertices with non-zero degree remain connected when ignoring isolated vertices.',
    ],
  },
  {
    heading: 'Directed Eulerian cycle',
    bullets: [
      'Every vertex with non-zero degree satisfies in-degree = out-degree.',
      'All non-zero-degree vertices are in one strongly connected component.',
      'A single directed cycle is the simplest valid example.',
    ],
  },
  {
    heading: 'Directed Eulerian path',
    bullets: [
      'Exactly one vertex has out-degree = in-degree + 1 (start).',
      'Exactly one vertex has in-degree = out-degree + 1 (end).',
      'All other non-zero-degree vertices are balanced and connected in the underlying undirected graph.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Choose a valid start',
    detail:
      'If a path (not cycle) exists, start at the odd-degree vertex (undirected) or the vertex with out = in + 1 (directed). Otherwise, start anywhere with edges.',
  },
  {
    title: 'Walk edges until you are stuck',
    detail:
      'Follow unused edges, removing them as you go. When you reach a vertex with no unused edges, you have closed a local trail.',
  },
  {
    title: 'Splice trails together',
    detail:
      'If the current tour contains a vertex with unused edges, restart a walk from that vertex and splice the new trail into the tour.',
  },
  {
    title: 'Output the reverse stack',
    detail:
      'Hierholzer uses a stack: pop vertices when stuck. The resulting list reversed is the Eulerian path or cycle.',
  },
]

const stepByStepFlow = [
  'Compute degree counts and identify odd-degree (undirected) or imbalance (directed) vertices.',
  'Check connectivity among non-zero-degree vertices using DFS/BFS.',
  'Classify as cycle, path, or none based on degree rules.',
  'Pick a valid start node (odd-degree or imbalance start, else any non-zero-degree node).',
  'Run Hierholzer with a stack, consuming each edge exactly once.',
  'Reverse the output stack to produce the trail.',
]

const dataStructures = [
  {
    title: 'Adjacency list with edge IDs',
    detail:
      'Track multi-edges and mark each edge used exactly once.',
  },
  {
    title: 'Degree arrays',
    detail:
      'Degree counts for undirected; in/out for directed graphs.',
  },
  {
    title: 'Edge-used flags',
    detail:
      'Boolean array keyed by edge ID to prevent reuse.',
  },
  {
    title: 'Stack for Hierholzer',
    detail:
      'Tracks current walk; vertices are popped into the final trail when stuck.',
  },
]

const correctnessNotes = [
  {
    title: 'Degree necessity',
    detail:
      'Every time you enter a vertex you must leave it, implying even degree except for endpoints.',
  },
  {
    title: 'Connectivity necessity',
    detail:
      'All non-zero-degree vertices must lie in a single component to traverse every edge.',
  },
  {
    title: 'Hierholzer correctness',
    detail:
      'Local cycles can be spliced into the tour without breaking edge uniqueness.',
  },
]

const implementationNotes = [
  {
    title: 'Edge tracking',
    detail:
      'Use adjacency lists with explicit edge IDs or remove edges as you traverse to ensure each edge is consumed exactly once.',
  },
  {
    title: 'Multi-edges and self-loops',
    detail:
      'Allow duplicates in adjacency lists and track usage per edge. Self-loops count twice toward degree in undirected graphs.',
  },
  {
    title: 'Connectivity check',
    detail:
      'Run DFS or BFS on the undirected version to verify all non-zero-degree vertices are reachable before constructing the trail.',
  },
  {
    title: 'Iterative over recursive',
    detail:
      'Prefer an explicit stack to avoid recursion limits on large graphs and to match the classical Hierholzer flow.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Checking degrees is O(V). Connectivity check is O(V + E). Hierholzer constructs the tour in O(V + E).',
  },
  {
    title: 'Space cost',
    detail:
      'Adjacency lists plus an edge-used array require O(V + E). The output trail contains E + 1 vertices.',
  },
  {
    title: 'Tradeoffs',
    detail:
      'Removing edges in-place is fast but mutates input; copying edges is safer but doubles memory. Choose based on constraints.',
  },
  {
    title: 'Edge ordering',
    detail:
      'Different adjacency ordering yields different valid tours. If you need lexicographic output, sort neighbors first.',
  },
]

const realWorldUses = [
  {
    context: 'Genome assembly (de Bruijn graphs)',
    detail:
      'Reads become edges between k-mers. An Eulerian path reconstructs a likely genome string by consuming every read once.',
  },
  {
    context: 'Street sweeping and snow plows',
    detail:
      'Municipal routing seeks to cover all streets. If a graph is not Eulerian, it can be augmented to approximate an Euler tour.',
  },
  {
    context: 'Network testing and traversal',
    detail:
      'Covering every link exactly once ensures comprehensive inspection of cables, circuits, or logical routes.',
  },
  {
    context: 'Puzzle and maze design',
    detail:
      'Designers check Eulerian properties to ensure a single-stroke puzzle is solvable without lifting a pen.',
  },
]

const examples = [
  {
    title: 'Detect Eulerian status in an undirected graph',
    code: `function eulerStatusUndirected(graph):
    if graph.edgeCount == 0:
        return "cycle" // empty graph is Eulerian

    visited = dfsIgnoringIsolated(graph)
    if visited != allNonZeroDegreeVertices:
        return "none"

    odd = countVerticesWhere(degree % 2 == 1)
    if odd == 0:
        return "cycle"
    if odd == 2:
        return "path"
    return "none"`,
    explanation:
      'The degree test determines whether a cycle or path is possible. Connectivity guarantees that a single trail can reach every edge.',
  },
  {
    title: "Hierholzer's algorithm (iterative)",
    code: `function eulerTrail(graph, start):
    stack = [start]
    path = []

    while stack not empty:
        v = stack[stack.length - 1]
        if v has unused edges:
            (v, u) = takeUnusedEdge(v)
            markUsed(v, u)
            stack.push(u)
        else:
            path.push(stack.pop())

    return reverse(path)`,
    explanation:
      'Vertices are added to the output only when you cannot go further. Reversing the pop order yields the valid Eulerian trail.',
  },
  {
    title: 'Start selection for directed graphs',
    code: `function pickStartDirected(graph):
    start = null
    for v in vertices:
        if outDegree(v) == inDegree(v) + 1:
            start = v
        else if outDegree(v) != inDegree(v):
            return null // violates Eulerian conditions
    if start == null:
        start = anyVertexWithEdges()
    return start`,
    explanation:
      'A directed Eulerian path has a unique start with one extra outgoing edge. If none exists, the graph must support a cycle.',
  },
  {
    title: 'Worked mini-example (undirected)',
    code: `Edges:
A-B, B-C, C-A, C-D, D-C

Degrees: A=2, B=2, C=4, D=2
All even -> Eulerian cycle exists
One possible cycle: A-B-C-D-C-A`,
    explanation:
      'All vertices have even degree and the graph is connected, so a cycle exists.',
  },
]

const edgeCases = [
  'No edges: trivially Eulerian cycle with an empty trail.',
  'Exactly two odd vertices: Eulerian path exists, cycle does not.',
  'Disconnected non-zero-degree vertices: no Eulerian trail exists.',
  'Parallel edges and self-loops require edge IDs to prevent double-use.',
]

const pitfalls = [
  'Ignoring isolated vertices when checking connectivity. Only vertices with non-zero degree matter.',
  'Counting self-loops wrong in undirected graphs; each loop contributes 2 to the degree.',
  'Assuming a valid Eulerian path implies unique ordering. Multiple tours can exist.',
  'Failing to handle multi-edges. Parallel edges must be tracked individually with IDs or counters.',
  'Picking the wrong start node for directed graphs, which can flip a valid trail into a dead end.',
]

const decisionGuidance = [
  'Use Eulerian checks when you must cover every edge exactly once or want to detect if such a route exists.',
  'Prefer Eulerian reasoning for traversal, routing, and reconstruction problems where edges represent tasks or observations.',
  'If you need to visit every vertex exactly once, you want Hamiltonian paths instead of Eulerian paths.',
  'When the graph is not Eulerian, consider Chinese Postman or edge duplication to make it traversable.',
  'For massive graphs, perform degree tests first; they are cheap and can skip costly traversals.',
]

const variantTable = [
  {
    variant: 'Undirected Eulerian trail',
    graphType: 'Undirected',
    guarantee: 'Exact edge coverage when degree rules pass',
    useCase: 'Pen-and-ink puzzles, street routing',
  },
  {
    variant: 'Directed Eulerian trail',
    graphType: 'Directed',
    guarantee: 'Exact edge coverage when in/out balance passes',
    useCase: 'Flow routing, de Bruijn graphs',
  },
  {
    variant: 'Chinese Postman',
    graphType: 'Undirected or directed',
    guarantee: 'Shortest closed walk covering all edges',
    useCase: 'Make non-Eulerian graphs traversable',
  },
]

const advancedInsights = [
  {
    title: 'Eulerian vs Hamiltonian contrast',
    detail:
      'Eulerian paths are easy to test and construct in linear time. Hamiltonian paths are NP-complete and far more complex.',
  },
  {
    title: 'De Bruijn graph reconstruction',
    detail:
      'A string can be reconstructed by an Eulerian path that visits every k-mer edge exactly once, which is why the algorithm scales to large genomes.',
  },
  {
    title: 'Edge augmentation strategies',
    detail:
      'To make a graph Eulerian, pair odd-degree vertices (undirected) or balance in/out degrees (directed) with minimum added cost.',
  },
  {
    title: 'Streaming-friendly construction',
    detail:
      'Hierholzer can run with adjacency iterators and edge counters, making it efficient for large sparse graphs without heavy recursion.',
  },
]

const takeaways = [
  'Eulerian paths and cycles are about edges: use every edge exactly once, revisit vertices as needed.',
  'Degree conditions plus connectivity tell you whether a trail exists, before you attempt to build it.',
  "Hierholzer's algorithm constructs the trail in linear time by splicing cycles.",
  'Directed graphs need in/out balance; undirected graphs need even degrees except possible endpoints.',
  'These ideas power routing, coverage, and reconstruction problems across science and engineering.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.euler98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  padding: 0;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.euler98-window {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.euler98-titlebar {
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

.euler98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.euler98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.euler98-control {
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
  cursor: pointer;
}

.euler98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.euler98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  color: #000;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.euler98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.euler98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 230px 1fr;
}

.euler98-toc {
  background: #efefef;
  border-right: 1px solid #808080;
  padding: 12px;
  overflow: auto;
}

.euler98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.euler98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.euler98-toc-list li {
  margin: 0 0 8px;
}

.euler98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.euler98-toc-list a:hover {
  text-decoration: underline;
}

.euler98-content {
  padding: 14px 20px 22px;
  overflow: auto;
}

.euler98-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.euler98-content a {
  color: #000080;
}

.euler98-section {
  margin: 0 0 18px;
}

.euler98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.euler98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.euler98-content p,
.euler98-content li {
  margin: 0 0 9px;
  font-size: 12px;
  line-height: 1.5;
}

.euler98-content ul,
.euler98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.euler98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 13px 0;
}

.euler98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.euler98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .euler98-main {
    grid-template-columns: 1fr;
  }

  .euler98-toc {
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
    { id: 'bp-prerequisites', label: 'Prerequisites' },
    { id: 'bp-io', label: 'Inputs and Outputs' },
    { id: 'bp-formal', label: 'Formal Concepts' },
    { id: 'bp-mental', label: 'Mental Models' },
    { id: 'bp-when', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-existence', label: 'Existence Conditions' },
    { id: 'core-algorithm', label: 'Hierholzer Steps' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-data', label: 'Data Structures' },
    { id: 'core-correctness', label: 'Correctness' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-applications', label: 'Real-World Applications' },
    { id: 'ex-edge-cases', label: 'Edge Cases' },
  ],
  glossary: [
    { id: 'glossary-terms', label: 'Core Terms' },
    { id: 'glossary-variants', label: 'Variants and Tradeoffs' },
  ],
}

export default function EulerianPathCyclePage(): JSX.Element {
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
    document.title = `Eulerian Path & Cycle (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Eulerian Path & Cycle',
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
    <div className="euler98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="euler98-window" role="presentation">
        <header className="euler98-titlebar">
          <span className="euler98-title">Eulerian Path &amp; Cycle</span>
          <div className="euler98-title-controls">
            <button className="euler98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="euler98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="euler98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`euler98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="euler98-main">
          <aside className="euler98-toc" aria-label="Table of contents">
            <h2 className="euler98-toc-title">Contents</h2>
            <ul className="euler98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="euler98-content">
            <h1 className="euler98-doc-title">Eulerian Path &amp; Cycle</h1>
            <p>
              Eulerian paths and cycles determine whether every edge can be traversed exactly once. The decision comes from
              degree rules plus connectivity, and Hierholzer constructs the trail in linear time.
            </p>
            <p>
              <Link to="/algoViz">Back to catalog</Link>
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="euler98-section">
                  <h2 className="euler98-heading">Overview</h2>
                  <p>
                    An Eulerian trail uses each edge exactly once; an Eulerian cycle also returns to the starting vertex.
                    Unlike Hamiltonian paths, Eulerian trails are efficiently testable and constructible.
                  </p>
                </section>
                <hr className="euler98-divider" />
                <section id="bp-history" className="euler98-section">
                  <h2 className="euler98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="euler98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-prerequisites" className="euler98-section">
                  <h2 className="euler98-heading">Prerequisites</h2>
                  {prerequisites.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-io" className="euler98-section">
                  <h2 className="euler98-heading">Inputs and Outputs</h2>
                  {inputsOutputs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-formal" className="euler98-section">
                  <h2 className="euler98-heading">Formal Concepts</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-mental" className="euler98-section">
                  <h2 className="euler98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-when" className="euler98-section">
                  <h2 className="euler98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="bp-takeaways" className="euler98-section">
                  <h2 className="euler98-heading">Key Takeaways</h2>
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
                <section id="core-existence" className="euler98-section">
                  <h2 className="euler98-heading">Existence Conditions</h2>
                  {existenceConditions.map((block) => (
                    <div key={block.heading}>
                      <h3 className="euler98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-algorithm" className="euler98-section">
                  <h2 className="euler98-heading">Hierholzer Steps</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-flow" className="euler98-section">
                  <h2 className="euler98-heading">Step-by-Step Flow</h2>
                  <ol>
                    {stepByStepFlow.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-data" className="euler98-section">
                  <h2 className="euler98-heading">Data Structures</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="euler98-section">
                  <h2 className="euler98-heading">Correctness Notes</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-implementation" className="euler98-section">
                  <h2 className="euler98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="euler98-section">
                  <h2 className="euler98-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="euler98-section">
                  <h2 className="euler98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="euler98-section">
                  <h2 className="euler98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-code" className="euler98-section">
                  <h2 className="euler98-heading">Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="euler98-subheading">{example.title}</h3>
                      <div className="euler98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-applications" className="euler98-section">
                  <h2 className="euler98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="ex-edge-cases" className="euler98-section">
                  <h2 className="euler98-heading">Edge Cases Checklist</h2>
                  <ul>
                    {edgeCases.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms" className="euler98-section">
                  <h2 className="euler98-heading">Core Terms</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p><strong>Degree parity:</strong> Odd/even degree pattern used in undirected Eulerian existence checks.</p>
                  <p><strong>Balance condition:</strong> In/out-degree equality rules used for directed Eulerian checks.</p>
                  <p><strong>Cycle splicing:</strong> Merging local tours into one global trail in Hierholzer's method.</p>
                </section>
                <section id="glossary-variants" className="euler98-section">
                  <h2 className="euler98-heading">Variants and Tradeoffs</h2>
                  {variantTable.map((item) => (
                    <p key={item.variant}>
                      <strong>{item.variant}:</strong> {item.graphType}. <strong>Guarantee:</strong> {item.guarantee}.{' '}
                      <strong>Typical use case:</strong> {item.useCase}.
                    </p>
                  ))}
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
