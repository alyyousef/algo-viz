import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const cachePatterns = [
  {
    title: 'Read-through / cache-aside',
    detail:
      'Application checks cache first, then falls back to the source of truth and populates on miss. Simple to adopt and keeps the cache honest but may thundering-herd on cold keys.',
  },
  {
    title: 'Write-through',
    detail:
      'Writes go to cache and backing store synchronously. Guarantees cache correctness at the cost of write latency. Good for strong consistency when write rates are moderate.',
  },
  {
    title: 'Write-back (write-behind)',
    detail:
      'Accept writes in cache, flush to storage later in batches. Great for throughput; risky without durable queues or WALs. Needs replay and ordering guarantees.',
  },
  {
    title: 'Tiered caching',
    detail:
      'Hotset in-process (L1), shared network cache as L2, and database behind. Promotes hits between tiers; evict independently. Watch for coherence bugs between layers.',
  },
]

const eviction = [
  {
    title: 'LRU / 2Q / ARC',
    detail:
      'Classics for recency with tweaks to handle scans. LRU is simple; 2Q and ARC keep scan resistance by separating recently seen from frequently reused.',
  },
  {
    title: 'LFU and TinyLFU',
    detail:
      'Frequency-oriented for stable hot keys. TinyLFU uses a small admission filter to prevent one-off entries from evicting the working set.',
  },
  {
    title: 'TTL and refresh-ahead',
    detail:
      'Time-based invalidation with optional proactive refresh. Good for soft real-time data; combine with jitter to avoid synchronized expirations.',
  },
  {
    title: 'Size-aware eviction',
    detail:
      'Evict by weight (bytes) instead of count to prevent large entries from crowding out many small ones. Mix with recency/frequency for balanced behavior.',
  },
]

const designMoves = [
  {
    title: 'Prevent stampedes',
    steps: [
      'Use request coalescing: only one worker recomputes a hot key while others wait.',
      'Add jitter to TTLs; refresh asynchronously before expiry for very hot keys.',
      'Fallback to slightly stale data with a short grace window during recompute.',
    ],
  },
  {
    title: 'Maintain coherence',
    steps: [
      'Tag cache entries by version or epoch; bump the epoch on writes and reject stale reads.',
      'For write-heavy keys, use write-through or explicit invalidation messages.',
      'Prefer idempotent invalidation events so retries do not corrupt state.',
    ],
  },
  {
    title: 'Choose placement',
    steps: [
      'Sharding by consistent hash spreads load and keeps keys sticky to one node.',
      'Use replication for high-read keys; pick a primary for writes to avoid split-brain.',
      'Handle rebalancing gradually to avoid sudden cache miss storms.',
    ],
  },
  {
    title: 'Measure and adapt',
    steps: [
      'Track hit ratio, tail latency, eviction causes, and bytes admitted versus rejected.',
      'Expose per-key or per-prefix metrics to spot skew and adjust sharding or TTLs.',
      'Autoscale cache tiers based on working-set size and eviction pressure.',
    ],
  },
]

const guardrails = [
  'Decide the truth source and consistency story up front; cache design follows from it.',
  'Bound memory with size-based limits; reject or downsample oversized values.',
  'Encrypt or redact sensitive data at rest in caches; many caches are shared and long-lived.',
  'Include versioned serialization so deployments can roll without corrupting cached objects.',
  'Test failure drills: cache node loss, network partitions, stale value exposure, and replay of write-behind buffers.',
]

export default function SystemDesignCachesPage(): JSX.Element {
  return (
    <TopicLayout
      title="System Design (Caches, LRU, etc.)"
      subtitle="Data structures in production systems"
      intro="Caches and eviction policies keep latency low and databases upright. Pick the right interaction pattern, eviction strategy, and coherence plan to fit your workload."
    >
      <TopicSection heading="Cache patterns to choose from">
        <div className="grid gap-3 md:grid-cols-2">
          {cachePatterns.map((pattern) => (
            <article key={pattern.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{pattern.title}</h3>
              <p className="text-sm text-white/80">{pattern.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Eviction and admission strategies">
        <div className="grid gap-3 md:grid-cols-2">
          {eviction.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="System design playbooks">
        <div className="grid gap-3 md:grid-cols-2">
          {designMoves.map((move) => (
            <article key={move.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{move.title}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {move.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Correctness and safety checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {guardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
