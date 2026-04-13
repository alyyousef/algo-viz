import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Backtracking is a systematic method for solving problems by building a solution incrementally, one piece at a time, and abandoning a partial solution as soon as it is determined that it cannot possibly lead to a valid complete solution.',
    notes:
      'It is structured brute force: the search space is a tree, and backtracking prunes entire subtrees rather than blindly enumerating every leaf.',
  },
  {
    title: 'Why it matters',
    details:
      'Many important problems — constraint satisfaction, combinatorial optimization, game solving, parsing — have no known polynomial-time algorithm. Backtracking is often the only practical exact method, and good pruning can make it fast enough for real inputs.',
    notes:
      'The difference between a naive O(n!) search and a well-pruned backtracking solution on the same problem can be several orders of magnitude in practice.',
  },
  {
    title: 'Where it shows up',
    details:
      'Puzzle solvers (Sudoku, N-Queens, crosswords), combinatorial enumeration (permutations, subsets, combinations), constraint satisfaction (graph coloring, SAT solvers), game tree search, and compiler backtracking in parsing.',
    notes:
      'Most SAT solvers and CSP engines at their core use DPLL or CDCL, which are backtracking algorithms with increasingly sophisticated pruning.',
  },
]

const mentalModel = [
  {
    title: 'State space tree',
    detail:
      'The search space is a tree. Each node is a partial solution; each edge is a choice. Leaves are complete candidates. Backtracking performs DFS on this tree, pruning branches that violate constraints.',
  },
  {
    title: 'Choose, explore, unchoose',
    detail:
      'The backtracking template is always: (1) choose a candidate extension, (2) recurse into the subtree, (3) undo the choice (unchoose) before trying the next candidate. The undo step is what makes backtracking correct.',
  },
  {
    title: 'Pruning is everything',
    detail:
      'Without pruning, backtracking is brute force. Every constraint check that eliminates a branch before recursing multiplies the speedup. The tighter the constraint, the earlier the prune, the faster the algorithm.',
  },
  {
    title: 'Feasibility vs optimality',
    detail:
      'Some backtracking problems ask for any valid solution (feasibility), some ask for all solutions (enumeration), and some ask for the best solution (optimization). Optimization requires a bound function to prune suboptimal branches (branch and bound).',
  },
]

const keyTakeaways = [
  'Backtracking is DFS on a state space tree with constraint-based pruning of invalid branches.',
  'The choose/explore/unchoose pattern ensures all choices are tried and the state is correctly restored after each branch.',
  'Pruning is the key to efficiency — check constraints as early as possible before recursing deeper.',
  'Backtracking is worst-case exponential; pruning, constraint propagation, and good variable ordering can make it polynomial in practice on many instances.',
  'Memoization can be added on top of backtracking when sub-problems overlap, turning it into dynamic programming.',
  'State restoration (undo) must mirror every state mutation exactly — a missed undo corrupts all subsequent branches.',
]

const classicProblems = [
  {
    title: 'N-Queens',
    description:
      'Place N queens on an N×N chessboard such that no two queens attack each other (no shared row, column, or diagonal).',
    approach:
      'Place one queen per row. For each row, try every column; skip if the column or either diagonal is already attacked. Prune immediately on conflict.',
    complexity:
      'O(N!) brute force; pruning reduces it dramatically. For N=8 only 92 solutions exist from 8! = 40320 candidates.',
  },
  {
    title: 'Sudoku Solver',
    description:
      'Fill a 9×9 grid so that every row, column, and 3×3 box contains the digits 1–9 exactly once.',
    approach:
      'Find the next empty cell. Try digits 1–9; skip any that conflict with the current row, column, or box. Recurse. Backtrack if no digit fits.',
    complexity:
      'Worst case O(9^81) but constraint propagation (naked singles, hidden singles) reduces it to near-linear on well-formed puzzles.',
  },
  {
    title: 'Subset Sum',
    description: 'Given a set of integers and a target T, determine whether any subset sums to T.',
    approach:
      'For each element, branch on include or exclude. Prune if current sum exceeds T or remaining elements cannot reach T.',
    complexity:
      'O(2^n) worst case; pruning and sorting by descending value allow early termination.',
  },
  {
    title: 'Permutations',
    description: 'Generate all permutations of a sequence.',
    approach:
      'At each position, swap in each remaining element, recurse on the rest of the sequence, then swap back (unchoose).',
    complexity: 'O(n! · n) to generate all n! permutations, each of length n.',
  },
  {
    title: 'Combinations / Subsets',
    description: 'Generate all k-element subsets (combinations) or all subsets of a set.',
    approach:
      'At each step, decide to include or skip the current element. For combinations, track the count and stop when k elements are chosen.',
    complexity: 'O(2^n) for all subsets; O(C(n,k)) for k-combinations.',
  },
  {
    title: 'Graph Coloring',
    description:
      'Assign one of k colors to each vertex of a graph such that no two adjacent vertices share a color.',
    approach:
      'Assign colors to vertices in order. For each vertex, try every color; skip if a neighbor already has that color. Backtrack on failure.',
    complexity: 'O(k^V) worst case. The problem is NP-complete for general k ≥ 3.',
  },
  {
    title: 'Hamiltonian Path',
    description: 'Find a path in a graph that visits every vertex exactly once.',
    approach:
      'Extend the current path one vertex at a time. Only visit unvisited neighbors. Backtrack if stuck before visiting all vertices.',
    complexity: 'O(V!) worst case. NP-complete in general.',
  },
  {
    title: 'Word Search',
    description:
      'Given a 2D character grid and a word, determine if the word can be spelled by a path of adjacent cells (no reuse).',
    approach:
      'For each cell matching the first character, DFS in all 4 directions. Mark cells visited; unmark on backtrack.',
    complexity: 'O(M·N·4^L) where M×N is the grid size and L is the word length.',
  },
]

const pruningTechniques = [
  {
    title: 'Constraint checking',
    detail:
      'Before recursing into a branch, verify it does not violate any hard constraint. This is the most fundamental pruning: discard the branch before generating its subtree.',
  },
  {
    title: 'Forward checking',
    detail:
      'When a variable is assigned, propagate its effect to unassigned variables and remove inconsistent values from their domains. If any domain becomes empty, prune immediately.',
  },
  {
    title: 'Bound-based pruning (branch and bound)',
    detail:
      'For optimization problems, maintain a running best solution. If the best possible completion of the current partial solution cannot beat the best found so far, prune the branch.',
  },
  {
    title: 'Symmetry breaking',
    detail:
      'If the problem has symmetries, fix arbitrary choices to eliminate symmetric duplicates. For example, in N-Queens, only explore placements where the first queen is in columns 1..N/2 and double-count.',
  },
  {
    title: 'Variable ordering (MRV heuristic)',
    detail:
      'Choose the variable with the fewest remaining legal values next (Minimum Remaining Values). This "fail-first" principle forces failures early and prunes the most.',
  },
  {
    title: 'Value ordering (LCV heuristic)',
    detail:
      'Among values for a variable, try the one that eliminates the fewest options for neighboring variables first (Least Constraining Value). This maximizes the chance of finding a solution early.',
  },
]

const pitfalls = [
  {
    mistake: 'Missing the unchoose step',
    description:
      'If state mutation (marking a cell visited, adding to a set) is not reversed after recursion, later branches see a corrupted state and produce wrong results. Every choose must have a matching unchoose.',
  },
  {
    mistake: 'Pruning too late',
    description:
      'Checking constraints only at leaf nodes means the full tree is explored — no better than brute force. Move constraint checks as early as possible, before recursing.',
  },
  {
    mistake: 'No base case',
    description:
      'Without a correct base case, the recursion either runs forever or misses valid solutions. The base case should detect both a complete solution and an unsolvable dead end.',
  },
  {
    mistake: 'Modifying shared state without copying',
    description:
      'If partial solutions share mutable state (e.g., a board array), mutations from one branch bleed into others unless properly undone. Use undo or defensive copies.',
  },
  {
    mistake: 'Exponential output size',
    description:
      'Problems asking for all solutions have exponential output. Backtracking generates them correctly, but storing all results can exhaust memory. Use a callback or generator pattern to process each solution as it is found.',
  },
  {
    mistake: 'Confusing backtracking with BFS',
    description:
      'Backtracking uses DFS (call stack = path from root to current node). BFS explores level by level and cannot backtrack in the same way. Use backtracking for deep, constrained search; BFS for shortest path.',
  },
]

const codeExamples = [
  {
    title: 'N-Queens',
    code: `# Python — all solutions
def n_queens(n: int) -> list[list[int]]:
  results: list[list[int]] = []
  cols, diag1, diag2 = set(), set(), set()
  board: list[int] = []

  def backtrack(row: int) -> None:
    if row == n:
      results.append(board[:])
      return
    for col in range(n):
      if col in cols or (row - col) in diag1 or (row + col) in diag2:
        continue
      # choose
      cols.add(col); diag1.add(row - col); diag2.add(row + col)
      board.append(col)
      # explore
      backtrack(row + 1)
      # unchoose
      board.pop(); cols.remove(col)
      diag1.remove(row - col); diag2.remove(row + col)

  backtrack(0)
  return results`,
    explanation:
      'Three sets track attacked columns and diagonals, giving O(1) conflict checks. The undo block mirrors the choose block exactly.',
  },
  {
    title: 'Sudoku solver',
    code: `# Python — solve in-place
def solve_sudoku(board: list[list[str]]) -> bool:
  for r in range(9):
    for c in range(9):
      if board[r][c] != '.':
        continue
      for d in '123456789':
        if is_valid(board, r, c, d):
          board[r][c] = d          # choose
          if solve_sudoku(board):
            return True
          board[r][c] = '.'        # unchoose
      return False                 # no digit fits — backtrack
  return True                      # all cells filled

def is_valid(board, r, c, d):
  box_r, box_c = 3 * (r // 3), 3 * (c // 3)
  for i in range(9):
    if board[r][i] == d: return False
    if board[i][c] == d: return False
    if board[box_r + i//3][box_c + i%3] == d: return False
  return True`,
    explanation:
      'The board is mutated and restored in-place. Returning False from a cell triggers backtracking in the caller.',
  },
  {
    title: 'Subsets',
    code: `// TypeScript — all subsets of an array
function subsets(nums: number[]): number[][] {
  const result: number[][] = []
  const current: number[] = []

  function backtrack(start: number): void {
    result.push([...current])       // record current subset
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i])         // choose
      backtrack(i + 1)              // explore
      current.pop()                 // unchoose
    }
  }

  backtrack(0)
  return result
}`,
    explanation:
      'Every node in the recursion tree is a valid subset. The spread copy captures the current state before further choices modify it.',
  },
  {
    title: 'Permutations',
    code: `// TypeScript — all permutations
function permutations(nums: number[]): number[][] {
  const result: number[][] = []

  function backtrack(start: number): void {
    if (start === nums.length) {
      result.push([...nums])
      return
    }
    for (let i = start; i < nums.length; i++) {
      ;[nums[start], nums[i]] = [nums[i], nums[start]]  // choose
      backtrack(start + 1)                               // explore
      ;[nums[start], nums[i]] = [nums[i], nums[start]]  // unchoose
    }
  }

  backtrack(0)
  return result
}`,
    explanation:
      'In-place swap avoids extra memory. Swapping back restores the array for the next iteration — the unchoose step.',
  },
  {
    title: 'Word search',
    code: `// TypeScript — does word exist in grid?
function exist(board: string[][], word: string): boolean {
  const rows = board.length, cols = board[0].length

  function dfs(r: number, c: number, idx: number): boolean {
    if (idx === word.length) return true
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false
    if (board[r][c] !== word[idx]) return false

    const tmp = board[r][c]
    board[r][c] = '#'                        // choose (mark visited)
    const found =
      dfs(r+1,c,idx+1) || dfs(r-1,c,idx+1) ||
      dfs(r,c+1,idx+1) || dfs(r,c-1,idx+1)
    board[r][c] = tmp                        // unchoose
    return found
  }

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (dfs(r, c, 0)) return true
  return false
}`,
    explanation:
      'The cell is temporarily marked "#" to prevent revisiting in the current path. Restoring it on backtrack allows other starting paths to use it.',
  },
  {
    title: 'Combination sum',
    code: `# Python — all combinations summing to target (reuse allowed)
def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
  results: list[list[int]] = []
  candidates.sort()

  def backtrack(start: int, remaining: int, current: list[int]) -> None:
    if remaining == 0:
      results.append(current[:])
      return
    for i in range(start, len(candidates)):
      c = candidates[i]
      if c > remaining:        # pruning: sorted list, no point continuing
        break
      current.append(c)        # choose
      backtrack(i, remaining - c, current)  # explore (i, not i+1: reuse allowed)
      current.pop()            # unchoose

  backtrack(0, target, [])
  return results`,
    explanation:
      'Sorting enables the break-on-exceed pruning that avoids exploring candidates larger than the remaining target. Passing i instead of i+1 allows reuse of the same element.',
  },
]

const languageMapping = [
  {
    title: 'Python',
    detail:
      'Lists as mutable state with append/pop for O(1) undo. Sets for O(1) conflict checks. Recursion limit (~1000) can be hit on deep searches — use sys.setrecursionlimit or convert to iterative.',
  },
  {
    title: 'TypeScript / JavaScript',
    detail:
      'Arrays with push/pop for undo. Spread ([...arr]) for snapshot copies at solution nodes. Call stack depth ~10k in V8 — explicit stack needed for very deep searches.',
  },
  {
    title: 'C++',
    detail:
      'std::vector with push_back/pop_back for undo. std::unordered_set for O(1) conflict tracking. Template recursion for compile-time pruning in some competitive programming applications.',
  },
  {
    title: 'Rust',
    detail:
      'Vec<T> with push/pop. HashSet for conflict tracking. No default stack size increase — use stacker or iterative form for deep recursion.',
  },
  {
    title: 'Java',
    detail:
      'Deque<T> or ArrayList with add/remove(last) for undo. HashSet for O(1) checks. Stack depth is configurable per thread.',
  },
  {
    title: 'Go',
    detail:
      'Slices with append and reslicing for undo. Maps for conflict tracking. Go goroutines have growable stacks so deep recursion is less risky than in other languages.',
  },
]

const quickGlossary = [
  {
    term: 'Backtracking',
    definition:
      'DFS on a state space tree that prunes branches violating constraints before exploring them.',
  },
  {
    term: 'State space tree',
    definition:
      'A tree where each node is a partial solution, each edge is a choice, and leaves are complete candidates.',
  },
  {
    term: 'Pruning',
    definition:
      'Eliminating entire subtrees by detecting constraint violations early, before generating all leaves.',
  },
  {
    term: 'Choose / explore / unchoose',
    definition:
      'The three-step backtracking template: make a choice, recurse, then undo the choice.',
  },
  {
    term: 'Constraint satisfaction problem (CSP)',
    definition:
      'A problem defined by variables, domains, and constraints. Backtracking is the canonical solution method.',
  },
  {
    term: 'Forward checking',
    definition:
      "Propagating a variable assignment to prune inconsistent values from unassigned variables' domains immediately.",
  },
  {
    term: 'Branch and bound',
    definition:
      'Backtracking for optimization problems that prunes branches whose best possible completion cannot beat the current best solution.',
  },
  {
    term: 'MRV (Minimum Remaining Values)',
    definition:
      'A variable-ordering heuristic that selects the variable with the fewest remaining legal values — the "fail-first" principle.',
  },
  {
    term: 'LCV (Least Constraining Value)',
    definition:
      'A value-ordering heuristic that tries the value eliminating the fewest options for neighboring variables first.',
  },
  {
    term: 'Symmetry breaking',
    definition: 'Fixing arbitrary choices to avoid exploring symmetric duplicate solutions.',
  },
  {
    term: 'Feasibility problem',
    definition:
      'Find any valid solution (or determine none exists). Contrast with enumeration (find all) and optimization (find best).',
  },
  {
    term: 'NP-complete',
    definition:
      'A problem class for which no polynomial-time algorithm is known. Backtracking is the standard exact solver; heuristics handle large instances.',
  },
]

const compareContrast = [
  {
    title: 'Backtracking vs brute force',
    detail:
      'Brute force generates all candidates and checks each. Backtracking checks constraints during construction and abandons invalid branches before they are complete — often exponentially faster.',
  },
  {
    title: 'Backtracking vs dynamic programming',
    detail:
      'Backtracking re-explores sub-problems if not memoized. DP stores sub-problem results to avoid recomputation. When sub-problems overlap and can be expressed as recurrences, DP is preferable. Backtracking is preferred for constraint satisfaction with no clean state overlap.',
  },
  {
    title: 'Backtracking vs BFS',
    detail:
      'BFS finds shortest paths and explores level by level using a queue. Backtracking uses DFS and a call stack, going deep before wide. BFS cannot prune as aggressively and uses more memory for deep spaces.',
  },
  {
    title: 'Backtracking vs greedy',
    detail:
      'Greedy makes irrevocable choices and runs in polynomial time, but is only correct for specific problems. Backtracking considers all choices and is exact but potentially exponential.',
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
    { id: 'core-problems', label: 'Classic Problems' },
    { id: 'core-pruning', label: 'Pruning Techniques' },
    { id: 'core-languages', label: 'Language Mapping' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-takeaways', label: 'Key Takeaways' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function BacktrackingPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Backtracking',
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
      title="Backtracking"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Backtracking</h1>
      <p>
        Backtracking is structured brute force. It explores a search space by building partial
        solutions incrementally and abandoning any branch the moment a constraint is violated. The
        template is always the same: choose a candidate extension, recurse, then undo the choice.
        Pruning is what separates a practical algorithm from an intractable one.
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
              Many problems in combinatorics, logic, and constraint satisfaction have no known
              polynomial-time solution. For these, backtracking is often the only exact method
              available. Understanding its structure — the state space tree, the
              choose/explore/unchoose pattern, and the role of pruning — is the foundation for
              implementing correct and efficient solvers.
            </p>
            <p>
              Even when an approximate or heuristic solution is acceptable in production, being able
              to write an exact backtracking solution first is the standard way to validate
              correctness and understand the problem structure.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-mental-model" className="bin98-section">
            <h2 className="bin98-heading">Core Mental Model</h2>
            {mentalModel.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="core-problems" className="bin98-section">
            <h2 className="bin98-heading">Classic Problems</h2>
            {classicProblems.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>
                  <strong>Problem:</strong> {item.description}
                </p>
                <p>
                  <strong>Approach:</strong> {item.approach}
                </p>
                <p>
                  <strong>Complexity:</strong> {item.complexity}
                </p>
              </div>
            ))}
          </section>
          <section id="core-pruning" className="bin98-section">
            <h2 className="bin98-heading">Pruning Techniques</h2>
            {pruningTechniques.map((item) => (
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
              {pitfalls.map((item) => (
                <li key={item.mistake}>
                  <strong>{item.mistake}:</strong> {item.description}
                </li>
              ))}
            </ul>
          </section>
          <section id="core-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-code" className="bin98-section">
          <h2 className="bin98-heading">Code Examples</h2>
          <p>Select a problem to view an annotated implementation.</p>
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
