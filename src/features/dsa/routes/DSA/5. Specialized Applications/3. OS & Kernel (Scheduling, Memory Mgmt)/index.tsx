import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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
    <TopicLayout
      title="OS & Kernel (Scheduling, Memory Mgmt)"
      subtitle="Balancing CPU fairness and memory health"
      intro="Schedulers decide who runs; memory managers decide what stays resident. Matching policies to workloads, keeping locality, and enforcing isolation deliver predictable latency and solid throughput."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History that shaped kernels">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {history.map((event) => (
            <article key={event.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">{event.title}</p>
              <p className="text-sm text-white/80">{event.detail}</p>
              <p className="text-xs text-white/60">{event.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Pillars and mental hooks">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="text-sm text-white/80">{pillar.detail}</p>
              </article>
            ))}
          </div>
          <div className="space-y-3">
            {mentalModels.map((model) => (
              <article key={model.title} className="rounded-lg bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{model.title}</h3>
                <p className="text-sm text-white/80">{model.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How it works, step by step">
        <div className="grid gap-3 md:grid-cols-3">
          {howItWorks.map((step, idx) => (
            <article key={step.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold text-white/60">Step {idx + 1}</p>
              <h3 className="text-sm font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-white/80">{step.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity at a glance">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-white/80">
            <thead className="border-b border-white/10 text-xs uppercase tracking-wide text-white/60">
              <tr>
                <th className="px-3 py-2">Approach</th>
                <th className="px-3 py-2">Time</th>
                <th className="px-3 py-2">Space</th>
                <th className="px-3 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="border-b border-white/5">
                  <td className="px-3 py-2 font-semibold text-white">{row.approach}</td>
                  <td className="px-3 py-2 text-white/80">{row.time}</td>
                  <td className="px-3 py-2 text-white/80">{row.space}</td>
                  <td className="px-3 py-2 text-white/70">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Where these choices matter">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((app) => (
            <article key={app.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{app.title}</h3>
              <p className="text-sm text-white/80">{app.detail}</p>
              <p className="text-xs text-white/60">{app.note}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
          <p className="font-semibold text-red-200">Failure mode</p>
          <p>{failureStory}</p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls to avoid">
        <div className="space-y-2 rounded-lg bg-white/5 p-4">
          {pitfalls.map((item) => (
            <div key={item.title} className="rounded-md border border-white/5 p-3">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When to reach for each approach">
        <div className="space-y-2 rounded-lg bg-white/5 p-4">
          {whenToUse.map((item) => (
            <div key={item.title} className="rounded-md border border-white/5 p-3">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Advanced moves">
        <div className="grid gap-3 md:grid-cols-2">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="grid gap-3 md:grid-cols-2">
          {codeExamples.map((example) => (
            <article key={example.title} className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{example.title}</h3>
              <pre className="overflow-x-auto rounded-md bg-black/40 p-3 text-xs text-white">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {keyTakeaways.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
