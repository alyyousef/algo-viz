import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const numberTheory = [
  {
    title: 'GCD and extended GCD',
    detail:
      'Euclid gives gcd in logarithmic steps; the extended version also returns Bezout coefficients to solve ax + by = gcd(a, b) and power modular inverses.',
  },
  {
    title: 'Modular arithmetic toolkit',
    detail:
      'Fast exponentiation, modular inverses, and modular multiplication with overflow-safe techniques (64-bit widening or splitting) keep crypto-style math stable.',
  },
  {
    title: 'Prime sieves and factorization',
    detail:
      'Sieve of Eratosthenes or linear sieve precompute primes; trial division with precomputed primes factors moderate sizes before Pollard Rho for larger inputs.',
  },
  {
    title: 'Chinese Remainder Theorem',
    detail:
      'CRT stitches congruences together when moduli are coprime (or pairwise solvable). Useful for splitting big mod space into safer, smaller components.',
  },
]

const combinatorics = [
  {
    title: 'Binomial coefficients and Pascal',
    detail:
      'Precompute factorials and inverse factorials under a modulus to answer nCk in O(1). Use Pascal triangles for small constraints or dynamic construction.',
  },
  {
    title: 'Inclusion-exclusion',
    detail:
      'Alternate adds/subtracts of overlapping sets to count unions. Works cleanly when you can enumerate intersections quickly.',
  },
  {
    title: 'Stars and bars / partitions',
    detail:
      'Classic mapping from distributing indistinguishable items into bins; reduces to binomial coefficients with boundary tweaks for lower bounds.',
  },
  {
    title: 'Catalan and combinatorial DP',
    detail:
      'Catalan numbers count balanced structures (BSTs, parenthesizations). Often emerge from small recurrences or DP with constrained transitions.',
  },
]

const geometryAdjacents = [
  'Modular matrix exponentiation for linear recurrences and paths counted on DAGs.',
  'Discrete logarithm approaches (baby-step giant-step) for multiplicative groups when you need to solve a^x = b (mod m).',
  'Fast Fourier Transform (FFT/NTT) for polynomial multiplication, convolution, and substring frequency cross-correlation.',
  'Mobius inversion and prefix-sum tricks over divisors for multiplicative function queries (phi, mu, divisor sums).',
]

const checklists = [
  'Fix your modulus early and keep it prime when you need inverses everywhere; fall back to extended GCD when it is not.',
  'Normalize negatives: wrap values with ((x % mod) + mod) % mod to avoid surprises across languages.',
  'Guard overflow in products before taking mod; use 128-bit paths or split multiplication when the platform is tight.',
  'Precompute factorials/inverses once per test set and reuse; rebuilding per query costs O(n) instead of O(1).',
  'Stress-test degenerate inputs: zero, one, non-coprime moduli in CRT, and maximal n/k in combinations.',
]

export default function MathematicalAlgorithmsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Mathematical Algorithms"
      subtitle="Number theory, combinatorics, and algebraic tools"
      intro="Math-heavy problems reward reusable building blocks: gcd and inverses for equations, sieves for primes, modular exponentiation for scaling, and combinatorial identities for counts."
    >
      <TopicSection heading="Number theory toolkit">
        <div className="grid gap-3 md:grid-cols-2">
          {numberTheory.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Counting patterns and identities">
        <div className="grid gap-3 md:grid-cols-2">
          {combinatorics.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Higher-leverage moves">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {geometryAdjacents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Correctness and performance checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {checklists.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
