import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const knap98Styles = `
.knap98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.knap98-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
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

.knap98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.knap98-controls {
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
  font-family: inherit;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.knap98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.knap98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  font-family: inherit;
  white-space: nowrap;
  cursor: pointer;
}

.knap98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.knap98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 236px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.knap98-toc {
  padding: 12px;
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.knap98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
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
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.knap98-section {
  margin: 0 0 20px;
}

.knap98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.knap98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.knap98-content p,
.knap98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.knap98-content p {
  margin: 0 0 10px;
}

.knap98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.knap98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.knap98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.knap98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
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

@media (max-width: 560px) {
  .knap98-titletext {
    font-size: 14px;
  }

  .knap98-content {
    padding: 12px 14px 16px;
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
    { id: 'bp-setup', label: 'Problem Setup' },
    { id: 'bp-variants', label: 'Variants' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-dp', label: 'DP State and Transition' },
    { id: 'core-greedy', label: 'Fractional Greedy' },
    { id: 'core-complexity', label: 'Complexity and Cost' },
    { id: 'core-correctness', label: 'Correctness Notes' },
    { id: 'core-bounds', label: 'Bounds and Insights' },
    { id: 'core-edge', label: 'Edge Cases' },
    { id: 'core-real-world', label: 'Real-World Connections' },
    { id: 'core-evaluate', label: 'Evaluation Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function KnapsackPage(): JSX.Element {
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
    document.title = `Knapsack (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Knapsack',
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
    <div className="knap98-page">
      <style>{knap98Styles}</style>
      <div className="knap98-window" role="presentation">
        <header className="knap98-titlebar">
          <span className="knap98-titletext">Knapsack</span>
          <div className="knap98-controls">
            <button className="knap98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="knap98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="knap98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`knap98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
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
            <h1 className="knap98-doc-title">Knapsack</h1>
            <p>
              The knapsack problem asks you to maximize value subject to a weight limit. It appears simple, but the 0/1 version is
              NP-complete and forces you to confront exponential search. Dynamic programming provides an exact solution when
              capacities are moderate, while greedy and approximation methods handle large instances.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="knap98-section">
                  <h2 className="knap98-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="knap98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="knap98-divider" />
                <section id="bp-history" className="knap98-section">
                  <h2 className="knap98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="knap98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="knap98-divider" />
                <section id="bp-setup" className="knap98-section">
                  <h2 className="knap98-heading">Problem Setup</h2>
                  {problemSetup.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="knap98-divider" />
                <section id="bp-variants" className="knap98-section">
                  <h2 className="knap98-heading">Knapsack Variants</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="knap98-divider" />
                <section id="bp-takeaways" className="knap98-section">
                  <h2 className="knap98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-models" className="knap98-section">
                  <h2 className="knap98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-dp" className="knap98-section">
                  <h2 className="knap98-heading">DP State and Transition</h2>
                  {dpState.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    The DP table stores the best value for each prefix of items and capacity. This guarantees optimality because each
                    decision, take or skip, only depends on smaller subproblems.
                  </p>
                </section>
                <section id="core-greedy" className="knap98-section">
                  <h2 className="knap98-heading">Fractional Greedy Strategy</h2>
                  {greedyFractional.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="knap98-section">
                  <h2 className="knap98-heading">Complexity and Cost</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="knap98-section">
                  <h2 className="knap98-heading">Correctness Notes</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-bounds" className="knap98-section">
                  <h2 className="knap98-heading">Bounds and Insights</h2>
                  {boundsAndInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-edge" className="knap98-section">
                  <h2 className="knap98-heading">Edge Cases</h2>
                  {edgeCases.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-real-world" className="knap98-section">
                  <h2 className="knap98-heading">Real-World Connections</h2>
                  {realWorldConnections.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-evaluate" className="knap98-section">
                  <h2 className="knap98-heading">How to Evaluate an Implementation</h2>
                  {evaluationChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="knap98-section">
                  <h2 className="knap98-heading">Common Pitfalls</h2>
                  <ul>
                    {commonPitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-worked" className="knap98-section">
                  <h2 className="knap98-heading">Worked Examples</h2>
                  {workedExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="knap98-subheading">{example.title}</h3>
                      <div className="knap98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-pseudocode" className="knap98-section">
                  <h2 className="knap98-heading">Pseudocode Reference</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="knap98-subheading">{example.title}</h3>
                      <div className="knap98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="knap98-section">
                <h2 className="knap98-heading">Glossary</h2>
                {quickGlossary.map((item) => (
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
