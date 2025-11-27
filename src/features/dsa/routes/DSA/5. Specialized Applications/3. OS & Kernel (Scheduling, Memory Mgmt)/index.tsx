import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const scheduling = [
  {
    title: 'Round Robin and time slicing',
    detail:
      'Fixed quantum with preemption keeps latency low for interactive workloads. Tune quantum to balance context-switch overhead against responsiveness.',
  },
  {
    title: 'Priority and aging',
    detail:
      'Static or dynamic priorities steer CPU to critical work; aging or priority boost prevents starvation. Combine with per-class run queues to isolate noisy neighbors.',
  },
  {
    title: 'Multi-Level Feedback Queue (MLFQ)',
    detail:
      'Promote interactive tasks to short quanta; demote CPU hogs to longer quanta. Simple, effective fairness without heavy math.',
  },
  {
    title: 'Completely Fair Scheduler (CFS)-style',
    detail:
      'Virtual runtime with red-black trees approximates proportional share. Good default when fairness and throughput both matter.',
  },
  {
    title: 'Real-time (EDF/RM)',
    detail:
      'Earliest-Deadline-First or Rate-Monotonic for bounded latency. Requires admission control, budget enforcement, and overrun handling.',
  },
]

const memory = [
  {
    title: 'Paging & TLB health',
    detail:
      '4K/2M/1G pages trade fragmentation for fewer TLB misses. Hot loops benefit from huge pages; random access may not. Always watch TLB shootdowns on multicore.',
  },
  {
    title: 'Buddy allocators',
    detail:
      'Fast split/merge for page frames with power-of-two blocks. Fragmentation can grow under odd-sized requests—pair with slab for small objects.',
  },
  {
    title: 'Slab / object caches',
    detail:
      'Per-type caches avoid repeated initialization and fragmentation. Great for frequently allocated kernel objects (inodes, sockets, vmas).',
  },
  {
    title: 'NUMA-aware placement',
    detail:
      'Keep allocations local to the CPU node; migrate or interleave only when necessary. Balance locality with even memory pressure across nodes.',
  },
  {
    title: 'Swapping & reclaim',
    detail:
      'LRU or CLOCK variants reclaim cold pages; cgroup pressure controls keep misbehaving workloads contained. Swapping is a pressure valve, not a plan.',
  },
]

const playbooks = [
  {
    title: 'Scheduling knobs to tune',
    steps: [
      'Pick a quantum: start with a few ms for desktop, larger for batch; measure context-switch rate.',
      'Cap priorities per class (realtime vs normal) and enable aging to prevent starvation.',
      'Use CPU affinity and NUMA pinning to keep cache-hot tasks local and reduce migrations.',
    ],
  },
  {
    title: 'Memory allocator choices',
    steps: [
      'Back page allocation with buddy; layer slab caches for small, frequent objects.',
      'Enable huge pages for steady-state, page-walk-heavy workloads; avoid for bursty or sparse patterns.',
      'Track fragmentation and page-bounce metrics; rebalance or compact before reclaim churn spikes.',
    ],
  },
  {
    title: 'Real-time workloads',
    steps: [
      'Isolate cores for RT tasks; push background work to other CPUs.',
      'Use deadline schedulers with explicit runtime/period budgets; add admission control.',
      'Audit system calls for unbounded latency (page faults, filesystem I/O, locks) and pre-fault critical memory.',
    ],
  },
  {
    title: 'Debugging stalls',
    steps: [
      'Profile run-queue latency and preemption counts to spot hogs or lock contention.',
      'Inspect page faults (minor vs major) and TLB miss rates; pre-touch or use huge pages when appropriate.',
      'Capture lock-hold times and IRQ/softirq usage to catch priority inversion or interrupt storms.',
    ],
  },
]

const guardrails = [
  'Avoid unbounded work in kernel paths; preempt or batch to keep latency predictable.',
  'Keep cgroup limits sane: CPU shares/quota aligned with memory limits to prevent swap storms.',
  'Log and cap TLB shootdowns and cross-CPU IPIs; frequent global flushes hurt scalability.',
  'Always pair priority boosts with decay/aging to prevent permanent priority inversion.',
  'Exercise crash drills: OOM paths, hung task detector, watchdog resets, and allocator failure handling.',
]

export default function OSKernelSchedulingMemoryPage(): JSX.Element {
  return (
    <TopicLayout
      title="OS & Kernel (Scheduling, Memory Mgmt)"
      subtitle="Balancing CPU fairness and memory health"
      intro="Kernel schedulers and memory managers decide who runs and what stays resident. Choosing the right policies and guardrails keeps latency predictable without sacrificing throughput."
    >
      <TopicSection heading="CPU scheduling toolkit">
        <div className="grid gap-3 md:grid-cols-2">
          {scheduling.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Memory management building blocks">
        <div className="grid gap-3 md:grid-cols-2">
          {memory.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Operational playbooks">
        <div className="grid gap-3 md:grid-cols-2">
          {playbooks.map((play) => (
            <article key={play.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{play.title}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {play.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Reliability and safety checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {guardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
