import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Throughput via partitioning',
    detail: 'Split work and state so cores rarely contend. Shards, ownership, and queues keep hot paths local.',
  },
  {
    title: 'Correctness under interleavings',
    detail: 'Progress guarantees (lock-free, wait-free) and memory ordering rules ensure results hold across schedules.',
  },
  {
    title: 'Latency hiding with pipelines',
    detail: 'Stages overlap I/O and compute; backpressure keeps systems stable instead of flooding slow consumers.',
  },
]

const history = [
  {
    title: '1965: Dijkstra semaphores',
    detail: 'Introduced P/V operations, formalizing mutual exclusion and signaling in early multiprogramming.',
  },
  {
    title: '1974-1978: Lamport happens-before and Bakery',
    detail: 'Established ordering logic and a software mutual exclusion algorithm without hardware support.',
  },
  {
    title: '1991: Herlihy progress hierarchy',
    detail: 'Defined wait-free/lock-free/obstruction-free classes and universal constructions for concurrent objects.',
  },
  {
    title: '1999-2010: Work stealing and RCU in production',
    detail: 'Blumofe-Leiserson schedulers and Read-Copy-Update (McKenney) showed practical parallelism on servers and kernels.',
  },
]

const pillars = [
  {
    title: 'Progress guarantees',
    detail: 'Pick between blocking, lock-free, or wait-free semantics; know which threads can starve.',
  },
  {
    title: 'Memory model discipline',
    detail: 'Happens-before edges (locks, atomics, fences) prevent reordering bugs; SC by default unless proven otherwise.',
  },
  {
    title: 'Contention containment',
    detail: 'Prefer ownership and sharding over global locks; use backoff and combining to smooth bursts.',
  },
  {
    title: 'Safe reclamation',
    detail: 'Use epochs, hazard pointers, or RCU to free memory once all readers are past it; avoid ABA.',
  },
]

const mentalModels = [
  {
    title: 'Toll booths with many lanes',
    detail: 'More lanes reduce waiting, but merging points (locks) become hot. Sharding keys is like routing cars to separate booths.',
  },
  {
    title: 'Assembly line with inspectors',
    detail: 'Stages in a pipeline work concurrently; inspectors (assertions) keep invariants intact. Breaks down if buffers overflow.',
  },
]

const howItWorks = [
  {
    step: '1. Choose ownership',
    detail: 'Assign shards or actors to state; minimize cross-ownership mutations before picking primitives.',
  },
  {
    step: '2. Select coordination',
    detail: 'Locks for simplicity, RW locks for read-heavy, atomics/CAS for hot counters, channels for decoupling.',
  },
  {
    step: '3. Enforce memory ordering',
    detail: 'Use release-acquire or SC fences on handoff points; document which fields travel together.',
  },
  {
    step: '4. Plan reclamation',
    detail: 'Pick epochs/hazard pointers/RCU before writing lock-free structures; test ABA cases.',
  },
  {
    step: '5. Profile contention and rebalance',
    detail: 'Measure queue depths, steal rates, lock hold times; shard or widen bottleneck stages.',
  },
]

const complexityTable = [
  { approach: 'Work-stealing deque (Chase-Lev)', time: 'O(1) amortized', space: 'O(n)', note: 'Local push/pop are fast; thieves contend on the opposite end with atomics.' },
  { approach: 'Michael-Scott MPMC queue', time: 'O(1) amortized', space: 'O(n)', note: 'Lock-free with CAS; throughput sensitive to ABA and reclamation strategy.' },
  { approach: 'Striped concurrent hash map', time: 'O(1) avg', space: 'O(n)', note: 'Locks per stripe reduce contention; resizing and rehashing can serialize writers.' },
  { approach: 'Parallel prefix sum (scan)', time: 'O(n)', space: 'O(n)', note: 'Work O(n), span O(log n) enabling near-linear speedup with enough cores.' },
  { approach: 'Flat combining stack/queue', time: 'O(1) avg', space: 'O(n)', note: 'One combiner batches operations, reducing contention at cost of latency under light load.' },
]

const applications = [
  {
    title: 'Runtime schedulers and thread pools',
    detail: 'Work-stealing deques keep CPU utilization high in browsers, JVM, Go, and async runtimes.',
  },
  {
    title: 'Databases and storage engines',
    detail: 'MPMC queues and latch-free skip lists back log ingestion, compaction, and lock managers.',
  },
  {
    title: 'Streaming and telemetry pipelines',
    detail: 'Bounded channels with backpressure prevent overload in metrics, logging, and fraud detection systems.',
  },
  {
    title: 'Graphics and scientific compute',
    detail: 'Parallel scans, reductions, and partitioning drive GPU sorting, ray tracing, and simulation kernels.',
  },
]

const pitfalls = [
  'Ignoring memory reclamation causes use-after-free or ABA in lock-free queues.',
  'False sharing on adjacent hot fields tanks performance; pad or align cache lines.',
  'Coarse locks held across I/O lead to convoying and priority inversion.',
  'Unbounded queues mask overload until the process OOMs; always prefer bounded with backpressure.',
  'Relying on relaxed atomics without proofs yields heisenbugs on weakly ordered CPUs.',
]

const whenToUse = [
  'Low write, high read: RW locks or RCU snapshots to keep readers fast.',
  'Bursting producers with slow consumers: bounded MPSC/MPMC queues plus backpressure signals.',
  'CPU-bound divide-and-conquer: work stealing to balance irregular tasks.',
  'Latency-sensitive hot counters: atomic fetch-add or striped counters; avoid global locks.',
  'NUMA-heavy workloads: shard by socket and minimize cross-node sharing.',
]

const advanced = [
  {
    title: 'Read-Copy-Update (RCU)',
    detail: 'Publish new versions while readers traverse old ones; reclamation waits for quiescent states.',
  },
  {
    title: 'Epoch or hazard-pointer reclamation',
    detail: 'Track active readers so frees happen only after all observers leave critical sections.',
  },
  {
    title: 'Elimination/backoff for stacks and queues',
    detail: 'Pair opposing operations to complete off-structure, reducing contention on the main data.',
  },
  {
    title: 'Flat combining',
    detail: 'One thread batches pending operations, cutting atomic traffic at the cost of single-combiner latency.',
  },
  {
    title: 'NUMA-aware sharding',
    detail: 'Keep owners and memory local to sockets; cross-socket ops use message passing instead of shared locks.',
  },
]

const codeExamples = [
  {
    title: 'MPSC ring buffer enqueue/dequeue',
    code: `function enqueue(x):
    tail = atomic_fetch_add(tailIdx, 1)
    slot = tail mod N
    while headIdx + N <= tail: spin  // bounded buffer full
    buffer[slot] = x
    // publish write

function dequeue():
    head = atomic_load(headIdx)
    if head == atomic_load(tailIdx): return EMPTY
    slot = head mod N
    val = buffer[slot]
    atomic_fetch_add(headIdx, 1)  // single consumer
    return val`,
    explanation: 'Single consumer simplifies ordering; bounded capacity enforces backpressure. Writers only use atomic increments.',
  },
  {
    title: 'Parallel prefix sum (work O(n), span O(log n))',
    code: `function parallelScan(arr):
    // upsweep
    for d in 0..log2(n)-1 in parallel:
        stride = 2^(d+1)
        for i in 0..n-1 step stride in parallel:
            arr[i + stride - 1] += arr[i + 2^d - 1]
    arr[n-1] = 0  // exclusive scan
    // downsweep
    for d in log2(n)-1 downto 0 in parallel:
        stride = 2^(d+1)
        for i in 0..n-1 step stride in parallel:
            t = arr[i + 2^d - 1]
            arr[i + 2^d - 1] = arr[i + stride - 1]
            arr[i + stride - 1] += t
    return arr`,
    explanation: 'Tree-shaped upsweep/downsweep yields logarithmic span, enabling near-linear speedup with enough threads.',
  },
]

const keyTakeaways = [
  'Partition first; synchronize only where sharing is unavoidable.',
  'Pick progress guarantees consciously and pair them with explicit reclamation.',
  'Backpressure beats unbounded queues when bursts arrive.',
  'Memory ordering is a contract; document handoff points and fences.',
  'Measure contention and rebalance instead of guessing.',
]

export default function ConcurrentParallelPage(): JSX.Element {
  return (
    <TopicLayout
      title="Concurrent & Parallel DS/Algorithms"
      subtitle="Scaling across threads and cores"
      intro="Concurrency hides latency; parallelism splits work. Pick the right primitives, respect the memory model, and size queues so throughput rises without correctness regressions."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-3">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History">
        <div className="grid gap-3 md:grid-cols-2">
          {history.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental hooks">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Pillars</h3>
            <div className="space-y-3">
              {pillars.map((item) => (
                <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-white/80">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Mental models</h3>
            <div className="space-y-3">
              {mentalModels.map((item) => (
                <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-white/80">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-3">
          {howItWorks.map((item) => (
            <article key={item.step} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.step}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity table">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-white/10 bg-white/5 text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 text-left text-white">Approach</th>
                <th className="p-3 text-left text-white">Time</th>
                <th className="p-3 text-left text-white">Space</th>
                <th className="p-3 text-left text-white">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="border-b border-white/10">
                  <td className="p-3 text-white">{row.approach}</td>
                  <td className="p-3 text-white">{row.time}</td>
                  <td className="p-3 text-white">{row.space}</td>
                  <td className="p-3 text-white/80">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 p-4">
          <h3 className="text-sm font-semibold text-red-100">Failure story: ABA and reclaimed nodes</h3>
          <p className="text-sm text-red-100/80">
            A trading platform deployed a lock-free MPMC queue without hazard pointers. Under load, a consumer freed nodes while another thread still held an old pointer, leading to swapped reuse and incorrect orders. ABA-safe CAS and epoch reclamation would have prevented the heisenbug.
          </p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls">
        <div className="rounded-lg bg-white/5 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
            {pitfalls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>

      <TopicSection heading="When to use">
        <div className="rounded-lg bg-white/5 p-4">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
            {whenToUse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </TopicSection>

      <TopicSection heading="Advanced">
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="space-y-4">
          {codeExamples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{example.title}</h3>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2">
          {keyTakeaways.map((item) => (
            <article key={item} className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
              <p className="text-sm text-emerald-100">{item}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
