import { useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A mutex (mutual exclusion lock) ensures only one thread at a time can access a critical section.',
    notes:
      'It protects shared state by serializing access to code that reads or writes it.',
  },
  {
    title: 'Why it matters',
    details:
      'Without mutual exclusion, data races corrupt shared state and produce nondeterministic bugs.',
    notes:
      'Mutexes are the foundational primitive used by higher-level concurrency constructs.',
  },
  {
    title: 'What it teaches',
    details:
      'Correctness relies on invariants, careful lock ordering, and keeping critical sections small.',
    notes:
      'Understanding deadlocks and contention starts with understanding mutexes.',
  },
]

const mentalModel = [
  {
    title: 'Critical section',
    detail:
      'A region of code that reads/writes shared state and must be executed by at most one thread.',
  },
  {
    title: 'Lock ownership',
    detail:
      'Only the thread that acquires the mutex should release it (unless the API explicitly allows otherwise).',
  },
  {
    title: 'Mutual exclusion',
    detail:
      'At most one thread holds the lock; all others block or spin.',
  },
  {
    title: 'Happens-before',
    detail:
      'Unlocking a mutex publishes prior writes; locking later makes those writes visible.',
  },
]

const glossary = [
  { term: 'Mutex', definition: 'A lock that guarantees mutual exclusion for a critical section.' },
  { term: 'Critical section', definition: 'Code that must be executed atomically with respect to other threads.' },
  { term: 'Lock/Unlock', definition: 'Operations to acquire and release the mutex.' },
  { term: 'Try-lock', definition: 'A non-blocking attempt to acquire the lock.' },
  { term: 'Recursive mutex', definition: 'A mutex that allows re-entrant locking by the same thread.' },
  { term: 'Deadlock', definition: 'Threads wait forever for locks held by each other.' },
  { term: 'Starvation', definition: 'A thread repeatedly loses the race to acquire a lock.' },
  { term: 'Priority inversion', definition: 'A low-priority thread holds a lock needed by a high-priority thread.' },
  { term: 'Convoying', definition: 'Multiple threads pile up behind a lock, reducing throughput.' },
]

const coreRules = [
  {
    title: 'Lock around every shared access',
    detail:
      'Any read or write that participates in a shared invariant must hold the mutex.',
  },
  {
    title: 'Keep critical sections small',
    detail:
      'Do the minimal work under the lock, then release it.',
  },
  {
    title: 'Use consistent lock ordering',
    detail:
      'Acquire multiple locks in a global order to avoid deadlock.',
  },
  {
    title: 'Avoid calling out',
    detail:
      'Do not call unknown code while holding a mutex; it can re-enter or block.',
  },
  {
    title: 'Prefer RAII / scoped guards',
    detail:
      'Use language constructs that guarantee the lock is released even on early returns or errors.',
  },
  {
    title: 'Pick the right mutex',
    detail:
      'Use simple mutexes by default; recursive mutexes only when re-entrance is unavoidable.',
  },
]

const mutexTypes = [
  {
    title: 'Normal (non-recursive)',
    detail:
      'The simplest and fastest option. Relocking by the same thread deadlocks.',
  },
  {
    title: 'Recursive',
    detail:
      'Allows a thread to lock the same mutex multiple times, with a recursion count.',
  },
  {
    title: 'Timed',
    detail:
      'Supports lock attempts with a timeout to avoid indefinite blocking.',
  },
  {
    title: 'Read-write lock',
    detail:
      'Allows multiple readers or one writer; higher-level than a basic mutex.',
  },
]

const compareTools = [
  {
    title: 'Mutex vs spinlock',
    detail:
      'Mutexes sleep when contended; spinlocks busy-wait and are only good for very short waits.',
  },
  {
    title: 'Mutex vs semaphore',
    detail:
      'Mutexes guard ownership; semaphores manage counts of available resources.',
  },
  {
    title: 'Mutex vs atomic',
    detail:
      'Atomics handle simple operations without blocking; mutexes handle complex invariants.',
  },
  {
    title: 'Mutex vs monitor',
    detail:
      'A monitor wraps a mutex plus condition variables into a disciplined module.',
  },
]

const correctnessChecklist = [
  {
    title: 'Safety',
    detail:
      'Shared invariants are protected by the mutex and never accessed without it.',
  },
  {
    title: 'Liveness',
    detail:
      'Threads can eventually acquire the lock and make progress.',
  },
  {
    title: 'Deadlock freedom',
    detail:
      'No cycles in the lock acquisition graph.',
  },
  {
    title: 'Fairness',
    detail:
      'If starvation is a risk, use fair mutexes or explicit queues.',
  },
  {
    title: 'Exception safety',
    detail:
      'Locks are released even if errors occur inside the critical section.',
  },
  {
    title: 'Contention hotspots',
    detail:
      'Identify hot locks and consider finer-grained locking or sharding.',
  },
]

const implementationNotes = [
  {
    title: 'Kernel vs user space',
    detail:
      'Fast paths often use user-space atomics; slow paths block in the kernel.',
  },
  {
    title: 'Ownership tracking',
    detail:
      'Some mutexes track owner thread IDs to detect misuse.',
  },
  {
    title: 'Priority inversion handling',
    detail:
      'Some systems support priority inheritance to reduce inversion.',
  },
  {
    title: 'Memory fences',
    detail:
      'Lock/unlock act as acquire/release fences for shared memory.',
  },
]

const performanceTips = [
  {
    title: 'Reduce lock scope',
    detail:
      'Move non-essential work outside the lock.',
  },
  {
    title: 'Shard shared state',
    detail:
      'Split a single lock into many to reduce contention.',
  },
  {
    title: 'Avoid lock convoys',
    detail:
      'Keep critical sections short to prevent queues from forming.',
  },
  {
    title: 'Batch updates',
    detail:
      'Amortize lock overhead by applying multiple changes in one critical section.',
  },
  {
    title: 'Prefer lock-free reads when safe',
    detail:
      'Use read-mostly patterns or atomics when invariants allow it.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Forgetting to lock on reads',
    description:
      'Reads participate in invariants; skipping locks still causes data races.',
  },
  {
    mistake: 'Double locking',
    description:
      'Re-locking a non-recursive mutex by the same thread deadlocks.',
  },
  {
    mistake: 'Inconsistent lock order',
    description:
      'Acquiring locks in different orders across code paths can deadlock.',
  },
  {
    mistake: 'Calling external code',
    description:
      'Unknown callbacks can re-enter and cause deadlocks or long stalls.',
  },
  {
    mistake: 'Holding a lock during I/O',
    description:
      'Blocking I/O while holding the lock increases contention and latency.',
  },
  {
    mistake: 'Using one lock for everything',
    description:
      'Over-serialization destroys parallelism; use finer-grained locking.',
  },
]

const pseudocode = [
  {
    title: 'Minimal critical section',
    code: `lock(mutex)
// read + update shared state
counter++
unlock(mutex)`,
    explanation:
      'Locks protect invariants over shared variables.',
  },
  {
    title: 'Try-lock fast path',
    code: `if (mutex.tryLock()):
  // do quick work
  mutex.unlock()
else:
  // skip or queue work`,
    explanation:
      'Try-lock avoids blocking but must handle failure paths correctly.',
  },
  {
    title: 'Two-lock ordering',
    code: `lock(A)
lock(B)
// work using A and B
unlock(B)
unlock(A)`,
    explanation:
      'Always lock in a consistent global order.',
  },
]

const workedExamples = [
  {
    title: 'Bank account transfer',
    code: `lock(accountA)
lock(accountB)
accountA.balance -= 50
accountB.balance += 50
unlock(accountB)
unlock(accountA)`,
    explanation:
      'Multiple locks require consistent ordering to avoid deadlock.',
  },
  {
    title: 'Simple counter',
    code: `lock(counterMutex)
count = count + 1
unlock(counterMutex)`,
    explanation:
      'Even a single increment needs protection when multiple threads update it.',
  },
  {
    title: 'Guarded cache access',
    code: `lock(cacheMutex)
value = cache[key]
unlock(cacheMutex)`,
    explanation:
      'Protect both reads and writes to maintain cache consistency.',
  },
]

const timelineScenarios = [
  {
    id: 'contended',
    title: 'Contended acquisition',
    steps: [
      'Thread A locks the mutex and enters the critical section.',
      'Thread B attempts to lock and blocks.',
      'Thread A exits and unlocks.',
      'Thread B acquires the lock and proceeds.',
    ],
    summary:
      'Mutual exclusion ensures only one thread executes the critical section at a time.',
  },
  {
    id: 'deadlock',
    title: 'Deadlock scenario',
    steps: [
      'Thread A locks mutex L1, then waits for L2.',
      'Thread B locks mutex L2, then waits for L1.',
      'Neither can proceed; both are stuck forever.',
    ],
    summary:
      'Avoid by locking in a consistent order or using a higher-level protocol.',
  },
  {
    id: 'priority-inversion',
    title: 'Priority inversion',
    steps: [
      'Low-priority thread holds a lock needed by a high-priority thread.',
      'Medium-priority thread runs and prevents low-priority thread from releasing.',
      'High-priority thread waits longer than expected.',
    ],
    summary:
      'Priority inheritance mitigates this in some systems.',
  },
]

const keyTakeaways = [
  'Mutexes provide mutual exclusion for critical sections.',
  'Locking must protect every access to shared invariants.',
  'Keep critical sections short and consistent in lock ordering.',
  'Use condition variables for waiting on predicates, not mutexes.',
  'Incorrect locking leads to deadlocks, starvation, and data races.',
]

export default function MutexesPage(): JSX.Element {
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'contended')
  const [stepIndex, setStepIndex] = useState(0)

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Mutexes</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Mutual exclusion for correct shared-state access</div>
              <p className="win95-text">
                Mutexes protect shared state by allowing only one thread at a time to execute critical sections. They provide the
                simplest and most common way to avoid data races, and they establish the memory ordering that makes shared writes
                visible to other threads. This page explains correct usage, pitfalls, and the patterns built on top of mutexes.
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
                Mutexes guarantee mutual exclusion, not progress. You must design your protocol to avoid deadlocks and starvation.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Types of Mutexes</legend>
            <div className="win95-grid win95-grid-2">
              {mutexTypes.map((item) => (
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
              <div className="win95-heading">Mutex Stepper</div>
              <p className="win95-text">
                Select a scenario and step through how locks behave. This highlights contention, deadlock, and scheduling effects.
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
