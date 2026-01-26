
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

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

export default function ReadersWritersPage(): JSX.Element {
  const [policy, setPolicy] = useState<Policy>('reader')
  const [queue, setQueue] = useState<QueueItem[]>([])
  const [activeReaders, setActiveReaders] = useState(0)
  const [activeWriter, setActiveWriter] = useState(false)
  const [nextId, setNextId] = useState(1)

  const waitingReaders = useMemo(() => queue.filter((item) => item.type === 'R').length, [queue])
  const waitingWriters = useMemo(() => queue.filter((item) => item.type === 'W').length, [queue])

  const statusText = useMemo(() => {
    if (activeWriter) {
      return 'Writer is active: all readers and other writers must wait.'
    }
    if (activeReaders > 0) {
      return `Readers active: ${activeReaders}. Writers must wait until readers finish.`
    }
    if (waitingReaders > 0 || waitingWriters > 0) {
      return 'No active threads. Use Start Next to schedule the next reader or writer.'
    }
    return 'System idle: no active or waiting threads.'
  }, [activeReaders, activeWriter, waitingReaders, waitingWriters])

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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Readers-Writers</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Coordinating shared reads with exclusive writes</div>
              <p className="win95-text">
                The readers-writers problem models access to shared data where reads are frequent and writes must be exclusive. The core
                challenge is deciding who waits: should readers stream through while writers queue, or should writers get priority to
                prevent starvation? This page explains the main policies, correctness invariants, and practical tradeoffs.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical Context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalContext.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {quickGlossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Problem Setup</legend>
            <div className="win95-grid win95-grid-2">
              {problemSetup.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness Goals</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessGoals.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Safety enforces exclusivity for writers. Fairness and throughput depend on which policy you choose to schedule readers
                and writers.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Policy Variants</legend>
            <div className="win95-grid win95-grid-2">
              {policyVariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core Claims</legend>
            <div className="win95-grid win95-grid-2">
              {keyClaims.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Invariants</legend>
            <div className="win95-grid win95-grid-2">
              {invariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Synchronization Patterns</legend>
            <div className="win95-grid win95-grid-2">
              {synchronizationPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset className="win95-fieldset">
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {workedExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode Reference</legend>
            <div className="win95-stack">
              {pseudocode.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Interactive Policy Explorer</legend>
            <div className="win95-stack">
              <div className="win95-panel">
                <div className="win95-heading">Policy Selector</div>
                <p className="win95-text">
                  Choose a scheduling policy and then enqueue readers and writers. Use Start Next to see how the policy schedules work.
                </p>
                <div className="win95-grid win95-grid-3">
                  {policyCards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      className="win95-button"
                      onClick={() => setPolicy(card.id as Policy)}
                    >
                      {card.name}
                    </button>
                  ))}
                </div>
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text"><strong>Active policy:</strong> {policyCards.find((card) => card.id === policy)?.name}</p>
                  <p className="win95-text">{policyCards.find((card) => card.id === policy)?.summary}</p>
                </div>
              </div>

              <div className="win95-panel">
                <div className="win95-heading">Queue Controls</div>
                <p className="win95-text">
                  Add reader or writer requests to the waiting queue. The queue is used for fair scheduling and for visualization.
                </p>
                <div className="win95-grid win95-grid-3">
                  <button type="button" className="win95-button" onClick={() => enqueue('R')}>ADD READER</button>
                  <button type="button" className="win95-button" onClick={() => enqueue('W')}>ADD WRITER</button>
                  <button type="button" className="win95-button" onClick={reset}>RESET</button>
                </div>
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text"><strong>Waiting readers:</strong> {waitingReaders}</p>
                  <p className="win95-text"><strong>Waiting writers:</strong> {waitingWriters}</p>
                  <p className="win95-text"><strong>Queue:</strong> {queue.length ? queue.map((item) => item.type).join(' ') : 'Empty'}</p>
                </div>
              </div>

              <div className="win95-panel">
                <div className="win95-heading">Scheduler Stepper</div>
                <p className="win95-text">
                  Step the scheduler and finish active readers or writers. This is a conceptual model for intuition.
                </p>
                <div className="win95-grid win95-grid-2">
                  <div className="win95-panel win95-panel--raised">
                    <p className="win95-text"><strong>Active readers:</strong> {activeReaders}</p>
                    <p className="win95-text"><strong>Active writer:</strong> {activeWriter ? 'Yes' : 'No'}</p>
                    <p className="win95-text">{statusText}</p>
                  </div>
                  <div className="win95-panel win95-panel--raised">
                    <button type="button" className="win95-button" onClick={startNext}>START NEXT</button>
                    <button type="button" className="win95-button" onClick={finishReader}>FINISH READER</button>
                    <button type="button" className="win95-button" onClick={finishWriter}>FINISH WRITER</button>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance Considerations</legend>
            <div className="win95-grid win95-grid-2">
              {performanceNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((takeaway) => (
                <div key={takeaway} className="win95-panel">
                  <p className="win95-text">{takeaway}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
