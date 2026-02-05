import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

const structureFamilies = [
  {
    title: 'Shared-state with locks',
    detail: 'Mutexes, RW locks, and condition variables; simplest to reason about but can serialize hot paths.',
  },
  {
    title: 'Lock-free data structures',
    detail: 'CAS-based queues, stacks, and maps; higher throughput under contention but require careful memory reclamation.',
  },
  {
    title: 'Message passing',
    detail: 'Actors, channels, and work queues minimize shared memory and move ownership to threads.',
  },
  {
    title: 'Data-parallel algorithms',
    detail: 'Scans, reductions, and map/reduce patterns with predictable work/span bounds.',
  },
]

const coordinationToolbox = [
  {
    title: 'Mutex and RW locks',
    detail: 'Best for coarse critical sections; prefer RW locks for read-heavy workloads with rare writers.',
  },
  {
    title: 'Atomics and CAS loops',
    detail: 'Ideal for counters and queues; use backoff to avoid live-lock under contention.',
  },
  {
    title: 'Channels and bounded queues',
    detail: 'Decouple producers/consumers; use bounded capacity to enforce backpressure.',
  },
  {
    title: 'Barriers and latches',
    detail: 'Synchronize phase transitions in data-parallel workloads.',
  },
]

const memoryModelChecklist = [
  'Define the ownership of each field and the exact handoff point between threads.',
  'Use release on publish and acquire on consume for shared data structures.',
  'Keep atomics minimal: only what participates in synchronization should be atomic.',
  'Document invariants and which fences guarantee them.',
  'Avoid mixing relaxed and strong orderings without a proof.',
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

const algorithmMap = [
  {
    goal: 'Task scheduling',
    primary: 'Work stealing (Chase-Lev)',
    output: 'Balanced task distribution',
    note: 'Excellent for irregular parallelism; local operations stay fast.',
  },
  {
    goal: 'Producer/consumer queues',
    primary: 'MPSC/MPMC ring buffers',
    output: 'Bounded FIFO',
    note: 'Bounded capacity enforces backpressure; choose single-consumer if possible.',
  },
  {
    goal: 'Shared key-value store',
    primary: 'Striped locks / lock-free hash map',
    output: 'Concurrent map',
    note: 'Shards reduce contention; resizing is the common bottleneck.',
  },
  {
    goal: 'Read-mostly structures',
    primary: 'RCU / Copy-on-write',
    output: 'Snapshot reads',
    note: 'Readers run without locks; writers publish new versions.',
  },
  {
    goal: 'Data-parallel aggregates',
    primary: 'Parallel scan / reduce',
    output: 'Aggregates with low span',
    note: 'Work O(n), span O(log n) for scans; great on many-core.',
  },
]

const complexityTable = [
  { approach: 'Work-stealing deque (Chase-Lev)', time: 'O(1) amortized', space: 'O(n)', note: 'Local push/pop are fast; thieves contend on the opposite end with atomics.' },
  { approach: 'Michael-Scott MPMC queue', time: 'O(1) amortized', space: 'O(n)', note: 'Lock-free with CAS; throughput sensitive to ABA and reclamation strategy.' },
  { approach: 'Striped concurrent hash map', time: 'O(1) avg', space: 'O(n)', note: 'Locks per stripe reduce contention; resizing and rehashing can serialize writers.' },
  { approach: 'Parallel prefix sum (scan)', time: 'O(n)', space: 'O(n)', note: 'Work O(n), span O(log n) enabling near-linear speedup with enough cores.' },
  { approach: 'Flat combining stack/queue', time: 'O(1) avg', space: 'O(n)', note: 'One combiner batches operations, reducing contention at cost of latency under light load.' },
  { approach: 'RCU read path', time: 'O(1)', space: 'O(n) versions', note: 'Reads are wait-free; writers pay update + grace period costs.' },
  { approach: 'Parallel reduction', time: 'O(n)', space: 'O(n)', note: 'Work O(n), span O(log n) with associative operations.' },
  { approach: 'Elimination stack', time: 'O(1) avg', space: 'O(n)', note: 'Opposing push/pop pair off-structure to reduce contention.' },
]

const queueToolkit = [
  {
    title: 'Bounded queues',
    detail: 'Use ring buffers to enforce backpressure and avoid memory blowups.',
  },
  {
    title: 'Single consumer optimization',
    detail: 'MPSC reduces synchronization and can be cache-friendlier than full MPMC.',
  },
  {
    title: 'Batching and coalescing',
    detail: 'Batch dequeues to reduce lock/atomic overhead when latency allows.',
  },
]

const schedulingToolkit = [
  {
    title: 'Work stealing',
    detail: 'Keep tasks local; steal from the tail to minimize contention.',
  },
  {
    title: 'Chunking',
    detail: 'Use chunk sizes to balance overhead vs load balance.',
  },
  {
    title: 'Affinity and NUMA',
    detail: 'Keep tasks and memory local to sockets when possible.',
  },
]

const reclamationToolkit = [
  {
    title: 'Epoch-based reclamation',
    detail: 'Track global epochs and free nodes when all threads advance.',
  },
  {
    title: 'Hazard pointers',
    detail: 'Threads publish protected pointers; frees happen when safe.',
  },
  {
    title: 'ABA mitigation',
    detail: 'Use tagged pointers or version counters on CAS loops.',
  },
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

const debuggingSignals = [
  'CPU is busy but throughput flat: lock contention or false sharing is likely.',
  'Latencies spike periodically: GC or epoch reclamation stalls are too large.',
  'Queue depth grows without bound: consumer slower than producer or missing backpressure.',
  'Rare crashes on weak CPUs only: memory ordering or ABA bug.',
]

const whenToUse = [
  'Low write, high read: RW locks or RCU snapshots to keep readers fast.',
  'Bursting producers with slow consumers: bounded MPSC/MPMC queues plus backpressure signals.',
  'CPU-bound divide-and-conquer: work stealing to balance irregular tasks.',
  'Latency-sensitive hot counters: atomic fetch-add or striped counters; avoid global locks.',
  'NUMA-heavy workloads: shard by socket and minimize cross-node sharing.',
]

const implementationChecklist = [
  'Define ownership per data structure and draw the handoff path.',
  'Choose progress guarantees and document starvation behavior.',
  'Log contention metrics: lock hold times, queue depth, steal rates.',
  'Add padding for hot fields and align to cache lines where needed.',
  'Select and test a memory reclamation strategy before shipping.',
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
  {
    title: 'Combining trees',
    detail: 'Hierarchical combining reduces contention by aggregating operations in a tree.',
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
  {
    title: 'RCU read/write pattern (sketch)',
    code: `function read():
    rcu_read_lock()
    ptr = atomic_load(root)
    use(ptr)
    rcu_read_unlock()

function update(newPtr):
    old = atomic_exchange(root, newPtr)
    synchronize_rcu()  // wait for readers
    free(old)`,
    explanation: 'Readers avoid locks; writers wait for a grace period before reclaiming old versions.',
  },
  {
    title: 'CAS loop for lock-free counter',
    code: `function add(delta):
    while true:
        old = atomic_load(x)
        if atomic_compare_exchange(x, old, old + delta):
            return`,
    explanation: 'Simple CAS loops are safe for small counters but can live-lock without backoff under contention.',
  },
]

const glossary = [
  'Progress guarantee: liveness property (blocking, lock-free, wait-free).',
  'Happens-before: ordering relation that makes writes visible to other threads.',
  'ABA problem: CAS sees same value after change, hiding intervening updates.',
  'False sharing: multiple cores modify independent data on same cache line.',
  'Backpressure: signals that slow producers when consumers lag.',
  'Span: length of the critical path in a parallel algorithm.',
  'RCU grace period: time until all pre-existing readers have exited.',
  'Work stealing: idle threads steal tasks from busy ones.',
]

const practicePrompts = [
  'Choose a progress guarantee for a trading queue and justify the tradeoff.',
  'Design a bounded MPMC queue and explain its memory ordering.',
  'Explain when RCU beats RW locks in a read-heavy workload.',
  'Estimate speedup for a parallel scan on 16 cores given span O(log n).',
  'Plan a sharding strategy for a NUMA system with 4 sockets.',
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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Concurrent & Parallel DS/Algorithms</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Scaling across threads and cores</div>
              <p className="win95-text">
                Concurrency hides latency; parallelism splits work. Pick the right primitives, respect the memory model, and size queues
                so throughput rises without correctness regressions.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Big picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>History</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental hooks</legend>
            <div className="win95-row">
              <div className="win95-panel">
                <div className="win95-subheading">Pillars</div>
                <div className="win95-stack">
                  {pillars.map((item) => (
                    <div key={item.title} className="win95-panel">
                      <div className="win95-heading">{item.title}</div>
                      <p className="win95-text">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="win95-panel">
                <div className="win95-subheading">Mental models</div>
                <div className="win95-stack">
                  {mentalModels.map((item) => (
                    <div key={item.title} className="win95-panel">
                      <div className="win95-heading">{item.title}</div>
                      <p className="win95-text">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Structure families</legend>
            <div className="win95-grid win95-grid-2">
              {structureFamilies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Coordination toolbox</legend>
            <div className="win95-grid win95-grid-2">
              {coordinationToolbox.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Memory model checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {memoryModelChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm map</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Goal</th>
                    <th>Primary</th>
                    <th>Output</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {algorithmMap.map((row) => (
                    <tr key={row.goal}>
                      <td>{row.goal}</td>
                      <td>{row.primary}</td>
                      <td>{row.output}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {howItWorks.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Queue toolkit</legend>
            <div className="win95-grid win95-grid-3">
              {queueToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Scheduling toolkit</legend>
            <div className="win95-grid win95-grid-3">
              {schedulingToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Reclamation toolkit</legend>
            <div className="win95-grid win95-grid-3">
              {reclamationToolkit.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity table</legend>
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
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">Failure story: ABA and reclaimed nodes</div>
              <p className="win95-text">
                A trading platform deployed a lock-free MPMC queue without hazard pointers. Under load, a consumer freed nodes while another
                thread still held an old pointer, leading to swapped reuse and incorrect orders. ABA-safe CAS and epoch reclamation would have
                prevented the heisenbug.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Debugging signals</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {debuggingSignals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {implementationChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced</legend>
            <div className="win95-grid win95-grid-3">
              {advanced.map((item) => (
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
            <legend>Glossary</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {glossary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practice prompts</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {practicePrompts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item} className="win95-panel">
                  <p className="win95-text">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

