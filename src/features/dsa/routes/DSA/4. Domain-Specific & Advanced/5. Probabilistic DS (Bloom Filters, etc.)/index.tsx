import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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
    <TopicLayout
      title="Probabilistic Data Structures"
      subtitle="Trade exactness for efficiency"
      intro="Prefilter, approximate, and summarize massive data by paying small, explicit error. Bloom, sketches, and hashes turn impossible exact work into fast, memory-light answers."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-3">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History">
        <div className="grid gap-3 md:grid-cols-2">
          {history.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental hooks">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Pillars</h3>
            <div className="space-y-3">
              {pillars.map((item) => (
                <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-white/80">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Mental models</h3>
            <div className="space-y-3">
              {mentalModels.map((item) => (
                <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-white/80">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-3">
          {howItWorks.map((item) => (
            <article key={item.step} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.step}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity table">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-white/10 bg-white/5 text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 text-left text-white">Approach</th>
                <th className="p-3 text-left text-white">Time</th>
                <th className="p-3 text-left text-white">Space</th>
                <th className="p-3 text-left text-white">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="border-b border-white/10">
                  <td className="p-3 text-white">{row.approach}</td>
                  <td className="p-3 text-white">{row.time}</td>
                  <td className="p-3 text-white">{row.space}</td>
                  <td className="p-3 text-white/80">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 p-4">
          <h3 className="text-sm font-semibold text-red-100">Failure story: Stale filter blocked invalidations</h3>
          <p className="text-sm text-red-100/80">
            A CDN kept a Bloom filter of cached keys but never rebuilt it after a surge. False positives spiked, purge calls were skipped as "maybe present," and stale assets persisted through a product launch. Scheduled rotations would have kept error bounded.
          </p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls">
        <div className="rounded-lg bg-white/5 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
            {pitfalls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>

      <TopicSection heading="When to use">
        <div className="rounded-lg bg-white/5 p-4">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
            {whenToUse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </TopicSection>

      <TopicSection heading="Advanced">
        <div className="grid gap-3 md:grid-cols-4">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="space-y-4">
          {codeExamples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{example.title}</h3>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2">
          {keyTakeaways.map((item) => (
            <article key={item} className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
              <p className="text-sm text-emerald-100">{item}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
