import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Latency buffer',
    detail: 'Caches cut round trips to slow storage or distant regions, flattening tail latency for hot keys.',
    note: 'Primary benefit in read-heavy workloads where the working set fits in faster memory tiers.',
  },
  {
    title: 'Load shedder',
    detail: 'Absorbs burst traffic and protects databases from stampedes by serving cached responses.',
    note: 'Common front line for product launches and flash sales.',
  },
  {
    title: 'Shape shifter',
    detail: 'Choose patterns (cache-aside, write-through, write-back) to match consistency and durability needs.',
    note: 'Design starts with the source of truth, not with the cache.',
  },
  {
    title: 'Risk trade',
    detail: 'Gain speed but risk staleness, eviction bias, or silent data loss unless coherence is explicit.',
    note: 'Observability and invalidation strategy decide success, not just policy choice.',
  },
]

const history = [
  {
    title: '1960s: CPU and VM caches',
    detail: 'Processor caches and virtual memory popularize multi-level memory hierarchies for locality.',
    note: 'Introduced the idea of recency/frequency-driven eviction.',
  },
  {
    title: '1998: Akamai CDN launch',
    detail: 'Edge caches move static assets closer to users, pioneering global HTTP caching at scale.',
    note: 'Showed geography-aware caching as a latency lever.',
  },
  {
    title: '2003: Memcached at LiveJournal',
    detail: 'Brad Fitzpatrick ships Memcached to offload databases for social workloads.',
    note: 'Defined cache-aside with simple eviction at internet scale.',
  },
  {
    title: '2009: Redis goes durable',
    detail: 'Salvatore Sanfilippo adds persistence and rich data types to in-memory caching.',
    note: 'Blurred the line between cache and primary store for some workloads.',
  },
]

const pillars = [
  {
    title: 'Truth and coherence',
    detail: 'Identify the source of truth and how cache entries become valid or invalid.',
  },
  {
    title: 'Placement and sharding',
    detail: 'Choose in-process, near-cache, or network cache; shard with consistent hashing to avoid churn.',
  },
  {
    title: 'Eviction and admission',
    detail: 'Select LRU/LFU/TinyLFU and weight by size; admission filters stop cache pollution.',
  },
  {
    title: 'Durability and write path',
    detail: 'Pick cache-aside, write-through, or write-back with WAL/queue if writes pass through cache.',
  },
]

const mentalModels = [
  {
    title: 'Refrigerator with receipts',
    detail:
      'Store frequently eaten items close by; toss them when space is tight and restock from the pantry. Breaks when you forget receipts (versions) and eat spoiled food (stale data).',
  },
  {
    title: 'Customs checkpoint',
    detail:
      'Every item entering the cache is checked and stamped; expired stamps are rejected. Works only if stamps are consistent across tiers.',
  },
  {
    title: 'Loaner library',
    detail:
      'Borrow copies of books; overdue copies are reclaimed by eviction. If you forget to return (invalidate) after edits, readers get outdated editions.',
  },
]

const howItWorks = [
  {
    title: 'Define the truth source',
    detail: 'Pick the system of record and decide if the cache may serve stale values and for how long.',
  },
  {
    title: 'Choose interaction pattern',
    detail: 'Cache-aside for flexibility, write-through for coherence, write-back for throughput with WAL safeguards.',
  },
  {
    title: 'Plan placement and sharding',
    detail: 'Select L1/L2 tiers; shard with consistent hashing and replication for skewed hot keys.',
  },
  {
    title: 'Set TTL, admission, and eviction',
    detail: 'Use size-aware LRU/LFU; add TinyLFU filters; jitter TTLs to avoid synchronized expiry.',
  },
  {
    title: 'Implement coherence',
    detail: 'Versioned keys, explicit invalidation events, and request coalescing to stop thundering herds.',
  },
  {
    title: 'Instrument and guardrail',
    detail: 'Track hit ratio, bytes admitted, eviction causes, stale-serve counts, and stampede prevention efficacy.',
  },
]

const complexityTable = [
  {
    approach: 'LRU (hash + linked list)',
    time: 'O(1) ops',
    space: 'O(n)',
    note: 'Fast recency eviction; scan-vulnerable without tweaks.',
  },
  {
    approach: 'LFU / TinyLFU',
    time: 'O(1) avg',
    space: 'O(n)',
    note: 'Frequency-aware; admission filter resists cache pollution.',
  },
  {
    approach: 'Consistent hashing (k replicas)',
    time: 'O(log m) ring search',
    space: 'O(m)',
    note: 'Smooth rebalancing when nodes join/leave; m = nodes.',
  },
  {
    approach: 'Bloom filter check',
    time: 'O(k)',
    space: 'O(m)',
    note: 'Fast negative lookups; false positives only; k hashes, m bits.',
  },
]

const applications = [
  {
    title: 'Web and media CDNs',
    detail: 'Edge caches serve static assets and video chunks, cutting cross-region latency and peering costs.',
    note: 'Signed URLs and versioned paths keep coherence with origins.',
  },
  {
    title: 'Database query caching',
    detail: 'Memcached/Redis front relational or document stores for heavy read endpoints.',
    note: 'Cache-aside with per-row invalidation or table-version epochs.',
  },
  {
    title: 'Feature stores and ML serving',
    detail: 'Low-latency caches hold feature vectors and model outputs near inference services.',
    note: 'TTL balances freshness with throughput in fast-moving signals.',
  },
  {
    title: 'Ad tech and gaming state',
    detail: 'Leaderboards, session state, and auction context live in replicated caches for sub-10ms reads.',
    note: 'Requires anti-entropy between regions to avoid mismatch.',
  },
]

const failureStory =
  'A flash sale API hit 5x traffic; cache-aside Redis keys all expired at once, stampeding the database and causing a 10-minute outage. Adding TTL jitter, request coalescing, and a stale-while-revalidate window kept DB load flat in later events.'

const pitfalls = [
  {
    title: 'Thundering herds on miss or expiry',
    detail: 'Without coalescing, many workers recompute the same hot key simultaneously.',
  },
  {
    title: 'Stale or wrong data served as fresh',
    detail: 'Missing invalidation on writes or using unversioned keys leads to silent corruption.',
  },
  {
    title: 'Eviction bias and cache pollution',
    detail: 'Large or one-off items can evict the working set without TinyLFU or size-aware policies.',
  },
  {
    title: 'Memory blowups',
    detail: 'Unbounded caches or missing size limits lead to eviction storms or OOM conditions.',
  },
  {
    title: 'Clock and version drift',
    detail: 'Distributed TTLs and epochs break when clocks skew or writers do not bump versions uniformly.',
  },
]

const whenToUse = [
  {
    title: 'Read-heavy with locality',
    detail: 'Hot subsets repeat often enough that caching amortizes misses.',
  },
  {
    title: 'Latency or cost sensitive paths',
    detail: 'Serving from cache meaningfully cuts p99 or egress/IO costs.',
  },
  {
    title: 'Tolerable staleness or explicit coherence',
    detail: 'You can bound staleness or wire invalidation to keep correctness.',
  },
  {
    title: 'Predictable working set size',
    detail: 'You can set safe memory limits and eviction weights for objects.',
  },
]

const advanced = [
  {
    title: 'Write-back with WAL',
    detail: 'Queue writes in cache and persist asynchronously with a write-ahead log for durability.',
    note: 'Boosts throughput; requires replay and ordering guarantees.',
  },
  {
    title: 'Admission filters (TinyLFU)',
    detail: 'Sample frequencies decide whether to admit new items, shielding the cache from scans.',
    note: 'Reduces churn without extra latency on hits.',
  },
  {
    title: 'Hierarchical tiers (L1 + L2)',
    detail: 'In-process near-cache plus shared L2; promote on hit, invalidate with versions.',
    note: 'Cuts network hops for microservices while keeping coherence.',
  },
  {
    title: 'Negative and stale caching',
    detail: 'Cache 404s and allow stale-while-revalidate to cut stampedes and improve availability.',
    note: 'Bound lifetimes to avoid masking true fixes.',
  },
]

const codeExamples = [
  {
    title: 'LRU cache with size bound',
    code: `type Node<K, V> = { key: K; value: V; prev?: Node<K, V>; next?: Node<K, V> }

class LRUCache<K, V> {
  private map = new Map<K, Node<K, V>>()
  private head?: Node<K, V>
  private tail?: Node<K, V>
  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    const node = this.map.get(key)
    if (!node) return undefined
    this.touch(node) // promote to front
    return node.value
  }

  set(key: K, value: V) {
    const node = this.map.get(key)
    if (node) {
      node.value = value
      this.touch(node)
      return
    }
    const fresh: Node<K, V> = { key, value }
    this.map.set(key, fresh)
    this.insertFront(fresh)
    if (this.map.size > this.capacity) this.evict()
  }

  private touch(node: Node<K, V>) {
    if (node === this.head) return
    this.detach(node)
    this.insertFront(node)
  }

  private insertFront(node: Node<K, V>) {
    node.prev = undefined
    node.next = this.head
    if (this.head) this.head.prev = node
    this.head = node
    if (!this.tail) this.tail = node
  }

  private detach(node: Node<K, V>) {
    if (node.prev) node.prev.next = node.next
    if (node.next) node.next.prev = node.prev
    if (this.tail === node) this.tail = node.prev
    if (this.head === node) this.head = node.next
  }

  private evict() {
    if (!this.tail) return
    this.map.delete(this.tail.key)
    this.detach(this.tail)
  }
}`,
    explanation: 'Hash map gives O(1) lookups; doubly linked list tracks recency for O(1) eviction without array scans.',
  },
  {
    title: 'Consistent hashing ring',
    code: `type Node = { id: string }

class HashRing {
  private ring: Array<{ hash: number; node: Node }> = []
  constructor(nodes: Node[], private replicas = 100) {
    nodes.forEach((n) => this.addNode(n))
  }

  addNode(node: Node) {
    for (let i = 0; i < this.replicas; i++) {
      const h = this.hash(\`\${node.id}-\${i}\`)
      this.ring.push({ hash: h, node })
    }
    this.ring.sort((a, b) => a.hash - b.hash)
  }

  getNode(key: string): Node {
    const h = this.hash(key)
    let lo = 0
    let hi = this.ring.length
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (this.ring[mid].hash < h) lo = mid + 1
      else hi = mid
    }
    return this.ring[lo % this.ring.length].node // wrap around the ring
  }

  private hash(s: string) {
    let h = 2166136261
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
    return h >>> 0
  }
}`,
    explanation: 'Replicated virtual nodes smooth load; ring order keeps key movement minimal when nodes join or leave.',
  },
]

const keyTakeaways = [
  {
    title: 'Truth first, cache second',
    detail: 'Define the source of truth and coherence rules before picking a cache policy.',
  },
  {
    title: 'Stampedes are design bugs',
    detail: 'Jitter TTLs, coalesce requests, and allow stale-while-revalidate for hot keys.',
  },
  {
    title: 'Admission and eviction matter',
    detail: 'Size-aware policies and TinyLFU keep the working set resident instead of letting scans evict it.',
  },
  {
    title: 'Measure the health',
    detail: 'Watch hit ratio, tail latency, eviction causes, and stale-serves to guide tuning.',
  },
]

export default function SystemDesignCachesPage(): JSX.Element {
  return (
    <TopicLayout
      title="System Design (Caches, LRU, etc.)"
      subtitle="Keeping hot data close and consistent"
      intro="Caching is a system design lever for latency and load. The craft lies in picking interaction patterns, eviction and admission rules, sharding strategy, and coherence mechanisms that fit your truth source and risk tolerance."
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

      <TopicSection heading="History that shaped cache design">
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

      <TopicSection heading="Where caches power systems">
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

      <TopicSection heading="When to reach for caches">
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
