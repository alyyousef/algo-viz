import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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
    <TopicLayout
      title="Hash Tables & Maps"
      subtitle="Average-case O(1) lookups powered by mixing, probes, and careful load control"
      intro="Hash tables convert arbitrary keys into bucket indices so most lookups, inserts, and deletes finish in expected constant time. The promise depends on good mixing, controlled load factor, and collision strategies that keep probes short. This page lays out the history, mental models, mechanics, complexity, real deployments, and the engineering judgment needed to choose and tune hash maps."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Hash tables trade ordering for speed. By hashing keys into bucket positions, they avoid tree rotations or array shifts
          and instead depend on uniform randomness and resizing to keep operations near O(1). Their weakness is adversarial or
          unlucky collisions that stretch probe lengths, which modern hash functions, randomized seeding, and resize policies
          are designed to blunt.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMoments.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: hashing, collisions, resizing">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Hash tables succeed when hashes are uniform and probes stay short. They fail when clustering or high load factor forces
          long scans. Design choices in hash function, collision policy, and resize thresholds decide which outcome you get.
        </p>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Average O(1) hides constants: memory traffic, cache misses, and rehash pauses. Production tables care as much about
          variance and latency spikes as about big-O. Modern designs cap probe lengths, batch rehashing, and use cache-friendly
          layouts to stabilize tail latency.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorld.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and current frontiers">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Further reading: Knuth TAOCP Volume 3 for foundations, CLRS for analysis, GeeksforGeeks and LeetCode for practice, and
          papers on Robin Hood, Cuckoo, and consistent hashing for modern refinements.
        </p>
      </TopicSection>
    </TopicLayout>
  )
}
