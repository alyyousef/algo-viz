import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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
    <TopicLayout
      title="Backtracking Paradigm"
      subtitle="Search, prune, and undo with discipline"
      intro="Backtracking is depth-first search with deliberate undo steps and aggressive pruning. It trades exponential worst cases for practical performance by exposing early contradictions and keeping state reversible."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History that shaped backtracking">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {history.map((event) => (
            <article key={event.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">{event.title}</p>
              <p className="text-sm text-white/80">{event.detail}</p>
              <p className="text-xs text-white/60">{event.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core pillars and mental hooks">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="text-sm text-white/80">{pillar.detail}</p>
              </article>
            ))}
          </div>
          <div className="space-y-3">
            {mentalModels.map((model) => (
              <article key={model.title} className="rounded-lg bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{model.title}</h3>
                <p className="text-sm text-white/80">{model.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How it works, step by step">
        <div className="grid gap-3 md:grid-cols-3">
          {howItWorks.map((step, idx) => (
            <article key={step.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold text-white/60">Step {idx + 1}</p>
              <h3 className="text-sm font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-white/80">{step.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity at a glance">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-white/80">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-white/60">
              <tr>
                <th className="px-3 py-2">Approach</th>
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Space</th>
                <th className="px-3 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="border-b border-white/5">
                  <td className="px-3 py-2 font-semibold text-white">{row.approach}</td>
                  <td className="px-3 py-2 text-white/80">{row.time}</td>
                  <td className="px-3 py-2 text-white/80">{row.space}</td>
                  <td className="px-3 py-2 text-white/70">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Where it powers real systems">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((app) => (
            <article key={app.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{app.title}</h3>
              <p className="text-sm text-white/80">{app.detail}</p>
              <p className="text-xs text-white/60">{app.note}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
          <p className="font-semibold text-red-200">Failure mode</p>
          <p>{failureStory}</p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls to avoid">
        <div className="space-y-2 rounded-lg bg-white/5 p-4">
          {pitfalls.map((item) => (
            <div key={item.title} className="rounded-md border border-white/5 p-3">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When to reach for backtracking">
        <div className="space-y-2 rounded-lg bg-white/5 p-4">
          {whenToUse.map((item) => (
            <div key={item.title} className="rounded-md border border-white/5 p-3">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Advanced moves">
        <div className="grid gap-3 md:grid-cols-2">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="grid gap-3 md:grid-cols-2">
          {codeExamples.map((example) => (
            <article key={example.title} className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{example.title}</h3>
              <pre className="overflow-x-auto rounded-md bg-black/40 p-3 text-xs text-white">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {keyTakeaways.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
