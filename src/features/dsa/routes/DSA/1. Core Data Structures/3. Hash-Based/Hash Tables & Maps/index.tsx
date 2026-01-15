import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

export default function HashTablesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Hash Tables & Maps</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
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
            <legend>Terminology that unlocks the rest</legend>
            <div className="win95-grid win95-grid-2">
              {terminology.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Table designs and collision policies</legend>
            <div className="win95-grid win95-grid-2">
              {tableDesigns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Hash function checklist</legend>
            <div className="win95-grid win95-grid-2">
              {hashFunctionChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Deletion strategies</legend>
            <div className="win95-grid win95-grid-2">
              {deletionStrategies.map((item) => (
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
            <legend>Correctness invariants</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessInvariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Performance considerations in practice</legend>
            <div className="win95-grid win95-grid-2">
              {performanceNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Testing checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {testingChecklist.map((item) => (
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
            <legend>Practice and build challenges</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {practicePrompts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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

