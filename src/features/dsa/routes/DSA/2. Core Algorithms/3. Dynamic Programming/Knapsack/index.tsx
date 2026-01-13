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
    title: 'Bitset and branch-and-bound optimizations (1990s-2010s)',
    detail:
      'Bitset convolutions, meet-in-the-middle, and pruning heuristics brought knapsack into competitive programming and high-performance solvers.',
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
      'Capacity is a budget; each item is an expense that yields a return. The DP table is your ledger of best returns for every budget prefix.',
  },
  {
    title: 'Frontier of possibilities',
    detail:
      'Each DP entry is a point on the Pareto frontier for weight and value. Knapsack DP incrementally constructs the frontier without enumerating all subsets.',
  },
  {
    title: 'Choices as yes/no switches',
    detail:
      '0/1 knapsack asks a binary question per item. The recurrence mirrors a decision tree but reuses solved subproblems instead of branching exponentially.',
  },
]

const mechanics = [
  {
    heading: '0/1 knapsack recurrence',
    bullets: [
      'dp[i][w] = maximum value using first i items within capacity w.',
      'If weight_i > w: dp[i][w] = dp[i-1][w].',
      'Else: dp[i][w] = max(dp[i-1][w], dp[i-1][w - weight_i] + value_i).',
      'Space can drop to O(W) by iterating w downward so each item is used at most once per pass.',
    ],
  },
  {
    heading: 'Unbounded knapsack',
    bullets: [
      'dp[i][w] = max(dp[i-1][w], dp[i][w - weight_i] + value_i).',
      'Iterate w upward so an item can be reused multiple times in the same pass.',
      'Models coin change and crafting problems where supply is unlimited.',
    ],
  },
  {
    heading: 'Reconstruction',
    bullets: [
      'Store take/skip decisions or parents to backtrack from dp[n][W] and list chosen items.',
      'Track total weight alongside value when reporting a solution to confirm feasibility.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Pseudo-polynomial runtime',
    detail:
      'Classic DP runs in O(nW) time and O(nW) or O(W) space, polynomial in numeric capacity W but exponential in its bit length. Large capacities demand optimizations or approximations.',
  },
  {
    title: 'Bitset speedups',
    detail:
      'When values or weights are small, bitset convolution can pack transitions into word-level parallelism, accelerating dense instances.',
  },
  {
    title: 'Meet-in-the-middle',
    detail:
      'Splitting items in half and enumerating subsets of each part yields O(2^(n/2)) time and memory, outperforming plain 2^n for small n when W is huge.',
  },
  {
    title: 'Approximation schemes',
    detail:
      'FPTAS scales values to shrink the DP dimension, delivering a (1 - epsilon) solution in polynomial time in n and 1/epsilon.',
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
    parent = array of length W+1 filled with -1  // optional reconstruction

    for i in range(n):
        w_i = weights[i]; v_i = values[i]
        for w from W down to w_i:
            take = dp[w - w_i] + v_i
            if take > dp[w]:
                dp[w] = take
                parent[w] = i

    return dp[W], parent`,
    explanation:
      'Backward iteration prevents reusing the same item twice in one pass. parent records the last item that improved each capacity for reconstruction.',
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
      'Forward iteration lets an item be chosen multiple times because updated dp[w - w_i] in the same pass can feed future states.',
  },
  {
    title: 'Meet-in-the-middle for large W',
    code: `function knapsackMeetMiddle(items, W):
    split items into A and B
    listA = all subsets of A with (weight, value), filter weight <= W
    listB = all subsets of B with (weight, value), filter weight <= W
    sort listB by weight, keep only entries with strictly increasing value

    best = 0
    for (wA, vA) in listA:
        remaining = W - wA
        vB = bestValueInListBWithWeightAtMost(remaining) // binary search
        best = max(best, vA + vB)

    return best`,
    explanation:
      'Enumerating halves cuts the 2^n blowup to 2^(n/2) and leverages dominance pruning on one side to speed lookups.',
  },
]

const pitfalls = [
  'Iterating capacity forward in 0/1 knapsack reuses the same item multiple times and breaks correctness.',
  'Ignoring that O(nW) is pseudo-polynomial leads to timeouts when W is large; scale values or use meet-in-the-middle/approximation.',
  'Forgetting reconstruction data makes it impossible to list chosen items later without rerunning with extra bookkeeping.',
  'Mixing value and weight dimensions accidentally (e.g., using value as capacity index) silently corrupts DP states.',
  'Assuming value-per-weight greedily solves 0/1 knapsack; that only works for fractional knapsack, not 0/1.',
]

const decisionGuidance = [
  'Need exact 0/1 solution with moderate capacity: use O(nW) DP, 1D optimized.',
  'Capacity huge but n small (<= 40): use meet-in-the-middle on items.',
  'Weights are small integers and many items: consider bitset DP for speed.',
  'Unlimited item copies: unbounded knapsack recurrence with forward iteration.',
  'Can tolerate approximation for large instances: use an FPTAS by scaling values.',
  'Multiple constraints (multi-dimensional): expect higher complexity; consider heuristics or integer programming.',
]

const advancedInsights = [
  {
    title: 'Fully polynomial-time approximation (FPTAS)',
    detail:
      'Scale values by K = epsilon * maxValue / n to shrink DP size; solving the scaled problem yields a (1 - epsilon) approximation in poly(n, 1/epsilon).',
  },
  {
    title: 'Branch and bound',
    detail:
      'Depth-first search with upper bounds (fractional knapsack or relaxed LP) prunes large parts of the search tree, often cracking medium instances quickly.',
  },
  {
    title: 'Bitset convolutions',
    detail:
      'Bitwise shifts and OR operations can update reachable weights in O(W/word_size) per item, accelerating dense weight ranges.',
  },
  {
    title: 'Group and multiple-choice knapsack',
    detail:
      'Some formulations require choosing at most one item from each group; adapt the recurrence by iterating group options instead of binary take/skip.',
  },
  {
    title: 'Pareto pruning',
    detail:
      'For multi-dimensional variants, maintain Pareto-efficient states to curb explosion, trading completeness for tractable search spaces.',
  },
]

const takeaways = [
  '0/1 knapsack thrives on optimal substructure; DP replaces exponential branching with O(nW) pseudo-polynomial time.',
  'Iteration order matters: backward for 0/1, forward for unbounded.',
  'When W is large, switch tactics: meet-in-the-middle, bitsets, or approximation schemes.',
  'Greedy by value density fails for 0/1; use DP or bounded variants of it to stay correct.',
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
                The knapsack problem asks which items to pack when weight is scarce and value is the goal. Dynamic programming exploits
                optimal substructure to trade exponential search for pseudo-polynomial work, while meet-in-the-middle and approximation
                schemes step in when capacities explode.
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
                Knapsack balances payoff against capacity. It underpins budgets, cargo loading, and resource allocation where every
                item is a discrete yes or no. The 0/1 variant forbids repeats; unbounded allows them. Both hinge on comparing include
                versus exclude choices while never crossing the weight line.
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
            <legend>How it works: mechanics in motion</legend>
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
                O(nW) is fast when W is moderate, but remember it scales with the numeric capacity. Switch to meet-in-the-middle,
                bitsets, or approximations when W is huge, and mind memory as well as time.
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

