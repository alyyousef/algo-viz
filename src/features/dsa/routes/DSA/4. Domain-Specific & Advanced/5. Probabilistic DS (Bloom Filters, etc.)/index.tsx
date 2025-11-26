import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const structures = [
  {
    title: 'Bloom filter',
    detail:
      'Compact membership check with no false negatives. Choose k hash functions and bitset size from a target false positive rate; treat positives as "maybe" and confirm in the source of truth.',
  },
  {
    title: 'Counting Bloom / Cuckoo filter',
    detail:
      'Support deletes by storing small counters or moving fingerprints between buckets. Costs extra bits but keeps error bounded while letting you retract entries.',
  },
  {
    title: 'Count-Min Sketch',
    detail:
      'Approximates frequency counts in sub-linear space. Each row hashes to a bucket; the minimum across rows upper-bounds the true count with controllable overestimation.',
  },
  {
    title: 'HyperLogLog',
    detail:
      'Estimates distinct elements with tiny memory. Tracks leading-zero runs per register; bias-corrected harmonic mean yields a cardinality estimate with tunable error (std error ~ 1.04/sqrt(m)).',
  },
  {
    title: 'MinHash + LSH',
    detail:
      'Hash subsets to sketch set similarity (Jaccard). Combine multiple hash bands in locality-sensitive hashing to retrieve near-duplicates quickly.',
  },
]

const sizing = [
  'Pick the tolerated error first: for Bloom filters use m ~ -(n ln p)/(ln 2)^2 bits and k ~ (m/n) ln 2 hashes to hit false positive rate p.',
  'Use pairwise independent, fast hashes (e.g., splitmix/wyhash variants) and mix seeds per row to reduce correlation.',
  'Plan rebuilds: probabilistic structures drift as load factors rise. Schedule a fresh filter/sketch after significant growth or use layered filters per epoch.',
  'Handle deletions explicitly. Pure Bloom filters cannot delete; use counting variants or periodic rebuilds from the authoritative dataset.',
  'Keep sketches on the hot path immutable and swap atomically when reloading to avoid inconsistent counts during updates.',
]

const recipes = [
  {
    title: 'Web cache or CDN membership guard',
    steps: [
      'Bloom filter in front of storage to skip guaranteed misses cheaply.',
      'Log positives and sample them to monitor drift; rebuild when error climbs.',
      'Fallback to the source of truth on positives and write-through on misses.',
    ],
  },
  {
    title: 'Heavy hitter detection in streams',
    steps: [
      'Count-Min Sketch to keep frequency estimates for keys.',
      'Take the minimum across rows; subtract a global error bound to prune noise.',
      'Periodically decay or rebuild to avoid stale counts dominating.',
    ],
  },
  {
    title: 'Unique user estimation',
    steps: [
      'HyperLogLog per shard, merge via register-wise maxima for rollups.',
      'Tune register count to your acceptable relative error; validate on sampled ground truth.',
      'Reset or rotate sketches to bound long-term bias from non-ideal hashes.',
    ],
  },
  {
    title: 'Near-duplicate detection',
    steps: [
      'Compute MinHash signatures of documents or sets.',
      'Bucket with LSH bands to retrieve candidate neighbors.',
      'Verify with exact similarity on the short candidate list.',
    ],
  },
]

const guardrails = [
  'Instrument observed false positive/overestimation rates against ground truth samples.',
  'Document what "maybe" means for callers and ensure a definitive check exists for Bloom positives.',
  'Clamp counters in sketches to prevent overflow from unbounded streams.',
  'Use versioned seeds and record parameters (m, k, hash family) for reproducible rebuilds and debugging.',
  'Test degenerate inputs: repeated keys, adversarial hashes, and load factors beyond the design point.',
]

export default function ProbabilisticDataStructuresPage(): JSX.Element {
  return (
    <TopicLayout
      title="Probabilistic Data Structures"
      subtitle="Trade exactness for efficiency"
      intro="These structures deliver fast answers with tiny footprints by accepting controlled error. Use them to prefilter work, approximate counts, and surface likely candidates without touching full datasets."
    >
      <TopicSection heading="Core tools and what they buy you">
        <div className="grid gap-3 md:grid-cols-2">
          {structures.map((structure) => (
            <article key={structure.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{structure.title}</h3>
              <p className="text-sm text-white/80">{structure.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Sizing and operating them safely">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {sizing.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Playbooks for common jobs">
        <div className="grid gap-3 md:grid-cols-2">
          {recipes.map((recipe) => (
            <article key={recipe.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{recipe.title}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {recipe.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Guardrails and correctness checks">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {guardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
