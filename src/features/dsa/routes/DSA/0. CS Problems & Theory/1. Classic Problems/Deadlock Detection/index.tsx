import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Deadlock detection identifies cycles of waiting processes and determines which resources are involved.',
    notes: 'Unlike avoidance, it allows deadlocks to occur and then detects them.',
  },
  {
    title: 'Why it matters',
    details:
      'Deadlocks can freeze systems. Detection lets you recover instead of over-constraining allocation.',
    notes: 'Many real systems favor detection + recovery over conservative avoidance.',
  },
  {
    title: 'What it teaches',
    details: 'Graph modeling of waits, cycles, and resource ownership.',
    notes: 'It distinguishes deadlock detection from prevention and avoidance.',
  },
]

const quickGlossary = [
  {
    term: 'Wait-for edge',
    definition: 'A directed edge P1 -> P2 meaning P1 is blocked waiting for a resource held by P2.',
  },
  {
    term: 'Deadlock set',
    definition: 'The set of processes involved in a deadlock cycle.',
  },
  {
    term: 'Victim',
    definition: 'A process chosen to terminate or roll back to break the deadlock.',
  },
  {
    term: 'Detection interval',
    definition: 'How often the system runs the detection algorithm (periodic or on-demand).',
  },
]

const history = [
  {
    title: '1970s: Formal models',
    details:
      'Resource allocation graphs and wait-for graphs became standard ways to model deadlock.',
    notes: 'Detection algorithms were adapted from graph cycle detection and safety tests.',
  },
  {
    title: 'Modern systems',
    details: 'Databases and distributed systems often include deadlock detectors.',
    notes: 'Detection enables higher concurrency with periodic cleanup of unsafe states.',
  },
]

const coreConcepts = [
  {
    title: 'Resource allocation graph',
    detail:
      'A bipartite graph with process nodes and resource nodes; edges represent requests and allocations.',
  },
  {
    title: 'Wait-for graph',
    detail:
      'A simplified graph with only processes; an edge P1 -> P2 means P1 waits for a resource held by P2.',
  },
  {
    title: 'Cycle detection',
    detail: 'In single-instance resources, any cycle in a wait-for graph indicates deadlock.',
  },
  {
    title: 'Multiple-instance resources',
    detail:
      "Cycles are not sufficient; you need a detection algorithm similar to Banker's safety test.",
  },
  {
    title: 'Single vs multiple instances',
    detail:
      'For single-instance resources, cycle detection is exact. For multiple instances, it is only a hint.',
  },
]

const resourceGraphs = [
  {
    title: 'Resource allocation graph (RAG)',
    detail:
      'Processes (circles) and resources (squares). P -> R is a request, R -> P is an assignment.',
  },
  {
    title: 'Wait-for graph (WFG)',
    detail: 'Only processes as nodes. Edge P1 -> P2 if P1 is waiting for a resource held by P2.',
  },
  {
    title: 'Graph construction',
    detail:
      'Collapse resource nodes with single instances. For multiple instances, use matrix methods instead.',
  },
]

const howToThink = [
  {
    title: 'Deadlock = circular wait',
    detail: 'If each process holds at least one resource and waits for another, a cycle can form.',
  },
  {
    title: 'Detect, then recover',
    detail: 'Detection is only half the story. You must decide how to break the deadlock.',
  },
  {
    title: 'Trade-off with avoidance',
    detail: 'Detection allows more concurrency but accepts that some work may be rolled back.',
  },
  {
    title: 'Detect late, recover fast',
    detail: 'Detection is only valuable if recovery can restore progress quickly.',
  },
]

const algorithms = [
  {
    title: 'Wait-for graph cycle detection',
    detail: 'Convert resource allocation graph to a wait-for graph and look for cycles.',
  },
  {
    title: 'Matrix-based detection (multi-instance)',
    detail: 'Use Allocation, Request, and Available matrices to find if processes can finish.',
  },
  {
    title: 'Distributed detection',
    detail:
      'In distributed systems, detection uses message passing (e.g., edge-chasing algorithms).',
  },
]

const detectionWorkflow = [
  {
    title: 'Build the model',
    detail: 'Gather Allocation and Request data (or build a wait-for graph).',
  },
  {
    title: 'Run detection',
    detail:
      'Apply cycle detection for single-instance or the matrix algorithm for multiple-instance resources.',
  },
  {
    title: 'Identify victims',
    detail: 'Select processes to terminate or roll back based on cost, priority, or age.',
  },
  {
    title: 'Recover and resume',
    detail: 'Preempt resources or abort processes, then resume the remaining processes.',
  },
]

const detectionSteps = [
  'Let Work = Available, Finish[i] = false for each process.',
  'Find an i where Request[i] <= Work.',
  'If none exists, processes with Finish[i] = false are deadlocked.',
  'If found, Work += Allocation[i], Finish[i] = true, repeat.',
]

const correctnessNotes = [
  {
    title: 'Soundness (single-instance)',
    detail: 'A cycle in a wait-for graph is both necessary and sufficient for deadlock.',
  },
  {
    title: 'Soundness (multiple-instance)',
    detail:
      'Matrix detection finds a subset of processes that cannot finish given current resources.',
  },
  {
    title: 'False positives',
    detail: 'Cycle detection can over-report deadlock when resources have multiple instances.',
  },
]

const recoveryStrategies = [
  {
    title: 'Process termination',
    detail: 'Abort one or more processes to break the cycle. Choose victims by cost or priority.',
  },
  {
    title: 'Resource preemption',
    detail: 'Temporarily take resources from a process and roll it back to a safe point.',
  },
  {
    title: 'Rollback and retry',
    detail: 'Common in databases: kill a transaction and let it restart.',
  },
  {
    title: 'Manual intervention',
    detail: 'Some systems require operators to choose which job to kill.',
  },
]

const victimSelection = [
  {
    title: 'Minimize rollback cost',
    detail: 'Choose the process with least work done or cheapest recovery.',
  },
  {
    title: 'Priority-aware',
    detail: 'Prefer to kill low-priority or batch jobs rather than interactive tasks.',
  },
  {
    title: 'Age and fairness',
    detail: 'Avoid always killing the same process; rotate victims or use aging.',
  },
]

const detectionPolicy = [
  {
    title: 'Periodic detection',
    detail: 'Run every N seconds or on a schedule to control overhead.',
  },
  {
    title: 'On-demand detection',
    detail: 'Trigger when a request blocks too long or a timeout fires.',
  },
  {
    title: 'Hybrid strategy',
    detail: 'Run a lightweight check on demand and a full detection periodically.',
  },
]

const comparisons = [
  {
    title: 'Detection vs avoidance',
    detail:
      'Avoidance blocks unsafe requests up front; detection allows deadlock and resolves it later.',
  },
  {
    title: 'Detection vs prevention',
    detail: 'Prevention forbids one of the deadlock conditions entirely; detection accepts risk.',
  },
  {
    title: 'Detection vs timeouts',
    detail:
      'Timeouts are heuristic detection. They are simpler but can kill slow yet correct processes.',
  },
]

const tradeoffs = [
  {
    title: 'Concurrency vs overhead',
    detail: 'Detection allows more concurrency but costs CPU to analyze graphs or matrices.',
  },
  {
    title: 'False positives vs delays',
    detail:
      'Conservative detection may kill processes unnecessarily; lax detection may delay recovery.',
  },
  {
    title: 'Recovery cost',
    detail: 'Terminating or rolling back processes can be expensive and disruptive.',
  },
]

const pitfalls = [
  {
    mistake: 'Assuming a cycle always means deadlock',
    description: 'In multiple-instance resources, cycles can exist without deadlock.',
  },
  {
    mistake: 'Ignoring recovery cost',
    description:
      'Detection without a clear recovery strategy is useless. Recovery can be expensive.',
  },
  {
    mistake: 'Running detection too often',
    description: 'Frequent detection adds overhead. Many systems run it periodically.',
  },
]

const realWorldPatterns = [
  {
    title: 'Two-phase locking (DBs)',
    detail:
      'Deadlocks are expected; detectors identify cycles in lock waits and abort a transaction.',
  },
  {
    title: 'Kernel lock debugging',
    detail: 'Some kernels build lock graphs to detect cycles for diagnostics.',
  },
  {
    title: 'Distributed detection',
    detail: 'Edge-chasing (probe) algorithms detect global cycles across nodes.',
  },
]

const realWorld = [
  {
    title: 'Databases',
    detail: 'Deadlock detection kills one transaction to allow others to proceed.',
  },
  {
    title: 'Operating systems',
    detail: 'OS kernels may detect lock cycles for debugging or runtime recovery.',
  },
  {
    title: 'Distributed systems',
    detail: 'Global deadlock detection is harder due to message delays and partial visibility.',
  },
]

const workedExample = [
  {
    title: 'Single-instance cycle',
    code: `Resources: A, B, C (single instance each)
P1 holds A, requests B
P2 holds B, requests C
P3 holds C, requests A

Wait-for graph:
P1 -> P2 -> P3 -> P1 (cycle)`,
    explanation: 'This is a deadlock: each process waits for a resource held by the next.',
  },
  {
    title: 'Multiple-instance detection',
    code: `Available = [1, 0]
Allocation:
P0: [1, 0]
P1: [0, 1]
Request:
P0: [0, 1]
P1: [1, 0]

No process can proceed => deadlock set {P0, P1}`,
    explanation: 'Matrix detection shows both processes are stuck given available resources.',
  },
]

const evaluationChecklist = [
  {
    title: 'Detection accuracy',
    detail: 'Does the algorithm correctly identify deadlocked sets for the resource model?',
  },
  {
    title: 'Recovery effectiveness',
    detail: 'Does the chosen recovery strategy actually break the cycle quickly?',
  },
  {
    title: 'Operational overhead',
    detail: 'Is detection frequency tuned to avoid excessive CPU use?',
  },
  {
    title: 'Fairness and stability',
    detail: 'Are the same processes repeatedly killed? Do you prevent starvation?',
  },
]

const examples = [
  {
    title: 'Wait-for cycle',
    code: `P1 -> P2 -> P3 -> P1`,
    explanation: 'In single-instance resources, this cycle indicates deadlock.',
  },
  {
    title: 'Matrix detection sketch',
    code: `Work = Available
Finish = [false ...]
while exists i with Request[i] <= Work:
  Work += Allocation[i]
  Finish[i] = true
Deadlocked = all i where Finish[i] == false`,
    explanation: 'Processes that cannot finish are considered deadlocked.',
  },
]

const keyTakeaways = [
  'Deadlock detection allows more concurrency than avoidance but requires recovery.',
  'Cycles in a wait-for graph mean deadlock only for single-instance resources.',
  'Matrix-based detection generalizes to multiple-instance resources.',
  'Recovery policy is as important as detection accuracy.',
]

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
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-foundations', label: 'Foundations' },
    { id: 'core-graphs', label: 'Graph Models' },
    { id: 'core-thinking', label: 'How To Think About It' },
    { id: 'core-workflow', label: 'Detection Workflow' },
    { id: 'core-algorithms', label: 'Detection Algorithms' },
    { id: 'core-correctness', label: 'Correctness Notes' },
    { id: 'core-recovery', label: 'Recovery Strategies' },
    { id: 'core-policy', label: 'Policy and Trade-offs' },
    { id: 'core-evaluation', label: 'Evaluation Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-steps', label: 'Matrix Detection Steps' },
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-snippets', label: 'Algorithm Sketches' },
    { id: 'ex-real-world', label: 'Real-World Use' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function DeadlockDetectionPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Deadlock Detection',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Deadlock Detection"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Deadlock Detection</h1>
      <p>
        Deadlock detection is the pragmatic alternative to deadlock avoidance. Instead of preventing
        unsafe allocations, the system permits them and periodically checks whether processes are
        stuck in a circular wait. If so, it chooses a recovery strategy to break the deadlock.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {history.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-graphs" className="bin98-section">
            <h2 className="bin98-heading">Graph Models</h2>
            {resourceGraphs.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-thinking" className="bin98-section">
            <h2 className="bin98-heading">How To Think About It</h2>
            {howToThink.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">Detection Workflow</h2>
            {detectionWorkflow.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-algorithms" className="bin98-section">
            <h2 className="bin98-heading">Detection Algorithms</h2>
            {algorithms.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Notes</h2>
            {correctnessNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-recovery" className="bin98-section">
            <h2 className="bin98-heading">Recovery Strategies</h2>
            {recoveryStrategies.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
            <h3 className="bin98-subheading">Victim Selection Criteria</h3>
            {victimSelection.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-policy" className="bin98-section">
            <h2 className="bin98-heading">Policy and Trade-offs</h2>
            <h3 className="bin98-subheading">Detection Policy</h3>
            {detectionPolicy.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <h3 className="bin98-subheading">Compare and Contrast</h3>
            {comparisons.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <h3 className="bin98-subheading">Trade-offs</h3>
            {tradeoffs.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-evaluation" className="bin98-section">
            <h2 className="bin98-heading">How To Evaluate a Detector</h2>
            {evaluationChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((pitfall) => (
                <li key={pitfall.mistake}>
                  <strong>{pitfall.mistake}:</strong> {pitfall.description}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-steps" className="bin98-section">
            <h2 className="bin98-heading">Matrix-Based Detection Steps</h2>
            <ol>
              {detectionSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section id="ex-worked" className="bin98-section">
            <h2 className="bin98-heading">Worked Examples</h2>
            {workedExample.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <pre className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </pre>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-snippets" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Sketches</h2>
            {examples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <pre className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </pre>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-real-world" className="bin98-section">
            <h2 className="bin98-heading">Real-World Use</h2>
            <h3 className="bin98-subheading">Patterns</h3>
            {realWorldPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <h3 className="bin98-subheading">Connections</h3>
            {realWorld.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
