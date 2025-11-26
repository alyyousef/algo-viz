import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const primitives = [
  {
    title: 'Locks and mutexes',
    detail:
      'Start with coarse locks for correctness, then split into finer locks when contention shows up. Prefer scoped guards and timeouts; avoid holding locks across I/O.',
  },
  {
    title: 'Read-write coordination',
    detail:
      'RW locks and versioned reads let many readers proceed while writers stay exclusive. For mostly-read workloads, versioned snapshots can beat contended locks.',
  },
  {
    title: 'Atomics and memory ordering',
    detail:
      'Use atomic CAS, fetch-add, and fences to build lock-free paths. Default to sequentially consistent semantics unless you can prove weaker orders are safe.',
  },
  {
    title: 'Message passing',
    detail:
      'Channels and queues decouple producers from consumers. Bounded channels provide backpressure; unbounded ones risk runaway memory under bursts.',
  },
]

const structures = [
  {
    title: 'MPSC/SPMC/MPMC queues',
    detail:
      'Lock-free ring buffers or Michael-Scott queues keep throughput high. Pick the variant that matches your producer/consumer topology to simplify memory reclamation.',
  },
  {
    title: 'Work-stealing deques',
    detail:
      'Each worker owns a double-ended queue; thieves steal from the opposite end to balance load. Underpins task schedulers for divide-and-conquer and async runtimes.',
  },
  {
    title: 'Concurrent hash maps and skip lists',
    detail:
      'Shard or stripe locks to reduce contention. Lock-free skip lists offer sorted iteration; hazard pointers/epochs are needed for safe reclamation.',
  },
  {
    title: 'Immutable/persistent structures',
    detail:
      'Share structure across snapshots with path-copying. Great for readers-writers where writers are rare and readers want stable views without locks.',
  },
]

const patterns = [
  {
    title: 'Fork-join and task graphs',
    steps: [
      'Split work into small tasks; enqueue into a scheduler with work stealing.',
      'Use joins/barriers only when dependencies demand; keep tasks coarse enough to amortize scheduling cost.',
      'Surface cancellation and deadlines so idle workers can stop chasing stale tasks.',
    ],
  },
  {
    title: 'Map-reduce and scan',
    steps: [
      'Partition input, map in parallel, then reduce with an associative combiner.',
      'Prefix sums (scan) unlock parallel compaction, bucketization, and histogramming.',
      'Keep reducers allocation-light; pool buffers for repeated passes.',
    ],
  },
  {
    title: 'Sharding and partitioned state',
    steps: [
      'Hash keys to shards to contain contention; each shard has its own lock or queue.',
      'Route operations to the owning shard; cross-shard ops become explicit transactions.',
      'Rebalance shards when load skews; keep migration incremental to avoid pauses.',
    ],
  },
  {
    title: 'Pipelines',
    steps: [
      'Break work into stages connected by bounded channels.',
      'Measure stage throughput; replicate the bottleneck stage instead of widening all stages.',
      'Apply backpressure so fast producers do not overwhelm slower downstream stages.',
    ],
  },
]

const guardrails = [
  'Minimize shared mutable state; prefer message passing or partitioning to reduce lock scope.',
  'Never hold locks during blocking I/O or long computations; move work outside the critical section.',
  'Use timeouts and circuit breakers on cross-thread calls to avoid deadlocks and thread starvation.',
  'Choose a memory reclamation strategy (reference counting, epochs, hazard pointers) before writing lock-free code.',
  'Test under stress: high contention, bursty producers, slow consumers, and cancellation paths.',
]

export default function ConcurrentParallelPage(): JSX.Element {
  return (
    <TopicLayout
      title="Concurrent & Parallel DS/Algorithms"
      subtitle="Scaling across threads and cores"
      intro="Concurrency hides latency; parallelism divides work. Use the right primitives and data structures to keep throughput high without sacrificing correctness."
    >
      <TopicSection heading="Core primitives to coordinate work">
        <div className="grid gap-3 md:grid-cols-2">
          {primitives.map((primitive) => (
            <article key={primitive.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{primitive.title}</h3>
              <p className="text-sm text-white/80">{primitive.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Data structures built for contention">
        <div className="grid gap-3 md:grid-cols-2">
          {structures.map((structure) => (
            <article key={structure.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{structure.title}</p>
              <p className="text-sm text-white/80">{structure.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Parallel patterns and playbooks">
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

      <TopicSection heading="Correctness and safety checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {guardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
