import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Deadlock conditions formalized (1971)',
    detail:
      'Coffman et al. describe the necessary conditions for deadlock: mutual exclusion, hold-and-wait, no preemption, and circular wait.',
  },
  {
    title: 'Wait-for graphs enter OS tooling (1970s)',
    detail:
      'Graph-based detection helps visualize and detect cycles in lock allocation, influencing database and kernel designs.',
  },
  {
    title: 'Database deadlock detectors mature (1980s-1990s)',
    detail:
      'DBMS implementations automate detection and victim selection to keep transactional systems responsive.',
  },
  {
    title: 'Modern systems combine detection with timeouts (2000s+)',
    detail:
      'Practical systems mix detection, timeouts, and heuristic recovery to keep overhead manageable.',
  },
]

const mentalModels = [
  {
    title: 'Traffic circle with no exits',
    detail:
      'Every car holds a lane segment and waits for the next. A cycle means nobody moves without intervention.',
  },
  {
    title: 'Resource dependency graph',
    detail:
      'Processes and resources are nodes; edges show who holds and who waits. Cycles signal deadlocks.',
  },
  {
    title: 'Detect, then recover',
    detail:
      'Unlike avoidance, detection accepts deadlocks may happen and focuses on finding and resolving them quickly.',
  },
]

const coreStructures = [
  {
    heading: 'Wait-for graph (single instance)',
    bullets: [
      'Nodes are processes only.',
      'Edge Pi -> Pj means Pi waits for a resource held by Pj.',
      'Cycle implies deadlock.',
    ],
  },
  {
    heading: 'Allocation graph (multi-instance)',
    bullets: [
      'Nodes are processes and resources.',
      'Edges P -> R request; R -> P allocation.',
      'Cycle detection is necessary but not sufficient for deadlock with multiple instances.',
    ],
  },
  {
    heading: 'Available / Allocation / Request matrices',
    bullets: [
      'Similar to Banker’s, but for detection.',
      'Request[i][j] captures outstanding needs.',
      'Detection checks if processes can finish with Available.',
    ],
  },
  {
    heading: 'Victim selection metadata',
    bullets: [
      'Process priority, age, or cost to restart.',
      'Resources held and how long they have been held.',
      'Rollback or kill decision support.',
    ],
  },
  {
    heading: 'Recovery actions',
    bullets: [
      'Abort one or more processes.',
      'Preempt resources (if safe) and roll back.',
      'Checkpointing to reduce lost work.',
    ],
  },
  {
    heading: 'Detection frequency',
    bullets: [
      'Periodic scans balance overhead and responsiveness.',
      'On-demand scans run when progress stalls or timeouts fire.',
      'Adaptive strategies reduce wasted work.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Single-instance detection',
    detail:
      'Build a wait-for graph and run cycle detection (DFS/Tarjan). Any cycle indicates deadlock among the involved processes.',
  },
  {
    title: 'Multi-instance detection',
    detail:
      'Use Available, Allocation, and Request. Mark processes whose Request <= Available, simulate completion, and repeat. Unmarked processes are deadlocked.',
  },
  {
    title: 'Recovery',
    detail:
      'Choose a victim process to abort or roll back, release its resources, and rerun detection until the cycle clears.',
  },
]

const complexityNotes = [
  {
    title: 'Graph cycle detection',
    detail:
      'DFS-based detection runs in O(V + E). With many locks, edges can be large but still efficient.',
  },
  {
    title: 'Matrix-based detection',
    detail:
      'Worst case is O(n^2 * m) as the system repeatedly checks processes against Available.',
  },
  {
    title: 'Operational cost',
    detail:
      'Frequent detection adds overhead; infrequent detection prolongs deadlocks and throughput loss.',
  },
  {
    title: 'Recovery overhead',
    detail:
      'Killing or rolling back processes wastes work, so victim selection matters.',
  },
]

const realWorldUses = [
  {
    context: 'Database systems',
    detail:
      'DB engines detect transaction deadlocks and abort a victim to keep throughput and avoid global stalls.',
  },
  {
    context: 'Operating system kernels',
    detail:
      'Lock ordering and detection help debug and prevent kernel-level deadlocks during development.',
  },
  {
    context: 'Distributed systems',
    detail:
      'Leases and timeouts serve as detection signals where global graphs are expensive to maintain.',
  },
  {
    context: 'Concurrency testing tools',
    detail:
      'Detectors instrument locks to find cycles, aiding in debugging complex multithreaded code.',
  },
]

const examples = [
  {
    title: 'Wait-for graph cycle',
    code: `P1 waits for lock held by P2
P2 waits for lock held by P3
P3 waits for lock held by P1

Cycle: P1 -> P2 -> P3 -> P1`,
    explanation:
      'A cycle in the wait-for graph directly implies deadlock when each resource has a single instance.',
  },
  {
    title: 'Matrix detection sketch',
    code: `Available = [1, 0]
Allocation = [
  [1, 0],
  [0, 1],
]
Request = [
  [0, 1],
  [1, 0],
]

No process can satisfy Request <= Available
=> both processes are deadlocked`,
    explanation:
      'Neither process can complete with current Available, so both are considered deadlocked.',
  },
  {
    title: 'Victim selection policy',
    code: `score = (work_done / estimated_total) - priority_penalty
kill the process with lowest score`,
    explanation:
      'Victim selection can minimize wasted work by preferring processes with less progress or lower priority.',
  },
]

const pitfalls = [
  'Assuming cycles always mean deadlock in multi-instance systems. They do not.',
  'Ignoring the cost of recovery; aborting the wrong process can be more expensive than waiting.',
  'Running detection too rarely, allowing deadlocks to stall throughput for long periods.',
  'Poor instrumentation that misses dependencies (e.g., user-level locks).',
  'Skipping recheck after recovery, leaving residual deadlocks unresolved.',
]

const decisionGuidance = [
  'Use detection when maximum resource needs are unknown or too dynamic for avoidance.',
  'Prefer wait-for graphs for single-instance resources and locks.',
  'Use matrix-based detection for multi-instance resources and generalized resource types.',
  'Pair detection with clear recovery policies to prevent repeated stalls.',
  'Use timeouts as a lightweight signal when full detection is too costly.',
]

const advancedInsights = [
  {
    title: 'Deadlock vs starvation',
    detail:
      'Deadlock is a cycle with no progress; starvation is a process that waits indefinitely while others proceed. Detection does not prevent starvation.',
  },
  {
    title: 'Partial detection',
    detail:
      'Some systems detect only among high-risk locks or hot paths, reducing overhead while still catching common deadlocks.',
  },
  {
    title: 'Distributed deadlock detection',
    detail:
      'Global detection requires cross-node graphs or probes, which can be expensive and inconsistent. Many systems rely on timeouts.',
  },
  {
    title: 'Victim fairness',
    detail:
      'Always killing the same process type causes unfairness. Rotate victims or include age to avoid repeated losses.',
  },
]

const takeaways = [
  'Deadlock detection accepts that deadlocks happen and focuses on finding and resolving them fast.',
  'Wait-for graphs work well for single-instance resources; matrix checks handle multi-instance cases.',
  'Recovery policy is as important as detection because it determines how much work is lost.',
  'Frequency and scope of detection shape system overhead and responsiveness.',
]

export default function DeadlockDetectionPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Deadlock Detection</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Detect deadlocks after they occur and recover with minimal disruption</div>
              <p className="win95-text">
                Deadlock detection allows systems to allocate resources freely, then periodically check if processes are stuck in
                circular waits. If a deadlock is found, the system recovers by aborting or rolling back one or more processes to
                release resources. This approach trades prevention for flexibility and throughput.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Deadlock detection differs from avoidance: the system lets requests proceed without full safety checks, then uses
                graph or matrix analysis to find deadlocks. This keeps resource utilization high, but requires a reliable recovery
                strategy to break cycles when they appear.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: core data structures</legend>
            <div className="win95-grid win95-grid-3">
              {coreStructures.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm flow</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Detection finds who is stuck; recovery decides who to sacrifice. The two must work together to keep the system healthy.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
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
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

