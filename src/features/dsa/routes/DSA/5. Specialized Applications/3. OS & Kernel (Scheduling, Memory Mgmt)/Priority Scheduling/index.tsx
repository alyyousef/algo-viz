import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const overviewTiles = [
  {
    title: 'What it is',
    detail:
      'A scheduling policy that assigns each process a priority and always runs the most important ready process.',
  },
  {
    title: 'Why it matters',
    detail:
      'It encodes system policy: critical tasks get CPU first, improving responsiveness and deadline adherence.',
  },
  {
    title: 'What it requires',
    detail:
      'Priority values, a tie-breaking rule, and fairness guards (aging, boosts, inheritance).',
  },
  {
    title: 'What it risks',
    detail:
      'Starvation for low-priority tasks and priority inversion if resource locks are not handled carefully.',
  },
]

const quickGlossary = [
  {
    term: 'Priority',
    definition: 'A ranking that determines which process should run first.',
  },
  {
    term: 'Preemption',
    definition: 'Interrupting a running process when a higher-priority process becomes ready.',
  },
  {
    term: 'Priority inversion',
    definition: 'A low-priority task blocks a high-priority task by holding a needed resource.',
  },
  {
    term: 'Priority inheritance',
    definition: 'Temporarily boosting a low-priority task so it can release a resource faster.',
  },
  {
    term: 'Aging',
    definition: 'Gradually increasing a waiting process’s priority to prevent starvation.',
  },
]

const historicalMilestones = [
  {
    title: '1960s: Fixed priorities in early OSes',
    detail:
      'System and I/O services were given higher priority to ensure reliability in batch processing.',
  },
  {
    title: '1970s: Dynamic priorities for interactivity',
    detail:
      'Schedulers began adjusting priority based on CPU usage to keep interactive workloads responsive.',
  },
  {
    title: '1980s: Real-time fixed-priority theory',
    detail:
      'Rate Monotonic and Deadline Monotonic scheduling formalized guarantees for periodic tasks.',
  },
  {
    title: '1990s+: Hybrid schedulers',
    detail:
      'Modern kernels combine priorities with fairness and load balancing to reduce starvation.',
  },
]

const mentalModels = [
  {
    title: 'VIP lane at the CPU',
    detail:
      'High-priority tasks get immediate service, even if others have been waiting longer.',
  },
  {
    title: 'Budgeted attention',
    detail:
      'Priorities define how much CPU attention each task deserves relative to others.',
  },
  {
    title: 'Starvation risk',
    detail:
      'If high-priority work keeps arriving, low-priority tasks may wait indefinitely without aging.',
  },
  {
    title: 'Locks can flip the order',
    detail:
      'Priority inversion occurs when resource ownership overrides priority ordering.',
  },
]

const policyCards = [
  {
    heading: 'Non-preemptive priority',
    bullets: [
      'Run the highest priority job to completion.',
      'Lower overhead and simpler implementation.',
      'Urgent jobs may wait if a low-priority job is running.',
    ],
  },
  {
    heading: 'Preemptive priority',
    bullets: [
      'Interrupt running tasks when a higher priority arrives.',
      'Best response time for critical work.',
      'Higher context-switch overhead and starvation risk.',
    ],
  },
  {
    heading: 'Dynamic priority',
    bullets: [
      'Priority changes with behavior or waiting time.',
      'Aging boosts long-waiting processes.',
      'Balances responsiveness and fairness.',
    ],
  },
]

const schedulerMetrics = [
  {
    metric: 'Response time',
    meaning: 'Arrival to first execution.',
    goal: 'Critical for interactive and real-time tasks.',
  },
  {
    metric: 'Fairness',
    meaning: 'Progress across priority levels.',
    goal: 'Prevent starvation and extreme delays.',
  },
  {
    metric: 'Predictability',
    meaning: 'Consistency of scheduling behavior.',
    goal: 'Required in real-time systems.',
  },
  {
    metric: 'Overhead',
    meaning: 'Cost of context switching and bookkeeping.',
    goal: 'Keep CPU time for actual work.',
  },
]

const algorithmSteps = [
  {
    title: 'Priority selection',
    detail: 'Choose the ready process with the highest priority. Resolve ties with FCFS or RR.',
  },
  {
    title: 'Preemption check',
    detail: 'If preemptive, interrupt the current process when a higher-priority process arrives.',
  },
  {
    title: 'Aging and boosts',
    detail: 'Increase priority of waiting processes to ensure progress and reduce starvation.',
  },
]

const pseudocode = [
  {
    title: 'Priority selection loop',
    code: `readyQueue = priority queue
on arrival(p): insert(p)
if CPU idle: run(extractMax())
if preemptive and new.priority > running.priority:
  preempt(running)
  run(extractMax())`,
    explanation: 'Highest priority always wins; preemption is optional.',
  },
  {
    title: 'Aging policy',
    code: `every T:
  for each waiting process:
    priority += agingBoost`,
    explanation: 'Aging raises long-waiting tasks to prevent starvation.',
  },
  {
    title: 'Priority inheritance (lock)',
    code: `if high waits on lock held by low:
  low.priority = max(low.priority, high.priority)`,
    explanation: 'Inheritance prevents unbounded inversion.',
  },
]

const complexityNotes = [
  {
    title: 'Implementation cost',
    detail: 'Priority queues or multiple run queues are required; dynamic priorities add accounting.',
  },
  {
    title: 'Preemption overhead',
    detail: 'Frequent preemption increases context switches and cache misses.',
  },
  {
    title: 'Priority inversion risk',
    detail: 'Locks can block high-priority tasks unless inheritance/ceiling is used.',
  },
  {
    title: 'Policy tuning',
    detail: 'Poor priority scales can cause either starvation or sluggish response.',
  },
]

const inversionMitigation = [
  {
    title: 'Priority inheritance',
    detail: 'Boosts the lock holder to the highest waiting priority until the lock is released.',
  },
  {
    title: 'Priority ceiling',
    detail: 'A lock has a ceiling priority; acquiring it raises the holder immediately.',
  },
  {
    title: 'Avoid long critical sections',
    detail: 'Shorter lock holds reduce inversion impact.',
  },
]

const realWorldUses = [
  {
    context: 'Real-time systems',
    detail: 'Fixed-priority scheduling ensures high-criticality tasks meet deadlines.',
  },
  {
    context: 'Desktop OSes',
    detail: 'Dynamic priority keeps interactive apps responsive while background jobs still progress.',
  },
  {
    context: 'Server workloads',
    detail: 'Priority tiers separate latency-sensitive requests from batch processing.',
  },
  {
    context: 'Embedded devices',
    detail: 'Priorities are usually known ahead of time, making static scheduling practical.',
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
    explanation: 'Lower numeric value means higher priority in this example.',
  },
  {
    title: 'Preemptive schedule sketch',
    code: `t=0: P1 runs
t=1: P2 arrives (higher priority) -> preempt P1
t=3: P2 finishes, P4 arrives (priority 1)
t=3-7: P4 runs, then P1 resumes`,
    explanation: 'Higher-priority arrivals interrupt lower priority tasks.',
  },
  {
    title: 'Priority inversion scenario',
    code: `Low-priority holds lock L
High-priority waits on L
Medium-priority keeps running
=> High-priority starves until low runs`,
    explanation: 'Inheritance or ceiling protocols prevent this.',
  },
]

const pitfalls = [
  {
    mistake: 'Starvation of low-priority jobs',
    description: 'Without aging or boosts, low priority tasks can wait forever.',
  },
  {
    mistake: 'Priority inversion',
    description: 'Low priority tasks holding locks can block high priority tasks.',
  },
  {
    mistake: 'Overtuning priorities',
    description: 'Too many levels make tuning and debugging difficult.',
  },
  {
    mistake: 'Ignoring preemption cost',
    description: 'Preempting too often adds overhead and jitter.',
  },
]

const decisionGuidance = [
  {
    title: 'Use priorities for urgency',
    detail: 'Ideal when tasks have clear criticality or deadlines.',
  },
  {
    title: 'Choose preemption for latency',
    detail: 'Preemptive priority improves responsiveness but increases overhead.',
  },
  {
    title: 'Add aging for fairness',
    detail: 'Guarantee progress for low-priority jobs.',
  },
  {
    title: 'Use inheritance for locks',
    detail: 'Protect high-priority tasks from inversion.',
  },
]

const advancedInsights = [
  {
    title: 'Priority inversion in practice',
    detail: 'The Mars Pathfinder mission experienced inversion, fixed with priority inheritance.',
  },
  {
    title: 'Priority vs deadline',
    detail: 'Priority scheduling uses static ranks; EDF uses dynamic deadlines.',
  },
  {
    title: 'Priority as policy',
    detail: 'Priorities encode business and safety priorities, not just performance metrics.',
  },
  {
    title: 'Hybrid schedulers',
    detail: 'Modern kernels combine priority with fairness and CPU usage accounting.',
  },
]

const evaluationChecklist = [
  {
    title: 'Responsiveness',
    detail: 'Do high-priority tasks meet response or deadline goals?',
  },
  {
    title: 'Fairness',
    detail: 'Do low-priority tasks make steady progress?',
  },
  {
    title: 'Inversion control',
    detail: 'Are inheritance/ceiling policies implemented for lock-heavy workloads?',
  },
  {
    title: 'Overhead',
    detail: 'Is preemption cost acceptable for the workload?',
  },
]

const takeaways = [
  'Priority scheduling favors urgent work but risks starvation without aging.',
  'Preemptive priority improves response time at the cost of overhead.',
  'Priority inversion must be mitigated with inheritance or ceiling protocols.',
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
                Priority scheduling is both a technical mechanism and a policy choice: it decides what the system values most.
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
            <legend>Priority Inversion Mitigation</legend>
            <div className="win95-grid win95-grid-2">
              {inversionMitigation.map((item) => (
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
