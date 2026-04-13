import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Sun Zi hints at modular puzzles (3rd-5th century)',
    detail:
      'The "Sun Zi Suan Jing" describes remainder puzzles that later inspired the named theorem, showing early modular reasoning.',
  },
  {
    title: 'Formalization in number theory (1700s)',
    detail:
      'Euler and Gauss placed CRT into a formal arithmetic framework, proving existence and uniqueness of solutions.',
  },
  {
    title: 'Rise of modular arithmetic in cryptography (1970s)',
    detail:
      'Public key systems used modular arithmetic at scale, making CRT a practical optimization technique.',
  },
  {
    title: 'Modern computing and mixed radix (1990s-2000s)',
    detail:
      'CRT became a core tool for big integer libraries, using mixed radix to accelerate multiplication and reductions.',
  },
]

const mentalModels = [
  {
    title: 'Multiple clocks, one time',
    detail:
      'Each congruence is a clock with its own period. CRT finds the unique time that matches all clocks together.',
  },
  {
    title: 'Lock and key from remainders',
    detail:
      'Remainders are partial keys. CRT builds the single integer that matches every lock simultaneously.',
  },
  {
    title: 'Reconstructing a signal',
    detail:
      'Each modulus is a sensor that only reports a remainder. CRT reconstructs the full value from those slices.',
  },
  {
    title: 'Solve once, reuse',
    detail:
      'Precompute inverse pieces so each new set of remainders can be stitched quickly into a full solution.',
  },
]

const coreStatements = [
  {
    title: 'Pairwise coprime case',
    detail:
      'If moduli m1..mk are pairwise coprime, there is exactly one solution modulo M = m1 * m2 * ... * mk.',
  },
  {
    title: 'General case',
    detail:
      'If moduli are not coprime, a solution exists only when all congruences agree modulo each gcd. The solution is unique modulo lcm of all moduli.',
  },
  {
    title: 'Constructive nature',
    detail:
      'CRT is not just existence: it provides a direct formula using modular inverses to build the solution.',
  },
]

const notationTable = [
  { symbol: 'x', meaning: 'Unknown integer we want to reconstruct' },
  { symbol: 'ai', meaning: 'Remainder for modulus mi (x = ai mod mi)' },
  { symbol: 'mi', meaning: 'Moduli, typically positive integers' },
  { symbol: 'M', meaning: 'Product of moduli, M = m1 * m2 * ... * mk' },
  { symbol: 'Mi', meaning: 'Partial product M / mi' },
  { symbol: 'inv_i', meaning: 'Modular inverse of Mi modulo mi' },
]

const constructionSteps = [
  {
    title: 'Pairwise coprime construction',
    detail: [
      'Compute M = m1 * m2 * ... * mk.',
      'For each i, compute Mi = M / mi.',
      'Find inv_i such that Mi * inv_i = 1 (mod mi).',
      'Compute x = sum(ai * Mi * inv_i) mod M.',
      'Return x as the unique solution modulo M.',
    ],
  },
  {
    title: 'General case construction',
    detail: [
      'Combine congruences two at a time using extended gcd.',
      'For x = a (mod m) and x = b (mod n), let g = gcd(m, n).',
      'If a != b (mod g), there is no solution.',
      'Otherwise, build solution modulo lcm(m, n) and continue merging.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'With k moduli, the dominant cost is extended gcd and modular inverses: O(k log M) for typical integer sizes.',
  },
  {
    title: 'Space cost',
    detail: 'Memory is linear in the number of moduli plus the size of big integers if M is large.',
  },
  {
    title: 'Precision and overflow',
    detail:
      'Intermediate products can exceed native integer ranges. Big integer arithmetic or careful modular multiplication is required.',
  },
  {
    title: 'Precomputation benefits',
    detail:
      'When moduli are fixed, precompute Mi and inv_i once. Each new remainder vector becomes a fast dot product.',
  },
]

const realWorldUses = [
  {
    context: 'Cryptography (RSA)',
    detail:
      'CRT speeds up modular exponentiation by splitting work across prime factors and recombining results.',
  },
  {
    context: 'Scheduling and calendars',
    detail:
      'Find the next time when periodic events align, like maintenance cycles or repeating timers.',
  },
  {
    context: 'Distributed systems',
    detail:
      'Shard identifiers can be reconstructed from remainders, useful for consistent hashing and recovery.',
  },
  {
    context: 'Error correction and coding',
    detail:
      'Redundant modular representations enable reconstruction even with partial information.',
  },
  {
    context: 'Computer graphics and signal processing',
    detail: 'CRT is used in number theoretic transforms and convolution algorithms.',
  },
  {
    context: 'Competitive programming',
    detail: 'Combines constraints from multiple modular equations into a single solvable result.',
  },
]

const examples = [
  {
    title: 'Classic coprime example',
    code: `Solve:
x = 2 (mod 3)
x = 3 (mod 5)
x = 2 (mod 7)

M = 3 * 5 * 7 = 105
M1 = 35, inv1 = 35^-1 mod 3 = 2
M2 = 21, inv2 = 21^-1 mod 5 = 1
M3 = 15, inv3 = 15^-1 mod 7 = 1

x = 2*35*2 + 3*21*1 + 2*15*1 = 140 + 63 + 30 = 233
x = 233 mod 105 = 23`,
    explanation:
      'The unique solution is x = 23 modulo 105. Every number of the form 23 + 105t satisfies all three congruences.',
  },
  {
    title: 'Non-coprime but consistent',
    code: `Solve:
x = 2 (mod 4)
x = 4 (mod 6)

g = gcd(4, 6) = 2
2 = 4 (mod 2) so a solution exists.
One solution is x = 10, and the modulus is lcm(4, 6) = 12.

All solutions: x = 10 (mod 12)`,
    explanation:
      'Consistency is checked with the gcd. The solution is unique modulo the lcm, not the product.',
  },
  {
    title: 'Batch recombination formula',
    code: `Given fixed moduli:
M = m1 * m2 * ... * mk
Mi = M / mi
inv_i = Mi^-1 mod mi

For each new remainder vector a_i:
x = sum(a_i * Mi * inv_i) mod M`,
    explanation:
      'This is the high-throughput mode: precompute Mi and inv_i once and reuse them for many queries.',
  },
]

const pitfalls = [
  'Forgetting to check gcd consistency when moduli are not coprime.',
  'Assuming uniqueness modulo product even when moduli share factors.',
  'Computing modular inverses without verifying gcd(Mi, mi) = 1.',
  'Overflowing native integers when multiplying large moduli.',
  'Mixing negative residues without normalizing to a standard range.',
  'Using CRT formulas with zero or negative moduli.',
]

const decisionGuidance = [
  'Use CRT when you need to solve multiple modular constraints at once.',
  'Use the pairwise coprime formula for speed and simplicity.',
  'Use the general gcd-based merge when moduli may share factors.',
  'Avoid CRT if moduli are huge and you cannot handle big integer arithmetic.',
  'Prefer precomputation when many queries share the same moduli.',
]

const advancedInsights = [
  {
    title: 'Garner algorithm (mixed radix)',
    detail:
      'Garner builds the solution digit by digit in a mixed radix system, often avoiding big intermediate products.',
  },
  {
    title: 'Uniqueness modulo lcm',
    detail:
      'In the general case, CRT gives a solution modulo the least common multiple of all moduli, not their product.',
  },
  {
    title: 'CRT in rings',
    detail:
      'The theorem generalizes to polynomial rings and other algebraic structures, enabling fast transforms.',
  },
  {
    title: 'CRT for RSA optimization',
    detail:
      'Compute a^d mod p and a^d mod q separately, then recombine to recover mod pq with large speedups.',
  },
  {
    title: 'Handling negative residues',
    detail:
      'Normalize residues into [0, mi - 1] to simplify comparisons and avoid subtle sign bugs.',
  },
  {
    title: 'Streaming recombination',
    detail:
      'You can merge congruences incrementally as new constraints arrive, useful for interactive solvers.',
  },
]

const takeaways = [
  'CRT reconstructs a number from its remainders, providing a unique solution modulo a composite base.',
  'Pairwise coprime moduli give a clean formula; shared factors require gcd checks and lcm modulus.',
  'Modular inverses and extended gcd are the core computational tools.',
  'Precomputation makes CRT a fast recombination engine for repeated queries.',
  'Be mindful of overflow and normalization when working with large moduli.',
]

const quickGlossary = [
  {
    term: 'Congruence',
    definition:
      'A statement like x = a (mod m), meaning x and a leave the same remainder modulo m.',
  },
  { term: 'Modulus', definition: 'The base m used in modular arithmetic.' },
  { term: 'Pairwise coprime', definition: 'A set of moduli where every distinct pair has gcd 1.' },
  { term: 'Modular inverse', definition: 'A value inv such that a * inv = 1 (mod m).' },
  {
    term: 'Extended gcd',
    definition:
      'An algorithm that computes gcd(a, b) and Bezout coefficients, enabling inverse and merge steps.',
  },
  {
    term: 'Least common multiple',
    definition: 'The smallest positive number divisible by all involved moduli.',
  },
  {
    term: 'Mixed radix',
    definition: 'A representation system used by Garner-style CRT reconstruction.',
  },
  {
    term: 'Partial product',
    definition: 'The value Mi = M / mi used in the classic coprime CRT formula.',
  },
  {
    term: 'Normalization',
    definition: 'Converting residues into a standard range such as [0, m - 1].',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-theorem', label: 'Theorem Statements' },
    { id: 'core-notation', label: 'Notation' },
    { id: 'core-construction', label: 'Construction' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-code', label: 'Worked Examples' },
    { id: 'ex-walkthrough', label: 'Construction Walkthrough' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ChineseRemainderTheoremCRTPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Chinese Remainder Theorem (CRT)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Chinese Remainder Theorem (CRT)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Chinese Remainder Theorem (CRT)</h1>
      <p>
        CRT answers a simple but powerful question: if you know the remainders of a number when
        divided by several moduli, can you reconstruct the number? When the moduli are compatible,
        the answer is yes, and there is a single answer modulo a composite base. This page gives the
        theorem, the construction, and the practical pitfalls.
      </p>
      <p>
        This page keeps the material as a help document: use the tabs to switch sections, the
        contents pane to jump within the current tab, or return to the{' '}
        <Link to="/algoViz" className="bin98-inline-link">
          catalog
        </Link>
        .
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Chinese Remainder Theorem is a bridge between local views of a number (its remainders)
              and the global number itself. It turns several modular equations into one consolidated
              result, enabling fast computations and elegant reasoning across number theory,
              cryptography, and scheduling problems.
            </p>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <p>
              CRT is fast when moduli are small or precomputed, but it can become a big integer
              problem when the product grows. Plan for large intermediate values or use algorithms
              that avoid large products.
            </p>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <section id="core-theorem" className="bin98-section">
            <h2 className="bin98-heading">Theorem Statements</h2>
            {coreStatements.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-notation" className="bin98-section">
            <h2 className="bin98-heading">Notation</h2>
            {notationTable.map((row) => (
              <p key={row.symbol}>
                <strong>{row.symbol}:</strong> {row.meaning}
              </p>
            ))}
          </section>

          <section id="core-construction" className="bin98-section">
            <h2 className="bin98-heading">Construction</h2>
            {constructionSteps.map((step) => (
              <div key={step.title}>
                <h3 className="bin98-subheading">{step.title}</h3>
                <ul>
                  {step.detail.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p>
              <strong>Classic formula:</strong> The formula `x = sum(ai * Mi * inv_i) mod M` is the
              classic CRT construction. It relies on the fact that `Mi` is zero in all moduli except
              `mi`, and `inv_i` restores it to `1` in that modulus.
            </p>
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Tradeoffs</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
          </section>

          <section id="core-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Worked Examples</h2>
            {examples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <pre>{example.code}</pre>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-walkthrough" className="bin98-section">
            <h2 className="bin98-heading">Construction Walkthrough</h2>
            {constructionSteps.map((step) => (
              <div key={step.title}>
                <h3 className="bin98-subheading">{step.title}</h3>
                <ol>
                  {step.detail.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ol>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
