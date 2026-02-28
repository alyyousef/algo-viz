import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Classic puzzle roots (1900s)',
    detail:
      'Maze traversal puzzles inspired early algorithmic thinking about paths and dead ends.',
  },
  {
    title: 'Depth-first search formalized (1950s)',
    detail:
      'DFS provided a systematic way to explore mazes and became a foundation for backtracking.',
  },
  {
    title: 'Grid pathfinding in AI (1970s)',
    detail:
      'Grid worlds and maze problems were standard benchmarks for search and planning systems.',
  },
  {
    title: 'Teaching backtracking (1990s)',
    detail:
      'Rat in a Maze became a go-to educational problem for recursion and state undo.',
  },
]

const mentalModels = [
  {
    title: 'Left-hand rule with memory',
    detail:
      'Try a direction, but if you hit a wall or a loop, back up and try another path.',
  },
  {
    title: 'Grid as a graph',
    detail:
      'Each open cell is a node. Moves connect adjacent nodes. The rat finds a path from start to finish.',
  },
  {
    title: 'Exploration tree',
    detail:
      'Each move is a branch in a tree of choices. Backtracking prunes dead branches.',
  },
]

const coreIdeas = [
  {
    title: 'Problem statement',
    detail:
      'Given a grid with open and blocked cells, find a path from the top-left to the bottom-right.',
  },
  {
    title: 'Backtracking approach',
    detail:
      'Move step by step. If a move leads to a dead end, undo and try another direction.',
  },
  {
    title: 'Path marking',
    detail:
      'Mark the current cell in a solution matrix. Unmark it when backtracking.',
  },
  {
    title: 'Multiple solutions',
    detail:
      'You can stop at the first path or continue to enumerate all possible paths.',
  },
]

const algorithmSteps = [
  'Start at (0, 0). If the start is blocked, return no solution.',
  'Mark the current cell as part of the path.',
  'Try moves (usually right and down, or all four directions) in a chosen order.',
  'If a move is valid, recurse into that cell.',
  'If recursion fails, unmark the cell and try the next move.',
  'If the destination is reached, record the path as a solution.',
]

const dataStructures = [
  {
    title: 'Maze grid',
    detail:
      'A 2D array where 1 means open and 0 means blocked. Defines legal positions.',
  },
  {
    title: 'Solution matrix',
    detail:
      'Tracks the current path. Useful for printing or returning the path.',
  },
  {
    title: 'Visited set',
    detail:
      'If you allow four directions, a visited tracker prevents cycles.',
  },
  {
    title: 'Move list',
    detail:
      'List of allowed moves: right/down for constrained version, or all four directions for full search.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail:
      'The solution matrix always represents a valid path of open cells from the start to the current cell.',
  },
  {
    title: 'Completeness',
    detail:
      'Backtracking explores all possible paths (given the move set), so a solution is found if one exists.',
  },
  {
    title: 'Soundness',
    detail:
      'Only valid moves to open cells are taken, so any solution returned is valid.',
  },
  {
    title: 'Termination',
    detail:
      'The recursion depth is bounded by the number of cells; visited checks prevent cycles.',
  },
]

const complexityNotes = [
  {
    title: 'Worst-case time',
    detail:
      'Exponential in the number of cells for unrestricted moves, because many paths may be explored.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(n^2) for the grid and solution matrix, plus recursion depth up to n^2.',
  },
  {
    title: 'Directional constraints',
    detail:
      'Restricting moves to right and down makes the search smaller but may miss valid paths.',
  },
  {
    title: 'Enumeration cost',
    detail:
      'Listing all solutions can be huge; stopping after the first keeps the search short.',
  },
]

const edgeCases = [
  {
    title: 'Blocked start or end',
    detail:
      'If the start or destination cell is blocked, there is no solution.',
  },
  {
    title: 'Single-cell maze',
    detail:
      'A 1x1 grid is trivially solved if the cell is open.',
  },
  {
    title: 'Cycles in 4-direction mode',
    detail:
      'If moving in all four directions, visited tracking is required to avoid infinite loops.',
  },
  {
    title: 'Multiple shortest paths',
    detail:
      'Backtracking does not guarantee shortest paths; it finds any valid path by its move order.',
  },
]

const realWorldUses = [
  {
    context: 'Robotics navigation',
    detail:
      'Robots in grid worlds must find collision-free paths with obstacles.',
  },
  {
    context: 'Puzzle solving',
    detail:
      'Maze-based games and puzzles use similar backtracking to verify solvability.',
  },
  {
    context: 'Routing',
    detail:
      'Finding routes in constrained spaces with obstacles mirrors grid traversal.',
  },
  {
    context: 'AI search demos',
    detail:
      'Rat in a Maze is a simple demonstration of DFS and backtracking.',
  },
  {
    context: 'Constraint satisfaction',
    detail:
      'It models decision sequences with constraints and dead ends.',
  },
]

const examples = [
  {
    title: 'Backtracking pseudocode',
    code: `function solveMaze(x, y):
    if (x, y) is destination:
        mark and return true
    if not safe(x, y): return false

    mark (x, y) as part of path
    for each move in moves:
        if solveMaze(x + move.dx, y + move.dy): return true
    unmark (x, y)
    return false`,
    explanation:
      'Try a move, recurse, and backtrack if it fails. The first success yields a path.',
  },
  {
    title: 'Right and down only',
    code: `moves = [(0, 1), (1, 0)]
// This version only searches monotonic paths.`,
    explanation:
      'Restricting to right/down reduces branching but can miss valid solutions.',
  },
  {
    title: 'Enumerating all paths',
    code: `if (x, y) is destination:
    add current path to results
    return
for each move:
    recurse without returning early`,
    explanation:
      'Do not stop at the first success if you want all possible solutions.',
  },
]

const pitfalls = [
  'Forgetting to unmark cells when backtracking, which blocks valid paths.',
  'Allowing four-direction moves without a visited tracker, causing infinite loops.',
  'Assuming the first path is shortest; DFS is not optimal for length.',
  'Hard-coding move order without understanding its impact on the returned path.',
  'Returning success before marking the destination in the solution matrix.',
]

const variants = [
  {
    title: 'Shortest path version',
    detail:
      'Use BFS or Dijkstra instead of backtracking to guarantee shortest paths.',
  },
  {
    title: 'Weighted cells',
    detail:
      'Costs on cells turn it into a weighted pathfinding problem.',
  },
  {
    title: 'Multiple destinations',
    detail:
      'Stop when reaching any of several goal cells, or enumerate paths to all of them.',
  },
  {
    title: 'Diagonal moves',
    detail:
      'Allowing diagonals increases branching and requires updated validity checks.',
  },
]

const takeaways = [
  'Rat in a Maze demonstrates classic DFS backtracking on a grid.',
  'Marking and unmarking cells is essential for correctness.',
  'Move ordering and allowed directions shape which solution you get.',
  'For shortest paths, use BFS or Dijkstra rather than backtracking.',
]

const glossaryTerms = [
  {
    term: 'Backtracking',
    definition:
      'A search technique that tries a choice, recurses, and undoes that choice when it leads to a dead end.',
  },
  {
    term: 'Maze grid',
    definition:
      'A 2D array where open cells can be visited and blocked cells cannot.',
  },
  {
    term: 'Solution matrix',
    definition:
      'A companion matrix that records the cells currently included in the path.',
  },
  {
    term: 'Visited set',
    definition:
      'A tracker used when moving in four directions so the search does not revisit the same cell in a cycle.',
  },
  {
    term: 'Move order',
    definition:
      'The sequence in which directions are tried; it affects which valid solution is found first.',
  },
  {
    term: 'Completeness',
    definition:
      'The guarantee that the algorithm will find a solution if one exists within the allowed move set.',
  },
  {
    term: 'Soundness',
    definition:
      'The guarantee that every reported solution uses only legal moves through open cells.',
  },
  {
    term: 'Monotonic path',
    definition:
      'A path that moves only right and down, reducing branching but excluding some valid routes.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const ratMazeHelpStyles = `
.rat-maze-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  padding: 0;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.rat-maze-help-window {
  width: 100%;
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

.rat-maze-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
}

.rat-maze-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.rat-maze-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.rat-maze-help-control {
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
  padding: 0;
}

.rat-maze-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.rat-maze-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
}

.rat-maze-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.rat-maze-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.rat-maze-help-toc {
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
}

.rat-maze-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.rat-maze-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.rat-maze-help-toc-list li {
  margin: 0 0 8px;
}

.rat-maze-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.rat-maze-help-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.rat-maze-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.rat-maze-help-section {
  margin: 0 0 20px;
}

.rat-maze-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.rat-maze-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.rat-maze-help-content p,
.rat-maze-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.rat-maze-help-content p {
  margin: 0 0 10px;
}

.rat-maze-help-content ul,
.rat-maze-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.rat-maze-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.rat-maze-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.rat-maze-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .rat-maze-help-main {
    grid-template-columns: 1fr;
  }

  .rat-maze-help-toc {
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

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-mental-models', label: 'Mental Models' },
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-foundation', label: 'Core Foundation' },
    { id: 'core-process', label: 'Step-by-Step Process' },
    { id: 'core-structures', label: 'Data Structures' },
    { id: 'core-correctness', label: 'Why It Works' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-edge-cases', label: 'Edge Cases' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-variants', label: 'Variants' },
  ],
  examples: [
    { id: 'examples-code', label: 'Code Examples' },
    { id: 'examples-notes', label: 'Example Notes' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function RatInMazePage(): JSX.Element {
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
    document.title = `Rat in a Maze (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: false })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Rat in a Maze',
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
    <div className="rat-maze-help-page">
      <style>{ratMazeHelpStyles}</style>
      <div className="rat-maze-help-window" role="presentation">
        <header className="rat-maze-help-titlebar">
          <span className="rat-maze-help-title">Rat in a Maze</span>
          <div className="rat-maze-help-controls">
            <button className="rat-maze-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="rat-maze-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="rat-maze-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`rat-maze-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rat-maze-help-main">
          <aside className="rat-maze-help-toc" aria-label="Table of contents">
            <h2 className="rat-maze-help-toc-title">Contents</h2>
            <ul className="rat-maze-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="rat-maze-help-content">
            <h1 className="rat-maze-help-doc-title">Rat in a Maze</h1>
            <p>
              Rat in a Maze is a classic backtracking problem: move through a grid from start to finish while avoiding blocked
              cells. The algorithm tries steps, records the path, and backtracks whenever it hits a dead end.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Overview</h2>
                  <p>
                    The maze is a grid graph with obstacles. Backtracking searches for a path by exploring moves, undoing them
                    when they fail. It is a simple but powerful example of depth-first search on a constrained space.
                  </p>
                  {coreIdeas.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="rat-maze-help-divider" />
                <section id="bp-history" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="rat-maze-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="rat-maze-help-divider" />
                <section id="bp-mental-models" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="rat-maze-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="rat-maze-help-divider" />
                <section id="bp-applications" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="rat-maze-help-divider" />
                <section id="bp-takeaways" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Key Takeaways</h2>
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
                <section id="core-foundation" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Core Foundation</h2>
                  <p>
                    The backtracking approach moves step by step through the maze and undoes work whenever a branch cannot reach
                    the goal. That simple pattern turns the puzzle into a disciplined search procedure rather than random trial and
                    error.
                  </p>
                  <p>
                    Backtracking explores all reachable paths consistent with the move rules, so it is complete and correct.
                  </p>
                </section>
                <section id="core-process" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Step-by-Step Process</h2>
                  <ol>
                    {algorithmSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-structures" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Data Structures</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Why It Works</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Complexity</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-edge-cases" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Edge Cases and Conventions</h2>
                  {edgeCases.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-variants" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Variants and Extensions</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="examples-code" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="rat-maze-help-subheading">{example.title}</h3>
                      <div className="rat-maze-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="examples-notes" className="rat-maze-help-section">
                  <h2 className="rat-maze-help-heading">Example Notes</h2>
                  <p>
                    The example set covers the core recursive solver, a restricted move list, and a version that keeps exploring
                    after reaching the destination so every valid path can be listed.
                  </p>
                  <p>
                    These examples reinforce the same underlying rules: valid moves only, explicit path marking, and careful undo
                    logic during unwinding.
                  </p>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="rat-maze-help-section">
                <h2 className="rat-maze-help-heading">Glossary</h2>
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
