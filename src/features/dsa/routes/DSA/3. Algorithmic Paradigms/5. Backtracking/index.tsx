import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
      'Constraints shape which branches survive; recursion or a stack drives traversal order. This split makes heuristics pluggable.',
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
    detail: 'Choose the next variable or value to shrink branching factor (most constrained first, fail-fast).',
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
    detail: 'Model as exact cover and use DLX for O(1) remove and restore operations.',
  },
  {
    title: 'Anytime search',
    detail: 'Iterative deepening or time-bounded DFS that returns the best-so-far solution.',
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
      'Make the move, update auxiliary structures, then run constraint or bound checks. If it fails, undo immediately.',
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
    detail: 'Reject partial assignments that already break constraints (row, col, or diagonal conflicts).',
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
      'Use integer masks to test conflicts in O(1), for example rows, cols, and diagonals in Sudoku or N-Queens.',
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
    note: 'Effective branching factor shrinks when early contradictions are found.',
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
      'Try a value, update row, col, and box masks, and remove conflicts.',
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
    title: 'SAT and SMT engines',
    detail: 'Modern CDCL solvers descend from backtracking with learned clauses as aggressive pruning.',
    note: 'Used in hardware verification and compilers (for example, superoptimizer search).',
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
    title: 'Backtracking vs BFS or DFS on graphs',
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
    detail: 'Without node or prune counters you cannot tell if heuristics are actually helping.',
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
    detail: 'If you can encode state in arrays or bitmasks and undo in O(1), backtracking stays fast.',
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
    title: 'Streaming or online decisions',
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
    detail: 'Linked-list representation for exact cover with O(1) remove and restore operations.',
    note: 'Minimizes undo cost; excellent for Sudoku and polyomino tiling.',
  },
  {
    title: 'Bitmask acceleration',
    detail: 'Use integer masks for subsets (rows, cols, diagonals) to make checks O(1).',
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
    explanation: 'Bitmasks make checks O(1). Each assignment updates row, col, and box masks and is undone on backtrack.',
  },
]

const keyTakeaways = [
  {
    title: 'Prune early, undo perfectly',
    detail: 'The speed of backtracking is dominated by how quickly you reject and how safely you reverse.',
  },
  {
    title: 'Ordering is leverage',
    detail: 'The right variable or value order often beats asymptotic tricks; measure node counts, not just runtime.',
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

const glossaryTerms = [
  {
    term: 'Backtracking',
    definition:
      'Depth-first search over choices where invalid partial states are pruned and each decision is explicitly undone.',
  },
  {
    term: 'Pruning',
    definition:
      'Stopping a branch early because the partial state cannot lead to a valid or better solution.',
  },
  {
    term: 'Branch and bound',
    definition:
      'A backtracking variant that prunes branches using an optimistic estimate of the best possible score.',
  },
  {
    term: 'MRV',
    definition:
      'Minimum Remaining Values, a heuristic that picks the variable with the smallest remaining domain first.',
  },
  {
    term: 'Forward checking',
    definition:
      'Removing values from neighboring domains immediately after an assignment to detect failure earlier.',
  },
  {
    term: 'Undo stack',
    definition:
      'A stack of reversible state changes used to restore shared mutable state after exploring a branch.',
  },
  {
    term: 'Exact cover',
    definition:
      'A formulation where each constraint must be satisfied exactly once, often solved with Dancing Links.',
  },
  {
    term: 'Symmetry breaking',
    definition:
      'Eliminating equivalent branches so the solver does not repeat the same logical solution in multiple forms.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const backtrackingHelpStyles = `
.backtracking-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  padding: 0;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.backtracking-help-window {
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

.backtracking-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
}

.backtracking-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.backtracking-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.backtracking-help-control {
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
.backtracking-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.backtracking-help-tab {
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

.backtracking-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.backtracking-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.backtracking-help-toc {
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
}

.backtracking-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.backtracking-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.backtracking-help-toc-list li {
  margin: 0 0 8px;
}

.backtracking-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.backtracking-help-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.backtracking-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.backtracking-help-section {
  margin: 0 0 20px;
}

.backtracking-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.backtracking-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.backtracking-help-content p,
.backtracking-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.backtracking-help-content p {
  margin: 0 0 10px;
}

.backtracking-help-content ul,
.backtracking-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.backtracking-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.backtracking-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.backtracking-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .backtracking-help-main {
    grid-template-columns: 1fr;
  }

  .backtracking-help-toc {
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
    { id: 'bp-foundations', label: 'Foundations' },
    { id: 'bp-big-picture', label: 'Big Picture' },
    { id: 'bp-taxonomy', label: 'Taxonomy' },
    { id: 'bp-history', label: 'History' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Pillars and Mental Models' },
    { id: 'core-how', label: 'How It Works' },
    { id: 'core-modeling', label: 'Modeling Checklist' },
    { id: 'core-heuristics', label: 'Heuristics' },
    { id: 'core-pruning', label: 'Pruning Toolkit' },
    { id: 'core-state', label: 'State Management' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-comparisons', label: 'Comparisons' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-debugging', label: 'Debugging' },
    { id: 'core-use', label: 'When To Use It' },
    { id: 'core-avoid', label: 'When To Avoid It' },
    { id: 'core-advanced', label: 'Advanced Moves' },
    { id: 'core-instrumentation', label: 'Instrumentation' },
    { id: 'core-takeaways', label: 'Key Takeaways' },
  ],
  examples: [
    { id: 'examples-worked', label: 'Worked Examples' },
    { id: 'examples-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function BacktrackingParadigmPage(): JSX.Element {
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
    document.title = `Backtracking Paradigm (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: false })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Backtracking Paradigm',
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
    <div className="backtracking-help-page">
      <style>{backtrackingHelpStyles}</style>
      <div className="backtracking-help-window" role="presentation">
        <header className="backtracking-help-titlebar">
          <span className="backtracking-help-title">Backtracking Paradigm</span>
          <div className="backtracking-help-controls">
            <button className="backtracking-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="backtracking-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="backtracking-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`backtracking-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="backtracking-help-main">
          <aside className="backtracking-help-toc" aria-label="Table of contents">
            <h2 className="backtracking-help-toc-title">Contents</h2>
            <ul className="backtracking-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="backtracking-help-content">
            <h1 className="backtracking-help-doc-title">Backtracking Paradigm</h1>
            <p>
              Backtracking is depth-first search with deliberate undo steps and aggressive pruning. It trades exponential worst cases for
              practical performance by exposing early contradictions and keeping state reversible.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-foundations" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Foundations</h2>
                  {foundations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="backtracking-help-divider" />
                <section id="bp-big-picture" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Big Picture</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="backtracking-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <hr className="backtracking-help-divider" />
                <section id="bp-taxonomy" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Backtracking Taxonomy</h2>
                  {taxonomy.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="backtracking-help-divider" />
                <section id="bp-history" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">History That Shaped Backtracking</h2>
                  {history.map((item) => (
                    <div key={item.title}>
                      <h3 className="backtracking-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-pillars" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Core Pillars and Mental Hooks</h2>
                  {pillars.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-how" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">How It Works, Step by Step</h2>
                  {howItWorks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-modeling" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Modeling Checklist</h2>
                  <ul>
                    {modelingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-heuristics" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Heuristics That Save Time</h2>
                  {heuristics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pruning" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Pruning Toolkit</h2>
                  {pruningToolkit.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-state" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">State and Undo Management</h2>
                  {stateManagement.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Complexity at a Glance</h2>
                  {complexityTable.map((row) => (
                    <div key={row.approach}>
                      <h3 className="backtracking-help-subheading">{row.approach}</h3>
                      <p><strong>Time:</strong> {row.time}</p>
                      <p><strong>Space:</strong> {row.space}</p>
                      <p><strong>Note:</strong> {row.note}</p>
                    </div>
                  ))}
                </section>
                <section id="core-applications" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Where It Powers Real Systems</h2>
                  {applications.map((item) => (
                    <div key={item.title}>
                      <h3 className="backtracking-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                  <h3 className="backtracking-help-subheading">Failure Mode</h3>
                  <p>{failureStory}</p>
                </section>
                <section id="core-comparisons" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Backtracking vs Other Paradigms</h2>
                  {comparisons.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Pitfalls to Avoid</h2>
                  {pitfalls.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-debugging" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Debugging Checklist</h2>
                  <ul>
                    {debuggingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-use" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">When to Reach for Backtracking</h2>
                  {whenToUse.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-avoid" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">When to Avoid Backtracking</h2>
                  {whenToAvoid.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Advanced Moves</h2>
                  {advanced.map((item) => (
                    <div key={item.title}>
                      <h3 className="backtracking-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <section id="core-instrumentation" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Instrumentation That Pays Off</h2>
                  {instrumentation.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-takeaways" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Key Takeaways</h2>
                  {keyTakeaways.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="examples-worked" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Worked Examples</h2>
                  {stepByStepExample.map((item) => (
                    <div key={item.title}>
                      <h3 className="backtracking-help-subheading">{item.title}</h3>
                      <ol>
                        {item.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <section id="examples-code" className="backtracking-help-section">
                  <h2 className="backtracking-help-heading">Code Examples</h2>
                  {codeExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="backtracking-help-subheading">{example.title}</h3>
                      <div className="backtracking-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="backtracking-help-section">
                <h2 className="backtracking-help-heading">Glossary</h2>
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
