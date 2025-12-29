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
    title: 'Space over exactness',
    detail: 'Trade certainty for tiny memory and fast queries; perfect for caches, telemetry, and streams where exactness is too expensive.',
  },
  {
    title: 'Stateless, mergeable sketches',
    detail: 'Operations are commutative; you can shard and merge without coordination, enabling distributed analytics.',
  },
  {
    title: 'Predictable error envelopes',
    detail: 'False positives or bounded overestimation are tunable from first principles, letting teams budget risk explicitly.',
  },
]

const history = [
  {
    title: '1970: Burton Bloom filter',
    detail: 'Introduced probabilistic membership with no false negatives, opening the door to lightweight prefilters.',
  },
  {
    title: '1985: Flajolet-Martin sketches',
    detail: 'First streaming cardinality estimators using bit-pattern maxima, influencing later count-distinct work.',
  },
  {
    title: '1997: Broder MinHash + LSH',
    detail: 'Made near-duplicate detection practical for web-scale documents via Jaccard sketches and banding.',
  },
  {
    title: '2007/2014: HyperLogLog and Cuckoo filters',
    detail: 'HyperLogLog tightened cardinality error; Cuckoo filters added deletions with fingerprint relocation.',
  },
]

const pillars = [
  {
    title: 'Controlled error budget',
    detail: 'Pick target false positive or relative error first; size parameters derive from it.',
  },
  {
    title: 'Hash independence',
    detail: 'Low-collision, pairwise-independent hashes keep error predictable; correlated hashes spike drift.',
  },
  {
    title: 'Monotone drift and rebuilds',
    detail: 'Load factors only increase error; plan rotation or multi-epoch layering to reset quality.',
  },
  {
    title: 'Mergeability',
    detail: 'Bitwise OR for Bloom, register-wise max for HLL, row-wise sum for sketches enables distributed aggregation.',
  },
]

const mentalModels = [
  {
    title: 'Bouncer with a fuzzy list',
    detail: 'The bouncer lets in anyone not on the list; names on the list get double-checked. Works until the list smudges from overuse.',
  },
  {
    title: 'Foggy histogram',
    detail: 'Bins blur together; you can tell heavy bars but not exact heights. Good for triage, not accounting.',
  },
]

const howItWorks = [
  {
    step: '1. Set the error target',
    detail: 'Choose p for false positives or epsilon for relative error; derive m (bits/registers) and k (hashes).',
  },
  {
    step: '2. Hash and update',
    detail: 'Map items into bits, counters, registers, or fingerprints; updates are O(k) and cache-friendly.',
  },
  {
    step: '3. Query as maybe/upper-bound',
    detail: 'Bloom returns maybe/definitely-not; sketches return overestimates you may debias with global offsets.',
  },
  {
    step: '4. Merge across shards',
    detail: 'Combine by OR, max, or sum to get global views without raw data movement.',
  },
  {
    step: '5. Monitor drift and rebuild',
    detail: 'Track observed FP rates or variance; rotate epochs or rebuild when thresholds breach.',
  },
]

const complexityTable = [
  { approach: 'Bloom filter', time: 'O(k)', space: 'O(m) bits', note: 'No false negatives; FP rises with load; k ~ (m/n) ln 2.' },
  { approach: 'Counting Bloom / Cuckoo filter', time: 'O(k)', space: 'O(m) counters/fingerprints', note: 'Supports deletes; higher constant factors and potential relocations.' },
  { approach: 'Count-Min Sketch', time: 'O(d)', space: 'O(d * w)', note: 'Overestimates counts; error ~ epsilon with failure prob delta from rows/width.' },
  { approach: 'HyperLogLog', time: 'O(1)', space: 'O(m) registers', note: 'Std error ~ 1.04/sqrt(m); merge via register max; HLL++ fixes bias and sparse range.' },
  { approach: 'MinHash + LSH', time: 'O(k) per signature', space: 'O(k)', note: 'Approximates Jaccard; banding reduces candidate set for expensive verification.' },
]

const applications = [
  {
    title: 'Cache and DB prefilters',
    detail: 'Bloom filters avoid disk seeks for sure-misses; widely used in SSTable engines and CDNs.',
  },
  {
    title: 'Abuse and telemetry pipelines',
    detail: 'Count-Min Sketch tracks heavy hitters (bots, IPs) in streams without retaining every event.',
  },
  {
    title: 'Unique user and event estimation',
    detail: 'HyperLogLog per shard rolls up distinct counts for analytics dashboards and billing.',
  },
  {
    title: 'Near-duplicate search',
    detail: 'MinHash + LSH narrows candidates for document, image, or log similarity before exact scoring.',
  },
]

const pitfalls = [
  'Deleting from a plain Bloom filter silently fails; use counting/cuckoo variants or rebuild.',
  'Overfilling raises false positives superlinearly; monitor load factor and rotate before saturation.',
  'Hash correlation or reuse of seeds across rows inflates collision probability and error.',
  'Sketch overestimates cannot rank ties reliably; combine with sampling or exact counters for top-N.',
  'Ignoring parameter logs (m, k, seeds) makes on-call debugging and reproducibility impossible.',
]

const whenToUse = [
  'You need cheap maybe/definitely-not checks in front of storage or RPC fans: Bloom or Cuckoo.',
  'You monitor stream frequencies or heavy hitters under tight RAM: Count-Min with conservative update.',
  'You aggregate distinct users/events across shards: HyperLogLog or HLL++ with register merging.',
  'You deduplicate or cluster similar objects: MinHash signatures plus LSH banding, then exact verify.',
]

const advanced = [
  {
    title: 'Blocked/partitioned Bloom filters',
    detail: 'Align hashes to a single cache line to cut random memory accesses on hot paths.',
  },
  {
    title: 'Stable Bloom filters',
    detail: 'Decay bits probabilistically to keep false positives bounded on sliding-window streams.',
  },
  {
    title: 'Conservative update Count-Min',
    detail: 'Only increment the minimal buckets per key to reduce overestimation of light hitters.',
  },
  {
    title: 'HLL++ sparse and bias correction',
    detail: 'Switches to sparse sets at low cardinalities and uses empirically tuned bias tables for accuracy.',
  },
]

const codeExamples = [
  {
    title: 'Bloom filter add/query',
    code: `function add(x):
    for i in 0..k-1:
        idx = h_i(x) mod m
        bits[idx] = 1

function mayContain(x):
    for i in 0..k-1:
        idx = h_i(x) mod m
        if bits[idx] == 0: return false  // definitely not present
    return true  // maybe present (false positives possible)`,
    explanation: 'Choose m and k from target false positive p; results are monotone until rebuild.',
  },
  {
    title: 'Count-Min Sketch update/query with conservative increment',
    code: `function update(key, delta):
    minVal = INF
    for r in 0..d-1:
        c = hash_r(key) mod width
        minVal = min(minVal, table[r][c])
    for r in 0..d-1:
        c = hash_r(key) mod width
        if table[r][c] == minVal:
            table[r][c] += delta  // reduce overestimation

function estimate(key):
    est = INF
    for r in 0..d-1:
        c = hash_r(key) mod width
        est = min(est, table[r][c])
    return est  // upper bound on true count`,
    explanation: 'Width sets epsilon; depth sets failure probability. Conservative updates tighten bounds for light keys.',
  },
]

const keyTakeaways = [
  'Pick the error budget first; derive sizes, do not guess.',
  'Mergeability makes sketches natural for sharded systems.',
  'False positives and overestimates only rise with load; schedule rotation.',
  'Use the right tool: Bloom for membership, Count-Min for frequency, HLL for distincts, MinHash for similarity.',
]

export default function ProbabilisticDataStructuresPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Probabilistic Data Structures</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Trade exactness for efficiency</div>
              <p className="win95-text">
                Prefilter, approximate, and summarize massive data by paying small, explicit error. Bloom, sketches, and hashes turn
                impossible exact work into fast, memory-light answers.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Big picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>History</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental hooks</legend>
            <div className="win95-row">
              <div className="win95-panel">
                <div className="win95-subheading">Pillars</div>
                <div className="win95-stack">
                  {pillars.map((item) => (
                    <div key={item.title} className="win95-panel">
                      <div className="win95-heading">{item.title}</div>
                      <p className="win95-text">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="win95-panel">
                <div className="win95-subheading">Mental models</div>
                <div className="win95-stack">
                  {mentalModels.map((item) => (
                    <div key={item.title} className="win95-panel">
                      <div className="win95-heading">{item.title}</div>
                      <p className="win95-text">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {howItWorks.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity table</legend>
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
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">Failure story: Stale filter blocked invalidations</div>
              <p className="win95-text">
                A CDN kept a Bloom filter of cached keys but never rebuilt it after a surge. False positives spiked, purge calls were skipped
                as &quot;maybe present,&quot; and stale assets persisted through a product launch. Scheduled rotations would have kept error
                bounded.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced</legend>
            <div className="win95-grid win95-grid-3">
              {advanced.map((item) => (
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
                <div key={item} className="win95-panel">
                  <p className="win95-text">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
