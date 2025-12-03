import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mechanics = [
  {
    heading: 'Recurrence',
    bullets: [
      'F(n) = F(n-1) + F(n-2) with seeds F(0) = 0, F(1) = 1.',
      'Optimal substructure: each number depends only on two smaller subproblems.',
      'Overlapping subproblems: naive recursion recomputes the same values exponentially.',
    ],
  },
  {
    heading: 'Bottom-up tabulation',
    bullets: [
      'Fill an array fib[0..n], starting from the seeds and walking upward.',
      'Each step is O(1); total time O(n) and space O(n) (or O(1) if you keep two rolling values).',
      'Use modulo arithmetic when values must stay bounded for contests or hashing.',
    ],
  },
  {
    heading: 'Space and time optimizations',
    bullets: [
      'Iterative O(1) space keeps only previous two values.',
      'Fast doubling computes (F(n), F(n+1)) in O(log n) using exponentiation by squaring style recurrences.',
      'Matrix exponentiation with [[1,1],[1,0]]^n reaches O(log n) with clean linear algebra justification.',
    ],
  },
]

const examples = [
  {
    title: 'Bottom-up O(n) with rolling variables',
    code: `function fib(n):
    if n == 0: return 0
    prev2 = 0
    prev1 = 1
    for i in range(2, n + 1):
        cur = prev1 + prev2
        prev2 = prev1
        prev1 = cur
    return prev1`,
    explanation:
      'The minimal DP: constant space, linear time, and no recursion depth issues.',
  },
  {
    title: 'Fast doubling O(log n)',
    code: `function fibDoubling(n):
    if n == 0: return (0, 1)  // (F(n), F(n+1))
    (a, b) = fibDoubling(n // 2)
    c = a * (2 * b - a)
    d = a * a + b * b
    if n is even:
        return (c, d)
    else:
        return (d, c + d)`,
    explanation:
      'Divide-and-conquer uses algebraic identities to jump powers of two, delivering logarithmic time.',
  },
]

const pitfalls = [
  'Naive recursion is exponential (O(phi^n)) and blows the call stack; use DP or doubling.',
  'Integer overflow appears quickly; pick bigints or modular arithmetic for large n.',
  'Memoization caches may be slower than tabulation for simple linear recurrences due to overhead.',
]

const decisionGuidance = [
  'Need small to medium n with simplicity: use bottom-up O(n) with rolling variables.',
  'Need very large n: use fast doubling or matrix exponentiation (O(log n)).',
  'Need values modulo M: apply mod at every operation to avoid overflow.',
  'Need many queries: precompute once with tabulation and reuse, or use doubling for per-query log time.',
]

export default function FibonacciSequencePage(): JSX.Element {
  return (
    <TopicLayout
      title="Fibonacci Sequence"
      subtitle="A gentle introduction to dynamic programming"
      intro="Fibonacci numbers are the simplest showcase of optimal substructure and overlapping subproblems. Moving from naive recursion to tabulation or fast doubling illustrates how dynamic programming turns exponential recomputation into linear or logarithmic work."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Fibonacci recurrences power examples from rabbit populations to heap sizes and skip lists. The key lesson is that
          overlapping subproblems invite caching or bottom-up construction, shrinking exponential trees into straight-line loops.
        </p>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
