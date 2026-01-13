import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Time-sharing drives round robin (1960s)',
    detail:
      'As terminals became interactive, systems needed to share CPU fairly among many users, leading to time-sliced round robin.',
  },
  {
    title: 'UNIX popularizes time slicing (1970s)',
    detail:
      'Early UNIX systems use round-robin style scheduling with priority adjustments to keep the system responsive.',
  },
  {
    title: 'GUI systems rely on RR behavior (1980s-1990s)',
    detail:
      'Desktop environments depend on frequent CPU slices to keep UI threads responsive.',
  },
  {
    title: 'Modern kernels tune quantum size (2000s+)',
    detail:
      'Schedulers blend round-robin with dynamic priorities, adjusting time slices to balance fairness and throughput.',
  },
]

const mentalModels = [
  {
    title: 'Carousel with time tickets',
    detail:
      'Every process gets a fixed time ticket before the carousel moves to the next.',
  },
  {
    title: 'Fair share by slices',
    detail:
      'Each ready process gets a turn, preventing any single job from monopolizing the CPU.',
  },
  {
    title: 'Quantum as a dial',
    detail:
      'Smaller quanta improve responsiveness but increase context-switch overhead.',
  },
]

const coreConcepts = [
  {
    heading: 'Round Robin basics',
    bullets: [
      'Processes are placed in a FIFO queue.',
      'Each process runs for a fixed time quantum.',
      'If unfinished, it goes to the back of the queue.',
    ],
  },
  {
    heading: 'Preemption by design',
    bullets: [
      'The timer interrupt triggers preemption at quantum boundaries.',
      'The scheduler ensures no process runs beyond its slice.',
      'Context switches are frequent by default.',
    ],
  },
  {
    heading: 'Quantum selection',
    bullets: [
      'Too small: heavy overhead and cache disruption.',
      'Too large: behaves like FCFS and harms responsiveness.',
      'Typical values balance interactivity and throughput.',
    ],
  },
  {
    heading: 'Fairness vs throughput',
    bullets: [
      'Fairness is strong: everyone gets CPU time.',
      'Throughput can suffer with many context switches.',
      'Batch tasks may prefer longer quanta.',
    ],
  },
  {
    heading: 'Response time',
    bullets: [
      'First response is bounded by one quantum of wait per process ahead.',
      'Interactive tasks benefit from short slices.',
      'Predictable response for UI workloads.',
    ],
  },
  {
    heading: 'Integration with priorities',
    bullets: [
      'Many systems run RR per priority level.',
      'Higher priority queues get more frequent slices.',
      'Combines fairness with urgency.',
    ],
  },
]

const schedulerMetrics = [
  {
    metric: 'Response time',
    meaning: 'Time until the process first runs.',
    goal: 'Small for interactive tasks.',
  },
  {
    metric: 'Waiting time',
    meaning: 'Total time spent in the ready queue.',
    goal: 'Lower waiting improves perceived performance.',
  },
  {
    metric: 'Throughput',
    meaning: 'Jobs completed per unit time.',
    goal: 'Balance with responsiveness.',
  },
  {
    metric: 'Context switch cost',
    meaning: 'Overhead per quantum.',
    goal: 'Avoid excessive switching.',
  },
]

const algorithmSteps = [
  {
    title: 'Enqueue ready processes',
    detail:
      'All ready processes sit in a FIFO queue. New arrivals go to the back.',
  },
  {
    title: 'Run for one quantum',
    detail:
      'Dequeue the first process, run it for q milliseconds or until it finishes.',
  },
  {
    title: 'Requeue if needed',
    detail:
      'If the process is not finished, place it at the end of the queue.',
  },
  {
    title: 'Repeat',
    detail:
      'Continue until all processes finish, ensuring fairness across the queue.',
  },
]

const complexityNotes = [
  {
    title: 'Implementation cost',
    detail:
      'Round robin uses a simple queue and timer interrupts. It is easy to implement.',
  },
  {
    title: 'Quantum overhead',
    detail:
      'Shorter quanta mean more context switches and higher overhead.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Frequent preemption reduces cache locality, affecting CPU-bound tasks.',
  },
  {
    title: 'Predictability tradeoff',
    detail:
      'Response time is predictable, but completion time can be longer than in SJF-based policies.',
  },
]

const realWorldUses = [
  {
    context: 'Time-sharing systems',
    detail:
      'Round robin is the default for sharing CPU time across many users or terminals.',
  },
  {
    context: 'Interactive workloads',
    detail:
      'Short time slices keep UIs responsive by frequently returning control to interactive tasks.',
  },
  {
    context: 'Network services',
    detail:
      'RR-like policies are used to ensure fair CPU use among many connections.',
  },
  {
    context: 'Embedded systems',
    detail:
      'Simple RR is common when tasks are of similar importance and overhead must be minimal.',
  },
]

const examples = [
  {
    title: 'Sample workload',
    code: `Process  Arrival  Burst
P1       0        5
P2       1        4
P3       2        2`,
    explanation:
      'Assume a time quantum of 2ms for the schedule below.',
  },
  {
    title: 'Round robin schedule (quantum=2)',
    code: `P1: 0-2 | P2: 2-4 | P3: 4-6 | P1: 6-8 | P2: 8-10 | P1: 10-11`,
    explanation:
      'Each process gets up to 2ms. Short P3 finishes quickly, while P1 and P2 rotate.',
  },
  {
    title: 'Quantum tuning rule of thumb',
    code: `If average CPU burst is 10ms:
  choose quantum between 2-4ms`,
    explanation:
      'Keep the quantum small enough for responsiveness, but large enough to avoid excessive switching.',
  },
]

const pitfalls = [
  'Choosing a quantum that is too small, causing excessive context switch overhead.',
  'Choosing a quantum that is too large, making RR behave like FCFS.',
  'Assuming RR is optimal for throughput; it favors fairness over efficiency.',
  'Ignoring cache effects for CPU-bound tasks.',
  'Mixing RR with priorities without clear rules, creating unexpected starvation.',
]

const decisionGuidance = [
  'Use round robin for time-sharing and interactive systems that value fairness.',
  'Tune the quantum based on workload and context-switch cost.',
  'Combine RR with priorities when some tasks must be more responsive.',
  'Measure response time, not just throughput, when evaluating quantum size.',
  'Avoid RR for workloads where completion time is more important than fairness.',
]

const advancedInsights = [
  {
    title: 'RR vs MLFQ',
    detail:
      'MLFQ often uses RR within each queue, while adjusting priority between queues.',
  },
  {
    title: 'Quantum and CPU burst distribution',
    detail:
      'If the quantum is larger than most CPU bursts, RR approximates FCFS and loses its fairness advantage.',
  },
  {
    title: 'Real-time considerations',
    detail:
      'RR does not provide deadlines; use fixed-priority or EDF for hard real-time tasks.',
  },
  {
    title: 'Load-sensitive tuning',
    detail:
      'Some kernels adjust quanta based on load to reduce overhead under heavy contention.',
  },
]

const takeaways = [
  'Round robin ensures fairness by slicing CPU time into equal quanta.',
  'Choosing the right quantum is the primary tuning lever.',
  'RR is great for responsiveness but can hurt throughput.',
  'Most real schedulers embed RR within broader priority frameworks.',
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
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Round robin is the core scheduler of time-sharing systems. Each process gets a fair slice of CPU time, preventing
                any single job from monopolizing the processor. Its simplicity makes it a common building block for more advanced
                schedulers that add priorities or feedback mechanisms.
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
            <legend>How it works: core concepts</legend>
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
                The quantum is the key lever: small values improve interactivity, larger values improve throughput and cache reuse.
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

