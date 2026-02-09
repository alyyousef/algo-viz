import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A semaphore is a counter with atomic wait (P) and signal (V) operations that controls access to a finite resource.',
    notes:
      'Unlike a mutex, a semaphore does not have ownership; any thread can signal.',
  },
  {
    title: 'Why it matters',
    details:
      'Semaphores model resource pools and coordination patterns like producer-consumer and rate limiting.',
    notes:
      'They are powerful but easy to misuse without clear invariants.',
  },
  {
    title: 'What it teaches',
    details:
      'Correctness relies on counting, invariants, and keeping P/V usage balanced.',
    notes:
      'Understanding semaphores clarifies the difference between mutual exclusion and resource availability.',
  },
]

const mentalModel = [
  {
    title: 'Counter',
    detail:
      'Represents available permits; wait decrements, signal increments.',
  },
  {
    title: 'Blocking',
    detail:
      'If the counter is zero, wait blocks until another thread signals.',
  },
  {
    title: 'No ownership',
    detail:
      'Any thread can signal; semaphores do not enforce who releases.',
  },
  {
    title: 'Resource pool',
    detail:
      'A semaphore of N permits allows up to N concurrent users of a resource.',
  },
]

const glossary = [
  { term: 'Semaphore', definition: 'A synchronization primitive that manages a nonnegative counter.' },
  { term: 'P / wait / down', definition: 'Atomically decrement the counter or block if it is zero.' },
  { term: 'V / signal / up', definition: 'Atomically increment the counter and wake a waiter if any.' },
  { term: 'Binary semaphore', definition: 'A semaphore with values 0 or 1; can behave like a mutex.' },
  { term: 'Counting semaphore', definition: 'A semaphore with values 0..N for N shared permits.' },
  { term: 'Permit', definition: 'A unit of availability represented by the semaphore counter.' },
  { term: 'Fair semaphore', definition: 'A semaphore that wakes waiters in FIFO order.' },
  { term: 'Thundering herd', definition: 'Many threads wake at once even though only a few can proceed.' },
]

const coreRules = [
  {
    title: 'Define a clear invariant',
    detail:
      'Know exactly what the counter represents (free slots, resources, credits).',
  },
  {
    title: 'Keep P/V balanced',
    detail:
      'Every wait should eventually be matched with a signal, or the system will stall.',
  },
  {
    title: 'Do not mix roles',
    detail:
      'Use different semaphores for different constraints to avoid confusion.',
  },
  {
    title: 'Avoid using as a mutex',
    detail:
      'Binary semaphores can mimic mutexes but do not enforce ownership.',
  },
  {
    title: 'Do not signal before state change',
    detail:
      'Signal should reflect actual resource availability.',
  },
  {
    title: 'Prefer higher-level constructs',
    detail:
      'If possible, use condition variables or monitors for complex predicates.',
  },
]

const semaphoreTypes = [
  {
    title: 'Binary semaphore',
    detail:
      'Values 0/1. Often used for mutual exclusion but lacks ownership safety.',
  },
  {
    title: 'Counting semaphore',
    detail:
      'Values 0..N. Models N identical resources or slots.',
  },
  {
    title: 'Timed semaphore',
    detail:
      'Supports timeouts to avoid blocking forever.',
  },
  {
    title: 'Fair semaphore',
    detail:
      'Wakes waiters in FIFO order to reduce starvation.',
  },
]

const permitAccounting = [
  {
    title: 'Resource invariant',
    detail:
      'Counter equals number of available permits for a shared resource.',
  },
  {
    title: 'Acquire protocol',
    detail:
      'wait() consumes a permit before entering the resource region.',
  },
  {
    title: 'Release protocol',
    detail:
      'signal() returns a permit after exiting the resource region.',
  },
  {
    title: 'Bounded capacity',
    detail:
      'The counter must never exceed the number of real resources.',
  },
  {
    title: 'Zero means block',
    detail:
      'When the counter is zero, no permits exist and threads must wait.',
  },
]

const usagePatterns = [
  {
    title: 'Resource pool',
    detail:
      'Permits represent a fixed pool (connections, buffers, GPU slots).',
  },
  {
    title: 'Producer-consumer',
    detail:
      'Two semaphores track capacity (empty) and occupancy (full).',
  },
  {
    title: 'Rate limiter',
    detail:
      'Permits are replenished periodically to cap throughput.',
  },
  {
    title: 'Barrier-like coordination',
    detail:
      'Semaphores can approximate barriers but condition variables are usually clearer.',
  },
]

const debuggingChecklist = [
  {
    title: 'Balanced P/V?',
    detail:
      'Every successful wait() must eventually signal() or the system leaks permits.',
  },
  {
    title: 'Counter bounds?',
    detail:
      'Never allow the counter to go negative or exceed resource capacity.',
  },
  {
    title: 'Correct semaphore for each rule?',
    detail:
      'Separate distinct constraints into separate semaphores.',
  },
  {
    title: 'Shutdown protocol?',
    detail:
      'Define how blocked threads should exit if the system is stopping.',
  },
  {
    title: 'Spurious wakeups handled?',
    detail:
      'Some implementations can still wake spuriously; check invariants.',
  },
  {
    title: 'No hidden ownership?',
    detail:
      'Semaphores do not enforce owners; mistakes can be silent.',
  },
]

const faq = [
  {
    question: 'Why not use a semaphore as a mutex?',
    answer:
      'Semaphores do not enforce ownership; the wrong thread can signal and corrupt the protocol.',
  },
  {
    question: 'Can the counter exceed its initial value?',
    answer:
      'It should not. Over-release breaks the invariant and allows too many threads in.',
  },
  {
    question: 'Are semaphores obsolete?',
    answer:
      'No. They are still ideal for resource pools and rate limiting, but require careful design.',
  },
  {
    question: 'Can I avoid a mutex with semaphores?',
    answer:
      'Semaphores only control counts; a mutex is still needed to protect shared data structures.',
  },
  {
    question: 'What is the difference between wait and try-wait?',
    answer:
      'wait blocks until a permit is available; try-wait fails immediately if none are available.',
  },
]

const exampleTable = [
  { pattern: 'Pool', permits: 'N connections', wait: 'acquire before use', signal: 'release after close' },
  { pattern: 'Buffer', permits: 'empty/full slots', wait: 'producer waits empty', signal: 'consumer signals empty' },
  { pattern: 'Rate limit', permits: 'tokens per interval', wait: 'request waits token', signal: 'refill loop' },
  { pattern: 'Parking', permits: 'free spots', wait: 'enter waits spot', signal: 'exit signals spot' },
]

const compareTools = [
  {
    title: 'Semaphore vs mutex',
    detail:
      'Mutexes enforce ownership and mutual exclusion; semaphores enforce availability counts.',
  },
  {
    title: 'Semaphore vs condition variable',
    detail:
      'Condition variables wait on predicates protected by a mutex; semaphores carry the count directly.',
  },
  {
    title: 'Semaphore vs channel',
    detail:
      'Channels combine queueing and synchronization; semaphores only count permits.',
  },
  {
    title: 'Semaphore vs atomic',
    detail:
      'Atomics manage simple state without blocking; semaphores coordinate blocking access.',
  },
]

const correctnessChecklist = [
  {
    title: 'Safety',
    detail:
      'The counter never goes negative and accurately reflects available resources.',
  },
  {
    title: 'Liveness',
    detail:
      'Waiters eventually proceed when permits become available.',
  },
  {
    title: 'No permit leaks',
    detail:
      'Every acquire is matched by a release, even on error paths.',
  },
  {
    title: 'No over-release',
    detail:
      'Do not signal more times than resources available; this violates the model.',
  },
  {
    title: 'Fairness',
    detail:
      'If starvation is possible, use FIFO or priority-aware semaphores.',
  },
  {
    title: 'Shutdown behavior',
    detail:
      'Define how waiters exit when the system is stopping.',
  },
]

const implementationNotes = [
  {
    title: 'Kernel support',
    detail:
      'Semaphores are often built on OS wait queues or futex-like primitives.',
  },
  {
    title: 'Atomicity',
    detail:
      'P and V must be atomic to avoid races and incorrect counts.',
  },
  {
    title: 'Spurious wakeups',
    detail:
      'Less common than with condition variables, but some implementations can still wake spuriously.',
  },
  {
    title: 'Memory ordering',
    detail:
      'Acquire/release semantics ensure state changes are visible to awakened threads.',
  },
]

const performanceTips = [
  {
    title: 'Batch releases when safe',
    detail:
      'If multiple permits become available, signal accordingly in one block.',
  },
  {
    title: 'Prefer try-wait in fast paths',
    detail:
      'Avoid blocking when you can skip work or use a fallback path.',
  },
  {
    title: 'Limit contention',
    detail:
      'Use multiple semaphores or sharded resources if a single one is hot.',
  },
  {
    title: 'Avoid thundering herd',
    detail:
      'Signal only as many threads as there are available permits.',
  },
  {
    title: 'Instrument for leaks',
    detail:
      'Track permits in debug builds to catch missing releases.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Using a semaphore as a mutex',
    description:
      'Binary semaphores lack ownership checks; the wrong thread can accidentally signal.',
  },
  {
    mistake: 'Imbalanced P/V calls',
    description:
      'Missing a signal causes a deadlock; extra signals break the invariant.',
  },
  {
    mistake: 'Signaling before resource release',
    description:
      'Wakeups can happen when no real resource is available.',
  },
  {
    mistake: 'Single semaphore for multiple rules',
    description:
      'Mixing constraints in one counter makes reasoning difficult.',
  },
  {
    mistake: 'No shutdown path',
    description:
      'Waiters can block forever when the system is shutting down.',
  },
  {
    mistake: 'Ignoring fairness',
    description:
      'Starvation can occur if waiters are not scheduled fairly.',
  },
]

const pseudocode = [
  {
    title: 'Counting semaphore usage',
    code: `semaphore slots = 3\n\nwait(slots)   // acquire permit\nuseResource()\nsignal(slots) // release permit`,
    explanation:
      'Up to 3 threads may use the resource concurrently.',
  },
  {
    title: 'Producer-consumer (semaphore version)',
    code: `semaphore empty = capacity\nsemaphore full = 0\nmutex m\n\nproducer():\n  wait(empty)\n  lock(m)\n  enqueue(item)\n  unlock(m)\n  signal(full)\n\nconsumer():\n  wait(full)\n  lock(m)\n  item = dequeue()\n  unlock(m)\n  signal(empty)`,
    explanation:
      'Semaphores control capacity; a mutex protects the queue.',
  },
  {
    title: 'Try-wait fast path',
    code: `if (tryWait(permits)):\n  doWork()\n  signal(permits)\nelse:\n  skipOrQueue()`,
    explanation:
      'Try-wait is useful for opportunistic work.',
  },
]

const workedExamples = [
  {
    title: 'Connection pool',
    code: `semaphore connections = maxConnections\n\nacquire():\n  wait(connections)\n  return openConnection()\n\nrelease(conn):\n  close(conn)\n  signal(connections)`,
    explanation:
      'The semaphore caps concurrent connections to a server.',
  },
  {
    title: 'Rate limiter',
    code: `semaphore tokens = N\n\nrequest():\n  wait(tokens)\n  handleRequest()\n\nrefillLoop():\n  every second: signal(tokens)`,
    explanation:
      'Tokens represent allowed requests per time window.',
  },
  {
    title: 'Parking lot',
    code: `semaphore spots = 50\n\nenter():\n  wait(spots)\n  park()\n\nexit():\n  leave()\n  signal(spots)`,
    explanation:
      'Each permit corresponds to a free parking spot.',
  },
]

const timelineScenarios = [
  {
    id: 'pool',
    title: 'Resource pool',
    steps: [
      'Semaphore count starts at 2 (two available resources).',
      'Thread A waits; count goes to 1 and proceeds.',
      'Thread B waits; count goes to 0 and proceeds.',
      'Thread C waits; count is 0, so it blocks.',
      'Thread A signals; count goes to 1 and Thread C wakes.',
    ],
    summary:
      'The semaphore ensures at most 2 threads are inside the resource.',
  },
  {
    id: 'bounded-buffer',
    title: 'Bounded buffer',
    steps: [
      'empty = capacity, full = 0.',
      'Producer waits on empty, enqueues item, signals full.',
      'Consumer waits on full, dequeues item, signals empty.',
    ],
    summary:
      'Two semaphores track capacity and occupancy.',
  },
  {
    id: 'leak',
    title: 'Permit leak',
    steps: [
      'Thread A waits and acquires a permit.',
      'Thread A returns early without signaling.',
      'Available permits drop permanently.',
      'Eventually all threads block.',
    ],
    summary:
      'Missing signal calls lead to permanent resource loss.',
  },
]

const keyTakeaways = [
  'Semaphores manage counts of available resources or permits.',
  'They do not enforce ownership like mutexes.',
  'Correctness depends on balanced wait/signal operations.',
  'Use semaphores for capacity control; use mutexes for protecting invariants.',
  'A clear invariant makes semaphore-based designs understandable.',
]

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-model', label: 'Mental Model' },
    { id: 'core-rules', label: 'Core Rules' },
    { id: 'core-types', label: 'Types of Semaphores' },
    { id: 'core-accounting', label: 'Permit Accounting' },
    { id: 'core-usage', label: 'Usage Patterns' },
    { id: 'core-correctness', label: 'Correctness Checklist' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-performance', label: 'Performance Tips' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-patterns', label: 'Patterns at a Glance' },
    { id: 'core-debugging', label: 'Debugging Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-faq', label: 'FAQ' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-timeline', label: 'Interactive Timeline' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Glossary Terms' }],
}

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

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
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
.win98-content li,
.win98-table {
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
  margin: 6px 0 10px;
}

.win98-table th,
.win98-table td {
  border: 1px solid #808080;
  padding: 4px 6px;
  text-align: left;
}

.win98-table th {
  background: #e0e0e0;
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

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function SemaphoresPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'pool')
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
    document.title = `Semaphores (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Semaphores',
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
          <span className="win98-title-text">Semaphores</span>
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
            <h1 className="win98-doc-title">Semaphores</h1>
            <p>
              Semaphores are counters with atomic wait and signal operations. They are ideal for controlling access to a fixed-size
              resource pool and for expressing classic producer-consumer coordination. This document covers the mental model, usage
              rules, and how to avoid common mistakes like permit leaks.
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
                  <h2 className="win98-heading">Why It Matters</h2>
                  <p>
                    Semaphores are about availability, not ownership. They are a natural fit for shared resources, rate limiting,
                    and producer-consumer pipelines.
                  </p>
                  <p>
                    Misuse is costly: missing a signal causes leaks, while extra signals allow too many threads into a region.
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
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental-model" className="win98-section">
                  <h2 className="win98-heading">Mental Model</h2>
                  {mentalModel.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-rules" className="win98-section">
                  <h2 className="win98-heading">Core Rules</h2>
                  {coreRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p><strong>Reminder:</strong> The counter must always equal available permits.</p>
                </section>
                <section id="core-types" className="win98-section">
                  <h2 className="win98-heading">Types of Semaphores</h2>
                  {semaphoreTypes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-accounting" className="win98-section">
                  <h2 className="win98-heading">Permit Accounting</h2>
                  {permitAccounting.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-usage" className="win98-section">
                  <h2 className="win98-heading">Usage Patterns</h2>
                  {usagePatterns.map((item) => (
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
                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareTools.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-patterns" className="win98-section">
                  <h2 className="win98-heading">Patterns at a Glance</h2>
                  <table className="win98-table">
                    <thead>
                      <tr>
                        <th>Pattern</th>
                        <th>Permits represent</th>
                        <th>Wait</th>
                        <th>Signal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exampleTable.map((row) => (
                        <tr key={row.pattern}>
                          <td>{row.pattern}</td>
                          <td>{row.permits}</td>
                          <td>{row.wait}</td>
                          <td>{row.signal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
                <section id="core-debugging" className="win98-section">
                  <h2 className="win98-heading">Debugging Checklist</h2>
                  {debuggingChecklist.map((item) => (
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
                <section id="core-faq" className="win98-section">
                  <h2 className="win98-heading">FAQ</h2>
                  {faq.map((item) => (
                    <p key={item.question}>
                      <strong>{item.question}</strong> {item.answer}
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
                  <p>Select a scenario and step through how permits are acquired and released.</p>
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
                    <button type="button" className="win98-push" onClick={() => setStepIndex(0)}>
                      RESET
                    </button>
                    <button type="button" className="win98-push" onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}>
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
