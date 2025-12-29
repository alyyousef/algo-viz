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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">System Design (Caches, LRU, etc.)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Keeping hot data close and consistent</div>
              <p className="win95-text">
                Caching is a system design lever for latency and load. The craft lies in picking interaction patterns, eviction and
                admission rules, sharding strategy, and coherence mechanisms that fit your truth source and risk tolerance.
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
            <legend>History that shaped cache design</legend>
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
            <div className="win95-row">
              <div className="win95-panel">
                <div className="win95-subheading">Pillars</div>
                <div className="win95-stack">
                  {pillars.map((pillar) => (
                    <div key={pillar.title} className="win95-panel">
                      <div className="win95-heading">{pillar.title}</div>
                      <p className="win95-text">{pillar.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="win95-panel">
                <div className="win95-subheading">Mental models</div>
                <div className="win95-stack">
                  {mentalModels.map((model) => (
                    <div key={model.title} className="win95-panel">
                      <div className="win95-heading">{model.title}</div>
                      <p className="win95-text">{model.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works, step by step</legend>
            <div className="win95-grid win95-grid-3">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">
                    Step {index + 1}: {step.title}
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
            <legend>Where caches power systems</legend>
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
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls to avoid</legend>
            <div className="win95-grid win95-grid-2">
              {pitfalls.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to reach for caches</legend>
            <div className="win95-grid win95-grid-2">
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
