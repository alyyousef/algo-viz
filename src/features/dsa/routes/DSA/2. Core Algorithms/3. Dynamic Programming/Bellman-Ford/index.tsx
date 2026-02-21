import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Edge budget DP',
    detail:
      'After k rounds, you have the shortest paths that use at most k edges.',
  },
  {
    title: 'Wave of relaxations',
    detail:
      'Each pass pushes improved distances across all edges like a global wave.',
  },
  {
    title: 'Negative cycle alarm',
    detail:
      'If a distance improves on the V-th pass, costs can drop forever.',
  },
]

const keyDefinitions = [
  {
    heading: 'Relaxation',
    bullets: [
      'Try to improve dist[v] using edge (u, v, w).',
      'If dist[u] + w < dist[v], update dist and parent.',
      'Repeated relaxations converge to shortest paths.',
    ],
  },
  {
    heading: 'Negative cycle',
    bullets: [
      'A directed cycle whose total weight is negative.',
      'Shortest paths are undefined if reachable from source.',
      'Bellman-Ford detects this after V - 1 rounds.',
    ],
  },
  {
    heading: 'Difference constraints',
    bullets: [
      'Inequalities like x_v - x_u <= w(u,v).',
      'Convert constraints to edges and run Bellman-Ford.',
      'Negative cycles indicate inconsistent constraints.',
    ],
  },
  {
    heading: 'Super-source',
    bullets: [
      'Add a node s* connected to all nodes with 0-weight edges.',
      'Enables multi-source shortest paths or constraint systems.',
      'Used in Johnson and feasibility checks.',
    ],
  },
]

const mechanics = [
  {
    heading: 'Core idea',
    bullets: [
      'Relax all edges up to V - 1 times; each pass allows shortest paths with that many edges.',
      'Initialization: dist[source] = 0; all others = infinity.',
      'Each relaxation: if dist[u] + w < dist[v], update dist[v] and parent[v].',
    ],
  },
  {
    heading: 'Negative cycle detection',
    bullets: [
      'After V - 1 passes, one more full relaxation pass reveals any edge that can still improve distance.',
      'If an improvement occurs, the graph contains a negative cycle reachable from the source.',
      'Track predecessors to recover the actual cycle when needed.',
    ],
  },
  {
    heading: 'Optimizations',
    bullets: [
      'Early stop when a pass makes no updates.',
      'Queue-based variants (SPFA) push only changed vertices, though worst-case is still O(VE).',
      'Edge ordering can improve cache behavior but not the asymptotic bound.',
    ],
  },
]

const workflowSteps = [
  {
    title: 'Model the graph',
    detail:
      'Use a directed edge list (u, v, w). For undirected edges, add both directions.',
  },
  {
    title: 'Initialize distances',
    detail:
      'Set dist[source] = 0 and dist[others] = INF, with parents unset.',
  },
  {
    title: 'Run V - 1 relaxations',
    detail:
      'Iterate over edges, updating distances. Optionally stop early if no change.',
  },
  {
    title: 'Detect negative cycles',
    detail:
      'Run one more pass; any improvement indicates a reachable negative cycle.',
  },
  {
    title: 'Reconstruct paths',
    detail:
      'Use parent pointers to recover shortest paths or extract a negative cycle.',
  },
]

const variantCatalog = [
  {
    title: 'Bellman-Ford + early stop',
    detail:
      'Break when a pass makes no updates. Same correctness, often faster.',
  },
  {
    title: 'SPFA (queue-based)',
    detail:
      'Relax only vertices whose distance changed; fast on many inputs, same worst-case.',
  },
  {
    title: 'Multi-source Bellman-Ford',
    detail:
      'Add a super-source with 0 edges to all nodes to handle multiple sources.',
  },
  {
    title: 'Johnson reweighting',
    detail:
      'Run Bellman-Ford once to compute potentials and remove negative edges.',
  },
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'O(VE) time and O(V) space. Works on any directed or undirected graph with negative weights, as long as negative cycles are handled.',
  },
  {
    title: 'When it beats Dijkstra',
    detail:
      'Required when edges can be negative. On dense graphs with small V, O(VE) can be acceptable. On sparse graphs with only non-negative weights, Dijkstra is usually faster.',
  },
  {
    title: 'Batch updates',
    detail:
      'Because edges are relaxed in parallel conceptually, Bellman-Ford maps well to GPU and distributed settings where synchronous rounds are natural.',
  },
]

const realWorldUses = [
  {
    context: 'Routing protocols',
    detail:
      'RIP (Routing Information Protocol) uses Bellman-Ford style distance vectors to propagate shortest path estimates through networks.',
  },
  {
    context: 'Arbitrage detection',
    detail:
      'Currency exchange graphs model logarithms of rates as weights; a negative cycle corresponds to an arbitrage opportunity.',
  },
  {
    context: 'Difference constraints',
    detail:
      'Scheduling with inequalities can be solved by converting constraints to edges and running Bellman-Ford.',
  },
  {
    context: 'Graph algorithms with reweighting',
    detail:
      'Johnson uses Bellman-Ford to compute vertex potentials that eliminate negative edges, enabling Dijkstra on all-pairs queries.',
  },
  {
    context: 'Risk-aware planning',
    detail:
      'Negative edges can represent discounts or rebates in cost models.',
  },
  {
    context: 'Network policy checks',
    detail:
      'Detect inconsistent routing metrics or policy loops with negative cycles.',
  },
]

const correctnessSketch = [
  {
    title: 'DP invariant',
    detail:
      'After k passes, dist[v] is the shortest path using at most k edges.',
  },
  {
    title: 'Why V - 1 passes',
    detail:
      'Any simple shortest path has at most V - 1 edges.',
  },
  {
    title: 'Negative cycle test',
    detail:
      'If any edge still relaxes, a path with more than V - 1 edges is cheaper, implying a reachable negative cycle.',
  },
  {
    title: 'Parent pointers',
    detail:
      'Each update preserves a valid shortest path tree over the processed edge budget.',
  },
]

const examples = [
  {
    title: 'Standard Bellman-Ford',
    code: `function bellmanFord(vertices, edges, source):
    dist = map with default infinity
    parent = map
    dist[source] = 0

    for i in range(1, len(vertices)):
        changed = false
        for (u, v, w) in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                changed = true
        if not changed:
            break

    // detect negative cycles
    for (u, v, w) in edges:
        if dist[u] + w < dist[v]:
            throw NegativeCycleDetected

    return dist, parent`,
    explanation:
      'Relax edges V - 1 times, bail early if nothing changes, and then probe once more to catch negative cycles.',
  },
  {
    title: 'Negative cycle recovery',
    code: `for (u, v, w) in edges:
    if dist[u] + w < dist[v]:
        x = v
        repeat V times: x = parent[x]
        cycle = []
        cur = x
        repeat:
            cycle.append(cur)
            cur = parent[cur]
        until cur == x`,
    explanation:
      'Walk parent pointers V steps to land inside the cycle, then traverse until it repeats.',
  },
  {
    title: 'Difference constraints',
    code: `Constraints: x_v - x_u <= w
Add edge u -> v with weight w
Add super-source s* with 0 edges to all nodes
Run Bellman-Ford from s*`,
    explanation:
      'If a negative cycle exists, the constraints are inconsistent.',
  },
  {
    title: 'Early stop optimization',
    code: `for i in 1..V-1:
    changed = false
    for (u, v, w) in edges:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w
            changed = true
    if not changed: break`,
    explanation:
      'Stop when a full pass makes no improvements.',
  },
]

const pitfalls = [
  'Skipping the final detection pass can silently miss negative cycles.',
  'Using Bellman-Ford when all edges are non-negative is slower than necessary; prefer Dijkstra.',
  'Overflow on large negative sums can flip comparisons; use wide integers.',
  'Forgetting to initialize distances to infinity except the source breaks correctness.',
  'Mixing undirected edges without adding both directions explicitly.',
  'Failing to guard against INF + w overflow during relaxations.',
  'Assuming negative cycles matter if they are not reachable from the source.',
]

const implementationChecklist = [
  'Represent edges as a flat list for fast iteration.',
  'Use a large INF sentinel and guard additions to avoid overflow.',
  'Track parents when you need path or cycle reconstruction.',
  'Stop early when no updates occur to save time.',
  'Run a final pass to detect reachable negative cycles.',
]

const testingChecklist = [
  'Single node, no edges.',
  'Graph with a negative edge but no negative cycles.',
  'Graph with a reachable negative cycle.',
  'Graph with a negative cycle not reachable from the source.',
  'Disconnected graph with unreachable nodes.',
  'Large weights to verify overflow handling.',
]

const decisionGuidance = [
  'Edges can be negative: use Bellman-Ford (single-source).',
  'Many sources on a sparse graph with some negatives: run Bellman-Ford from a super-source (Johnson) then Dijkstra per source.',
  'All edges non-negative: prefer Dijkstra for speed.',
  'Need only to detect negative cycles: run V - 1 relaxations, then test once more and record improving edges.',
  'Need constraint feasibility: model as difference constraints and run Bellman-Ford from a super-source.',
]

const glossaryTerms = [
  {
    term: 'Relaxation',
    definition: 'Updating dist[v] when dist[u] + w gives a cheaper path through edge (u, v).',
  },
  {
    term: 'Negative cycle',
    definition: 'A cycle with total negative weight; reachable ones make shortest paths undefined.',
  },
  {
    term: 'Edge budget DP',
    definition: 'After k passes, Bellman-Ford has shortest paths that use at most k edges.',
  },
  {
    term: 'Super-source',
    definition: 'An added node with 0-weight edges to all nodes for multi-source or feasibility checks.',
  },
  {
    term: 'Difference constraints',
    definition: 'Inequalities of the form x_v - x_u <= w represented as directed weighted edges.',
  },
  {
    term: 'SPFA',
    definition: 'Queue-based Bellman-Ford variant that processes recently changed vertices first.',
  },
  {
    term: 'Parent pointer',
    definition: 'The predecessor used to reconstruct shortest paths or extract a negative cycle.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bellmanHelpStyles = `
.bellman-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.bellman-window {
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

.bellman-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.bellman-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.bellman-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.bellman-control {
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

.bellman-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.bellman-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.bellman-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.bellman-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.bellman-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.bellman-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.bellman-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bellman-toc-list li {
  margin: 0 0 8px;
}

.bellman-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.bellman-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.bellman-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.bellman-section {
  margin: 0 0 20px;
}

.bellman-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.bellman-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.bellman-content p,
.bellman-content li,
.bellman-content td,
.bellman-content th {
  font-size: 12px;
  line-height: 1.5;
}

.bellman-content p {
  margin: 0 0 10px;
}

.bellman-content ul,
.bellman-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.bellman-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.bellman-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.bellman-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .bellman-main {
    grid-template-columns: 1fr;
  }

  .bellman-toc {
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-complexity', label: 'Complexity and Performance' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-correctness', label: 'Correctness Sketch' },
  ],
  'core-concepts': [
    { id: 'core-definitions', label: 'Definitions' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-workflow', label: 'End-to-End Workflow' },
    { id: 'core-variants', label: 'Variant Catalog' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-implementation', label: 'Implementation Checklist' },
    { id: 'core-testing', label: 'Testing and Edge Cases' },
    { id: 'core-decision', label: 'When To Use It' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function BellmanFordPage(): JSX.Element {
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
    document.title = `Bellman-Ford (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

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
    <div className="bellman-help-page">
      <style>{bellmanHelpStyles}</style>
      <div className="bellman-window" role="presentation">
        <header className="bellman-titlebar">
          <span className="bellman-title-text">Bellman-Ford</span>
          <div className="bellman-title-controls">
            <button className="bellman-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="bellman-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="bellman-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`bellman-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bellman-main">
          <aside className="bellman-toc" aria-label="Table of contents">
            <h2 className="bellman-toc-title">Contents</h2>
            <ul className="bellman-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="bellman-content">
            <h1 className="bellman-doc-title">Bellman-Ford</h1>
            <p>
              Bellman-Ford relaxes every edge in rounds, allowing paths to gain at most one edge per round. It handles negative
              weights gracefully and signals negative cycles, making it the safer choice when Dijkstra&apos;s non-negative assumption
              is broken. It also powers constraint systems, distance-vector routing, and Johnson reweighting.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="bellman-section">
                  <h2 className="bellman-heading">Overview</h2>
                  <p>
                    This algorithm trades speed for generality: O(VE) time and O(V) space, but it works whenever edges may be
                    negative. Its synchronous relaxation rounds map well to distributed updates and provide a built-in mechanism to
                    flag reachable negative cycles.
                  </p>
                  <p>
                    The dynamic programming view makes correctness intuitive: each pass extends shortest paths by one edge, so after
                    V - 1 passes you have all shortest simple paths.
                  </p>
                </section>
                <hr className="bellman-divider" />
                <section id="bp-models" className="bellman-section">
                  <h2 className="bellman-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="bellman-divider" />
                <section id="bp-complexity" className="bellman-section">
                  <h2 className="bellman-heading">Complexity and Performance</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <hr className="bellman-divider" />
                <section id="bp-applications" className="bellman-section">
                  <h2 className="bellman-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="bellman-divider" />
                <section id="bp-correctness" className="bellman-section">
                  <h2 className="bellman-heading">Correctness Sketch</h2>
                  {correctnessSketch.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-definitions" className="bellman-section">
                  <h2 className="bellman-heading">Definitions That Matter</h2>
                  {keyDefinitions.map((block) => (
                    <div key={block.heading}>
                      <h3 className="bellman-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-mechanics" className="bellman-section">
                  <h2 className="bellman-heading">How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="bellman-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-workflow" className="bellman-section">
                  <h2 className="bellman-heading">End-to-End Workflow</h2>
                  <ol>
                    {workflowSteps.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </li>
                    ))}
                  </ol>
                </section>
                <section id="core-variants" className="bellman-section">
                  <h2 className="bellman-heading">Variant Catalog</h2>
                  {variantCatalog.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="bellman-section">
                  <h2 className="bellman-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-implementation" className="bellman-section">
                  <h2 className="bellman-heading">Implementation Checklist</h2>
                  <ul>
                    {implementationChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-testing" className="bellman-section">
                  <h2 className="bellman-heading">Testing and Edge Cases</h2>
                  <ul>
                    {testingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-decision" className="bellman-section">
                  <h2 className="bellman-heading">When To Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="bellman-section">
                <h2 className="bellman-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="bellman-subheading">{example.title}</h3>
                    <div className="bellman-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="bellman-section">
                <h2 className="bellman-heading">Glossary</h2>
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
