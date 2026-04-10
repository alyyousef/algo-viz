import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    note: "Euclid's algorithm for finding the greatest common divisor (c. 300 BCE) can be viewed as a form of divide and conquer.",
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
    note: 'This highlighted the different ways the paradigm could be implemented and the trade-offs involved.',
  },
  {
    title: '1962: Karatsuba Multiplication',
    detail:
      'Anatoly Karatsuba discovered a method to multiply two n-digit numbers in fewer than n^2 single-digit multiplications, a major breakthrough that demonstrated divide and conquer could beat traditional "grade school" algorithms in pure arithmetic.',
    note: 'This showed the paradigm was not just for sorting or searching.',
  },
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

const problemFraming = [
  {
    title: 'Recurrence matters',
    detail:
      'Divide and conquer is best described by a recurrence T(n) = aT(n/b) + f(n). The combine cost f(n) often determines the final complexity.',
  },
  {
    title: 'Independent subproblems',
    detail:
      'Subproblems should be independent. If they overlap, dynamic programming or memoization is usually better.',
  },
  {
    title: 'Balanced splits win',
    detail:
      'Splitting into equal halves yields log-depth recursion and good cache behavior. Unbalanced splits can degrade performance.',
  },
]

const recursionAnatomy = [
  {
    title: 'Base case',
    detail: 'Stop when the subproblem is trivial (size 0 or 1, or a known direct formula).',
  },
  {
    title: 'Divide step',
    detail: 'Split the input into smaller parts and define how to recurse on them.',
  },
  {
    title: 'Conquer step',
    detail: 'Solve each subproblem recursively and return a structured result.',
  },
  {
    title: 'Combine step',
    detail: 'Merge sub-results into the final answer. This is often the cost bottleneck.',
  },
]

const masterTheoremCases = [
  {
    title: 'Case 1: f(n) smaller',
    detail: 'If f(n) = O(n^{log_b a - epsilon}), then T(n) = Theta(n^{log_b a}).',
  },
  {
    title: 'Case 2: f(n) equal',
    detail: 'If f(n) = Theta(n^{log_b a} log^k n), then T(n) = Theta(n^{log_b a} log^{k+1} n).',
  },
  {
    title: 'Case 3: f(n) larger',
    detail:
      'If f(n) = Omega(n^{log_b a + epsilon}) and a f(n/b) <= c f(n) for some c < 1, then T(n) = Theta(f(n)).',
  },
]

const workedExample = {
  title: 'Merge sort recursion tree',
  steps: [
    'Split array of size n into two halves of size n/2.',
    'Recursively sort both halves.',
    'Merge the two sorted halves in O(n).',
    'Depth is log n, work per level is O(n), so total is O(n log n).',
  ],
}

const decisionChecklist = [
  'Can the problem be decomposed into self-similar subproblems?',
  'Are the subproblems independent (no heavy overlap)?',
  'Is the combine step efficient enough to justify recursion?',
  'Is recursion depth safe for max input size?',
  'Would a DP or iterative approach be simpler and faster?',
]
const optimizationLevers = [
  {
    title: 'Hybrid base cases',
    detail:
      'Switch to insertion sort or direct formulas when subproblem size is small to reduce overhead.',
  },
  {
    title: 'Tail recursion elimination',
    detail: 'Convert certain recursive calls into loops to reduce stack usage.',
  },
  {
    title: 'Cache friendliness',
    detail: 'Work in contiguous chunks to exploit locality, especially in divide steps.',
  },
  {
    title: 'Parallelism',
    detail: 'Run subproblems concurrently; the paradigm naturally exposes parallel work.',
  },
  {
    title: 'Avoid repeated merges',
    detail: 'Re-use buffers or do in-place merges where possible to cut memory traffic.',
  },
]

const whenNotToUse = [
  'When subproblems overlap heavily (e.g., naive Fibonacci).',
  'When the combine step is too expensive compared to the work saved by splitting.',
  'When recursion depth is too large for the call stack.',
  'When a linear scan or iterative method is simpler and equally fast.',
]

const keyTakeaways = [
  {
    title: 'Think Recursively',
    detail:
      'Divide and Conquer is inherently recursive. You solve a problem by assuming you can solve a smaller version of it.',
  },
  {
    title: 'The Combine Step is Crucial',
    detail:
      'The efficiency of many D&C algorithms is determined by how efficiently you can merge the results of subproblems.',
  },
  {
    title: 'Logarithms are your Friend',
    detail:
      'The power of D&C often comes from turning O(N) problems into O(log N) operations, leading to O(N log N) overall.',
  },
  {
    title: 'Not a Silver Bullet',
    detail:
      'It is not always the best approach, especially if subproblems overlap heavily (use DP) or if the combine step is too complex.',
  },
]

const glossaryTerms = [
  {
    term: 'Divide and Conquer',
    definition:
      'A paradigm that splits a problem into smaller self-similar subproblems, solves them recursively, and combines their answers.',
  },
  {
    term: 'Base case',
    definition: 'The smallest subproblem that can be solved directly without more recursion.',
  },
  {
    term: 'Combine step',
    definition: 'The phase that merges subproblem results into a solution for the larger problem.',
  },
  {
    term: 'Recurrence',
    definition: 'An equation such as T(n) = aT(n/b) + f(n) that describes recursive running time.',
  },
  {
    term: 'Master Theorem',
    definition: 'A standard tool for analyzing many divide-and-conquer recurrences.',
  },
  {
    term: 'Balanced split',
    definition: 'A near-even partition of the input that keeps recursion depth logarithmic.',
  },
  {
    term: 'Overlapping subproblems',
    definition:
      'Repeatedly solving the same smaller problem, which is a sign that DP may be better.',
  },
  {
    term: 'Parallelism',
    definition: 'Executing independent subproblems at the same time on multiple cores or machines.',
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
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Pillars and Models' },
    { id: 'core-framing', label: 'Problem Framing' },
    { id: 'core-anatomy', label: 'Recursion Anatomy' },
    { id: 'core-how', label: 'How It Works' },
    { id: 'core-master', label: 'Master Theorem' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-checklist', label: 'Decision Checklist' },
    { id: 'core-use', label: 'When To Use It' },
    { id: 'core-avoid', label: 'When Not To Use It' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-optimization', label: 'Optimization Levers' },
    { id: 'core-advanced', label: 'Advanced Variants' },
  ],
  examples: [
    { id: 'examples-worked', label: 'Worked Example' },
    { id: 'examples-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function DivideAndConquerPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Divide &amp; Conquer',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Divide &amp; Conquer"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Divide &amp; Conquer</h1>
      <p>
        Divide and Conquer is a powerful algorithmic strategy that tackles complex problems by
        breaking them into smaller, self-similar subproblems, solving them recursively, and then
        combining their solutions to solve the original puzzle.
      </p>
      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {history.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            {applications.map((app) => (
              <p key={app.title}>
                <strong>{app.title}:</strong> {app.detail} <strong>{app.company}</strong>
              </p>
            ))}
            <h3 className="bin98-subheading">Failure Callout: Fibonacci Sequence</h3>
            <p>
              A naive recursive function to calculate Fibonacci numbers, fib(n) = fib(n-1) +
              fib(n-2), is a classic example where divide and conquer fails spectacularly. The
              subproblems (fib(n-1) and fib(n-2)) overlap heavily, leading to an exponential number
              of redundant calculations. The same value, like fib(5), is calculated over and over
              again. This is the canonical problem that demonstrates the need for Dynamic
              Programming or Memoization to store and reuse subproblem solutions.
            </p>
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
          <section id="core-pillars" className="bin98-section">
            <h2 className="bin98-heading">Pillars and Mental Models</h2>
            {pillars.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>
          <section id="core-framing" className="bin98-section">
            <h2 className="bin98-heading">Problem Framing</h2>
            {problemFraming.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-anatomy" className="bin98-section">
            <h2 className="bin98-heading">Recursion Anatomy</h2>
            {recursionAnatomy.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-how" className="bin98-section">
            <h2 className="bin98-heading">How It Works</h2>
            {howItWorks.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-master" className="bin98-section">
            <h2 className="bin98-heading">Master Theorem Quick Cases</h2>
            {masterTheoremCases.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity</h2>
            {complexityTable.map((row) => (
              <div key={row.approach}>
                <h3 className="bin98-subheading">{row.approach}</h3>
                <p>
                  <strong>Time:</strong> {row.time}
                </p>
                <p>
                  <strong>Space:</strong> {row.space}
                </p>
                <p>
                  <strong>Note:</strong> {row.note}
                </p>
              </div>
            ))}
          </section>
          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Decision Checklist</h2>
            <ol>
              {decisionChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-use" className="bin98-section">
            <h2 className="bin98-heading">When To Use It</h2>
            <ul>
              {whenToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-avoid" className="bin98-section">
            <h2 className="bin98-heading">When Not To Use It</h2>
            <ul>
              {whenNotToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-optimization" className="bin98-section">
            <h2 className="bin98-heading">Optimization Levers</h2>
            {optimizationLevers.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Variants</h2>
            {advanced.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>{item.rationale}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="examples-worked" className="bin98-section">
            <h2 className="bin98-heading">Worked Example</h2>
            <h3 className="bin98-subheading">{workedExample.title}</h3>
            <ol>
              {workedExample.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section id="examples-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {codeExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
