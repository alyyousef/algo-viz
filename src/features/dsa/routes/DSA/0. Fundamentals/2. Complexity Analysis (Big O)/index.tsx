import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { type TopicTab, useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    detail:
      'Complexity analysis measures how resource usage (time or memory) grows as input size n increases. It focuses on growth rate, not exact seconds.',
    note: 'Think of it as a performance trend line.',
  },
  {
    title: 'Why it exists',
    detail:
      'It helps you avoid algorithms that collapse at scale and choose approaches that remain practical as data grows.',
    note: 'It is a scaling safety check.',
  },
  {
    title: 'Where it shows up',
    detail:
      'Everywhere: sorting libraries, database indexing, search, and system design tradeoffs all rely on complexity intuition.',
    note: 'It is the shared language of performance.',
  },
]

const asymptoticNotations = [
  {
    title: 'Big O (O): Upper bound',
    detail:
      'Describes the worst-case growth. If an algorithm is O(n^2), it will not grow faster than a quadratic function.',
    math: 'f(n) = O(g(n)) if there exist c > 0 and n0 such that 0 <= f(n) <= c * g(n) for all n >= n0.',
  },
  {
    title: 'Big Omega (Omega): Lower bound',
    detail:
      'Describes the best-case growth. If an algorithm is Omega(n), it will not grow slower than linear.',
    math: 'f(n) = Omega(g(n)) if there exist c > 0 and n0 such that 0 <= c * g(n) <= f(n) for all n >= n0.',
  },
  {
    title: 'Big Theta (Theta): Tight bound',
    detail:
      'Used when upper and lower bounds match. If an algorithm is Theta(n log n), it grows at that rate tightly.',
    math: 'f(n) = Theta(g(n)) if f(n) is both O(g(n)) and Omega(g(n)).',
  },
]

const growthIntuition = [
  {
    title: 'Growth dominates constants',
    detail:
      'A 10x constant is real, but eventually a higher-order term wins. O(n log n) overtakes O(n) only at scale.',
  },
  {
    title: 'Logarithms grow slowly',
    detail:
      'Doubling n adds just one extra step to a log2 n process. Log factors are gentle but still meaningful.',
  },
  {
    title: 'Polynomial vs exponential',
    detail:
      'O(n^3) is often feasible; O(2^n) usually is not beyond small n. The gap explodes quickly.',
  },
  {
    title: 'Worst case can be engineered',
    detail:
      'Adversarial inputs can force worst-case behavior. Security and real-time systems must plan for it.',
  },
  {
    title: 'Space is part of the budget',
    detail:
      'Memory-heavy algorithms may be slower due to cache misses even if time complexity looks good.',
  },
  {
    title: 'Input size definition matters',
    detail: 'n might be elements, digits, vertices, edges, or bytes. Always define it explicitly.',
  },
  {
    title: 'Two resources can trade places',
    detail:
      'A fast algorithm that exceeds memory can become slower due to paging; time and space interact.',
  },
  {
    title: 'Lower bounds guide expectations',
    detail: 'Comparison sorting cannot beat Theta(n log n); knowing limits prevents wasted effort.',
  },
]

const complexityClasses = [
  {
    class: 'O(1) - Constant',
    explanation: 'Runtime is independent of input size. Example: array access by index.',
    code: `function getFirstElement(arr) {
  return arr[0];
}`,
  },
  {
    class: 'O(log n) - Logarithmic',
    explanation: 'Each step reduces the problem space, as in binary search.',
    code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
}`,
  },
  {
    class: 'O(n) - Linear',
    explanation: 'Work grows in direct proportion to input size, like a full scan.',
    code: `function findSum(arr) {
  let sum = 0;
  for (const element of arr) {
    sum += element;
  }
  return sum;
}`,
  },
  {
    class: 'O(n log n) - Linearithmic',
    explanation: 'Sorting and divide-and-conquer algorithms often land here.',
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`,
  },
  {
    class: 'O(n^2) - Quadratic',
    explanation: 'Nested loops over the same data lead to quadratic growth.',
    code: `function findPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}`,
  },
  {
    class: 'O(2^n) - Exponential',
    explanation:
      'Work doubles with each added input element; brute-force subset search is typical.',
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  },
  {
    class: 'O(n!) - Factorial',
    explanation: 'Enumerating all permutations grows factorially and becomes infeasible quickly.',
    code: `function permutations(arr, current = []) {
  if (arr.length === 0) console.log(current);
  for (let i = 0; i < arr.length; i++) {
    let rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    permutations(rest, [...current, arr[i]]);
  }
}`,
  },
]

const algorithmCheatSheet = {
  sorting: [
    {
      name: 'Bubble Sort',
      time: 'Theta(n^2)',
      space: 'O(1)',
      notes: 'Simple but inefficient; even best case still quadratic.',
    },
    {
      name: 'Insertion Sort',
      time: 'O(n^2)',
      space: 'O(1)',
      notes: 'Best case is Omega(n) on nearly sorted data.',
    },
    {
      name: 'Selection Sort',
      time: 'Theta(n^2)',
      space: 'O(1)',
      notes: 'Always scans for a minimum; order does not help.',
    },
    {
      name: 'Merge Sort',
      time: 'Theta(n log n)',
      space: 'O(n)',
      notes: 'Predictable performance; great for external sorting.',
    },
    {
      name: 'Quick Sort',
      time: 'O(n^2)',
      space: 'O(log n)',
      notes: 'Average Theta(n log n); worst case on bad pivots.',
    },
    {
      name: 'Heap Sort',
      time: 'Theta(n log n)',
      space: 'O(1)',
      notes: 'In-place but slower in practice than tuned quicksort.',
    },
    {
      name: 'Radix Sort',
      time: 'Theta(nk)',
      space: 'O(n + k)',
      notes: 'k is number of digits; not comparison-based.',
    },
  ],
  searching: [
    {
      name: 'Linear Search',
      time: 'O(n)',
      space: 'O(1)',
      notes: 'Worst case is linear; best case is Omega(1).',
    },
    {
      name: 'Binary Search',
      time: 'O(log n)',
      space: 'O(1)',
      notes: 'Requires sorted data; extremely efficient.',
    },
    {
      name: 'Hash lookup',
      time: 'O(1)',
      space: 'O(n)',
      notes: 'Average constant time; worst case O(n) with bad hashing.',
    },
  ],
  dataStructures: [
    { name: 'Array (Access)', time: 'Theta(1)', space: '-', notes: 'Direct memory access.' },
    {
      name: 'Stack (Push/Pop)',
      time: 'Theta(1)',
      space: '-',
      notes: 'Operations on the top of the stack.',
    },
    {
      name: 'Queue (Enqueue/Dequeue)',
      time: 'Theta(1)',
      space: '-',
      notes: 'Amortized for array-based implementations.',
    },
    {
      name: 'Linked List (Search/Insert)',
      time: 'O(n)',
      space: '-',
      notes: 'Insert is O(1) with pointer; search is O(n).',
    },
    {
      name: 'Hash Table (Search/Insert/Delete)',
      time: 'O(1)',
      space: 'O(n)',
      notes: 'Average Theta(1); worst case O(n) with collisions.',
    },
    {
      name: 'Binary Search Tree (BST)',
      time: 'O(n)',
      space: 'O(n)',
      notes: 'Balanced trees are Theta(log n); unbalanced is linear.',
    },
    {
      name: 'AVL Tree / Red-Black Tree',
      time: 'Theta(log n)',
      space: 'O(n)',
      notes: 'Self-balancing trees with guaranteed log n.',
    },
    {
      name: 'Heap (Insert/Extract)',
      time: 'Theta(log n)',
      space: 'O(n)',
      notes: 'Priority queue operations are logarithmic.',
    },
  ],
  graph: [
    {
      name: 'Breadth-First Search (BFS)',
      time: 'Theta(V + E)',
      space: 'Theta(V)',
      notes: 'Explores level by level using a queue.',
    },
    {
      name: 'Depth-First Search (DFS)',
      time: 'Theta(V + E)',
      space: 'Theta(V)',
      notes: 'Deep traversal using stack or recursion.',
    },
    {
      name: "Dijkstra's Algorithm",
      time: 'O(E log V)',
      space: 'O(V)',
      notes: 'Binary heap; non-negative edge weights.',
    },
    {
      name: "Prim's Algorithm",
      time: 'O(E log V)',
      space: 'O(V)',
      notes: 'Minimum spanning tree; similar to Dijkstra.',
    },
    {
      name: "Kruskal's Algorithm",
      time: 'O(E log V)',
      space: 'O(V)',
      notes: 'Sort edges then union-find.',
    },
  ],
}
const inputConstraints = [
  {
    title: 'n <= 10^3',
    detail: 'Quadratic or even cubic algorithms can be acceptable with clean implementations.',
  },
  {
    title: 'n <= 10^5',
    detail: 'Aim for O(n log n) or better. Quadratic is typically too slow.',
  },
  {
    title: 'n <= 10^7',
    detail: 'Linear or near-linear is required. Constant factors and memory layout dominate.',
  },
  {
    title: 'n = 10^9+',
    detail: 'You must use sublinear methods, streaming, or external memory algorithms.',
  },
]

const complexityPatterns = [
  {
    title: 'Single loop',
    detail: 'One pass over n items is O(n).',
  },
  {
    title: 'Nested loops',
    detail: 'Two loops over n items is O(n^2), three is O(n^3).',
  },
  {
    title: 'Divide and conquer',
    detail: 'Split into halves + linear merge gives O(n log n).',
  },
  {
    title: 'Backtracking',
    detail: 'Exploring all subsets often leads to O(2^n) or worse.',
  },
  {
    title: 'Sorting + scanning',
    detail: 'Sort O(n log n) then linear pass; total O(n log n).',
  },
  {
    title: 'Hashing to avoid nesting',
    detail: 'Use a hash table to replace inner loops and drop O(n^2) to O(n).',
  },
]

const caseAnalysis = [
  {
    title: 'Best case',
    detail: 'The most favorable input arrangement. Often Omega(1) or Omega(n).',
  },
  {
    title: 'Average case',
    detail: 'Expected cost under an input distribution. Useful but can be misleading.',
  },
  {
    title: 'Worst case',
    detail: 'The most expensive input. Used for guarantees and safety.',
  },
  {
    title: 'Amortized case',
    detail: 'Average over a sequence of operations; gives guaranteed per-op cost.',
  },
]

const recurrenceExamples = [
  {
    title: 'Binary search',
    code: 'T(n) = T(n/2) + O(1) => Theta(log n)',
    explanation: 'Halves the search space each step.',
  },
  {
    title: 'Merge sort',
    code: 'T(n) = 2T(n/2) + O(n) => Theta(n log n)',
    explanation: 'Two subproblems plus linear merge.',
  },
  {
    title: 'Quick sort (average)',
    code: 'T(n) = T(k) + T(n-k) + O(n) => Theta(n log n) avg',
    explanation: 'Balanced partitions dominate the average case.',
  },
  {
    title: 'Naive Fibonacci',
    code: 'T(n) = T(n-1) + T(n-2) + O(1) => Theta(phi^n)',
    explanation: 'Repeated subproblems create exponential growth.',
  },
]

const inputSizeExamples = [
  {
    title: 'Sorting integers',
    detail:
      'n = number of elements. Comparison sorts run in O(n log n) regardless of element size (ignoring key length).',
  },
  {
    title: 'Searching strings',
    detail:
      'n can be total text length. Naive search is O(nm); KMP is O(n + m) for pattern length m.',
  },
  {
    title: 'Graphs',
    detail: 'n = V vertices and E edges. BFS/DFS are O(V + E). Dense graphs have E ~ V^2.',
  },
  {
    title: 'Big integer arithmetic',
    detail: 'n can be number of digits/bits. Multiplication is not O(1) for large integers.',
  },
  {
    title: 'Matrix operations',
    detail:
      'n can represent rows/cols. Naive multiplication is O(n^3); Strassen improves to ~O(n^2.81).',
  },
  {
    title: 'Streaming data',
    detail: 'n can be total processed events; per-event complexity becomes the key metric.',
  },
]

const amortizedAnalysis = [
  {
    title: 'What it means',
    detail:
      'Amortized analysis averages expensive operations over a sequence, showing overall cost per operation.',
  },
  {
    title: 'Dynamic array growth',
    detail:
      'Resizing an array is O(n), but it happens rarely. The average push is still O(1) amortized.',
  },
  {
    title: 'Potential method',
    detail:
      'Track stored "potential energy" in a data structure to pay for future expensive steps.',
  },
  {
    title: 'Aggregate method',
    detail: 'Sum the cost of a full sequence of operations and divide by the number of operations.',
  },
  {
    title: 'Amortized != average',
    detail:
      'Amortized bounds are guaranteed over sequences; average case depends on input distribution.',
  },
  {
    title: 'When it matters',
    detail:
      'Use it for data structures with occasional costly events: hash table rehash, union-find, splay trees.',
  },
]

const masterTheoremNotes = [
  {
    title: 'Divide-and-conquer form',
    detail:
      'Recurrences of the form T(n) = aT(n/b) + f(n) can be classified with the master theorem.',
  },
  {
    title: 'Case 1: f(n) smaller',
    detail: 'If f(n) = O(n^(log_b a - epsilon)), then T(n) = Theta(n^(log_b a)).',
  },
  {
    title: 'Case 2: f(n) matches',
    detail: 'If f(n) = Theta(n^(log_b a) * log^k n), then T(n) = Theta(n^(log_b a) * log^(k+1) n).',
  },
  {
    title: 'Case 3: f(n) larger',
    detail:
      'If f(n) = Omega(n^(log_b a + epsilon)) and a regularity condition holds, T(n) = Theta(f(n)).',
  },
]

const memoryTradeoffs = [
  {
    title: 'Time vs space',
    detail:
      'Memoization can turn exponential recursion into polynomial time at the cost of extra memory.',
  },
  {
    title: 'Cache effects',
    detail:
      'An O(n) algorithm with poor locality can be slower than O(n log n) with tight cache use.',
  },
  {
    title: 'Streaming vs storing',
    detail:
      'Single-pass streaming uses O(1) or O(log n) space but may forgo optimizations that require storage.',
  },
  {
    title: 'Precomputation',
    detail:
      'Building indexes or lookup tables reduces query time but increases build time and storage.',
  },
  {
    title: 'Parallel overhead',
    detail: 'Parallel algorithms reduce wall time but add synchronization and memory overhead.',
  },
  {
    title: 'External memory',
    detail: 'When data exceeds RAM, I/O complexity dominates; algorithms must minimize disk seeks.',
  },
]

const workedExamples = [
  {
    title: 'Nested loops with early break',
    code: `function findDuplicate(arr):
    for i in 0..n-1:
        for j in i+1..n-1:
            if arr[i] == arr[j]: return true
    return false`,
    explanation:
      'Worst case is O(n^2) when no duplicate is found; best case is Omega(1) if the first pair matches.',
  },
  {
    title: 'Binary search on sorted array',
    code: `function find(arr, target):
    low = 0, high = n-1
    while low <= high:
        mid = (low + high) / 2
        if arr[mid] == target: return mid
        if arr[mid] < target: low = mid + 1
        else: high = mid - 1`,
    explanation: 'Each step halves the search space, giving O(log n) time and O(1) space.',
  },
  {
    title: 'Merge sort recurrence',
    code: `T(n) = 2T(n/2) + O(n)`,
    explanation: 'Master theorem gives T(n) = Theta(n log n). The merge step dominates each level.',
  },
  {
    title: 'Two-sum with hashing',
    code: `function twoSum(arr, target):
    seen = set()
    for x in arr:
        if target - x in seen: return true
        seen.add(x)
    return false`,
    explanation: 'Single pass with hash lookups yields O(n) time and O(n) space.',
  },
  {
    title: 'Matrix multiplication',
    code: `for i in 0..n-1:
    for j in 0..n-1:
        sum = 0
        for k in 0..n-1:
            sum += A[i][k] * B[k][j]`,
    explanation: 'Three nested loops give O(n^3) time; space is O(1) extra beyond matrices.',
  },
  {
    title: 'Linear scan with two pointers',
    code: `function hasPairSum(sorted, target):
    i = 0, j = n-1
    while i < j:
        s = sorted[i] + sorted[j]
        if s == target: return true
        if s < target: i += 1
        else: j -= 1
    return false`,
    explanation: 'Sorting then scanning is O(n log n) overall; the scan itself is O(n).',
  },
]

const profilingNotes = [
  {
    title: 'Measure on realistic data',
    detail: 'Synthetic benchmarks can hide cache and I/O effects; use real workloads.',
  },
  {
    title: 'Avoid micro-bench traps',
    detail: 'Small inputs can invert the ranking; constant factors dominate until n grows.',
  },
  {
    title: 'Look for bottlenecks',
    detail: 'Complexity points to suspects, but profiling shows which code is actually hot.',
  },
  {
    title: 'Know your limits',
    detail: 'Memory bandwidth and latency often cap performance before CPU arithmetic.',
  },
]

const pitfalls = [
  'Constants matter: an O(n) algorithm with large constants can lose to O(n^2) on small n.',
  'Define what n means: elements, digits, vertices, or edges.',
  'Average vs worst case can matter in security and real-time systems.',
  'Space complexity is real; fast time with huge memory can be impractical.',
  'Optimizing without profiling can harm clarity with little payoff.',
]

const keyTakeaways = [
  {
    title: 'A language of growth',
    detail: 'Complexity focuses on scale trends, not exact timings.',
  },
  {
    title: 'Bounds answer different questions',
    detail: 'O gives a ceiling, Omega gives a floor, Theta gives a tight description.',
  },
  {
    title: 'Recognize common classes',
    detail: 'O(1), O(log n), O(n), O(n log n), and O(n^2) show up everywhere.',
  },
  {
    title: 'Theory guides, practice decides',
    detail: 'Use complexity to eliminate bad choices, then validate with profiling.',
  },
  {
    title: 'Amortized guarantees are real',
    detail:
      'Use amortized analysis to reason about data structures with occasional expensive steps.',
  },
  {
    title: 'Input size must be explicit',
    detail: 'Always state what n represents to avoid incorrect comparisons.',
  },
]

const bigO = asymptoticNotations[0] ?? {
  title: 'Big O (O): Upper bound',
  detail:
    'Describes the worst-case growth. If an algorithm is O(n^2), it will not grow faster than a quadratic function.',
  math: 'f(n) = O(g(n)) if there exist c > 0 and n0 such that 0 <= f(n) <= c * g(n) for all n >= n0.',
}
const bigOmega = asymptoticNotations[1] ?? {
  title: 'Big Omega (Omega): Lower bound',
  detail:
    'Describes the best-case growth. If an algorithm is Omega(n), it will not grow slower than linear.',
  math: 'f(n) = Omega(g(n)) if there exist c > 0 and n0 such that 0 <= c * g(n) <= f(n) for all n >= n0.',
}
const bigTheta = asymptoticNotations[2] ?? {
  title: 'Big Theta (Theta): Tight bound',
  detail:
    'Used when upper and lower bounds match. If an algorithm is Theta(n log n), it grows at that rate tightly.',
  math: 'f(n) = Theta(g(n)) if f(n) is both O(g(n)) and Omega(g(n)).',
}
const bestCase = caseAnalysis[0] ?? {
  title: 'Best case',
  detail: 'The most favorable input arrangement. Often Omega(1) or Omega(n).',
}
const averageCase = caseAnalysis[1] ?? {
  title: 'Average case',
  detail: 'Expected cost under an input distribution. Useful but can be misleading.',
}
const worstCase = caseAnalysis[2] ?? {
  title: 'Worst case',
  detail: 'The most expensive input. Used for guarantees and safety.',
}
const amortizedCase = caseAnalysis[3] ?? {
  title: 'Amortized case',
  detail: 'Average over a sequence of operations; gives guaranteed per-op cost.',
}
const inputSizeTerm = growthIntuition[5] ?? {
  title: 'Input size definition matters',
  detail: 'n might be elements, digits, vertices, edges, or bytes. Always define it explicitly.',
}

const glossaryTerms = [
  {
    term: bigO.title,
    definition: bigO.detail,
    note: bigO.math,
  },
  {
    term: bigOmega.title,
    definition: bigOmega.detail,
    note: bigOmega.math,
  },
  {
    term: bigTheta.title,
    definition: bigTheta.detail,
    note: bigTheta.math,
  },
  {
    term: bestCase.title,
    definition: bestCase.detail,
  },
  {
    term: averageCase.title,
    definition: averageCase.detail,
  },
  {
    term: worstCase.title,
    definition: worstCase.detail,
  },
  {
    term: amortizedCase.title,
    definition: amortizedCase.detail,
  },
  {
    term: inputSizeTerm.title,
    definition: inputSizeTerm.detail,
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: TopicTab<TabId>[] = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-big-picture', label: 'The Big Picture' },
    { id: 'bp-growth', label: 'Growth Intuition' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-notations', label: 'Asymptotic Notations' },
    { id: 'core-cases', label: 'Best/Average/Worst/Amortized' },
    { id: 'core-input-size', label: 'What Counts as n?' },
    { id: 'core-input-rules', label: 'Input Size Rules' },
    { id: 'core-patterns', label: 'Complexity Patterns' },
    { id: 'core-amortized', label: 'Amortized Analysis' },
    { id: 'core-master', label: 'Master Theorem' },
    { id: 'core-tradeoffs', label: 'Time vs Space' },
    { id: 'core-profiling', label: 'Profiling Notes' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-classes', label: 'Complexity Classes' },
    { id: 'ex-recurrence', label: 'Recurrence Examples' },
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-cheatsheet', label: 'Algorithm Cheat Sheet' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}
export default function ComplexityAnalysisPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Complexity Analysis (Big O)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Complexity Analysis (Big O)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Complexity Analysis (Big O)</h1>
      <p>
        Complexity analysis explains how time and memory demands scale with input size. It ignores
        constant factors and hardware details so you can compare algorithms by growth rate and avoid
        choices that collapse at scale.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <h3 className="bin98-subheading">The language of algorithmic growth and scalability</h3>
            <p>
              Complexity analysis provides the essential vocabulary to discuss how an
              algorithm&apos;s performance scales with the size of the input. It abstracts away
              machine-specific details to give us a mathematical lens to compare approaches and
              build systems that last.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-big-picture" className="bin98-section">
            <h2 className="bin98-heading">The Big Picture</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-growth" className="bin98-section">
            <h2 className="bin98-heading">Growth Intuition</h2>
            {growthIntuition.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            {keyTakeaways.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-notations" className="bin98-section">
            <h2 className="bin98-heading">Asymptotic Notations</h2>
            {asymptoticNotations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p className="bin98-mono">{item.math}</p>
              </div>
            ))}
            <p>
              Big O is the speed limit (upper bound), Big Omega is the minimum speed (lower bound),
              and Big Theta means both limits match, so the growth rate is tightly pinned down.
            </p>
          </section>
          <section id="core-cases" className="bin98-section">
            <h2 className="bin98-heading">Best, Average, Worst, Amortized</h2>
            {caseAnalysis.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-input-size" className="bin98-section">
            <h2 className="bin98-heading">What Counts as n?</h2>
            {inputSizeExamples.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-input-rules" className="bin98-section">
            <h2 className="bin98-heading">Rules of Thumb by Input Size</h2>
            {inputConstraints.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Common Complexity Patterns</h2>
            {complexityPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-amortized" className="bin98-section">
            <h2 className="bin98-heading">Amortized Analysis</h2>
            {amortizedAnalysis.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-master" className="bin98-section">
            <h2 className="bin98-heading">Master Theorem Quick Guide</h2>
            {masterTheoremNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Time vs Space Tradeoffs</h2>
            {memoryTradeoffs.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-profiling" className="bin98-section">
            <h2 className="bin98-heading">Profiling and Reality Checks</h2>
            {profilingNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls &amp; Mistakes</h2>
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
          <section id="ex-classes" className="bin98-section">
            <h2 className="bin98-heading">A Tour of Common Complexity Classes</h2>
            {complexityClasses.map((item) => (
              <div key={item.class}>
                <h3 className="bin98-subheading bin98-mono">{item.class}</h3>
                <p>{item.explanation}</p>
                <div className="bin98-codebox">
                  <code>{item.code.trim()}</code>
                </div>
              </div>
            ))}
          </section>
          <section id="ex-recurrence" className="bin98-section">
            <h2 className="bin98-heading">Recurrence Examples</h2>
            {recurrenceExamples.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p className="bin98-mono">{item.code}</p>
                <p>{item.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-worked" className="bin98-section">
            <h2 className="bin98-heading">Worked Examples</h2>
            {workedExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-cheatsheet" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Complexity Cheat Sheet</h2>
            {Object.entries(algorithmCheatSheet).map(([category, algorithms]) => (
              <div key={category}>
                <h3 className="bin98-subheading" style={{ textTransform: 'capitalize' }}>
                  {category}
                </h3>
                <table className="bin98-table">
                  <thead>
                    <tr>
                      <th>Algorithm</th>
                      <th>Time Complexity</th>
                      <th>Space Complexity</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {algorithms.map((algo) => (
                      <tr key={algo.name}>
                        <td className="bin98-mono">{algo.name}</td>
                        <td className="bin98-mono">{algo.time}</td>
                        <td className="bin98-mono">{algo.space}</td>
                        <td>{algo.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <div key={item.term}>
              <h3 className="bin98-subheading">{item.term}</h3>
              <p>{item.definition}</p>
              {item.note && <p className="bin98-mono">{item.note}</p>}
            </div>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
