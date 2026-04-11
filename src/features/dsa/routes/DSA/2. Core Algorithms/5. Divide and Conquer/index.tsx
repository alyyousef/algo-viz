import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    detail:
      'Divide and Conquer solves a problem by splitting it into smaller self-similar subproblems, solving each subproblem, then combining those results into the final answer.',
  },
  {
    title: 'Why it works',
    detail:
      'Balanced splits reduce problem size exponentially by recursion depth, so many algorithms end up with O(log n) levels and O(n log n) total work.',
  },
  {
    title: 'When it is valuable',
    detail:
      'It is strongest when subproblems are independent, split sizes are fairly balanced, and the combine step is linear or close to linear.',
  },
  {
    title: 'Where it appears',
    detail:
      'Classic examples include merge sort, quick sort, binary search, closest pair of points, fast exponentiation, FFT, and many parallel data-processing pipelines.',
  },
]

const history = [
  {
    title: 'Euclidean roots',
    detail:
      'The Euclidean GCD algorithm repeatedly reduces a larger problem to a smaller one and is an early archetype of recursive reduction.',
  },
  {
    title: '1945: merge sort',
    detail:
      'John von Neumann described merge sort, one of the earliest modern divide-and-conquer algorithms in computing.',
  },
  {
    title: '1960s: quick sort and analysis',
    detail:
      'Tony Hoare introduced quick sort, and algorithm analysis matured around recurrence relations and expected complexity.',
  },
  {
    title: 'Modern era',
    detail:
      'D&C became foundational in multicore and distributed systems because independent subproblems are naturally parallelizable.',
  },
]

const lifecycle = [
  {
    title: 'Divide',
    detail:
      'Partition the input into smaller pieces of the same shape: halves, thirds, left/right subtrees, or geometric regions.',
  },
  {
    title: 'Conquer',
    detail: 'Solve each piece recursively until a base case is small enough to solve directly.',
  },
  {
    title: 'Combine',
    detail: 'As recursion unwinds, merge partial solutions into a complete result for each level.',
  },
]

const framingQuestions = [
  'Can the problem be written as a recurrence T(n) = aT(n/b) + f(n)?',
  'Are subproblems independent, or do they overlap heavily?',
  'How expensive is the combine step compared to recursive work?',
  'Will the split be balanced enough to keep recursion depth near log n?',
  'Is recursion depth safe for maximum input size in this runtime?',
]

const recurrenceToolkit = [
  {
    title: 'Recurrence form',
    detail:
      'Many D&C algorithms fit T(n) = aT(n/b) + f(n), where a is subproblems count, n/b is subproblem size, and f(n) is divide + combine overhead.',
  },
  {
    title: 'Recursion tree view',
    detail:
      'Plot work by level: if each level costs about n and there are log n levels, total cost is O(n log n).',
  },
  {
    title: 'Critical path',
    detail: 'Parallel speedup is limited by the longest dependency chain, not just total work.',
  },
  {
    title: 'Balance sensitivity',
    detail:
      'Unbalanced splits can degrade complexity, for example quick sort can fall from O(n log n) average to O(n^2) worst case.',
  },
]

const masterTheoremCases = [
  {
    title: 'Case 1: recursive work dominates',
    condition: 'f(n) = O(n^{log_b a - epsilon})',
    result: 'T(n) = Theta(n^{log_b a})',
  },
  {
    title: 'Case 2: balanced contribution',
    condition: 'f(n) = Theta(n^{log_b a} log^k n)',
    result: 'T(n) = Theta(n^{log_b a} log^{k+1} n)',
  },
  {
    title: 'Case 3: combine work dominates',
    condition: 'f(n) = Omega(n^{log_b a + epsilon}) with regularity',
    result: 'T(n) = Theta(f(n))',
  },
]

const correctnessChecklist = [
  'Base cases are correct and terminate recursion.',
  'Subproblems fully cover the original problem domain.',
  'Subproblems do not lose or duplicate required elements.',
  'Combine step preserves global correctness invariant.',
  'Edge cases (empty input, duplicates, extremes) are handled.',
]

const complexityBenchmarks = [
  {
    algorithm: 'Merge sort',
    recurrence: 'T(n) = 2T(n/2) + O(n)',
    time: 'O(n log n)',
    space: 'O(n)',
    note: 'Stable; combine (merge) dominates per-level work.',
  },
  {
    algorithm: 'Quick sort (average)',
    recurrence: 'T(n) = T(k) + T(n-k-1) + O(n)',
    time: 'O(n log n) average',
    space: 'O(log n) stack',
    note: 'Worst case O(n^2) from bad pivots.',
  },
  {
    algorithm: 'Binary search',
    recurrence: 'T(n) = T(n/2) + O(1)',
    time: 'O(log n)',
    space: 'O(1) iterative',
    note: 'Combine is trivial; only one branch recurses.',
  },
  {
    algorithm: 'Karatsuba multiplication',
    recurrence: 'T(n) = 3T(n/2) + O(n)',
    time: 'O(n^1.585)',
    space: 'O(n)',
    note: 'Reduces multiplication count vs classical O(n^2).',
  },
]

const algorithmCatalog = [
  {
    title: 'Sorting',
    detail:
      'Merge sort and quick sort are textbook D&C. Merge sort emphasizes combine cost; quick sort emphasizes partition quality.',
  },
  {
    title: 'Searching',
    detail:
      'Binary search halves the search interval repeatedly. Ternary search variants apply to unimodal optimization.',
  },
  {
    title: 'Geometry',
    detail:
      'Closest pair of points and convex hull variants use careful split/merge logic to beat naive quadratic checks.',
  },
  {
    title: 'Numerical algorithms',
    detail:
      'Fast exponentiation, Karatsuba multiplication, and FFT use algebraic decomposition to reduce asymptotic work.',
  },
  {
    title: 'Tree and graph contexts',
    detail:
      'Centroid decomposition, heavy-light style decomposition, and divide steps on tree structure provide efficient query/update strategies.',
  },
]

const parallelismNotes = [
  {
    title: 'Natural task parallelism',
    detail:
      'Independent subproblems can run concurrently with thread pools, work stealing, or distributed workers.',
  },
  {
    title: 'Granularity control',
    detail:
      'Use cutoffs to avoid spawning tiny tasks where scheduling overhead exceeds useful work.',
  },
  {
    title: 'Determinism concerns',
    detail:
      'Parallel combine steps need deterministic merge order when outputs must be reproducible.',
  },
]

const memoryTradeoffs = [
  {
    title: 'Stack depth',
    detail:
      'Recursive depth is typically O(log n) for balanced splits but can become O(n) in pathological partitions.',
  },
  {
    title: 'Temporary buffers',
    detail:
      'Some algorithms allocate extra memory for combine operations, like merge sort using O(n) auxiliary arrays.',
  },
  {
    title: 'Cache locality',
    detail:
      'Chunked contiguous subproblems can improve cache behavior, but pointer-heavy recursion can reduce locality.',
  },
]

const implementationPlaybook = [
  {
    title: 'Define robust base cases',
    detail: 'Base cases should return correct values immediately and prevent infinite recursion.',
  },
  {
    title: 'Use safe midpoint math',
    detail:
      'Prefer `mid = left + Math.floor((right - left) / 2)` to avoid integer overflow in fixed-width languages.',
  },
  {
    title: 'Hybrid cutoff',
    detail:
      'Switch to insertion sort or brute force for tiny partitions to reduce recursive overhead.',
  },
  {
    title: 'Stabilize partitioning',
    detail: 'Use randomized or median-like pivots for quick sort to reduce worst-case behavior.',
  },
  {
    title: 'Reuse memory',
    detail:
      'Allocate shared buffers once when possible to cut repeated allocation costs at each recursion level.',
  },
]

const pitfalls = [
  'Overlapping subproblems: naive recursion repeats work; dynamic programming may be better.',
  'Unbalanced splits: complexity drifts toward quadratic or worse stack behavior.',
  'Heavy combine logic: expensive merge steps can erase gains from splitting.',
  'Off-by-one boundaries: partition bugs often cause missing values or infinite recursion.',
  'Ignoring data distribution: adversarial input can defeat naive pivot or split choices.',
]

const decisionGuide = [
  'Use D&C when subproblems are independent and self-similar.',
  'Use D&C when splitting creates logarithmic depth and manageable combine cost.',
  'Use D&C when parallel execution materially improves throughput.',
  'Prefer DP when subproblems overlap substantially.',
  'Prefer iterative scans when n is small and recursion overhead dominates.',
]

const antiPatterns = [
  'Applying recursion to tiny arrays where a loop is simpler and faster.',
  'Using quick sort with deterministic bad pivots on already sorted input.',
  'Introducing D&C where combine requires global state synchronization at every level.',
  'Ignoring recursion limits in environments with shallow stacks.',
]

const advancedInsights = [
  {
    title: 'Akra-Bazzi generalization',
    detail:
      'When subproblem sizes differ, Akra-Bazzi extends Master Theorem style analysis beyond equal n/b splits.',
  },
  {
    title: 'Cache-oblivious design',
    detail:
      'Recursive divide structure can naturally improve hierarchy usage without hardcoding cache sizes.',
  },
  {
    title: 'Work-depth model',
    detail:
      'Parallel analysis separates total work from critical path depth to estimate realistic speedup limits.',
  },
  {
    title: 'Deterministic selection',
    detail: 'Median-of-medians is a D&C selection strategy with linear worst-case guarantees.',
  },
  {
    title: 'Geometry strip logic',
    detail:
      'Closest pair demonstrates that careful combine constraints can preserve O(n log n) even in spatial problems.',
  },
]

const workedTrace = [
  {
    step: 'Start',
    state: 'Input: [38, 27, 43, 3, 9, 82, 10]',
    note: 'Split into left [38, 27, 43] and right [3, 9, 82, 10].',
  },
  {
    step: 'Recurse left',
    state: '[38, 27, 43] -> [38] and [27, 43] -> [27] and [43]',
    note: 'Base cases are single elements, then merge upward to [27, 38, 43].',
  },
  {
    step: 'Recurse right',
    state: '[3, 9, 82, 10] -> [3, 9] and [82, 10]',
    note: 'Merge subresults to [3, 9] and [10, 82], then [3, 9, 10, 82].',
  },
  {
    step: 'Combine top level',
    state: '[27, 38, 43] + [3, 9, 10, 82]',
    note: 'Final merge produces [3, 9, 10, 27, 38, 43, 82].',
  },
]

const codeExamples = [
  {
    title: 'Merge sort (classic divide and combine)',
    code: `function mergeSort(a: number[]): number[] {
  if (a.length <= 1) return a;
  const mid = Math.floor(a.length / 2);
  const left = mergeSort(a.slice(0, mid));
  const right = mergeSort(a.slice(mid));
  const out: number[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) out.push(left[i++]);
    else out.push(right[j++]);
  }
  while (i < left.length) out.push(left[i++]);
  while (j < right.length) out.push(right[j++]);
  return out;
}`,
    explanation:
      'Two equal recursive calls plus linear merge gives T(n)=2T(n/2)+O(n), resulting in O(n log n) time.',
  },
  {
    title: 'Binary search (divide with trivial combine)',
    code: `function binarySearch(a: number[], target: number): number {
  let lo = 0;
  let hi = a.length - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    explanation: 'Only one subproblem survives each step, so the recurrence is T(n)=T(n/2)+O(1).',
  },
  {
    title: 'Fast exponentiation (power by squaring)',
    code: `function fastPow(base: number, exp: number): number {
  if (exp === 0) return 1;
  const half = fastPow(base, Math.floor(exp / 2));
  if (exp % 2 === 0) return half * half;
  return half * half * base;
}`,
    explanation:
      'Exponent is halved each call, producing O(log exp) multiplications instead of O(exp).',
  },
]

const keyTakeaways = [
  'Divide and Conquer performance is governed by split quality and combine cost.',
  'Balanced recursion commonly yields logarithmic depth and strong practical performance.',
  'Correctness depends on precise base cases, boundaries, and merge invariants.',
  'Parallelism is a first-class advantage when subproblems are independent.',
  'Use DP or iterative methods when overlap, stack depth, or overhead make D&C a poor fit.',
]

const glossary = [
  {
    term: 'Divide and Conquer',
    definition: 'A paradigm that splits, solves recursively, and combines.',
  },
  {
    term: 'Recurrence',
    definition: 'An equation that models algorithm cost in terms of smaller input sizes.',
  },
  {
    term: 'Base case',
    definition: 'A smallest subproblem solved directly without further recursion.',
  },
  {
    term: 'Combine step',
    definition: 'Logic that merges subproblem results into a higher-level solution.',
  },
  { term: 'Balanced split', definition: 'A partition where subproblem sizes are near equal.' },
  { term: 'Critical path', definition: 'Longest dependency chain that limits parallel speedup.' },
  {
    term: 'Master Theorem',
    definition: 'A common method for solving many D&C recurrence relations.',
  },
  {
    term: 'Akra-Bazzi',
    definition: 'A generalized method for non-uniform divide-and-conquer recurrences.',
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
    { id: 'bp-history', label: 'History' },
    { id: 'bp-lifecycle', label: 'Lifecycle' },
    { id: 'bp-catalog', label: 'Algorithm Families' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-framing', label: 'Framing Questions' },
    { id: 'core-recurrence', label: 'Recurrence Toolkit' },
    { id: 'core-master', label: 'Master Theorem' },
    { id: 'core-correctness', label: 'Correctness Checklist' },
    { id: 'core-benchmarks', label: 'Complexity Benchmarks' },
    { id: 'core-parallel', label: 'Parallelism Notes' },
    { id: 'core-memory', label: 'Memory Tradeoffs' },
    { id: 'core-playbook', label: 'Implementation Playbook' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-decisions', label: 'Decision Guide' },
    { id: 'core-antipatterns', label: 'Anti-Patterns' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-trace', label: 'Worked Trace' },
    { id: 'ex-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function DivideAndConquerPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Divide and Conquer',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Divide and Conquer"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Divide and Conquer</h1>
      <p>
        Divide and Conquer is one of the most important algorithm design paradigms. The central idea
        is simple: split a hard problem into smaller instances, solve those instances recursively,
        and combine their results. The quality of the split strategy and the cost of the combine
        step determine most of the final runtime behavior.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History</h2>
            {history.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-lifecycle" className="bin98-section">
            <h2 className="bin98-heading">Lifecycle: Divide, Conquer, Combine</h2>
            {lifecycle.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-catalog" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Families</h2>
            {algorithmCatalog.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
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
          <section id="core-framing" className="bin98-section">
            <h2 className="bin98-heading">Framing Questions</h2>
            <ul>
              {framingQuestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-recurrence" className="bin98-section">
            <h2 className="bin98-heading">Recurrence Toolkit</h2>
            {recurrenceToolkit.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-master" className="bin98-section">
            <h2 className="bin98-heading">Master Theorem Quick Cases</h2>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Case</th>
                  <th>Condition</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {masterTheoremCases.map((item) => (
                  <tr key={item.title}>
                    <td>{item.title}</td>
                    <td>{item.condition}</td>
                    <td>{item.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Checklist</h2>
            <ul>
              {correctnessChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-benchmarks" className="bin98-section">
            <h2 className="bin98-heading">Complexity Benchmarks</h2>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Algorithm</th>
                  <th>Recurrence</th>
                  <th>Time</th>
                  <th>Space</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {complexityBenchmarks.map((row) => (
                  <tr key={row.algorithm}>
                    <td>{row.algorithm}</td>
                    <td>{row.recurrence}</td>
                    <td>{row.time}</td>
                    <td>{row.space}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-parallel" className="bin98-section">
            <h2 className="bin98-heading">Parallelism Notes</h2>
            {parallelismNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-memory" className="bin98-section">
            <h2 className="bin98-heading">Memory Tradeoffs</h2>
            {memoryTradeoffs.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-playbook" className="bin98-section">
            <h2 className="bin98-heading">Implementation Playbook</h2>
            {implementationPlaybook.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-decisions" className="bin98-section">
            <h2 className="bin98-heading">Decision Guide</h2>
            <ol>
              {decisionGuide.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-antipatterns" className="bin98-section">
            <h2 className="bin98-heading">Anti-Patterns</h2>
            <ul>
              {antiPatterns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-trace" className="bin98-section">
            <h2 className="bin98-heading">Worked Trace: Merge Sort</h2>
            <ol>
              {workedTrace.map((item) => (
                <li key={item.step}>
                  <p>
                    <strong>{item.step}:</strong> {item.note}
                  </p>
                  <p className="divide98-state">{item.state}</p>
                </li>
              ))}
            </ol>
          </section>
          <section id="ex-code" className="bin98-section">
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
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
