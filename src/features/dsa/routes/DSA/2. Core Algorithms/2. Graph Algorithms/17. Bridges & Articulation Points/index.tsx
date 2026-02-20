import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Early DFS theory formalizes cut vertices and bridges (1970s)',
    detail:
      'Graph theory formalized articulation points (cut vertices) and bridges (cut edges), showing how removal disconnects components.',
  },
  {
    title: 'Tarjan introduces lowlink framework (1972)',
    detail:
      'The same lowlink ideas used for SCCs also identify bridges and articulation points in undirected graphs in linear time.',
  },
  {
    title: 'Network reliability and fault tolerance (1980s)',
    detail:
      'Infrastructure networks adopted bridge and cut-vertex analysis to identify single points of failure.',
  },
  {
    title: 'Modern dependency and infrastructure analysis',
    detail:
      'Today, these algorithms power resilience checks in distributed systems, code dependency graphs, and transportation networks.',
  },
]

const prerequisites = [
  {
    title: 'Undirected graph',
    detail:
      'Bridge and articulation definitions apply to undirected graphs. Directed graphs require different notions.',
  },
  {
    title: 'Depth-first search',
    detail:
      'The algorithm is a DFS with discovery times and lowlink values.',
  },
  {
    title: 'No parallel-edge ambiguity',
    detail:
      'If parallel edges exist, track edge IDs to avoid false bridges.',
  },
  {
    title: 'Connected or disconnected',
    detail:
      'The graph can be disconnected; DFS must start from every unvisited node.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Undirected graph G(V, E), typically as adjacency lists with edge IDs.',
  },
  {
    title: 'Output',
    detail:
      'Set of bridges and articulation points (or boolean flags per node).',
  },
  {
    title: 'Optional',
    detail:
      'Biconnected components or a block-cut tree derived from the results.',
  },
]

const formalDefinitions = [
  {
    title: 'Discovery time disc[v]',
    detail:
      'Time when v is first visited during DFS.',
  },
  {
    title: 'Lowlink low[v]',
    detail:
      'Minimum discovery time reachable from v using tree edges plus at most one back edge.',
  },
  {
    title: 'Bridge',
    detail:
      'Edge (u, v) is a bridge if low[v] > disc[u] for a DFS tree edge.',
  },
  {
    title: 'Articulation point',
    detail:
      'Node u is a cut vertex if removing it increases connected components.',
  },
]

const mentalModels = [
  {
    title: 'Single point of failure',
    detail:
      'A bridge or articulation point is the only way to keep two parts of the graph connected. Remove it and the graph splits.',
  },
  {
    title: 'Back edges as safety ropes',
    detail:
      'Back edges create alternative routes. If a subtree has no back edge to ancestors, its connecting edge is a bridge.',
  },
  {
    title: 'Discovery time stamps',
    detail:
      'DFS timestamps tell you who came first. Lowlink tells you how far back a subtree can reach.',
  },
]

const coreMechanics = [
  {
    title: 'DFS traversal with parent tracking',
    detail:
      'Run DFS, track parent of each node, and assign discovery time for each visit.',
  },
  {
    title: 'Lowlink computation',
    detail:
      'Lowlink[v] is the smallest discovery time reachable from v using tree edges and at most one back edge.',
  },
  {
    title: 'Bridge test',
    detail:
      'Edge (u, v) is a bridge if lowlink[v] > disc[u]. There is no back edge from v or its subtree to u or ancestors.',
  },
]

const stepByStepFlow = [
  'Initialize disc and low to -1, parent to -1, time = 0.',
  'For each unvisited node, run DFS to cover all components.',
  'On entry to u: set disc[u] = low[u] = time++.',
  'For each neighbor v: if unvisited, recurse and update low[u].',
  'If low[v] > disc[u], mark edge (u, v) as a bridge.',
  'If u is non-root and low[v] >= disc[u], mark u as articulation.',
  'If u is root and has more than one child, mark u as articulation.',
]

const dataStructures = [
  {
    title: 'disc and low arrays',
    detail:
      'Track discovery time and lowest reachable ancestor.',
  },
  {
    title: 'parent array',
    detail:
      'Distinguishes tree edges from back edges.',
  },
  {
    title: 'bridge list',
    detail:
      'Collects critical edges identified by the lowlink test.',
  },
  {
    title: 'articulation flags',
    detail:
      'Marks vertices that satisfy the cut-vertex rules.',
  },
]

const correctnessNotes = [
  {
    title: 'Bridge criterion',
    detail:
      'If a child subtree cannot reach u or above, the connecting edge is the only link.',
  },
  {
    title: 'Articulation criterion',
    detail:
      'If a child subtree cannot reach above u, removing u disconnects that subtree.',
  },
  {
    title: 'Root special case',
    detail:
      'Root is a cut vertex only if it has at least two DFS children.',
  },
]

const keyStructures = [
  {
    title: 'Discovery time array',
    detail:
      'Stores the order nodes are visited. This is the baseline for lowlink comparisons.',
  },
  {
    title: 'Lowlink array',
    detail:
      'Tracks the earliest reachable ancestor through tree and back edges.',
  },
  {
    title: 'Parent array',
    detail:
      'Distinguishes tree edges from back edges and supports articulation point tests.',
  },
  {
    title: 'Articulation flags',
    detail:
      'Mark nodes that satisfy articulation rules during DFS.',
  },
]

const terminationRules = [
  {
    title: 'Articulation root rule',
    detail:
      'A root is an articulation point if it has more than one DFS child (independent subtrees).',
  },
  {
    title: 'Articulation non-root rule',
    detail:
      'A non-root u is an articulation point if any child v has lowlink[v] >= disc[u].',
  },
  {
    title: 'Bridge rule',
    detail:
      'Edge (u, v) is a bridge if lowlink[v] > disc[u].',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'O(V + E) because DFS visits each vertex and edge once.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(V + E) for the graph plus O(V) for arrays and recursion stack.',
  },
  {
    title: 'Recursion depth',
    detail:
      'Deep graphs can overflow call stacks. Consider iterative DFS for large inputs.',
  },
  {
    title: 'Undirected requirement',
    detail:
      'Bridge and articulation definitions apply to undirected graphs. Directed graphs require different notions.',
  },
]

const realWorldUses = [
  {
    context: 'Network reliability',
    detail:
      'Identify routers or links whose failure disconnects service, guiding redundancy planning.',
  },
  {
    context: 'Power grid and transportation',
    detail:
      'Spot critical substations or roads that are single points of failure in infrastructure networks.',
  },
  {
    context: 'Software dependency graphs',
    detail:
      'Find modules or packages that, if removed, break build or runtime connectivity.',
  },
  {
    context: 'Social graph resilience',
    detail:
      'Detect influencers or bridges between communities; their removal splits the network.',
  },
]

const examples = [
  {
    title: 'Bridge and articulation DFS pseudocode',
    code: `time = 0
function dfs(u):
    disc[u] = low[u] = time++
    childCount = 0
    for v in adj[u]:
        if disc[v] == -1:
            parent[v] = u
            childCount += 1
            dfs(v)
            low[u] = min(low[u], low[v])
            if low[v] > disc[u]: mark edge (u,v) as bridge
            if parent[u] != -1 and low[v] >= disc[u]: mark u as articulation
        else if v != parent[u]:
            low[u] = min(low[u], disc[v])
    if parent[u] == -1 and childCount > 1: mark u as articulation`,
    explanation:
      'The lowlink comparisons identify bridges and articulation points in one DFS pass.',
  },
  {
    title: 'Bridge detection intuition',
    code: `// If subtree cannot reach ancestor, edge is critical
if low[child] > disc[parent]:
    edge (parent, child) is a bridge`,
    explanation:
      'No back edge from the child subtree to the parent or above means the edge is the only connection.',
  },
  {
    title: 'Articulation point intuition',
    code: `// If child subtree cannot reach above u, u is critical
if low[child] >= disc[u] and u is not root:
    u is an articulation point`,
    explanation:
      'The subtree is stuck below u, so removing u disconnects that subtree from the rest of the graph.',
  },
  {
    title: 'Worked mini-example',
    code: `Edges:
1-2, 2-3, 3-4, 2-4, 4-5

Bridges: (4,5)
Articulation points: 4`,
    explanation:
      'The cycle 2-3-4 protects those edges, but node 4 is the only connector to 5.',
  },
  {
    title: 'Root articulation rule',
    code: `// Root with two DFS children is a cut vertex
if parent[u] == -1 and childCount > 1:
    articulation[u] = true`,
    explanation:
      'The root has no parent, so only multiple child subtrees cause disconnection.',
  },
]

const edgeCases = [
  'Single node: no bridges, no articulation points.',
  'Two nodes with one edge: the edge is a bridge; both nodes are articulation points only if removing one disconnects.',
  'Parallel edges: no bridge if a second edge preserves connectivity.',
  'Disconnected graph: run DFS from every unvisited node.',
]

const pitfalls = [
  'Forgetting the root special case for articulation points.',
  'Treating back edges to parent as valid lowlink updates (they should be ignored).',
  'Using low[child] instead of disc[child] for back edge updates.',
  'Assuming the graph is connected and skipping DFS from unvisited nodes.',
  'Applying the algorithm to directed graphs without adapting the definition.',
]

const decisionGuidance = [
  'You need to identify single points of failure in an undirected graph.',
  'You want bridge edges and articulation vertices in linear time.',
  'The graph is large and you need a single-pass algorithm.',
  'You can manage DFS recursion or use an iterative alternative.',
  'You need connectivity resilience metrics for networks or systems.',
]

const implementationNotes = [
  {
    title: 'Edge IDs for multigraphs',
    detail:
      'Use edge IDs to distinguish parallel edges and avoid false bridge detection.',
  },
  {
    title: 'Iterative DFS',
    detail:
      'For large graphs, replace recursion with an explicit stack and state.',
  },
  {
    title: 'Parent edge handling',
    detail:
      'Ignore the immediate parent edge when processing back edges.',
  },
  {
    title: 'Component outputs',
    detail:
      'Bridges partition the graph into edge-biconnected components.',
  },
]

const advancedInsights = [
  {
    title: 'Blocks and block-cut tree',
    detail:
      'Articulation points split the graph into biconnected components. The block-cut tree shows how components connect.',
  },
  {
    title: 'Edge-biconnected components',
    detail:
      'Removing all bridges partitions the graph into components with no bridges; these are edge-biconnected components.',
  },
  {
    title: 'Multi-edge handling',
    detail:
      'Parallel edges can prevent a bridge because a second edge provides an alternate route. Track edges, not just vertices.',
  },
  {
    title: 'Iterative DFS option',
    detail:
      'To avoid recursion limits, simulate DFS with an explicit stack while preserving lowlink updates.',
  },
]

const takeaways = [
  'Bridges and articulation points reveal critical connectivity structure.',
  'One DFS with lowlink values finds both in linear time.',
  'Root and non-root articulation rules differ and must be handled carefully.',
  'The algorithm assumes undirected graphs and correct back edge handling.',
  'The results power resilience analysis across networks and systems.',
]

const variantTable = [
  {
    variant: 'Tarjan bridge/articulation',
    graphType: 'Undirected',
    guarantee: 'All bridges and cut vertices in O(V + E)',
    useCase: 'Single-pass DFS with lowlink',
  },
  {
    variant: 'Biconnected components',
    graphType: 'Undirected',
    guarantee: 'Blocks and articulation points',
    useCase: 'Block-cut tree construction',
  },
  {
    variant: 'Naive removal test',
    graphType: 'Undirected',
    guarantee: 'Correct but slow',
    useCase: 'Small graphs or teaching',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.bridge98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  padding: 0;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.bridge98-window {
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

.bridge98-titlebar {
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

.bridge98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.bridge98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.bridge98-control {
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

.bridge98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.bridge98-tab {
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

.bridge98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.bridge98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 230px 1fr;
}

.bridge98-toc {
  background: #efefef;
  border-right: 1px solid #808080;
  padding: 12px;
  overflow: auto;
}

.bridge98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.bridge98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.bridge98-toc-list li {
  margin: 0 0 8px;
}

.bridge98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.bridge98-toc-list a:hover {
  text-decoration: underline;
}

.bridge98-content {
  padding: 14px 20px 22px;
  overflow: auto;
}

.bridge98-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.bridge98-content a {
  color: #000080;
}

.bridge98-section {
  margin: 0 0 18px;
}

.bridge98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.bridge98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.bridge98-content p,
.bridge98-content li {
  margin: 0 0 9px;
  font-size: 12px;
  line-height: 1.5;
}

.bridge98-content ul,
.bridge98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.bridge98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 13px 0;
}

.bridge98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.bridge98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .bridge98-main {
    grid-template-columns: 1fr;
  }

  .bridge98-toc {
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
    { id: 'core-mechanics', label: 'Core Mechanics' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-key-structures', label: 'Key Structures' },
    { id: 'core-data-structures', label: 'Data Structures' },
    { id: 'core-termination', label: 'Termination Rules' },
    { id: 'core-correctness', label: 'Correctness' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-implementation', label: 'Implementation Notes' },
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
    { id: 'glossary-variants', label: 'Variants and Guarantees' },
  ],
}

export default function BridgesArticulationPointsPage(): JSX.Element {
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
    document.title = `Bridges & Articulation Points (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Bridges & Articulation Points',
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
    <div className="bridge98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="bridge98-window" role="presentation">
        <header className="bridge98-titlebar">
          <span className="bridge98-title">Bridges &amp; Articulation Points</span>
          <div className="bridge98-title-controls">
            <button className="bridge98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="bridge98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="bridge98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`bridge98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bridge98-main">
          <aside className="bridge98-toc" aria-label="Table of contents">
            <h2 className="bridge98-toc-title">Contents</h2>
            <ul className="bridge98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="bridge98-content">
            <h1 className="bridge98-doc-title">Bridges &amp; Articulation Points</h1>
            <p>
              Bridges and articulation points expose where an undirected graph will break if a link or vertex is removed.
              A single DFS with lowlink values identifies both in linear time.
            </p>
            <p>
              <Link to="/algoViz">Back to catalog</Link>
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="bridge98-section">
                  <h2 className="bridge98-heading">Overview</h2>
                  <p>
                    A bridge is an edge whose removal increases connected components. An articulation point is a vertex whose
                    removal does the same. Lowlink tells whether a subtree has any route back to earlier ancestors.
                  </p>
                </section>
                <hr className="bridge98-divider" />
                <section id="bp-history" className="bridge98-section">
                  <h2 className="bridge98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="bridge98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-prerequisites" className="bridge98-section">
                  <h2 className="bridge98-heading">Prerequisites</h2>
                  {prerequisites.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-io" className="bridge98-section">
                  <h2 className="bridge98-heading">Inputs and Outputs</h2>
                  {inputsOutputs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-formal" className="bridge98-section">
                  <h2 className="bridge98-heading">Formal Concepts</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-mental" className="bridge98-section">
                  <h2 className="bridge98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-when" className="bridge98-section">
                  <h2 className="bridge98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="bp-takeaways" className="bridge98-section">
                  <h2 className="bridge98-heading">Key Takeaways</h2>
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
                <section id="core-mechanics" className="bridge98-section">
                  <h2 className="bridge98-heading">Core Mechanics</h2>
                  {coreMechanics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-flow" className="bridge98-section">
                  <h2 className="bridge98-heading">Step-by-Step Flow</h2>
                  <ol>
                    {stepByStepFlow.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-key-structures" className="bridge98-section">
                  <h2 className="bridge98-heading">Key Structures and Invariants</h2>
                  {keyStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-data-structures" className="bridge98-section">
                  <h2 className="bridge98-heading">Data Structures</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-termination" className="bridge98-section">
                  <h2 className="bridge98-heading">Termination Rules</h2>
                  {terminationRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="bridge98-section">
                  <h2 className="bridge98-heading">Correctness Notes</h2>
                  <p>
                    If a child subtree cannot reach above its parent, the connecting edge is a bridge. If it cannot reach above
                    a non-root parent vertex, that parent becomes an articulation point.
                  </p>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="bridge98-section">
                  <h2 className="bridge98-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-implementation" className="bridge98-section">
                  <h2 className="bridge98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="bridge98-section">
                  <h2 className="bridge98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="bridge98-section">
                  <h2 className="bridge98-heading">Common Pitfalls</h2>
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
                <section id="ex-code" className="bridge98-section">
                  <h2 className="bridge98-heading">Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="bridge98-subheading">{example.title}</h3>
                      <div className="bridge98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-applications" className="bridge98-section">
                  <h2 className="bridge98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="ex-edge-cases" className="bridge98-section">
                  <h2 className="bridge98-heading">Edge Cases Checklist</h2>
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
                <section id="glossary-terms" className="bridge98-section">
                  <h2 className="bridge98-heading">Core Terms</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p><strong>Back edge:</strong> Edge from a node to an already discovered ancestor in DFS.</p>
                  <p><strong>Cut vertex:</strong> Another name for articulation point.</p>
                  <p><strong>Block-cut tree:</strong> Tree structure connecting biconnected blocks through articulation points.</p>
                </section>
                <section id="glossary-variants" className="bridge98-section">
                  <h2 className="bridge98-heading">Variants and Guarantees</h2>
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
