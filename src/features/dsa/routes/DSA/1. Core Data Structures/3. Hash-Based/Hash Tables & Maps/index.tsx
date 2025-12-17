import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  width: 100%;
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
  font-size: 12px;
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

.win95-page a:focus {
  outline: 1px dotted #000;
  outline-offset: 2px;
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
  font-size: 12px;
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

.win95-content {
  padding: 10px;
}

.win95-hero {
  margin-bottom: 10px;
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
  gap: 8px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.win95-stack {
  display: flex;
  flex-direction: column;
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
]

const pitfalls = [
  'Using poor hash functions causes clustering and long probe sequences; rely on vetted mixers or runtime-provided hashing.',
  'Allowing load factor to grow unchecked degrades to O(n); enforce resize thresholds.',
  'Neglecting to compare full keys after hash can conflate distinct keys that collide.',
  'For open addressing, forgetting tombstones or probe continuation after deletion breaks future lookups.',
  'Mutable keys change their hash mid-life; never use mutable objects as keys unless you freeze or copy them.',
  'Unseeded predictable hashes invite hash-flood attacks on public-facing services; use randomized seeds or keyed hashes like SipHash.',
]

const decisionGuidance = [
  'Need fast key-to-value lookups without ordering: choose hash tables; prefer open addressing for cache locality, chaining when deletions are heavy.',
  'Need predictable iteration order: use ordered maps (tree-based) or specialized ordered-hash variants that store insertion order.',
  'Need range queries: choose balanced search trees or B-trees; hashing discards order.',
  'Need memory efficiency with low variance: consider Robin Hood hashing or hopscotch hashing; avoid oversized buckets in small-memory environments.',
  'Need distributed sharding: use consistent hashing to reduce data movement when nodes join or leave.',
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

export default function HashTablesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Hash Tables & Maps</span>
          <div className="win95-title-controls">
            <button className="win95-control" type="button" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-hero">
            <div className="win95-subheading">
              Average-case O(1) lookups powered by mixing, probes, and careful load control
            </div>
            <p className="win95-text">
              Hash tables convert arbitrary keys into bucket indices so most lookups, inserts, and deletes finish in expected
              constant time. The promise depends on good mixing, controlled load factor, and collision strategies that keep
              probes short. This page lays out the history, mental models, mechanics, complexity, real deployments, and the
              engineering judgment needed to choose and tune hash maps.
            </p>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Hash tables trade ordering for speed. By hashing keys into bucket positions, they avoid tree rotations or
                array shifts and instead depend on uniform randomness and resizing to keep operations near O(1). Their weakness
                is adversarial or unlucky collisions that stretch probe lengths, which modern hash functions, randomized
                seeding, and resize policies are designed to blunt.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMoments.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: hashing, collisions, resizing</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Hash tables succeed when hashes are uniform and probes stay short. They fail when clustering or high load
                factor forces long scans. Design choices in hash function, collision policy, and resize thresholds decide which
                outcome you get.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and performance intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Average O(1) hides constants: memory traffic, cache misses, and rehash pauses. Production tables care as much
                about variance and latency spikes as about big-O. Modern designs cap probe lengths, batch rehashing, and use
                cache-friendly layouts to stabilize tail latency.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorld.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
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
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights and current frontiers</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
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
