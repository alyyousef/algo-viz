import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Euclid formalizes gcd (c. 300 BCE)',
    detail:
      'Elements, Book VII introduces the classic method for finding the greatest common divisor via repeated division.',
  },
  {
    title: 'Extended Euclidean Algorithm (Middle Ages)',
    detail:
      'Mathematicians generalize the method to compute coefficients for Bezout identity, enabling modular inverses.',
  },
  {
    title: 'Number theory foundations (1800s)',
    detail:
      'Gauss and others use gcd as a core tool in modular arithmetic and congruence theory.',
  },
  {
    title: 'Modern computing adoption (1900s)',
    detail:
      'GCD becomes a standard primitive in libraries, used in cryptography, rational arithmetic, and algorithms.',
  },
]

const mentalModels = [
  {
    title: 'Repeated remainder shaving',
    detail:
      'Each step replaces the larger number with the remainder, shaving off multiples until only the gcd remains.',
  },
  {
    title: 'Common measure tape',
    detail:
      'If two lengths can be measured by a single tape length, the gcd is the longest such tape that fits both exactly.',
  },
  {
    title: 'Reduction funnel',
    detail:
      'The algorithm funnels big numbers down into smaller and smaller pairs without changing the gcd.',
  },
  {
    title: 'Back-substitution scaffold',
    detail:
      'Every remainder is a linear combination of the original numbers, enabling the extended algorithm.',
  },
]

const coreStatements = [
  {
    title: 'GCD invariance',
    detail:
      'gcd(a, b) = gcd(b, a mod b). Replacing (a, b) with (b, a mod b) preserves the gcd.',
  },
  {
    title: 'Termination',
    detail:
      'The sequence of remainders strictly decreases and reaches zero, making the last non-zero remainder the gcd.',
  },
  {
    title: 'Bezout identity',
    detail:
      'There exist integers x and y such that ax + by = gcd(a, b). Extended Euclid finds them.',
  },
]

const notationTable = [
  { symbol: 'a, b', meaning: 'Input integers (assume non-negative)' },
  { symbol: 'r', meaning: 'Remainder when dividing a by b' },
  { symbol: 'g', meaning: 'Greatest common divisor of a and b' },
  { symbol: 'x, y', meaning: 'Bezout coefficients: ax + by = g' },
]

const constructionSteps = [
  {
    title: 'Basic Euclidean Algorithm',
    detail: [
      'Given a and b with a >= b >= 0.',
      'While b != 0: set (a, b) = (b, a mod b).',
      'When b = 0, the gcd is a.',
    ],
  },
  {
    title: 'Extended Euclidean Algorithm',
    detail: [
      'Track coefficients (x, y) so each remainder is a linear combination of original inputs.',
      'When the remainder reaches 0, the previous coefficients give Bezout identity.',
      'Use the coefficients to compute modular inverses when gcd is 1.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Runs in O(log min(a, b)) steps. Each step is a division, making it very fast in practice.',
  },
  {
    title: 'Space cost',
    detail:
      'O(1) extra space for iterative gcd; O(1) or O(log n) for extended variants depending on implementation.',
  },
  {
    title: 'Worst case inputs',
    detail:
      'Consecutive Fibonacci numbers maximize the number of iterations, explaining the logarithmic bound.',
  },
  {
    title: 'Big integer considerations',
    detail:
      'Division dominates runtime when numbers are huge. Efficient big-int division matters in crypto code.',
  },
]

const realWorldUses = [
  {
    context: 'Fraction simplification',
    detail:
      'Reduce rational numbers by dividing numerator and denominator by gcd.',
  },
  {
    context: 'Modular arithmetic',
    detail:
      'Extended gcd computes modular inverses, required for CRT and RSA key operations.',
  },
  {
    context: 'Cryptography',
    detail:
      'Detect non-coprime keys, compute inverses, and speed up algorithms with gcd checks.',
  },
  {
    context: 'Scheduling and cycles',
    detail:
      'GCD and LCM determine when periodic events overlap.',
  },
  {
    context: 'Geometry and grids',
    detail:
      'Use gcd to step through lattice points and reduce direction vectors.',
  },
  {
    context: 'Hashing and sharding',
    detail:
      'Ensure uniform cycles by verifying moduli are coprime with gcd.',
  },
]

const examples = [
  {
    title: 'Compute gcd(252, 105)',
    code: `252 = 105 * 2 + 42
105 = 42 * 2 + 21
42 = 21 * 2 + 0

gcd = 21`,
    explanation:
      'The last non-zero remainder is 21, so gcd(252, 105) = 21.',
  },
  {
    title: 'Extended Euclid for inverse',
    code: `Find inverse of 17 mod 3120:
3120 = 17 * 183 + 9
17 = 9 * 1 + 8
9 = 8 * 1 + 1
8 = 1 * 8 + 0

Back substitute:
1 = 9 - 8
1 = 9 - (17 - 9) = 2*9 - 17
1 = 2*(3120 - 17*183) - 17 = 2*3120 - 17*367

So inverse of 17 mod 3120 is -367 mod 3120 = 2753`,
    explanation:
      'Since gcd(17, 3120) = 1, the inverse exists. The coefficient of 17 gives the inverse modulo 3120.',
  },
  {
    title: 'Fast gcd loop (iterative)',
    code: `function gcd(a, b):
    while b != 0:
        (a, b) = (b, a % b)
    return a`,
    explanation:
      'The iterative form uses constant memory and is the standard gcd primitive in most libraries.',
  },
]

const pitfalls = [
  'Forgetting to handle negative inputs by normalizing to non-negative values.',
  'Assuming gcd(0, b) is undefined; it equals |b|.',
  'Returning the wrong coefficient from extended gcd when computing inverses.',
  'Overflow when using recursion with very deep stacks (rare but possible).',
  'Confusing gcd with lcm; lcm(a, b) = |a*b| / gcd(a, b).',
]

const decisionGuidance = [
  'Use Euclidean Algorithm whenever you need gcd or coprimality checks.',
  'Use extended Euclid when you need modular inverses or Bezout coefficients.',
  'Prefer iterative gcd for speed and stack safety.',
  'Normalize inputs to non-negative for predictable behavior.',
  'Use big integer libraries when inputs exceed native range.',
]

const advancedInsights = [
  {
    title: 'Binary GCD (Stein algorithm)',
    detail:
      'Replaces division with shifts and subtraction, useful on hardware where division is expensive.',
  },
  {
    title: 'GCD in polynomials',
    detail:
      'The Euclidean Algorithm generalizes to polynomials, enabling factorization and algebraic simplification.',
  },
  {
    title: 'GCD and lattice basis',
    detail:
      'Bezout coefficients correspond to integer combinations that can be interpreted as lattice vectors.',
  },
  {
    title: 'Batch gcd optimization',
    detail:
      'Use prefix and suffix gcd arrays to answer gcd range queries in O(1).',
  },
  {
    title: 'Extended gcd for CRT',
    detail:
      'CRT solvers use extended gcd to merge congruences and to compute modular inverses.',
  },
  {
    title: 'Coprime probability',
    detail:
      'The probability that two random integers are coprime is 6 / pi^2, shaping expected gcd behavior.',
  },
]

const takeaways = [
  'Euclidean Algorithm is the fastest path to gcd, using repeated remainders.',
  'Extended Euclid gives Bezout coefficients and modular inverses.',
  'Runtime is logarithmic in the input size, even in the worst case.',
  'Normalize inputs and handle zeros to avoid edge case bugs.',
  'GCD is foundational across number theory, crypto, and algorithm design.',
]

export default function EuclideanAlgorithmGCDPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Euclidean Algorithm (GCD)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Fast, reliable computation of the greatest common divisor</div>
              <p className="win95-text">
                The Euclidean Algorithm computes gcd(a, b) by repeated division. It is one of the oldest algorithms still
                used today because it is simple, fast, and foundational. Its extended form also produces Bezout coefficients
                needed for modular inverses and CRT.
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
                GCD is the largest integer that divides two numbers without a remainder. Euclid showed that the gcd stays
                the same when you replace the larger number with its remainder by the smaller. That single invariant powers
                an algorithm that shrinks numbers quickly and deterministically.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core idea and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>The theorem in one page</legend>
            <div className="win95-grid win95-grid-2">
              {coreStatements.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">Notation quick reference</div>
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th>Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {notationTable.map((row) => (
                    <tr key={row.symbol}>
                      <td>{row.symbol}</td>
                      <td>{row.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: construction</legend>
            <div className="win95-grid win95-grid-2">
              {constructionSteps.map((step) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">{step.title}</div>
                  <ul className="win95-list">
                    {step.detail.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The extended variant is the bridge from gcd to modular inverses. When gcd(a, b) = 1, the coefficient of a
                in Bezout identity is the inverse of a modulo b.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                For fixed-size integers, gcd is effectively constant time. For big integers, runtime is dominated by division
                and the number of steps grows only logarithmically.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
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
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
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

