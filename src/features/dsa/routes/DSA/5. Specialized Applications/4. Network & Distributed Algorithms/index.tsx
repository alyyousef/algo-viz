import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'Networks lie',
    detail: 'Packets drop, reorder, duplicate, and delay; algorithms make these failures survivable.',
    note: 'Design for tail latency and partial failure, not average throughput.',
  },
  {
    title: 'Ordering is expensive',
    detail: 'Consensus, quorums, and total order cost latency and availability.',
    note: 'Pick the weakest guarantees that still keep correctness.',
  },
  {
    title: 'Control beats brute force',
    detail: 'Pacing, backpressure, and admission control prevent collapse.',
    note: 'Defaults decide whether retries help or melt the system.',
  },
  {
    title: 'Observability is a protocol',
    detail: 'Metrics, tracing, and timeouts are part of the algorithm, not afterthoughts.',
    note: 'You cannot tune what you cannot measure.',
  },
]

const history = [
  {
    title: '1969: ARPANET routing',
    detail: 'Distance-vector routing exposes convergence delays and loop hazards.',
    note: 'Early lesson: distributed state takes time to agree.',
  },
  {
    title: '1981: TCP congestion control',
    detail: 'Slow start and AIMD emerge after congestion collapses.',
    note: 'Sender behavior shapes global network health.',
  },
  {
    title: '1998: DHTs (Chord)',
    detail: 'Consistent hashing enables decentralized routing with logarithmic hops.',
    note: 'Foundation for large-scale peer-to-peer and sharding.',
  },
  {
    title: '2006: Dynamo',
    detail: 'Quorums, vector clocks, and hinted handoff trade consistency for availability.',
    note: 'Practical blueprint for AP systems.',
  },
  {
    title: '2014+: Raft adoption',
    detail: 'Leader-based consensus becomes the default for control planes.',
    note: 'Clearer mental model than Paxos while preserving correctness.',
  },
]

const pillars = [
  {
    title: 'Backoff and pacing',
    detail: 'Randomized backoff and rate pacing prevent synchronized overload.',
  },
  {
    title: 'Quorums and fencing',
    detail: 'Majority rules and leases prevent split-brain and stale leaders.',
  },
  {
    title: 'Idempotence and replay safety',
    detail: 'Handlers must tolerate retries, duplication, and reordering.',
  },
  {
    title: 'Failure detection',
    detail: 'Heartbeats and timeouts are heuristics; treat them as signals, not truth.',
  },
]

const mentalModels = [
  {
    title: 'Postal system with receipts',
    detail: 'Packets are letters; ACKs are receipts; timeouts trigger resends.',
  },
  {
    title: 'Town hall voting',
    detail: 'Quorums mirror majority votes; no quorum means no decision.',
  },
  {
    title: 'Highway on-ramps',
    detail: 'Congestion control is metering to avoid gridlock after a jam.',
  },
  {
    title: 'Library with late fees',
    detail: 'Leases and fencing expire stale ownership; late returns are rejected.',
  },
]

const howItWorks = [
  {
    title: 'Measure the path',
    detail: 'Track RTT, loss, jitter, and bandwidth; use percentiles for timeouts.',
  },
  {
    title: 'Choose transport behavior',
    detail: 'Select ACK strategy, window size, and congestion control based on link dynamics.',
  },
  {
    title: 'Route and balance',
    detail: 'Use link-state for fast convergence or distance-vector for low overhead.',
  },
  {
    title: 'Replicate with intent',
    detail: 'Leader + quorum for strong ordering; gossip + conflict rules for availability.',
  },
  {
    title: 'Handle failure paths',
    detail: 'Retry with jitter and budgets; add hedging only with capacity headroom.',
  },
  {
    title: 'Confirm durability',
    detail: 'Persist logs and metadata before acknowledging client writes.',
  },
  {
    title: 'Observe and tune',
    detail: 'Track retransmits, queue depth, election churn, and tail latency drift.',
  },
]

const transportAnatomy = [
  {
    title: 'Framing and segmentation',
    detail: 'Split data into packets sized for MTU and reassemble with sequence numbers.',
  },
  {
    title: 'ACK strategies',
    detail: 'Cumulative, selective, and delayed ACKs trade overhead for throughput.',
  },
  {
    title: 'Sliding windows',
    detail: 'Control in-flight data to prevent receiver or network overload.',
  },
  {
    title: 'Congestion control',
    detail: 'AIMD, BBR, and CUBIC adjust sending rate based on loss and delay.',
  },
  {
    title: 'Retransmission logic',
    detail: 'Timeouts, fast retransmit, and backoff determine recovery behavior.',
  },
  {
    title: 'Head-of-line avoidance',
    detail: 'Multiplexed streams prevent one slow flow from blocking others.',
  },
]

const routingAnatomy = [
  {
    title: 'Link-state',
    detail: 'Flood topology updates; compute shortest paths locally (Dijkstra).',
  },
  {
    title: 'Distance-vector',
    detail: 'Exchange neighbor distances; risks loops without safeguards.',
  },
  {
    title: 'ECMP hashing',
    detail: 'Equal-cost paths spread flows using consistent hashing.',
  },
  {
    title: 'Anycast and DNS',
    detail: 'Steer clients via routing or name resolution for locality and failover.',
  },
  {
    title: 'Overlay networks',
    detail: 'Encapsulation builds virtual topologies on top of the physical network.',
  },
  {
    title: 'Failure convergence',
    detail: 'Timer tuning dictates how fast the network reacts to link loss.',
  },
]

const consensusAnatomy = [
  {
    title: 'Leader and log',
    detail: 'Leaders serialize writes; logs capture ordered operations.',
  },
  {
    title: 'Quorum rules',
    detail: 'Majority agreement commits entries and prevents divergence.',
  },
  {
    title: 'Term/epoch fencing',
    detail: 'Terms prevent old leaders from overwriting new state.',
  },
  {
    title: 'Snapshots',
    detail: 'Compaction shortens logs to bound recovery time.',
  },
  {
    title: 'Membership changes',
    detail: 'Joint consensus avoids split-brain during reconfiguration.',
  },
  {
    title: 'Read consistency',
    detail: 'Linearizable reads require leader contact or quorum reads.',
  },
]

const messagingPatterns = [
  {
    title: 'Request/response',
    detail: 'Simple and reliable, but latency bound to slowest hop.',
  },
  {
    title: 'Pub/sub',
    detail: 'Decouples producers and consumers; needs ordering and replay policies.',
  },
  {
    title: 'Streaming',
    detail: 'Backpressure-aware pipelines maintain flow under bursty load.',
  },
  {
    title: 'Gossip dissemination',
    detail: 'Random fanout spreads updates with high probability.',
  },
  {
    title: 'Queue-based work',
    detail: 'Visibility timeouts and idempotent workers prevent duplicate processing.',
  },
  {
    title: 'Batch replication',
    detail: 'Amortizes overhead but increases latency for single updates.',
  },
]

const tradeoffMatrix = [
  {
    dimension: 'Consistency',
    strong: 'Quorums, linearizable reads, leader ordering.',
    eventual: 'Gossip, vector clocks, conflict resolution.',
  },
  {
    dimension: 'Latency',
    strong: 'Higher due to quorum and coordination.',
    eventual: 'Lower; local writes and async propagation.',
  },
  {
    dimension: 'Availability',
    strong: 'Reduced under partition.',
    eventual: 'Higher; can accept writes in partition.',
  },
  {
    dimension: 'Operational complexity',
    strong: 'Higher due to leader management and fencing.',
    eventual: 'Higher due to conflict resolution and repair.',
  },
  {
    dimension: 'Read/write amplification',
    strong: 'Extra round trips for agreement.',
    eventual: 'Extra background repair and reconciliation.',
  },
  {
    dimension: 'Failure recovery',
    strong: 'Deterministic via logs.',
    eventual: 'Heuristic via anti-entropy repair.',
  },
]

const complexityTable = [
  {
    approach: 'Dijkstra (link-state)',
    time: 'O(E log V)',
    space: 'O(V)',
    note: 'Fast convergence; higher control-plane traffic.',
  },
  {
    approach: 'Bellman-Ford (distance-vector)',
    time: 'O(VE)',
    space: 'O(V)',
    note: 'Simpler nodes; slower convergence and loop risks.',
  },
  {
    approach: 'Raft append step',
    time: 'O(n)',
    space: 'O(1) per entry',
    note: 'Leader sends to all; majority acks commit.',
  },
  {
    approach: 'Gossip dissemination',
    time: 'O(log n) rounds expected',
    space: 'O(1) per node per round',
    note: 'Random fanout spreads updates quickly.',
  },
  {
    approach: 'Vector clock compare',
    time: 'O(r)',
    space: 'O(r)',
    note: 'r = replicas; detects concurrency and causality.',
  },
  {
    approach: 'Consistent hashing lookup',
    time: 'O(log n)',
    space: 'O(n)',
    note: 'Virtual nodes smooth distribution.',
  },
]

const applications = [
  {
    title: 'Service meshes',
    detail: 'Sidecars handle retries, timeouts, backoff, and circuit breaking.',
    note: 'Protects services from tail-latency cascades.',
  },
  {
    title: 'Distributed databases',
    detail: 'Raft/Paxos for metadata; gossip for membership; consistent hashing for sharding.',
    note: 'Per-operation consistency tuning is common.',
  },
  {
    title: 'CDNs and edge',
    detail: 'Anycast, DNS steering, and regional caches hide long-haul loss.',
    note: 'Health checks prevent blackholes.',
  },
  {
    title: 'IoT fleets',
    detail: 'Pub/sub fanout with backpressure and lossy links.',
    note: 'Clock drift and intermittent connectivity dominate.',
  },
]

const failureStory =
  'A checkout API added aggressive retries without jitter; a transient packet-loss event triggered a retry storm, saturating load balancers and causing cascading timeouts. Adding retry budgets, jitter, and idempotency keys contained subsequent incidents and reduced p99 latency by half.'

const pitfalls = [
  {
    title: 'Retry storms',
    detail: 'Unbounded retries amplify outages; always add budgets and jitter.',
  },
  {
    title: 'Clock dependence',
    detail: 'Wall-clock skew breaks ordering assumptions; use logical clocks for correctness.',
  },
  {
    title: 'Split-brain writes',
    detail: 'Missing fencing allows dual leaders; enforce leases and quorum rules.',
  },
  {
    title: 'Head-of-line blocking',
    detail: 'Single queues block unrelated traffic; multiplex or shard flows.',
  },
  {
    title: 'Non-idempotent handlers',
    detail: 'Duplicate requests corrupt state; enforce idempotency keys and retries.',
  },
  {
    title: 'Silent overload',
    detail: 'No backpressure causes queues to grow unbounded and latency to explode.',
  },
]

const whenToUse = [
  {
    title: 'High-loss or variable RTT links',
    detail: 'Use pacing, smaller packets, and adaptive timeouts.',
  },
  {
    title: 'Strong consistency',
    detail: 'Leader + quorum for correctness and ordering, even under partition.',
  },
  {
    title: 'Geo-distributed availability',
    detail: 'Gossip/CRDTs keep writes available; resolve conflicts later.',
  },
  {
    title: 'Large fanout dissemination',
    detail: 'Gossip or tree-based broadcast beats centralized push.',
  },
]

const advanced = [
  {
    title: 'Hedged requests',
    detail: 'Send a backup after a percentile delay; cancel the slower response.',
    note: 'Cuts tail latency but increases load.',
  },
  {
    title: 'BBR/Copa pacing',
    detail: 'Estimate bandwidth and delay to avoid loss-based oscillations.',
    note: 'Great for high BDP and data center links.',
  },
  {
    title: 'Delta + bounded gossip',
    detail: 'Send only changed state with capped fanout.',
    note: 'Keeps overhead predictable at scale.',
  },
  {
    title: 'Witnesses and leases',
    detail: 'Witness nodes break ties; leases fence stale leaders.',
    note: 'Reduces split-brain risk.',
  },
  {
    title: 'Outbox pattern',
    detail: 'Durable write + event emission avoids lost updates.',
    note: 'Common in transactional messaging.',
  },
  {
    title: 'Adaptive quorum',
    detail: 'Lower quorum under high loss to preserve availability.',
    note: 'Requires careful risk controls.',
  },
]

const tuningChecklist = [
  {
    title: 'Timeouts and retries',
    detail: 'Use percentiles, add jitter, and cap total retry time.',
  },
  {
    title: 'Queue limits',
    detail: 'Set maximum queue depth and reject early with backpressure.',
  },
  {
    title: 'Window sizes',
    detail: 'Tune to bandwidth-delay product and receiver capacity.',
  },
  {
    title: 'Replication factor',
    detail: 'Set based on failure tolerance and read/write patterns.',
  },
  {
    title: 'Compaction/snapshot cadence',
    detail: 'Shorten logs and state size for faster recovery.',
  },
  {
    title: 'Health checks',
    detail: 'Combine passive (errors) and active (probes) signals.',
  },
]

const observability = [
  {
    title: 'Transport health',
    detail: 'Track retransmits, RTT percentiles, and congestion signals.',
  },
  {
    title: 'Routing health',
    detail: 'Monitor convergence time, path flaps, and blackhole rate.',
  },
  {
    title: 'Consensus health',
    detail: 'Track election churn, commit latency, and leader availability.',
  },
  {
    title: 'Queue health',
    detail: 'Watch queue depth, time in queue, and rejection rate.',
  },
  {
    title: 'Tail latency',
    detail: 'p95/p99 per hop reveals hidden bottlenecks.',
  },
  {
    title: 'Error budgets',
    detail: 'Use SLOs to guide retries and hedging limits.',
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
  {
    title: 'Expect loss and delay',
    detail: 'Timeouts, pacing, and backoff should be default behavior.',
  },
  {
    title: 'Ordering costs availability',
    detail: 'Quorums and total order add latency and reduce availability under partition.',
  },
  {
    title: 'Idempotence saves systems',
    detail: 'Design handlers for duplicates and replays from day one.',
  },
  {
    title: 'Measure the tail',
    detail: 'p95/p99 and retransmit rates reveal true health.',
  },
]

export default function NetworkDistributedAlgorithmsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Network & Distributed Algorithms</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Turning unreliable links into dependable systems</div>
              <p className="win95-text">
                Networks drop and delay packets; distributed systems crash, partition, and diverge. Algorithms for transport, routing,
                and consensus turn these realities into manageable failure modes. The craft is in pacing, quorum rules, and defaults
                that prevent cascades when things go wrong.
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
            <legend>History that shaped the stack</legend>
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
            <legend>Transport anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {transportAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Routing anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {routingAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Consensus anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {consensusAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Messaging patterns</legend>
            <div className="win95-grid win95-grid-2">
              {messagingPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tradeoff matrix</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Strong consistency</th>
                    <th>Eventual consistency</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeoffMatrix.map((row) => (
                    <tr key={row.dimension}>
                      <td>{row.dimension}</td>
                      <td>{row.strong}</td>
                      <td>{row.eventual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <legend>Where it shows up</legend>
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
            <legend>Tuning checklist</legend>
            <div className="win95-grid win95-grid-2">
              {tuningChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Observability and signals</legend>
            <div className="win95-grid win95-grid-2">
              {observability.map((item) => (
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
