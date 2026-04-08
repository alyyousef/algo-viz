import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A greedy algorithm builds a solution step by step, always making the choice that looks best at the current moment without reconsidering past decisions.',
    notes:
      'The key insight is that a locally optimal choice, under the right structural conditions, produces a globally optimal solution.',
  },
  {
    title: 'Why it matters',
    details:
      'When applicable, greedy algorithms are fast — typically O(n log n) from a sort plus O(n) for the sweep — and simple to implement and reason about.',
    notes:
      'The challenge is proving correctness. Greedy fails silently when the required structural properties do not hold. Using it without proof is gambling.',
  },
  {
    title: 'Where it shows up',
    details:
      'Scheduling (activity selection, job sequencing), data compression (Huffman coding), minimum spanning trees (Kruskal, Prim), shortest paths (Dijkstra), coin change on canonical systems, interval partitioning.',
    notes:
      'Many problems that look greedy actually require dynamic programming. The distinction is whether the greedy choice property holds.',
  },
]

const mentalModel = [
  {
    title: 'Greedy choice property',
    detail:
      'A globally optimal solution can always be extended to include the locally optimal choice. If this property holds, you never need to reconsider a choice once made.',
  },
  {
    title: 'Optimal substructure',
    detail:
      'After making a greedy choice, the remaining sub-problem must also have an optimal solution that can be built greedily. Both properties together guarantee correctness.',
  },
  {
    title: 'Exchange argument (proof technique)',
    detail:
      'To prove a greedy algorithm correct, assume an optimal solution differs from the greedy one. Show you can "exchange" the differing choice for the greedy one without making the solution worse. This contradiction proves the greedy solution is optimal.',
  },
  {
    title: 'Matroid theory (advanced)',
    detail:
      'Matroids are the abstract structures that formally characterize when a greedy algorithm is optimal. Many practical greedy problems are implicitly solving a matroid optimization.',
  },
]

const keyTakeaways = [
  'Greedy is correct only when both the greedy choice property and optimal substructure hold — always prove this before trusting the algorithm.',
  'The most common proof technique is the exchange argument: show swapping any non-greedy choice for the greedy one does not worsen the result.',
  'Greedy fails on 0-1 knapsack (items cannot be fractioned) but works on fractional knapsack (items can be split).',
  'Sorting is the most common preprocessing step: sort by deadline, end time, ratio, or frequency before sweeping.',
  'Dijkstra and Prim are greedy algorithms on graphs; their correctness relies on non-negative weights.',
  'When greedy gives wrong answers, the problem likely has overlapping subproblems — switch to dynamic programming.',
]

const classicProblems = [
  {
    title: 'Activity Selection',
    description:
      'Given intervals with start and end times, select the maximum number of non-overlapping intervals.',
    greedy:
      'Always pick the activity that ends earliest among those compatible with the last selected activity.',
    why: 'Ending earliest leaves the most room for future activities (exchange argument proves this).',
    complexity: 'O(n log n) to sort by end time, O(n) sweep.',
  },
  {
    title: 'Fractional Knapsack',
    description:
      'Given items with weights and values and a capacity W, maximize total value. Items can be taken fractionally.',
    greedy:
      'Sort items by value/weight ratio descending. Take items greedily; take a fraction of the last item if needed.',
    why: 'Taking the highest ratio item first maximizes value per unit of capacity used.',
    complexity: 'O(n log n) to sort, O(n) to fill.',
  },
  {
    title: 'Huffman Coding',
    description:
      'Assign variable-length binary codes to characters to minimize total encoded length, given character frequencies.',
    greedy:
      'Repeatedly merge the two nodes with the lowest frequency into a new parent node whose frequency is their sum.',
    why: 'Less frequent characters receive longer codes; the merge order minimizes expected code length. Proven optimal by exchange argument.',
    complexity: 'O(n log n) using a min-heap.',
  },
  {
    title: 'Job Sequencing (minimize lateness)',
    description:
      'Schedule jobs with deadlines on one machine to minimize the maximum lateness (completion time minus deadline).',
    greedy: 'Sort jobs by deadline (earliest deadline first) and schedule them in that order.',
    why: 'EDF eliminates all "inversions" (pairs of jobs out of deadline order). Each swap of an inversion does not increase maximum lateness.',
    complexity: 'O(n log n) to sort.',
  },
  {
    title: 'Interval Partitioning',
    description:
      'Assign intervals to the minimum number of rooms (or machines) such that no two overlapping intervals share a resource.',
    greedy:
      'Process intervals sorted by start time. Assign each to any compatible room; open a new room only if none is available.',
    why: 'The number of rooms needed equals the maximum number of overlapping intervals at any point (depth). The greedy achieves this bound.',
    complexity: 'O(n log n) to sort, O(n log n) with a min-heap for room tracking.',
  },
  {
    title: 'Coin Change (canonical systems)',
    description:
      'Make change for an amount using the fewest coins from a canonical denomination set (e.g., US coins).',
    greedy: 'Always use the largest coin that does not exceed the remaining amount.',
    why: 'Works only for canonical coin systems where denominations are designed such that greedy is optimal. Fails for arbitrary systems.',
    complexity: 'O(n) where n is the number of denominations.',
  },
  {
    title: 'Minimum Spanning Tree (Kruskal)',
    description: 'Find a spanning tree of a weighted graph with minimum total edge weight.',
    greedy:
      'Sort edges by weight. Add each edge to the MST if it does not form a cycle (using DSU for cycle detection).',
    why: 'The cut property of matroids guarantees that the minimum weight edge crossing any cut belongs to some MST.',
    complexity: 'O(E log E) to sort edges, O(E α(V)) for DSU operations.',
  },
  {
    title: 'Minimum Spanning Tree (Prim)',
    description: 'Find a minimum spanning tree by growing it one vertex at a time.',
    greedy:
      'Start from any vertex. Repeatedly add the minimum weight edge connecting the MST to a vertex not yet in it.',
    why: 'Same cut property as Kruskal; at each step the chosen edge is the minimum crossing the current cut.',
    complexity: 'O(E log V) with a binary heap.',
  },
]

const whenGreedyFails = [
  {
    title: '0-1 Knapsack',
    detail:
      'Items cannot be split. Taking the highest-ratio item may block a combination of smaller items with greater total value. Dynamic programming required.',
  },
  {
    title: 'Shortest path with negative edges',
    detail:
      'Dijkstra is greedy and assumes once a node is finalized, its shortest path is known. Negative edges can create shorter paths discovered later. Use Bellman-Ford.',
  },
  {
    title: 'Non-canonical coin systems',
    detail:
      'For coins {1, 3, 4} and amount 6, greedy gives {4, 1, 1} (3 coins); optimal is {3, 3} (2 coins). Greedy choice property does not hold.',
  },
  {
    title: 'Weighted job scheduling',
    detail:
      'Maximizing the total weight of non-overlapping intervals (where jobs have different values) requires DP. EDF greedy only maximizes count, not weighted sum.',
  },
  {
    title: 'Travelling Salesman Problem',
    detail:
      'Nearest-neighbour greedy produces tours but is not guaranteed to be optimal. TSP is NP-hard; greedy gives an approximation.',
  },
]

const proofChecklist = [
  'State the greedy choice: what decision does the algorithm make at each step?',
  'Prove greedy choice property: show that some optimal solution includes the greedy choice (or can be modified to include it without worsening the result).',
  'Prove optimal substructure: after the greedy choice, the remaining problem is a smaller instance of the same problem with an optimal sub-solution.',
  'Combine: by induction, greedy choices at every step produce a globally optimal solution.',
  'Check failure cases: test the algorithm on inputs where the greedy intuition seems weakest.',
]

const codeExamples = [
  {
    title: 'Activity selection',
    code: `// TypeScript — maximum non-overlapping intervals
function activitySelection(intervals: [number, number][]): [number, number][] {
  intervals.sort((a, b) => a[1] - b[1])  // sort by end time
  const result: [number, number][] = []
  let lastEnd = -Infinity
  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      result.push([start, end])
      lastEnd = end
    }
  }
  return result
}`,
    explanation:
      'Sort by end time, then greedily pick each interval that starts after the previous one ends. Each accepted interval minimally constrains the remaining time.',
  },
  {
    title: 'Fractional knapsack',
    code: `# Python — maximize value with capacity W
def fractional_knapsack(items: list[tuple[float, float]], W: float) -> float:
  # items: list of (value, weight)
  items.sort(key=lambda x: x[0] / x[1], reverse=True)
  total = 0.0
  for value, weight in items:
    if W <= 0:
      break
    take = min(weight, W)
    total += take * (value / weight)
    W -= take
  return total`,
    explanation:
      'Sort by value-to-weight ratio. Take each item in full until capacity runs out; take a fraction of the last item if needed.',
  },
  {
    title: 'Huffman coding',
    code: `# Python — build Huffman tree and codes
import heapq

def huffman_codes(freq: dict[str, int]) -> dict[str, str]:
  heap = [[f, [ch, ""]] for ch, f in freq.items()]
  heapq.heapify(heap)
  while len(heap) > 1:
    lo = heapq.heappop(heap)
    hi = heapq.heappop(heap)
    for pair in lo[1:]: pair[1] = '0' + pair[1]
    for pair in hi[1:]: pair[1] = '1' + pair[1]
    heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])
  return {pair[0]: pair[1] for pair in heap[0][1:]}`,
    explanation:
      'Merge the two lowest-frequency nodes repeatedly. Characters with lower frequency receive longer codes. The resulting prefix-free code is optimal.',
  },
  {
    title: 'Kruskal MST',
    code: `// TypeScript — minimum spanning tree via Kruskal + DSU
type Edge = [number, number, number]  // [weight, u, v]

class DSU {
  p: number[]
  constructor(n: number) { this.p = Array.from({ length: n }, (_, i) => i) }
  find(x: number): number {
    if (this.p[x] !== x) this.p[x] = this.find(this.p[x])
    return this.p[x]
  }
  union(x: number, y: number): boolean {
    const rx = this.find(x), ry = this.find(y)
    if (rx === ry) return false
    this.p[rx] = ry
    return true
  }
}

function kruskal(n: number, edges: Edge[]): Edge[] {
  edges.sort((a, b) => a[0] - b[0])
  const dsu = new DSU(n)
  const mst: Edge[] = []
  for (const edge of edges) {
    if (dsu.union(edge[1], edge[2])) mst.push(edge)
    if (mst.length === n - 1) break
  }
  return mst
}`,
    explanation:
      'Sort edges by weight. Add each edge that does not form a cycle (same DSU root). Stop after n-1 edges; we have a spanning tree.',
  },
  {
    title: 'Job sequencing (minimize lateness)',
    code: `# Python — earliest deadline first
def min_lateness(jobs: list[tuple[int, int]]) -> list[tuple[int, int]]:
  # jobs: list of (processing_time, deadline)
  jobs.sort(key=lambda j: j[1])  # sort by deadline
  schedule, t = [], 0
  for p, d in jobs:
    schedule.append((t, t + p, d))  # (start, finish, deadline)
    t += p
  return schedule`,
    explanation:
      'Scheduling in earliest-deadline-first order eliminates all inversions. Any swap of an inversion does not reduce the maximum lateness, so EDF is optimal.',
  },
  {
    title: 'Dijkstra shortest path',
    code: `// TypeScript — greedy shortest path, non-negative weights
function dijkstra(graph: Map<number, [number, number][]>, src: number): Map<number, number> {
  const dist = new Map<number, number>()
  const heap: [number, number][] = [[0, src]]  // [dist, node]
  dist.set(src, 0)
  while (heap.length > 0) {
    heap.sort((a, b) => a[0] - b[0])          // use a real min-heap in production
    const [d, u] = heap.shift()!
    if (d > (dist.get(u) ?? Infinity)) continue
    for (const [v, w] of graph.get(u) ?? []) {
      const nd = d + w
      if (nd < (dist.get(v) ?? Infinity)) {
        dist.set(v, nd)
        heap.push([nd, v])
      }
    }
  }
  return dist
}`,
    explanation:
      'Greedily finalize the nearest unvisited vertex. With non-negative weights, once a vertex is finalized its shortest path cannot improve. Replace the sort with a binary heap for O(E log V).',
  },
]

const pitfalls = [
  {
    mistake: 'Applying greedy without proving correctness',
    description:
      'Greedy algorithms are seductive because they are simple and often give right-looking answers. Testing on small inputs is not a proof — edge cases on large inputs will expose failures.',
  },
  {
    mistake: 'Confusing fractional and 0-1 knapsack',
    description:
      'Greedy by value/weight ratio is optimal only when items are divisible. For 0-1 knapsack, it can give answers far from optimal.',
  },
  {
    mistake: 'Using Dijkstra with negative edge weights',
    description:
      'Once a node is finalized by Dijkstra, it is never revisited. A negative edge discovered later could provide a shorter path, but Dijkstra will not find it.',
  },
  {
    mistake: 'Assuming canonical coin greedy is universal',
    description:
      'Greedy coin change works for denominations like US coins because of their specific ratio structure. It fails for arbitrary denomination sets.',
  },
  {
    mistake: 'Forgetting to sort before sweeping',
    description:
      'Most greedy algorithms require a sorted input. Applying the greedy sweep to unsorted data produces incorrect results silently.',
  },
  {
    mistake: 'Confusing activity selection with weighted job scheduling',
    description:
      'EDF/EFT greedy maximizes the count of non-overlapping intervals, not their total weight. Maximizing weighted sum requires DP.',
  },
]

const languageMapping = [
  {
    title: 'C++',
    detail:
      'std::sort for preprocessing; std::priority_queue (max-heap, negate for min) for Huffman and Dijkstra; std::set for room/resource tracking.',
  },
  {
    title: 'Rust',
    detail:
      'slice::sort_by for preprocessing; BinaryHeap<Reverse<T>> for min-heap behavior in Huffman and Dijkstra.',
  },
  {
    title: 'Java',
    detail:
      'Arrays.sort or Collections.sort; PriorityQueue<> (min-heap by default) for Huffman coding and Dijkstra.',
  },
  {
    title: 'Python',
    detail:
      'list.sort() or sorted() with key=; heapq (min-heap) for Huffman and Dijkstra; negate values for max-heap behavior.',
  },
  {
    title: 'JavaScript / TypeScript',
    detail:
      'Array.prototype.sort() with comparator; no built-in priority queue — use a library or a simple sorted insertion for small inputs.',
  },
  {
    title: 'Go',
    detail:
      'slices.SortFunc for preprocessing; implement heap.Interface on a slice for Dijkstra and Huffman.',
  },
]

const quickGlossary = [
  {
    term: 'Greedy algorithm',
    definition:
      'An algorithm that makes the locally optimal choice at each step with the hope of finding a global optimum.',
  },
  {
    term: 'Greedy choice property',
    definition:
      'A globally optimal solution can be reached by always making the locally optimal (greedy) choice.',
  },
  {
    term: 'Optimal substructure',
    definition:
      'A problem has optimal substructure if an optimal solution contains optimal solutions to its sub-problems.',
  },
  {
    term: 'Exchange argument',
    definition:
      'A proof technique: assume an optimal solution differs from the greedy one and show swapping in the greedy choice does not worsen it.',
  },
  {
    term: 'Activity selection',
    definition:
      'Choose the maximum number of non-overlapping intervals. Solved by earliest-finish-time greedy.',
  },
  {
    term: 'Earliest finish time (EFT)',
    definition:
      'The greedy rule for activity selection: always pick the compatible activity that ends soonest.',
  },
  {
    term: 'Earliest deadline first (EDF)',
    definition: 'Schedule jobs in order of deadline to minimize maximum lateness.',
  },
  {
    term: 'Huffman coding',
    definition:
      'A greedy algorithm that builds an optimal prefix-free code by merging the two lowest-frequency symbols repeatedly.',
  },
  {
    term: 'Fractional knapsack',
    definition:
      'Maximize value in a knapsack where items can be taken as fractions; solved greedily by value/weight ratio.',
  },
  {
    term: 'Matroid',
    definition:
      'An abstract structure that formally characterizes when a greedy algorithm is optimal on a combinatorial problem.',
  },
  {
    term: 'Cut property',
    definition:
      'The minimum weight edge crossing any cut of the graph belongs to some minimum spanning tree.',
  },
  {
    term: 'Canonical coin system',
    definition:
      'A denomination set (like US coins) for which the greedy coin-change algorithm is provably optimal.',
  },
]

const compareContrast = [
  {
    title: 'Greedy vs Dynamic Programming',
    detail:
      'Greedy makes one irrevocable choice per step (fast, simple). DP considers all choices and stores results (polynomial time, higher memory). Use greedy when the greedy choice property holds; use DP otherwise.',
  },
  {
    title: 'Kruskal vs Prim',
    detail:
      'Kruskal sorts all edges and uses DSU to avoid cycles — better for sparse graphs. Prim grows the MST from a source vertex using a priority queue — better for dense graphs or when an adjacency matrix is given.',
  },
  {
    title: 'Dijkstra vs Bellman-Ford',
    detail:
      'Dijkstra is greedy and O(E log V) but requires non-negative weights. Bellman-Ford is DP-based, O(VE), and handles negative edges and cycle detection.',
  },
  {
    title: 'Fractional vs 0-1 Knapsack',
    detail:
      'Fractional: items divisible, greedy by ratio is optimal. 0-1: items indivisible, greedy can be arbitrarily bad, DP required.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.gawin98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}
.gawin98-window {
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
.gawin98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}
.gawin98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}
.gawin98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}
.gawin98-control {
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
.gawin98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}
.gawin98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}
.gawin98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}
.gawin98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}
.gawin98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}
.gawin98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}
.gawin98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.gawin98-toc-list li {
  margin: 0 0 8px;
}
.gawin98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}
.gawin98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}
.gawin98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}
.gawin98-section {
  margin: 0 0 20px;
}
.gawin98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}
.gawin98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}
.gawin98-content p,
.gawin98-content li {
  font-size: 12px;
  line-height: 1.5;
}
.gawin98-content p {
  margin: 0 0 10px;
}
.gawin98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}
.gawin98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}
.gawin98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}
.gawin98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}
.gawin98-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}
.gawin98-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}
@media (max-width: 900px) {
  .gawin98-main {
    grid-template-columns: 1fr;
  }
  .gawin98-toc {
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
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why', label: 'Why This Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-model', label: 'Core Mental Model' },
    { id: 'core-problems', label: 'Classic Problems' },
    { id: 'core-fails', label: 'When Greedy Fails' },
    { id: 'core-proof', label: 'Correctness Proof Checklist' },
    { id: 'core-languages', label: 'Language Mapping' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-takeaways', label: 'Key Takeaways' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function GreedyAlgorithmsPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultExample = codeExamples[0] ?? {
    title: 'No examples configured',
    code: 'No code available.',
    explanation: 'No explanation available.',
  }
  const [selectedExampleTitle, setSelectedExampleTitle] = useState(defaultExample.title)
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const selectedExample =
    codeExamples.find((ex) => ex.title === selectedExampleTitle) ?? defaultExample
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Greedy Algorithms (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Greedy Algorithms',
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
    <div className="gawin98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="gawin98-window" role="presentation">
        <header className="gawin98-titlebar">
          <span className="gawin98-title-text">Greedy Algorithms</span>
          <div className="gawin98-title-controls">
            <button
              className="gawin98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="gawin98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="gawin98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`gawin98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="gawin98-main">
          <aside className="gawin98-toc" aria-label="Table of contents">
            <h2 className="gawin98-toc-title">Contents</h2>
            <ul className="gawin98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="gawin98-content">
            <h1 className="gawin98-doc-title">Greedy Algorithms</h1>
            <p>
              A greedy algorithm makes the locally optimal choice at each step. When the greedy
              choice property and optimal substructure both hold, this strategy produces a globally
              optimal solution — and does so faster and more simply than dynamic programming. When
              those properties do not hold, greedy gives wrong answers. The critical skill is
              knowing when to trust it.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="gawin98-section">
                  <h2 className="gawin98-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="gawin98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="gawin98-divider" />
                <section id="bp-why" className="gawin98-section">
                  <h2 className="gawin98-heading">Why This Matters</h2>
                  <p>
                    Greedy algorithms are among the most useful tools in algorithm design because
                    they are fast and simple when correct. Activity scheduling, Huffman compression,
                    and minimum spanning trees are all solved optimally with greedy methods — O(n
                    log n) against what might naively seem like exponential search spaces.
                  </p>
                  <p>
                    The danger is overconfidence. Greedy is not a general strategy — it is a special
                    case that requires proof. A common error in technical interviews and production
                    code alike is applying greedy to a problem that requires dynamic programming.
                  </p>
                </section>
                <hr className="gawin98-divider" />
                <section id="bp-takeaways" className="gawin98-section">
                  <h2 className="gawin98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental-model" className="gawin98-section">
                  <h2 className="gawin98-heading">Core Mental Model</h2>
                  {mentalModel.map((item) => (
                    <div key={item.title}>
                      <h3 className="gawin98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="core-problems" className="gawin98-section">
                  <h2 className="gawin98-heading">Classic Problems</h2>
                  {classicProblems.map((item) => (
                    <div key={item.title}>
                      <h3 className="gawin98-subheading">{item.title}</h3>
                      <p>
                        <strong>Problem:</strong> {item.description}
                      </p>
                      <p>
                        <strong>Greedy rule:</strong> {item.greedy}
                      </p>
                      <p>
                        <strong>Why it works:</strong> {item.why}
                      </p>
                      <p>
                        <strong>Complexity:</strong> {item.complexity}
                      </p>
                    </div>
                  ))}
                </section>
                <section id="core-fails" className="gawin98-section">
                  <h2 className="gawin98-heading">When Greedy Fails</h2>
                  {whenGreedyFails.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-proof" className="gawin98-section">
                  <h2 className="gawin98-heading">Correctness Proof Checklist</h2>
                  <ul>
                    {proofChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-languages" className="gawin98-section">
                  <h2 className="gawin98-heading">Language Mapping</h2>
                  {languageMapping.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="gawin98-section">
                  <h2 className="gawin98-heading">Compare and Contrast</h2>
                  {compareContrast.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="gawin98-section">
                  <h2 className="gawin98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item.mistake}>
                        <strong>{item.mistake}:</strong> {item.description}
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-takeaways" className="gawin98-section">
                  <h2 className="gawin98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-code" className="gawin98-section">
                <h2 className="gawin98-heading">Code Examples</h2>
                <p>Select a problem to view an annotated implementation.</p>
                <div className="gawin98-inline-buttons">
                  {codeExamples.map((ex) => (
                    <button
                      key={ex.title}
                      type="button"
                      className="gawin98-push"
                      onClick={() => setSelectedExampleTitle(ex.title)}
                    >
                      {ex.title}
                    </button>
                  ))}
                </div>
                <h3 className="gawin98-subheading">{selectedExample.title}</h3>
                <div className="gawin98-codebox">
                  <code>{selectedExample.code.trim()}</code>
                </div>
                <p>{selectedExample.explanation}</p>
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="gawin98-section">
                <h2 className="gawin98-heading">Glossary</h2>
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
