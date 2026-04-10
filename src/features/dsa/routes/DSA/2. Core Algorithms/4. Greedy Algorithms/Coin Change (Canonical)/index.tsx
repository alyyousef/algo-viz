import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail: 'Order coin values from largest to smallest to apply the greedy rule.',
  },
  {
    title: 'Take as many largest coins as possible',
    detail: 'For coin c, take k = floor(remaining / c), subtract k*c, and record k.',
  },
  {
    title: 'Repeat for next coin',
    detail: 'Move to the next smaller coin and continue until remaining is zero.',
  },
  {
    title: 'Return coin counts',
    detail: 'The greedy list is optimal if the coin system is canonical.',
  },
]

const correctnessInsights = [
  {
    title: 'Canonical definition',
    detail: 'A coin system is canonical if greedy produces an optimal solution for every amount.',
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
    detail: 'Amount 0 returns empty change. Negative amounts are invalid inputs.',
  },
  {
    title: 'Stable output format',
    detail:
      'Return counts per coin or a list of coins; keep ordering consistent for display and auditing.',
  },
  {
    title: 'Large amounts',
    detail: 'Greedy runs in O(n) once coins are sorted, so it scales well for large amounts.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail: 'Sorting coins takes O(m log m); change-making is O(m) for m coin types.',
  },
  {
    title: 'Space complexity',
    detail: 'O(1) extra beyond the output counts.',
  },
  {
    title: 'DP fallback',
    detail: 'Optimal DP for arbitrary sets is O(m * A) time and O(A) space.',
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
    detail: 'Canonical currency systems let machines produce minimal coins with a greedy rule.',
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
    detail: 'Choosing denominations that are canonical can reduce operational complexity.',
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
    explanation: 'US coins are canonical for cents, so greedy is optimal for 63 cents.',
  },
  {
    title: 'Non-canonical counterexample',
    code: `coins = [1, 3, 4], amount = 6
greedy picks: 4 + 1 + 1 (3 coins)
optimal: 3 + 3 (2 coins)`,
    explanation: 'Greedy fails because the system is not canonical.',
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
    explanation: 'If any amount up to the bound shows a mismatch, the system is non-canonical.',
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
    detail: 'For modest bounds, DP provides a ground truth to test greedy behavior.',
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

const quickGlossary = [
  {
    term: 'Canonical coin system',
    definition: 'A denomination set where greedy is optimal for every target amount.',
  },
  {
    term: 'Greedy change-making',
    definition: 'Selecting the largest usable coin repeatedly until the amount is exhausted.',
  },
  {
    term: 'Counterexample amount',
    definition: 'A target value where greedy uses more coins than an optimal solution.',
  },
  {
    term: 'Canonicity verification',
    definition: 'Checking greedy against DP across a range of amounts to detect failures.',
  },
  {
    term: 'Bounded coin change',
    definition: 'Variant where each coin denomination has a limited available count.',
  },
  {
    term: 'DP fallback',
    definition:
      'Dynamic programming approach that guarantees optimal coin count for arbitrary coin sets.',
  },
  {
    term: 'Unreachable amount',
    definition: 'Target that cannot be formed from the provided denominations.',
  },
  {
    term: 'Bounded knapsack',
    definition: 'Optimization model related to limited coin supply constraints.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-real-world', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-variants', label: 'Problem Variants' },
    { id: 'core-workflow', label: 'Greedy Workflow' },
    { id: 'core-correctness', label: 'Correctness Insights' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-guidance', label: 'When to Use It' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CoinChangeCanonicalPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Coin Change (Canonical)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Coin Change (Canonical)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Coin Change (Canonical)</h1>
      <p>
        Coin Change (Canonical) is the greedy version of the classic coin change problem. The rule
        is simple: always take as many of the largest coin as possible, then move to the next.
      </p>
      <p>
        This is optimal only when the coin system is canonical, meaning greedy yields the minimum
        number of coins for every amount. This page explains why, when it fails, and how to detect
        it.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Greedy change-making is fast and simple, but it is not universally correct. Canonical
              coin systems are special denominations where the greedy choice never paints you into a
              corner.
            </p>
            <p>
              Many currencies are canonical by design, which is why cashiers and machines can make
              optimal change without dynamic programming.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-real-world" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">Problem Variants</h2>
            {problemVariants.map((item) => (
              <div key={item.heading}>
                <h3 className="bin98-subheading">{item.heading}</h3>
                <ul>
                  {item.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">Greedy Workflow</h2>
            {algorithmSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Correctness only holds under canonicity. For non-canonical systems, the greedy
              solution can be suboptimal, even though it always produces a valid representation when
              a coin of value 1 exists.
            </p>
          </section>
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Insights</h2>
            {correctnessInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-implementation" className="bin98-section">
            <h2 className="bin98-heading">Implementation Notes</h2>
            {implementationNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Tradeoffs</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Greedy is extremely fast but only correct under canonicity. If correctness is critical
              and the coin set is unknown, use DP or verify canonicity before trusting greedy
              outputs.
            </p>
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-guidance" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-practical" className="bin98-section">
          <h2 className="bin98-heading">Practical Examples</h2>
          {examples.map((example) => (
            <div key={example.title}>
              <h3 className="bin98-subheading">{example.title}</h3>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
