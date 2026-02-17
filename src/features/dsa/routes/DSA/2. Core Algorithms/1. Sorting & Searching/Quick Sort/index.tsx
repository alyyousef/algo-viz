import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalNotes = [
  {
    title: '1960, C. A. R. Hoare invents quicksort',
    detail:
      'Hoare devised quicksort while working on translation software, seeking a fast in-memory sort for words on an Elliott 803. The paper established partitioning around a pivot as a simple, powerful idea.',
  },
  {
    title: '1970s, Sedgewick refines pivoting and cutoffs',
    detail:
      'Robert Sedgewick analyzed variants like median-of-three pivoting and insertion sort cutoffs, reducing comparisons and improving real performance.',
  },
  {
    title: '1997, introsort guards the worst case',
    detail:
      'Musser blended quicksort with heapsort to cap recursion depth, guaranteeing O(n log n) even on adversarial inputs. C++ std::sort popularized this hybrid.',
  },
  {
    title: 'Modern era, three-way partitioning and sampling',
    detail:
      'Variants handle massive duplicates (Dijkstra three-way partition) and use random or sample pivots to keep partitions balanced in practice.',
  },
]

const mentalModels = [
  {
    title: 'Pivot as a fulcrum',
    detail:
      'Drop a fulcrum on a beam of numbers. Everything lighter moves left, heavier moves right. The fulcrum ends up exactly where it belongs in the final order.',
  },
  {
    title: 'Border control checkpoint',
    detail:
      'Two inspectors walk toward each other. When left finds a traveler too big and right finds one too small, they swap them across the border. When inspectors cross, the border (pivot position) is settled.',
  },
  {
    title: 'Divide by filtering',
    detail:
      'Instead of halving by index, quicksort halves by property: less than pivot versus greater than pivot. Good pivots make the property split balanced.',
  },
  {
    title: 'Sorting by elimination',
    detail:
      'Every partition permanently places one element (the pivot) into its final index. The rest of the work is just repeating that elimination on smaller ranges.',
  },
]

const mechanics = [
  {
    heading: 'Pivot selection',
    bullets: [
      'Options: first element, random element, median-of-three (first, middle, last), or sample median for larger arrays.',
      'Randomization defends against pre-sorted or crafted inputs that cause quadratic behavior.',
      'Median-of-three reduces the chance of extremely unbalanced splits without a full sort.',
    ],
  },
  {
    heading: 'Partitioning',
    bullets: [
      'Lomuto: single pass, pivot at end, pointer for smaller region. Simple but more swaps.',
      'Hoare: two pointers from ends moving inward, fewer swaps and good cache behavior.',
      'Three-way partition: split into less than, equal, greater than pivot to handle duplicates efficiently.',
      'Partitioning is linear time: each element is compared a constant number of times per level.',
    ],
  },
  {
    heading: 'Recursion and stack control',
    bullets: [
      'Recurse on left and right partitions. Tail-recurse on the larger side last or turn it into a loop to keep stack depth O(log n) on average.',
      'Switch to insertion sort for tiny partitions (often size < 16) to reduce overhead.',
      'Stop recursion when a range is empty or a single element; that is already sorted.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'In-place array sorting',
    detail:
      'Quicksort is ideal when you need to sort arrays in place with minimal extra memory and strong average performance.',
  },
  {
    title: 'Cache-friendly workloads',
    detail:
      'Partitioning scans sequentially, so quicksort performs well when data fits in cache and memory bandwidth matters.',
  },
  {
    title: 'Randomized expected time',
    detail:
      'Random pivots give reliable expected O(n log n) time even for inputs that might be pathological for fixed pivots.',
  },
  {
    title: 'Not stable by default',
    detail:
      'If preserving the order of equal keys matters, quicksort is not the right default unless a stable variant is used.',
  },
  {
    title: 'Avoid linked lists',
    detail:
      'Linked lists lack random access; quicksort degenerates while merge sort keeps O(n log n) by relinking nodes.',
  },
]

const loopInvariants = [
  {
    title: 'Lomuto invariant',
    detail:
      'At every step, elements before index i are < pivot, elements between i and j are >= pivot, and elements after j are unexamined.',
  },
  {
    title: 'Hoare invariant',
    detail:
      'Pointer i moves right until it finds an element >= pivot, pointer j moves left until it finds an element <= pivot; elements left of i are <= pivot and right of j are >= pivot.',
  },
  {
    title: 'Recursive invariant',
    detail:
      'After partitioning, the pivot is in its final position and the subarrays are permutations of the original range. Sorting both subarrays yields a fully sorted range.',
  },
]

const stepTrace = [
  {
    step: 'Pick a pivot',
    state: '[9, 3, 7, 1, 8, 2], pivot = 7',
    note: 'Choose a pivot (random, median-of-three, or a fixed index for a demo).',
  },
  {
    step: 'Partition around the pivot',
    state: '[3, 1, 2, 7, 9, 8]',
    note: 'All values < 7 are placed left, all values > 7 right. The pivot lands in its final index.',
  },
  {
    step: 'Recurse on each side',
    state: 'Left [3, 1, 2] -> [1, 2, 3], Right [9, 8] -> [8, 9]',
    note: 'Each side is smaller, so the recursion converges quickly when partitions stay balanced.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Average O(n log n) with balanced partitions. Worst case O(n^2) when partitions are highly unbalanced, such as sorted input with a fixed first-element pivot.',
  },
  {
    title: 'Space complexity',
    detail:
      'In-place with O(1) auxiliary data, but needs call stack. Expected recursion depth is O(log n) with random pivots; worst-case depth is O(n) without safeguards.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Partitioning walks arrays sequentially, which is cache-friendly. This often makes quicksort faster than heap sort and sometimes faster than merge sort despite similar asymptotics.',
  },
  {
    title: 'Stability',
    detail:
      'Standard quicksort is unstable; equal elements can swap relative order. Stable variants exist but lose the simple in-place partition.',
  },
  {
    title: 'Comparison count intuition',
    detail:
      'Quicksort performs about 1.39 n log2 n comparisons on average with random pivots, which is near-optimal among comparison sorts.',
  },
]

const inputSensitivity = [
  {
    title: 'Already sorted input',
    detail:
      'A fixed first/last pivot causes worst-case behavior. Random or median-of-three avoids this trap.',
  },
  {
    title: 'Reverse sorted input',
    detail:
      'Same pathology as sorted input when using naive pivots. Randomization or sampling neutralizes it.',
  },
  {
    title: 'Many equal keys',
    detail:
      'Two-way partitioning can stall and create unbalanced splits. Use three-way partitioning for linear-time partitioning on duplicates.',
  },
  {
    title: 'Nearly sorted data',
    detail:
      'Partitioning still works well if pivots are randomized; otherwise, naive pivots can degrade severely.',
  },
]

const performanceProfile = [
  {
    title: 'Balanced partitions',
    detail:
      'When the pivot splits roughly in half, quicksort hits its best O(n log n) behavior with shallow recursion.',
  },
  {
    title: 'Skewed partitions',
    detail:
      'Bad pivots create long recursion chains. Intro sort caps this by switching to heap sort after a depth threshold.',
  },
  {
    title: 'Duplicates',
    detail:
      'Three-way partitioning collapses equal keys into a middle band, reducing recursion and comparisons.',
  },
  {
    title: 'Cache locality',
    detail:
      'Partitioning is a linear scan, which keeps caches hot and often beats heap sort in practice.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Quick sort',
    time: 'O(n log n) avg',
    space: 'O(log n)',
    stable: 'No',
    notes: 'Fast in-place for arrays, but worst case is O(n^2) without guards.',
  },
  {
    algorithm: 'Merge sort',
    time: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    notes: 'Deterministic and stable, but needs extra memory.',
  },
  {
    algorithm: 'Heap sort',
    time: 'O(n log n)',
    space: 'O(1)',
    stable: 'No',
    notes: 'Worst-case safe, but cache-unfriendly and slower constants.',
  },
  {
    algorithm: 'TimSort',
    time: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    notes: 'Adaptive on partially sorted data; used by many libraries.',
  },
  {
    algorithm: 'Insertion sort',
    time: 'O(n^2)',
    space: 'O(1)',
    stable: 'Yes',
    notes: 'Excellent for tiny partitions; common quicksort cutoff.',
  },
]

const applications = [
  {
    context: 'Standard library sorts',
    detail:
      'Many C and C++ qsort or std::sort implementations rely on quicksort or introsort for in-memory arrays because of strong average performance and low overhead.',
  },
  {
    context: 'Selection problems',
    detail:
      'Quickselect, a sibling of quicksort, finds the kth smallest element in expected linear time using the same partition routine.',
  },
  {
    context: 'Partition-based analytics',
    detail:
      'Streaming and analytics tasks use partition steps to split data around a threshold (for example, values above a quantile) without fully sorting.',
  },
  {
    context: 'Randomized algorithms education',
    detail:
      'Quicksort is a primary example of expected-time analysis and randomized algorithms, illustrating how random pivots smooth out adversarial inputs.',
  },
  {
    context: 'In-memory data pipelines',
    detail:
      'ETL steps that require fast ordering of moderate-sized arrays often favor quicksort variants because memory overhead is minimal.',
  },
  {
    context: 'Systems with tight memory budgets',
    detail:
      'Embedded and performance-sensitive systems like the in-place nature and low allocation overhead of quicksort.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Randomized quicksort',
    detail:
      'Pick a random pivot each time to make bad cases vanishingly unlikely and simplify expected-time analysis.',
  },
  {
    title: 'Median-of-three pivoting',
    detail:
      'Take the median of the first, middle, and last elements to reduce the chance of extreme splits.',
  },
  {
    title: 'Three-way partition (Dutch flag)',
    detail:
      'Partition into < pivot, = pivot, > pivot. This removes duplicates in one pass and avoids deep recursion.',
  },
  {
    title: 'Dual-pivot quicksort',
    detail:
      'Used in Java, this partitions into three regions with two pivots. It reduces comparisons in some distributions.',
  },
  {
    title: 'Introsort hybrid',
    detail:
      'Switch to heap sort when recursion depth exceeds a threshold to guarantee O(n log n) worst case.',
  },
  {
    title: 'Iterative quicksort',
    detail:
      'Replace recursion with an explicit stack to avoid call stack limits in constrained environments.',
  },
]

const codeExamples = [
  {
    title: 'Randomized quicksort with Hoare partition',
    code: `function quickSort(a: number[], lo = 0, hi = a.length - 1): void {
  if (lo >= hi) return
  const p = partition(a, lo, hi)
  quickSort(a, lo, p)
  quickSort(a, p + 1, hi)
}

function partition(a: number[], lo: number, hi: number): number {
  const pivotIndex = lo + Math.floor(Math.random() * (hi - lo + 1))
  const pivot = a[pivotIndex]
  // move pivot to start for convenience
  ;[a[lo], a[pivotIndex]] = [a[pivotIndex], a[lo]]
  let i = lo - 1
  let j = hi + 1
  while (true) {
    do { i++ } while (a[i] < pivot)
    do { j-- } while (a[j] > pivot)
    if (i >= j) return j
    ;[a[i], a[j]] = [a[j], a[i]]
  }
}`,
    explanation:
      'Hoare partition returns the final index of the left partition. Random pivot defends against crafted inputs. Tail-call elimination can reduce recursion depth in practice.',
  },
  {
    title: 'Three-way partition to handle duplicates',
    code: `function quickSort3Way(a: number[], lo = 0, hi = a.length - 1): void {
  if (lo >= hi) return
  const pivot = a[lo]
  let lt = lo, gt = hi, i = lo + 1
  while (i <= gt) {
    if (a[i] < pivot) { swap(a, lt++, i++) }
    else if (a[i] > pivot) { swap(a, i, gt--) }
    else { i++ }
  }
  quickSort3Way(a, lo, lt - 1)
  quickSort3Way(a, gt + 1, hi)
}

function swap(a: number[], i: number, j: number): void {
  const tmp = a[i]; a[i] = a[j]; a[j] = tmp
}`,
    explanation:
      'Three partitions (< pivot, == pivot, > pivot) shrink recursion when many duplicates exist, preventing the O(n^2) blowup seen with simple two-way partitioning.',
  },
  {
    title: 'Iterative quicksort (explicit stack)',
    code: `function quickSortIterative(a: number[]): void {
  const stack: Array<[number, number]> = [[0, a.length - 1]]
  while (stack.length) {
    const [lo, hi] = stack.pop()!
    if (lo >= hi) continue
    const p = partition(a, lo, hi)
    // push larger range first so smaller range is processed sooner
    if (p - lo < hi - (p + 1)) {
      stack.push([p + 1, hi], [lo, p])
    } else {
      stack.push([lo, p], [p + 1, hi])
    }
  }
}`,
    explanation:
      'Explicit stacks avoid recursion limits. Always process the smaller side first to keep the stack shallow.',
  },
  {
    title: 'Depth-limited quicksort (introsort idea)',
    code: `function introSort(a: number[]): void {
  const maxDepth = 2 * Math.floor(Math.log2(a.length || 1))
  sortRange(a, 0, a.length - 1, maxDepth)
}

function sortRange(a: number[], lo: number, hi: number, depth: number): void {
  if (lo >= hi) return
  if (depth === 0) return heapSortRange(a, lo, hi)
  const p = partition(a, lo, hi)
  sortRange(a, lo, p, depth - 1)
  sortRange(a, p + 1, hi, depth - 1)
}`,
    explanation:
      'Introsort switches to heap sort when recursion gets too deep, preserving average speed while guaranteeing O(n log n).',
  },
]

const pitfalls = [
  'Choosing the first or last element as pivot on sorted or reverse-sorted input triggers worst-case O(n^2) time. Use randomization or sampling.',
  'Off-by-one errors in partition loops can drop or duplicate elements. Verify invariants: left partition < pivot, right partition > pivot (or <= / >= for chosen variant).',
  'Recursing on the larger partition first inflates stack depth. Always recurse on the smaller side and loop on the larger to keep depth near O(log n).',
  'Assuming stability: quicksort does not preserve equal-ordering. If stability matters, pick merge sort or Timsort.',
  'Skipping small-array cutoffs hurts performance. Switch to insertion sort for tiny ranges to avoid overhead.',
  'Mixing Lomuto and Hoare boundaries is a common bug: each scheme returns different pivot boundaries and requires different recursion limits.',
]

const decisionGuidance = [
  'Need fastest average in-memory sort with small constant factors: quicksort or introsort is often best.',
  'Need guaranteed worst-case O(n log n): use introsort or heap sort; guard quicksort with depth limits.',
  'Need stability: choose merge sort or Timsort.',
  'Data has many duplicates: use three-way quicksort or pivot sampling to avoid unbalanced partitions.',
  'Input might be adversarial or sorted: randomize pivots or median-of-three to avoid quadratic behavior.',
]

const implementationTips = [
  {
    title: 'Choose a pivot strategy deliberately',
    detail:
      'Random or median-of-three pivots make quicksort robust on real data and protect against ordered inputs.',
  },
  {
    title: 'Prefer Hoare partition for fewer swaps',
    detail:
      'Hoare partition often outperforms Lomuto because it swaps less and does fewer writes.',
  },
  {
    title: 'Cut over to insertion sort',
    detail:
      'Most implementations switch to insertion sort for tiny ranges (8-32 elements) to reduce overhead.',
  },
  {
    title: 'Tail recursion elimination',
    detail:
      'Recurse on the smaller partition and loop on the larger to keep stack depth near O(log n).',
  },
  {
    title: 'Use three-way partition for duplicates',
    detail:
      'If your data has many repeated keys, the Dutch flag partition prevents degenerate behavior.',
  },
]

const advancedInsights = [
  {
    title: 'Introsort safety net',
    detail:
      'Track recursion depth; when it exceeds 2 log2 n, switch to heap sort. This keeps the O(n log n) guarantee without losing quicksort speed on typical data.',
  },
  {
    title: 'Median-of-medians pivot',
    detail:
      'Using the deterministic linear-time median-of-medians algorithm as a pivot yields guaranteed balanced partitions, but higher constants make it slower in practice.',
  },
  {
    title: 'Cache-aware partitioning',
    detail:
      'Block partitioning and branchless comparisons reduce cache misses and branch mispredictions, narrowing the gap to theoretical optimal performance.',
  },
  {
    title: 'Parallel quicksort',
    detail:
      'Partitioning both halves in parallel can speed large arrays on multi-core systems, but requires careful scheduling to avoid false sharing and load imbalance.',
  },
  {
    title: 'Branch prediction effects',
    detail:
      'Data distributions affect branch predictability. Branchless partitioning can speed up highly random data on modern CPUs.',
  },
]

const takeaways = [
  'Quicksort excels on average because partitioning is cache-friendly and in-place.',
  'Random or sampled pivots and three-way partitioning keep performance near O(n log n) even with duplicates or sorted data.',
  'Worst-case O(n^2) is real; introsort-style guards eliminate that risk.',
  'Quicksort is unstable; choose a stable algorithm when equal-ordering matters.',
  'References: Hoare 1961 paper, CLRS Chapter 7, Sedgewick analyses, and GeeksforGeeks for visual traces.',
]

const quickGlossary = [
  {
    term: 'Pivot',
    definition: 'The reference value used to partition elements into lower and higher groups.',
  },
  {
    term: 'Partition',
    definition: 'A linear pass that rearranges elements around a pivot according to a comparison rule.',
  },
  {
    term: 'Lomuto partition',
    definition: 'Single-index partition scheme that is simple but often performs more swaps.',
  },
  {
    term: 'Hoare partition',
    definition: 'Two-pointer partition scheme that usually performs fewer swaps and writes.',
  },
  {
    term: 'Three-way partition',
    definition: 'Partitioning into < pivot, = pivot, and > pivot regions to handle duplicates efficiently.',
  },
  {
    term: 'Introsort',
    definition: 'A hybrid that starts with quicksort and switches to heapsort when recursion gets too deep.',
  },
  {
    term: 'Tail recursion elimination',
    definition: 'Recurse on the smaller side and loop on the larger to cap stack depth.',
  },
  {
    term: 'Stability',
    definition: 'Property that equal keys preserve original order; standard quicksort is not stable.',
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
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-complexity', label: 'Complexity Analysis' },
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
    { id: 'ex-trace', label: 'Worked Trace' },
    { id: 'ex-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const quick98HelpStyles = `
.quick98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.quick98-window {
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

.quick98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.quick98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.quick98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.quick98-control {
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

.quick98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.quick98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.quick98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.quick98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.quick98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.quick98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.quick98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.quick98-toc-list li {
  margin: 0 0 8px;
}

.quick98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.quick98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.quick98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.quick98-section {
  margin: 0 0 20px;
}

.quick98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.quick98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.quick98-content p,
.quick98-content li,
.quick98-content td,
.quick98-content th {
  font-size: 12px;
  line-height: 1.5;
}

.quick98-content p {
  margin: 0 0 10px;
}

.quick98-content ul,
.quick98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.quick98-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 10px;
}

.quick98-content th,
.quick98-content td {
  border: 1px solid #808080;
  padding: 4px 6px;
  text-align: left;
}

.quick98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.quick98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.quick98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .quick98-main {
    grid-template-columns: 1fr;
  }

  .quick98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

export default function QuickSortPage(): JSX.Element {
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
    document.title = `Quick Sort (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Quick Sort',
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
    <div className="quick98-page">
      <style>{quick98HelpStyles}</style>
      <div className="quick98-window" role="presentation">
        <header className="quick98-titlebar">
          <span className="quick98-title-text">Quick Sort - Help</span>
          <div className="quick98-title-controls">
            <button className="quick98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="quick98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="quick98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`quick98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="quick98-main">
          <aside className="quick98-toc" aria-label="Table of contents">
            <h2 className="quick98-toc-title">Contents</h2>
            <ul className="quick98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="quick98-content">
            <h1 className="quick98-doc-title">Quick Sort</h1>
            <p>
              Quick sort selects a pivot, partitions the array into elements less and greater than that pivot, and recurses on each side.
              With good pivots it delivers fast, in-place O(n log n) sorting; with guardrails it avoids the rare quadratic worst case.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="quick98-section">
                  <h2 className="quick98-heading">Overview</h2>
                  <p>
                    Quicksort shines when you want speed with minimal extra memory. It divides by property rather than by position, letting
                    the pivot fall into its final slot after a single partition pass. The algorithm is simple to code yet deep enough to
                    teach randomized analysis, cache behavior, and adversarial thinking.
                  </p>
                </section>
                <hr className="quick98-divider" />
                <section id="bp-history" className="quick98-section">
                  <h2 className="quick98-heading">Historical Context</h2>
                  {historicalNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-mental-models" className="quick98-section">
                  <h2 className="quick98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-patterns" className="quick98-section">
                  <h2 className="quick98-heading">Problem Patterns</h2>
                  {problemPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="quick98-section">
                  <h2 className="quick98-heading">Key Takeaways</h2>
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
                <section id="core-mechanics" className="quick98-section">
                  <h2 className="quick98-heading">How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="quick98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p>
                    The partition phase is the heart: a single pass rearranges elements so the pivot can be placed in its final index.
                    After that, the pivot is done forever. Choosing the smaller side for recursion first keeps stack growth contained.
                    Tiny slices often switch to insertion sort to cut overhead and comparisons.
                  </p>
                </section>
                <section id="core-invariants" className="quick98-section">
                  <h2 className="quick98-heading">Loop Invariants</h2>
                  {loopInvariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="quick98-section">
                  <h2 className="quick98-heading">Complexity Analysis</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <section id="core-sensitivity" className="quick98-section">
                  <h2 className="quick98-heading">Input Sensitivity</h2>
                  {inputSensitivity.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="quick98-section">
                  <h2 className="quick98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="quick98-section">
                  <h2 className="quick98-heading">Compare and Contrast</h2>
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
                <section id="core-applications" className="quick98-section">
                  <h2 className="quick98-heading">Real-World Applications</h2>
                  {applications.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="quick98-section">
                  <h2 className="quick98-heading">Variants and Tweaks</h2>
                  {variantsAndTweaks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="quick98-section">
                  <h2 className="quick98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-implementation" className="quick98-section">
                  <h2 className="quick98-heading">Implementation Tips</h2>
                  {implementationTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decisions" className="quick98-section">
                  <h2 className="quick98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="quick98-section">
                  <h2 className="quick98-heading">Advanced Insights</h2>
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
                <section id="ex-trace" className="quick98-section">
                  <h2 className="quick98-heading">Worked Trace</h2>
                  {stepTrace.map((item) => (
                    <div key={item.step}>
                      <h3 className="quick98-subheading">{item.step}</h3>
                      <p>{item.state}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-code" className="quick98-section">
                  <h2 className="quick98-heading">Code Examples</h2>
                  {codeExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="quick98-subheading">{example.title}</h3>
                      <div className="quick98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}
            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="quick98-section">
                <h2 className="quick98-heading">Glossary</h2>
                {quickGlossary.map((item) => (
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

