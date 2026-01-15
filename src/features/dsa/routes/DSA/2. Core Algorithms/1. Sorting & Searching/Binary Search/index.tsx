import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const historicalNotes = [
  {
    title: 'Binary search appears in early libraries (1940s-1950s)',
    detail:
      'Early computing textbooks and libraries adopted binary search as the canonical fast lookup on sorted data.',
  },
  {
    title: 'Knuth documents the edge cases (1973)',
    detail:
      'The Art of Computer Programming highlighted common bugs and off-by-one errors, cementing binary search as a teaching staple.',
  },
  {
    title: 'Modern usage: search on monotone predicates',
    detail:
      'Binary search expanded beyond arrays to solve optimization problems by searching for the smallest feasible answer.',
  },
]

const mentalModels = [
  {
    title: 'Twenty questions',
    detail:
      'Each comparison halves the remaining search space. Log2(n) questions isolate the target.',
  },
  {
    title: 'Monotone gate',
    detail:
      'Binary search works whenever a predicate flips from false to true exactly once.',
  },
  {
    title: 'Fence posts',
    detail:
      'Think in terms of boundaries: find the first index where the condition becomes true.',
  },
]

const terminology = [
  {
    term: 'Lower bound',
    detail:
      'First index i where a[i] >= target (or predicate becomes true).',
  },
  {
    term: 'Upper bound',
    detail:
      'First index i where a[i] > target; last equal is upper-1.',
  },
  {
    term: 'Invariant',
    detail:
      'A property maintained each loop, e.g. target is in [lo, hi].',
  },
  {
    term: 'Monotone predicate',
    detail:
      'A boolean function that is false then true as input increases.',
  },
  {
    term: 'Feasible region',
    detail:
      'The set of inputs where the predicate is true; binary search finds its boundary.',
  },
]

const mechanics = [
  {
    heading: 'Classic array search',
    bullets: [
      'Require a sorted array or list by the same comparator.',
      'Maintain a search interval [lo, hi] and shrink it each step.',
      'Compare mid with target, discard the half that cannot contain the answer.',
    ],
  },
  {
    heading: 'Boundary search',
    bullets: [
      'Lower bound finds the first index that meets a condition.',
      'Upper bound finds the first index that exceeds a condition.',
      'Use [lo, hi) half-open intervals to avoid infinite loops.',
    ],
  },
  {
    heading: 'Search on answer',
    bullets: [
      'Binary search over a numeric range when a feasibility test is monotone.',
      'Common in capacity, time, and optimization problems.',
      'Feasibility function should be O(n) or better to keep total cost low.',
    ],
  },
]

const stepByStep = [
  {
    title: 'Pick an invariant',
    detail:
      'Decide whether the answer is always in [lo, hi] or [lo, hi). Stick to it.',
  },
  {
    title: 'Compute mid safely',
    detail:
      'Use mid = lo + (hi - lo) // 2 to prevent overflow.',
  },
  {
    title: 'Shrink the interval',
    detail:
      'If mid is too small, move lo up. If mid is large enough, move hi down.',
  },
  {
    title: 'Terminate correctly',
    detail:
      'Stop when lo meets hi (for boundaries) or when lo > hi (for exact search).',
  },
]

const invariants = [
  {
    title: 'Sorted input',
    detail:
      'Binary search assumes the data is sorted under the same comparator used for searching.',
  },
  {
    title: 'Shrinking interval',
    detail:
      'Each iteration must strictly reduce the search space to guarantee termination.',
  },
  {
    title: 'Consistent bounds',
    detail:
      'Choose [lo, hi] or [lo, hi) and stick with it to avoid off-by-one bugs.',
  },
]

const alternatives = [
  {
    title: 'Linear search',
    detail:
      'O(n) time but works on unsorted data and has lower constant overhead.',
  },
  {
    title: 'Hash tables',
    detail:
      'Average O(1) lookup on unordered data; no ordering or range queries.',
  },
  {
    title: 'Balanced BSTs',
    detail:
      'O(log n) lookup with dynamic inserts/deletes and ordered iteration.',
  },
  {
    title: 'Interpolation search',
    detail:
      'Faster on uniformly distributed data but can degrade to O(n).',
  },
  {
    title: 'Exponential search',
    detail:
      'Find a range quickly then binary search inside; great for unbounded arrays.',
  },
  {
    title: 'Ternary search',
    detail:
      'For unimodal functions, not for sorted discrete arrays.',
  },
]

const comparisonGrid = [
  {
    feature: 'Requires sorted data',
    binary: 'Yes',
    linear: 'No',
    hash: 'No',
    bst: 'No (keeps sorted internally)',
  },
  {
    feature: 'Time (lookup)',
    binary: 'O(log n)',
    linear: 'O(n)',
    hash: 'O(1) avg',
    bst: 'O(log n)',
  },
  {
    feature: 'Supports range queries',
    binary: 'Yes (with sorted array)',
    linear: 'Slow',
    hash: 'No',
    bst: 'Yes',
  },
  {
    feature: 'Handles updates well',
    binary: 'Costly (array insert/delete)',
    linear: 'Costly',
    hash: 'Good',
    bst: 'Good',
  },
]

const numericBinarySearchNotes = [
  {
    title: 'Discrete vs continuous',
    detail:
      'For integers, stop at lo == hi. For doubles, iterate until epsilon.',
  },
  {
    title: 'Predicate costs',
    detail:
      'If predicate is O(n), the total cost is O(n log range).',
  },
  {
    title: 'Upper bounds',
    detail:
      'Pick a safe high bound or expand exponentially until feasible.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'O(log n) comparisons. For a million items, about 20 steps.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(1) for iterative search. Recursive versions use O(log n) call stack.',
  },
  {
    title: 'Constant factors',
    detail:
      'Branch prediction and cache behavior matter. Iterative loops are usually faster.',
  },
]

const useCases = [
  {
    context: 'Lookup in sorted arrays',
    detail:
      'Fast membership checks, index lookup, or position for insertion.',
  },
  {
    context: 'First/last occurrence',
    detail:
      'Find boundaries for duplicates or counts in a sorted list.',
  },
  {
    context: 'Search on answer',
    detail:
      'Minimize capacity, time, or threshold with a monotone predicate.',
  },
  {
    context: 'Database indexing',
    detail:
      'B-trees and sorted pages use binary search internally for key lookup.',
  },
  {
    context: 'Numeric root finding',
    detail:
      'Binary search on a monotone function to find thresholds or breakpoints.',
  },
]

const bestPractices = [
  'Use half-open intervals [lo, hi) for boundary searches.',
  'Always test with duplicates for lower/upper bound correctness.',
  'Document the predicate and prove monotonicity for search-on-answer.',
  'Prefer iterative loops to avoid recursion overhead.',
  'Keep comparator consistent with sorting order.',
]

const examples = [
  {
    title: 'Classic iterative binary search',
    code: `function binarySearch(arr, target):
    lo = 0
    hi = arr.length - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target: return mid
        if arr[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1`,
    explanation:
      'Use lo + (hi - lo) / 2 to avoid overflow in languages with fixed int sizes.',
  },
  {
    title: 'Lower bound (first >= target)',
    code: `function lowerBound(arr, target):
    lo = 0
    hi = arr.length  // half-open [lo, hi)
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
    explanation:
      'Lower bound returns arr.length if no element is >= target.',
  },
  {
    title: 'Binary search on answer (capacity check)',
    code: `// Find minimal capacity so that tasks fit in at most D days
function canFinish(capacity):
    days = 1
    load = 0
    for t in tasks:
        if load + t > capacity:
            days += 1
            load = 0
        load += t
    return days <= D

lo = max(tasks)
hi = sum(tasks)
while lo < hi:
    mid = lo + (hi - lo) // 2
    if canFinish(mid): hi = mid
    else: lo = mid + 1
answer = lo`,
    explanation:
      'Feasibility is monotone: if capacity works, any larger capacity also works.',
  },
  {
    title: 'Search in a rotated sorted array',
    code: `function searchRotated(arr, target):
    lo = 0
    hi = arr.length - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target: return mid
        if arr[lo] <= arr[mid]: // left sorted
            if arr[lo] <= target && target < arr[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else: // right sorted
            if arr[mid] < target && target <= arr[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1`,
    explanation:
      'At least one side of the array is sorted. Use it to decide which half to discard.',
  },
  {
    title: 'Upper bound (first > target)',
    code: `function upperBound(arr, target):
    lo = 0
    hi = arr.length
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] <= target:
            lo = mid + 1
        else:
            hi = mid
    return lo`,
    explanation:
      'Use upperBound to count occurrences: count = upperBound - lowerBound.',
  },
  {
    title: 'Binary search on real numbers',
    code: `function binarySearchReal(lo, hi, epsilon):
    for iter in 1..60:  // sufficient for double precision
        mid = (lo + hi) / 2.0
        if predicate(mid): hi = mid
        else: lo = mid
    return hi`,
    explanation:
      'Stop after a fixed number of iterations or when hi - lo <= epsilon.',
  },
]

const pitfalls = [
  'Searching an unsorted array returns nonsense; always verify ordering.',
  'Off-by-one errors with inclusive vs exclusive bounds cause infinite loops.',
  'Using mid = (lo + hi) / 2 can overflow in fixed-width integers.',
  'Lower/upper bound logic is easy to swap; write tests for duplicates.',
  'Binary search on answer fails if the predicate is not monotone.',
]

const testingChecklist = [
  'Empty array, one element, and two-element arrays.',
  'Target present at ends and not present at all.',
  'Arrays with duplicates for lower/upper bound.',
  'Large arrays to verify no overflow in mid calculation.',
  'Monotone predicate tests for binary search on answer.',
]

const decisionGuidance = [
  'Need fast lookup in sorted data: use binary search.',
  'Need first/last occurrence: use lower/upper bound variants.',
  'Need to optimize a threshold with a monotone test: binary search on answer.',
  'Need prefix queries with updates: prefer Fenwick or segment trees.',
  'Need unordered membership: a hash table is simpler.',
  'Need ordered structure with updates: prefer balanced trees over arrays + binary search.',
]

const advancedInsights = [
  {
    title: 'Binary search as a template',
    detail:
      'Frame problems as: find smallest x such that predicate(x) is true.',
  },
  {
    title: 'Invariant-first reasoning',
    detail:
      'Write invariants before coding; they prevent off-by-one bugs.',
  },
  {
    title: 'Floating-point search',
    detail:
      'Binary search works on real numbers by stopping after fixed iterations or a tolerance.',
  },
  {
    title: 'Custom comparators',
    detail:
      'Sorted order must match the comparator used in search; stable, deterministic comparisons are essential.',
  },
  {
    title: 'Binary search on bitmasks',
    detail:
      'Use binary lifting when searching for the first index where a prefix condition holds.',
  },
  {
    title: 'Branchless binary search',
    detail:
      'Some low-level implementations reduce branch mispredictions at the cost of complexity.',
  },
]

const takeaways = [
  'Binary search cuts the search space in half each step for O(log n) time.',
  'Correctness depends on sorted data and consistent interval boundaries.',
  'Lower and upper bounds are the most useful real-world variants.',
  'Binary search on answer generalizes the technique to optimization problems.',
  'Write tests for boundaries and duplicates to avoid classic pitfalls.',
]

export default function BinarySearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Binary Search</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Fast lookup by halving the search space</div>
              <p className="win95-text">
                Binary search is the standard way to locate values in sorted data and to solve problems with monotone
                predicates. It repeatedly halves the remaining interval, giving O(log n) time with tiny constants. The
                trick is managing boundaries and invariants to avoid off-by-one errors.
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
                Binary search turns ordering into speed. With a sorted list, you can rule out half the elements on every
                comparison. The same idea applies to any monotone condition: if a test is false before some point and true
                after, binary search finds the boundary quickly.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-3">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Terminology and invariants</legend>
            <div className="win95-grid win95-grid-2">
              {terminology.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-grid win95-grid-2">
              {invariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Step-by-step technique</legend>
            <div className="win95-grid win95-grid-2">
              {stepByStep.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
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
            <legend>Binary search vs alternatives</legend>
            <div className="win95-grid win95-grid-2">
              {alternatives.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Binary search</th>
                    <th>Linear search</th>
                    <th>Hash table</th>
                    <th>Balanced BST</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonGrid.map((row) => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td>{row.binary}</td>
                      <td>{row.linear}</td>
                      <td>{row.hash}</td>
                      <td>{row.bst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Binary search on answer: technique notes</legend>
            <div className="win95-grid win95-grid-2">
              {numericBinarySearchNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {useCases.map((item) => (
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
            <legend>Best practices</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {bestPractices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Testing checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {testingChecklist.map((item) => (
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
