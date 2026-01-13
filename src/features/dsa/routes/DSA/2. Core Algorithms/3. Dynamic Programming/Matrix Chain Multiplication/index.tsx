import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const mentalModels = [
  {
    title: 'Parenthesizing a phone chain',
    detail:
      'You must call several people who can conference the next caller in. The order you place parentheses changes the total “call handoff” cost.',
  },
  {
    title: 'Assembly line setup',
    detail:
      'Matrices are machines that convert dimensions. Chaining them is configuring an assembly line; the order you compose them changes total work.',
  },
  {
    title: 'Optimal bracketing',
    detail:
      'Matrix multiplication is associative. The problem is choosing where to put parentheses to minimize scalar multiplications, not changing the final product.',
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
    detail: 'Classic DP is O(n^3) time and O(n^2) space. n is the number of matrices (dims length minus 1).',
  },
  {
    title: 'Numerical stability',
    detail:
      'Parenthesization affects scalar cost but not mathematical result. However, floating point associativity is not exact—choosing cheaper orders often also reduces rounding error.',
  },
  {
    title: 'Bounds and overflow',
    detail:
      'Scalar counts can grow large. Use 64-bit integers for dp. For dimensions up to 1e3 with n ~ 200, values still fit in 64-bit.',
  },
  {
    title: 'Special cases',
    detail:
      'Single matrix or empty chain costs zero. If any dimension is zero, cost terms vanish—handle gracefully in code.',
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
      'Join ordering and expression re-writing mirror matrix chain parenthesization—planner searches for cheapest associative grouping.',
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
  'Forgetting to store splits, making reconstruction impossible without recomputing choices.',
  'Iterating chain lengths incorrectly (e.g., missing inclusive bounds) leading to uninitialized dp entries.',
  'Assuming commutativity—matrix multiplication is not commutative; only parentheses move.',
]

const variations = [
  {
    title: 'Minimizing depth vs cost',
    detail: 'Balance parentheses to minimize tree height (parallelism) even if scalar cost rises slightly.',
  },
  {
    title: 'Triangulation/interval DP cousins',
    detail: 'Polygon triangulation and optimal BST share the same interval-DP shape with different cost functions.',
  },
  {
    title: 'Chain with constraints',
    detail: 'Restrict k choices (e.g., bandwidth limits) or penalize certain splits; DP still applies with altered transitions.',
  },
  {
    title: 'Approximation/heuristics',
    detail: 'For very large n, greedy or randomized search (hill climbing, simulated annealing) offers faster near-optimal plans.',
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
    explanation:
      'Walk the split choices recursively to emit one optimal parenthesization string.',
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

const takeaways = [
  'Matrix Chain Multiplication is an interval DP optimizing parentheses under associativity.',
  'The cost of multiplying i..j splits at k: left + right + dims[i]*dims[k+1]*dims[j+1].',
  'Time O(n^3) and space O(n^2) are standard; store splits to rebuild an optimal order.',
  'Correctness rests on optimal substructure and overlapping subproblems.',
  'Many planning and ordering tasks reduce to this DP shape once costs are associative.',
]

export default function MatrixChainMultiplicationPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Matrix Chain Multiplication</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Pick parentheses to minimize scalar multiplications</div>
              <p className="win95-text">
                Given matrices A1..An with compatible dimensions, all multiplication orders yield the same matrix but not the same
                work. Matrix Chain Multiplication finds the parenthesization with minimum scalar multiplications using interval DP
                and split tracking.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                The problem is not to change matrix order, only to change grouping. The DP explores all split points, caching the
                cheapest cost for every interval, and reconstructs one optimal parenthesization that achieves it.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Mental models</legend>
            <div className="win95-grid win95-grid-3">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Problem framing</legend>
            <div className="win95-grid win95-grid-2">
              <div className="win95-panel">
                <div className="win95-heading">Definition</div>
                <p className="win95-text">
                  Input: dimensions array dims of length n+1. Matrix i has shape dims[i] × dims[i+1]. Find the minimum scalar
                  multiplications to compute A1 × A2 × ... × An by choosing parentheses (grouping).
                </p>
                <p className="win95-text">Output: minimum cost and an example parenthesization achieving it.</p>
              </div>
              <div className="win95-panel">
                <div className="win95-heading">Why it matters</div>
                <ul className="win95-list">
                  <li>Illustrates interval DP and optimal substructure cleanly.</li>
                  <li>Maps to query planners, expression optimizers, and geometry DPs.</li>
                  <li>Shows how associativity frees grouping choices that impact performance.</li>
                </ul>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm options</legend>
            <div className="win95-grid win95-grid-3">
              {algorithmOptions.map((option) => (
                <div key={option.title} className="win95-panel">
                  <div className="win95-heading">{option.title}</div>
                  <p className="win95-text">{option.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The tabulation order is by chain length so that all shorter subranges are ready when computing longer ones. Storing
                split indices costs O(n^2) extra but is crucial for reconstructing the optimal grouping.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Step-by-step (interval DP)</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {walkthroughSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity & correctness</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-grid win95-grid-3" style={{ marginTop: '6px' }}>
              {correctnessInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {codeExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variations & related problems</legend>
            <div className="win95-grid win95-grid-2">
              {variations.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

