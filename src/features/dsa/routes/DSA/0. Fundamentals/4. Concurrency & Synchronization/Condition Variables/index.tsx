import { useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A condition variable is a waiting-and-notification primitive that lets threads sleep until a shared predicate becomes true.',
    notes:
      'It never protects data by itself; it is always used together with a mutex that protects the predicate.',
  },
  {
    title: 'Why it matters',
    details:
      'It turns busy-waiting into efficient blocking while preserving correctness for complex coordination.',
    notes:
      'Most classic concurrency problems (bounded buffers, barriers, readers-writers) rely on this pattern.',
  },
  {
    title: 'What it teaches',
    details:
      'Correctness requires a predicate, a mutex, and a loop. Notifications are hints, not guarantees.',
    notes:
      'Understanding spurious wakeups and lost wakeups is essential to safe parallel code.',
  },
]

const mentalModel = [
  {
    title: 'Predicate',
    detail:
      'A boolean expression over shared state. Example: bufferCount > 0.',
  },
  {
    title: 'Wait queue',
    detail:
      'Threads that cannot proceed park on the condition variable while holding no locks.',
  },
  {
    title: 'Signal',
    detail:
      'A thread changes state so the predicate may become true, then notifies waiters.',
  },
  {
    title: 'Re-check',
    detail:
      'Woken threads re-acquire the mutex and re-test the predicate before continuing.',
  },
]

const glossary = [
  { term: 'Condition variable', definition: 'A synchronization object for waiting on a predicate protected by a mutex.' },
  { term: 'Predicate', definition: 'The exact condition that must hold before a thread may proceed.' },
  { term: 'wait()', definition: 'Atomically releases the mutex and sleeps, then re-acquires it before returning.' },
  { term: 'signal()/notify()', definition: 'Wake one waiting thread (if any). It does not transfer the mutex.' },
  { term: 'broadcast()/notifyAll()', definition: 'Wake all waiting threads; each re-checks the predicate.' },
  { term: 'Mesa semantics', definition: 'Woken threads must re-check the predicate; the signaller keeps the lock.' },
  { term: 'Hoare semantics', definition: 'Signaller yields the lock immediately to a woken waiter (less common).' },
  { term: 'Spurious wakeup', definition: 'A wait returns without the predicate becoming true.' },
  { term: 'Lost wakeup', definition: 'A signal happens before a thread begins waiting, so the waiter sleeps forever.' },
  { term: 'Monitor', definition: 'An object that bundles state, a mutex, and one or more condition variables.' },
]

const coreRules = [
  {
    title: 'Always guard the predicate with a mutex',
    detail:
      'All reads and writes of the shared state that the predicate depends on must be under the same lock.',
  },
  {
    title: 'Wait in a loop',
    detail:
      'Use while (!predicate) wait(mutex). This handles spurious wakeups and re-checks after contention.',
  },
  {
    title: 'Signal after state change',
    detail:
      'First mutate the shared state under the mutex, then signal/broadcast.',
  },
  {
    title: 'Use the smallest scope',
    detail:
      'Keep the critical section tight to reduce contention and avoid blocking unrelated work.',
  },
  {
    title: 'Prefer multiple conditions',
    detail:
      'Use separate condition variables for different predicates to avoid waking the wrong threads.',
  },
  {
    title: 'Treat notify as a hint',
    detail:
      'Even after a signal, the predicate might not hold when the waiter finally re-acquires the mutex.',
  },
]

const apiSurface = [
  {
    title: 'wait(mutex)',
    detail:
      'Atomically unlocks the mutex and sleeps. When it returns, the mutex is locked again.',
  },
  {
    title: 'signal() / notify_one()',
    detail:
      'Wakes a single waiter if one exists; otherwise does nothing.',
  },
  {
    title: 'broadcast() / notify_all()',
    detail:
      'Wakes all waiters so they can race to re-check the predicate.',
  },
  {
    title: 'timed_wait(deadline)',
    detail:
      'Sleeps until signaled or until a timeout. Still requires a predicate loop.',
  },
]

const semanticsComparison = [
  {
    title: 'Mesa (most common)',
    detail:
      'Signal only indicates that the predicate might now be true. The signaller keeps the lock until it leaves the critical section.',
  },
  {
    title: 'Hoare (rare)',
    detail:
      'Signal hands the lock directly to a waiter. The predicate is guaranteed true at wake-up.',
  },
  {
    title: 'Practical consequence',
    detail:
      'Even with Mesa semantics, correct code is simple: always wait in a while-loop.',
  },
]

const keyPatterns = [
  {
    title: 'Bounded buffer (producer/consumer)',
    detail:
      'Producers wait on notFull, consumers wait on notEmpty. Two condition variables avoid the wrong wakeups.',
  },
  {
    title: 'Barrier / rendezvous',
    detail:
      'Threads wait until a counter reaches N, then all are released together.',
  },
  {
    title: 'Thread pool work queue',
    detail:
      'Workers sleep on notEmpty; submitters signal after enqueuing work.',
  },
  {
    title: 'Readers-writers',
    detail:
      'Readers wait when a writer is active; writers wait until readers drop to zero.',
  },
  {
    title: 'One-time latch',
    detail:
      'Threads wait until a flag becomes true; a single broadcast releases all.',
  },
  {
    title: 'Rate limiting',
    detail:
      'Waiters sleep until tokens replenish; signallers broadcast after refill.',
  },
]

const compareTools = [
  {
    title: 'Mutex vs condition variable',
    detail:
      'Mutex protects state; condition variable blocks until a state predicate is true. They are complementary.',
  },
  {
    title: 'Semaphore vs condition variable',
    detail:
      'Semaphores carry a count; condition variables pair with a predicate and external state.',
  },
  {
    title: 'Spinlock vs condition variable',
    detail:
      'Spinlocks busy-wait for short critical sections; condition variables sleep for longer waits.',
  },
  {
    title: 'Channels vs condition variable',
    detail:
      'Channels combine queueing and signaling into one abstraction; condition variables are lower-level and flexible.',
  },
]

const correctnessChecklist = [
  {
    title: 'Safety (invariants)',
    detail:
      'Check that the predicate implies it is safe to proceed and that state updates preserve invariants.',
  },
  {
    title: 'Liveness (progress)',
    detail:
      'Ensure that signals eventually reach waiters and that no thread can wait forever.',
  },
  {
    title: 'No lost wakeups',
    detail:
      'Waiting and predicate checks must be performed under the mutex to avoid missing signals.',
  },
  {
    title: 'Fairness',
    detail:
      'If starvation is a risk, add FIFO queues or priority policies above the condition variable.',
  },
  {
    title: 'Timeout behavior',
    detail:
      'Timed waits must handle timeouts exactly like spurious wakeups: re-check the predicate.',
  },
  {
    title: 'Shutdown path',
    detail:
      'Define how to wake and exit threads when the system is stopping.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Waiting without holding the mutex',
    description:
      'You can miss a signal if the predicate changes before you start waiting.',
  },
  {
    mistake: 'Using if instead of while',
    description:
      'Spurious wakeups or racing threads can violate correctness if the predicate is not re-checked.',
  },
  {
    mistake: 'Signaling before state change',
    description:
      'A wakeup can happen while the predicate is still false, leading to extra sleeps or deadlock.',
  },
  {
    mistake: 'Broadcasting everything',
    description:
      'Wakes too many threads, causing the thundering herd effect and wasted CPU.',
  },
  {
    mistake: 'Multiple predicates, one condition',
    description:
      'Different wait reasons on the same condition variable cause frequent useless wakeups.',
  },
  {
    mistake: 'Forgetting to handle shutdown',
    description:
      'Threads can wait forever unless there is a clear termination predicate.',
  },
]

const implementationNotes = [
  {
    title: 'OS support',
    detail:
      'Most implementations build on kernel wait queues or futex-like primitives for sleeping and waking.',
  },
  {
    title: 'Atomic unlock + sleep',
    detail:
      'wait() must release the mutex and park atomically to avoid missing notifications.',
  },
  {
    title: 'Spurious wakeups are allowed',
    detail:
      'Many systems allow spurious wakes for efficiency; correct code must tolerate them.',
  },
  {
    title: 'Memory visibility',
    detail:
      'The mutex establishes a happens-before relationship, so state changes are visible after wake-up.',
  },
]

const performanceTips = [
  {
    title: 'Split by predicate',
    detail:
      'Use separate condition variables for different wait reasons to reduce unnecessary wakeups.',
  },
  {
    title: 'Avoid broadcast when possible',
    detail:
      'Prefer signal if only one waiter can make progress, but use broadcast when the predicate could enable many.',
  },
  {
    title: 'Minimize critical section',
    detail:
      'Shorter lock holds reduce convoying and increase throughput.',
  },
  {
    title: 'Batch work before signaling',
    detail:
      'Enqueue multiple items and then signal once if a single wakeup can drain the queue.',
  },
  {
    title: 'Use monotonic clocks for timed waits',
    detail:
      'Avoid timeouts that shift with system clock changes.',
  },
]

const pseudocode = [
  {
    title: 'Canonical wait pattern',
    code: `lock(mutex)
while (!predicate):
  cond.wait(mutex)
// predicate is true and mutex is held
... do work ...
unlock(mutex)`,
    explanation:
      'The condition variable does not encode the predicate. The loop enforces correctness.',
  },
  {
    title: 'Producer (bounded buffer)',
    code: `lock(mutex)
while (count == capacity):
  notFull.wait(mutex)
enqueue(item)
count++
notEmpty.signal()
unlock(mutex)`,
    explanation:
      'Signal after changing state. The consumer still re-checks.',
  },
  {
    title: 'Consumer (bounded buffer)',
    code: `lock(mutex)
while (count == 0):
  notEmpty.wait(mutex)
item = dequeue()
count--
notFull.signal()
unlock(mutex)`,
    explanation:
      'Two condition variables keep producer and consumer roles separate.',
  },
]

const advancedPatterns = [
  {
    title: 'Predicate factoring',
    detail:
      'Separate a complex predicate into smaller ones with dedicated condition variables.',
  },
  {
    title: 'Sequence numbers',
    detail:
      'Use counters to avoid lost wakeups when waiters check for a specific event.',
  },
  {
    title: 'Two-phase shutdown',
    detail:
      'Set a shutdown flag, broadcast, and let waiters exit gracefully.',
  },
  {
    title: 'Mesa-style guard objects',
    detail:
      'Wrap wait in a helper function to enforce the loop and reduce mistakes.',
  },
]

const signalChoiceGuide = [
  {
    title: 'Signal when exactly one waiter can proceed',
    detail:
      'Example: a bounded buffer with capacity > 0 where a single enqueue frees one slot.',
  },
  {
    title: 'Broadcast when many waiters may proceed',
    detail:
      'Example: a latch flips from false to true; all waiters should wake.',
  },
  {
    title: 'Broadcast when predicate changed broadly',
    detail:
      'If a single state change could enable multiple distinct predicates, broadcast can be simplest.',
  },
  {
    title: 'Beware thundering herd',
    detail:
      'Broadcast can cause many wakeups that immediately go back to sleep; use sparingly.',
  },
]

const lifecycleSteps = [
  {
    title: '1) Define predicate',
    detail:
      'Decide the exact condition a waiter needs, e.g., count > 0 or shutdown == true.',
  },
  {
    title: '2) Protect state',
    detail:
      'Guard all predicate-related state with a mutex.',
  },
  {
    title: '3) Wait in loop',
    detail:
      'While predicate is false, wait. The wait releases and later re-acquires the mutex.',
  },
  {
    title: '4) Update + signal',
    detail:
      'When a thread changes state so the predicate may become true, signal or broadcast.',
  },
  {
    title: '5) Re-check and proceed',
    detail:
      'A woken thread re-tests the predicate and proceeds only if it is true.',
  },
]

const debuggingChecklist = [
  {
    title: 'Who owns the predicate?',
    detail:
      'Ensure every read/write of predicate state is under the same mutex.',
  },
  {
    title: 'Are waits in a loop?',
    detail:
      'Check for if(condition) wait(...) which can break under spurious wakeups.',
  },
  {
    title: 'Are signals after updates?',
    detail:
      'Signals before state changes can wake threads too early.',
  },
  {
    title: 'Are the right condition variables used?',
    detail:
      'One condition variable per predicate keeps signaling precise.',
  },
  {
    title: 'Is shutdown handled?',
    detail:
      'Add a termination predicate and broadcast so threads can exit.',
  },
  {
    title: 'Are timeouts handled like spurious wakes?',
    detail:
      'Timed waits must still re-check the predicate.',
  },
]

const faq = [
  {
    question: 'Why can a wait wake up if nobody signaled?',
    answer:
      'Because most APIs allow spurious wakeups for efficiency. Correct code treats wakeup as a hint.',
  },
  {
    question: 'Can I signal without holding the mutex?',
    answer:
      'Some APIs allow it, but correct designs typically signal while holding the mutex after state change.',
  },
  {
    question: 'Can I replace condition variables with sleep loops?',
    answer:
      'Polling wastes CPU and can miss updates; condition variables avoid both issues.',
  },
  {
    question: 'Do I need two condition variables?',
    answer:
      'If you have two distinct predicates (notEmpty vs notFull), separate condition variables are clearer and more efficient.',
  },
  {
    question: 'Is broadcast always safe?',
    answer:
      'It is safe but may be inefficient. It can cause a thundering herd if many threads wake unnecessarily.',
  },
]

const exampleTable = [
  { pattern: 'Bounded buffer', predicate: 'count > 0 / count < capacity', signal: 'signal opposite side' },
  { pattern: 'Barrier', predicate: 'arrived == N', signal: 'broadcast on release' },
  { pattern: 'Latch', predicate: 'ready == true', signal: 'broadcast once' },
  { pattern: 'Thread pool', predicate: 'queue not empty', signal: 'signal on enqueue' },
  { pattern: 'Shutdown', predicate: 'shutdown == true', signal: 'broadcast to exit' },
]

const workedExamples = [
  {
    title: 'A simple latch',
    code: `shared ready = false
lock(mutex)
while (!ready):
  cv.wait(mutex)
unlock(mutex)
// proceed`,
    explanation:
      'Any number of threads can wait until a single event flips ready to true.',
  },
  {
    title: 'Writer priority (readers-writers)',
    code: `lock(mutex)
while (activeWriter || waitingWriters > 0):
  canRead.wait(mutex)
activeReaders++
unlock(mutex)`,
    explanation:
      'Policy lives in the predicate. The condition variable only manages sleeping and waking.',
  },
  {
    title: 'Barrier',
    code: `lock(mutex)
arrived++
if (arrived == N):
  arrived = 0
  phase++
  cv.broadcast()
else:
  localPhase = phase
  while (phase == localPhase):
    cv.wait(mutex)
unlock(mutex)`,
    explanation:
      'A phase counter prevents late arrivals from being released by an earlier broadcast.',
  },
]

const timelineScenarios = [
  {
    id: 'correct',
    title: 'Correct wait/signal timeline',
    steps: [
      'Thread A locks mutex, sees predicate false.',
      'Thread A calls wait: releases mutex and sleeps.',
      'Thread B locks mutex, updates state so predicate is true.',
      'Thread B signals; Thread A wakes (but does not run yet).',
      'Thread B unlocks; Thread A re-acquires mutex.',
      'Thread A re-checks predicate, now true, and proceeds.',
    ],
    summary:
      'The mutex + predicate + while-loop guarantees correctness even with contention.',
  },
  {
    id: 'lost-wakeup',
    title: 'Buggy timeline (lost wakeup)',
    steps: [
      'Thread A checks predicate without the mutex and sees false.',
      'Thread B updates state and signals (no waiter yet).',
      'Thread A starts waiting. The signal was already lost.',
      'Thread A sleeps forever even though predicate is true.',
    ],
    summary:
      'Not holding the mutex during check + wait makes missed signals possible.',
  },
  {
    id: 'spurious',
    title: 'Spurious wakeup timeline',
    steps: [
      'Thread A waits correctly and releases the mutex.',
      'A spurious wakeup occurs; Thread A re-acquires mutex.',
      'Predicate is still false, so Thread A waits again.',
    ],
    summary:
      'Spurious wakeups are harmless if you use a while-loop.',
  },
]

const keyTakeaways = [
  'A condition variable never replaces a mutex; it relies on one.',
  'Correctness requires a predicate and a while-loop around wait.',
  'Signal after state change; signal is a hint, not a guarantee.',
  'Use broadcast only when many threads can progress.',
  'Separate predicates into separate condition variables when possible.',
]

export default function ConditionVariablesPage(): JSX.Element {
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'correct')
  const [stepIndex, setStepIndex] = useState(0)

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Condition Variables</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Sleeping safely until shared state allows progress</div>
              <p className="win95-text">
                Condition variables are the standard tool for blocking threads until a shared predicate becomes true. They always work
                with a mutex: the mutex protects the predicate, and the condition variable handles sleeping and waking. This page
                explains the mental model, formal rules, correct usage patterns, and the subtle bugs that appear without them.
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
                The condition variable does not store the condition. The predicate lives in shared state. The condition variable only
                manages sleep and wake coordination.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>API Surface</legend>
            <div className="win95-grid win95-grid-2">
              {apiSurface.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Mesa vs Hoare Semantics</legend>
            <div className="win95-grid win95-grid-2">
              {semanticsComparison.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Patterns You Will Reuse</legend>
            <div className="win95-grid win95-grid-2">
              {keyPatterns.map((item) => (
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
              <div className="win95-heading">Wait/Signal Stepper</div>
              <p className="win95-text">
                Pick a scenario, then step through the timeline. This highlights why correct usage always pairs a predicate with a
                mutex and a while-loop around wait.
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
            <legend>Advanced Patterns</legend>
            <div className="win95-grid win95-grid-2">
              {advancedPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Signal vs Broadcast Guide</legend>
            <div className="win95-grid win95-grid-2">
              {signalChoiceGuide.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Lifecycle Checklist</legend>
            <div className="win95-grid win95-grid-2">
              {lifecycleSteps.map((item) => (
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
            <legend>Patterns at a Glance</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Pattern</th>
                    <th>Predicate</th>
                    <th>Typical signal</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleTable.map((row) => (
                    <tr key={row.pattern}>
                      <td>{row.pattern}</td>
                      <td>{row.predicate}</td>
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
