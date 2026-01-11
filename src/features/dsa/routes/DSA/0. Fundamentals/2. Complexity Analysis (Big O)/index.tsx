import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
  vertical-align: top;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}

.win95-math {
  font-family: 'Courier New', monospace;
  font-size: 11px;
}

.win95-note {
  font-size: 11px;
  font-style: italic;
  margin-top: 4px;
}

.win95-mono {
  font-family: 'Courier New', monospace;
}
`

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

const complexityClasses = [
  {
    class: 'O(1) - Constant',
    explanation:
      'Runtime is independent of input size. Example: array access by index.',
    code: `function getFirstElement(arr) {
  return arr[0];
}`,
  },
  {
    class: 'O(log n) - Logarithmic',
    explanation:
      'Each step reduces the problem space, as in binary search.',
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
    explanation:
      'Work grows in direct proportion to input size, like a full scan.',
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
    explanation:
      'Sorting and divide-and-conquer algorithms often land here.',
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
    explanation:
      'Nested loops over the same data lead to quadratic growth.',
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
    explanation:
      'Enumerating all permutations grows factorially and becomes infeasible quickly.',
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
    { name: 'Bubble Sort', time: 'Theta(n^2)', space: 'O(1)', notes: 'Simple but inefficient; even best case still quadratic.' },
    { name: 'Insertion Sort', time: 'O(n^2)', space: 'O(1)', notes: 'Best case is Omega(n) on nearly sorted data.' },
    { name: 'Selection Sort', time: 'Theta(n^2)', space: 'O(1)', notes: 'Always scans for a minimum; order does not help.' },
    { name: 'Merge Sort', time: 'Theta(n log n)', space: 'O(n)', notes: 'Predictable performance; great for external sorting.' },
    { name: 'Quick Sort', time: 'O(n^2)', space: 'O(log n)', notes: 'Average Theta(n log n); worst case on bad pivots.' },
    { name: 'Heap Sort', time: 'Theta(n log n)', space: 'O(1)', notes: 'In-place but slower in practice than tuned quicksort.' },
    { name: 'Radix Sort', time: 'Theta(nk)', space: 'O(n + k)', notes: 'k is number of digits; not comparison-based.' },
  ],
  searching: [
    { name: 'Linear Search', time: 'O(n)', space: 'O(1)', notes: 'Worst case is linear; best case is Omega(1).' },
    { name: 'Binary Search', time: 'O(log n)', space: 'O(1)', notes: 'Requires sorted data; extremely efficient.' },
  ],
  dataStructures: [
    { name: 'Array (Access)', time: 'Theta(1)', space: '-', notes: 'Direct memory access.' },
    { name: 'Stack (Push/Pop)', time: 'Theta(1)', space: '-', notes: 'Operations on the top of the stack.' },
    { name: 'Queue (Enqueue/Dequeue)', time: 'Theta(1)', space: '-', notes: 'Amortized for array-based implementations.' },
    { name: 'Linked List (Search/Insert)', time: 'O(n)', space: '-', notes: 'Insert is O(1) with pointer; search is O(n).' },
    { name: 'Hash Table (Search/Insert/Delete)', time: 'O(1)', space: 'O(n)', notes: 'Average Theta(1); worst case O(n) with collisions.' },
    { name: 'Binary Search Tree (BST)', time: 'O(n)', space: 'O(n)', notes: 'Balanced trees are Theta(log n); unbalanced is linear.' },
    { name: 'AVL Tree / Red-Black Tree', time: 'Theta(log n)', space: 'O(n)', notes: 'Self-balancing trees with guaranteed log n.' },
  ],
  graph: [
    { name: 'Breadth-First Search (BFS)', time: 'Theta(V + E)', space: 'Theta(V)', notes: 'Explores level by level using a queue.' },
    { name: 'Depth-First Search (DFS)', time: 'Theta(V + E)', space: 'Theta(V)', notes: 'Deep traversal using stack or recursion.' },
    { name: "Dijkstra's Algorithm", time: 'O(E log V)', space: 'O(V)', notes: 'Binary heap; non-negative edge weights.' },
    { name: "Prim's Algorithm", time: 'O(E log V)', space: 'O(V)', notes: 'Minimum spanning tree; similar to Dijkstra.' },
  ],
}

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
]

export default function ComplexityAnalysisPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Complexity Analysis (Big O)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>

        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">The language of algorithmic growth and scalability</div>
              <p className="win95-text">
                Complexity analysis explains how time and memory demands scale with input size. It ignores constant factors and
                hardware details so you can compare algorithms by growth rate and avoid choices that collapse at scale.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Overview</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Complexity analysis provides the essential vocabulary to discuss how an algorithm&apos;s performance scales with the
                size of the input. It abstracts away machine-specific details to give us a mathematical lens to compare approaches
                and build systems that last.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-grid win95-grid-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  {item.note && <p className="win95-note">{item.note}</p>}
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Asymptotic notations: O, Omega, Theta</legend>
            <div className="win95-grid win95-grid-2">
              {asymptoticNotations.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-math">{item.math}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Big O is the speed limit (upper bound), Big Omega is the minimum speed (lower bound), and Big Theta means both limits
                match, so the growth rate is tightly pinned down.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>A tour of common complexity classes</legend>
            <div className="win95-stack">
              {complexityClasses.map((item) => (
                <div key={item.class} className="win95-panel">
                  <div className="win95-heading win95-mono">{item.class}</div>
                  <p className="win95-text">{item.explanation}</p>
                  <pre className="win95-code">
                    <code>{item.code.trim()}</code>
                  </pre>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm complexity cheat sheet</legend>
            <div className="win95-stack">
              {Object.entries(algorithmCheatSheet).map(([category, algorithms]) => (
                <div key={category} className="win95-panel">
                  <div className="win95-subheading" style={{ textTransform: 'capitalize' }}>
                    {category}
                  </div>
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
                          <td className="win95-mono">{algo.name}</td>
                          <td className="win95-mono">{algo.time}</td>
                          <td className="win95-mono">{algo.space}</td>
                          <td>{algo.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls &amp; mistakes</legend>
            <div className="win95-panel">
              <div className="win95-subheading">Pitfalls to avoid</div>
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
