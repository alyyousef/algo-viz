import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Early OSes use fixed priorities (1960s)',
    detail:
      'Batch systems separated system tasks from user jobs, giving OS services higher priority for reliability.',
  },
  {
    title: 'Interactive systems adopt dynamic priorities (1970s)',
    detail:
      'Schedulers begin adjusting priority based on CPU usage to keep interactive tasks responsive.',
  },
  {
    title: 'Real-time systems formalize priority policies (1980s)',
    detail:
      'Rate Monotonic and Deadline Monotonic scheduling provide provable guarantees for fixed-priority tasks.',
  },
  {
    title: 'Modern kernels blend priority and fairness (1990s+)',
    detail:
      'Production schedulers use dynamic priorities, aging, and fairness models to reduce starvation.',
  },
]

const mentalModels = [
  {
    title: 'VIP lane at the CPU',
    detail:
      'High-priority processes are allowed to cut the line, improving responsiveness for critical tasks.',
  },
  {
    title: 'Budgeted attention',
    detail:
      'The CPU is a shared resource. Priorities define who gets more guaranteed attention and who waits.',
  },
  {
    title: 'Starvation risk',
    detail:
      'Without aging, low-priority jobs can be postponed indefinitely if high-priority work keeps arriving.',
  },
]

const policyCards = [
  {
    heading: 'Non-preemptive priority',
    bullets: [
      'Pick highest priority job and run it to completion.',
      'Simple but can delay urgent tasks if a long job is running.',
      'Lower context-switch overhead.',
    ],
  },
  {
    heading: 'Preemptive priority',
    bullets: [
      'Interrupt running tasks if a higher priority job arrives.',
      'Improves response time for critical work.',
      'Adds context-switch overhead and can starve low priority jobs.',
    ],
  },
  {
    heading: 'Dynamic priority',
    bullets: [
      'Priority changes based on behavior or CPU usage.',
      'Aging boosts waiting processes.',
      'Balances responsiveness with fairness.',
    ],
  },
]

const schedulerMetrics = [
  {
    metric: 'Response time',
    meaning: 'Time to first execution after arrival.',
    goal: 'Critical for interactive or real-time tasks.',
  },
  {
    metric: 'Fairness',
    meaning: 'Guarantee that low-priority jobs still run.',
    goal: 'Prevent starvation and missed deadlines.',
  },
  {
    metric: 'Predictability',
    meaning: 'Consistency of scheduling behavior.',
    goal: 'Required in real-time systems.',
  },
  {
    metric: 'Overhead',
    meaning: 'Cost of preemption and bookkeeping.',
    goal: 'Keep CPU time for actual work.',
  },
]

const algorithmSteps = [
  {
    title: 'Priority selection',
    detail:
      'Choose the ready process with the highest priority. Ties are often resolved with FCFS or round-robin.',
  },
  {
    title: 'Preemption decision',
    detail:
      'If preemptive, interrupt the current process when a higher priority one arrives.',
  },
  {
    title: 'Aging / boosting',
    detail:
      'Gradually increase priority of waiting processes to ensure progress and avoid starvation.',
  },
]

const complexityNotes = [
  {
    title: 'Implementation cost',
    detail:
      'Priority queues or multiple run queues are needed. Dynamic priorities add accounting overhead.',
  },
  {
    title: 'Preemption overhead',
    detail:
      'Frequent preemption increases context switches and cache misses.',
  },
  {
    title: 'Priority inversion',
    detail:
      'Low-priority tasks holding a lock can block high-priority ones. Priority inheritance can mitigate this.',
  },
  {
    title: 'Policy tuning',
    detail:
      'Poorly tuned priorities can cause either starvation or sluggish response.',
  },
]

const realWorldUses = [
  {
    context: 'Real-time systems',
    detail:
      'Critical tasks must meet deadlines, so fixed-priority scheduling is used with strict guarantees.',
  },
  {
    context: 'Desktop OSes',
    detail:
      'Dynamic priorities keep interactive apps responsive while allowing background jobs to progress.',
  },
  {
    context: 'Server workloads',
    detail:
      'Priority tiers differentiate latency-sensitive requests from batch processing.',
  },
  {
    context: 'Embedded devices',
    detail:
      'Priority scheduling is common because tasks and priorities are usually known ahead of time.',
  },
]

const examples = [
  {
    title: 'Sample workload',
    code: `Process  Arrival  Burst  Priority
P1       0        6      2
P2       1        3      1
P3       2        8      3
P4       3        4      1`,
    explanation:
      'Lower numeric value means higher priority in this example.',
  },
  {
    title: 'Preemptive schedule sketch',
    code: `t=0: P1 runs
t=1: P2 arrives (higher priority) -> preempt P1
t=3: P2 finishes, P4 arrives (priority 1)
t=3-7: P4 runs, then P1 resumes`,
    explanation:
      'High-priority arrivals interrupt lower priority tasks, reducing response time for critical work.',
  },
  {
    title: 'Priority inheritance',
    code: `Low-priority task holds lock
High-priority task blocks on lock
Low-priority task temporarily inherits higher priority`,
    explanation:
      'Inheritance prevents unbounded priority inversion and keeps critical tasks moving.',
  },
]

const pitfalls = [
  'Starvation of low-priority jobs without aging or boosting.',
  'Priority inversion when low priority tasks hold needed resources.',
  'Misconfigured priority scales that do not reflect real task urgency.',
  'Too many priority levels, making tuning and debugging harder.',
  'Preempting too often, causing overhead and jitter.',
]

const decisionGuidance = [
  'Use priority scheduling when tasks have clear urgency or deadlines.',
  'Choose preemptive priority for responsiveness; non-preemptive for simplicity.',
  'Add aging to guarantee progress for low-priority tasks.',
  'Use priority inheritance in lock-heavy systems.',
  'Monitor starvation and jitter in production workloads.',
]

const advancedInsights = [
  {
    title: 'Priority inversion in practice',
    detail:
      'Mars Pathfinder experienced a priority inversion bug, later fixed with priority inheritance.',
  },
  {
    title: 'Deadline vs priority',
    detail:
      'Priority scheduling is different from EDF. Priorities are static; deadlines are dynamic.',
  },
  {
    title: 'Scheduling as policy',
    detail:
      'Priorities express system policy, not just performance optimization. They encode business or safety priorities.',
  },
  {
    title: 'Hybrid schedulers',
    detail:
      'Modern schedulers blend priorities with fairness or proportional-share systems.',
  },
]

const takeaways = [
  'Priority scheduling favors urgent work but risks starving low-priority tasks.',
  'Preemptive priority improves response time at the cost of overhead.',
  'Aging and inheritance are key techniques for fairness and correctness.',
  'Tuning priorities is a policy decision as much as a technical one.',
]

export default function PrioritySchedulingPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Priority Scheduling</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Scheduling by urgency, with fairness guards to avoid starvation</div>
              <p className="win95-text">
                Priority scheduling selects the process with the highest priority to run next. It can be non-preemptive or
                preemptive, and priorities may be fixed or dynamic. While it improves responsiveness for critical tasks, it must
                be paired with aging or inheritance to avoid starvation and inversion.
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
                Priority scheduling assigns a relative importance to tasks and always favors higher priority work. It is easy to
                reason about, yet it can produce unfairness unless mitigated by aging or priority inheritance. Many systems adopt
                dynamic priority adjustments to balance responsiveness and throughput.
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
                Priority scheduling is as much a policy decision as a technical one: priorities encode what the system values most.
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

