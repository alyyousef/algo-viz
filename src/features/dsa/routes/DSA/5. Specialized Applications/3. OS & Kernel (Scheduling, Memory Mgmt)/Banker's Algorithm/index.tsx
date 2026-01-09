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

const historicalMilestones = [
  {
    title: 'Dijkstra formalizes deadlock (1965)',
    detail:
      'The dining philosophers problem highlights how competing processes can deadlock, motivating safer resource allocation policies.',
  },
  {
    title: "Banker's Algorithm is introduced (1968)",
    detail:
      'Edsger Dijkstra presents a safety-based resource allocation algorithm that simulates future requests to avoid unsafe states.',
  },
  {
    title: 'Operating systems adopt safety checks (1970s)',
    detail:
      'Academic OSes integrate deadlock avoidance and detection, refining the use of maximum claims and safe sequences.',
  },
  {
    title: 'Modern kernels prefer avoidance-free designs (1990s+)',
    detail:
      'Practical systems often avoid strict Bankers usage due to overhead, but the algorithm remains foundational in OS curricula.',
  },
]

const mentalModels = [
  {
    title: 'The banker analogy',
    detail:
      'Like a cautious bank, the system only grants a loan if it can still satisfy all customers in some order without going bankrupt.',
  },
  {
    title: 'Safe state as future-proofing',
    detail:
      'A state is safe if the system can find an order to finish every process given the remaining resources.',
  },
  {
    title: 'Pretend the request already happened',
    detail:
      'The algorithm simulates allocation, then checks if the system remains safe before making the change real.',
  },
]

const coreStructures = [
  {
    heading: 'Available vector',
    bullets: [
      'Length m (resource types).',
      'Available[j] is the number of free instances of resource type j.',
      'Represents the pool the OS can still hand out.',
    ],
  },
  {
    heading: 'Max matrix',
    bullets: [
      'Size n x m (processes x resources).',
      'Max[i][j] is the maximum demand of process i for resource j.',
      'Declared ahead of time for the algorithm to work.',
    ],
  },
  {
    heading: 'Allocation matrix',
    bullets: [
      'Allocation[i][j] is what process i currently holds.',
      'Sum of Allocation over i plus Available equals total resources.',
      'Tracks current commitments the OS must honor.',
    ],
  },
  {
    heading: 'Need matrix',
    bullets: [
      'Need = Max - Allocation.',
      'Need[i][j] is what process i still needs to finish.',
      'Used to test if a process can complete with current Available.',
    ],
  },
  {
    heading: 'Safe sequence',
    bullets: [
      'An ordering of processes that can finish one by one.',
      'If such an order exists, the state is safe.',
      'Used as a certificate that the allocation is allowed.',
    ],
  },
  {
    heading: 'Work and Finish vectors',
    bullets: [
      'Work is a copy of Available used in the safety check.',
      'Finish flags track which processes can complete.',
      'Safety check ends when all Finish are true or no progress is possible.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Safety check',
    detail:
      'Initialize Work = Available and Finish = false. Find a process whose Need <= Work, pretend it finishes, then add Allocation to Work. Repeat until all finish or no progress.',
  },
  {
    title: 'Request handling',
    detail:
      'When a process requests resources, ensure Request <= Need and Request <= Available. Then provisionally allocate and run the safety check.',
  },
  {
    title: 'Decision',
    detail:
      'If a safe sequence exists, grant the request. If not, roll back and make the process wait.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Safety check is O(n^2 * m) in the worst case due to repeated scanning of processes and resource comparisons.',
  },
  {
    title: 'Space cost',
    detail:
      'Requires O(n * m) for Max, Allocation, Need, plus O(m) for Available and Work.',
  },
  {
    title: 'Runtime overhead',
    detail:
      'Frequent requests can make checks expensive, which is why production kernels often prefer other strategies.',
  },
  {
    title: 'Predictability tradeoff',
    detail:
      'Avoidance reduces deadlock risk but requires up-front maximum claims and conservative admission control.',
  },
]

const realWorldUses = [
  {
    context: 'Teaching OS fundamentals',
    detail:
      'Banker’s Algorithm is a classic vehicle for understanding deadlocks, safe states, and resource allocation policy.',
  },
  {
    context: 'Database transaction schedulers',
    detail:
      'Conceptual parallels appear in lock managers that prevent unsafe allocation of lock resources.',
  },
  {
    context: 'Embedded or safety-critical systems',
    detail:
      'Systems with strict resource contracts may use similar safety checks to avoid starvation and deadlock.',
  },
  {
    context: 'Simulation and verification',
    detail:
      'Safety checking is useful in modeling frameworks to validate that planned allocations do not create deadlock-prone states.',
  },
]

const examples = [
  {
    title: 'Safety check walkthrough',
    code: `Available = [3, 3, 2]

Allocation = [
  [0, 1, 0],
  [2, 0, 0],
  [3, 0, 2],
  [2, 1, 1],
  [0, 0, 2],
]

Max = [
  [7, 5, 3],
  [3, 2, 2],
  [9, 0, 2],
  [2, 2, 2],
  [4, 3, 3],
]

Need = Max - Allocation`,
    explanation:
      'Compute Need and test for a safe sequence. One valid order is P1, P3, P4, P0, P2, meaning the state is safe.',
  },
  {
    title: 'Handling a request',
    code: `Request(P1) = [1, 0, 2]

Check:
Request <= Need? yes
Request <= Available? yes

Pretend allocate, then run safety check.
If safe -> grant; otherwise rollback.`,
    explanation:
      'The algorithm only grants requests that keep the system in a safe state, even if resources are currently available.',
  },
  {
    title: 'Safety check pseudocode',
    code: `Work = Available
Finish[i] = false for all i

while exists i with Finish[i] == false and Need[i] <= Work:
  Work = Work + Allocation[i]
  Finish[i] = true

if all Finish == true -> SAFE
else -> UNSAFE`,
    explanation:
      'This loop searches for a process that can finish with the current Work vector, then releases its allocation into Work.',
  },
]

const pitfalls = [
  'Skipping validation that Request <= Need. This breaks the model and can create impossible allocations.',
  'Using the algorithm without accurate Max claims. If processes lie, safety checks become meaningless.',
  'Treating safe as optimal. Safe sequences may still yield poor throughput or fairness.',
  'Running safety checks too frequently, causing performance overhead in high-throughput systems.',
  'Ignoring starvation. A process may wait indefinitely even if the system remains safe.',
]

const decisionGuidance = [
  'Use Banker’s Algorithm when maximum resource needs are known in advance and avoiding deadlock is critical.',
  'Prefer simpler avoidance or detection methods when processes are dynamic or uncooperative about maximum claims.',
  'Adopt admission control policies to keep systems in safe states from the start.',
  'Use the safety check as a verification tool for simulations or educational tooling.',
  'Pair with fairness policies to prevent starvation and long-term delays.',
]

const advancedInsights = [
  {
    title: 'Safe vs unsafe vs deadlocked',
    detail:
      'Unsafe does not mean deadlocked; it means there is no guaranteed safe sequence. Deadlock is a specific unsafe state where no process can proceed.',
  },
  {
    title: 'Resource ordering and avoidance',
    detail:
      'Many systems use resource ordering instead of Bankers to avoid deadlocks with lower runtime overhead.',
  },
  {
    title: 'Banker’s for multi-instance resources',
    detail:
      'The algorithm is designed for multiple instances per resource type, unlike simpler single-instance deadlock prevention.',
  },
  {
    title: 'Safety as a certificate',
    detail:
      'A safe sequence is a constructive proof that a scheduling order exists. Some systems log or trace it for auditing.',
  },
]

const takeaways = [
  'Banker’s Algorithm avoids deadlock by refusing allocations that lead to unsafe states.',
  'It requires accurate maximum claims and a safety check that simulates future completions.',
  'The method is conceptually powerful but often too heavy for modern kernels in production.',
  'Understanding safety vs deadlock clarifies why avoidance policies can still block requests.',
]

export default function BankersAlgorithmPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Banker&apos;s Algorithm</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Deadlock avoidance by simulating safe futures before granting resources</div>
              <p className="win95-text">
                Banker&apos;s Algorithm decides whether the operating system should grant a resource request by checking if the
                resulting state is safe. It keeps track of maximum claims, current allocations, and remaining needs, then tests
                whether all processes can still complete in some order. If not, the request waits.
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
                Banker&apos;s Algorithm is a deadlock avoidance strategy. It prevents the system from entering unsafe states by
                simulating resource allocations and verifying that a safe sequence still exists. This makes it conservative,
                prioritizing safety over maximum utilization.
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
                The safety check is the core of the algorithm. It treats current allocations as a promise and tries to prove that
                every process can still finish in some order.
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
