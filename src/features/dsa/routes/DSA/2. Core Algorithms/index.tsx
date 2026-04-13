import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Core algorithms are the fundamental, named techniques that appear repeatedly across software engineering: sorting, searching, graph traversal, dynamic programming, divide and conquer, greedy methods, and backtracking.',
    notes:
      'These are not language-specific tricks. They are transferable patterns that solve entire classes of problems.',
  },
  {
    title: 'Why it matters',
    details:
      'Most practical problems reduce to a known algorithmic pattern. Recognizing the pattern immediately narrows the solution space and tells you what time and space guarantees to expect.',
    notes:
      'Knowing the toolbox is what separates engineers who invent solutions from scratch every time from those who compose proven building blocks.',
  },
  {
    title: 'Where it shows up',
    details:
      'Sorting: database query planners, rendering pipelines. Searching: compilers, route finders, game AI. DP: sequence alignment, caching, planning. Graph algorithms: social networks, dependency resolution, GPS navigation. Backtracking: constraint solvers, puzzle engines.',
    notes:
      'Interviewers test these patterns explicitly because they reveal whether a candidate can reason about complexity and correctness under pressure.',
  },
]

const mentalModel = [
  {
    title: 'Algorithm families',
    detail:
      'Every core algorithm belongs to a family defined by its strategy: brute force, divide and conquer, greedy, dynamic programming, or backtracking. The family determines the structural shape of the solution.',
  },
  {
    title: 'Time-space tradeoffs',
    detail:
      'All algorithmic choices trade time for space or vice versa. Memoization reduces time at the cost of memory; in-place sorting reduces memory at the cost of implementation complexity.',
  },
  {
    title: 'Correctness before optimization',
    detail:
      'Proving an algorithm correct (invariant, termination, base case) is prerequisite to trusting it. Optimizing an incorrect algorithm produces fast wrong answers.',
  },
  {
    title: 'Asymptotic complexity is not the whole story',
    detail:
      'O(n log n) in theory can be slower than O(n²) in practice for small n due to constant factors and cache behavior. Always measure before micro-optimizing.',
  },
]

const keyTakeaways = [
  'Sorting underlies searching, merging, deduplication, and most database operations. Know at least merge sort, quicksort, and heapsort.',
  'Binary search is not just for sorted arrays — it applies anywhere the search space can be halved by a monotone predicate.',
  'Graph traversal (BFS/DFS) is the backbone of pathfinding, cycle detection, topological sort, and connected component analysis.',
  'Dynamic programming solves problems with overlapping subproblems by trading recomputation for memory.',
  'Greedy algorithms make locally optimal choices and are correct only when the greedy choice property and optimal substructure both hold.',
  'Backtracking is structured brute force: build candidates incrementally and abandon branches that cannot lead to valid solutions.',
  'Divide and conquer splits a problem, solves sub-problems recursively, and merges results — giving O(n log n) for many problems that are O(n²) naively.',
]

const algorithmFamilies = [
  {
    title: 'Sorting',
    detail:
      'Arrange elements in a defined order. Comparison sorts are bounded by Ω(n log n); non-comparison sorts (counting, radix) can be O(n) under constraints.',
    examples: 'Merge sort, quicksort, heapsort, timsort, counting sort, radix sort.',
  },
  {
    title: 'Searching',
    detail:
      'Locate an element or determine it is absent. Binary search requires sorted order and gives O(log n). Linear search is O(n) but works on unsorted data.',
    examples: 'Linear search, binary search, ternary search, exponential search, jump search.',
  },
  {
    title: 'Graph Algorithms',
    detail:
      'Traverse, analyze, or optimize over graph structures. Complexity is typically O(V+E) for traversal and O(E log V) for shortest path with a heap.',
    examples:
      'BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, Prim, topological sort, A*.',
  },
  {
    title: 'Dynamic Programming',
    detail:
      'Break a problem into overlapping subproblems, solve each once, and store results. Requires optimal substructure and overlapping subproblems.',
    examples:
      'Fibonacci, knapsack, edit distance, LCS, LIS, coin change, matrix chain multiplication.',
  },
  {
    title: 'Greedy Algorithms',
    detail:
      'Make the locally optimal choice at each step. Provably correct only when the greedy choice property holds (a global optimum can be built from local optima).',
    examples: 'Huffman coding, activity selection, fractional knapsack, Prim, Kruskal.',
  },
  {
    title: 'Divide and Conquer',
    detail:
      'Split the input, solve each half recursively, and combine results. Analysis via Master Theorem. Often yields O(n log n) from O(n²) naive approaches.',
    examples:
      'Merge sort, quicksort, binary search, Karatsuba multiplication, closest pair of points.',
  },
  {
    title: 'Backtracking',
    detail:
      'Build a solution incrementally, abandoning partial solutions (backtracking) as soon as they are determined to be invalid. Worst case is exponential but pruning makes it practical.',
    examples: 'N-Queens, Sudoku, permutations, subset sum, graph coloring, word search.',
  },
]

const sortingComparison = [
  {
    name: 'Bubble Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: 'Yes',
    note: 'Didactic only; not used in practice',
  },
  {
    name: 'Selection Sort',
    best: 'O(n²)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: 'No',
    note: 'Minimal swaps; poor overall',
  },
  {
    name: 'Insertion Sort',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    space: 'O(1)',
    stable: 'Yes',
    note: 'Fast on nearly-sorted data; used in Timsort',
  },
  {
    name: 'Merge Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    note: 'Guaranteed O(n log n); standard for linked lists',
  },
  {
    name: 'Quick Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    space: 'O(log n)',
    stable: 'No',
    note: 'Best practical sort; worst case avoided with randomized pivot',
  },
  {
    name: 'Heap Sort',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n log n)',
    space: 'O(1)',
    stable: 'No',
    note: 'In-place, guaranteed O(n log n); poor cache behavior',
  },
  {
    name: 'Counting Sort',
    best: 'O(n+k)',
    average: 'O(n+k)',
    worst: 'O(n+k)',
    space: 'O(k)',
    stable: 'Yes',
    note: 'Only for integers in bounded range [0, k]',
  },
  {
    name: 'Radix Sort',
    best: 'O(nk)',
    average: 'O(nk)',
    worst: 'O(nk)',
    space: 'O(n+k)',
    stable: 'Yes',
    note: 'k = number of digits; effective for fixed-width integers',
  },
]

const shortestPathComparison = [
  {
    name: 'BFS',
    complexity: 'O(V+E)',
    weighted: 'No',
    negativeEdges: 'No',
    note: 'Shortest path in unweighted graphs',
  },
  {
    name: 'Dijkstra',
    complexity: 'O(E log V)',
    weighted: 'Yes',
    negativeEdges: 'No',
    note: 'Greedy; use with priority queue',
  },
  {
    name: 'Bellman-Ford',
    complexity: 'O(VE)',
    weighted: 'Yes',
    negativeEdges: 'Yes',
    note: 'Detects negative cycles',
  },
  {
    name: 'Floyd-Warshall',
    complexity: 'O(V³)',
    weighted: 'Yes',
    negativeEdges: 'Yes',
    note: 'All-pairs shortest path; dense graphs',
  },
  {
    name: 'A*',
    complexity: 'O(E log V)',
    weighted: 'Yes',
    negativeEdges: 'No',
    note: 'Heuristic-guided; optimal with admissible heuristic',
  },
]

const dpPatterns = [
  {
    title: 'Top-down (memoization)',
    detail:
      'Write the natural recursion, then cache return values in a hash map or array. Easy to reason about; stack overhead for deep recursion.',
  },
  {
    title: 'Bottom-up (tabulation)',
    detail:
      'Fill a table from base cases upward. No recursion overhead; requires determining the correct fill order.',
  },
  {
    title: 'State compression',
    detail:
      'When state has only a few variables, represent them compactly (e.g., a bitmask for visited nodes) to reduce the table dimensions.',
  },
  {
    title: 'Rolling array',
    detail:
      'If the DP only looks back one or two rows, keep only those rows in memory, reducing O(n²) space to O(n).',
  },
  {
    title: 'Identifying subproblems',
    detail:
      'Ask: what is the smallest version of this problem? What information do I need to solve a slightly larger version? That information is the state.',
  },
]

const commonPatterns = [
  {
    title: 'Two pointers',
    detail:
      'Maintain two indices into a sorted array — converging or sliding — to solve sum, palindrome, and merge problems in O(n).',
  },
  {
    title: 'Sliding window',
    detail:
      'Track a contiguous subarray of variable or fixed size to solve subarray-sum and substring problems in O(n).',
  },
  {
    title: 'Monotonic stack / queue',
    detail:
      'Maintain a stack or queue in sorted order to answer "next greater/smaller element" and sliding-window maximum queries in O(n).',
  },
  {
    title: 'Binary search on the answer',
    detail:
      'When the answer is monotone in a parameter (e.g., larger answer is always feasible if smaller is), binary search on the answer space and check feasibility.',
  },
  {
    title: 'Meet in the middle',
    detail:
      'Split a 2^n problem into two 2^(n/2) halves, enumerate each, then combine. Reduces exponential to sub-exponential.',
  },
  {
    title: 'Prefix sums',
    detail:
      'Precompute cumulative sums to answer range-sum queries in O(1) after O(n) preprocessing.',
  },
]

const pitfalls = [
  {
    mistake: 'Off-by-one in binary search',
    description:
      'Whether to use lo < hi or lo <= hi, and whether to set mid = lo + (hi-lo)/2 or (lo+hi)/2, depends on the invariant you maintain. Mixing conventions produces infinite loops or missed elements.',
  },
  {
    mistake: 'Assuming greedy is correct without proof',
    description:
      'Greedy algorithms are only correct when a specific structural property holds. For problems without that property (e.g., 0-1 knapsack), greedy gives wrong answers.',
  },
  {
    mistake: 'Forgetting base cases in DP',
    description:
      'Missing a base case causes out-of-bounds access or incorrect seeding of the recurrence. Always enumerate all boundary states explicitly.',
  },
  {
    mistake: 'Recomputing in backtracking without pruning',
    description:
      'Without pruning, backtracking is pure brute force. Pruning (constraint propagation, bound checks) is what makes it practical.',
  },
  {
    mistake: 'Unstable sort when relative order matters',
    description:
      'Using an unstable sort (e.g., heapsort) when stability is required (e.g., sorting records by a secondary key already sorted by primary) scrambles the secondary ordering.',
  },
  {
    mistake: 'Using Floyd-Warshall on sparse graphs',
    description:
      'Floyd-Warshall is O(V³) and practical only for dense or small graphs. Use Dijkstra from each source for sparse graphs.',
  },
  {
    mistake: 'Integer overflow in cumulative sums',
    description:
      'Prefix sums and DP tables over large inputs can overflow 32-bit integers. Use 64-bit types when inputs are large.',
  },
]

const codeExamples = [
  {
    title: 'Binary search',
    code: `// TypeScript — find index of target in sorted array, or -1
function binarySearch(arr: number[], target: number): number {
  let lo = 0, hi = arr.length - 1
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2)
    if (arr[mid] === target) return mid
    else if (arr[mid] < target) lo = mid + 1
    else hi = mid - 1
  }
  return -1
}`,
    explanation:
      'The invariant is: if target is in the array, it is in arr[lo..hi]. Each iteration halves the range, giving O(log n).',
  },
  {
    title: 'Merge sort',
    code: `# Python — stable O(n log n) sort
def merge_sort(arr):
  if len(arr) <= 1:
    return arr
  mid = len(arr) // 2
  left = merge_sort(arr[:mid])
  right = merge_sort(arr[mid:])
  return merge(left, right)

def merge(a, b):
  result, i, j = [], 0, 0
  while i < len(a) and j < len(b):
    if a[i] <= b[j]:
      result.append(a[i]); i += 1
    else:
      result.append(b[j]); j += 1
  return result + a[i:] + b[j:]`,
    explanation:
      'Splitting is O(log n) levels deep; merging is O(n) per level — total O(n log n). Stable because equal elements from the left half are always placed first.',
  },
  {
    title: 'Quicksort (randomized)',
    code: `// TypeScript — O(n log n) average, in-place
function quicksort(arr: number[], lo = 0, hi = arr.length - 1): void {
  if (lo >= hi) return
  const pivotIdx = lo + Math.floor(Math.random() * (hi - lo + 1))
  ;[arr[pivotIdx], arr[hi]] = [arr[hi], arr[pivotIdx]]
  let p = lo
  for (let i = lo; i < hi; i++) {
    if (arr[i] <= arr[hi]) { [arr[p], arr[i]] = [arr[i], arr[p]]; p++ }
  }
  ;[arr[p], arr[hi]] = [arr[hi], arr[p]]
  quicksort(arr, lo, p - 1)
  quicksort(arr, p + 1, hi)
}`,
    explanation:
      'Random pivot selection makes worst-case O(n²) extremely unlikely. Average case is O(n log n) with small constants and good cache behavior.',
  },
  {
    title: 'Dynamic programming — coin change',
    code: `# Python — minimum coins to make amount
def coin_change(coins: list[int], amount: int) -> int:
  dp = [float('inf')] * (amount + 1)
  dp[0] = 0
  for a in range(1, amount + 1):
    for c in coins:
      if c <= a:
        dp[a] = min(dp[a], dp[a - c] + 1)
  return dp[amount] if dp[amount] != float('inf') else -1`,
    explanation:
      'dp[a] = minimum coins for amount a. Base case dp[0] = 0. Each amount is computed from smaller amounts, building bottom-up.',
  },
  {
    title: 'Backtracking — N-Queens',
    code: `# Python — all solutions for N-Queens
def n_queens(n: int) -> list[list[int]]:
  results, cols, diag1, diag2 = [], set(), set(), set()
  board: list[int] = []

  def backtrack(row):
    if row == n:
      results.append(board[:])
      return
    for col in range(n):
      if col in cols or (row - col) in diag1 or (row + col) in diag2:
        continue
      cols.add(col); diag1.add(row - col); diag2.add(row + col)
      board.append(col)
      backtrack(row + 1)
      board.pop(); cols.remove(col); diag1.remove(row - col); diag2.remove(row + col)

  backtrack(0)
  return results`,
    explanation:
      'At each row we try every column. Three sets track attacked columns and diagonals, giving O(1) conflict checks. We prune entire subtrees before recursing.',
  },
  {
    title: 'Greedy — activity selection',
    code: `// TypeScript — max non-overlapping intervals
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
      'Choosing the activity that ends earliest is the greedy choice. It provably leaves the maximum remaining time for subsequent activities, making this globally optimal.',
  },
  {
    title: 'Prefix sums — range query',
    code: `// TypeScript — O(1) range sum after O(n) build
function buildPrefix(arr: number[]): number[] {
  const prefix = [0]
  for (const x of arr) prefix.push(prefix[prefix.length - 1] + x)
  return prefix
}

function rangeSum(prefix: number[], l: number, r: number): number {
  return prefix[r + 1] - prefix[l]
}`,
    explanation:
      'prefix[i] stores the sum of arr[0..i-1]. The range sum arr[l..r] = prefix[r+1] - prefix[l], computable in O(1).',
  },
]

const languageMapping = [
  {
    title: 'C++',
    detail:
      'std::sort (introsort: quicksort + heapsort + insertion sort), std::stable_sort (merge sort), std::lower_bound / upper_bound (binary search), std::priority_queue (Dijkstra).',
  },
  {
    title: 'Rust',
    detail:
      'slice::sort (timsort, stable), slice::sort_unstable (pattern-defeating quicksort), std::collections::BinaryHeap for priority queue.',
  },
  {
    title: 'Java',
    detail:
      'Arrays.sort (dual-pivot quicksort for primitives, timsort for objects), Collections.sort (timsort), PriorityQueue (Dijkstra).',
  },
  {
    title: 'Python',
    detail:
      'list.sort() and sorted() use Timsort (stable, O(n log n)). heapq for priority queues. functools.lru_cache for memoization.',
  },
  {
    title: 'JavaScript / TypeScript',
    detail:
      'Array.prototype.sort() is stable since ES2019 (V8 uses Timsort). No built-in priority queue; use a library or hand-roll a binary heap.',
  },
  {
    title: 'Go',
    detail:
      'slices.Sort (pdqsort, unstable), slices.SortStable (merge sort), sort.Search for binary search. No built-in priority queue; implement heap.Interface.',
  },
]

const quickGlossary = [
  {
    term: 'In-place algorithm',
    definition: 'Uses O(1) extra space beyond the input; modifies the input directly.',
  },
  {
    term: 'Stable sort',
    definition: 'Preserves the relative order of equal elements from the original array.',
  },
  {
    term: 'Divide and conquer',
    definition:
      'Split into sub-problems, solve recursively, combine results. Analyzed with the Master Theorem.',
  },
  {
    term: 'Dynamic programming',
    definition: 'Solve overlapping sub-problems once and store results to avoid recomputation.',
  },
  {
    term: 'Optimal substructure',
    definition:
      'A problem has optimal substructure if an optimal solution contains optimal solutions to its sub-problems.',
  },
  {
    term: 'Overlapping subproblems',
    definition:
      'The same sub-problem recurs multiple times in the recursion tree, making memoization worthwhile.',
  },
  {
    term: 'Greedy choice property',
    definition:
      'A globally optimal solution can be built by always making the locally optimal choice.',
  },
  {
    term: 'Backtracking',
    definition:
      'Incrementally build candidates and abandon them as soon as a constraint is violated.',
  },
  {
    term: 'Amortized analysis',
    definition:
      'Average cost per operation over a sequence, smoothing out occasional expensive operations.',
  },
  {
    term: 'Master Theorem',
    definition:
      'A formula for solving recurrences of the form T(n) = aT(n/b) + f(n), common in divide-and-conquer.',
  },
  {
    term: 'Memoization',
    definition:
      'Caching the result of a function call so repeated calls with the same arguments return immediately.',
  },
  {
    term: 'Tabulation',
    definition: 'Bottom-up DP: fill a table from base cases upward without recursion.',
  },
  {
    term: 'Introsort',
    definition:
      'Hybrid of quicksort, heapsort, and insertion sort used by C++ std::sort; O(n log n) worst case.',
  },
  {
    term: 'Timsort',
    definition:
      'Hybrid of merge sort and insertion sort used by Python and Java; stable, O(n log n), O(n) on nearly sorted data.',
  },
]

const choiceChecklist = [
  'General-purpose sort, stability not required? → Quicksort (or introsort/pdqsort in practice).',
  'Sort must be stable? → Merge sort or Timsort.',
  'Sort integers in a bounded range? → Counting sort or radix sort.',
  'Find element in sorted array? → Binary search.',
  'Shortest path, unweighted graph? → BFS.',
  'Shortest path, non-negative weights? → Dijkstra.',
  'Shortest path, negative weights or cycle detection? → Bellman-Ford.',
  'All-pairs shortest path? → Floyd-Warshall (small/dense) or repeated Dijkstra (sparse).',
  'Optimal solution over choices with no overlap and greedy property? → Greedy.',
  'Optimal solution with overlapping subproblems? → Dynamic programming.',
  'Enumerate all valid configurations with constraints? → Backtracking.',
  'Need range queries after preprocessing? → Prefix sums (sum) or segment tree (general).',
]

const compareContrast = [
  {
    title: 'Greedy vs Dynamic Programming',
    detail:
      'Greedy makes one irrevocable choice per step (O(n log n) typical). DP considers all choices at each step and stores results (higher memory, but handles non-greedy-solvable problems).',
  },
  {
    title: 'Backtracking vs DP',
    detail:
      'Backtracking enumerates all valid configurations and is exponential in the worst case. DP solves sub-problems optimally and is polynomial when sub-problems overlap.',
  },
  {
    title: 'Merge sort vs quicksort',
    detail:
      'Merge sort is guaranteed O(n log n) and stable but uses O(n) extra space. Quicksort is in-place with small constants and O(n log n) average, but O(n²) worst case without randomization.',
  },
  {
    title: 'BFS vs Dijkstra',
    detail:
      'BFS treats all edges as weight 1 and finds shortest paths in O(V+E). Dijkstra handles weighted edges in O(E log V) using a priority queue.',
  },
  {
    title: 'Top-down vs bottom-up DP',
    detail:
      'Top-down (memoization) is easier to write and only computes needed sub-problems. Bottom-up (tabulation) avoids recursion overhead and is often faster in practice.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why', label: 'Why This Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-model', label: 'Core Mental Model' },
    { id: 'core-families', label: 'Algorithm Families' },
    { id: 'core-sorting', label: 'Sorting Comparison' },
    { id: 'core-shortest', label: 'Shortest Path Comparison' },
    { id: 'core-dp', label: 'DP Patterns' },
    { id: 'core-patterns', label: 'Common Techniques' },
    { id: 'core-languages', label: 'Language Mapping' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-checklist', label: 'Choice Checklist' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CoreAlgorithmsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Core Algorithms',
    defaultTab: 'big-picture',
  })

  const defaultExample = codeExamples[0] ?? {
    title: 'No examples configured',
    code: 'No code available.',
    explanation: 'No explanation available.',
  }
  const [selectedExampleTitle, setSelectedExampleTitle] = useState(defaultExample.title)

  const selectedExample =
    codeExamples.find((ex) => ex.title === selectedExampleTitle) ?? defaultExample

  return (
    <TopicPageShell
      title="Core Algorithms"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Core Algorithms</h1>
      <p>
        Core algorithms are the named, transferable techniques that form the toolbox of every
        software engineer. Sorting, searching, graph traversal, dynamic programming, greedy methods,
        divide and conquer, and backtracking each solve an entire class of problems. Recognizing
        which family a problem belongs to is often the hardest and most important step in solving
        it.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why This Matters</h2>
            <p>
              Without a working knowledge of core algorithms, every problem looks novel. With it,
              most problems reduce to a known pattern with known complexity bounds. This is not
              about memorizing code — it is about recognizing structure.
            </p>
            <p>
              The difference between a correct O(n²) solution and an O(n log n) one is often just
              recognizing that the problem is a sorting or searching problem in disguise. The
              difference between an exponential and a polynomial solution is recognizing that
              subproblems overlap, enabling dynamic programming.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental-model" className="bin98-section">
            <h2 className="bin98-heading">Core Mental Model</h2>
            {mentalModel.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="core-families" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Families</h2>
            {algorithmFamilies.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>
                  <strong>Examples:</strong> {item.examples}
                </p>
              </div>
            ))}
          </section>
          <section id="core-sorting" className="bin98-section">
            <h2 className="bin98-heading">Sorting Comparison</h2>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Algorithm</th>
                  <th>Best</th>
                  <th>Average</th>
                  <th>Worst</th>
                  <th>Space</th>
                  <th>Stable</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {sortingComparison.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.best}</td>
                    <td>{row.average}</td>
                    <td>{row.worst}</td>
                    <td>{row.space}</td>
                    <td>{row.stable}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-shortest" className="bin98-section">
            <h2 className="bin98-heading">Shortest Path Comparison</h2>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Algorithm</th>
                  <th>Complexity</th>
                  <th>Weighted</th>
                  <th>Negative Edges</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {shortestPathComparison.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.complexity}</td>
                    <td>{row.weighted}</td>
                    <td>{row.negativeEdges}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-dp" className="bin98-section">
            <h2 className="bin98-heading">DP Patterns</h2>
            {dpPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Common Techniques</h2>
            {commonPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-languages" className="bin98-section">
            <h2 className="bin98-heading">Language Mapping</h2>
            {languageMapping.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {compareContrast.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((pitfall) => (
                <li key={pitfall.mistake}>
                  <strong>{pitfall.mistake}:</strong> {pitfall.description}
                </li>
              ))}
            </ul>
          </section>
          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Choice Checklist</h2>
            <ul>
              {choiceChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-code" className="bin98-section">
          <h2 className="bin98-heading">Code Examples</h2>
          <p>Select a scenario to view an annotated code sample.</p>
          <div className="bin98-inline-buttons">
            {codeExamples.map((ex) => (
              <button
                key={ex.title}
                type="button"
                className="bin98-push"
                onClick={() => setSelectedExampleTitle(ex.title)}
              >
                {ex.title}
              </button>
            ))}
          </div>
          <h3 className="bin98-subheading">{selectedExample.title}</h3>
          <div className="bin98-codebox">
            <code>{selectedExample.code.trim()}</code>
          </div>
          <p>{selectedExample.explanation}</p>
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
