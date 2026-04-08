import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const overviewSections = [
  {
    title: 'What algorithmic paradigms are',
    body: 'Algorithmic paradigms are broad strategies for solving classes of problems. They are not single algorithms. They are reusable ways of framing a problem so the next design step becomes obvious: enumerate everything, split the task, make a local commitment, cache overlap, prune a search tree, inject randomness, or exploit a better representation.',
  },
  {
    title: 'Why they exist',
    body: 'Large problems are hard for different reasons. Some blow up because there are too many candidates. Some repeat the same work. Some hide exploitable order. Some need exact search with aggressive pruning. Paradigms exist because different structural bottlenecks require different attacks.',
  },
  {
    title: 'What they save you from',
    body: 'Without paradigms, problem solving turns into ad hoc trial and error. A good paradigm narrows the design space, suggests the right proof technique, predicts the likely time and space costs, and tells you what can go wrong before you have written the first loop.',
  },
  {
    title: 'How experts use them',
    body: 'Strong problem solvers move between paradigms deliberately. They often start with brute force, observe the source of waste, then upgrade the model: independent halves suggest divide and conquer, repeated states suggest dynamic programming, local safety suggests greedy, and early contradiction suggests backtracking or branch and bound.',
  },
]

const whyParadigmsMatter = [
  'They convert an unstructured problem statement into a small number of disciplined design options.',
  'They determine the proof you owe: recurrence, exchange argument, invariant, bounding argument, or probabilistic guarantee.',
  'They influence implementation details such as recursion shape, data structures, and state representation.',
  'They reduce the risk of building a fast but incorrect solution based on intuition alone.',
  'They help you recognize when two different-looking problems are solved by the same core idea.',
]

const historicalContext = [
  {
    title: 'Exhaustive search comes first',
    detail:
      'The oldest paradigm is brute force: enumerate possibilities and test them. Before cleverness, there is completeness. This remains the universal fallback and the simplest way to reason about correctness.',
  },
  {
    title: 'Recursion and decomposition formalize structure',
    detail:
      'As computing matured, divide and conquer became the language for solving large tasks by reducing them to smaller copies of themselves. Merge sort, quicksort, and binary search made decomposition a central algorithmic tool.',
  },
  {
    title: 'Optimization pushed proof techniques forward',
    detail:
      'Greedy algorithms and dynamic programming emerged as competing answers to optimization problems. Greedy relied on structural proofs such as exchange and cut arguments, while dynamic programming relied on optimal substructure plus explicit state design.',
  },
  {
    title: 'Modern practice mixes paradigms freely',
    detail:
      'Current systems rarely use paradigms in isolation. Production solvers mix heuristics with branch and bound, use randomized pivots inside divide and conquer, apply memoization inside search, and combine greedy preprocessing with dynamic programming or data structures.',
  },
]

const paradigmSurvey = [
  {
    name: 'Brute Force',
    summary:
      'Enumerate every candidate, every ordering, every subset, or every legal move sequence, then test each one. It is the baseline paradigm and the simplest correctness reference.',
    bestWhen:
      'Input sizes are small, constraints are tight, or you need a ground-truth checker for more advanced implementations.',
    watchFor:
      'The search space often grows as 2^n, n!, or worse. Correctness is easy; scalability is not.',
  },
  {
    name: 'Divide and Conquer',
    summary:
      'Break the problem into smaller independent subproblems of the same type, solve them recursively, then combine their results.',
    bestWhen:
      'The split is natural, subproblems do not overlap heavily, and the combine step stays controlled.',
    watchFor:
      'If subproblems overlap a lot, plain recursion recomputes too much work and dynamic programming may be the better model.',
  },
  {
    name: 'Greedy Algorithms',
    summary:
      'Build the answer one locally optimal decision at a time and never revise earlier decisions.',
    bestWhen:
      'A local choice can be proved safe by an exchange argument, cut property, matroid structure, or stay-ahead invariant.',
    watchFor:
      'Greedy is fragile without proof. The wrong local rule can look plausible and still fail catastrophically.',
  },
  {
    name: 'Dynamic Programming',
    summary:
      'Store answers to overlapping subproblems so exponential recursion collapses into polynomial work over states.',
    bestWhen:
      'The problem has optimal substructure, repeated states, and a state definition that captures exactly what the future depends on.',
    watchFor:
      'DP can become unusable if the state is bloated, the recurrence is cyclic, or the memory footprint explodes.',
  },
  {
    name: 'Backtracking',
    summary:
      'Construct solutions incrementally and abandon a partial solution as soon as it violates constraints.',
    bestWhen:
      'You need exact search and can reject invalid partial states much earlier than full brute force would.',
    watchFor:
      'If feasibility checks are weak, the recursion tree remains almost as large as brute force.',
  },
  {
    name: 'Randomized Algorithms',
    summary:
      'Use random choices to improve expected performance, avoid adversarial inputs, or obtain high-probability guarantees.',
    bestWhen:
      'A deterministic algorithm is too slow or too complicated, and probability can be incorporated safely into the specification.',
    watchFor:
      'You must analyze expected behavior, failure probability, seed quality, and adversarial robustness.',
  },
  {
    name: 'Branch and Bound',
    summary:
      'Search an optimization tree exactly, but prune entire subtrees using mathematically valid bounds and the best known feasible answer.',
    bestWhen:
      'The problem is combinatorial and exact optimality matters, but a good relaxation or upper/lower bound can cut most of the tree.',
    watchFor:
      'Weak bounds destroy performance. The paradigm is only as strong as the pruning logic.',
  },
  {
    name: 'Meet-in-the-Middle',
    summary:
      'Split an exponential search into two smaller searches and reconcile the halves using sorting, hashing, or binary search.',
    bestWhen:
      'The objective decomposes cleanly across two halves and storing partial results is affordable.',
    watchFor: 'The usual cost is memory. You trade space for a major time reduction.',
  },
  {
    name: 'Two Pointers and Sliding Window',
    summary:
      'Maintain moving boundaries over ordered or contiguous data instead of restarting a search from each position.',
    bestWhen:
      'Monotonicity, sorted order, or reversible window updates let you move the boundaries without losing correctness.',
    watchFor:
      'The technique fails when the window condition cannot be updated incrementally or when negative feedback breaks monotonicity.',
  },
  {
    name: 'Greedy Proof Techniques',
    summary:
      'This is not a separate implementation paradigm so much as the proof machinery that explains why a greedy rule works.',
    bestWhen:
      'You already suspect a local choice is safe and need a rigorous way to show any optimal solution can be repaired to match it.',
    watchFor:
      'A proof that only sounds intuitive is not enough. The exchange must preserve feasibility and objective value exactly.',
  },
]

const decisionWorkflow = [
  {
    title: '1. Write the brute-force version mentally first',
    detail:
      'Ask what the complete search space looks like. Are you choosing subsets, permutations, intervals, paths, partitions, or states? Even if you never code the brute-force version, being able to describe it gives you the raw problem geometry.',
  },
  {
    title: '2. Locate the source of wasted work',
    detail:
      'If the waste is repeated subproblems, think dynamic programming. If the waste is exploring impossible candidates, think backtracking or branch and bound. If the waste is rescanning ranges, think two pointers or sliding window.',
  },
  {
    title: '3. Decide whether the problem is exact or approximate',
    detail:
      'If exact optimality is mandatory, some heuristics are off the table. If approximate or expected guarantees are acceptable, greedy or randomized strategies may be much more attractive.',
  },
  {
    title: '4. Choose the proof style early',
    detail:
      'Do not pick a paradigm just because the implementation looks short. Ask what proof would justify it: an invariant, an exchange argument, a recurrence, a relaxation bound, or a probability calculation. If you cannot imagine the proof, you probably do not yet have the right paradigm.',
  },
  {
    title: '5. Match the paradigm to the constraints',
    detail:
      'Constraints often force the answer. n around 20 may permit subset enumeration. n around 10^5 usually rules out anything quadratic. Large state dimensions may kill dynamic programming even if the recurrence is correct.',
  },
]

const hybridPatterns = [
  {
    title: 'Brute force plus pruning',
    detail:
      'Backtracking begins with brute force, then adds early rejection. Branch and bound goes further by adding quantitative bounds that certify entire subtrees are hopeless.',
  },
  {
    title: 'Divide and conquer plus randomness',
    detail:
      'Randomized quicksort is still divide and conquer, but a random pivot avoids consistently bad partitions on adversarial or unlucky inputs.',
  },
  {
    title: 'Search plus memoization',
    detail:
      'Many recursive searches become dynamic programming once you recognize that different branches reach the same state and can share results.',
  },
  {
    title: 'Greedy preprocessing plus dynamic programming',
    detail:
      'Sorting, coordinate compression, dominance filtering, or interval ordering often simplify the state space before a DP runs.',
  },
  {
    title: 'Meet-in-the-middle plus data structures',
    detail:
      'The paradigm often depends on sorting, hashing, binary search, or Pareto frontier compression to make the final combination efficient.',
  },
]

const keyTakeaways = [
  'Algorithmic paradigms are reusable problem-solving mindsets, not isolated tricks.',
  'Brute force is often the best place to start because it clarifies the complete search space and gives you a correctness baseline.',
  'The right paradigm is usually discovered by identifying the bottleneck: overlap, independence, monotonicity, symmetry, or prunable infeasibility.',
  'Proof obligations matter as much as implementation shape. A short algorithm without a defensible proof is not a finished design.',
  'Modern high-quality solutions often combine paradigms rather than choosing exactly one.',
]

const structuralSignals = [
  {
    title: 'Overlapping subproblems',
    body: 'If many recursive branches recompute the same substate, memoization or tabulation is the natural upgrade. This is the strongest signal for dynamic programming.',
  },
  {
    title: 'Independent subproblems',
    body: 'If the problem splits into smaller parts that barely interact until the combine step, divide and conquer is often the cleanest model.',
  },
  {
    title: 'Local decisions that never need revision',
    body: 'If a choice feels irreversible and still safe, greedy may fit. The next step is to prove why the choice can always belong to some optimal solution.',
  },
  {
    title: 'Early contradiction in partial solutions',
    body: 'If you can detect invalidity before finishing a candidate, backtracking becomes attractive because large regions of the search tree can be cut off immediately.',
  },
  {
    title: 'Strong optimistic bounds',
    body: 'If a partial solution can be given a reliable best-case estimate, branch and bound may turn an exponential search from hopeless to practical.',
  },
  {
    title: 'Ordered data and monotone movement',
    body: 'Sorted inputs, prefix structure, or window conditions that can be updated incrementally often point to two-pointer or sliding-window techniques.',
  },
  {
    title: 'A decomposable objective over two halves',
    body: 'If a full candidate can be reconstructed from a left part and a right part, meet-in-the-middle can reduce the exponent dramatically.',
  },
  {
    title: 'Adversarial worst cases or expensive deterministic balancing',
    body: 'Randomization is appealing when you want strong expected performance, simpler code, or protection against worst-case structured inputs.',
  },
]

const proofObligations = [
  {
    title: 'Brute force needs completeness',
    body: 'You must show that every legal candidate is generated exactly once or at least once, and that the check used to validate candidates matches the real problem definition.',
  },
  {
    title: 'Divide and conquer needs a recurrence and a correct combine step',
    body: 'The proof has two parts: recursive correctness of the subproblems and correctness of the merge or partition logic that rebuilds the full answer.',
  },
  {
    title: 'Greedy needs a structural argument',
    body: 'This usually means an exchange argument, cut property, stay-ahead proof, or matroid-style reasoning. You are proving the safety of a local commitment.',
  },
  {
    title: 'Dynamic programming needs state soundness',
    body: 'The proof must explain why the chosen state contains all information relevant to future decisions, why the recurrence explores all legal transitions, and why the evaluation order respects dependencies.',
  },
  {
    title: 'Search paradigms need pruning soundness',
    body: 'Backtracking must show that pruned partial states cannot be extended to valid solutions. Branch and bound must show that the bound really is optimistic enough to justify pruning without losing the optimum.',
  },
  {
    title: 'Randomized algorithms need a probability contract',
    body: 'You must specify whether the guarantee is expected runtime, error probability, success probability, or some combination. Randomness cannot remain an informal implementation detail.',
  },
]

const stateAndRepresentation = [
  {
    title: 'State is often the real algorithm',
    body: 'In dynamic programming and search, the state definition determines complexity more than the loop structure does. A well-chosen state is small, complete, and easy to transition from. A bad state either omits facts needed for correctness or includes irrelevant history that explodes the state space.',
  },
  {
    title: 'Representation can remove entire dimensions of work',
    body: 'Sliding windows replace repeated scans with maintained boundaries. Meet-in-the-middle replaces one huge search with two smaller enumerations. Coordinate compression turns large numeric ranges into compact indices. These are not cosmetic changes; they are complexity changes.',
  },
  {
    title: 'Order often creates the invariant',
    body: 'Sorting is frequently the hidden precondition for a successful paradigm. It can make greedy choices comparable, let windows move monotonically, let intervals be processed in logical order, or simplify the recurrence in dynamic programming.',
  },
  {
    title: 'The combine step deserves separate design attention',
    body: 'In divide and conquer and meet-in-the-middle, many failures come from treating combination as an afterthought. The speedup exists only because the merge, lookup, or reconciliation step is efficient enough to justify splitting the problem in the first place.',
  },
]

const searchAndPruning = [
  {
    title: 'Backtracking prunes by infeasibility',
    body: 'A partial candidate is discarded because it already violates a rule. This is common in graph coloring, N-Queens, Sudoku, subset construction with hard constraints, and combinatorial generation.',
  },
  {
    title: 'Branch and bound prunes by dominance or bounds',
    body: 'A node may still be feasible, but even its best possible completion cannot beat the current incumbent. This requires a valid upper or lower bound, depending on whether you are maximizing or minimizing.',
  },
  {
    title: 'Good pruning changes practice more than theory',
    body: 'The worst-case complexity may remain exponential, yet runtime can collapse on real instances if the pruning rules are tight and the incumbent is found early.',
  },
  {
    title: 'Symmetry handling matters',
    body: 'Many search problems waste time exploring equivalent states. Ordering choices canonically, fixing the first element, or collapsing symmetric cases can cut huge portions of the tree without affecting correctness.',
  },
]

const complexityTradeoffs = [
  {
    title: 'Time versus memory',
    body: 'Dynamic programming and meet-in-the-middle often trade space for speed. This is acceptable only when memory growth remains within the real system budget, not just the asymptotic fantasy budget.',
  },
  {
    title: 'Expected versus worst-case performance',
    body: 'Randomized quicksort is attractive because its expected behavior is excellent, even though the worst case still exists. Whether that trade is acceptable depends on the application and the adversary model.',
  },
  {
    title: 'Exactness versus practicality',
    body: 'Branch and bound can prove optimality where greedy cannot, but the additional proof of optimality costs search, memory, and implementation complexity.',
  },
  {
    title: 'Proof burden versus runtime gain',
    body: 'Greedy algorithms can be very fast, but proving them may be harder than writing a slower dynamic programming solution. In some contexts, the simpler proof is worth the extra runtime.',
  },
  {
    title: 'Asymptotics versus constants',
    body: 'A theoretically better paradigm may lose in practice for small inputs or tight cache behavior. Hybrid algorithms often switch strategy at thresholds because constants and memory locality matter.',
  },
]

const compareAndContrast = [
  {
    title: 'Greedy versus dynamic programming',
    body: 'Both often target optimization problems. Greedy commits early and hopes a structural theorem makes that safe. Dynamic programming delays commitment by evaluating many states explicitly. Greedy is smaller and faster when correct; DP is more general when overlap exists.',
  },
  {
    title: 'Backtracking versus branch and bound',
    body: 'Both search trees recursively. Backtracking prunes because partial assignments are already invalid. Branch and bound prunes because partial assignments are mathematically incapable of beating the incumbent.',
  },
  {
    title: 'Divide and conquer versus dynamic programming',
    body: 'The key difference is overlap. Divide and conquer assumes subproblems are mostly independent. Dynamic programming exists precisely because subproblems repeat.',
  },
  {
    title: 'Meet-in-the-middle versus brute force',
    body: 'Meet-in-the-middle is still exhaustive in spirit, but it changes the geometry of the exhaustive search. The win comes from splitting the exponent and paying memory to combine the halves efficiently.',
  },
  {
    title: 'Two pointers versus nested loops',
    body: 'The two-pointer family works when pointer movement is monotone. Instead of restarting scans for each index, you preserve progress and convert quadratic scans into linear or near-linear passes.',
  },
]

const pitfalls = [
  {
    title: 'Treating a clever idea as a proof',
    body: 'An intuition such as "taking the biggest item first seems best" is not a proof. This is the most common greedy failure mode.',
  },
  {
    title: 'Skipping the brute-force model',
    body: 'If you cannot describe the naive search space, it is hard to identify overlap, pruning opportunities, or hidden constraints correctly.',
  },
  {
    title: 'Designing states that remember too much history',
    body: 'Dynamic programming becomes infeasible when the state encodes details that do not actually affect future transitions.',
  },
  {
    title: 'Ignoring memory ceilings',
    body: 'A DP table or meet-in-the-middle partial list that fits asymptotically may still exceed the real memory limit by a large factor.',
  },
  {
    title: 'Underestimating the combine step',
    body: 'A divide-and-conquer idea is not automatically good. If the combine step is too expensive, the split buys very little.',
  },
  {
    title: 'Using pruning that is plausible but unsound',
    body: 'In search algorithms, an invalid prune silently removes the optimal or only valid solution. Pruning rules must be justified with the same rigor as the main algorithm.',
  },
  {
    title: 'Forgetting adversarial inputs',
    body: 'Randomized and average-case methods can degrade badly if randomness is weak or input structure is hostile.',
  },
  {
    title: 'Applying sliding window where monotonicity does not hold',
    body: 'If expanding or shrinking the window does not move the condition predictably, the standard linear-time pattern stops being correct.',
  },
]

const implementationChecklist = [
  'State the objective precisely: optimize what, subject to which constraints, with what tie-breaking if needed.',
  'Write down the brute-force search space before optimizing anything.',
  'Identify whether subproblems are independent, overlapping, or neither.',
  'Decide the proof style before trusting the paradigm.',
  'Estimate time and space using the actual input limits, not generic asymptotic instincts.',
  'List the failure mode most likely to break the chosen strategy and test directly for it.',
  'When the paradigm depends on order, make the ordering explicit and justify it.',
  'When using recursion or search, define the base case, transition, and pruning rules separately.',
]

const workedExamples = [
  {
    id: 'ex-brute-force',
    title: 'Brute Force Example: Enumerating Subsets',
    paradigm: 'Brute Force',
    intro:
      'Suppose you need to determine whether any subset of a small array sums to a target. The baseline model is to generate every subset and check its sum. This is rarely the final answer, but it is the cleanest statement of the original search space.',
    whyFit:
      'The paradigm fits because the goal is completeness, not sophistication. When n is small, exhaustive enumeration is acceptable and gives a reference implementation for testing smarter methods later.',
    code: `found = false

for mask in 0 .. (1 << n) - 1:
  sum = 0
  for i in 0 .. n - 1:
    if mask has bit i:
      sum += values[i]
  if sum == target:
    found = true
    break`,
    complexity:
      'Time is O(n * 2^n) because there are 2^n subsets and each subset sum may inspect up to n positions. Space is O(1) beyond the input if subsets are not stored explicitly.',
    takeaway:
      'Brute force makes the problem geometry explicit. Every later improvement can be understood as avoiding some part of this full enumeration.',
  },
  {
    id: 'ex-divide-conquer',
    title: 'Divide and Conquer Example: Merge Sort',
    paradigm: 'Divide and Conquer',
    intro:
      'Sorting looks global, but merge sort shows it can be decomposed. Split the array in half, sort each half recursively, and merge the two sorted halves. The subproblems are independent and the combine step is precise.',
    whyFit:
      'The paradigm fits because sorting each half does not depend on the other half, and the merge operation reconstructs the full answer in linear time.',
    code: `mergeSort(arr):
  if length(arr) <= 1:
    return arr

  mid = length(arr) // 2
  left = mergeSort(arr[0:mid])
  right = mergeSort(arr[mid:])
  return merge(left, right)`,
    complexity:
      'Time is O(n log n): each level of recursion processes all n elements during merging, and there are O(log n) levels. Space is O(n) for the merge buffer in the standard implementation.',
    takeaway:
      'Divide and conquer succeeds when splitting creates smaller instances of the same problem and the recombination step remains efficient.',
  },
  {
    id: 'ex-greedy',
    title: 'Greedy Example: Interval Scheduling',
    paradigm: 'Greedy',
    intro:
      'To choose the maximum number of non-overlapping intervals, sorting by earliest finish time gives the canonical greedy rule. Once an interval is taken, it leaves as much room as possible for what comes next.',
    whyFit:
      'The paradigm fits because the local rule can be justified with an exchange argument: any optimal solution can be repaired so that its first chosen interval is the earliest-finishing compatible one.',
    code: `sort intervals by end time
chosen = []
lastEnd = -infinity

for interval in intervals:
  if interval.start >= lastEnd:
    chosen.push(interval)
    lastEnd = interval.end`,
    complexity:
      'Sorting dominates the runtime, so time is O(n log n). The scan after sorting is linear, and extra space is O(1) besides the output if sorting is in place.',
    takeaway: 'Greedy is about committing early only when a theorem says the commitment is safe.',
  },
  {
    id: 'ex-dp',
    title: 'Dynamic Programming Example: Minimum Coin Change',
    paradigm: 'Dynamic Programming',
    intro:
      'For coin systems such as {1, 3, 4}, a greedy strategy can fail. Amount 6 is the classic counterexample: greedy takes 4 + 1 + 1, but the optimum is 3 + 3. The correct model is to ask for the best answer to every smaller amount and reuse those answers.',
    whyFit:
      'The paradigm fits because the subproblem "best answer for amount x" appears repeatedly inside larger amounts. Overlap, not local optimality, is the important structural signal.',
    code: `dp[0] = 0

for amount in 1 .. target:
  dp[amount] = infinity
  for coin in coins:
    if coin <= amount:
      dp[amount] = min(dp[amount], dp[amount - coin] + 1)`,
    complexity:
      'Time is O(target * numberOfCoins). Space is O(target). The design challenge is not the loop; it is recognizing the right state and recurrence.',
    takeaway:
      'Dynamic programming wins when the future depends only on a compact state and the same states recur across many choices.',
  },
  {
    id: 'ex-backtracking',
    title: 'Backtracking Example: N-Queens',
    paradigm: 'Backtracking',
    intro:
      'Placing queens row by row is a combinatorial search problem. A brute-force approach would generate every board and check it at the end. Backtracking is better because the moment two queens attack each other, the partial board is already hopeless.',
    whyFit:
      'The paradigm fits because partial solutions reveal invalidity early. Constraints on columns and diagonals are strong enough to prune huge parts of the search tree before full boards are formed.',
    code: `place(row):
  if row == n:
    record solution
    return

  for col in 0 .. n - 1:
    if column and diagonals are free:
      mark(row, col)
      place(row + 1)
      unmark(row, col)`,
    complexity:
      'Worst-case complexity is still exponential, but practical performance is dramatically better than naive board enumeration because invalid branches terminate early.',
    takeaway: 'Backtracking is brute force with disciplined early rejection.',
  },
  {
    id: 'ex-randomized',
    title: 'Randomized Example: Randomized Quicksort',
    paradigm: 'Randomized Divide and Conquer',
    intro:
      'Plain quicksort can hit worst-case partitions repeatedly if the pivot choice is deterministic and the input is unlucky. Choosing the pivot randomly preserves the same recursive structure while making consistently bad partitions unlikely.',
    whyFit:
      'The paradigm fits because randomization is not solving the sorting problem directly; it is protecting the divide step from adversarial orderings.',
    code: `quickSort(arr, lo, hi):
  if lo >= hi:
    return

  pivotIndex = random integer in [lo, hi]
  swap arr[pivotIndex] with arr[hi]
  p = partition(arr, lo, hi)
  quickSort(arr, lo, p - 1)
  quickSort(arr, p + 1, hi)`,
    complexity:
      'Expected time is O(n log n), while the worst case remains O(n^2). Extra space is O(log n) expected recursion depth in the common in-place version.',
    takeaway:
      'Randomization is often used to stabilize a paradigm you already want, not to replace it entirely.',
  },
  {
    id: 'ex-branch-bound',
    title: 'Branch and Bound Example: 0/1 Knapsack Search',
    paradigm: 'Branch and Bound',
    intro:
      'Suppose you want the exact best subset of items under a capacity constraint. Plain exhaustive search branches on include or exclude for each item. Branch and bound uses an upper bound, often from the fractional knapsack relaxation, to cut any subtree whose best possible future value is already too small.',
    whyFit:
      'The paradigm fits because the problem is exact optimization and a useful optimistic bound is available. That bound provides safe pruning rather than heuristic guessing.',
    code: `search(node):
  if node.weight > capacity:
    return

  if node.bound <= bestValue:
    return

  if node.level == n:
    bestValue = max(bestValue, node.value)
    return

  search(include next item)
  search(exclude next item)`,
    complexity:
      'Worst-case complexity remains exponential, but strong bounds and early incumbents often eliminate most of the tree in practice.',
    takeaway: 'Branch and bound is exact search powered by mathematical optimism.',
  },
  {
    id: 'ex-mitm',
    title: 'Meet-in-the-Middle Example: Subset Sum',
    paradigm: 'Meet-in-the-Middle',
    intro:
      'If n is around 40, subset sum is often too large for plain 2^n enumeration but still small enough for 2^(n/2) work per side. Split the array in half, enumerate all subset sums on each side, then match the halves.',
    whyFit:
      'The paradigm fits because the objective decomposes cleanly: a full subset sum is the sum of a left subset and a right subset. The combine step can then use sorting or hashing.',
    code: `leftSums = all subset sums of left half
rightSums = all subset sums of right half
sort rightSums

for sumLeft in leftSums:
  need = target - sumLeft
  if need exists in rightSums:
    return true

return false`,
    complexity:
      'Time is roughly O(2^(n/2) * n + 2^(n/2) log 2^(n/2)) depending on enumeration and lookup details. Space is O(2^(n/2)) for the stored partial sums.',
    takeaway:
      'Meet-in-the-middle does not remove exponential behavior; it changes the exponent enough to make moderate instances feasible.',
  },
  {
    id: 'ex-two-pointers',
    title: 'Sliding Window Example: Longest Valid Subarray',
    paradigm: 'Two Pointers and Sliding Window',
    intro:
      'Suppose the task is to find the longest contiguous segment satisfying a condition that can be updated when elements enter or leave the window. Rather than restarting from each left endpoint, maintain a moving window and repair it as it grows.',
    whyFit:
      'The paradigm fits because the window boundaries move monotonically. Each element enters the window once and leaves it once, so repeated work is avoided.',
    code: `left = 0
best = 0

for right in 0 .. n - 1:
  add values[right] to window state
  while window is invalid:
    remove values[left] from window state
    left += 1
  best = max(best, right - left + 1)`,
    complexity:
      'Time is usually O(n) when both pointers only move forward and state updates are constant time. Space depends on the maintained window statistics.',
    takeaway: 'The core trick is preserving progress instead of redoing scans from scratch.',
  },
]

const glossary = [
  {
    term: 'Algorithmic paradigm',
    definition:
      'A broad problem-solving strategy such as divide and conquer, dynamic programming, greedy, or backtracking.',
  },
  {
    term: 'Search space',
    definition:
      'The set of all candidate solutions or partial solutions that an algorithm may need to consider.',
  },
  {
    term: 'Optimal substructure',
    definition:
      'A property where an optimal solution is built from optimal solutions to smaller subproblems.',
  },
  {
    term: 'Overlapping subproblems',
    definition:
      'A situation where the same substate is encountered repeatedly, making memoization or tabulation worthwhile.',
  },
  {
    term: 'State',
    definition: 'The minimal information that fully describes a subproblem for future decisions.',
  },
  {
    term: 'Recurrence',
    definition:
      'An equation that defines a solution in terms of smaller solutions of the same kind.',
  },
  {
    term: 'Base case',
    definition: 'The smallest instance that can be solved directly and terminates recursion.',
  },
  {
    term: 'Invariant',
    definition:
      'A statement that remains true throughout execution and is often the core of a correctness proof.',
  },
  {
    term: 'Exchange argument',
    definition:
      'A greedy proof technique showing that an optimal solution can be transformed to include the greedy choice without becoming worse.',
  },
  {
    term: 'Pruning',
    definition:
      'Discarding part of the search space early because it is invalid or provably cannot improve the answer.',
  },
  {
    term: 'Incumbent',
    definition: 'In branch and bound, the best feasible complete solution found so far.',
  },
  {
    term: 'Bound',
    definition:
      'A best-case or worst-case estimate used to determine whether a partial solution can still matter.',
  },
  {
    term: 'Relaxation',
    definition:
      'A simplified version of a problem, often with weaker constraints, used to obtain bounds or approximations.',
  },
  {
    term: 'Monotonicity',
    definition:
      'A property that lets progress move in one direction without needing to backtrack, often essential for two-pointer techniques.',
  },
  {
    term: 'Pareto frontier',
    definition:
      'A set of non-dominated partial solutions where no entry is worse in every relevant dimension.',
  },
  {
    term: 'Expected time',
    definition:
      "Average runtime taken over the algorithm's random choices or an input distribution assumed by the analysis.",
  },
  {
    term: 'Worst-case complexity',
    definition: 'The maximum resource usage over all inputs of a given size.',
  },
  {
    term: 'Tabulation',
    definition: 'A bottom-up dynamic programming method that fills states in dependency order.',
  },
  {
    term: 'Memoization',
    definition: 'A top-down dynamic programming method that caches results of recursive calls.',
  },
  {
    term: 'Combine step',
    definition:
      'The operation that merges subproblem results back into a full answer, especially important in divide and conquer and meet-in-the-middle.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'ap-overview', label: 'Overview' },
    { id: 'ap-why', label: 'Why Paradigms Matter' },
    { id: 'ap-history', label: 'Historical Context' },
    { id: 'ap-survey', label: 'Paradigm Survey' },
    { id: 'ap-workflow', label: 'Decision Workflow' },
    { id: 'ap-hybrid', label: 'Combined Strategies' },
    { id: 'ap-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'ap-signals', label: 'Structural Signals' },
    { id: 'ap-proofs', label: 'Proof Obligations' },
    { id: 'ap-state', label: 'State and Representation' },
    { id: 'ap-pruning', label: 'Search and Pruning' },
    { id: 'ap-tradeoffs', label: 'Complexity Tradeoffs' },
    { id: 'ap-compare', label: 'Compare and Contrast' },
    { id: 'ap-pitfalls', label: 'Common Pitfalls' },
    { id: 'ap-checklist', label: 'Implementation Checklist' },
  ],
  examples: workedExamples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'ap-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

const algorithmicParadigmsStyles = `
.ap98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.ap98-window {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.ap98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 28px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.ap98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.ap98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.ap98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.ap98-control:focus-visible,
.ap98-tab:focus-visible,
.ap98-toc-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.ap98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.ap98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b7b7b7;
  padding: 5px 10px 4px;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
}

.ap98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.ap98-main {
  display: grid;
  grid-template-columns: 228px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.ap98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.ap98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.ap98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ap98-toc-item + .ap98-toc-item {
  margin-top: 8px;
}

.ap98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.ap98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.ap98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.ap98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.ap98-section {
  margin: 0 0 22px;
}

.ap98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.ap98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.ap98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.ap98-content p,
.ap98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.ap98-content p {
  margin: 0 0 10px;
}

.ap98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.ap98-content li + li {
  margin-top: 4px;
}

.ap98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.ap98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .ap98-main {
    grid-template-columns: 1fr;
  }

  .ap98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .ap98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ap98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function AlgorithmicParadigmsPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestedTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(requestedTab) ? requestedTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(location.search)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Algorithmic Paradigms (${activeTabLabel})`
  }, [activeTab, activeTabLabel, location.search, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) {
      return
    }

    const nextParams = new URLSearchParams(location.search)
    nextParams.set('tab', tab)
    setSearchParams(nextParams)
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Algorithmic Paradigms',
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
    <div className="ap98-help-page">
      <style>{algorithmicParadigmsStyles}</style>
      <div className="ap98-window" role="presentation">
        <header className="ap98-titlebar">
          <span className="ap98-title">Algorithmic Paradigms</span>
          <div className="ap98-title-controls">
            <button
              className="ap98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="ap98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="ap98-tabs" role="tablist" aria-label="Algorithmic Paradigms Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`ap98-tab ${activeTab === tab.id ? 'ap98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ap98-main">
          <aside className="ap98-toc" aria-label="Table of contents">
            <h2 className="ap98-toc-title">Contents</h2>
            <ul className="ap98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="ap98-toc-item">
                  <a href={`#${section.id}`} className="ap98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="ap98-content">
            <h1 className="ap98-doc-title">Algorithmic Paradigms</h1>
            <p className="ap98-intro">
              This page is a map of the entire Algorithmic Paradigms section. It is meant to help
              you recognize problem structure, choose the right design strategy, and understand the
              proof obligations that come with each choice. The goal is not just to name paradigms,
              but to explain when they fit, why they work, what they cost, and how they relate to
              one another.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="ap-overview" className="ap98-section">
                  <h2 className="ap98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="ap98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="ap98-divider" />

                <section id="ap-why" className="ap98-section">
                  <h2 className="ap98-heading">Why Paradigms Matter</h2>
                  <p>
                    The main value of a paradigm is compression of thinking. Instead of inventing a
                    solution from nothing, you match the structure of the problem to a known family
                    of designs. That instantly gives you candidate data structures, proof
                    strategies, and realistic complexity expectations.
                  </p>
                  <ul>
                    {whyParadigmsMatter.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="ap98-divider" />

                <section id="ap-history" className="ap98-section">
                  <h2 className="ap98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="ap98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="ap98-divider" />

                <section id="ap-survey" className="ap98-section">
                  <h2 className="ap98-heading">Paradigm Survey</h2>
                  {paradigmSurvey.map((item) => (
                    <div key={item.name}>
                      <h3 className="ap98-subheading">{item.name}</h3>
                      <p>{item.summary}</p>
                      <p>
                        <strong>Best fit:</strong> {item.bestWhen}
                      </p>
                      <p>
                        <strong>Watch for:</strong> {item.watchFor}
                      </p>
                    </div>
                  ))}
                </section>

                <hr className="ap98-divider" />

                <section id="ap-workflow" className="ap98-section">
                  <h2 className="ap98-heading">Decision Workflow</h2>
                  {decisionWorkflow.map((item) => (
                    <div key={item.title}>
                      <h3 className="ap98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="ap98-divider" />

                <section id="ap-hybrid" className="ap98-section">
                  <h2 className="ap98-heading">Combined Strategies</h2>
                  <p>
                    Real algorithms often combine paradigms because problems rarely respect neat
                    textbook boundaries. What matters is not purity, but whether each combined piece
                    solves a distinct structural bottleneck cleanly.
                  </p>
                  {hybridPatterns.map((item) => (
                    <div key={item.title}>
                      <h3 className="ap98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="ap98-divider" />

                <section id="ap-takeaways" className="ap98-section">
                  <h2 className="ap98-heading">Key Takeaways</h2>
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
                <section id="ap-signals" className="ap98-section">
                  <h2 className="ap98-heading">Structural Signals</h2>
                  {structuralSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="ap98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ap-proofs" className="ap98-section">
                  <h2 className="ap98-heading">Proof Obligations</h2>
                  {proofObligations.map((item) => (
                    <div key={item.title}>
                      <h3 className="ap98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ap-state" className="ap98-section">
                  <h2 className="ap98-heading">State and Representation</h2>
                  {stateAndRepresentation.map((item) => (
                    <div key={item.title}>
                      <h3 className="ap98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ap-pruning" className="ap98-section">
                  <h2 className="ap98-heading">Search and Pruning</h2>
                  {searchAndPruning.map((item) => (
                    <div key={item.title}>
                      <h3 className="ap98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ap-tradeoffs" className="ap98-section">
                  <h2 className="ap98-heading">Complexity Tradeoffs</h2>
                  {complexityTradeoffs.map((item) => (
                    <div key={item.title}>
                      <h3 className="ap98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ap-compare" className="ap98-section">
                  <h2 className="ap98-heading">Compare and Contrast</h2>
                  {compareAndContrast.map((item) => (
                    <div key={item.title}>
                      <h3 className="ap98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ap-pitfalls" className="ap98-section">
                  <h2 className="ap98-heading">Common Pitfalls</h2>
                  {pitfalls.map((item) => (
                    <div key={item.title}>
                      <h3 className="ap98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="ap-checklist" className="ap98-section">
                  <h2 className="ap98-heading">Implementation Checklist</h2>
                  <ul>
                    {implementationChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {workedExamples.map((example) => (
                  <section key={example.id} id={example.id} className="ap98-section">
                    <h2 className="ap98-heading">{example.title}</h2>
                    <p>
                      <strong>Paradigm:</strong> {example.paradigm}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this paradigm fits:</strong> {example.whyFit}
                    </p>
                    <div className="ap98-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>
                      <strong>Complexity:</strong> {example.complexity}
                    </p>
                    <p>
                      <strong>Takeaway:</strong> {example.takeaway}
                    </p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="ap-glossary" className="ap98-section">
                <h2 className="ap98-heading">Glossary</h2>
                {glossary.map((entry) => (
                  <p key={entry.term}>
                    <strong>{entry.term}:</strong> {entry.definition}
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
