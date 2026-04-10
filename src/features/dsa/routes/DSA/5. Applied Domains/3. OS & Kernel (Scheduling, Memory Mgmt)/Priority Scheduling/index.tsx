import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
      'Priority values, a tie-breaking rule, and fairness guards such as aging, boosts, or inheritance.',
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
    definition: "Gradually increasing a waiting process's priority to prevent starvation.",
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
    detail: 'High-priority tasks get immediate service, even if others have been waiting longer.',
  },
  {
    title: 'Budgeted attention',
    detail: 'Priorities define how much CPU attention each task deserves relative to others.',
  },
  {
    title: 'Starvation risk',
    detail:
      'If high-priority work keeps arriving, low-priority tasks may wait indefinitely without aging.',
  },
  {
    title: 'Locks can flip the order',
    detail: 'Priority inversion occurs when resource ownership overrides priority ordering.',
  },
]

const policyCards = [
  {
    heading: 'Non-preemptive priority',
    bullets: [
      'Run the highest priority job to completion.',
      'Lower overhead and simpler implementation.',
      'Urgent jobs may wait if a low-priority job is already running.',
    ],
  },
  {
    heading: 'Preemptive priority',
    bullets: [
      'Interrupt running tasks when a higher-priority process arrives.',
      'Best response time for critical work.',
      'Higher context-switch overhead and stronger starvation risk.',
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
    goal: 'Keep CPU time focused on actual work.',
  },
]

const algorithmSteps = [
  {
    title: 'Priority selection',
    detail:
      'Choose the ready process with the highest priority. Resolve ties with FCFS or Round Robin.',
  },
  {
    title: 'Preemption check',
    detail:
      'If the scheduler is preemptive, interrupt the current process when a higher-priority process arrives.',
  },
  {
    title: 'Aging and boosts',
    detail: 'Increase the priority of waiting processes so they still make progress over time.',
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
    title: 'Priority inheritance for locks',
    code: `if high waits on lock held by low:
  low.priority = max(low.priority, high.priority)`,
    explanation: 'Inheritance prevents unbounded inversion.',
  },
]

const complexityNotes = [
  {
    title: 'Implementation cost',
    detail:
      'Priority queues or multiple run queues are required; dynamic priorities add accounting overhead.',
  },
  {
    title: 'Preemption overhead',
    detail: 'Frequent preemption increases context switches and cache misses.',
  },
  {
    title: 'Priority inversion risk',
    detail: 'Locks can block high-priority tasks unless inheritance or ceiling protocols are used.',
  },
  {
    title: 'Policy tuning',
    detail: 'Poor priority scales can cause either starvation or sluggish response.',
  },
]

const inversionMitigation = [
  {
    title: 'Priority inheritance',
    detail: 'Boost the lock holder to the highest waiting priority until the lock is released.',
  },
  {
    title: 'Priority ceiling',
    detail: 'A lock has a ceiling priority; acquiring it raises the holder immediately.',
  },
  {
    title: 'Avoid long critical sections',
    detail: 'Shorter lock holds reduce the time that inversion can hurt critical tasks.',
  },
]

const realWorldUses = [
  {
    context: 'Real-time systems',
    detail: 'Fixed-priority scheduling ensures high-criticality tasks meet deadlines.',
  },
  {
    context: 'Desktop OSes',
    detail:
      'Dynamic priority keeps interactive apps responsive while background jobs still progress.',
  },
  {
    context: 'Server workloads',
    detail: 'Priority tiers separate latency-sensitive requests from batch processing.',
  },
  {
    context: 'Embedded devices',
    detail: 'Priorities are often known ahead of time, making static scheduling practical.',
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
    explanation: 'Higher-priority arrivals interrupt lower-priority tasks.',
  },
  {
    title: 'Priority inversion scenario',
    code: `Low-priority holds lock L
High-priority waits on L
Medium-priority keeps running
=> High-priority starves until low runs`,
    explanation: 'Inheritance or ceiling protocols prevent this outcome.',
  },
]

const pitfalls = [
  {
    mistake: 'Starvation of low-priority jobs',
    description: 'Without aging or boosts, low-priority tasks can wait forever.',
  },
  {
    mistake: 'Priority inversion',
    description: 'Low-priority tasks holding locks can block high-priority tasks.',
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
    detail: 'Priority scheduling fits systems where tasks have clear criticality or deadlines.',
  },
  {
    title: 'Choose preemption for latency',
    detail: 'Preemptive priority improves responsiveness but increases switching overhead.',
  },
  {
    title: 'Add aging for fairness',
    detail: 'Aging guarantees progress for lower-priority jobs.',
  },
  {
    title: 'Use inheritance for locks',
    detail: 'Priority inheritance protects urgent tasks from inversion.',
  },
]

const advancedInsights = [
  {
    title: 'Priority inversion in practice',
    detail:
      'The Mars Pathfinder mission experienced inversion and was fixed with priority inheritance.',
  },
  {
    title: 'Priority vs deadline',
    detail: 'Priority scheduling uses rank; EDF uses changing deadlines to decide who runs next.',
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
    detail: 'Do low-priority tasks still make steady progress?',
  },
  {
    title: 'Inversion control',
    detail: 'Are inheritance or ceiling policies implemented for lock-heavy workloads?',
  },
  {
    title: 'Overhead',
    detail: 'Is the cost of preemption acceptable for the workload?',
  },
]

const takeaways = [
  'Priority scheduling favors urgent work but risks starvation without aging.',
  'Preemptive priority improves response time at the cost of extra overhead.',
  'Priority inversion must be mitigated with inheritance or ceiling protocols.',
  'Tuning priorities is a policy decision as much as a technical one.',
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
    { id: 'core-flow', label: 'Algorithm Flow' },
    { id: 'core-pseudocode', label: 'Pseudocode' },
    { id: 'core-inversion', label: 'Priority Inversion' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-realworld', label: 'Real-World Applications' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-evaluation', label: 'Evaluation Checklist' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function PrioritySchedulingPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Priority Scheduling',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Priority Scheduling"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Priority Scheduling</h1>
      <p>
        Priority scheduling selects the ready process with the highest priority to run next. It can
        be non-preemptive or preemptive, and priorities may be fixed or dynamic. The policy improves
        responsiveness for critical work, but it needs fairness controls such as aging and inversion
        controls such as inheritance when locks are involved.
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

          <section id="core-flow" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Flow</h2>
            {algorithmSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Priority scheduling is both a technical mechanism and a policy choice. It determines
              what the system values most when not every process can run at once.
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

          <section id="core-inversion" className="bin98-section">
            <h2 className="bin98-heading">Priority Inversion and Mitigation</h2>
            <p>
              Priority inversion happens when a low-priority task blocks a high-priority task by
              holding a needed lock. The scheduler may want to run the urgent task, but resource
              ownership forces the opposite order.
            </p>
            {inversionMitigation.map((item) => (
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

          <section id="core-decisions" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            {decisionGuidance.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
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
            <h2 className="bin98-heading">Evaluation Checklist</h2>
            {evaluationChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-practical" className="bin98-section">
          <h2 className="bin98-heading">Practical Examples</h2>
          {examples.map((example) => (
            <div key={example.title}>
              <h3 className="bin98-subheading">{example.title}</h3>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
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
