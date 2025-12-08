import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Escape adversarial inputs',
    detail:
      'Random choices break the crafted worst cases that doom deterministic heuristics (pivot selection, hashing, probing).',
    note: 'Quicksort and hash tables lean on this to keep operations near linear in practice.',
  },
  {
    title: 'Trade certainty for speed',
    detail:
      'Accept tiny failure probabilities to slash runtime or space, especially when verification or retries are cheap.',
    note: 'Monte Carlo tests and sketches power real-time analytics and compilers alike.',
  },
  {
    title: 'Exploit independence',
    detail: 'Multiple independent trials shrink error exponentially, turning randomness into a tunable confidence knob.',
    note: 'Confidence amplification is standard in primality testing and streaming counts.',
  },
  {
    title: 'Average-case over worst-case',
    detail: 'Design around expectation or high-probability bounds so typical runs stay fast even if worst-case is large.',
    note: 'Skip lists, treaps, and universal hashing are everyday examples.',
  },
]

const history = [
  {
    title: '1975: Rabin primality',
    detail: 'Michael Rabin introduces Monte Carlo primality tests with controllable error probability.',
    note: 'Showed that randomized tests can outperform deterministic checks for cryptography.',
  },
  {
    title: '1976: Karp-Rabin pattern search',
    detail: 'Richard Karp and Michael Rabin use rolling hashes with random bases to spot matches quickly.',
    note: 'Brought randomized hashing to string algorithms with verifiable outputs.',
  },
  {
    title: '1986: Skip lists',
    detail: 'William Pugh replaces balanced-tree rotations with random levels for O(log n) expected operations.',
    note: 'Demonstrated simplicity plus randomness can rival deterministic balancing.',
  },
  {
    title: '1995: Miller-Rabin in practice',
    detail: 'Widespread adoption of Miller-Rabin primality testing in crypto stacks (PGP, OpenSSL).',
    note: 'Established randomized tests as production-grade building blocks.',
  },
]

const pillars = [
  {
    title: 'Clear error model',
    detail: 'Quantify error probability (epsilon) per trial and how repetition reduces it.',
  },
  {
    title: 'Independence or anti-correlation',
    detail: 'Trials must be independent enough for amplification; reuse seeds carefully.',
  },
  {
    title: 'Cheap verification or restart',
    detail: 'Design so incorrect Monte Carlo outputs can be detected or retried.',
  },
  {
    title: 'Adversary awareness',
    detail: 'Choose RNG and hashing resilient to chosen inputs; avoid predictable seeds.',
  },
]

const mentalModels = [
  {
    title: 'Loaded dice with receipts',
    detail:
      'You roll probabilistic dice but keep receipts via verification or repetition. Breaks down if rolls are correlated or unverified.',
  },
  {
    title: 'Shuffle to fairness',
    detail: 'Randomizing order levels the playing field, much like shuffling a deck to prevent stacked hands.',
  },
  {
    title: 'Noise as armor',
    detail:
      'A touch of randomness acts like defensive noise against crafted inputs. Fails if the adversary can predict your generator.',
  },
]

const howItWorks = [
  {
    title: 'Define the random choice',
    detail: 'Pick where randomness enters: pivot, hash function, sample, restart seed, or permutation.',
  },
  {
    title: 'Bound the failure probability',
    detail: 'Analyze per-trial error and how many repetitions drive it below the SLA threshold.',
  },
  {
    title: 'Add verification when possible',
    detail: 'For Monte Carlo, bolt on a cheap checker to catch false positives/negatives.',
  },
  {
    title: 'Isolate the RNG',
    detail: 'Thread seeds through helpers so tests can fix outcomes; swap stronger sources when adversaries exist.',
  },
  {
    title: 'Instrument and retry',
    detail: 'Measure collision rates, pivot quality, or sketch error; rerun or resize samples when drift appears.',
  },
]

const complexityTable = [
  {
    approach: 'Randomized quicksort (shuffled)',
    time: 'O(n log n) expected',
    space: 'O(log n) stack',
    note: 'Shuffling erases bad pivot orders; tail recursion cuts stack depth.',
  },
  {
    approach: 'Miller-Rabin primality',
    time: 'O(k log^3 n)',
    space: 'O(log n)',
    note: 'k rounds; error drops exponentially with k.',
  },
  {
    approach: 'Skip list ops',
    time: 'O(log n) expected',
    space: 'O(n)',
    note: 'Random towers balance paths without rotations.',
  },
  {
    approach: 'Reservoir sampling',
    time: 'O(n)',
    space: 'O(1)',
    note: 'Uniform sample from a stream with one pass.',
  },
]

const applications = [
  {
    title: 'Databases and storage',
    detail: 'Bloom filters and count-min sketches avoid disk hits; randomized skip lists back indexes and LSM trees.',
    note: 'Controlled error slashes IO while keeping recall high.',
  },
  {
    title: 'Networking and load balancing',
    detail: 'Consistent hashing and random early detection spread load and prevent synchronized drops.',
    note: 'Randomization deters hotspot formation under bursty traffic.',
  },
  {
    title: 'Cryptography and compilers',
    detail: 'Miller-Rabin validates primes; randomized register allocation avoids worst-case spill patterns.',
    note: 'Error bounds are tuned to be astronomically low for security.',
  },
  {
    title: 'Machine learning and RL',
    detail: 'Stochastic gradient steps and randomized feature hashing stabilize training and memory use.',
    note: 'Noise helps escape sharp minima and controls feature explosion.',
  },
]

const failureStory =
  'A logging pipeline used a Bloom filter with an overly small bit array; false positives hit 10 percent, silently dropping real alerts. Doubling the bits-per-entry and adding a verification pass cut errors below 0.1 percent within the same latency budget.'

const pitfalls = [
  {
    title: 'Unstated error budgets',
    detail: 'Shipping without an epsilon target makes repetition knobs arbitrary and risks silent failures.',
  },
  {
    title: 'Correlated trials',
    detail: 'Reusing seeds or sharing state across threads breaks independence and stalls error reduction.',
  },
  {
    title: 'Weak randomness under attack',
    detail: 'Predictable RNG or hash choices invite adversarial collisions or timing control.',
  },
  {
    title: 'No verification path',
    detail: 'Monte Carlo outputs without checks can poison downstream systems unnoticed.',
  },
  {
    title: 'Overpaying in retries',
    detail: 'Repeating without measuring marginal gains wastes time when a better heuristic would do more.',
  },
]

const whenToUse = [
  {
    title: 'You can tolerate bounded risk',
    detail: 'Systems allow tiny error if latency and space drop substantially.',
  },
  {
    title: 'Adversarial patterns exist',
    detail: 'Inputs might be crafted; randomness neutralizes worst-case orders and collisions.',
  },
  {
    title: 'Verification is cheaper than precision',
    detail: 'A fast probabilistic answer plus a cheap check beats a costly deterministic run.',
  },
  {
    title: 'Anytime or streaming requirements',
    detail: 'You need answers from partial data (sketches, samples) with tunable confidence.',
  },
]

const advanced = [
  {
    title: 'Universal and 2-independent hashing',
    detail: 'Pick hash families that bound collision probability regardless of input distribution.',
    note: 'Crucial for hash tables, Bloom filters, and consistent hashing rings.',
  },
  {
    title: 'Chernoff and Hoeffding bounds',
    detail: 'Use concentration bounds to size samples and predict deviation probabilities.',
    note: 'Turns fuzziness into concrete SLAs for product teams.',
  },
  {
    title: 'Variance reduction',
    detail: 'Techniques like importance sampling or stratified sampling cut variance for the same sample size.',
    note: 'Used in ray tracing, finance sims, and RL policy evaluation.',
  },
  {
    title: 'Las Vegas with restarts',
    detail: 'Use randomized restarts to avoid pathological paths in exact algorithms (SAT, constraint search).',
    note: 'Converts heavy tails into tight high-probability bounds.',
  },
]

const codeExamples = [
  {
    title: 'Reservoir sampling (size k)',
    code: `function reservoirSample<T>(stream: Iterable<T>, k: number, rnd = Math.random): T[] {
  const bucket: T[] = []
  let count = 0
  for (const item of stream) {
    count++
    if (bucket.length < k) {
      bucket.push(item)
    } else {
      const j = Math.floor(rnd() * count) // pick replacement slot
      if (j < k) bucket[j] = item
    }
  }
  return bucket
}`,
    explanation: 'Keeps a uniform sample from an unbounded stream in O(1) space; inject rnd for reproducible tests.',
  },
  {
    title: 'Miller-Rabin witness loop (core idea)',
    code: `function isProbablePrime(n: number, rounds = 5, rnd = Math.random): boolean {
  if (n < 4) return n > 1
  // write n-1 = d * 2^s
  let d = n - 1
  let s = 0
  while ((d & 1) === 0) {
    d >>= 1
    s++
  }
  // repeat independent trials
  for (let i = 0; i < rounds; i++) {
    const a = 2 + Math.floor(rnd() * (n - 3)) // random base in [2, n-2]
    let x = modPow(a, d, n)
    if (x === 1 || x === n - 1) continue
    let skip = false
    for (let r = 1; r < s; r++) {
      x = modMul(x, x, n)
      if (x === n - 1) {
        skip = true
        break
      }
    }
    if (!skip) return false // composite with high confidence
  }
  return true // probably prime; error <= (1/4)^rounds
}`,
    explanation: 'Each round cuts composite escape probability by at least 4x; injecting rnd and math helpers keeps it testable.',
  },
]

const keyTakeaways = [
  {
    title: 'Randomness is a knob',
    detail: 'Expose seeds and repetition counts so users can trade speed for confidence.',
  },
  {
    title: 'Error must be declared',
    detail: 'State epsilon and how it shrinks; do not hide probabilistic behavior in defaults.',
  },
  {
    title: 'Independence matters',
    detail: 'Reusing randomness can silently void guarantees; seed carefully across threads.',
  },
  {
    title: 'Measure and adapt',
    detail: 'Track collision and failure rates; resize sketches or retries when drift appears.',
  },
]

export default function RandomizedAlgorithmsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Randomized Algorithms"
      subtitle="Harness probability to outpace worst cases"
      intro="Randomized algorithms trade determinism for predictable averages and tunable confidence. By injecting randomness into choices, they neutralize adversaries, shrink memory, and deliver answers within a stated error budget."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History that shaped the paradigm">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {history.map((event) => (
            <article key={event.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">{event.title}</p>
              <p className="text-sm text-white/80">{event.detail}</p>
              <p className="text-xs text-white/60">{event.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Pillars and mental hooks">
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

      <TopicSection heading="How it works, step by step">
        <div className="grid gap-3 md:grid-cols-3">
          {howItWorks.map((step, idx) => (
            <article key={step.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold text-white/60">Step {idx + 1}</p>
              <h3 className="text-sm font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-white/80">{step.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity at a glance">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-white/80">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-white/60">
              <tr>
                <th className="px-3 py-2">Approach</th>
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Space</th>
                <th className="px-3 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="border-b border-white/5">
                  <td className="px-3 py-2 font-semibold text-white">{row.approach}</td>
                  <td className="px-3 py-2 text-white/80">{row.time}</td>
                  <td className="px-3 py-2 text-white/80">{row.space}</td>
                  <td className="px-3 py-2 text-white/70">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Where randomness wins">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((app) => (
            <article key={app.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{app.title}</h3>
              <p className="text-sm text-white/80">{app.detail}</p>
              <p className="text-xs text-white/60">{app.note}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
          <p className="font-semibold text-red-200">Failure mode</p>
          <p>{failureStory}</p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls to avoid">
        <div className="space-y-2 rounded-lg bg-white/5 p-4">
          {pitfalls.map((item) => (
            <div key={item.title} className="rounded-md border border-white/5 p-3">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When to reach for randomness">
        <div className="space-y-2 rounded-lg bg-white/5 p-4">
          {whenToUse.map((item) => (
            <div key={item.title} className="rounded-md border border-white/5 p-3">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Advanced moves">
        <div className="grid gap-3 md:grid-cols-2">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="grid gap-3 md:grid-cols-2">
          {codeExamples.map((example) => (
            <article key={example.title} className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{example.title}</h3>
              <pre className="overflow-x-auto rounded-md bg-black/40 p-3 text-xs text-white">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {keyTakeaways.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
