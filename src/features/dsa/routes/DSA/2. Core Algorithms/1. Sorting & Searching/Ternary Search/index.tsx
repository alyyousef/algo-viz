import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

const historicalMilestones = [
  {
    title: 'Tri-section ideas in numerical search',
    detail:
      'Numerical methods for unimodal optimization use interval shrinking. Ternary search is a simple discrete analog to these mid-20th century techniques.',
  },
  {
    title: 'Generalization of binary search',
    detail:
      'Ternary search extends binary search by probing two midpoints instead of one, shrinking the interval by discarding one of three regions.',
  },
  {
    title: 'Competitive programming staple',
    detail:
      'It is popular for problems that ask for a maximum or minimum of a unimodal function without derivatives.',
  },
  {
    title: 'Golden section refinements',
    detail:
      'More advanced methods like golden section search reduce repeated evaluations, but ternary search remains a clear conceptual baseline.',
  },
]

const mentalModels = [
  {
    title: 'Two scouts, three regions',
    detail:
      'You place two scouts at one-third and two-thirds. Their reports tell you which third to discard.',
  },
  {
    title: 'Shrinking a spotlight',
    detail:
      'You keep the region that could still contain the target or peak, narrowing the spotlight on the answer.',
  },
  {
    title: 'Binary search plus one extra probe',
    detail:
      'The extra probe trades more comparisons for a slightly smaller remaining interval each step.',
  },
]

const workflowSteps = [
  {
    title: 'Pick two midpoints',
    detail:
      'Compute m1 and m2 so they split the current range into thirds. Keep integer rounding consistent for arrays.',
  },
  {
    title: 'Evaluate or compare',
    detail:
      'For arrays, compare target to arr[m1] and arr[m2]. For unimodal functions, compare f(m1) and f(m2).',
  },
  {
    title: 'Discard one region',
    detail:
      'One of the three segments cannot contain the answer. Remove it and keep the other two thirds.',
  },
  {
    title: 'Repeat until small',
    detail:
      'Stop when the range is small enough, then finish with a linear scan or direct check.',
  },
]

const variants = [
  {
    title: 'Sorted array search',
    detail:
      'Use it like binary search but with two midpoints. It finds the index of a target value if it exists.',
  },
  {
    title: 'Unimodal optimization',
    detail:
      'Search for the maximum or minimum of a function that increases then decreases (or vice versa).',
  },
  {
    title: 'Discrete vs continuous',
    detail:
      'On integers, stop when the interval is small and scan. On reals, stop after fixed iterations or when precision is reached.',
  },
]

const complexityRows = [
  { label: 'Sorted array time', value: 'O(log n), but with more comparisons than binary search.' },
  { label: 'Unimodal function time', value: 'O(log n) iterations, two evaluations per step.' },
  { label: 'Extra space', value: 'O(1) iterative; O(log n) recursive stack.' },
]

const comparisonNotes = [
  {
    metric: 'Interval shrink',
    binary: 'Cuts range to 1/2',
    ternary: 'Cuts range to 2/3',
  },
  {
    metric: 'Comparisons per step',
    binary: '1 to 2',
    ternary: '2 to 4',
  },
  {
    metric: 'Typical use',
    binary: 'Sorted arrays',
    ternary: 'Unimodal peaks',
  },
]

const walkthroughSteps = [
  'Array: [2, 5, 8, 12, 16, 23, 38, 56], target = 23.',
  'm1 = index 2 (8), m2 = index 5 (23). Target equals arr[m2], so return index 5.',
  'If target were 12, it would lie between arr[m1] and arr[m2], so we would keep the middle third.',
  'Each step keeps only two thirds of the array, so the interval shrinks quickly.',
]

const examples = [
  {
    title: 'Ternary search on a sorted array',
    code: `function ternarySearch(arr, target):
    low = 0
    high = arr.length - 1
    while low <= high:
        m1 = low + Math.floor((high - low) / 3)
        m2 = high - Math.floor((high - low) / 3)
        if arr[m1] == target: return m1
        if arr[m2] == target: return m2
        if target < arr[m1]: high = m1 - 1
        else if target > arr[m2]: low = m2 + 1
        else:
            low = m1 + 1
            high = m2 - 1
    return -1`,
    explanation:
      'Two probes split the range into thirds. The target can only exist in one of the three segments.',
  },
  {
    title: 'Maximizing a unimodal function',
    code: `function ternarySearchMax(f, left, right, steps):
    for i in 0..steps:
        m1 = left + (right - left) / 3
        m2 = right - (right - left) / 3
        if f(m1) < f(m2): left = m1
        else: right = m2
    return (left + right) / 2`,
    explanation:
      'For a unimodal function, the higher of f(m1) and f(m2) tells you where the peak lies.',
  },
  {
    title: 'Finding the peak in a discrete array',
    code: `// Unimodal array (strictly up then down)
function peakIndex(arr):
    left = 0
    right = arr.length - 1
    while right - left > 3:
        m1 = left + Math.floor((right - left) / 3)
        m2 = right - Math.floor((right - left) / 3)
        if arr[m1] < arr[m2]: left = m1
        else: right = m2
    return indexOfMax(arr, left, right)`,
    explanation:
      'When the interval is small, a final scan is cheaper than more splits.',
  },
]

const realWorldUses = [
  {
    context: 'Latency tuning',
    detail:
      'Pick a configuration value that minimizes a latency curve that rises after a sweet spot.',
  },
  {
    context: 'Graphics and animation',
    detail:
      'Choose a parameter that maximizes a quality metric, such as smoothness or visibility, on a unimodal curve.',
  },
  {
    context: 'Signal processing',
    detail:
      'Find the peak frequency or best window size when the response curve is unimodal.',
  },
  {
    context: 'Game design balancing',
    detail:
      'Tune a value to maximize engagement or fairness when the score behaves like a single hill.',
  },
]

const pitfalls = [
  'Using ternary search on data that is not unimodal. It can converge to the wrong region.',
  'Expecting it to beat binary search on sorted arrays. It usually does more comparisons.',
  'Stopping too early for continuous search and returning low precision results.',
  'Rounding midpoints incorrectly on integers, which can lead to infinite loops.',
  'Recomputing f(m1) and f(m2) with expensive functions without caching.',
]

const decisionGuidance = [
  'Use it for unimodal functions when derivatives are unavailable or noisy.',
  'Use it for peak finding in unimodal arrays if you prefer a simple, robust method.',
  'Prefer binary search for plain sorted array lookup.',
  'Use golden section search when function evaluations are costly and you want fewer repeats.',
]

const advancedInsights = [
  {
    title: 'Golden section optimization',
    detail:
      'Golden section search reuses one evaluation per step, reducing cost when f(x) is expensive to compute.',
  },
  {
    title: 'Caching evaluations',
    detail:
      'If f(x) is expensive, cache f(m1) and f(m2). This is especially helpful if you shrink the interval slowly.',
  },
  {
    title: 'Convexity vs unimodality',
    detail:
      'A convex function has a single minimum. Ternary search works for convex or concave functions over a closed interval.',
  },
  {
    title: 'Discrete precision control',
    detail:
      'For integers, stop when the interval is smaller than a threshold and scan. This avoids off-by-one errors.',
  },
]

const takeaways = [
  'Ternary search shrinks an interval by comparing two midpoints and discarding one third.',
  'It is best for unimodal functions, not for basic sorted array lookup.',
  'It trades extra comparisons for a simple and reliable selection of the correct region.',
]

export default function TernarySearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Ternary Search</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Two midpoints, one discarded region, and fast convergence on unimodal peaks</div>
              <p className="win95-text">
                Ternary search splits a range into three segments using two midpoints and removes the segment that cannot contain the
                answer. It is most valuable when searching for the maximum or minimum of a unimodal function, where it converges
                quickly to the peak without requiring derivatives.
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
                Binary search asks one question and cuts the range in half. Ternary search asks two questions, keeps two thirds,
                and repeats. That tradeoff usually makes it worse for plain sorted arrays, but it shines for unimodal optimization,
                where comparisons are replaced by function evaluations.
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
            <legend>How it works: the ternary loop</legend>
            <div className="win95-grid win95-grid-2">
              {workflowSteps.map((step) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">{step.title}</div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Where it applies</legend>
            <div className="win95-grid win95-grid-3">
              {variants.map((item) => (
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
              {complexityRows.map((row) => (
                <div key={row.label} className="win95-panel">
                  <div className="win95-heading">{row.label}</div>
                  <p className="win95-text">{row.value}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                On sorted arrays, binary search is almost always better. Ternary search is a clean tool for unimodal optimization,
                where the cost is dominated by function evaluations rather than comparisons.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Binary vs ternary at a glance</legend>
            <table className="win95-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Binary</th>
                  <th>Ternary</th>
                </tr>
              </thead>
              <tbody>
                {comparisonNotes.map((row) => (
                  <tr key={row.metric}>
                    <td>{row.metric}</td>
                    <td>{row.binary}</td>
                    <td>{row.ternary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Walkthrough example</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {walkthroughSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
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
