import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const engines = [
  {
    title: 'B+ tree storage',
    detail:
      'Disk-friendly index and table layout. All keys live in leaves with sibling pointers for range scans; internal nodes keep fanout high to minimize page reads.',
  },
  {
    title: 'Log-Structured Merge (LSM) trees',
    detail:
      'Append-heavy design: buffer writes in memtables, flush to sorted SSTables, and compact in the background. Great for write throughput; reads rely on bloom filters and merging.',
  },
  {
    title: 'Heap files and clustered indexes',
    detail:
      'Unordered heap tables favor fast inserts. Clustered indexes order data by primary key to speed range queries and locality-sensitive workloads.',
  },
  {
    title: 'Columnar stores',
    detail:
      'Values stored by column with compression and vectorized operators. Excels at scans and aggregates; row reconstruction is slower but often avoided.',
  },
]

const indexing = [
  {
    title: 'Secondary indexes',
    detail:
      'Alternate access paths on non-primary columns. Keep them lean; every extra index taxes write throughput and storage.',
  },
  {
    title: 'Covering indexes',
    detail:
      'Include queried columns in the index payload so reads avoid table lookups. Balance coverage against index bloat.',
  },
  {
    title: 'Partial and filtered indexes',
    detail:
      'Index only hot or frequently filtered subsets to shrink maintenance costs while keeping key queries fast.',
  },
  {
    title: 'Composite keys and ordering',
    detail:
      'Order matters: `(a, b)` supports prefixes on `a` and `a,b`. Design to match your most common WHERE and ORDER BY clauses.',
  },
]

const patterns = [
  {
    title: 'Designing with B+ trees',
    steps: [
      'Pick page size to match storage blocks; keep fanout high to reduce tree height.',
      'Leverage sequential inserts to stay append-friendly; consider fill factors to reduce splits.',
      'Use range-friendly layouts (clustering) when scans and ORDER BY dominate workload.',
    ],
  },
  {
    title: 'Designing with LSMs',
    steps: [
      'Size memtables to absorb bursts; tune bloom filters to cut read amplification.',
      'Choose compaction style (leveled, tiered, universal) based on write vs read amplification trade-offs.',
      'Bound write amplification with careful file sizing and backpressure during compaction.',
    ],
  },
  {
    title: 'Hybrid approaches',
    steps: [
      'Use write-optimized LSM for ingestion and build read-friendly columnar snapshots for analytics.',
      'Pin small hot indexes in memory; keep colder ones on disk with bloom filters to guard misses.',
      'Separate cold and hot data paths (time-partitioned tables) to keep compaction predictable.',
    ],
  },
  {
    title: 'Indexing strategy per query mix',
    steps: [
      'OLTP heavy writes: fewer secondary indexes, lean covering indexes for critical reads.',
      'Read-heavy with ranges: clustered or covering B+ trees; consider materialized views.',
      'Append-only event logs: LSM with time-partitioned SSTables and aggressive bloom filters.',
    ],
  },
]

const guardrails = [
  'Measure amplification: read, write, and space. Tune compaction or fill factors to stay within budget.',
  'Cap index count; every index taxes inserts/updates. Drop unused ones based on telemetry.',
  'Ensure crash safety: WAL before data pages (B+ tree) or memtable flush markers (LSM).',
  'Validate bloom filter effectiveness and false positive rates in production traces.',
  'Test failure drills: partial compactions, torn pages, checksum failures, and recovery from WAL.',
]

export default function DatabaseIndexingPage(): JSX.Element {
  return (
    <TopicLayout
      title="Database & Indexing (B+ Trees, LSM Trees)"
      subtitle="Storage engines and indexing"
      intro="Index and storage choices drive latency, throughput, and failure behavior. Use the right engine shape and indexing strategy to match your workload and durability needs."
    >
      <TopicSection heading="Storage engines at a glance">
        <div className="grid gap-3 md:grid-cols-2">
          {engines.map((engine) => (
            <article key={engine.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{engine.title}</h3>
              <p className="text-sm text-white/80">{engine.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Indexing patterns">
        <div className="grid gap-3 md:grid-cols-2">
          {indexing.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Design playbooks">
        <div className="grid gap-3 md:grid-cols-2">
          {patterns.map((pattern) => (
            <article key={pattern.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{pattern.title}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {pattern.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Reliability and performance checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {guardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
