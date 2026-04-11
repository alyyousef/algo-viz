import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

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
    detail:
      'cgroups, priorities, and NUMA affinity keep noisy neighbors from stealing CPU or cache lines.',
    note: 'Isolation is a feature, not an afterthought, in multi-tenant systems.',
  },
  {
    title: 'Predictable under stress',
    detail:
      'Policies need guardrails for overload: preemption, throttling, reclamation, and OOM handling.',
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
    detail:
      'Keep threads near their data (NUMA, cache); avoid bouncing to reduce TLB and cache misses.',
  },
  {
    title: 'Memory residency',
    detail:
      'Decide what stays in RAM and what gets reclaimed; huge pages and slab caches cut overhead.',
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
    detail:
      'Measure CPU burstiness, IO wait, and memory footprint. Separate latency-sensitive from batch tasks.',
  },
  {
    title: 'Pick a scheduler class',
    detail:
      'General-purpose (CFS/MLFQ) for mixed loads; deadline/RT for bounded latency; batch for background jobs.',
  },
  {
    title: 'Set quanta and priorities',
    detail:
      'Tune slice length and weights; add aging to prevent starvation; cap RT budget to protect the rest.',
  },
  {
    title: 'Place tasks',
    detail:
      'Use CPU affinity and NUMA policies; keep related threads and memory on the same node when possible.',
  },
  {
    title: 'Shape memory',
    detail:
      'Choose page sizes, enable huge pages where stable, layer buddy+slab allocators, and watch TLB and reclaim metrics.',
  },
  {
    title: 'Add guardrails',
    detail:
      'Throttle noisy tasks with cgroups; set OOM policies; instrument run queues, faults, shootdowns, and latency.',
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
    detail:
      'Short quanta and aggressive boosts preserve UI latency while background tasks run at low priority.',
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
    detail:
      'Background tasks without quotas can starve foreground work; enforce cgroup limits and aging.',
  },
  {
    title: 'Overlong quanta',
    detail: 'Large time slices hide latency bugs and delay preemption; interactive tasks suffer.',
  },
  {
    title: 'Excessive migrations',
    detail:
      'Moving threads across cores trashes caches and TLBs; use affinity for stable workloads.',
  },
  {
    title: 'TLB shootdown storms',
    detail:
      'Frequent global invalidations (e.g., page table churn) stall all cores; batch changes and prefer huge pages when stable.',
  },
  {
    title: 'Unbounded reclaim',
    detail:
      'Aggressive swapping or reclaim during load spikes can deadlock progress; set pressure controls and admission gates.',
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
    detail:
      'Pin threads and memory; avoid cross-node bouncing; size huge pages to stable hotspots.',
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
    detail:
      'Run RT/deadline on reserved cores, CFS for general work, and batch for background chores.',
    note: 'Keeps critical paths isolated from bulk tasks.',
  },
  {
    title: 'NUMA balancing',
    detail:
      'Kernel migrates pages toward the CPU that touches them most; disable when pinning manually.',
    note: 'Can help generic workloads but harms pinned services.',
  },
  {
    title: 'Transparent huge pages (THP) policy',
    detail:
      'Use madvise/hugepage hints for stable regions; disable for bursty allocators to avoid latency spikes.',
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
    explanation:
      'Short quanta at the top favor interactive tasks; longer quanta catch CPU hogs without starvation.',
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
    explanation:
      'Models a small page cache; LRU keeps hot pages resident, reducing page faults and TLB churn.',
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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'takeaways'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'takeaways', label: 'Takeaways' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'overview', label: 'Overview' },
    { id: 'big-picture', label: 'Big picture' },
    { id: 'history-that-shaped-kernels', label: 'History that shaped kernels' },
    { id: 'where-these-choices-matter', label: 'Where these choices matter' },
  ],
  'core-concepts': [
    { id: 'pillars-and-mental-hooks', label: 'Pillars and mental hooks' },
    { id: 'how-it-works-step-by-step', label: 'How it works, step by step' },
    { id: 'complexity-at-a-glance', label: 'Complexity at a glance' },
    { id: 'advanced-moves', label: 'Advanced moves' },
  ],
  examples: [
    { id: 'failure-mode', label: 'Failure mode' },
    { id: 'code-examples', label: 'Code examples' },
  ],
  takeaways: [
    { id: 'pitfalls-to-avoid', label: 'Pitfalls to avoid' },
    {
      id: 'when-to-reach-for-each-approach',
      label: 'When to reach for each approach',
    },
    { id: 'key-takeaways', label: 'Key takeaways' },
  ],
}

export default function OSKernelSchedulingMemoryPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'OS & Kernel (Scheduling, Memory Mgmt)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="OS & Kernel (Scheduling, Memory Mgmt)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">OS &amp; Kernel (Scheduling, Memory Mgmt)</h1>
      <p className="bin98-doc-subtitle">Balancing CPU fairness and memory health.</p>

      {activeTab === 'big-picture' && (
        <>
          <section id="overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <div className="bin98-subheading">Balancing CPU fairness and memory health</div>
            <p>
              Schedulers decide who runs; memory managers decide what stays resident. Matching
              policies to workloads, keeping locality, and enforcing isolation deliver predictable
              latency and solid throughput.
            </p>
          </section>

          <section id="big-picture" className="bin98-section">
            <h2 className="bin98-heading">Big picture</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="history-that-shaped-kernels" className="bin98-section">
            <h2 className="bin98-heading">History that shaped kernels</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {history.map((event) => (
                <div key={event.title} className="bin98-section">
                  <div className="bin98-subheading">{event.title}</div>
                  <p>{event.detail}</p>
                  <p>{event.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="where-these-choices-matter" className="bin98-section">
            <h2 className="bin98-heading">Where these choices matter</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {applications.map((app) => (
                <div key={app.title} className="bin98-section">
                  <div className="bin98-subheading">{app.title}</div>
                  <p>{app.detail}</p>
                  <p>{app.note}</p>
                </div>
              ))}
            </div>
            <div className="bin98-section">
              <div className="bin98-subheading">Failure mode</div>
              <p>{failureStory}</p>
            </div>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="pillars-and-mental-hooks" className="bin98-section">
            <h2 className="bin98-heading">Pillars and mental hooks</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bin98-section">
                <div className="bin98-subheading">Pillars</div>
                <div className="space-y-4">
                  {pillars.map((pillar) => (
                    <div key={pillar.title} className="bin98-section">
                      <div className="bin98-subheading">{pillar.title}</div>
                      <p>{pillar.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bin98-section">
                <div className="bin98-subheading">Mental models</div>
                <div className="space-y-4">
                  {mentalModels.map((model) => (
                    <div key={model.title} className="bin98-section">
                      <div className="bin98-subheading">{model.title}</div>
                      <p>{model.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="how-it-works-step-by-step" className="bin98-section">
            <h2 className="bin98-heading">How it works, step by step</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="bin98-section">
                  <div className="bin98-subheading">
                    Step {index + 1}: {step.title}
                  </div>
                  <p>{step.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="complexity-at-a-glance" className="bin98-section">
            <h2 className="bin98-heading">Complexity at a glance</h2>
            <div className="bin98-section">
              <table className="bin98-table">
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
          </section>

          <section id="advanced-moves" className="bin98-section">
            <h2 className="bin98-heading">Advanced moves</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {advanced.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="failure-mode" className="bin98-section">
            <h2 className="bin98-heading">Failure mode</h2>
            <div className="bin98-section">
              <p>{failureStory}</p>
            </div>
          </section>

          <section id="code-examples" className="bin98-section">
            <h2 className="bin98-heading">Code examples</h2>
            <div className="space-y-4">
              {codeExamples.map((example) => (
                <div key={example.title} className="bin98-section">
                  <div className="bin98-subheading">{example.title}</div>
                  <pre className="bin98-codebox">
                    <code>{example.code}</code>
                  </pre>
                  <p>{example.explanation}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'takeaways' && (
        <>
          <section id="pitfalls-to-avoid" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls to avoid</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {pitfalls.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="when-to-reach-for-each-approach" className="bin98-section">
            <h2 className="bin98-heading">When to reach for each approach</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {whenToUse.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="key-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key takeaways</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {keyTakeaways.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </TopicPageShell>
  )
}
