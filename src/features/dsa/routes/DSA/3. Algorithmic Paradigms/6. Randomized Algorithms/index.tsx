import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Randomized Algorithms</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
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
