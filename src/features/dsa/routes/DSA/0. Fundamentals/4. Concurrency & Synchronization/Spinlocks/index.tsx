
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A spinlock is a lock that waits by repeatedly checking (spinning) until it becomes available.',
    notes:
      'It trades CPU time for low latency, making it suitable only for very short critical sections.',
  },
  {
    title: 'Why it matters',
    details:
      'Spinlocks are common in kernels and low-level systems where sleeping is expensive or impossible.',
    notes:
      'Misuse can burn CPU, reduce throughput, and starve other threads.',
  },
  {
    title: 'What it teaches',
    details:
      'Correctness depends on atomic operations, memory ordering, and careful usage constraints.',
    notes:
      'Understanding spinlocks clarifies when blocking locks are preferable.',
  },
]

const mentalModel = [
  {
    title: 'Busy wait',
    detail:
      'Threads loop until the lock becomes free instead of sleeping.',
  },
  {
    title: 'Atomic test-and-set',
    detail:
      'Acquire attempts use atomic instructions that update the lock state.',
  },
  {
    title: 'Short critical section',
    detail:
      'Spinning is only effective if the lock is released quickly.',
  },
  {
    title: 'CPU-bound cost',
    detail:
      'While spinning, threads consume CPU cycles that could be used elsewhere.',
  },
]

const glossary = [
  { term: 'Spinlock', definition: 'A lock that waits by repeatedly polling the lock state.' },
  { term: 'Test-and-set', definition: 'An atomic instruction used to acquire a lock.' },
  { term: 'Ticket lock', definition: 'A spinlock that provides FIFO fairness.' },
  { term: 'Backoff', definition: 'A delay strategy to reduce contention while spinning.' },
  { term: 'Critical section', definition: 'Code that must be executed with mutual exclusion.' },
  { term: 'Preemption', definition: 'When the OS scheduler interrupts a running thread.' },
  { term: 'Busy-waiting', definition: 'Spinning while repeatedly checking a condition.' },
  { term: 'Lock convoy', definition: 'Threads pile up behind a lock, reducing throughput.' },
]

const coreRules = [
  {
    title: 'Use only for very short waits',
    detail:
      'If the critical section can block or take long, use a mutex instead.',
  },
  {
    title: 'Avoid spinning on single-core systems',
    detail:
      'If the lock holder cannot run, spinning wastes CPU and prevents progress.',
  },
  {
    title: 'Disable preemption carefully',
    detail:
      'Kernel spinlocks may disable preemption; user-space spinlocks cannot.',
  },
  {
    title: 'Keep critical sections minimal',
    detail:
      'Short, constant-time work is ideal; avoid I/O or system calls.',
  },
  {
    title: 'Use backoff under contention',
    detail:
      'Exponential backoff or pause instructions reduce cache contention.',
  },
  {
    title: 'Prefer queues for fairness',
    detail:
      'Ticket or MCS locks reduce starvation under high contention.',
  },
]

const spinlockTypes = [
  {
    title: 'Simple test-and-set',
    detail:
      'Fast but unfair; all threads hammer the same memory location.',
  },
  {
    title: 'Ticket lock',
    detail:
      'Provides FIFO ordering with two counters (next, serving).',
  },
  {
    title: 'MCS lock',
    detail:
      'Threads spin on local nodes; scalable under high contention.',
  },
  {
    title: 'Backoff lock',
    detail:
      'Adds delay between retries to reduce cache coherency traffic.',
  },
]

const whenToUse = [
  {
    title: 'Short, bounded critical sections',
    detail:
      'Best when the lock is held for just a few instructions.',
  },
  {
    title: 'Non-blocking contexts',
    detail:
      'Kernel interrupt handlers or low-level runtime code where sleeping is unsafe.',
  },
  {
    title: 'Very low contention',
    detail:
      'Contention amplifies cache line traffic and wastes CPU.',
  },
  {
    title: 'Hybrid strategies',
    detail:
      'Spin briefly, then fall back to blocking for longer waits.',
  },
]

const backoffStrategies = [
  {
    title: 'Pause/yield instructions',
    detail:
      'Reduce power and give sibling threads a chance to progress.',
  },
  {
    title: 'Exponential backoff',
    detail:
      'Wait longer after repeated failures to reduce contention.',
  },
  {
    title: 'Randomized backoff',
    detail:
      'Jitter reduces lock-step collisions across threads.',
  },
  {
    title: 'Queue-based locks',
    detail:
      'Ticket or MCS locks avoid global spinning on a single cache line.',
  },
]

const debuggingChecklist = [
  {
    title: 'Is the lock holder preempted?',
    detail:
      'If yes, other threads may spin for a long time.',
  },
  {
    title: 'Is the critical section bounded?',
    detail:
      'Unbounded work under a spinlock can stall the system.',
  },
  {
    title: 'Is contention too high?',
    detail:
      'High contention suggests a mutex or a queue-based lock.',
  },
  {
    title: 'Are memory fences correct?',
    detail:
      'Acquire/release ordering is required for correctness.',
  },
  {
    title: 'Is backoff used?',
    detail:
      'Tight loops can cause cache thrash and poor HT performance.',
  },
  {
    title: 'Is the platform single-core?',
    detail:
      'Spinlocks can prevent the lock holder from running.',
  },
]

const faq = [
  {
    question: 'Are spinlocks ever good in user space?',
    answer:
      'Yes, but only for extremely short critical sections and low contention.',
  },
  {
    question: 'Why not always use a mutex?',
    answer:
      'Mutexes can incur kernel scheduling overhead; spinlocks avoid sleep/wake latency.',
  },
  {
    question: 'What is a hybrid lock?',
    answer:
      'A lock that spins briefly and then falls back to a blocking mutex.',
  },
  {
    question: 'Do spinlocks provide fairness?',
    answer:
      'Simple spinlocks do not. Ticket and MCS locks improve fairness.',
  },
  {
    question: 'Can a spinlock deadlock?',
    answer:
      'Yes, if the lock holder never runs or if interrupts/preemption are mishandled.',
  },
]

const exampleTable = [
  { type: 'Test-and-set', strength: 'Simple/fast', risk: 'Unfair; cache thrash' },
  { type: 'Ticket', strength: 'FIFO fairness', risk: 'Still global spinning' },
  { type: 'MCS', strength: 'Scales well', risk: 'More complex implementation' },
  { type: 'Hybrid', strength: 'Balanced latency', risk: 'Tuning required' },
]

const compareTools = [
  {
    title: 'Spinlock vs mutex',
    detail:
      'Mutexes sleep on contention; spinlocks burn CPU but can be lower latency for short holds.',
  },
  {
    title: 'Spinlock vs semaphore',
    detail:
      'Semaphores block when unavailable; spinlocks never sleep.',
  },
  {
    title: 'Spinlock vs atomic',
    detail:
      'Atomics avoid locking for simple operations; spinlocks serialize complex critical sections.',
  },
  {
    title: 'Spinlock vs read-write lock',
    detail:
      'RW locks allow concurrent readers; spinlocks provide only mutual exclusion.',
  },
]

const correctnessChecklist = [
  {
    title: 'Safety',
    detail:
      'Only one thread enters the critical section at a time.',
  },
  {
    title: 'Liveness',
    detail:
      'The lock holder can always make progress and release the lock.',
  },
  {
    title: 'No starvation',
    detail:
      'Use fair locks (ticket/MCS) if starvation is a risk.',
  },
  {
    title: 'Bounded wait',
    detail:
      'Ensure the lock is held for a bounded, short duration.',
  },
  {
    title: 'Preemption safe',
    detail:
      'Avoid holding a spinlock across preemptible or blocking operations.',
  },
  {
    title: 'Memory ordering',
    detail:
      'Acquire/release semantics are required around lock/unlock.',
  },
]

const implementationNotes = [
  {
    title: 'Atomic primitives',
    detail:
      'Spinlocks rely on test-and-set or compare-and-swap operations.',
  },
  {
    title: 'CPU pause instruction',
    detail:
      'Using a pause/yield reduces power and improves hyperthreading performance.',
  },
  {
    title: 'Cache coherence',
    detail:
      'Aggressive spinning can cause cache line ping-pong.',
  },
  {
    title: 'Kernel usage',
    detail:
      'Kernel spinlocks may disable interrupts to avoid deadlocks in interrupt context.',
  },
]

const performanceTips = [
  {
    title: 'Spin only when expected wait is tiny',
    detail:
      'Otherwise the CPU cost outweighs any latency gains.',
  },
  {
    title: 'Hybrid locks',
    detail:
      'Spin briefly, then block if the lock is still held.',
  },
  {
    title: 'Use backoff',
    detail:
      'Backoff reduces contention on the lock cache line.',
  },
  {
    title: 'Shard shared state',
    detail:
      'Reduce contention by splitting a lock into multiple locks.',
  },
  {
    title: 'Measure',
    detail:
      'Spinlocks can regress performance; measure before and after.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Using spinlocks for I/O',
    description:
      'If the lock holder blocks, all other threads spin and waste CPU.',
  },
  {
    mistake: 'Overusing spinlocks',
    description:
      'They scale poorly on contended hot paths in user space.',
  },
  {
    mistake: 'No backoff',
    description:
      'Tight loops cause cache thrashing and power drain.',
  },
  {
    mistake: 'Unbounded critical sections',
    description:
      'Long work under a spinlock can freeze progress.',
  },
  {
    mistake: 'Ignoring fairness',
    description:
      'Simple test-and-set locks can starve threads.',
  },
  {
    mistake: 'Spinning on single-core',
    description:
      'The lock holder cannot run to release the lock.',
  },
]
const pseudocode = [
  {
    title: 'Test-and-set spinlock',
    code: `while (atomic_test_and_set(lock) == 1):
  // spin
critical_section()
lock = 0`,
    explanation:
      'The simplest form: spin until the atomic operation succeeds.',
  },
  {
    title: 'Ticket lock',
    code: `my = fetch_and_inc(next)
while (serving != my):
  // spin
critical_section()
serving++`,
    explanation:
      'Ticket locks enforce FIFO ordering and reduce starvation.',
  },
  {
    title: 'Hybrid lock',
    code: `for i in 1..K:
  if (tryLock()):
    goto critical
  pause()
blockOnMutex()`,
    explanation:
      'Spin briefly then sleep to avoid wasting CPU.',
  },
]

const workedExamples = [
  {
    title: 'Short scheduler update',
    code: `spinLock()
updateRunQueue()
spinUnlock()`,
    explanation:
      'Kernel code often uses spinlocks for fast updates.',
  },
  {
    title: 'Micro critical section',
    code: `spinLock()
stats.counter++
spinUnlock()`,
    explanation:
      'Small counters may be protected by spinlocks if contention is low.',
  },
  {
    title: 'Hybrid lock usage',
    code: `if (!trySpinLock()):
  blockOnMutex()
doWork()
unlock()`,
    explanation:
      'Hybrid approaches reduce CPU waste under contention.',
  },
]

const timelineScenarios = [
  {
    id: 'short-hold',
    title: 'Short hold (good case)',
    steps: [
      'Thread A acquires the spinlock.',
      'Thread B spins briefly.',
      'Thread A releases quickly.',
      'Thread B acquires and proceeds.',
    ],
    summary:
      'Short critical sections make spinlocks effective.',
  },
  {
    id: 'preempted',
    title: 'Preempted holder (bad case)',
    steps: [
      'Thread A acquires the spinlock.',
      'Thread A is preempted by the scheduler.',
      'Thread B spins and burns CPU.',
      'Progress stalls until Thread A runs again.',
    ],
    summary:
      'If the lock holder cannot run, spinlocks waste CPU.',
  },
  {
    id: 'contention',
    title: 'High contention',
    steps: [
      'Multiple threads spin on the same lock.',
      'Cache line ping-pongs between cores.',
      'Throughput collapses from contention.',
    ],
    summary:
      'Use backoff or queueing locks to mitigate contention.',
  },
]

const keyTakeaways = [
  'Spinlocks trade CPU time for low latency.',
  'They are appropriate only for very short, non-blocking critical sections.',
  'Backoff and fair queueing reduce contention and starvation.',
  'On single-core systems, spinlocks can prevent progress.',
  'Hybrid locks combine spinning with blocking for better balance.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.win98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-control {
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
}

.win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.win98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.win98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.win98-toc-list li {
  margin: 0 0 8px;
}

.win98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.win98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.win98-section {
  margin: 0 0 20px;
}

.win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.win98-content p,
.win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.win98-content p {
  margin: 0 0 10px;
}

.win98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.win98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.win98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.win98-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.win98-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
}

.win98-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin: 4px 0 10px;
}

.win98-table th,
.win98-table td {
  border: 1px solid #808080;
  padding: 4px 6px;
  text-align: left;
}

@media (max-width: 900px) {
  .win98-main {
    grid-template-columns: 1fr;
  }

  .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

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
    { id: 'bp-why', label: 'Why Spinlocks' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
    { id: 'bp-faq', label: 'FAQ' },
  ],
  'core-concepts': [
    { id: 'core-rules', label: 'Core Rules of Use' },
    { id: 'core-mental-model', label: 'Mental Model' },
    { id: 'core-types', label: 'Types of Spinlocks' },
    { id: 'core-when', label: 'When to Use' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-backoff', label: 'Backoff and Fairness' },
    { id: 'core-correctness', label: 'Correctness Checklist' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-performance', label: 'Performance Tips' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-debug', label: 'Debugging Checklist' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-timeline', label: 'Interactive Timeline' },
    { id: 'ex-variants', label: 'Spinlock Variants' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Glossary' }],
}

export default function SpinlocksPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'short-hold')
  const [stepIndex, setStepIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Spinlocks (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Spinlocks',
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
    <div className="win98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">Spinlocks</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="win98-content">
            <h1 className="win98-doc-title">Spinlocks</h1>
            <p>
              Spinlocks avoid sleeping by continuously polling the lock state. This can be efficient for very short critical sections
              or in contexts where sleeping is impossible (like certain kernel paths). Used incorrectly, spinlocks waste CPU and harm
              throughput. This page explains when they help and when they hurt.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-why" className="win98-section">
                  <h2 className="win98-heading">Why Spinlocks</h2>
                  <p>
                    Spinlocks are about latency, not throughput. Use them only when the lock hold time is tiny.
                  </p>
                  <p>
                    The core tradeoff is simple: a spinlock avoids a sleep/wake cycle, but it burns CPU while it waits.
                  </p>
                </section>
                <hr className="win98-divider" />
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <hr className="win98-divider" />
                <section id="bp-faq" className="win98-section">
                  <h2 className="win98-heading">FAQ</h2>
                  {faq.map((item) => (
                    <p key={item.question}>
                      <strong>{item.question}</strong> {item.answer}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-rules" className="win98-section">
                  <h2 className="win98-heading">Core Rules of Use</h2>
                  {coreRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Spinlocks are about latency, not throughput. Use them only when the lock hold time is tiny.
                  </p>
                </section>
                <section id="core-mental-model" className="win98-section">
                  <h2 className="win98-heading">Mental Model</h2>
                  {mentalModel.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-types" className="win98-section">
                  <h2 className="win98-heading">Types of Spinlocks</h2>
                  {spinlockTypes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-when" className="win98-section">
                  <h2 className="win98-heading">When to Use</h2>
                  {whenToUse.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareTools.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-backoff" className="win98-section">
                  <h2 className="win98-heading">Backoff and Fairness Strategies</h2>
                  {backoffStrategies.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="win98-section">
                  <h2 className="win98-heading">Correctness Checklist</h2>
                  {correctnessChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-implementation" className="win98-section">
                  <h2 className="win98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="win98-section">
                  <h2 className="win98-heading">Performance Tips</h2>
                  {performanceTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {commonPitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-debug" className="win98-section">
                  <h2 className="win98-heading">Debugging Checklist</h2>
                  {debuggingChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-pseudocode" className="win98-section">
                  <h2 className="win98-heading">Pseudocode Reference</h2>
                  {pseudocode.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <div className="win98-codebox">
                        <code>{item.code.trim()}</code>
                      </div>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-worked" className="win98-section">
                  <h2 className="win98-heading">Worked Examples</h2>
                  {workedExamples.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <div className="win98-codebox">
                        <code>{item.code.trim()}</code>
                      </div>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-timeline" className="win98-section">
                  <h2 className="win98-heading">Interactive Timeline</h2>
                  <p>
                    Select a scenario and step through how spinning behaves under different conditions.
                  </p>
                  <div className="win98-inline-buttons">
                    {timelineScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        type="button"
                        className="win98-push"
                        onClick={() => {
                          setSelectedScenarioId(scenario.id)
                          setStepIndex(0)
                        }}
                      >
                        {scenario.title}
                      </button>
                    ))}
                  </div>
                  <p><strong>Selected:</strong> {selectedScenario?.title ?? 'None'}</p>
                  <p>{stepText}</p>
                  <p><strong>Summary:</strong> {selectedScenario?.summary ?? ''}</p>
                  <div className="win98-inline-buttons">
                    <button
                      type="button"
                      className="win98-push"
                      onClick={() => setStepIndex(0)}
                    >
                      RESET
                    </button>
                    <button
                      type="button"
                      className="win98-push"
                      onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                    >
                      BACK
                    </button>
                    <button
                      type="button"
                      className="win98-push"
                      onClick={() => {
                        if (canStepForward) {
                          setStepIndex((prev) => prev + 1)
                        }
                      }}
                    >
                      STEP
                    </button>
                  </div>
                </section>
                <section id="ex-variants" className="win98-section">
                  <h2 className="win98-heading">Spinlock Variants</h2>
                  <table className="win98-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Strength</th>
                        <th>Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exampleTable.map((row) => (
                        <tr key={row.type}>
                          <td>{row.type}</td>
                          <td>{row.strength}</td>
                          <td>{row.risk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="win98-section">
                <h2 className="win98-heading">Glossary</h2>
                {glossary.map((item) => (
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
