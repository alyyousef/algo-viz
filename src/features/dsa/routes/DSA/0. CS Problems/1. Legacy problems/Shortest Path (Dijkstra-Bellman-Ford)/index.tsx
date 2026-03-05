import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Shortest path problems ask for minimum-cost paths in weighted graphs, typically from a single source to all nodes.',
    notes:
      'Dijkstra handles non-negative weights; Bellman-Ford handles negative weights and detects negative cycles.',
  },
  {
    title: 'Why it matters',
    details:
      'Routing, navigation, scheduling, and optimization rely on shortest paths as a core primitive.',
    notes:
      'The choice of algorithm depends on graph structure, weight constraints, and required guarantees.',
  },
  {
    title: 'What it teaches',
    details:
      'Greedy correctness conditions (Dijkstra) versus relaxation-based convergence (Bellman-Ford).',
    notes:
      'It formalizes when shortest paths are well-defined and when they are not (negative cycles).',
  },
]

const historicalContext = [
  {
    title: '1956: Dijkstra',
    details:
      'Introduced a greedy algorithm for single-source shortest paths with non-negative weights.',
    notes:
      'It is optimal due to a monotonicity property of non-negative edge weights.',
  },
  {
    title: '1958: Bellman-Ford',
    details:
      'Introduced a relaxation-based algorithm that tolerates negative edges and detects negative cycles.',
    notes:
      'It became a standard tool in network routing and theoretical proofs.',
  },
  {
    title: 'Modern era',
    details:
      'Shortest-path algorithms power web-scale routing, logistics optimization, and graph analytics.',
    notes:
      'Research focuses on heuristics, preprocessing, and specialized graph families.',
  },
]

const quickGlossary = [
  {
    term: 'Weighted graph',
    definition: 'A graph where each edge has an associated numeric cost.',
  },
  {
    term: 'Path length',
    definition: 'The sum of edge weights along a path.',
  },
  {
    term: 'Relaxation',
    definition: 'Updating a distance estimate when a shorter path is discovered.',
  },
  {
    term: 'Negative cycle',
    definition: 'A cycle whose total weight is negative; shortest paths are undefined.',
  },
  {
    term: 'Single-source shortest path',
    definition: 'Compute distances from one source to all vertices.',
  },
  {
    term: 'Shortest path tree',
    definition: 'A predecessor structure that encodes shortest paths from the source.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail: 'Graph G=(V,E), weight function w:E->R, and a source vertex s.',
  },
  {
    title: 'Task',
    detail: 'Compute dist[v] = shortest path length from s to v for all v in V.',
  },
  {
    title: 'Well-definedness',
    detail: 'If a reachable negative cycle exists, shortest path lengths are undefined.',
  },
  {
    title: 'Output',
    detail: 'Distances and (optionally) predecessors to reconstruct paths.',
  },
]

const formalDefinitions = [
  {
    title: 'Distance function',
    detail:
      'dist[v] = min over all s->v paths of sum of edge weights (or INF if unreachable).',
  },
  {
    title: 'Triangle inequality under relaxation',
    detail:
      'For any edge (u,v), a valid solution must satisfy dist[v] <= dist[u] + w(u,v).',
  },
  {
    title: 'Shortest path optimality condition',
    detail:
      'A distance labeling is correct iff all reachable nodes satisfy all relaxations and dist[s]=0.',
  },
  {
    title: 'Negative cycle criterion',
    detail:
      'If any edge can still relax after |V|-1 iterations, a negative cycle is reachable.',
  },
]

const keyClaims = [
  {
    title: 'Dijkstra is correct iff all weights are non-negative',
    detail: 'The greedy choice assumes distances only increase along unexplored edges.',
  },
  {
    title: 'Bellman-Ford is correct with negative edges',
    detail: 'Repeated relaxation converges in |V|-1 rounds if no negative cycles exist.',
  },
  {
    title: 'Negative cycles break the model',
    detail: 'You can reduce total cost without bound by looping, so no shortest path exists.',
  },
  {
    title: 'Relaxation is the shared core idea',
    detail: 'Both algorithms repeatedly enforce dist[v] <= dist[u] + w(u,v).',
  },
]

const algorithmLandscape = [
  {
    title: 'Dijkstra (greedy)',
    detail: 'Uses a priority queue to repeatedly finalize the next closest vertex.',
  },
  {
    title: 'Bellman-Ford (relaxation)',
    detail: 'Relaxes all edges for |V|-1 iterations and checks for negative cycles.',
  },
  {
    title: 'BFS (unweighted)',
    detail: 'If all edges have equal weight, BFS yields shortest paths in O(V+E).',
  },
  {
    title: 'A* (heuristic)',
    detail: 'Guided by a heuristic; optimal if the heuristic is admissible.',
  },
]

const correctnessSketches = [
  {
    title: 'Dijkstra correctness sketch',
    detail:
      'When a vertex u is extracted with minimum tentative distance, any alternative path to u must be at least as long because all edge weights are non-negative. Thus dist[u] is final.',
  },
  {
    title: 'Bellman-Ford convergence sketch',
    detail:
      'Any shortest path has at most |V|-1 edges. After k iterations, all shortest paths with at most k edges are found. Therefore after |V|-1 iterations all shortest paths are found, unless a negative cycle exists.',
  },
  {
    title: 'Negative cycle detection',
    detail:
      'If a relaxation is still possible after |V|-1 passes, then some path can be improved indefinitely, implying a reachable negative cycle.',
  },
]

const complexityNotes = [
  {
    title: 'Dijkstra',
    detail: 'O((V+E) log V) with a binary heap; O(V^2) with arrays.',
  },
  {
    title: 'Bellman-Ford',
    detail: 'O(VE) time; O(V) space for distances and predecessors.',
  },
  {
    title: 'Dense vs sparse graphs',
    detail: 'Dijkstra with a heap is best on sparse graphs; array-based Dijkstra may be OK on dense graphs.',
  },
  {
    title: 'Practical note',
    detail: 'If negative edges are impossible by model, Dijkstra is almost always preferable.',
  },
]

const variants = [
  {
    title: 'All-pairs shortest paths',
    detail: 'Floyd-Warshall (O(V^3)) or Johnson (reweight + Dijkstra).',
  },
  {
    title: 'DAG shortest paths',
    detail: 'Topological order + relaxation solves in O(V+E), even with negative edges.',
  },
  {
    title: '0-1 BFS',
    detail: 'If edge weights are 0 or 1, a deque-based BFS runs in O(V+E).',
  },
  {
    title: 'Multi-source',
    detail: 'Add a super-source connected to all sources with zero-weight edges.',
  },
]

const workedExamples = [
  {
    title: 'Non-negative graph',
    code: `Edges: A->B(4), A->C(2), C->B(1), B->D(5)
Shortest A->D: A->C->B->D cost 8`,
    explanation:
      'Dijkstra is correct here because all weights are non-negative.',
  },
  {
    title: 'Graph with negative edge',
    code: `Edges: A->B(2), B->C(-4), A->C(5)
Shortest A->C: A->B->C cost -2`,
    explanation:
      'Bellman-Ford handles this correctly; Dijkstra may fail.',
  },
  {
    title: 'Negative cycle',
    code: `Cycle: X->Y(1), Y->Z(-3), Z->X(1)
Total cycle weight: -1`,
    explanation:
      'Shortest paths are undefined since the cycle can reduce cost indefinitely.',
  },
]

const pseudocode = [
  {
    title: 'Dijkstra (simplified)',
    code: `dist[s]=0; others=INF
repeat V times:
  pick unvisited node u with smallest dist
  mark u visited
  for each edge u->v:
    if dist[u] + w(u,v) < dist[v]:
      dist[v] = dist[u] + w(u,v)`,
    explanation:
      'The greedy choice is correct only with non-negative weights.',
  },
  {
    title: 'Bellman-Ford',
    code: `dist[s]=0; others=INF
repeat V-1 times:
  for each edge u->v:
    relax u->v
one more pass:
  if any edge relaxes -> negative cycle`,
    explanation:
      'Repeated relaxation guarantees optimal distances if no negative cycle exists.',
  },
]

const pitfalls = [
  {
    mistake: 'Using Dijkstra with negative edges',
    description: 'The greedy choice fails because shorter paths can appear later.',
  },
  {
    mistake: 'Skipping the negative cycle check',
    description: 'Bellman-Ford must perform a final pass to detect negative cycles.',
  },
  {
    mistake: 'Incorrect modeling of direction',
    description: 'Treating directed edges as undirected changes the problem.',
  },
  {
    mistake: 'Assuming connectivity',
    description: 'Unreachable nodes should remain INF; they are not errors.',
  },
]

const applications = [
  {
    title: 'Navigation and routing',
    detail: 'Road networks, logistics, and packet routing use shortest paths at scale.',
  },
  {
    title: 'Project scheduling',
    detail: 'Critical path methods are shortest/longest path problems on DAGs.',
  },
  {
    title: 'Network analysis',
    detail: 'Centrality and influence metrics rely on shortest paths.',
  },
  {
    title: 'Game development',
    detail: 'Pathfinding frequently uses Dijkstra or A* on weighted grids.',
  },
]

const keyTakeaways = [
  'Dijkstra is fast and correct for non-negative weights; Bellman-Ford is slower but more general.',
  'Relaxation is the fundamental operation shared by both algorithms.',
  'Negative cycles make shortest paths undefined and must be detected.',
  'Algorithm choice is a modeling decision based on weight constraints.',
  'Special graph families admit faster specialized solutions.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.sp98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.sp98-window {
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

.sp98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.sp98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.sp98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.sp98-control {
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
  padding: 0;
}

.sp98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.sp98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.sp98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.sp98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.sp98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.sp98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.sp98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sp98-toc-list li {
  margin: 0 0 8px;
}

.sp98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.sp98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.sp98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.sp98-section {
  margin: 0 0 20px;
}

.sp98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.sp98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.sp98-content p,
.sp98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.sp98-content p {
  margin: 0 0 10px;
}

.sp98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.sp98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.sp98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.sp98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .sp98-main {
    grid-template-columns: 1fr;
  }

  .sp98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .sp98-title-text {
    font-size: 13px;
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
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-setup', label: 'Problem Setup' },
    { id: 'core-defs', label: 'Formal Definitions' },
    { id: 'core-claims', label: 'Key Claims' },
    { id: 'core-landscape', label: 'Algorithm Landscape' },
    { id: 'core-correctness', label: 'Correctness Sketches' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-variants', label: 'Variants and Extensions' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Quick Glossary' }],
}

export default function ShortestPathDijkstraBellmanFordPage(): JSX.Element {
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
    document.title = `Shortest Path (Dijkstra-Bellman-Ford) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Shortest Path (Dijkstra-Bellman-Ford)',
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
    <div className="sp98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="sp98-window" role="presentation">
        <header className="sp98-titlebar">
          <span className="sp98-title-text">Shortest Path (Dijkstra-Bellman-Ford)</span>
          <div className="sp98-title-controls">
            <button className="sp98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="sp98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="sp98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`sp98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="sp98-main">
          <aside className="sp98-toc" aria-label="Table of contents">
            <h2 className="sp98-toc-title">Contents</h2>
            <ul className="sp98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="sp98-content">
            <h1 className="sp98-doc-title">Shortest Path (Dijkstra-Bellman-Ford)</h1>
            <p>
              This page presents the shortest path problem in a more academic style: precise definitions, correctness conditions,
              proof sketches, and complexity analysis. The focus is on Dijkstra and Bellman-Ford as canonical algorithms with
              contrasting assumptions and guarantees.
            </p>
            <p>
              <Link to="/algoViz">Back to Catalog</Link>
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="sp98-section">
                  <h2 className="sp98-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="sp98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="sp98-divider" />
                <section id="bp-history" className="sp98-section">
                  <h2 className="sp98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="sp98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="sp98-divider" />
                <section id="bp-takeaways" className="sp98-section">
                  <h2 className="sp98-heading">Key Takeaways</h2>
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
                <section id="core-setup" className="sp98-section">
                  <h2 className="sp98-heading">Problem Setup</h2>
                  {problemSetup.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-defs" className="sp98-section">
                  <h2 className="sp98-heading">Formal Definitions</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-claims" className="sp98-section">
                  <h2 className="sp98-heading">Key Claims</h2>
                  {keyClaims.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-landscape" className="sp98-section">
                  <h2 className="sp98-heading">Algorithm Landscape</h2>
                  {algorithmLandscape.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="sp98-section">
                  <h2 className="sp98-heading">Correctness Sketches</h2>
                  {correctnessSketches.map((item) => (
                    <div key={item.title}>
                      <h3 className="sp98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="core-complexity" className="sp98-section">
                  <h2 className="sp98-heading">Complexity Notes</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="sp98-section">
                  <h2 className="sp98-heading">Variants and Extensions</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-applications" className="sp98-section">
                  <h2 className="sp98-heading">Applications</h2>
                  {applications.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="sp98-section">
                  <h2 className="sp98-heading">Common Pitfalls</h2>
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
                <section id="ex-worked" className="sp98-section">
                  <h2 className="sp98-heading">Worked Examples</h2>
                  {workedExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="sp98-subheading">{example.title}</h3>
                      <div className="sp98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-pseudocode" className="sp98-section">
                  <h2 className="sp98-heading">Pseudocode Reference</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="sp98-subheading">{example.title}</h3>
                      <div className="sp98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="sp98-section">
                <h2 className="sp98-heading">Quick Glossary</h2>
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
