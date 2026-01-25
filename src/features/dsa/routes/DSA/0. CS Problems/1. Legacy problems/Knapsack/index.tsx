import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'What it is',
    details:
      'Choose a subset of items with weights and values to maximize value without exceeding a weight limit.',
    notes:
      'The classic version is 0/1 knapsack: each item is either taken or not taken.',
  },
  {
    title: 'Why it matters',
    details:
      'It models resource allocation under a hard constraint: budgets, capacity, time, or risk.',
    notes:
      'It is a foundation for dynamic programming and approximation algorithms.',
  },
  {
    title: 'What it teaches',
    details:
      'Optimal substructure, overlapping subproblems, and the difference between pseudo-polynomial and polynomial time.',
    notes:
      'It also highlights how variants change complexity and solution strategy.',
  },
]

const historicalContext = [
  {
    title: '1890s: Early combinatorial optimization',
    details:
      'Problems of packing and allocation appeared in operations research and economics.',
    notes:
      'The knapsack metaphor became a standard framing for discrete choice under constraints.',
  },
  {
    title: '1950s-1960s: Dynamic programming',
    details:
      'DP provided a practical exact solution for 0/1 knapsack when capacities are moderate.',
    notes:
      'This established knapsack as a canonical DP example in CS curricula.',
  },
  {
    title: '1970s+: Complexity and approximation',
    details:
      '0/1 knapsack is NP-complete, but admits pseudo-polynomial DP and FPTAS schemes.',
    notes:
      'Fractional knapsack is solvable greedily in polynomial time.',
  },
]

const quickGlossary = [
  {
    term: 'Item (i)',
    definition: 'An object with weight w_i and value v_i.',
  },
  {
    term: 'Capacity (W)',
    definition: 'The maximum total weight allowed in the knapsack.',
  },
  {
    term: '0/1 knapsack',
    definition: 'Each item can be chosen at most once (binary decision).',
  },
  {
    term: 'Unbounded knapsack',
    definition: 'Items can be chosen multiple times (unlimited copies).',
  },
  {
    term: 'Fractional knapsack',
    definition: 'Items can be split; a greedy strategy is optimal.',
  },
  {
    term: 'Pseudo-polynomial time',
    definition: 'Running time depends on numeric value of inputs (like W), not just their length.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail:
      'n items, each with weight w_i and value v_i, and a capacity W.',
  },
  {
    title: 'Output',
    detail:
      'Maximum total value achievable without exceeding capacity.',
  },
  {
    title: 'Constraint',
    detail:
      'Sum of selected item weights must be <= W.',
  },
  {
    title: 'Decision version',
    detail:
      'Is there a subset with total value at least V and total weight <= W?',
  },
]

const variants = [
  {
    title: '0/1 knapsack',
    detail:
      'Binary choice per item. NP-complete. Classic DP solution uses O(nW).',
  },
  {
    title: 'Unbounded knapsack',
    detail:
      'Unlimited copies. DP is O(nW), but transition order differs from 0/1.',
  },
  {
    title: 'Bounded knapsack',
    detail:
      'Each item has a limited count. Can be reduced to 0/1 via binary splitting.',
  },
  {
    title: 'Fractional knapsack',
    detail:
      'Items are divisible. Greedy by value/weight ratio is optimal.',
  },
  {
    title: 'Multi-constraint knapsack',
    detail:
      'Multiple resource limits (weight, volume, time). Becomes much harder.',
  },
]

const mentalModels = [
  {
    title: 'Budget allocation',
    detail:
      'You have a fixed budget and want to buy the most value. Each item has a cost and benefit.',
  },
  {
    title: 'Binary choice',
    detail:
      'The key difficulty is that items are indivisible in 0/1 knapsack.',
  },
  {
    title: 'DP table',
    detail:
      'Row = items considered, column = capacity. Each cell stores the best value so far.',
  },
]

const dpState = [
  {
    title: 'State definition',
    detail:
      'dp[i][w] = maximum value using items 1..i with capacity w.',
  },
  {
    title: 'Transition',
    detail:
      'dp[i][w] = max(dp[i-1][w], dp[i-1][w - w_i] + v_i) if w_i <= w.',
  },
  {
    title: 'Base cases',
    detail:
      'dp[0][w] = 0 for all w, and dp[i][0] = 0 for all i.',
  },
  {
    title: 'Answer',
    detail:
      'dp[n][W] is the optimal value.',
  },
]

const greedyFractional = [
  {
    title: 'Sort by ratio',
    detail:
      'Compute value/weight for each item and sort descending.',
  },
  {
    title: 'Take greedily',
    detail:
      'Take as much as possible from the highest ratio item, then continue.',
  },
  {
    title: 'Why it works',
    detail:
      'Fractional knapsack is a linear programming problem with a greedy optimal solution.',
  },
]

const complexityNotes = [
  {
    title: '0/1 DP time',
    detail:
      'O(nW) time, pseudo-polynomial because W is numeric.',
  },
  {
    title: '0/1 DP space',
    detail:
      'O(nW) with a full table, or O(W) with a rolling array.',
  },
  {
    title: 'Fractional greedy',
    detail:
      'O(n log n) due to sorting, then linear scan.',
  },
  {
    title: 'NP-completeness',
    detail:
      'The decision version of 0/1 knapsack is NP-complete.',
  },
]

const correctnessNotes = [
  {
    title: 'Optimal substructure',
    detail:
      'The best solution for (i, w) is built from optimal solutions to smaller subproblems.',
  },
  {
    title: 'Overlapping subproblems',
    detail:
      'The same (i, w) states are reused multiple times; DP caches them.',
  },
  {
    title: 'Greedy limitation',
    detail:
      'Greedy by ratio is optimal for fractional knapsack but can fail for 0/1.',
  },
]

const boundsAndInsights = [
  {
    title: 'Upper bound',
    detail:
      'Fractional knapsack gives an upper bound on the 0/1 optimum.',
  },
  {
    title: 'Lower bound',
    detail:
      'Any feasible 0/1 selection provides a valid lower bound.',
  },
  {
    title: 'Value scaling',
    detail:
      'Scaling values leads to a DP by total value with time O(nV). Useful for FPTAS.',
  },
  {
    title: 'FPTAS idea',
    detail:
      'Approximate values to reduce DP size and get near-optimal answers quickly.',
  },
]

const edgeCases = [
  {
    title: 'Zero capacity',
    detail:
      'If W = 0, the answer is always 0 regardless of items.',
  },
  {
    title: 'Single item',
    detail:
      'Answer is either its value (if it fits) or 0.',
  },
  {
    title: 'All items too heavy',
    detail:
      'No item fits, so the maximum value is 0.',
  },
  {
    title: 'Exact fill not required',
    detail:
      'The goal is maximize value; using all capacity is optional.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Using greedy for 0/1',
    description:
      'Sorting by value/weight can miss the optimal combination when items are indivisible.',
  },
  {
    mistake: 'Wrong loop order in DP',
    description:
      'For 0/1 knapsack with 1D DP, you must iterate w downward to avoid reusing items.',
  },
  {
    mistake: 'Ignoring overflow',
    description:
      'DP values can get large; use appropriate numeric types in real implementations.',
  },
  {
    mistake: 'Confusing variants',
    description:
      'Unbounded and 0/1 knapsack have different transitions and loop directions.',
  },
]

const realWorldConnections = [
  {
    title: 'Budgeted project selection',
    detail:
      'Pick projects with costs and returns under a fixed budget.',
  },
  {
    title: 'Portfolio selection (discrete)',
    detail:
      'Choose a set of investments with weights and returns under constraints.',
  },
  {
    title: 'Cargo loading',
    detail:
      'Select which items to ship given weight limits and profit.',
  },
  {
    title: 'Resource allocation in systems',
    detail:
      'Allocate memory or CPU quotas to tasks to maximize total utility.',
  },
]

const workedExamples = [
  {
    title: '0/1 example',
    code: `Items (w, v): A(2, 3), B(3, 4), C(4, 5), D(5, 8)
Capacity W = 5
Best: pick D alone (value 8)
Other combos: A+B (7), A+C (8 but weight 6)`,
    explanation:
      'The optimal solution may skip smaller ratios if a heavier item fits better.',
  },
  {
    title: 'Fractional example',
    code: `Items (w, v): A(2, 4), B(3, 5), C(4, 7)
Ratios: A=2.0, B=1.67, C=1.75
Capacity W = 5
Take A (2,4), then 3/4 of C (3 weight, 5.25 value)
Total value = 9.25`,
    explanation:
      'Fractional knapsack can split an item, which is why greedy is optimal here.',
  },
]

const pseudocode = [
  {
    title: '0/1 DP (2D)',
    code: `for w in 0..W:
  dp[0][w] = 0
for i in 1..n:
  for w in 0..W:
    dp[i][w] = dp[i-1][w]
    if w_i <= w:
      dp[i][w] = max(dp[i][w], dp[i-1][w-w_i] + v_i)
return dp[n][W]`,
    explanation:
      'Classic DP table. Easy to implement and reason about.',
  },
  {
    title: '0/1 DP (1D optimized)',
    code: `dp[0..W] = 0
for i in 1..n:
  for w in W..w_i:
    dp[w] = max(dp[w], dp[w-w_i] + v_i)
return dp[W]`,
    explanation:
      'Iterate w downward to prevent reusing item i multiple times.',
  },
  {
    title: 'Unbounded DP',
    code: `dp[0..W] = 0
for w in 0..W:
  for each item i:
    if w_i <= w:
      dp[w] = max(dp[w], dp[w-w_i] + v_i)
return dp[W]`,
    explanation:
      'Loop order allows using the same item multiple times.',
  },
  {
    title: 'Fractional greedy',
    code: `sort items by value/weight desc
value = 0
for item in items:
  take = min(item.weight, remaining)
  value += take * (item.value / item.weight)
  remaining -= take
return value`,
    explanation:
      'Greedy is optimal only when items are divisible.',
  },
]

const evaluationChecklist = [
  {
    title: 'Variant clarity',
    detail:
      'State which knapsack variant you are solving. The algorithm depends on it.',
  },
  {
    title: 'Constraints',
    detail:
      'Check sizes of n and W. Large W makes DP impractical without optimization.',
  },
  {
    title: 'Correct loop order',
    detail:
      '0/1 uses descending w; unbounded uses ascending w.',
  },
  {
    title: 'Result verification',
    detail:
      'Validate with small examples and compare against brute force for small n.',
  },
]

const keyTakeaways = [
  '0/1 knapsack is NP-complete, but dynamic programming solves moderate capacities exactly.',
  'Fractional knapsack is greedy-optimal because items can be split.',
  'Loop order matters: descending for 0/1, ascending for unbounded.',
  'Pseudo-polynomial time depends on numeric capacity, not just input length.',
  'Approximation schemes can trade a small error for huge speedups.',
]

export default function KnapsackPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Knapsack</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Choosing the best set of items under a hard capacity limit</div>
              <p className="win95-text">
                The knapsack problem asks you to maximize value subject to a weight limit. It appears simple, but the 0/1 version is
                NP-complete and forces you to confront exponential search. Dynamic programming provides an exact solution when
                capacities are moderate, while greedy and approximation methods handle large instances.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical Context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalContext.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {quickGlossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Problem Setup</legend>
            <div className="win95-grid win95-grid-2">
              {problemSetup.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Knapsack Variants</legend>
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
            <legend>Mental Models</legend>
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
            <legend>DP State and Transition</legend>
            <div className="win95-grid win95-grid-2">
              {dpState.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The DP table stores the best value for each prefix of items and capacity. This guarantees optimality because each
                decision (take or skip) only depends on smaller subproblems.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Fractional Greedy Strategy</legend>
            <div className="win95-grid win95-grid-2">
              {greedyFractional.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and Cost</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness Notes</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Bounds and Insights</legend>
            <div className="win95-grid win95-grid-2">
              {boundsAndInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Edge Cases</legend>
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
            <legend>Real-World Connections</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldConnections.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {workedExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode Reference</legend>
            <div className="win95-stack">
              {pseudocode.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {commonPitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How to Evaluate an Implementation</legend>
            <div className="win95-grid win95-grid-2">
              {evaluationChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((takeaway) => (
                <div key={takeaway} className="win95-panel">
                  <p className="win95-text">{takeaway}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
