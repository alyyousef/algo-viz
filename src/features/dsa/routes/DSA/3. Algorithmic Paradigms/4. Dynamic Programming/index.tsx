import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Why it exists',
    detail:
      'Dynamic programming (DP) is the discipline of turning exponential brute force into polynomial time by reusing answers to overlapping subproblems. It saves systems from recomputing the same state thousands or millions of times.',
  },
  {
    title: 'What it saves us from',
    detail:
      'Without DP, shortest paths, sequence alignment, optimal edit scripts, and resource allocation would be either prohibitively slow or handled by heuristics with no guarantees.',
  },
  {
    title: 'Where it shows up',
    detail:
      'Routing protocols, genome alignment, ad auctions, compiler optimizers, query planners, and recommendation systems all rely on DP tables or memoized recurrences to stay fast and predictable.',
  },
]

const foundations = [
  {
    title: 'Principle of optimality',
    detail:
      'An optimal solution is built from optimal subsolutions. If the remainder of an optimal solution is not optimal for its subproblem, DP will be wrong.',
  },
  {
    title: 'State is the contract',
    detail:
      'Your state must contain every fact that influences future choices, and nothing else. Missing a detail breaks correctness; extra detail blows up complexity.',
  },
  {
    title: 'Recurrence is the engine',
    detail:
      'The recurrence defines how a state depends on smaller states. It must be acyclic under a chosen order or resolved with memoization.',
  },
  {
    title: 'Order guarantees validity',
    detail:
      'Bottom-up DP works only if every dependency is already computed. Topological order for DAGs and row-major order for grids make the dependencies safe.',
  },
]

const history = [
  {
    title: '1950s: Bellman coins the term',
    detail:
      'Richard Bellman introduced dynamic programming while working on multistage decision processes for control theory. The core idea was the principle of optimality: an optimal policy has optimal sub-policies.',
  },
  {
    title: '1960s: Knapsack and sequence alignment',
    detail:
      'DP formalized the classic 0/1 knapsack and edit distance problems, giving clear polynomial-time solutions where brute force had exploded combinatorially.',
  },
  {
    title: '1970s: Algorithms enter practice',
    detail:
      'The Needleman-Wunsch and Smith-Waterman algorithms brought DP to bioinformatics, proving that rigorous recurrences could power real labs and not just theory.',
  },
  {
    title: 'Modern era: DP meets scale',
    detail:
      'DP ideas power Viterbi decoding in communications, inside-outside for probabilistic grammars, and value iteration in reinforcement learning. The pattern remains: define state, derive recurrence, exploit overlap.',
  },
]

const pillars = [
  {
    title: 'Optimal substructure',
    detail:
      'The best solution can be composed of best solutions to smaller instances. If this is false, DP will give the wrong answer.',
  },
  {
    title: 'Overlapping subproblems',
    detail:
      'The same substate is needed many times. Caching prevents exponential blowup and converts repetition into leverage.',
  },
  {
    title: 'Well-defined state and transition',
    detail:
      'The state must capture everything the future depends on, nothing more. Transitions must be correct and acyclic once ordered.',
  },
]

const dpTaxonomy = [
  {
    title: '1D prefix DP',
    detail: 'State by index: dp[i] uses dp[i-1], dp[i-2]. Examples: Fibonacci, house robber.',
  },
  {
    title: '2D grid DP',
    detail: 'State by (i, j). Examples: edit distance, LCS, grid paths.',
  },
  {
    title: 'Interval DP',
    detail: 'State by [l, r] and split point. Examples: matrix chain, palindrome partitioning.',
  },
  {
    title: 'Knapsack family',
    detail: 'State by item index and capacity (or value). Examples: 0/1 knapsack, subset sum.',
  },
  {
    title: 'Subset and bitmask DP',
    detail: 'State by subset mask. Examples: TSP, Steiner tree, assignment.',
  },
  {
    title: 'Tree and DAG DP',
    detail: 'State by node and parent. Examples: tree diameter, independent set.',
  },
  {
    title: 'Digit DP',
    detail: 'State by position and tight/leading zeros. Examples: count numbers with constraints.',
  },
  {
    title: 'Probabilistic DP',
    detail: 'State stores expected values or probabilities. Examples: games, Markov chains.',
  },
]

const mentalModels = [
  {
    title: 'Travel diary',
    detail:
      'Each page (state) records the cheapest cost to reach a city. You never rewrite history; you only fill blanks using already known pages.',
  },
  {
    title: 'Spreadsheet of possibilities',
    detail:
      'Cells reference other cells, but circular references are forbidden. Sorting cells by dependency is the essence of bottom-up order.',
  },
  {
    title: 'Warehouse shelves',
    detail:
      'Memoization is like labeling bins for parts. Once a bin is filled, any worker can reuse it instantly instead of re-crafting the part.',
  },
]

const howItWorks = [
  {
    heading: '1) Define state',
    detail:
      'Pick the smallest tuple that fully describes progress: indices, remaining capacity, mask of chosen items, position in a tree. Eliminate dimensions that do not affect future choices.',
  },
  {
    heading: '2) Derive recurrence',
    detail:
      'Express the answer for a state in terms of smaller states. Prove each dependency is strictly smaller in a well-founded order (index decreases, capacity decreases, subset size decreases).',
  },
  {
    heading: '3) Pick execution style',
    detail:
      'Top-down with memoization mirrors the recurrence and is great for sparse states. Bottom-up tabulation is stack safe and cache friendly once you know the order.',
  },
  {
    heading: '4) Choose base cases and sentinels',
    detail:
      'Initialize impossible states with negative or positive infinity and reachable empties with zero or neutral elements. Bad initialization is the most common DP bug.',
  },
  {
    heading: '5) Reconstruct decisions',
    detail:
      'Store predecessors or take argmax choices to rebuild the path, not just the score. Many production failures come from forgetting reconstruction.',
  },
]

const stateDesignRules = [
  'State must encode everything the future needs (position, capacity, last choice, mask, remaining segments).',
  'Avoid redundant dimensions; if a variable can be derived from others, drop it.',
  'Prefer small integer ranges; compress values or map coordinates when needed.',
  'States should be comparable by a monotone measure (index or size) to allow ordering.',
  'Use sentinels for impossible states and keep transitions consistent with them.',
  'Document state meaning in plain language before coding the recurrence.',
]

const transitionTemplates = [
  {
    title: 'Take or skip',
    detail: 'dp[i] = max(dp[i-1], value[i] + dp[i-1 - cost]). Common in knapsack and selection problems.',
  },
  {
    title: 'Split and combine',
    detail: 'dp[l][r] = min over k of dp[l][k] + dp[k+1][r] + cost(l, r). Interval DP.',
  },
  {
    title: 'Extend from neighbors',
    detail: 'dp[i][j] uses dp[i-1][j], dp[i][j-1], dp[i-1][j-1]. Grid alignment and paths.',
  },
  {
    title: 'Add an element to a subset',
    detail: 'dp[mask | (1<<i)] = min(dp[mask] + cost). Bitmask DP for permutations.',
  },
  {
    title: 'Merge children',
    detail: 'Combine child states with convolution-like loops. Used in tree DP and distribution problems.',
  },
]

const complexityTable = [
  { approach: 'Naive recursion (Fibonacci)', time: 'O(2^n)', space: 'O(n) stack', note: 'Explodes past n=45' },
  {
    approach: 'Top-down memo',
    time: 'O(n)',
    space: 'O(n) cache + stack',
    note: 'Sparse states shine; overhead from recursion still present',
  },
  {
    approach: 'Bottom-up tabulation',
    time: 'O(n)',
    space: 'O(n) table',
    note: 'No stack blowups; best cache locality',
  },
  {
    approach: 'Space optimized',
    time: 'O(n)',
    space: 'O(1) or O(width)',
    note: 'Keeps only rolling frontier when dependencies are limited',
  },
]

const reconstruction = [
  {
    title: 'Parent pointers',
    detail:
      'Store the decision or predecessor that yielded the best value. Walk backward from the final state to rebuild the solution.',
  },
  {
    title: 'Choice tables',
    detail:
      'Record argmin or argmax indices in a parallel table to avoid recomputing decisions during backtracking.',
  },
  {
    title: 'Path recovery in DAG DP',
    detail:
      'Keep a prev pointer for each node or state. If multiple optimal paths exist, define a tie-breaker for deterministic output.',
  },
]

const applications = [
  {
    title: 'Networking and routing',
    detail:
      'Bellman-Ford is a DP over edges and distances. Distributed routing protocols reuse those subresults to converge on shortest paths.',
  },
  {
    title: 'Compilers and query optimizers',
    detail:
      'Dynamic programming picks parenthesization orders in SQL joins (System R), builds optimal parse trees in CYK, and drives instruction scheduling.',
  },
  {
    title: 'Bioinformatics',
    detail:
      'Needleman-Wunsch and Smith-Waterman fill a grid where each cell reuses neighbors to score sequence alignment. Without DP, genome labs would wait days instead of minutes.',
  },
  {
    title: 'Ads, pricing, and auctions',
    detail:
      'Budget pacing and bid shading often solve a resource allocation DP: maximize revenue subject to spend and inventory constraints.',
  },
  {
    title: 'Reinforcement learning',
    detail:
      'Value iteration and policy iteration are DP on Markov decision processes. Each value update reuses downstream values to converge on optimal policies.',
  },
]

const dpVsOtherParadigms = [
  {
    title: 'DP vs greedy',
    detail:
      'Greedy makes one irreversible choice; DP evaluates all relevant choices. If greedy choice property is not provable, DP is safer.',
  },
  {
    title: 'DP vs divide and conquer',
    detail:
      'Divide and conquer solves independent subproblems. DP solves overlapping subproblems and reuses their results.',
  },
  {
    title: 'DP vs backtracking',
    detail:
      'Backtracking explores a search tree with pruning. DP collapses repeated states into a table.',
  },
  {
    title: 'DP vs shortest path',
    detail:
      'Many shortest path algorithms are DP on a DAG. On graphs with cycles, DP must be coupled with ordering or relaxation rules.',
  },
]

const pitfalls = [
  'State is too large: an extra dimension of size 10^3 can turn a solution from feasible to impossible.',
  'Bad base cases: missing empty string rows in edit distance often yields off-by-one scores.',
  'Wrong order: reading from an unfilled cell silently injects garbage. Assertions against sentinel values can save hours.',
  'Overfitting to one instance: a recurrence that assumes sorted input or unique values may fail on adversarial cases.',
  'Ignoring reconstruction: computing only the score forces a second pass or makes the answer unusable to product teams.',
]

const debuggingChecklist = [
  'Print small tables and verify base rows and columns by hand.',
  'Test symmetry and monotonicity properties if they should hold.',
  'Brute-force tiny inputs to validate the recurrence.',
  'Add assertions for impossible states to catch bad transitions early.',
  'Check order of loops against dependencies before optimizing.',
]

const whenToUse = [
  'You can articulate optimal substructure and overlapping subproblems clearly.',
  'The state space is at most around 10^6 to 10^7 states with simple transitions.',
  'Approximation or greedy fails to give guarantees and you need correctness.',
  'Branch and bound or search is exploding, but dependencies are structured.',
]

const whenToAvoid = [
  'State space is huge (10^9 or more) with no compression.',
  'Problem lacks optimal substructure or has global constraints that invalidate local states.',
  'You need a streaming or online decision and cannot revisit past data.',
  'A greedy or flow algorithm exists with the same guarantees and lower cost.',
]

const advanced = [
  {
    title: 'Bitmask and SOS DP',
    detail:
      'Subset DP and sum-over-subsets transforms shrink exponential subsets by exploiting bit operations for transitions. Classic for TSP with n up to 20.',
  },
  {
    title: 'Divide-and-conquer optimization',
    detail:
      'Knuth and quadrangle inequality optimizations cut a naive O(n^3) DP to O(n^2) by proving the argmin indices move monotonically.',
  },
  {
    title: 'Convex hull trick and Li Chao trees',
    detail:
      'When recurrences involve lines, these structures answer min line queries in logarithmic time, turning O(n^2) DP into O(n log n).',
  },
  {
    title: 'Tree and DAG DP',
    detail:
      'Post-order traversal on trees and topological order on DAGs generalize the fill order principle beyond grids. Widely used in compiler IR passes.',
  },
  {
    title: 'Memory layout tuning',
    detail:
      'Cache-aware tiling and blocking matter for large tables. Production systems sometimes switch to banded DP to keep hot rows in cache.',
  },
]

const optimizationIdeas = [
  {
    title: 'Rolling arrays',
    detail:
      'When dp[i] depends only on dp[i-1], reuse two rows or one row with careful iteration order.',
  },
  {
    title: 'Monotone queue optimization',
    detail:
      'Use deque to optimize transitions with sliding window maxima or minima, reducing O(nk) to O(n).',
  },
  {
    title: 'Divide and conquer optimization',
    detail:
      'If the argmin index is monotone, compute each row in O(n log n) or O(n).',
  },
  {
    title: 'Knuth optimization',
    detail:
      'For quadrangle inequality and monotone optima, cut O(n^3) interval DP to O(n^2).',
  },
  {
    title: 'Bitset acceleration',
    detail:
      'Use machine word operations to accelerate subset sum or reachability in O(n * W/word).',
  },
]

const codeExamples = [
  {
    title: 'Bottom-up edit distance (Levenshtein)',
    code: `def edit_distance(a: str, b: str) -> int:
    # dp[i][j] = cost to convert a[:i] to b[:j]
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(len(a) + 1):
        dp[i][0] = i  # delete all chars
    for j in range(len(b) + 1):
        dp[0][j] = j  # insert all chars

    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            cost = 0 if a[i - 1] == b[j - 1] else 1
            dp[i][j] = min(
                dp[i - 1][j] + 1,      # delete
                dp[i][j - 1] + 1,      # insert
                dp[i - 1][j - 1] + cost,  # replace/match
            )
    return dp[len(a)][len(b)]`,
    explanation:
      'Grid DP with O(|a| * |b|) time and space. Dependencies are left, up, and diagonal, so row-major iteration is valid. Base rows are the crucial guardrails.',
  },
  {
    title: 'Space-optimized knapsack (0/1)',
    code: `def knapsack(weights, values, capacity):
    # 1D rolling array; iterate capacity descending to avoid reuse in same row
    dp = [0] * (capacity + 1)
    for w, v in zip(weights, values):
        for c in range(capacity, w - 1, -1):
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[capacity]`,
    explanation:
      'Transitions only depend on the previous item row, so a single array suffices. Reversing the capacity loop prevents using an item multiple times.',
  },
  {
    title: 'Longest common subsequence (LCS)',
    code: `def lcs(a: str, b: str) -> int:
    # dp[i][j] = LCS length for a[:i] and b[:j]
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[len(a)][len(b)]`,
    explanation:
      'Classic 2D DP. The recurrence preserves order while exploring matches and mismatches.',
  },
]

const keyTakeaways = [
  'Define the smallest correct state. Everything else follows.',
  'Order matters as much as the recurrence. Incorrect order is silent failure.',
  'Reconstruction turns a score into a story. Products often need the path.',
]

const glossaryTerms = [
  {
    term: 'Dynamic programming',
    definition:
      'A method for solving overlapping subproblems by storing and reusing intermediate answers.',
  },
  {
    term: 'State',
    definition:
      'The minimal description of a subproblem that contains all information needed for future decisions.',
  },
  {
    term: 'Recurrence',
    definition:
      'The formula that expresses a state in terms of smaller states.',
  },
  {
    term: 'Memoization',
    definition:
      'Top-down caching of computed states so repeated recursive calls do not redo work.',
  },
  {
    term: 'Tabulation',
    definition:
      'Bottom-up filling of a DP table in dependency-safe order.',
  },
  {
    term: 'Optimal substructure',
    definition:
      'The property that an optimal solution can be built from optimal solutions to smaller subproblems.',
  },
  {
    term: 'Overlapping subproblems',
    definition:
      'The property that the same subproblem appears many times during naive recursion.',
  },
  {
    term: 'Sentinel',
    definition:
      'A special value such as infinity or negative infinity used to represent impossible or uninitialized states.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const dynamicProgrammingHelpStyles = `
.dynamic-programming-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  padding: 0;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.dynamic-programming-help-window {
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

.dynamic-programming-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
}

.dynamic-programming-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.dynamic-programming-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.dynamic-programming-help-control {
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

.dynamic-programming-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.dynamic-programming-help-tab {
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

.dynamic-programming-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.dynamic-programming-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.dynamic-programming-help-toc {
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
}

.dynamic-programming-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.dynamic-programming-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.dynamic-programming-help-toc-list li {
  margin: 0 0 8px;
}

.dynamic-programming-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.dynamic-programming-help-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.dynamic-programming-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.dynamic-programming-help-section {
  margin: 0 0 20px;
}

.dynamic-programming-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.dynamic-programming-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.dynamic-programming-help-content p,
.dynamic-programming-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.dynamic-programming-help-content p {
  margin: 0 0 10px;
}

.dynamic-programming-help-content ul,
.dynamic-programming-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.dynamic-programming-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.dynamic-programming-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.dynamic-programming-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .dynamic-programming-help-main {
    grid-template-columns: 1fr;
  }

  .dynamic-programming-help-toc {
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
    { id: 'bp-foundations', label: 'Foundations' },
    { id: 'bp-taxonomy', label: 'DP Taxonomy' },
    { id: 'bp-history', label: 'Historical Context' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Pillars and Models' },
    { id: 'core-how', label: 'How It Works' },
    { id: 'core-state', label: 'State Design Rules' },
    { id: 'core-transitions', label: 'Transition Templates' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-reconstruction', label: 'Reconstruction' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-comparisons', label: 'DP vs Other Paradigms' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-debugging', label: 'Debugging Checklist' },
    { id: 'core-use', label: 'When To Use DP' },
    { id: 'core-avoid', label: 'When To Avoid DP' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-optimization', label: 'Optimization Toolbox' },
    { id: 'core-takeaways', label: 'Key Takeaways' },
  ],
  examples: [{ id: 'examples-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function DynamicProgrammingParadigmPage(): JSX.Element {
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
    document.title = `Dynamic Programming Paradigm (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: false })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Dynamic Programming Paradigm',
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
    <div className="dynamic-programming-help-page">
      <style>{dynamicProgrammingHelpStyles}</style>
      <div className="dynamic-programming-help-window" role="presentation">
        <header className="dynamic-programming-help-titlebar">
          <span className="dynamic-programming-help-title">Dynamic Programming Paradigm</span>
          <div className="dynamic-programming-help-controls">
            <button className="dynamic-programming-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="dynamic-programming-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="dynamic-programming-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`dynamic-programming-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="dynamic-programming-help-main">
          <aside className="dynamic-programming-help-toc" aria-label="Table of contents">
            <h2 className="dynamic-programming-help-toc-title">Contents</h2>
            <ul className="dynamic-programming-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="dynamic-programming-help-content">
            <h1 className="dynamic-programming-help-doc-title">Dynamic Programming Paradigm</h1>
            <p>
              Dynamic programming is the craft of converting repeated work into cached answers. It trades exponential branching for orderly
              state transitions and underpins routing, parsing, alignment, and planning systems across industry.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="dynamic-programming-help-divider" />
                <section id="bp-foundations" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Foundations</h2>
                  {foundations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="dynamic-programming-help-divider" />
                <section id="bp-taxonomy" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">DP Taxonomy</h2>
                  {dpTaxonomy.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="dynamic-programming-help-divider" />
                <section id="bp-history" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Historical Context</h2>
                  {history.map((item) => (
                    <div key={item.title}>
                      <h3 className="dynamic-programming-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-pillars" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Pillars and Mental Hooks</h2>
                  {pillars.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-how" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">How It Works, Step by Step</h2>
                  {howItWorks.map((item) => (
                    <p key={item.heading}>
                      <strong>{item.heading}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-state" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">State Design Rules</h2>
                  <ul>
                    {stateDesignRules.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-transitions" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Common Transition Templates</h2>
                  {transitionTemplates.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Complexity in Practice</h2>
                  {complexityTable.map((row) => (
                    <div key={row.approach}>
                      <h3 className="dynamic-programming-help-subheading">{row.approach}</h3>
                      <p><strong>Time:</strong> {row.time}</p>
                      <p><strong>Space:</strong> {row.space}</p>
                      <p><strong>Notes:</strong> {row.note}</p>
                    </div>
                  ))}
                  <p>
                    Big O hides constants, but memory layout and cache behavior matter. Bottom-up tables often outperform memoized recursion in tight
                    loops because they avoid call overhead and exhibit better spatial locality.
                  </p>
                </section>
                <section id="core-reconstruction" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Reconstruction Strategies</h2>
                  {reconstruction.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-applications" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Applications and Failure Stories</h2>
                  {applications.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="dynamic-programming-help-subheading">Failure Case</h3>
                  <p>
                    A video streaming team once used a greedy bitrate selector per segment, ignoring future bandwidth drops. Under load tests,
                    sessions oscillated and rebuffered. Reframing it as a DP over time and buffer levels stabilized playback and cut rebuffering by
                    double digits.
                  </p>
                </section>
                <section id="core-comparisons" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">DP vs Other Paradigms</h2>
                  {dpVsOtherParadigms.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-debugging" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Debugging Checklist</h2>
                  <ul>
                    {debuggingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-use" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">When to Use Dynamic Programming</h2>
                  <ol>
                    {whenToUse.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-avoid" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">When to Avoid DP</h2>
                  <ul>
                    {whenToAvoid.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-advanced" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Advanced Insights and Optimizations</h2>
                  {advanced.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-optimization" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Optimization Toolbox</h2>
                  {optimizationIdeas.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-takeaways" className="dynamic-programming-help-section">
                  <h2 className="dynamic-programming-help-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="examples-code" className="dynamic-programming-help-section">
                <h2 className="dynamic-programming-help-heading">Practical Examples</h2>
                {codeExamples.map((example) => (
                  <div key={example.title}>
                    <h3 className="dynamic-programming-help-subheading">{example.title}</h3>
                    <div className="dynamic-programming-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="dynamic-programming-help-section">
                <h2 className="dynamic-programming-help-heading">Glossary</h2>
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
