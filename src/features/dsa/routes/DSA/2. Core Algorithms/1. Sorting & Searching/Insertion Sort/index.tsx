import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Early textbook anchor (1960s)',
    detail:
      'Insertion sort appeared as a canonical example in early algorithm texts for demonstrating loop invariants and stability.',
  },
  {
    title: 'Knuth analysis (1968)',
    detail:
      'The Art of Computer Programming Vol. 3 formalized its expected O(n^2) cost and highlighted its adaptivity on nearly sorted inputs.',
  },
  {
    title: 'Hybrid cutoffs in libraries (1990s to today)',
    detail:
      'C and C++ library sorts, Python TimSort, and JavaScript engines use insertion sort on tiny partitions to beat branch and call overhead from heavier sorts.',
  },
]

const mentalModels = [
  {
    title: 'Sorting a hand of cards',
    detail:
      'Hold a sorted fan in your left hand and insert each new card into its proper spot. The left side stays sorted the whole time.',
  },
  {
    title: 'Growing a sorted prefix',
    detail:
      'Think of the array as two zones: a sorted prefix and an unsorted suffix. Each step moves one item from right to left until it fits.',
  },
  {
    title: 'Shifting to make space',
    detail:
      'Instead of swapping, you shift elements right to open a hole, preserving stability because equal keys never leapfrog.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'For i from 1 to n - 1, set key = a[i].',
      'Shift elements in a[0..i-1] right while they are greater than key.',
      'Place key into the hole created by the shifts.',
    ],
  },
  {
    heading: 'Stability and adaptivity',
    bullets: [
      'Shifts move only strictly greater elements, so equal keys keep order (stable).',
      'If the input is already sorted, no shifts occur and time drops to O(n).',
    ],
  },
  {
    heading: 'Hybrid cutoffs',
    bullets: [
      'Commonly used for partitions of size 16-32 inside quicksort, mergesort, or introsort to reduce constant factors.',
      'Works well after a partition step when many elements are already close to sorted.',
    ],
  },
]

const loopInvariants = [
  {
    title: 'Sorted prefix invariant',
    detail:
      'Before each outer-loop iteration i, the subarray a[0..i-1] is sorted and contains the same elements as the original prefix.',
  },
  {
    title: 'Hole invariant',
    detail:
      'During the inner loop, there is a single hole at index j + 1, and all elements in a[0..i-1] greater than key have been shifted right by one.',
  },
  {
    title: 'Stability guarantee',
    detail:
      'Only elements strictly greater than key are shifted, so equal keys never cross each other.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: '[7, 3, 5, 2]',
    note: 'Prefix of length 1 is trivially sorted.',
  },
  {
    step: 'Insert 3',
    state: '[3, 7, 5, 2]',
    note: 'Shift 7 right, place 3 at index 0.',
  },
  {
    step: 'Insert 5',
    state: '[3, 5, 7, 2]',
    note: 'Shift 7 right, place 5 at index 1.',
  },
  {
    step: 'Insert 2',
    state: '[2, 3, 5, 7]',
    note: 'Shift 7, 5, 3 right; place 2 at index 0.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail: 'Worst and average O(n^2) comparisons and shifts; best case O(n) when the array is already sorted.',
  },
  {
    title: 'Space and stability',
    detail: 'In-place with O(1) extra space and stable ordering via shifts instead of swaps.',
  },
  {
    title: 'Constant factors',
    detail:
      'Excellent data locality and branch predictability on nearly sorted data make it fast for small n despite quadratic asymptotics.',
  },
]

const performanceProfile = [
  {
    title: 'Comparisons',
    detail:
      'Worst case ~ n(n-1)/2 comparisons. Best case n-1 comparisons (already sorted). With binary insertion, comparisons drop to O(n log n) but shifts still dominate.',
  },
  {
    title: 'Data movement',
    detail:
      'Shifts are proportional to the number of inversions. Each inversion causes one element move, so total writes are O(n + inversions).',
  },
  {
    title: 'Adaptive behavior',
    detail:
      'Nearly sorted input yields few inversions, so runtime approaches linear even for moderately sized arrays.',
  },
]

const realWorldUses = [
  {
    context: 'Small or nearly sorted arrays',
    detail:
      'Excellent for tiny buffers (tens of elements) or workloads with few inversions, such as merging almost-sorted logs.',
  },
  {
    context: 'Hybrid sort cutoffs',
    detail:
      'Used inside TimSort, V8 sort, and std::sort/introsort as the base case to finish tiny partitions faster than recursive calls.',
  },
  {
    context: 'Online insertion',
    detail:
      'When elements arrive one by one and must be kept sorted immediately (small priority lists, leaderboard snippets), insertion sort incremental nature is simple and predictable.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Binary insertion sort',
    detail:
      'Use binary search to find the insertion point, reducing comparisons. Shifts remain O(n) so total time is still O(n^2).',
  },
  {
    title: 'Sentinel optimization',
    detail:
      'Place a guaranteed minimum value at a[0] to remove the j >= 0 bound check in the inner loop, improving branch prediction.',
  },
  {
    title: 'Gapped insertion (Shell sort)',
    detail:
      'Insertion sort on gapped elements is the core of Shell sort. Gaps reduce inversions quickly before a final insertion pass.',
  },
  {
    title: 'Partial insertion for TimSort',
    detail:
      'Extend short runs to a minimum run length with insertion sort, then merge. This exploits existing order for large arrays.',
  },
]

const examples = [
  {
    title: 'Insertion sort (TypeScript-like pseudocode)',
    code: `function insertionSort(a: number[]): number[] {
  for (let i = 1; i < a.length; i += 1) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j]; // shift right
      j -= 1;
    }
    a[j + 1] = key; // place key
  }
  return a;
}`,
    explanation:
      'Shifts create a hole, then key fills it. Because only greater elements move, equal keys keep their original order (stability).',
  },
  {
    title: 'Hybrid cutoff inside quicksort',
    code: `function quicksort(a, lo, hi):
    while lo < hi:
        if hi - lo + 1 <= 24: # cutoff tuned to CPU/cache
            insertionSortRange(a, lo, hi)
            return
        p = partition(a, lo, hi)
        if p - lo < hi - p:
            quicksort(a, lo, p - 1)
            lo = p + 1
        else:
            quicksort(a, p + 1, hi)
            hi = p - 1`,
    explanation:
      'Small partitions skip recursive overhead and branch mispredictions by finishing with insertion sort. Tail recursion elimination keeps stack depth shallow.',
  },
  {
    title: 'Stable insertion of objects by key',
    code: `type Item = { key: number; payload: string };

function insertionSortByKey(items: Item[]): Item[] {
  for (let i = 1; i < items.length; i += 1) {
    const keyItem = items[i];
    let j = i - 1;
    while (j >= 0 && items[j].key > keyItem.key) {
      items[j + 1] = items[j];
      j -= 1;
    }
    items[j + 1] = keyItem;
  }
  return items;
}`,
    explanation:
      'Use a strict greater-than comparison on the key to preserve stability when payloads share the same key value.',
  },
]

const pitfalls = [
  'Using swaps instead of shifts loses stability and doubles writes.',
  'Applying insertion sort to large, random data leads to severe O(n^2) slowdowns.',
  'Forgetting to tune hybrid cutoffs can leave performance on the table (too low wastes recursion, too high wastes quadratic work).',
  'Inner loop bounds errors (j >= 0) can underflow or skip the first element.',
  'Comparing with >= instead of > breaks stability by reordering equal keys.',
]

const decisionGuidance = [
  'Tiny or nearly sorted input: insertion sort is ideal and often faster than O(n log n) sorts.',
  'Hybrid base case: switch to insertion sort when partitions drop below a tuned threshold (often 16-32 elements).',
  'Need stability with in-place behavior: insertion sort provides both for small n.',
  'General large or disordered input: pick merge sort, heap sort, quicksort, or TimSort.',
]

const advancedInsights = [
  {
    title: 'Adaptive cost and inversion count',
    detail:
      'Runtime is proportional to the number of inversions; few inversions mean few shifts. This connects insertion sort to inversion-count analytics.',
  },
  {
    title: 'Binary-search insertion',
    detail:
      'You can binary search the insertion point to cut comparisons to O(log n), but shifts still cost O(n), so overall remains O(n^2).',
  },
  {
    title: 'Cache friendliness',
    detail:
      'Linear scans and tight inner loops make insertion sort friendlier to caches and branch predictors than bubble sort on similar sizes.',
  },
  {
    title: 'Stable merges and TimSort runs',
    detail:
      'TimSort detects ascending runs; short runs are extended using insertion sort before merging, combining adaptivity with O(n log n) guarantees.',
  },
]

const implementationTips = [
  {
    title: 'Use a local key variable',
    detail:
      'Store a[i] in a temporary key to avoid repeated array reads while shifting.',
  },
  {
    title: 'Prefer index arithmetic over swaps',
    detail:
      'Shifting contiguous memory is faster than repeated swapping and preserves stability.',
  },
  {
    title: 'Short-circuit sorted prefixes',
    detail:
      'If a[i] >= a[i - 1], skip the inner loop entirely; this is common on nearly sorted data.',
  },
  {
    title: 'Avoid extra allocations',
    detail:
      'Insertion sort is in-place; avoid creating new arrays unless you need a persistent original.',
  },
]

const quickChecks = [
  {
    q: 'Is insertion sort stable?',
    a: 'Yes, when you shift only elements that are strictly greater than the key.',
  },
  {
    q: 'Why does it perform well on nearly sorted input?',
    a: 'Few inversions mean few shifts, so the inner loop runs a tiny number of steps.',
  },
  {
    q: 'Can we make it faster with binary search?',
    a: 'Binary search reduces comparisons but cannot avoid the O(n) shifts per insertion.',
  },
  {
    q: 'When should I avoid it?',
    a: 'Large random arrays or data with many inversions; use O(n log n) sorts instead.',
  },
]

const takeaways = [
  'Insertion sort is stable, in-place, and adaptive, excelling on tiny or nearly sorted inputs.',
  'Quadratic worst-case time limits it to small ranges or hybrid base cases.',
  'Shifts, not swaps, preserve order and reduce writes.',
  'Tune hybrid cutoffs to your CPU and data to maximize gains.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.win98-window {
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

.win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.win98-control {
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

.win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.win98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.win98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.win98-toc-list li {
  margin: 0 0 8px;
}

.win98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.win98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.win98-section {
  margin: 0 0 20px;
}

.win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.win98-content p,
.win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.win98-content p {
  margin: 0 0 10px;
}

.win98-content ul,
.win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.win98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.win98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .win98-main {
    grid-template-columns: 1fr;
  }

  .win98-toc {
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
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-trace', label: 'Worked Trace' },
    { id: 'core-complexity', label: 'Complexity and Intuition' },
    { id: 'core-performance', label: 'Performance Profile' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-variants', label: 'Variants and Tweaks' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-implementation', label: 'Implementation Tips' },
    { id: 'core-when-to-use', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms and Quick Checks' }],
}

const glossary = [
  {
    term: 'Sorted prefix',
    definition: 'The left segment that remains sorted before each outer-loop iteration.',
  },
  {
    term: 'Inversion',
    definition: 'A pair (i, j) where i < j but a[i] > a[j]; inversions drive insertion sort cost.',
  },
  {
    term: 'Stable sort',
    definition: 'A sorting method that preserves the original order of equal keys.',
  },
  {
    term: 'Binary insertion sort',
    definition: 'Uses binary search for position lookup, but still needs linear shifts.',
  },
  {
    term: 'Hybrid cutoff',
    definition: 'Threshold where recursive O(n log n) sorts switch to insertion sort on tiny partitions.',
  },
]

export default function InsertionSortPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(activeTabParam) ? activeTabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Insertion Sort (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Insertion Sort',
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
    <div className="win98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">Insertion Sort</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setSearchParams((prev) => {
                const nextParams = new URLSearchParams(prev)
                nextParams.set('tab', tab.id)
                return nextParams
              })}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="win98-content">
            <h1 className="win98-doc-title">Insertion Sort</h1>
            <p>
              Insertion sort builds a sorted prefix by shifting larger elements right to make space for each new key. It is stable,
              in-place, and adaptive on nearly sorted data, which makes it a staple for tiny arrays, streaming inserts, and hybrid
              cutoffs in faster sorts.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    Each iteration keeps the left side sorted while one new element slides left to its place. On sorted data, the
                    algorithm is linear; on random data it is quadratic. That balance makes it perfect for small buffers, nearly ordered
                    sequences, and as the finishing step inside faster divide-and-conquer sorts.
                  </p>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-history" className="win98-section">
                  <h2 className="win98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
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
                <section id="core-mental-models" className="win98-section">
                  <h2 className="win98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics" className="win98-section">
                  <h2 className="win98-heading">How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="win98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-invariants" className="win98-section">
                  <h2 className="win98-heading">Loop Invariants (Why It Is Correct)</h2>
                  {loopInvariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-trace" className="win98-section">
                  <h2 className="win98-heading">Worked Trace on a Tiny Array</h2>
                  {stepTrace.map((item) => (
                    <div key={item.step}>
                      <h3 className="win98-subheading">{item.step}</h3>
                      <p><strong>State:</strong> <code>{item.state}</code></p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <section id="core-complexity" className="win98-section">
                  <h2 className="win98-heading">Complexity Analysis and Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    Rule of thumb: for n under a few dozen or when inversions are rare, insertion sort can outrun O(n log n) sorts
                    because of its low overhead and cache friendliness. Beyond that, switch to merge, heap, quick, or TimSort.
                  </p>
                </section>
                <section id="core-performance" className="win98-section">
                  <h2 className="win98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-applications" className="win98-section">
                  <h2 className="win98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="win98-section">
                  <h2 className="win98-heading">Variants and Performance Tweaks</h2>
                  {variantsAndTweaks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-implementation" className="win98-section">
                  <h2 className="win98-heading">Implementation Tips</h2>
                  {implementationTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-when-to-use" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="win98-section">
                  <h2 className="win98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-code" className="win98-section">
                <h2 className="win98-heading">Code Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="win98-subheading">{example.title}</h3>
                    <div className="win98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="win98-section">
                <h2 className="win98-heading">Glossary</h2>
                {glossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
                <h2 className="win98-heading">Quick Checks</h2>
                {quickChecks.map((item) => (
                  <p key={item.q}>
                    <strong>{item.q}</strong> {item.a}
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
