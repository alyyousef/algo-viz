import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Parenthesizing a phone chain',
    detail: 'You conference callers; the order of merging calls changes the total handoff cost.',
  },
  {
    title: 'Assembly line setup',
    detail:
      'Matrices convert dimensions. Chaining them is arranging machines; the order you compose them changes total work.',
  },
  {
    title: 'Optimal bracketing',
    detail:
      'Matrix multiplication is associative. The problem is choosing where to put parentheses to minimize scalar multiplications, not changing the final product.',
  },
  {
    title: 'Merging book chapters',
    detail:
      'Combining chapters of different sizes is associative, but the merge order controls how much work you do.',
  },
  {
    title: 'Tensor contraction planning',
    detail:
      'In ML and graphics, choosing contraction order can cut FLOPs and memory without changing the result.',
  },
]
const algorithmOptions = [
  {
    title: 'Interval DP (tabulation, O(n^3))',
    detail:
      'dp[i][j] = min cost to multiply matrices i..j. Try all split points k; choose minimal dp[i][k] + dp[k+1][j] + cost(i,k,j).',
  },
  {
    title: 'Top-down memoization',
    detail:
      'Same recurrence with caching. Helpful for pruning if costs are sparse or to mirror the mathematical recurrence directly.',
  },
  {
    title: 'Reconstruction with split table',
    detail:
      'Maintain split[i][j] storing the k that achieved the optimum so you can print the parenthesization.',
  },
]

const walkthroughSteps = [
  'Let dims be length n+1, where matrix i has size dims[i] x dims[i+1]. There are n matrices total.',
  'Create dp and split tables of size n x n. Initialize dp[i][i] = 0 (single matrix costs nothing).',
  'Expand by chain length L from 2..n. For each i, set j = i + L - 1 and search all splits k in [i, j-1].',
  'Compute cost = dp[i][k] + dp[k+1][j] + dims[i] * dims[k+1] * dims[j+1]. Update dp[i][j] and record split if better.',
  'Result: dp[0][n-1] is the minimum multiplication cost. Rebuild parentheses using split to show an optimal order.',
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'Classic DP is O(n^3) time and O(n^2) space. n is the number of matrices (dims length minus 1).',
  },
  {
    title: 'Search space size',
    detail:
      'The number of parenthesizations is the Catalan number C_{n-1}, which grows exponentially. DP avoids this brute-force explosion.',
  },
  {
    title: 'Numerical stability',
    detail:
      'Parenthesization affects scalar cost but not mathematical result. Floating point associativity is not exact; cheaper orders often also reduce rounding error.',
  },
  {
    title: 'Bounds and overflow',
    detail:
      'Scalar counts can grow large. Use 64-bit integers for dp. For dimensions up to 1e3 with n around 200, values still fit in 64-bit.',
  },
  {
    title: 'Special cases',
    detail:
      'Single matrix or empty chain costs zero. If any dimension is zero, cost terms vanish and should be handled explicitly.',
  },
]
const correctnessInsights = [
  {
    title: 'Optimal substructure',
    detail:
      'Any optimal parenthesization splits at some k. Both left and right halves must themselves be optimally parenthesized; otherwise the global plan could be improved.',
  },
  {
    title: 'Overlapping subproblems',
    detail:
      'Costs for ranges [i, j] get reused for many larger ranges, so memoization/tabulation saves repeated work over exponential recursion.',
  },
  {
    title: 'Associativity freedom',
    detail:
      'Because multiplication is associative, we only decide grouping, not order of matrices. That guarantees each k split produces the same result with different costs.',
  },
]

const applications = [
  {
    context: 'Database query planning',
    detail:
      'Join ordering and expression re-writing mirror matrix chain parenthesization - planner searches for cheapest associative grouping.',
  },
  {
    context: 'Graphics and transforms',
    detail:
      'Composing many affine transform matrices benefits from low-cost parenthesization, especially in shader or animation pipelines.',
  },
  {
    context: 'Compiler expression trees',
    detail:
      'Associative arithmetic (e.g., additions, multiplications) can be regrouped for fewer temporaries or operations, echoing matrix chain logic.',
  },
  {
    context: 'Parallel execution planning',
    detail:
      'Choosing a balanced split tree can reduce depth and improve concurrency while keeping scalar cost low.',
  },
]

const pitfalls = [
  'Misaligning dimensions: n matrices require dims length n+1. Using n dims gives wrong cost computation.',
  'Using int32 for costs; large products overflow. Prefer 64-bit integers.',
  'Confusing matrix indices with dimension indices; dp uses matrix indices, dims uses boundary indices.',
  'Forgetting to store splits, making reconstruction impossible without recomputing choices.',
  'Iterating chain lengths incorrectly (e.g., missing inclusive bounds) leading to uninitialized dp entries.',
  'Assuming commutativity - matrix multiplication is not commutative; only parentheses move.',
]
const variations = [
  {
    title: 'Minimizing depth vs cost',
    detail:
      'Balance parentheses to minimize tree height (parallelism) even if scalar cost rises slightly.',
  },
  {
    title: 'Triangulation/interval DP cousins',
    detail:
      'Polygon triangulation and optimal BST share the same interval-DP shape with different cost functions.',
  },
  {
    title: 'Chain with constraints',
    detail:
      'Restrict k choices (e.g., bandwidth limits) or penalize certain splits; DP still applies with altered transitions.',
  },
  {
    title: 'Approximation/heuristics',
    detail:
      'For very large n, greedy or randomized search (hill climbing, simulated annealing) offers faster near-optimal plans.',
  },
]

const codeExamples = [
  {
    title: 'Bottom-up DP with reconstruction',
    code: `function matrixChainOrder(dims):
    // dims length = n+1, matrices 0..n-1
    n = len(dims) - 1
    dp = matrix(n, n, fill=0)
    split = matrix(n, n, fill=-1)

    for L in 2..n:                 // chain length
        for i in 0..n-L:
            j = i + L - 1
            dp[i][j] = INF
            for k in i..j-1:
                cost = dp[i][k] + dp[k+1][j] + dims[i] * dims[k+1] * dims[j+1]
                if cost < dp[i][j]:
                    dp[i][j] = cost
                    split[i][j] = k
    return dp[0][n-1], split`,
    explanation:
      'Classic tabulation. The split table captures the optimal k for each interval so you can print parentheses later.',
  },
  {
    title: 'Reconstructing parentheses',
    code: `function buildOrder(i, j, split):
    if i == j: return "A" + i
    k = split[i][j]
    left = buildOrder(i, k, split)
    right = buildOrder(k+1, j, split)
    return "(" + left + " x " + right + ")"`,
    explanation: 'Walk the split choices recursively to emit one optimal parenthesization string.',
  },
  {
    title: 'Top-down memo',
    code: `memo = {}
function solve(i, j):
    if i == j: return 0
    if (i, j) in memo: return memo[(i, j)]
    best = INF
    for k in i..j-1:
        best = min(best,
                    solve(i, k) + solve(k+1, j) + dims[i]*dims[k+1]*dims[j+1])
    memo[(i, j)] = best
    return best`,
    explanation:
      'Same recurrence as bottom-up, computed lazily. Simpler to write and mirrors the math, but still O(n^3) in the worst case.',
  },
]

const costModel = [
  {
    title: 'Matrix sizes',
    detail: 'Matrix i has shape dims[i] x dims[i+1]. There are n = dims.length - 1 matrices.',
  },
  {
    title: 'Scalar cost',
    detail: 'Multiplying (p x q) by (q x r) costs p * q * r scalar multiplications.',
  },
  {
    title: 'Split cost',
    detail:
      'If you split i..j at k, total cost is dp[i][k] + dp[k+1][j] + dims[i] * dims[k+1] * dims[j+1].',
  },
]

const dpRecurrence = [
  {
    title: 'State',
    detail: 'dp[i][j] is the minimum cost to multiply Ai..Aj (0-based indices).',
  },
  {
    title: 'Base case',
    detail: 'dp[i][i] = 0 because a single matrix needs no multiplication.',
  },
  {
    title: 'Transition',
    detail:
      'dp[i][j] = min over k in [i, j-1] of dp[i][k] + dp[k+1][j] + dims[i] * dims[k+1] * dims[j+1].',
  },
  {
    title: 'Reconstruction',
    detail: 'split[i][j] stores the argmin k. Recursively print (i..k) and (k+1..j).',
  },
]

const workedExample = {
  dims: '[30, 35, 15, 5, 10, 20, 25]',
  matrices: 'A1 30x35, A2 35x15, A3 15x5, A4 5x10, A5 10x20, A6 20x25',
  bestCost: '15125',
  bestOrder: '((A1 x (A2 x A3)) x ((A4 x A5) x A6))',
  notes: [
    'There are 6 matrices, so dp is 6 x 6 and split is 6 x 6.',
    'The optimal top split is between A3 and A4 (k = 2 in 0-based indexing).',
    'Both subchains are optimized recursively by the same recurrence.',
  ],
}

const implementationChecklist = [
  'Confirm dims length is n+1 and all adjacent matrices are compatible.',
  'Use 64-bit integers for dp and INF large enough to avoid overflow.',
  'Loop by chain length so subproblems are solved before they are used.',
  'Store split indices if you need the parenthesization, not just cost.',
  'Test with small n (1, 2, 3) where answers are easy to verify by hand.',
]

const takeaways = [
  'Matrix Chain Multiplication is an interval DP optimizing parentheses under associativity.',
  'The cost of multiplying i..j splits at k: left + right + dims[i]*dims[k+1]*dims[j+1].',
  'Time O(n^3) and space O(n^2) are standard; store splits to rebuild an optimal order.',
  'Correctness rests on optimal substructure and overlapping subproblems.',
  'Many planning and ordering tasks reduce to this DP shape once costs are associative.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const glossary = [
  {
    term: 'Interval DP',
    definition:
      'Dynamic programming over subranges [i, j] where longer intervals depend on shorter ones.',
  },
  {
    term: 'Parenthesization',
    definition:
      'A grouping of associative multiplications that preserves matrix order but changes cost.',
  },
  {
    term: 'split[i][j]',
    definition: 'Index k that gives the minimum cost split for interval i..j.',
  },
  {
    term: 'Catalan number',
    definition: 'Counts valid parenthesizations of a chain; grows exponentially with chain length.',
  },
  {
    term: 'Associativity',
    definition: 'Matrices can be regrouped as (AB)C = A(BC) when dimensions are compatible.',
  },
  {
    term: 'Scalar multiplication cost',
    definition: 'Cost of multiplying (p x q) and (q x r) equals p*q*r scalar operations.',
  },
  {
    term: 'Top-down memoization',
    definition: 'Recursive recurrence with caching to avoid recomputing subproblems.',
  },
  { term: 'Tabulation', definition: 'Bottom-up DP fill order by increasing chain length.' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-mental-models', label: 'Mental Models' },
    { id: 'bp-framing', label: 'Problem Framing' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-cost-model', label: 'Cost Model' },
    { id: 'core-dp', label: 'DP Recurrence' },
    { id: 'core-options', label: 'Algorithm Options' },
    { id: 'core-walkthrough', label: 'Interval Walkthrough' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-correctness', label: 'Correctness Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-variations', label: 'Variations' },
    { id: 'core-checklist', label: 'Implementation Checklist' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Example' },
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-applications', label: 'Applications' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function MatrixChainMultiplicationPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Matrix Chain Multiplication',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Matrix Chain Multiplication"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Matrix Chain Multiplication</h1>
      <p>
        Given matrices A1..An with compatible dimensions, all multiplication orders yield the same
        matrix but not the same work. Matrix Chain Multiplication finds the parenthesization with
        minimum scalar multiplications using interval DP and split tracking, and it cleanly
        illustrates interval DP structure and reconstruction.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              The problem is not to change matrix order, only to change grouping. The DP explores
              all split points, caching the cheapest cost for every interval, and reconstructs one
              optimal parenthesization that achieves it.
            </p>
            <p>
              The key cost model is multiplying (p x q) by (q x r), which costs p*q*r scalar
              multiplications, so split choice controls the expensive middle dimension.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="bp-framing" className="bin98-section">
            <h2 className="bin98-heading">Problem Framing</h2>
            <h3 className="bin98-subheading">Definition</h3>
            <p>
              Input: dimensions array dims of length n+1. Matrix i has shape dims[i] x dims[i+1].
              Find the minimum scalar multiplications to compute A1 x A2 x ... x An by choosing
              parentheses (grouping).
            </p>
            <p>Output: minimum cost and an example parenthesization achieving it.</p>
            <h3 className="bin98-subheading">Why it matters</h3>
            <ul>
              <li>Illustrates interval DP and optimal substructure cleanly.</li>
              <li>Maps to query planners, expression optimizers, and geometry DPs.</li>
              <li>Shows how associativity frees grouping choices that impact performance.</li>
            </ul>
            <h3 className="bin98-subheading">Dimensions and indexing sanity</h3>
            <ul>
              <li>There are n matrices but n+1 dimensions.</li>
              <li>dp is indexed by matrices (0..n-1).</li>
              <li>dims is indexed by boundaries (0..n).</li>
            </ul>
          </section>
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-cost-model" className="bin98-section">
            <h2 className="bin98-heading">Cost Model</h2>
            {costModel.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-dp" className="bin98-section">
            <h2 className="bin98-heading">DP Recurrence</h2>
            {dpRecurrence.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-options" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Options</h2>
            {algorithmOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              The tabulation order is by chain length so that all shorter subranges are ready when
              computing longer ones. Storing split indices costs O(n^2) extra but is crucial for
              reconstructing the optimal grouping.
            </p>
          </section>
          <section id="core-walkthrough" className="bin98-section">
            <h2 className="bin98-heading">Step-by-step (Interval DP)</h2>
            <ol>
              {walkthroughSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Notes</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Insights</h2>
            {correctnessInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-variations" className="bin98-section">
            <h2 className="bin98-heading">Variations and Related Problems</h2>
            {variations.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Implementation Checklist</h2>
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
          <section id="ex-worked" className="bin98-section">
            <h2 className="bin98-heading">Worked Example</h2>
            <p>
              <strong>dims:</strong> {workedExample.dims}
            </p>
            <p>
              <strong>Matrices:</strong> {workedExample.matrices}
            </p>
            <p>
              <strong>Minimum cost:</strong> {workedExample.bestCost}
            </p>
            <p>
              <strong>One optimal order:</strong> {workedExample.bestOrder}
            </p>
            <ul>
              {workedExample.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Practical Examples</h2>
            {codeExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            {applications.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
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
