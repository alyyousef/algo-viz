import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-mental', label: 'Mental Models' },
    { id: 'bp-goal', label: 'System Goal and Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-system', label: 'System Model' },
    { id: 'core-graphs', label: 'Graph Models' },
    { id: 'core-data', label: 'Core Data Structures' },
    { id: 'core-workflow', label: 'Detection Workflow' },
    { id: 'core-algorithms', label: 'Detection Algorithms' },
    { id: 'core-matrix', label: 'Matrix Detection Steps' },
    { id: 'core-correctness', label: 'Correctness Notes' },
    { id: 'core-recovery', label: 'Recovery Strategies' },
    { id: 'core-victims', label: 'Victim Selection' },
    { id: 'core-policy', label: 'Detection Policy' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-tradeoffs', label: 'Trade-offs' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-realworld', label: 'Real-World Uses' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-evaluation', label: 'Evaluation Checklist' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const ddHelpStyles = `
.dd-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.dd-help-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.dd-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.dd-help-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.dd-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.dd-help-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  font-family: inherit;
  cursor: pointer;
}

.dd-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.dd-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
}

.dd-help-tab.is-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.dd-help-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.dd-help-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.dd-help-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.dd-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dd-help-toc-list li {
  margin: 0 0 8px;
}

.dd-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.dd-help-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.dd-help-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.dd-help-section {
  margin: 0 0 20px;
}

.dd-help-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.dd-help-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.dd-help-content p,
.dd-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.dd-help-content p {
  margin: 0 0 10px;
}

.dd-help-content ul,
.dd-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.dd-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.dd-help-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
  overflow-x: auto;
}

.dd-help-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .dd-help-main {
    grid-template-columns: 1fr;
  }

  .dd-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .dd-help-title {
    position: static;
    transform: none;
    margin-right: 8px;
    font-size: 13px;
  }
}
`

export default function DeadlockDetectionPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Deadlock Detection (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Deadlock Detection',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="dd-help-page">
      <style>{ddHelpStyles}</style>
      <div className="dd-help-window" role="presentation">
        <header className="dd-help-titlebar">
          <span className="dd-help-title">Deadlock Detection</span>
          <div className="dd-help-title-controls">
            <button className="dd-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="dd-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="dd-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`dd-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="dd-help-main">
          <aside className="dd-help-toc" aria-label="Table of contents">
            <h2 className="dd-help-toc-title">Contents</h2>
            <ul className="dd-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="dd-help-content">
            <h1 className="dd-help-doc-title">Deadlock Detection</h1>
            <p>
              Deadlock detection lets the system allocate resources freely, then periodically checks for circular waits. When a
              deadlock is found, the system chooses a recovery action such as abort, rollback, or preemption to release resources
              and restore progress. This approach trades prevention for higher utilization and flexibility.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="dd-help-section">
                  <h2 className="dd-help-heading">Overview</h2>
                  {overviewTiles.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="dd-help-divider" />

                <section id="bp-history" className="dd-help-section">
                  <h2 className="dd-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="bp-mental" className="dd-help-section">
                  <h2 className="dd-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="bp-goal" className="dd-help-section">
                  <h2 className="dd-help-heading">System Goal and Takeaways</h2>
                  <p>
                    <strong>Goal:</strong> Identify deadlocked sets and free resources with minimal disruption.
                  </p>
                  <ul>
                    {keyTakeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-system" className="dd-help-section">
                  <h2 className="dd-help-heading">System Model</h2>
                  {systemModel.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-graphs" className="dd-help-section">
                  <h2 className="dd-help-heading">Graph Models</h2>
                  {graphModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-data" className="dd-help-section">
                  <h2 className="dd-help-heading">Core Data Structures</h2>
                  {dataStructures.map((block) => (
                    <div key={block.heading}>
                      <h3 className="dd-help-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-workflow" className="dd-help-section">
                  <h2 className="dd-help-heading">Detection Workflow</h2>
                  {detectionWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-algorithms" className="dd-help-section">
                  <h2 className="dd-help-heading">Detection Algorithms</h2>
                  {algorithms.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-matrix" className="dd-help-section">
                  <h2 className="dd-help-heading">Matrix-Based Detection Steps</h2>
                  <ol>
                    {matrixDetectionSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-correctness" className="dd-help-section">
                  <h2 className="dd-help-heading">Correctness Notes</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-recovery" className="dd-help-section">
                  <h2 className="dd-help-heading">Recovery Strategies</h2>
                  {recoveryStrategies.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-victims" className="dd-help-section">
                  <h2 className="dd-help-heading">Victim Selection Criteria</h2>
                  {victimSelection.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-policy" className="dd-help-section">
                  <h2 className="dd-help-heading">Detection Policy</h2>
                  {detectionPolicy.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-implementation" className="dd-help-section">
                  <h2 className="dd-help-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-tradeoffs" className="dd-help-section">
                  <h2 className="dd-help-heading">Trade-offs</h2>
                  {tradeoffs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-compare" className="dd-help-section">
                  <h2 className="dd-help-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-realworld" className="dd-help-section">
                  <h2 className="dd-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="dd-help-section">
                  <h2 className="dd-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="core-evaluation" className="dd-help-section">
                  <h2 className="dd-help-heading">How to Evaluate a Detector</h2>
                  {evaluationChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="dd-help-section">
                <h2 className="dd-help-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="dd-help-subheading">{example.title}</h3>
                    <div className="dd-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="dd-help-section">
                <h2 className="dd-help-heading">Glossary</h2>
                {quickGlossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
