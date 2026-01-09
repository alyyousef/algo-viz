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
    title: 'Early batch systems use FCFS (1950s)',
    detail:
      'Mainframes processed jobs in submission order, which was simple but often inefficient for long queues.',
  },
  {
    title: 'Shortest job concepts emerge (1960s)',
    detail:
      'Researchers observed that serving short jobs first reduces average waiting time, leading to SJF policies.',
  },
  {
    title: 'Preemptive scheduling appears (1970s)',
    detail:
      'Interactive systems needed responsiveness, motivating SRTF and later multi-level feedback queues.',
  },
  {
    title: 'Modern schedulers blend strategies (1990s+)',
    detail:
      'Practical kernels mix time slicing, priorities, and heuristics instead of pure FCFS or SJF.',
  },
]

const mentalModels = [
  {
    title: 'FCFS as a line at a counter',
    detail:
      'Jobs are handled in arrival order. It is fair by arrival time, but long jobs can block everyone behind them.',
  },
  {
    title: 'SJF as fastest checkout lane',
    detail:
      'Serving short jobs first reduces average waiting time, but can starve long jobs.',
  },
  {
    title: 'SRTF as a preemptive queue',
    detail:
      'The system always runs the job with the least remaining time, interrupting longer jobs to keep latency low.',
  },
]

const policyCards = [
  {
    heading: 'FCFS (First-Come, First-Served)',
    bullets: [
      'Non-preemptive, simplest scheduling policy.',
      'Great for fairness by arrival order.',
      'Poor average waiting time when long jobs arrive early.',
    ],
  },
  {
    heading: 'SJF (Shortest Job First)',
    bullets: [
      'Non-preemptive and optimal for average wait if burst times are known.',
      'Requires estimating job length.',
      'Long jobs may wait a long time.',
    ],
  },
  {
    heading: 'SRTF (Shortest Remaining Time First)',
    bullets: [
      'Preemptive version of SJF.',
      'Improves response time for short jobs.',
      'Higher context switch overhead and potential starvation.',
    ],
  },
]

const schedulerMetrics = [
  {
    metric: 'Turnaround time',
    meaning: 'Completion time - arrival time.',
    goal: 'Lower is better for overall throughput.',
  },
  {
    metric: 'Waiting time',
    meaning: 'Turnaround time - burst time.',
    goal: 'Lower waiting improves responsiveness.',
  },
  {
    metric: 'Response time',
    meaning: 'First start time - arrival time.',
    goal: 'Critical for interactive systems.',
  },
  {
    metric: 'Throughput',
    meaning: 'Jobs completed per unit time.',
    goal: 'Higher throughput means more work done.',
  },
]

const algorithmSteps = [
  {
    title: 'FCFS selection',
    detail:
      'Pick the process that arrived earliest and run it to completion. New arrivals wait in a FIFO queue.',
  },
  {
    title: 'SJF selection',
    detail:
      'Among ready processes, choose the one with the smallest CPU burst. Run it to completion.',
  },
  {
    title: 'SRTF selection',
    detail:
      'At every arrival or completion, pick the process with the smallest remaining time and preempt if needed.',
  },
]

const complexityNotes = [
  {
    title: 'Implementation cost',
    detail:
      'FCFS uses a queue. SJF and SRTF need a priority queue ordered by predicted burst or remaining time.',
  },
  {
    title: 'Preemption overhead',
    detail:
      'SRTF triggers context switches, which cost time and cache locality.',
  },
  {
    title: 'Burst prediction',
    detail:
      'SJF and SRTF depend on estimates, often using exponential averaging of past bursts.',
  },
  {
    title: 'Fairness tradeoff',
    detail:
      'Short-job policies minimize average wait but can starve long-running tasks without aging or priority boosts.',
  },
]

const realWorldUses = [
  {
    context: 'Batch workloads',
    detail:
      'FCFS is still used for simple batch queues where fairness and simplicity matter more than latency.',
  },
  {
    context: 'Interactive systems',
    detail:
      'SRTF-like behavior appears in time-sharing systems to keep UI and short tasks responsive.',
  },
  {
    context: 'Cloud schedulers',
    detail:
      'Short-job prioritization is used to reduce average completion time for small tasks or functions.',
  },
  {
    context: 'Embedded devices',
    detail:
      'Simpler FCFS or fixed-priority scheduling is common due to predictability and low overhead.',
  },
]

const examples = [
  {
    title: 'Sample workload',
    code: `Process  Arrival  Burst
P1       0        8
P2       1        4
P3       2        9
P4       3        5`,
    explanation:
      'We will schedule these four processes using FCFS, SJF, and SRTF to compare their waiting times.',
  },
  {
    title: 'FCFS schedule (Gantt)',
    code: `P1: 0-8 | P2: 8-12 | P3: 12-21 | P4: 21-26
Average waiting time = 8.75`,
    explanation:
      'FCFS is simple but the long P1 job delays everyone behind it.',
  },
  {
    title: 'SJF schedule (Gantt)',
    code: `P1: 0-8 | P2: 8-12 | P4: 12-17 | P3: 17-26
Average waiting time = 7.75`,
    explanation:
      'SJF improves average waiting time but still delays P3 significantly.',
  },
  {
    title: 'SRTF schedule (Gantt)',
    code: `P1: 0-1 | P2: 1-5 | P4: 5-10 | P1: 10-17 | P3: 17-26
Average waiting time = 6.50`,
    explanation:
      'SRTF keeps short jobs responsive by preempting longer ones, but it adds context switch overhead.',
  },
]

const pitfalls = [
  'Assuming burst times are known exactly. Real systems must estimate, which can be wrong.',
  'Ignoring context-switch costs in SRTF, which can negate gains for very short jobs.',
  'Starvation of long jobs under SJF/SRTF if short jobs keep arriving.',
  'Equating fairness with low average waiting time. They are not the same.',
  'Using FCFS for interactive workloads, which can cause long response times.',
]

const decisionGuidance = [
  'Use FCFS for simple batch workloads with predictable queue order and low overhead.',
  'Use SJF when you can estimate burst times and want the best average waiting time.',
  'Use SRTF when responsiveness is critical and preemption overhead is acceptable.',
  'Add aging or priority boosts to protect long jobs from starvation.',
  'Measure response time and throughput, not just average waiting time.',
]

const advancedInsights = [
  {
    title: 'SJF optimality',
    detail:
      'SJF is optimal for average waiting time among non-preemptive policies if burst times are known exactly.',
  },
  {
    title: 'Exponential burst prediction',
    detail:
      'Typical prediction uses tau(n+1) = alpha * t(n) + (1 - alpha) * tau(n), smoothing noise over time.',
  },
  {
    title: 'SRTF and fairness',
    detail:
      'Without aging, SRTF can delay long processes indefinitely. Production schedulers mix priorities to prevent this.',
  },
  {
    title: 'Response time vs throughput',
    detail:
      'Policies that minimize waiting may still harm throughput if they cause excessive preemptions.',
  },
]

const takeaways = [
  'FCFS is simple and fair by arrival order but can produce long waits.',
  'SJF minimizes average waiting time when burst predictions are accurate.',
  'SRTF improves responsiveness by preempting long jobs, but adds overhead.',
  'Modern schedulers blend these ideas with priorities and time slicing.',
]

export default function FCFSSJFSRTFPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">FCFS / SJF / SRTF</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Classic CPU scheduling policies for batch and interactive workloads</div>
              <p className="win95-text">
                FCFS, SJF, and SRTF are foundational scheduling strategies. They differ in whether they preempt running jobs and
                whether they prioritize short work. Understanding their tradeoffs helps explain why modern kernels blend fairness,
                responsiveness, and throughput instead of using a single pure policy.
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
                Scheduling decides which process runs on the CPU next. FCFS is the simplest and most predictable. SJF and SRTF
                optimize for average waiting time by favoring shorter jobs, but they must estimate burst lengths and manage fairness.
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
            <legend>How it works: policy overview</legend>
            <div className="win95-grid win95-grid-3">
              {policyCards.map((block) => (
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
            <legend>Scheduling metrics</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Meaning</th>
                    <th>Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  {schedulerMetrics.map((row) => (
                    <tr key={row.metric}>
                      <td>{row.metric}</td>
                      <td>{row.meaning}</td>
                      <td>{row.goal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                SJF and SRTF are only as good as their burst estimates. Good prediction reduces waiting; bad prediction can make
                scheduling worse than FCFS.
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
