import type { JSX } from 'react'
import { Link } from 'react-router-dom'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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

export default function NQueensPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">N-Queens</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Backtracking through a classic chessboard constraint puzzle</div>
              <p className="win95-text">
                The N-Queens problem asks you to place N queens on an N x N chessboard so that none attack each other. It is a
                canonical backtracking and constraint satisfaction example, perfect for illustrating pruning, symmetry, and
                state management in recursive search.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                N-Queens is about conflict-free placement. Each queen blocks its row, column, and diagonals, forcing you to
                build a solution that respects all constraints simultaneously. Backtracking tries a choice, explores, and
                undoes it when it fails.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: the backtracking approach</legend>
            <div className="win95-grid win95-grid-3">
              {coreConcepts.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm steps</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The invariant: exactly one queen per row, and no two queens share a column or diagonal. Track constraints to
                enforce this quickly.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pruning and heuristics</legend>
            <div className="win95-grid win95-grid-2">
              {pruningHeuristics.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel">
              <p className="win95-text">
                Symmetry reduction and bitsets are the most impactful optimizations. Together, they enable larger N without
                changing the core algorithm.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                N-Queens is exponential in the worst case, but strong pruning makes it practical for moderate N. For very large
                boards, approximate or heuristic solvers are often used.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>N-Queens vs N-Rooks (quick intuition)</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th>N-Queens</th>
                    <th>N-Rooks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Constraints</td>
                    <td>Rows, columns, diagonals</td>
                    <td>Rows and columns only</td>
                  </tr>
                  <tr>
                    <td>Complexity</td>
                    <td>Harder, fewer solutions</td>
                    <td>Equivalent to permutations</td>
                  </tr>
                  <tr>
                    <td>Typical method</td>
                    <td>Backtracking + pruning</td>
                    <td>Direct counting (N!)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
