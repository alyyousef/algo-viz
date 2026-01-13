import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Modular arithmetic in classical number theory',
    detail:
      'Fermat and Euler used modular powers to prove number theory results, motivating efficient exponentiation.',
  },
  {
    title: 'Fast powering appears in algorithms (1960s-1970s)',
    detail:
      'Binary exponentiation becomes a standard technique to reduce exponentiation from linear to logarithmic time.',
  },
  {
    title: 'Public key cryptography (1970s)',
    detail:
      'RSA and Diffie-Hellman rely on modular exponentiation with huge integers, making performance essential.',
  },
  {
    title: 'Big integer libraries (1990s-2000s)',
    detail:
      'Libraries optimize modular multiplication and exponentiation using Montgomery and sliding-window methods.',
  },
]

const mentalModels = [
  {
    title: 'Square-and-reduce',
    detail:
      'Exponentiation is just repeated squaring with modular reduction after every step.',
  },
  {
    title: 'Exponent in binary',
    detail:
      'Read the exponent bits and multiply the answer only when a bit is set.',
  },
  {
    title: 'Bounded growth',
    detail:
      'The modulus acts like a fence, keeping numbers from exploding in size.',
  },
  {
    title: 'Fast powering engine',
    detail:
      'Powering is the same core idea as fast doubling in Fibonacci or exponentiation by squaring in algebra.',
  },
]

const coreStatements = [
  {
    title: 'Modular reduction rule',
    detail:
      '(a * b) mod m = ((a mod m) * (b mod m)) mod m, so you can reduce at every step.',
  },
  {
    title: 'Exponentiation by squaring',
    detail:
      'Compute a^e by squaring and halving the exponent: O(log e) multiplications.',
  },
  {
    title: 'Binary decomposition',
    detail:
      'If e = sum of powers of two, then a^e is the product of the corresponding squared bases.',
  },
]

const notationTable = [
  { symbol: 'a', meaning: 'Base integer' },
  { symbol: 'e', meaning: 'Exponent (non-negative integer)' },
  { symbol: 'm', meaning: 'Modulus (positive integer)' },
  { symbol: 'result', meaning: 'Final value of a^e mod m' },
]

const constructionSteps = [
  {
    title: 'Binary modular exponentiation',
    detail: [
      'Set result = 1 and base = a mod m.',
      'While e > 0: if e is odd, result = (result * base) mod m.',
      'Set base = (base * base) mod m, e = floor(e / 2).',
      'When e = 0, result is a^e mod m.',
    ],
  },
  {
    title: 'Repeated squaring table',
    detail: [
      'Precompute a^(1), a^(2), a^(4), a^(8), ... by squaring.',
      'Multiply only the powers corresponding to 1 bits in e.',
      'Reduce modulo m after every multiplication.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'O(log e) multiplications and squarings. Each multiplication is modulo m.',
  },
  {
    title: 'Space cost',
    detail:
      'O(1) extra memory for iterative exponentiation.',
  },
  {
    title: 'Big integer cost',
    detail:
      'For large m, multiplication dominates. Use fast multiplication or Montgomery reduction for speed.',
  },
  {
    title: 'Precomputation tradeoff',
    detail:
      'Sliding-window methods precompute small powers to reduce multiplications at the cost of extra memory.',
  },
]

const realWorldUses = [
  {
    context: 'RSA encryption and decryption',
    detail:
      'Core RSA operations are modular exponentiations with large exponents and moduli.',
  },
  {
    context: 'Diffie-Hellman key exchange',
    detail:
      'Computes g^a mod p and g^b mod p efficiently to derive shared secrets.',
  },
  {
    context: 'Primality testing',
    detail:
      'Algorithms like Fermat and Miller-Rabin use modular exponentiation repeatedly.',
  },
  {
    context: 'Hashing and checksums',
    detail:
      'Rolling hash functions can use modular powers to update hash values quickly.',
  },
  {
    context: 'Competitive programming',
    detail:
      'Many problems require computing a^b mod m under large constraints.',
  },
  {
    context: 'Cryptographic protocols',
    detail:
      'Signatures, commitments, and zero-knowledge proofs often rely on modular powers.',
  },
]

const examples = [
  {
    title: 'Compute 7^13 mod 20',
    code: `Exponent bits: 13 = 1101 (binary)
Start: result = 1, base = 7 mod 20

e=13 (odd): result = 1*7 mod 20 = 7
base = 7^2 mod 20 = 49 mod 20 = 9
e=6

e=6 (even): result = 7
base = 9^2 mod 20 = 81 mod 20 = 1
e=3

e=3 (odd): result = 7*1 mod 20 = 7
base = 1^2 mod 20 = 1
e=1

e=1 (odd): result = 7*1 mod 20 = 7
e=0 -> done

Answer: 7`,
    explanation:
      'By reducing at each step, numbers stay small and the result is computed in O(log e) time.',
  },
  {
    title: 'Fast power template',
    code: `function modPow(a, e, m):
    result = 1
    base = a % m
    while e > 0:
        if e % 2 == 1:
            result = (result * base) % m
        base = (base * base) % m
        e = floor(e / 2)
    return result`,
    explanation:
      'This standard loop is the foundation for modular exponentiation in most libraries.',
  },
  {
    title: 'Negative base handling',
    code: `Compute (-3)^5 mod 11
Normalize base: (-3 mod 11) = 8
Compute 8^5 mod 11 = 10`,
    explanation:
      'Always normalize the base into [0, m-1] before exponentiation.',
  },
]

const pitfalls = [
  'Doing a^e first and taking mod at the end, which overflows quickly.',
  'Forgetting to reduce negative bases into the [0, m-1] range.',
  'Assuming modular exponentiation is fast without using log time methods.',
  'Using recursion without tail optimization on very large exponents.',
  'Mixing modulus 0 or negative moduli, which are undefined.',
]

const decisionGuidance = [
  'Use modular exponentiation when you need a^e mod m with large e.',
  'Prefer binary exponentiation for simplicity and speed.',
  'Use sliding-window or Montgomery methods for heavy cryptographic workloads.',
  'Normalize inputs to avoid sign issues and overflow.',
  'Use big integer types when m does not fit in native integers.',
]

const advancedInsights = [
  {
    title: 'Montgomery reduction',
    detail:
      'Avoids expensive division by converting to a Montgomery domain and using shifts and adds.',
  },
  {
    title: 'Sliding-window exponentiation',
    detail:
      'Precomputes odd powers to reduce the number of multiplications for large exponents.',
  },
  {
    title: 'Constant-time implementations',
    detail:
      'Crypto code uses regular control flow to avoid timing side channels.',
  },
  {
    title: 'Exponentiation chains',
    detail:
      'Optimized addition chains reduce multiplications further but are hard to find optimally.',
  },
  {
    title: 'CRT acceleration',
    detail:
      'For RSA, compute mod p and mod q, then recombine with CRT for a big speedup.',
  },
  {
    title: 'Modulus special forms',
    detail:
      'Mersenne and pseudo-Mersenne primes enable faster modular reductions.',
  },
]

const takeaways = [
  'Modular exponentiation keeps values bounded while computing huge powers.',
  'Binary exponentiation cuts time from O(e) to O(log e).',
  'Reduce after every multiplication to avoid overflow.',
  'Performance hinges on fast modular multiplication for big integers.',
  'Used everywhere in cryptography, primality testing, and hashing.',
]

export default function ModularExponentiationPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Modular Exponentiation</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Fast powering under a modulus without overflow</div>
              <p className="win95-text">
                Modular exponentiation computes a^e mod m efficiently by repeatedly squaring and reducing. It is the core
                primitive behind RSA, Diffie-Hellman, and primality tests, turning huge exponents into manageable loops.
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
                Naive exponentiation explodes in size, but modular arithmetic lets you reduce after every multiplication.
                The result is a fast, safe method that runs in logarithmic time and keeps numbers bounded.
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
                The rule (a * b) mod m = ((a mod m) * (b mod m)) mod m lets you reduce every step. This keeps
                intermediate values small and protects against overflow.
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
                For 64-bit integers, modular exponentiation is fast. For 1024-bit or 2048-bit numbers, the
                multiplication algorithm dominates, so optimized big-int math matters.
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

