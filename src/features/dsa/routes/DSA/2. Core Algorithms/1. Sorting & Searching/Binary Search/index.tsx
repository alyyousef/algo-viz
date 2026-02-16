import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-technique', label: 'Mechanics and Steps' },
    { id: 'core-terminology', label: 'Terminology and Invariants' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-notes', label: 'Search-on-Answer Notes' },
    { id: 'core-alternatives', label: 'Alternatives and Comparison' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-pitfalls', label: 'Pitfalls and Testing' },
    { id: 'core-usage', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const binary98HelpStyles = `
.bin98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.bin98-window {
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

.bin98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.bin98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.bin98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.bin98-control {
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
  cursor: pointer;
}

.bin98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.bin98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.bin98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.bin98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.bin98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.bin98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.bin98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bin98-toc-list li {
  margin: 0 0 8px;
}

.bin98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.bin98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.bin98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.bin98-section {
  margin: 0 0 20px;
}

.bin98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.bin98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.bin98-content p,
.bin98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.bin98-content p {
  margin: 0 0 10px;
}

.bin98-content ul,
.bin98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.bin98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.bin98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
  overflow-x: auto;
}

.bin98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .bin98-main {
    grid-template-columns: 1fr;
  }

  .bin98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

export default function BinarySearchPage(): JSX.Element {
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
    document.title = `Binary Search (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Binary Search',
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
    <div className="bin98-help-page">
      <style>{binary98HelpStyles}</style>
      <div className="bin98-window" role="presentation">
        <header className="bin98-titlebar">
          <span className="bin98-title-text">Binary Search</span>
          <div className="bin98-title-controls">
            <button className="bin98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="bin98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="bin98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`bin98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bin98-main">
          <aside className="bin98-toc" aria-label="Table of contents">
            <h2 className="bin98-toc-title">Contents</h2>
            <ul className="bin98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="bin98-content">
            <h1 className="bin98-doc-title">Binary Search</h1>
            <p>
              Binary search is the standard way to locate values in sorted data and to solve problems with monotone predicates. It
              repeatedly halves the remaining interval, giving O(log n) time with tiny constants. The trick is managing boundaries
              and invariants to avoid off-by-one errors.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="bin98-section">
                  <h2 className="bin98-heading">Overview</h2>
                  <p>
                    Binary search turns ordering into speed. With a sorted list, you can rule out half the elements on every
                    comparison.
                  </p>
                  <p>
                    The same idea applies to any monotone condition: if a test is false before some point and true after, binary
                    search finds the boundary quickly.
                  </p>
                </section>
                <hr className="bin98-divider" />
                <section id="bp-history" className="bin98-section">
                  <h2 className="bin98-heading">Historical Context</h2>
                  {historicalNotes.map((item) => (
                    <div key={item.title}>
                      <h3 className="bin98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
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
                <section id="core-models" className="bin98-section">
                  <h2 className="bin98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-technique" className="bin98-section">
                  <h2 className="bin98-heading">Mechanics and Step-by-Step Technique</h2>
                  {mechanics.map((item) => (
                    <div key={item.heading}>
                      <h3 className="bin98-subheading">{item.heading}</h3>
                      <ul>
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {stepByStep.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-terminology" className="bin98-section">
                  <h2 className="bin98-heading">Terminology and Invariants</h2>
                  {terminology.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.detail}
                    </p>
                  ))}
                  {invariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="bin98-section">
                  <h2 className="bin98-heading">Complexity</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-notes" className="bin98-section">
                  <h2 className="bin98-heading">Search-on-Answer Notes</h2>
                  {numericBinarySearchNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-alternatives" className="bin98-section">
                  <h2 className="bin98-heading">Alternatives and Comparison</h2>
                  {alternatives.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="bin98-subheading">Comparison Snapshot</h3>
                  {comparisonGrid.map((row) => (
                    <p key={row.feature}>
                      <strong>{row.feature}:</strong> Binary Search {row.binary}; Linear Search {row.linear}; Hash Table{' '}
                      {row.hash}; Balanced BST {row.bst}.
                    </p>
                  ))}
                </section>

                <section id="core-applications" className="bin98-section">
                  <h2 className="bin98-heading">Real-World Applications</h2>
                  {useCases.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="bin98-section">
                  <h2 className="bin98-heading">Common Pitfalls, Best Practices, and Testing</h2>
                  <h3 className="bin98-subheading">Pitfalls</h3>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3 className="bin98-subheading">Best Practices</h3>
                  <ul>
                    {bestPractices.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3 className="bin98-subheading">Testing Checklist</h3>
                  <ul>
                    {testingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-usage" className="bin98-section">
                  <h2 className="bin98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="bin98-section">
                  <h2 className="bin98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
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
                {terminology.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.detail}
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
