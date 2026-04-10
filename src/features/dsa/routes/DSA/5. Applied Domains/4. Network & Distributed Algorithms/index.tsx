import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  [
    'Networks lie',
    'Packets drop, reorder, duplicate, and delay; algorithms make these failures survivable.',
    'Design for tail latency and partial failure, not average throughput.',
  ],
  [
    'Ordering is expensive',
    'Consensus, quorums, and total order cost latency and availability.',
    'Pick the weakest guarantees that still keep correctness.',
  ],
  [
    'Control beats brute force',
    'Pacing, backpressure, and admission control prevent collapse.',
    'Defaults decide whether retries help or melt the system.',
  ],
  [
    'Observability is a protocol',
    'Metrics, tracing, and timeouts are part of the algorithm, not afterthoughts.',
    'You cannot tune what you cannot measure.',
  ],
] as const

const history = [
  [
    '1969: ARPANET routing',
    'Distance-vector routing exposes convergence delays and loop hazards.',
    'Early lesson: distributed state takes time to agree.',
  ],
  [
    '1981: TCP congestion control',
    'Slow start and AIMD emerge after congestion collapses.',
    'Sender behavior shapes global network health.',
  ],
  [
    '1998: DHTs (Chord)',
    'Consistent hashing enables decentralized routing with logarithmic hops.',
    'Foundation for large-scale peer-to-peer and sharding.',
  ],
  [
    '2006: Dynamo',
    'Quorums, vector clocks, and hinted handoff trade consistency for availability.',
    'Practical blueprint for AP systems.',
  ],
  [
    '2014+: Raft adoption',
    'Leader-based consensus becomes the default for control planes.',
    'Clearer mental model than Paxos while preserving correctness.',
  ],
] as const

const pillars = [
  ['Backoff and pacing', 'Randomized backoff and rate pacing prevent synchronized overload.'],
  ['Quorums and fencing', 'Majority rules and leases prevent split-brain and stale leaders.'],
  ['Idempotence and replay safety', 'Handlers must tolerate retries, duplication, and reordering.'],
  [
    'Failure detection',
    'Heartbeats and timeouts are heuristics; treat them as signals, not truth.',
  ],
] as const

const mentalModels = [
  [
    'Postal system with receipts',
    'Packets are letters; ACKs are receipts; timeouts trigger resends.',
  ],
  ['Town hall voting', 'Quorums mirror majority votes; no quorum means no decision.'],
  ['Highway on-ramps', 'Congestion control is metering to avoid gridlock after a jam.'],
  [
    'Library with late fees',
    'Leases and fencing expire stale ownership; late returns are rejected.',
  ],
] as const

const howItWorks = [
  ['Measure the path', 'Track RTT, loss, jitter, and bandwidth; use percentiles for timeouts.'],
  [
    'Choose transport behavior',
    'Select ACK strategy, window size, and congestion control based on link dynamics.',
  ],
  ['Route and balance', 'Use link-state for fast convergence or distance-vector for low overhead.'],
  [
    'Replicate with intent',
    'Leader + quorum for strong ordering; gossip + conflict rules for availability.',
  ],
  [
    'Handle failure paths',
    'Retry with jitter and budgets; add hedging only with capacity headroom.',
  ],
  ['Confirm durability', 'Persist logs and metadata before acknowledging client writes.'],
  ['Observe and tune', 'Track retransmits, queue depth, election churn, and tail latency drift.'],
] as const

const transportAnatomy = [
  [
    'Framing and segmentation',
    'Split data into packets sized for MTU and reassemble with sequence numbers.',
  ],
  ['ACK strategies', 'Cumulative, selective, and delayed ACKs trade overhead for throughput.'],
  ['Sliding windows', 'Control in-flight data to prevent receiver or network overload.'],
  ['Congestion control', 'AIMD, BBR, and CUBIC adjust sending rate based on loss and delay.'],
  ['Retransmission logic', 'Timeouts, fast retransmit, and backoff determine recovery behavior.'],
  ['Head-of-line avoidance', 'Multiplexed streams prevent one slow flow from blocking others.'],
] as const

const routingAnatomy = [
  ['Link-state', 'Flood topology updates; compute shortest paths locally (Dijkstra).'],
  ['Distance-vector', 'Exchange neighbor distances; risks loops without safeguards.'],
  ['ECMP hashing', 'Equal-cost paths spread flows using consistent hashing.'],
  ['Anycast and DNS', 'Steer clients via routing or name resolution for locality and failover.'],
  ['Overlay networks', 'Encapsulation builds virtual topologies on top of the physical network.'],
  ['Failure convergence', 'Timer tuning dictates how fast the network reacts to link loss.'],
] as const

const consensusAnatomy = [
  ['Leader and log', 'Leaders serialize writes; logs capture ordered operations.'],
  ['Quorum rules', 'Majority agreement commits entries and prevents divergence.'],
  ['Term/epoch fencing', 'Terms prevent old leaders from overwriting new state.'],
  ['Snapshots', 'Compaction shortens logs to bound recovery time.'],
  ['Membership changes', 'Joint consensus avoids split-brain during reconfiguration.'],
  ['Read consistency', 'Linearizable reads require leader contact or quorum reads.'],
] as const

const messagingPatterns = [
  ['Request/response', 'Simple and reliable, but latency bound to slowest hop.'],
  ['Pub/sub', 'Decouples producers and consumers; needs ordering and replay policies.'],
  ['Streaming', 'Backpressure-aware pipelines maintain flow under bursty load.'],
  ['Gossip dissemination', 'Random fanout spreads updates with high probability.'],
  ['Queue-based work', 'Visibility timeouts and idempotent workers prevent duplicate processing.'],
  ['Batch replication', 'Amortizes overhead but increases latency for single updates.'],
] as const

const tradeoffMatrix = [
  [
    'Consistency',
    'Quorums, linearizable reads, leader ordering.',
    'Gossip, vector clocks, conflict resolution.',
  ],
  [
    'Latency',
    'Higher due to quorum and coordination.',
    'Lower; local writes and async propagation.',
  ],
  ['Availability', 'Reduced under partition.', 'Higher; can accept writes in partition.'],
  [
    'Operational complexity',
    'Higher due to leader management and fencing.',
    'Higher due to conflict resolution and repair.',
  ],
  [
    'Read/write amplification',
    'Extra round trips for agreement.',
    'Extra background repair and reconciliation.',
  ],
  ['Failure recovery', 'Deterministic via logs.', 'Heuristic via anti-entropy repair.'],
] as const

const complexityTable = [
  [
    'Dijkstra (link-state)',
    'O(E log V)',
    'O(V)',
    'Fast convergence; higher control-plane traffic.',
  ],
  [
    'Bellman-Ford (distance-vector)',
    'O(VE)',
    'O(V)',
    'Simpler nodes; slower convergence and loop risks.',
  ],
  ['Raft append step', 'O(n)', 'O(1) per entry', 'Leader sends to all; majority acks commit.'],
  [
    'Gossip dissemination',
    'O(log n) rounds expected',
    'O(1) per node per round',
    'Random fanout spreads updates quickly.',
  ],
  ['Vector clock compare', 'O(r)', 'O(r)', 'r = replicas; detects concurrency and causality.'],
  ['Consistent hashing lookup', 'O(log n)', 'O(n)', 'Virtual nodes smooth distribution.'],
] as const

const applications = [
  [
    'Service meshes',
    'Sidecars handle retries, timeouts, backoff, and circuit breaking.',
    'Protects services from tail-latency cascades.',
  ],
  [
    'Distributed databases',
    'Raft/Paxos for metadata; gossip for membership; consistent hashing for sharding.',
    'Per-operation consistency tuning is common.',
  ],
  [
    'CDNs and edge',
    'Anycast, DNS steering, and regional caches hide long-haul loss.',
    'Health checks prevent blackholes.',
  ],
  [
    'IoT fleets',
    'Pub/sub fanout with backpressure and lossy links.',
    'Clock drift and intermittent connectivity dominate.',
  ],
] as const

const failureStory =
  'A checkout API added aggressive retries without jitter; a transient packet-loss event triggered a retry storm, saturating load balancers and causing cascading timeouts. Adding retry budgets, jitter, and idempotency keys contained subsequent incidents and reduced p99 latency by half.'

const pitfalls = [
  ['Retry storms', 'Unbounded retries amplify outages; always add budgets and jitter.'],
  [
    'Clock dependence',
    'Wall-clock skew breaks ordering assumptions; use logical clocks for correctness.',
  ],
  ['Split-brain writes', 'Missing fencing allows dual leaders; enforce leases and quorum rules.'],
  ['Head-of-line blocking', 'Single queues block unrelated traffic; multiplex or shard flows.'],
  [
    'Non-idempotent handlers',
    'Duplicate requests corrupt state; enforce idempotency keys and retries.',
  ],
  ['Silent overload', 'No backpressure causes queues to grow unbounded and latency to explode.'],
] as const

const whenToUse = [
  ['High-loss or variable RTT links', 'Use pacing, smaller packets, and adaptive timeouts.'],
  ['Strong consistency', 'Leader + quorum for correctness and ordering, even under partition.'],
  ['Geo-distributed availability', 'Gossip/CRDTs keep writes available; resolve conflicts later.'],
  ['Large fanout dissemination', 'Gossip or tree-based broadcast beats centralized push.'],
] as const

const advanced = [
  [
    'Hedged requests',
    'Send a backup after a percentile delay; cancel the slower response.',
    'Cuts tail latency but increases load.',
  ],
  [
    'BBR/Copa pacing',
    'Estimate bandwidth and delay to avoid loss-based oscillations.',
    'Great for high BDP and data center links.',
  ],
  [
    'Delta + bounded gossip',
    'Send only changed state with capped fanout.',
    'Keeps overhead predictable at scale.',
  ],
  [
    'Witnesses and leases',
    'Witness nodes break ties; leases fence stale leaders.',
    'Reduces split-brain risk.',
  ],
  [
    'Outbox pattern',
    'Durable write + event emission avoids lost updates.',
    'Common in transactional messaging.',
  ],
  [
    'Adaptive quorum',
    'Lower quorum under high loss to preserve availability.',
    'Requires careful risk controls.',
  ],
] as const

const tuningChecklist = [
  ['Timeouts and retries', 'Use percentiles, add jitter, and cap total retry time.'],
  ['Queue limits', 'Set maximum queue depth and reject early with backpressure.'],
  ['Window sizes', 'Tune to bandwidth-delay product and receiver capacity.'],
  ['Replication factor', 'Set based on failure tolerance and read/write patterns.'],
  ['Compaction/snapshot cadence', 'Shorten logs and state size for faster recovery.'],
  ['Health checks', 'Combine passive (errors) and active (probes) signals.'],
] as const

const observability = [
  ['Transport health', 'Track retransmits, RTT percentiles, and congestion signals.'],
  ['Routing health', 'Monitor convergence time, path flaps, and blackhole rate.'],
  ['Consensus health', 'Track election churn, commit latency, and leader availability.'],
  ['Queue health', 'Watch queue depth, time in queue, and rejection rate.'],
  ['Tail latency', 'p95/p99 per hop reveals hidden bottlenecks.'],
  ['Error budgets', 'Use SLOs to guide retries and hedging limits.'],
] as const

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
    explanation: 'Budgets and jitter prevent retry storms and bound total wait time.',
  },
  {
    title: 'Vector clock merge',
    code: `type Clock = Record<string, number>

function mergeClock(a: Clock, b: Clock): Clock {
  const out: Clock = { ...a }
  for (const [node, counter] of Object.entries(b)) {
    out[node] = Math.max(out[node] ?? 0, counter)
  }
  return out
}`,
    explanation: 'Vector clocks preserve causality and detect concurrent updates.',
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
  state.log = state.log.slice(0, req.prevLogIndex + 1).concat(req.entries)
  if (req.leaderCommit > state.commitIndex) {
    state.commitIndex = Math.min(req.leaderCommit, state.log.length - 1)
  }
  return { success: true, term: state.currentTerm }
}`,
    explanation: 'Reject term regressions, ensure log matches, then append and advance commit.',
  },
  {
    title: 'Token bucket rate limiter',
    code: `class TokenBucket {
  private tokens: number
  private lastRefill = Date.now()
  constructor(private rate: number, private capacity: number) {
    this.tokens = capacity
  }

  take(n = 1) {
    const now = Date.now()
    const refill = ((now - this.lastRefill) / 1000) * this.rate
    this.tokens = Math.min(this.capacity, this.tokens + refill)
    this.lastRefill = now
    if (this.tokens < n) return false
    this.tokens -= n
    return true
  }
}`,
    explanation: 'Rate limiting protects shared resources from overload.',
  },
]

const keyTakeaways = [
  ['Expect loss and delay', 'Timeouts, pacing, and backoff should be default behavior.'],
  [
    'Ordering costs availability',
    'Quorums and total order add latency and reduce availability under partition.',
  ],
  ['Idempotence saves systems', 'Design handlers for duplicates and replays from day one.'],
  ['Measure the tail', 'p95/p99 and retransmit rates reveal true health.'],
] as const

const glossary = [
  ['Quorum', 'Minimum set of nodes required to agree on an operation or leader decision.'],
  [
    'Idempotence',
    'Property that lets repeated execution of the same operation have the same effect as one execution.',
  ],
  [
    'Backpressure',
    'Mechanism that slows or rejects senders when downstream capacity is saturated.',
  ],
  ['Jitter', 'Random delay added to retries or timers to avoid synchronized bursts.'],
  ['Vector clock', 'Per-replica counters used to compare causality and detect concurrent updates.'],
  [
    'Raft',
    'Leader-based consensus algorithm that commits log entries once a majority acknowledges them.',
  ],
  ['AIMD', 'Additive Increase Multiplicative Decrease congestion control pattern.'],
  ['ECMP', 'Equal-Cost Multi-Path routing that spreads flows across equivalent paths.'],
] as const

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
    { id: 'core-pillars', label: 'Pillars' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-flow', label: 'How It Works' },
    { id: 'core-transport', label: 'Transport Anatomy' },
    { id: 'core-routing', label: 'Routing Anatomy' },
    { id: 'core-consensus', label: 'Consensus Anatomy' },
    { id: 'core-messaging', label: 'Messaging Patterns' },
    { id: 'core-tradeoffs', label: 'Tradeoff Matrix' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-when', label: 'When to Use' },
    { id: 'core-advanced', label: 'Advanced Moves' },
    { id: 'core-tuning', label: 'Tuning Checklist' },
    { id: 'core-observability', label: 'Observability' },
  ],
  examples: [
    { id: 'ex-failure', label: 'Failure Mode' },
    { id: 'ex-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function NetworkDistributedAlgorithmsPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Network &amp; Distributed Algorithms',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Network &amp; Distributed Algorithms"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Network &amp; Distributed Algorithms</h1>
      <p className="net-help-intro">
        Networks drop and delay packets; distributed systems crash, partition, and diverge.
        Algorithms for transport, routing, and consensus turn these realities into manageable
        failure modes. The craft is in pacing, quorum rules, and defaults that prevent cascades when
        things go wrong.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History That Shaped the Stack</h2>
            {history.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Where It Shows Up</h2>
            {applications.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            {keyTakeaways.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars" className="bin98-section">
            <h2 className="bin98-heading">Pillars and Mental Hooks</h2>
            {pillars.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-flow" className="bin98-section">
            <h2 className="bin98-heading">How It Works, Step by Step</h2>
            {howItWorks.map(([title, detail], index) => (
              <p key={title}>
                <strong>
                  Step {index + 1}: {title}:
                </strong>{' '}
                {detail}
              </p>
            ))}
          </section>

          <section id="core-transport" className="bin98-section">
            <h2 className="bin98-heading">Transport Anatomy</h2>
            {transportAnatomy.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-routing" className="bin98-section">
            <h2 className="bin98-heading">Routing Anatomy</h2>
            {routingAnatomy.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-consensus" className="bin98-section">
            <h2 className="bin98-heading">Consensus Anatomy</h2>
            {consensusAnatomy.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-messaging" className="bin98-section">
            <h2 className="bin98-heading">Messaging Patterns</h2>
            {messagingPatterns.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Tradeoff Matrix</h2>
            {tradeoffMatrix.map(([dimension, strong, eventual]) => (
              <p key={dimension}>
                <strong>{dimension}:</strong> Strong consistency: {strong} Eventual consistency:{' '}
                {eventual}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity at a Glance</h2>
            {complexityTable.map(([approach, time, space, note]) => (
              <p key={approach}>
                <strong>{approach}:</strong> Time {time}; Space {space}; {note}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls to Avoid</h2>
            <ul>
              {pitfalls.map(([title, detail]) => (
                <li key={title}>
                  <strong>{title}:</strong> {detail}
                </li>
              ))}
            </ul>
          </section>

          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Reach for Each Approach</h2>
            {whenToUse.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Moves</h2>
            {advanced.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="core-tuning" className="bin98-section">
            <h2 className="bin98-heading">Tuning Checklist</h2>
            {tuningChecklist.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-observability" className="bin98-section">
            <h2 className="bin98-heading">Observability and Signals</h2>
            {observability.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-failure" className="bin98-section">
            <h2 className="bin98-heading">Failure Mode</h2>
            <p>{failureStory}</p>
          </section>

          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {codeExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map(([term, definition]) => (
            <p key={term}>
              <strong>{term}:</strong> {definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
