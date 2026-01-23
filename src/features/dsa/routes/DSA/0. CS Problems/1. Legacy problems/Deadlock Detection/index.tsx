import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'What it is',
    details:
      'Deadlock detection identifies cycles of waiting processes and determines which resources are involved.',
    notes:
      'Unlike avoidance, it allows deadlocks to occur and then detects them.',
  },
  {
    title: 'Why it matters',
    details:
      'Deadlocks can freeze systems. Detection lets you recover instead of over-constraining allocation.',
    notes:
      'Many real systems favor detection + recovery over conservative avoidance.',
  },
  {
    title: 'What it teaches',
    details:
      'Graph modeling of waits, cycles, and resource ownership.',
    notes:
      'It distinguishes deadlock detection from prevention and avoidance.',
  },
]

const history = [
  {
    title: '1970s: Formal models',
    details:
      'Resource allocation graphs and wait-for graphs became standard ways to model deadlock.',
    notes:
      'Detection algorithms were adapted from graph cycle detection and safety tests.',
  },
  {
    title: 'Modern systems',
    details:
      'Databases and distributed systems often include deadlock detectors.',
    notes:
      'Detection enables higher concurrency with periodic cleanup of unsafe states.',
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
    detail:
      'In single-instance resources, any cycle in a wait-for graph indicates deadlock.',
  },
  {
    title: 'Multiple-instance resources',
    detail:
      'Cycles are not sufficient; you need a detection algorithm similar to Banker’s safety test.',
  },
]

const howToThink = [
  {
    title: 'Deadlock = circular wait',
    detail:
      'If each process holds at least one resource and waits for another, a cycle can form.',
  },
  {
    title: 'Detect, then recover',
    detail:
      'Detection is only half the story. You must decide how to break the deadlock.',
  },
  {
    title: 'Trade-off with avoidance',
    detail:
      'Detection allows more concurrency but accepts that some work may be rolled back.',
  },
]

const algorithms = [
  {
    title: 'Wait-for graph cycle detection',
    detail:
      'Convert resource allocation graph to a wait-for graph and look for cycles.',
  },
  {
    title: 'Matrix-based detection (multi-instance)',
    detail:
      'Use Allocation, Request, and Available matrices to find if processes can finish.',
  },
  {
    title: 'Distributed detection',
    detail:
      'In distributed systems, detection uses message passing (e.g., edge-chasing algorithms).',
  },
]

const detectionSteps = [
  'Let Work = Available, Finish[i] = false for each process.',
  'Find an i where Request[i] <= Work.',
  'If none exists, processes with Finish[i] = false are deadlocked.',
  'If found, Work += Allocation[i], Finish[i] = true, repeat.',
]

const recoveryStrategies = [
  {
    title: 'Process termination',
    detail:
      'Abort one or more processes to break the cycle. Choose victims by cost or priority.',
  },
  {
    title: 'Resource preemption',
    detail:
      'Temporarily take resources from a process and roll it back to a safe point.',
  },
  {
    title: 'Rollback and retry',
    detail:
      'Common in databases: kill a transaction and let it restart.',
  },
  {
    title: 'Manual intervention',
    detail:
      'Some systems require operators to choose which job to kill.',
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
    detail:
      'Prevention forbids one of the deadlock conditions entirely; detection accepts risk.',
  },
  {
    title: 'Detection vs timeouts',
    detail:
      'Timeouts are heuristic detection. They are simpler but can kill slow yet correct processes.',
  },
]

const pitfalls = [
  {
    mistake: 'Assuming a cycle always means deadlock',
    description:
      'In multiple-instance resources, cycles can exist without deadlock.',
  },
  {
    mistake: 'Ignoring recovery cost',
    description:
      'Detection without a clear recovery strategy is useless. Recovery can be expensive.',
  },
  {
    mistake: 'Running detection too often',
    description:
      'Frequent detection adds overhead. Many systems run it periodically.',
  },
]

const realWorld = [
  {
    title: 'Databases',
    detail:
      'Deadlock detection kills one transaction to allow others to proceed.',
  },
  {
    title: 'Operating systems',
    detail:
      'OS kernels may detect lock cycles for debugging or runtime recovery.',
  },
  {
    title: 'Distributed systems',
    detail:
      'Global deadlock detection is harder due to message delays and partial visibility.',
  },
]

const examples = [
  {
    title: 'Wait-for cycle',
    code: `P1 -> P2 -> P3 -> P1`,
    explanation:
      'In single-instance resources, this cycle indicates deadlock.',
  },
  {
    title: 'Matrix detection sketch',
    code: `Work = Available
Finish = [false ...]
while exists i with Request[i] <= Work:
  Work += Allocation[i]
  Finish[i] = true
Deadlocked = all i where Finish[i] == false`,
    explanation:
      'Processes that cannot finish are considered deadlocked.',
  },
]

const keyTakeaways = [
  'Deadlock detection allows more concurrency than avoidance but requires recovery.',
  'Cycles in a wait-for graph mean deadlock only for single-instance resources.',
  'Matrix-based detection generalizes to multiple-instance resources.',
  'Recovery policy is as important as detection accuracy.',
]

export default function DeadlockDetectionPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Deadlock Detection</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Finding and resolving circular wait conditions</div>
              <p className="win95-text">
                Deadlock detection is the pragmatic alternative to deadlock avoidance. Instead of preventing
                unsafe allocations, the system permits them and periodically checks whether processes are
                stuck in a circular wait. If so, it chooses a recovery strategy to break the deadlock.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical Context</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core Concepts</legend>
            <div className="win95-grid win95-grid-2">
              {coreConcepts.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How to Think About It</legend>
            <div className="win95-grid win95-grid-2">
              {howToThink.map((item) => (
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
                {detectionSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
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
            <legend>Real-World Connections</legend>
            <div className="win95-grid win95-grid-3">
              {realWorld.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
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
