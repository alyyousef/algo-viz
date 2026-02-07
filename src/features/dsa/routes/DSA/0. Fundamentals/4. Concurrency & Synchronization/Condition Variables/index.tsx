import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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


type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const conditionVariablesHelpStyles = `
.cv-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.cv-window {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.cv-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.cv-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.cv-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.cv-control {
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
}

.cv-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.cv-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.cv-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.cv-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.cv-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.cv-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.cv-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cv-toc-list li {
  margin: 0 0 8px;
}

.cv-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.cv-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.cv-doc-title {
  font-size: 20px;
  margin: 0 0 12px;
}

.cv-section {
  margin: 0 0 20px;
}

.cv-heading {
  font-size: 16px;
  margin: 0 0 8px;
}

.cv-subheading {
  font-size: 13px;
  margin: 0 0 6px;
}

.cv-content p,
.cv-content li {
  font-size: 12px;
  line-height: 1.5;
}

.cv-content p {
  margin: 0 0 10px;
}

.cv-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.cv-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.cv-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.cv-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.cv-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.cv-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
}

@media (max-width: 900px) {
  .cv-main {
    grid-template-columns: 1fr;
  }

  .cv-toc {
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
    { id: 'bp-why', label: 'Why This Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-model', label: 'Mental Model' },
    { id: 'core-rules', label: 'Core Rules' },
    { id: 'core-api', label: 'API Surface' },
    { id: 'core-semantics', label: 'Mesa vs Hoare' },
    { id: 'core-patterns', label: 'Reusable Patterns' },
    { id: 'core-compare', label: 'Compare Tools' },
    { id: 'core-correctness', label: 'Correctness Checklist' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-performance', label: 'Performance Tips' },
    { id: 'core-advanced', label: 'Advanced Patterns' },
    { id: 'core-signal', label: 'Signal vs Broadcast' },
    { id: 'core-lifecycle', label: 'Lifecycle Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-debugging', label: 'Debugging Checklist' },
    { id: 'core-faq', label: 'FAQ' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-timeline', label: 'Interactive Timeline' },
    { id: 'ex-patterns', label: 'Patterns at a Glance' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ConditionVariablesPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'correct')
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
    document.title = `Condition Variables (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Condition Variables',
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
    <div className="cv-help-page">
      <style>{conditionVariablesHelpStyles}</style>
      <div className="cv-window" role="presentation">
        <header className="cv-titlebar">
          <span className="cv-title-text">Condition Variables</span>
          <div className="cv-title-controls">
            <button className="cv-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="cv-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="cv-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`cv-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="cv-main">
          <aside className="cv-toc" aria-label="Table of contents">
            <h2 className="cv-toc-title">Contents</h2>
            <ul className="cv-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="cv-content">
            <h1 className="cv-doc-title">Condition Variables</h1>
            <p>
              Condition variables are the standard tool for blocking threads until a shared predicate becomes true. They always work
              with a mutex: the mutex protects the predicate, and the condition variable handles sleeping and waking.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="cv-section">
                  <h2 className="cv-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="cv-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="cv-divider" />
                <section id="bp-why" className="cv-section">
                  <h2 className="cv-heading">Why This Matters</h2>
                  <p>
                    Correctness with condition variables requires a predicate, a mutex, and a loop. Notifications are hints, not
                    guarantees.
                  </p>
                  <p>
                    Most practical patterns, including bounded buffers, barriers, and readers-writers coordination, rely on this
                    precise contract.
                  </p>
                </section>
                <hr className="cv-divider" />
                <section id="bp-takeaways" className="cv-section">
                  <h2 className="cv-heading">Key Takeaways</h2>
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
                <section id="core-mental-model" className="cv-section">
                  <h2 className="cv-heading">Mental Model</h2>
                  {mentalModel.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-rules" className="cv-section">
                  <h2 className="cv-heading">Core Rules</h2>
                  {coreRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    The condition variable does not store the condition. The predicate lives in shared state. The condition variable
                    only manages sleep and wake coordination.
                  </p>
                </section>
                <section id="core-api" className="cv-section">
                  <h2 className="cv-heading">API Surface</h2>
                  {apiSurface.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-semantics" className="cv-section">
                  <h2 className="cv-heading">Mesa vs Hoare Semantics</h2>
                  {semanticsComparison.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-patterns" className="cv-section">
                  <h2 className="cv-heading">Patterns You Will Reuse</h2>
                  {keyPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="cv-section">
                  <h2 className="cv-heading">Compare and Contrast</h2>
                  {compareTools.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="cv-section">
                  <h2 className="cv-heading">Correctness Checklist</h2>
                  {correctnessChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-implementation" className="cv-section">
                  <h2 className="cv-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="cv-section">
                  <h2 className="cv-heading">Performance Tips</h2>
                  {performanceTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="cv-section">
                  <h2 className="cv-heading">Advanced Patterns</h2>
                  {advancedPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-signal" className="cv-section">
                  <h2 className="cv-heading">Signal vs Broadcast Guide</h2>
                  {signalChoiceGuide.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-lifecycle" className="cv-section">
                  <h2 className="cv-heading">Lifecycle Checklist</h2>
                  {lifecycleSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="cv-section">
                  <h2 className="cv-heading">Common Pitfalls</h2>
                  <ul>
                    {commonPitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-debugging" className="cv-section">
                  <h2 className="cv-heading">Debugging Checklist</h2>
                  {debuggingChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-faq" className="cv-section">
                  <h2 className="cv-heading">FAQ</h2>
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
                <section id="ex-pseudocode" className="cv-section">
                  <h2 className="cv-heading">Pseudocode Reference</h2>
                  {pseudocode.map((item) => (
                    <div key={item.title}>
                      <h3 className="cv-subheading">{item.title}</h3>
                      <div className="cv-codebox">
                        <code>{item.code.trim()}</code>
                      </div>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-worked" className="cv-section">
                  <h2 className="cv-heading">Worked Examples</h2>
                  {workedExamples.map((item) => (
                    <div key={item.title}>
                      <h3 className="cv-subheading">{item.title}</h3>
                      <div className="cv-codebox">
                        <code>{item.code.trim()}</code>
                      </div>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-timeline" className="cv-section">
                  <h2 className="cv-heading">Interactive Timeline</h2>
                  <p>
                    Pick a scenario, then step through the timeline. This highlights why correct usage always pairs a predicate with
                    a mutex and a while-loop around wait.
                  </p>
                  <div className="cv-inline-buttons">
                    {timelineScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        type="button"
                        className="cv-push"
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
                  <div className="cv-inline-buttons">
                    <button type="button" className="cv-push" onClick={() => setStepIndex(0)}>
                      Reset
                    </button>
                    <button type="button" className="cv-push" onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}>
                      Back
                    </button>
                    <button
                      type="button"
                      className="cv-push"
                      onClick={() => {
                        if (canStepForward) {
                          setStepIndex((prev) => prev + 1)
                        }
                      }}
                    >
                      Step
                    </button>
                  </div>
                </section>
                <section id="ex-patterns" className="cv-section">
                  <h2 className="cv-heading">Patterns at a Glance</h2>
                  {exampleTable.map((row) => (
                    <p key={row.pattern}>
                      <strong>{row.pattern}:</strong> Predicate `{row.predicate}`; typical signal `{row.signal}`.
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="cv-section">
                <h2 className="cv-heading">Glossary</h2>
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
