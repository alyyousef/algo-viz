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
              <div className="win95-subheading">Moving data reliably at scale</div>
              <p className="win95-text">
                Transport, routing, and consensus algorithms turn lossy networks into dependable systems. The craft is in pacing,
                quorums, conflict handling, and the defaults you choose for failure.
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
              <div className="win95-stack">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="win95-panel">
                    <div className="win95-heading">{pillar.title}</div>
                    <p className="win95-text">{pillar.detail}</p>
                  </div>
                ))}
              </div>
              <div className="win95-stack">
                {mentalModels.map((model) => (
                  <div key={model.title} className="win95-panel">
                    <div className="win95-heading">{model.title}</div>
                    <p className="win95-text">{model.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works, step by step</legend>
            <div className="win95-grid win95-grid-3">
              {howItWorks.map((step, idx) => (
                <div key={step.title} className="win95-panel">
                  <p className="win95-text">Step {idx + 1}</p>
                  <div className="win95-heading">{step.title}</div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity at a glance</legend>
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
            <div className="win95-stack">
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
            <div className="win95-stack">
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
