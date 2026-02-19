import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const quickselectGlossary = [
  {
    term: 'Order statistic',
    definition: 'The element at rank k in sorted order, such as minimum, median, or kth largest.',
  },
  {
    term: 'Quickselect',
    definition: 'A partition-based selection algorithm that finds one rank without fully sorting the array.',
  },
  {
    term: 'Pivot',
    definition: 'A selected value used to split elements into lower and higher regions during partitioning.',
  },
  {
    term: 'Partition',
    definition: 'Rearrangement step that places values relative to a pivot and fixes the pivot rank.',
  },
  {
    term: 'Introselect',
    definition: 'Hybrid quickselect that falls back to deterministic selection when recursion gets too deep.',
  },
  {
    term: 'Median of medians',
    definition: 'Deterministic pivot method with guaranteed linear-time worst-case selection.',
  },
  {
    term: 'Three-way partition',
    definition: 'Partitioning into less-than, equal-to, and greater-than pivot regions for duplicate-heavy input.',
  },
  {
    term: 'Kth largest conversion',
    definition: 'Map kth largest to index n-k in 0-based kth-smallest form.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
    { id: 'bp-mental-models', label: 'Mental Models' },
    { id: 'bp-patterns', label: 'Problem Patterns' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-workflow', label: 'Selection Workflow' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-partition', label: 'Partition Strategies' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-pivots', label: 'Pivot Strategies' },
    { id: 'core-sensitivity', label: 'Input Sensitivity' },
    { id: 'core-performance', label: 'Performance Profile' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-variants', label: 'Variants and Tweaks' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-implementation', label: 'Implementation Tips' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-trace', label: 'Walkthrough Example' },
    { id: 'ex-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const qselect98HelpStyles = `
.qselect98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.qselect98-window {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.qselect98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.qselect98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.qselect98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.qselect98-control {
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

.qselect98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.qselect98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.qselect98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.qselect98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.qselect98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.qselect98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.qselect98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.qselect98-toc-list li {
  margin: 0 0 8px;
}

.qselect98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.qselect98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.qselect98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.qselect98-section {
  margin: 0 0 20px;
}

.qselect98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.qselect98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.qselect98-content p,
.qselect98-content li,
.qselect98-content td,
.qselect98-content th {
  font-size: 12px;
  line-height: 1.5;
}

.qselect98-content p {
  margin: 0 0 10px;
}

.qselect98-content ul,
.qselect98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.qselect98-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 10px;
}

.qselect98-content th,
.qselect98-content td {
  border: 1px solid #808080;
  padding: 4px 6px;
  text-align: left;
}

.qselect98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.qselect98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.qselect98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .qselect98-main {
    grid-template-columns: 1fr;
  }

  .qselect98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

export default function QuickselectPage(): JSX.Element {
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
    document.title = `Quickselect (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Quickselect',
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
    <div className="qselect98-page">
      <style>{qselect98HelpStyles}</style>
      <div className="qselect98-window" role="presentation">
        <header className="qselect98-titlebar">
          <span className="qselect98-title-text">Quickselect - Help</span>
          <div className="qselect98-title-controls">
            <button className="qselect98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="qselect98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="qselect98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`qselect98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="qselect98-main">
          <aside className="qselect98-toc" aria-label="Table of contents">
            <h2 className="qselect98-toc-title">Contents</h2>
            <ul className="qselect98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="qselect98-content">
            <h1 className="qselect98-doc-title">Quickselect</h1>
            <p>
              Quickselect is the selection sibling of quicksort. It finds the kth smallest element by partitioning the array and
              discarding the half that cannot contain the answer. The result is an expected linear-time algorithm that is in-place
              and ideal when you only need one rank, not a fully sorted list.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="qselect98-section">
                  <h2 className="qselect98-heading">Overview</h2>
                  <p>
                    Sorting gives you every element in order, but selection only needs one. Quickselect uses the quicksort partition
                    step to place a pivot at its final rank, then recurses into just the side that contains the target. On average
                    it touches each element only a constant number of times, yielding O(n) expected time.
                  </p>
                </section>
                <hr className="qselect98-divider" />
                <section id="bp-history" className="qselect98-section">
                  <h2 className="qselect98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-mental-models" className="qselect98-section">
                  <h2 className="qselect98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-patterns" className="qselect98-section">
                  <h2 className="qselect98-heading">Problem Patterns</h2>
                  {problemPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="qselect98-section">
                  <h2 className="qselect98-heading">Key Takeaways</h2>
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
                <section id="core-workflow" className="qselect98-section">
                  <h2 className="qselect98-heading">Selection Workflow</h2>
                  {workflowSteps.map((step) => (
                    <p key={step.title}>
                      <strong>{step.title}:</strong> {step.detail}
                    </p>
                  ))}
                </section>
                <section id="core-invariants" className="qselect98-section">
                  <h2 className="qselect98-heading">Loop Invariants</h2>
                  {loopInvariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-partition" className="qselect98-section">
                  <h2 className="qselect98-heading">Partition Strategies</h2>
                  {partitionSchemes.map((scheme) => (
                    <p key={scheme.title}>
                      <strong>{scheme.title}:</strong> {scheme.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="qselect98-section">
                  <h2 className="qselect98-heading">Complexity and Tradeoffs</h2>
                  {complexityRows.map((row) => (
                    <p key={row.label}>
                      <strong>{row.label}:</strong> {row.value}
                    </p>
                  ))}
                  <p>
                    Quickselect is faster than sorting when you only need one rank. It gives you the element at position k and a
                    loose partition around it, which is often exactly what analytics and filtering tasks need.
                  </p>
                </section>
                <section id="core-pivots" className="qselect98-section">
                  <h2 className="qselect98-heading">Pivot Strategies</h2>
                  {pivotStrategies.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-sensitivity" className="qselect98-section">
                  <h2 className="qselect98-heading">Input Sensitivity</h2>
                  {inputSensitivity.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="qselect98-section">
                  <h2 className="qselect98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="qselect98-section">
                  <h2 className="qselect98-heading">Compare and Contrast</h2>
                  <table>
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
                </section>
                <section id="core-applications" className="qselect98-section">
                  <h2 className="qselect98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="qselect98-section">
                  <h2 className="qselect98-heading">Variants and Tweaks</h2>
                  {variantsAndTweaks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="qselect98-section">
                  <h2 className="qselect98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-implementation" className="qselect98-section">
                  <h2 className="qselect98-heading">Implementation Tips</h2>
                  {implementationTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decisions" className="qselect98-section">
                  <h2 className="qselect98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="qselect98-section">
                  <h2 className="qselect98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-trace" className="qselect98-section">
                  <h2 className="qselect98-heading">Walkthrough Example</h2>
                  {stepTrace.map((item) => (
                    <div key={item.step}>
                      <h3 className="qselect98-subheading">{item.step}</h3>
                      <p>{item.state}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-code" className="qselect98-section">
                  <h2 className="qselect98-heading">Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="qselect98-subheading">{example.title}</h3>
                      <div className="qselect98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="qselect98-section">
                <h2 className="qselect98-heading">Glossary</h2>
                {quickselectGlossary.map((item) => (
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

