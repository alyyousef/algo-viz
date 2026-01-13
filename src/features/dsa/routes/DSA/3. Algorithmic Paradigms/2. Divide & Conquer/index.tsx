import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'What It Is',
    detail:
      'Divide and Conquer is an algorithmic paradigm where a problem is broken down into smaller, more manageable subproblems of the same type. The solutions to the subproblems are then combined to solve the original problem.',
    note: 'The key is that the subproblems are self-similar to the original.',
  },
  {
    title: 'Why It Exists',
    detail:
      'It allows us to solve complex problems by turning a large, difficult task into smaller, simpler ones. This approach can lead to significant performance gains, often reducing polynomial or exponential times to logarithmic.',
    note: 'It saves us from iterating over entire datasets, enabling solutions for massive-scale data.',
  },
  {
    title: 'Where It Shows Up',
    detail:
      'Core algorithms like Merge Sort and Quick Sort are canonical examples. It is fundamental in parallel computing, graphics (e.g., quadtrees), and scientific simulations.',
    note: 'Any time you hear "binary search," you are hearing about a divide and conquer strategy.',
  },
]

const history = [
  {
    title: 'Ancient Origins',
    detail:
      'The idea of breaking down problems is as old as strategy itself. The term "divide and rule" (divide et impera) has been attributed to Philip II of Macedon. Early geometric algorithms used similar principles.',
    note: 'Euclid\'s algorithm for finding the greatest common divisor (c. 300 BCE) can be viewed as a form of divide and conquer.',
  },
  {
    title: '1945: John von Neumann',
    detail:
      'While developing the EDVAC, one of the first stored-program computers, John von Neumann designed the Merge Sort algorithm. This was one of the first formalizations of a recursive, divide-and-conquer sorting method.',
    note: 'This was a pivotal moment, showing how the paradigm could be applied to data processing.',
  },
  {
    title: '1960: C.A.R. Hoare',
    detail:
      'Tony Hoare invented Quick Sort, another highly efficient sorting algorithm. While both use divide and conquer, Quick Sort does its main work in the "divide" step (partitioning), whereas Merge Sort does it in the "combine" step.',
    note: "This highlighted the different ways the paradigm could be implemented and the trade-offs involved.",
  },
  {
    title: '1962: Karatsuba Multiplication',
    detail:
      'Anatoly Karatsuba discovered a method to multiply two n-digit numbers in fewer than n^2 single-digit multiplications, a major breakthrough that demonstrated divide and conquer could beat traditional "grade school" algorithms in pure arithmetic.',
    note: 'This showed the paradigm was not just for sorting or searching.',
  }
]

const pillars = [
  {
    title: 'Divide',
    detail:
      'The problem is broken down into several smaller, independent subproblems. The subproblems are usually of the same type as the original problem.',
  },
  {
    title: 'Conquer',
    detail:
      'The subproblems are solved recursively. If a subproblem is small enough (the base case), it is solved directly.',
  },
  {
    title: 'Combine',
    detail:
      'The solutions to the subproblems are merged together to form the solution to the original problem. The efficiency of the algorithm often depends heavily on this step.',
  },
]

const mentalModels = [
  {
    title: 'Delegating to Specialists',
    detail:
      "Imagine a CEO of a large company who needs to create a major report. They don't do it all themselves. They divide the report into sections (Finance, Marketing, HR) and delegate each section to a department head (a specialist). Each head might further delegate parts of their section. Finally, the CEO combines the finished sections into a single, cohesive report.",
    note: 'The "work" happens at the combination step. The CEO must skillfully merge the reports.',
  },
  {
    title: 'Searching a Phone Book',
    detail:
      "To find a name in a physical phone book, you don't start at page 1. You open it to the middle. If the name you want is alphabetically later, you ignore the first half (divide) and repeat the process on the second half (conquer). The 'combine' step is trivial: once you find it, you're done.",
    note: 'This is Binary Search, where the "combine" step is implicit and takes no time.',
  },
]

const howItWorks = [
  {
    title: '1. Identify the Base Case',
    detail:
      'First, determine the smallest possible subproblem that can be solved trivially. For sorting, this is an array of size 0 or 1. This stops the recursion.',
  },
  {
    title: '2. Define the Recursive Step (Divide)',
    detail:
      'Determine how to break the problem down. For an array, the most common split is finding the midpoint and creating two halves.',
  },
  {
    title: '3. Recurse (Conquer)',
    detail:
      'Call the same function on each of the subproblems created in the divide step. This continues until the base case is reached.',
  },
  {
    title: '4. Combine the Results',
    detail:
      'After the recursive calls return, figure out how to merge their results into a solution for the current level. For Merge Sort, this is the `merge` function. For Quick Sort, this step is trivial as the array is sorted in-place.',
  },
]

const complexityTable = [
  {
    approach: 'Merge Sort',
    time: 'O(N log N)',
    space: 'O(N)',
    note: 'The `merge` step requires a temporary array of size N.',
  },
  {
    approach: 'Quick Sort (Average)',
    time: 'O(N log N)',
    space: 'O(log N)',
    note: 'Space is from the recursion stack. The worst-case (O(N^2) time) happens on sorted data.',
  },
  {
    approach: 'Binary Search',
    time: 'O(log N)',
    space: 'O(1) or O(log N)',
    note: 'Iterative version is O(1) space, recursive is O(log N).',
  },
  {
    approach: 'Karatsuba Multiplication',
    time: 'O(N^1.585)',
    space: 'O(N)',
    note: 'Faster than the classical O(N^2) algorithm.',
  },
]

const applications = [
  {
    title: 'Parallel Processing',
    detail:
      'Because the subproblems are independent, they can be solved simultaneously on different processors or cores. This makes divide and conquer a natural fit for multi-threaded and distributed systems.',
    company: 'Modern CPUs, GPUs, Distributed computing frameworks (e.g. MapReduce)',
  },
  {
    title: 'File System & Databases',
    detail:
      'B-Trees, a data structure used extensively in filesystems (like NTFS) and databases (like PostgreSQL), use divide and conquer principles to manage and search massive amounts of data efficiently on disk.',
    company: 'Microsoft, Oracle, Apple',
  },
  {
    title: 'Computer Graphics',
    detail:
      'Data structures like Quadtrees and Octrees partition 2D or 3D space recursively. They are used for collision detection, rendering, and physics simulations in games and graphics software.',
    company: 'Unity, Unreal Engine',
  },
  {
    title: 'Fast Fourier Transform (FFT)',
    detail:
      'A critical algorithm for signal processing, image processing, and data compression. It uses a divide and conquer approach to break down a signal into its constituent frequencies much faster than a naive approach.',
    company: 'Adobe (Photoshop), Wireless communications',
  },
]

const pitfalls = [
  'Expensive Combine Step: If combining subproblem solutions takes too much time (e.g., O(N^2)), it can negate the benefits of dividing the problem. The Master Theorem helps analyze this.',
  'Overlapping Subproblems: If the same subproblem is solved many times, divide and conquer can be inefficient. This is a sign that Dynamic Programming or Memoization might be a better fit.',
  'Stack Overflow: Deep recursion on very large datasets can exhaust the call stack. An iterative approach might be necessary.',
  'Off-by-one errors in partitioning: Incorrectly calculating midpoints or partition boundaries can lead to infinite recursion or incorrect results.',
]

const whenToUse = [
  'When a problem can be broken into independent, smaller versions of itself.',
  'When you need to process large datasets that can be split (e.g., sorting millions of numbers).',
  'When you are working in a parallel or distributed environment.',
  'When the expected runtime complexity has a logarithmic factor, like O(N log N) or O(log N).',
]

const advanced = [
  {
    title: 'The Master Theorem',
    detail:
      'A formal way to determine the time complexity of a divide and conquer algorithm from its recurrence relation, T(n) = aT(n/b) + f(n). It provides a cookbook-like approach for many common cases.',
    rationale: 'Provides a rigorous way to analyze performance without unrolling the recursion.',
  },
  {
    title: 'Randomized Pivoting (Quick Sort)',
    detail:
      'To avoid the worst-case O(N^2) performance of Quick Sort on already-sorted or nearly-sorted data, the pivot element can be chosen randomly. This makes the worst-case scenario extremely unlikely in practice.',
    rationale: 'Improves average-case performance and robustness against specific input patterns.',
  },
  {
    title: 'Closest Pair of Points',
    detail:
      'A classic computational geometry problem. A naive O(N^2) check of all pairs can be beaten by a O(N log N) divide and conquer algorithm that splits points by a median line and handles a clever "strip" case in the combine step.',
    rationale: 'Shows how the paradigm can be applied to geometric problems.',
  },
]

const codeExamples = [
  {
    title: 'Merge Sort',
    code: `
function mergeSort(arr) {
  // Base case: an array of 0 or 1 elements is already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Divide: split the array into two halves
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // Conquer: recursively sort both halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // Combine: merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++;
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return resultArray
          .concat(left.slice(leftIndex))
          .concat(right.slice(rightIndex));
}
    `,
    explanation:
      'Merge Sort perfectly embodies the paradigm. It divides the array until it has single elements, then merges them back together in sorted order. The heavy lifting is in the `merge` (combine) step.',
  },
  {
    title: 'Binary Search (Recursive)',
    code: `
function binarySearch(arr, target, left, right) {
  // Base case: if the search range is invalid, target is not present
  if (left > right) {
    return -1;
  }

  // Divide: find the middle of the current search space
  const mid = Math.floor(left + (right - left) / 2);

  // Conquer: check if the middle element is the target
  if (arr[mid] === target) {
    return mid; // Found it
  } else if (arr[mid] > target) {
    // Search the left half
    return binarySearch(arr, target, left, mid - 1);
  } else {
    // Search the right half
    return binarySearch(arr, target, mid + 1, right);
  }
}
    `,
    explanation:
      'Binary search divides the search space by half in each step. The "combine" step is trivial because once a decision is made to go left or right, the other half is discarded entirely.',
  },
]

const keyTakeaways = [
  {
    title: 'Think Recursively',
    detail: 'Divide and Conquer is inherently recursive. You solve a problem by assuming you can solve a smaller version of it.',
  },
  {
    title: 'The Combine Step is Crucial',
    detail: 'The efficiency of many D&C algorithms is determined by how efficiently you can merge the results of subproblems.',
  },
  {
    title: 'Logarithms are your Friend',
    detail: 'The power of D&C often comes from turning O(N) problems into O(log N) operations, leading to O(N log N) overall.',
  },
  {
    title: 'Not a Silver Bullet',
    detail: 'It is not always the best approach, especially if subproblems overlap heavily (use DP) or if the combine step is too complex.',
  },
]

export default function DivideAndConquerPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Divide & Conquer</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Breaking Down Problems for Elegant Solutions</div>
              <p className="win95-text">
                Divide and Conquer is a powerful algorithmic strategy that tackles complex problems by breaking them into smaller,
                self-similar subproblems, solving them recursively, and then combining their solutions to solve the original puzzle.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  {item.note && (
                    <p className="win95-text">
                      <em>{item.note}</em>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical Context</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  {item.note && (
                    <p className="win95-text">
                      <em>{item.note}</em>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core Concepts & Mental Models</legend>
            <div className="win95-row">
              <div>
                <div className="win95-subheading">Pillars</div>
                <div className="win95-stack">
                  {pillars.map((item) => (
                    <div key={item.title} className="win95-panel">
                      <div className="win95-heading">{item.title}</div>
                      <p className="win95-text">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="win95-subheading">Mental Models</div>
                <div className="win95-stack">
                  {mentalModels.map((item) => (
                    <div key={item.title} className="win95-panel">
                      <div className="win95-heading">{item.title}</div>
                      <p className="win95-text">{item.detail}</p>
                      {item.note && (
                        <p className="win95-text">
                          <em>{item.note}</em>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How It Works</legend>
            <div className="win95-grid win95-grid-2">
              {howItWorks.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity Analysis</legend>
            <table className="win95-table">
              <thead>
                <tr>
                  <th>Approach</th>
                  <th>Time</th>
                  <th>Space</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {complexityTable.map((row) => (
                  <tr key={row.approach}>
                    <td>{row.approach}</td>
                    <td>{row.time}</td>
                    <td>{row.space}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-World Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((app) => (
                <div key={app.title} className="win95-panel">
                  <div className="win95-heading">{app.title}</div>
                  <p className="win95-text">{app.detail}</p>
                  <p className="win95-text">
                    <strong>{app.company}</strong>
                  </p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">Failure Callout: Fibonacci Sequence</div>
              <p className="win95-text">
                A naive recursive function to calculate Fibonacci numbers, fib(n) = fib(n-1) + fib(n-2), is a classic example where
                divide and conquer fails spectacularly. The subproblems (fib(n-1) and fib(n-2)) overlap heavily, leading to an exponential
                number of redundant calculations. The same value, like fib(5), is calculated over and over again. This is the canonical
                problem that demonstrates the need for Dynamic Programming or Memoization to store and reuse subproblem solutions.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Pitfalls & When To Use It</legend>
            <div className="win95-row">
              <div className="win95-panel">
                <div className="win95-heading">Pitfalls to Avoid</div>
                <ul className="win95-list">
                  {pitfalls.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="win95-panel">
                <div className="win95-heading">Decision Criteria</div>
                <ul className="win95-list">
                  {whenToUse.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced Variants</legend>
            <div className="win95-grid win95-grid-3">
              {advanced.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">
                    <em>{item.rationale}</em>
                  </p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Code Examples</legend>
            <div className="win95-stack">
              {codeExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
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

