import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-uses', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-basics', label: 'Core Concepts' },
    { id: 'core-metrics', label: 'Scheduling Metrics' },
    { id: 'core-flow', label: 'Algorithm Flow' },
    { id: 'core-quantum', label: 'Quantum Selection' },
    { id: 'core-tradeoffs', label: 'Complexity and Tradeoffs' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-guidance', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-evaluate', label: 'How to Evaluate RR' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode' },
    { id: 'ex-worked', label: 'Practical Examples' },
    { id: 'ex-timeline', label: 'Step-by-Step Timeline' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const roundRobinHelpStyles = `
.rr-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.rr-help-window {
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.rr-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.rr-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.rr-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.rr-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.rr-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.rr-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  color: #000;
  font-size: 12px;
  cursor: pointer;
}

.rr-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.rr-help-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #fff;
}

.rr-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.rr-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.rr-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.rr-help-toc-list li {
  margin: 0 0 8px;
}

.rr-help-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.rr-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.rr-help-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.rr-help-intro {
  margin: 0 0 16px;
}

.rr-help-section {
  margin: 0 0 22px;
}

.rr-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.rr-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.rr-help-content p,
.rr-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.rr-help-content p {
  margin: 0 0 10px;
}

.rr-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.rr-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.rr-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.rr-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .rr-help-main {
    grid-template-columns: 1fr;
  }

  .rr-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .rr-help-content {
    padding: 12px 14px 16px;
  }

  .rr-help-title {
    position: static;
    transform: none;
    margin: 0 auto;
    text-align: center;
  }
}
`

export default function RoundRobinSchedulingPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = (() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })()
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Round Robin Scheduling (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: false })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Round Robin Scheduling',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }

    try {
      const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
      const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
      const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
      window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))
    } catch {
      // Ignore storage issues and keep navigation behavior intact.
    }

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }

    void navigate('/algoViz')
  }

  return (
    <div className="rr-help-page">
      <style>{roundRobinHelpStyles}</style>
      <div className="rr-help-window" role="presentation">
        <header className="rr-help-titlebar">
          <span className="rr-help-title">Round Robin Scheduling - Help</span>
          <div className="rr-help-controls">
            <button className="rr-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="rr-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="rr-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`rr-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rr-help-main">
          <aside className="rr-help-toc" aria-label="Table of contents">
            <h2 className="rr-help-toc-title">Contents</h2>
            <ul className="rr-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="rr-help-content">
            <h1 className="rr-help-doc-title">Round Robin Scheduling</h1>
            <p className="rr-help-intro">
              Round robin scheduling gives each process a fixed time quantum, cycling through the ready queue in FIFO order. It is
              simple, fair, and predictable for interactive workloads, but its effectiveness depends heavily on quantum size and
              context-switch overhead.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="rr-help-section">
                  <h2 className="rr-help-heading">Overview</h2>
                  {overviewTiles.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="rr-help-divider" />

                <section id="bp-history" className="rr-help-section">
                  <h2 className="rr-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="bp-models" className="rr-help-section">
                  <h2 className="rr-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="bp-uses" className="rr-help-section">
                  <h2 className="rr-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="bp-takeaways" className="rr-help-section">
                  <h2 className="rr-help-heading">Key Takeaways</h2>
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
                <section id="core-basics" className="rr-help-section">
                  <h2 className="rr-help-heading">Core Concepts</h2>
                  {coreConcepts.map((block) => (
                    <div key={block.heading}>
                      <h3 className="rr-help-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-metrics" className="rr-help-section">
                  <h2 className="rr-help-heading">Scheduling Metrics</h2>
                  {schedulerMetrics.map((row) => (
                    <p key={row.metric}>
                      <strong>{row.metric}:</strong> {row.meaning} <strong>Why it matters:</strong> {row.goal}
                    </p>
                  ))}
                </section>

                <section id="core-flow" className="rr-help-section">
                  <h2 className="rr-help-heading">Algorithm Flow</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    <strong>Main tuning lever:</strong> The quantum is the main tuning lever: smaller values improve interactivity;
                    larger values improve throughput and cache reuse.
                  </p>
                </section>

                <section id="core-quantum" className="rr-help-section">
                  <h2 className="rr-help-heading">Quantum Selection Guidelines</h2>
                  {quantumGuidelines.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-tradeoffs" className="rr-help-section">
                  <h2 className="rr-help-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-compare" className="rr-help-section">
                  <h2 className="rr-help-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="rr-help-section">
                  <h2 className="rr-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="core-guidance" className="rr-help-section">
                  <h2 className="rr-help-heading">When to Use It</h2>
                  {decisionGuidance.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-advanced" className="rr-help-section">
                  <h2 className="rr-help-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-evaluate" className="rr-help-section">
                  <h2 className="rr-help-heading">How to Evaluate RR</h2>
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
                <section id="ex-pseudocode" className="rr-help-section">
                  <h2 className="rr-help-heading">Pseudocode</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="rr-help-subheading">{example.title}</h3>
                      <div className="rr-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-worked" className="rr-help-section">
                  <h2 className="rr-help-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="rr-help-subheading">{example.title}</h3>
                      <div className="rr-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-timeline" className="rr-help-section">
                  <h2 className="rr-help-heading">Step-by-Step Timeline</h2>
                  {workedStepByStep.map((example) => (
                    <div key={example.title}>
                      <h3 className="rr-help-subheading">{example.title}</h3>
                      <div className="rr-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="rr-help-section">
                <h2 className="rr-help-heading">Glossary</h2>
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
