import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Chess puzzle origins (1850s)',
    detail:
      'The classic 8-queens puzzle appeared in 1850s chess columns, popularizing the idea of non-attacking placements.',
  },
  {
    title: 'Generalized to N-Queens (1874)',
    detail:
      'Mathematicians expanded the puzzle to N x N boards, leading to a family of combinatorial search problems.',
  },
  {
    title: 'Backtracking era (1960s)',
    detail:
      'The puzzle became a canonical example for backtracking and constraint satisfaction in early AI and algorithms texts.',
  },
  {
    title: 'Benchmark for search (1990s+)',
    detail:
      'N-Queens is used to compare pruning, heuristics, and bitset optimization in exact search algorithms.',
  },
]

const mentalModels = [
  {
    title: 'Rooks plus diagonals',
    detail:
      'Queens attack like rooks and bishops combined. You must place one per row and column while keeping diagonals clean.',
  },
  {
    title: 'Row-by-row seating',
    detail:
      'Treat each row as a meeting seat. Choose exactly one column per row, but avoid conflicts with earlier rows.',
  },
  {
    title: 'Constraint puzzle',
    detail:
      'This is a constraint satisfaction problem: rows are positions, columns/diagonals are constraints.',
  },
]

const coreConcepts = [
  {
    heading: 'Problem definition',
    bullets: [
      'Place N queens on an N x N chessboard so that no two queens attack each other.',
      'Attacks occur along rows, columns, and diagonals.',
      'Solutions can be counted or enumerated; N=1 has 1 solution, N=2 and N=3 have none.',
    ],
  },
  {
    heading: 'Backtracking idea',
    bullets: [
      'Place queens one row at a time to avoid row conflicts.',
      'Track used columns and diagonals for O(1) conflict checks.',
      'If no column works in a row, backtrack to the previous row.',
    ],
  },
  {
    heading: 'Why it matters',
    bullets: [
      'It is a clean, visual example of backtracking and pruning.',
      'Patterns and symmetry reductions show how search can be optimized.',
      'The same approach powers scheduling and assignment solvers.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Choose a row',
    detail:
      'Start at row 0. Each recursive call decides where to place the queen in the current row.',
  },
  {
    title: 'Try columns',
    detail:
      'For each column, check whether column and diagonals are safe. If so, place the queen.',
  },
  {
    title: 'Recurse',
    detail:
      'Move to the next row. If all rows are placed, record a solution.',
  },
  {
    title: 'Backtrack',
    detail:
      'Remove the queen and unmark constraints before trying the next column.',
  },
]

const pruningHeuristics = [
  {
    title: 'Symmetry reduction',
    detail:
      'For counting solutions, only place the first-row queen in half the columns and mirror results.',
  },
  {
    title: 'Bitset constraints',
    detail:
      'Use bit masks for columns and diagonals to check conflicts with fast bit operations.',
  },
  {
    title: 'Ordering choices',
    detail:
      'Try columns that keep diagonals flexible first; fail-fast helps prune early.',
  },
  {
    title: 'Early impossibility',
    detail:
      'If remaining rows cannot fit into remaining columns, backtrack immediately.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Worst case grows super-exponentially. Backtracking explores a reduced subset of N! placements.',
  },
  {
    title: 'Space cost',
    detail:
      'O(N) recursion depth and constraint arrays/bitsets. Enumeration stores solutions separately.',
  },
  {
    title: 'Tradeoffs',
    detail:
      'Bitset implementations are fast but less readable; array-based checks are clearer for learning.',
  },
]

const realWorldUses = [
  {
    context: 'Scheduling and assignment',
    detail:
      'The one-per-row constraint maps to assigning tasks to slots without conflicts.',
  },
  {
    context: 'Constraint programming demos',
    detail:
      'N-Queens is a standard example for teaching CSPs and pruning strategies.',
  },
  {
    context: 'Search optimization',
    detail:
      'Benchmarks highlight how pruning, symmetry, and bitsets transform performance.',
  },
  {
    context: 'Board game AI',
    detail:
      'Techniques resemble move generation and pruning used in chess and puzzle solvers.',
  },
]

const examples = [
  {
    title: '4-Queens solution',
    code: `One solution for N=4 (row, col):
  (0, 1), (1, 3), (2, 0), (3, 2)

Board:
  . Q . .
  . . . Q
  Q . . .
  . . Q .`,
    explanation:
      'Each queen is placed in a unique row and column, and no diagonals collide.',
  },
  {
    title: 'Backtracking pseudocode',
    code: `function solveNQueens(row):
    if row == N: record solution; return
    for col in 0..N-1:
        if safe(col, row):
            place queen at (row, col)
            solveNQueens(row + 1)
            remove queen at (row, col)`,
    explanation:
      'The recursive structure is simple: choose a column, place a queen, recurse, then undo.',
  },
  {
    title: 'Bitset variant',
    code: `columns, diag1, diag2 are bitmasks
function dfs(row, columns, diag1, diag2):
    if row == N: count++
    available = ~(columns | diag1 | diag2) & ((1 << N) - 1)
    while available:
        bit = available & -available
        available -= bit
        dfs(row + 1, columns | bit, (diag1 | bit) << 1, (diag2 | bit) >> 1)`,
    explanation:
      'Bitmasks encode blocked columns and diagonals, enabling very fast search for larger N.',
  },
]

const pitfalls = [
  'Forgetting diagonal checks; queens attack along both diagonals.',
  'Using row and column checks together (row is already unique in row-by-row placement).',
  'Mixing up diagonal indices: main diagonal uses (row - col), anti-diagonal uses (row + col).',
  'Assuming all N have solutions; N=2 and N=3 have none.',
  'Failing to backtrack state properly, causing phantom conflicts.',
]

const decisionGuidance = [
  'Use array-based backtracking to teach or explain the concept.',
  'Use bitsets for performance when N >= 13.',
  'Use symmetry reduction if you only need the total solution count.',
  'Stop early if you only need one valid arrangement.',
  'Switch to heuristic or stochastic solvers for very large N.',
]

const advancedInsights = [
  {
    title: 'Diagonal indexing',
    detail:
      'Store (row - col + N - 1) and (row + col) to map diagonals into array indices.',
  },
  {
    title: 'Branch and bound',
    detail:
      'You can prune if the number of remaining rows exceeds remaining columns.',
  },
  {
    title: 'Symmetry counts',
    detail:
      'For even N, double the count from the first half of columns; for odd N, handle the middle column separately.',
  },
  {
    title: 'Parallel search',
    detail:
      'Split on the first row and solve branches in parallel to scale across cores.',
  },
]

const takeaways = [
  'N-Queens is a canonical backtracking and constraint satisfaction problem.',
  'Row-by-row placement transforms a 2D search into a structured recursion.',
  'Bitsets and symmetry can turn exponential search into something practical.',
  'Correctness depends on clean backtracking and accurate diagonal checks.',
]

const quickGlossary = [
  {
    term: 'Constraint satisfaction problem (CSP)',
    definition: 'Problem type where variables must satisfy a set of constraints.',
  },
  {
    term: 'Main diagonal',
    definition: 'Diagonal group identified by constant (row - col).',
  },
  {
    term: 'Anti-diagonal',
    definition: 'Diagonal group identified by constant (row + col).',
  },
  {
    term: 'Symmetry reduction',
    definition: 'Optimization that avoids exploring mirrored-equivalent placements.',
  },
  {
    term: 'Bitset solver',
    definition: 'Representation using bit masks for fast constraint checks and updates.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const nQueensHelpStyles = `
.nq-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.nq-window {
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

.nq-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.nq-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.nq-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.nq-control {
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

.nq-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.nq-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.nq-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.nq-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.nq-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.nq-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.nq-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nq-toc-list li {
  margin: 0 0 8px;
}

.nq-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.nq-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.nq-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.nq-section {
  margin: 0 0 20px;
}

.nq-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.nq-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.nq-content p,
.nq-content li {
  font-size: 12px;
  line-height: 1.5;
}

.nq-content p {
  margin: 0 0 10px;
}

.nq-content ul,
.nq-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.nq-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.nq-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.nq-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .nq-main {
    grid-template-columns: 1fr;
  }

  .nq-toc {
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
    { id: 'core-compare', label: 'N-Queens vs N-Rooks' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-guidance', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function NQueensPage(): JSX.Element {
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
    document.title = `N-Queens (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'N-Queens',
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
    <div className="nq-help-page">
      <style>{nQueensHelpStyles}</style>
      <div className="nq-window" role="presentation">
        <header className="nq-titlebar">
          <span className="nq-title">N-Queens</span>
          <div className="nq-controls">
            <button className="nq-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="nq-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="nq-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`nq-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="nq-main">
          <aside className="nq-toc" aria-label="Table of contents">
            <h2 className="nq-toc-title">Contents</h2>
            <ul className="nq-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="nq-content">
            <h1 className="nq-doc-title">N-Queens</h1>
            <p>
              Backtracking through a classic chessboard constraint puzzle. The N-Queens problem asks you to place N queens on an N x
              N chessboard so that none attack each other. It is a canonical backtracking and constraint satisfaction example,
              perfect for illustrating pruning, symmetry, and state management in recursive search.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="nq-section">
                  <h2 className="nq-heading">Overview</h2>
                  <p>
                    N-Queens is about conflict-free placement. Each queen blocks its row, column, and diagonals, forcing you to build
                    a solution that respects all constraints simultaneously. Backtracking tries a choice, explores, and undoes it when
                    it fails.
                  </p>
                </section>
                <hr className="nq-divider" />
                <section id="bp-history" className="nq-section">
                  <h2 className="nq-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="nq-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="nq-section">
                  <h2 className="nq-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-applications" className="nq-section">
                  <h2 className="nq-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="nq-section">
                  <h2 className="nq-heading">Key Takeaways</h2>
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
                <section id="core-backtracking" className="nq-section">
                  <h2 className="nq-heading">How It Works: The Backtracking Approach</h2>
                  {coreConcepts.map((block) => (
                    <div key={block.heading}>
                      <h3 className="nq-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-steps" className="nq-section">
                  <h2 className="nq-heading">Algorithm Steps</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    The invariant: exactly one queen per row, and no two queens share a column or diagonal. Track constraints to
                    enforce this quickly.
                  </p>
                </section>
                <section id="core-pruning" className="nq-section">
                  <h2 className="nq-heading">Pruning and Heuristics</h2>
                  {pruningHeuristics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Symmetry reduction and bitsets are the most impactful optimizations. Together, they enable larger N without
                    changing the core algorithm.
                  </p>
                </section>
                <section id="core-complexity" className="nq-section">
                  <h2 className="nq-heading">Complexity Analysis and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    N-Queens is exponential in the worst case, but strong pruning makes it practical for moderate N. For very large
                    boards, approximate or heuristic solvers are often used.
                  </p>
                </section>
                <section id="core-compare" className="nq-section">
                  <h2 className="nq-heading">N-Queens vs N-Rooks (Quick Intuition)</h2>
                  <p><strong>Constraints:</strong> N-Queens uses rows, columns, and diagonals. N-Rooks uses rows and columns only.</p>
                  <p><strong>Complexity:</strong> N-Queens is harder and has fewer solutions. N-Rooks is equivalent to permutations.</p>
                  <p><strong>Typical method:</strong> N-Queens uses backtracking plus pruning. N-Rooks can be directly counted by N!.</p>
                </section>
                <section id="core-pitfalls" className="nq-section">
                  <h2 className="nq-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-guidance" className="nq-section">
                  <h2 className="nq-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="nq-section">
                  <h2 className="nq-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="nq-section">
                <h2 className="nq-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="nq-subheading">{example.title}</h3>
                    <div className="nq-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="nq-section">
                <h2 className="nq-heading">Glossary</h2>
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
