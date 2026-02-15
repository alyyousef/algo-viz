import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Fenwick publishes the Binary Indexed Tree (1994)',
    detail:
      'Peter Fenwick introduced a cache-friendly structure that stores cumulative frequencies with simple bit operations, replacing heavier segment trees for prefix sums.',
  },
  {
    title: 'Competitive programming adoption (late 1990s)',
    detail:
      'Fenwick trees became the default tool for inversion counts, order statistics, and dynamic prefix sums because of tiny code and low constants.',
  },
  {
    title: 'Database and systems use (2000s)',
    detail:
      'Indexing and telemetry pipelines adopted Fenwick-like prefix structures to keep rolling counts and percentiles fast under continuous updates.',
  },
  {
    title: 'Multi-dimensional variants mature (2010s)',
    detail:
      '2D and 3D Fenwick trees proved practical for grids, heatmaps, and real-time analytics where O(log^d n) updates beat full recomputation.',
  },
]

const mentalModels = [
  {
    title: 'Binary buckets',
    detail:
      'Each index stores a bucket of size lowbit(i). Buckets overlap in a controlled way so every prefix is the sum of a few buckets.',
  },
  {
    title: 'Staircase walk',
    detail:
      'Prefix queries walk down by clearing the least significant set bit. Updates walk up by adding that bit, like climbing a staircase.',
  },
  {
    title: 'Compact segment tree',
    detail:
      'It is a segment tree squeezed into one array. The shape is implied by bit patterns instead of explicit node pointers.',
  },
]

const terminology = [
  {
    term: 'lowbit(i)',
    detail:
      'lowbit(i) = i & -i gives the size of the range covered by tree[i].',
  },
  {
    term: 'Bucket range',
    detail:
      'tree[i] stores the sum of values in (i - lowbit(i) + 1) .. i.',
  },
  {
    term: '1-indexed array',
    detail:
      'Index 0 is unused so lowbit math works cleanly.',
  },
  {
    term: 'Prefix sum',
    detail:
      'Sum of values from 1 to i, computed by walking down the lowbit chain.',
  },
  {
    term: 'Point update',
    detail:
      'Add delta to one index and propagate to all buckets that cover it.',
  },
]

const coreConcepts = [
  {
    heading: 'Indexing discipline',
    bullets: [
      'Fenwick trees are typically 1-indexed; index 0 is unused to keep lowbit math clean.',
      'lowbit(i) = i & -i gives the size of the range stored at index i.',
      'Node i aggregates the range (i - lowbit(i) + 1) to i.',
    ],
  },
  {
    heading: 'Prefix sum query',
    bullets: [
      'Initialize sum = 0 and walk i = i - lowbit(i) until i becomes 0.',
      'Each step adds a pre-aggregated bucket, so query cost is O(log n).',
      'Range sum [l..r] = prefix(r) - prefix(l - 1).',
    ],
  },
  {
    heading: 'Point update',
    bullets: [
      'To add delta at index i, update all buckets that include i.',
      'Walk i = i + lowbit(i) until i exceeds n.',
      'Each update touches O(log n) nodes, preserving fast queries.',
    ],
  },
  {
    heading: 'Linear build',
    bullets: [
      'Seed tree[i] with the array values, then add tree[i] to tree[i + lowbit(i)].',
      'This builds in O(n) instead of O(n log n) repeated updates.',
      'Use it when initializing from static data before online updates.',
    ],
  },
  {
    heading: 'Order statistics',
    bullets: [
      'Binary lifting can find the smallest index where prefix >= k.',
      'Useful for selecting the k-th element in a multiset.',
      'Requires non-negative frequencies to keep prefix monotonic.',
    ],
  },
  {
    heading: '2D extension',
    bullets: [
      'Nest Fenwick trees for each dimension to support rectangle sums.',
      'Update and query are O(log^2 n) with higher constants.',
      'Best for sparse or moderate grids when full prefix tables are too large.',
    ],
  },
]

const invariants = [
  {
    title: 'Bucket correctness',
    detail:
      'For every i, tree[i] equals the sum of a fixed range length lowbit(i).',
  },
  {
    title: 'Prefix decomposition',
    detail:
      'Any prefix [1..i] can be decomposed into disjoint buckets following i -= lowbit(i).',
  },
  {
    title: 'Monotonic prefixes for kth',
    detail:
      'Order-statistic search assumes all values are non-negative so prefix sums are non-decreasing.',
  },
  {
    title: '1-based indexing',
    detail:
      'All update and query loops terminate correctly only when indices start at 1.',
  },
]

const operationVariants = [
  {
    title: 'Point update + prefix query',
    detail:
      'The classic Fenwick use case. O(log n) update and query.',
  },
  {
    title: 'Range update + point query',
    detail:
      'Store a difference array in the tree; update [l, r] by add(l, delta), add(r+1, -delta).',
  },
  {
    title: 'Range update + range query',
    detail:
      'Use two trees to support range adds and prefix sums in O(log n).',
  },
  {
    title: '2D and 3D Fenwick',
    detail:
      'Extend loops across dimensions: O(log^d n) for d dimensions.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Point updates and prefix queries are O(log n). Range sums use two prefixes. Constants are small due to tight loops and cache-friendly memory.',
  },
  {
    title: 'Space cost',
    detail:
      'Uses n + 1 entries. A 1,000,000 element tree with 64-bit values costs about 8 MB, much less than a 4n segment tree.',
  },
  {
    title: 'Initialization',
    detail:
      'Naive builds with updates cost O(n log n). Linear build is O(n) and preferred when loading from arrays.',
  },
  {
    title: 'Constraints',
    detail:
      'Supports associative operations that decompose by prefixes (sum, count). Not ideal for min/max without extra tricks.',
  },
]

const performanceNotes = [
  {
    title: 'Small constants',
    detail:
      'Tight loops and contiguous arrays make Fenwick fast in practice.',
  },
  {
    title: 'Memory locality',
    detail:
      'Access patterns are predictable and cache friendly compared to pointer trees.',
  },
  {
    title: 'Build strategy',
    detail:
      'Linear build saves time when initializing from static data.',
  },
  {
    title: 'Type width',
    detail:
      'Use 64-bit for sums unless you can guarantee small totals.',
  },
]

const rangeUpdateMath = [
  {
    title: 'Difference trick',
    detail:
      'If D is the difference array, adding delta to [l, r] is D[l] += delta, D[r+1] -= delta.',
  },
  {
    title: 'Two-tree formula',
    detail:
      'Prefix sum after range adds: sum(i) = i * query(B1, i) - query(B2, i).',
  },
  {
    title: 'Update formula',
    detail:
      'Range add [l, r] by: add(B1, l, delta), add(B1, r+1, -delta), add(B2, l, delta*(l-1)), add(B2, r+1, -delta*r).',
  },
]

const coordinateCompression = [
  {
    title: 'Why compress',
    detail:
      'Fenwick needs dense indices. Compress sparse keys to 1..m to keep memory small.',
  },
  {
    title: 'How to compress',
    detail:
      'Sort unique keys, map each key to its rank, then use the rank in updates and queries.',
  },
  {
    title: 'Use cases',
    detail:
      'Inversion counting, offline queries, and frequency tracking over large domains.',
  },
]

const testingChecklist = [
  'Verify prefix sums against a brute-force array after random updates.',
  'Test edge indices: 1, n, and empty prefixes.',
  'Validate range sum by comparing prefix(r) - prefix(l - 1).',
  'Confirm kth selection with non-negative data and duplicates.',
  'Check that linear build matches repeated updates.',
  'Stress test with large values for overflow issues.',
]

const practiceIdeas = [
  'Count inversions in O(n log n) using coordinate compression and a Fenwick.',
  'Maintain a multiset with kth element queries using binary lifting.',
  'Implement range add + range sum with two trees and validate formulas.',
  'Build a 2D Fenwick for dynamic grid updates.',
  'Compare Fenwick vs segment tree on the same workload.',
]

const realWorldUses = [
  {
    context: 'Streaming counters',
    detail:
      'Maintain rolling counts for telemetry and analytics, updating bins while answering prefix statistics in log time.',
  },
  {
    context: 'Order statistics',
    detail:
      'Pick the k-th item in a multiset (e.g., scheduling, load balancing) using binary lifting on prefix sums.',
  },
  {
    context: 'Inversion counting',
    detail:
      'Coordinate compress values and track how many smaller elements have appeared so far.',
  },
  {
    context: 'Fenwick for text editors',
    detail:
      'Track line lengths to translate between (line, column) and file offsets when edits occur.',
  },
  {
    context: 'Game leaderboards',
    detail:
      'Maintain score frequencies and quickly answer percentile or rank queries with prefix sums.',
  },
  {
    context: '2D heatmaps',
    detail:
      'Use a 2D Fenwick for dynamic grid counts in dashboards and sensor maps.',
  },
]

const examples = [
  {
    title: 'Core update and prefix query',
    code: `// 1-indexed Fenwick tree
function add(i, delta):
    while i <= n:
        tree[i] += delta
        i += i & -i

function prefixSum(i):
    sum = 0
    while i > 0:
        sum += tree[i]
        i -= i & -i
    return sum`,
    explanation:
      'Updates climb to all buckets that include index i. Prefix queries descend by clearing the lowbit to accumulate buckets.',
  },
  {
    title: 'Range query using two prefixes',
    code: `function rangeSum(l, r):
    if r < l: return 0
    return prefixSum(r) - prefixSum(l - 1)`,
    explanation:
      'Fenwick trees are prefix data structures. Range sums are derived by subtracting two prefix totals.',
  },
  {
    title: 'Linear-time build',
    code: `// tree is 1-indexed, values is 1-indexed input
for i in 1..n:
    tree[i] += values[i]
    j = i + (i & -i)
    if j <= n: tree[j] += tree[i]`,
    explanation:
      'Each node contributes its bucket sum to the next parent bucket, building the structure in O(n).',
  },
  {
    title: 'Find k-th element by frequency',
    code: `// smallest idx with prefixSum(idx) >= k
function kth(k):
    idx = 0
    bit = highestPowerOfTwoAtMost(n)
    while bit != 0:
        next = idx + bit
        if next <= n && tree[next] < k:
            k -= tree[next]
            idx = next
        bit >>= 1
    return idx + 1`,
    explanation:
      'Binary lifting walks the implicit tree to locate the k-th element in O(log n). Requires non-negative frequencies.',
  },
  {
    title: 'Range add + range sum with two trees',
    code: `// Internal helpers
function add(bit, i, delta):
    while i <= n:
        bit[i] += delta
        i += i & -i

function sum(bit, i):
    res = 0
    while i > 0:
        res += bit[i]
        i -= i & -i
    return res

// Range add [l, r] by delta
function rangeAdd(l, r, delta):
    add(B1, l, delta)
    add(B1, r + 1, -delta)
    add(B2, l, delta * (l - 1))
    add(B2, r + 1, -delta * r)

// Prefix sum after range adds
function prefix(i):
    return i * sum(B1, i) - sum(B2, i)

function rangeSum(l, r):
    return prefix(r) - prefix(l - 1)`,
    explanation:
      'Two Fenwick trees convert range updates into prefix sums using a standard algebraic transform.',
  },
  {
    title: '2D Fenwick sketch',
    code: `function add(x, y, delta):
    for i = x; i <= n; i += i & -i:
        for j = y; j <= m; j += j & -j:
            tree[i][j] += delta

function sum(x, y):
    res = 0
    for i = x; i > 0; i -= i & -i:
        for j = y; j > 0; j -= j & -j:
            res += tree[i][j]
    return res`,
    explanation:
      'Nested lowbit loops generalize Fenwick to 2D for dynamic rectangle sums.',
  },
]

const pitfalls = [
  'Mixing 0-indexed arrays with 1-indexed formulas leads to off-by-one errors.',
  'Forgetting to use a wide enough type for sums; prefix sums can overflow 32-bit ints.',
  'Using negative frequencies and then applying order-statistic queries breaks monotonicity.',
  'Building with O(n log n) updates when a linear build is available.',
  'Assuming Fenwick supports arbitrary range updates or min/max queries without extra transforms.',
  'Not compressing sparse keys leads to huge, mostly empty arrays.',
  'Using kth selection when counts can go negative breaks correctness.',
  'Forgetting to clamp r + 1 in range updates can write past the array.',
]

const decisionGuidance = [
  'Need fast prefix sums with point updates and minimal memory: choose Fenwick.',
  'Need range updates or min/max queries: use a segment tree or a different structure.',
  'Working with sparse large keys: coordinate compress and then apply Fenwick.',
  'Need 2D or 3D grid updates with moderate sizes: use a multi-dimensional Fenwick.',
  'Need only static ranges: prefix-sum arrays beat Fenwick with O(1) queries.',
]

const advancedInsights = [
  {
    title: 'Fenwick for range update + point query',
    detail:
      'Store a difference array inside Fenwick so you can add delta to a range and query single points. Two trees can extend this to range sum queries.',
  },
  {
    title: 'Binary lifting explains the shape',
    detail:
      'The implicit tree is a binary trie over indices. Binary lifting reuses the same lowbit logic to navigate without recursion.',
  },
  {
    title: 'Coordinate compression first',
    detail:
      'Map sparse keys to dense indices to keep the tree small and preserve O(log n) updates on large value ranges.',
  },
  {
    title: 'Cache efficiency is a feature',
    detail:
      'Fenwick loops touch contiguous memory with predictable strides, often beating segment trees for pure prefix sums.',
  },
  {
    title: 'Fenwick as a prefix monoid',
    detail:
      'Fenwick works for any invertible prefix operation that can be decomposed; sums are the most common, but XOR also works.',
  },
  {
    title: 'Offline queries with sorting',
    detail:
      'Combine Fenwick with sorting by key or time to answer offline range queries efficiently.',
  },
]

const takeaways = [
  'Fenwick trees are the lightest structure for dynamic prefix sums.',
  'lowbit drives both update and query; keep indices 1-based to avoid bugs.',
  'Range sums are just two prefix sums, keeping the API minimal.',
  'Binary lifting unlocks order statistics when counts are non-negative.',
  'Use segment trees only when you need more expressive queries or updates.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const fenwick98HelpStyles = `
.fenwick98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.fenwick98-window {
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

.fenwick98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.fenwick98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.fenwick98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.fenwick98-control {
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
  padding: 0;
}

.fenwick98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.fenwick98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.fenwick98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.fenwick98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.fenwick98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.fenwick98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.fenwick98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.fenwick98-toc-list li {
  margin: 0 0 8px;
}

.fenwick98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.fenwick98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.fenwick98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.fenwick98-section {
  margin: 0 0 20px;
}

.fenwick98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.fenwick98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.fenwick98-content p,
.fenwick98-content li,
.fenwick98-content th,
.fenwick98-content td {
  font-size: 12px;
  line-height: 1.5;
}

.fenwick98-content p {
  margin: 0 0 10px;
}

.fenwick98-content ul,
.fenwick98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.fenwick98-table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0 10px;
}

.fenwick98-table th,
.fenwick98-table td {
  border: 1px solid #b8b8b8;
  text-align: left;
  padding: 4px 6px;
  vertical-align: top;
}

.fenwick98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.fenwick98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.fenwick98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .fenwick98-main {
    grid-template-columns: 1fr;
  }

  .fenwick98-toc {
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-uses', label: 'Real-World Uses' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-terms', label: 'Terminology' },
    { id: 'core-invariants', label: 'Invariants' },
    { id: 'core-mechanics', label: 'Core Concepts' },
    { id: 'core-variants', label: 'Operation Variants' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-performance', label: 'Performance Notes' },
    { id: 'core-range-math', label: 'Range Update Math' },
    { id: 'core-compression', label: 'Coordinate Compression' },
    { id: 'core-decision', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: [
    { id: 'ex-summary', label: 'Operation Summary' },
    { id: 'ex-code', label: 'Practical Examples' },
    { id: 'ex-tests', label: 'Testing Checklist' },
    { id: 'ex-practice', label: 'Practice Ideas' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function FenwickTreePrefixSumsPage(): JSX.Element {
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
    document.title = `Fenwick Tree (Prefix Sums) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Fenwick Tree (Prefix Sums)',
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
    <div className="fenwick98-help-page">
      <style>{fenwick98HelpStyles}</style>
      <div className="fenwick98-window" role="presentation">
        <header className="fenwick98-titlebar">
          <span className="fenwick98-title-text">Fenwick Tree (Prefix Sums)</span>
          <div className="fenwick98-title-controls">
            <button className="fenwick98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="fenwick98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="fenwick98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`fenwick98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="fenwick98-main">
          <aside className="fenwick98-toc" aria-label="Table of contents">
            <h2 className="fenwick98-toc-title">Contents</h2>
            <ul className="fenwick98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="fenwick98-content">
            <h1 className="fenwick98-doc-title">Fenwick Tree (Prefix Sums)</h1>
            <p>
              Fenwick trees (binary indexed trees) keep prefix sums and frequencies fast while using only a single array. They shine when
              updates are frequent, queries are prefix-based, and memory or constant factors matter.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Overview</h2>
                  <p>
                    A Fenwick tree stores partial sums in buckets determined by the lowest set bit of each index. This answers prefix sums
                    in O(log n) and applies point updates in O(log n), while using only n + 1 storage.
                  </p>
                </section>
                <hr className="fenwick98-divider" />
                <section id="bp-history" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="fenwick98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-uses" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Key Takeaways</h2>
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
                <section id="core-terms" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Terminology</h2>
                  {terminology.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-invariants" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Invariants</h2>
                  {invariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics" className="fenwick98-section">
                  <h2 className="fenwick98-heading">How It Works: Structure and Operations</h2>
                  {coreConcepts.map((block) => (
                    <div key={block.heading}>
                      <h3 className="fenwick98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-variants" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Operation Variants</h2>
                  {operationVariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Complexity Analysis and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Performance Notes</h2>
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-range-math" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Range Update Math (Two-Tree Trick)</h2>
                  {rangeUpdateMath.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compression" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Coordinate Compression</h2>
                  {coordinateCompression.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decision" className="fenwick98-section">
                  <h2 className="fenwick98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-summary" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Operation Summary</h2>
                  <table className="fenwick98-table">
                    <thead>
                      <tr>
                        <th>Operation</th>
                        <th>Time</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Point update</td>
                        <td>O(log n)</td>
                        <td>Update buckets using i += lowbit(i).</td>
                      </tr>
                      <tr>
                        <td>Prefix sum</td>
                        <td>O(log n)</td>
                        <td>Accumulate buckets using i -= lowbit(i).</td>
                      </tr>
                      <tr>
                        <td>Range sum</td>
                        <td>O(log n)</td>
                        <td>prefix(r) - prefix(l - 1).</td>
                      </tr>
                      <tr>
                        <td>Build from array</td>
                        <td>O(n)</td>
                        <td>Propagate each bucket once.</td>
                      </tr>
                      <tr>
                        <td>k-th by frequency</td>
                        <td>O(log n)</td>
                        <td>Binary lifting on prefix sums.</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section id="ex-code" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="fenwick98-subheading">{example.title}</h3>
                      <div className="fenwick98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-tests" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Testing Checklist</h2>
                  <ul>
                    {testingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="ex-practice" className="fenwick98-section">
                  <h2 className="fenwick98-heading">Practice and Build Ideas</h2>
                  <ul>
                    {practiceIdeas.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="fenwick98-section">
                <h2 className="fenwick98-heading">Glossary</h2>
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
