import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Multilevel queues appear in time-sharing systems (1960s)',
    detail:
      'Early OSes separated interactive, batch, and system tasks to keep critical work responsive.',
  },
  {
    title: 'Feedback queues refine interactivity (1970s)',
    detail:
      'Schedulers begin adapting priorities based on observed behavior, improving response time for short jobs.',
  },
  {
    title: 'MLFQ becomes the default teaching scheduler (1980s)',
    detail:
      'Multilevel Feedback Queue (MLFQ) is popular in OS courses for combining responsiveness and fairness.',
  },
  {
    title: 'Modern kernels blend MLFQ ideas with priorities (1990s+)',
    detail:
      'Production schedulers use dynamic priorities, aging, and CPU usage accounting inspired by MLFQ.',
  },
]

const mentalModels = [
  {
    title: 'Separate lanes for traffic types',
    detail:
      'Multilevel queues dedicate lanes to batch, interactive, and system processes, each with its own rules.',
  },
  {
    title: 'Promotion and demotion escalators',
    detail:
      'Feedback queues move processes between levels depending on how they use the CPU.',
  },
  {
    title: 'Short jobs rise to the top',
    detail:
      'Jobs that frequently yield stay in high-priority queues, improving responsiveness for interactive workloads.',
  },
]

const policyCards = [
  {
    heading: 'Multilevel Queue (MLQ)',
    bullets: [
      'Multiple fixed queues by class (system, interactive, batch).',
      'Each queue has its own scheduling policy (e.g., RR for interactive).',
      'Processes do not move between queues.',
    ],
  },
  {
    heading: 'Multilevel Feedback Queue (MLFQ)',
    bullets: [
      'Processes move between queues based on behavior.',
      'Interactive tasks stay high; CPU-bound tasks sink lower.',
      'Needs parameters: number of queues, time slices, promotion rules.',
    ],
  },
  {
    heading: 'Aging and boosts',
    bullets: [
      'Periodic priority boosts prevent starvation.',
      'Aging increases priority for long-waiting tasks.',
      'Used to balance fairness with responsiveness.',
    ],
  },
]

const schedulerMetrics = [
  {
    metric: 'Response time',
    meaning: 'Time to first CPU slice.',
    goal: 'Small to keep UI and interactive apps responsive.',
  },
  {
    metric: 'Fairness',
    meaning: 'Long-running jobs eventually get CPU.',
    goal: 'Prevent starvation across queues.',
  },
  {
    metric: 'Throughput',
    meaning: 'Jobs completed per unit time.',
    goal: 'Keep the system productive.',
  },
  {
    metric: 'Context switch rate',
    meaning: 'Frequency of preemption.',
    goal: 'Too many switches waste CPU time.',
  },
]

const algorithmSteps = [
  {
    title: 'Queue selection',
    detail:
      'Always pick the highest-priority non-empty queue. Lower queues run only when higher queues are empty.',
  },
  {
    title: 'Within-queue policy',
    detail:
      'Each queue can use its own policy (RR, FCFS, SJF). Interactive queues often use shorter time slices.',
  },
  {
    title: 'Feedback rules (MLFQ)',
    detail:
      'If a process uses its full time slice, demote it. If it yields early, keep or promote it.',
  },
  {
    title: 'Periodic boosts',
    detail:
      'Regularly move all processes to the top to avoid starvation and stale classification.',
  },
]

const complexityNotes = [
  {
    title: 'Implementation cost',
    detail:
      'MLQ is simple: maintain multiple ready queues. MLFQ adds bookkeeping for promotions, demotions, and aging.',
  },
  {
    title: 'Parameter tuning',
    detail:
      'Queue count, time quanta, and boost intervals strongly affect behavior and require tuning.',
  },
  {
    title: 'Overhead',
    detail:
      'Short time slices improve responsiveness but increase context switches.',
  },
  {
    title: 'Predictability tradeoff',
    detail:
      'MLFQ adapts to workload but makes exact performance harder to predict.',
  },
]

const realWorldUses = [
  {
    context: 'Desktop operating systems',
    detail:
      'Interactive tasks receive higher priority to keep the UI responsive, while background tasks get longer quanta.',
  },
  {
    context: 'Server workloads',
    detail:
      'Schedulers distinguish latency-sensitive requests from batch processing to meet SLAs.',
  },
  {
    context: 'Embedded systems',
    detail:
      'Simpler multilevel queues are used when workloads are predictable and priorities are fixed.',
  },
  {
    context: 'Teaching schedulers',
    detail:
      'MLFQ is a canonical example of adaptive scheduling in OS courses.',
  },
]

const examples = [
  {
    title: 'Queue layout example',
    code: `Q0 (highest): Round Robin, 10ms
Q1: Round Robin, 20ms
Q2 (lowest): FCFS`,
    explanation:
      'Interactive tasks typically start in Q0. CPU-bound tasks that consume full quanta move down.',
  },
  {
    title: 'Behavior-based demotion',
    code: `If process uses entire time slice:
  move down one queue
If process yields early:
  stay or move up`,
    explanation:
      'These rules bias the scheduler toward responsiveness without explicit job length estimates.',
  },
  {
    title: 'Priority boost',
    code: `Every 1 second:
  move all processes to Q0`,
    explanation:
      'Boosting prevents long-running tasks from starving and re-evaluates their behavior.',
  },
]

const pitfalls = [
  'Misconfigured time slices that cause excessive context switching or sluggish response.',
  'Failure to boost priorities, leading to starvation in lower queues.',
  'Assuming workload classes are static; real workloads can change over time.',
  'Treating MLFQ as a silver bullet; parameter tuning still matters.',
  'Overcomplicating queue structures without measurable benefit.',
]

const decisionGuidance = [
  'Use MLQ when process classes are well-defined and static.',
  'Use MLFQ when workloads are dynamic and you need adaptive prioritization.',
  'Tune quanta based on response time goals and context switch cost.',
  'Implement periodic boosts or aging to maintain fairness.',
  'Measure with real workloads; adjust parameters iteratively.',
]

const advancedInsights = [
  {
    title: 'Interactive bias',
    detail:
      'Short quantum queues keep interactive tasks responsive but can reduce throughput if overused.',
  },
  {
    title: 'I/O-bound boost effect',
    detail:
      'I/O-bound tasks naturally yield early and remain high priority, which is desirable for responsiveness.',
  },
  {
    title: 'CPU-bound demotion',
    detail:
      'CPU-heavy tasks drift to lower queues, letting short tasks finish quickly.',
  },
  {
    title: 'Modern scheduler parallels',
    detail:
      'Linux CFS and Windows schedulers use dynamic priorities and fairness metrics similar to MLFQ principles.',
  },
]

const takeaways = [
  'MLQ separates work by class, while MLFQ adapts based on observed behavior.',
  'MLFQ balances responsiveness and fairness without explicit job length estimates.',
  'Correct tuning of queue count and time slices is crucial.',
  'Periodic boosts prevent starvation and reset misclassified tasks.',
]

export default function MultilevelQueueFeedbackQueuePage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Multilevel Queue &amp; Feedback Queue</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Adaptive scheduling layers that balance responsiveness and fairness</div>
              <p className="win95-text">
                Multilevel Queue (MLQ) and Multilevel Feedback Queue (MLFQ) divide ready processes into multiple queues with
                different policies and priorities. MLQ assigns processes to fixed classes, while MLFQ adapts to behavior by
                promoting or demoting processes over time. These strategies form the foundation of modern interactive schedulers.
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
                MLQ and MLFQ are designed for systems with diverse workloads. By separating or dynamically classifying tasks, they
                keep short, interactive tasks responsive while still ensuring CPU-bound work progresses. The tradeoff is higher
                scheduling complexity and the need for careful tuning.
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
                MLFQ behaves like a self-tuning scheduler: tasks show their behavior, and the scheduler adapts their priority without
                explicit job length predictions.
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

