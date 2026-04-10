import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Eratosthenes introduces the sieve (3rd century BCE)',
    detail:
      'The method appears in ancient Greek mathematics as a systematic way to enumerate primes by crossing out multiples.',
  },
  {
    title: 'Early number theory formalizes primes as building blocks (17th century)',
    detail:
      'Work by Fermat, Euler, and others positioned primes as the atoms of arithmetic, motivating efficient enumeration.',
  },
  {
    title: 'Modern computation adopts sieving (20th century)',
    detail:
      'With computers, sieves became the standard way to generate primes for testing, tables, and cryptographic tooling.',
  },
  {
    title: 'Segmented and wheel sieves scale the idea (late 20th century)',
    detail:
      'Optimizations reduce memory and skip obvious composites, enabling prime generation at much larger ranges.',
  },
  {
    title: 'Bitset implementations become the norm (present)',
    detail:
      'Efficient bit arrays make sieving fast and cache-friendly, turning the algorithm into a low-level performance benchmark.',
  },
]

const mentalModels = [
  {
    title: 'Crossing out multiples on a number line',
    detail:
      'Start with 2, cross out every multiple. Move to the next uncrossed number, repeat until done.',
  },
  {
    title: 'Filters stacked in order',
    detail:
      'Each prime acts like a filter that removes numbers with that factor. What passes through all filters are primes.',
  },
  {
    title: 'Stop at the square root',
    detail:
      'Any composite n has a factor at most sqrt(n). Once you have sieved with primes up to sqrt(n), the rest are prime.',
  },
  {
    title: 'Paint bucket for composites',
    detail:
      'Think of a board of integers. Each prime pours paint on its multiples; unpainted cells are primes.',
  },
  {
    title: 'Windows over a huge range',
    detail:
      'Segmented sieves slide a fixed-size window across [1..N], reusing memory while keeping the same logic.',
  },
]

const coreSteps = [
  {
    title: 'Initialize the table',
    detail: 'Create a boolean array isPrime[0..n]. Mark 0 and 1 as false, assume 2..n are true.',
  },
  {
    title: 'Pick the next prime',
    detail:
      'Scan from p = 2 upward. When isPrime[p] is true, p is prime and should be used to cross out multiples.',
  },
  {
    title: 'Cross out multiples',
    detail:
      'Mark p*p, p*p+p, p*p+2p, ... as false. Starting at p*p avoids redundant work already done by smaller primes.',
  },
  {
    title: 'Stop at sqrt(n)',
    detail:
      'When p*p > n, all remaining true entries are prime, because any composite would have had a small factor.',
  },
  {
    title: 'Collect the primes',
    detail: 'Read off indices still marked true. This is your list of primes up to n.',
  },
  {
    title: 'Return usable artifacts',
    detail:
      'You can return the prime list, a count of primes, or the boolean table for fast primality queries.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant: marked means composite',
    detail:
      'Only multiples of known primes are marked. Every marked number has a factor, so it is composite.',
  },
  {
    title: 'Invariant: unmarked primes remain',
    detail:
      'No prime is a multiple of a smaller prime. Therefore no prime is ever marked by the crossing step.',
  },
  {
    title: 'Sqrt boundary proof',
    detail:
      'If n is composite, n = a * b with a <= b. Then a <= sqrt(n), so a will be found and mark n.',
  },
  {
    title: 'Start at p*p',
    detail: 'For k < p, p*k has a smaller factor k and was already marked when k was processed.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'The sieve runs in O(n log log n) time. It is much faster than checking each number individually.',
  },
  {
    title: 'Space cost',
    detail: 'The basic sieve uses O(n) space for the boolean table. Bitsets cut this by 8x.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Sequential memory access makes the sieve cache-friendly, especially with a compact bitset.',
  },
  {
    title: 'Scaling to large n',
    detail: 'Segmented sieves keep memory bounded while preserving near-linear throughput.',
  },
  {
    title: 'Parallelism',
    detail: 'Segments can be processed independently once base primes up to sqrt(n) are known.',
  },
  {
    title: 'Precision tradeoff',
    detail: 'Sieve is exact, not probabilistic. It guarantees primality within the chosen range.',
  },
]

const optimizations = [
  {
    title: 'Start at p*p',
    detail:
      'Eliminates redundant work that would be done by smaller primes; essential for efficiency.',
  },
  {
    title: 'Skip even numbers',
    detail: 'Store only odds after handling 2. This halves memory and nearly halves work.',
  },
  {
    title: 'Bitset representation',
    detail:
      'Pack flags into bits instead of bytes for 8x smaller memory and better cache utilization.',
  },
  {
    title: 'Segmented sieve',
    detail: 'Process [low..high] windows using base primes. Avoids allocating large arrays.',
  },
  {
    title: 'Wheel factorization',
    detail:
      'Skip multiples of the first few primes (2, 3, 5) by jumping through a repeating pattern.',
  },
  {
    title: 'Precompute base primes',
    detail: 'Only primes up to sqrt(n) are needed to sieve any range. Reuse them across queries.',
  },
]

const realWorldUses = [
  {
    context: 'Prime tables and research',
    detail:
      'Generate lists of primes for number theory experiments, verification, and educational tools.',
  },
  {
    context: 'Cryptography tooling',
    detail: 'Fast prime generation for testing candidates and building key material workflows.',
  },
  {
    context: 'Competitive programming',
    detail: 'A standard technique for precomputing primes and smallest prime factors.',
  },
  {
    context: 'Hashing and randomness',
    detail: 'Primes are used in hashing, mod operations, and constructing pseudo-random sequences.',
  },
  {
    context: 'Mathematical APIs',
    detail: 'Primality queries in libraries often use a sieve precomputation for fast lookups.',
  },
  {
    context: 'Systems benchmarks',
    detail:
      'Sieve implementations stress memory bandwidth and cache, making them useful microbenchmarks.',
  },
]

const examples = [
  {
    title: 'Basic sieve (pseudocode)',
    code: `function sieve(n):
    isPrime = array(n + 1, true)
    isPrime[0] = false
    isPrime[1] = false

    p = 2
    while p * p <= n:
        if isPrime[p]:
            for multiple = p * p; multiple <= n; multiple += p:
                isPrime[multiple] = false
        p += 1

    primes = []
    for i = 2..n:
        if isPrime[i]: primes.push(i)
    return primes`,
    explanation:
      'The core sieve marks multiples starting at p*p and collects remaining true indices as primes.',
  },
  {
    title: 'Segmented sieve (windowed range)',
    code: `function segmentedSieve(n):
    limit = floor(sqrt(n))
    basePrimes = sieve(limit)
    low = 2
    high = low + limit
    result = []

    while low <= n:
        mark = array(high - low + 1, true)
        for p in basePrimes:
            start = max(p * p, ceil(low / p) * p)
            for x = start; x <= high; x += p:
                mark[x - low] = false
        for i = 0..(high - low):
            if mark[i] and (low + i) >= 2: result.push(low + i)
        low = high + 1
        high = min(low + limit, n)
    return result`,
    explanation: 'Segmented sieves keep memory small and are the standard choice when n is large.',
  },
  {
    title: 'Counting primes up to n',
    code: `function countPrimes(n):
    isPrime = boolean array(n + 1, true)
    isPrime[0] = isPrime[1] = false
    for p = 2; p * p <= n; p++:
        if isPrime[p]:
            for m = p * p; m <= n; m += p:
                isPrime[m] = false
    count = 0
    for i = 2..n:
        if isPrime[i]: count += 1
    return count`,
    explanation:
      'If you only need the count, you can skip building a list and just tally the true entries.',
  },
]

const pitfalls = [
  'Forgetting to mark 0 and 1 as non-prime.',
  'Starting crossings at 2p instead of p*p, which wastes time.',
  'Using an array of booleans for huge n without considering memory.',
  'Not handling even numbers separately when optimizing to odds-only storage.',
  'Overflow when computing p*p for large n; use 64-bit arithmetic.',
  'Assuming the sieve works for arbitrary intervals without segmenting.',
]

const decisionGuidance = [
  'Need all primes up to a limit: use the classic sieve.',
  'Need primes in a large range or very large n: use a segmented sieve.',
  'Need fast primality queries for many numbers: precompute a sieve once.',
  'Need only one primality test for a huge number: use probabilistic tests instead.',
  'Memory constrained environment: store odds only or use a bitset.',
  'Parallel environment: precompute base primes and segment work across threads.',
]

const takeaways = [
  'The sieve is the fastest exact method for generating all primes up to n.',
  'Starting at p*p and stopping at sqrt(n) are the key efficiency insights.',
  'Memory layout matters: bitsets and odds-only storage enable scale.',
  'Segmented sieves keep the same logic while handling very large ranges.',
  'The output can be a list, a count, or a reusable primality lookup table.',
]

const glossaryTerms = [
  {
    term: 'Prime',
    definition: 'An integer greater than 1 with no positive divisors other than 1 and itself.',
  },
  {
    term: 'Composite',
    definition: 'An integer greater than 1 that has a non-trivial factorization.',
  },
  {
    term: 'Sieve',
    definition:
      'A process that removes invalid candidates systematically until the desired set remains.',
  },
  {
    term: 'Bitset',
    definition:
      'A compact representation that stores boolean flags as individual bits instead of bytes.',
  },
  {
    term: 'Segmented sieve',
    definition: 'A variant that sieves a range in windows so memory use stays bounded.',
  },
  {
    term: 'Wheel factorization',
    definition: 'A skipping pattern that avoids obvious composites based on small primes.',
  },
]

const notationTable = [
  { symbol: 'n', meaning: 'Upper bound of the range being sieved' },
  { symbol: 'p', meaning: 'Current prime candidate used to mark multiples' },
  { symbol: 'isPrime[i]', meaning: 'Boolean flag showing whether i is still considered prime' },
  { symbol: 'low, high', meaning: 'Current segment boundaries in a segmented sieve' },
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
    { id: 'bp-uses', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-steps', label: 'Step By Step' },
    { id: 'core-correctness', label: 'Correctness' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-optimizations', label: 'Optimizations' },
    { id: 'core-guidance', label: 'When To Use It' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'examples-worked', label: 'Worked Examples' },
    { id: 'examples-snapshot', label: 'Complexity Snapshot' },
  ],
  glossary: [
    { id: 'glossary-notation', label: 'Notation' },
    { id: 'glossary-terms', label: 'Terms' },
  ],
}

export default function SieveOfEratosthenesPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Sieve of Eratosthenes',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Sieve of Eratosthenes"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Sieve of Eratosthenes</h1>
      <p className="sieve98-intro">
        The sieve of Eratosthenes generates every prime up to a limit by repeatedly striking out
        multiples of each prime. Instead of testing each number independently, it builds a shared
        table of composite markers. The result is a fast, exact, and highly cache-friendly algorithm
        that scales to large ranges with simple optimizations.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              The sieve treats primes as the source of all composites. By marking every multiple of
              each prime, the numbers left unmarked are guaranteed prime. This transforms the task
              from many separate primality tests into one coordinated sweep.
            </p>
            <p>
              The sieve wins whenever you need many primes in a bounded range. It trades one-time
              preprocessing and memory for extremely fast queries and a complete prime list.
            </p>
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

          <section id="bp-uses" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
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
          <section id="core-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-steps" className="bin98-section">
            <h2 className="bin98-heading">Step By Step</h2>
            {coreSteps.map((step, index) => (
              <p key={step.title}>
                <strong>
                  {index + 1}. {step.title}:
                </strong>{' '}
                {step.detail}
              </p>
            ))}
          </section>

          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness</h2>
            {correctnessNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
            <p>
              The sieve is correct because it only removes numbers that have a smaller prime factor,
              and every composite has such a factor. What remains is exactly the set of primes.
            </p>
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
          </section>

          <section id="core-optimizations" className="bin98-section">
            <h2 className="bin98-heading">Optimizations</h2>
            {optimizations.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-guidance" className="bin98-section">
            <h2 className="bin98-heading">When To Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="examples-worked" className="bin98-section">
            <h2 className="bin98-heading">Worked Examples</h2>
            {examples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="examples-snapshot" className="bin98-section">
            <h2 className="bin98-heading">Complexity Snapshot</h2>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Variant</th>
                  <th>Time</th>
                  <th>Space</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Classic sieve</td>
                  <td>O(n log log n)</td>
                  <td>O(n)</td>
                  <td>Fastest for moderate n with full list.</td>
                </tr>
                <tr>
                  <td>Odd-only sieve</td>
                  <td>O(n log log n)</td>
                  <td>O(n / 2)</td>
                  <td>Skip evens after handling 2.</td>
                </tr>
                <tr>
                  <td>Segmented sieve</td>
                  <td>O(n log log n)</td>
                  <td>O(sqrt(n))</td>
                  <td>Uses window size around sqrt(n).</td>
                </tr>
              </tbody>
            </table>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <>
          <section id="glossary-notation" className="bin98-section">
            <h2 className="bin98-heading">Notation</h2>
            <table className="bin98-table">
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
          </section>

          <section id="glossary-terms" className="bin98-section">
            <h2 className="bin98-heading">Terms</h2>
            <dl>
              {glossaryTerms.map((item) => (
                <div key={item.term}>
                  <dt>{item.term}</dt>
                  <dd>{item.definition}</dd>
                </div>
              ))}
            </dl>
          </section>
        </>
      )}
    </TopicPageShell>
  )
}
