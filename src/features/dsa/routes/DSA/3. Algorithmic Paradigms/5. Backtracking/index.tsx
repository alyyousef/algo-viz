import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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

const foundations = [
  {
    title: 'Constraint satisfaction core',
    detail:
      'Backtracking explores assignments that satisfy constraints. It does not need a numeric objective, only a fast way to reject partial assignments.',
  },
  {
    title: 'Depth-first enumeration',
    detail:
      'DFS gives minimal memory use and enables clean undo. Each recursive call is a single decision added to the prefix.',
  },
  {
    title: 'Pruning defines speed',
    detail:
      'The algorithm is only as good as its pruning. Every early contradiction saves an exponential subtree.',
  },
  {
    title: 'Reversibility is non-negotiable',
    detail:
      'Each mutation must be undone precisely. If undo is expensive or buggy, correctness and performance collapse.',
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

const taxonomy = [
  {
    title: 'Pure enumeration',
    detail: 'Explore all assignments; prune only when constraints are violated. Baseline for puzzles.',
  },
  {
    title: 'Branch and bound',
    detail: 'Maintain best-so-far objective and prune branches with optimistic bound <= incumbent.',
  },
  {
    title: 'Constraint programming style',
    detail: 'Use strong propagation (arc consistency, forward checking) to shrink domains early.',
  },
  {
    title: 'Exact cover search',
    detail: 'Model as exact cover and use DLX for O(1) remove/restore operations.',
  },
  {
    title: 'Anytime search',
    detail: 'Iterative deepening or time-bounded DFS that returns best-so-far solution.',
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

const modelingChecklist = [
  'Define variables, their domains, and constraints in plain language.',
  'Identify the smallest state that allows constraint checks and undo.',
  'Pick a branching order (variable and value ordering heuristics).',
  'Choose pruning rules and bounds that are safe (never cut a valid solution).',
  'Decide whether you need one solution, all solutions, or the best solution.',
  'Plan how to reconstruct or record solutions as you backtrack.',
]

const heuristics = [
  {
    title: 'MRV (minimum remaining values)',
    detail: 'Pick the variable with the smallest domain to fail fast.',
  },
  {
    title: 'Degree heuristic',
    detail: 'Break ties by choosing the variable that constrains the most others.',
  },
  {
    title: 'Least constraining value',
    detail: 'Try values that eliminate the fewest options for neighbors.',
  },
  {
    title: 'Conflict-first ordering',
    detail: 'Choose positions with the highest constraints or most conflicts first.',
  },
]

const pruningToolkit = [
  {
    title: 'Constraint violation checks',
    detail: 'Reject partial assignments that already break constraints (row/col/diag conflicts).',
  },
  {
    title: 'Forward checking',
    detail: 'After assigning a variable, remove inconsistent values from neighbors.',
  },
  {
    title: 'Arc consistency (AC-3)',
    detail: 'Propagate implications across constraints to reduce domains aggressively.',
  },
  {
    title: 'Bounding functions',
    detail: 'Use optimistic bounds to stop branches that cannot beat the incumbent.',
  },
  {
    title: 'Symmetry breaking',
    detail: 'Fix one variable or canonical ordering to avoid equivalent solutions.',
  },
]

const stateManagement = [
  {
    title: 'Immutable vs mutable state',
    detail:
      'Immutable state is safer but slower; mutable state with explicit undo is faster and standard for high-performance solvers.',
  },
  {
    title: 'Undo stacks',
    detail:
      'Record each change (cell, value, domain) on a stack so you can roll back in LIFO order.',
  },
  {
    title: 'Bitmasks for constraints',
    detail:
      'Use integer masks to test conflicts in O(1), e.g., rows/cols/diagonals in Sudoku or N-Queens.',
  },
  {
    title: 'Early exit flags',
    detail:
      'If you only need the first solution, propagate a found flag to cut remaining recursion.',
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

const stepByStepExample = [
  {
    title: 'Sudoku backtracking flow',
    steps: [
      'Represent each cell as a variable with domain 1..9.',
      'Pick the cell with the smallest domain (MRV).',
      'Try a value, update row/col/box masks, and remove conflicts.',
      'If any domain becomes empty, undo and try the next value.',
      'When all cells are filled, record the solution.',
    ],
    note:
      'The core speedups come from MRV and O(1) constraint checks with bitmasks.',
  },
  {
    title: 'Permutation with constraints',
    steps: [
      'Build a partial permutation and mark used items.',
      'Check the constraint as soon as enough prefix is formed.',
      'Prune on violation to avoid deeper permutations.',
      'Undo the last choice and continue.',
    ],
    note:
      'Early constraint checks can cut factorial exploration by orders of magnitude.',
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

const comparisons = [
  {
    title: 'Backtracking vs DP',
    detail:
      'DP reuses overlapping subproblems; backtracking explores a tree. If states repeat, memoize or switch to DP.',
  },
  {
    title: 'Backtracking vs greedy',
    detail:
      'Greedy takes one path based on a proof; backtracking explores many paths and prunes unsafe ones.',
  },
  {
    title: 'Backtracking vs BFS/DFS on graphs',
    detail:
      'Graph search typically revisits nodes with visited sets; backtracking explores assignments with undo of constraints.',
  },
]

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

const debuggingChecklist = [
  'Count visited nodes and pruned nodes to confirm heuristics are working.',
  'Log depth and branching factor for a few runs to find hotspots.',
  'Verify undo symmetry: every mutation must have a reverse operation.',
  'Use small cases with known solutions to validate correctness.',
  'Add timeouts and early exit flags to avoid runaway recursion.',
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

const whenToAvoid = [
  {
    title: 'Massive, repetitive state space',
    detail: 'If the same substate repeats often, memoization or DP will dominate.',
  },
  {
    title: 'Weak or expensive pruning',
    detail: 'If constraint checks are heavy, the overhead can outweigh pruning gains.',
  },
  {
    title: 'Real-time strict deadlines',
    detail: 'Worst-case exponential behavior makes hard guarantees difficult.',
  },
  {
    title: 'Streaming/online decisions',
    detail: 'Backtracking assumes you can undo and revisit; online settings forbid that.',
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

const instrumentation = [
  {
    title: 'Node counters',
    detail: 'Track visited nodes, pruned nodes, and max depth to quantify efficiency.',
  },
  {
    title: 'Heatmaps and histograms',
    detail: 'Record prune depths or branching to spot where heuristics are weak.',
  },
  {
    title: 'Replayable seeds',
    detail: 'If randomized ordering is used, store seeds for reproducibility.',
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
  {
    title: 'Sudoku skeleton with bitmasks',
    code: `function solveSudoku(board: number[][]): boolean {
  const row = Array(9).fill(0)
  const col = Array(9).fill(0)
  const box = Array(9).fill(0)
  const empties: Array<[number, number]> = []

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c]
      if (val === 0) {
        empties.push([r, c])
        continue
      }
      const bit = 1 << val
      row[r] |= bit
      col[c] |= bit
      box[((r / 3) | 0) * 3 + ((c / 3) | 0)] |= bit
    }
  }

  function dfs(i: number): boolean {
    if (i === empties.length) return true
    const [r, c] = empties[i]
    const b = ((r / 3) | 0) * 3 + ((c / 3) | 0)
    const used = row[r] | col[c] | box[b]
    for (let v = 1; v <= 9; v++) {
      const bit = 1 << v
      if (used & bit) continue
      row[r] |= bit
      col[c] |= bit
      box[b] |= bit
      board[r][c] = v
      if (dfs(i + 1)) return true
      board[r][c] = 0
      row[r] ^= bit
      col[c] ^= bit
      box[b] ^= bit
    }
    return false
  }

  return dfs(0)
}`,
    explanation: 'Bitmasks make checks O(1). Each assignment updates row/col/box masks and is undone on backtrack.',
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
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
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
            <legend>Foundations</legend>
            <div className="win95-grid win95-grid-2">
              {foundations.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

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
            <legend>Backtracking taxonomy</legend>
            <div className="win95-grid win95-grid-2">
              {taxonomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Modeling checklist</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {modelingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Heuristics that save time</legend>
            <div className="win95-grid win95-grid-2">
              {heuristics.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pruning toolkit</legend>
            <div className="win95-grid win95-grid-2">
              {pruningToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>State and undo management</legend>
            <div className="win95-grid win95-grid-2">
              {stateManagement.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Worked examples</legend>
            <div className="win95-stack">
              {stepByStepExample.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <ol className="win95-list win95-list--numbered">
                    {item.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
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
            <legend>Backtracking vs other paradigms</legend>
            <div className="win95-grid win95-grid-2">
              {comparisons.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Debugging checklist</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {debuggingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
            <legend>When to avoid backtracking</legend>
            <div className="win95-stack">
              {whenToAvoid.map((item) => (
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
            <legend>Instrumentation that pays off</legend>
            <div className="win95-grid win95-grid-2">
              {instrumentation.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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

