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
    title: 'Share CPUs fairly',
    detail: 'Schedulers balance latency for interactive tasks against throughput for batch work.',
    note: 'Pick a policy that matches the mix: desktops need responsiveness; servers need steady throughput.',
  },
  {
    title: 'Protect memory health',
    detail: 'Paging, TLBs, and allocators decide what stays resident and how costly misses become.',
    note: 'Bad locality or fragmented heaps turn into tail-latency spikes.',
  },
  {
    title: 'Isolation first',
    detail: 'cgroups, priorities, and NUMA affinity keep noisy neighbors from stealing CPU or cache lines.',
    note: 'Isolation is a feature, not an afterthought, in multi-tenant systems.',
  },
  {
    title: 'Predictable under stress',
    detail: 'Policies need guardrails for overload: preemption, throttling, reclamation, and OOM handling.',
    note: 'Test with failure drills, not just benchmarks.',
  },
]

const history = [
  {
    title: '1960s: Time sharing',
    detail: 'Early round-robin schedulers bring fair CPU slices to interactive terminals.',
    note: 'Introduced quanta and preemption.',
  },
  {
    title: '1975: Multics/Unix VM',
    detail: 'Paged virtual memory and demand paging become standard on general-purpose OSes.',
    note: 'Set the template for TLB-based address translation.',
  },
  {
    title: '1992: MLFQ refinements',
    detail: 'BSD variants popularize multi-level feedback queues for mixed workloads.',
    note: 'Simple queue aging to stop starvation.',
  },
  {
    title: '2007: Linux CFS',
    detail: 'Completely Fair Scheduler uses virtual runtime and RB-trees for proportional share.',
    note: 'Modern baseline for general Linux servers.',
  },
]

const pillars = [
  {
    title: 'Preemption and quanta',
    detail: 'Bound how long a task can run before yielding to keep latency predictable.',
  },
  {
    title: 'Priority and fairness',
    detail: 'Balance weight-based fairness with boosts for interactive or latency-sensitive work.',
  },
  {
    title: 'Locality and affinity',
    detail: 'Keep threads near their data (NUMA, cache); avoid bouncing to reduce TLB and cache misses.',
  },
  {
    title: 'Memory residency',
    detail: 'Decide what stays in RAM and what gets reclaimed; huge pages and slab caches cut overhead.',
  },
]

const mentalModels = [
  {
    title: 'Restaurant host',
    detail:
      'A host seats guests (tasks) in turn, bumps regulars (interactive) ahead, and rotates tables on a timer. Breaks down if one party never leaves (no preemption).',
  },
  {
    title: 'Tool cart',
    detail:
      'Keep hot tools (pages) on the cart; store cold ones in the back. If you keep swapping tools, the job stalls. That is poor locality and TLB churn.',
  },
  {
    title: 'Neighborhood zoning',
    detail:
      'Pin residents to their blocks (NUMA nodes) to reduce cross-town trips. Moving them often ruins the benefit of local caches.',
  },
]

const howItWorks = [
  {
    title: 'Profile the workload',
    detail: 'Measure CPU burstiness, IO wait, and memory footprint. Separate latency-sensitive from batch tasks.',
  },
  {
    title: 'Pick a scheduler class',
    detail: 'General-purpose (CFS/MLFQ) for mixed loads; deadline/RT for bounded latency; batch for background jobs.',
  },
  {
    title: 'Set quanta and priorities',
    detail: 'Tune slice length and weights; add aging to prevent starvation; cap RT budget to protect the rest.',
  },
  {
    title: 'Place tasks',
    detail: 'Use CPU affinity and NUMA policies; keep related threads and memory on the same node when possible.',
  },
  {
    title: 'Shape memory',
    detail: 'Choose page sizes, enable huge pages where stable, layer buddy+slab allocators, and watch TLB and reclaim metrics.',
  },
  {
    title: 'Add guardrails',
    detail: 'Throttle noisy tasks with cgroups; set OOM policies; instrument run queues, faults, shootdowns, and latency.',
  },
]

const complexityTable = [
  {
    approach: 'Round Robin dispatch',
    time: 'O(1)',
    space: 'O(n)',
    note: 'Simple queue rotation; good for small run queues.',
  },
  {
    approach: 'MLFQ scheduling',
    time: 'O(1) average',
    space: 'O(n)',
    note: 'Few queues; occasional aging pass.',
  },
  {
    approach: 'CFS/RB-tree pick next',
    time: 'O(log n)',
    space: 'O(n)',
    note: 'Virtual runtime ordering via balanced tree.',
  },
  {
    approach: 'Page-table walk (4-level)',
    time: '4 memory references per miss',
    space: 'O(levels)',
    note: 'TLB hit collapses to O(1); huge pages reduce walk depth.',
  },
]

const applications = [
  {
    title: 'Cloud servers',
    detail: 'CFS-style schedulers with cgroups keep multi-tenant services fair and isolated.',
    note: 'NUMA pinning reduces cross-socket traffic on large boxes.',
  },
  {
    title: 'Mobile and edge',
    detail: 'Short quanta and aggressive boosts preserve UI latency while background tasks run at low priority.',
    note: 'Thermal limits double as scheduling input.',
  },
  {
    title: 'Databases and caches',
    detail: 'NUMA-aware placement plus huge pages improve page-table and cache hit rates.',
    note: 'Pinned worker pools avoid migration and TLB shootdowns.',
  },
  {
    title: 'Real-time audio/industrial',
    detail: 'Deadline or rate-monotonic classes with isolated cores prevent dropouts.',
    note: 'Pre-fault memory and lock-free queues keep latency bounded.',
  },
]

const failureStory =
  'A trading service ran on a dual-socket server with default scheduling; threads bounced across sockets, driving TLB shootdowns and 5x latency spikes at market open. Pinning workers per NUMA node and using huge pages cut shootdowns and restored sub-millisecond p99s.'

const pitfalls = [
  {
    title: 'Noisy neighbor starvation',
    detail: 'Background tasks without quotas can starve foreground work; enforce cgroup limits and aging.',
  },
  {
    title: 'Overlong quanta',
    detail: 'Large time slices hide latency bugs and delay preemption; interactive tasks suffer.',
  },
  {
    title: 'Excessive migrations',
    detail: 'Moving threads across cores trashes caches and TLBs; use affinity for stable workloads.',
  },
  {
    title: 'TLB shootdown storms',
    detail: 'Frequent global invalidations (e.g., page table churn) stall all cores; batch changes and prefer huge pages when stable.',
  },
  {
    title: 'Unbounded reclaim',
    detail: 'Aggressive swapping or reclaim during load spikes can deadlock progress; set pressure controls and admission gates.',
  },
]

const whenToUse = [
  {
    title: 'Latency-sensitive frontends',
    detail: 'Use preemptive, small quanta schedulers with priority boosts and CPU pinning.',
  },
  {
    title: 'Batch or analytics nodes',
    detail: 'Favor throughput schedulers with larger quanta and fewer preemptions.',
  },
  {
    title: 'NUMA-heavy servers',
    detail: 'Pin threads and memory; avoid cross-node bouncing; size huge pages to stable hotspots.',
  },
  {
    title: 'Real-time control',
    detail: 'Pick EDF/RM classes with admission control; isolate cores and pre-fault memory.',
  },
]

const advanced = [
  {
    title: 'cgroup-based isolation',
    detail: 'CPU shares/quotas and memory limits prevent runaway tenants.',
    note: 'Pair CPU and memory limits to avoid swap storms.',
  },
  {
    title: 'Scheduler classes mix',
    detail: 'Run RT/deadline on reserved cores, CFS for general work, and batch for background chores.',
    note: 'Keeps critical paths isolated from bulk tasks.',
  },
  {
    title: 'NUMA balancing',
    detail: 'Kernel migrates pages toward the CPU that touches them most; disable when pinning manually.',
    note: 'Can help generic workloads but harms pinned services.',
  },
  {
    title: 'Transparent huge pages (THP) policy',
    detail: 'Use madvise/hugepage hints for stable regions; disable for bursty allocators to avoid latency spikes.',
    note: 'Reduces page walks; risks compaction stalls if misused.',
  },
]

const codeExamples = [
  {
    title: 'Tiny MLFQ scheduler sketch',
    code: `type Task = { id: string; remaining: number; queue: number }

class MLFQ {
  private queues: Task[][] = [[], [], []] // high to low
  private quanta = [5, 10, 20]

  add(task: Task) {
    task.queue = 0
    this.queues[0].push(task)
  }

  tick() {
    for (let q = 0; q < this.queues.length; q++) {
      const tasks = this.queues[q]
      if (!tasks.length) continue
      const task = tasks.shift()!
      const slice = this.quanta[q]
      task.remaining -= slice
      if (task.remaining > 0) {
        const nextQ = Math.min(q + 1, this.queues.length - 1)
        task.queue = nextQ
        this.queues[nextQ].push(task)
      }
      return task.id // ran this task
    }
  }
}`,
    explanation: 'Short quanta at the top favor interactive tasks; longer quanta catch CPU hogs without starvation.',
  },
  {
    title: 'Simple LRU page cache',
    code: `type Page = { key: string; data: string }

class PageCache {
  private order: string[] = []
  private map = new Map<string, Page>()
  constructor(private capacity: number) {}

  get(key: string): Page | undefined {
    const page = this.map.get(key)
    if (!page) return
    this.touch(key)
    return page
  }

  put(page: Page) {
    if (this.map.has(page.key)) {
      this.map.set(page.key, page)
      this.touch(page.key)
      return
    }
    this.map.set(page.key, page)
    this.order.unshift(page.key)
    if (this.order.length > this.capacity) {
      const evict = this.order.pop()!
      this.map.delete(evict)
    }
  }

  private touch(key: string) {
    this.order = [key, ...this.order.filter((k) => k !== key)]
  }
}`,
    explanation: 'Models a small page cache; LRU keeps hot pages resident, reducing page faults and TLB churn.',
  },
]

const keyTakeaways = [
  {
    title: 'Match policy to workload',
    detail: 'Desktop, server, and real-time systems need different quanta and classes.',
  },
  {
    title: 'Locality is performance',
    detail: 'Affinity, NUMA awareness, and huge pages cut cache and TLB misses.',
  },
  {
    title: 'Isolation prevents cliffs',
    detail: 'cgroups and priorities keep noisy neighbors from tanking latency.',
  },
  {
    title: 'Watch the guardrails',
    detail: 'Track run queues, faults, shootdowns, and reclaim; adjust before p99s drift.',
  },
]

export default function OSKernelSchedulingMemoryPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">OS & Kernel (Scheduling, Memory Mgmt)</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Balancing CPU fairness and memory health</div>
              <p className="win95-text">
                Schedulers decide who runs; memory managers decide what stays resident. Matching policies to workloads, keeping
                locality, and enforcing isolation deliver predictable latency and solid throughput.
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
            <legend>History that shaped kernels</legend>
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
            <legend>Where these choices matter</legend>
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
            <legend>When to reach for each approach</legend>
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
