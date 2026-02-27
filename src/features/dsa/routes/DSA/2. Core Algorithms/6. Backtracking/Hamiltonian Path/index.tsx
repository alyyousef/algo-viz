import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Hamilton introduces graph concepts (1857)',
    detail:
      'William Rowan Hamilton proposed the icosian game, which inspired what we now call Hamiltonian paths and cycles.',
  },
  {
    title: 'Dirac and Ore conditions (1950s)',
    detail:
      'Sufficient degree conditions for Hamiltonian cycles were discovered, giving strong structural hints but not a full solution.',
  },
  {
    title: 'NP-complete classification (1972)',
    detail:
      "The Hamiltonian path problem was among Karp's original NP-complete problems.",
  },
  {
    title: 'Backtracking becomes standard (1970s+)',
    detail:
      'Depth-first search with pruning emerged as the go-to practical approach for exact solutions on moderate-sized graphs.',
  },
]

const mentalModels = [
  {
    title: 'Visiting every city once',
    detail:
      'Find a route that visits each city exactly one time without repeating. That is a Hamiltonian path.',
  },
  {
    title: 'Threading a needle',
    detail:
      'You are threading a single line through all nodes. Each new node must be a valid next stitch without tangling.',
  },
  {
    title: 'Lock-and-key constraints',
    detail:
      'Each node can be used once; once you pick it, it locks behind you. Backtracking is the key to reopen choices.',
  },
]

const coreConcepts = [
  {
    heading: 'Problem definition',
    bullets: [
      'Given a graph G(V, E), find a path that visits every vertex exactly once.',
      'In directed graphs, edges must respect direction.',
      'Hamiltonian cycle returns to the starting vertex; path does not.',
    ],
  },
  {
    heading: 'Backtracking idea',
    bullets: [
      'Grow a path one vertex at a time using depth-first search.',
      'Reject choices that revisit a vertex or break adjacency.',
      'If a path gets stuck, backtrack and try another branch.',
    ],
  },
  {
    heading: 'Why it is hard',
    bullets: [
      'The search space is factorial: up to n! permutations of vertices.',
      'Local choices can look valid but lead to dead ends later.',
      'No polynomial-time algorithm is known for arbitrary graphs.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Choose a start vertex',
    detail:
      'Pick any vertex to start (or loop over all start vertices if you need to detect existence without a fixed start).',
  },
  {
    title: 'Extend the path',
    detail:
      'Try adding a neighbor that has not been visited yet. Mark it visited and recurse.',
  },
  {
    title: 'Check completion',
    detail:
      'If the path length equals |V|, you found a Hamiltonian path. Return success.',
  },
  {
    title: 'Backtrack',
    detail:
      'If no neighbor works, unmark the last vertex and try the next option.',
  },
]

const pruningHeuristics = [
  {
    title: 'Degree pruning',
    detail:
      'Vertices with degree 0 or 1 in an undirected graph impose strong constraints. Early checks can rule out impossibility.',
  },
  {
    title: 'Connectivity checks',
    detail:
      'If the remaining unvisited vertices are disconnected, no completion is possible from the current partial path.',
  },
  {
    title: 'Ordering heuristics',
    detail:
      'Try neighbors with fewer unvisited connections first (fail-fast). This often prunes large parts of the tree.',
  },
  {
    title: 'Bitmask memoization',
    detail:
      'For n <= 20, memoize (vertex, visitedMask) to avoid repeated work. This is exponential but can be practical.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Worst case O(n!) for naive backtracking. Pruning can reduce practical runtime but not the worst-case bound.',
  },
  {
    title: 'Space cost',
    detail:
      'O(n) for recursion stack and visited tracking. Memoization raises space to O(n * 2^n).',
  },
  {
    title: 'Tradeoffs',
    detail:
      'Exact solutions scale poorly. For large graphs, use heuristics or relaxations instead of exhaustive search.',
  },
]

const realWorldUses = [
  {
    context: 'Puzzle design and validation',
    detail:
      'Many puzzles require visiting each node or tile once. Hamiltonian paths help verify solvability.',
  },
  {
    context: 'Routing constraints',
    detail:
      'Certain routing problems constrain revisits or require unique visitation, making Hamiltonian paths a direct model.',
  },
  {
    context: 'DNA sequencing',
    detail:
      'Some formulations relate to ordering fragments with no repeats, though modern sequencing typically uses Eulerian paths.',
  },
  {
    context: 'Circuit testing',
    detail:
      'Visiting each component exactly once can model certain test traversal constraints.',
  },
]

const examples = [
  {
    title: 'Small graph example',
    code: `Graph (undirected):
  1: 2, 3
  2: 1, 3, 4
  3: 1, 2, 4
  4: 2, 3

One Hamiltonian path:
  1 -> 2 -> 4 -> 3`,
    explanation:
      'The path visits every vertex exactly once and follows existing edges.',
  },
  {
    title: 'Backtracking pseudocode',
    code: `function hamiltonianPath(graph, start):
    path = [start]
    visited = set(start)

    function dfs(v):
        if path.length == |V|: return true
        for u in neighbors(v):
            if u not in visited:
                visited.add(u)
                path.push(u)
                if dfs(u): return true
                path.pop()
                visited.remove(u)
        return false

    if dfs(start): return path
    return null`,
    explanation:
      'Depth-first search explores possibilities, undoing choices when a branch fails.',
  },
  {
    title: 'Directed graph note',
    code: `In a directed graph, only follow outgoing edges:
  neighbors(v) = outgoingNeighbors(v)
The path must respect edge directions at every step.`,
    explanation:
      'Hamiltonian paths in directed graphs are often harder; direction removes many possible moves.',
  },
]

const pitfalls = [
  'Forgetting to mark vertices as visited, leading to repeated nodes.',
  'Assuming a Hamiltonian cycle implies a path from a fixed start. The start might need to vary.',
  'Skipping early impossibility checks; this can waste massive time on doomed searches.',
  'Mixing up Hamiltonian path with Eulerian path (edge-based) concepts.',
  'Failing to handle directed graphs correctly (using undirected adjacency).',
]

const decisionGuidance = [
  'Use exact backtracking for small graphs or when correctness is mandatory.',
  'Add pruning heuristics if n is moderate and you need practical runtimes.',
  'Use memoized DP (bitmask) for n <= 20 when you need guaranteed optimality.',
  'For large graphs, switch to heuristics or approximation approaches.',
  'If you only need to know existence, stop at first found path.',
]

const advancedInsights = [
  {
    title: 'Sufficient conditions',
    detail:
      'Dirac and Ore conditions provide quick checks for Hamiltonian cycles in dense graphs.',
  },
  {
    title: 'Ordering by degree',
    detail:
      'Ordering neighbors by smallest degree first can reduce backtracking depth by failing fast.',
  },
  {
    title: 'Meet-in-the-middle',
    detail:
      'For some graphs, splitting vertices into two halves and combining partial paths can speed up search.',
  },
  {
    title: 'Conversion to SAT',
    detail:
      'Hamiltonian path can be encoded as a SAT problem, letting modern SAT solvers handle larger instances.',
  },
]

const takeaways = [
  'Hamiltonian Path is NP-complete, so exact solutions scale poorly.',
  'Backtracking is the canonical exact approach, with pruning to make it practical.',
  'Directed graphs and fixed start constraints make the search stricter.',
  'Confuse neither with Eulerian paths, which are edge-based and easier.',
]

const quickGlossary = [
  {
    term: 'Hamiltonian path',
    definition: 'A path that visits every vertex exactly once.',
  },
  {
    term: 'Hamiltonian cycle',
    definition: 'A Hamiltonian path that returns to its starting vertex.',
  },
  {
    term: 'NP-complete',
    definition: 'Class of decision problems believed not to have polynomial-time algorithms.',
  },
  {
    term: 'Backtracking',
    definition: 'Depth-first search that undoes choices when constraints fail.',
  },
  {
    term: 'Eulerian path',
    definition: 'A path that traverses every edge exactly once.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const hamiltonianHelpStyles = `
.hamiltonian-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.hamiltonian-window {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  box-sizing: border-box;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.hamiltonian-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.hamiltonian-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.hamiltonian-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.hamiltonian-control {
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

.hamiltonian-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.hamiltonian-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.hamiltonian-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.hamiltonian-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.hamiltonian-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.hamiltonian-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.hamiltonian-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.hamiltonian-toc-list li {
  margin: 0 0 8px;
}

.hamiltonian-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.hamiltonian-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.hamiltonian-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.hamiltonian-section {
  margin: 0 0 20px;
}

.hamiltonian-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.hamiltonian-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.hamiltonian-content p,
.hamiltonian-content li {
  font-size: 12px;
  line-height: 1.5;
}

.hamiltonian-content p {
  margin: 0 0 10px;
}

.hamiltonian-content ul,
.hamiltonian-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.hamiltonian-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.hamiltonian-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.hamiltonian-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .hamiltonian-main {
    grid-template-columns: 1fr;
  }

  .hamiltonian-toc {
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-backtracking', label: 'Backtracking Approach' },
    { id: 'core-steps', label: 'Algorithm Steps' },
    { id: 'core-pruning', label: 'Pruning and Heuristics' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-compare', label: 'Hamiltonian vs Eulerian' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-guidance', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function HamiltonianPathPage(): JSX.Element {
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
    document.title = `Hamiltonian Path (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Hamiltonian Path',
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
    <div className="hamiltonian-help-page">
      <style>{hamiltonianHelpStyles}</style>
      <div className="hamiltonian-window" role="presentation">
        <header className="hamiltonian-titlebar">
          <span className="hamiltonian-title">Hamiltonian Path</span>
          <div className="hamiltonian-controls">
            <button className="hamiltonian-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="hamiltonian-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="hamiltonian-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`hamiltonian-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="hamiltonian-main">
          <aside className="hamiltonian-toc" aria-label="Table of contents">
            <h2 className="hamiltonian-toc-title">Contents</h2>
            <ul className="hamiltonian-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="hamiltonian-content">
            <h1 className="hamiltonian-doc-title">Hamiltonian Path</h1>
            <p>
              Backtracking through graphs to visit each vertex exactly once. Hamiltonian Path is a classic graph problem: find a
              route that visits every vertex exactly once. It is NP-complete, which makes backtracking the practical default for exact
              solutions. This page explains the intuition, algorithm, pruning strategies, and tradeoffs you need to implement it well.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">Overview</h2>
                  <p>
                    Hamiltonian paths model scenarios where each location must be visited exactly once. The difficulty comes from the
                    global constraint: a choice that looks good locally might block completion later, which is why backtracking and
                    pruning are essential.
                  </p>
                </section>
                <hr className="hamiltonian-divider" />
                <section id="bp-history" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="hamiltonian-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-applications" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">Key Takeaways</h2>
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
                <section id="core-backtracking" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">How It Works: The Backtracking Approach</h2>
                  {coreConcepts.map((block) => (
                    <div key={block.heading}>
                      <h3 className="hamiltonian-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-steps" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">Algorithm Steps</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    The invariant: every vertex appears at most once in the path. Backtracking enforces this by undoing a choice
                    whenever no valid extension exists.
                  </p>
                </section>
                <section id="core-pruning" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">Pruning and Heuristics</h2>
                  {pruningHeuristics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Even basic heuristics can shrink the search tree dramatically. Start with degree ordering and add memoization for
                    smaller graphs when exactness matters.
                  </p>
                </section>
                <section id="core-complexity" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">Complexity Analysis and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    Because the worst case is factorial, problem size is the main constraint. Pruning shifts the practical limit, but
                    does not change the theoretical complexity.
                  </p>
                </section>
                <section id="core-compare" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">Hamiltonian vs Eulerian (Quick Intuition)</h2>
                  <p><strong>Focus:</strong> Hamiltonian visits every vertex once; Eulerian traverses every edge once.</p>
                  <p><strong>Difficulty:</strong> Hamiltonian path is NP-complete; Eulerian path has polynomial-time checks.</p>
                  <p><strong>Typical method:</strong> Hamiltonian uses backtracking/search; Eulerian uses degree rules plus DFS.</p>
                </section>
                <section id="core-pitfalls" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-guidance" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="hamiltonian-section">
                  <h2 className="hamiltonian-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="hamiltonian-section">
                <h2 className="hamiltonian-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="hamiltonian-subheading">{example.title}</h3>
                    <div className="hamiltonian-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="hamiltonian-section">
                <h2 className="hamiltonian-heading">Glossary</h2>
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
