import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '19th century: Early coin systems inspire counting',
    detail:
      'Problems about making change appeared in recreational math, motivating systematic counting methods for combinations.',
  },
  {
    title: '1950s: Dynamic programming formalized',
    detail:
      'Bellman introduced DP, and coin change became a classic example of optimal substructure and overlapping subproblems.',
  },
  {
    title: '1970s: Knapsack variants standardized',
    detail:
      'Coin change aligned with unbounded knapsack, clarifying when order matters and when combinations are counted.',
  },
  {
    title: '2000s: Competitive programming staple',
    detail:
      'The problem became a standard interview and contest task, emphasizing careful state definitions.',
  },
]

const mentalModels = [
  {
    title: 'Building totals like lego bricks',
    detail:
      'Each coin is a brick. You either use it and reduce the remaining amount, or skip it and try other bricks.',
  },
  {
    title: 'Table of ways',
    detail:
      'Imagine a grid where rows are coin types and columns are amounts. Each cell counts how many ways you can build that amount.',
  },
  {
    title: 'Fewest coins versus number of ways',
    detail:
      'Two common tasks: minimize the count of coins, or count all combinations. They use different DP formulas.',
  },
  {
    title: 'Order matters or not',
    detail:
      'If you treat 1+2 and 2+1 as the same, use coin-outer loops. If order matters, use amount-outer loops.',
  },
]

const problemVariants = [
  {
    heading: 'Minimum coins (classic)',
    bullets: [
      'Goal: minimum number of coins to reach amount.',
      'DP state: dp[a] = min coins for amount a.',
      'Unreachable amounts remain INF.',
    ],
  },
  {
    heading: 'Count combinations',
    bullets: [
      'Goal: number of distinct combinations (order does not matter).',
      'DP state: ways[a] = ways to make amount a.',
      'Coins loop outside to avoid permutations.',
    ],
  },
  {
    heading: 'Count permutations',
    bullets: [
      'Goal: number of sequences (order matters).',
      'DP state: ways[a] = ways to make a.',
      'Amount loop outside to allow all orders.',
    ],
  },
  {
    heading: 'Bounded coins',
    bullets: [
      'Each coin type has limited quantity.',
      'State extends with counts or uses binary splitting.',
      'Transforms into bounded knapsack.',
    ],
  },
  {
    heading: 'Exact coin count',
    bullets: [
      'Reach amount using exactly k coins.',
      'State: dp[a][k] = ways or min feasibility.',
      'Useful in constrained budgeting.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Define the state',
    detail:
      'Pick dp[a] for minimum coins or ways[a] for counts. Initialize dp[0] = 0 or ways[0] = 1 as the base case.',
  },
  {
    title: 'Choose the loop order',
    detail:
      'For combinations, loop coins first then amounts. For minimum coins, either order works but be consistent.',
  },
  {
    title: 'Apply the transition',
    detail:
      'Minimum coins: dp[a] = min(dp[a], dp[a - coin] + 1). Combinations: ways[a] += ways[a - coin].',
  },
  {
    title: 'Read the answer',
    detail:
      'If dp[amount] is INF, return -1. Otherwise return dp[amount] or ways[amount].',
  },
]

const implementationNotes = [
  {
    title: 'Initialize safely',
    detail:
      'Use a large sentinel for INF. Avoid overflow when adding 1 to INF by checking first.',
  },
  {
    title: 'Amount bounds',
    detail:
      'DP arrays are size amount + 1. Memory is O(amount), so very large amounts need optimization.',
  },
  {
    title: 'Coin ordering',
    detail:
      'Sorting coins is optional but helps with debugging and ensures stable combinations.',
  },
  {
    title: 'Zero or negative values',
    detail:
      'Coin values must be positive. Filter invalid inputs before DP to avoid infinite loops.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'For amount A and n coins, standard DP runs in O(n * A).',
  },
  {
    title: 'Space cost',
    detail:
      '1D DP uses O(A) memory. 2D DP for bounded cases uses O(n * A).',
  },
  {
    title: 'Tradeoffs',
    detail:
      'Min-coins DP is fast but ignores coin limits. Bounded versions cost more but are more realistic.',
  },
  {
    title: 'Greedy pitfalls',
    detail:
      'Greedy works for canonical coin systems (like US coins) but fails for arbitrary sets.',
  },
]

const realWorldUses = [
  {
    context: 'Cashier systems',
    detail:
      'Find the fewest coins or bills to return change when coin sets are fixed.',
  },
  {
    context: 'Budget allocation',
    detail:
      'Count how many ways to reach a target budget using predefined cost blocks.',
  },
  {
    context: 'Inventory packing',
    detail:
      'Pick package sizes to hit a target capacity with minimal units.',
  },
  {
    context: 'Combinatorial counting',
    detail:
      'Compute how many combinations sum to a target when order should not matter.',
  },
]

const examples = [
  {
    title: 'Minimum coins (bottom-up)',
    code: `function minCoins(coins, amount):
    INF = amount + 1
    dp = array(amount + 1, INF)
    dp[0] = 0

    for coin in coins:
        for a in range(coin, amount):
            dp[a] = min(dp[a], dp[a - coin] + 1)

    return dp[amount] == INF ? -1 : dp[amount]`,
    explanation:
      'For each coin, update all reachable amounts. The dp table always holds the best known coin count.',
  },
  {
    title: 'Count combinations',
    code: `function countWays(coins, amount):
    ways = array(amount + 1, 0)
    ways[0] = 1

    for coin in coins:
        for a in range(coin, amount):
            ways[a] += ways[a - coin]

    return ways[amount]`,
    explanation:
      'Looping coins first prevents counting permutations. Each combination is built in non-decreasing coin order.',
  },
  {
    title: 'Count permutations (order matters)',
    code: `function countPermutations(coins, amount):
    ways = array(amount + 1, 0)
    ways[0] = 1

    for a in range(1, amount):
        for coin in coins:
            if a >= coin:
                ways[a] += ways[a - coin]

    return ways[amount]`,
    explanation:
      'Here amounts are outer, so each amount considers every coin as the last step, counting sequences.',
  },
]

const pitfalls = [
  'Confusing combinations with permutations due to loop order.',
  'Using greedy for non-canonical coin sets (e.g., coins [1, 3, 4] for amount 6).',
  'Not handling unreachable amounts properly (should return -1).',
  'Allowing zero or negative coin values, which breaks DP assumptions.',
  'Overflowing combination counts; large amounts may require 64-bit or BigInt.',
]

const decisionGuidance = [
  'Use min-coins DP when you need the fewest items and coin supply is unlimited.',
  'Use combination counting when order does not matter (like counting ways to pay).',
  'Use permutation counting for sequences (like ordered steps or distinct sequences).',
  'If coin limits exist, model bounded knapsack or use binary splitting.',
  'If the amount is huge, consider optimized algorithms or meet-in-the-middle.',
]

const advancedInsights = [
  {
    title: 'Canonical coin systems',
    detail:
      'Some coin sets guarantee greedy optimality. Detecting this property is non-trivial, so DP remains the safe default.',
  },
  {
    title: 'Space compression',
    detail:
      '1D DP works because each state depends on smaller amounts in the same row. 2D is only needed for bounded coins.',
  },
  {
    title: 'Integer overflow safeguards',
    detail:
      'Counting combinations can explode quickly. Use 64-bit or modular arithmetic for large targets.',
  },
  {
    title: 'Exact-k coins',
    detail:
      'Add a second dimension for number of coins to enforce exact counts or to count ways for each k.',
  },
]

const takeaways = [
  'Coin change is a dynamic programming classic with multiple variants.',
  'State definition and loop order determine whether you count combinations or permutations.',
  'Minimum coins uses a simple min transition; counting uses additive transitions.',
  'Greedy is not reliable for arbitrary coin sets; DP is the robust solution.',
  'The same structure extends to bounded coins, exact counts, and budgeting tasks.',
]

export default function CoinChangePage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Coin Change</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Classic DP for minimum coins and counting combinations</div>
              <p className="win95-text">
                Coin change appears in two main forms: finding the fewest coins to reach a target amount, and counting how many
                combinations can form that amount. Both rely on dynamic programming and careful loop ordering to avoid mistakes.
                This page covers the variants, transitions, and the reasoning behind each approach.
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
                Coin change is a building-block DP problem. You decompose a target amount into smaller sub-amounts and reuse
                solutions. The trick is defining the right state and loop order for the exact variant you want.
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
            <legend>How it works: problem variants</legend>
            <div className="win95-grid win95-grid-3">
              {problemVariants.map((block) => (
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
            <legend>How it works: DP workflow</legend>
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
                Correctness idea: each amount is built from a smaller amount plus one coin. Because sub-amounts are solved first,
                dp values represent optimal or complete counts when you reach a larger amount.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation notes</legend>
            <div className="win95-grid win95-grid-2">
              {implementationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
                For large target amounts, DP can be memory heavy. Consider pruning with coin gcd checks or modular counting
                if exact values are not required.
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

