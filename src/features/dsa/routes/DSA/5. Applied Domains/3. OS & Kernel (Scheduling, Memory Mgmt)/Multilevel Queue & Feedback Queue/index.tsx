import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const overviewTiles = [
  {
    title: 'What it is',
    detail:
      'Two scheduling families: Multilevel Queue (MLQ) separates jobs by class, while Multilevel Feedback Queue (MLFQ) adapts priority based on behavior.',
  },
  {
    title: 'Why it matters',
    detail:
      'They balance responsiveness for interactive work with fairness for CPU-bound tasks, a core goal of modern OS schedulers.',
  },
  {
    title: 'What they require',
    detail:
      'Multiple ready queues, a policy for choosing queues, and rules for promotion, demotion, and boosting (for MLFQ).',
  },
  {
    title: 'What they optimize',
    detail:
      'Low response time for short tasks while still providing steady progress for long-running tasks.',
  },
]

const quickGlossary = [
  {
    term: 'Queue level',
    definition: 'A priority tier with its own scheduling policy and time quantum.',
  },
  {
    term: 'Time quantum',
    definition: 'The max CPU time a process gets before being preempted.',
  },
  {
    term: 'Promotion',
    definition:
      'Moving a process to a higher-priority queue (usually after waiting or yielding early).',
  },
  {
    term: 'Demotion',
    definition: 'Moving a process to a lower-priority queue after using a full time slice.',
  },
  {
    term: 'Boost',
    definition: 'Periodically moving all processes to the top queue to prevent starvation.',
  },
]

const historicalMilestones = [
  {
    title: '1960s: Multilevel queues in time-sharing',
    detail:
      'Early systems separated interactive, batch, and system jobs into distinct queues for responsiveness.',
  },
  {
    title: '1970s: Feedback queues emerge',
    detail:
      'Schedulers begin adapting priorities based on observed behavior rather than fixed classes.',
  },
  {
    title: '1980s: MLFQ becomes the teaching default',
    detail:
      'MLFQ is widely taught because it approximates shortest-job-first without explicit burst prediction.',
  },
  {
    title: '1990s+: Production schedulers adopt hybrid ideas',
    detail: 'Real kernels mix dynamic priorities, aging, and fairness inspired by MLFQ principles.',
  },
]

const mentalModels = [
  {
    title: 'Separate lanes on a highway',
    detail:
      'MLQ dedicates lanes to system, interactive, and batch traffic so urgent work stays fast.',
  },
  {
    title: 'Escalators between floors',
    detail: 'MLFQ moves tasks up or down based on how they use the CPU.',
  },
  {
    title: 'Short jobs float upward',
    detail: 'Tasks that frequently yield are rewarded with higher priority and shorter waits.',
  },
  {
    title: 'Long jobs drift downward',
    detail:
      'CPU-bound tasks use full quanta and get demoted to prevent them from blocking short jobs.',
  },
]

const policyCards = [
  {
    heading: 'Multilevel Queue (MLQ)',
    bullets: [
      'Fixed queues by class (system, interactive, batch).',
      'Each queue has its own policy (RR, FCFS, priority).',
      'Processes do not move between queues.',
    ],
  },
  {
    heading: 'Multilevel Feedback Queue (MLFQ)',
    bullets: [
      'Processes move between queues based on behavior.',
      'Interactive tasks stay high; CPU-bound tasks sink.',
      'Requires rules for promotion, demotion, and boosting.',
    ],
  },
  {
    heading: 'Aging and boosts',
    bullets: [
      'Aging increases priority of long-waiting tasks.',
      'Boosts reset priorities periodically.',
      'Prevents starvation in lower queues.',
    ],
  },
]

const schedulerMetrics = [
  {
    metric: 'Response time',
    meaning: 'Time to first CPU slice.',
    goal: 'Keep interactive apps responsive.',
  },
  {
    metric: 'Waiting time',
    meaning: 'Total time spent waiting in queues.',
    goal: 'Minimize delays, especially for short tasks.',
  },
  {
    metric: 'Turnaround time',
    meaning: 'Completion time - arrival time.',
    goal: 'Keep overall throughput high.',
  },
  {
    metric: 'Fairness',
    meaning: 'Progress across tasks over time.',
    goal: 'Avoid starvation in lower queues.',
  },
  {
    metric: 'Context switch rate',
    meaning: 'How often the CPU switches tasks.',
    goal: 'Avoid excessive overhead from tiny quanta.',
  },
]

const queueDesign = [
  {
    title: 'Queue count',
    detail: 'More queues allow finer control but increase tuning complexity.',
  },
  {
    title: 'Queue policies',
    detail: 'Interactive queues often use RR; lower queues use FCFS or longer RR slices.',
  },
  {
    title: 'Quantum sizing',
    detail: 'Higher queues use shorter quanta; lower queues use longer quanta for efficiency.',
  },
  {
    title: 'Preemption rule',
    detail: 'Higher-priority queues preempt lower ones to preserve responsiveness.',
  },
]

const algorithmSteps = [
  {
    title: 'Queue selection',
    detail:
      'Run the highest-priority non-empty queue; lower queues wait if higher ones are active.',
  },
  {
    title: 'Within-queue policy',
    detail: 'Each queue schedules with its own policy (e.g., RR in Q0, FCFS in Q2).',
  },
  {
    title: 'Feedback rule (MLFQ)',
    detail:
      'If a process uses its full quantum, demote it; if it yields early, keep or promote it.',
  },
  {
    title: 'Boost/aging',
    detail: 'Periodically move processes upward to prevent starvation and reclassify behavior.',
  },
]

const pseudocode = [
  {
    title: 'MLQ selection loop',
    code: `for each level from high to low:
  if queue[level] not empty:
    schedule(queue[level])
    break`,
    explanation: 'Always choose the highest-priority non-empty queue.',
  },
  {
    title: 'MLFQ demotion rule',
    code: `if process uses full quantum:
  move down one queue
else:
  keep same queue`,
    explanation: 'CPU-bound tasks sink; I/O-bound tasks stay higher.',
  },
  {
    title: 'Periodic boost',
    code: `every BOOST_INTERVAL:
  move all processes to top queue`,
    explanation: 'Prevents starvation and refreshes priorities.',
  },
]

const tuningGuidelines = [
  {
    title: 'Choose quanta by workload',
    detail:
      'Short quanta favor responsiveness; long quanta reduce overhead and increase throughput.',
  },
  {
    title: 'Set boost interval',
    detail: 'Too frequent boosts reduce differentiation; too rare boosts risk starvation.',
  },
  {
    title: 'Define class boundaries (MLQ)',
    detail: 'Fixed queues should correspond to stable workload categories, not transient behavior.',
  },
  {
    title: 'Observe and adjust',
    detail: 'Measure response time and throughput under real workloads and tune iteratively.',
  },
]

const complexityNotes = [
  {
    title: 'Implementation cost',
    detail: 'MLQ is straightforward; MLFQ adds bookkeeping for promotions, demotions, and aging.',
  },
  {
    title: 'Overhead vs responsiveness',
    detail:
      'Short time slices increase context switches, improving latency but reducing CPU efficiency.',
  },
  {
    title: 'Predictability tradeoff',
    detail: 'MLFQ adapts to workloads but makes exact performance harder to predict.',
  },
  {
    title: 'Starvation risk',
    detail: 'Without boosts or aging, lower queues can starve indefinitely.',
  },
]

const realWorldUses = [
  {
    context: 'Desktop OS scheduling',
    detail: 'Interactive tasks receive higher priority; background tasks sink to lower queues.',
  },
  {
    context: 'Server workloads',
    detail:
      'Latency-sensitive requests are kept high priority while batch jobs run in lower queues.',
  },
  {
    context: 'Embedded systems',
    detail: 'MLQ is used when task classes are fixed and predictability is key.',
  },
  {
    context: 'Teaching schedulers',
    detail: 'MLFQ demonstrates adaptive scheduling without explicit burst prediction.',
  },
]

const exampleLayouts = [
  {
    title: 'Three-queue layout',
    code: `Q0 (highest): RR, quantum 10ms
Q1: RR, quantum 20ms
Q2 (lowest): FCFS`,
    explanation: 'Short tasks get fast response; long tasks settle into Q2.',
  },
  {
    title: 'Common demotion rule',
    code: `if uses full slice -> demote
if yields early -> keep priority`,
    explanation: 'Behaviors drive queue movement instead of fixed classes.',
  },
]

const workedExample = [
  {
    title: 'Behavior-driven movement',
    code: `Q0 quantum=4, Q1 quantum=8, Q2 FCFS
P1 (CPU-bound) uses full Q0 -> move to Q1
P1 uses full Q1 -> move to Q2
P2 (I/O-bound) uses 2 then yields -> stays in Q0
P3 (mixed) uses 4 then yields -> stays in Q0`,
    explanation: 'CPU-bound tasks sink while interactive tasks remain high.',
  },
]

const comparisons = [
  {
    title: 'MLQ vs MLFQ',
    detail: 'MLQ has fixed classes; MLFQ adapts based on behavior, reducing manual classification.',
  },
  {
    title: 'MLFQ vs Round Robin',
    detail:
      'RR gives equal time to all; MLFQ gives more responsive service to short and interactive tasks.',
  },
  {
    title: 'MLFQ vs SRTF',
    detail: 'MLFQ approximates shortest-job-first without explicit burst prediction.',
  },
]

const pitfalls = [
  {
    mistake: 'Misconfigured quanta',
    description: 'Too short causes overhead; too long reduces responsiveness.',
  },
  {
    mistake: 'No boost or aging',
    description: 'Lower queues can starve without periodic promotion.',
  },
  {
    mistake: 'Overfitting parameters',
    description: 'Tuning to synthetic workloads can hurt real workloads.',
  },
  {
    mistake: 'Assuming class stability',
    description: 'Real workloads change behavior; MLQ can misclassify them.',
  },
]

const evaluationChecklist = [
  {
    title: 'Responsiveness achieved',
    detail: 'Do interactive tasks get CPU quickly and consistently?',
  },
  {
    title: 'Fairness preserved',
    detail: 'Do long jobs make steady progress without starvation?',
  },
  {
    title: 'Overhead acceptable',
    detail: 'Are context-switch costs reasonable for the chosen quanta?',
  },
  {
    title: 'Tuning stable',
    detail: 'Do performance metrics remain good across varying workloads?',
  },
]

const takeaways = [
  'MLQ separates work by class; MLFQ adapts based on behavior.',
  'MLFQ balances responsiveness and fairness without explicit burst prediction.',
  'Queue count, quantum sizing, and boost interval determine real performance.',
  'Aging and boosts are essential to prevent starvation.',
  'Modern schedulers are hybrids inspired by MLFQ principles.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-mental', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-policy', label: 'Policy Overview' },
    { id: 'core-metrics', label: 'Scheduling Metrics' },
    { id: 'core-design', label: 'Queue Design Choices' },
    { id: 'core-flow', label: 'Algorithm Flow' },
    { id: 'core-pseudocode', label: 'Pseudocode' },
    { id: 'core-tuning', label: 'Tuning Guidelines' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-realworld', label: 'Real-World Applications' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-evaluation', label: 'How to Evaluate a Scheduler' },
  ],
  examples: [
    { id: 'ex-layouts', label: 'Practical Examples' },
    { id: 'ex-movement', label: 'Queue Movement' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function MultilevelQueueFeedbackQueuePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Multilevel Queue &amp; Feedback Queue',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Multilevel Queue &amp; Feedback Queue"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Multilevel Queue &amp; Feedback Queue</h1>
      <p>
        Multilevel Queue (MLQ) and Multilevel Feedback Queue (MLFQ) divide ready processes into
        multiple queues with different policies and priorities. MLQ assigns processes to fixed
        classes, while MLFQ adapts to behavior by promoting or demoting processes over time. These
        strategies are the foundation for interactive scheduling in modern operating systems.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewTiles.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="bp-mental" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {takeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-policy" className="bin98-section">
            <h2 className="bin98-heading">Policy Overview</h2>
            {policyCards.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section id="core-metrics" className="bin98-section">
            <h2 className="bin98-heading">Scheduling Metrics</h2>
            {schedulerMetrics.map((row) => (
              <p key={row.metric}>
                <strong>{row.metric}:</strong> {row.meaning} {row.goal}
              </p>
            ))}
          </section>

          <section id="core-design" className="bin98-section">
            <h2 className="bin98-heading">Queue Design Choices</h2>
            {queueDesign.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-flow" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Flow</h2>
            {algorithmSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              MLFQ approximates shortest-job-first by observing behavior: short or I/O-bound jobs
              stay near the top, while CPU-bound jobs drift downward.
            </p>
          </section>

          <section id="core-pseudocode" className="bin98-section">
            <h2 className="bin98-heading">Pseudocode</h2>
            {pseudocode.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="core-tuning" className="bin98-section">
            <h2 className="bin98-heading">Tuning Guidelines</h2>
            {tuningGuidelines.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Tradeoffs</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
          </section>

          <section id="core-realworld" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((pitfall) => (
                <li key={pitfall.mistake}>
                  <strong>{pitfall.mistake}:</strong> {pitfall.description}
                </li>
              ))}
            </ul>
          </section>

          <section id="core-evaluation" className="bin98-section">
            <h2 className="bin98-heading">How to Evaluate a Scheduler</h2>
            {evaluationChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-layouts" className="bin98-section">
            <h2 className="bin98-heading">Practical Examples</h2>
            {exampleLayouts.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-movement" className="bin98-section">
            <h2 className="bin98-heading">Walkthrough: Queue Movement</h2>
            {workedExample.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
