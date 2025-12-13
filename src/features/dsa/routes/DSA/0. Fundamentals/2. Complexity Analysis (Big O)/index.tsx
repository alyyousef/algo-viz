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
    math: 'f(n) = O(g(n)) if there exist constants c > 0 and nƒ,? >= 0 such that 0 <= f(n) <= c * g(n) for all n >= nƒ,?.',
  },
  {
    title: 'Big Omega (Ic): The Lower Bound',
    detail:
      "This describes the *best-case* scenario. If an algorithm is Ic(n), it means its execution time will not grow slower than a linear function of the input. It provides a floor: 'It will take at least this much effort, even on a good day.'",
    math: 'f(n) = Ic(g(n)) if there exist constants c > 0 and nƒ,? >= 0 such that 0 <= c * g(n) <= f(n) for all n >= nƒ,?.',
  },
  {
    title: 'Big Theta (I~): The Tight Bound',
    detail:
      'This is the most precise notation. It is used when an algorithm\'s best-case and worst-case performance are of the same order. If an algorithm is I~(n log n), it means it grows as fast as n log n, no slower and no faster.',
    math: 'f(n) = I~(g(n)) if f(n) = O(g(n)) and f(n) = Ic(g(n)). It is \'squeezed\' between two multiples of g(n).',
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
    { name: 'Bubble Sort', time: 'I~(n^2)', space: 'O(1)', notes: 'Simple but inefficient. The I~ bound applies because even in the best case, it must pass through the list.' },
    { name: 'Insertion Sort', time: 'O(n^2)', space: 'O(1)', notes: 'Best case is Ic(n) if nearly sorted. Good for small or almost-sorted datasets.' },
    { name: 'Selection Sort', time: 'I~(n^2)', space: 'O(1)', notes: 'Always finds the minimum n times, so performance does not change with input order.' },
    { name: 'Merge Sort', time: 'I~(n log n)', space: 'O(n)', notes: 'Consistent, not in-place. Its performance is very predictable. Great for external sorting.' },
    { name: 'Quick Sort', time: 'O(n^2)', space: 'O(log n)', notes: 'Average case is I~(n log n). Worst case occurs with bad pivots (e.g., on sorted data). In-place and fast in practice.' },
    { name: 'Heap Sort', time: 'I~(n log n)', space: 'O(1)', notes: 'In-place but generally slower in practice than a well-implemented Quick Sort due to cache performance.' },
    { name: 'Radix Sort', time: 'I~(nk)', space: 'O(n+k)', notes: 'Not comparison-based. k is the number of digits. Very fast for integers or fixed-size strings.' },
  ],
  searching: [
    { name: 'Linear Search', time: 'O(n)', space: 'O(1)', notes: 'Worst case is O(n), best case is Ic(1). Simple but inefficient for large, static datasets.' },
    { name: 'Binary Search', time: 'O(log n)', space: 'O(1)', notes: 'Requires a sorted data structure. Extremely efficient.' },
  ],
  dataStructures: [
    { name: 'Array (Access)', time: 'I~(1)', space: '-', notes: 'Direct memory access.' },
    { name: 'Stack (Push/Pop)', time: 'I~(1)', space: '-', notes: 'Operations on the top of the stack.' },
    { name: 'Queue (Enqueue/Dequeue)', time: 'I~(1)', space: '-', notes: 'Amortized time for array-based implementations.' },
    { name: 'Linked List (Search/Insert)', time: 'O(n)', space: '-', notes: 'Insertion at head/tail is O(1), but finding the node is O(n).' },
    { name: 'Hash Table (Search/Insert/Delete)', time: 'O(1)', space: 'O(n)', notes: 'Average case is I~(1). Worst case (due to collisions) is O(n).' },
    { name: 'Binary Search Tree (BST)', time: 'O(n)', space: 'O(n)', notes: 'Average case for balanced trees is I~(log n). Worst case for unbalanced trees is O(n).' },
    { name: 'AVL Tree / Red-Black Tree', time: 'I~(log n)', space: 'O(n)', notes: 'Self-balancing BSTs that guarantee logarithmic performance.' },
  ],
  graph: [
    { name: 'Breadth-First Search (BFS)', time: 'I~(V+E)', space: 'I~(V)', notes: 'V is vertices, E is edges. Explores level by level. Uses a queue.' },
    { name: 'Depth-First Search (DFS)', time: 'I~(V+E)', space: 'I~(V)', notes: 'Goes as deep as possible. Uses a stack (or recursion).' },
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
    title: 'O, Ic, and I~ Answer Different Questions',
    detail: 'Use O for an upper bound (guarantee), Ic for a lower bound (minimum effort), and I~ for a tight, precise description.',
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

const styles = `
* { box-sizing: border-box; }
.win95-page {
  width: 100%;
  min-height: 100vh;
  background: #C0C0C0;
  margin: 0;
  padding: 0;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
  color: #000;
}
.win95-window {
  width: 100%;
  min-height: 100vh;
  border: 2px outset;
  border-color: #fff #404040 #404040 #fff;
  display: flex;
  flex-direction: column;
}
.win95-title-bar {
  background: #000080;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  height: 32px;
  box-sizing: border-box;
}
.win95-title {
  font-size: 13px;
  font-weight: bold;
  letter-spacing: 0.3px;
  text-shadow: 1px 1px #000;
}
.win95-close {
  min-width: 26px;
  height: 22px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  color: #000;
  font-weight: bold;
  padding: 0;
  cursor: pointer;
}
.win95-close:active {
  border-color: #404040 #fff #fff #404040;
  background: #808080;
}
.win95-close:focus {
  outline: 1px dotted #000;
  outline-offset: 1px;
}
.win95-content {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
fieldset.win95-section {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  background: #C0C0C0;
  padding: 10px;
  margin: 0;
}
fieldset.win95-section legend {
  padding: 0 6px;
  font-weight: bold;
  background: #C0C0C0;
  font-size: 13px;
}
.win95-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 8px;
}
.win95-panel {
  background: #C0C0C0;
  border: 2px inset;
  border-color: #808080 #fff #fff #808080;
  padding: 10px;
}
.win95-panel.raised {
  border-color: #fff #404040 #404040 #fff;
}
.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
h1 {
  margin: 0 0 6px 0;
  font-size: 16px;
}
h2 {
  margin: 0 0 6px 0;
  font-size: 14px;
}
h3, h4 {
  margin: 0 0 6px 0;
  font-size: 13px;
}
p {
  margin: 0 0 8px 0;
  font-size: 13px;
  line-height: 1.4;
}
ul {
  margin: 6px 0 0 16px;
  padding: 0;
  font-size: 12px;
}
li {
  margin-bottom: 4px;
}
.win95-math {
  font-family: 'Courier New', monospace;
  font-size: 12px;
}
.win95-code {
  background: #C0C0C0;
  border: 2px inset;
  border-color: #404040 #fff #fff #404040;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  white-space: pre-wrap;
}
table.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  background: #C0C0C0;
}
table.win95-table th,
table.win95-table td {
  border: 1px solid #808080;
  padding: 8px;
  vertical-align: top;
}
table.win95-table th {
  font-weight: bold;
  background: #dcdcdc;
}
a {
  color: #000;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
button:focus, a:focus {
  outline: 1px dotted #000;
  outline-offset: 1px;
}
.win95-note {
  font-size: 12px;
  font-style: italic;
  margin-top: 4px;
}
.win95-subheader {
  font-size: 13px;
  font-weight: bold;
  margin: 0 0 8px 0;
}
.mono {
  font-family: 'Courier New', monospace;
}
`

export default function ComplexityAnalysisPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{styles}</style>
      <div className="win95-window">
        <div className="win95-title-bar">
          <span className="win95-title">Complexity Analysis</span>
          <button className="win95-close" aria-label="Close window">
            X
          </button>
        </div>

        <div className="win95-content">
          <fieldset className="win95-section">
            <legend>Overview</legend>
            <div className="win95-stack">
              <h1>Complexity Analysis</h1>
              <h2>The Language of Algorithmic Performance</h2>
              <p>
                Complexity analysis provides the essential vocabulary to discuss how an algorithm's performance scales
                with the size of the input. It abstracts away machine-specific details to give us a pure, mathematical
                lens to compare different approaches and build systems that last.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>The Big Picture</legend>
            <div className="win95-grid">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel raised">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  {item.note && <p className="win95-note">{item.note}</p>}
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>The Asymptotic Notations: O, Ic, and I~</legend>
            <div className="win95-stack">
              <div className="win95-grid">
                {asymptoticNotations.map((item) => (
                  <div key={item.title} className="win95-panel raised">
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    <p className="win95-math">{item.math}</p>
                  </div>
                ))}
              </div>
              <div className="win95-panel">
                <h4>Analogy: Speed Limits</h4>
                <p>
                  <strong>Big O</strong> is like the <span className="win95-subheader">speed limit</span>. You are
                  guaranteed not to go faster than this.
                  <br />
                  <strong>Big Ic</strong> is like the <span className="win95-subheader">minimum speed</span> on a
                  highway. You are guaranteed not to go slower.
                  <br />
                  <strong>Big I~</strong> is when the speed limit and minimum speed are the same. You travel at a{' '}
                  <span className="win95-subheader">fixed speed</span>.
                </p>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>A Tour of Common Complexity Classes</legend>
            <div className="win95-stack">
              {complexityClasses.map((item) => (
                <div key={item.class} className="win95-panel raised">
                  <h3 className="mono">{item.class}</h3>
                  <p>{item.explanation}</p>
                  <div className="win95-code">
                    <code>{item.code.trim()}</code>
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>The Great Algorithm Complexity Cheat Sheet</legend>
            <div className="win95-stack">
              {Object.entries(algorithmCheatSheet).map(([category, algorithms]) => (
                <div key={category} className="win95-panel">
                  <h3 className="win95-subheader" style={{ textTransform: 'capitalize' }}>
                    {category}
                  </h3>
                  <table className="win95-table">
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
                          <td className="mono">{algo.name}</td>
                          <td className="mono">{algo.time}</td>
                          <td className="mono">{algo.space}</td>
                          <td>{algo.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Common Pitfalls &amp; Mistakes</legend>
            <div className="win95-panel raised">
              <h3 className="win95-subheader">Pitfalls to Avoid</h3>
              <ul>
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Key Takeaways</legend>
            <div className="win95-grid">
              {keyTakeaways.map((item) => (
                <div key={item.title} className="win95-panel raised">
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
