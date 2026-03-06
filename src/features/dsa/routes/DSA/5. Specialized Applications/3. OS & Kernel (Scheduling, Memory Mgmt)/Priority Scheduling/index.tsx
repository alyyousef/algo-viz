import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
    detail: 'Choose the ready process with the highest priority. Resolve ties with FCFS or Round Robin.',
  },
  {
    title: 'Preemption check',
    detail: 'If the scheduler is preemptive, interrupt the current process when a higher-priority process arrives.',
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
    detail: 'Priority queues or multiple run queues are required; dynamic priorities add accounting overhead.',
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
    detail: 'Dynamic priority keeps interactive apps responsive while background jobs still progress.',
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
    detail: 'The Mars Pathfinder mission experienced inversion and was fixed with priority inheritance.',
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

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

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

const priorityHelpStyles = `
.priority-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.priority-help-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.priority-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 22px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.priority-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.priority-help-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.priority-help-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  font-family: inherit;
  cursor: pointer;
}

.priority-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.priority-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
}

.priority-help-tab.is-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.priority-help-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.priority-help-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.priority-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.priority-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.priority-help-toc-list li {
  margin: 0 0 8px;
}

.priority-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.priority-help-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.priority-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.priority-help-section {
  margin: 0 0 20px;
}

.priority-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.priority-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.priority-help-content p,
.priority-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.priority-help-content p {
  margin: 0 0 10px;
}

.priority-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.priority-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.priority-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  overflow-x: auto;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.priority-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .priority-help-main {
    grid-template-columns: 1fr;
  }

  .priority-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .priority-help-title {
    position: static;
    transform: none;
    margin-right: 8px;
    font-size: 13px;
  }
}
`

export default function PrioritySchedulingPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Priority Scheduling (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Priority Scheduling',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="priority-help-page">
      <style>{priorityHelpStyles}</style>
      <div className="priority-help-window" role="presentation">
        <header className="priority-help-titlebar">
          <span className="priority-help-title">Priority Scheduling</span>
          <div className="priority-help-title-controls">
            <button className="priority-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="priority-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="priority-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`priority-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="priority-help-main">
          <aside className="priority-help-toc" aria-label="Table of contents">
            <h2 className="priority-help-toc-title">Contents</h2>
            <ul className="priority-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="priority-help-content">
            <h1 className="priority-help-doc-title">Priority Scheduling</h1>
            <p>
              Priority scheduling selects the ready process with the highest priority to run next. It can be non-preemptive or
              preemptive, and priorities may be fixed or dynamic. The policy improves responsiveness for critical work, but it
              needs fairness controls such as aging and inversion controls such as inheritance when locks are involved.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="priority-help-section">
                  <h2 className="priority-help-heading">Overview</h2>
                  {overviewTiles.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="priority-help-divider" />

                <section id="bp-history" className="priority-help-section">
                  <h2 className="priority-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="bp-mental" className="priority-help-section">
                  <h2 className="priority-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="bp-takeaways" className="priority-help-section">
                  <h2 className="priority-help-heading">Key Takeaways</h2>
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
                <section id="core-policy" className="priority-help-section">
                  <h2 className="priority-help-heading">Policy Overview</h2>
                  {policyCards.map((block) => (
                    <div key={block.heading}>
                      <h3 className="priority-help-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-metrics" className="priority-help-section">
                  <h2 className="priority-help-heading">Scheduling Metrics</h2>
                  {schedulerMetrics.map((row) => (
                    <p key={row.metric}>
                      <strong>{row.metric}:</strong> {row.meaning} {row.goal}
                    </p>
                  ))}
                </section>

                <section id="core-flow" className="priority-help-section">
                  <h2 className="priority-help-heading">Algorithm Flow</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Priority scheduling is both a technical mechanism and a policy choice. It determines what the system values
                    most when not every process can run at once.
                  </p>
                </section>

                <section id="core-pseudocode" className="priority-help-section">
                  <h2 className="priority-help-heading">Pseudocode</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="priority-help-subheading">{example.title}</h3>
                      <div className="priority-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="core-inversion" className="priority-help-section">
                  <h2 className="priority-help-heading">Priority Inversion and Mitigation</h2>
                  <p>
                    Priority inversion happens when a low-priority task blocks a high-priority task by holding a needed lock.
                    The scheduler may want to run the urgent task, but resource ownership forces the opposite order.
                  </p>
                  {inversionMitigation.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="priority-help-section">
                  <h2 className="priority-help-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>

                <section id="core-realworld" className="priority-help-section">
                  <h2 className="priority-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-decisions" className="priority-help-section">
                  <h2 className="priority-help-heading">When to Use It</h2>
                  {decisionGuidance.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-advanced" className="priority-help-section">
                  <h2 className="priority-help-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="priority-help-section">
                  <h2 className="priority-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="core-evaluation" className="priority-help-section">
                  <h2 className="priority-help-heading">Evaluation Checklist</h2>
                  {evaluationChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="priority-help-section">
                <h2 className="priority-help-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="priority-help-subheading">{example.title}</h3>
                    <div className="priority-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="priority-help-section">
                <h2 className="priority-help-heading">Glossary</h2>
                {quickGlossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
