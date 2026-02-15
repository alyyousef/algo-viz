import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMoments = [
  {
    title: 'Early symbol tables in compilers (1950s-1960s)',
    detail:
      'Assemblers and compilers needed fast label lookups. Hash-based symbol tables emerged to avoid linear scans, planting the idea of average O(1) lookup.',
  },
  {
    title: 'Donald Knuth formalizes hashing trade-offs (1963-1973)',
    detail:
      'Knuth analyzed open addressing, clustering, and load factors, giving the first systematic treatment in The Art of Computer Programming Volume 3.',
  },
  {
    title: 'Universal hashing (Carter and Wegman, 1979)',
    detail:
      'They introduced families of hash functions with provable low collision probability, showing randomized hashing can thwart adversarial key sets.',
  },
  {
    title: 'Linear probing made cache-friendly (Pagh, 1999; Smarter variants in 2010s)',
    detail:
      'Modern work showed Robin Hood hashing and cache-aware layouts reduce probe variance and exploit spatial locality, boosting real-world throughput.',
  },
  {
    title: 'Consistent hashing for distributed caches (Karger et al., 1997)',
    detail:
      'Consistent hashing minimized key movement during node churn, enabling scalable systems like Dynamo, Cassandra, and modern CDNs.',
  },
]

const mentalModels = [
  {
    title: 'Buckets as parking spots',
    detail:
      'The hash function is a parking attendant assigning cars (keys) to spots (buckets). A good attendant spreads cars evenly; collisions mean negotiating nearby spots or a short queue.',
  },
  {
    title: 'Mixing paint',
    detail:
      'Hashing mixes input bits so the output looks uniformly random. Poor mixing leaves streaks that create clusters and long probes.',
  },
  {
    title: 'Load factor as crowding',
    detail:
      'Load factor (n / buckets) is crowd density. Higher density raises collision probability and probe length. Keeping density below a threshold preserves O(1) expected time.',
  },
  {
    title: 'Determinism vs adversaries',
    detail:
      'A fixed hash can be gamed. Randomized seeding and universal hashing make it difficult for adversarial inputs to force pathological collisions.',
  },
]

const terminology = [
  {
    term: 'Bucket and slot',
    detail:
      'A bucket is a logical container for keys that map to the same index. In open addressing, buckets are physical slots.',
  },
  {
    term: 'Load factor (alpha)',
    detail:
      'alpha = n / capacity. Controls collision probability and expected probe length.',
  },
  {
    term: 'Collision',
    detail:
      'Two distinct keys hash to the same bucket. Collision policy determines how they are stored.',
  },
  {
    term: 'Probe sequence',
    detail:
      'The deterministic order of alternative slots checked after a collision (linear, quadratic, double-hash).',
  },
  {
    term: 'Tombstone',
    detail:
      'A deletion marker in open addressing that preserves probe sequences for future lookups.',
  },
  {
    term: 'Rehash',
    detail:
      'Recompute bucket positions, typically after resizing or changing hash parameters.',
  },
]

const tableDesigns = [
  {
    title: 'Separate chaining',
    detail:
      'Buckets store short lists or arrays. Tolerates high load factors but uses pointers and extra memory.',
  },
  {
    title: 'Linear probing',
    detail:
      'Simple open addressing with contiguous probes. Great cache locality but primary clustering risk.',
  },
  {
    title: 'Quadratic probing',
    detail:
      'Probes at i^2 offsets to reduce clustering. Requires careful capacity choices to guarantee coverage.',
  },
  {
    title: 'Double hashing',
    detail:
      'Second hash function sets the probe step. Reduces clustering; sensitive to good hash choices.',
  },
  {
    title: 'Robin Hood',
    detail:
      'Keeps probe lengths even by swapping with shorter-distance entries. Low variance for lookups.',
  },
  {
    title: 'Cuckoo hashing',
    detail:
      'Two or more candidate slots per key. Constant-time lookups; inserts may trigger relocations.',
  },
  {
    title: 'Hopscotch hashing',
    detail:
      'Maintains a small neighborhood for each bucket, balancing locality and insertion success rates.',
  },
]

const hashFunctionChecklist = [
  {
    title: 'Uniformity',
    detail:
      'Small changes in key should scramble output bits. Avoid simple modulo of sequential keys.',
  },
  {
    title: 'Speed and stability',
    detail:
      'Fast enough for hot paths; deterministic for persistence or random-seeded for security.',
  },
  {
    title: 'Keyed defense',
    detail:
      'Use SipHash or random seeds when inputs are attacker-controlled to prevent hash-flooding.',
  },
  {
    title: 'Width and mixing',
    detail:
      'Ensure output uses high-quality mixing, especially when capacity is a power of two.',
  },
]

const deletionStrategies = [
  {
    title: 'Chaining delete',
    detail:
      'Remove from the bucket list; often O(1) when bucket is small.',
  },
  {
    title: 'Tombstones',
    detail:
      'Mark slots as deleted in open addressing. Required for correctness but degrades over time.',
  },
  {
    title: 'Backward shift deletion',
    detail:
      'Compacts runs after delete (used in SwissTable variants). Avoids tombstones but needs careful logic.',
  },
  {
    title: 'Rebuild on delete ratio',
    detail:
      'Trigger rehash when tombstones exceed a threshold to restore probe lengths.',
  },
]

const mechanics = [
  {
    heading: 'Hash function selection',
    bullets: [
      'Properties: uniformity, speed, low collision probability, and stability across runs when needed.',
      'Common choices: MurmurHash, xxHash, SipHash (defensive, keyed), and FNV variants for simplicity.',
      'Key seeding: random per-process seeds reduce adversarial collision attacks on user-supplied keys.',
    ],
  },
  {
    heading: 'Collision resolution',
    bullets: [
      'Separate chaining: buckets hold small lists or arrays of entries. Degrades gracefully; memory overhead from pointers.',
      'Open addressing: store entries in the bucket array; probe on collision. Variants include linear probing, quadratic probing, double hashing, and Robin Hood hashing to even out probe lengths.',
      'Cuckoo hashing: two or more hash functions; on collision, kick out an existing key to its alternate position. Yields constant worst-case lookups when successful but may need occasional rehash.',
    ],
  },
  {
    heading: 'Resizing and load factor control',
    bullets: [
      'Trigger resize when load factor crosses a threshold (for example, 0.5 to 0.75 for open addressing, higher for chaining).',
      'Rehash all entries into a larger table (often doubling size). Allocate slack to reduce immediate future resizes.',
      'Incremental rehashing can spread the cost over operations to avoid latency spikes.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Average vs worst case',
    detail:
      'Expected O(1) for lookup/insert/delete assumes uniform hashing and controlled load factor. Worst case is O(n) if all keys collide or probing cycles, which robust hashing and resize policies avoid in practice.',
  },
  {
    title: 'Probe lengths and clustering',
    detail:
      'Linear probing suffers primary clustering; Robin Hood reduces variance by letting long-probe items steal closer slots. Cuckoo hashing keeps lookups to O(1) with two bucket checks, but inserts may trigger rehashes.',
  },
  {
    title: 'Memory footprint',
    detail:
      'Open addressing is compact but wastes slack for empty buckets. Chaining adds pointer overhead but keeps load factors higher (1.5 to 2 is common) with stable performance.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Open addressing favors cache because data is contiguous; chaining chases pointers and can thrash caches. Compact bucket arrays plus small inline overflow areas improve locality.',
  },
]

const performanceNotes = [
  {
    title: 'Open addressing loves cache',
    detail:
      'Contiguous probes hit fewer cache lines. Flat hash maps exploit SIMD to scan control bytes quickly.',
  },
  {
    title: 'Chaining loves high alpha',
    detail:
      'Chaining stays stable at higher load factors but pointer chasing hurts locality.',
  },
  {
    title: 'Resize spikes',
    detail:
      'Full rehashing is O(n) and can cause latency spikes; incremental rehash spreads the cost.',
  },
  {
    title: 'Key size matters',
    detail:
      'Large keys dominate time; consider storing hashes or interning strings for speed.',
  },
]

const correctnessInvariants = [
  {
    title: 'Lookup correctness',
    detail:
      'If key exists, the probe sequence must reach it. Deletions must not break this invariant.',
  },
  {
    title: 'No duplicate keys',
    detail:
      'Insert must update existing key rather than creating duplicates within a bucket or probe chain.',
  },
  {
    title: 'Load-factor policy',
    detail:
      'Resizing thresholds must guarantee probe sequences stay bounded in expectation.',
  },
  {
    title: 'Hash stability',
    detail:
      'Keys must not mutate after insertion or their hash and equality change.',
  },
]

const realWorld = [
  {
    context: 'Language runtimes',
    detail:
      'Python dict, JavaScript object/Map, and Go map are optimized hash tables. They use random seeding, load-factor targets, and resizing strategies to give predictable average O(1) behavior.',
  },
  {
    context: 'Databases and storage engines',
    detail:
      'Buffer caches, log-structured merge components, and hash indexes use hash tables for quick key-to-page lookups when ordering is unnecessary or a companion to B-trees.',
  },
  {
    context: 'Networking and security',
    detail:
      'Routers maintain MAC/IP maps; NAT tables and connection trackers rely on hash tables with time-based eviction. SipHash was adopted to harden against hash-flood denial-of-service attacks.',
  },
  {
    context: 'Compilers and interpreters',
    detail:
      'Symbol tables, interning maps, and inline caches use hashing for constant-time name resolution and memoization of dynamic lookups.',
  },
  {
    context: 'Distributed caching and sharding',
    detail:
      'Consistent hashing spreads keys across nodes with minimal movement during node churn, reducing cache invalidations and balancing load in systems like Dynamo and CDN edge networks.',
  },
]

const examples = [
  {
    title: 'Separate chaining insert and lookup',
    code: `function insert(table, key, value):
    idx = hash(key) mod table.buckets.length
    bucket = table.buckets[idx]
    for entry in bucket:
        if entry.key == key:
            entry.value = value
            return
    bucket.append({ key, value })
    table.count += 1

function lookup(table, key):
    idx = hash(key) mod table.buckets.length
    for entry in table.buckets[idx]:
        if entry.key == key:
            return entry.value
    return null`,
    explanation:
      'Chaining keeps operations O(1) expected as long as buckets stay short. Comparing keys after hash avoids treating collisions as duplicates.',
  },
  {
    title: 'Open addressing with linear probing',
    code: `function insert(table, key, value):
    idx = hash(key) mod table.capacity
    for i in 0 .. table.capacity-1:
        probe = (idx + i) mod table.capacity
        slot = table.slots[probe]
        if slot is EMPTY or slot is TOMBSTONE:
            table.slots[probe] = { key, value }
            table.count += 1
            return
        if slot.key == key:
            slot.value = value
            return
    throw TableFull

function lookup(table, key):
    idx = hash(key) mod table.capacity
    for i in 0 .. table.capacity-1:
        probe = (idx + i) mod table.capacity
        slot = table.slots[probe]
        if slot is EMPTY:
            return null  // stop at first empty slot
        if slot is TOMBSTONE:
            continue
        if slot.key == key:
            return slot.value
    return null`,
    explanation:
      'Linear probing is simple and cache-friendly. Tombstones preserve probe sequences after deletions so lookups do not terminate early.',
  },
  {
    title: 'Robin Hood probing intuition',
    code: `// During insertion, track probe length (distance from original hash).
// If the current slot's occupant has a shorter probe length than the new item,
// swap them. This evens out probe lengths.

function insert_robin_hood(table, key, value):
    idx = hash(key) mod table.capacity
    dist = 0
    entry = { key, value }
    for i in 0 .. table.capacity-1:
        probe = (idx + i) mod table.capacity
        slot = table.slots[probe]
        if slot is EMPTY or slot is TOMBSTONE:
            table.slots[probe] = entry
            table.count += 1
            return
        if slot.key == entry.key:
            slot.value = value
            return
        existing_dist = probe_distance(slot.key, probe, table.capacity)
        if existing_dist < dist:
            table.slots[probe], entry = entry, slot
        dist += 1
    throw TableFull`,
    explanation:
      'Robin Hood hashing reduces variance of probe lengths, improving worst-case lookup even if average is similar. This matters in latency-sensitive systems.',
  },
  {
    title: 'Cuckoo hashing insert sketch',
    code: `function insert_cuckoo(table, key, value):
    for kick in 0 .. MAX_KICKS:
        if table.slot1(key) is EMPTY:
            place at slot1
            return
        if table.slot2(key) is EMPTY:
            place at slot2
            return
        // kick out an existing entry
        swap(key, value, table.slot1(key))
    rehash to larger table`,
    explanation:
      'Cuckoo hashing guarantees O(1) lookups (check two positions). Insertions may loop, so a rehash or stash handles cycles.',
  },
  {
    title: 'Consistent hashing ring',
    code: `function place_nodes(nodes):
    ring = sort(hash(node_id) for node in nodes)

function lookup(key):
    h = hash(key)
    return first node clockwise from h (wrap if needed)`,
    explanation:
      'Consistent hashing maps keys onto a ring; adding or removing a node moves only nearby keys, minimizing churn.',
  },
]

const pitfalls = [
  'Using poor hash functions causes clustering and long probe sequences; rely on vetted mixers or runtime-provided hashing.',
  'Allowing load factor to grow unchecked degrades to O(n); enforce resize thresholds.',
  'Neglecting to compare full keys after hash can conflate distinct keys that collide.',
  'For open addressing, forgetting tombstones or probe continuation after deletion breaks future lookups.',
  'Mutable keys change their hash mid-life; never use mutable objects as keys unless you freeze or copy them.',
  'Unseeded predictable hashes invite hash-flood attacks on public-facing services; use randomized seeds or keyed hashes like SipHash.',
  'Letting tombstones accumulate can make performance collapse; rebuild when delete ratios climb.',
  'Storing large values inline bloats buckets; store pointers or small structs to improve cache behavior.',
]

const decisionGuidance = [
  'Need fast key-to-value lookups without ordering: choose hash tables; prefer open addressing for cache locality, chaining when deletions are heavy.',
  'Need predictable iteration order: use ordered maps (tree-based) or specialized ordered-hash variants that store insertion order.',
  'Need range queries: choose balanced search trees or B-trees; hashing discards order.',
  'Need memory efficiency with low variance: consider Robin Hood hashing or hopscotch hashing; avoid oversized buckets in small-memory environments.',
  'Need distributed sharding: use consistent hashing to reduce data movement when nodes join or leave.',
  'Need adversarial resilience: use keyed hashes and enforce per-bucket limits or rehash on collision storms.',
  'Need mostly reads with fixed key set: consider perfect hashing or frozen hash maps for minimal memory.',
]

const advancedInsights = [
  {
    title: 'Cache-aware and SIMD acceleration',
    detail:
      'Flat hash tables (Abseil flat_hash_map, Folly F14) use SIMD to test multiple buckets at once and store metadata sidecars (control bytes) for fast probing.',
  },
  {
    title: 'Incremental and lazy rehashing',
    detail:
      'Instead of rehashing all keys at once, move a few buckets per operation, keeping latency bounded. Dual-table techniques migrate entries gradually.',
  },
  {
    title: 'Cuckoo and d-ary hashing',
    detail:
      'Multiple hash choices bound lookup probes. Cuckoo hashing offers two or more candidate buckets; d-left hashing splits tables to reduce collisions; both need cycle detection and occasional rebuilds.',
  },
  {
    title: 'Hash-flood resilience',
    detail:
      'Keyed hashes (SipHash) and universal hashing protect against attacker-chosen keys that force collisions. Many runtimes seed hashes per process to randomize bucket assignment.',
  },
  {
    title: 'Testing and verification',
    detail:
      'Property tests should assert lookup(find(k)) == v after randomized inserts and deletes, that load factor stays below thresholds, and that probe sequences remain intact after deletions. Cross-validate against reference maps on small datasets.',
  },
]

const testingChecklist = [
  'Verify insert/lookup/delete on random and adversarial keys.',
  'Check that duplicates overwrite rather than create two entries.',
  'Fuzz with random deletes to expose tombstone bugs.',
  'Measure probe lengths as load factor increases.',
  'Cross-validate against a reference map on small datasets.',
  'Stress test with long strings and large keys for hash stability.',
]

const practicePrompts = [
  'Implement linear probing with tombstones and measure probe lengths.',
  'Add Robin Hood swapping and compare variance of lookups.',
  'Build a chained hash map with dynamic bucket arrays.',
  'Implement incremental rehashing to cap latency spikes.',
  'Build a consistent hashing ring with virtual nodes.',
  'Compare SipHash vs xxHash for speed and collision behavior.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const hash98HelpStyles = `
.hash98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.hash98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.hash98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.hash98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.hash98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.hash98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  padding: 0;
}

.hash98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.hash98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.hash98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.hash98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.hash98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.hash98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.hash98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.hash98-toc-list li {
  margin: 0 0 8px;
}

.hash98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.hash98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.hash98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.hash98-section {
  margin: 0 0 20px;
}

.hash98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.hash98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.hash98-content p,
.hash98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.hash98-content p {
  margin: 0 0 10px;
}

.hash98-content ul,
.hash98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.hash98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.hash98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.hash98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .hash98-main {
    grid-template-columns: 1fr;
  }

  .hash98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-designs', label: 'Table Designs' },
    { id: 'bp-real-world', label: 'Real-World Applications' },
  ],
  'core-concepts': [
    { id: 'core-terms', label: 'Terminology' },
    { id: 'core-hash-check', label: 'Hash Function Checklist' },
    { id: 'core-delete', label: 'Deletion Strategies' },
    { id: 'core-mechanics', label: 'Mechanics' },
    { id: 'core-invariants', label: 'Correctness Invariants' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-performance', label: 'Performance Notes' },
    { id: 'core-decision', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
    { id: 'ex-testing', label: 'Testing Checklist' },
    { id: 'ex-practice', label: 'Practice Prompts' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function HashTablesPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Hash Tables & Maps (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Hash Tables & Maps',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="hash98-help-page">
      <style>{hash98HelpStyles}</style>
      <div className="hash98-window" role="presentation">
        <header className="hash98-titlebar">
          <span className="hash98-title-text">Hash Tables &amp; Maps</span>
          <div className="hash98-title-controls">
            <button className="hash98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="hash98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="hash98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`hash98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="hash98-main">
          <aside className="hash98-toc" aria-label="Table of contents">
            <h2 className="hash98-toc-title">Contents</h2>
            <ul className="hash98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="hash98-content">
            <h1 className="hash98-doc-title">Hash Tables &amp; Maps</h1>
            <p>
              Hash tables convert arbitrary keys into bucket indices so most lookups, inserts, and deletes finish in expected constant
              time. The promise depends on good mixing, controlled load factor, and collision strategies that keep probes short.
            </p>
            <p>
              Hash tables trade ordering for speed. By hashing keys into bucket positions, they avoid tree rotations or array shifts and
              instead depend on uniform randomness and resizing to keep operations near O(1).
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="hash98-section">
                  <h2 className="hash98-heading">Overview</h2>
                  <p>
                    Their weakness is adversarial or unlucky collisions that stretch probe lengths, which modern hash functions, randomized
                    seeding, and resize policies are designed to blunt.
                  </p>
                </section>
                <hr className="hash98-divider" />
                <section id="bp-history" className="hash98-section">
                  <h2 className="hash98-heading">Historical Context</h2>
                  {historicalMoments.map((item) => (
                    <div key={item.title}>
                      <h3 className="hash98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="hash98-section">
                  <h2 className="hash98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-designs" className="hash98-section">
                  <h2 className="hash98-heading">Table Designs and Collision Policies</h2>
                  {tableDesigns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-real-world" className="hash98-section">
                  <h2 className="hash98-heading">Real-World Applications</h2>
                  {realWorld.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-terms" className="hash98-section">
                  <h2 className="hash98-heading">Terminology</h2>
                  {terminology.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-hash-check" className="hash98-section">
                  <h2 className="hash98-heading">Hash Function Checklist</h2>
                  {hashFunctionChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-delete" className="hash98-section">
                  <h2 className="hash98-heading">Deletion Strategies</h2>
                  {deletionStrategies.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics" className="hash98-section">
                  <h2 className="hash98-heading">How It Works: Hashing, Collisions, Resizing</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="hash98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p>
                    Design choices in hash function, collision policy, and resize thresholds decide whether probes stay short under load.
                  </p>
                </section>
                <section id="core-invariants" className="hash98-section">
                  <h2 className="hash98-heading">Correctness Invariants</h2>
                  {correctnessInvariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="hash98-section">
                  <h2 className="hash98-heading">Complexity Analysis and Performance Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="hash98-section">
                  <h2 className="hash98-heading">Performance Considerations in Practice</h2>
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decision" className="hash98-section">
                  <h2 className="hash98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="hash98-section">
                  <h2 className="hash98-heading">Advanced Insights and Current Frontiers</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="hash98-section">
                  <h2 className="hash98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-practical" className="hash98-section">
                  <h2 className="hash98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="hash98-subheading">{example.title}</h3>
                      <div className="hash98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-testing" className="hash98-section">
                  <h2 className="hash98-heading">Testing Checklist</h2>
                  <ul>
                    {testingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="ex-practice" className="hash98-section">
                  <h2 className="hash98-heading">Practice and Build Challenges</h2>
                  <ul>
                    {practicePrompts.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="hash98-section">
                <h2 className="hash98-heading">Glossary</h2>
                {terminology.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.detail}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

