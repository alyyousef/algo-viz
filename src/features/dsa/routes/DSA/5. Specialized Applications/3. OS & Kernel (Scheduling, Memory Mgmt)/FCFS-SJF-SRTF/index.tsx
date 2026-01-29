import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const overviewTiles = [
  {
    title: 'What it is',
    detail:
      'Three classic CPU scheduling policies: FCFS (arrival order), SJF (shortest burst), and SRTF (shortest remaining time).',
  },
  {
    title: 'Why it matters',
    detail:
      'They define the foundational tradeoffs between fairness, responsiveness, and throughput in operating systems.',
  },
  {
    title: 'What they require',
    detail:
      'FCFS needs only arrival order. SJF/SRTF require burst-time estimates or predictions.',
  },
  {
    title: 'What they optimize',
    detail:
      'SJF minimizes average waiting time for non-preemptive policies; SRTF improves response time by preempting.',
  },
]

const quickGlossary = [
  {
    term: 'CPU burst',
    definition: 'The amount of CPU time a process needs before it blocks or completes.',
  },
  {
    term: 'Turnaround time',
    definition: 'Completion time - arrival time.',
  },
  {
    term: 'Waiting time',
    definition: 'Turnaround time - total CPU burst time.',
  },
  {
    term: 'Response time',
    definition: 'First start time - arrival time.',
  },
  {
    term: 'Preemption',
    definition: 'Interrupting a running process to give the CPU to another process.',
  },
]

const historicalMilestones = [
  {
    title: '1950s: FCFS in early batch systems',
    detail:
      'Jobs were processed strictly in submission order, providing predictability but poor average waiting time.',
  },
  {
    title: '1960s: Shortest Job First theory',
    detail:
      'Researchers showed that prioritizing short jobs reduces average waiting time.',
  },
  {
    title: '1970s: Preemption for responsiveness',
    detail:
      'Interactive systems led to SRTF-like behavior to keep latency low.',
  },
  {
    title: '1990s+: Hybrid schedulers',
    detail:
      'Modern kernels combine priorities, time slices, and fairness rather than pure FCFS/SJF.',
  },
]

const mentalModels = [
  {
    title: 'FCFS as a single line',
    detail:
      'Whoever arrives first is served first. Simple, fair by arrival time, but long jobs can block the line.',
  },
  {
    title: 'SJF as fastest checkout lane',
    detail:
      'Letting quick jobs go first reduces average waiting time but can starve long jobs.',
  },
  {
    title: 'SRTF as a preemptive lane',
    detail:
      'Always run the job with the least remaining time, even if that means interrupting others.',
  },
  {
    title: 'Scheduler as a policy engine',
    detail:
      'The policy is not just a rule; it encodes the system goals (throughput vs latency vs fairness).',
  },
]

const policyCards = [
  {
    heading: 'FCFS (First-Come, First-Served)',
    bullets: [
      'Non-preemptive and simplest to implement.',
      'Fair by arrival order; no starvation if jobs are finite.',
      'Suffers from the convoy effect when a long job runs first.',
    ],
  },
  {
    heading: 'SJF (Shortest Job First)',
    bullets: [
      'Non-preemptive and optimal for average waiting time if burst times are known.',
      'Requires estimation of job length.',
      'Can starve long jobs if short jobs keep arriving.',
    ],
  },
  {
    heading: 'SRTF (Shortest Remaining Time First)',
    bullets: [
      'Preemptive version of SJF; always runs smallest remaining burst.',
      'Great response time for short jobs.',
      'Higher context-switch cost and potential starvation without aging.',
    ],
  },
]

const schedulerMetrics = [
  {
    metric: 'Turnaround time',
    meaning: 'Completion - arrival',
    goal: 'Lower means the system finishes work faster overall.',
  },
  {
    metric: 'Waiting time',
    meaning: 'Turnaround - burst',
    goal: 'Lower waiting improves perceived responsiveness.',
  },
  {
    metric: 'Response time',
    meaning: 'First start - arrival',
    goal: 'Critical for interactive workloads.',
  },
  {
    metric: 'Throughput',
    meaning: 'Jobs completed per unit time',
    goal: 'Higher throughput means better resource utilization.',
  },
  {
    metric: 'Fairness',
    meaning: 'Relative progress across jobs',
    goal: 'Avoids starvation and long-term bias.',
  },
]

const algorithmSteps = [
  {
    title: 'FCFS selection',
    detail: 'Pick the process with the earliest arrival time and run it to completion.',
  },
  {
    title: 'SJF selection',
    detail: 'Pick the ready process with the smallest predicted CPU burst and run it to completion.',
  },
  {
    title: 'SRTF selection',
    detail: 'At each arrival or completion, select the process with the shortest remaining time, preempting if needed.',
  },
]

const pseudocode = [
  {
    title: 'FCFS (non-preemptive)',
    code: `readyQueue = FIFO
on arrival(p): enqueue(p)
if CPU idle: run(dequeue())
run until completion`,
    explanation: 'A simple FIFO queue is enough for FCFS.',
  },
  {
    title: 'SJF (non-preemptive)',
    code: `readyQueue = min-heap by predictedBurst
on arrival(p): insert(p)
if CPU idle: run(extractMin())
run until completion`,
    explanation: 'Requires ordering by burst prediction.',
  },
  {
    title: 'SRTF (preemptive)',
    code: `readyQueue = min-heap by remainingTime
on arrival(p): insert(p)
if p.remaining < running.remaining: preempt
on completion: run(extractMin())`,
    explanation: 'Preemption occurs whenever a shorter job arrives.',
  },
]

const complexityNotes = [
  {
    title: 'Data structure cost',
    detail: 'FCFS uses a FIFO queue. SJF/SRTF need a min-heap or priority queue.',
  },
  {
    title: 'Preemption overhead',
    detail: 'SRTF can cause frequent context switches and cache disruption.',
  },
  {
    title: 'Prediction dependency',
    detail: 'SJF/SRTF require burst predictions, often using exponential averaging.',
  },
  {
    title: 'Fairness tradeoff',
    detail: 'Shortest-job policies minimize waiting but can starve long jobs without aging.',
  },
]

const predictionDetails = [
  {
    title: 'Exponential averaging',
    detail:
      'tau(n+1) = alpha * t(n) + (1 - alpha) * tau(n), where t(n) is the last actual burst.',
  },
  {
    title: 'Choosing alpha',
    detail: 'Higher alpha reacts faster to recent changes; lower alpha smooths noisy workloads.',
  },
  {
    title: 'Cold start',
    detail: 'Initial tau can be a system default or based on process class.',
  },
]

const exampleWorkload = [
  {
    title: 'Sample workload',
    code: `Process  Arrival  Burst
P1       0        8
P2       1        4
P3       2        9
P4       3        5`,
    explanation: 'We will schedule these four processes using FCFS, SJF, and SRTF.',
  },
]

const ganttExamples = [
  {
    title: 'FCFS schedule (Gantt)',
    code: `P1: 0-8 | P2: 8-12 | P3: 12-21 | P4: 21-26
Waiting times: P1=0, P2=7, P3=10, P4=18
Average waiting time = 8.75`,
    explanation: 'The long P1 job causes a convoy effect.',
  },
  {
    title: 'SJF schedule (Gantt)',
    code: `P1: 0-8 | P2: 8-12 | P4: 12-17 | P3: 17-26
Waiting times: P1=0, P2=7, P4=9, P3=15
Average waiting time = 7.75`,
    explanation: 'SJF improves average waiting time but still delays P3.',
  },
  {
    title: 'SRTF schedule (Gantt)',
    code: `P1: 0-1 | P2: 1-5 | P4: 5-10 | P1: 10-17 | P3: 17-26
Waiting times: P1=9, P2=0, P4=2, P3=15
Average waiting time = 6.50`,
    explanation: 'SRTF improves responsiveness by preempting longer jobs.',
  },
]

const workedStepByStep = [
  {
    title: 'SRTF timeline (arrival-based preemptions)',
    code: `t=0: P1 arrives -> run P1 (remaining 8)
t=1: P2 arrives (4 < 7) -> preempt P1, run P2
t=2: P3 arrives (9 > 3) -> continue P2
t=3: P4 arrives (5 > 2) -> continue P2
t=5: P2 completes -> run P4 (remaining 5)
t=10: P4 completes -> run P1 (remaining 7)
t=17: P1 completes -> run P3 (remaining 9)
t=26: P3 completes`,
    explanation: 'The scheduler reevaluates on each arrival and completion.',
  },
]

const comparisons = [
  {
    title: 'FCFS vs SJF',
    detail: 'FCFS is simplest and fair by arrival order; SJF lowers average waiting time but can starve long jobs.',
  },
  {
    title: 'SJF vs SRTF',
    detail: 'SRTF adds preemption to improve responsiveness but increases context-switch overhead.',
  },
  {
    title: 'SRTF vs Round Robin',
    detail: 'RR is fair and responsive without burst prediction; SRTF is more optimal but needs estimates.',
  },
]

const realWorldUses = [
  {
    context: 'Batch workloads',
    detail: 'FCFS is still used when fairness and low overhead matter more than latency.',
  },
  {
    context: 'Interactive systems',
    detail: 'SRTF-like behavior appears in time-sharing systems to keep short tasks responsive.',
  },
  {
    context: 'Cloud schedulers',
    detail: 'Short-job prioritization reduces mean completion time for small tasks.',
  },
  {
    context: 'Embedded devices',
    detail: 'FCFS or fixed-priority scheduling is common due to predictability and simplicity.',
  },
]

const pitfalls = [
  {
    mistake: 'Assuming burst times are known exactly',
    description: 'SJF/SRTF rely on estimates; poor predictions can make them worse than FCFS.',
  },
  {
    mistake: 'Ignoring preemption overhead',
    description: 'SRTF can cause excessive context switching and cache thrashing.',
  },
  {
    mistake: 'Starvation of long jobs',
    description: 'Without aging, short jobs can keep long jobs waiting indefinitely.',
  },
  {
    mistake: 'Equating fairness with low average waiting time',
    description: 'Average metrics can hide extreme delays for some jobs.',
  },
]

const decisionGuidance = [
  {
    title: 'Use FCFS for simplicity',
    detail: 'Great when workloads are homogeneous or when predictability is more important than latency.',
  },
  {
    title: 'Use SJF for best average waiting time',
    detail: 'Works well when burst estimates are accurate and starvation can be tolerated or mitigated.',
  },
  {
    title: 'Use SRTF for responsiveness',
    detail: 'Best for interactive workloads if preemption costs are acceptable.',
  },
  {
    title: 'Add aging or priority boosts',
    detail: 'Mitigate starvation in SJF/SRTF by increasing priority of long-waiting jobs.',
  },
]

const advancedInsights = [
  {
    title: 'SJF optimality proof intuition',
    detail: 'Swapping a longer job before a shorter one increases average wait, so shortest first is optimal.',
  },
  {
    title: 'Convoy effect',
    detail: 'FCFS can let one long job delay many short jobs, hurting average response time.',
  },
  {
    title: 'I/O-bound vs CPU-bound',
    detail: 'I/O-bound jobs are shorter and benefit from SRTF; CPU-bound jobs risk starvation.',
  },
  {
    title: 'Aging as fairness control',
    detail: 'Increase a job’s priority the longer it waits to prevent starvation.',
  },
]

const evaluationChecklist = [
  {
    title: 'Latency goals met',
    detail: 'Do response times stay within acceptable bounds for interactive tasks?',
  },
  {
    title: 'Throughput adequate',
    detail: 'Is the system completing enough jobs per unit time?',
  },
  {
    title: 'Fairness maintained',
    detail: 'Are long jobs or background tasks making steady progress?',
  },
  {
    title: 'Overhead acceptable',
    detail: 'Is context-switch and queue overhead small relative to CPU time?',
  },
]

const takeaways = [
  'FCFS is simple and fair by arrival order but can create long waits (convoy effect).',
  'SJF minimizes average waiting time when burst predictions are accurate.',
  'SRTF improves responsiveness via preemption but adds overhead and fairness risks.',
  'Prediction quality and aging policy strongly influence real-world performance.',
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
                FCFS, SJF, and SRTF are the baseline CPU schedulers used to explain how operating systems trade off fairness,
                throughput, and responsiveness. FCFS prioritizes arrival order, SJF chooses the shortest job, and SRTF preempts
                running jobs when a shorter one arrives. Together they highlight why modern schedulers blend multiple ideas.
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
            <legend>Policy Overview</legend>
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
            <legend>Scheduling Metrics</legend>
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
            <legend>Algorithm Flow</legend>
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
                SJF and SRTF are only as good as their burst predictions. Poor estimates can make them worse than FCFS.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode</legend>
            <div className="win95-stack">
              {pseudocode.map((example) => (
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
            <legend>Burst Prediction Details</legend>
            <div className="win95-grid win95-grid-2">
              {predictionDetails.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and Tradeoffs</legend>
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
            <legend>Example Workload</legend>
            <div className="win95-stack">
              {exampleWorkload.map((example) => (
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
            <legend>Gantt Charts and Metrics</legend>
            <div className="win95-stack">
              {ganttExamples.map((example) => (
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
            <legend>Walkthrough: SRTF Step-by-Step</legend>
            <div className="win95-stack">
              {workedStepByStep.map((example) => (
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
            <legend>When to Use Each Policy</legend>
            <div className="win95-grid win95-grid-2">
              {decisionGuidance.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced Insights</legend>
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
            <legend>How to Evaluate a Scheduler</legend>
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
              {takeaways.map((takeaway) => (
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
