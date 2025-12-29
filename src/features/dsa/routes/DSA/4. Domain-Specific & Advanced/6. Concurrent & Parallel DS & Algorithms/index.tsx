import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Concurrent & Parallel DS/Algorithms</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
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
