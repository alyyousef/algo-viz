import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

export default function KnapsackPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Knapsack Problem</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Packing value under a hard weight budget</div>
              <p className="win95-text">
                The knapsack problem asks which items to pack when weight is scarce and value is the goal. This page covers the
                formal definition, classic recurrences, reconstruction, variant types, and practical performance trade-offs.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Knapsack balances payoff against capacity. The core DP compares include vs exclude for each item and capacity.
                0/1 forbids repeats, unbounded allows them. When W is too large, use meet-in-the-middle or approximation.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Formal definition</legend>
            <div className="win95-grid win95-grid-2">
              {formalDefinition.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
              {mentalModels.map((item, index) => (
                <div
                  key={item.title}
                  className={index === 0 ? 'win95-panel win95-panel--raised' : 'win95-panel'}
                >
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variants at a glance</legend>
            <div className="win95-grid win95-grid-3">
              {variants.map((block) => (
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
            <legend>How it works: mechanics</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
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
            <div className="win95-grid win95-grid-3">
              {algorithmSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked example</legend>
            <div className="win95-grid win95-grid-2">
              {workedExample.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <pre className="win95-code">
                    <code>{item.detail}</code>
                  </pre>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Reconstruction checklist</legend>
            <div className="win95-grid win95-grid-3">
              {reconstructionSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and performance intuition</legend>
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
                O(nW) is fast when W is moderate, but it scales with the numeric capacity. If W is huge, consider value-based DP,
                meet-in-the-middle, bitsets, or approximation schemes.
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
            <legend>Quick FAQ</legend>
            <div className="win95-stack">
              {miniFaq.map((item) => (
                <div key={item.question} className="win95-panel">
                  <div className="win95-heading">{item.question}</div>
                  <p className="win95-text">{item.answer}</p>
                </div>
              ))}
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
            <legend>Advanced insights and current frontiers</legend>
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
            <div className="win95-panel win95-panel--raised">
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
