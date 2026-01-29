import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const overviewTiles = [
  {
    title: 'What it is',
    detail:
      'A preemptive, time-sliced scheduler that gives each ready process a fixed quantum in FIFO order.',
  },
  {
    title: 'Why it matters',
    detail:
      'It guarantees fairness and good interactive response by preventing any task from monopolizing the CPU.',
  },
  {
    title: 'What it requires',
    detail:
      'A ready queue, timer interrupts, and a context switch mechanism.',
  },
  {
    title: 'What it optimizes',
    detail:
      'Predictable responsiveness and equitable CPU sharing, not necessarily minimal completion time.',
  },
]

const quickGlossary = [
  {
    term: 'Time quantum',
    definition: 'The maximum CPU time a process can run before being preempted.',
  },
  {
    term: 'Context switch',
    definition: 'Saving and restoring CPU state to switch execution to another process.',
  },
  {
    term: 'Ready queue',
    definition: 'FIFO list of processes eligible to run.',
  },
  {
    term: 'Convoy effect',
    definition: 'Short tasks delayed by long tasks (reduced in RR vs FCFS).',
  },
  {
    term: 'Time-sharing',
    definition: 'Sharing CPU time among many users/processes with small slices.',
  },
]

const historicalMilestones = [
  {
    title: '1960s: Time-sharing drives RR adoption',
    detail:
      'Interactive terminals required fair CPU sharing, making time-sliced round robin a natural fit.',
  },
  {
    title: '1970s: UNIX popularizes time slicing',
    detail:
      'Early UNIX uses RR-like policies with priority adjustments to keep the system responsive.',
  },
  {
    title: '1980s-1990s: GUI responsiveness',
    detail:
      'Desktop systems rely on frequent slices to keep UI threads responsive.',
  },
  {
    title: '2000s+: Tuned quanta and hybrid schedulers',
    detail:
      'Modern kernels blend RR within priority levels, tuning quanta dynamically by load.',
  },
]

const mentalModels = [
  {
    title: 'Carousel with time tickets',
    detail: 'Each rider gets a fixed ride time before the carousel moves to the next.',
  },
  {
    title: 'Fair slice for everyone',
    detail: 'Every process gets a turn, preventing starvation by design.',
  },
  {
    title: 'Quantum as a dial',
    detail: 'Smaller quanta improve responsiveness but increase switching overhead.',
  },
  {
    title: 'Interactivity first',
    detail: 'RR favors quick responsiveness rather than minimizing total completion time.',
  },
]

const coreConcepts = [
  {
    heading: 'Round Robin basics',
    bullets: [
      'Ready processes sit in a FIFO queue.',
      'Each process runs for at most one quantum.',
      'Unfinished processes go to the back of the queue.',
    ],
  },
  {
    heading: 'Preemption by design',
    bullets: [
      'A timer interrupt triggers preemption at quantum boundaries.',
      'The scheduler enforces time slicing to prevent monopolization.',
      'Context switches happen frequently under load.',
    ],
  },
  {
    heading: 'Quantum selection',
    bullets: [
      'Too small: heavy overhead and cache disruption.',
      'Too large: behaves like FCFS, hurting responsiveness.',
      'Typical values balance interactivity and throughput.',
    ],
  },
  {
    heading: 'Fairness vs throughput',
    bullets: [
      'Strong fairness: all processes progress.',
      'Throughput can drop due to switching overhead.',
      'Batch jobs may prefer longer quanta.',
    ],
  },
  {
    heading: 'Response time bounds',
    bullets: [
      'Worst-case response <= (n-1) * quantum.',
      'Interactive tasks benefit from short slices.',
      'Predictable response for UI workloads.',
    ],
  },
  {
    heading: 'Integration with priorities',
    bullets: [
      'Many systems run RR within each priority level.',
      'Higher-priority queues get more frequent slices.',
      'Combines fairness with urgency.',
    ],
  },
]

const schedulerMetrics = [
  {
    metric: 'Response time',
    meaning: 'Arrival to first execution.',
    goal: 'Keep small for interactive tasks.',
  },
  {
    metric: 'Waiting time',
    meaning: 'Total time spent in ready queue.',
    goal: 'Reduce long waits under heavy load.',
  },
  {
    metric: 'Turnaround time',
    meaning: 'Completion - arrival.',
    goal: 'Balance with responsiveness.',
  },
  {
    metric: 'Throughput',
    meaning: 'Jobs completed per unit time.',
    goal: 'Avoid excessive overhead.',
  },
  {
    metric: 'Context-switch cost',
    meaning: 'Overhead per quantum.',
    goal: 'Keep small relative to quantum.',
  },
]

const algorithmSteps = [
  {
    title: 'Enqueue ready processes',
    detail: 'Insert arriving processes at the back of the ready queue.',
  },
  {
    title: 'Run for one quantum',
    detail: 'Dequeue the first process, run it for q ms or until it finishes.',
  },
  {
    title: 'Requeue if needed',
    detail: 'If the process is not finished, append it to the back.',
  },
  {
    title: 'Repeat',
    detail: 'Continue cycling until all processes complete.',
  },
]

const pseudocode = [
  {
    title: 'Round Robin loop',
    code: `readyQueue = FIFO
on arrival(p): enqueue(p)

while readyQueue not empty:
  p = dequeue()
  run p for min(quantum, p.remaining)
  if p.remaining > 0:
    enqueue(p)`,
    explanation: 'Simple FIFO rotation with time slicing.',
  },
  {
    title: 'Timer interrupt',
    code: `on timer interrupt:
  save state of running process
  if running not finished:
    enqueue(running)
  dispatch next from readyQueue`,
    explanation: 'Preemption is enforced by a periodic timer.',
  },
]

const quantumGuidelines = [
  {
    title: 'Quantum vs context switch',
    detail: 'Set quantum >> context-switch time; otherwise overhead dominates.',
  },
  {
    title: 'Human perception rule',
    detail: 'Interactive responsiveness feels good under ~100ms; choose quanta far below that.',
  },
  {
    title: 'CPU burst distribution',
    detail: 'If most bursts are shorter than the quantum, RR approximates FCFS.',
  },
  {
    title: 'Workload-dependent tuning',
    detail: 'Batch-heavy systems can use longer quanta to reduce switching.',
  },
]

const complexityNotes = [
  {
    title: 'Implementation cost',
    detail: 'Uses a FIFO queue and timer interrupts. Simple and robust.',
  },
  {
    title: 'Overhead tradeoff',
    detail: 'Short quanta increase context switches and reduce cache locality.',
  },
  {
    title: 'Predictability',
    detail: 'Response time is predictable, but total completion time can be worse than SJF.',
  },
  {
    title: 'Scalability',
    detail: 'Large queues can increase worst-case response time linearly.',
  },
]

const realWorldUses = [
  {
    context: 'Time-sharing systems',
    detail: 'RR fairly divides CPU among many users and terminals.',
  },
  {
    context: 'Interactive workloads',
    detail: 'Short quanta keep UIs responsive and reduce perceived lag.',
  },
  {
    context: 'Network services',
    detail: 'RR-like policies provide fair CPU usage across many connections.',
  },
  {
    context: 'Embedded systems',
    detail: 'Simple RR is common when tasks are similar in importance.',
  },
]

const examples = [
  {
    title: 'Sample workload',
    code: `Process  Arrival  Burst
P1       0        5
P2       1        4
P3       2        2`,
    explanation: 'Assume a time quantum of 2ms for the schedule below.',
  },
  {
    title: 'Round robin schedule (quantum=2)',
    code: `P1: 0-2 | P2: 2-4 | P3: 4-6 | P1: 6-8 | P2: 8-10 | P1: 10-11`,
    explanation: 'Each process gets up to 2ms. Short P3 finishes quickly, while P1 and P2 rotate.',
  },
  {
    title: 'Waiting/turnaround calculation',
    code: `Completion: P1=11, P2=10, P3=6
Turnaround: P1=11, P2=9, P3=4
Waiting: P1=6, P2=5, P3=2`,
    explanation: 'Waiting = turnaround - burst.',
  },
  {
    title: 'Quantum tuning rule of thumb',
    code: `If avg CPU burst = 10ms
choose quantum between 2-4ms`,
    explanation: 'Small enough for responsiveness, large enough to avoid overhead.',
  },
]

const workedStepByStep = [
  {
    title: 'Step-by-step timeline (q=2)',
    code: `t=0: P1 runs (rem=3)
t=1: P2 arrives
t=2: P1 quantum ends -> enqueue P1
      run P2 (rem=2)
t=2: P3 arrives
t=4: P2 quantum ends -> enqueue P2
      run P3 (rem=0)
t=6: P3 finishes -> run P1 (rem=1)
t=8: P1 quantum ends -> enqueue P1
      run P2 (rem=0)
t=10: P2 finishes -> run P1 (rem=0)
t=11: P1 finishes`,
    explanation: 'RR re-evaluates at each quantum boundary.',
  },
]

const comparisons = [
  {
    title: 'RR vs FCFS',
    detail: 'RR improves responsiveness and fairness; FCFS can cause long delays behind big jobs.',
  },
  {
    title: 'RR vs SJF',
    detail: 'SJF minimizes average waiting time, but RR avoids starvation and is simpler to implement.',
  },
  {
    title: 'RR vs SRTF',
    detail: 'SRTF optimizes short jobs but requires burst estimates; RR avoids prediction.',
  },
]

const pitfalls = [
  {
    mistake: 'Quantum too small',
    description: 'Excessive context switches waste CPU time and hurt cache locality.',
  },
  {
    mistake: 'Quantum too large',
    description: 'RR behaves like FCFS and loses responsiveness benefits.',
  },
  {
    mistake: 'Ignoring workload mix',
    description: 'Batch-heavy systems may prefer larger quanta; interactive systems need smaller.',
  },
  {
    mistake: 'Priority interactions unclear',
    description: 'RR-with-priority needs clear rules or low-priority tasks may starve.',
  },
]

const decisionGuidance = [
  {
    title: 'Use RR for interactivity',
    detail: 'Best for time-sharing and UI-heavy workloads that value quick response.',
  },
  {
    title: 'Tune quantum carefully',
    detail: 'Balance overhead vs responsiveness; measure under realistic load.',
  },
  {
    title: 'Combine with priorities',
    detail: 'Use RR per priority level when tasks differ in urgency.',
  },
  {
    title: 'Avoid for batch-only workloads',
    detail: 'SJF/priority policies may reduce total completion time in batch systems.',
  },
]

const advancedInsights = [
  {
    title: 'RR inside MLFQ',
    detail: 'MLFQ often uses RR within each queue, adjusting priority between queues.',
  },
  {
    title: 'Quantum and burst distribution',
    detail: 'If quantum exceeds most bursts, RR approximates FCFS and loses fairness advantage.',
  },
  {
    title: 'Real-time limitations',
    detail: 'RR alone does not enforce deadlines; use fixed-priority or EDF for hard real-time.',
  },
  {
    title: 'Load-sensitive tuning',
    detail: 'Some kernels increase quanta under heavy load to reduce switching overhead.',
  },
]

const evaluationChecklist = [
  {
    title: 'Responsiveness',
    detail: 'Is first response time acceptable for interactive tasks?',
  },
  {
    title: 'Overhead',
    detail: 'Are context-switch costs low compared with quantum length?',
  },
  {
    title: 'Fairness',
    detail: 'Do all tasks make steady progress without starvation?',
  },
  {
    title: 'Workload fit',
    detail: 'Is RR appropriate for the dominant workload type?',
  },
]

const takeaways = [
  'Round robin ensures fairness by giving each process a time slice.',
  'Quantum size is the main tuning lever and controls responsiveness vs overhead.',
  'RR is ideal for interactive systems but not optimal for throughput.',
  'Most modern schedulers embed RR inside priority or feedback frameworks.',
]

export default function RoundRobinSchedulingPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Round Robin Scheduling</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Time-sliced scheduling that emphasizes fairness and responsiveness</div>
              <p className="win95-text">
                Round robin scheduling gives each process a fixed time quantum, cycling through the ready queue in order. It is
                simple, fair, and predictable for interactive workloads, but its effectiveness depends heavily on quantum size and
                context-switch overhead.
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
            <legend>Core Concepts</legend>
            <div className="win95-grid win95-grid-3">
              {coreConcepts.map((block) => (
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
                The quantum is the main tuning lever: smaller values improve interactivity; larger values improve throughput and
                cache reuse.
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
            <legend>Quantum Selection Guidelines</legend>
            <div className="win95-grid win95-grid-2">
              {quantumGuidelines.map((item) => (
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
            <legend>Walkthrough: Step-by-Step Timeline</legend>
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
            <legend>When to Use It</legend>
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
            <legend>How to Evaluate RR</legend>
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
