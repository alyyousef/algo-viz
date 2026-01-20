import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  'Interval DP optimizes over contiguous subarrays or substrings by splitting an interval into smaller intervals.',
  'The DP state is usually dp[l][r], representing the best value for the interval [l, r].',
  'Most recurrences choose a split k between l and r and combine dp[l][k] and dp[k+1][r].',
]

const formalDefinition = [
  {
    title: 'State',
    detail:
      'dp[l][r] is the optimal value for the subarray or substring from l to r (inclusive).',
  },
  {
    title: 'Transition',
    detail:
      'dp[l][r] = best over k in [l, r]: combine(dp[l][k], dp[k+1][r], cost(l, k, r)).',
  },
  {
    title: 'Order',
    detail:
      'Intervals are solved by increasing length so that smaller intervals are ready when a larger one is computed.',
  },
  {
    title: 'Base cases',
    detail:
      'Length 1 intervals usually cost 0 or value of a single element depending on the problem.',
  },
]

const mentalModels = [
  {
    title: 'Split the segment',
    detail:
      'Choose a final split point k. The optimal solution must end with one last split, so check them all.',
  },
  {
    title: 'Build by length',
    detail:
      'You cannot compute dp[l][r] until all shorter intervals inside it are done.',
  },
  {
    title: 'Combine with boundary cost',
    detail:
      'Many interval problems add a cost that depends on the endpoints and the split choice.',
  },
]

const recurrencePatterns = [
  {
    heading: 'Classic split (min or max)',
    bullets: [
      'dp[l][r] = min over k: dp[l][k] + dp[k+1][r] + cost(l, k, r).',
      'Used in matrix chain multiplication, optimal BST, merge stones.',
    ],
  },
  {
    heading: 'Choose last action inside interval',
    bullets: [
      'Pick the last item removed or added within [l, r] and combine left and right sides.',
      'Burst balloons and remove boxes use this view with boundary multipliers.',
    ],
  },
  {
    heading: 'Palindrome or partitioning',
    bullets: [
      'dp[l][r] depends on splitting at k when the interval is not a palindrome.',
      'Used in palindrome partition and string segmentation problems.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Define state and meaning',
    detail:
      'Decide what dp[l][r] represents and what the base case should return.',
  },
  {
    title: 'Pick transition',
    detail:
      'Choose the split rule or last-action rule and write the combine cost.',
  },
  {
    title: 'Loop by length',
    detail:
      'For len from 1..n, compute dp[l][r] for every interval of that length.',
  },
  {
    title: 'Read final answer',
    detail:
      'The result is usually dp[0][n-1] for the full interval.',
  },
]

const workedExample = [
  {
    title: 'Matrix chain dimensions',
    detail:
      'Matrices A, B, C with dims 10x30, 30x5, 5x60. dims = [10, 30, 5, 60].',
  },
  {
    title: 'Base cases',
    detail:
      'dp[i][i] = 0, a single matrix costs no multiplications.',
  },
  {
    title: 'Length 2',
    detail:
      'dp[0][1] = 10*30*5 = 1500. dp[1][2] = 30*5*60 = 9000.',
  },
  {
    title: 'Length 3',
    detail:
      'dp[0][2] = min( dp[0][0]+dp[1][2]+10*30*60, dp[0][1]+dp[2][2]+10*5*60 ) = min(27000, 4500) = 4500.',
  },
]

const problemGallery = [
  {
    heading: 'Matrix chain multiplication',
    bullets: [
      'Minimize scalar multiplications by choosing parenthesization.',
      'dp[l][r] = min dp[l][k] + dp[k+1][r] + dims[l]*dims[k+1]*dims[r+1].',
    ],
  },
  {
    heading: 'Burst balloons',
    bullets: [
      'Pick the last balloon to burst in [l, r].',
      'dp[l][r] = max dp[l][k-1] + dp[k+1][r] + a[l-1]*a[k]*a[r+1].',
    ],
  },
  {
    heading: 'Optimal BST',
    bullets: [
      'Pick root k and combine left and right costs.',
      'Add sum of probabilities for the interval as depth increases.',
    ],
  },
  {
    heading: 'Merge stones',
    bullets: [
      'Merge adjacent piles with cost equal to sum of weights.',
      'dp[l][r] = min dp[l][k] + dp[k+1][r] + sum(l, r).',
    ],
  },
  {
    heading: 'Palindrome partition',
    bullets: [
      'Min cuts to partition string into palindromes.',
      'dp[l][r] = 0 if palindrome else min dp[l][k] + dp[k+1][r] + 1.',
    ],
  },
  {
    heading: 'Strange game DP',
    bullets: [
      'Interval games often use dp[l][r] with max and min depending on turn.',
      'The split combines scores from left and right intervals.',
    ],
  },
]

const implementationNotes = [
  {
    title: 'Indexing',
    detail:
      'Use inclusive indices for clarity and be consistent about endpoints.',
  },
  {
    title: 'Infinity guards',
    detail:
      'Initialize dp with large values and take min or max carefully.',
  },
  {
    title: 'Prefix sums',
    detail:
      'Precompute sums for interval costs like merge stones.',
  },
  {
    title: 'Reconstruction',
    detail:
      'Store the best split k to rebuild the structure (tree, parentheses, cut points).',
  },
]

const complexityNotes = [
  {
    title: 'Typical complexity',
    detail:
      'Most interval DP runs in O(n^3) time and O(n^2) space because of the split loop.',
  },
  {
    title: 'When it is too slow',
    detail:
      'n around 500 or more can be heavy; consider optimizations or pruning.',
  },
  {
    title: 'Common optimizations',
    detail:
      'Knuth or quadrangle inequality optimizations can reduce some problems to O(n^2).',
  },
]

const optimizationPlaybook = [
  {
    title: 'Knuth optimization',
    detail:
      'If the optimal split indices are monotonic and quadrangle inequality holds, restrict k to a shrinking range.',
  },
  {
    title: 'Divide and conquer optimization',
    detail:
      'If the cost is convex or has monotone opt, compute dp rows in O(n log n).',
  },
  {
    title: 'Prune by constraints',
    detail:
      'If only certain k are valid (like merge piles in groups), skip invalid splits early.',
  },
]

const examples = [
  {
    title: 'Generic interval DP template',
    code: `function intervalDP(n):
    dp = matrix(n, n, +inf)
    for i in range(n):
        dp[i][i] = baseValue(i)

    for len in range(2, n + 1):
        for l in range(0, n - len + 1):
            r = l + len - 1
            for k in range(l, r):
                dp[l][r] = min(dp[l][r],
                               dp[l][k] + dp[k+1][r] + cost(l, k, r))
    return dp[0][n-1]`,
    explanation:
      'This is the classic split recurrence. Replace min with max or change cost to fit your problem.',
  },
  {
    title: 'Matrix chain multiplication',
    code: `function matrixChain(dims):
    n = len(dims) - 1
    dp = matrix(n, n, 0)
    for len in range(2, n + 1):
        for l in range(0, n - len + 1):
            r = l + len - 1
            dp[l][r] = +inf
            for k in range(l, r):
                cost = dp[l][k] + dp[k+1][r] + dims[l] * dims[k+1] * dims[r+1]
                dp[l][r] = min(dp[l][r], cost)
    return dp[0][n-1]`,
    explanation:
      'Parenthesization is chosen by selecting k. Storing k reconstructs the optimal order.',
  },
]

const pitfalls = [
  'Wrong loop order: computing dp[l][r] before its subintervals exist leads to garbage.',
  'Off-by-one mistakes with inclusive endpoints or dimension arrays.',
  'Forgetting to initialize dp with infinity for min problems.',
  'Not precomputing interval sums, leading to accidental O(n^4).',
  'Mixing up split meaning when using last-action formulations.',
]

const decisionGuidance = [
  'Use interval DP when the subproblem is defined on a contiguous segment and solutions combine by splitting.',
  'If the recurrence references dp[l][r] and dp[l][k] plus dp[k+1][r], you are in interval DP territory.',
  'If n is large, check whether an optimization (Knuth, divide and conquer) applies before coding.',
  'If the cost depends on interval sums, precompute prefix sums to keep transitions O(1).',
  'If you need the actual structure, store split indices for reconstruction.',
]

const advancedInsights = [
  'Interval DP often corresponds to building an optimal binary tree over the interval.',
  'Many problems can be reframed as choosing the last action, which avoids double counting costs.',
  'Semiring and algebraic views can unify interval DP with matrix chain and parsing algorithms.',
  'Some problems are solvable by monotone queue or convex hull instead of interval DP; compare constraints.',
  'The split index monotonicity property is the key to fast optimizations.',
]

const miniFaq = [
  {
    question: 'Why does length order matter?',
    answer:
      'The recurrence depends on shorter subintervals. Computing by increasing length guarantees they exist.',
  },
  {
    question: 'Should dp be inclusive or half-open?',
    answer:
      'Either works, but inclusive [l, r] is common. Stay consistent and test small cases.',
  },
  {
    question: 'How do I reconstruct the answer?',
    answer:
      'Store the best split k in a separate table and recursively rebuild the structure.',
  },
  {
    question: 'When is interval DP overkill?',
    answer:
      'If the structure is not contiguous or can be solved with a greedy or linear DP, interval DP adds unnecessary cost.',
  },
]

const takeaways = [
  'Interval DP is about optimizing contiguous segments by splitting them into smaller segments.',
  'The standard loop order is by length, then left index, then split index.',
  'Most problems are O(n^3) unless special structure allows optimization.',
  'Store split indices if you need to rebuild the optimal structure.',
  'Careful indexing and base cases are the difference between correct and broken DP.',
]

export default function IntervalDPPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Interval DP</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Optimize over subarrays by splitting intervals</div>
              <p className="win95-text">
                Interval DP is the template for problems where the optimal solution for a segment is built by choosing a split inside
                that segment. This page walks through the formal state definition, loop ordering, common patterns, worked examples,
                and performance trade-offs with the same Win95 layout as other DP pages.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {bigPicture.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Formal definition</legend>
            <div className="win95-grid win95-grid-2">
              {formalDefinition.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core mental models</legend>
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
            <legend>Recurrence patterns</legend>
            <div className="win95-grid win95-grid-3">
              {recurrencePatterns.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm steps</legend>
            <div className="win95-grid win95-grid-3">
              {algorithmSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked example (matrix chain)</legend>
            <div className="win95-grid win95-grid-2">
              {workedExample.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <pre className="win95-code">
                    <code>{item.detail}</code>
                  </pre>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Problem gallery</legend>
            <div className="win95-grid win95-grid-3">
              {problemGallery.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation notes</legend>
            <div className="win95-grid win95-grid-2">
              {implementationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and trade-offs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note, index) => (
                <div
                  key={note.title}
                  className={index === 0 ? 'win95-panel win95-panel--raised' : 'win95-panel'}
                >
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Optimization playbook</legend>
            <div className="win95-grid win95-grid-3">
              {optimizationPlaybook.map((item) => (
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
              {examples.map((example) => (
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
            <legend>Quick FAQ</legend>
            <div className="win95-stack">
              {miniFaq.map((item) => (
                <div key={item.question} className="win95-panel">
                  <div className="win95-heading">{item.question}</div>
                  <p className="win95-text">{item.answer}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {advancedInsights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
