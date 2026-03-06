import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
    { id: 'core-policies', label: 'Policy Overview' },
    { id: 'core-metrics', label: 'Scheduling Metrics' },
    { id: 'core-selection', label: 'Algorithm Flow' },
    { id: 'core-pseudocode', label: 'Pseudocode' },
    { id: 'core-prediction', label: 'Burst Prediction' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-realworld', label: 'Real-World Applications' },
    { id: 'core-decisions', label: 'When to Use Each Policy' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-evaluation', label: 'How to Evaluate a Scheduler' },
  ],
  examples: [
    { id: 'ex-workload', label: 'Example Workload' },
    { id: 'ex-gantt', label: 'Gantt Charts and Metrics' },
    { id: 'ex-srtf', label: 'SRTF Step-by-Step' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const schedHelpStyles = `
.sched-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.sched-help-window {
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

.sched-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.sched-help-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.sched-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.sched-help-control {
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

.sched-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.sched-help-tab {
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

.sched-help-tab.is-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.sched-help-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.sched-help-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.sched-help-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.sched-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sched-help-toc-list li {
  margin: 0 0 8px;
}

.sched-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.sched-help-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.sched-help-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.sched-help-section {
  margin: 0 0 20px;
}

.sched-help-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.sched-help-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.sched-help-content p,
.sched-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.sched-help-content p {
  margin: 0 0 10px;
}

.sched-help-content ul,
.sched-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.sched-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.sched-help-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
  overflow-x: auto;
}

.sched-help-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .sched-help-main {
    grid-template-columns: 1fr;
  }

  .sched-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .sched-help-title {
    position: static;
    transform: none;
    margin-right: 8px;
    font-size: 13px;
  }
}
`

export default function FCFSSJFSRTFPage(): JSX.Element {
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
    document.title = `FCFS / SJF / SRTF (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'FCFS / SJF / SRTF',
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
    <div className="sched-help-page">
      <style>{schedHelpStyles}</style>
      <div className="sched-help-window" role="presentation">
        <header className="sched-help-titlebar">
          <span className="sched-help-title">FCFS / SJF / SRTF</span>
          <div className="sched-help-title-controls">
            <button className="sched-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="sched-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="sched-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`sched-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="sched-help-main">
          <aside className="sched-help-toc" aria-label="Table of contents">
            <h2 className="sched-help-toc-title">Contents</h2>
            <ul className="sched-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="sched-help-content">
            <h1 className="sched-help-doc-title">FCFS / SJF / SRTF</h1>
            <p>
              FCFS, SJF, and SRTF are the baseline CPU schedulers used to explain how operating systems trade off fairness,
              throughput, and responsiveness. FCFS prioritizes arrival order, SJF chooses the shortest job, and SRTF preempts
              running jobs when a shorter one arrives. Together they highlight why modern schedulers blend multiple ideas.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="sched-help-section">
                  <h2 className="sched-help-heading">Overview</h2>
                  {overviewTiles.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="sched-help-divider" />

                <section id="bp-history" className="sched-help-section">
                  <h2 className="sched-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="bp-mental" className="sched-help-section">
                  <h2 className="sched-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="bp-takeaways" className="sched-help-section">
                  <h2 className="sched-help-heading">Key Takeaways</h2>
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
                <section id="core-policies" className="sched-help-section">
                  <h2 className="sched-help-heading">Policy Overview</h2>
                  {policyCards.map((block) => (
                    <div key={block.heading}>
                      <h3 className="sched-help-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-metrics" className="sched-help-section">
                  <h2 className="sched-help-heading">Scheduling Metrics</h2>
                  {schedulerMetrics.map((row) => (
                    <p key={row.metric}>
                      <strong>{row.metric}:</strong> {row.meaning}. {row.goal}
                    </p>
                  ))}
                </section>

                <section id="core-selection" className="sched-help-section">
                  <h2 className="sched-help-heading">Algorithm Flow</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    SJF and SRTF are only as good as their burst predictions. Poor estimates can make them worse than FCFS.
                  </p>
                </section>

                <section id="core-pseudocode" className="sched-help-section">
                  <h2 className="sched-help-heading">Pseudocode</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="sched-help-subheading">{example.title}</h3>
                      <div className="sched-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="core-prediction" className="sched-help-section">
                  <h2 className="sched-help-heading">Burst Prediction Details</h2>
                  {predictionDetails.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="sched-help-section">
                  <h2 className="sched-help-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>

                <section id="core-compare" className="sched-help-section">
                  <h2 className="sched-help-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-realworld" className="sched-help-section">
                  <h2 className="sched-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-decisions" className="sched-help-section">
                  <h2 className="sched-help-heading">When to Use Each Policy</h2>
                  {decisionGuidance.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-advanced" className="sched-help-section">
                  <h2 className="sched-help-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="sched-help-section">
                  <h2 className="sched-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="core-evaluation" className="sched-help-section">
                  <h2 className="sched-help-heading">How to Evaluate a Scheduler</h2>
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
                <section id="ex-workload" className="sched-help-section">
                  <h2 className="sched-help-heading">Example Workload</h2>
                  {exampleWorkload.map((example) => (
                    <div key={example.title}>
                      <h3 className="sched-help-subheading">{example.title}</h3>
                      <div className="sched-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-gantt" className="sched-help-section">
                  <h2 className="sched-help-heading">Gantt Charts and Metrics</h2>
                  {ganttExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="sched-help-subheading">{example.title}</h3>
                      <div className="sched-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-srtf" className="sched-help-section">
                  <h2 className="sched-help-heading">Walkthrough: SRTF Step-by-Step</h2>
                  {workedStepByStep.map((example) => (
                    <div key={example.title}>
                      <h3 className="sched-help-subheading">{example.title}</h3>
                      <div className="sched-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="sched-help-section">
                <h2 className="sched-help-heading">Glossary</h2>
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
