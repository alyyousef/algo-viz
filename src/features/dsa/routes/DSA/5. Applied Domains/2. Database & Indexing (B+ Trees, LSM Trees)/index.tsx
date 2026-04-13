import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  [
    'Workload first',
    'B+ trees shine with mixed reads/writes and range scans; LSM trees dominate write-heavy ingest.',
    'Pick the engine that minimizes tail latency for your actual query mix.',
  ],
  [
    'Amplification budgets',
    'Both designs trade read, write, and space amplification against each other.',
    'You must set targets (read amp, write amp, storage overhead) before tuning.',
  ],
  [
    'Durability is a protocol',
    'Correctness depends on WAL ordering, checksums, and crash-recovery metadata.',
    'Data structure design matters less than the write discipline around it.',
  ],
  [
    'Indexes are product features',
    'Secondary indexes, covering indexes, and clustering choices dictate user-visible latency.',
    'Model queries, not theory, when designing indexes.',
  ],
] as const

const history = [
  [
    '1971: B-trees introduced',
    'B-tree design targets disk IO with large fanout to keep height shallow.',
    'A direct response to slow random seeks on spinning disks.',
  ],
  [
    '1979: B+ trees in System R',
    'B+ tree variant becomes dominant for relational indexing with sorted leaf pages.',
    'Leaf-linked ranges make scans predictable and efficient.',
  ],
  [
    '1996: LSM trees formalized',
    "O'Neil et al. propose log-structured merge trees for high write throughput.",
    'Introduced leveled vs tiered compaction as a core design choice.',
  ],
  [
    '2006: Bigtable + SSTables',
    'Immutable sorted tables and memtables popularize LSM storage in distributed systems.',
    'Pattern spreads to HBase, Cassandra, and RocksDB/LevelDB.',
  ],
  [
    '2013+: Production-grade LSM',
    'RocksDB, TiKV, and others add pluggable compaction, filters, and caches.',
    'Large-scale production makes observability and tuning first-class features.',
  ],
] as const

const pillars = [
  [
    'Sorted structure',
    'B+ leaf pages and LSM SSTables remain sorted to support efficient seeks and ranges.',
  ],
  [
    'Fanout or levels',
    'B+ uses node fanout to reduce height; LSM uses levels and sizes to bound compaction.',
  ],
  ['Write discipline', 'WAL + ordered flushes guarantee crash safety and consistency.'],
  [
    'Amplification control',
    'Splits/merges (B+) and compaction (LSM) reshape data to keep overhead bounded.',
  ],
] as const

const mentalModels = [
  [
    'Phone book vs journal',
    'B+ tree keeps a phone book neatly sorted; LSM writes to a journal and periodically re-sorts it. The book gives steady reads; the journal gives fast appends.',
  ],
  [
    'Library shelving',
    'B+ shelves books immediately (split when full). LSM drops books onto carts and reshelves in batches (compaction).',
  ],
  [
    'Shipping lanes',
    'B+ spreads traffic across many lanes (fanout). LSM batches cargo into trains (runs) that merge on arrival.',
  ],
] as const

const howItWorks = [
  [
    'Model the workload',
    'Measure read/write mix, range scan frequency, and p95/p99 latency targets.',
  ],
  [
    'Pick the engine',
    'Choose B+ for predictable reads and ranges; choose LSM for ingest-heavy workloads.',
  ],
  [
    'Define the storage layout',
    'Select page size (B+) or SSTable/block size (LSM) to match IO and cache behavior.',
  ],
  [
    'Design the write path',
    'WAL then in-memory updates; flush to disk with ordering barriers and checksums.',
  ],
  [
    'Index for the query set',
    'Pick clustered keys, secondary indexes, and covering indexes based on actual predicates.',
  ],
  [
    'Tune amplification',
    'Set fill factors (B+) and level sizes/compaction style (LSM) to cap overhead.',
  ],
  [
    'Protect with recovery metadata',
    'Maintain manifests, sequence numbers, and durable checkpoints for fast crash recovery.',
  ],
  [
    'Observe and iterate',
    'Track cache hit rate, compaction debt, and index effectiveness; retune as patterns shift.',
  ],
] as const

const bplusAnatomy = [
  [
    'Root, internal, leaf pages',
    'Internal pages store separators; leaves store full keys and pointers/records.',
  ],
  [
    'Fanout and height',
    'Large page sizes give high fanout and small height; height is often 2-4 levels.',
  ],
  ['Leaf links', 'Leaves link as a sorted list for fast range scans and ordered iteration.'],
  [
    'Split/merge policy',
    'Splits on overflow; merges or redistributes on underflow to keep balance.',
  ],
  [
    'Latch + lock layers',
    'Latches protect page structure; transaction locks protect logical data.',
  ],
  [
    'Clustered vs secondary',
    'Clustered indexes store rows in leaf pages; secondary indexes point to rows.',
  ],
] as const

const lsmAnatomy = [
  [
    'WAL + memtable',
    'Writes append to WAL, then update an in-memory structure (skiplist or tree).',
  ],
  ['SSTables', 'Immutable sorted files with per-block indexes and checksums.'],
  [
    'Levels and sizes',
    'Data lives in levels sized by a ratio; compaction merges overlapping key ranges.',
  ],
  [
    'Bloom and index blocks',
    'Filters avoid disk reads on negative lookups; index blocks navigate files.',
  ],
  [
    'Compaction styles',
    'Leveled limits read amp; tiered reduces write amp; universal fits time-series.',
  ],
  ['Tombstones', 'Deletes write tombstones that are eventually purged during compaction.'],
] as const

const tradeoffMatrix = [
  [
    'Read amplification',
    'Low and predictable (log fanout).',
    'Higher; depends on levels and bloom accuracy.',
  ],
  [
    'Write amplification',
    'Moderate; splits and page rewrites.',
    'Potentially high; compaction rewrites data.',
  ],
  [
    'Range scans',
    'Excellent with leaf links.',
    'Good but can touch many files if compaction lags.',
  ],
  ['Point reads', 'Fast; small number of page reads.', 'Depends on bloom filters and cache.'],
  [
    'Write throughput',
    'Stable but limited by page updates.',
    'Very high ingest when compaction keeps up.',
  ],
  [
    'Space overhead',
    'Low if fill factor is tuned.',
    'Higher due to multiple levels and obsolete data.',
  ],
  [
    'Crash recovery',
    'Redo/undo from WAL and page checksums.',
    'Replay WAL and rebuild manifests/level lists.',
  ],
] as const

const complexityTable = [
  [
    'B+ point/range lookup',
    'O(log_f N + k)',
    'O(N)',
    'f = fanout, k = rows returned; shallow height with large pages.',
  ],
  [
    'B+ insert/update',
    'O(log_f N)',
    'O(N)',
    'Splits are localized; costs stable with buffer pool.',
  ],
  [
    'LSM point read (with bloom)',
    'O(levels) + O(k)',
    'O(N)',
    'Filters avoid most file probes; without filters reads degrade.',
  ],
  [
    'LSM range scan',
    'O(levels + k)',
    'O(N)',
    'Range iterators merge multiple files; compaction reduces fanout.',
  ],
  [
    'LSM write',
    'O(1) amortized ingest',
    'O(N + overhead)',
    'Compaction adds write amp; tuning decides the multiplier.',
  ],
  ['Bloom filter check', 'O(h)', 'O(m)', 'h hashes, m bits per filter; only false positives.'],
] as const

const applications = [
  [
    'Relational OLTP engines',
    'B+ trees back clustered and secondary indexes in Postgres, MySQL, SQL Server.',
    'Predictable latency under mixed workloads.',
  ],
  [
    'Key-value ingest stores',
    'RocksDB, Cassandra, HBase, and TiKV use LSM with filters and caches.',
    'Designed for append-heavy workloads and large fanout.',
  ],
  [
    'Search and analytics',
    'Inverted indexes and column stores combine LSM-like ingestion with merge segments.',
    'Segments merge to keep query latency bounded.',
  ],
  [
    'Mobile and embedded',
    'SQLite uses B+ trees; LevelDB/RocksDB power on-device key-value storage.',
    'Small footprint and reliable recovery are key.',
  ],
] as const

const failureStory =
  'A metrics service selected tiered LSM compaction for write throughput but under-provisioned IO. Compaction debt grew, SSTables piled up, and point reads fanned out across dozens of files. Latency spiked and cache pressure increased. Switching to leveled compaction, increasing bloom bits per key, and reserving IO budget for compaction stabilized read latency within a week.'

const pitfalls = [
  [
    'Ignoring amplification budgets',
    'Without targets, compaction or split policies silently blow IO and storage budgets.',
  ],
  [
    'Hot key ranges',
    'Sequential keys or skewed traffic cause page contention or compaction hotspots.',
  ],
  [
    'Over-indexing',
    'Every secondary index adds write cost and WAL overhead; unused indexes are pure tax.',
  ],
  [
    'Weak crash protection',
    'Missing WAL ordering or checksums risks torn pages and corrupted SSTables.',
  ],
  ['Compaction starvation', 'If compaction lags, read amp and disk usage balloon quickly.'],
] as const

const whenToUse = [
  ['Balanced OLTP with ranges', 'B+ trees deliver predictable latency and fast ordered scans.'],
  [
    'Write-heavy ingest',
    'LSM trees excel when ingest dominates and reads can tolerate amplification.',
  ],
  [
    'Time-series workloads',
    'LSM with tiered or universal compaction handles append-heavy time windows.',
  ],
  ['Hybrid systems', 'Mix LSM ingestion with B+ or columnar snapshots for fast queries.'],
] as const

const advanced = [
  [
    'Partitioned B+ trees',
    'Range partitioning spreads hot keys and reduces latch contention.',
    'Often combined with per-partition buffer pools.',
  ],
  [
    'Prefix and ribbon filters',
    'Filters reduce negative reads; ribbon filters trade build cost for space.',
    'Measure false positive rate in production.',
  ],
  [
    'LSM adaptive compaction',
    'Dynamic compaction schedules react to workloads and storage pressure.',
    'Avoids long tail stalls during bursts.',
  ],
  [
    'Hot/cold tiering',
    'Separate hot levels on SSD and cold on HDD or object storage.',
    'Keep index blocks on the fastest tier.',
  ],
] as const

const tuningChecklist = [
  ['Page and block sizing', 'Align pages/blocks with storage IO and cache lines to avoid waste.'],
  [
    'Fanout and fill factor',
    'Balance space utilization with split frequency to keep tree height low.',
  ],
  ['Level size ratio', 'Higher ratios reduce levels but increase compaction cost per level.'],
  ['Bloom bits per key', 'Tune for acceptable false positives based on read fanout and cache.'],
  ['Compression strategy', 'Use lightweight compression for hot levels; heavier for cold levels.'],
  ['Compaction IO budget', 'Reserve IO bandwidth to prevent compaction debt spikes.'],
] as const

const observability = [
  ['B+ tree health', 'Track buffer pool hit rate, page split frequency, and latch contention.'],
  ['LSM health', 'Track compaction debt, level sizes, and read amplification per query.'],
  ['Index effectiveness', 'Measure index usage, selectivity, and scan vs seek ratios.'],
  ['Durability signals', 'Monitor WAL fsync latency and checksum failures.'],
  ['Cache behavior', 'Watch block cache hit rate and filter false positives.'],
  ['Space pressure', 'Observe live-data ratio and obsolete/tombstone accumulation.'],
] as const

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

  sibling.keys = full.keys.splice(mid + 1)
  if (!full.leaf) sibling.children = full.children.splice(mid + 1)

  const promote = full.keys.splice(mid, 1)[0]
  parent.keys.splice(idx, 0, promote)
  parent.children.splice(idx + 1, 0, sibling)
}`,
    explanation:
      'Splitting keeps fanout high and height low; promote the separator to maintain order.',
  },
  {
    title: 'B+ range scan iterator (sketch)',
    code: `type Row = { key: number; value: string }

function rangeScan(startLeaf: { rows: Row[]; next?: any }, min: number, max: number) {
  const out: Row[] = []
  let node = startLeaf
  while (node) {
    for (const row of node.rows) {
      if (row.key < min) continue
      if (row.key > max) return out
      out.push(row)
    }
    node = node.next
  }
  return out
}`,
    explanation: 'Leaf links turn range scans into sequential reads after the first seek.',
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
    return sstable
  }
}`,
    explanation: 'Flush sorts immutable runs; manifests and WALs ensure recovery across crashes.',
  },
  {
    title: 'Bloom filter probe (sketch)',
    code: `class Bloom {
  constructor(private bits: Uint8Array, private hashes: number) {}

  has(key: string) {
    for (let i = 0; i < this.hashes; i++) {
      const h = this.hash(key, i) % (this.bits.length * 8)
      if (!this.getBit(h)) return false
    }
    return true
  }

  private getBit(bit: number) {
    const byte = this.bits[bit >> 3]
    return (byte & (1 << (bit & 7))) !== 0
  }

  private hash(key: string, seed: number) {
    let h = 2166136261 ^ seed
    for (let i = 0; i < key.length; i++) {
      h ^= key.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
    return h >>> 0
  }
}`,
    explanation: 'Filters avoid most disk probes on missing keys; false positives are acceptable.',
  },
]

const keyTakeaways = [
  [
    'Engine choice is a product decision',
    'Pick B+ or LSM based on latency targets and workload shape, not fashion.',
  ],
  [
    'Amplification is the real cost',
    'Set budgets for read, write, and space amplification and tune to meet them.',
  ],
  [
    'Durability is procedural',
    'WAL ordering, checksums, and recovery metadata are as critical as the index.',
  ],
  [
    'Observe and adapt',
    'Compaction debt, cache hit rate, and index usage should drive tuning choices.',
  ],
] as const

const glossary = [
  [
    'B+ tree',
    'A balanced index structure with internal separator pages and leaf pages linked for sorted scans.',
  ],
  [
    'LSM tree',
    'A log-structured merge design that buffers writes in memory and merges immutable sorted files on disk.',
  ],
  ['WAL', 'Write-ahead log used to preserve ordering and recover updates after a crash.'],
  [
    'SSTable',
    'Immutable sorted string table file used by LSM engines to store flushed or compacted runs.',
  ],
  [
    'Compaction',
    'Background merge process that rewrites LSM files to control overlap, tombstones, and read amplification.',
  ],
  [
    'Bloom filter',
    'Probabilistic filter that rules out most negative lookups while allowing false positives.',
  ],
  ['Fanout', 'Number of children per internal B+ tree node, which keeps tree height low.'],
  [
    'Read amplification',
    'Extra IO or file probes required to answer a query beyond the minimum necessary data read.',
  ],
] as const

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
    { id: 'core-pillars', label: 'Pillars' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-flow', label: 'How It Works' },
    { id: 'core-bplus', label: 'B+ Tree Anatomy' },
    { id: 'core-lsm', label: 'LSM Anatomy' },
    { id: 'core-tradeoffs', label: 'Tradeoff Matrix' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-when', label: 'When to Use' },
    { id: 'core-advanced', label: 'Advanced Moves' },
    { id: 'core-tuning', label: 'Tuning Checklist' },
    { id: 'core-observability', label: 'Observability' },
  ],
  examples: [
    { id: 'ex-failure', label: 'Failure Mode' },
    { id: 'ex-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function DatabaseIndexingPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Database &amp; Indexing (B+ Trees, LSM Trees)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Database &amp; Indexing (B+ Trees, LSM Trees)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Database &amp; Indexing (B+ Trees, LSM Trees)</h1>
      <p className="bin98-doc-subtitle">
        Storage engines trade off read latency, write throughput, and space efficiency. B+ trees
        provide stable read and range-scan performance; LSM trees optimize ingest by batching and
        merging. The right choice comes from workload shape, amplification budgets, and durability
        requirements.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History That Shaped Storage Engines</h2>
            {history.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Where Engines Are Used</h2>
            {applications.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            {keyTakeaways.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars" className="bin98-section">
            <h2 className="bin98-heading">Pillars and Mental Hooks</h2>
            {pillars.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-flow" className="bin98-section">
            <h2 className="bin98-heading">How It Works, Step by Step</h2>
            {howItWorks.map(([title, detail], index) => (
              <p key={title}>
                <strong>
                  Step {index + 1}: {title}:
                </strong>{' '}
                {detail}
              </p>
            ))}
          </section>

          <section id="core-bplus" className="bin98-section">
            <h2 className="bin98-heading">B+ Tree Anatomy</h2>
            {bplusAnatomy.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-lsm" className="bin98-section">
            <h2 className="bin98-heading">LSM Tree Anatomy</h2>
            {lsmAnatomy.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Tradeoff Matrix</h2>
            {tradeoffMatrix.map(([dimension, bplus, lsm]) => (
              <p key={dimension}>
                <strong>{dimension}:</strong> B+ trees: {bplus} LSM trees: {lsm}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity at a Glance</h2>
            {complexityTable.map(([approach, time, space, note]) => (
              <p key={approach}>
                <strong>{approach}:</strong> Time {time}; Space {space}; {note}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls to Avoid</h2>
            <ul>
              {pitfalls.map(([title, detail]) => (
                <li key={title}>
                  <strong>{title}:</strong> {detail}
                </li>
              ))}
            </ul>
          </section>

          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Reach for Each Engine</h2>
            {whenToUse.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Moves</h2>
            {advanced.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="core-tuning" className="bin98-section">
            <h2 className="bin98-heading">Tuning Checklist</h2>
            {tuningChecklist.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-observability" className="bin98-section">
            <h2 className="bin98-heading">Observability and Signals</h2>
            {observability.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
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
          {glossary.map(([term, definition]) => (
            <p key={term}>
              <strong>{term}:</strong> {definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
