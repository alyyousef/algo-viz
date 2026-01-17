import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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
  {
    title: 'Threshold finding',
    detail:
      'Imagine drawing a cutoff line: values below go left, values above go right. Quickselect finds the exact cutoff value for top-k or percentile queries.',
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
  {
    title: 'Stop early',
    detail:
      'Unlike quicksort, quickselect never explores both sides. The discarded side is already known to be too small or too large.',
  },
]

const problemPatterns = [
  {
    title: 'Order statistics',
    detail:
      'Find the kth smallest, median, or percentile without sorting everything.',
  },
  {
    title: 'Top-k thresholding',
    detail:
      'Find a cutoff value so you can filter the largest k items in one extra scan.',
  },
  {
    title: 'Large arrays, single query',
    detail:
      'When you only need one rank, O(n log n) sorting is wasted work.',
  },
  {
    title: 'Memory-sensitive pipelines',
    detail:
      'Quickselect is in-place with minimal extra memory, making it friendly for large arrays.',
  },
  {
    title: 'Not stable ordering',
    detail:
      'If you need stable or fully sorted output, quickselect is the wrong tool.',
  },
]

const loopInvariants = [
  {
    title: 'Partition invariant',
    detail:
      'After partitioning, every element left of the pivot is <= pivot and every element right is >= pivot (strictness depends on the scheme).',
  },
  {
    title: 'Rank invariant',
    detail:
      'The pivot index equals the number of elements <= pivot in the active range, so it is in its final rank.',
  },
  {
    title: 'Search space invariant',
    detail:
      'The kth element always lies within the current [low, high] range. Discarded regions can never contain it.',
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
  {
    title: 'Stable partition (rare)',
    detail:
      'Stable partitioning keeps equal elements in order, but usually needs extra space and is not typical for quickselect.',
  },
]

const complexityRows = [
  { label: 'Expected time', value: 'O(n) with a randomized or good pivot strategy.' },
  { label: 'Worst-case time', value: 'O(n^2) if pivots are consistently poor.' },
  { label: 'Extra space', value: 'O(1) in-place; O(log n) recursion stack on average (or O(1) iterative).' },
  { label: 'Comparisons (avg)', value: 'About 2n comparisons on average with random pivots, less than sorting.' },
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
  {
    title: 'Introselect',
    detail:
      'Track recursion depth and fall back to deterministic selection when depth is too high. Keeps practical speed with worst-case guarantees.',
  },
]

const stepTrace = [
  {
    step: 'Choose a target',
    state: 'Array: [9, 2, 7, 4, 1, 5, 8], k = 2 (0-based)',
    note: 'We want the third smallest element.',
  },
  {
    step: 'Partition',
    state: 'Pivot = 4, array -> [2, 1, 4, 9, 7, 5, 8]',
    note: 'Pivot index is 2; everything left is smaller, right is larger.',
  },
  {
    step: 'Match k',
    state: 'k = 2 equals pivot index',
    note: 'Answer is 4; no further recursion needed.',
  },
  {
    step: 'Alternate path',
    state: 'If k = 5, recurse right on [9, 7, 5, 8]',
    note: 'Only the right side can contain the kth element.',
  },
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
  {
    title: 'Kth largest directly',
    code: `// kth largest => convert to index for kth smallest
index = values.length - 1 - (k - 1)
kthLargest = quickselect(values, index)`,
    explanation:
      'Converting kth largest to a smallest-index avoids rewriting the algorithm.',
  },
  {
    title: 'Multi-select (reuse partitions)',
    code: `// find k1 and k2 in one pass
function multiselect(arr, ks):
    worklist = [[0, arr.length - 1, ks]]
    while worklist not empty:
        [lo, hi, targets] = pop(worklist)
        if targets empty: continue
        pivot = partition(arr, lo, hi, choosePivot(arr, lo, hi))
        left = targets.filter(k => k < pivot)
        right = targets.filter(k => k > pivot)
        if left not empty: push([lo, pivot - 1, left])
        if right not empty: push([pivot + 1, hi, right])`,
    explanation:
      'When you need several order statistics, reuse partitions instead of running quickselect repeatedly.',
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
  'Forgetting that quickselect mutates the array. Clone if you need the original order preserved.',
]

const decisionGuidance = [
  'Need a single order statistic (median, kth smallest, percentile) and do not need full order.',
  'Need top-k elements quickly, then refine or sort just that subset.',
  'Have large arrays where O(n log n) sorting is too expensive for one query.',
  'Can tolerate randomized performance rather than worst-case guarantees.',
  'Want a simple in-place solution over a more complex heap-based alternative.',
]

const inputSensitivity = [
  {
    title: 'Already sorted input',
    detail:
      'Naive pivots cause worst-case behavior. Randomized or median-of-three pivots stabilize performance.',
  },
  {
    title: 'Reverse sorted input',
    detail:
      'Same pathology as sorted data; use randomized or sampled pivots.',
  },
  {
    title: 'Many duplicates',
    detail:
      'Two-way partitioning can stall. Three-way partitioning shrinks the problem quickly.',
  },
  {
    title: 'Adversarial inputs',
    detail:
      'Deterministic pivots can be attacked. Randomization or introselect guards against this.',
  },
]

const performanceProfile = [
  {
    title: 'Average case',
    detail:
      'Expected linear time and low constant factors make quickselect excellent for one-off rank queries.',
  },
  {
    title: 'Worst case',
    detail:
      'Bad pivot choices can degrade to O(n^2). Guard with randomization or deterministic selection.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Partitioning is a sequential scan, which is cache-friendly compared with heap-based selection.',
  },
  {
    title: 'Mutation cost',
    detail:
      'In-place partitioning scrambles order. Copy if you need to preserve input order.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Quickselect',
    time: 'O(n) avg',
    space: 'O(1)',
    stable: 'No',
    notes: 'Best for single order statistic; mutates input.',
  },
  {
    algorithm: 'Full sort',
    time: 'O(n log n)',
    space: 'Varies',
    stable: 'Maybe',
    notes: 'Needed only if you require full ordering.',
  },
  {
    algorithm: 'Heap selection',
    time: 'O(n log k)',
    space: 'O(k)',
    stable: 'No',
    notes: 'Good for streaming top-k with limited memory.',
  },
  {
    algorithm: 'Median of medians',
    time: 'O(n)',
    space: 'O(1)',
    stable: 'No',
    notes: 'Guaranteed linear time with higher constants.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Three-way quickselect',
    detail:
      'Partition into <, =, > pivot so duplicates collapse into one band, reducing work.',
  },
  {
    title: 'Iterative implementation',
    detail:
      'Replace recursion with a loop for predictable stack usage and easy instrumentation.',
  },
  {
    title: 'Introselect hybrid',
    detail:
      'Randomized selection with a depth limit that falls back to deterministic selection.',
  },
  {
    title: 'Parallel selection (advanced)',
    detail:
      'Partitioning can be parallelized for large arrays, but overhead often dominates on small inputs.',
  },
]

const implementationTips = [
  {
    title: 'Define k clearly',
    detail:
      'Decide 0-based vs 1-based and stick to it. Document the conversion for kth largest.',
  },
  {
    title: 'Use a robust pivot',
    detail:
      'Random or median-of-three pivots prevent bad behavior on ordered inputs.',
  },
  {
    title: 'Prefer three-way partition with duplicates',
    detail:
      'If many equal keys are expected, a Dutch-flag partition reduces recursion.',
  },
  {
    title: 'Avoid recursion overflow',
    detail:
      'Iterative quickselect is simple and avoids call stack limits.',
  },
  {
    title: 'Preserve input when needed',
    detail:
      'Quickselect mutates the array. Clone first if you need the original order intact.',
  },
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
  {
    title: 'Selection as a building block',
    detail:
      'Quickselect powers percentile cutoffs, robust statistics, and approximate clustering where full sorting is unnecessary.',
  },
]

const takeaways = [
  'Quickselect finds the kth smallest element by partitioning and discarding irrelevant regions.',
  'It is expected linear time, in-place, and simple, but worst-case can be quadratic without a good pivot strategy.',
  'It is the right tool when you only need one rank, not a fully sorted array.',
  'Random pivots or introselect guard against adversarial inputs.',
  'References: Hoare 1961, CLRS Chapter 9, and Blum-Floyd-Pratt-Rivest-Tarjan for median-of-medians.',
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
            <legend>How to think about similar problems</legend>
            <div className="win95-grid win95-grid-3">
              {problemPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Loop invariants (why it is correct)</legend>
            <div className="win95-grid win95-grid-3">
              {loopInvariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <div className="win95-stack">
              {stepTrace.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <pre className="win95-code">
                    <code>{item.state}</code>
                  </pre>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Input sensitivity</legend>
            <div className="win95-grid win95-grid-2">
              {inputSensitivity.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance profile</legend>
            <div className="win95-grid win95-grid-2">
              {performanceProfile.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and contrast</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Stable?</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.algorithm}>
                      <td>{row.algorithm}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.stable}</td>
                      <td>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <legend>Variants and performance tweaks</legend>
            <div className="win95-grid win95-grid-2">
              {variantsAndTweaks.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
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
            <legend>Implementation tips</legend>
            <div className="win95-grid win95-grid-2">
              {implementationTips.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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

