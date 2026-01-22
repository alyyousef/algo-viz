import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

const foundations = [
  {
    title: 'Las Vegas vs Monte Carlo',
    detail:
      'Las Vegas algorithms are always correct but have random runtime (e.g., randomized quicksort). Monte Carlo algorithms run fast but may be wrong with tiny probability (e.g., Miller-Rabin).',
  },
  {
    title: 'Probability is part of the spec',
    detail:
      'A randomized algorithm is only well-defined if it states error probability or expected runtime bounds. These are not implementation details.',
  },
  {
    title: 'Independence assumptions matter',
    detail:
      'Error bounds often assume independent trials. Correlated randomness can silently destroy guarantees.',
  },
  {
    title: 'Verification tightens guarantees',
    detail:
      'When feasible, a cheap deterministic check turns Monte Carlo into Las Vegas (retry until verified).',
  },
]

const taxonomy = [
  {
    title: 'Las Vegas algorithms',
    detail: 'Always correct; randomness affects runtime. Examples: randomized quicksort, treaps.',
  },
  {
    title: 'Monte Carlo algorithms',
    detail: 'Fixed runtime; small chance of error. Examples: Miller-Rabin, Bloom filters.',
  },
  {
    title: 'Randomized data structures',
    detail: 'Randomness shapes balance or hashing. Examples: skip lists, cuckoo hashing.',
  },
  {
    title: 'Sampling and sketching',
    detail: 'Estimate from samples. Examples: reservoir sampling, count-min sketch.',
  },
  {
    title: 'Randomized rounding',
    detail: 'Convert fractional solutions to integer ones with bounded expectation.',
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

const randomnessSources = [
  {
    title: 'Pseudorandom generators (PRNG)',
    detail:
      'Fast and deterministic; good for performance and reproducible tests. Not safe against adversaries.',
  },
  {
    title: 'Cryptographic RNG',
    detail:
      'Slower but unpredictable; required when inputs are adversarial or security-sensitive.',
  },
  {
    title: 'Hash function families',
    detail:
      'Universal hashing gives collision probability bounds even for worst-case inputs.',
  },
  {
    title: 'Seed management',
    detail:
      'Expose seeds for reproducibility; randomize seeds in production when adversaries may exist.',
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

const probabilityToolkit = [
  {
    title: 'Linearity of expectation',
    detail: 'Expected totals can be computed without independence assumptions.',
  },
  {
    title: 'Markov and Chebyshev',
    detail: 'Basic tail bounds for non-negative or bounded-variance variables.',
  },
  {
    title: 'Chernoff and Hoeffding',
    detail: 'Strong concentration for sums of independent bounded variables.',
  },
  {
    title: 'Union bound',
    detail: 'Combine multiple failure events into a total error budget.',
  },
]

const designChecklist = [
  'Define the error or runtime guarantee explicitly.',
  'State where randomness enters the algorithm.',
  'Estimate failure probability per trial.',
  'Decide how many trials you need to meet the SLA.',
  'Add verification or fallback when possible.',
  'Expose seed and randomness source for reproducible tests.',
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

const verificationStrategies = [
  {
    title: 'Certificate checks',
    detail: 'Verify output with a deterministic validator (e.g., primality witness).',
  },
  {
    title: 'Independent reruns',
    detail: 'Repeat with fresh randomness; combine by majority or minimum.',
  },
  {
    title: 'Adaptive retries',
    detail: 'Rerun only on suspicious outputs or when confidence is too low.',
  },
  {
    title: 'Hybrid fallback',
    detail: 'Use randomized fast path, then deterministic slow path if needed.',
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

const comparisons = [
  {
    title: 'Randomized vs deterministic',
    detail:
      'Randomized algorithms aim for strong expected or high-probability bounds, while deterministic algorithms guarantee worst-case behavior.',
  },
  {
    title: 'Randomized vs approximate',
    detail:
      'Randomized does not necessarily mean approximate; many randomized algorithms are exact with probability 1.',
  },
  {
    title: 'Randomized vs parallel',
    detail:
      'Randomness can reduce variance, but parallelism reduces wall time. They often complement each other.',
  },
]

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

const debuggingChecklist = [
  'Log seeds and replay failures deterministically.',
  'Track empirical error rates vs theoretical bounds.',
  'Use statistical tests for RNG quality if results look biased.',
  'Validate assumptions: independence, distribution, and input model.',
  'Add invariants and post-checks to catch silent errors early.',
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

const whenToAvoid = [
  {
    title: 'Strict determinism required',
    detail: 'Regulatory or safety-critical systems may forbid probabilistic failure.',
  },
  {
    title: 'Adversary can predict RNG',
    detail: 'If you cannot secure randomness, the algorithm can be attacked.',
  },
  {
    title: 'Exact worst-case guarantees needed',
    detail: 'Some SLAs require upper bounds on runtime, not just expectation.',
  },
  {
    title: 'Verification is expensive',
    detail: 'If checking outcomes costs as much as deterministic solving, randomization may not help.',
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

const instrumentation = [
  {
    title: 'Error and collision counters',
    detail: 'Measure false positive rates, collision frequencies, and variance in production.',
  },
  {
    title: 'Tail event logging',
    detail: 'Capture rare high-latency runs or large errors to analyze heavy tails.',
  },
  {
    title: 'Seed rotation policies',
    detail: 'Rotate or randomize seeds to prevent long-term bias and adversarial adaptation.',
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
  {
    title: 'Randomized quickselect',
    code: `function quickselect(arr: number[], k: number, rnd = Math.random): number {
  let left = 0
  let right = arr.length - 1
  while (true) {
    const pivotIndex = left + Math.floor(rnd() * (right - left + 1))
    const pivot = arr[pivotIndex]
    ;[arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]]
    let store = left
    for (let i = left; i < right; i++) {
      if (arr[i] < pivot) {
        ;[arr[i], arr[store]] = [arr[store], arr[i]]
        store++
      }
    }
    ;[arr[store], arr[right]] = [arr[right], arr[store]]
    if (store === k) return arr[store]
    if (store < k) left = store + 1
    else right = store - 1
  }
}`,
    explanation:
      'Random pivots yield O(n) expected time and avoid adversarial worst cases of deterministic selection.',
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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Randomized Algorithms</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Harness probability to outpace worst cases</div>
              <p className="win95-text">
                Randomized algorithms trade determinism for predictable averages and tunable confidence. By injecting randomness into choices,
                they neutralize adversaries, shrink memory, and deliver answers within a stated error budget.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Foundations</legend>
            <div className="win95-grid win95-grid-2">
              {foundations.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Big picture</legend>
            <div className="win95-grid win95-grid-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Randomized algorithm taxonomy</legend>
            <div className="win95-grid win95-grid-2">
              {taxonomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>History that shaped the paradigm</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((event) => (
                <div key={event.title} className="win95-panel">
                  <div className="win95-heading">{event.title}</div>
                  <p className="win95-text">{event.detail}</p>
                  <p className="win95-text">{event.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pillars and mental hooks</legend>
            <div className="win95-grid win95-grid-2">
              <div className="win95-panel">
                <div className="win95-heading">Pillars</div>
                <ul className="win95-list">
                  {pillars.map((pillar) => (
                    <li key={pillar.title}>
                      <strong>{pillar.title}:</strong> {pillar.detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="win95-panel">
                <div className="win95-heading">Mental models</div>
                <ul className="win95-list">
                  {mentalModels.map((model) => (
                    <li key={model.title}>
                      <strong>{model.title}:</strong> {model.detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Randomness sources</legend>
            <div className="win95-grid win95-grid-2">
              {randomnessSources.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works, step by step</legend>
            <div className="win95-grid win95-grid-2">
              {howItWorks.map((step, idx) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">
                    Step {idx + 1}: {step.title}
                  </div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Probability toolkit</legend>
            <div className="win95-grid win95-grid-2">
              {probabilityToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Design checklist</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {designChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity at a glance</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Verification and amplification</legend>
            <div className="win95-grid win95-grid-2">
              {verificationStrategies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Where randomness wins</legend>
            <div className="win95-stack">
              <div className="win95-grid win95-grid-2">
                {applications.map((app) => (
                  <div key={app.title} className="win95-panel">
                    <div className="win95-heading">{app.title}</div>
                    <p className="win95-text">{app.detail}</p>
                    <p className="win95-text">{app.note}</p>
                  </div>
                ))}
              </div>
              <div className="win95-panel win95-panel--raised">
                <div className="win95-heading">Failure mode</div>
                <p className="win95-text">{failureStory}</p>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Randomization in context</legend>
            <div className="win95-grid win95-grid-2">
              {comparisons.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls to avoid</legend>
            <div className="win95-stack">
              {pitfalls.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Debugging checklist</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {debuggingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to reach for randomness</legend>
            <div className="win95-stack">
              {whenToUse.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to avoid randomness</legend>
            <div className="win95-stack">
              {whenToAvoid.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced moves</legend>
            <div className="win95-grid win95-grid-2">
              {advanced.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Instrumentation that matters</legend>
            <div className="win95-grid win95-grid-2">
              {instrumentation.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Code examples</legend>
            <div className="win95-stack">
              {codeExamples.map((example) => (
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
            <legend>Key takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

