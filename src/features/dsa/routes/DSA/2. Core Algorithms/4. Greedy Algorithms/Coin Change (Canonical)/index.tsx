import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '1800s: Currency systems designed for efficient change',
    detail:
      'Many coin systems were crafted so cashiers could make change quickly with a simple greedy rule.',
  },
  {
    title: '1960s-1970s: Greedy optimality formalized',
    detail:
      'Algorithms textbooks identified coin change as a classic case where a greedy choice can be optimal under specific conditions.',
  },
  {
    title: '1990s: Canonical coin systems studied',
    detail:
      'Researchers characterized when greedy is always optimal and how to detect non-canonical systems with counterexamples.',
  },
  {
    title: 'Modern: Verification and testing',
    detail:
      'Practical systems test greedy against DP up to a bound to validate canonicity of a coin set.',
  },
]

const mentalModels = [
  {
    title: 'Change-making cashier',
    detail:
      'Always give the largest coin you can, then repeat. Canonical systems guarantee this is always optimal.',
  },
  {
    title: 'Cover the amount with big tiles',
    detail:
      'Large tiles cover more area per piece; the greedy rule picks the largest tile that still fits.',
  },
  {
    title: 'Stepping down a staircase',
    detail:
      'Each coin size is a step. Greedy takes the biggest step without overshooting to minimize the total number of steps.',
  },
  {
    title: 'Canonical vs non-canonical',
    detail:
      'In canonical sets, greedy equals optimal for all amounts. In non-canonical sets, there exists at least one counterexample.',
  },
]

const problemVariants = [
  {
    heading: 'Canonical coin change (minimum coins)',
    bullets: [
      'Coins are unlimited and sorted by value.',
      'Goal: minimize number of coins to reach amount A.',
      'Greedy is optimal only for canonical sets.',
    ],
  },
  {
    heading: 'Non-canonical coin change',
    bullets: [
      'Greedy can fail; use DP to guarantee optimality.',
      'Classic counterexample: coins [1, 3, 4], amount 6.',
      'Greedy picks 4+1+1 (3 coins) but optimal is 3+3 (2 coins).',
    ],
  },
  {
    heading: 'Limited coins',
    bullets: [
      'Each coin has a limited count.',
      'Greedy can fail even in canonical sets; use bounded DP.',
      'Equivalent to bounded knapsack.',
    ],
  },
  {
    heading: 'Make change for cash register',
    bullets: [
      'Given price and payment, return optimal change.',
      'Canonical sets let you use fast greedy without DP.',
      'Must still handle coin availability constraints.',
    ],
  },
  {
    heading: 'Minimize weight or other costs',
    bullets: [
      'Coins have weights or handling costs; minimize total cost instead of count.',
      'Greedy rule changes and may not be optimal.',
      'Model as weighted shortest path or DP.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Sort coins descending',
    detail:
      'Order coin values from largest to smallest to apply the greedy rule.',
  },
  {
    title: 'Take as many largest coins as possible',
    detail:
      'For coin c, take k = floor(remaining / c), subtract k*c, and record k.',
  },
  {
    title: 'Repeat for next coin',
    detail:
      'Move to the next smaller coin and continue until remaining is zero.',
  },
  {
    title: 'Return coin counts',
    detail:
      'The greedy list is optimal if the coin system is canonical.',
  },
]

const correctnessInsights = [
  {
    title: 'Canonical definition',
    detail:
      'A coin system is canonical if greedy produces an optimal solution for every amount.',
  },
  {
    title: 'Greedy is not universally correct',
    detail:
      'For non-canonical sets, a counterexample amount exists where greedy uses more coins than optimal.',
  },
  {
    title: 'Canonical sets in practice',
    detail:
      'Many currency systems (e.g., US coins for cents) are canonical, enabling fast change-making.',
  },
]

const implementationNotes = [
  {
    title: 'Require coin 1 for full coverage',
    detail:
      'If the smallest coin is not 1, some amounts are unreachable; greedy should detect and report impossibility.',
  },
  {
    title: 'Validate canonicity if unsure',
    detail:
      'Test greedy vs DP up to a bound (often maxCoin + secondMaxCoin) to catch non-canonical systems.',
  },
  {
    title: 'Handle zero or negative input',
    detail:
      'Amount 0 returns empty change. Negative amounts are invalid inputs.',
  },
  {
    title: 'Stable output format',
    detail:
      'Return counts per coin or a list of coins; keep ordering consistent for display and auditing.',
  },
  {
    title: 'Large amounts',
    detail:
      'Greedy runs in O(n) once coins are sorted, so it scales well for large amounts.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Sorting coins takes O(m log m); change-making is O(m) for m coin types.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(1) extra beyond the output counts.',
  },
  {
    title: 'DP fallback',
    detail:
      'Optimal DP for arbitrary sets is O(m * A) time and O(A) space.',
  },
  {
    title: 'Verification cost',
    detail:
      'Testing greedy vs DP up to a bound adds O(m * B) time, where B is the verification limit.',
  },
]

const realWorldUses = [
  {
    context: 'Cashiers and vending machines',
    detail:
      'Canonical currency systems let machines produce minimal coins with a greedy rule.',
  },
  {
    context: 'Token systems',
    detail:
      'Game currencies and reward points often use canonical-like denominations for simple change.',
  },
  {
    context: 'Resource packing',
    detail:
      'Discrete resource blocks (e.g., memory pages, bundle sizes) may use canonical sets for fast allocation.',
  },
  {
    context: 'Budgeting and pricing',
    detail:
      'Choosing denominations that are canonical can reduce operational complexity.',
  },
]

const examples = [
  {
    title: 'Greedy change (canonical coins)',
    code: `function greedyChange(coins, amount):
    sort coins desc
    counts = []
    for c in coins:
        k = floor(amount / c)
        counts.append(k)
        amount -= k * c
    if amount != 0: return impossible
    return counts`,
    explanation:
      'For canonical coin systems, this returns the minimum number of coins for any amount.',
  },
  {
    title: 'US coin example',
    code: `coins = [25, 10, 5, 1], amount = 63
greedy picks: 25, 25, 10, 1, 1, 1
total coins = 6`,
    explanation:
      'US coins are canonical for cents, so greedy is optimal for 63 cents.',
  },
  {
    title: 'Non-canonical counterexample',
    code: `coins = [1, 3, 4], amount = 6
greedy picks: 4 + 1 + 1 (3 coins)
optimal: 3 + 3 (2 coins)`,
    explanation:
      'Greedy fails because the system is not canonical.',
  },
  {
    title: 'DP verification (sketch)',
    code: `function isCanonical(coins):
    // test greedy vs dp up to a bound B
    B = coins[-1] + coins[-2]   // heuristic bound
    for a in 1..B:
        if greedy(a) != dpOptimal(a):
            return false
    return true`,
    explanation:
      'If any amount up to the bound shows a mismatch, the system is non-canonical.',
  },
]

const pitfalls = [
  'Assuming greedy works for any coin set; it only works for canonical systems.',
  'Forgetting the coin of value 1 can make some amounts impossible to form.',
  'Using greedy for limited coin counts; the canonical property does not apply.',
  'Skipping input validation (negative or fractional amounts).',
  'Not sorting coins descending, which breaks the greedy rule.',
]

const decisionGuidance = [
  'Use greedy if the coin system is known canonical (standard currency sets).',
  'Use DP if the coin system is arbitrary or unknown.',
  'Verify canonicity offline if you plan to deploy greedy in production.',
  'Use bounded knapsack when coin counts are limited.',
  'If minimizing cost or weight, define a new objective and re-evaluate optimality.',
]

const advancedInsights = [
  {
    title: 'Why canonical sets exist',
    detail:
      'Denominations can be designed so each large coin dominates combinations of smaller ones, enabling greedy optimality.',
  },
  {
    title: 'Counterexample search',
    detail:
      'Non-canonical systems always have a smallest counterexample amount where greedy fails.',
  },
  {
    title: 'DP as a correctness oracle',
    detail:
      'For modest bounds, DP provides a ground truth to test greedy behavior.',
  },
  {
    title: 'Canonical is about all amounts',
    detail:
      'A system can be greedy-optimal for many amounts and still be non-canonical if a single counterexample exists.',
  },
]

const takeaways = [
  'Greedy coin change is optimal only for canonical coin systems.',
  'Canonical means greedy matches the minimum coin count for every amount.',
  'DP is the safe fallback for arbitrary denominations.',
  'Counterexamples like [1, 3, 4] show why greedy can fail.',
  'When in doubt, verify canonicity or use DP.',
]

export default function CoinChangeCanonicalPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Coin Change (Canonical)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Greedy change-making that is provably optimal for the right coin systems</div>
              <p className="win95-text">
                Coin Change (Canonical) is the greedy version of the classic coin change problem. The rule is simple: always take
                as many of the largest coin as possible, then move to the next. This is optimal only when the coin system is canonical
                - meaning greedy yields the minimum number of coins for every amount. This page explains why, when it fails, and how
                to detect it.
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
                Greedy change-making is fast and simple, but it is not universally correct. Canonical coin systems are special
                denominations where the greedy choice never paints you into a corner. Many currencies are canonical by design, which
                is why cashiers and machines can make optimal change without dynamic programming.
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
            <legend>How it works: greedy workflow</legend>
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
                Correctness only holds under canonicity. For non-canonical systems, the greedy solution can be suboptimal, even
                though it always produces a valid representation when a coin of value 1 exists.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness insights</legend>
            <div className="win95-grid win95-grid-3">
              {correctnessInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
                Greedy is extremely fast but only correct under canonicity. If correctness is critical and the coin set is unknown,
                use DP or verify canonicity before trusting greedy outputs.
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
