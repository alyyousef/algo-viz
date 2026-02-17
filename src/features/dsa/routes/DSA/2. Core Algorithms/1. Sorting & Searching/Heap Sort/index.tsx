import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: '1964: Williams introduces heapsort',
    detail:
      'J. W. J. Williams proposed the binary heap and heapsort to speed up tape sorting, showing O(n log n) time with O(1) extra space.',
  },
  {
    title: '1964: Floyd makes heapify linear',
    detail:
      "Robert Floyd published the bottom-up heap construction that runs in O(n), the version still taught in CLRS and Knuth's texts.",
  },
  {
    title: '1970s: Heaps power graph algorithms',
    detail:
      'Binary heaps became the default priority queue for Dijkstra and Prim, tying heap primitives to scheduling and shortest paths.',
  },
  {
    title: '1997: Introsort uses heaps as a safety net',
    detail:
      'David Musser blended quicksort with heapsort to cap worst-case time at O(n log n); C++ std::sort still follows this strategy.',
  },
]

const mentalModels = [
  {
    title: 'Mountain with the peak on top',
    detail:
      'A max-heap is a mountain where every parent is taller than its children. The peak (largest element) sits at index 0, ready to remove.',
  },
  {
    title: 'Sift-down as gravity',
    detail:
      'After swapping the root with the end, the new root falls down the tree, swapping with the larger child until the heap property is restored.',
  },
  {
    title: 'Two zones in one array',
    detail:
      'Heapsort keeps a live heap prefix and a growing sorted suffix at the end. The boundary shrinks as you peel off maxima.',
  },
]

const mechanics = [
  {
    heading: 'Array layout',
    bullets: [
      'Children of i are at 2i+1 and 2i+2; parent is floor((i-1)/2).',
      'Use a max-heap for ascending output; the root holds the current maximum.',
    ],
  },
  {
    heading: 'Linear-time heapify',
    bullets: [
      'Start at the last internal node floor(n/2)-1 and call sift-down to index 0.',
      'Total work is O(n) because lower levels have many nodes with tiny heights.',
    ],
  },
  {
    heading: 'Sort-down',
    bullets: [
      'Swap the root with the last element in the heap boundary.',
      'Reduce heap size by one, then sift-down the new root to restore heap order.',
      'Repeat until the heap size is 1; the array tail ends up sorted.',
    ],
  },
]

const heapProperties = [
  {
    title: 'Heap order property',
    detail:
      'In a max-heap, every parent is >= its children. This guarantees the maximum element sits at the root.',
  },
  {
    title: 'Shape property',
    detail:
      'The heap is a complete binary tree: all levels are full except possibly the last, filled left to right.',
  },
  {
    title: 'Implicit tree',
    detail:
      'The tree lives in the array layout; no pointer objects are needed, which keeps memory overhead tiny.',
  },
]

const loopInvariants = [
  {
    title: 'Heap boundary invariant',
    detail:
      'Before each extraction, a[0..heapSize-1] is a valid max-heap and a[heapSize..n-1] is sorted in ascending order.',
  },
  {
    title: 'Root is current maximum',
    detail:
      'Because of the heap order property, the largest element in the heap boundary is always at index 0.',
  },
  {
    title: 'Sift-down correctness',
    detail:
      'Sift-down restores heap order by pushing the root down until both children are smaller.',
  },
]

const stepTrace = [
  {
    step: 'Build heap',
    state: '[4, 10, 3, 5, 1] -> [10, 5, 3, 4, 1]',
    note: 'Heapify converts the array into a max-heap in-place.',
  },
  {
    step: 'Extract max',
    state: '[10, 5, 3, 4, 1] -> [1, 5, 3, 4, 10]',
    note: 'Swap root with end. Heap boundary shrinks to index 3.',
  },
  {
    step: 'Sift-down',
    state: '[1, 5, 3, 4, 10] -> [5, 4, 3, 1, 10]',
    note: 'Restore heap property in the reduced boundary.',
  },
  {
    step: 'Repeat',
    state: '[5, 4, 3, 1, 10] -> [1, 4, 3, 5, 10] -> [4, 1, 3, 5, 10]',
    note: 'Continue extracting until the array is fully sorted.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      "O(n) to build the heap with Floyd's method, then (n-1) extract-max steps at O(log n) each; total O(n log n) regardless of input order.",
  },
  {
    title: 'Space',
    detail: 'In-place with O(1) auxiliary space. No extra buffers beyond a few temporaries.',
  },
  {
    title: 'Stability',
    detail:
      'Unstable: swaps can reorder equal elements. Stable variants tag items with original indices at the cost of extra space.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Pointer-like jumps (2i+1, 2i+2) hurt locality, so heapsort often lags quicksort or mergesort in wall-clock time despite the same asymptotic bound.',
  },
]

const performanceProfile = [
  {
    title: 'Comparison count',
    detail:
      'Each sift-down compares a node with up to two children per level, making comparisons dense but predictable.',
  },
  {
    title: 'Writes and swaps',
    detail:
      'Heapsort uses swaps heavily, which can be expensive for large records; consider indirect sorting with indices when needed.',
  },
  {
    title: 'Cache locality',
    detail:
      'Jumping between parents and children causes cache misses, often making heapsort slower than quicksort in practice.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Heap sort',
    time: 'O(n log n)',
    space: 'O(1)',
    stable: 'No',
    notes: 'Great worst-case bounds; weaker cache locality.',
  },
  {
    algorithm: 'Quick sort',
    time: 'O(n log n) avg',
    space: 'O(log n)',
    stable: 'No',
    notes: 'Fast in practice; worst case O(n^2) without safeguards.',
  },
  {
    algorithm: 'Merge sort',
    time: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    notes: 'Stable and predictable but needs extra memory.',
  },
  {
    algorithm: 'TimSort',
    time: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    notes: 'Adaptive on real-world data; dominates many standard libraries.',
  },
  {
    algorithm: 'Selection sort',
    time: 'O(n^2)',
    space: 'O(1)',
    stable: 'No',
    notes: 'Simple but too slow for large arrays.',
  },
]

const realWorldUses = [
  {
    context: 'Introsort fallback',
    detail:
      'C++ std::sort and many runtimes fall back to heapsort when quicksort recursion gets too deep, protecting against adversarial inputs.',
  },
  {
    context: 'Top-k selection',
    detail:
      'Maintaining a bounded heap yields top-k without sorting everything, common in leaderboards, search ranking, and monitoring dashboards.',
  },
  {
    context: 'Resource scheduling',
    detail:
      'Heaps back priority queues in simulators, kernels, and networking stacks. Heapsort showcases the same primitives.',
  },
  {
    context: 'External sorting pipelines',
    detail:
      'Deterministic memory use makes heaps useful when producing fixed-size runs for external merge sort or constrained batch jobs.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Bottom-up sift',
    detail:
      'Instead of swapping on every level, move the hole down and place the root once; reduces writes.',
  },
  {
    title: 'Heaps on indices',
    detail:
      'Sort indices instead of records to avoid copying large objects; stable order can be added with index ties.',
  },
  {
    title: 'Min-heap for descending',
    detail:
      'Using a min-heap produces descending order; max-heap yields ascending order.',
  },
  {
    title: 'D-ary heaps',
    detail:
      'Increase branching factor to reduce height; trades extra comparisons for fewer levels.',
  },
]

const examples = [
  {
    title: 'Heapsort (TypeScript-like pseudocode)',
    code: `function heapSort(a: number[]): void {
  const n = a.length;
  // Build max-heap in O(n)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
    siftDown(a, i, n);
  }
  // Sort-down: extract max to the end
  for (let end = n - 1; end > 0; end -= 1) {
    swap(a, 0, end);
    siftDown(a, 0, end); // heap size is "end"
  }
}

function siftDown(a: number[], i: number, size: number): void {
  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
    if (left < size && a[left] > a[largest]) largest = left;
    if (right < size && a[right] > a[largest]) largest = right;
    if (largest === i) break;
    swap(a, i, largest);
    i = largest;
  }
}

function swap(a: number[], i: number, j: number): void {
  const tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}`,
    explanation:
      'Floyd-style heapify builds the structure in linear time. The heap boundary (size) keeps the sorted suffix untouched during sift-down.',
  },
  {
    title: 'Top-k largest via min-heap',
    code: `function topKLargest(stream: number[], k: number): number[] {
  if (k === 0) return [];
  const heap: number[] = [];
  for (const x of stream) {
    if (heap.length < k) {
      heap.push(x);
      siftUpMin(heap, heap.length - 1);
    } else if (x > heap[0]) {
      heap[0] = x;
      siftDownMin(heap, 0, heap.length);
    }
  }
  return heap.sort((a, b) => b - a); // optional final order
}

function siftUpMin(h: number[], i: number): void {
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (h[p] <= h[i]) break;
    swap(h, p, i);
    i = p;
  }
}

function siftDownMin(h: number[], i: number, size: number): void {
  while (true) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    let smallest = i;
    if (l < size && h[l] < h[smallest]) smallest = l;
    if (r < size && h[r] < h[smallest]) smallest = r;
    if (smallest === i) break;
    swap(h, i, smallest);
    i = smallest;
  }
}`,
    explanation:
      'A size-k min-heap keeps the current k largest items; any new item only interacts with the root. This pattern avoids sorting the full stream.',
  },
]

const pitfalls = [
  'Building with repeated insert (sift-up) wastes O(n log n); use Floyd heapify for O(n).',
  'Off-by-one in heapify start: begin at floor(n/2)-1 or you will revisit leaves unnecessarily.',
  'Forgetting to shrink the heap boundary after swapping root with end causes already-sorted elements to be reheapified.',
  'Assuming stability: plain heapsort can reorder equal keys unless you tag original positions.',
  'Expecting quicksort-like cache behavior: scattered accesses can make heapsort slower in practice despite O(n log n) bounds.',
  'Ignoring record size: swapping large objects is costly; use indices or pointers when items are heavy.',
]

const decisionGuidance = [
  'Need worst-case O(n log n) with O(1) space: heapsort is a safe choice or fallback inside introsort.',
  'Need raw speed on average data and good cache use: quicksort or TimSort usually win.',
  'Need stability: choose merge sort or TimSort; stable heapsort needs extra space to tag elements.',
  'Need partial results (top-k): use a bounded heap instead of full heapsort.',
  'Memory constrained environments: heapsort avoids the extra buffers merge-based methods allocate.',
]

const advancedInsights = [
  {
    title: 'Branch and cache tuning',
    detail:
      'Branchless comparisons and blocking the array to improve locality can narrow the gap to quicksort by reducing mispredictions and cache misses.',
  },
  {
    title: 'D-ary heaps',
    detail:
      'Using d-ary heaps reduces height (fewer sift steps) at the cost of more child comparisons per level; useful for wide-fanout hardware or decrease-key heavy queues.',
  },
  {
    title: 'Parallel heapify',
    detail:
      'Bottom-up heap construction parallelizes across subtrees, but merge-based parallel sorts often scale better because of memory access patterns.',
  },
  {
    title: 'Stable heapsort variants',
    detail:
      'Stability can be achieved by pairing each key with its original index and comparing tuples. Time stays O(n log n), space rises to O(n).',
  },
]

const implementationTips = [
  {
    title: 'Keep sift-down tight',
    detail:
      'Use iterative loops and hoist bounds checks to reduce overhead in inner loops.',
  },
  {
    title: 'Choose max-heap for ascending',
    detail:
      'If you build a max-heap, each extraction places the next-largest at the end, yielding ascending order.',
  },
  {
    title: 'Minimize swaps',
    detail:
      'Use a temporary root value and move children up until the correct spot is found.',
  },
  {
    title: 'Prefer Floyd heapify',
    detail:
      'Bottom-up heap construction is linear time; repeated inserts are not.',
  },
]

const takeaways = [
  'Heapsort guarantees O(n log n) time and O(1) extra space for any input.',
  'Floyd heapify is the lever that makes heap construction linear.',
  'Scattered memory access and instability are the main practical drawbacks versus quicksort or mergesort.',
  'Mastering heap primitives pays off beyond sorting: top-k, schedulers, and introsort all rely on them.',
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
    { id: 'core-heap-properties', label: 'Heap Properties' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-trace', label: 'Worked Trace' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-performance', label: 'Performance Profile' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-variants', label: 'Variants and Tweaks' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-implementation', label: 'Implementation Tips' },
    { id: 'core-when-to-use', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const glossary = [
  { term: 'Max-heap', definition: 'Heap where every parent is greater than or equal to its children.' },
  { term: 'Sift-down', definition: 'Operation that restores heap order by pushing a violating root downward.' },
  { term: 'Heapify', definition: 'Build a valid heap from an array, typically in linear time with Floyd’s method.' },
  { term: 'Heap boundary', definition: 'Active unsorted prefix currently treated as the heap.' },
  { term: 'Introsort', definition: 'Hybrid sort that switches to heapsort to guarantee O(n log n) worst-case.' },
]

export default function HeapSortPage(): JSX.Element {
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
    document.title = `Heap Sort (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Heap Sort',
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
          <span className="win98-title-text">Heap Sort</span>
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
            <h1 className="win98-doc-title">Heap Sort</h1>
            <p>
              Heap sort converts the array into a max-heap, then repeatedly swaps the root to the end and restores the heap. It offers
              O(n log n) worst-case time and O(1) extra space, making it a predictable safety net when inputs can be adversarial.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    Heapsort trades a bit of cache friendliness for reliability. It never needs extra buffers, never degrades beyond
                    O(n log n), and uses the same sift primitives that power priority queues. That predictability is why introsort falls
                    back to it when quicksort faces bad pivots.
                  </p>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
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
                  <p>
                    The core operation is sift-down: compare a node to its children, swap with the larger child if the heap property
                    fails, and continue until the path ends. Each swap reduces the height of the violation, so sift-down is O(log n).
                    Building from the bottom amortizes that cost to O(n) overall during heapify.
                  </p>
                </section>
                <section id="core-heap-properties" className="win98-section">
                  <h2 className="win98-heading">Heap Properties</h2>
                  {heapProperties.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
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
                  <h2 className="win98-heading">Complexity Analysis</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="win98-section">
                  <h2 className="win98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {comparisonTable.map((row) => (
                    <p key={row.algorithm}>
                      <strong>{row.algorithm}:</strong> Time: {row.time}. Space: {row.space}. Stable: {row.stable}. {row.notes}
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
                  <h2 className="win98-heading">Advanced Insights and Variations</h2>
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
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
