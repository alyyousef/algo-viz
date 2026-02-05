import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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

const structureFamilies = [
  {
    title: 'Membership filters',
    detail: 'Bloom, Cuckoo, and XOR filters answer membership with false positives but no false negatives.',
  },
  {
    title: 'Frequency sketches',
    detail: 'Count-Min, CountSketch, and SpaceSaving track heavy hitters with bounded error.',
  },
  {
    title: 'Cardinality estimators',
    detail: 'HyperLogLog and KMV approximate distinct counts with sublinear memory.',
  },
  {
    title: 'Similarity sketches',
    detail: 'MinHash and SimHash compress objects so Jaccard or cosine similarity is approximable.',
  },
]

const parameterPlaybook = [
  'Decide acceptable false positive rate or relative error in business terms first.',
  'Compute required size (m, w, registers) before coding and log parameters in metrics.',
  'Pick hash strategy: 2 independent hashes with double hashing for k values is common.',
  'Budget memory per shard and confirm mergeability (OR/max/sum).',
  'Set rebuild triggers based on load factor, error drift, or time window.',
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

const algorithmMap = [
  {
    goal: 'Membership prefilter',
    primary: 'Bloom / Cuckoo / XOR filter',
    output: 'Maybe/definitely-not',
    note: 'Bloom is simplest; Cuckoo adds deletes; XOR is compact but static.',
  },
  {
    goal: 'Distinct count',
    primary: 'HyperLogLog / KMV',
    output: 'Approximate cardinality',
    note: 'HLL is standard at scale; KMV works well for smaller ranges.',
  },
  {
    goal: 'Heavy hitters',
    primary: 'Count-Min + Heap / SpaceSaving',
    output: 'Top-K with error bounds',
    note: 'Conservative update reduces overestimation; combine with exact counters for final ranking.',
  },
  {
    goal: 'Similarity search',
    primary: 'MinHash + LSH / SimHash',
    output: 'Candidate pairs',
    note: 'Use sketches to narrow candidates, then verify exactly.',
  },
  {
    goal: 'Quantiles',
    primary: 't-digest / KLL',
    output: 'Approximate percentiles',
    note: 'Good for latency metrics and dashboards under tight memory.',
  },
]

const complexityTable = [
  { approach: 'Bloom filter', time: 'O(k)', space: 'O(m) bits', note: 'No false negatives; FP rises with load; k ~ (m/n) ln 2.' },
  { approach: 'Counting Bloom / Cuckoo filter', time: 'O(k)', space: 'O(m) counters/fingerprints', note: 'Supports deletes; higher constant factors and potential relocations.' },
  { approach: 'Count-Min Sketch', time: 'O(d)', space: 'O(d * w)', note: 'Overestimates counts; error ~ epsilon with failure prob delta from rows/width.' },
  { approach: 'HyperLogLog', time: 'O(1)', space: 'O(m) registers', note: 'Std error ~ 1.04/sqrt(m); merge via register max; HLL++ fixes bias and sparse range.' },
  { approach: 'MinHash + LSH', time: 'O(k) per signature', space: 'O(k)', note: 'Approximates Jaccard; banding reduces candidate set for expensive verification.' },
  { approach: 'XOR filter', time: 'O(1)', space: 'O(1.2n) bits', note: 'Very compact static filters; supports fast queries but not deletions.' },
  { approach: 'KLL sketch', time: 'O(log n)', space: 'O(1/epsilon)', note: 'Approximate quantiles with strong accuracy guarantees.' },
  { approach: 'CountSketch', time: 'O(d)', space: 'O(d * w)', note: 'Tracks signed counts; good for heavy hitters with lower bias.' },
]

const filterToolkit = [
  {
    title: 'Double hashing',
    detail: 'Compute k hashes using h1 + i*h2 mod m to reduce hash cost without hurting error much.',
  },
  {
    title: 'Load factor control',
    detail: 'Track bits set or occupancy; rebuild when thresholds indicate FP inflation.',
  },
  {
    title: 'Deletion strategy',
    detail: 'Counting Bloom or Cuckoo filters allow deletes; XOR filters do not.',
  },
]

const sketchToolkit = [
  {
    title: 'Width/depth tuning',
    detail: 'Width sets epsilon; depth sets delta. Pick from error budget and memory constraints.',
  },
  {
    title: 'Conservative updates',
    detail: 'Increment only the minimum cells for a key to reduce overestimation.',
  },
  {
    title: 'Heavy-hitter extraction',
    detail: 'Pair sketches with small heaps or exact maps for final top-K ranking.',
  },
]

const hllToolkit = [
  {
    title: 'Register choice',
    detail: 'm = 2^p registers; higher p lowers error but increases memory. Keep p consistent across shards.',
  },
  {
    title: 'Sparse mode',
    detail: 'Store raw hashes at low cardinalities and switch to registers to reduce bias.',
  },
  {
    title: 'Merge discipline',
    detail: 'Register-wise max only; never sum registers or you break the estimator.',
  },
]

const similarityToolkit = [
  {
    title: 'Banding in LSH',
    detail: 'Split MinHash signatures into bands to tune recall vs precision.',
  },
  {
    title: 'Verification step',
    detail: 'Use sketches to narrow candidates, then compute exact similarity.',
  },
  {
    title: 'Signature caching',
    detail: 'Store compact signatures alongside objects to amortize hashing cost.',
  },
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

const debuggingSignals = [
  'Observed FP rate far above target: load factor too high or hashes are correlated.',
  'Sketch counts jump backward after merge: you accidentally averaged or normalized registers.',
  'Cuckoo insert failures spike: table is overfull or fingerprint size is too small.',
  'HLL estimates drift downward: register updates are not taking max, or hash uniformity is broken.',
]

const whenToUse = [
  'You need cheap maybe/definitely-not checks in front of storage or RPC fans: Bloom or Cuckoo.',
  'You monitor stream frequencies or heavy hitters under tight RAM: Count-Min with conservative update.',
  'You aggregate distinct users/events across shards: HyperLogLog or HLL++ with register merging.',
  'You deduplicate or cluster similar objects: MinHash signatures plus LSH banding, then exact verify.',
]

const implementationChecklist = [
  'Log parameters: m, k, seed set, width, depth, register count, and rebuild thresholds.',
  'Make hash functions deterministic and versioned to keep merges consistent.',
  'Expose error guarantees in API docs and dashboards.',
  'Add shadow exact counters for periodic calibration on samples.',
  'Implement rotation/epoching for long-lived filters to reset drift.',
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
  {
    title: 'Cuckoo filter stash',
    detail: 'Keep a small overflow stash for rare relocation failures to avoid rehashing whole tables.',
  },
  {
    title: 'XOR filters with peelability',
    detail: 'Construct a peelable graph for compact static filters with very fast queries.',
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
  {
    title: 'HyperLogLog update (sketch)',
    code: `function add(x):
    h = hash64(x)
    idx = first p bits of h
    w = remaining bits
    rho = number of leading zeros in w + 1
    registers[idx] = max(registers[idx], rho)

function estimate():
    Z = sum(2^(-registers[i])) for i in 1..m
    E = alpha_m * m^2 / Z
    return biasCorrect(E)`,
    explanation: 'Registers track max leading zeros; estimate uses harmonic mean with bias correction.',
  },
  {
    title: 'MinHash signature (sketch)',
    code: `function signature(S):
    sig = [INF] * k
    for x in S:
        for i in 0..k-1:
            sig[i] = min(sig[i], h_i(x))
    return sig  // Jaccard ~ fraction of equal positions`,
    explanation: 'MinHash compresses sets so Jaccard similarity is approximated by signature agreement.',
  },
]

const glossary = [
  'False positive: filter says "present" when key is absent.',
  'False negative: filter says "absent" when key is present (Bloom avoids this).',
  'Load factor: fraction of occupied bits/buckets; drives error growth.',
  'Register: HLL counter storing max leading zeros.',
  'Width/depth: sketch dimensions controlling error and failure probability.',
  'Fingerprint: short hash stored in Cuckoo/XOR filters.',
  'Banding: LSH trick to trade off recall vs precision in similarity search.',
  'Conservative update: increment only minimal counters to reduce overestimation.',
]

const practicePrompts = [
  'Design parameters for a Bloom filter to cap false positives at 0.1% for 50M keys.',
  'Explain when you would choose Cuckoo over Bloom in a write-heavy workload.',
  'Outline a pipeline that uses MinHash + LSH for near-duplicate detection in logs.',
  'Given a target HLL error of 1%, estimate register count and memory cost.',
  'Combine Count-Min with a heap to track top-K events in a stream.',
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
            <legend>Structure families</legend>
            <div className="win95-grid win95-grid-2">
              {structureFamilies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Parameter playbook</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {parameterPlaybook.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm map</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Goal</th>
                    <th>Primary</th>
                    <th>Output</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {algorithmMap.map((row) => (
                    <tr key={row.goal}>
                      <td>{row.goal}</td>
                      <td>{row.primary}</td>
                      <td>{row.output}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <legend>Filter toolkit</legend>
            <div className="win95-grid win95-grid-3">
              {filterToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Sketch toolkit</legend>
            <div className="win95-grid win95-grid-3">
              {sketchToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>HLL toolkit</legend>
            <div className="win95-grid win95-grid-3">
              {hllToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Similarity toolkit</legend>
            <div className="win95-grid win95-grid-3">
              {similarityToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
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
            <legend>Debugging signals</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {debuggingSignals.map((item) => (
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
            <legend>Implementation checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {implementationChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
            <legend>Glossary</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {glossary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practice prompts</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {practicePrompts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
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

