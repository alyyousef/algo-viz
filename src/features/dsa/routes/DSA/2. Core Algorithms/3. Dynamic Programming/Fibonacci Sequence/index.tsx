import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const history = [
  '600-200 BCE, Indian prosody texts by Pingala and Virahanka describe similar recurrences for counting syllable patterns.',
  '1202, Leonardo of Pisa (Fibonacci) publishes Liber Abaci to model rabbit populations and popularizes the sequence in Europe.',
  '1843, Jacques Binet formalizes the closed form using the golden ratio roots of the characteristic polynomial.',
  'Late 1900s, algorithm texts (Knuth, CLRS) adopt matrix and fast-doubling derivations to teach divide-and-conquer.',
]

const mechanics = [
  {
    heading: 'Recurrence and mental model',
    bullets: [
      'F(n) = F(n-1) + F(n-2) with seeds F(0) = 0, F(1) = 1; a two-state memory system that only remembers the last two observations.',
      'Optimal substructure: each term is optimal given optimal smaller terms; overlapping subproblems cause naive recursion to explode.',
      'Characteristic polynomial x^2 = x + 1 has roots phi and psi, explaining exponential growth at rate phi^n / sqrt(5).',
    ],
  },
  {
    heading: 'Bottom-up tabulation',
    bullets: [
      'Allocate fib[0..n], seed fib[0]=0, fib[1]=1, then march upward; each step reuses two prior cells.',
      'Time O(n), space O(n); reduce to O(1) by keeping two rolling values and discarding the array.',
      'Modulo arithmetic keeps values bounded for hashing or coding competitions, with no effect on asymptotics.',
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

const complexityTradeoffs = [
  'Naive recursion: T(n) approximates O(phi^n); educational for showing overlap, impractical beyond around n=40.',
  'Tabulation with rolling variables: O(n) time, O(1) space, best constant factors for single queries.',
  'Memoization: O(n) time and space but often slower than tabulation due to function-call overhead.',
  'Fast doubling or matrix exponentiation: O(log n) time, O(1) space, shines for very large n or many large queries.',
  'Closed form: O(1) operations but subject to floating error; trustworthy only up to about n=70 in double precision.',
]

const applications = [
  'Capacity planning with lag: inventory replenishment where today depends on two prior weeks, a natural Fibonacci-like recurrence.',
  'Heap and tree analyses: Fibonacci heaps, binomial trees, and AVL balance proofs bound node degrees with Fibonacci growth.',
  'Search and hashing: Fibonacci hashing and interpolation choose probe gaps tied to golden ratio spacing for cache-friendly spread.',
  'Graphics and modeling: phyllotaxis spirals, L-systems, and procedural plant models often lean on Fibonacci angles and counts.',
  'Failure story: using naive recursion in a production endpoint led to request timeouts at n=45; switching to fast doubling cut latency from seconds to microseconds.',
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
      'Divide-and-conquer mirrors exponentiation by squaring. Depth O(log n) avoids stack blowups and runs quickly for huge n.',
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
      'Linear algebra view: repeated squaring of the companion matrix yields F(n). Useful when generalizing to higher-order recurrences.',
  },
]

const pitfalls = [
  'Naive recursion is exponential and exhausts stacks; never ship it beyond teaching demos.',
  'Integer overflow hits early with 32-bit ints; prefer bigints or modular arithmetic for large n.',
  'Floating point Binet drifts for n greater than roughly 70 with double precision; always round and validate.',
  'Off-by-one seeds: choose F(0)=0, F(1)=1 and stay consistent across APIs and tests.',
  'Memoization can thrash caches for many distinct n; prefer tabulation or doubling for repeated queries.',
]

const decisionGuidance = [
  'Single query, moderate n (<1e7): choose rolling O(n) tabulation for simplicity and cache friendliness.',
  'Very large n (hundreds of thousands or more): choose fast doubling or matrix power for O(log n) time and O(1) space.',
  'Streaming many queries of increasing n: precompute once with tabulation and reuse the array.',
  'Working modulo M (hashing, crypto puzzles): apply mod at each add and multiply; doubling identities still hold.',
  'Need proofs or generalizations: use the matrix or characteristic polynomial view to extend to k-order linear recurrences.',
]

const advancedInsights = [
  'Pisano periods: Fibonacci modulo m repeats with a period, enabling fast modulo queries and detecting cycles.',
  'Zeckendorf representation: every positive integer is a sum of nonconsecutive Fibonacci numbers, the basis for Fibonacci coding.',
  'Fast doubling derives directly from squaring the companion matrix, showing how divide-and-conquer mirrors algebra.',
  'In Fibonacci heaps, node degree is bounded by log_phi(n); the sequence controls consolidation complexity.',
  'Runtime proofs for AVL trees and binomial heaps reuse the same recurrence, making Fibonacci a template for many analyses.',
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
                Fibonacci numbers expose how recursion explodes, how caching tames it, and how algebra unlocks logarithmic speed. The
                same reasoning underlies heap analyses, tree balance proofs, hashing spreads, and probabilistic models in real systems.
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
                This is the canonical recurrence with both optimal substructure and overlapping subproblems. Move from naive recursion
                to bottom-up tabulation to fast doubling and you traverse the exact spectrum of dynamic programming choices: exponential,
                linear, logarithmic. Each step shows a different lever for turning mathematical identities into runtime savings.
              </p>
              <p className="win95-text">
                Beyond textbook rabbits, the pattern describes backlog forecasting, heap degree bounds, and spacing in hashing.
                Misusing it also has stakes: naive recursion in a production API can blow up latency, while a thoughtful DP or doubling
                solution finishes instantly even for very large n.
              </p>
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
        </div>
      </div>
    </div>
  )
}

