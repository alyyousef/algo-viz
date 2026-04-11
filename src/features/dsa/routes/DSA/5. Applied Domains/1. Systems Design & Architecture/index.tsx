import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Latency buffer',
    detail:
      'Caches cut round trips to slow storage or distant regions, flattening tail latency for hot keys.',
    note: 'Primary benefit in read-heavy workloads where the working set fits in faster memory tiers.',
  },
  {
    title: 'Load shedder',
    detail:
      'Absorbs burst traffic and protects databases from stampedes by serving cached responses.',
    note: 'Common front line for product launches and flash sales.',
  },
  {
    title: 'Shape shifter',
    detail:
      'Choose patterns (cache-aside, write-through, write-back) to match consistency and durability needs.',
    note: 'Design starts with the source of truth, not with the cache.',
  },
  {
    title: 'Risk trade',
    detail:
      'Gain speed but risk staleness, eviction bias, or silent data loss unless coherence is explicit.',
    note: 'Observability and invalidation strategy decide success, not just policy choice.',
  },
]

const history = [
  {
    title: '1960s: CPU and VM caches',
    detail:
      'Processor caches and virtual memory popularize multi-level memory hierarchies for locality.',
    note: 'Introduced the idea of recency/frequency-driven eviction.',
  },
  {
    title: '1998: Akamai CDN launch',
    detail:
      'Edge caches move static assets closer to users, pioneering global HTTP caching at scale.',
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
    detail:
      'Choose in-process, near-cache, or network cache; shard with consistent hashing to avoid churn.',
  },
  {
    title: 'Eviction and admission',
    detail: 'Select LRU/LFU/TinyLFU and weight by size; admission filters stop cache pollution.',
  },
  {
    title: 'Durability and write path',
    detail:
      'Pick cache-aside, write-through, or write-back with WAL/queue if writes pass through cache.',
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
    detail:
      'Pick the system of record and decide if the cache may serve stale values and for how long.',
  },
  {
    title: 'Choose interaction pattern',
    detail:
      'Cache-aside for flexibility, write-through for coherence, write-back for throughput with WAL safeguards.',
  },
  {
    title: 'Plan placement and sharding',
    detail:
      'Select L1/L2 tiers; shard with consistent hashing and replication for skewed hot keys.',
  },
  {
    title: 'Set TTL, admission, and eviction',
    detail:
      'Use size-aware LRU/LFU; add TinyLFU filters; jitter TTLs to avoid synchronized expiry.',
  },
  {
    title: 'Implement coherence',
    detail:
      'Versioned keys, explicit invalidation events, and request coalescing to stop thundering herds.',
  },
  {
    title: 'Instrument and guardrail',
    detail:
      'Track hit ratio, bytes admitted, eviction causes, stale-serve counts, and stampede prevention efficacy.',
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
    detail:
      'Edge caches serve static assets and video chunks, cutting cross-region latency and peering costs.',
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
    detail:
      'Leaderboards, session state, and auction context live in replicated caches for sub-10ms reads.',
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
    detail:
      'Large or one-off items can evict the working set without TinyLFU or size-aware policies.',
  },
  {
    title: 'Memory blowups',
    detail: 'Unbounded caches or missing size limits lead to eviction storms or OOM conditions.',
  },
  {
    title: 'Clock and version drift',
    detail:
      'Distributed TTLs and epochs break when clocks skew or writers do not bump versions uniformly.',
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
    detail:
      'Queue writes in cache and persist asynchronously with a write-ahead log for durability.',
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
    detail:
      'Cache 404s and allow stale-while-revalidate to cut stampedes and improve availability.',
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
    explanation:
      'Hash map gives O(1) lookups; doubly linked list tracks recency for O(1) eviction without array scans.',
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
    explanation:
      'Replicated virtual nodes smooth load; ring order keeps key movement minimal when nodes join or leave.',
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
    detail:
      'Size-aware policies and TinyLFU keep the working set resident instead of letting scans evict it.',
  },
  {
    title: 'Measure the health',
    detail: 'Watch hit ratio, tail latency, eviction causes, and stale-serves to guide tuning.',
  },
]

const glossary = [
  {
    term: 'Cache-aside',
    definition:
      'Application reads from cache first and falls back to the source of truth on a miss.',
  },
  {
    term: 'Write-through',
    definition: 'Writes update the cache and underlying store together to keep reads coherent.',
  },
  {
    term: 'Write-back',
    definition:
      'Writes land in cache first and are persisted later, usually with WAL or queue support.',
  },
  {
    term: 'LRU',
    definition: 'Least Recently Used eviction policy that removes items not touched recently.',
  },
  {
    term: 'TinyLFU',
    definition:
      'Frequency-aware admission approach that helps block one-off scans from polluting the cache.',
  },
  {
    term: 'TTL',
    definition:
      'Time-to-live expiration window after which a cached item is no longer considered fresh.',
  },
  {
    term: 'Consistent hashing',
    definition: 'Sharding method that limits key movement when cache nodes join or leave.',
  },
  {
    term: 'Stale-while-revalidate',
    definition:
      'Serve slightly stale data briefly while a background refresh repopulates the cache.',
  },
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
    { id: 'core-pillars', label: 'Design Pillars' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-flow', label: 'How It Works' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-when', label: 'When to Use Caches' },
    { id: 'core-advanced', label: 'Advanced Moves' },
  ],
  examples: [
    { id: 'ex-failure', label: 'Failure Mode' },
    { id: 'ex-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function SystemDesignCachesPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Systems Design & Architecture',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Systems Design & Architecture"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Systems Design & Architecture</h1>
      <p className="sd-help-intro">
        Caching is a system design lever for latency and load. The craft lies in picking interaction
        patterns, eviction and admission rules, sharding strategy, and coherence mechanisms that fit
        your truth source and risk tolerance.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History That Shaped Cache Design</h2>
            {history.map((event) => (
              <div key={event.title}>
                <h3 className="bin98-subheading">{event.title}</h3>
                <p>{event.detail}</p>
                <p>{event.note}</p>
              </div>
            ))}
          </section>

          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Where Caches Power Systems</h2>
            {applications.map((app) => (
              <div key={app.title}>
                <h3 className="bin98-subheading">{app.title}</h3>
                <p>{app.detail}</p>
                <p>{app.note}</p>
              </div>
            ))}
          </section>

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            {keyTakeaways.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars" className="bin98-section">
            <h2 className="bin98-heading">Design Pillars</h2>
            {pillars.map((pillar) => (
              <p key={pillar.title}>
                <strong>{pillar.title}:</strong> {pillar.detail}
              </p>
            ))}
          </section>

          <section id="core-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((model) => (
              <p key={model.title}>
                <strong>{model.title}:</strong> {model.detail}
              </p>
            ))}
          </section>

          <section id="core-flow" className="bin98-section">
            <h2 className="bin98-heading">How It Works, Step by Step</h2>
            {howItWorks.map((step, index) => (
              <p key={step.title}>
                <strong>
                  Step {index + 1}: {step.title}:
                </strong>{' '}
                {step.detail}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity at a Glance</h2>
            {complexityTable.map((row) => (
              <p key={row.approach}>
                <strong>{row.approach}:</strong> Time {row.time}; Space {row.space}; {row.note}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls to Avoid</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.detail}
                </li>
              ))}
            </ul>
          </section>

          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Reach for Caches</h2>
            {whenToUse.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Moves</h2>
            {advanced.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-failure" className="bin98-section">
            <h2 className="bin98-heading">Failure Mode</h2>
            <p>{failureStory}</p>
          </section>

          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {codeExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
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
