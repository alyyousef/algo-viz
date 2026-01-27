import { useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

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

export default function SpinlocksPage(): JSX.Element {
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'short-hold')
  const [stepIndex, setStepIndex] = useState(0)

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Spinlocks</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Busy-waiting for ultra-short critical sections</div>
              <p className="win95-text">
                Spinlocks avoid sleeping by continuously polling the lock state. This can be efficient for very short critical sections
                or in contexts where sleeping is impossible (like certain kernel paths). Used incorrectly, spinlocks waste CPU and harm
                throughput. This page explains when they help and when they hurt.
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
                Spinlocks are about latency, not throughput. Use them only when the lock hold time is tiny.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Types of Spinlocks</legend>
            <div className="win95-grid win95-grid-2">
              {spinlockTypes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to Use</legend>
            <div className="win95-grid win95-grid-2">
              {whenToUse.map((item) => (
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
            <legend>Backoff and Fairness Strategies</legend>
            <div className="win95-grid win95-grid-2">
              {backoffStrategies.map((item) => (
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
              <div className="win95-heading">Spinlock Stepper</div>
              <p className="win95-text">
                Select a scenario and step through how spinning behaves under different conditions.
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
            <legend>Spinlock Variants</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
