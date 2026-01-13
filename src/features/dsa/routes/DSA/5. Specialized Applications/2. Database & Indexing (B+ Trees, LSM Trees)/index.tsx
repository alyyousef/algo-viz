import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
              <div className="win95-subheading">Choosing storage engines for the workload</div>
              <p className="win95-text">
                Indexes and storage engines shape latency, throughput, and failure modes. B+ trees balance reads and writes with shallow
                fanout; LSM trees favor write-heavy ingest with merge-based reads. Tune amplification, durability, and indexing to fit
                real query patterns.
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

