
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type Policy = 'reader' | 'writer' | 'fair'

type QueueItem = {
  id: number
  type: 'R' | 'W'
}

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A synchronization problem where multiple readers can access shared data concurrently, but writers need exclusive access.',
    notes:
      'The goal is to maximize read throughput while preserving correctness for writes.',
  },
  {
    title: 'Why it matters',
    details:
      'It models databases, file systems, caches, and shared in-memory data structures.',
    notes:
      'Designing the policy determines whether readers or writers can starve.',
  },
  {
    title: 'What it teaches',
    details:
      'How to separate safety (no concurrent read/write conflicts) from fairness and performance.',
    notes:
      'It highlights the tradeoff between concurrency and latency.',
  },
]

const historicalContext = [
  {
    title: 'Early OS and DB systems',
    details:
      'Readers-writers became a standard model for shared file and database access patterns.',
    notes:
      'The challenge was to balance read-heavy workloads with write latency.',
  },
  {
    title: 'Lock abstractions',
    details:
      'Read-write locks were introduced to allow multiple readers without blocking each other.',
    notes:
      'Different scheduling policies emerged to prevent starvation.',
  },
  {
    title: 'Modern concurrency',
    details:
      'Languages and OS kernels provide RW locks and RCU-style techniques for read-heavy workloads.',
    notes:
      'The core problem remains: when should writers be allowed to proceed?',
  },
]

const quickGlossary = [
  {
    term: 'Reader',
    definition: 'A thread that only reads shared data without modifying it.',
  },
  {
    term: 'Writer',
    definition: 'A thread that modifies shared data and requires exclusive access.',
  },
  {
    term: 'Read-write lock',
    definition: 'A lock that allows many concurrent readers or a single writer.',
  },
  {
    term: 'Starvation',
    definition: 'A thread waits indefinitely because others keep being scheduled.',
  },
  {
    term: 'Policy',
    definition: 'The rule for deciding whether readers or writers get priority.',
  },
  {
    term: 'Fairness',
    definition: 'Guaranteeing that both readers and writers eventually make progress.',
  },
]

const problemSetup = [
  {
    title: 'Actors',
    detail: 'Many readers and many writers accessing a shared resource.',
  },
  {
    title: 'Shared state',
    detail: 'A data structure that must not be read while being written.',
  },
  {
    title: 'Goal',
    detail: 'Allow concurrent reads but enforce exclusive writes.',
  },
  {
    title: 'Constraint',
    detail: 'A writer must wait until no readers are active; readers must wait if a writer is active.',
  },
]

const correctnessGoals = [
  {
    title: 'Safety',
    detail: 'No reader reads while a writer is writing; no two writers write at the same time.',
  },
  {
    title: 'Liveness',
    detail: 'Waiting threads eventually proceed under the chosen policy.',
  },
  {
    title: 'Throughput',
    detail: 'Allow as many readers in parallel as possible when safe.',
  },
  {
    title: 'Fairness',
    detail: 'Avoid starvation of readers or writers depending on policy requirements.',
  },
]

const policyVariants = [
  {
    title: 'Reader preference',
    detail: 'If any reader is waiting and no writer is active, readers go first.',
  },
  {
    title: 'Writer preference',
    detail: 'If a writer is waiting, block new readers so writers can proceed.',
  },
  {
    title: 'Fair (FIFO)',
    detail: 'Serve requests roughly in arrival order to avoid starvation.',
  },
  {
    title: 'Phase-fair',
    detail: 'Allow batches of readers, then give writers a turn, then readers again.',
  },
]

const keyClaims = [
  {
    title: 'Read-write locks increase throughput for read-heavy workloads',
    detail: 'Multiple readers can proceed in parallel without blocking each other.',
  },
  {
    title: 'Policy choices matter',
    detail: 'Reader preference can starve writers; writer preference can starve readers.',
  },
  {
    title: 'Correctness needs both mutual exclusion and coordination',
    detail: 'A mutex alone is not sufficient to implement reader-writer policies.',
  },
  {
    title: 'Fairness adds overhead',
    detail: 'Stronger fairness guarantees can reduce throughput under contention.',
  },
]

const invariants = [
  {
    title: 'Active writer implies zero active readers',
    detail: 'If a writer is active, reader count must be 0.',
  },
  {
    title: 'Active readers imply no active writer',
    detail: 'If reader count is positive, writer must be inactive.',
  },
  {
    title: 'Counts never negative',
    detail: 'Active and waiting counts must stay at or above zero.',
  },
  {
    title: 'Writer exclusivity',
    detail: 'At most one writer can be active at any time.',
  },
]

const synchronizationPatterns = [
  {
    title: 'Read-write lock (RWLock)',
    detail: 'Use shared/exclusive modes: shared for readers, exclusive for writers.',
  },
  {
    title: 'Semaphore-based',
    detail: 'Count readers with a mutex; use a write lock to block writers while readers are active.',
  },
  {
    title: 'Condition variable',
    detail: 'Readers and writers wait on conditions for no-writer and no-readers states.',
  },
  {
    title: 'RCU-like schemes',
    detail: 'Allow lock-free reads with deferred reclamation; advanced and specialized.',
  },
]

const pitfalls = [
  {
    mistake: 'Allowing readers while a writer is waiting (writer preference)',
    description: 'This can starve writers indefinitely in read-heavy workloads.',
  },
  {
    mistake: 'Blocking all readers for a writer too early',
    description: 'Overly aggressive writer preference can starve readers.',
  },
  {
    mistake: 'Not re-checking conditions after waking',
    description: 'Spurious wakeups require condition checks in loops.',
  },
  {
    mistake: 'Updating counters without mutual exclusion',
    description: 'Reader counts must be updated under a mutex to avoid races.',
  },
]

const workedExamples = [
  {
    title: 'Read-heavy workload',
    code: `Readers: 100
Writers: 1
Policy: Reader preference`,
    explanation:
      'Throughput is high for reads, but the writer may starve if readers keep arriving.',
  },
  {
    title: 'Write-heavy workload',
    code: `Readers: 5
Writers: 5
Policy: Writer preference`,
    explanation:
      'Writers make progress, but readers can experience long delays.',
  },
  {
    title: 'Balanced workload',
    code: `Readers: 10
Writers: 10
Policy: Fair FIFO`,
    explanation:
      'No starvation, but the overhead of fairness reduces peak throughput.',
  },
]

const pseudocode = [
  {
    title: 'Reader preference (mutex + condition)',
    code: `mutex m
cond canRead, canWrite
int readers = 0
bool writer = false

reader():
  lock(m)
  while writer:
    wait(canRead, m)
  readers++
  unlock(m)

  read()

  lock(m)
  readers--
  if readers == 0:
    signal(canWrite)
  unlock(m)

writer():
  lock(m)
  while writer || readers > 0:
    wait(canWrite, m)
  writer = true
  unlock(m)

  write()

  lock(m)
  writer = false
  signal(canWrite)
  broadcast(canRead)
  unlock(m)`,
    explanation:
      'New readers can enter as long as no writer is active, which can starve writers.',
  },
  {
    title: 'Writer preference (using a turnstile)',
    code: `mutex turnstile
mutex m
int readers = 0

reader():
  lock(turnstile)
  unlock(turnstile)

  lock(m)
  readers++
  if readers == 1:
    lock(writeLock)
  unlock(m)

  read()

  lock(m)
  readers--
  if readers == 0:
    unlock(writeLock)
  unlock(m)

writer():
  lock(turnstile)
  lock(writeLock)
  write()
  unlock(writeLock)
  unlock(turnstile)`,
    explanation:
      'The turnstile blocks new readers when a writer arrives, preventing writer starvation.',
  },
]

const performanceNotes = [
  {
    title: 'Read-heavy wins',
    detail: 'RW locks improve throughput when reads dominate and writes are infrequent.',
  },
  {
    title: 'Writer bursts hurt',
    detail: 'Frequent writers can serialize access and reduce reader concurrency.',
  },
  {
    title: 'Fairness overhead',
    detail: 'FIFO or phase-fair policies add bookkeeping and may reduce throughput.',
  },
  {
    title: 'Cache coherence',
    detail: 'Shared counters for readers can become a scalability bottleneck.',
  },
]

const applications = [
  {
    title: 'Databases',
    detail: 'Readers access tables while writers update records; policies affect latency.',
  },
  {
    title: 'Filesystem metadata',
    detail: 'Many readers look up metadata while writers update directory entries.',
  },
  {
    title: 'In-memory caches',
    detail: 'Cache reads are frequent; updates must be exclusive to preserve consistency.',
  },
  {
    title: 'Configuration systems',
    detail: 'Many services read config, occasional writers push updates.',
  },
]

const keyTakeaways = [
  'Readers-writers separates shared read access from exclusive write access.',
  'Policy choice determines whether readers or writers can starve.',
  'RW locks increase throughput for read-heavy workloads but reduce fairness.',
  'Correctness requires enforcing invariants about active readers/writers.',
  'Real systems tune policies based on workload and latency goals.',
]

const policyCards = [
  {
    id: 'reader',
    name: 'Reader preference',
    summary: 'Prioritize readers if no writer is active.',
  },
  {
    id: 'writer',
    name: 'Writer preference',
    summary: 'Block new readers when any writer is waiting.',
  },
  {
    id: 'fair',
    name: 'Fair (FIFO-ish)',
    summary: 'Serve arrivals in order to avoid starvation.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const readersHelpStyles = `
.readers-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.readers-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.readers-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.readers-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.readers-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.readers-help-control {
  width: 18px;
  height: 16px;
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
  padding: 0;
}

.readers-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.readers-help-tab {
  flex: 0 0 auto;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.readers-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.readers-help-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #fff;
}

.readers-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.readers-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.readers-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.readers-help-toc-list li {
  margin: 0 0 8px;
}

.readers-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.readers-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.readers-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.readers-help-section {
  margin: 0 0 22px;
}

.readers-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.readers-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.readers-help-content p,
.readers-help-content li,
.readers-help-content button {
  font-size: 12px;
  line-height: 1.5;
}

.readers-help-content p {
  margin: 0 0 10px;
}

.readers-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.readers-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.readers-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.readers-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.readers-help-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.readers-help-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  padding: 4px 8px;
  cursor: pointer;
}

.readers-help-push.active {
  border-top: 1px solid #404040;
  border-left: 1px solid #404040;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  background: #b3b3b3;
}

.readers-help-formline {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin: 0 0 10px;
}

@media (max-width: 900px) {
  .readers-help-title {
    position: static;
    transform: none;
    margin: 0 auto 0 0;
    font-size: 13px;
  }

  .readers-help-main {
    grid-template-columns: 1fr;
  }

  .readers-help-toc {
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
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-claims', label: 'Core Claims' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-setup', label: 'Problem Setup' },
    { id: 'core-correctness', label: 'Correctness Goals' },
    { id: 'core-policies', label: 'Policy Variants' },
    { id: 'core-invariants', label: 'Key Invariants' },
    { id: 'core-patterns', label: 'Synchronization Patterns' },
    { id: 'core-performance', label: 'Performance Considerations' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-policy', label: 'Policy Selector' },
    { id: 'ex-queue', label: 'Queue Controls' },
    { id: 'ex-scheduler', label: 'Scheduler Stepper' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ReadersWritersPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [policy, setPolicy] = useState<Policy>('reader')
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [activeReaders, setActiveReaders] = useState(0)
  const [activeWriter, setActiveWriter] = useState(false)
  const [nextId, setNextId] = useState(1)
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const waitingReaders = queue.filter((item) => item.type === 'R').length
  const waitingWriters = queue.filter((item) => item.type === 'W').length
  const activePolicy = policyCards.find((card) => card.id === policy)
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  const statusText =
    activeWriter
      ? 'Writer is active: all readers and other writers must wait.'
      : activeReaders > 0
        ? `Readers active: ${activeReaders}. Writers must wait until readers finish.`
        : waitingReaders > 0 || waitingWriters > 0
          ? 'No active threads. Use Start Next to schedule the next reader or writer.'
          : 'System idle: no active or waiting threads.'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Readers-Writers (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Readers-Writers',
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

  const enqueue = (type: 'R' | 'W') => {
    setQueue((prev) => [...prev, { id: nextId, type }])
    setNextId((prev) => prev + 1)
  }

  const removeFirst = (type: 'R' | 'W') => {
    setQueue((prev) => {
      const index = prev.findIndex((item) => item.type === type)
      if (index === -1) {
        return prev
      }
      return [...prev.slice(0, index), ...prev.slice(index + 1)]
    })
  }

  const startReader = () => {
    if (activeWriter) {
      return
    }
    removeFirst('R')
    setActiveReaders((prev) => prev + 1)
  }

  const startWriter = () => {
    if (activeWriter || activeReaders > 0) {
      return
    }
    removeFirst('W')
    setActiveWriter(true)
  }

  const startNext = () => {
    if (activeWriter) {
      return
    }

    if (policy === 'fair') {
      const next = queue[0]
      if (!next) {
        return
      }
      if (next.type === 'R' && !activeWriter) {
        setQueue((prev) => prev.slice(1))
        setActiveReaders((prev) => prev + 1)
      } else if (next.type === 'W' && activeReaders === 0) {
        setQueue((prev) => prev.slice(1))
        setActiveWriter(true)
      }
      return
    }

    if (policy === 'writer') {
      if (activeReaders > 0) {
        if (waitingWriters === 0 && waitingReaders > 0) {
          startReader()
        }
        return
      }
      if (waitingWriters > 0) {
        startWriter()
        return
      }
      if (waitingReaders > 0) {
        startReader()
      }
      return
    }

    if (waitingReaders > 0) {
      startReader()
      return
    }
    if (waitingWriters > 0 && activeReaders === 0) {
      startWriter()
    }
  }

  const finishReader = () => {
    setActiveReaders((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const finishWriter = () => {
    setActiveWriter(false)
  }

  const reset = () => {
    setQueue([])
    setActiveReaders(0)
    setActiveWriter(false)
    setNextId(1)
  }

  return (
    <div className="readers-help-page">
      <style>{readersHelpStyles}</style>
      <div className="readers-help-window" role="presentation">
        <header className="readers-help-titlebar">
          <span className="readers-help-title">Readers-Writers</span>
          <div className="readers-help-controls">
            <button className="readers-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="readers-help-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="readers-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`readers-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="readers-help-main">
          <aside className="readers-help-toc" aria-label="Table of contents">
            <h2 className="readers-help-toc-title">Contents</h2>
            <ul className="readers-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="readers-help-content">
            <h1 className="readers-help-doc-title">Readers-Writers</h1>
            <p>
              The readers-writers problem models access to shared data where reads are frequent and writes must be exclusive. The core
              challenge is deciding who waits: should readers stream through while writers queue, or should writers get priority to
              prevent starvation? This document explains the main policies, correctness invariants, and practical tradeoffs.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="readers-help-section">
                  <h2 className="readers-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="readers-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="readers-help-divider" />

                <section id="bp-history" className="readers-help-section">
                  <h2 className="readers-help-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="readers-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="readers-help-divider" />

                <section id="bp-claims" className="readers-help-section">
                  <h2 className="readers-help-heading">Core Claims</h2>
                  {keyClaims.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Safety enforces exclusivity for writers. Fairness and throughput depend on which policy you choose to schedule
                    readers and writers.
                  </p>
                </section>

                <hr className="readers-help-divider" />

                <section id="bp-takeaways" className="readers-help-section">
                  <h2 className="readers-help-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-setup" className="readers-help-section">
                  <h2 className="readers-help-heading">Problem Setup</h2>
                  {problemSetup.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-correctness" className="readers-help-section">
                  <h2 className="readers-help-heading">Correctness Goals</h2>
                  {correctnessGoals.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-policies" className="readers-help-section">
                  <h2 className="readers-help-heading">Policy Variants</h2>
                  {policyVariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-invariants" className="readers-help-section">
                  <h2 className="readers-help-heading">Key Invariants</h2>
                  {invariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="readers-help-section">
                  <h2 className="readers-help-heading">Synchronization Patterns</h2>
                  {synchronizationPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="readers-help-section">
                  <h2 className="readers-help-heading">Performance Considerations</h2>
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-applications" className="readers-help-section">
                  <h2 className="readers-help-heading">Applications</h2>
                  {applications.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="readers-help-section">
                  <h2 className="readers-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-worked" className="readers-help-section">
                  <h2 className="readers-help-heading">Worked Examples</h2>
                  {workedExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="readers-help-subheading">{example.title}</h3>
                      <div className="readers-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-pseudocode" className="readers-help-section">
                  <h2 className="readers-help-heading">Pseudocode Reference</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="readers-help-subheading">{example.title}</h3>
                      <div className="readers-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-policy" className="readers-help-section">
                  <h2 className="readers-help-heading">Policy Selector</h2>
                  <p>
                    Choose a scheduling policy and then enqueue readers and writers. Use Start Next to see how the policy schedules
                    work.
                  </p>
                  <div className="readers-help-inline-buttons">
                    {policyCards.map((card) => (
                      <button
                        key={card.id}
                        type="button"
                        className={`readers-help-push ${policy === card.id ? 'active' : ''}`}
                        onClick={() => setPolicy(card.id as Policy)}
                        aria-pressed={policy === card.id}
                      >
                        {card.name}
                      </button>
                    ))}
                  </div>
                  <h3 className="readers-help-subheading">{activePolicy?.name}</h3>
                  <p>{activePolicy?.summary}</p>
                </section>

                <section id="ex-queue" className="readers-help-section">
                  <h2 className="readers-help-heading">Queue Controls</h2>
                  <p>
                    Add reader or writer requests to the waiting queue. The queue is used for fair scheduling and for visualization.
                  </p>
                  <div className="readers-help-formline">
                    <button type="button" className="readers-help-push" onClick={() => enqueue('R')}>ADD READER</button>
                    <button type="button" className="readers-help-push" onClick={() => enqueue('W')}>ADD WRITER</button>
                    <button type="button" className="readers-help-push" onClick={reset}>RESET</button>
                  </div>
                  <p><strong>Waiting readers:</strong> {waitingReaders}</p>
                  <p><strong>Waiting writers:</strong> {waitingWriters}</p>
                  <p><strong>Queue:</strong> {queue.length ? queue.map((item) => item.type).join(' ') : 'Empty'}</p>
                </section>

                <section id="ex-scheduler" className="readers-help-section">
                  <h2 className="readers-help-heading">Scheduler Stepper</h2>
                  <p>
                    Step the scheduler and finish active readers or writers. This is a conceptual model for intuition.
                  </p>
                  <p><strong>Active readers:</strong> {activeReaders}</p>
                  <p><strong>Active writer:</strong> {activeWriter ? 'Yes' : 'No'}</p>
                  <p>{statusText}</p>
                  <div className="readers-help-formline">
                    <button type="button" className="readers-help-push" onClick={startNext}>START NEXT</button>
                    <button type="button" className="readers-help-push" onClick={finishReader}>FINISH READER</button>
                    <button type="button" className="readers-help-push" onClick={finishWriter}>FINISH WRITER</button>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="readers-help-section">
                <h2 className="readers-help-heading">Glossary</h2>
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
