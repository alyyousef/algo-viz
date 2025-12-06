import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'
import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What It Is',
    detail:
      'Complexity analysis is a way to measure how the resource needs of an algorithm (like time or memory) grow as the input size (n) increases. It gives us a high-level, hardware-independent way to compare algorithms.',
    note: "It's not about exact seconds, but about the rate of growth.",
  },
  {
    title: 'Why It Exists',
    detail:
      'To make informed engineering decisions. An algorithm that is fast on a small test case might become disastrously slow with production-scale data. Complexity analysis helps us predict and prevent this.',
    note: 'It saves us from building systems that do not scale.',
  },
  {
    title: 'Where It Shows Up',
    detail:
      'Everywhere. From choosing a sorting algorithm in a library, to designing a database index, to understanding why a web page is slow. It is the fundamental language for discussing algorithm performance.',
    note: 'It is a core concept in technical interviews and system design.',
  },
]

const asymptoticNotations = [
  {
    title: 'Big O (O): The Upper Bound',
    detail:
      "This is the most common notation. It describes the *worst-case* scenario. If an algorithm is O(n^2), it means its execution time will not grow faster than a quadratic function of the input size. It gives a guarantee: 'The performance will be at least this good.'",
    math: 'f(n) = O(g(n)) if there exist constants c > 0 and n₀ >= 0 such that 0 <= f(n) <= c * g(n) for all n >= n₀.',
  },
  {
    title: 'Big Omega (Ω): The Lower Bound',
    detail:
      "This describes the *best-case* scenario. If an algorithm is Ω(n), it means its execution time will not grow slower than a linear function of the input. It provides a floor: 'It will take at least this much effort, even on a good day.'",
    math: 'f(n) = Ω(g(n)) if there exist constants c > 0 and n₀ >= 0 such that 0 <= c * g(n) <= f(n) for all n >= n₀.',
  },
  {
    title: 'Big Theta (Θ): The Tight Bound',
    detail:
      'This is the most precise notation. It is used when an algorithm\'s best-case and worst-case performance are of the same order. If an algorithm is Θ(n log n), it means it grows as fast as n log n, no slower and no faster.',
    math: 'f(n) = Θ(g(n)) if f(n) = O(g(n)) and f(n) = Ω(g(n)). It is \'squeezed\' between two multiples of g(n).',
  },
]

const complexityClasses = [
  {
    class: 'O(1) - Constant',
    explanation:
      'The algorithm takes the same amount of time regardless of the input size. Operations like accessing an array element by index or pushing to a stack are typically O(1).',
    code: `function getFirstElement(arr) {
  return arr[0]; // Always one operation
}`,
  },
  {
    class: 'O(log n) - Logarithmic',
    explanation:
      'The algorithm\'s time complexity grows logarithmically. This is typical for algorithms that divide the problem space in each step, like binary search. Doubling the input size adds only a single constant unit of work.',
    code: `function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  } // Each step halves the search space
}`,
  },
  {
    class: 'O(n) - Linear',
    explanation:
      'The runtime grows directly in proportion to the input size. A simple loop through all elements of an array is a classic example. If you double the input, you double the work.',
    code: `function findSum(arr) {
  let sum = 0;
  for (const element of arr) {
    sum += element; // Operation runs n times
  }
  return sum;
}`,
  },
  {
    class: 'O(n log n) - Linearithmic',
    explanation:
      'This is a very common complexity for efficient sorting algorithms. It represents doing O(log n) work for each of the n elements. Merge Sort and Quick Sort are prime examples.',
    code: `// Merge Sort conceptually
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  // O(log n) levels of division
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  // O(n) work to merge
  return merge(left, right);
}`,
  },
  {
    class: 'O(n^2) - Quadratic',
    explanation:
      'The runtime is proportional to the square of the input size. This often occurs with nested loops, where for each element, you iterate through the list again. Inefficient for large datasets.',
    code: `function findPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      // Operation runs n * n times
      console.log(arr[i], arr[j]);
    }
  }
}`,
  },
  {
    class: 'O(2^n) - Exponential',
    explanation:
      'The runtime doubles with each addition to the input dataset. This is common in brute-force algorithms that explore all subsets of a set. Feasible only for very small input sizes.',
    code: `// Recursive solution for Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  // Two recursive calls for each n
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  },
  {
    class: 'O(n!) - Factorial',
    explanation:
      'The runtime grows factorially, which is even faster than exponential. This often involves generating all permutations of a set, like in the brute-force solution to the Traveling Salesperson Problem.',
    code: `// Concept for finding all permutations
function permutations(arr, current = []) {
  if (arr.length === 0) console.log(current);
  for (let i = 0; i < arr.length; i++) {
    let rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    permutations(rest, [...current, arr[i]]);
  } // n! possible paths
}`,
  },
]

const algorithmCheatSheet = {
  sorting: [
    { name: 'Bubble Sort', time: 'Θ(n^2)', space: 'O(1)', notes: 'Simple but inefficient. The Θ bound applies because even in the best case, it must pass through the list.' },
    { name: 'Insertion Sort', time: 'O(n^2)', space: 'O(1)', notes: 'Best case is Ω(n) if nearly sorted. Good for small or almost-sorted datasets.' },
    { name: 'Selection Sort', time: 'Θ(n^2)', space: 'O(1)', notes: 'Always finds the minimum n times, so performance does not change with input order.' },
    { name: 'Merge Sort', time: 'Θ(n log n)', space: 'O(n)', notes: 'Consistent, not in-place. Its performance is very predictable. Great for external sorting.' },
    { name: 'Quick Sort', time: 'O(n^2)', space: 'O(log n)', notes: 'Average case is Θ(n log n). Worst case occurs with bad pivots (e.g., on sorted data). In-place and fast in practice.' },
    { name: 'Heap Sort', time: 'Θ(n log n)', space: 'O(1)', notes: 'In-place but generally slower in practice than a well-implemented Quick Sort due to cache performance.' },
    { name: 'Radix Sort', time: 'Θ(nk)', space: 'O(n+k)', notes: 'Not comparison-based. k is the number of digits. Very fast for integers or fixed-size strings.' },
  ],
  searching: [
    { name: 'Linear Search', time: 'O(n)', space: 'O(1)', notes: 'Worst case is O(n), best case is Ω(1). Simple but inefficient for large, static datasets.' },
    { name: 'Binary Search', time: 'O(log n)', space: 'O(1)', notes: 'Requires a sorted data structure. Extremely efficient.' },
  ],
  dataStructures: [
    { name: 'Array (Access)', time: 'Θ(1)', space: '-', notes: 'Direct memory access.' },
    { name: 'Stack (Push/Pop)', time: 'Θ(1)', space: '-', notes: 'Operations on the top of the stack.' },
    { name: 'Queue (Enqueue/Dequeue)', time: 'Θ(1)', space: '-', notes: 'Amortized time for array-based implementations.' },
    { name: 'Linked List (Search/Insert)', time: 'O(n)', space: '-', notes: 'Insertion at head/tail is O(1), but finding the node is O(n).' },
    { name: 'Hash Table (Search/Insert/Delete)', time: 'O(1)', space: 'O(n)', notes: 'Average case is Θ(1). Worst case (due to collisions) is O(n).' },
    { name: 'Binary Search Tree (BST)', time: 'O(n)', space: 'O(n)', notes: 'Average case for balanced trees is Θ(log n). Worst case for unbalanced trees is O(n).' },
    { name: 'AVL Tree / Red-Black Tree', time: 'Θ(log n)', space: 'O(n)', notes: 'Self-balancing BSTs that guarantee logarithmic performance.' },
  ],
  graph: [
    { name: 'Breadth-First Search (BFS)', time: 'Θ(V+E)', space: 'Θ(V)', notes: 'V is vertices, E is edges. Explores level by level. Uses a queue.' },
    { name: 'Depth-First Search (DFS)', time: 'Θ(V+E)', space: 'Θ(V)', notes: 'Goes as deep as possible. Uses a stack (or recursion).' },
    { name: "Dijkstra's Algorithm", time: 'O(E log V)', space: 'O(V)', notes: 'With a binary heap. Finds the shortest path in a weighted graph with non-negative weights.' },
    { name: "Prim's Algorithm", time: 'O(E log V)', space: 'O(V)', notes: 'Finds a Minimum Spanning Tree. Similar implementation to Dijkstra.' },
  ]
}

const pitfalls = [
  'Constants Matter: An algorithm that is O(n) but has a constant factor of 1000 will be slower than an O(n^2) algorithm with a constant of 1 for small n.',
  'Ignoring the "n": Is n the number of elements, the number of bits in an element, or something else? Be precise.',
  'Premature Optimization: Do not sacrifice code readability and correctness for a minor complexity improvement unless performance profiling proves it is a bottleneck.',
  'Average vs. Worst Case: Relying on the average case can be dangerous in security contexts or real-time systems where the worst case can be triggered deliberately or by chance.',
  'Space Complexity is Real: An algorithm with great time complexity but requires terabytes of RAM is not practical on most machines.',
]

const keyTakeaways = [
  {
    title: 'It is a Language of Growth',
    detail: 'Complexity is about how resource needs scale, not about precise timings.',
  },
  {
    title: 'O, Ω, and Θ Answer Different Questions',
    detail: 'Use O for an upper bound (guarantee), Ω for a lower bound (minimum effort), and Θ for a tight, precise description.',
  },
  {
    title: 'Know Your Classes',
    detail: 'Being able to instantly recognize O(1), O(log n), O(n), O(n log n), and O(n^2) patterns in code is a vital skill.',
  },
  {
    title: 'Theory Guides, Practice Decides',
    detail: 'Complexity analysis is a powerful tool for eliminating bad choices, but final performance decisions should be backed by real-world profiling.',
  },
]

export default function ComplexityAnalysisPage(): JSX.Element {
  return (
    <TopicLayout
      title="Complexity Analysis"
      subtitle="The Language of Algorithmic Performance"
      intro="Complexity analysis provides the essential vocabulary to discuss how an algorithm's performance scales with the size of the input. It abstracts away machine-specific details to give us a pure, mathematical lens to compare different approaches and build systems that last."
    >
      <TopicSection heading="The Big Picture">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {bigPicture.map((item) => (
            <div key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/80">{item.detail}</p>
              {item.note && <p className="mt-2 text-xs text-white/60 italic">{item.note}</p>}
            </div>
          ))}
        </div>
      </TopicSection>
      
      <TopicSection heading="The Asymptotic Notations: O, Ω, and Θ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {asymptoticNotations.map((item) => (
            <div key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/80">{item.detail}</p>
              <p className="mt-4 font-mono text-xs text-amber-400">{item.math}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-sky-500/50 bg-sky-500/10 p-4 text-sm text-white/90">
            <h4 className="font-bold text-sky-400">Analogy: Speed Limits</h4>
            <p className="mt-1">
                <strong>Big O</strong> is like the <span className="font-semibold">speed limit</span>. You are guaranteed not to go faster than this.
                <br />
                <strong>Big Ω</strong> is like the <span className="font-semibold">minimum speed</span> on a highway. You are guaranteed not to go slower.
                <br />
                <strong>Big Θ</strong> is when the speed limit and minimum speed are the same. You travel at a <span className="font-semibold">fixed speed</span>.
            </p>
        </div>
      </TopicSection>

      <TopicSection heading="A Tour of Common Complexity Classes">
        <div className="space-y-6">
          {complexityClasses.map((c) => (
            <div key={c.class} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="font-mono text-lg font-semibold text-white">{c.class}</h3>
              <p className="mt-2 text-sm text-white/80">{c.explanation}</p>
              <div className="mt-4 rounded bg-black/30 p-2">
                <pre><code className="language-js text-xs">{c.code.trim()}</code></pre>
              </div>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="The Great Algorithm Complexity Cheat Sheet">
        {Object.entries(algorithmCheatSheet).map(([category, algorithms]) => (
           <div key={category} className="mb-8">
             <h3 className="text-xl font-semibold capitalize text-white">{category}</h3>
             <div className="mt-4 overflow-x-auto">
               <table className="w-full min-w-max table-auto text-left">
                 <thead>
                   <tr className="border-b border-white/20">
                     <th className="p-3 text-sm font-semibold text-white">Algorithm</th>
                     <th className="p-3 text-sm font-semibold text-white">Time Complexity</th>
                     <th className="p-3 text-sm font-semibold text-white">Space Complexity</th>
                     <th className="p-3 text-sm font-semibold text-white">Notes</th>
                   </tr>
                 </thead>
                 <tbody className="text-sm text-white/80">
                   {algorithms.map(algo => (
                     <tr key={algo.name} className="border-b border-white/10">
                       <td className="p-3 font-semibold">{algo.name}</td>
                       <td className="p-3 font-mono">{algo.time}</td>
                       <td className="p-3 font-mono">{algo.space}</td>
                       <td className="p-3">{algo.notes}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        ))}
      </TopicSection>
      
      <TopicSection heading="Common Pitfalls & Mistakes">
        <div className="rounded-lg bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-rose-400">Pitfalls to Avoid</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/80">
              {pitfalls.map((item) => <li key={item}>{item}</li>)}
            </ul>
        </div>
      </TopicSection>

      <TopicSection heading="Key Takeaways">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {keyTakeaways.map((item) => (
            <div key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </TopicSection>

    </TopicLayout>
  )
}