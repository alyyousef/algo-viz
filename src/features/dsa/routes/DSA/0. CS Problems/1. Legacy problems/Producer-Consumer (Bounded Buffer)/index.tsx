
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A classic synchronization problem where producers add items to a shared buffer while consumers remove them.',
    notes:
      'The buffer has a fixed capacity, so correct coordination must prevent overflow and underflow.',
  },
  {
    title: 'Why it matters',
    details:
      'It models real systems: I/O pipelines, OS queues, streaming, and bounded task buffers.',
    notes:
      'Solving it correctly teaches mutual exclusion, condition synchronization, and deadlock avoidance.',
  },
  {
    title: 'What it teaches',
    details:
      'How to combine a mutex with condition variables or semaphores to enforce safe, efficient concurrency.',
    notes:
      'It highlights the difference between waiting and spinning, and between safety and liveness.',
  },
]

const historicalContext = [
  {
    title: 'Operating systems roots',
    details:
      'The problem emerged from early OS design where multiple processes shared limited buffers and I/O devices.',
    notes:
      'It formalized how to coordinate access to shared resources without corrupting data.',
  },
  {
    title: 'Dijkstra and semaphores',
    details:
      'Edsger Dijkstra introduced semaphores as a clean abstraction for mutual exclusion and synchronization.',
    notes:
      'Producer-consumer became a standard example for semaphore usage.',
  },
  {
    title: 'Modern concurrency',
    details:
      'Today it appears in thread pools, channel implementations, and bounded queues in many languages.',
    notes:
      'It is a canonical teaching problem for concurrency APIs and memory models.',
  },
]

const quickGlossary = [
  {
    term: 'Buffer',
    definition: 'A shared queue that holds items between producers and consumers.',
  },
  {
    term: 'Capacity',
    definition: 'Maximum number of items the buffer can hold at once.',
  },
  {
    term: 'Mutual exclusion (mutex)',
    definition: 'Ensures only one thread modifies the buffer at a time.',
  },
  {
    term: 'Condition variable',
    definition: 'Allows threads to sleep until a condition (not empty/not full) is true.',
  },
  {
    term: 'Semaphore',
    definition: 'A counter with atomic wait/signal operations used for synchronization.',
  },
  {
    term: 'Spurious wakeup',
    definition: 'A wakeup without the condition actually being true; requires re-checking in a loop.',
  },
]

const problemSetup = [
  {
    title: 'Actors',
    detail: 'One or more producers and one or more consumers running concurrently.',
  },
  {
    title: 'Shared state',
    detail: 'A bounded buffer with capacity N and a count of current items.',
  },
  {
    title: 'Goal',
    detail: 'Producers must block when the buffer is full; consumers must block when it is empty.',
  },
  {
    title: 'Safety rule',
    detail: 'Never allow two threads to mutate the buffer simultaneously; never read from empty or write to full.',
  },
]

const correctnessGoals = [
  {
    title: 'Mutual exclusion',
    detail: 'Only one thread can change buffer state at a time.',
  },
  {
    title: 'Boundedness',
    detail: 'Item count never goes below 0 or above capacity.',
  },
  {
    title: 'Progress',
    detail: 'If producers and consumers exist, and space/items become available, some waiting thread eventually proceeds.',
  },
  {
    title: 'No lost wakeups',
    detail: 'A thread should not sleep forever after a signal that makes its condition true.',
  },
]

const keyClaims = [
  {
    title: 'Locks alone are not enough',
    detail: 'A mutex prevents race conditions but does not coordinate waiting when the buffer is full or empty.',
  },
  {
    title: 'Condition variables require loops',
    detail: 'Threads must re-check conditions after waking because of spurious wakeups or competing threads.',
  },
  {
    title: 'Semaphores encode availability',
    detail: 'Counting semaphores naturally represent the number of filled and empty slots.',
  },
  {
    title: 'Correctness is about both safety and liveness',
    detail: 'It is not enough to avoid corruption; the system must also avoid deadlock and starvation.',
  },
]

const synchronizationPatterns = [
  {
    title: 'Monitor style (mutex + conditions)',
    detail: 'One mutex protects the buffer; two condition variables coordinate not-full and not-empty.',
  },
  {
    title: 'Semaphore style',
    detail: 'Use semaphores for empty slots and filled slots plus a mutex for the buffer itself.',
  },
  {
    title: 'Channel style',
    detail: 'A bounded channel provides send/receive operations that block automatically.',
  },
  {
    title: 'Lock-free variants',
    detail: 'Advanced queues can be wait-free or lock-free but are harder to prove correct.',
  },
]

const invariants = [
  {
    title: '0 = count = capacity',
    detail: 'The buffer size must always stay within bounds.',
  },
  {
    title: 'count == produced - consumed',
    detail: 'The number of items in the buffer equals net produced minus net consumed.',
  },
  {
    title: 'No simultaneous mutation',
    detail: 'Push and pop operations are mutually exclusive.',
  },
  {
    title: 'Waits release the lock',
    detail: 'A waiting producer/consumer must not hold the mutex, or progress is blocked.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Using if instead of while',
    description: 'Condition variables require a loop to re-check the condition after waking.',
  },
  {
    mistake: 'Signaling outside the lock incorrectly',
    description: 'Signals should be issued while holding the mutex to avoid lost wakeups.',
  },
  {
    mistake: 'Single condition variable for both states',
    description: 'Using one CV can work but often causes needless wakeups; two CVs are clearer.',
  },
  {
    mistake: 'Busy waiting',
    description: 'Spinning wastes CPU; proper blocking is more efficient and scalable.',
  },
]

const variations = [
  {
    title: 'Multiple producers/consumers',
    detail: 'Requires careful signaling to avoid waking too many threads and causing contention.',
  },
  {
    title: 'Priority or fairness',
    detail: 'Some systems require fairness to avoid starvation of low-priority threads.',
  },
  {
    title: 'Batching',
    detail: 'Producers/consumers operate in batches to amortize lock overhead.',
  },
  {
    title: 'Timed waits',
    detail: 'Consumers or producers time out if the buffer stays empty or full too long.',
  },
]

const workedExamples = [
  {
    title: 'Single-slot buffer',
    code: `Capacity = 1
Producer adds item, consumer removes item.
The buffer alternates between full and empty.`,
    explanation:
      'This is the simplest case and shows that waiting is unavoidable if both run at different speeds.',
  },
  {
    title: 'Burst producer, slow consumer',
    code: `Capacity = 3
Producer generates 10 items quickly.
Consumer removes one per second.`,
    explanation:
      'The producer must block when the buffer reaches 3 items, otherwise overflow occurs.',
  },
  {
    title: 'Slow producer, burst consumer',
    code: `Capacity = 5
Producer generates 1 item per second.
Consumer tries to take 3 items per second.`,
    explanation:
      'Consumers must block on empty until new items arrive, avoiding underflow.',
  },
]

const pseudocode = [
  {
    title: 'Mutex + Condition Variables',
    code: `mutex lock
cond notFull, notEmpty
buffer, count

producer(item):
  lock(mutex)
  while count == capacity:
    wait(notFull, mutex)
  push(item)
  count++
  signal(notEmpty)
  unlock(mutex)

consumer():
  lock(mutex)
  while count == 0:
    wait(notEmpty, mutex)
  item = pop()
  count--
  signal(notFull)
  unlock(mutex)
  return item`,
    explanation:
      'This monitor-style solution is common in POSIX threads and many languages.',
  },
  {
    title: 'Semaphores',
    code: `semaphore empty = capacity
semaphore full = 0
mutex = 1

producer(item):
  wait(empty)
  wait(mutex)
  push(item)
  signal(mutex)
  signal(full)

consumer():
  wait(full)
  wait(mutex)
  item = pop()
  signal(mutex)
  signal(empty)
  return item`,
    explanation:
      'Counting semaphores directly track available slots and available items.',
  },
]

const performanceNotes = [
  {
    title: 'Contention',
    detail: 'High producer/consumer counts can lead to lock contention; batching can help.',
  },
  {
    title: 'Wakeup storms',
    detail: 'Waking too many threads at once leads to context switching overhead.',
  },
  {
    title: 'Cache effects',
    detail: 'Shared counters can cause false sharing; padding or per-queue counters can help.',
  },
  {
    title: 'Fairness vs throughput',
    detail: 'Fair scheduling can reduce peak throughput; some systems trade fairness for speed.',
  },
]

const applications = [
  {
    title: 'I/O buffering',
    detail: 'Disk and network stacks use bounded buffers to decouple producers from consumers.',
  },
  {
    title: 'Logging pipelines',
    detail: 'Applications enqueue log messages and a background thread writes them out.',
  },
  {
    title: 'Thread pools',
    detail: 'A work queue buffers tasks between the submitter and worker threads.',
  },
  {
    title: 'Stream processing',
    detail: 'Bounded queues connect stages in streaming and ETL pipelines.',
  },
]

const keyTakeaways = [
  'A bounded buffer enforces both safety (no overflow/underflow) and liveness (eventual progress).',
  'Use a mutex plus condition variables or semaphores to coordinate waiting and waking.',
  'Always check conditions in a loop to handle spurious wakeups and contention.',
  'Correct solutions balance fairness, throughput, and simplicity.',
  'The pattern appears across operating systems, networking, and application pipelines.',
]

const bufferCases = [
  {
    id: 'single',
    name: 'Single-slot buffer',
    capacity: 1,
    notes: 'Simplest possible buffer; every production forces a consumption before the next.',
  },
  {
    id: 'small',
    name: 'Small buffer',
    capacity: 3,
    notes: 'Limited headroom; producers often block under bursts.',
  },
  {
    id: 'medium',
    name: 'Medium buffer',
    capacity: 8,
    notes: 'Enough space to smooth short bursts but still bounded.',
  },
]

const rateProfiles = [
  {
    id: 'balanced',
    label: 'Balanced rates',
    producerRate: 1,
    consumerRate: 1,
    summary: 'Buffer stays near steady state with small oscillations.',
  },
  {
    id: 'producer-fast',
    label: 'Producer faster',
    producerRate: 3,
    consumerRate: 1,
    summary: 'Buffer fills quickly; producers block when full.',
  },
  {
    id: 'consumer-fast',
    label: 'Consumer faster',
    producerRate: 1,
    consumerRate: 3,
    summary: 'Buffer drains quickly; consumers block when empty.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const producerHelpStyles = `
.producer-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.producer-help-window {
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

.producer-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.producer-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.producer-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.producer-help-control {
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

.producer-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.producer-help-tab {
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

.producer-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.producer-help-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #fff;
}

.producer-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.producer-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.producer-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.producer-help-toc-list li {
  margin: 0 0 8px;
}

.producer-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.producer-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.producer-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.producer-help-section {
  margin: 0 0 22px;
}

.producer-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.producer-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.producer-help-content p,
.producer-help-content li,
.producer-help-content label,
.producer-help-content input,
.producer-help-content button {
  font-size: 12px;
  line-height: 1.5;
}

.producer-help-content p {
  margin: 0 0 10px;
}

.producer-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.producer-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.producer-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.producer-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.producer-help-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.producer-help-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  padding: 4px 8px;
  cursor: pointer;
}

.producer-help-push.active {
  border-top: 1px solid #404040;
  border-left: 1px solid #404040;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  background: #b3b3b3;
}

.producer-help-formline {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin: 0 0 10px;
}

@media (max-width: 900px) {
  .producer-help-title {
    position: static;
    transform: none;
    margin: 0 auto 0 0;
    font-size: 13px;
  }

  .producer-help-main {
    grid-template-columns: 1fr;
  }

  .producer-help-toc {
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
    { id: 'core-patterns', label: 'Synchronization Patterns' },
    { id: 'core-invariants', label: 'Key Invariants' },
    { id: 'core-variations', label: 'Variations and Extensions' },
    { id: 'core-performance', label: 'Performance Considerations' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-buffer', label: 'Buffer Configurator' },
    { id: 'ex-profile', label: 'Rate Profile' },
    { id: 'ex-stepper', label: 'Buffer Stepper' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ProducerConsumerBoundedBufferPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultBuffer = bufferCases[0] ?? {
    id: 'fallback',
    name: 'Unavailable buffer',
    capacity: 0,
    notes: 'Add buffers to the gallery.',
  }

  const defaultProfile = rateProfiles[0] ?? {
    id: 'fallback',
    label: 'Unavailable profile',
    producerRate: 1,
    consumerRate: 1,
    summary: 'Add profiles to display behavior.',
  }

  const [selectedBufferId, setSelectedBufferId] = useState(defaultBuffer.id)
  const [selectedProfileId, setSelectedProfileId] = useState(defaultProfile.id)
  const [bufferCount, setBufferCount] = useState(0)
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const selectedBuffer = bufferCases.find((buffer) => buffer.id === selectedBufferId) ?? defaultBuffer
  const selectedProfile = rateProfiles.find((profile) => profile.id === selectedProfileId) ?? defaultProfile

  const capacity = selectedBuffer.capacity
  const canProduce = bufferCount < capacity
  const canConsume = bufferCount > 0
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  const statusText =
    capacity === 0
      ? 'No buffer configured.'
      : !canProduce && !canConsume
        ? 'Invalid configuration.'
        : !canProduce
          ? 'Buffer full: producers must wait.'
          : !canConsume
            ? 'Buffer empty: consumers must wait.'
            : 'Buffer has space and items; both sides can proceed.'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Producer-Consumer (Bounded Buffer) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Producer-Consumer (Bounded Buffer)',
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

  const applyProfile = () => {
    const nextCount = bufferCount + selectedProfile.producerRate - selectedProfile.consumerRate
    const clampedCount = Math.min(Math.max(nextCount, 0), capacity)
    setBufferCount(clampedCount)
  }

  return (
    <div className="producer-help-page">
      <style>{producerHelpStyles}</style>
      <div className="producer-help-window" role="presentation">
        <header className="producer-help-titlebar">
          <span className="producer-help-title">Producer-Consumer (Bounded Buffer)</span>
          <div className="producer-help-controls">
            <button className="producer-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="producer-help-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="producer-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`producer-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="producer-help-main">
          <aside className="producer-help-toc" aria-label="Table of contents">
            <h2 className="producer-help-toc-title">Contents</h2>
            <ul className="producer-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="producer-help-content">
            <h1 className="producer-help-doc-title">Producer-Consumer (Bounded Buffer)</h1>
            <p>
              The bounded-buffer problem models how concurrent producers and consumers safely share a fixed-capacity queue. The rules
              are simple: producers must wait when the buffer is full, consumers must wait when it is empty, and all access to shared
              state must be synchronized. This document explains the classic solutions, correctness conditions, and practical
              tradeoffs.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="producer-help-section">
                  <h2 className="producer-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="producer-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="producer-help-divider" />

                <section id="bp-history" className="producer-help-section">
                  <h2 className="producer-help-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="producer-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="producer-help-divider" />

                <section id="bp-claims" className="producer-help-section">
                  <h2 className="producer-help-heading">Core Claims</h2>
                  {keyClaims.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Safety ensures the buffer never corrupts its contents. Liveness ensures that waiting threads eventually proceed
                    when the buffer state allows it.
                  </p>
                </section>

                <hr className="producer-help-divider" />

                <section id="bp-takeaways" className="producer-help-section">
                  <h2 className="producer-help-heading">Key Takeaways</h2>
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
                <section id="core-setup" className="producer-help-section">
                  <h2 className="producer-help-heading">Problem Setup</h2>
                  {problemSetup.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-correctness" className="producer-help-section">
                  <h2 className="producer-help-heading">Correctness Goals</h2>
                  {correctnessGoals.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="producer-help-section">
                  <h2 className="producer-help-heading">Synchronization Patterns</h2>
                  {synchronizationPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-invariants" className="producer-help-section">
                  <h2 className="producer-help-heading">Key Invariants</h2>
                  {invariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-variations" className="producer-help-section">
                  <h2 className="producer-help-heading">Variations and Extensions</h2>
                  {variations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-performance" className="producer-help-section">
                  <h2 className="producer-help-heading">Performance Considerations</h2>
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-applications" className="producer-help-section">
                  <h2 className="producer-help-heading">Applications</h2>
                  {applications.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="producer-help-section">
                  <h2 className="producer-help-heading">Common Pitfalls</h2>
                  <ul>
                    {commonPitfalls.map((pitfall) => (
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
                <section id="ex-worked" className="producer-help-section">
                  <h2 className="producer-help-heading">Worked Examples</h2>
                  {workedExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="producer-help-subheading">{example.title}</h3>
                      <div className="producer-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-pseudocode" className="producer-help-section">
                  <h2 className="producer-help-heading">Pseudocode Reference</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="producer-help-subheading">{example.title}</h3>
                      <div className="producer-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-buffer" className="producer-help-section">
                  <h2 className="producer-help-heading">Buffer Configurator</h2>
                  <p>
                    Select a buffer size and observe how capacity affects waiting behavior. This is a conceptual simulator for
                    intuition, not a real thread scheduler.
                  </p>
                  <div className="producer-help-inline-buttons">
                    {bufferCases.map((buffer) => (
                      <button
                        key={buffer.id}
                        type="button"
                        className={`producer-help-push ${selectedBuffer.id === buffer.id ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedBufferId(buffer.id)
                          setBufferCount(0)
                        }}
                        aria-pressed={selectedBuffer.id === buffer.id}
                      >
                        {buffer.name}
                      </button>
                    ))}
                  </div>
                  <h3 className="producer-help-subheading">{selectedBuffer.name}</h3>
                  <p><strong>Capacity:</strong> {selectedBuffer.capacity}</p>
                  <p>{selectedBuffer.notes}</p>
                </section>

                <section id="ex-profile" className="producer-help-section">
                  <h2 className="producer-help-heading">Rate Profile</h2>
                  <p>
                    Compare producer and consumer rates. Apply a step to see how the buffer count changes under that profile.
                  </p>
                  <div className="producer-help-inline-buttons">
                    {rateProfiles.map((profile) => (
                      <button
                        key={profile.id}
                        type="button"
                        className={`producer-help-push ${selectedProfile.id === profile.id ? 'active' : ''}`}
                        onClick={() => setSelectedProfileId(profile.id)}
                        aria-pressed={selectedProfile.id === profile.id}
                      >
                        {profile.label}
                      </button>
                    ))}
                  </div>
                  <h3 className="producer-help-subheading">{selectedProfile.label}</h3>
                  <p><strong>Producer rate:</strong> {selectedProfile.producerRate} item(s)</p>
                  <p><strong>Consumer rate:</strong> {selectedProfile.consumerRate} item(s)</p>
                  <p>{selectedProfile.summary}</p>
                </section>

                <section id="ex-stepper" className="producer-help-section">
                  <h2 className="producer-help-heading">Buffer Stepper</h2>
                  <p>
                    Step the simulation forward. The count is clamped to stay within bounds, reflecting the waiting rules.
                  </p>
                  <p><strong>Current count:</strong> {bufferCount}</p>
                  <p><strong>Capacity:</strong> {capacity}</p>
                  <p>{statusText}</p>
                  <div className="producer-help-formline">
                    <button type="button" className="producer-help-push" onClick={applyProfile}>
                      APPLY STEP
                    </button>
                    <button type="button" className="producer-help-push" onClick={() => setBufferCount(0)}>
                      RESET
                    </button>
                  </div>
                  <p><strong>Can produce now:</strong> {canProduce ? 'Yes' : 'No'}</p>
                  <p><strong>Can consume now:</strong> {canConsume ? 'Yes' : 'No'}</p>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="producer-help-section">
                <h2 className="producer-help-heading">Glossary</h2>
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
