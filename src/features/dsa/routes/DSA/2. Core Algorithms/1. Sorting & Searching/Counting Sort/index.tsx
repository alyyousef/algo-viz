import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Seward frames counting sort (1954)',
    detail:
      'Harold H. Seward described counting sort while proposing LSD radix sorting of punched cards, showing how histograms can replace comparisons.',
  },
  {
    title: 'Knuth popularizes the analysis (1968)',
    detail:
      'Volume 3 of The Art of Computer Programming cast counting sort as the canonical linear-time stable sort when keys fit a small universe, giving the O(n + k) framing.',
  },
  {
    title: 'Radix sort synergy in systems (1970s to 1990s)',
    detail:
      'Mainframes and later database engines leaned on counting sort as the stable digit sorter inside radix sort to beat comparison sorts on fixed-width records.',
  },
  {
    title: 'GPU histograms and scans (2000s)',
    detail:
      'Parallel prefix-sum primitives on GPUs made counting-sort-like kernels a staple for clustering keys before heavier work like radix partitioning.',
  },
]

const mentalModels = [
  {
    title: 'Tally marks by value',
    detail:
      'Lay out buckets for every possible key, place a tally each time you see that key, then read the buckets in order to rebuild the array.',
  },
  {
    title: 'Prefix sums as conveyor belts',
    detail:
      'Cumulative counts become starting slots for each key. As you decrement while placing, the conveyor belt advances to the next open position.',
  },
  {
    title: 'Replacing comparisons with address arithmetic',
    detail:
      "Every element jumps directly to its final neighborhood based on its key's prefix sum, skipping pairwise comparisons entirely.",
  },
]

const terminology = [
  {
    term: 'Key universe (k)',
    detail:
      'The number of distinct key values the input can take, typically maxKey - minKey + 1.',
  },
  {
    term: 'Histogram',
    detail:
      'The array of counts for each key value.',
  },
  {
    term: 'Prefix sum',
    detail:
      'Cumulative counts; used to compute final positions for stable placement.',
  },
  {
    term: 'Stable placement',
    detail:
      'Writing elements in reverse input order so equal keys retain their order.',
  },
  {
    term: 'Key compression',
    detail:
      'Mapping sparse keys to a dense range 0..m-1 before counting.',
  },
]

const stepByStep = [
  {
    title: 'Find key range',
    detail:
      'Scan once to find minKey and maxKey so you can size the count array.',
  },
  {
    title: 'Build histogram',
    detail:
      'Count each key into count[key - minKey].',
  },
  {
    title: 'Prefix transform',
    detail:
      'Convert counts into exclusive end positions by accumulating counts.',
  },
  {
    title: 'Stable placement',
    detail:
      'Scan input from right to left; place and decrement each key position.',
  },
  {
    title: 'Return output',
    detail:
      'Output array is sorted; optionally copy back if in-place is required.',
  },
]

const invariants = [
  {
    title: 'Count correctness',
    detail:
      'After counting, sum(count) equals n and each count[i] matches key frequency.',
  },
  {
    title: 'Prefix semantics',
    detail:
      'After prefix sums, count[i] equals the exclusive end index for key i.',
  },
  {
    title: 'Stability',
    detail:
      'Reverse placement preserves relative order of equal keys.',
  },
]

const mechanics = [
  {
    heading: 'Count',
    bullets: [
      'Find minKey and maxKey; let k = maxKey - minKey + 1.',
      'Allocate count[k] = 0. One pass over input increments count[key - minKey].',
    ],
  },
  {
    heading: 'Prefix and position',
    bullets: [
      'Convert counts to prefix sums so count[i] stores the end offset (exclusive) for key i.',
      'This turns histogram bins into write pointers for stable placement.',
    ],
  },
  {
    heading: 'Stable placement',
    bullets: [
      'Scan input backward to preserve order of equal keys.',
      'For each x: idx = x - minKey; count[idx] -= 1; output[count[idx]] = x.',
    ],
  },
  {
    heading: 'Range and memory tuning',
    bullets: [
      'Counting sort is practical only when k is modest; otherwise compress keys or switch to radix or comparison sorts.',
      'If keys are sparse within a large numeric range, map them to dense indices before counting.',
    ],
  },
]

const performanceNotes = [
  {
    title: 'When k is small',
    detail:
      'Counting sort is fast and cache-friendly. The cost is dominated by linear scans.',
  },
  {
    title: 'When k is large',
    detail:
      'Count array becomes the bottleneck. Consider radix or compression.',
  },
  {
    title: 'Memory reuse',
    detail:
      'Reuse count/output buffers across passes to reduce allocations.',
  },
  {
    title: 'Branch predictability',
    detail:
      'The algorithm is branch-light, often faster than comparison sorts on small integer ranges.',
  },
]

const comparisonGrid = [
  {
    feature: 'Best case',
    counting: 'O(n + k)',
    quick: 'O(n log n)',
    merge: 'O(n log n)',
    radix: 'O(d * (n + k))',
  },
  {
    feature: 'Worst case',
    counting: 'O(n + k)',
    quick: 'O(n^2)',
    merge: 'O(n log n)',
    radix: 'O(d * (n + k))',
  },
  {
    feature: 'Stable',
    counting: 'Yes',
    quick: 'No',
    merge: 'Yes',
    radix: 'Yes (with stable digit sort)',
  },
  {
    feature: 'Extra space',
    counting: 'O(n + k)',
    quick: 'O(log n) stack',
    merge: 'O(n)',
    radix: 'O(n + k)',
  },
  {
    feature: 'Needs small key range',
    counting: 'Yes',
    quick: 'No',
    merge: 'No',
    radix: 'Yes (per digit)',
  },
]

const rangeTuning = [
  {
    title: 'Negative keys',
    detail:
      'Offset by minKey so array indices start at 0.',
  },
  {
    title: 'Sparse keys',
    detail:
      'Compress keys to a dense range via sorting unique keys.',
  },
  {
    title: 'Large keys',
    detail:
      'Use radix sort with a small base to keep k manageable per digit.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(n + k): one pass to count, one to prefix, one to place. When k is much smaller than n, it is effectively linear in n.',
  },
  {
    title: 'Space',
    detail:
      'O(n + k): an output array plus the count array. In-place variants lose stability and rarely pay off.',
  },
  {
    title: 'Stability',
    detail:
      'Backward placement is what makes the algorithm stable. Skip it and radix-sort pipelines break on repeated digits.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Counting and prefix phases are sequential and cache-friendly. Placement scatters writes across the output but remains predictable and branch-light.',
  },
]

const realWorldPatterns = [
  {
    title: 'Event bucketing',
    detail:
      'Group events by small integer categories before aggregation.',
  },
  {
    title: 'Age or score bands',
    detail:
      'Sort records by bounded numeric fields (0-120, 0-1000).',
  },
  {
    title: 'Telemetry histograms',
    detail:
      'Counting and prefix sums feed percentile estimates and dashboards.',
  },
  {
    title: 'GPU pre-sorting',
    detail:
      'Fast histogram + prefix sums partition data for parallel pipelines.',
  },
]

const realWorldUses = [
  {
    context: 'Radix sort digit passes',
    detail:
      'Counting sort is the stable inner loop on each digit for LSD radix sorts on integers, IPv4 addresses, or fixed-width strings.',
  },
  {
    context: 'Image processing histograms',
    detail:
      'Operations like histogram equalization or bucketizing pixel intensities compute counts and prefix sums, effectively running counting-sort primitives.',
  },
  {
    context: 'Database and log bucketing',
    detail:
      'When grouping by small categorical IDs (months 0-11, status codes, grade bands), counting-sort logic bins rows before more expensive aggregation.',
  },
  {
    context: 'Parallel pre-partitioning',
    detail:
      'GPU and SIMD pipelines use counting-plus-scan to cluster keys locally before global sorts, taking advantage of fast prefix-sum kernels.',
  },
]

const examples = [
  {
    title: 'Stable counting sort with offsets (TypeScript-like pseudocode)',
    code: `function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];
  const minKey = Math.min(...arr);
  const maxKey = Math.max(...arr);
  const k = maxKey - minKey + 1;
  const count = Array(k).fill(0);
  const out = Array(arr.length);

  // Count
  for (const x of arr) count[x - minKey] += 1;

  // Prefix to positions (exclusive end)
  for (let i = 1; i < k; i += 1) count[i] += count[i - 1];

  // Stable placement (reverse scan)
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    const idx = arr[i] - minKey;
    count[idx] -= 1;
    out[count[idx]] = arr[i];
  }
  return out;
}`,
    explanation:
      'Offsetting by minKey supports negative keys. The reverse scan preserves stability, which is crucial if this function feeds a radix sort.',
  },
  {
    title: 'Digit pass inside radix sort (base 256)',
    code: `function radixPass(arr, byteIndex):
    count[256] = {0}
    out = new array(len(arr))
    for x in arr:
        digit = (x >> (8 * byteIndex)) & 0xFF
        count[digit] += 1
    for d in 1..255:
        count[d] += count[d - 1]
    for x in reversed(arr):
        digit = (x >> (8 * byteIndex)) & 0xFF
        count[digit] -= 1
        out[count[digit]] = x
    return out`,
    explanation:
      'Using 256 as the digit alphabet keeps k small and cacheable. Each byte pass is stable, letting later passes respect earlier ordering.',
  },
  {
    title: 'Counting with key compression',
    code: `function countingSortCompressed(arr):
    keys = sort(unique(arr))
    index = map key -> rank in keys
    count = Array(keys.length).fill(0)
    out = Array(arr.length)
    for x in arr: count[index[x]] += 1
    for i in 1..count.length-1: count[i] += count[i-1]
    for i from arr.length-1 down to 0:
        k = index[arr[i]]
        count[k] -= 1
        out[count[k]] = arr[i]
    return out`,
    explanation:
      'Compression keeps k small even when keys are large or sparse, while preserving stability.',
  },
  {
    title: 'Histogram-only use (no sort)',
    code: `// Count frequencies, skip placement
count = Array(k).fill(0)
for x in arr: count[x - minKey] += 1
// count now answers frequency queries and supports percentiles`,
    explanation:
      'Sometimes the histogram itself is the goal; sorting is optional.',
  },
]

const pitfalls = [
  'Letting k explode: if maxKey - minKey is large, the count array dominates memory and runtime.',
  'Forgetting the minKey offset when negatives exist, which leads to out-of-bounds writes.',
  'Dropping stability by scanning forward during placement, which breaks radix-sort correctness on duplicates.',
  'Using counting sort when keys are sparse over a giant range instead of compressing keys first.',
  'Allocating an output array per pass in radix pipelines without reusing buffers, increasing memory pressure.',
  'Using a non-stable variant in radix pipelines breaks digit ordering.',
  'Skipping min/max detection can waste memory if k is large.',
]

const testingChecklist = [
  'Arrays with negative numbers to verify minKey offset.',
  'Arrays with all identical keys to verify stability.',
  'Sparse keys with large gaps to test compression.',
  'Large n with small k to validate O(n + k) scaling.',
  'Random inputs compared against a reference sort.',
]

const decisionGuidance = [
  'Small integer universe (k in the low thousands or less) and need stability: counting sort is ideal.',
  'Large but fixed-width keys: use radix sort, with counting sort as the digit-level stable sorter.',
  'Sparse keys in a wide range: compress to dense indices, then count; otherwise choose O(n log n) comparisons.',
  'Streaming with tight memory: avoid counting sort unless k is tiny or you can reuse shared buffers.',
  'Need stable grouping before aggregation: counting-sort-like histograms are a cheap pre-step.',
  'Need to sort objects by small integer key: counting sort plus stable placement is ideal.',
]

const advancedInsights = [
  {
    title: 'Key compression',
    detail:
      'When keys are sparse, map them to consecutive IDs via hashing or sorting unique keys once, then run counting sort on the compressed IDs to avoid huge k.',
  },
  {
    title: 'Cache-aware digit sizing',
    detail:
      'In radix pipelines, pick digit sizes so that count arrays fit in L1 or L2 cache (base 2^8 or 2^11 is common) to keep the O(n + k) promise in practice.',
  },
  {
    title: 'Parallel scans',
    detail:
      'Prefix sums parallelize well. Many-core and GPU implementations split the array into tiles, build local histograms, then merge via an exclusive scan.',
  },
  {
    title: 'Stability as a contract',
    detail:
      'Counting sort is chosen not just for speed but to guarantee stable ordering before downstream operations. Preserve that property unless every consumer is under your control.',
  },
  {
    title: 'In-place variants are tricky',
    detail:
      'In-place counting sorts exist but are complex and usually unstable. The extra buffer is the common trade-off.',
  },
  {
    title: 'Hybrid with comparison sorts',
    detail:
      'If k grows too large at runtime, fall back to quicksort or merge sort based on memory and stability needs.',
  },
]

const practiceIdeas = [
  'Implement counting sort for objects with a small integer key.',
  'Swap between counting and radix based on k threshold.',
  'Build a histogram and compute percentiles from prefix sums.',
  'Compare stability by sorting pairs (key, originalIndex).',
]

const takeaways = [
  'Counting sort trades comparisons for arithmetic, reaching O(n + k) when the key range is small.',
  'Stability comes from backward placement after prefix sums; it is essential for radix and grouping tasks.',
  'Memory scales with k, so compress keys or pivot to radix or comparison sorts when the universe is large.',
  'Cache-friendly counting and prefix phases make it fast in practice when k is tuned to fit cache.',
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
    { id: 'core-terms', label: 'Terminology and Invariants' },
    { id: 'core-process', label: 'Process and Mechanics' },
    { id: 'core-performance', label: 'Complexity and Performance' },
    { id: 'core-compare', label: 'Comparison and Tuning' },
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

const count98HelpStyles = `
.count98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.count98-window {
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

.count98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.count98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.count98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.count98-control {
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

.count98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.count98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.count98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.count98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.count98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.count98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.count98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.count98-toc-list li {
  margin: 0 0 8px;
}

.count98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.count98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.count98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.count98-section {
  margin: 0 0 20px;
}

.count98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.count98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.count98-content p,
.count98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.count98-content p {
  margin: 0 0 10px;
}

.count98-content ul,
.count98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.count98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.count98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
  overflow-x: auto;
}

.count98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .count98-main {
    grid-template-columns: 1fr;
  }

  .count98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

export default function CountingSortPage(): JSX.Element {
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
    document.title = `Counting Sort (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Counting Sort',
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
    <div className="count98-help-page">
      <style>{count98HelpStyles}</style>
      <div className="count98-window" role="presentation">
        <header className="count98-titlebar">
          <span className="count98-title-text">Counting Sort</span>
          <div className="count98-title-controls">
            <button className="count98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="count98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="count98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`count98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="count98-main">
          <aside className="count98-toc" aria-label="Table of contents">
            <h2 className="count98-toc-title">Contents</h2>
            <ul className="count98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="count98-content">
            <h1 className="count98-doc-title">Counting Sort</h1>
            <p>
              Counting sort replaces comparisons with a histogram and a prefix sum. When keys fit a modest integer range, it
              delivers stable O(n + k) performance and powers radix sorts and histogram-heavy pipelines.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="count98-section">
                  <h2 className="count98-heading">Overview</h2>
                  <p>
                    Counting sort trades comparisons for arithmetic. One pass tallies key frequencies, a prefix pass converts
                    frequencies into placement ranges, and a stable write-back pass produces sorted output.
                  </p>
                  <p>
                    The method shines when the key universe is small. It underpins radix sort digit passes and appears in practical
                    histogram and bucketing workloads.
                  </p>
                </section>

                <hr className="count98-divider" />

                <section id="bp-history" className="count98-section">
                  <h2 className="count98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="count98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="count98-divider" />

                <section id="bp-takeaways" className="count98-section">
                  <h2 className="count98-heading">Key Takeaways</h2>
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
                <section id="core-models" className="count98-section">
                  <h2 className="count98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-terms" className="count98-section">
                  <h2 className="count98-heading">Terminology and Invariants</h2>
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

                <section id="core-process" className="count98-section">
                  <h2 className="count98-heading">Process and Mechanics</h2>
                  {stepByStep.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  {mechanics.map((item) => (
                    <div key={item.heading}>
                      <h3 className="count98-subheading">{item.heading}</h3>
                      <ul>
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-performance" className="count98-section">
                  <h2 className="count98-heading">Complexity and Performance</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-compare" className="count98-section">
                  <h2 className="count98-heading">Comparison and Range Tuning</h2>
                  {comparisonGrid.map((row) => (
                    <p key={row.feature}>
                      <strong>{row.feature}:</strong> Counting {row.counting}; Quick {row.quick}; Merge {row.merge}; Radix{' '}
                      {row.radix}.
                    </p>
                  ))}
                  {rangeTuning.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-applications" className="count98-section">
                  <h2 className="count98-heading">Applications and Patterns</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                  {realWorldPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="count98-section">
                  <h2 className="count98-heading">Pitfalls, Testing, and Practice</h2>
                  <h3 className="count98-subheading">Common Pitfalls</h3>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3 className="count98-subheading">Testing Checklist</h3>
                  <ul>
                    {testingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3 className="count98-subheading">Practice Ideas</h3>
                  <ul>
                    {practiceIdeas.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-usage" className="count98-section">
                  <h2 className="count98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="count98-section">
                  <h2 className="count98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="count98-section">
                <h2 className="count98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="count98-subheading">{example.title}</h3>
                    <div className="count98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="count98-section">
                <h2 className="count98-heading">Glossary</h2>
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
