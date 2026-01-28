import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const overviewTiles = [
  {
    title: 'What it is',
    detail:
      'A detection-and-recovery strategy: allow allocations, then periodically check for circular waits and recover if needed.',
  },
  {
    title: 'Why it exists',
    detail:
      'It enables higher concurrency than avoidance by not blocking requests up front.',
  },
  {
    title: 'What it requires',
    detail:
      'Accurate tracking of who holds what and who is waiting for what, plus a recovery policy.',
  },
  {
    title: 'What it guarantees',
    detail:
      'If the detector is sound and recovery succeeds, the system eventually restores progress.',
  },
]

const quickGlossary = [
  {
    term: 'Wait-for edge',
    definition: 'A directed edge P1 -> P2 meaning P1 is blocked waiting for a resource held by P2.',
  },
  {
    term: 'Deadlock set',
    definition: 'The processes that are mutually waiting in a cycle.',
  },
  {
    term: 'Victim',
    definition: 'A process chosen to abort or roll back to break the deadlock.',
  },
  {
    term: 'Detection interval',
    definition: 'How often detection runs (periodic, on-demand, or hybrid).',
  },
  {
    term: 'Recovery cost',
    definition: 'The work lost by aborting or rolling back a process.',
  },
]

const historicalMilestones = [
  {
    title: '1971: Deadlock conditions formalized',
    detail:
      'Coffman et al. describe the necessary conditions for deadlock: mutual exclusion, hold-and-wait, no preemption, circular wait.',
  },
  {
    title: '1970s: Graph models enter OS tooling',
    detail:
      'Resource allocation graphs and wait-for graphs become standard representations for detection.',
  },
  {
    title: '1980s-1990s: Database detectors mature',
    detail:
      'DBMS engines automate detection and victim selection to keep transactions responsive.',
  },
  {
    title: '2000s+: Hybrid strategies',
    detail:
      'Modern systems combine detection, timeouts, and heuristics to keep overhead manageable.',
  },
]

const mentalModels = [
  {
    title: 'Traffic circle with no exits',
    detail:
      'Each car holds a lane and waits for the next. A cycle means nobody moves without intervention.',
  },
  {
    title: 'Dependency graph',
    detail:
      'Edges represent who is blocking whom. A cycle is a deadlock (for single-instance resources).',
  },
  {
    title: 'Detect, then recover',
    detail:
      'Detection only finds the problem. Recovery is what actually restores progress.',
  },
  {
    title: 'Accept risk for throughput',
    detail:
      'Allowing allocations boosts concurrency but risks occasional rollbacks.',
  },
]

const systemModel = [
  {
    title: 'Processes and resources',
    detail: 'There are n processes and m resource types with finite instances.',
  },
  {
    title: 'Requests and allocations',
    detail: 'Each process may hold some instances and request more.',
  },
  {
    title: 'State tracking',
    detail: 'Detection relies on accurate live data from the lock/resource manager.',
  },
  {
    title: 'Goal',
    detail: 'Identify deadlocked sets and free resources with minimal disruption.',
  },
]

const graphModels = [
  {
    title: 'Resource Allocation Graph (RAG)',
    detail: 'Bipartite graph: processes and resources. P -> R is a request; R -> P is an assignment.',
  },
  {
    title: 'Wait-For Graph (WFG)',
    detail: 'Only process nodes. Edge P1 -> P2 means P1 waits for a resource held by P2.',
  },
  {
    title: 'Single-instance case',
    detail: 'A cycle in the WFG is both necessary and sufficient for deadlock.',
  },
  {
    title: 'Multi-instance case',
    detail: 'Cycles are not sufficient; use matrix-based detection to confirm.',
  },
]

const dataStructures = [
  {
    heading: 'Available vector',
    bullets: [
      'Available[j] is the number of free instances of resource type j.',
      'Represents immediately allocatable capacity.',
    ],
  },
  {
    heading: 'Allocation matrix',
    bullets: [
      'Allocation[i][j] is how many instances of resource j process i holds.',
      'Sum of Allocation across processes plus Available equals total resources.',
    ],
  },
  {
    heading: 'Request matrix',
    bullets: [
      'Request[i][j] is how many instances of resource j process i still wants.',
      'Captures outstanding waits at detection time.',
    ],
  },
  {
    heading: 'Work and Finish',
    bullets: [
      'Work is a copy of Available used in detection.',
      'Finish[i] marks whether process i can complete.',
      'Unfinished processes after the loop are considered deadlocked.',
    ],
  },
]

const detectionWorkflow = [
  {
    title: 'Build the model',
    detail: 'Collect lock tables or matrices that show allocations and outstanding requests.',
  },
  {
    title: 'Run detection',
    detail: 'Use cycle detection for single-instance resources or matrix detection for multi-instance resources.',
  },
  {
    title: 'Select victims',
    detail: 'Choose one or more processes to terminate or roll back based on cost and policy.',
  },
  {
    title: 'Recover and resume',
    detail: 'Release resources and re-run detection until no deadlock remains.',
  },
]

const algorithms = [
  {
    title: 'Wait-for graph cycle detection',
    detail: 'Build the WFG and run DFS/Tarjan to find cycles.',
  },
  {
    title: 'Matrix-based detection',
    detail: 'Use Available, Allocation, Request and simulate completion to find stuck processes.',
  },
  {
    title: 'Distributed detection',
    detail: 'Use probe/edge-chasing algorithms or centralized coordinators to detect global cycles.',
  },
]

const matrixDetectionSteps = [
  'Work = Available; Finish[i] = false for all processes.',
  'Find a process i with Request[i] <= Work.',
  'If none exists, all processes with Finish[i] == false are deadlocked.',
  'If found, simulate completion: Work += Allocation[i], Finish[i] = true.',
  'Repeat until no progress is possible.',
]

const correctnessNotes = [
  {
    title: 'Single-instance soundness',
    detail: 'A cycle in the wait-for graph is both necessary and sufficient for deadlock.',
  },
  {
    title: 'Multi-instance soundness',
    detail: 'Matrix detection identifies processes that cannot finish with current Available.',
  },
  {
    title: 'False positives',
    detail: 'Cycle detection alone can over-report deadlock with multiple instances.',
  },
  {
    title: 'Timing sensitivity',
    detail: 'Detection is a snapshot; state can change during the scan.',
  },
]

const recoveryStrategies = [
  {
    title: 'Process termination',
    detail: 'Abort one or more processes to release their resources immediately.',
  },
  {
    title: 'Rollback and retry',
    detail: 'Common in databases: roll back a transaction and let it restart.',
  },
  {
    title: 'Resource preemption',
    detail: 'Temporarily take resources from a process if preemption is safe.',
  },
  {
    title: 'Checkpointing',
    detail: 'Use checkpoints to reduce the work lost during recovery.',
  },
]

const victimSelection = [
  {
    title: 'Minimize lost work',
    detail: 'Choose the process with least progress or cheapest restart.',
  },
  {
    title: 'Priority-aware',
    detail: 'Prefer killing low-priority or batch tasks over interactive work.',
  },
  {
    title: 'Age and fairness',
    detail: 'Avoid repeatedly killing the same process by rotating or aging victims.',
  },
  {
    title: 'Resource footprint',
    detail: 'Killing a process holding many resources may resolve deadlock faster.',
  },
]

const detectionPolicy = [
  {
    title: 'Periodic detection',
    detail: 'Run on a schedule to control overhead.',
  },
  {
    title: 'On-demand detection',
    detail: 'Trigger when a request blocks too long or a timeout fires.',
  },
  {
    title: 'Hybrid strategy',
    detail: 'Use lightweight triggers plus full scans at intervals.',
  },
  {
    title: 'Adaptive tuning',
    detail: 'Increase scan frequency when contention is high.',
  },
]

const implementationNotes = [
  {
    title: 'Accurate instrumentation',
    detail: 'Lock tables must capture both held resources and outstanding waits.',
  },
  {
    title: 'Snapshot consistency',
    detail: 'Use a stable snapshot or lock-free snapshotting to avoid corrupted graphs.',
  },
  {
    title: 'Avoid excessive scans',
    detail: 'Do not scan on every request; batch checks or trigger on stalls.',
  },
  {
    title: 'Log for diagnostics',
    detail: 'Record detected cycles and victims to improve policy over time.',
  },
]

const tradeoffs = [
  {
    title: 'Concurrency vs overhead',
    detail: 'Detection allows more parallelism but consumes CPU for analysis.',
  },
  {
    title: 'Recovery cost',
    detail: 'Abort/rollback wastes work; policy determines how expensive recovery is.',
  },
  {
    title: 'Timeliness vs accuracy',
    detail: 'Frequent scans find deadlocks faster but can be noisy and expensive.',
  },
  {
    title: 'Complexity vs simplicity',
    detail: 'Graph models are simpler; matrix detection is more general but heavier.',
  },
]

const comparisons = [
  {
    title: 'Detection vs avoidance',
    detail: 'Avoidance blocks unsafe requests; detection allows them and recovers later.',
  },
  {
    title: 'Detection vs prevention',
    detail: 'Prevention forbids a deadlock condition outright; detection accepts risk.',
  },
  {
    title: 'Detection vs timeouts',
    detail: 'Timeouts are heuristic detection; they may kill slow but correct processes.',
  },
]

const realWorldUses = [
  {
    context: 'Database systems',
    detail: 'Deadlock detectors abort a victim transaction to keep throughput high.',
  },
  {
    context: 'Operating system kernels',
    detail: 'Lock dependency graphs help detect deadlocks for debugging and recovery.',
  },
  {
    context: 'Distributed systems',
    detail: 'Global detection is hard; systems often rely on timeouts or partial graphs.',
  },
  {
    context: 'Concurrency testing tools',
    detail: 'Instrumentation detects cycles to surface hard-to-reproduce deadlocks.',
  },
]

const examples = [
  {
    title: 'Single-instance wait-for cycle',
    code: `P1 holds A, waits for B
P2 holds B, waits for C
P3 holds C, waits for A

Wait-for cycle: P1 -> P2 -> P3 -> P1`,
    explanation: 'A cycle in the wait-for graph means deadlock when resources are single-instance.',
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
=> deadlocked set = {P0, P1}`,
    explanation: 'Neither process can finish with current Available, so both are considered deadlocked.',
  },
  {
    title: 'Victim selection heuristic',
    code: `score = (work_done / estimated_total) - priority_penalty
kill process with lowest score`,
    explanation: 'Heuristics aim to minimize lost work while respecting priority.',
  },
]

const pitfalls = [
  {
    mistake: 'Assuming cycles always mean deadlock',
    description: 'In multi-instance systems, cycles can exist without deadlock.',
  },
  {
    mistake: 'Ignoring recovery policy',
    description: 'Detection without a clear recovery plan does not restore progress.',
  },
  {
    mistake: 'Over-scanning',
    description: 'Running detection too frequently can cost more than it saves.',
  },
  {
    mistake: 'Under-instrumenting',
    description: 'Missing dependencies leads to false negatives and hidden deadlocks.',
  },
]

const evaluationChecklist = [
  {
    title: 'Detection accuracy',
    detail: 'Does the algorithm identify deadlocked sets for the resource model?',
  },
  {
    title: 'Recovery effectiveness',
    detail: 'Does the recovery policy reliably break deadlocks quickly?',
  },
  {
    title: 'Overhead budget',
    detail: 'Is detection frequency tuned to avoid excessive CPU usage?',
  },
  {
    title: 'Fairness',
    detail: 'Are the same processes repeatedly killed? Is starvation avoided?',
  },
]

const keyTakeaways = [
  'Deadlock detection allows more concurrency than avoidance but requires recovery.',
  'Wait-for cycles are definitive only for single-instance resources.',
  'Matrix-based detection generalizes to multiple-instance resources.',
  'Recovery policy is as important as detection accuracy.',
  'Detection frequency controls the tradeoff between overhead and responsiveness.',
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
                Deadlock detection lets the system allocate resources freely, then periodically checks for circular waits. When a
                deadlock is found, the system chooses a recovery action (abort, rollback, or preempt) to release resources and
                restore progress. This approach trades prevention for higher utilization and flexibility.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-2">
              {overviewTiles.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {quickGlossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical Context</legend>
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
            <legend>Mental Models</legend>
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
            <legend>System Model</legend>
            <div className="win95-grid win95-grid-2">
              {systemModel.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Graph Models</legend>
            <div className="win95-grid win95-grid-2">
              {graphModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core Data Structures</legend>
            <div className="win95-grid win95-grid-2">
              {dataStructures.map((block) => (
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
            <legend>Detection Workflow</legend>
            <div className="win95-grid win95-grid-2">
              {detectionWorkflow.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Detection Algorithms</legend>
            <div className="win95-grid win95-grid-2">
              {algorithms.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Matrix-Based Detection Steps</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {matrixDetectionSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness Notes</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Recovery Strategies</legend>
            <div className="win95-grid win95-grid-2">
              {recoveryStrategies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Victim Selection Criteria</legend>
            <div className="win95-grid win95-grid-2">
              {victimSelection.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Detection Policy</legend>
            <div className="win95-grid win95-grid-2">
              {detectionPolicy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation Notes</legend>
            <div className="win95-grid win95-grid-2">
              {implementationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Trade-offs</legend>
            <div className="win95-grid win95-grid-2">
              {tradeoffs.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and Contrast</legend>
            <div className="win95-grid win95-grid-2">
              {comparisons.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-World Applications</legend>
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
            <legend>Practical Examples</legend>
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
            <legend>Common Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How to Evaluate a Detector</legend>
            <div className="win95-grid win95-grid-2">
              {evaluationChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((takeaway) => (
                <div key={takeaway} className="win95-panel">
                  <p className="win95-text">{takeaway}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
