import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    notes: 'It formalized how to coordinate access to shared resources without corrupting data.',
  },
  {
    title: 'Dijkstra and semaphores',
    details:
      'Edsger Dijkstra introduced semaphores as a clean abstraction for mutual exclusion and synchronization.',
    notes: 'Producer-consumer became a standard example for semaphore usage.',
  },
  {
    title: 'Modern concurrency',
    details:
      'Today it appears in thread pools, channel implementations, and bounded queues in many languages.',
    notes: 'It is a canonical teaching problem for concurrency APIs and memory models.',
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
    definition:
      'A wakeup without the condition actually being true; requires re-checking in a loop.',
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
    detail:
      'Never allow two threads to mutate the buffer simultaneously; never read from empty or write to full.',
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
    detail:
      'If producers and consumers exist, and space/items become available, some waiting thread eventually proceeds.',
  },
  {
    title: 'No lost wakeups',
    detail: 'A thread should not sleep forever after a signal that makes its condition true.',
  },
]

const keyClaims = [
  {
    title: 'Locks alone are not enough',
    detail:
      'A mutex prevents race conditions but does not coordinate waiting when the buffer is full or empty.',
  },
  {
    title: 'Condition variables require loops',
    detail:
      'Threads must re-check conditions after waking because of spurious wakeups or competing threads.',
  },
  {
    title: 'Semaphores encode availability',
    detail: 'Counting semaphores naturally represent the number of filled and empty slots.',
  },
  {
    title: 'Correctness is about both safety and liveness',
    detail:
      'It is not enough to avoid corruption; the system must also avoid deadlock and starvation.',
  },
]

const synchronizationPatterns = [
  {
    title: 'Monitor style (mutex + conditions)',
    detail:
      'One mutex protects the buffer; two condition variables coordinate not-full and not-empty.',
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
    explanation: 'Consumers must block on empty until new items arrive, avoiding underflow.',
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
    explanation: 'This monitor-style solution is common in POSIX threads and many languages.',
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
    explanation: 'Counting semaphores directly track available slots and available items.',
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
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Producer-Consumer (Bounded Buffer)',
    defaultTab: 'big-picture',
  })

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

  const selectedBuffer =
    bufferCases.find((buffer) => buffer.id === selectedBufferId) ?? defaultBuffer
  const selectedProfile =
    rateProfiles.find((profile) => profile.id === selectedProfileId) ?? defaultProfile

  const capacity = selectedBuffer.capacity
  const canProduce = bufferCount < capacity
  const canConsume = bufferCount > 0

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

  const applyProfile = () => {
    const nextCount = bufferCount + selectedProfile.producerRate - selectedProfile.consumerRate
    const clampedCount = Math.min(Math.max(nextCount, 0), capacity)
    setBufferCount(clampedCount)
  }

  return (
    <TopicPageShell
      title="Producer-Consumer (Bounded Buffer)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Producer-Consumer (Bounded Buffer)</h1>
      <p>
        The bounded-buffer problem models how concurrent producers and consumers safely share a
        fixed-capacity queue. The rules are simple: producers must wait when the buffer is full,
        consumers must wait when it is empty, and all access to shared state must be synchronized.
        This document explains the classic solutions, correctness conditions, and practical
        tradeoffs.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-claims" className="bin98-section">
            <h2 className="bin98-heading">Core Claims</h2>
            {keyClaims.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Safety ensures the buffer never corrupts its contents. Liveness ensures that waiting
              threads eventually proceed when the buffer state allows it.
            </p>
          </section>

          <hr className="bin98-divider" />

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-setup" className="bin98-section">
            <h2 className="bin98-heading">Problem Setup</h2>
            {problemSetup.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Goals</h2>
            {correctnessGoals.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Synchronization Patterns</h2>
            {synchronizationPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-invariants" className="bin98-section">
            <h2 className="bin98-heading">Key Invariants</h2>
            {invariants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-variations" className="bin98-section">
            <h2 className="bin98-heading">Variations and Extensions</h2>
            {variations.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance Considerations</h2>
            {performanceNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            {applications.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
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
          <section id="ex-worked" className="bin98-section">
            <h2 className="bin98-heading">Worked Examples</h2>
            {workedExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-pseudocode" className="bin98-section">
            <h2 className="bin98-heading">Pseudocode Reference</h2>
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

          <section id="ex-buffer" className="bin98-section">
            <h2 className="bin98-heading">Buffer Configurator</h2>
            <p>
              Select a buffer size and observe how capacity affects waiting behavior. This is a
              conceptual simulator for intuition, not a real thread scheduler.
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
            <h3 className="bin98-subheading">{selectedBuffer.name}</h3>
            <p>
              <strong>Capacity:</strong> {selectedBuffer.capacity}
            </p>
            <p>{selectedBuffer.notes}</p>
          </section>

          <section id="ex-profile" className="bin98-section">
            <h2 className="bin98-heading">Rate Profile</h2>
            <p>
              Compare producer and consumer rates. Apply a step to see how the buffer count changes
              under that profile.
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
            <h3 className="bin98-subheading">{selectedProfile.label}</h3>
            <p>
              <strong>Producer rate:</strong> {selectedProfile.producerRate} item(s)
            </p>
            <p>
              <strong>Consumer rate:</strong> {selectedProfile.consumerRate} item(s)
            </p>
            <p>{selectedProfile.summary}</p>
          </section>

          <section id="ex-stepper" className="bin98-section">
            <h2 className="bin98-heading">Buffer Stepper</h2>
            <p>
              Step the simulation forward. The count is clamped to stay within bounds, reflecting
              the waiting rules.
            </p>
            <p>
              <strong>Current count:</strong> {bufferCount}
            </p>
            <p>
              <strong>Capacity:</strong> {capacity}
            </p>
            <p>{statusText}</p>
            <div className="producer-help-formline">
              <button type="button" className="producer-help-push" onClick={applyProfile}>
                APPLY STEP
              </button>
              <button
                type="button"
                className="producer-help-push"
                onClick={() => setBufferCount(0)}
              >
                RESET
              </button>
            </div>
            <p>
              <strong>Can produce now:</strong> {canProduce ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Can consume now:</strong> {canConsume ? 'Yes' : 'No'}
            </p>
          </section>
        </>
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
