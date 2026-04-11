import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Throughput via partitioning',
    detail:
      'Split work and state so cores rarely contend. Shards, ownership, and queues keep hot paths local.',
  },
  {
    title: 'Correctness under interleavings',
    detail:
      'Progress guarantees (lock-free, wait-free) and memory ordering rules ensure results hold across schedules.',
  },
  {
    title: 'Latency hiding with pipelines',
    detail:
      'Stages overlap I/O and compute; backpressure keeps systems stable instead of flooding slow consumers.',
  },
]

const history = [
  {
    title: '1965: Dijkstra semaphores',
    detail:
      'Introduced P/V operations, formalizing mutual exclusion and signaling in early multiprogramming.',
  },
  {
    title: '1974-1978: Lamport happens-before and Bakery',
    detail:
      'Established ordering logic and a software mutual exclusion algorithm without hardware support.',
  },
  {
    title: '1991: Herlihy progress hierarchy',
    detail:
      'Defined wait-free/lock-free/obstruction-free classes and universal constructions for concurrent objects.',
  },
  {
    title: '1999-2010: Work stealing and RCU in production',
    detail:
      'Blumofe-Leiserson schedulers and Read-Copy-Update (McKenney) showed practical parallelism on servers and kernels.',
  },
]

const pillars = [
  {
    title: 'Progress guarantees',
    detail:
      'Pick between blocking, lock-free, or wait-free semantics; know which threads can starve.',
  },
  {
    title: 'Memory model discipline',
    detail:
      'Happens-before edges (locks, atomics, fences) prevent reordering bugs; SC by default unless proven otherwise.',
  },
  {
    title: 'Contention containment',
    detail:
      'Prefer ownership and sharding over global locks; use backoff and combining to smooth bursts.',
  },
  {
    title: 'Safe reclamation',
    detail:
      'Use epochs, hazard pointers, or RCU to free memory once all readers are past it; avoid ABA.',
  },
]

const structureFamilies = [
  {
    title: 'Shared-state with locks',
    detail:
      'Mutexes, RW locks, and condition variables; simplest to reason about but can serialize hot paths.',
  },
  {
    title: 'Lock-free data structures',
    detail:
      'CAS-based queues, stacks, and maps; higher throughput under contention but require careful memory reclamation.',
  },
  {
    title: 'Message passing',
    detail:
      'Actors, channels, and work queues minimize shared memory and move ownership to threads.',
  },
  {
    title: 'Data-parallel algorithms',
    detail: 'Scans, reductions, and map/reduce patterns with predictable work/span bounds.',
  },
]

const coordinationToolbox = [
  {
    title: 'Mutex and RW locks',
    detail:
      'Best for coarse critical sections; prefer RW locks for read-heavy workloads with rare writers.',
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
    detail:
      'More lanes reduce waiting, but merging points (locks) become hot. Sharding keys is like routing cars to separate booths.',
  },
  {
    title: 'Assembly line with inspectors',
    detail:
      'Stages in a pipeline work concurrently; inspectors (assertions) keep invariants intact. Breaks down if buffers overflow.',
  },
]

const howItWorks = [
  {
    step: '1. Choose ownership',
    detail:
      'Assign shards or actors to state; minimize cross-ownership mutations before picking primitives.',
  },
  {
    step: '2. Select coordination',
    detail:
      'Locks for simplicity, RW locks for read-heavy, atomics/CAS for hot counters, channels for decoupling.',
  },
  {
    step: '3. Enforce memory ordering',
    detail:
      'Use release-acquire or SC fences on handoff points; document which fields travel together.',
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
  {
    approach: 'Work-stealing deque (Chase-Lev)',
    time: 'O(1) amortized',
    space: 'O(n)',
    note: 'Local push/pop are fast; thieves contend on the opposite end with atomics.',
  },
  {
    approach: 'Michael-Scott MPMC queue',
    time: 'O(1) amortized',
    space: 'O(n)',
    note: 'Lock-free with CAS; throughput sensitive to ABA and reclamation strategy.',
  },
  {
    approach: 'Striped concurrent hash map',
    time: 'O(1) avg',
    space: 'O(n)',
    note: 'Locks per stripe reduce contention; resizing and rehashing can serialize writers.',
  },
  {
    approach: 'Parallel prefix sum (scan)',
    time: 'O(n)',
    space: 'O(n)',
    note: 'Work O(n), span O(log n) enabling near-linear speedup with enough cores.',
  },
  {
    approach: 'Flat combining stack/queue',
    time: 'O(1) avg',
    space: 'O(n)',
    note: 'One combiner batches operations, reducing contention at cost of latency under light load.',
  },
  {
    approach: 'RCU read path',
    time: 'O(1)',
    space: 'O(n) versions',
    note: 'Reads are wait-free; writers pay update + grace period costs.',
  },
  {
    approach: 'Parallel reduction',
    time: 'O(n)',
    space: 'O(n)',
    note: 'Work O(n), span O(log n) with associative operations.',
  },
  {
    approach: 'Elimination stack',
    time: 'O(1) avg',
    space: 'O(n)',
    note: 'Opposing push/pop pair off-structure to reduce contention.',
  },
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
    detail:
      'Work-stealing deques keep CPU utilization high in browsers, JVM, Go, and async runtimes.',
  },
  {
    title: 'Databases and storage engines',
    detail:
      'MPMC queues and latch-free skip lists back log ingestion, compaction, and lock managers.',
  },
  {
    title: 'Streaming and telemetry pipelines',
    detail:
      'Bounded channels with backpressure prevent overload in metrics, logging, and fraud detection systems.',
  },
  {
    title: 'Graphics and scientific compute',
    detail:
      'Parallel scans, reductions, and partitioning drive GPU sorting, ray tracing, and simulation kernels.',
  },
]

const failureStory =
  'A trading platform deployed a lock-free MPMC queue without hazard pointers. Under load, a consumer freed nodes while another thread still held an old pointer, leading to swapped reuse and incorrect orders. ABA-safe CAS and epoch reclamation would have prevented the heisenbug.'

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
    detail:
      'Publish new versions while readers traverse old ones; reclamation waits for quiescent states.',
  },
  {
    title: 'Epoch or hazard-pointer reclamation',
    detail:
      'Track active readers so frees happen only after all observers leave critical sections.',
  },
  {
    title: 'Elimination/backoff for stacks and queues',
    detail:
      'Pair opposing operations to complete off-structure, reducing contention on the main data.',
  },
  {
    title: 'Flat combining',
    detail:
      'One thread batches pending operations, cutting atomic traffic at the cost of single-combiner latency.',
  },
  {
    title: 'NUMA-aware sharding',
    detail:
      'Keep owners and memory local to sockets; cross-socket ops use message passing instead of shared locks.',
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
    explanation:
      'Single consumer simplifies ordering; bounded capacity enforces backpressure. Writers only use atomic increments.',
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
    explanation:
      'Tree-shaped upsweep/downsweep yields logarithmic span, enabling near-linear speedup with enough threads.',
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
    explanation:
      'Readers avoid locks; writers wait for a grace period before reclaiming old versions.',
  },
  {
    title: 'CAS loop for lock-free counter',
    code: `function add(delta):
    while true:
        old = atomic_load(x)
        if atomic_compare_exchange(x, old, old + delta):
            return`,
    explanation:
      'Simple CAS loops are safe for small counters but can live-lock without backoff under contention.',
  },
]

const glossary = [
  {
    term: 'Progress guarantee',
    definition: 'A liveness property such as blocking, lock-free, or wait-free.',
  },
  {
    term: 'Happens-before',
    definition: 'An ordering relation that makes writes visible to other threads.',
  },
  {
    term: 'ABA problem',
    definition: 'CAS sees the same value after a change, hiding intervening updates.',
  },
  {
    term: 'False sharing',
    definition: 'Multiple cores modify independent data on the same cache line.',
  },
  {
    term: 'Backpressure',
    definition: 'Signals that slow producers when consumers lag.',
  },
  {
    term: 'Span',
    definition: 'The length of the critical path in a parallel algorithm.',
  },
  {
    term: 'RCU grace period',
    definition: 'Time until all pre-existing readers have exited.',
  },
  {
    term: 'Work stealing',
    definition: 'Idle threads steal tasks from busy ones.',
  },
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
    { id: 'core-pillars', label: 'Core Pillars' },
    { id: 'core-families', label: 'Structure Families' },
    { id: 'core-coordination', label: 'Coordination Toolbox' },
    { id: 'core-memory', label: 'Memory Checklist' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-algorithms', label: 'Algorithm Map' },
    { id: 'core-workflow', label: 'How It Works' },
    { id: 'core-queues', label: 'Queue Toolkit' },
    { id: 'core-scheduling', label: 'Scheduling Toolkit' },
    { id: 'core-reclamation', label: 'Reclamation Toolkit' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-debugging', label: 'Debugging Signals' },
    { id: 'core-when', label: 'When to Use' },
    { id: 'core-implementation', label: 'Implementation Checklist' },
    { id: 'core-advanced', label: 'Advanced Topics' },
  ],
  examples: [
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-prompts', label: 'Practice Prompts' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ConcurrentParallelPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Concurrent &amp; Parallel DS/Algorithms',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Concurrent &amp; Parallel DS/Algorithms"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Concurrent &amp; Parallel DS/Algorithms</h1>
      <p className="con-help-intro">
        Concurrency hides latency, while parallelism splits work across cores. This page keeps the
        original content intact but presents it as a Windows-style help manual focused on ownership,
        progress guarantees, memory ordering, and the operational discipline needed to scale safely.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History</h2>
            {history.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications and Failure Story</h2>
            {applications.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <h3 className="bin98-subheading">Failure story: ABA and reclaimed nodes</h3>
            <p>{failureStory}</p>
          </section>

          <hr className="bin98-divider" />

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars" className="bin98-section">
            <h2 className="bin98-heading">Core Pillars</h2>
            {pillars.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-families" className="bin98-section">
            <h2 className="bin98-heading">Structure Families</h2>
            {structureFamilies.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-coordination" className="bin98-section">
            <h2 className="bin98-heading">Coordination Toolbox</h2>
            {coordinationToolbox.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-memory" className="bin98-section">
            <h2 className="bin98-heading">Memory Model Checklist</h2>
            <ul>
              {memoryModelChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="core-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-algorithms" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Map</h2>
            {algorithmMap.map((item) => (
              <div key={item.goal}>
                <h3 className="bin98-subheading">{item.goal}</h3>
                <p>
                  <strong>Primary:</strong> {item.primary}
                </p>
                <p>
                  <strong>Output:</strong> {item.output}
                </p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>

          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">How It Works</h2>
            {howItWorks.map((item) => (
              <p key={item.step}>
                <strong>{item.step}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-queues" className="bin98-section">
            <h2 className="bin98-heading">Queue Toolkit</h2>
            {queueToolkit.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-scheduling" className="bin98-section">
            <h2 className="bin98-heading">Scheduling Toolkit</h2>
            {schedulingToolkit.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-reclamation" className="bin98-section">
            <h2 className="bin98-heading">Reclamation Toolkit</h2>
            {reclamationToolkit.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Table</h2>
            {complexityTable.map((item) => (
              <p key={item.approach}>
                <strong>{item.approach}:</strong> time {item.time}, space {item.space}. {item.note}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="core-debugging" className="bin98-section">
            <h2 className="bin98-heading">Debugging Signals</h2>
            <ul>
              {debuggingSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use</h2>
            <ol>
              {whenToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section id="core-implementation" className="bin98-section">
            <h2 className="bin98-heading">Implementation Checklist</h2>
            <ul>
              {implementationChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Topics</h2>
            {advanced.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {codeExamples.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <pre className="bin98-codebox">
                  <code>{item.code.trim()}</code>
                </pre>
                <p>{item.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-prompts" className="bin98-section">
            <h2 className="bin98-heading">Practice Prompts</h2>
            <ol>
              {practicePrompts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
