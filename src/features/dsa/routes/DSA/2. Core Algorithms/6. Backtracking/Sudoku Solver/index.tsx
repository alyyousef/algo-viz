import { Link } from 'react-router-dom'

import type { JSX } from 'react'

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
    title: 'Number place origin (1979)',
    detail:
      'The puzzle appeared as "Number Place" before the name Sudoku popularized it.',
  },
  {
    title: 'Sudoku boom (2004)',
    detail:
      'Global popularity led to extensive research into solving strategies and algorithmic approaches.',
  },
  {
    title: 'Constraint satisfaction model',
    detail:
      'Sudoku is a classic CSP with row, column, and subgrid constraints, ideal for backtracking.',
  },
  {
    title: 'Heuristic solvers',
    detail:
      'Techniques like MRV and forward checking made solvers far more efficient.',
  },
]

const mentalModels = [
  {
    title: 'Latin square with boxes',
    detail:
      'Each row and column must contain 1-9 exactly once, plus each 3x3 subgrid.',
  },
  {
    title: 'Constraint propagation',
    detail:
      'Each placement reduces options in its row, column, and box, shrinking the search space.',
  },
  {
    title: 'Search with backtrack',
    detail:
      'When a choice leads to no valid candidates, undo and try the next candidate.',
  },
]

const coreIdeas = [
  {
    title: 'Problem statement',
    detail:
      'Fill a 9x9 grid with digits 1-9 so each row, column, and 3x3 box contains every digit exactly once.',
  },
  {
    title: 'Backtracking approach',
    detail:
      'Pick an empty cell, try a valid digit, recurse, and backtrack if it leads to a contradiction.',
  },
  {
    title: 'Constraints',
    detail:
      'Validity requires the chosen digit to be absent in the row, column, and 3x3 box.',
  },
  {
    title: 'Heuristics',
    detail:
      'Select the cell with the fewest candidates (MRV) to reduce branching.',
  },
]

const algorithmSteps = [
  'Find the next empty cell (or choose the one with the fewest candidates).',
  'List valid digits for that cell using row, column, and box constraints.',
  'Try each digit, place it, and recurse.',
  'If the recursion fails, remove the digit and try the next.',
  'If no digits work, backtrack.',
  'When all cells are filled, the puzzle is solved.',
]

const dataStructures = [
  {
    title: 'Grid matrix',
    detail:
      'A 9x9 array storing digits; 0 or . represents an empty cell.',
  },
  {
    title: 'Row/column/box sets',
    detail:
      'Track used digits to test validity quickly without scanning the whole row each time.',
  },
  {
    title: 'Candidate generator',
    detail:
      'Build possible digits for a cell by subtracting row, column, and box digits from 1-9.',
  },
  {
    title: 'Empty cell list',
    detail:
      'Precompute a list of empty cells to avoid scanning repeatedly.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail:
      'All filled cells respect row, column, and box constraints at every step.',
  },
  {
    title: 'Completeness',
    detail:
      'Backtracking explores all possible fillings consistent with current constraints.',
  },
  {
    title: 'Soundness',
    detail:
      'A solution is accepted only if every cell is filled without constraint violations.',
  },
  {
    title: 'Heuristic safety',
    detail:
      'MRV and ordering heuristics change search order but do not remove valid solutions.',
  },
]

const complexityNotes = [
  {
    title: 'Worst-case time',
    detail:
      'Exponential in the number of empty cells; Sudoku is NP-complete in generalized form.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(81) for the grid plus recursion depth up to the number of empty cells.',
  },
  {
    title: 'Heuristic impact',
    detail:
      'MRV and forward checking dramatically reduce the search tree for real puzzles.',
  },
  {
    title: 'Constraint propagation',
    detail:
      'Combining backtracking with constraint propagation can solve many puzzles without deep search.',
  },
]

const edgeCases = [
  {
    title: 'Invalid puzzle',
    detail:
      'If the initial grid violates constraints, the solver should fail early.',
  },
  {
    title: 'Multiple solutions',
    detail:
      'Some puzzles have more than one solution; decide whether to return first or all.',
  },
  {
    title: 'Empty grid',
    detail:
      'An empty grid has many solutions; backtracking without heuristics may be too slow.',
  },
  {
    title: 'Non-standard sizes',
    detail:
      'Sudoku can be generalized to n^2 x n^2 grids; adapt box size accordingly.',
  },
]

const realWorldUses = [
  {
    context: 'Constraint satisfaction',
    detail:
      'Sudoku is a clean example of CSPs used in scheduling and configuration problems.',
  },
  {
    context: 'SAT solvers',
    detail:
      'Sudoku can be encoded as SAT and solved by generic constraint solvers.',
  },
  {
    context: 'Puzzle generation',
    detail:
      'Solvers are used to ensure puzzles are valid and have unique solutions.',
  },
  {
    context: 'AI education',
    detail:
      'Sudoku is a common demonstration of backtracking, heuristics, and pruning.',
  },
  {
    context: 'Verification systems',
    detail:
      'Constraint checking parallels validation in configuration and rule-based systems.',
  },
]

const examples = [
  {
    title: 'Backtracking pseudocode',
    code: `function solve():
    cell = findEmptyCell()
    if cell is None: return true
    for digit in candidates(cell):
        place digit
        if solve(): return true
        remove digit
    return false`,
    explanation:
      'Try a digit, recurse, and undo if it leads to a dead end.',
  },
  {
    title: 'Row/column/box check',
    code: `function isValid(r, c, digit):
    return digit not in row[r]
       and digit not in col[c]
       and digit not in box[boxIndex(r, c)]`,
    explanation:
      'Fast validity checks are crucial for performance.',
  },
  {
    title: 'MRV heuristic',
    code: `choose cell with fewest candidates
try candidates in increasing order`,
    explanation:
      'Selecting the most constrained cell reduces branching.',
  },
]

const pitfalls = [
  'Recomputing constraints by scanning rows/columns each time, which is slow.',
  'Failing to undo row/column/box bookkeeping when backtracking.',
  'Assuming a puzzle is valid without checking initial constraints.',
  'Not handling multiple solutions when uniqueness matters.',
  'Ignoring MRV or heuristics, which can make some puzzles infeasible to solve.',
]

const variants = [
  {
    title: 'Exact cover (DLX)',
    detail:
      'Sudoku can be solved as an exact cover problem using Dancing Links for efficiency.',
  },
  {
    title: 'Constraint propagation',
    detail:
      'Techniques like naked singles and hidden singles can solve many puzzles without deep search.',
  },
  {
    title: 'Randomized solver',
    detail:
      'Randomize candidate ordering to generate diverse solutions and puzzles.',
  },
  {
    title: 'Generalized Sudoku',
    detail:
      'Apply the same algorithm to 4x4, 16x16, or other n^2 grids with adjusted constraints.',
  },
]

const takeaways = [
  'Sudoku is a constraint satisfaction problem solved effectively by backtracking.',
  'Fast constraint checks and heuristics like MRV make the solver practical.',
  'The algorithm is complete and correct but exponential in the worst case.',
  'Sudoku illustrates how constraints prune large search spaces.',
]

export default function SudokuSolverPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Sudoku Solver</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Backtracking with constraint propagation</div>
              <p className="win95-text">
                A Sudoku solver assigns digits to empty cells while respecting row, column, and 3x3 box constraints. Backtracking
                explores candidates, and heuristics like MRV keep the search efficient.
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
                Sudoku is a constraint satisfaction problem. Backtracking assigns values, checks constraints, and backtracks when a
                choice leads to conflict. With good heuristics, most puzzles solve quickly.
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
            <legend>What the algorithm does</legend>
            <div className="win95-grid win95-grid-2">
              {coreIdeas.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Step-by-step process</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {algorithmSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data structures used</legend>
            <div className="win95-grid win95-grid-2">
              {dataStructures.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Why the backtracking works</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Every valid Sudoku solution corresponds to a consistent assignment of digits. Backtracking ensures all possibilities
                are explored without violating constraints.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Edge cases and conventions</legend>
            <div className="win95-grid win95-grid-2">
              {edgeCases.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Variants and extensions</legend>
            <div className="win95-grid win95-grid-2">
              {variants.map((item) => (
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
