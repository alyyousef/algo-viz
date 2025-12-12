import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'
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
  { title: '300 BCE: Euclid', detail: 'GCD algorithm formalized; still the backbone of inverses and Diophantine solutions.' },
  { title: '1640: Fermat Little Theorem', detail: 'Basis for modular inverses and primality testing tricks.' },
  { title: '1965: Cooley-Tukey FFT', detail: 'Dropped convolution from quadratic to n log n, enabling modern signal processing.' },
  { title: '1976-1977: Miller-Rabin and RSA', detail: 'Probabilistic primality checks and public-key crypto galvanized modular arithmetic in software.' },
  { title: '1990s: NTT in competitive programming', detail: 'Prime-friendly FFT variants made integer convolutions exact under modulus.' },
]

const pillars = [
  { title: 'Fixed modulus discipline', detail: 'Pick one modulus per computation; stay prime for easy inverses or fall back to xgcd.' },
  { title: 'Overflow awareness', detail: 'Use 128-bit widening or splitting for products; avoid UB in languages with silent wrap quirks.' },
  { title: 'Precompute aggressively', detail: 'Factorials, inverse factorials, powers, logs save repeated O(n) work across queries.' },
  { title: 'Canonical forms', detail: 'Normalize negatives ((x % mod) + mod) % mod; consistent representations prevent mismatch.' },
  { title: 'Edge-case proofs', detail: 'CRT with non-coprime moduli, zero factorial, and empty sums need explicit handling.' },
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
  { approach: 'Euclid / extended GCD', time: 'O(log min(a,b))', space: 'O(1)', note: 'Bezout coefficients enable inverses and CRT.' },
  { approach: 'Fast modular exponentiation', time: 'O(log e)', space: 'O(1)', note: 'Binary exponentiation; safe with 128-bit multiply.' },
  { approach: 'Sieve of Eratosthenes', time: 'O(n log log n)', space: 'O(n)', note: 'Linear sieve reduces constant factors.' },
  { approach: 'FFT/NTT convolution', time: 'O(n log n)', space: 'O(n)', note: 'Requires root of unity; pad to power of two or use Bluestein.' },
  { approach: 'nCk with precomputation', time: 'O(N) prep + O(1) query', space: 'O(N)', note: 'Factorials and inverse factorials under prime mod.' },
  { approach: 'Miller-Rabin primality (k rounds)', time: 'O(k log^3 n)', space: 'O(1)', note: 'Deterministic bases exist for 64-bit n.' },
]

const applications = [
  {
    title: 'Cryptography',
    detail: 'Modular exponentiation, inverses, and CRT underpin RSA, Diffie-Hellman, and signature schemes.',
  },
  {
    title: 'Competitive programming',
    detail: 'nCk mod p, fast power, and inclusion-exclusion solve counting, DP, and probability problems under tight limits.',
  },
  {
    title: 'Signal processing and substring similarity',
    detail: 'FFT/NTT accelerate convolution for polynomial multiply, cross-correlation, and wildcard substring scoring.',
  },
  {
    title: 'Linear recurrences',
    detail: 'Matrix exponentiation or linear recurrences with exponentiation answer k-th term queries in logarithmic time.',
  },
  {
    title: 'Scheduling with congruences',
    detail: 'CRT and modular arithmetic solve alignment and cycle problems in calendars or distributed systems.',
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
    detail: 'Handle arbitrary lengths without heavy padding; keeps precision better for awkward sizes.',
  },
  {
    title: 'NTT-friendly primes',
    detail: 'Pick moduli with primitive roots (e.g., 998244353) to simplify integer convolutions.',
  },
  {
    title: 'Baby-step giant-step',
    detail: 'Solves discrete logs in O(sqrt n) time/space; handy for multiplicative order problems.',
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

export default function MathematicalAlgorithmsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Mathematical Algorithms"
      subtitle="Number theory, combinatorics, and algebraic power tools"
      intro="Math kernels like gcd, modular inverses, sieves, and transforms turn hard problems into mechanical steps. Discipline with moduli, proofs, and precomputation keeps answers correct at scale."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-2">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History">
        <div className="grid gap-3 md:grid-cols-2">
          {history.map((event) => (
            <article key={event.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{event.title}</h3>
              <p className="text-sm text-white/80">{event.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core pillars and mental hooks">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="text-sm text-white/80">{pillar.detail}</p>
              </article>
            ))}
          </div>
          <div className="space-y-3">
            {mentalModels.map((model) => (
              <article key={model.title} className="rounded-lg bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{model.title}</h3>
                <p className="text-sm text-white/80">{model.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-2">
          {howItWorks.map((item) => (
            <article key={item.step} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{item.step}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity reference">
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-white/10 text-xs uppercase tracking-wide text-white/70">
              <tr>
                <th className="px-4 py-2">Approach</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Space</th>
                <th className="px-4 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="odd:bg-white/5">
                  <td className="px-4 py-2 font-semibold text-white">{row.approach}</td>
                  <td className="px-4 py-2">{row.time}</td>
                  <td className="px-4 py-2">{row.space}</td>
                  <td className="px-4 py-2 text-white/70">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <p className="text-sm font-semibold text-white">{failureCallout.title}</p>
          <p className="text-sm text-red-100">{failureCallout.detail}</p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls">
        <ul className="space-y-2 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item} className="rounded-lg bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use what">
        <ul className="space-y-2 text-sm text-white/80">
          {whenToUse.map((item) => (
            <li key={item} className="rounded-lg border border-white/10 bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Advanced moves">
        <div className="grid gap-3 md:grid-cols-2">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="grid gap-3 md:grid-cols-2">
          {codeExamples.map((example) => (
            <article key={example.title} className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="overflow-x-auto rounded bg-black/40 p-3 text-xs text-white">
                <code>{example.code}</code>
              </pre>
              <p className="text-xs text-white/70">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2">
          {keyTakeaways.map((item) => (
            <article key={item} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
