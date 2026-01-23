import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'What it is',
    details:
      'A deadlock-avoidance algorithm that decides whether granting a resource request keeps the system in a safe state.',
    notes:
      'It simulates future allocations and only approves requests that preserve a safe sequence.',
  },
  {
    title: 'Why it exists',
    details:
      'To prevent deadlock proactively, rather than detecting and recovering after the fact.',
    notes:
      'It trades throughput for safety by sometimes rejecting or delaying requests.',
  },
  {
    title: 'What it teaches',
    details:
      'Safety vs liveness, conservative resource allocation, and the difference between deadlock avoidance and deadlock prevention.',
    notes:
      'It formalizes the idea of “can everyone still finish?” before granting resources.',
  },
]

const quickGlossary = [
  {
    term: 'Safe sequence',
    definition:
      'An ordering of processes where each can finish with the resources available at its turn.',
  },
  {
    term: 'Safe state',
    definition:
      'A state that has at least one safe sequence.',
  },
  {
    term: 'Unsafe state',
    definition:
      'A state with no safe sequence; it is not necessarily deadlocked but can lead to deadlock.',
  },
  {
    term: 'Deadlock avoidance',
    definition:
      'A strategy that checks requests and only grants them if the system stays safe.',
  },
  {
    term: 'Max claim',
    definition:
      'The maximum number of instances of each resource a process may request during its lifetime.',
  },
]

const history = [
  {
    title: '1965: Proposed by Edsger Dijkstra',
    details:
      'Dijkstra introduced the algorithm as part of his work on resource allocation and deadlock avoidance.',
    notes:
      'The metaphor is a banker deciding whether to grant loans without risking bankruptcy.',
  },
  {
    title: '1970s: OS research adoption',
    details:
      'The algorithm became a staple in operating systems curricula and early resource managers.',
    notes:
      'It is more often used for teaching than for production due to its overhead.',
  },
]

const coreConcepts = [
  {
    title: 'Resources',
    detail:
      'Multiple resource types exist (e.g., CPU, memory, I/O). Each type has a finite number of instances.',
  },
  {
    title: 'Processes',
    detail:
      'Each process declares its maximum claim for each resource type up front.',
  },
  {
    title: 'State',
    detail:
      'A system state is defined by Allocation, Max, Need, and Available matrices/vectors.',
  },
  {
    title: 'Safe state',
    detail:
      'A state is safe if there exists some order of processes that can finish with the available resources.',
  },
  {
    title: 'Unsafe state',
    detail:
      'A state is unsafe if no such order exists. Unsafe does not mean deadlocked, but it could lead to deadlock.',
  },
  {
    title: 'Safety vs progress',
    detail:
      'Banker’s can delay requests even when the system is not deadlocked, prioritizing safety over immediate progress.',
  },
]

const dataModel = [
  {
    title: 'Allocation',
    detail:
      'Allocation[i][j] = number of instances of resource j currently allocated to process i.',
  },
  {
    title: 'Max',
    detail:
      'Max[i][j] = maximum demand of process i for resource j.',
  },
  {
    title: 'Need',
    detail:
      'Need[i][j] = Max[i][j] - Allocation[i][j]. This is the remaining claim.',
  },
  {
    title: 'Available',
    detail:
      'Available[j] = number of instances of resource j currently free.',
  },
]

const invariants = [
  {
    title: 'Need is never negative',
    detail:
      'Need = Max - Allocation must remain non-negative for every process and resource.',
  },
  {
    title: 'Resources conserved',
    detail:
      'Sum of Allocation across processes plus Available equals total resources for each type.',
  },
  {
    title: 'Requests never exceed Need',
    detail:
      'If a process requests more than its Need, it has violated its declared Max claim.',
  },
]

const howToThink = [
  {
    title: 'Safety is a promise',
    detail:
      'Before granting a request, imagine the future. If you can still finish everyone in some order, it is safe.',
  },
  {
    title: 'Avoidance vs prevention',
    detail:
      'Banker’s avoids deadlock by checking safety. Prevention forbids one of the deadlock conditions entirely.',
  },
  {
    title: 'Requests are provisional',
    detail:
      'Treat every request as a “what-if.” Temporarily grant it, test safety, then keep or roll back.',
  },
  {
    title: 'It is conservative by design',
    detail:
      'The algorithm may delay requests that would actually be fine in practice, favoring safety over utilization.',
  },
  {
    title: 'Think in constraints',
    detail:
      'The safe sequence is a proof that constraints are satisfiable; no proof, no allocation.',
  },
]

const decisionWorkflow = [
  {
    title: 'Validate the request',
    detail:
      'Check Request <= Need and Request <= Available. If either fails, deny or defer immediately.',
  },
  {
    title: 'Simulate allocation',
    detail:
      'Pretend the request is granted and compute new Available, Allocation, and Need.',
  },
  {
    title: 'Run safety test',
    detail:
      'Find a safe sequence. If it exists, commit the allocation; otherwise roll back.',
  },
  {
    title: 'Communicate outcome',
    detail:
      'Grant, deny, or wait depending on safety; keep the system in a safe state.',
  },
]

const safetyAlgorithm = [
  'Let Work = Available, Finish[i] = false for all processes.',
  'Find an i such that Finish[i] == false and Need[i] <= Work.',
  'If no such i exists, stop. If all Finish[i] == true, the state is safe.',
  'If found, simulate its completion: Work += Allocation[i], Finish[i] = true, repeat.',
]

const requestAlgorithm = [
  'If Request[i] > Need[i], reject (process exceeded declared maximum).',
  'If Request[i] > Available, delay (not enough resources).',
  'Temporarily allocate: Available -= Request, Allocation += Request, Need -= Request.',
  'Run the safety algorithm. If safe, keep allocation; otherwise roll back.',
]

const correctnessNotes = [
  {
    title: 'Soundness',
    detail:
      'If the algorithm approves a request, the system remains safe because a safe sequence is constructed.',
  },
  {
    title: 'Conservativeness',
    detail:
      'The algorithm may reject some requests even if they might not lead to deadlock in practice.',
  },
  {
    title: 'Safety vs liveness',
    detail:
      'Safety is guaranteed if used correctly, but it does not guarantee fairness or prevent starvation.',
  },
]

const complexityNotes = [
  {
    title: 'Safety test cost',
    detail:
      'O(P^2 * R) in the worst case, where P is processes and R is resource types.',
  },
  {
    title: 'Request handling',
    detail:
      'Every request triggers a safety check, which can become expensive in high-throughput systems.',
  },
  {
    title: 'Memory',
    detail:
      'Requires matrices of size P x R and several vectors; memory is modest but not trivial.',
  },
]

const implementationTips = [
  {
    title: 'Use integer vectors',
    detail:
      'Allocation, Max, Need, and Available should be small integer arrays for fast comparisons.',
  },
  {
    title: 'Fast Need <= Work checks',
    detail:
      'Compare arrays element-wise; short-circuit early when a resource is insufficient.',
  },
  {
    title: 'Track Finish efficiently',
    detail:
      'A boolean array per process plus a loop over processes is sufficient for the safety check.',
  },
  {
    title: 'Avoid expensive copies',
    detail:
      'Simulate allocation by copying only the vectors you need or by rolling back changes in place.',
  },
]

const pitfalls = [
  {
    mistake: 'Not enforcing Max claims',
    description:
      'If processes can request more than their Max, the algorithm is invalid and safety guarantees disappear.',
  },
  {
    mistake: 'Conflating unsafe with deadlocked',
    description:
      'Unsafe states can still proceed successfully; they are simply risky.',
  },
  {
    mistake: 'Ignoring resource types',
    description:
      'The algorithm depends on distinct resource categories. Collapsing into one type changes behavior.',
  },
  {
    mistake: 'High overhead in real systems',
    description:
      'Frequent safety checks can cause performance problems if used naively in production.',
  },
]

const variants = [
  {
    title: 'Single-resource Banker’s',
    detail:
      'Simplified version used for teaching. It reduces the matrix to vectors and makes safety checks easy to visualize.',
  },
  {
    title: 'Priority-aware Banker’s',
    detail:
      'Adds priorities; can still be safe but may bias allocations toward critical processes.',
  },
  {
    title: 'Deadline-aware scheduling',
    detail:
      'In real-time systems, safety checks may incorporate deadlines or timing constraints.',
  },
]

const comparisons = [
  {
    title: "Banker's vs deadlock detection",
    detail:
      'Banker’s avoids unsafe states proactively. Detection allows deadlock and then recovers (e.g., kill processes).',
  },
  {
    title: 'Banker’s vs prevention',
    detail:
      'Prevention forbids a condition like hold-and-wait. Banker’s allows it but only when safe.',
  },
  {
    title: 'Banker’s vs optimistic allocation',
    detail:
      'Optimistic allocation grants requests immediately and handles failure later. Banker’s is conservative.',
  },
  {
    title: 'Banker’s vs lock ordering',
    detail:
      'Lock ordering is a simple prevention strategy for specific resources; Banker’s is general but heavier.',
  },
]

const workedThrough = [
  {
    title: 'Safe sequence example',
    code: `Available = [3, 3, 2]
Need:
P0: [7, 4, 3]
P1: [1, 2, 2]
P2: [6, 0, 0]

Step 1: Work=[3,3,2], P1 fits => finish P1
Work = Work + Allocation[P1] = [3,3,2] + [2,0,0] = [5,3,2]

Step 2: P2 fits => finish P2
Work = [5,3,2] + [3,0,2] = [8,3,4]

Step 3: P0 fits => finish P0
Safe sequence: P1 -> P2 -> P0`,
    explanation:
      'Because a full completion order exists, the state is safe.',
  },
]

const realWorld = [
  {
    title: 'Operating systems',
    detail:
      'Used as a teaching model for safe resource allocation. Real OSes often prefer simpler strategies or detection.',
  },
  {
    title: 'Databases',
    detail:
      'Transaction managers sometimes use simplified safety checks or timeouts rather than full Banker’s logic.',
  },
  {
    title: 'Cloud schedulers',
    detail:
      'Some schedulers use similar “can we still satisfy all commitments?” checks for resource reservations.',
  },
]

const exampleMatrices = [
  {
    title: 'Mini example (3 processes, 3 resources)',
    code: `Available: [3, 3, 2]

Allocation:
P0: [0, 1, 0]
P1: [2, 0, 0]
P2: [3, 0, 2]

Max:
P0: [7, 5, 3]
P1: [3, 2, 2]
P2: [9, 0, 2]

Need = Max - Allocation:
P0: [7, 4, 3]
P1: [1, 2, 2]
P2: [6, 0, 0]`,
    explanation:
      'A safety check would look for a process whose Need fits in Available, then simulate completion.',
  },
  {
    title: 'Request example',
    code: `Request by P1: [1, 0, 2]

Check:
Request <= Need? yes
Request <= Available? yes
Temporarily grant and run safety test`,
    explanation:
      'If the safety test passes, the request is approved. If not, it is rolled back.',
  },
]

const whenToUse = [
  {
    title: 'When max claims are known',
    detail:
      'Banker’s requires processes to declare Max upfront. If claims are unknown, the model breaks.',
  },
  {
    title: 'When safety is critical',
    detail:
      'Systems that cannot tolerate deadlock can adopt avoidance at the cost of throughput.',
  },
  {
    title: 'When request rate is low',
    detail:
      'Safety checks are expensive; they are more practical when allocation changes are infrequent.',
  },
]

const tradeoffs = [
  {
    title: 'Safety vs utilization',
    detail:
      'Avoiding unsafe states can leave resources idle even when they could be used safely.',
  },
  {
    title: 'CPU overhead',
    detail:
      'Every request can trigger a multi-pass safety check.',
  },
  {
    title: 'Complexity vs simplicity',
    detail:
      'Banker’s is more complex than lock ordering or timeouts but offers stronger guarantees.',
  },
]

const evaluationChecklist = [
  {
    title: 'Safety preserved',
    detail:
      'Does every grant keep the system in a safe state?',
  },
  {
    title: 'Max claims enforced',
    detail:
      'Are requests strictly bounded by declared Max?',
  },
  {
    title: 'Performance budget',
    detail:
      'Are safety checks fast enough for the system’s request rate?',
  },
  {
    title: 'Starvation risk',
    detail:
      'Are some processes repeatedly delayed? Consider fairness strategies.',
  },
]

const keyTakeaways = [
  'Banker’s Algorithm prevents deadlock by only granting requests that keep the system safe.',
  'Safety depends on the existence of at least one completion order (safe sequence).',
  'It requires processes to declare their maximum resource needs in advance.',
  'It is conservative and can reduce utilization in exchange for safety.',
  'Most real systems use lighter-weight strategies, but the concepts remain essential.',
]

export default function BankersAlgorithmPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Banker&apos;s Algorithm</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Deadlock avoidance by proving the system stays safe</div>
              <p className="win95-text">
                Banker&apos;s Algorithm models resource allocation like a cautious bank. It grants requests only if the
                system can still finish all processes in some order. This makes it the canonical example of
                deadlock avoidance and a clean way to formalize safe states in operating systems.
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
            <legend>Data Model</legend>
            <div className="win95-grid win95-grid-2">
              {dataModel.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Invariants to Keep True</legend>
            <div className="win95-grid win95-grid-2">
              {invariants.map((item) => (
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
            <legend>Decision Workflow</legend>
            <div className="win95-grid win95-grid-2">
              {decisionWorkflow.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Safety Algorithm (Safe State Test)</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {safetyAlgorithm.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Resource Request Algorithm</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {requestAlgorithm.map((step) => (
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
            <legend>Complexity and Cost</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation Tips</legend>
            <div className="win95-grid win95-grid-2">
              {implementationTips.map((item) => (
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
            <legend>Variants and Extensions</legend>
            <div className="win95-grid win95-grid-2">
              {variants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to Use It</legend>
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
            <legend>Walkthrough: Safe Sequence</legend>
            <div className="win95-stack">
              {workedThrough.map((example) => (
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
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {exampleMatrices.map((example) => (
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
            <legend>How to Evaluate an Implementation</legend>
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
