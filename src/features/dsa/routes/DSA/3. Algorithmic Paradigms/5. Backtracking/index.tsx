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

const bigPicture = [
  {
    title: 'Tames combinatorial blowups',
    detail:
      'Enumerates choices depth-first but prunes as soon as a partial assignment cannot succeed, turning hopeless b^d trees into solvable search.',
    note: 'Essential for NP-style puzzles (scheduling, puzzles, SAT) where full enumeration is infeasible.',
  },
  {
    title: 'Undo-first mindset',
    detail:
      'Assumes every action must be reversible; state changes are paired with explicit undo so exploration stays cheap and safe.',
    note: 'Cheap undo makes it attractive for solvers with small mutable state (boards, bitmasks, assignment arrays).',
  },
  {
    title: 'Declarative constraints, imperative traversal',
    detail:
      'Constraints shape which branches survive; recursion/stack drives traversal order. This split makes heuristics pluggable.',
    note: 'Works well when constraints are fast to evaluate relative to the branching factor.',
  },
  {
    title: 'Optimizes for early failure',
    detail:
      'Most branches die quickly; good heuristics surface contradictions high in the tree, saving exponential work.',
    note: 'Instrument to see prune rate; successful setups kill 90%+ of nodes before depth 5 in many CSPs.',
  },
]

const history = [
  {
    title: '1956: Davis-Putnam SAT search',
    detail: 'Martin Davis and Hilary Putnam use recursive case splits with early contradiction checks for satisfiability.',
    note: 'Demonstrated pruning transforms an impossible enumeration into a practical solver.',
  },
  {
    title: '1965: Golomb coins "backtrack"',
    detail: 'Solomon Golomb formalizes backtracking for combinatorial search with bounding and variable ordering.',
    note: 'Gave the paradigm its name and emphasized heuristic ordering to cut branches.',
  },
  {
    title: '1972: Prolog mainstreams backtracking',
    detail: 'Alain Colmerauer and Robert Kowalski ship Prolog with implicit DFS backtracking over logic rules.',
    note: 'Made undo-on-failure the default control flow in a popular language.',
  },
  {
    title: '2000: Knuth popularizes Dancing Links',
    detail: 'Donald Knuth shows O(1) undo for exact cover, powering fast Sudoku and tiling solvers.',
    note: 'Illustrated that engineering the undo path can dwarf algorithmic tweaks.',
  },
]

const pillars = [
  {
    title: 'Ordered branching',
    detail: 'Choose the next variable/value to shrink branching factor (most constrained first, fail-fast).',
  },
  {
    title: 'Pruning predicates',
    detail: 'Quickly reject partial states that violate constraints or cannot beat the best known objective.',
  },
  {
    title: 'Reversible state',
    detail: 'Every mutation pairs with an undo; shared arrays, bitmasks, and stacks keep reversals O(1).',
  },
  {
    title: 'Clear termination',
    detail: 'Know when to accept (full assignment) and when to abandon (dead constraint) to avoid phantom loops.',
  },
]

const mentalModels = [
  {
    title: 'Maze with breadcrumbs',
    detail:
      'Mark your path, peek ahead for blocked corridors, and step back cleanly when you hit a wall. Breaks down when corridors revisit the same cell without visited checks.',
  },
  {
    title: 'Ledger of reversible trades',
    detail:
      'Each decision is a transaction; you must record and reverse it precisely. Sloppy accounting (shared references) leads to corrupted states later.',
  },
  {
    title: 'Branch-and-bound CFO',
    detail:
      'Treat each partial solution like a budget forecast; abandon branches that cannot meet targets. Works only when you have a credible bound.',
  },
]

const howItWorks = [
  {
    title: 'Define state and moves',
    detail: 'Represent the partial assignment compactly (arrays, bitmasks). List feasible moves from that state.',
  },
  {
    title: 'Pick the next variable',
    detail: 'Order choices to cut branching (MRV for CSPs, highest conflict first, small domains first).',
  },
  {
    title: 'Apply, test, and prune',
    detail:
      'Make the move, update auxiliary structures, then run constraint/bound checks. If it fails, undo immediately.',
  },
  {
    title: 'Recurse and collect answers',
    detail: 'Dive deeper when feasible; record solutions or update best-so-far objective as you return.',
  },
  {
    title: 'Undo deterministically',
    detail: 'Reverse in the exact opposite order of application so shared buffers remain consistent across siblings.',
  },
]

const complexityTable = [
  {
    approach: 'Plain DFS enumeration',
    time: 'O(b^d)',
    space: 'O(d)',
    note: 'No pruning; b = branching factor, d = depth. Baseline exponential.',
  },
  {
    approach: 'Heuristic ordering + pruning',
    time: 'O(p^d) with p << b in practice',
    space: 'O(d)',
    note: 'Effective b shrinks when early contradictions are found.',
  },
  {
    approach: 'Branch and bound (maximize/minimize)',
    time: 'O(b^d) worst-case',
    space: 'O(d)',
    note: 'Bounding cuts subtrees whose best possible score cannot beat the incumbent.',
  },
  {
    approach: 'Iterative deepening with time budget',
    time: 'O(b^d) worst-case, but anytime',
    space: 'O(d)',
    note: 'Returns progressively better answers; useful under latency caps.',
  },
]

const applications = [
  {
    title: 'Puzzle solvers (Sudoku, Kakuro, N-Queens)',
    detail: 'Constraint propagation plus backtracking powers interactive solvers and hint systems.',
    note: 'Dancing Links and bitmask diagonals enable millisecond-level solves.',
  },
  {
    title: 'SAT/SMT engines',
    detail: 'Modern CDCL solvers descend from backtracking with learned clauses as aggressive pruning.',
    note: 'Used in hardware verification and compilers (e.g., superoptimizer search).',
  },
  {
    title: 'Resource allocation and rostering',
    detail: 'Airline crew scheduling, exam timetables, and cloud placement rely on search with bounds.',
    note: 'Backtracking adapts as constraints change without redesigning the solver.',
  },
  {
    title: 'Parsing ambiguous grammars',
    detail: 'Packrat parsers avoid backtracking, but PEG backtracking with memoization handles niche DSLs quickly.',
    note: 'Undoing tokens and scanner state is essential to keep correctness.',
  },
]

const failureStory =
  'A tour-planning prototype backtracked over 25 cities without pruning and blew past a 30s SLA; adding nearest-neighbor ordering and a cost bound cut nodes by 99% and met a 500ms budget.'

const pitfalls = [
  {
    title: 'Forgetting to undo shared state',
    detail: 'Mutating arrays or sets without perfect reversal leads to phantom conflicts later in the tree.',
  },
  {
    title: 'Weak or missing pruning',
    detail: 'If constraints are only checked at the leaves, the search devolves into full enumeration.',
  },
  {
    title: 'Poor branching order',
    detail: 'Choosing wide branches first explodes the tree; reorder to test scarce resources or conflicts early.',
  },
  {
    title: 'Non-terminating cycles',
    detail: 'Revisiting states without visited checks in graph-like searches creates infinite recursion.',
  },
  {
    title: 'Ignoring instrumentation',
    detail: 'Without node/prune counters you cannot tell if heuristics are actually helping.',
  },
]

const whenToUse = [
  {
    title: 'Constraints define feasibility better than formulas define optima',
    detail: 'Great when you can cheaply say "this partial state cannot work" even if the global optimum is unknown.',
  },
  {
    title: 'Solution counts are small',
    detail: 'Ideal when you need the first or best few solutions, not all combinations.',
  },
  {
    title: 'State is reversible and compact',
    detail: 'If you can encode state in arrays/bitmasks and undo in O(1), backtracking stays fast.',
  },
  {
    title: 'Latency budget allows guided search',
    detail: 'When you can spend milliseconds exploring and pruning instead of precomputing everything.',
  },
]

const advanced = [
  {
    title: 'Forward checking and arc consistency',
    detail: 'Propagate domain reductions after each assignment (AC-3) to prune before recursing.',
    note: 'Can cut branches by orders of magnitude in CSPs with tight constraints.',
  },
  {
    title: 'Dancing Links (DLX)',
    detail: 'Linked-list representation for exact cover with O(1) remove/restore operations.',
    note: 'Minimizes undo cost; excellent for Sudoku and polyomino tiling.',
  },
  {
    title: 'Bitmask acceleration',
    detail: 'Use integer masks for subsets (rows/cols/diagonals) to make checks O(1).',
    note: 'Pairs well with languages that have fast bitwise ops; reduces GC churn.',
  },
  {
    title: 'Iterative deepening with time slicing',
    detail: 'Grow depth limits gradually to yield anytime answers under strict SLAs.',
    note: 'Stops gracefully and returns the best incumbent when time expires.',
  },
]

const codeExamples = [
  {
    title: 'N-Queens with diagonal bitmasks',
    code: `function solveNQueens(n: number): string[][] {
  const cols = new Set<number>()
  const diag1 = new Set<number>() // r - c
  const diag2 = new Set<number>() // r + c
  const board = Array.from({ length: n }, () => Array(n).fill('.'))
  const res: string[][] = []

  function dfs(row: number) {
    if (row === n) {
      res.push(board.map((r) => r.join('')))
      return
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue
      cols.add(col)
      diag1.add(row - col)
      diag2.add(row + col)
      board[row][col] = 'Q'
      dfs(row + 1)
      board[row][col] = '.'
      cols.delete(col)
      diag1.delete(row - col)
      diag2.delete(row + col)
    }
  }
  dfs(0)
  return res
}`,
    explanation: 'Bitmask-like sets keep feasibility checks O(1); every mutation is paired with an undo to keep siblings independent.',
  },
  {
    title: 'Branch and bound knapsack',
    code: `type Item = { w: number; v: number }

function knapsack(items: Item[], capacity: number): number {
  let best = 0
  items.sort((a, b) => b.v / b.w - a.v / a.w) // value density first

  function bound(idx: number, weight: number, value: number): number {
    let cap = capacity - weight
    let score = value
    for (let i = idx; i < items.length && cap > 0; i++) {
      const take = Math.min(cap, items[i].w)
      score += take * (items[i].v / items[i].w) // fractional upper bound
      cap -= take
    }
    return score
  }

  function dfs(idx: number, weight: number, value: number) {
    if (weight > capacity) return
    if (value > best) best = value
    if (idx === items.length) return
    if (bound(idx, weight, value) <= best) return // prune hopeless branches

    dfs(idx + 1, weight + items[idx].w, value + items[idx].v) // take
    dfs(idx + 1, weight, value) // skip
  }

  dfs(0, 0, 0)
  return best
}`,
    explanation: 'Upper-bound estimate cuts branches that cannot beat the incumbent; sorting by density tightens the bound early.',
  },
]

const keyTakeaways = [
  {
    title: 'Prune early, undo perfectly',
    detail: 'The speed of backtracking is dominated by how quickly you reject and how safely you reverse.',
  },
  {
    title: 'Ordering is leverage',
    detail: 'The right variable/value order often beats asymptotic tricks; measure node counts, not just runtime.',
  },
  {
    title: 'Bounds turn exploration into search',
    detail: 'Even loose bounds save huge work; refine them iteratively as you profile.',
  },
  {
    title: 'Design for anytime results',
    detail: 'Iterative deepening and branch-and-bound let you stop early with a valid best-so-far answer.',
  },
]

export default function BacktrackingParadigmPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Backtracking Paradigm</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Search, prune, and undo with discipline</div>
              <p className="win95-text">
                Backtracking is depth-first search with deliberate undo steps and aggressive pruning. It trades exponential worst cases for
                practical performance by exposing early contradictions and keeping state reversible.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Big picture</legend>
            <div className="win95-grid win95-grid-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>History that shaped backtracking</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((event) => (
                <div key={event.title} className="win95-panel">
                  <div className="win95-heading">{event.title}</div>
                  <p className="win95-text">{event.detail}</p>
                  <p className="win95-text">{event.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core pillars and mental hooks</legend>
            <div className="win95-grid win95-grid-2">
              <div className="win95-panel">
                <div className="win95-heading">Core pillars</div>
                <ul className="win95-list">
                  {pillars.map((pillar) => (
                    <li key={pillar.title}>
                      <strong>{pillar.title}:</strong> {pillar.detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="win95-panel">
                <div className="win95-heading">Mental models</div>
                <ul className="win95-list">
                  {mentalModels.map((model) => (
                    <li key={model.title}>
                      <strong>{model.title}:</strong> {model.detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works, step by step</legend>
            <div className="win95-grid win95-grid-2">
              {howItWorks.map((step, idx) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">
                    Step {idx + 1}: {step.title}
                  </div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity at a glance</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Approach</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {complexityTable.map((row) => (
                    <tr key={row.approach}>
                      <td>{row.approach}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Where it powers real systems</legend>
            <div className="win95-stack">
              <div className="win95-grid win95-grid-2">
                {applications.map((app) => (
                  <div key={app.title} className="win95-panel">
                    <div className="win95-heading">{app.title}</div>
                    <p className="win95-text">{app.detail}</p>
                    <p className="win95-text">{app.note}</p>
                  </div>
                ))}
              </div>
              <div className="win95-panel win95-panel--raised">
                <div className="win95-heading">Failure mode</div>
                <p className="win95-text">{failureStory}</p>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls to avoid</legend>
            <div className="win95-stack">
              {pitfalls.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to reach for backtracking</legend>
            <div className="win95-stack">
              {whenToUse.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced moves</legend>
            <div className="win95-grid win95-grid-2">
              {advanced.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Code examples</legend>
            <div className="win95-stack">
              {codeExamples.map((example) => (
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
            <legend>Key takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
