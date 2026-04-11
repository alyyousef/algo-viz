import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Math as a reusable engine',
    detail:
      'Number theory, combinatorics, and algebraic transforms show up in crypto, DSP, and contests. Small reusable kernels pay off everywhere.',
    note: 'Prevents re-deriving tools under deadline pressure.',
  },
  {
    title: 'Modular arithmetic as a safety rail',
    detail:
      'Working mod p keeps numbers bounded and invertible (when p is prime). Correct modulus handling is the difference between AC and WA.',
    note: 'Stops overflow and undefined inverses.',
  },
  {
    title: 'Transforms to shrink complexity',
    detail:
      'FFT/NTT swap O(n^2) convolution for O(n log n). Matrix exponentiation turns linear recurrences into logarithmic time.',
    note: 'Saves minutes or hours on large inputs.',
  },
  {
    title: 'Proof-backed correctness',
    detail:
      'Mathematical identities justify optimizations (CRT, inclusion-exclusion, Fermat). Without the proof, the shortcut is just a bug waiting.',
    note: 'Keeps optimizations honest when inputs are adversarial.',
  },
]

const history = [
  {
    title: '300 BCE: Euclid',
    detail: 'GCD algorithm formalized; still the backbone of inverses and Diophantine solutions.',
  },
  {
    title: '1640: Fermat Little Theorem',
    detail: 'Basis for modular inverses and primality testing tricks.',
  },
  {
    title: '1965: Cooley-Tukey FFT',
    detail: 'Dropped convolution from quadratic to n log n, enabling modern signal processing.',
  },
  {
    title: '1976-1977: Miller-Rabin and RSA',
    detail:
      'Probabilistic primality checks and public-key crypto galvanized modular arithmetic in software.',
  },
  {
    title: '1990s: NTT in competitive programming',
    detail: 'Prime-friendly FFT variants made integer convolutions exact under modulus.',
  },
]

const pillars = [
  {
    title: 'Fixed modulus discipline',
    detail: 'Pick one modulus per computation; stay prime for easy inverses or fall back to xgcd.',
  },
  {
    title: 'Overflow awareness',
    detail:
      'Use 128-bit widening or splitting for products; avoid UB in languages with silent wrap quirks.',
  },
  {
    title: 'Precompute aggressively',
    detail: 'Factorials, inverse factorials, powers, logs save repeated O(n) work across queries.',
  },
  {
    title: 'Canonical forms',
    detail:
      'Normalize negatives ((x % mod) + mod) % mod; consistent representations prevent mismatch.',
  },
  {
    title: 'Edge-case proofs',
    detail: 'CRT with non-coprime moduli, zero factorial, and empty sums need explicit handling.',
  },
]

const mentalModels = [
  {
    title: 'Modulus as a clock',
    detail:
      'All arithmetic wraps around a clock of size mod. Inverses exist only when the hand and clock are coprime.',
  },
  {
    title: 'Transforms as lenses',
    detail:
      'FFT/NTT change the basis so convolution becomes pointwise multiply, like moving to frequency space to simplify products.',
  },
  {
    title: 'CRT as stitching quilts',
    detail:
      'You solve pieces on small moduli (patches) and stitch them into a single answer that matches all patches.',
  },
  {
    title: 'Inclusion-exclusion as alternating paint',
    detail:
      'Add broad strokes, subtract overlaps, add intersections of three, and so on until the exact area is painted.',
  },
]

const howItWorks = [
  {
    step: '1. Define the numeric domain',
    detail:
      'Choose integer vs modular arithmetic, decide on modulus, and clarify whether inverses are guaranteed.',
  },
  {
    step: '2. Build primitives',
    detail:
      'Implement gcd/xgcd, fast power, modular multiply (overflow-safe), factorials and inverse factorials, sieve for primes.',
  },
  {
    step: '3. Choose the right identity',
    detail:
      'Pick Fermat/CRT for inverses and congruences, inclusion-exclusion for overlapping counts, transforms for convolutions.',
  },
  {
    step: '4. Precompute once',
    detail:
      'Fill tables (fact, inv, powers, logs) to answer queries in O(1) or O(log n); avoid rebuilding per test case.',
  },
  {
    step: '5. Guard edge cases',
    detail:
      'Handle zero, negatives, non-coprime moduli, empty intersections, and sizes that overflow intermediate products.',
  },
  {
    step: '6. Verify with small cases',
    detail:
      'Cross-check against brute force for tiny n/k or small mod; unit-test identities before scaling.',
  },
]

const complexityTable = [
  {
    approach: 'Euclid / extended GCD',
    time: 'O(log min(a,b))',
    space: 'O(1)',
    note: 'Bezout coefficients enable inverses and CRT.',
  },
  {
    approach: 'Fast modular exponentiation',
    time: 'O(log e)',
    space: 'O(1)',
    note: 'Binary exponentiation; safe with 128-bit multiply.',
  },
  {
    approach: 'Sieve of Eratosthenes',
    time: 'O(n log log n)',
    space: 'O(n)',
    note: 'Linear sieve reduces constant factors.',
  },
  {
    approach: 'FFT/NTT convolution',
    time: 'O(n log n)',
    space: 'O(n)',
    note: 'Requires root of unity; pad to power of two or use Bluestein.',
  },
  {
    approach: 'nCk with precomputation',
    time: 'O(N) prep + O(1) query',
    space: 'O(N)',
    note: 'Factorials and inverse factorials under prime mod.',
  },
  {
    approach: 'Miller-Rabin primality (k rounds)',
    time: 'O(k log^3 n)',
    space: 'O(1)',
    note: 'Deterministic bases exist for 64-bit n.',
  },
]

const applications = [
  {
    title: 'Cryptography',
    detail:
      'Modular exponentiation, inverses, and CRT underpin RSA, Diffie-Hellman, and signature schemes.',
  },
  {
    title: 'Competitive programming',
    detail:
      'nCk mod p, fast power, and inclusion-exclusion solve counting, DP, and probability problems under tight limits.',
  },
  {
    title: 'Signal processing and substring similarity',
    detail:
      'FFT/NTT accelerate convolution for polynomial multiply, cross-correlation, and wildcard substring scoring.',
  },
  {
    title: 'Linear recurrences',
    detail:
      'Matrix exponentiation or linear recurrences with exponentiation answer k-th term queries in logarithmic time.',
  },
  {
    title: 'Scheduling with congruences',
    detail:
      'CRT and modular arithmetic solve alignment and cycle problems in calendars or distributed systems.',
  },
]

const failureCallout = {
  title: 'Failure story: mixed moduli',
  detail:
    'A contest solution precomputed factorials mod 1e9+7 but answered queries mod 998244353. Results were wrong only on large cases. Fix: pin a single modulus per dataset, rebuild tables when modulus changes, and assert modulus consistency in helpers.',
}

const pitfalls = [
  'Using Fermat for inverses when the modulus is not prime or the number is not coprime.',
  'Overflowing 64-bit products before taking mod; use 128-bit or split multiplication.',
  'Applying CRT without checking gcd of moduli; solutions may not exist or need adjustment.',
  'Negatives not normalized before mod operations lead to off-by-mod errors.',
  'Recomputing factorials per query wastes O(n) and TLEs on multi-test inputs.',
]

const whenToUse = [
  'Use Euclid/xgcd for gcd, inverses with non-prime mod, and CRT stitching.',
  'Use fast power for exponentiation under mod and for binary exponent identities.',
  'Use sieve for bulk prime generation; use Miller-Rabin for large single primality checks.',
  'Use FFT/NTT for polynomial multiplication or convolution beyond a few thousand points.',
  'Use precomputed nCk tables for repeated combination queries; use Lucas or DP when n exceeds table limits.',
]

const advanced = [
  {
    title: 'Montgomery and Barrett reduction',
    detail: 'Avoid division in modular multiply; critical for big-integer or SIMD-heavy contexts.',
  },
  {
    title: 'Garner CRT reconstruction',
    detail: 'Incremental CRT avoids large intermediates; useful when combining many small moduli.',
  },
  {
    title: 'Bluestein and mixed-radix FFT',
    detail:
      'Handle arbitrary lengths without heavy padding; keeps precision better for awkward sizes.',
  },
  {
    title: 'NTT-friendly primes',
    detail: 'Pick moduli with primitive roots (e.g., 998244353) to simplify integer convolutions.',
  },
  {
    title: 'Baby-step giant-step',
    detail:
      'Solves discrete logs in O(sqrt n) time/space; handy for multiplicative order problems.',
  },
]

const codeExamples = [
  {
    title: 'Extended GCD and modular inverse',
    code: `function xgcd(a: number, b: number): [number, number, number] {
  if (b === 0) return [a, 1, 0]
  const [g, x1, y1] = xgcd(b, a % b)
  return [g, y1, x1 - Math.floor(a / b) * y1]
}

function modInverse(a: number, mod: number) {
  const [g, x] = xgcd(a, mod)
  if (g !== 1) return undefined // inverse does not exist
  return ((x % mod) + mod) % mod
}`,
    explanation:
      'Computes Bezout coefficients and returns an inverse when gcd is 1. Normalizes the result into [0, mod).',
  },
  {
    title: 'nCk mod prime with precomputation',
    code: `const MOD = 1_000_000_007
const MAXN = 1_000_000
const fact = Array(MAXN + 1).fill(1)
const invFact = Array(MAXN + 1).fill(1)

for (let i = 1; i <= MAXN; i++) fact[i] = (fact[i - 1] * i) % MOD
invFact[MAXN] = modInverse(fact[MAXN], MOD)!
for (let i = MAXN; i > 0; i--) invFact[i - 1] = (invFact[i] * i) % MOD

function nCk(n: number, k: number) {
  if (k < 0 || k > n) return 0
  return (((fact[n] * invFact[k]) % MOD) * invFact[n - k]) % MOD
}`,
    explanation:
      'Precomputes factorials and inverse factorials once, then answers nCk in O(1). Assumes MOD is prime for Fermat-based inverses.',
  },
]

const keyTakeaways = [
  'Pick and stick to a modulus; normalize all values consistently.',
  'Precompute factorials, inverses, and primes to turn slow queries into O(1) answers.',
  'Guard against overflow in modular multiplies; never assume hashes or inverses just work.',
  'Use transforms and matrix exponentiation to drop complexities from quadratic to near-linear or logarithmic.',
  'Test identities on small cases before trusting them at scale or under adversarial inputs.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'takeaways'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'takeaways', label: 'Takeaways' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'overview', label: 'Overview' },
    { id: 'big-picture', label: 'Big picture' },
    { id: 'history', label: 'History' },
    { id: 'applications', label: 'Applications' },
  ],
  'core-concepts': [
    { id: 'core-pillars-and-mental-hooks', label: 'Core pillars and mental hooks' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'complexity-reference', label: 'Complexity reference' },
    { id: 'advanced-moves', label: 'Advanced moves' },
  ],
  examples: [
    { id: 'failure-mode', label: 'Failure mode' },
    { id: 'code-examples', label: 'Code examples' },
  ],
  takeaways: [
    { id: 'pitfalls', label: 'Pitfalls' },
    { id: 'when-to-use-what', label: 'When to use what' },
    { id: 'key-takeaways', label: 'Key takeaways' },
  ],
}

export default function MathematicalAlgorithmsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Mathematical Algorithms',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Mathematical Algorithms"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Mathematical Algorithms</h1>
      <p className="bin98-doc-subtitle">Number theory, combinatorics, and algebraic power tools.</p>

      {activeTab === 'big-picture' && (
        <>
          <section id="overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <div className="bin98-subheading">
              Number theory, combinatorics, and algebraic power tools
            </div>
            <p>
              Math kernels like gcd, modular inverses, sieves, and transforms turn hard problems
              into mechanical steps. Discipline with moduli, proofs, and precomputation keeps
              answers correct at scale.
            </p>
          </section>

          <section id="big-picture" className="bin98-section">
            <h2 className="bin98-heading">Big picture</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="history" className="bin98-section">
            <h2 className="bin98-heading">History</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {history.map((event) => (
                <div key={event.title} className="bin98-section">
                  <div className="bin98-subheading">{event.title}</div>
                  <p>{event.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {applications.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars-and-mental-hooks" className="bin98-section">
            <h2 className="bin98-heading">Core pillars and mental hooks</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="bin98-section">
                    <div className="bin98-subheading">{pillar.title}</div>
                    <p>{pillar.detail}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {mentalModels.map((model) => (
                  <div key={model.title} className="bin98-section">
                    <div className="bin98-subheading">{model.title}</div>
                    <p>{model.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="how-it-works" className="bin98-section">
            <h2 className="bin98-heading">How it works</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {howItWorks.map((item) => (
                <div key={item.step} className="bin98-section">
                  <div className="bin98-subheading">{item.step}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="complexity-reference" className="bin98-section">
            <h2 className="bin98-heading">Complexity reference</h2>
            <div className="bin98-section">
              <table className="bin98-table">
                <thead>
                  <tr>
                    <th>Approach</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {complexityTable.map((row) => (
                    <tr key={row.approach}>
                      <td>{row.approach}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="advanced-moves" className="bin98-section">
            <h2 className="bin98-heading">Advanced moves</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {advanced.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="failure-mode" className="bin98-section">
            <h2 className="bin98-heading">Failure mode</h2>
            <div className="bin98-section">
              <div className="bin98-subheading">{failureCallout.title}</div>
              <p>{failureCallout.detail}</p>
            </div>
          </section>

          <section id="code-examples" className="bin98-section">
            <h2 className="bin98-heading">Code examples</h2>
            <div className="space-y-4">
              {codeExamples.map((example) => (
                <div key={example.title} className="bin98-section">
                  <div className="bin98-subheading">{example.title}</div>
                  <pre className="bin98-codebox">
                    <code>{example.code}</code>
                  </pre>
                  <p>{example.explanation}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'takeaways' && (
        <>
          <section id="pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls</h2>
            <div className="bin98-section">
              <ul className="list-disc pl-5 space-y-2">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="when-to-use-what" className="bin98-section">
            <h2 className="bin98-heading">When to use what</h2>
            <div className="bin98-section">
              <ol className="list-decimal pl-5 space-y-2">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </section>

          <section id="key-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key takeaways</h2>
            <div className="bin98-section">
              <ul className="list-disc pl-5 space-y-2">
                {keyTakeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </TopicPageShell>
  )
}
