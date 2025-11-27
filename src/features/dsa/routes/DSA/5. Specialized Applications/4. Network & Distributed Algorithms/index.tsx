import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const transportRouting = [
  {
    title: 'Reliable delivery on lossy links',
    detail:
      'TCP-style sliding windows with ACKs, retransmit timers, and congestion control (slow start, AIMD) keep throughput high without flooding the network.',
  },
  {
    title: 'Flow vs congestion control',
    detail:
      'Flow control protects receivers; congestion control protects the path. Tune send windows with RTT variance and ECN marks; avoid bufferbloat with pacing.',
  },
  {
    title: 'Routing algorithms',
    detail:
      'Dijkstra (link-state) converges fast with global view; Bellman-Ford (distance-vector) is simpler but risks count-to-infinity without split horizon/poison reverse.',
  },
  {
    title: 'Load balancing and path selection',
    detail:
      'ECMP spreads flows across equal-cost paths; consistent hashing keeps sticky sessions. Watch reordering—enable per-flow hashing to keep packets ordered.',
  },
  {
    title: 'Caching and CDNs',
    detail:
      'Push content toward the edge; route clients via DNS or anycast. Validate with short TTLs and health checks to avoid blackholing traffic.',
  },
]

const consensusReplication = [
  {
    title: 'Leader-based replication',
    detail:
      'Single-writer, multi-follower with WAL shipping. Keep commit quorums odd-sized; use fencing tokens to prevent split-brain after failover.',
  },
  {
    title: 'Raft / Paxos',
    detail:
      'Majority quorums elect a leader, replicate logs, and enforce ordering. Snapshot to cap log growth; use joint consensus for membership changes.',
  },
  {
    title: 'Gossip and eventual consistency',
    detail:
      'Anti-entropy spreads updates probabilistically. Combine with version vectors or CRDTs to resolve conflicts without coordination.',
  },
  {
    title: 'Time and clocks',
    detail:
      'NTP/PTP for wall-clock; logical clocks (Lamport, vector) for causality. Use monotonic clocks for timeouts and avoid wall-clock in correctness paths.',
  },
  {
    title: 'Service discovery',
    detail:
      'Registries with health-checked endpoints; clients subscribe and cache. Prefer push plus bounded staleness; back off on flapping endpoints.',
  },
]

const playbooks = [
  {
    title: 'Designing a resilient service mesh',
    steps: [
      'Use circuit breakers and timeouts per hop; default to fail-fast to avoid request pileups.',
      'Apply retries with jitter and budgets; never retry non-idempotent operations blindly.',
      'Expose per-route SLIs (p99 latency, error rate) and adjust traffic shifting gradually.',
    ],
  },
  {
    title: 'Replication strategy',
    steps: [
      'Pick consistency level per operation (one, quorum, all) based on durability and latency needs.',
      'Use majority write/read to avoid stale reads after failover; lean on leader leases or fencing.',
      'Enable backpressure when replica lag grows; drop or shed low-priority writes first.',
    ],
  },
  {
    title: 'Partition tolerance moves',
    steps: [
      'Define behavior under split: prefer availability (AP) with conflict resolution or consistency (CP) with fail-stop writes.',
      'Track per-partition health and promote leaders only with fresh quorums; avoid dual primaries.',
      'Queue or buffer writes with bounded lifetimes; surface staleness to callers explicitly.',
    ],
  },
  {
    title: 'Operational debugging',
    steps: [
      'Trace requests across services; tag with correlation IDs and sample tail latency paths.',
      'Inspect retransmit/timeout stats and queue depths to locate bottlenecks before saturation.',
      'Compare logical clock deltas or vector clocks when diagnosing ordering/causality bugs.',
    ],
  },
]

const guardrails = [
  'Keep timeouts, retries, and hedging coordinated—unbounded retries amplify outages.',
  'Prefer idempotent handlers; guard non-idempotent ops with tokens or leasing.',
  'Bound quorum waits; surface partial failure modes to callers instead of hanging.',
  'Encrypt in transit by default; rotate keys and certificates without coordinated restarts.',
  'Chaos-test partitions, packet loss, and reordering; verify recovery paths and data convergence.',
]

export default function NetworkDistributedAlgorithmsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Network & Distributed Algorithms"
      subtitle="Moving data reliably at scale"
      intro="Routing, transport, and consensus algorithms keep services connected and coherent. Pair the right primitives with sound operational guardrails to survive loss, latency, and partitions."
    >
      <TopicSection heading="Transport and routing toolkit">
        <div className="grid gap-3 md:grid-cols-2">
          {transportRouting.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Consensus and replication patterns">
        <div className="grid gap-3 md:grid-cols-2">
          {consensusReplication.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Distributed systems playbooks">
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

      <TopicSection heading="Reliability checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {guardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
