import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Move data over unreliable pipes',
    detail: 'Transport algorithms mask loss, reorder, and jitter so applications see a clean stream.',
    note: 'Sliding windows, ACKs, and pacing keep throughput usable.',
  },
  {
    title: 'Find paths and balance load',
    detail: 'Routing and load sharing spread flows, avoid blackholes, and react to link changes.',
    note: 'Link-state vs distance-vector is a convergence and overhead trade-off.',
  },
  {
    title: 'Keep replicas in agreement',
    detail: 'Consensus and replication make stateful systems survive crashes and partitions.',
    note: 'Quorums and logs give ordering; conflict resolution keeps AP systems coherent.',
  },
  {
    title: 'Design for partial failure',
    detail: 'Timeouts, retries, and hedging must assume slow or broken links and nodes.',
    note: 'Defaults matter more than happy-path throughput.',
  },
]

const history = [
  {
    title: '1969: ARPANET routing',
    detail: 'Distance-vector with periodic updates and split horizon to reduce loops.',
    note: 'Early illustration of convergence and loop pitfalls.',
  },
  {
    title: '1981: TCP congestion control',
    detail: 'Slow start and AIMD added after congestion collapse incidents.',
    note: 'Showed sender behavior shapes network health.',
  },
  {
    title: '1998: Chord and DHTs',
    detail: 'Consistent hashing for decentralized lookup with logarithmic hops.',
    note: 'Foundation for peer-to-peer and partition-tolerant routing.',
  },
  {
    title: '2014: Raft adoption',
    detail: 'Raft simplifies Paxos-style consensus with clear roles and logs.',
    note: 'Became the default for many distributed databases and control planes.',
  },
]

const pillars = [
  {
    title: 'Backoff and pacing',
    detail: 'Randomized backoff and rate pacing prevent synchronized overload.',
  },
  {
    title: 'Quorums and ordering',
    detail: 'Majority agreement or versioning avoids split-brain and preserves causality.',
  },
  {
    title: 'Health signals',
    detail: 'Heartbeats, RTT tracking, and loss signals drive retries and election timing.',
  },
  {
    title: 'Idempotence and replay safety',
    detail: 'Design handlers to survive retries, reordering, and duplicate deliveries.',
  },
]

const mentalModels = [
  {
    title: 'Postal system with receipts',
    detail: 'Packets are letters; ACKs are receipts; timeouts trigger resends. Works until you assume delivery is perfect.',
  },
  {
    title: 'Town hall votes',
    detail: 'Quorums mirror town meetings: you need a majority present to pass a motion. Splitting the room means no decision.',
  },
  {
    title: 'Traffic lights with timers',
    detail: 'Backoff and pacing are timed lights to stop cars from flooding an intersection after a jam.',
  },
]

const howItWorks = [
  {
    title: 'Measure the network',
    detail: 'Track RTT, loss, and available paths; pick timeouts from moving percentiles, not fixed guesses.',
  },
  {
    title: 'Pick transport behavior',
    detail: 'Use sliding windows, ACK strategies, and congestion control; cap in-flight data to what the path can bear.',
  },
  {
    title: 'Route and balance',
    detail: 'Choose link-state or distance-vector; use ECMP or consistent hashing to spread flows.',
  },
  {
    title: 'Replicate with rules',
    detail: 'For strong consistency, use leader plus quorums; for eventual, pair gossip with conflict resolution (CRDTs or vector clocks).',
  },
  {
    title: 'Handle failure paths',
    detail: 'Set retries with jitter and budgets; hedge carefully; surface partial results instead of hanging.',
  },
  {
    title: 'Observe and adjust',
    detail: 'Log retransmits, queue depths, election churn, and skew; tune before tail latency drifts.',
  },
]

const complexityTable = [
  {
    approach: 'Dijkstra (link-state)',
    time: 'O(E log V)',
    space: 'O(V)',
    note: 'Fast convergence; higher control-plane overhead.',
  },
  {
    approach: 'Bellman-Ford (distance-vector)',
    time: 'O(VE)',
    space: 'O(V)',
    note: 'Simpler nodes; slower convergence and loop risks.',
  },
  {
    approach: 'Raft consensus step',
    time: 'O(n)',
    space: 'O(1) per entry',
    note: 'Leader sends to all; majority to commit.',
  },
  {
    approach: 'Gossip dissemination',
    time: 'O(log n) rounds expected',
    space: 'O(1) per node per round',
    note: 'Random fanout spreads updates quickly with low per-node load.',
  },
]

const applications = [
  {
    title: 'Service meshes',
    detail: 'Sidecars handle retries, backoff, and circuit breaking between microservices.',
    note: 'Tames tail latency and noisy neighbors.',
  },
  {
    title: 'Distributed databases',
    detail: 'Raft/Paxos for metadata and logs; consistent hashing for sharding; gossip for membership.',
    note: 'Balance consistency with availability per operation.',
  },
  {
    title: 'Content delivery',
    detail: 'Anycast and DNS steer clients; caches and transport tuning hide loss on long links.',
    note: 'Short TTLs and health checks prevent blackholes.',
  },
  {
    title: 'Edge and IoT fleets',
    detail: 'Gossip or pub-sub fans out config; backpressure protects constrained links.',
    note: 'Clock drift and lossy links dominate design.',
  },
]

const failureStory =
  'A payment API added aggressive client retries without jitter; a regional packet drop caused a retry storm that overwhelmed the load balancer and led to cascading timeouts. Adding per-hop budgets, jittered backoff, and idempotency keys kept later incidents contained.'

const pitfalls = [
  {
    title: 'Unbounded retries',
    detail: 'Retry storms turn small outages into full meltdowns; add budgets and jitter.',
  },
  {
    title: 'Assuming reliable clocks',
    detail: 'Using wall-clock for correctness fails under skew; rely on monotonic timers and logical clocks.',
  },
  {
    title: 'Split-brain writes',
    detail: 'Failing to fence leaders lets two primaries diverge; use leases and quorums.',
  },
  {
    title: 'Head-of-line blocking',
    detail: 'Per-connection queues can stall unrelated requests; multiplex or shard flows.',
  },
  {
    title: 'Missing idempotency',
    detail: 'Handlers that cannot tolerate duplicates will corrupt state when resends happen.',
  },
]

const whenToUse = [
  {
    title: 'High-loss or variable RTT links',
    detail: 'Use paced congestion control, shorter packets, and adaptive timeouts.',
  },
  {
    title: 'Strong consistency',
    detail: 'Leader plus quorum (Raft/Paxos) when ordering matters more than availability under partition.',
  },
  {
    title: 'Geo-distributed AP systems',
    detail: 'Gossip and CRDTs keep availability; resolve conflicts automatically.',
  },
  {
    title: 'Large fanout broadcasts',
    detail: 'Gossip or tree-based dissemination beats central push for scale.',
  },
]

const advanced = [
  {
    title: 'Hedged and tuned retries',
    detail: 'Send a backup after a percentile-based delay; cancel the slower one when a response arrives.',
    note: 'Cuts tail latency but increases load; budget carefully.',
  },
  {
    title: 'Adaptive congestion control',
    detail: 'BBR and Copa estimate bandwidth and delay to pace packets better than AIMD on long-fat pipes.',
    note: 'Useful on high BDP links and data centers with shallow buffers.',
  },
  {
    title: 'Delta and bounded gossip',
    detail: 'Send only changed state; cap fanout and payload to avoid floods.',
    note: 'Keeps overhead predictable in large clusters.',
  },
  {
    title: 'Witnesses and leases',
    detail: 'Witness nodes break ties; time-bounded leases fence old leaders.',
    note: 'Reduces split-brain risk during partitions.',
  },
]

const codeExamples = [
  {
    title: 'Retry with jitter and budget',
    code: `async function retry<T>(fn: () => Promise<T>, attempts = 3, base = 100, budget = 2000) {
  let elapsed = 0
  for (let i = 0; i < attempts; i++) {
    const start = Date.now()
    try {
      return await fn()
    } catch (err) {
      const backoff = Math.min(base * 2 ** i, 1000)
      const jitter = Math.random() * backoff
      const delay = backoff + jitter
      elapsed += Date.now() - start + delay
      if (elapsed > budget || i === attempts - 1) throw err
      await new Promise((r) => setTimeout(r, delay))
    }
  }
  throw new Error('exhausted')
}`,
    explanation: 'Budgets and jitter prevent retry storms and keep total wait bounded.',
  },
  {
    title: 'Raft AppendEntries sketch',
    code: `type Entry = { term: number; data: string }

function appendEntries(
  state: { currentTerm: number; log: Entry[]; commitIndex: number },
  req: { term: number; prevLogIndex: number; prevLogTerm: number; entries: Entry[]; leaderCommit: number },
) {
  if (req.term < state.currentTerm) return { success: false, term: state.currentTerm }
  state.currentTerm = req.term
  const prev = state.log[req.prevLogIndex]
  if (!prev || prev.term !== req.prevLogTerm) return { success: false, term: state.currentTerm }
  state.log = state.log.slice(0, req.prevLogIndex + 1).concat(req.entries) // overwrite conflicts
  if (req.leaderCommit > state.commitIndex) {
    state.commitIndex = Math.min(req.leaderCommit, state.log.length - 1)
  }
  return { success: true, term: state.currentTerm }
}`,
    explanation: 'Follows Raft rules: reject term regressions, ensure log matches before appending, and advance commit carefully.',
  },
]

const keyTakeaways = [
  {
    title: 'Plan for loss and delay',
    detail: 'Timeouts, backoff, and pacing should be first-class, not bolted on.',
  },
  {
    title: 'Consistency is a choice',
    detail: 'Quorum rules and conflict resolution must match availability and latency goals.',
  },
  {
    title: 'Idempotence is survival',
    detail: 'Retries and duplicates are normal; handlers must tolerate them.',
  },
  {
    title: 'Measure the tail',
    detail: 'Watch retransmits, election churn, and p99s; correctness and performance drift under real traffic.',
  },
]

export default function NetworkDistributedAlgorithmsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Network & Distributed Algorithms"
      subtitle="Moving data reliably at scale"
      intro="Transport, routing, and consensus algorithms turn lossy networks into dependable systems. The craft is in pacing, quorums, conflict handling, and the defaults you choose for failure."
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

      <TopicSection heading="History that shaped the stack">
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

      <TopicSection heading="Where it shows up">
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
