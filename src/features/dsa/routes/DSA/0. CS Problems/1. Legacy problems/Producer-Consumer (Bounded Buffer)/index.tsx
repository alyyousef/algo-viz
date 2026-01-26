
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

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

export default function ProducerConsumerBoundedBufferPage(): JSX.Element {
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

  const selectedBuffer = bufferCases.find((buffer) => buffer.id === selectedBufferId) ?? defaultBuffer
  const selectedProfile = rateProfiles.find((profile) => profile.id === selectedProfileId) ?? defaultProfile

  const capacity = selectedBuffer.capacity
  const canProduce = bufferCount < capacity
  const canConsume = bufferCount > 0

  const statusText = useMemo(() => {
    if (capacity === 0) {
      return 'No buffer configured.'
    }
    if (!canProduce && !canConsume) {
      return 'Invalid configuration.'
    }
    if (!canProduce) {
      return 'Buffer full: producers must wait.'
    }
    if (!canConsume) {
      return 'Buffer empty: consumers must wait.'
    }
    return 'Buffer has space and items; both sides can proceed.'
  }, [canConsume, canProduce, capacity])

  const applyProfile = () => {
    const nextCount = bufferCount + selectedProfile.producerRate - selectedProfile.consumerRate
    const clampedCount = Math.min(Math.max(nextCount, 0), capacity)
    setBufferCount(clampedCount)
  }

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Producer-Consumer (Bounded Buffer)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">How producers and consumers safely share a finite buffer</div>
              <p className="win95-text">
                The bounded-buffer problem models how concurrent producers and consumers safely share a fixed-capacity queue. The rules
                are simple: producers must wait when the buffer is full, consumers must wait when it is empty, and all access to shared
                state must be synchronized. This page explains the classic solutions, correctness conditions, and practical tradeoffs.
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
                Safety ensures the buffer never corrupts its contents. Liveness ensures that waiting threads eventually proceed when
                the buffer state allows it.
              </p>
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
            <legend>Variations and Extensions</legend>
            <div className="win95-grid win95-grid-2">
              {variations.map((item) => (
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
            <legend>Interactive Explorers</legend>
            <div className="win95-stack">
              <div className="win95-panel">
                <div className="win95-heading">Buffer Configurator</div>
                <p className="win95-text">
                  Select a buffer size and observe how capacity affects waiting behavior. This is a conceptual simulator for intuition,
                  not a real thread scheduler.
                </p>
                <div className="win95-grid win95-grid-2">
                  {bufferCases.map((buffer) => (
                    <button
                      key={buffer.id}
                      type="button"
                      className="win95-button"
                      onClick={() => {
                        setSelectedBufferId(buffer.id)
                        setBufferCount(0)
                      }}
                    >
                      {buffer.name}
                    </button>
                  ))}
                </div>
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text"><strong>Selected:</strong> {selectedBuffer.name}</p>
                  <p className="win95-text"><strong>Capacity:</strong> {selectedBuffer.capacity}</p>
                  <p className="win95-text">{selectedBuffer.notes}</p>
                </div>
              </div>

              <div className="win95-panel">
                <div className="win95-heading">Rate Profile</div>
                <p className="win95-text">
                  Compare producer and consumer rates. Apply a step to see how the buffer count changes under that profile.
                </p>
                <div className="win95-grid win95-grid-2">
                  {rateProfiles.map((profile) => (
                    <button
                      key={profile.id}
                      type="button"
                      className="win95-button"
                      onClick={() => setSelectedProfileId(profile.id)}
                    >
                      {profile.label}
                    </button>
                  ))}
                </div>
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text"><strong>Profile:</strong> {selectedProfile.label}</p>
                  <p className="win95-text"><strong>Producer rate:</strong> {selectedProfile.producerRate} item(s)</p>
                  <p className="win95-text"><strong>Consumer rate:</strong> {selectedProfile.consumerRate} item(s)</p>
                  <p className="win95-text">{selectedProfile.summary}</p>
                </div>
              </div>

              <div className="win95-panel">
                <div className="win95-heading">Buffer Stepper</div>
                <p className="win95-text">
                  Step the simulation forward. The count is clamped to stay within bounds, reflecting the waiting rules.
                </p>
                <div className="win95-grid win95-grid-2">
                  <div className="win95-panel win95-panel--raised">
                    <p className="win95-text"><strong>Current count:</strong> {bufferCount}</p>
                    <p className="win95-text"><strong>Capacity:</strong> {capacity}</p>
                    <p className="win95-text">{statusText}</p>
                  </div>
                  <div className="win95-panel win95-panel--raised">
                    <button type="button" className="win95-button" onClick={applyProfile}>
                      APPLY STEP
                    </button>
                    <button type="button" className="win95-button" onClick={() => setBufferCount(0)}>
                      RESET
                    </button>
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
                {commonPitfalls.map((pitfall) => (
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
