import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Tarjan, Kosaraju, and the SCC toolkit (1970s)',
    detail:
      "Multiple linear-time SCC algorithms emerged: Kosaraju's two-pass DFS, Tarjan's one-pass low-link method, and later Gabow's stack-based approach. Together they cemented SCCs as a core graph primitive.",
  },
  {
    title: 'Cut/condense insight',
    detail:
      "Viewing SCCs as nodes of a DAG (the condensation graph) clarified why finishing times from one pass order SCCs for the next. This perspective underpins Kosaraju's correctness proof.",
  },
  {
    title: 'SCCs in compilers and systems',
    detail:
      'Dependency analysis, dead code elimination, circuit timing, and package managers all adopted SCC decompositions to collapse cycles into single units for scheduling and optimization.',
  },
]

const mentalModels = [
  {
    title: 'Finish order as a topological hint',
    detail:
      'A DFS finishing stack orders SCCs reverse-topologically: if there is a path from A to B in the condensation DAG, B finishes before A. Processing in that order on the reversed graph peels SCCs cleanly.',
  },
  {
    title: 'Turn sinks into sources',
    detail:
      'Reversing edges converts sink SCCs into sources. Starting DFS from the latest finisher ensures you expand exactly one SCC before any incoming edges can pull you elsewhere.',
  },
  {
    title: 'Two mirrors of the same walk',
    detail:
      'Pass one paints a map of where you can finish; pass two follows the mirrors of those paths, revealing mutually reachable groups.',
  },
]

const prerequisites = [
  {
    title: 'Strong connectivity',
    detail:
      'A strongly connected component (SCC) is a maximal set of vertices where each vertex can reach every other vertex.',
  },
  {
    title: 'DFS finishing times',
    detail:
      'DFS records when a node is fully explored. Those finish times implicitly order SCCs in the condensation DAG.',
  },
  {
    title: 'Transpose graph G^T',
    detail:
      'Reversing all edges flips sources and sinks in the condensation graph, which is the key trick in pass two.',
  },
  {
    title: 'Condensation DAG',
    detail:
      'Contract every SCC into a single node. The resulting graph is acyclic and explains why the ordering works.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Directed graph G = (V, E), usually as an adjacency list; can be disconnected.',
  },
  {
    title: 'Output',
    detail:
      'List of SCCs (each is a vertex set). Optional: a condensation DAG or component ID per vertex.',
  },
  {
    title: 'Preprocessing',
    detail:
      'Either build the transpose graph explicitly or provide an iterator over incoming edges.',
  },
]

const mechanics = [
  {
    heading: 'Pass 1: finishing order on G',
    bullets: [
      'Run DFS over all vertices; on exit, push the vertex onto a stack/list.',
      'Finishing order ensures that edges in the condensation DAG point from later to earlier finishes.',
    ],
  },
  {
    heading: 'Pass 2: discovery on G^T',
    bullets: [
      'Traverse the reversed graph. Pop vertices from the finish stack.',
      'For each unvisited vertex popped, run DFS/BFS on G^T to collect one SCC.',
      'Because sinks became sources, each search stays within a single SCC.',
    ],
  },
  {
    heading: 'Outputs',
    bullets: [
      'List of SCCs (each a vertex set).',
      'Optional condensation DAG by contracting SCCs and adding edges between components.',
    ],
  },
]

const stepByStepFlow = [
  'Initialize visited flags and an empty finish list.',
  'Run DFS from every unvisited node in G; append each node to the finish list after exploring all neighbors.',
  'Build or access the transpose graph G^T.',
  'Clear visited flags, then iterate nodes in reverse finish order.',
  'For each unvisited node, run DFS on G^T to collect exactly one SCC.',
  'Record component IDs or component lists; optionally build the condensation DAG.',
]

const dataStructures = [
  {
    title: 'Finish list / stack',
    detail:
      'Stores vertices by DFS finish time. Processing in reverse order is the critical ordering guarantee.',
  },
  {
    title: 'Visited flags',
    detail:
      'Separate visited arrays for the two passes keep traversals independent and correct.',
  },
  {
    title: 'Transpose adjacency',
    detail:
      'Either an explicit reversed adjacency list or an in-edge iterator, both O(V + E).',
  },
  {
    title: 'Component labels',
    detail:
      'An array mapping vertex -> component ID enables fast SCC membership queries.',
  },
]

const correctnessNotes = [
  {
    title: 'Finish order respects condensation DAG',
    detail:
      'If there is an edge from SCC A to SCC B in G, all vertices in A finish after all vertices in B.',
  },
  {
    title: 'Transpose turns sinks into sources',
    detail:
      'In G^T, edges reverse so the last-finishing SCC becomes a source, isolating it for DFS.',
  },
  {
    title: 'Each pass isolates exactly one SCC',
    detail:
      'Starting from the latest finisher on G^T, DFS cannot leave its SCC, and will visit the entire SCC.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(V + E): two graph traversals. Sorting is not needed; the stack order emerges from DFS finishes.',
  },
  {
    title: 'Space',
    detail:
      'O(V + E) to store the graph; O(V) for visited flags and the finish stack. A reversed adjacency list may double storage unless generated on the fly.',
  },
  {
    title: 'Iterative robustness',
    detail:
      'Recursive DFS can overflow on deep graphs. Iterative stacks keep the same complexity with better safety in production code.',
  },
]

const realWorldUses = [
  {
    context: 'Package and build systems',
    detail:
      'Collapse dependency cycles into single nodes to schedule builds or updates. Many build tools and package managers run SCC detection to break strongly connected dependency chains.',
  },
  {
    context: 'Program analysis and compilers',
    detail:
      'SCCs enable strongly connected region scheduling, dead code elimination, and identifying loops in control-flow graphs.',
  },
  {
    context: 'Model checking and games',
    detail:
      'Closed sets of states (attractors, recurrent classes) are SCCs. Finding them is central to reachability, liveness, and parity-game solvers.',
  },
  {
    context: 'Clustering on directed data',
    detail:
      'In web graphs or citation networks, SCCs reveal tightly knit communities of mutual reachability.',
  },
]

const examples = [
  {
    title: "Kosaraju's algorithm (iterative-friendly pseudocode)",
    code: `function kosaraju(graph):
    order = []
    visited = set()

    # pass 1: record finish order
    for u in graph.vertices():
        if u not in visited:
            iterative_dfs_finish(graph, u, visited, order)

    visited.clear()
    sccs = []
    for u in reversed(order):
        if u not in visited:
            comp = []
            iterative_dfs_collect(graph.rev(), u, visited, comp)
            sccs.append(comp)
    return sccs

function iterative_dfs_finish(g, start, visited, order):
    stack = [(start, 0)]  # (node, next_index)
    visited.add(start)
    while stack:
        u, idx = stack.pop()
        if idx < len(g.neighbors(u)):
            v = g.neighbors(u)[idx]
            stack.append((u, idx + 1))
            if v not in visited:
                visited.add(v)
                stack.append((v, 0))
        else:
            order.append(u)  # finished

function iterative_dfs_collect(g_rev, start, visited, comp):
    stack = [start]
    visited.add(start)
    while stack:
        u = stack.pop()
        comp.append(u)
        for v in g_rev.neighbors(u):
            if v not in visited:
                visited.add(v)
                stack.append(v)`,
    explanation:
      'Finishing order from the first pass provides a reverse topological ordering of SCCs. Iterative DFS avoids recursion limits while preserving O(V + E) cost.',
  },
  {
    title: 'Worked mini-example',
    code: `Graph:
1 -> 2 -> 3 -> 1   (cycle)
3 -> 4 -> 5 -> 4   (cycle)

Pass 1 (finish order, one possible):
finish: [2,1,3,5,4]

Pass 2 on G^T (reverse order):
start 4 => {4,5}
start 3 => {1,2,3}

SCCs: {4,5}, {1,2,3}`,
    explanation:
      'The exact finish order can vary, but reverse order always isolates sink components first on the transpose graph.',
  },
  {
    title: 'Recursive version (compact)',
    code: `function kosaraju_recursive(g):
    visited = set()
    order = []

    def dfs1(u):
        visited.add(u)
        for v in g.neighbors(u):
            if v not in visited: dfs1(v)
        order.append(u)

    def dfs2(u, comp):
        visited.add(u)
        comp.append(u)
        for v in gT.neighbors(u):
            if v not in visited: dfs2(v, comp)

    for u in g.vertices():
        if u not in visited: dfs1(u)

    gT = g.transpose()
    visited.clear()
    sccs = []
    for u in reversed(order):
        if u not in visited:
            comp = []
            dfs2(u, comp)
            sccs.append(comp)
    return sccs`,
    explanation:
      'The recursive version mirrors the textbook algorithm. It is concise but can overflow recursion limits on deep graphs.',
  },
]

const pitfalls = [
  'Forgetting to reverse edges in pass 2; using the original graph yields incorrect SCC grouping.',
  'Stack overflow from recursive DFS on large graphs; use iterative versions in production.',
  'Materializing the reversed graph can double memory; consider on-the-fly reverse adjacency iteration.',
  'Assuming uniqueness: multiple valid SCC orders exist; determinism may need vertex-id tie-breaks.',
]

const edgeCases = [
  'Isolated vertices: each vertex is its own SCC.',
  'Self-loops: the vertex is still a valid SCC of size 1.',
  'Disconnected graphs: must start DFS from every unvisited vertex in pass 1.',
  'Large, deep graphs: recursion may overflow; iterative DFS is safer.',
]

const decisionGuidance = [
  'Need simple, linear-time SCCs and can afford two passes: use Kosaraju.',
  "Need single-pass SCCs or memory tightness: use Tarjan's algorithm.",
  'Graph is extremely deep or large: prefer iterative DFS to avoid recursion limits.',
  'Streaming edges sorted by tail/head: consider on-the-fly reverse iteration to avoid building g^T fully.',
]

const implementationNotes = [
  {
    title: 'Building G^T',
    detail:
      'If memory allows, precompute reverse adjacency for O(1) in-edges; otherwise keep incoming edges or reconstruct on demand.',
  },
  {
    title: 'Determinism',
    detail:
      'SCC order is not unique. If deterministic ordering matters, sort adjacency lists or process vertices in a fixed order.',
  },
  {
    title: 'Component IDs',
    detail:
      'Assign component IDs during pass 2 to enable quick SCC membership checks and to build the condensation DAG.',
  },
]

const advancedInsights = [
  {
    title: 'Condensation DAG ordering',
    detail:
      'Finishing times produce a reverse topological order of the condensation graph. This is why processing in that order on g^T isolates SCCs.',
  },
  {
    title: 'Comparison to Tarjan',
    detail:
      'Tarjan computes low-link values in one pass with one stack. Kosaraju splits work into two clean passes; both are O(V + E), but Tarjan saves the reverse graph cost.',
  },
  {
    title: 'Edge-reversal shortcuts',
    detail:
      'If the graph stores in-edges alongside out-edges, pass 2 can iterate in-edges directly, avoiding explicit reversal and halving memory.',
  },
  {
    title: 'Parallel opportunities',
    detail:
      'Parallelization is tricky because pass 2 depends on pass 1 ordering, but building the reverse graph and the first DFS can be parallelized in preprocessing.',
  },
]

const variantTable = [
  {
    variant: 'Kosaraju',
    passes: 'Two DFS passes',
    memory: 'Needs transpose or in-edge access',
    useCase: 'Clear, simple SCC extraction',
  },
  {
    variant: 'Tarjan',
    passes: 'One DFS pass',
    memory: 'No transpose, lowlink + stack',
    useCase: 'Single-pass SCCs with strong invariants',
  },
  {
    variant: 'Gabow',
    passes: 'One DFS pass',
    memory: 'Two stacks',
    useCase: 'Alternative stack-based SCC algorithm',
  },
]

const takeaways = [
  "Kosaraju runs two DFS passes: finish order on G, discovery on G^T, to output SCCs in linear time.",
  'Union-Find is not needed; correctness rests on finish ordering and edge reversal.',
  'Iterative DFS avoids recursion issues; implicit reversal saves memory.',
  'Pick Tarjan for one-pass tightness, Kosaraju for clarity, and Gabow for another stack-based alternative.',
]

const glossary = [
  {
    term: 'Strongly connected component (SCC)',
    definition: 'A maximal vertex set where every vertex can reach every other vertex.',
  },
  {
    term: 'Transpose graph (G^T)',
    definition: 'Graph with all edges reversed; used in Kosaraju pass two.',
  },
  {
    term: 'Finishing order',
    definition: 'Order vertices complete in DFS; drives second-pass SCC extraction.',
  },
  {
    term: 'Condensation DAG',
    definition: 'A DAG formed by collapsing each SCC into one node.',
  },
  {
    term: 'Component ID',
    definition: 'Label assigning each vertex to an SCC.',
  },
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
    { id: 'bp-mental', label: 'Mental Models' },
    { id: 'bp-prereq', label: 'Prerequisites' },
    { id: 'bp-io', label: 'Inputs and Outputs' },
    { id: 'bp-apps', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-data', label: 'Data Structures' },
    { id: 'core-correct', label: 'Correctness Sketch' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-edge', label: 'Edge Cases' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-notes', label: 'Implementation Notes' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-variants', label: 'Variants and Alternatives' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
    { id: 'ex-trace', label: 'Trace Notes' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const kosarajuHelpStyles = `
.kosaraju98-page{min-height:100dvh;background:#c0c0c0;padding:0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif}
.kosaraju98-window{width:100%;min-height:100dvh;margin:0;display:flex;flex-direction:column;box-sizing:border-box;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040}
.kosaraju98-titlebar{position:relative;display:flex;align-items:center;padding:2px 4px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700}
.kosaraju98-title{position:absolute;left:50%;transform:translateX(-50%);font-size:16px}
.kosaraju98-controls{display:flex;gap:2px;margin-left:auto}
.kosaraju98-control{width:18px;height:16px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font-size:11px;line-height:1;cursor:pointer}
.kosaraju98-tabs{display:flex;gap:1px;padding:6px 8px 0}
.kosaraju98-tab{border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;padding:5px 10px 4px;font-size:12px;cursor:pointer}
.kosaraju98-tab.active{background:#fff;position:relative;top:1px}
.kosaraju98-main{border-top:1px solid #404040;background:#fff;flex:1;min-height:0;display:grid;grid-template-columns:240px 1fr}
.kosaraju98-toc{border-right:1px solid #808080;background:#f2f2f2;padding:12px;overflow:auto}
.kosaraju98-toc-title{font-size:12px;font-weight:700;margin:0 0 10px}
.kosaraju98-toc-list{list-style:none;margin:0;padding:0}
.kosaraju98-toc-list li{margin:0 0 8px}
.kosaraju98-toc-list a{color:#000;text-decoration:none;font-size:12px}
.kosaraju98-content{padding:14px 20px 20px;overflow:auto}
.kosaraju98-doc-title{font-size:20px;font-weight:700;margin:0 0 12px}
.kosaraju98-section{margin:0 0 20px}
.kosaraju98-heading{font-size:16px;font-weight:700;margin:0 0 8px}
.kosaraju98-subheading{font-size:13px;font-weight:700;margin:0 0 6px}
.kosaraju98-content p,.kosaraju98-content li,.kosaraju98-content td,.kosaraju98-content th{font-size:12px;line-height:1.5}
.kosaraju98-content p{margin:0 0 10px}
.kosaraju98-content ul,.kosaraju98-content ol{margin:0 0 10px 20px;padding:0}
.kosaraju98-divider{border:0;border-top:1px solid #d0d0d0;margin:14px 0}
.kosaraju98-table{width:100%;border-collapse:collapse;margin:0 0 10px}
.kosaraju98-table th,.kosaraju98-table td{text-align:left;border-bottom:1px solid #d0d0d0;padding:4px 6px;vertical-align:top}
.kosaraju98-codebox{background:#f4f4f4;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff;padding:8px;margin:6px 0 10px}
.kosaraju98-codebox code{font-family:"Courier New",Courier,monospace;font-size:12px;white-space:pre;display:block}
@media (max-width:900px){.kosaraju98-main{grid-template-columns:1fr}.kosaraju98-toc{border-right:none;border-bottom:1px solid #808080}}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function KosarajusAlgorithmPage(): JSX.Element {
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
    document.title = `Kosaraju's Algorithm (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: "Kosaraju's Algorithm",
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    let parsedTasks: Array<{ id: string }>
    try {
      parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    } catch {
      parsedTasks = []
    }
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
    <div className="kosaraju98-page">
      <style>{kosarajuHelpStyles}</style>
      <div className="kosaraju98-window" role="presentation">
        <header className="kosaraju98-titlebar">
          <span className="kosaraju98-title">Kosaraju&apos;s Algorithm - Help</span>
          <div className="kosaraju98-controls">
            <button className="kosaraju98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="kosaraju98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="kosaraju98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`kosaraju98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="kosaraju98-main">
          <aside className="kosaraju98-toc" aria-label="Table of contents">
            <h2 className="kosaraju98-toc-title">Contents</h2>
            <ul className="kosaraju98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="kosaraju98-content">
            <h1 className="kosaraju98-doc-title">Kosaraju&apos;s Algorithm</h1>
            <p>
              Kosaraju&apos;s algorithm finds strongly connected components with two DFS passes. The first records finishing order on the
              original graph; the second, on the reversed graph, peels components in reverse topological order of the condensation DAG.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Overview</h2>
                  <p>
                    SCCs collapse a directed graph into a DAG. Kosaraju achieves this in O(V + E): one DFS to capture finishing order,
                    and a second on the reversed graph to collect components. Sink components become sources after reversal, ensuring each
                    search stays inside one SCC.
                  </p>
                </section>
                <hr className="kosaraju98-divider" />
                <section id="bp-history" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="bp-mental" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="bp-prereq" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Prerequisites and Definitions</h2>
                  {prerequisites.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="bp-io" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Inputs and Outputs</h2>
                  {inputsOutputs.map((item) => (
                    <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="bp-apps" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}><strong>{item.context}:</strong> {item.detail}</p>
                  ))}
                </section>
                <section id="bp-takeaways" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Key Takeaways</h2>
                  <ul>{takeaways.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mechanics" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="kosaraju98-subheading">{block.heading}</h3>
                      <ul>{block.bullets.map((point) => <li key={point}>{point}</li>)}</ul>
                    </div>
                  ))}
                </section>
                <section id="core-flow" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">How It Works: Step-by-Step Flow</h2>
                  <ol>{stepByStepFlow.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section id="core-data" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Data Structures and Invariants</h2>
                  {dataStructures.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>)}
                </section>
                <section id="core-correct" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Correctness Sketch</h2>
                  {correctnessNotes.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>)}
                  <p>
                    The finish order ensures that when you start DFS on the transpose graph, you can only reach vertices within the same
                    SCC. This prevents cross-component leakage and guarantees every SCC is found exactly once.
                  </p>
                </section>
                <section id="core-complexity" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Complexity Analysis</h2>
                  {complexityNotes.map((note) => <p key={note.title}><strong>{note.title}:</strong> {note.detail}</p>)}
                </section>
                <section id="core-pitfalls" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Common Pitfalls</h2>
                  <ul>{pitfalls.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section id="core-edge" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Edge Cases Checklist</h2>
                  <ul>{edgeCases.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section id="core-when" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">When to Use It</h2>
                  <ol>{decisionGuidance.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section id="core-notes" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>)}
                </section>
                <section id="core-advanced" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.detail}</p>)}
                </section>
                <section id="core-variants" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Variants and Alternatives</h2>
                  <table className="kosaraju98-table">
                    <thead>
                      <tr><th>Variant</th><th>Passes</th><th>Memory tradeoff</th><th>Typical use case</th></tr>
                    </thead>
                    <tbody>
                      {variantTable.map((row) => (
                        <tr key={row.variant}>
                          <td>{row.variant}</td><td>{row.passes}</td><td>{row.memory}</td><td>{row.useCase}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-practical" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="kosaraju98-subheading">{example.title}</h3>
                      <div className="kosaraju98-codebox"><code>{example.code.trim()}</code></div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-trace" className="kosaraju98-section">
                  <h2 className="kosaraju98-heading">Trace Notes</h2>
                  <p>Pass one builds a finish ordering that reflects the condensation DAG structure.</p>
                  <p>Pass two on G^T consumes that ordering so each DFS stays inside one SCC.</p>
                  <p>Different DFS starting points can change SCC output order but not SCC membership.</p>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="kosaraju98-section">
                <h2 className="kosaraju98-heading">Glossary</h2>
                {glossary.map((item) => <p key={item.term}><strong>{item.term}:</strong> {item.definition}</p>)}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
