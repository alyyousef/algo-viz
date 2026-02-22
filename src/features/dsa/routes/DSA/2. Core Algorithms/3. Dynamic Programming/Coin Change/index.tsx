import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const glossaryTerms = [
  {
    term: 'Dynamic Programming (DP)',
    definition:
      'A method that solves larger problems by reusing solutions to smaller subproblems.',
  },
  {
    term: 'Optimal Substructure',
    definition:
      'The best solution for an amount can be built from best solutions of smaller amounts.',
  },
  {
    term: 'Overlapping Subproblems',
    definition:
      'The same intermediate amounts are solved repeatedly, so caching in an array is efficient.',
  },
  {
    term: 'Combination',
    definition:
      'A way to make an amount where order does not matter (1 + 2 equals 2 + 1).',
  },
  {
    term: 'Permutation',
    definition:
      'A sequence where order matters, so different orders are counted separately.',
  },
  {
    term: 'Canonical Coin System',
    definition:
      'A coin set where greedy always yields an optimal minimum-coin answer.',
  },
  {
    term: 'Unbounded Knapsack',
    definition:
      'A model where each item can be used unlimited times, matching classic coin change.',
  },
  {
    term: 'Bounded Coin Change',
    definition:
      'A variant where each coin type has limited quantity, requiring extended state.',
  },
  {
    term: 'INF Sentinel',
    definition:
      'A large placeholder value used to mark amounts that are currently unreachable.',
  },
  {
    term: 'Exact-k Coins',
    definition:
      'A constrained form that requires using exactly k coins to reach the target.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.coin98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.coin98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
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

.coin98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.coin98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.coin98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.coin98-control {
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
}

.coin98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.coin98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.coin98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.coin98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.coin98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.coin98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.coin98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.coin98-toc-list li {
  margin: 0 0 8px;
}

.coin98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.coin98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.coin98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.coin98-section {
  margin: 0 0 20px;
}

.coin98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.coin98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.coin98-content p,
.coin98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.coin98-content p {
  margin: 0 0 10px;
}

.coin98-content ul,
.coin98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.coin98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.coin98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.coin98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .coin98-main {
    grid-template-columns: 1fr;
  }

  .coin98-toc {
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

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-variants', label: 'Problem Variants' },
    { id: 'core-workflow', label: 'DP Workflow' },
    { id: 'core-notes', label: 'Implementation Notes' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-usage', label: 'When to Use It' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CoinChangePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Coin Change (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Coin Change',
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
    <div className="coin98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="coin98-window" role="presentation">
        <header className="coin98-titlebar">
          <span className="coin98-title-text">Coin Change</span>
          <div className="coin98-title-controls">
            <button className="coin98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="coin98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="coin98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`coin98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="coin98-main">
          <aside className="coin98-toc" aria-label="Table of contents">
            <h2 className="coin98-toc-title">Contents</h2>
            <ul className="coin98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="coin98-content">
            <h1 className="coin98-doc-title">Coin Change</h1>
            <p>
              Coin change appears in two main forms: finding the fewest coins to reach a target amount, and counting how many
              combinations can form that amount. Both rely on dynamic programming and careful loop ordering to avoid mistakes.
              This page covers the variants, transitions, and the reasoning behind each approach.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="coin98-section">
                  <h2 className="coin98-heading">Overview</h2>
                  <p>
                    Coin change is a building-block DP problem. You decompose a target amount into smaller sub-amounts and reuse
                    solutions. The trick is defining the right state and loop order for the exact variant you want.
                  </p>
                </section>
                <hr className="coin98-divider" />
                <section id="bp-history" className="coin98-section">
                  <h2 className="coin98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="coin98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="coin98-divider" />
                <section id="bp-applications" className="coin98-section">
                  <h2 className="coin98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="coin98-divider" />
                <section id="bp-takeaways" className="coin98-section">
                  <h2 className="coin98-heading">Key Takeaways</h2>
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
                <section id="core-mental-models" className="coin98-section">
                  <h2 className="coin98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="coin98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="core-variants" className="coin98-section">
                  <h2 className="coin98-heading">Problem Variants</h2>
                  {problemVariants.map((variant) => (
                    <div key={variant.heading}>
                      <h3 className="coin98-subheading">{variant.heading}</h3>
                      <ul>
                        {variant.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-workflow" className="coin98-section">
                  <h2 className="coin98-heading">DP Workflow</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Correctness idea: each amount is built from a smaller amount plus one coin. Because sub-amounts are solved
                    first, dp values represent optimal or complete counts when you reach a larger amount.
                  </p>
                </section>
                <section id="core-notes" className="coin98-section">
                  <h2 className="coin98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="coin98-section">
                  <h2 className="coin98-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    For large target amounts, DP can be memory heavy. Consider pruning with coin gcd checks or modular counting
                    if exact values are not required.
                  </p>
                </section>
                <section id="core-advanced" className="coin98-section">
                  <h2 className="coin98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="coin98-section">
                  <h2 className="coin98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-usage" className="coin98-section">
                  <h2 className="coin98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="coin98-section">
                <h2 className="coin98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="coin98-subheading">{example.title}</h3>
                    <div className="coin98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="coin98-section">
                <h2 className="coin98-heading">Glossary</h2>
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

