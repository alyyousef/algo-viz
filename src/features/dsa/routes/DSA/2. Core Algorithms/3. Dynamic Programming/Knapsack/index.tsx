import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Mathematical roots in resource allocation (1897-1950s)',
    detail:
      'Early work on constrained optimization and linear programming framed the idea of packing limited resources for maximum payoff, setting up the knapsack narrative.',
  },
  {
    title: 'Bellman coins dynamic programming (1950s)',
    detail:
      'Richard Bellman formalized optimal substructure and overlapping subproblems, providing the DP framework that makes knapsack solvable in pseudo-polynomial time.',
  },
  {
    title: 'NP-complete status recognized (1970s)',
    detail:
      'Karp listed 0/1 knapsack among his 21 NP-complete problems, clarifying that no known polynomial-time algorithm exists in the general case with large weights.',
  },
  {
    title: 'FPTAS and approximation (1970s-1980s)',
    detail:
      'Researchers developed fully polynomial-time approximation schemes that trade tiny accuracy loss for true polynomial runtime when exact solutions are too costly.',
  },
  {
    title: 'Bitset and meet-in-the-middle (1990s-2010s)',
    detail:
      'Bitset convolutions, meet-in-the-middle, and pruning heuristics brought knapsack into competitive programming and high-performance solvers.',
  },
]

const formalDefinition = [
  {
    title: 'Inputs',
    detail:
      'n items, each with weight w_i and value v_i. A capacity W limits total weight.',
  },
  {
    title: 'Decision',
    detail:
      'Choose a subset of items (0/1) or a multiset (unbounded) to maximize total value.',
  },
  {
    title: 'Constraint',
    detail:
      'Sum of chosen weights must be <= W. Items are indivisible in 0/1 knapsack.',
  },
  {
    title: 'Output',
    detail:
      'The maximum achievable value, and optionally the list of chosen items.',
  },
]

const mentalModels = [
  {
    title: 'Packing a suitcase',
    detail:
      'Every item is tempting, but weight is scarce. Each choice displaces another item, so you compare value per weight and absolute value while respecting the strict limit.',
  },
  {
    title: 'Budget ledger',
    detail:
      'Capacity is a budget; each item is an expense that yields a return. The DP table is your ledger of best returns for every budget.',
  },
  {
    title: 'Frontier of possibilities',
    detail:
      'Each DP entry is a point on the Pareto frontier for weight and value. Knapsack DP constructs the frontier without enumerating all subsets.',
  },
  {
    title: 'Choices as yes/no switches',
    detail:
      '0/1 knapsack asks a binary question per item. The recurrence mirrors a decision tree but reuses solved subproblems instead of branching exponentially.',
  },
]

const variants = [
  {
    heading: '0/1 knapsack',
    bullets: [
      'Each item is chosen at most once.',
      'Classic DP: dp[i][w] = max value using first i items with capacity w.',
      'Backward weight iteration in 1D prevents reusing an item.',
    ],
  },
  {
    heading: 'Unbounded knapsack',
    bullets: [
      'Items can be used unlimited times.',
      'Transition reuses dp[w - w_i] in the same item loop.',
      'Forward weight iteration allows multiple uses.',
    ],
  },
  {
    heading: 'Bounded knapsack',
    bullets: [
      'Each item has a limited count c_i.',
      'Convert to multiple 0/1 items via binary splitting or use monotone queue.',
    ],
  },
  {
    heading: 'Multi-constraint knapsack',
    bullets: [
      'Weights become vectors (weight, volume, cost).',
      'DP dimension increases; complexity grows quickly.',
    ],
  },
  {
    heading: 'Fractional knapsack',
    bullets: [
      'Items can be split; greedy by value density is optimal.',
      'Different problem than 0/1; do not confuse them.',
    ],
  },
]

const mechanics = [
  {
    heading: '0/1 knapsack recurrence',
    bullets: [
      'dp[i][w] = maximum value using first i items within capacity w.',
      'If w_i > w: dp[i][w] = dp[i-1][w].',
      'Else: dp[i][w] = max(dp[i-1][w], dp[i-1][w - w_i] + v_i).',
    ],
  },
  {
    heading: 'Space optimization to 1D',
    bullets: [
      'Use dp[w] only, representing the best value at capacity w.',
      'Iterate w downward for 0/1 to avoid reusing items.',
      'Iterate w upward for unbounded to allow repeats.',
    ],
  },
  {
    heading: 'Reconstruction',
    bullets: [
      'Store a take/skip decision or parent pointer per state.',
      'Backtrack from dp[n][W] to list chosen items.',
      'For 1D DP, track last item used and previous weight.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Define state and base cases',
    detail:
      'Set dp[0][w] = 0 (no items). Decide if dp is item-major (i, w) or weight-only (w).',
  },
  {
    title: 'Choose transition',
    detail:
      'Include or exclude item i, respecting capacity. Use the correct loop direction.',
  },
  {
    title: 'Fill DP table',
    detail:
      'Iterate items then capacities. Each cell depends on smaller item counts.',
  },
  {
    title: 'Extract and rebuild',
    detail:
      'Answer is dp[n][W]. Backtrack to recover the chosen items if needed.',
  },
]

const workedExample = [
  {
    title: 'Items and capacity',
    detail:
      'Items: (w, v) = (2, 6), (2, 10), (3, 12). Capacity W = 5.',
  },
  {
    title: '2D table idea',
    detail:
      'dp has rows for items and columns for capacity 0..5. dp[i][w] stores best value.',
  },
  {
    title: 'Row updates',
    detail:
      'After item 1: best is 6 at w >= 2. After item 2: best is 16 at w >= 4.',
  },
  {
    title: 'Final answer',
    detail:
      'dp[3][5] = 22 by taking items (2, 10) and (3, 12).',
  },
]

const reconstructionSteps = [
  {
    title: 'Check last row',
    detail:
      'If dp[i][w] == dp[i-1][w], item i was not taken. Otherwise it was taken.',
  },
  {
    title: 'Move to previous state',
    detail:
      'If taken, set w = w - w_i and continue with i-1.',
  },
  {
    title: 'Reverse the list',
    detail:
      'You collect items from last to first. Reverse to output in original order.',
  },
]

const complexityNotes = [
  {
    title: 'Pseudo-polynomial runtime',
    detail:
      'Classic DP is O(nW) time and O(nW) or O(W) space. It is polynomial in W but exponential in log W.',
  },
  {
    title: 'Bitset speedups',
    detail:
      'When weights are small, bitset shifts compute reachable weights fast, often 32x or 64x speedups.',
  },
  {
    title: 'Meet-in-the-middle',
    detail:
      'Split items in half and enumerate subsets: O(2^(n/2)). Useful when n is small and W is huge.',
  },
  {
    title: 'Approximation schemes',
    detail:
      'FPTAS scales values to shrink DP size and yields a (1 - epsilon) solution in poly(n, 1/epsilon).',
  },
]

const realWorldUses = [
  {
    context: 'Cargo and logistics',
    detail:
      'Load trucks or containers with weight and volume limits to maximize profit, often with item counts bounded and multiple constraints.',
  },
  {
    context: 'Budgeting and portfolio selection',
    detail:
      'Allocate limited budget across projects or ads to maximize expected return when each option has a cost and payoff.',
  },
  {
    context: 'Manufacturing and cutting stock',
    detail:
      'Choose raw material cuts or batch mixes within capacity to maximize utilization and minimize waste.',
  },
  {
    context: 'Cloud resource packing',
    detail:
      'Assign virtual machines or tasks to servers under CPU/memory limits to maximize revenue or utilization.',
  },
  {
    context: 'Security and testing',
    detail:
      'Select subsets of tests, patches, or controls under time or budget limits to maximize risk reduction.',
  },
]

const examples = [
  {
    title: '0/1 knapsack, 1D DP',
    code: `function knapsack01(weights, values, W):
    n = len(weights)
    dp = array of length W+1 filled with 0
    take = array of length W+1 filled with -1

    for i in range(n):
        w_i = weights[i]; v_i = values[i]
        for w from W down to w_i:
            cand = dp[w - w_i] + v_i
            if cand > dp[w]:
                dp[w] = cand
                take[w] = i

    return dp[W], take`,
    explanation:
      'Backward iteration prevents reusing the same item twice. take[w] records the last item that improved capacity w.',
  },
  {
    title: 'Reconstruction from 2D DP',
    code: `function reconstruct(dp, weights, values, W):
    i = len(weights)
    w = W
    chosen = []
    while i > 0 and w >= 0:
        if dp[i][w] == dp[i-1][w]:
            i -= 1
        else:
            chosen.append(i-1)
            w -= weights[i-1]
            i -= 1
    return reverse(chosen)`,
    explanation:
      'Compare dp[i][w] with dp[i-1][w]. If they differ, the item was taken.',
  },
  {
    title: 'Unbounded knapsack',
    code: `function knapsackUnbounded(weights, values, W):
    n = len(weights)
    dp = array of length W+1 filled with 0

    for i in range(n):
        w_i = weights[i]; v_i = values[i]
        for w from w_i to W:
            dp[w] = max(dp[w], dp[w - w_i] + v_i)

    return dp[W]`,
    explanation:
      'Forward iteration allows an item to be reused multiple times because updated states feed into later capacities.',
  },
  {
    title: 'Meet-in-the-middle sketch',
    code: `function knapsackMeetMiddle(items, W):
    split items into A and B
    listA = all subsets of A with (weight, value) filtered by weight <= W
    listB = all subsets of B with (weight, value) filtered by weight <= W
    sort listB by weight; keep only pairs with best value for each weight

    best = 0
    for (wA, vA) in listA:
        remaining = W - wA
        vB = bestValueInListBWithWeightAtMost(remaining)
        best = max(best, vA + vB)

    return best`,
    explanation:
      'Enumerating halves reduces 2^n to 2^(n/2). Dominance pruning keeps listB compact.',
  },
]

const pitfalls = [
  'Iterating capacity forward in 0/1 knapsack reuses the same item multiple times and breaks correctness.',
  'Ignoring that O(nW) is pseudo-polynomial leads to timeouts when W is large; scale values or use meet-in-the-middle.',
  'Forgetting reconstruction data makes it impossible to list chosen items later without rerunning with extra bookkeeping.',
  'Mixing value and weight dimensions accidentally (e.g., using value as capacity index) silently corrupts DP states.',
  'Assuming value-per-weight greedily solves 0/1 knapsack; that only works for fractional knapsack.',
]

const decisionGuidance = [
  'Need exact 0/1 solution with moderate capacity: use O(nW) DP, 1D optimized.',
  'Capacity huge but n small (<= 40): use meet-in-the-middle on items.',
  'Weights are small integers and many items: consider bitset DP for speed.',
  'Unlimited item copies: unbounded knapsack recurrence with forward iteration.',
  'Can tolerate approximation for large instances: use an FPTAS by scaling values.',
  'Multiple constraints: expect higher complexity; consider heuristics or integer programming.',
]

const advancedInsights = [
  {
    title: 'Value-based DP',
    detail:
      'Flip the dimension: dp[v] = min weight to reach value v. Useful when values are small but weights are large.',
  },
  {
    title: 'FPTAS intuition',
    detail:
      'Scale values down by a factor K so the total value sum is smaller, then solve value-based DP.',
  },
  {
    title: 'Branch and bound',
    detail:
      'Depth-first search with a fractional knapsack upper bound prunes subtrees aggressively.',
  },
  {
    title: 'Group and multiple-choice knapsack',
    detail:
      'When items are partitioned into groups, choose at most one per group by iterating group options.',
  },
  {
    title: 'Pareto pruning',
    detail:
      'For multi-dimensional variants, keep only non-dominated states to limit growth.',
  },
]

const miniFaq = [
  {
    question: 'Why is knapsack NP-complete if DP is O(nW)?',
    answer:
      'Because W is a number, not the number of bits to store it. O(nW) is pseudo-polynomial and can still be exponential in input size.',
  },
  {
    question: 'Why does iteration direction matter?',
    answer:
      'Backward iteration prevents reusing the same item; forward iteration allows reuse. This matches 0/1 vs unbounded.',
  },
  {
    question: 'Can I use greedy by value density?',
    answer:
      'Only for fractional knapsack. For 0/1, greedy can be arbitrarily wrong.',
  },
  {
    question: 'How do I get the actual items?',
    answer:
      'Store a parent pointer or compare dp[i][w] to dp[i-1][w] to backtrack the chosen items.',
  },
]

const takeaways = [
  '0/1 knapsack uses a simple include/exclude DP with O(nW) time.',
  'Loop direction is the core correctness detail for 0/1 vs unbounded.',
  'When W is huge, switch to meet-in-the-middle, bitsets, or approximation.',
  'Value-based DP and FPTAS help when weights are large but values are small.',
  'Store split or take decisions if you need the item list, not just the value.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.knap98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.knap98-window {
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

.knap98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.knap98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.knap98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.knap98-control {
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
  font-family: inherit;
  padding: 0;
}

.knap98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.knap98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.knap98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.knap98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.knap98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.knap98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.knap98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.knap98-toc-list li {
  margin: 0 0 8px;
}

.knap98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.knap98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.knap98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.knap98-section {
  margin: 0 0 20px;
}

.knap98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.knap98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.knap98-content p,
.knap98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.knap98-content p {
  margin: 0 0 10px;
}

.knap98-content ul,
.knap98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.knap98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.knap98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.knap98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .knap98-main {
    grid-template-columns: 1fr;
  }

  .knap98-toc {
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

const glossary = [
  { term: '0/1 knapsack', definition: 'Each item can be chosen at most once.' },
  { term: 'Unbounded knapsack', definition: 'Items can be reused unlimited times.' },
  { term: 'Bounded knapsack', definition: 'Each item has a finite count limit.' },
  { term: 'Capacity (W)', definition: 'Maximum total weight allowed in the solution.' },
  { term: 'Pseudo-polynomial', definition: 'Runtime polynomial in numeric W, not in input bit-length.' },
  { term: 'FPTAS', definition: 'Approximation scheme with controllable error and polynomial runtime.' },
  { term: 'Meet-in-the-middle', definition: 'Split items into halves and combine subset summaries in O(2^(n/2)).' },
  { term: 'Reconstruction', definition: 'Backtracking decisions to recover chosen items, not only final value.' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-definition', label: 'Formal Definition' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-variants', label: 'Variants' },
    { id: 'core-mechanics', label: 'Mechanics' },
    { id: 'core-steps', label: 'Algorithm Steps' },
    { id: 'core-reconstruction', label: 'Reconstruction' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-guidance', label: 'Decision Guidance' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-faq', label: 'Quick FAQ' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Example' },
    { id: 'ex-code', label: 'Practical Examples' },
    { id: 'ex-applications', label: 'Real-World Uses' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function KnapsackPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab: TabId = isTabId(searchParams.get('tab')) ? (searchParams.get('tab') as TabId) : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Knapsack Problem (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Knapsack Problem',
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
    <div className="knap98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="knap98-window" role="presentation">
        <header className="knap98-titlebar">
          <span className="knap98-title-text">Knapsack Problem</span>
          <div className="knap98-title-controls">
            <button className="knap98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="knap98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="knap98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`knap98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setSearchParams((prev) => {
                const next = new URLSearchParams(prev)
                next.set('tab', tab.id)
                return next
              }, { replace: true })}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="knap98-main">
          <aside className="knap98-toc" aria-label="Table of contents">
            <h2 className="knap98-toc-title">Contents</h2>
            <ul className="knap98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="knap98-content">
            <h1 className="knap98-doc-title">Knapsack Problem</h1>
            <p>
              The knapsack problem asks which items to pack when weight is scarce and value is the goal. This page covers the
              formal definition, classic recurrences, reconstruction, variant types, and practical performance trade-offs.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="knap98-section">
                  <h2 className="knap98-heading">Overview</h2>
                  <p>
                    Knapsack balances payoff against capacity. The core DP compares include vs exclude for each item and capacity.
                    0/1 forbids repeats, unbounded allows them. When W is too large, use meet-in-the-middle or approximation.
                  </p>
                </section>
                <hr className="knap98-divider" />
                <section id="bp-definition" className="knap98-section">
                  <h2 className="knap98-heading">Formal Definition</h2>
                  {formalDefinition.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-history" className="knap98-section">
                  <h2 className="knap98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="knap98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="knap98-section">
                  <h2 className="knap98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="knap98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-takeaways" className="knap98-section">
                  <h2 className="knap98-heading">Key Takeaways</h2>
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
                <section id="core-variants" className="knap98-section">
                  <h2 className="knap98-heading">Variants at a Glance</h2>
                  {variants.map((block) => (
                    <div key={block.heading}>
                      <h3 className="knap98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-mechanics" className="knap98-section">
                  <h2 className="knap98-heading">How It Works: Mechanics</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="knap98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-steps" className="knap98-section">
                  <h2 className="knap98-heading">Algorithm Steps</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-reconstruction" className="knap98-section">
                  <h2 className="knap98-heading">Reconstruction Checklist</h2>
                  {reconstructionSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="knap98-section">
                  <h2 className="knap98-heading">Complexity and Performance</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    O(nW) is fast when W is moderate, but it scales with the numeric capacity. If W is huge, consider value-based DP,
                    meet-in-the-middle, bitsets, or approximation schemes.
                  </p>
                </section>
                <section id="core-pitfalls" className="knap98-section">
                  <h2 className="knap98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-guidance" className="knap98-section">
                  <h2 className="knap98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="knap98-section">
                  <h2 className="knap98-heading">Advanced Insights and Frontiers</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-faq" className="knap98-section">
                  <h2 className="knap98-heading">Quick FAQ</h2>
                  {miniFaq.map((item) => (
                    <p key={item.question}>
                      <strong>{item.question}</strong> {item.answer}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-worked" className="knap98-section">
                  <h2 className="knap98-heading">Worked Example</h2>
                  {workedExample.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="ex-code" className="knap98-section">
                  <h2 className="knap98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="knap98-subheading">{example.title}</h3>
                      <div className="knap98-codebox">
                        <code>{example.code}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-applications" className="knap98-section">
                  <h2 className="knap98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="knap98-section">
                <h2 className="knap98-heading">Glossary</h2>
                {glossary.map((item) => (
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
