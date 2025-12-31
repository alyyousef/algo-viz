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
    title: 'Hoare introduces partitioning (1961)',
    detail:
      'Quickselect grows out of the same partition routine as quicksort. The key leap is realizing you can stop early once the target index is isolated.',
  },
  {
    title: 'Order statistics become a focus (1960s)',
    detail:
      'Researchers formalize selection as finding the kth smallest element, a problem distinct from sorting because only one position must be correct.',
  },
  {
    title: 'Median of medians guarantees linear time (1973)',
    detail:
      'Blum, Floyd, Pratt, Rivest, and Tarjan propose a deterministic pivot strategy with provable O(n) worst case, at the cost of heavier constants.',
  },
  {
    title: 'Randomized quickselect becomes the default (1980s)',
    detail:
      'Random pivots make the worst case unlikely while keeping the code simple and in-place. This is the most common practical implementation.',
  },
]

const mentalModels = [
  {
    title: 'Zoom lens',
    detail:
      'Each partition splits the array into left and right regions. You keep only the side that could contain the answer, like zooming in on a map.',
  },
  {
    title: 'Tournament elimination',
    detail:
      'Partitioning eliminates elements that are definitely too small or too large. The pivot is a champion at its final rank, and many contenders are discarded.',
  },
  {
    title: 'Partial sorting',
    detail:
      'Quickselect gives you a single correctly placed element. Everything on the left is smaller, everything on the right is larger, but neither side is sorted.',
  },
]

const workflowSteps = [
  {
    title: 'Pick a pivot',
    detail:
      'Choose a pivot index using a strategy such as random choice, median of three, or median of medians. Pivot quality drives performance.',
  },
  {
    title: 'Partition in place',
    detail:
      'Rearrange values so that items less than the pivot are to the left and items greater than the pivot are to the right. The pivot ends at its final rank.',
  },
  {
    title: 'Compare k to the pivot rank',
    detail:
      'If k equals the pivot index, you are done. If k is smaller, repeat on the left slice. If k is larger, repeat on the right slice.',
  },
  {
    title: 'Repeat until the range collapses',
    detail:
      'The active range shrinks quickly on average. When low equals high, the remaining element is the answer.',
  },
]

const partitionSchemes = [
  {
    title: 'Lomuto partition',
    detail:
      'Simple to implement: move the pivot to the end, scan once, and swap elements into place. It tends to do more swaps.',
  },
  {
    title: 'Hoare partition',
    detail:
      'Two pointers move inward and swap out-of-place values. It typically performs fewer swaps but needs careful index handling.',
  },
  {
    title: 'Three-way partition',
    detail:
      'Splits into less than, equal to, and greater than pivot. This reduces recursion when many duplicates exist.',
  },
]

const complexityRows = [
  { label: 'Expected time', value: 'O(n) with a randomized or good pivot strategy.' },
  { label: 'Worst-case time', value: 'O(n^2) if pivots are consistently poor.' },
  { label: 'Extra space', value: 'O(1) in-place; O(log n) recursion stack on average.' },
]

const pivotStrategies = [
  {
    title: 'Random pivot',
    detail:
      'Random choice makes adversarial inputs unlikely and delivers expected linear time with minimal code.',
  },
  {
    title: 'Median of three',
    detail:
      'Use the median of low, mid, and high indices. It avoids extreme pivots on partially sorted data.',
  },
  {
    title: 'Median of medians',
    detail:
      'Deterministic pivot with worst-case linear time. Useful when guarantees matter more than constant factors.',
  },
  {
    title: 'Sampling',
    detail:
      'Pick a small sample and choose an approximate median. Improves stability for large arrays with little overhead.',
  },
]

const walkthroughSteps = [
  'Array: [9, 2, 7, 4, 1, 5, 8], k = 2 (0-based, third smallest).',
  'Pick pivot 4. Partition -> [2, 1, 4, 9, 7, 5, 8]. Pivot index is 2.',
  'k equals pivot index, so the answer is 4. Elements left of it are smaller; elements right are larger.',
  'If k had been 5, we would recurse into the right side only: [9, 7, 5, 8].',
]

const examples = [
  {
    title: 'Iterative quickselect (kth smallest, 0-based)',
    code: `function quickselect(arr, k):
    low = 0
    high = arr.length - 1
    while low <= high:
        pivotIndex = choosePivot(arr, low, high)
        pivotIndex = partition(arr, low, high, pivotIndex)
        if k == pivotIndex: return arr[k]
        if k < pivotIndex: high = pivotIndex - 1
        else: low = pivotIndex + 1
    return arr[low]`,
    explanation:
      'The key is that only one side can contain the kth element, so the other side is discarded each iteration.',
  },
  {
    title: 'Finding the median quickly',
    code: `// For n elements, the median is k = floor(n / 2)
median = quickselect(values, Math.floor(values.length / 2))`,
    explanation:
      'Median is a single order statistic. Quickselect finds it in expected linear time without sorting the full array.',
  },
  {
    title: 'Top-k largest using partition',
    code: `k = 10
index = values.length - k
threshold = quickselect(values, index)
topK = values.filter(v => v >= threshold)`,
    explanation:
      'Quickselect positions the kth largest threshold. You can then scan once to collect the top segment.',
  },
]

const realWorldUses = [
  {
    context: 'Analytics percentiles',
    detail:
      'Compute p50, p90, or p99 without sorting millions of points. This is common in latency and telemetry dashboards.',
  },
  {
    context: 'Scheduling and ranking',
    detail:
      'Find the kth earliest deadline or kth highest priority without ranking the entire queue.',
  },
  {
    context: 'Signal processing',
    detail:
      'Median filters select the middle value in a window to remove outliers. Quickselect is a building block for that selection.',
  },
  {
    context: 'Machine learning preprocessing',
    detail:
      'Select quantiles to bin or normalize features quickly, especially in large tabular datasets.',
  },
]

const pitfalls = [
  'Mixing 1-based and 0-based k. Always define whether k counts from 0 or 1.',
  'Assuming the array is sorted after quickselect. Only the pivot is in its final rank.',
  'Using a naive pivot on already ordered data, which can trigger worst-case O(n^2).',
  'Ignoring duplicate values when using Hoare partition. Use three-way partitioning to reduce work.',
  'Recursive implementations without depth limits can overflow the stack on adversarial inputs.',
]

const decisionGuidance = [
  'Need a single order statistic (median, kth smallest, percentile) and do not need full order.',
  'Need top-k elements quickly, then refine or sort just that subset.',
  'Have large arrays where O(n log n) sorting is too expensive for one query.',
  'Can tolerate randomized performance rather than worst-case guarantees.',
]

const advancedInsights = [
  {
    title: 'Deterministic selection',
    detail:
      'Median of medians splits into groups of five, selects a pivot from group medians, and guarantees a 30/70 split. It is linear time but has higher constants.',
  },
  {
    title: 'Selection in place',
    detail:
      'Quickselect is in-place, so it is ideal when memory is tight. If you must preserve the input order, copy first.',
  },
  {
    title: 'Multi-selection',
    detail:
      'If you need several order statistics, reuse partitions. Multi-select can find multiple k values faster than repeating selection from scratch.',
  },
  {
    title: 'Streaming alternatives',
    detail:
      'For streaming data, quickselect is not ideal. Use heaps or quantile sketches when the full array is not available.',
  },
]

const takeaways = [
  'Quickselect finds the kth smallest element by partitioning and discarding irrelevant regions.',
  'It is expected linear time, in-place, and simple, but worst-case can be quadratic without a good pivot strategy.',
  'It is the right tool when you only need one rank, not a fully sorted array.',
]

export default function QuickselectPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Quickselect</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Selection without full sorting for median, percentiles, and top-k</div>
              <p className="win95-text">
                Quickselect is the selection sibling of quicksort. It finds the kth smallest element by partitioning the array and
                discarding the half that cannot contain the answer. The result is an expected linear-time algorithm that is in-place
                and ideal when you only need one rank, not a fully sorted list.
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
                Sorting gives you every element in order, but selection only needs one. Quickselect uses the quicksort partition step
                to place a pivot at its final rank, then recurses into just the side that contains the target. On average it touches
                each element only a constant number of times, yielding O(n) expected time.
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
            <legend>How it works: the selection loop</legend>
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
            <legend>Partition strategies</legend>
            <div className="win95-grid win95-grid-3">
              {partitionSchemes.map((scheme) => (
                <div key={scheme.title} className="win95-panel">
                  <div className="win95-heading">{scheme.title}</div>
                  <p className="win95-text">{scheme.detail}</p>
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
                Quickselect is faster than sorting when you only need one rank. It gives you the element at position k and a loose
                partition around it, which is often exactly what analytics and filtering tasks need.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pivot choices and their impact</legend>
            <div className="win95-grid win95-grid-2">
              {pivotStrategies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
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
