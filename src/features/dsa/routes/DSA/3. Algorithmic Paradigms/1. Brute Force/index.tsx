import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What It Is',
    detail:
      "Brute force is the simplest algorithmic paradigm: systematically enumerate all possible candidates for a solution and check whether each candidate satisfies the problem's statement.",
    note: 'It is a general problem-solving technique, not a specific algorithm.',
  },
  {
    title: 'Why It Exists',
    detail:
      'It provides a guaranteed path to a correct solution, assuming one exists within the search space. Its primary value lies in its simplicity and reliability, serving as a benchmark for more optimized algorithms.',
    note: 'It saves us from the complexity of designing clever heuristics when the search space is small enough.',
  },
  {
    title: 'Where It Shows Up',
    detail:
      'Brute force is common in scenarios with small constraints (e.g., N <= 10), cryptography (breaking passwords), and as a building block in more complex algorithms like backtracking. It is often the first approach considered for a new problem.',
    note: 'Also used to verify the correctness of more efficient, but complex, algorithms.',
  },
]

const history = [
  {
    title: 'Antiquity',
    detail:
      'The concept of exhaustive search is ancient. Early mathematicians and strategists implicitly used brute force to solve problems, such as checking all possible moves in a simple board game.',
    note: "The 'Sieve of Eratosthenes' for finding prime numbers (c. 240 BCE) is a form of exhaustive search.",
  },
  {
    title: '1950s: The Dawn of Computing',
    detail:
      'With the advent of electronic computers, brute force became a viable strategy for solving complex computational problems for the first time. Pioneers like Alan Turing used it for code-breaking during WWII.',
    note: 'The ENIAC could perform calculations thousands of times faster than humans, making brute force practical for certain tasks.',
  },
  {
    title: '1971: The P vs NP Problem',
    detail:
      "Stephen Cook's and Leonid Levin's work formalized the concept of computational complexity, highlighting that many problems (NP-complete) had no known efficient solution better than brute-force style exponential search.",
    note: 'This gave a theoretical foundation for understanding why brute force is sometimes the only option we have.',
  },
]

const pillars = [
  {
    title: 'Complete Search Space',
    detail:
      'The core principle is that the set of all possible solutions must be well-defined and finite. The algorithm must have a systematic way to generate every single candidate without missing any.',
  },
  {
    title: 'Correctness Test',
    detail:
      'For each candidate, there must be a clear and correct procedure to verify if it is a valid solution to the problem.',
  },
  {
    title: 'Finite Termination',
    detail:
      'The process must be guaranteed to stop. Since the search space is finite, iterating through all possibilities will eventually end.',
  },
]

const mentalModels = [
  {
    title: 'The Locksmith',
    detail:
      'Imagine a locksmith trying to open a combination lock with no knowledge of the code. They will try every combination one by one: 000, 001, 002, and so on, until the lock opens. This is a pure brute-force approach.',
    note: 'This analogy highlights the methodical, exhaustive, and often slow nature of the search.',
  },
  {
    title: 'The Jigsaw Puzzle',
    detail:
      'A naive way to solve a jigsaw puzzle is to take one piece and try to connect it with every other piece, then take the next piece and repeat. You are testing all possible pairings until something fits.',
    note: 'This breaks down because skilled puzzlers use heuristics (edge pieces first, color matching), which is precisely what brute force avoids.',
  },
]

const howItWorks = [
  {
    title: '1. Define the Search Space',
    detail:
      "Translate the problem into a set of candidates. For a password cracker, it's all possible character strings. For the Traveling Salesperson Problem, it's all possible orderings of cities.",
  },
  {
    title: '2. Generate Candidates',
    detail:
      'Create a mechanism (e.g., nested loops, recursion) to iterate through every single candidate in the search space, one at a time.',
  },
  {
    title: '3. Test Each Candidate',
    detail:
      "For each generated candidate, apply the problem's constraints to check if it's a valid solution. For an optimization problem, compare it to the best solution found so far.",
  },
  {
    title: '4. Return the Result',
    detail:
      'If a solution is found (or after checking all candidates for an optimization problem), return the result. If the entire space is searched and no solution is found, report failure.',
  },
]

const complexityTable = [
  {
    approach: 'Generating all subsets',
    time: 'O(2^N * f(N))',
    space: 'O(N) or O(N^2)',
    note: 'f(N) is the time to check one subset. Space depends on if you store the subset.',
  },
  {
    approach: 'Generating all permutations',
    time: 'O(N! * f(N))',
    space: 'O(N) or O(N^2)',
    note: 'Factorial growth is extremely fast. Often only feasible for N < 12.',
  },
  {
    approach: 'Searching a grid (NxM)',
    time: 'O(N * M)',
    space: 'O(1) or O(N*M)',
    note: 'A simple, complete search of a 2D space is technically brute force.',
  },
  {
    approach: 'Password Cracking (L=length, C=charset size)',
    time: 'O(C^L)',
    space: 'O(L)',
    note: 'This is why password length is more important than complexity.',
  },
]

const applications = [
  {
    title: 'Cryptography',
    detail:
      'The most direct application is trying to guess a key or password by trying all possible combinations. Modern encryption is designed to make the brute-force search space astronomically large.',
    company: 'All secure systems',
  },
  {
    title: 'Solving Puzzles',
    detail:
      "For games like Sudoku or Rubik's Cube, a computer can explore every possible move to find a solution path. This is often combined with backtracking to prune impossible branches.",
    company: 'Game AI, Puzzle Solvers',
  },
  {
    title: 'Scientific Computing',
    detail:
      'In fields like computational biology, brute-force search can be used to explore different protein folding configurations or gene sequence alignments when the problem space is constrained.',
    company: 'Research, Bioinformatics',
  },
  {
    title: 'Quality Assurance',
    detail:
      'Testing a function with every possible input within a small range to ensure it behaves as expected. This is a form of exhaustive testing.',
    company: 'Software Engineering',
  },
]

const pitfalls = [
  'Underestimating Exponential Growth: A brute-force solution that is instant for N=10 might take centuries for N=30. Developers often fail to calculate the upper bound of the search space.',
  'Off-by-One Errors in Generation: Incorrectly defining loops or recursion can lead to missing the last candidate or generating one too many, leading to incorrect results or crashes.',
  'Ignoring Simple Pruning: Sometimes, a simple `if` condition can prune huge parts of the search space (e.g., in backtracking), but a pure brute-force implementation might miss this.',
  'Unnecessary Computation: Re-calculating the same values repeatedly inside the test function for each candidate. This is where memoization could be a simple optimization.',
]
const whenToUse = [
  'When the input size is guaranteed to be very small.',
  'As a first step to understand a problem and establish a baseline for correctness.',
  'When the problem is proven to have no better-than-exponential solution (NP-Hard) and you need the optimal answer.',
  'For problems where the search space, while large, can be massively parallelized.',
]

const advanced = [
  {
    title: 'Brute Force with Pruning (Backtracking)',
    detail:
      'This is the most common optimization. If you determine that a partial candidate cannot possibly lead to a valid solution, you stop exploring that entire branch of the search space.',
    rationale: 'Avoids exploring large, fruitless areas of the search space.',
  },
  {
    title: 'Meet-in-the-Middle',
    detail:
      'Divide the problem into two halves. Brute force all possibilities for the first half and store the results in a hash table. Then, brute force the second half and look for a "match" in the hash table.',
    rationale: 'Turns an O(2^N) problem into two O(2^(N/2)) problems, which is a massive improvement.',
  },
  {
    title: 'Memoization / Dynamic Programming',
    detail:
      'If the brute-force approach involves solving the same subproblems multiple times, storing the results of these subproblems can drastically reduce redundant computations.',
    rationale: 'Trades space for time by caching intermediate results.',
  },
]

const codeExamples = [
  {
    code: `
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    // Test every element
    if (arr[i] === target) {
      return i; // Solution found
    }
  }
}
    `,
    explanation:
      'This is the most basic form of brute force. It iterates through every element (the entire search space) and tests each one against the target. Simple and effective for unsorted data.',
  },
  {
    title: 'Traveling Salesperson Problem (TSP)',
    code: `
function tsp(cities) {
  let minDistance = Infinity;
  let bestPath = [];

  function generatePermutations(currentPath, remainingCities) {
    if (remainingCities.length === 0) {
      // We have a full path, now test it
      const currentDistance = calculateDistance(currentPath);
      if (currentDistance < minDistance) {
        minDistance = currentDistance;
        bestPath = currentPath;
      }
      return;
    }

    for (let i = 0; i < remainingCities.length; i++) {
      const nextCity = remainingCities[i];
      const newPath = [...currentPath, nextCity];
      const newRemaining = remainingCities.filter(c => c !== nextCity);
      generatePermutations(newPath, newRemaining);
    }
  }

  generatePermutations([], cities); // Start the generation
  return { path: bestPath, distance: minDistance };
}
    `,
    explanation:
      'This recursive function generates every possible ordering (permutation) of cities. For each complete path, it calculates the total distance and updates the minimum. This is a classic example of factorial (O(N!)) complexity.',
  },
]

const problemFraming = [
  {
    title: 'Input size and feasibility',
    detail:
      'Estimate the size of the search space first. If it is above ~10^7 candidates, brute force is usually too slow without pruning or parallelism.',
  },
  {
    title: 'Decision vs optimization',
    detail:
      'Decision: stop at the first valid solution. Optimization: must scan all candidates to guarantee the best.',
  },
  {
    title: 'Deterministic coverage',
    detail:
      'You must define the search space precisely and prove that every valid solution appears exactly once.',
  },
]

const searchSpaceTypes = [
  {
    title: 'Subsets (2^n)',
    detail:
      'Include/exclude each item. Common in knapsack, subset sum, set cover, and feature selection.',
  },
  {
    title: 'Permutations (n!)',
    detail:
      'Order all items. Appears in TSP, assignment, and scheduling problems.',
  },
  {
    title: 'Cartesian products',
    detail:
      'Choose one option from each of k categories. Example: parameter grid search.',
  },
  {
    title: 'Strings / sequences',
    detail:
      'All strings of length L over an alphabet of size C gives C^L possibilities.',
  },
  {
    title: 'Graphs and paths',
    detail:
      'Enumerate paths, subgraphs, or cuts; search space often explodes combinatorially.',
  },
]

const verificationChecklist = [
  'Define the candidate generator and prove it is exhaustive.',
  'Make the validity check correct and cheap; it runs on every candidate.',
  'Track the best-so-far and update deterministically.',
  'Short-circuit for decision problems when a valid candidate is found.',
  'Compute worst-case bounds to confirm feasibility at max input sizes.',
]

const workedExample = {
  title: 'Subset sum by brute force (n = 4)',
  input: 'nums = [3, 5, 6, 7], target = 12',
  candidates: [
    '{ } -> 0',
    '{3} -> 3',
    '{5} -> 5',
    '{6} -> 6',
    '{7} -> 7',
    '{3,5} -> 8',
    '{3,6} -> 9',
    '{3,7} -> 10',
    '{5,6} -> 11',
    '{5,7} -> 12 (hit)',
  ],
  note: 'Brute force checks all subsets until it finds one that sums to 12.',
}
const optimizationLevers = [
  {
    title: 'Pruning',
    detail:
      'Stop exploring a branch as soon as it violates constraints. This turns brute force into backtracking.',
  },
  {
    title: 'Symmetry breaking',
    detail:
      'Avoid exploring symmetric candidates (e.g., permutations that are equivalent under rotation or reversal).',
  },
  {
    title: 'Incremental evaluation',
    detail:
      'Update the validity check using changes from the previous candidate instead of recomputing from scratch.',
  },
  {
    title: 'Parallelization',
    detail:
      'Split the search space across threads or machines; brute force is embarrassingly parallel.',
  },
  {
    title: 'Memoization',
    detail:
      'Cache subproblem results to avoid recomputing repeated states when the brute-force tree overlaps.',
  },
]

const whenNotToUse = [
  'When the search space is exponential or factorial with n above ~15 without pruning.',
  'When a polynomial-time algorithm exists and input sizes are large.',
  'When the validation check is expensive and dominates runtime.',
  'When approximate or heuristic solutions are acceptable and far cheaper.',
]

const keyTakeaways = [
  {
    title: 'Simple and Reliable',
    detail: 'Brute force is often easy to implement and guaranteed to be correct if designed properly.',
  },
  {
    title: 'Performance is the Enemy',
    detail: 'Its downfall is its terrible performance on all but the smallest of inputs.',
  },
  {
    title: 'The Ultimate Benchmark',
    detail: `Use it to verify your clever, optimized algorithms. If they don't match the brute force output on small inputs, your "fast" algorithm is wrong.`,
  },
  {
    title: 'Know the Complexity',
    detail:
      "You must be able to identify whether your brute-force approach will be factorial (N!), exponential (2^N), or polynomial (N^k) to know if it's feasible.",
  },
]

const glossaryTerms = [
  {
    term: 'Brute force',
    definition:
      'A paradigm that systematically enumerates all candidates and checks each one for correctness or optimality.',
  },
  {
    term: 'Search space',
    definition:
      'The full set of all candidates the algorithm may need to consider.',
  },
  {
    term: 'Candidate generator',
    definition:
      'The mechanism, often loops or recursion, that systematically produces each possible candidate.',
  },
  {
    term: 'Validity check',
    definition:
      'The test used to determine whether a generated candidate solves the problem or improves the current best answer.',
  },
  {
    term: 'Decision problem',
    definition:
      'A problem where the goal is to determine whether at least one valid solution exists.',
  },
  {
    term: 'Optimization problem',
    definition:
      'A problem where all candidates may need to be considered to guarantee the best result.',
  },
  {
    term: 'Pruning',
    definition:
      'Stopping exploration early when a partial candidate cannot possibly lead to a valid or better solution.',
  },
  {
    term: 'Meet-in-the-middle',
    definition:
      'A technique that splits the search into halves to reduce an exponential search space substantially.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bruteForceHelpStyles = `
.brute-force-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  padding: 0;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.brute-force-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.brute-force-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
}

.brute-force-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.brute-force-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.brute-force-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  padding: 0;
}

.brute-force-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.brute-force-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
}

.brute-force-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.brute-force-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.brute-force-help-toc {
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
}

.brute-force-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.brute-force-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.brute-force-help-toc-list li {
  margin: 0 0 8px;
}

.brute-force-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}
.brute-force-help-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.brute-force-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.brute-force-help-section {
  margin: 0 0 20px;
}

.brute-force-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.brute-force-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.brute-force-help-content p,
.brute-force-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.brute-force-help-content p {
  margin: 0 0 10px;
}

.brute-force-help-content ul,
.brute-force-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.brute-force-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.brute-force-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.brute-force-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .brute-force-help-main {
    grid-template-columns: 1fr;
  }

  .brute-force-help-toc {
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
    { id: 'core-space', label: 'Search Space Taxonomy' },
    { id: 'core-how', label: 'How It Works' },
    { id: 'core-verify', label: 'Verification Checklist' },
    { id: 'core-complexity', label: 'Complexity' },
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

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function BruteForcePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Brute Force (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: false })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Brute Force',
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
    <div className="brute-force-help-page">
      <style>{bruteForceHelpStyles}</style>
      <div className="brute-force-help-window" role="presentation">
        <header className="brute-force-help-titlebar">
          <span className="brute-force-help-title">Brute Force</span>
          <div className="brute-force-help-controls">
            <button className="brute-force-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="brute-force-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="brute-force-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`brute-force-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="brute-force-help-main">
          <aside className="brute-force-help-toc" aria-label="Table of contents">
            <h2 className="brute-force-help-toc-title">Contents</h2>
            <ul className="brute-force-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="brute-force-help-content">
            <h1 className="brute-force-help-doc-title">Brute Force</h1>
            <p>
              Brute force is the straightforward strategy of trying every single possibility to find a solution. It&apos;s the ultimate
              &quot;no stone unturned&quot; approach: simple to design, guaranteed to work, but often computationally expensive.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="brute-force-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <hr className="brute-force-help-divider" />
                <section id="bp-history" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Historical Context</h2>
                  {history.map((item) => (
                    <div key={item.title}>
                      <h3 className="brute-force-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <hr className="brute-force-help-divider" />
                <section id="bp-applications" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Applications</h2>
                  {applications.map((app) => (
                    <p key={app.title}>
                      <strong>{app.title}:</strong> {app.detail} <strong>{app.company}</strong>
                    </p>
                  ))}
                  <h3 className="brute-force-help-subheading">Failure Callout: The Knight&apos;s Tour</h3>
                  <p>
                    A classic problem is finding a sequence of moves for a knight on a chessboard to visit every square exactly once.
                    A naive brute-force approach that explores every possible sequence of 63 moves is computationally impossible. The
                    number of paths is astronomical (approx. 10^52). This problem illustrates that pure brute force is infeasible
                    without clever pruning (backtracking) to eliminate dead-end paths early.
                  </p>
                </section>
                <hr className="brute-force-help-divider" />
                <section id="bp-takeaways" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Key Takeaways</h2>
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
                <section id="core-pillars" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Pillars and Mental Models</h2>
                  {pillars.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="brute-force-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <section id="core-framing" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Problem Framing</h2>
                  {problemFraming.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-space" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Search Space Taxonomy</h2>
                  {searchSpaceTypes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-how" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">How It Works</h2>
                  {howItWorks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-verify" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Verification Checklist</h2>
                  <ol>
                    {verificationChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-complexity" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Complexity</h2>
                  {complexityTable.map((row) => (
                    <div key={row.approach}>
                      <h3 className="brute-force-help-subheading">{row.approach}</h3>
                      <p><strong>Time:</strong> {row.time}</p>
                      <p><strong>Space:</strong> {row.space}</p>
                      <p><strong>Note:</strong> {row.note}</p>
                    </div>
                  ))}
                </section>
                <section id="core-use" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">When To Use It</h2>
                  <ul>
                    {whenToUse.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-avoid" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">When Not To Use It</h2>
                  <ul>
                    {whenNotToUse.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-pitfalls" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-optimization" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Optimization Levers</h2>
                  {optimizationLevers.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Advanced Variants</h2>
                  {advanced.map((item) => (
                    <div key={item.title}>
                      <h3 className="brute-force-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                      <p>{item.rationale}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="examples-worked" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Worked Example</h2>
                  <h3 className="brute-force-help-subheading">{workedExample.title}</h3>
                  <p><strong>Input:</strong> {workedExample.input}</p>
                  <ul>
                    {workedExample.candidates.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                  <p>{workedExample.note}</p>
                </section>
                <section id="examples-code" className="brute-force-help-section">
                  <h2 className="brute-force-help-heading">Code Examples</h2>
                  {codeExamples.map((example) => (
                    <div key={example.title ?? example.code}>
                      {example.title && <h3 className="brute-force-help-subheading">{example.title}</h3>}
                      {!example.title && <h3 className="brute-force-help-subheading">Linear Search</h3>}
                      <div className="brute-force-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="brute-force-help-section">
                <h2 className="brute-force-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
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
