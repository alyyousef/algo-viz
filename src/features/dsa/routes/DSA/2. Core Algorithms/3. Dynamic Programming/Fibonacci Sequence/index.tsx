import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const history = [
  '600-200 BCE, Indian prosody texts by Pingala and Virahanka describe similar recurrences for counting syllable patterns.',
  '1202, Leonardo of Pisa (Fibonacci) publishes Liber Abaci to model rabbit populations and popularizes the sequence in Europe.',
  '1843, Jacques Binet formalizes the closed form using the golden ratio roots of the characteristic polynomial.',
  'Late 1900s, algorithm texts (Knuth, CLRS) adopt matrix and fast-doubling derivations to teach divide-and-conquer.',
]

const formalDefinition = [
  {
    title: 'Definition',
    detail:
      'F(0) = 0, F(1) = 1, and for n >= 2: F(n) = F(n-1) + F(n-2). This is a linear recurrence of order 2.',
  },
  {
    title: 'Two-state memory model',
    detail:
      'Each term depends only on the two previous terms. The state of the system is a pair (F(n-1), F(n-2)).',
  },
  {
    title: 'Characteristic roots',
    detail:
      'Solve x^2 = x + 1. The roots are phi = (1 + sqrt(5)) / 2 and psi = (1 - sqrt(5)) / 2.',
  },
  {
    title: 'Asymptotic growth',
    detail:
      'F(n) grows like phi^n / sqrt(5). psi^n is tiny in magnitude and vanishes for large n.',
  },
]

const mechanics = [
  {
    heading: 'Recurrence and mental model',
    bullets: [
      'F(n) = F(n-1) + F(n-2) with seeds F(0) = 0, F(1) = 1; a two-state system that only remembers the last two observations.',
      'Optimal substructure: each term is optimal given optimal smaller terms; overlapping subproblems cause naive recursion to explode.',
      'Call tree duplication is the core cost driver: computing F(40) recomputes F(30) many times unless cached.',
    ],
  },
  {
    heading: 'Bottom-up tabulation',
    bullets: [
      'Allocate fib[0..n], seed fib[0] = 0, fib[1] = 1, then march upward; each step reuses two prior cells.',
      'Time O(n), space O(n); reduce to O(1) by keeping two rolling values and discarding the array.',
      'Modulo arithmetic keeps values bounded for hashing or contests, with no effect on asymptotics.',
    ],
  },
  {
    heading: 'Acceleration tricks',
    bullets: [
      'Fast doubling computes (F(n), F(n+1)) using even/odd identities in O(log n) time and O(1) space.',
      'Matrix exponentiation raises [[1,1],[1,0]] to the (n-1) power with binary exponentiation, also O(log n).',
      'Closed form (Binet) gives O(1) arithmetic but loses exactness for large n unless using arbitrary precision and rounding.',
    ],
  },
]

const recurrenceBreakdown = [
  {
    title: 'Base cases anchor the sequence',
    detail:
      'F(0) and F(1) pin down every future term. Changing seeds shifts the entire series.',
  },
  {
    title: 'One-step recurrence',
    detail:
      'Each F(n) is a single add of the two previous terms. DP turns this into a linear pass.',
  },
  {
    title: 'Overlap is massive',
    detail:
      'Naive recursion generates O(phi^n) calls because subtrees repeat the same F(k) values.',
  },
]

const workedExample = [
  {
    title: 'Input',
    detail: 'n = 7. We want F(7).',
  },
  {
    title: 'Tabulation table',
    detail:
      'Index: 0 1 2 3 4 5 6 7\nValue: 0 1 1 2 3 5 8 13',
  },
  {
    title: 'Rolling variables',
    detail:
      'Start (prev2, prev1) = (0, 1). Update 5 times to reach (8, 13). The answer is 13.',
  },
]

const algorithmComparison = [
  {
    heading: 'Naive recursion',
    bullets: [
      'Time O(phi^n), space O(n) for call stack depth.',
      'Great for teaching overlap, useless for production.',
    ],
  },
  {
    heading: 'Memoization',
    bullets: [
      'Time O(n), space O(n). Caches results to avoid recomputation.',
      'Easy to retrofit on recursive code but has call overhead.',
    ],
  },
  {
    heading: 'Tabulation',
    bullets: [
      'Time O(n), space O(1) with rolling variables.',
      'Fastest constant factors for a single query.',
    ],
  },
  {
    heading: 'Fast doubling',
    bullets: [
      'Time O(log n), space O(1). Works well for very large n.',
      'Uses identities derived from squaring the companion matrix.',
    ],
  },
]

const fastDoublingIdentities = [
  {
    title: 'Even index',
    detail: 'F(2k) = F(k) * (2 * F(k+1) - F(k))',
  },
  {
    title: 'Odd index',
    detail: 'F(2k+1) = F(k+1)^2 + F(k)^2',
  },
  {
    title: 'Why it helps',
    detail:
      'Each step halves n, similar to exponentiation by squaring, yielding logarithmic recursion depth.',
  },
]

const matrixView = [
  {
    title: 'Companion matrix',
    detail:
      'M = [[1, 1], [1, 0]]. Then M^n = [[F(n+1), F(n)], [F(n), F(n-1)]].',
  },
  {
    title: 'Binary exponentiation',
    detail:
      'Compute M^n in O(log n) multiplications by squaring and multiplying when bits are set.',
  },
  {
    title: 'Generalization',
    detail:
      'The matrix method extends cleanly to k-order linear recurrences by using a k x k companion matrix.',
  },
]

const complexityTradeoffs = [
  'Naive recursion: O(phi^n). Educational for showing overlap, impractical beyond around n = 40.',
  'Tabulation with rolling variables: O(n) time, O(1) space, best constant factors for single queries.',
  'Memoization: O(n) time and space but often slower than tabulation due to function-call overhead.',
  'Fast doubling or matrix exponentiation: O(log n) time, O(1) space, shines for very large n or many large queries.',
  'Closed form: O(1) operations but subject to floating error; trustworthy only up to about n = 70 in double precision.',
]

const applications = [
  'Capacity planning with lag: inventory replenishment where today depends on two prior weeks, a Fibonacci-like recurrence.',
  'Heap and tree analyses: Fibonacci heaps, binomial trees, and AVL balance proofs bound node degrees with Fibonacci growth.',
  'Search and hashing: Fibonacci hashing and interpolation choose probe gaps tied to golden ratio spacing for cache-friendly spread.',
  'Graphics and modeling: phyllotaxis spirals, L-systems, and procedural plant models often lean on Fibonacci angles and counts.',
  'Failure story: naive recursion in a production endpoint led to timeouts at n = 45; fast doubling cut latency to microseconds.',
]

const examples = [
  {
    title: 'Bottom-up O(n) with rolling variables',
    code: `function fib(n):
    if n < 0: error "non-negative only"
    if n == 0: return 0
    prev2 = 0  // F(0)
    prev1 = 1  // F(1)
    for i in range(2, n + 1):
        cur = prev1 + prev2
        prev2 = prev1
        prev1 = cur
    return prev1`,
    explanation:
      'Constant space, linear time, branch-free inside the loop. Great baseline for most applications.',
  },
  {
    title: 'Memoized recursion',
    code: `function fibMemo(n, memo):
    if n < 2: return n
    if memo[n] exists: return memo[n]
    memo[n] = fibMemo(n-1, memo) + fibMemo(n-2, memo)
    return memo[n]`,
    explanation:
      'Good for illustrating overlap and caching. Adds recursion overhead but keeps the math readable.',
  },
  {
    title: 'Fast doubling O(log n)',
    code: `function fibDoubling(n):
    if n == 0: return (0, 1)  // (F(n), F(n+1))
    (a, b) = fibDoubling(n // 2)
    c = a * (2 * b - a)      // F(2k)
    d = a * a + b * b        // F(2k + 1)
    if n is even:
        return (c, d)
    else:
        return (d, c + d)`,
    explanation:
      'Divide-and-conquer mirrors exponentiation by squaring. Depth O(log n) avoids stack blowups for huge n.',
  },
  {
    title: 'Matrix power O(log n) with binary exponentiation',
    code: `function matMul(A, B):
    return [[A00*B00 + A01*B10, A00*B01 + A01*B11],
            [A10*B00 + A11*B10, A10*B01 + A11*B11]]

function matPow(M, n):
    R = identity2
    while n > 0:
        if n is odd: R = matMul(R, M)
        M = matMul(M, M)
        n = n // 2
    return R

function fibMatrix(n):
    if n == 0: return 0
    return matPow([[1,1],[1,0]], n - 1)[0][0]`,
    explanation:
      'Linear algebra view: repeated squaring of the companion matrix yields F(n). Useful for k-order recurrences.',
  },
]

const pitfalls = [
  'Naive recursion is exponential and exhausts stacks; never ship it beyond teaching demos.',
  'Integer overflow hits early with 32-bit ints; prefer bigints or modular arithmetic for large n.',
  'Floating point Binet drifts for n greater than roughly 70 with double precision; always round and validate.',
  'Off-by-one seeds: choose F(0) = 0, F(1) = 1 and stay consistent across APIs and tests.',
  'Memoization can thrash caches for many distinct n; prefer tabulation or doubling for repeated queries.',
]

const decisionGuidance = [
  'Single query, moderate n (less than 1e7): choose rolling O(n) tabulation for simplicity and cache friendliness.',
  'Very large n (hundreds of thousands or more): choose fast doubling or matrix power for O(log n) time and O(1) space.',
  'Streaming many queries of increasing n: precompute once with tabulation and reuse the array.',
  'Working modulo M (hashing, coding puzzles): apply mod at each add and multiply; doubling identities still hold.',
  'Need proofs or generalizations: use the matrix or characteristic polynomial view to extend to k-order recurrences.',
]

const advancedInsights = [
  'Pisano periods: Fibonacci modulo m repeats with a period, enabling fast modulo queries and detecting cycles.',
  'Zeckendorf representation: every positive integer is a sum of nonconsecutive Fibonacci numbers, the basis for Fibonacci coding.',
  'Fast doubling derives directly from squaring the companion matrix, showing how divide-and-conquer mirrors algebra.',
  'In Fibonacci heaps, node degree is bounded by log_phi(n); the sequence controls consolidation complexity.',
  'Runtime proofs for AVL trees and binomial heaps reuse the same recurrence, making Fibonacci a template for many analyses.',
]

const miniFaq = [
  {
    question: 'Why does the naive recursion blow up so fast?',
    answer:
      'The call tree duplicates subproblems. F(n) calls F(n-1) and F(n-2), which both compute F(n-3), and so on.',
  },
  {
    question: 'Is memoization always slower than tabulation?',
    answer:
      'Not always, but often. Memoization pays function-call and map overhead; tabulation is a tight loop.',
  },
  {
    question: 'When should I use fast doubling?',
    answer:
      'When n is huge or you need many large queries. It gives O(log n) time without heavy matrices.',
  },
  {
    question: 'Can I compute Fibonacci with negative n?',
    answer:
      'Yes with the negafibonacci identity: F(-n) = (-1)^(n+1) * F(n). It is rarely needed in practice.',
  },
]

const takeaways = [
  'Fibonacci is the smallest recurrence that still shows overlapping subproblems and optimal substructure.',
  'Tabulation gives O(n) time; fast doubling gives O(log n) with simple identities.',
  'Base cases and consistent indexing matter more than any optimization.',
  'Matrix and characteristic polynomial views generalize to other linear recurrences.',
  'Know the numeric limits: overflow and floating error are the real traps.',
]

export default function FibonacciSequencePage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Fibonacci Sequence</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">
                Dynamic programming starts here: the smallest overlapping-subproblem recurrence that still teaches every core trick.
              </div>
              <p className="win95-text">
                Fibonacci numbers expose how recursion explodes, how caching tames it, and how algebra unlocks logarithmic speed. This
                page moves from formal definition to algorithmic choices, with worked examples, identities, and real trade-offs.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Fibonacci is a compact demo of dynamic programming: a tiny recurrence that still produces overlapping subproblems.
                Start with naive recursion (exponential), add memoization (linear), then switch to tabulation (linear but faster).
                Finally, use algebraic identities for fast doubling or matrices (logarithmic).
              </p>
              <p className="win95-text">
                The same reasoning underlies heap analyses, tree balance proofs, hashing spreads, and probabilistic models. Misusing
                it also has stakes: naive recursion in a production API can blow up latency, while a thoughtful DP or doubling
                solution finishes instantly even for very large n.
              </p>
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
            <legend>Historical context</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {history.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
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
            <legend>Recurrence breakdown</legend>
            <div className="win95-grid win95-grid-3">
              {recurrenceBreakdown.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked example (n = 7)</legend>
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
            <legend>Algorithm comparison</legend>
            <div className="win95-grid win95-grid-4">
              {algorithmComparison.map((block) => (
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
            <legend>Fast doubling identities</legend>
            <div className="win95-grid win95-grid-3">
              {fastDoublingIdentities.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Matrix view</legend>
            <div className="win95-grid win95-grid-3">
              {matrixView.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and trade-offs</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {complexityTradeoffs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications and real-world stakes</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {applications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
