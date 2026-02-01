import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'Workload first',
    detail: 'B+ trees shine with mixed reads/writes and range scans; LSM trees dominate write-heavy ingest.',
    note: 'Pick the engine that minimizes tail latency for your actual query mix.',
  },
  {
    title: 'Amplification budgets',
    detail: 'Both designs trade read, write, and space amplification against each other.',
    note: 'You must set targets (read amp, write amp, storage overhead) before tuning.',
  },
  {
    title: 'Durability is a protocol',
    detail: 'Correctness depends on WAL ordering, checksums, and crash-recovery metadata.',
    note: 'Data structure design matters less than the write discipline around it.',
  },
  {
    title: 'Indexes are product features',
    detail: 'Secondary indexes, covering indexes, and clustering choices dictate user-visible latency.',
    note: 'Model queries, not theory, when designing indexes.',
  },
]

const history = [
  {
    title: '1971: B-trees introduced',
    detail: 'B-tree design targets disk IO with large fanout to keep height shallow.',
    note: 'A direct response to slow random seeks on spinning disks.',
  },
  {
    title: '1979: B+ trees in System R',
    detail: 'B+ tree variant becomes dominant for relational indexing with sorted leaf pages.',
    note: 'Leaf-linked ranges make scans predictable and efficient.',
  },
  {
    title: '1996: LSM trees formalized',
    detail: 'O\'Neil et al. propose log-structured merge trees for high write throughput.',
    note: 'Introduced leveled vs tiered compaction as a core design choice.',
  },
  {
    title: '2006: Bigtable + SSTables',
    detail: 'Immutable sorted tables and memtables popularize LSM storage in distributed systems.',
    note: 'Pattern spreads to HBase, Cassandra, and RocksDB/LevelDB.',
  },
  {
    title: '2013+: Production-grade LSM',
    detail: 'RocksDB, TiKV, and others add pluggable compaction, filters, and caches.',
    note: 'Large-scale production makes observability and tuning first-class features.',
  },
]

const pillars = [
  {
    title: 'Sorted structure',
    detail: 'B+ leaf pages and LSM SSTables remain sorted to support efficient seeks and ranges.',
  },
  {
    title: 'Fanout or levels',
    detail: 'B+ uses node fanout to reduce height; LSM uses levels and sizes to bound compaction.',
  },
  {
    title: 'Write discipline',
    detail: 'WAL + ordered flushes guarantee crash safety and consistency.',
  },
  {
    title: 'Amplification control',
    detail: 'Splits/merges (B+) and compaction (LSM) reshape data to keep overhead bounded.',
  },
]

const mentalModels = [
  {
    title: 'Phone book vs journal',
    detail:
      'B+ tree keeps a phone book neatly sorted; LSM writes to a journal and periodically re-sorts it. The book gives steady reads; the journal gives fast appends.',
  },
  {
    title: 'Library shelving',
    detail:
      'B+ shelves books immediately (split when full). LSM drops books onto carts and reshelves in batches (compaction).',
  },
  {
    title: 'Shipping lanes',
    detail:
      'B+ spreads traffic across many lanes (fanout). LSM batches cargo into trains (runs) that merge on arrival.',
  },
]

const howItWorks = [
  {
    title: 'Model the workload',
    detail: 'Measure read/write mix, range scan frequency, and p95/p99 latency targets.',
  },
  {
    title: 'Pick the engine',
    detail: 'Choose B+ for predictable reads and ranges; choose LSM for ingest-heavy workloads.',
  },
  {
    title: 'Define the storage layout',
    detail: 'Select page size (B+) or SSTable/block size (LSM) to match IO and cache behavior.',
  },
  {
    title: 'Design the write path',
    detail: 'WAL then in-memory updates; flush to disk with ordering barriers and checksums.',
  },
  {
    title: 'Index for the query set',
    detail: 'Pick clustered keys, secondary indexes, and covering indexes based on actual predicates.',
  },
  {
    title: 'Tune amplification',
    detail: 'Set fill factors (B+) and level sizes/compaction style (LSM) to cap overhead.',
  },
  {
    title: 'Protect with recovery metadata',
    detail: 'Maintain manifests, sequence numbers, and durable checkpoints for fast crash recovery.',
  },
  {
    title: 'Observe and iterate',
    detail: 'Track cache hit rate, compaction debt, and index effectiveness; retune as patterns shift.',
  },
]

const bplusAnatomy = [
  {
    title: 'Root, internal, leaf pages',
    detail: 'Internal pages store separators; leaves store full keys and pointers/records.',
  },
  {
    title: 'Fanout and height',
    detail: 'Large page sizes give high fanout and small height; height is often 2-4 levels.',
  },
  {
    title: 'Leaf links',
    detail: 'Leaves link as a sorted list for fast range scans and ordered iteration.',
  },
  {
    title: 'Split/merge policy',
    detail: 'Splits on overflow; merges or redistributes on underflow to keep balance.',
  },
  {
    title: 'Latch + lock layers',
    detail: 'Latches protect page structure; transaction locks protect logical data.',
  },
  {
    title: 'Clustered vs secondary',
    detail: 'Clustered indexes store rows in leaf pages; secondary indexes point to rows.',
  },
]

const lsmAnatomy = [
  {
    title: 'WAL + memtable',
    detail: 'Writes append to WAL, then update an in-memory structure (skiplist or tree).',
  },
  {
    title: 'SSTables',
    detail: 'Immutable sorted files with per-block indexes and checksums.',
  },
  {
    title: 'Levels and sizes',
    detail: 'Data lives in levels sized by a ratio; compaction merges overlapping key ranges.',
  },
  {
    title: 'Bloom and index blocks',
    detail: 'Filters avoid disk reads on negative lookups; index blocks navigate files.',
  },
  {
    title: 'Compaction styles',
    detail: 'Leveled limits read amp; tiered reduces write amp; universal fits time-series.',
  },
  {
    title: 'Tombstones',
    detail: 'Deletes write tombstones that are eventually purged during compaction.',
  },
]

const tradeoffMatrix = [
  {
    dimension: 'Read amplification',
    bplus: 'Low and predictable (log fanout).',
    lsm: 'Higher; depends on levels and bloom accuracy.',
  },
  {
    dimension: 'Write amplification',
    bplus: 'Moderate; splits and page rewrites.',
    lsm: 'Potentially high; compaction rewrites data.',
  },
  {
    dimension: 'Range scans',
    bplus: 'Excellent with leaf links.',
    lsm: 'Good but can touch many files if compaction lags.',
  },
  {
    dimension: 'Point reads',
    bplus: 'Fast; small number of page reads.',
    lsm: 'Depends on bloom filters and cache.',
  },
  {
    dimension: 'Write throughput',
    bplus: 'Stable but limited by page updates.',
    lsm: 'Very high ingest when compaction keeps up.',
  },
  {
    dimension: 'Space overhead',
    bplus: 'Low if fill factor is tuned.',
    lsm: 'Higher due to multiple levels and obsolete data.',
  },
  {
    dimension: 'Crash recovery',
    bplus: 'Redo/undo from WAL and page checksums.',
    lsm: 'Replay WAL and rebuild manifests/level lists.',
  },
]

const complexityTable = [
  {
    approach: 'B+ point/range lookup',
    time: 'O(log_f N + k)',
    space: 'O(N)',
    note: 'f = fanout, k = rows returned; shallow height with large pages.',
  },
  {
    approach: 'B+ insert/update',
    time: 'O(log_f N)',
    space: 'O(N)',
    note: 'Splits are localized; costs stable with buffer pool.',
  },
  {
    approach: 'LSM point read (with bloom)',
    time: 'O(levels) + O(k)',
    space: 'O(N)',
    note: 'Filters avoid most file probes; without filters reads degrade.',
  },
  {
    approach: 'LSM range scan',
    time: 'O(levels + k)',
    space: 'O(N)',
    note: 'Range iterators merge multiple files; compaction reduces fanout.',
  },
  {
    approach: 'LSM write',
    time: 'O(1) amortized ingest',
    space: 'O(N + overhead)',
    note: 'Compaction adds write amp; tuning decides the multiplier.',
  },
  {
    approach: 'Bloom filter check',
    time: 'O(h)',
    space: 'O(m)',
    note: 'h hashes, m bits per filter; only false positives.',
  },
]

const applications = [
  {
    title: 'Relational OLTP engines',
    detail: 'B+ trees back clustered and secondary indexes in Postgres, MySQL, SQL Server.',
    note: 'Predictable latency under mixed workloads.',
  },
  {
    title: 'Key-value ingest stores',
    detail: 'RocksDB, Cassandra, HBase, and TiKV use LSM with filters and caches.',
    note: 'Designed for append-heavy workloads and large fanout.',
  },
  {
    title: 'Search and analytics',
    detail: 'Inverted indexes and column stores combine LSM-like ingestion with merge segments.',
    note: 'Segments merge to keep query latency bounded.',
  },
  {
    title: 'Mobile and embedded',
    detail: 'SQLite uses B+ trees; LevelDB/RocksDB power on-device key-value storage.',
    note: 'Small footprint and reliable recovery are key.',
  },
]

const failureStory =
  'A metrics service selected tiered LSM compaction for write throughput but under-provisioned IO. Compaction debt grew, SSTables piled up, and point reads fanned out across dozens of files. Latency spiked and cache pressure increased. Switching to leveled compaction, increasing bloom bits per key, and reserving IO budget for compaction stabilized read latency within a week.'

const pitfalls = [
  {
    title: 'Ignoring amplification budgets',
    detail: 'Without targets, compaction or split policies silently blow IO and storage budgets.',
  },
  {
    title: 'Hot key ranges',
    detail: 'Sequential keys or skewed traffic cause page contention or compaction hotspots.',
  },
  {
    title: 'Over-indexing',
    detail: 'Every secondary index adds write cost and WAL overhead; unused indexes are pure tax.',
  },
  {
    title: 'Weak crash protection',
    detail: 'Missing WAL ordering or checksums risks torn pages and corrupted SSTables.',
  },
  {
    title: 'Compaction starvation',
    detail: 'If compaction lags, read amp and disk usage balloon quickly.',
  },
]

const whenToUse = [
  {
    title: 'Balanced OLTP with ranges',
    detail: 'B+ trees deliver predictable latency and fast ordered scans.',
  },
  {
    title: 'Write-heavy ingest',
    detail: 'LSM trees excel when ingest dominates and reads can tolerate amplification.',
  },
  {
    title: 'Time-series workloads',
    detail: 'LSM with tiered or universal compaction handles append-heavy time windows.',
  },
  {
    title: 'Hybrid systems',
    detail: 'Mix LSM ingestion with B+ or columnar snapshots for fast queries.',
  },
]

const advanced = [
  {
    title: 'Partitioned B+ trees',
    detail: 'Range partitioning spreads hot keys and reduces latch contention.',
    note: 'Often combined with per-partition buffer pools.',
  },
  {
    title: 'Prefix and ribbon filters',
    detail: 'Filters reduce negative reads; ribbon filters trade build cost for space.',
    note: 'Measure false positive rate in production.',
  },
  {
    title: 'LSM adaptive compaction',
    detail: 'Dynamic compaction schedules react to workloads and storage pressure.',
    note: 'Avoids long tail stalls during bursts.',
  },
  {
    title: 'Hot/cold tiering',
    detail: 'Separate hot levels on SSD and cold on HDD or object storage.',
    note: 'Keep index blocks on the fastest tier.',
  },
]

const tuningChecklist = [
  {
    title: 'Page and block sizing',
    detail: 'Align pages/blocks with storage IO and cache lines to avoid waste.',
  },
  {
    title: 'Fanout and fill factor',
    detail: 'Balance space utilization with split frequency to keep tree height low.',
  },
  {
    title: 'Level size ratio',
    detail: 'Higher ratios reduce levels but increase compaction cost per level.',
  },
  {
    title: 'Bloom bits per key',
    detail: 'Tune for acceptable false positives based on read fanout and cache.',
  },
  {
    title: 'Compression strategy',
    detail: 'Use lightweight compression for hot levels; heavier for cold levels.',
  },
  {
    title: 'Compaction IO budget',
    detail: 'Reserve IO bandwidth to prevent compaction debt spikes.',
  },
]

const observability = [
  {
    title: 'B+ tree health',
    detail: 'Track buffer pool hit rate, page split frequency, and latch contention.',
  },
  {
    title: 'LSM health',
    detail: 'Track compaction debt, level sizes, and read amplification per query.',
  },
  {
    title: 'Index effectiveness',
    detail: 'Measure index usage, selectivity, and scan vs seek ratios.',
  },
  {
    title: 'Durability signals',
    detail: 'Monitor WAL fsync latency and checksum failures.',
  },
  {
    title: 'Cache behavior',
    detail: 'Watch block cache hit rate and filter false positives.',
  },
  {
    title: 'Space pressure',
    detail: 'Observe live-data ratio and obsolete/tombstone accumulation.',
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

  sibling.keys = full.keys.splice(mid + 1)
  if (!full.leaf) sibling.children = full.children.splice(mid + 1)

  const promote = full.keys.splice(mid, 1)[0]
  parent.keys.splice(idx, 0, promote)
  parent.children.splice(idx + 1, 0, sibling)
}`,
    explanation: 'Splitting keeps fanout high and height low; promote the separator to maintain order.',
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
  {
    title: 'Engine choice is a product decision',
    detail: 'Pick B+ or LSM based on latency targets and workload shape, not fashion.',
  },
  {
    title: 'Amplification is the real cost',
    detail: 'Set budgets for read, write, and space amplification and tune to meet them.',
  },
  {
    title: 'Durability is procedural',
    detail: 'WAL ordering, checksums, and recovery metadata are as critical as the index.',
  },
  {
    title: 'Observe and adapt',
    detail: 'Compaction debt, cache hit rate, and index usage should drive tuning choices.',
  },
]

export default function DatabaseIndexingPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Database & Indexing (B+ Trees, LSM Trees)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Designing storage engines for real workloads</div>
              <p className="win95-text">
                Storage engines trade off read latency, write throughput, and space efficiency. B+ trees provide stable read and
                range-scan performance; LSM trees optimize ingest by batching and merging. The right choice comes from workload shape,
                amplification budgets, and durability requirements.
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
            <legend>History that shaped storage engines</legend>
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
            <legend>B+ tree anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {bplusAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>LSM tree anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {lsmAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tradeoff matrix</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>B+ trees</th>
                    <th>LSM trees</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeoffMatrix.map((row) => (
                    <tr key={row.dimension}>
                      <td>{row.dimension}</td>
                      <td>{row.bplus}</td>
                      <td>{row.lsm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <legend>Where engines are used</legend>
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
            <legend>When to reach for each engine</legend>
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
            <legend>Tuning checklist</legend>
            <div className="win95-grid win95-grid-2">
              {tuningChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Observability and signals</legend>
            <div className="win95-grid win95-grid-2">
              {observability.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
