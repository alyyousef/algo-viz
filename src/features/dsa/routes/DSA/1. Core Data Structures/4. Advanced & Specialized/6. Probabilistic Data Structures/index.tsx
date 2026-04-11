import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Space over exactness',
    detail:
      'Trade certainty for tiny memory and fast queries; perfect for caches, telemetry, and streams where exactness is too expensive.',
  },
  {
    title: 'Stateless, mergeable sketches',
    detail:
      'Operations are commutative; you can shard and merge without coordination, enabling distributed analytics.',
  },
  {
    title: 'Predictable error envelopes',
    detail:
      'False positives or bounded overestimation are tunable from first principles, letting teams budget risk explicitly.',
  },
]

const history = [
  {
    title: '1970: Burton Bloom filter',
    detail:
      'Introduced probabilistic membership with no false negatives, opening the door to lightweight prefilters.',
  },
  {
    title: '1985: Flajolet-Martin sketches',
    detail:
      'First streaming cardinality estimators using bit-pattern maxima, influencing later count-distinct work.',
  },
  {
    title: '1997: Broder MinHash + LSH',
    detail:
      'Made near-duplicate detection practical for web-scale documents via Jaccard sketches and banding.',
  },
  {
    title: '2007/2014: HyperLogLog and Cuckoo filters',
    detail:
      'HyperLogLog tightened cardinality error; Cuckoo filters added deletions with fingerprint relocation.',
  },
]

const pillars = [
  {
    title: 'Controlled error budget',
    detail: 'Pick target false positive or relative error first; size parameters derive from it.',
  },
  {
    title: 'Hash independence',
    detail:
      'Low-collision, pairwise-independent hashes keep error predictable; correlated hashes spike drift.',
  },
  {
    title: 'Monotone drift and rebuilds',
    detail:
      'Load factors only increase error; plan rotation or multi-epoch layering to reset quality.',
  },
  {
    title: 'Mergeability',
    detail:
      'Bitwise OR for Bloom, register-wise max for HLL, row-wise sum for sketches enables distributed aggregation.',
  },
]

const structureFamilies = [
  {
    title: 'Membership filters',
    detail:
      'Bloom, Cuckoo, and XOR filters answer membership with false positives but no false negatives.',
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
    detail:
      'The bouncer lets in anyone not on the list; names on the list get double-checked. Works until the list smudges from overuse.',
  },
  {
    title: 'Foggy histogram',
    detail:
      'Bins blur together; you can tell heavy bars but not exact heights. Good for triage, not accounting.',
  },
]

const howItWorks = [
  {
    step: '1. Set the error target',
    detail:
      'Choose p for false positives or epsilon for relative error; derive m (bits/registers) and k (hashes).',
  },
  {
    step: '2. Hash and update',
    detail:
      'Map items into bits, counters, registers, or fingerprints; updates are O(k) and cache-friendly.',
  },
  {
    step: '3. Query as maybe/upper-bound',
    detail:
      'Bloom returns maybe/definitely-not; sketches return overestimates you may debias with global offsets.',
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
  {
    approach: 'Bloom filter',
    time: 'O(k)',
    space: 'O(m) bits',
    note: 'No false negatives; FP rises with load; k ~ (m/n) ln 2.',
  },
  {
    approach: 'Counting Bloom / Cuckoo filter',
    time: 'O(k)',
    space: 'O(m) counters/fingerprints',
    note: 'Supports deletes; higher constant factors and potential relocations.',
  },
  {
    approach: 'Count-Min Sketch',
    time: 'O(d)',
    space: 'O(d * w)',
    note: 'Overestimates counts; error ~ epsilon with failure prob delta from rows/width.',
  },
  {
    approach: 'HyperLogLog',
    time: 'O(1)',
    space: 'O(m) registers',
    note: 'Std error ~ 1.04/sqrt(m); merge via register max; HLL++ fixes bias and sparse range.',
  },
  {
    approach: 'MinHash + LSH',
    time: 'O(k) per signature',
    space: 'O(k)',
    note: 'Approximates Jaccard; banding reduces candidate set for expensive verification.',
  },
  {
    approach: 'XOR filter',
    time: 'O(1)',
    space: 'O(1.2n) bits',
    note: 'Very compact static filters; supports fast queries but not deletions.',
  },
  {
    approach: 'KLL sketch',
    time: 'O(log n)',
    space: 'O(1/epsilon)',
    note: 'Approximate quantiles with strong accuracy guarantees.',
  },
  {
    approach: 'CountSketch',
    time: 'O(d)',
    space: 'O(d * w)',
    note: 'Tracks signed counts; good for heavy hitters with lower bias.',
  },
]

const filterToolkit = [
  {
    title: 'Double hashing',
    detail:
      'Compute k hashes using h1 + i*h2 mod m to reduce hash cost without hurting error much.',
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
    detail:
      'm = 2^p registers; higher p lowers error but increases memory. Keep p consistent across shards.',
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
    detail:
      'Bloom filters avoid disk seeks for sure-misses; widely used in SSTable engines and CDNs.',
  },
  {
    title: 'Abuse and telemetry pipelines',
    detail:
      'Count-Min Sketch tracks heavy hitters (bots, IPs) in streams without retaining every event.',
  },
  {
    title: 'Unique user and event estimation',
    detail: 'HyperLogLog per shard rolls up distinct counts for analytics dashboards and billing.',
  },
  {
    title: 'Near-duplicate search',
    detail:
      'MinHash + LSH narrows candidates for document, image, or log similarity before exact scoring.',
  },
]

const failureStory =
  'A CDN kept a Bloom filter of cached keys but never rebuilt it after a surge. False positives spiked, purge calls were skipped as "maybe present," and stale assets persisted through a product launch. Scheduled rotations would have kept error bounded.'

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
    detail:
      'Decay bits probabilistically to keep false positives bounded on sliding-window streams.',
  },
  {
    title: 'Conservative update Count-Min',
    detail: 'Only increment the minimal buckets per key to reduce overestimation of light hitters.',
  },
  {
    title: 'HLL++ sparse and bias correction',
    detail:
      'Switches to sparse sets at low cardinalities and uses empirically tuned bias tables for accuracy.',
  },
  {
    title: 'Cuckoo filter stash',
    detail:
      'Keep a small overflow stash for rare relocation failures to avoid rehashing whole tables.',
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
    explanation:
      'Width sets epsilon; depth sets failure probability. Conservative updates tighten bounds for light keys.',
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
    explanation:
      'Registers track max leading zeros; estimate uses harmonic mean with bias correction.',
  },
  {
    title: 'MinHash signature (sketch)',
    code: `function signature(S):
    sig = [INF] * k
    for x in S:
        for i in 0..k-1:
            sig[i] = min(sig[i], h_i(x))
    return sig  // Jaccard ~ fraction of equal positions`,
    explanation:
      'MinHash compresses sets so Jaccard similarity is approximated by signature agreement.',
  },
]

const glossary = [
  {
    term: 'False positive',
    definition: 'A filter says "present" when the key is absent.',
  },
  {
    term: 'False negative',
    definition: 'A filter says "absent" when the key is present; Bloom filters avoid this.',
  },
  {
    term: 'Load factor',
    definition: 'The fraction of occupied bits or buckets; it drives error growth.',
  },
  {
    term: 'Register',
    definition: 'An HLL counter storing a maximum leading-zero observation.',
  },
  {
    term: 'Width/depth',
    definition: 'Sketch dimensions controlling error and failure probability.',
  },
  {
    term: 'Fingerprint',
    definition: 'A short hash stored in Cuckoo or XOR filters.',
  },
  {
    term: 'Banding',
    definition: 'An LSH trick to trade off recall vs precision in similarity search.',
  },
  {
    term: 'Conservative update',
    definition: 'Increment only minimal counters to reduce overestimation.',
  },
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
    { id: 'bp-history', label: 'History' },
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Core Pillars' },
    { id: 'core-families', label: 'Structure Families' },
    { id: 'core-parameters', label: 'Parameter Playbook' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-algorithms', label: 'Algorithm Map' },
    { id: 'core-workflow', label: 'How It Works' },
    { id: 'core-filters', label: 'Filter Toolkit' },
    { id: 'core-sketches', label: 'Sketch Toolkit' },
    { id: 'core-hll', label: 'HLL Toolkit' },
    { id: 'core-similarity', label: 'Similarity Toolkit' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-debugging', label: 'Debugging Signals' },
    { id: 'core-when', label: 'When to Use' },
    { id: 'core-implementation', label: 'Implementation Checklist' },
    { id: 'core-advanced', label: 'Advanced Topics' },
  ],
  examples: [
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-prompts', label: 'Practice Prompts' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ProbabilisticDataStructuresPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Probabilistic Data Structures',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Probabilistic Data Structures"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Probabilistic Data Structures</h1>
      <p className="prob-help-intro">
        Probabilistic data structures make impossible exact workloads feasible by trading a small,
        explicit error budget for large gains in memory, speed, and mergeability. This page
        preserves the original material while presenting it as a Windows-style help document focused
        on error budgeting, operational drift, and the right sketch for each job.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History</h2>
            {history.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications and Failure Story</h2>
            {applications.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <h3 className="bin98-subheading">Failure story: Stale filter blocked invalidations</h3>
            <p>{failureStory}</p>
          </section>

          <hr className="bin98-divider" />

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars" className="bin98-section">
            <h2 className="bin98-heading">Core Pillars</h2>
            {pillars.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-families" className="bin98-section">
            <h2 className="bin98-heading">Structure Families</h2>
            {structureFamilies.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-parameters" className="bin98-section">
            <h2 className="bin98-heading">Parameter Playbook</h2>
            <ul>
              {parameterPlaybook.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="core-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-algorithms" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Map</h2>
            {algorithmMap.map((item) => (
              <div key={item.goal}>
                <h3 className="bin98-subheading">{item.goal}</h3>
                <p>
                  <strong>Primary:</strong> {item.primary}
                </p>
                <p>
                  <strong>Output:</strong> {item.output}
                </p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>

          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">How It Works</h2>
            {howItWorks.map((item) => (
              <p key={item.step}>
                <strong>{item.step}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-filters" className="bin98-section">
            <h2 className="bin98-heading">Filter Toolkit</h2>
            {filterToolkit.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-sketches" className="bin98-section">
            <h2 className="bin98-heading">Sketch Toolkit</h2>
            {sketchToolkit.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-hll" className="bin98-section">
            <h2 className="bin98-heading">HLL Toolkit</h2>
            {hllToolkit.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-similarity" className="bin98-section">
            <h2 className="bin98-heading">Similarity Toolkit</h2>
            {similarityToolkit.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Table</h2>
            {complexityTable.map((item) => (
              <p key={item.approach}>
                <strong>{item.approach}:</strong> time {item.time}, space {item.space}. {item.note}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="core-debugging" className="bin98-section">
            <h2 className="bin98-heading">Debugging Signals</h2>
            <ul>
              {debuggingSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use</h2>
            <ol>
              {whenToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section id="core-implementation" className="bin98-section">
            <h2 className="bin98-heading">Implementation Checklist</h2>
            <ul>
              {implementationChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Topics</h2>
            {advanced.map((item) => (
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
            <h2 className="bin98-heading">Code Examples</h2>
            {codeExamples.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <pre className="bin98-codebox">
                  <code>{item.code.trim()}</code>
                </pre>
                <p>{item.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-prompts" className="bin98-section">
            <h2 className="bin98-heading">Practice Prompts</h2>
            <ol>
              {practicePrompts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
