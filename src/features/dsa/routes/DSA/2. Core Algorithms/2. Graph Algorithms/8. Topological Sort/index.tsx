import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Dependency layering',
    detail:
      'Every edge u -> v says u must appear before v. Topological ordering is a schedule that respects all such prerequisites.',
  },
  {
    title: 'Peeling zero indegree',
    detail:
      'Nodes with no unmet prerequisites can be output now; remove them and repeat to peel layers of readiness.',
  },
  {
    title: 'DFS finishing order',
    detail:
      'In a DAG, reversing DFS finishing times gives a valid topological order because children finish before parents in the directed sense.',
  },
]

const prerequisites = [
  {
    title: 'Directed acyclic graph (DAG)',
    detail:
      'Topological ordering exists only if the graph has no directed cycles.',
  },
  {
    title: 'Partial order',
    detail:
      'Each edge u -> v imposes a constraint u must appear before v in the order.',
  },
  {
    title: 'Indegree and outdegree',
    detail:
      'Indegree counts prerequisites; nodes with indegree 0 are ready to be scheduled.',
  },
  {
    title: 'DFS finish time',
    detail:
      'In a DAG, a node finishes after all its descendants, so reversing finishes yields a valid order.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Directed graph G = (V, E), typically adjacency lists; can be disconnected.',
  },
  {
    title: 'Output',
    detail:
      'A list of all vertices in topological order, or a cycle-detected failure.',
  },
  {
    title: 'Optional',
    detail:
      'Component or stage grouping (levels) derived from Kahn layers.',
  },
]

const historicalMilestones = [
  {
    title: 'Topological ordering formalized',
    detail:
      'The concept emerged from scheduling and precedence constraints, becoming a standard primitive in graph theory and compilers.',
  },
  {
    title: "Kahn's algorithm (1962)",
    detail:
      'Arthur B. Kahn proposed the linear-time indegree peeling method, still the default in build systems.',
  },
  {
    title: 'DFS-based ordering',
    detail:
      'DFS finishing times provided a clean alternative, enabling cycle detection with color states.',
  },
]

const mechanics = [
  {
    heading: "Kahn's algorithm (BFS style)",
    bullets: [
      'Compute indegree for every node; enqueue nodes with indegree 0.',
      'Pop from queue, append to order, decrement indegree of outgoing neighbors; enqueue any that drop to 0.',
      'If processed count < V at the end, a cycle exists.',
    ],
  },
  {
    heading: 'DFS finishing order',
    bullets: [
      'Run DFS; on exit from a node, push it onto a stack.',
      'After traversal, reverse the stack (or pop) to produce a topo order.',
      'If a back edge is found during DFS, the graph has a cycle and no topo order exists.',
    ],
  },
  {
    heading: 'Cycle detection',
    bullets: [
      'Kahn: leftover nodes (indegree > 0) imply a cycle.',
      'DFS: encountering a gray (in-progress) node indicates a back edge (cycle).',
    ],
  },
]

const stepByStepFlow = [
  'Verify the graph is directed; initialize storage for indegree or DFS state.',
  'Choose a method: Kahn for queue-based peeling or DFS for finish-ordering.',
  'For Kahn: compute indegrees, enqueue zero-indegree nodes, and peel layers.',
  'For DFS: run DFS, detect back edges, and push nodes on finish.',
  'If a cycle is detected, report failure; otherwise output the computed order.',
  'Optionally group nodes by layers (Kahn) or compute longest paths on the DAG.',
]

const dataStructures = [
  {
    title: 'Indegree array',
    detail:
      "Counts remaining prerequisites for each node in Kahn's algorithm.",
  },
  {
    title: 'Queue or priority queue',
    detail:
      'Holds ready nodes. A priority queue yields lexicographically smallest orders.',
  },
  {
    title: 'Visited and color state',
    detail:
      'DFS uses white/gray/black or visited/onstack to detect cycles.',
  },
  {
    title: 'Order list / stack',
    detail:
      'Kahn appends in dequeue order; DFS pushes on finish and then reverses.',
  },
]

const correctnessNotes = [
  {
    title: 'Why Kahn works',
    detail:
      'Every DAG has a node with indegree 0. Removing it preserves acyclicity, so repeating outputs a valid order.',
  },
  {
    title: 'Why DFS works',
    detail:
      'In a DAG, edges only go from earlier-finished to later-finished nodes; reversing finishes respects constraints.',
  },
  {
    title: 'Cycle detection',
    detail:
      'If Kahn cannot process all nodes or DFS finds a back edge, the graph contains a directed cycle.',
  },
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'Both Kahn and DFS-based methods run in O(V + E) time with O(V) space for indegree or stacks and visited state.',
  },
  {
    title: 'Ordering differences',
    detail:
      'Multiple valid orders exist; queue/stack ordering and neighbor order affect which one you see.',
  },
]

const realWorldUses = [
  {
    context: 'Build systems and CI',
    detail:
      'Order compilation or deployment steps based on dependency graphs (packages, modules, tasks).',
  },
  {
    context: 'Course scheduling',
    detail:
      'Lay out courses respecting prerequisites to find a valid term-by-term plan or detect impossibility.',
  },
  {
    context: 'Data pipelines',
    detail:
      'Schedule ETL stages so that inputs are ready before dependent transformations run.',
  },
  {
    context: 'Game logic and rendering',
    detail:
      'Resolve update/render order for scene graphs or systems with directional constraints.',
  },
  {
    context: 'Compiler passes',
    detail:
      'Order optimization and analysis passes based on dependencies in call graphs and module graphs.',
  },
  {
    context: 'Task orchestration',
    detail:
      'Workflow engines schedule jobs with prerequisites and detect circular waits.',
  },
]

const examples = [
  {
    title: "Kahn's algorithm",
    code: `function topoKahn(graph):
    indeg = { v: 0 for v in graph.vertices() }
    for u in graph.vertices():
        for v in graph.neighbors(u):
            indeg[v] += 1
    queue = [v for v in graph.vertices() if indeg[v] == 0]
    order = []

    while queue:
        u = queue.pop(0)  // use deque in practice
        order.append(u)
        for v in graph.neighbors(u):
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)

    if len(order) != graph.size():
        throw CycleDetected
    return order`,
    explanation:
      'Zero-indegree nodes are ready to output; removing them uncovers the next layer. Leftovers imply a cycle.',
  },
  {
    title: 'DFS-based topo sort',
    code: `function topoDFS(graph):
    visited = set()
    onstack = set()
    order = []

    function dfs(u):
        visited.add(u)
        onstack.add(u)
        for v in graph.neighbors(u):
            if v in onstack:
                throw CycleDetected
            if v not in visited:
                dfs(v)
        onstack.remove(u)
        order.append(u)

    for u in graph.vertices():
        if u not in visited:
            dfs(u)

    order.reverse()
    return order`,
    explanation:
      'Finishing times reversed yield a valid order. On-stack detection catches cycles early.',
  },
  {
    title: 'Worked mini-example',
    code: `Edges:
A -> C, B -> C, C -> D, B -> E

Kahn:
indeg(A)=0 indeg(B)=0 indeg(C)=2 indeg(D)=1 indeg(E)=1
queue = [A, B]
pop A -> order [A], indeg(C)=1
pop B -> order [A, B], indeg(C)=0 indeg(E)=0, queue [C, E]
pop C -> order [A, B, C], indeg(D)=0, queue [E, D]
pop E -> order [A, B, C, E]
pop D -> order [A, B, C, E, D]`,
    explanation:
      'Any order that keeps A and B before C, and C before D, is valid; E just needs B before it.',
  },
  {
    title: 'Lexicographically smallest topo order',
    code: `Use a min-heap for Kahn's queue:
queue = MinHeap()
push all indeg-0 nodes
always pop the smallest available node`,
    explanation:
      'A priority queue yields deterministic smallest ordering when node labels are comparable.',
  },
]

const pitfalls = [
  'Applying topo sort to graphs with cycles will fail; detect and report cycles.',
  'Using a normal queue instead of deque for Kahn can be slow in some languages.',
  'Forgetting to reverse the DFS finishing list yields an order that violates prerequisites.',
  'Not resetting or separating visitation state between components can miss nodes.',
  'Reusing indegree counts after mutation without copying; this corrupts future runs.',
]

const edgeCases = [
  'Disconnected DAGs: orders must include all nodes, not just one component.',
  'Multiple valid orders: output is not unique unless you enforce tie-breaking.',
  'Nodes with no edges: they can appear anywhere in the order.',
  'Parallel edges: they add multiple indegree counts and must be handled consistently.',
]

const decisionGuidance = [
  "Need explicit cycle detection plus order: Kahn's algorithm is straightforward.",
  'Already running DFS for other tasks: reuse finishing times for ordering and cycle detection.',
  'Need stable or deterministic orders: control neighbor iteration and queue/stack policy.',
  'Need grouping by layers: Kahn naturally exposes stages of readiness.',
]

const implementationNotes = [
  {
    title: 'Graph mutation',
    detail:
      'Kahn can be implemented without deleting edges by decrementing indegree counts.',
  },
  {
    title: 'Cycle reporting',
    detail:
      'If a cycle exists, keep the leftover nodes to help identify the problematic subgraph.',
  },
  {
    title: 'Performance',
    detail:
      'Use a deque for O(1) pops in Kahn. For DFS, iterative stacks avoid recursion limits.',
  },
  {
    title: 'Layer output',
    detail:
      'Process the queue in rounds to emit levels (all nodes ready at the same step).',
  },
]

const advancedInsights = [
  {
    title: 'Topo order enables DP on DAGs',
    detail:
      'Shortest/longest paths and counting paths become linear-time by processing nodes in topo order.',
  },
  {
    title: 'Reverse topo order',
    detail:
      'Useful for propagating values from sinks to sources, such as computing post-dominators.',
  },
  {
    title: 'Incremental updates',
    detail:
      'Dynamic graphs can maintain a topo order, but it is more complex than static sorting.',
  },
]

const variantTable = [
  {
    variant: "Kahn's algorithm",
    strengths: 'Simple, explicit cycle detection',
    ordering: 'Depends on queue policy',
  },
  {
    variant: 'DFS finishing order',
    strengths: 'Pairs naturally with DFS-based graph work',
    ordering: 'Depends on traversal order',
  },
  {
    variant: 'Kahn + priority queue',
    strengths: 'Deterministic smallest ordering',
    ordering: 'Lexicographic',
  },
]

const takeaways = [
  'Topological sort orders DAG nodes so every edge points forward; it is impossible when cycles exist.',
  'Kahn peels zero-indegree layers; DFS reverses finishing times - both run in linear time.',
  'Cycle detection is integral: leftover indegree or back edges signal failure to order.',
]

const glossaryTerms = [
  {
    term: 'Topological sort',
    definition:
      'An ordering of directed graph vertices where every edge u -> v places u before v; valid only for DAGs.',
  },
  {
    term: 'Directed acyclic graph (DAG)',
    definition:
      'A directed graph with no directed cycle; this is the prerequisite for any topological ordering.',
  },
  {
    term: 'Partial order',
    definition:
      'A set of precedence constraints where each edge imposes u before v but does not force a unique global order.',
  },
  {
    term: 'Indegree',
    definition:
      "The number of incoming edges (prerequisites) for a node; Kahn's algorithm starts from indegree-zero nodes.",
  },
  {
    term: 'DFS finish time',
    definition:
      'The completion moment of a DFS call. Reversing finish order yields a topological order in DAGs.',
  },
  {
    term: "Kahn's algorithm",
    definition:
      'A queue-based method that repeatedly outputs indegree-zero nodes and removes their outgoing constraints.',
  },
  {
    term: 'Back edge',
    definition:
      'A DFS edge to an in-progress node, which signals a directed cycle and invalidates topological ordering.',
  },
  {
    term: 'Layered schedule',
    definition:
      "Grouping nodes by Kahn rounds to show stages of readiness where all nodes in a stage can run together.",
  },
  {
    term: 'Lexicographically smallest order',
    definition:
      'A deterministic valid topological order produced by using a min-heap for ready nodes.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98TopologicalHelpStyles = `
.topo-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.topo-help-window {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
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

.topo-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 22px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.topo-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.topo-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.topo-help-control {
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

.topo-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.topo-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.topo-help-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.topo-help-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.topo-help-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.topo-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.topo-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.topo-help-toc-list li {
  margin: 0 0 8px;
}

.topo-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.topo-help-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.topo-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.topo-help-content p,
.topo-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.topo-help-content p {
  margin: 0 0 10px;
}

.topo-help-content ul,
.topo-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.topo-help-section {
  margin: 0 0 20px;
}

.topo-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.topo-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.topo-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.topo-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background: #f4f4f4;
}

.topo-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.topo-help-link {
  color: #000080;
}

@media (max-width: 900px) {
  .topo-help-main {
    grid-template-columns: 1fr;
  }

  .topo-help-toc {
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
    { id: 'bp-prerequisites', label: 'Prerequisites and Definitions' },
    { id: 'bp-io', label: 'Inputs and Outputs' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'Mechanics in Motion' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-data-structures', label: 'Data Structures and Invariants' },
    { id: 'core-correctness', label: 'Correctness Sketch' },
    { id: 'core-complexity', label: 'Complexity Analysis' },
    { id: 'core-real-world', label: 'Real-World Applications' },
    { id: 'core-decision', label: 'When to Use It' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-variants', label: 'Variants and Tradeoffs' },
    { id: 'core-risks', label: 'Pitfalls and Edge Cases' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function TopologicalSortPage(): JSX.Element {
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
    document.title = `Topological Sort (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tab)
    setSearchParams(nextParams, { replace: true })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Topological Sort',
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
    <div className="topo-help-page">
      <style>{win98TopologicalHelpStyles}</style>
      <div className="topo-help-window" role="presentation">
        <header className="topo-help-titlebar">
          <span className="topo-help-title">Topological Sort - Help</span>
          <div className="topo-help-controls">
            <button className="topo-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="topo-help-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="topo-help-tabs" role="tablist" aria-label="Major sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`topo-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="topo-help-main">
          <aside className="topo-help-toc" aria-label="Table of contents">
            <h2 className="topo-help-toc-title">Contents</h2>
            <ul className="topo-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="topo-help-content">
            <h1 className="topo-help-doc-title">Topological Sort</h1>
            <p>
              Topological sorting produces an ordering of directed acyclic graph nodes where every prerequisite precedes its
              dependents. Kahn&apos;s queue-based peeling and DFS finishing-order reversal both deliver linear-time solutions with
              built-in cycle detection.
            </p>
            <p>
              <Link to="/algoViz" className="topo-help-link">
                Back to Catalog
              </Link>
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="topo-help-section">
                  <h2 className="topo-help-heading">Overview</h2>
                  <p>
                    Many workflows are DAGs: builds, courses, pipelines. A topological order is any valid schedule. If no order exists,
                    you have a cycle to break before progress can continue.
                  </p>
                  <p>
                    This algorithm is about respecting prerequisites at scale. The graph can be disconnected, and multiple valid orders
                    often exist.
                  </p>
                </section>
                <hr className="topo-help-divider" />
                <section id="bp-prerequisites" className="topo-help-section">
                  <h2 className="topo-help-heading">Prerequisites and Definitions</h2>
                  {prerequisites.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="topo-help-divider" />
                <section id="bp-io" className="topo-help-section">
                  <h2 className="topo-help-heading">Inputs and Outputs</h2>
                  {inputsOutputs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="topo-help-divider" />
                <section id="bp-history" className="topo-help-section">
                  <h2 className="topo-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="topo-help-divider" />
                <section id="bp-takeaways" className="topo-help-section">
                  <h2 className="topo-help-heading">Key Takeaways</h2>
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
                <section id="core-mental-models" className="topo-help-section">
                  <h2 className="topo-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics" className="topo-help-section">
                  <h2 className="topo-help-heading">Mechanics in Motion</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="topo-help-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-flow" className="topo-help-section">
                  <h2 className="topo-help-heading">Step-by-Step Flow</h2>
                  <ol>
                    {stepByStepFlow.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-data-structures" className="topo-help-section">
                  <h2 className="topo-help-heading">Data Structures and Invariants</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="topo-help-section">
                  <h2 className="topo-help-heading">Correctness Sketch</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="topo-help-section">
                  <h2 className="topo-help-heading">Complexity Analysis</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <section id="core-real-world" className="topo-help-section">
                  <h2 className="topo-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decision" className="topo-help-section">
                  <h2 className="topo-help-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-implementation" className="topo-help-section">
                  <h2 className="topo-help-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="topo-help-section">
                  <h2 className="topo-help-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="topo-help-section">
                  <h2 className="topo-help-heading">Variants and Tradeoffs</h2>
                  <ul>
                    {variantTable.map((row) => (
                      <li key={row.variant}>
                        <strong>{row.variant}:</strong> Strengths: {row.strengths}. Ordering effect: {row.ordering}.
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-risks" className="topo-help-section">
                  <h2 className="topo-help-heading">Pitfalls and Edge Cases</h2>
                  <h3 className="topo-help-subheading">Common Pitfalls</h3>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3 className="topo-help-subheading">Edge Cases Checklist</h3>
                  <ul>
                    {edgeCases.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="topo-help-section">
                <h2 className="topo-help-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="topo-help-subheading">{example.title}</h3>
                    <div className="topo-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="topo-help-section">
                <h2 className="topo-help-heading">Glossary</h2>
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

