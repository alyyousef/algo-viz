import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Shape data for access',
    detail: 'B+ trees suit mixed reads and writes; LSMs suit write-heavy ingest with batch merges.',
    note: 'Match engine to workload: OLTP, append-only logs, or analytics.',
  },
  {
    title: 'Control amplification',
    detail: 'Each design adds read, write, and space overhead; tune to keep costs inside your SLA.',
    note: 'Fill factors, compaction style, and bloom filters are key dials.',
  },
  {
    title: 'Range and point queries',
    detail: 'Sorted leaves and SSTables make ranges fast; hash indexes are for point lookups.',
    note: 'Design indexes around actual WHERE/ORDER BY patterns.',
  },
  {
    title: 'Durability before speed',
    detail: 'WALs, fences, and checksums protect against torn pages and partial flushes.',
    note: 'Write ordering matters as much as the data structure.',
  },
]

const history = [
  {
    title: '1979: B-tree in System R',
    detail: 'IBM ships B-tree variants for relational indexes, inspiring B+ tree dominance in databases.',
    note: 'Fanout-aware design minimized disk seeks on spinning media.',
  },
  {
    title: '1996: LSM trees formalized',
    detail: 'Patrick O\'Neil et al. describe Log-Structured Merge trees for write-heavy workloads.',
    note: 'Introduced leveled and tiered compaction to tame write amplification.',
  },
  {
    title: '2006: Bigtable and SSTables',
    detail: 'Google Bigtable popularizes LSM-based storage with immutable sorted files and memtables.',
    note: 'Pattern spreads to HBase, Cassandra, and RocksDB.',
  },
  {
    title: '2013+: RocksDB/TiKV era',
    detail: 'Open-source LSM engines add pluggable compaction, bloom filters, and caches.',
    note: 'LSMs become common for high-ingest key-value stores.',
  },
]

const pillars = [
  {
    title: 'Sorted blocks',
    detail: 'Leaves or SSTables are sorted; internal nodes or block indexes map ranges to blocks.',
  },
  {
    title: 'Fanout and page size',
    detail: 'Match node size to storage block to maximize fanout and minimize height.',
  },
  {
    title: 'Write path discipline',
    detail: 'WAL before data (B+), memtable flush markers and manifest (LSM) to survive crashes.',
  },
  {
    title: 'Compaction or balancing',
    detail: 'B+ splits/merges locally; LSM compacts across levels to cap amplification.',
  },
]

const mentalModels = [
  {
    title: 'Phone book vs journal',
    detail:
      'B+ tree is a phone book kept tidy with inserts; LSM is a journal periodically sorted and merged. The phone book gives steady lookup; the journal is fast to append but needs regular rewrites.',
  },
  {
    title: 'Shelves and carts',
    detail:
      'B+ keeps books shelved and balanced; LSM tosses books onto carts (memtables) then reshelves in batches (compaction). Carts overflow if reshelving lags.',
  },
  {
    title: 'Highways vs freight trains',
    detail:
      'B+ spreads traffic evenly with on-ramps (splits). LSM batches freight; high throughput but slow to reroute if a train stalls (compaction backlog).',
  },
]

const howItWorks = [
  {
    title: 'Plan the workload',
    detail: 'List read/write mix, range needs, and latency/throughput targets before choosing an engine.',
  },
  {
    title: 'Lay out pages/blocks',
    detail: 'Pick block size to match IO; set fanout (B+) or table/block size and index format (LSM).',
  },
  {
    title: 'Define write path',
    detail: 'B+: WAL then page split/merge with latches. LSM: WAL plus memtable flush to SSTables with indexes.',
  },
  {
    title: 'Index for queries',
    detail: 'Use clustered primaries for ranges, secondary/covering indexes for hot predicates, bloom filters to skip SSTables.',
  },
  {
    title: 'Manage amplification',
    detail: 'Tune fill factors, level sizes, compaction style, and bloom bits per key to cap overhead.',
  },
  {
    title: 'Protect and observe',
    detail: 'Use checksums, fencing, sequence numbers, and metrics (cache hit, compaction debt, false positives).',
  },
]

const complexityTable = [
  {
    approach: 'B+ tree point/range lookup',
    time: 'O(log_f N + k)',
    space: 'O(N)',
    note: 'f = fanout, k = rows returned; height stays small with large pages.',
  },
  {
    approach: 'LSM point read (with bloom)',
    time: 'O(levels) index + O(k)',
    space: 'O(N)',
    note: 'Bloom filters skip most files; without them reads degrade to many SSTable probes.',
  },
  {
    approach: 'B+ tree insert/update',
    time: 'O(log_f N)',
    space: 'O(N)',
    note: 'Node splits amortized; stable latency if pages are cached.',
  },
  {
    approach: 'LSM write',
    time: 'O(1) amortized ingest; compaction adds O(log N) write amp',
    space: 'O(N + overhead)',
    note: 'Compaction style dictates write amplification and read fanout.',
  },
]

const applications = [
  {
    title: 'Relational OLTP engines',
    detail: 'B+ trees for clustered/secondary indexes in MySQL, PostgreSQL, SQL Server.',
    note: 'Predictable latency for mixed read/write transactions.',
  },
  {
    title: 'High-ingest key-value stores',
    detail: 'Cassandra, HBase, RocksDB, and TiKV rely on LSM trees with bloom filters and block caches.',
    note: 'Solid fit for append-heavy workloads with large fanout.',
  },
  {
    title: 'Analytics and HTAP',
    detail: 'Hybrid engines pair LSM ingestion with columnar snapshots or covering indexes for reads.',
    note: 'Used in ClickHouse merges and CockroachDB secondary indexes.',
  },
  {
    title: 'Mobile and embedded',
    detail: 'SQLite uses B+ trees; LevelDB/RocksDB (LSM) power on-device key-value caches.',
    note: 'Footprint and predictable IO dominate design.',
  },
]

const failureStory =
  'A write-heavy metrics service used LSM with tiered compaction but under-provisioned IO; compaction lag grew, SSTables piled up, and p99 reads spiked. Switching to leveled compaction and raising bloom bits per key cut fanout and restored latency.'

const pitfalls = [
  {
    title: 'Ignoring amplification budgets',
    detail: 'Without targets, compaction or split policies can silently exceed IO and space budgets.',
  },
  {
    title: 'Too many secondary indexes',
    detail: 'Each index adds write cost; unused ones quietly throttle throughput.',
  },
  {
    title: 'Weak crash protection',
    detail: 'Missing WAL ordering, torn-page checksums, or manifest durability leads to unrecoverable corruption.',
  },
  {
    title: 'Skew and hot ranges',
    detail: 'Sequential keys cluster traffic; without page splitting or key salting, hotspots throttle concurrency.',
  },
  {
    title: 'Underprovisioned compaction',
    detail: 'For LSMs, stalled compaction inflates read amplification and storage.',
  },
]

const whenToUse = [
  {
    title: 'Balanced OLTP with ranges',
    detail: 'Choose B+ trees for predictable latency, range scans, and moderate writes.',
  },
  {
    title: 'Write-heavy, append-friendly',
    detail: 'Pick LSM when ingest dominates and you can pay read/space amplification with bloom filters.',
  },
  {
    title: 'Mixed HTAP',
    detail: 'Combine: LSM for ingest plus materialized/covering indexes or columnar copies for queries.',
  },
  {
    title: 'Edge or embedded',
    detail: 'Favor compact B+ or light LSM (LevelDB) where resources and IO are tight.',
  },
]

const advanced = [
  {
    title: 'Partitioned B+ trees',
    detail: 'Range-partition trees by key to parallelize splits and buffer pools.',
    note: 'Reduces latch contention in multicore OLTP.',
  },
  {
    title: 'Leveled vs tiered compaction',
    detail: 'Leveled lowers read amp; tiered lowers write amp. Universal for time series with wide ranges.',
    note: 'Choose based on read vs write budget and SSTable size distribution.',
  },
  {
    title: 'Bloom and prefix blooms',
    detail: 'Per-file filters cut point-read probes; prefix filters speed range lookups.',
    note: 'Filters must track observed false positives in production.',
  },
  {
    title: 'Block cache and pinning',
    detail: 'Pin internal nodes or hot blocks to stabilize latency; separate index/filter cache from data cache.',
    note: 'Prevents eviction of metadata needed for navigation.',
  },
]

const codeExamples = [
  {
    title: 'B+ tree node split (sketch)',
    code: `type Key = number

class BPlusNode {
  keys: Key[] = []
  children: BPlusNode[] = []
  leaf = false
}

function splitChild(parent: BPlusNode, idx: number, order: number) {
  const full = parent.children[idx]
  const mid = order - 1
  const sibling = new BPlusNode()
  sibling.leaf = full.leaf

  sibling.keys = full.keys.splice(mid + 1) // upper half keys
  if (!full.leaf) sibling.children = full.children.splice(mid + 1)

  const promote = full.keys.splice(mid, 1)[0] // separator key
  parent.keys.splice(idx, 0, promote)
  parent.children.splice(idx + 1, 0, sibling)
}`,
    explanation: 'Splitting keeps node size bounded and fanout high; promote a separator to maintain search order.',
  },
  {
    title: 'LSM memtable flush marker',
    code: `type Entry = { key: string; value: string; seq: number }

class Memtable {
  private data: Entry[] = []
  constructor(private flushSize: number) {}

  put(key: string, value: string, seq: number) {
    this.data.push({ key, value, seq })
    if (this.data.length >= this.flushSize) return this.flush()
  }

  flush() {
    this.data.sort((a, b) => a.key.localeCompare(b.key) || a.seq - b.seq)
    const sstable = this.data
    this.data = []
    // record manifest entry with min/max keys and sequence numbers
    return sstable
  }
}`,
    explanation: 'Flush sorts immutable runs and logs their bounds; manifests and WALs ensure recovery across crashes.',
  },
]

const keyTakeaways = [
  {
    title: 'Workload dictates engine',
    detail: 'Read-heavy ranges lean B+; write-heavy ingest leans LSM; hybrids mix both.',
  },
  {
    title: 'Amplification is the budget',
    detail: 'Bound read, write, and space amplification with fill factors, compaction style, and filters.',
  },
  {
    title: 'Durability is procedural',
    detail: 'Correctness comes from WAL ordering, manifests, and checksums as much as from the structure.',
  },
  {
    title: 'Observe and adapt',
    detail: 'Track compaction debt, cache hit rates, filter false positives, and index usefulness; prune or tune as patterns shift.',
  },
]

export default function DatabaseIndexingPage(): JSX.Element {
  return (
    <TopicLayout
      title="Database & Indexing (B+ Trees, LSM Trees)"
      subtitle="Choosing storage engines for the workload"
      intro="Indexes and storage engines shape latency, throughput, and failure modes. B+ trees balance reads and writes with shallow fanout; LSM trees favor write-heavy ingest with merge-based reads. Tune amplification, durability, and indexing to fit real query patterns."
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

      <TopicSection heading="History that shaped storage engines">
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

      <TopicSection heading="Where engines are used">
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

      <TopicSection heading="When to reach for each engine">
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
