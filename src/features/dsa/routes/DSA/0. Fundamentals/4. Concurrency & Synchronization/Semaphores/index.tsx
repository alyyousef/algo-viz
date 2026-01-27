import { useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

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
    code: `semaphore slots = 3

wait(slots)   // acquire permit
useResource()
signal(slots) // release permit`,
    explanation:
      'Up to 3 threads may use the resource concurrently.',
  },
  {
    title: 'Producer-consumer (semaphore version)',
    code: `semaphore empty = capacity
semaphore full = 0
mutex m

producer():
  wait(empty)
  lock(m)
  enqueue(item)
  unlock(m)
  signal(full)

consumer():
  wait(full)
  lock(m)
  item = dequeue()
  unlock(m)
  signal(empty)`,
    explanation:
      'Semaphores control capacity; a mutex protects the queue.',
  },
  {
    title: 'Try-wait fast path',
    code: `if (tryWait(permits)):
  doWork()
  signal(permits)
else:
  skipOrQueue()`,
    explanation:
      'Try-wait is useful for opportunistic work.',
  },
]

const workedExamples = [
  {
    title: 'Connection pool',
    code: `semaphore connections = maxConnections

acquire():
  wait(connections)
  return openConnection()

release(conn):
  close(conn)
  signal(connections)`,
    explanation:
      'The semaphore caps concurrent connections to a server.',
  },
  {
    title: 'Rate limiter',
    code: `semaphore tokens = N

request():
  wait(tokens)
  handleRequest()

refillLoop():
  every second: signal(tokens)`,
    explanation:
      'Tokens represent allowed requests per time window.',
  },
  {
    title: 'Parking lot',
    code: `semaphore spots = 50

enter():
  wait(spots)
  park()

exit():
  leave()
  signal(spots)`,
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

export default function SemaphoresPage(): JSX.Element {
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'pool')
  const [stepIndex, setStepIndex] = useState(0)

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Semaphores</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Counting permits to control access and coordination</div>
              <p className="win95-text">
                Semaphores are counters with atomic wait and signal operations. They are ideal for controlling access to a fixed-size
                resource pool and for expressing classic producer-consumer coordination. This page covers the mental model, usage rules,
                and how to avoid common mistakes like permit leaks.
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
            <legend>Mental Model</legend>
            <div className="win95-grid win95-grid-4">
              {mentalModel.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {glossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core Rules of Use</legend>
            <div className="win95-grid win95-grid-2">
              {coreRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                A semaphore is a counter, not a lock. Make sure the counter always equals “available permits.”
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Types of Semaphores</legend>
            <div className="win95-grid win95-grid-2">
              {semaphoreTypes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Permit Accounting</legend>
            <div className="win95-grid win95-grid-2">
              {permitAccounting.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and Contrast</legend>
            <div className="win95-grid win95-grid-2">
              {compareTools.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Usage Patterns</legend>
            <div className="win95-grid win95-grid-2">
              {usagePatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness Checklist</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode Reference</legend>
            <div className="win95-stack">
              {pseudocode.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <pre className="win95-code">
                    <code>{item.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{item.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {workedExamples.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <pre className="win95-code">
                    <code>{item.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{item.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Interactive Timeline</legend>
            <div className="win95-panel">
              <div className="win95-heading">Semaphore Stepper</div>
              <p className="win95-text">
                Select a scenario and step through how permits are acquired and released. This highlights blocking and permit leaks.
              </p>
              <div className="win95-grid win95-grid-3">
                {timelineScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    type="button"
                    className="win95-button"
                    onClick={() => {
                      setSelectedScenarioId(scenario.id)
                      setStepIndex(0)
                    }}
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>
              <div className="win95-panel win95-panel--raised">
                <p className="win95-text"><strong>Selected:</strong> {selectedScenario?.title ?? 'None'}</p>
                <p className="win95-text">{stepText}</p>
                <p className="win95-text win95-note">{selectedScenario?.summary ?? ''}</p>
              </div>
              <div className="win95-grid win95-grid-3">
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => setStepIndex(0)}
                >
                  RESET
                </button>
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                >
                  BACK
                </button>
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => {
                    if (canStepForward) {
                      setStepIndex((prev) => prev + 1)
                    }
                  }}
                >
                  STEP
                </button>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation Notes</legend>
            <div className="win95-grid win95-grid-2">
              {implementationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance Tips</legend>
            <div className="win95-grid win95-grid-2">
              {performanceTips.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Patterns at a Glance</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Debugging Checklist</legend>
            <div className="win95-grid win95-grid-2">
              {debuggingChecklist.map((item) => (
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
            <legend>FAQ</legend>
            <div className="win95-stack">
              {faq.map((item) => (
                <div key={item.question} className="win95-panel">
                  <div className="win95-heading">{item.question}</div>
                  <p className="win95-text">{item.answer}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item} className="win95-panel">
                  <p className="win95-text">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
